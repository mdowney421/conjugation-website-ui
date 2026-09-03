import type { Metadata } from "next";
import { Suspense } from "react";
import ComingSoon from "../../../components/ComingSoon";
import WatchClient from "../../../features/watch/WatchClient";
import { LANGUAGES } from "../../../languages/registry";
import { pageMetadata } from "../../../lib/seo";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return pageMetadata({
    title: `Watch ${definition.displayName} Videos`,
    description: definition.hasWatch
      ? `Learn ${definition.displayName} from real native speakers on YouTube, with videos sorted to match your level.`
      : `Watch ${definition.displayName} videos are coming soon.`,
    path: `/${language}/watch`,
  });
};

const WatchPage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;
  if (!definition.hasWatch) {
    return <ComingSoon title="Watch" language={language} definition={definition} />;
  }

  return (
    <Suspense fallback={null}>
      <WatchClient code={definition.code} definition={definition} />
    </Suspense>
  );
};

export default WatchPage;
