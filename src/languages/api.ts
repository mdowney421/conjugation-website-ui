import axios from "axios";
import type {
  ImperativeConjugationTable,
  Mood,
  Polarity,
  Tense,
  VerbConjugation,
  VerbConjugationTable,
  VerbEntry,
} from "./types";

// Set NEXT_PUBLIC_API_BASE_URL in production once the FastAPI backend is
// deployed somewhere publicly reachable -- this fallback only works for
// local development, and server-rendered pages (generateStaticParams,
// generateMetadata, the verb/verbs list pages) need a real URL to fetch
// from at build/request time.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

// During static generation, Next.js's dynamic route params for the verb
// detail page sometimes reach the page body already percent-encoded (e.g.
// "o%C3%ADr" instead of "oír") even though generateStaticParams was given
// the plain, decoded verb -- axios then encodes that string a second time
// and the request 404s. Decoding here is a no-op for an already-plain verb
// (nothing to unescape) and corrects the rare pre-encoded case.
const normalizeVerbParam = (verb: string): string => {
  try {
    return decodeURIComponent(verb);
  } catch {
    return verb;
  }
};

// Logs a short "status + URL + params" line instead of the raw Axios error,
// which includes the entire request/socket object graph and floods the
// build output with hundreds of thousands of lines when the backend is flaky.
const describeError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? "no response";
    const params = error.config?.params ? JSON.stringify(error.config.params) : "";
    return `${status} ${error.config?.url ?? ""} ${params}`.trim();
  }
  return String(error);
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// generateStaticParams/generateMetadata fire a dozen-plus of these requests
// per verb page, and `next build` runs several pages in parallel per worker.
// The backend Lambda measurably starts 503ing once more than ~10 requests
// hit it at once (likely a concurrency limit plus slow container cold
// starts), so cap how many requests this process has in flight at a time --
// this matters more than retrying, since retrying an already-saturated
// backend just fails again immediately.
class Semaphore {
  private active = 0;
  private readonly queue: (() => void)[] = [];
  constructor(private readonly max: number) {}

  async acquire(): Promise<() => void> {
    if (this.active >= this.max) {
      await new Promise<void>((resolve) => this.queue.push(resolve));
    }
    this.active++;
    return () => {
      this.active--;
      this.queue.shift()?.();
    };
  }
}

const requestLimiter = new Semaphore(4);

// Retries transient failures (backend overload, network blips) with backoff.
// Each attempt re-acquires a limiter slot so a request waiting out its
// backoff doesn't hold up other queued requests.
const withRetry = async <T,>(
  request: () => Promise<T>,
  attempts = 4,
  baseDelayMs = 300,
): Promise<T> => {
  for (let attempt = 0; ; attempt++) {
    const release = await requestLimiter.acquire();
    try {
      return await request();
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      const retryable = status === undefined || status === 429 || status >= 500;
      if (!retryable || attempt === attempts - 1) throw error;
      await sleep(baseDelayMs * 2 ** attempt);
    } finally {
      release();
    }
  }
};

export const fetchAllVerbs = async (language: string): Promise<VerbEntry[]> => {
  try {
    const response = await withRetry(() =>
      axios.get<VerbEntry[]>(`${BASE_URL}/${language}/get-all-verbs`),
    );
    return response.data;
  } catch (error) {
    console.error(`error fetching verbs list: ${describeError(error)}`);
    return [];
  }
};

export const fetchRandomVerbConjugation = async (
  language: string,
  useIrregularVerbs?: boolean,
  useRegionalVariant?: boolean,
  mood: Mood = "indicative",
  tense: Tense = "present",
  polarity: Polarity = "affirmative",
): Promise<VerbConjugation | undefined> => {
  try {
    const response = await withRetry(() =>
      axios.get<VerbConjugation[]>(`${BASE_URL}/${language}/get-random-verb-conjugation`, {
        params: {
          mood,
          tense,
          polarity,
          use_irregular: useIrregularVerbs,
          use_regional_variant: useRegionalVariant,
        },
      }),
    );
    return response.data[0];
  } catch (error) {
    console.error(`error fetching random verb conjugation: ${describeError(error)}`);
    return undefined;
  }
};

export const fetchVerbConjugation = async (
  language: string,
  verb: string,
  mood: Mood = "indicative",
  tense: Tense = "present",
): Promise<VerbConjugationTable | undefined> => {
  try {
    const response = await withRetry(() =>
      axios.get<VerbConjugationTable>(`${BASE_URL}/${language}/get-verb-conjugation`, {
        params: { verb: normalizeVerbParam(verb), mood, tense },
      }),
    );
    return response.data;
  } catch (error) {
    console.error(`error fetching verb conjugation: ${describeError(error)}`);
    return undefined;
  }
};

export const fetchImperativeConjugation = async (
  language: string,
  verb: string,
): Promise<ImperativeConjugationTable | undefined> => {
  try {
    const response = await withRetry(() =>
      axios.get<ImperativeConjugationTable>(`${BASE_URL}/${language}/get-verb-conjugation`, {
        params: { verb: normalizeVerbParam(verb), tense: "imperative" },
      }),
    );
    return response.data;
  } catch (error) {
    console.error(`error fetching imperative conjugation: ${describeError(error)}`);
    return undefined;
  }
};
