import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import VerbTypeSelection from "../features/practice/VerbTypeSelection";
import TenseSelection from "../features/practice/TenseSelection";
import ConjugationInput from "../features/practice/ConjugationInput";
import { fetchRandomVerbConjugation as fetchVerb } from "../languages/spanish/api";
import type { Mood, Polarity, Tense, VerbConjugation } from "../languages/spanish/types";

const TENSES: Tense[] = [
  "present",
  "preterite",
  "imperfect",
  "perfect",
  "future",
  "future_perfect",
  "conditional",
  "conditional_perfect",
  "preterite_perfect",
  "pluperfect",
  "imperative",
];
// Preterite, future, conditional (simple and perfect), and preterite
// perfect have no subjunctive form in Spanish at all. Imperfect,
// perfect, and pluperfect do (and this app supports them), so they're
// excluded from this list. The imperative isn't in this list either --
// it doesn't have a mood axis at all, so it's handled separately (see
// IMPERATIVE_TENSE below).
const INDICATIVE_ONLY_TENSES: Tense[] = [
  "preterite",
  "future",
  "future_perfect",
  "conditional",
  "conditional_perfect",
  "preterite_perfect",
];
// The imperative doesn't have indicative/subjunctive forms -- it has
// affirmative/negative ones instead, resolved by resolvePolarity below.
const IMPERATIVE_TENSE: Tense = "imperative";

const PracticePage = () => {
  const [useIrregularVerbs, setUseIrregularVerbs] = useState<
    boolean | undefined
  >();
  const [useVosotros, setUseVosotros] = useState<boolean | undefined>();
  const [useSubjunctive, setUseSubjunctive] = useState<boolean | undefined>();
  const [tenseSelection, setTenseSelection] = useState<Tense[]>([]);
  const [randomVerb, setRandomVerb] = useState<VerbConjugation | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [hasMissed, setHasMissed] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [questionsSeen, setQuestionsSeen] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (startTime === null) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleIrregularityQuestion = (userResponse: boolean) => {
    setUseIrregularVerbs(userResponse);
    setQuestionNumber(2);
  };

  const handleVosotrosQuestion = (userResponse: boolean) => {
    setUseVosotros(userResponse);
    setQuestionNumber(3);
  };

  const handleSubjunctiveQuestion = (userResponse: boolean) => {
    setUseSubjunctive(userResponse);
    setQuestionNumber(4);
  };

  const handleToggleTense = (tense: Tense) => {
    setTenseSelection((prev) =>
      prev.includes(tense)
        ? prev.filter((selected) => selected !== tense)
        : [...prev, tense],
    );
  };

  const resolveTense = (): Tense =>
    tenseSelection[Math.floor(Math.random() * tenseSelection.length)];

  const resolveMood = (resolvedTense: Tense): Mood => {
    // Preterite (and its INDICATIVE_ONLY_TENSES siblings) have no
    // subjunctive form in this app, so any round that lands on one of
    // them always uses the indicative. Same story for the imperative,
    // which doesn't have a mood axis at all. Every other tense is
    // randomized so a multi-tense practice session sees both moods --
    // unless the user opted out of the subjunctive during setup, in
    // which case every round stays indicative.
    if (
      (INDICATIVE_ONLY_TENSES as Tense[]).includes(resolvedTense) ||
      resolvedTense === IMPERATIVE_TENSE ||
      !useSubjunctive
    ) {
      return "indicative";
    }
    return Math.random() < 0.5 ? "indicative" : "subjunctive";
  };

  const resolvePolarity = (resolvedTense: Tense): Polarity => {
    // Polarity only means anything for the imperative -- the backend
    // ignores it for every other tense, so the exact value here
    // doesn't matter when resolvedTense isn't "imperative".
    if (resolvedTense !== IMPERATIVE_TENSE) {
      return "affirmative";
    }
    return Math.random() < 0.5 ? "affirmative" : "negative";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
    if (isCorrectAnswer === "false") {
      setIsCorrectAnswer("");
    }
  };

  const handleSubmitGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCorrectAnswer === "true") {
      fetchRandomVerbConjugation();
      return;
    }

    if (showAnswer) {
      return;
    }

    const correct =
      userGuess === randomVerb?.form_spanish ||
      (!!randomVerb?.form_spanish_alt && userGuess === randomVerb.form_spanish_alt);
    setIsCorrectAnswer(correct ? "true" : "false");
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setHasMissed(true);
    }
  };

  const fetchRandomVerbConjugation = async () => {
    const tense = resolveTense();
    const verb = await fetchVerb(
      useIrregularVerbs,
      useVosotros,
      resolveMood(tense),
      tense,
      resolvePolarity(tense),
    );
    setRandomVerb(verb ?? null);
    setQuestionNumber(0);
    setIsCorrectAnswer("");
    setUserGuess("");
    setShowHint(false);
    setShowAnswer(false);
    setHasMissed(false);
    setQuestionsSeen((prev) => prev + 1);
    setStartTime((prev) => prev ?? Date.now());
  };

  const isSetupStep = questionNumber >= 1 && questionNumber <= 4;

  const formatElapsedTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <PageHeader
        title="Practice"
        subtitle="Answer a few quick questions, then start conjugating."
      />

      <div className="practice-card">
        {startTime !== null && (
          <div className="practice-stats">
            <span className="stat-item">⏱ {formatElapsedTime(elapsedSeconds)}</span>
            <span className="stat-item">
              ✓ {correctCount}/{questionsSeen} correct
            </span>
          </div>
        )}

        {isSetupStep && (
          <div className="step-progress">
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={`step-dot${
                  step === questionNumber
                    ? " active"
                    : step < questionNumber
                      ? " done"
                      : ""
                }`}
              />
            ))}
          </div>
        )}

        {questionNumber === 1 && (
          <VerbTypeSelection
            prompt="Do you want irregular verbs?"
            onYes={() => handleIrregularityQuestion(true)}
            onNo={() => handleIrregularityQuestion(false)}
          />
        )}

        {questionNumber === 2 && (
          <VerbTypeSelection
            prompt='Do you want to include "vosotros"?'
            onYes={() => handleVosotrosQuestion(true)}
            onNo={() => handleVosotrosQuestion(false)}
          />
        )}

        {questionNumber === 3 && (
          <VerbTypeSelection
            prompt="Do you want to practice the subjunctive mood?"
            onYes={() => handleSubjunctiveQuestion(true)}
            onNo={() => handleSubjunctiveQuestion(false)}
          />
        )}

        {questionNumber === 4 && (
          <TenseSelection
            tenseList={TENSES}
            tenseSelection={tenseSelection}
            onToggleTense={handleToggleTense}
            onConfirm={fetchRandomVerbConjugation}
          />
        )}

        {questionNumber === 0 && (
          <ConjugationInput
            randomVerb={randomVerb}
            handleInputChange={handleInputChange}
            handleSubmitGuess={handleSubmitGuess}
            isCorrectAnswer={isCorrectAnswer}
            fetchRandomVerbConjugation={fetchRandomVerbConjugation}
            userGuess={userGuess}
            showHint={showHint}
            onShowHint={() => setShowHint(true)}
            showAnswer={showAnswer}
            onShowAnswer={() => setShowAnswer(true)}
            hasMissed={hasMissed}
          />
        )}
      </div>
    </>
  );
};

export default PracticePage;
