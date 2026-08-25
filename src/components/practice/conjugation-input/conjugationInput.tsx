import type { ChangeEvent, FormEvent } from "react";

type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
};

type ConjugationInputProps = {
  randomVerb: VerbConjugation | null;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitGuess: (event: FormEvent<HTMLFormElement>) => void;
  isCorrectAnswer: string;
  fetchRandomVerbConjugation: () => void;
  userGuess: string;
};

const ConjugationInput = ({
  randomVerb,
  handleInputChange,
  handleSubmitGuess,
  isCorrectAnswer,
  fetchRandomVerbConjugation,
  userGuess,
}: ConjugationInputProps) => {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col">
          <p className="display-5">{randomVerb?.form_english ?? null}</p>
          <form onSubmit={handleSubmitGuess}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="conjugationGuess"
                placeholder="Enter your conjugation"
                onChange={handleInputChange}
                value={userGuess}
              />
            </div>
            <button type="submit" className="btn btn-outline-success mt-4">
              Check Answer
            </button>
            <button
              type="button"
              className="btn btn-outline-success mt-4"
              onClick={fetchRandomVerbConjugation}
            >
              Next Verb
            </button>
          </form>
          {isCorrectAnswer === "true" ? (
            <p className="display-5">Correct!</p>
          ) : isCorrectAnswer === "false" ? (
            <p className="display-5">Try again!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ConjugationInput;
