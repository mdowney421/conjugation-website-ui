import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";
import VerbTypeSelection from "../features/practice/VerbTypeSelection";
import TenseSelection from "../features/practice/TenseSelection";
import DurationSelection from "../features/practice/DurationSelection";
import ConjugationInput from "../features/practice/ConjugationInput";
import Confetti from "../features/practice/Confetti";
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
  const [scoreBump, setScoreBump] = useState<boolean>(false);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState<
    number | null | undefined
  >();
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const remainingSeconds =
    timeLimitSeconds != null
      ? Math.max(timeLimitSeconds - elapsedSeconds, 0)
      : null;

  useEffect(() => {
    if (startTime === null || isTimeUp) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isTimeUp]);

  useEffect(() => {
    if (timeLimitSeconds == null || isTimeUp) return;
    if (elapsedSeconds >= timeLimitSeconds) {
      setIsTimeUp(true);
    }
  }, [elapsedSeconds, timeLimitSeconds, isTimeUp]);

  useEffect(() => {
    if (!isTimeUp) return;
    setShowConfetti(true);
    const summaryTimeout = setTimeout(() => setShowSummary(true), 500);
    const confettiTimeout = setTimeout(() => setShowConfetti(false), 2800);
    return () => {
      clearTimeout(summaryTimeout);
      clearTimeout(confettiTimeout);
    };
  }, [isTimeUp]);

  useEffect(() => {
    if (correctCount === 0) return;
    setScoreBump(true);
    const timeout = setTimeout(() => setScoreBump(false), 500);
    return () => clearTimeout(timeout);
  }, [correctCount]);

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

  const handleTenseConfirm = () => {
    setQuestionNumber(5);
  };

  const handlePracticeAgain = () => {
    setCorrectCount(0);
    setQuestionsSeen(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setIsTimeUp(false);
    setShowConfetti(false);
    setShowSummary(false);
    setTimeLimitSeconds(undefined);
    setQuestionNumber(5);
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

  const isSetupStep = questionNumber >= 1 && questionNumber <= 5;

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
            <div
              className={`stat-card stat-card--timer${
                remainingSeconds !== null && remainingSeconds <= 10 && !isTimeUp
                  ? " low-time"
                  : ""
              }`}
            >
              <span className="stat-icon" aria-hidden="true">
                ⏱️
              </span>
              <span className="stat-value">
                {formatElapsedTime(remainingSeconds ?? elapsedSeconds)}
              </span>
              <span className="stat-label">
                {remainingSeconds !== null ? "left" : "time"}
              </span>
            </div>
            <div className={`stat-card stat-card--score${scoreBump ? " bump" : ""}`}>
              <span className="stat-icon" aria-hidden="true">
                🎯
              </span>
              <span className="stat-value">
                {correctCount}
                <span className="stat-value-of">/{questionsSeen}</span>
              </span>
              <span className="stat-label">correct</span>
            </div>
          </div>
        )}

        {isSetupStep && (
          <div className="step-progress">
            {[1, 2, 3, 4, 5].map((step) => (
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
            onConfirm={handleTenseConfirm}
          />
        )}

        {questionNumber === 5 && (
          <DurationSelection
            selectedSeconds={timeLimitSeconds}
            onSelect={setTimeLimitSeconds}
            onConfirm={fetchRandomVerbConjugation}
          />
        )}

        {questionNumber === 0 && !isTimeUp && (
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

        {showConfetti && <Confetti />}

        {isTimeUp && (
          <QuestionCard title="Time's up! 🎉">
            <div className={`time-up-content${showSummary ? " visible" : ""}`}>
              <div className="time-up-score">
                {correctCount}
                <span className="time-up-score-of">/{questionsSeen}</span>
              </div>
              <p className="time-up-summary">
                {Math.round((correctCount / questionsSeen) * 100)}% correct
              </p>
              <Button onClick={handlePracticeAgain}>Practice Again</Button>
            </div>
          </QuestionCard>
        )}
      </div>
    </>
  );
};

export default PracticePage;
