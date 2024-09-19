const ConjugationInput = ({
  randomVerb,
  handleInputChange,
  handleSubmitGuess,
  isCorrectAnswer,
}) => {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col">
          <p className="display-5">{randomVerb?.form_english ?? null}</p>
          <form onSubmit={handleSubmitGuess}>
            <div className="form-group">
              <input
                type="conjugation"
                className="form-control"
                id="conjugationGuess"
                placeholder="Enter your conjugation"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-success">
              Check Answer
            </button>
          </form>
          {isCorrectAnswer === "true" ? (
            <p className="display-5">Correct!</p>
          ) : isCorrectAnswer === "false" ? (
            <p className="display-5">Incorrect!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ConjugationInput;
