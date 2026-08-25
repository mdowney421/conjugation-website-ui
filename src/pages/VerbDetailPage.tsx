import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { fetchVerbConjugation } from "../languages/spanish/api";
import type { VerbConjugationTable } from "../languages/spanish/types";

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
          <td className="spanish-cell">{row.form_spanish}</td>
          <td className="english-cell">{row.form_english}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const VerbDetailPage = () => {
  const { verb } = useParams<{ verb: string }>();
  const [indicativeTable, setIndicativeTable] =
    useState<VerbConjugationTable | null>(null);
  const [subjunctiveTable, setSubjunctiveTable] =
    useState<VerbConjugationTable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!verb) return;

    setIsLoading(true);
    setNotFound(false);
    setIndicativeTable(null);
    setSubjunctiveTable(null);

    Promise.all([
      fetchVerbConjugation(verb, "indicative"),
      fetchVerbConjugation(verb, "subjunctive"),
    ]).then(([indicative, subjunctive]) => {
      if (indicative) {
        setIndicativeTable(indicative);
        setSubjunctiveTable(subjunctive ?? null);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [verb]);

  return (
    <>
      <PageHeader
        title={indicativeTable?.infinitive_spanish ?? verb ?? ""}
        subtitle={indicativeTable?.infinitive_english ?? "Present tense conjugations"}
        backTo={{ to: "/verbs", label: "← Back to verbs" }}
      />

      <div className="verb-detail">
        {isLoading ? (
          <EmptyState>Loading conjugations...</EmptyState>
        ) : notFound ? (
          <EmptyState>Couldn't find that verb.</EmptyState>
        ) : (
          <>
            {indicativeTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">Indicative</h2>
                <ConjugationTable table={indicativeTable} />
              </div>
            )}
            {subjunctiveTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">Subjunctive</h2>
                <ConjugationTable table={subjunctiveTable} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VerbDetailPage;
