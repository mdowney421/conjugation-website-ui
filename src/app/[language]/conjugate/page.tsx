import type { Metadata } from "next";
import ConjugateClient from "../../../features/conjugate/ConjugateClient";
import { LANGUAGES } from "../../../languages/registry";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return {
    title: `Conjugate ${definition.displayName} Verbs`,
    description: `Quiz yourself on ${definition.displayName} verb conjugations across the tenses and verb types you choose.`,
  };
};

const ConjugatePage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  return <ConjugateClient code={definition.code} definition={definition} />;
};

export default ConjugatePage;
