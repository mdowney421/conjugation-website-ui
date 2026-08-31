import type { Metadata } from "next";
import Link from "next/link";
import ComingSoon from "../../../components/ComingSoon";
import PageHeader from "../../../components/PageHeader";
import { LANGUAGES } from "../../../languages/registry";
import { pageMetadata } from "../../../lib/seo";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return pageMetadata({
    title: `${definition.displayName} Grammar Concepts`,
    description: definition.grammarTopics.length
      ? `Explanations for the ${definition.displayName} grammar concepts that trip learners up most.`
      : `${definition.displayName} grammar concepts are coming soon.`,
    path: `/${language}/grammar`,
  });
};

const GrammarPage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  if (definition.grammarTopics.length === 0 && definition.upcomingGrammarTopics.length === 0) {
    return <ComingSoon title="Grammar" language={language} definition={definition} />;
  }

  return (
    <div className="page">
      <PageHeader
        title="Grammar"
        subtitle="Explanations for the concepts that trip learners up most -- not just the tenses."
      />
      <div className="grammar-topics-list">
        {definition.grammarTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/${language}/grammar/${topic.slug}`}
            className="grammar-topic-row"
          >
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
          </Link>
        ))}
        {definition.upcomingGrammarTopics.map((topic) => (
          <div
            key={topic.title}
            className="grammar-topic-row grammar-topic-row--disabled"
            aria-disabled="true"
          >
            <div className="grammar-topic-row-heading">
              <h3>{topic.title}</h3>
              <span className="grammar-topic-badge">Coming soon</span>
            </div>
            <p>{topic.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarPage;
