import { useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import type { Tense, VerbConjugation } from "../../languages/spanish/types";

const TENSE_LABELS: Record<Tense, string> = {
  present: "Present",
  preterite: "Preterite",
  imperfect: "Imperfect",
  perfect: "Perfect",
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
  showAnswer: boolean;
  onShowAnswer: () => void;
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
  showAnswer,
  onShowAnswer,
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
    <QuestionCard>
      <div className="quiz-prompt">Conjugate</div>
      {(randomVerb?.tense_english || randomVerb?.mood_english) && (
        <div className="quiz-badges">
          {randomVerb?.tense_english && (
            <div className={`quiz-mood ${randomVerb.tense_english}`}>
              {TENSE_LABELS[randomVerb.tense_english]}
            </div>
          )}
          {randomVerb?.mood_english && (
            <div className={`quiz-mood ${randomVerb.mood_english}`}>
              {randomVerb.mood_english === "subjunctive"
                ? "Subjunctive"
                : "Indicative"}
            </div>
          )}
        </div>
      )}
      <div className="quiz-sentence">
        {randomVerb?.pronoun_english && (
          <span className="quiz-pronoun">{randomVerb.pronoun_english}</span>
        )}
        <span className="quiz-word">{randomVerb?.form_english ?? "..."}</span>
      </div>

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
          {!isCorrect && <Button type="submit">Check Answer</Button>}

          {hasMissed && !showAnswer && !isCorrect && (
            <Button
              variant="ghost"
              onClick={showHint ? onShowAnswer : onShowHint}
            >
              {showHint ? "Show Answer" : "Show Hint"}
            </Button>
          )}

          {(hasMissed || isCorrect) && (
            <Button
              variant="outline"
              onClick={() => fetchRandomVerbConjugation()}
            >
              Next Verb
            </Button>
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
      {showAnswer && randomVerb?.form_spanish && (
        <div className="hint-text">
          Answer: <strong>{randomVerb.form_spanish}</strong>
          {randomVerb.form_spanish_alt && (
            <>
              {" "}
              (or <strong>{randomVerb.form_spanish_alt}</strong>)
            </>
          )}
        </div>
      )}
    </QuestionCard>
  );
};

export default ConjugationInput;
