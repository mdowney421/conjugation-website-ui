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
  const [presentIndicativeTable, setPresentIndicativeTable] =
    useState<VerbConjugationTable | null>(null);
  const [presentSubjunctiveTable, setPresentSubjunctiveTable] =
    useState<VerbConjugationTable | null>(null);
  const [preteriteTable, setPreteriteTable] =
    useState<VerbConjugationTable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!verb) return;

    setIsLoading(true);
    setNotFound(false);
    setPresentIndicativeTable(null);
    setPresentSubjunctiveTable(null);
    setPreteriteTable(null);

    Promise.all([
      fetchVerbConjugation(verb, "indicative", "present"),
      fetchVerbConjugation(verb, "subjunctive", "present"),
      fetchVerbConjugation(verb, "indicative", "preterite"),
    ]).then(([presentIndicative, presentSubjunctive, preterite]) => {
      if (presentIndicative) {
        setPresentIndicativeTable(presentIndicative);
        setPresentSubjunctiveTable(presentSubjunctive ?? null);
        setPreteriteTable(preterite ?? null);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [verb]);

  return (
    <>
      <PageHeader
        title={presentIndicativeTable?.infinitive_spanish ?? verb ?? ""}
        subtitle={
          presentIndicativeTable?.infinitive_english ?? "Verb conjugations"
        }
        backTo={{ to: "/verbs", label: "← Back to verbs" }}
      />

      <div className="verb-detail">
        {isLoading ? (
          <EmptyState>Loading conjugations...</EmptyState>
        ) : notFound ? (
          <EmptyState>Couldn't find that verb.</EmptyState>
        ) : (
          <>
            {presentIndicativeTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">
                  Present Indicative
                </h2>
                <ConjugationTable table={presentIndicativeTable} />
              </div>
            )}
            {presentSubjunctiveTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">
                  Present Subjunctive
                </h2>
                <ConjugationTable table={presentSubjunctiveTable} />
              </div>
            )}
            {preteriteTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">
                  Preterite Indicative
                </h2>
                <ConjugationTable table={preteriteTable} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VerbDetailPage;
