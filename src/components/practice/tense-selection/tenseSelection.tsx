type TenseSelectionProps = {
  tenseList: string[];
  tenseSelection: string[];
  handleThirdQuestion: (tense: string) => void;
  fetchRandomVerbConjugation: () => void;
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const TenseSelection = ({
  tenseList,
  tenseSelection,
  handleThirdQuestion,
  fetchRandomVerbConjugation,
}: TenseSelectionProps) => {
  return (
    <div className="question-card">
      <h2>Which tenses would you like to practice?</h2>
      <div className="chip-grid">
        {tenseList.map((tense) => (
          <button
            key={tense}
            type="button"
            className={`chip${tenseSelection.includes(tense) ? " selected" : ""}`}
            onClick={() => handleThirdQuestion(tense)}
          >
            {capitalize(tense)}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        disabled={tenseSelection.length === 0}
        onClick={fetchRandomVerbConjugation}
      >
        Let's conjugate!
      </button>
    </div>
  );
};

export default TenseSelection;
