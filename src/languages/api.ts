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

export const fetchAllVerbs = async (language: string): Promise<VerbEntry[]> => {
  try {
    const response = await axios.get<VerbEntry[]>(`${BASE_URL}/${language}/get-all-verbs`);
    return response.data;
  } catch (error) {
    console.error("error fetching verbs list: ", error);
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
    const response = await axios.get<VerbConjugation[]>(
      `${BASE_URL}/${language}/get-random-verb-conjugation`,
      {
        params: {
          mood,
          tense,
          polarity,
          use_irregular: useIrregularVerbs,
          use_regional_variant: useRegionalVariant,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error("error fetching random verb conjugation: ", error);
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
    const response = await axios.get<VerbConjugationTable>(
      `${BASE_URL}/${language}/get-verb-conjugation`,
      { params: { verb: normalizeVerbParam(verb), mood, tense } },
    );
    return response.data;
  } catch (error) {
    console.error("error fetching verb conjugation: ", error);
    return undefined;
  }
};

export const fetchImperativeConjugation = async (
  language: string,
  verb: string,
): Promise<ImperativeConjugationTable | undefined> => {
  try {
    const response = await axios.get<ImperativeConjugationTable>(
      `${BASE_URL}/${language}/get-verb-conjugation`,
      { params: { verb: normalizeVerbParam(verb), tense: "imperative" } },
    );
    return response.data;
  } catch (error) {
    console.error("error fetching imperative conjugation: ", error);
    return undefined;
  }
};
