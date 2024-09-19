const TenseSelection = ({
  tenseList,
  tenseSelection,
  handleThirdQuestion,
  fetchRandomVerbConjugation,
}) => {
  return (
    <div className="row">
      <p className="display-5">Which tenses would you like to practice?</p>
      <div className="row">
        <div className="col">
          {tenseList.map((tense) => (
            <button
              key={tense}
              type="button"
              className={
                tenseSelection.includes(tense)
                  ? "btn btn-success mx-3"
                  : "btn btn-outline-success mx-3"
              }
              onClick={() => handleThirdQuestion(tense)}
            >
              {tense.charAt(0).toUpperCase() + tense.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-success mx-3"
            onClick={fetchRandomVerbConjugation}
          >
            Let's conjugate!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenseSelection;
