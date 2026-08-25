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

const VerbDetailPage = () => {
  const { verb } = useParams<{ verb: string }>();
  const [presentIndicativeTable, setPresentIndicativeTable] =
    useState<VerbConjugationTable | null>(null);
  const [presentSubjunctiveTable, setPresentSubjunctiveTable] =
    useState<VerbConjugationTable | null>(null);
  const [preteriteTable, setPreteriteTable] =
    useState<VerbConjugationTable | null>(null);
  const [imperfectTable, setImperfectTable] =
    useState<VerbConjugationTable | null>(null);
  const [imperfectSubjunctiveTable, setImperfectSubjunctiveTable] =
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
    setImperfectTable(null);
    setImperfectSubjunctiveTable(null);

    Promise.all([
      fetchVerbConjugation(verb, "indicative", "present"),
      fetchVerbConjugation(verb, "subjunctive", "present"),
      fetchVerbConjugation(verb, "indicative", "preterite"),
      fetchVerbConjugation(verb, "indicative", "imperfect"),
      fetchVerbConjugation(verb, "subjunctive", "imperfect"),
    ]).then(
      ([
        presentIndicative,
        presentSubjunctive,
        preterite,
        imperfect,
        imperfectSubjunctive,
      ]) => {
        if (presentIndicative) {
          setPresentIndicativeTable(presentIndicative);
          setPresentSubjunctiveTable(presentSubjunctive ?? null);
          setPreteriteTable(preterite ?? null);
          setImperfectTable(imperfect ?? null);
          setImperfectSubjunctiveTable(imperfectSubjunctive ?? null);
        } else {
          setNotFound(true);
        }
        setIsLoading(false);
      },
    );
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
            {imperfectTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">
                  Imperfect Indicative
                </h2>
                <ConjugationTable table={imperfectTable} />
              </div>
            )}
            {imperfectSubjunctiveTable && (
              <div className="conjugation-section">
                <h2 className="conjugation-section-heading">
                  Imperfect Subjunctive
                </h2>
                <ConjugationTable table={imperfectSubjunctiveTable} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VerbDetailPage;
