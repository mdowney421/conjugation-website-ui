import type { Metadata } from "next";
import PageHeader from "../../../components/PageHeader";
import VerbsList from "../../../features/verbs/VerbsList";
import { LANGUAGES } from "../../../languages/registry";
import { fetchAllVerbs } from "../../../languages/api";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return {
    title: `${definition.displayName} Verbs List`,
    description: `Browse the ${definition.verbCount} most common ${definition.displayName} verbs and find the one you need.`,
  };
};

const VerbsPage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  const verbs = await fetchAllVerbs(definition.code);

  return (
    <div className="page">
      <PageHeader
        title="Verbs"
        subtitle={`Browse the ${definition.verbCount} most common verbs and find the one you need.`}
      />
      <VerbsList code={definition.code} verbs={verbs} />
    </div>
  );
};

export default VerbsPage;
