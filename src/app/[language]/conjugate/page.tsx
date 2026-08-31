import type { Metadata } from "next";
import ComingSoon from "../../../components/ComingSoon";
import ConjugateClient from "../../../features/conjugate/ConjugateClient";
import { LANGUAGES } from "../../../languages/registry";
import { pageMetadata } from "../../../lib/seo";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return pageMetadata({
    title: `Conjugate ${definition.displayName} Verbs`,
    description: definition.hasVerbs
      ? `Quiz yourself on ${definition.displayName} verb conjugations across the tenses and verb types you choose.`
      : `${definition.displayName} verb conjugation practice is coming soon.`,
    path: `/${language}/conjugate`,
  });
};

const ConjugatePage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;
  if (!definition.hasVerbs) {
    return (
      <ComingSoon
        title="Conjugate"
        displayName={definition.displayName}
        flashcardsHref={`/${language}/flashcards`}
      />
    );
  }

  return <ConjugateClient code={definition.code} definition={definition} />;
};

export default ConjugatePage;
