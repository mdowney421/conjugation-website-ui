import type { ChangeEvent, FormEvent } from "react";

type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
  pronoun_english?: string;
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
  const inputStateClass =
    isCorrectAnswer === "true"
      ? " correct"
      : isCorrectAnswer === "false"
        ? " incorrect"
        : "";

  return (
    <div className="question-card">
      <div className="quiz-prompt">Conjugate</div>
      {randomVerb?.pronoun_english && (
        <div className="quiz-pronoun">{randomVerb.pronoun_english}</div>
      )}
      <div className="quiz-word">{randomVerb?.form_english ?? "..."}</div>

      <form onSubmit={handleSubmitGuess}>
        <input
          type="text"
          className={`quiz-input${inputStateClass}`}
          id="conjugationGuess"
          placeholder="Enter your conjugation"
          onChange={handleInputChange}
          value={userGuess}
          autoComplete="off"
          autoFocus
        />

        <div className="quiz-actions">
          <button type="submit" className="btn btn-primary">
            Check Answer
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={fetchRandomVerbConjugation}
          >
            Next Verb
          </button>
        </div>
      </form>

      {isCorrectAnswer === "true" && (
        <div className="feedback-banner correct">✓ Correct!</div>
      )}
      {isCorrectAnswer === "false" && (
        <div className="feedback-banner incorrect">✗ Try again!</div>
      )}
    </div>
  );
};

export default ConjugationInput;
