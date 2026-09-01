import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GrammarTopicDetail from "../../../../features/grammar/GrammarTopicDetail";
import PageHeader from "../../../../components/PageHeader";
import { LANGUAGES } from "../../../../languages/registry";
import { pageMetadata } from "../../../../lib/seo";
import { jsonLdScript } from "../../../../lib/jsonLd";

type PageProps = { params: Promise<{ language: string; topic: string }> };

export const generateStaticParams = async () => {
  const params: { language: string; topic: string }[] = [];
  for (const definition of Object.values(LANGUAGES)) {
    if (!definition.enabled) continue;
    for (const topic of definition.grammarTopics) {
      params.push({ language: definition.code, topic: topic.slug });
    }
  }
  return params;
};

const findTopic = (language: string, slug: string) =>
  LANGUAGES[language]?.grammarTopics.find((topic) => topic.slug === slug);

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language, topic: slug } = await params;
  const topic = findTopic(language, slug);
  if (!topic) return {};

  return pageMetadata({
    title: topic.title,
    description: topic.summary,
    path: `/${language}/grammar/${slug}`,
  });
};

const GrammarTopicPage = async ({ params }: PageProps) => {
  const { language, topic: slug } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  const topic = findTopic(language, slug);
  if (!topic) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dialectrek.com";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: definition.displayName,
        item: `${siteUrl}/${definition.code}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Grammar",
        item: `${siteUrl}/${definition.code}/grammar`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: topic.title,
        item: `${siteUrl}/${definition.code}/grammar/${slug}`,
      },
    ],
  };

  return (
    <div className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <PageHeader
        title={topic.title}
        backTo={{ to: `/${language}/grammar`, label: "← All grammar topics" }}
      />
      <div className="grammar-page-body">
        <GrammarTopicDetail topic={topic} />
      </div>
    </div>
  );
};

export default GrammarTopicPage;
