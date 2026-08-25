import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { fetchImperativeConjugation, fetchVerbConjugation } from "../languages/spanish/api";
import type {
  ImperativeConjugationTable,
  Mood,
  Tense,
  VerbConjugationTable,
} from "../languages/spanish/types";

const ConjugationTable = ({ table }: { table: VerbConjugationTable }) => (
  <table className="conjugation-table">
    <thead>
      <tr>
        <th>Pronoun</th>
        <th>Spanish</th>
        <th>English</th>
      </tr>
    </thead>
    <tbody>
      {table.conjugations.map((row) => (
        <tr key={row.pronoun_spanish}>
          <td className="pronoun-cell">{row.pronoun_spanish}</td>
          <td className="spanish-cell">
            {row.form_spanish}
            {row.form_spanish_alt && ` / ${row.form_spanish_alt}`}
          </td>
          <td className="english-cell">{row.form_english}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

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
        <th>English</th>
      </tr>
    </thead>
    <tbody>
      {table.conjugations.map((row) => (
        <tr key={row.pronoun_spanish}>
          <td className="pronoun-cell">{row.pronoun_spanish}</td>
          <td className="spanish-cell">{row.form_spanish_affirmative}</td>
          <td className="spanish-cell">{row.form_spanish_negative}</td>
          <td className="english-cell">
            {row.form_english_affirmative} / {row.form_english_negative}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

type SectionConfig = { mood: Mood; tense: Tense; label: string };

// Every mood/tense combination this app supports, in display order.
// Adding a new tense or mood to the app just means adding a row here.
const SECTIONS: SectionConfig[] = [
  { tense: "present", mood: "indicative", label: "Present Indicative" },
  { tense: "present", mood: "subjunctive", label: "Present Subjunctive" },
  { tense: "preterite", mood: "indicative", label: "Preterite Indicative" },
  { tense: "preterite_perfect", mood: "indicative", label: "Preterite Perfect Indicative" },
  { tense: "imperfect", mood: "indicative", label: "Imperfect Indicative" },
  { tense: "imperfect", mood: "subjunctive", label: "Imperfect Subjunctive" },
  { tense: "pluperfect", mood: "indicative", label: "Pluperfect Indicative" },
  { tense: "pluperfect", mood: "subjunctive", label: "Pluperfect Subjunctive" },
  { tense: "future", mood: "indicative", label: "Future Indicative" },
  { tense: "future_perfect", mood: "indicative", label: "Future Perfect Indicative" },
  { tense: "conditional", mood: "indicative", label: "Conditional Indicative" },
  { tense: "conditional_perfect", mood: "indicative", label: "Conditional Perfect Indicative" },
  { tense: "perfect", mood: "indicative", label: "Perfect Indicative" },
  { tense: "perfect", mood: "subjunctive", label: "Perfect Subjunctive" },
];

// Where the imperative section sits among the mood/tense SECTIONS
// above -- right after the present tenses, since it's built out of
// present-indicative and present-subjunctive forms.
const IMPERATIVE_SECTION_INDEX = 2;

const VerbDetailPage = () => {
  const { verb } = useParams<{ verb: string }>();
  const [tables, setTables] = useState<(VerbConjugationTable | null)[]>([]);
  const [imperativeTable, setImperativeTable] = useState<ImperativeConjugationTable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!verb) return;

    setIsLoading(true);
    setNotFound(false);
    setTables([]);
    setImperativeTable(null);

    Promise.all([
      ...SECTIONS.map((section) =>
        fetchVerbConjugation(verb, section.mood, section.tense),
      ),
      fetchImperativeConjugation(verb),
    ]).then((results) => {
      const sectionResults = results.slice(0, SECTIONS.length) as (VerbConjugationTable | undefined)[];
      const imperativeResult = results[SECTIONS.length] as ImperativeConjugationTable | undefined;
      if (sectionResults[0]) {
        setTables(sectionResults.map((result) => result ?? null));
        setImperativeTable(imperativeResult ?? null);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [verb]);

  const infinitiveTable = tables[0];

  const renderSection = (section: SectionConfig, index: number) => {
    const table = tables[index];
    if (!table) return null;
    return (
      <div className="conjugation-section" key={section.label}>
        <h2 className="conjugation-section-heading">{section.label}</h2>
        <ConjugationTable table={table} />
      </div>
    );
  };

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
          <>
            {SECTIONS.slice(0, IMPERATIVE_SECTION_INDEX).map((section, index) =>
              renderSection(section, index),
            )}
            {imperativeTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">Imperative</h2>
                <ImperativeTable table={imperativeTable} />
              </div>
            )}
            {SECTIONS.slice(IMPERATIVE_SECTION_INDEX).map((section, index) =>
              renderSection(section, index + IMPERATIVE_SECTION_INDEX),
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VerbDetailPage;
