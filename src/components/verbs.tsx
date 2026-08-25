import axios from "axios";
import { useEffect, useMemo, useState } from "react";

type VerbEntry = [string, string];

const VerbsPage = () => {
  const [verbsList, setVerbsList] = useState<VerbEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchVerbsList = async () => {
    try {
      const response = await axios.get<VerbEntry[]>(
        "http://127.0.0.1:8000/get-all-verbs",
      );
      setVerbsList(response.data);
    } catch (error) {
      console.error("error fetching verbs list: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerbsList();
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
            <div className="verb-row" key={`${spanish}-${english}-${index}`}>
              <span className="verb-spanish">{spanish}</span>
              <span className="verb-english">{english}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default VerbsPage;
