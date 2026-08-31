import type { Metadata } from "next";
import FlashcardsClient from "../../../features/flashcards/FlashcardsClient";
import { LANGUAGES } from "../../../languages/registry";
import { pageMetadata } from "../../../lib/seo";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return pageMetadata({
    title: `${definition.displayName} Flashcards`,
    description: `Memorize the ${definition.wordCount} most common ${definition.displayName} words with flashcards.`,
    path: `/${language}/flashcards`,
  });
};

const FlashcardsPage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  return <FlashcardsClient code={definition.code} definition={definition} />;
};

export default FlashcardsPage;
