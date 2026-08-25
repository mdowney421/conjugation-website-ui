import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchVerbConjugation,
  type VerbConjugationTable,
} from "../api/api";

const VerbDetailPage = () => {
  const { verb } = useParams<{ verb: string }>();
  const [table, setTable] = useState<VerbConjugationTable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!verb) return;

    setIsLoading(true);
    setNotFound(false);
    setTable(null);

    fetchVerbConjugation(verb).then((result) => {
      if (result) {
        setTable(result);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [verb]);

  return (
    <>
      <div className="page-header">
        <Link to="/verbs" className="back-link">
          ← Back to verbs
        </Link>
        <h1>{table?.infinitive_spanish ?? verb}</h1>
        <p>{table?.infinitive_english ?? "Present tense conjugations"}</p>
      </div>

      <div className="verb-detail">
        {isLoading ? (
          <div className="empty-state">Loading conjugations...</div>
        ) : notFound ? (
          <div className="empty-state">Couldn't find that verb.</div>
        ) : (
          <table className="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Spanish</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {table?.conjugations.map((row) => (
                <tr key={row.pronoun_spanish}>
                  <td className="pronoun-cell">{row.pronoun_spanish}</td>
                  <td className="spanish-cell">{row.form_spanish}</td>
                  <td className="english-cell">{row.form_english}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default VerbDetailPage;
