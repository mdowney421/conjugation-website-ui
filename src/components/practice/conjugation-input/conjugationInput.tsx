import { useEffect, useRef, type ChangeEvent, type FormEvent } from "react";

type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
  pronoun_english?: string;
  infinitive_spanish?: string;
};

type ConjugationInputProps = {
  randomVerb: VerbConjugation | null;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitGuess: (event: FormEvent<HTMLFormElement>) => void;
  isCorrectAnswer: string;
  fetchRandomVerbConjugation: () => void;
  userGuess: string;
  showHint: boolean;
  onShowHint: () => void;
  hasMissed: boolean;
};

const ConjugationInput = ({
  randomVerb,
  handleInputChange,
  handleSubmitGuess,
  isCorrectAnswer,
  fetchRandomVerbConjugation,
  userGuess,
  showHint,
  onShowHint,
  hasMissed,
}: ConjugationInputProps) => {
  const isCorrect = isCorrectAnswer === "true";
  const inputStateClass =
    isCorrectAnswer === "true"
      ? " correct"
      : isCorrectAnswer === "false"
        ? " incorrect"
        : "";

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [randomVerb, isCorrect]);

  return (
    <div className="question-card">
      <div className="quiz-prompt">Conjugate</div>
      {randomVerb?.pronoun_english && (
        <div className="quiz-pronoun">{randomVerb.pronoun_english}</div>
      )}
      <div className="quiz-word">{randomVerb?.form_english ?? "..."}</div>

      <form onSubmit={handleSubmitGuess}>
        <input
          ref={inputRef}
          type="text"
          className={`quiz-input${inputStateClass}`}
          id="conjugationGuess"
          placeholder="Enter your conjugation"
          onChange={handleInputChange}
          value={userGuess}
          autoComplete="off"
          readOnly={isCorrect}
        />

        <div className="quiz-actions">
          {!isCorrect && (
            <button type="submit" className="btn btn-primary">
              Check Answer
            </button>
          )}

          {hasMissed && !showHint && !isCorrect && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onShowHint}
            >
              Show Hint
            </button>
          )}

          {(hasMissed || isCorrect) && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => fetchRandomVerbConjugation()}
            >
              Next Verb
            </button>
          )}
        </div>
      </form>

      {isCorrectAnswer === "true" && (
        <div className="feedback-banner correct">✓ Correct!</div>
      )}
      {isCorrectAnswer === "false" && (
        <div className="feedback-banner incorrect">✗ Incorrect</div>
      )}
      {showHint && randomVerb?.infinitive_spanish && (
        <div className="hint-text">
          Hint: the infinitive is <strong>{randomVerb.infinitive_spanish}</strong>
        </div>
      )}
    </div>
  );
};

export default ConjugationInput;
