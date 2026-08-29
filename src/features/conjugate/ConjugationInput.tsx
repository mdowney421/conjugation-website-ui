"use client";

import { useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import type { Tense, VerbConjugation } from "../../languages/types";

type ConjugationInputProps = {
  randomVerb: VerbConjugation | null;
  tenseLabels: Record<Tense, string>;
  accentChars: string[];
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
  questionKey: number;
};

const ConjugationInput = ({
  randomVerb,
  tenseLabels,
  accentChars,
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
  questionKey,
}: ConjugationInputProps) => {
  const isCorrect = isCorrectAnswer === "true";
  const isLocked = isCorrect || showAnswer;
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

  const insertChar = (char: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart ?? userGuess.length;
    const end = input.selectionEnd ?? userGuess.length;
    input.value = userGuess.slice(0, start) + char + userGuess.slice(end);
    handleInputChange({ target: input } as ChangeEvent<HTMLInputElement>);

    const cursor = start + char.length;
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <QuestionCard animationKey={questionKey}>
      {(randomVerb?.tense || randomVerb?.mood) && (
        <div className="quiz-badges">
          {randomVerb?.tense && (
            <div className={`quiz-mood ${randomVerb.tense}`}>
              {tenseLabels[randomVerb.tense]}
            </div>
          )}
          {randomVerb?.tense === "imperative" && randomVerb?.polarity ? (
            <div className={`quiz-mood ${randomVerb.polarity}`}>
              {randomVerb.polarity === "negative"
                ? "Negative"
                : "Affirmative"}
            </div>
          ) : (
            randomVerb?.mood && (
              <div className={`quiz-mood ${randomVerb.mood}`}>
                {randomVerb.mood === "subjunctive"
                  ? "Subjunctive"
                  : "Indicative"}
              </div>
            )
          )}
        </div>
      )}
      <div className="quiz-sentence">
        {randomVerb?.mood === "subjunctive" &&
          randomVerb?.tense !== "imperative" && (
            <span className="quiz-subjunctive-marker">(that)</span>
          )}
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
          placeholder="Enter your translation"
          onChange={handleInputChange}
          value={userGuess}
          autoComplete="off"
          readOnly={isLocked}
        />

        {!isLocked && (
          <div className="accent-toolbar">
            {accentChars.map((char) => (
              <button
                key={char}
                type="button"
                className="accent-btn"
                tabIndex={-1}
                onClick={() => insertChar(char)}
              >
                {char}
              </button>
            ))}
          </div>
        )}

        <div className="quiz-actions">
          {!isLocked && <Button type="submit">Check Answer</Button>}

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
      {showHint && randomVerb?.infinitive_target && (
        <div className="hint-text">
          Hint: the infinitive is <strong>{randomVerb.infinitive_target}</strong>
        </div>
      )}
      {showAnswer && randomVerb?.form_target && (
        <div className="hint-text">
          Answer: <strong>{randomVerb.form_target}</strong>
          {randomVerb.form_target_alt && (
            <>
              {" "}
              (or <strong>{randomVerb.form_target_alt}</strong>)
            </>
          )}
        </div>
      )}
    </QuestionCard>
  );
};

export default ConjugationInput;
