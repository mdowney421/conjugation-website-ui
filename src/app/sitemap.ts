import type { MetadataRoute } from "next";
import { LANGUAGES } from "../languages/registry";
import { fetchAllVerbs } from "../languages/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // Build time doubles as a freshness signal for search engines -- every
  // entry gets it since this sitemap always reflects the latest deploy.
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1, lastModified },
    { url: `${SITE_URL}/privacy`, priority: 0.3, lastModified },
  ];

  for (const definition of Object.values(LANGUAGES)) {
    if (!definition.enabled) continue;

    const base = `${SITE_URL}/${definition.code}`;
    entries.push(
      { url: base, priority: 0.9, lastModified },
      { url: `${base}/verbs`, priority: definition.hasVerbs ? 0.8 : 0.4, lastModified },
      { url: `${base}/conjugate`, priority: definition.hasVerbs ? 0.6 : 0.4, lastModified },
      { url: `${base}/flashcards`, priority: 0.8, lastModified },
      { url: `${base}/grammar`, priority: definition.grammarTopics.length ? 0.7 : 0.4, lastModified },
      { url: `${base}/about`, priority: 0.5, lastModified },
    );

    for (const topic of definition.grammarTopics) {
      entries.push({
        url: `${base}/grammar/${topic.slug}`,
        priority: 0.6,
        lastModified,
      });
    }

    if (definition.hasVerbs) {
      try {
        const verbs = await fetchAllVerbs(definition.code);
        for (const [target] of verbs) {
          entries.push({
            url: `${base}/verbs/${encodeURIComponent(target)}`,
            priority: 0.7,
            lastModified,
          });
        }
      } catch {
        // Backend unreachable at build time -- verb pages are omitted from
        // the sitemap rather than failing the build.
      }
    }
  }

  return entries;
};

export default sitemap;
