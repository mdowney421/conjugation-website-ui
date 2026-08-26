import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { fetchImperativeConjugation, fetchVerbConjugation } from "../languages/spanish/api";
import type {
  ImperativeConjugationTable,
  Tense,
  VerbConjugationTable,
} from "../languages/spanish/types";

// Indicative and subjunctive forms for a tense share one table, laid out
// as parallel columns per pronoun -- a mood badge in the header marks
// which column is which, and the subjunctive column drops in a note
// (via rowSpan) for tenses Spanish has no subjunctive form for at all.
const MergedConjugationTable = ({
  indicative,
  subjunctive,
  hasSubjunctive,
}: {
  indicative: VerbConjugationTable;
  subjunctive: VerbConjugationTable | null;
  hasSubjunctive: boolean;
}) => {
  const rows = indicative.conjugations;

  return (
    <table className="conjugation-table conjugation-table-merged">
      <thead>
        <tr>
          <th>Pronoun</th>
          <th>
            <span className="mood-badge mood-badge-indicative">Indicative</span>
          </th>
          <th>
            <span className="mood-badge mood-badge-subjunctive">Subjunctive</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const subjunctiveRow = subjunctive?.conjugations[index];
          return (
            <tr key={row.pronoun_spanish}>
              <td className="pronoun-cell">{row.pronoun_spanish}</td>
              <td className="spanish-cell">
                <div className="conjugation-form-group">
                  <span className="conjugation-form">
                    {row.form_spanish}
                    {row.form_spanish_alt && ` / ${row.form_spanish_alt}`}
                  </span>
                  <span className="conjugation-gloss">{row.form_english}</span>
                </div>
              </td>
              {!hasSubjunctive ? (
                index === 0 && (
                  <td className="no-subjunctive-cell" rowSpan={rows.length}>
                    Spanish has no subjunctive form for this tense.
                  </td>
                )
              ) : (
                <td className="spanish-cell">
                  {subjunctiveRow && (
                    <div className="conjugation-form-group">
                      <span className="conjugation-form">
                        {subjunctiveRow.form_spanish}
                        {subjunctiveRow.form_spanish_alt && ` / ${subjunctiveRow.form_spanish_alt}`}
                      </span>
                      <span className="conjugation-gloss">{subjunctiveRow.form_english}</span>
                    </div>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// The imperative has no "yo" form and no single indicative/subjunctive
// axis -- affirmative and negative are different enough (and taught
// together often enough) that they get their own columns side by side
// instead of the mood-picker treatment every other tense gets.
const ImperativeTable = ({ table }: { table: ImperativeConjugationTable }) => (
  <table className="conjugation-table">
    <thead>
      <tr>
        <th>Pronoun</th>
        <th>Affirmative</th>
        <th>Negative</th>
      </tr>
    </thead>
    <tbody>
      {table.conjugations.map((row) => (
        <tr key={row.pronoun_spanish}>
          <td className="pronoun-cell">{row.pronoun_spanish}</td>
          <td className="spanish-cell">
            <div className="conjugation-form-group">
              <span className="conjugation-form">{row.form_spanish_affirmative}</span>
              <span className="conjugation-gloss">{row.form_english_affirmative}</span>
            </div>
          </td>
          <td className="spanish-cell">
            <div className="conjugation-form-group">
              <span className="conjugation-form">{row.form_spanish_negative}</span>
              <span className="conjugation-gloss">{row.form_english_negative}</span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// A Past -> Present -> Future line pinned to the viewport (not the page),
// so it's always visible while the tables it runs alongside scroll past.
// The dot marks how far through that past-to-future span the reader
// currently is, tracking the vertical center of the viewport against the
// bounds of the tense list.
const TenseSpine = ({ progress }: { progress: number }) => (
  <div className="tense-spine" aria-hidden="true">
    <div className="tense-spine-line" />
    <div
      className="tense-spine-indicator"
      style={{ top: `${progress * 100}%` }}
    />
    <span className="tense-spine-label tense-spine-label-past">Past</span>
    <span className="tense-spine-label tense-spine-label-present">Present</span>
    <span className="tense-spine-label tense-spine-label-future">Future</span>
  </div>
);

type TenseGroupConfig = { tense: Tense; label: string; hasSubjunctive: boolean };

// Every tense this app supports, ordered furthest-in-the-past to
// furthest-in-the-future. Tenses with a subjunctive counterpart show
// indicative and subjunctive side by side; the rest are indicative-only
// (Spanish has no subjunctive preterite, future, or conditional).
const TENSE_GROUPS: TenseGroupConfig[] = [
  { tense: "pluperfect", label: "Pluperfect", hasSubjunctive: true },
  { tense: "preterite_perfect", label: "Preterite Perfect", hasSubjunctive: false },
  { tense: "imperfect", label: "Imperfect", hasSubjunctive: true },
  { tense: "preterite", label: "Preterite", hasSubjunctive: false },
  { tense: "perfect", label: "Present Perfect", hasSubjunctive: true },
  { tense: "present", label: "Present", hasSubjunctive: true },
  { tense: "conditional", label: "Conditional", hasSubjunctive: false },
  { tense: "conditional_perfect", label: "Conditional Perfect", hasSubjunctive: false },
  { tense: "future", label: "Future", hasSubjunctive: false },
  { tense: "future_perfect", label: "Future Perfect", hasSubjunctive: false },
];

// The imperative is built out of present-indicative and present-subjunctive
// forms, so it's shown right after the present-tense group.
const IMPERATIVE_AFTER_INDEX = TENSE_GROUPS.findIndex((group) => group.tense === "present");

type GroupData = {
  indicative: VerbConjugationTable | null;
  subjunctive: VerbConjugationTable | null;
};

const TenseGroupSection = ({
  group,
  data,
}: {
  group: TenseGroupConfig;
  data: GroupData;
}) => {
  if (!data.indicative) return null;

  return (
    <div className="conjugation-section">
      <h2 className="conjugation-section-heading">{group.label}</h2>
      <MergedConjugationTable
        indicative={data.indicative}
        subjunctive={data.subjunctive}
        hasSubjunctive={group.hasSubjunctive}
      />
    </div>
  );
};

const VerbDetailPage = () => {
  const { verb } = useParams<{ verb: string }>();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [imperativeTable, setImperativeTable] = useState<ImperativeConjugationTable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [spineProgress, setSpineProgress] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!verb) return;

    setIsLoading(true);
    setNotFound(false);
    setGroups([]);
    setImperativeTable(null);

    Promise.all([
      Promise.all(
        TENSE_GROUPS.map(async (group): Promise<GroupData> => {
          const [indicative, subjunctive] = await Promise.all([
            fetchVerbConjugation(verb, "indicative", group.tense),
            group.hasSubjunctive
              ? fetchVerbConjugation(verb, "subjunctive", group.tense)
              : Promise.resolve(undefined),
          ]);
          return { indicative: indicative ?? null, subjunctive: subjunctive ?? null };
        }),
      ),
      fetchImperativeConjugation(verb),
    ]).then(([groupResults, imperativeResult]) => {
      if (groupResults[IMPERATIVE_AFTER_INDEX]?.indicative) {
        setGroups(groupResults);
        setImperativeTable(imperativeResult ?? null);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [verb]);

  useEffect(() => {
    if (isLoading) return;

    let ticking = false;
    const measure = () => {
      ticking = false;
      const el = sectionsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const raw = (viewportCenter - rect.top) / rect.height;
      setSpineProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [isLoading]);

  const infinitiveTable =
    groups[IMPERATIVE_AFTER_INDEX]?.indicative ??
    groups.flatMap((group) => [group.indicative, group.subjunctive]).find(Boolean);

  return (
    <>
      <PageHeader
        title={infinitiveTable?.infinitive_spanish ?? verb ?? ""}
        subtitle={infinitiveTable?.infinitive_english ?? "Verb conjugations"}
        backTo={{ to: "/verbs", label: "← Back to verbs" }}
      />

      <div className="verb-detail">
        {isLoading ? (
          <EmptyState>Loading conjugations...</EmptyState>
        ) : notFound ? (
          <EmptyState>Couldn't find that verb.</EmptyState>
        ) : (
          <div className="verb-detail-layout">
            <TenseSpine progress={spineProgress} />
            <div className="verb-detail-sections" ref={sectionsRef}>
              {TENSE_GROUPS.map((group, index) => (
                <Fragment key={group.tense}>
                  <TenseGroupSection group={group} data={groups[index]} />
                  {index === IMPERATIVE_AFTER_INDEX && imperativeTable && (
                    <div className="conjugation-section">
                      <h2 className="conjugation-section-heading">Imperative</h2>
                      <ImperativeTable table={imperativeTable} />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VerbDetailPage;
