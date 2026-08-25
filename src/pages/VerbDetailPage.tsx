import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { fetchVerbConjugation } from "../languages/spanish/api";
import type { Mood, Tense, VerbConjugationTable } from "../languages/spanish/types";

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

type SectionConfig = { mood: Mood; tense: Tense; label: string };

// Every mood/tense combination this app supports, in display order.
// Adding a new tense or mood to the app just means adding a row here.
const SECTIONS: SectionConfig[] = [
  { tense: "present", mood: "indicative", label: "Present Indicative" },
  { tense: "present", mood: "subjunctive", label: "Present Subjunctive" },
  { tense: "preterite", mood: "indicative", label: "Preterite Indicative" },
  { tense: "imperfect", mood: "indicative", label: "Imperfect Indicative" },
  { tense: "imperfect", mood: "subjunctive", label: "Imperfect Subjunctive" },
  { tense: "conditional", mood: "indicative", label: "Conditional Indicative" },
  { tense: "conditional_perfect", mood: "indicative", label: "Conditional Perfect Indicative" },
  { tense: "perfect", mood: "indicative", label: "Perfect Indicative" },
  { tense: "perfect", mood: "subjunctive", label: "Perfect Subjunctive" },
];

const VerbDetailPage = () => {
  const { verb } = useParams<{ verb: string }>();
  const [tables, setTables] = useState<(VerbConjugationTable | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!verb) return;

    setIsLoading(true);
    setNotFound(false);
    setTables([]);

    Promise.all(
      SECTIONS.map((section) =>
        fetchVerbConjugation(verb, section.mood, section.tense),
      ),
    ).then((results) => {
      if (results[0]) {
        setTables(results.map((result) => result ?? null));
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [verb]);

  const infinitiveTable = tables[0];

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
          SECTIONS.map((section, index) => {
            const table = tables[index];
            if (!table) return null;
            return (
              <div className="conjugation-section" key={section.label}>
                <h2 className="conjugation-section-heading">
                  {section.label}
                </h2>
                <ConjugationTable table={table} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default VerbDetailPage;
