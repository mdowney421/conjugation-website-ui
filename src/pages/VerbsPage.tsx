import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllVerbs } from "../languages/spanish/api";
import type { VerbEntry } from "../languages/spanish/types";

const VerbsPage = () => {
  const [verbsList, setVerbsList] = useState<VerbEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAllVerbs().then((verbs) => {
      setVerbsList(verbs);
      setIsLoading(false);
    });
  }, []);

  const filteredVerbs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return verbsList;
    return verbsList.filter(([spanish, english]) =>
      `${spanish} ${english}`.toLowerCase().includes(normalizedQuery),
    );
  }, [verbsList, query]);

  return (
    <>
      <div className="page-header">
        <h1>Verbs</h1>
        <p>Browse the full list and find the conjugation you need.</p>
      </div>

      <div className="verbs-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search verbs..."
          aria-label="Search verbs"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="verbs-list">
        {isLoading ? (
          <div className="empty-state">Loading verbs...</div>
        ) : filteredVerbs.length === 0 ? (
          <div className="empty-state">No verbs found.</div>
        ) : (
          filteredVerbs.map(([spanish, english], index) => (
            <Link
              to={`/verbs/${encodeURIComponent(spanish)}`}
              className="verb-row"
              key={`${spanish}-${english}-${index}`}
            >
              <span className="verb-spanish">{spanish}</span>
              <span className="verb-english">{english}</span>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default VerbsPage;
