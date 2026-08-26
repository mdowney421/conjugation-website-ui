import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import PageHeader from "../../../../components/PageHeader";
import VerbDetailSections from "../../../../components/VerbDetailSections";
import {
  IMPERATIVE_AFTER_INDEX,
  ImperativeTable,
  TENSE_GROUPS,
  TenseGroupSection,
  type GroupData,
} from "../../../../features/verbs/ConjugationTables";
import { LANGUAGES } from "../../../../languages/registry";
import {
  fetchAllVerbs,
  fetchImperativeConjugation,
  fetchVerbConjugation,
} from "../../../../languages/api";

type PageProps = { params: Promise<{ language: string; verb: string }> };

// Pre-renders every verb page at build time for the best SEO/perf outcome.
// If the backend isn't reachable at build time this just yields no static
// params -- pages still render correctly on-demand per request instead.
export const generateStaticParams = async () => {
  const params: { language: string; verb: string }[] = [];

  for (const definition of Object.values(LANGUAGES)) {
    if (!definition.enabled) continue;
    try {
      const verbs = await fetchAllVerbs(definition.code);
      for (const [target] of verbs) {
        params.push({ language: definition.code, verb: target });
      }
    } catch {
      // Backend unreachable at build time -- skip static generation for
      // this language, pages will render on-demand instead.
    }
  }

  return params;
};

const loadGroups = (code: string, verb: string) =>
  Promise.all(
    TENSE_GROUPS.map(async (group): Promise<GroupData> => {
      const [indicative, subjunctive] = await Promise.all([
        fetchVerbConjugation(code, verb, "indicative", group.tense),
        group.hasSubjunctive
          ? fetchVerbConjugation(code, verb, "subjunctive", group.tense)
          : Promise.resolve(undefined),
      ]);
      return { indicative: indicative ?? null, subjunctive: subjunctive ?? null };
    }),
  );

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language, verb } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};

  const table = await fetchVerbConjugation(definition.code, verb, "indicative", "present");
  if (!table) return { title: verb };

  return {
    title: `${table.infinitive_target} Conjugation`,
    description: `See how to conjugate "${table.infinitive_target}" (${table.infinitive_english}) in ${definition.displayName} across every tense, mood, and the imperative.`,
  };
};

const VerbDetailPage = async ({ params }: PageProps) => {
  const { language, verb } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  const [groups, imperativeTable] = await Promise.all([
    loadGroups(definition.code, verb),
    fetchImperativeConjugation(definition.code, verb),
  ]);

  if (!groups[IMPERATIVE_AFTER_INDEX]?.indicative) {
    notFound();
  }

  const infinitiveTable =
    groups[IMPERATIVE_AFTER_INDEX]?.indicative ??
    groups.flatMap((group) => [group.indicative, group.subjunctive]).find(Boolean);

  return (
    <div className="page">
      <PageHeader
        title={infinitiveTable?.infinitive_target ?? verb}
        subtitle={infinitiveTable?.infinitive_english ?? "Verb conjugations"}
        backTo={{ to: `/${definition.code}/verbs`, label: "← Back to verbs" }}
      />

      <div className="verb-detail">
        <VerbDetailSections>
          {TENSE_GROUPS.map((group, index) => (
            <Fragment key={group.tense}>
              <TenseGroupSection
                group={group}
                data={groups[index]}
                displayName={definition.displayName}
              />
              {index === IMPERATIVE_AFTER_INDEX && imperativeTable && (
                <div className="conjugation-section">
                  <h2 className="conjugation-section-heading">Imperative</h2>
                  <ImperativeTable table={imperativeTable} />
                </div>
              )}
            </Fragment>
          ))}
        </VerbDetailSections>
      </div>
    </div>
  );
};

export default VerbDetailPage;
