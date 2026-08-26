import type { MetadataRoute } from "next";
import { LANGUAGES } from "../languages/registry";
import { fetchAllVerbs } from "../languages/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const entries: MetadataRoute.Sitemap = [{ url: SITE_URL, priority: 1 }];

  for (const definition of Object.values(LANGUAGES)) {
    if (!definition.enabled) continue;

    const base = `${SITE_URL}/${definition.code}`;
    entries.push(
      { url: base, priority: 0.9 },
      { url: `${base}/verbs`, priority: 0.8 },
      { url: `${base}/practice`, priority: 0.6 },
      { url: `${base}/about`, priority: 0.5 },
    );

    try {
      const verbs = await fetchAllVerbs(definition.code);
      for (const [target] of verbs) {
        entries.push({
          url: `${base}/verbs/${encodeURIComponent(target)}`,
          priority: 0.7,
        });
      }
    } catch {
      // Backend unreachable at build time -- verb pages are omitted from
      // the sitemap rather than failing the build.
    }
  }

  return entries;
};

export default sitemap;
