import type { Metadata } from "next";
import { Suspense } from "react";
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
    description: `Watch ${definition.displayName} videos sorted by difficulty and vote on how hard they are to follow.`,
    path: `/${language}/watch`,
  });
};

const WatchPage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  return (
    <Suspense fallback={null}>
      <WatchClient code={definition.code} definition={definition} />
    </Suspense>
  );
};

export default WatchPage;
