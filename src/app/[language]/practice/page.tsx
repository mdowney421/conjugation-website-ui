import type { Metadata } from "next";
import PracticeClient from "../../../features/practice/PracticeClient";
import { LANGUAGES } from "../../../languages/registry";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return {
    title: `Practice ${definition.displayName} Conjugation`,
    description: `Quiz yourself on ${definition.displayName} verb conjugations across the tenses and verb types you choose.`,
  };
};

const PracticePage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  return <PracticeClient code={definition.code} definition={definition} />;
};

export default PracticePage;
