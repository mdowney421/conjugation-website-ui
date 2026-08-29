"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/PageHeader";
import QuestionCard from "../../components/QuestionCard";
import Button from "../../components/Button";
import TimerStat from "../../components/TimerStat";
import CounterStat from "../../components/CounterStat";
import VerbTypeSelection from "./VerbTypeSelection";
import MoodSelection, { type MoodChoice } from "./MoodSelection";
import TenseSelection from "./TenseSelection";
import DurationSelection from "./DurationSelection";
import ConjugationInput from "./ConjugationInput";
import Confetti from "./Confetti";
import { fetchRandomVerbConjugation as fetchVerb } from "../../languages/api";
import type { LanguageDefinition } from "../../languages/registry";
import type { Mood, Polarity, Tense, VerbConjugation } from "../../languages/types";

// The imperative doesn't have indicative/subjunctive forms -- it has
// affirmative/negative ones instead, resolved by resolvePolarity below.
// Universal across languages, so it isn't part of per-language config.
const IMPERATIVE_TENSE: Tense = "imperative";

type SetupStep =
  | { kind: "irregular" }
  | { kind: "toggle"; key: string; prompt: string }
  | { kind: "subjunctive" }
  | { kind: "tenses" }
  | { kind: "duration" };

type ConjugateClientProps = {
  code: string;
  definition: LanguageDefinition;
};

const ConjugateClient = ({ code, definition }: ConjugateClientProps) => {
  const tenseList = useMemo(
    () => Object.keys(definition.tenseLabels) as Tense[],
    [definition],
  );
  const steps = useMemo<SetupStep[]>(
    () => [
      { kind: "irregular" },
      ...definition.extraToggles.map((toggle) => ({
        kind: "toggle" as const,
        key: toggle.key,
        prompt: toggle.prompt,
      })),
      ...(definition.hasSubjunctive ? [{ kind: "subjunctive" as const }] : []),
      { kind: "tenses" },
      { kind: "duration" },
    ],
    [definition],
  );

  const [useIrregularVerbs, setUseIrregularVerbs] = useState<
    boolean | undefined
  >();
  const [toggleAnswers, setToggleAnswers] = useState<Record<string, boolean>>({});
  const [moodSelection, setMoodSelection] = useState<MoodChoice | undefined>();
  const [tenseSelection, setTenseSelection] = useState<Tense[]>([]);
  const [randomVerb, setRandomVerb] = useState<VerbConjugation | null>(null);
  const [stepIndex, setStepIndex] = useState<number>(0);
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
    setStepIndex((i) => i + 1);
  };

  const handleToggleAnswer = (key: string, userResponse: boolean) => {
    setToggleAnswers((prev) => ({ ...prev, [key]: userResponse }));
    setStepIndex((i) => i + 1);
  };

  const handleMoodSelection = (choice: MoodChoice) => {
    setMoodSelection(choice);
    setStepIndex((i) => i + 1);
  };

  const handleToggleTense = (tense: Tense) => {
    setTenseSelection((prev) =>
      prev.includes(tense)
        ? prev.filter((selected) => selected !== tense)
        : [...prev, tense],
    );
  };

  const handleToggleAllTenses = () => {
    setTenseSelection((prev) => (prev.length === tenseList.length ? [] : tenseList));
  };

  const handleTenseConfirm = () => {
    setStepIndex((i) => i + 1);
  };

  const handleConjugateAgain = () => {
    setCorrectCount(0);
    setQuestionsSeen(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setIsTimeUp(false);
    setShowConfetti(false);
    setShowSummary(false);
    setTimeLimitSeconds(undefined);
    setStepIndex(steps.length - 1);
  };

  const resolveTense = (): Tense =>
    tenseSelection[Math.floor(Math.random() * tenseSelection.length)];

  const resolveMood = (resolvedTense: Tense): Mood => {
    // Tenses with no subjunctive form in this language always use the
    // indicative, and so does the imperative, which doesn't have a mood
    // axis at all -- regardless of what the user picked during setup.
    if (
      definition.indicativeOnlyTenses.includes(resolvedTense) ||
      resolvedTense === IMPERATIVE_TENSE
    ) {
      return "indicative";
    }
    if (moodSelection === "both") {
      return Math.random() < 0.5 ? "indicative" : "subjunctive";
    }
    return moodSelection === "subjunctive" ? "subjunctive" : "indicative";
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

    const normalizedGuess = userGuess.trim().toLowerCase();
    const correct =
      normalizedGuess === randomVerb?.form_target?.trim().toLowerCase() ||
      (!!randomVerb?.form_target_alt &&
        normalizedGuess === randomVerb.form_target_alt.trim().toLowerCase());
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
      code,
      useIrregularVerbs,
      toggleAnswers["useRegionalVariant"],
      resolveMood(tense),
      tense,
      resolvePolarity(tense),
    );
    setRandomVerb(verb ?? null);
    setStepIndex(steps.length);
    setIsCorrectAnswer("");
    setUserGuess("");
    setShowHint(false);
    setShowAnswer(false);
    setHasMissed(false);
    setQuestionsSeen((prev) => prev + 1);
    setStartTime((prev) => prev ?? Date.now());
  };

  const isSetupStep = stepIndex < steps.length;
  const isActiveConjugation = stepIndex === steps.length;
  const currentStep = isSetupStep ? steps[stepIndex] : null;

  return (
    <div className="page">
      <PageHeader
        title="Conjugate"
        subtitle="Answer a few quick questions, then start conjugating."
      />

      <div className="practice-card">
        {startTime !== null && (
          <div className="practice-stats">
            <TimerStat
              seconds={remainingSeconds ?? elapsedSeconds}
              label={remainingSeconds !== null ? "left" : "time"}
              lowTime={remainingSeconds !== null && remainingSeconds <= 10 && !isTimeUp}
            />
            <CounterStat
              count={correctCount}
              total={questionsSeen}
              label="correct"
              bump={scoreBump}
            />
          </div>
        )}

        {isSetupStep && (
          <div className="step-progress">
            {steps.map((_, index) => (
              <span
                key={index}
                className={`step-dot${
                  index === stepIndex
                    ? " active"
                    : index < stepIndex
                      ? " done"
                      : ""
                }`}
              />
            ))}
          </div>
        )}

        {currentStep?.kind === "irregular" && (
          <VerbTypeSelection
            prompt="Do you want irregular verbs?"
            onYes={() => handleIrregularityQuestion(true)}
            onNo={() => handleIrregularityQuestion(false)}
          />
        )}

        {currentStep?.kind === "toggle" && (
          <VerbTypeSelection
            prompt={currentStep.prompt}
            onYes={() => handleToggleAnswer(currentStep.key, true)}
            onNo={() => handleToggleAnswer(currentStep.key, false)}
          />
        )}

        {currentStep?.kind === "subjunctive" && (
          <MoodSelection onSelect={handleMoodSelection} />
        )}

        {currentStep?.kind === "tenses" && (
          <TenseSelection
            tenseList={tenseList}
            tenseLabels={definition.tenseLabels}
            tenseSelection={tenseSelection}
            onToggleTense={handleToggleTense}
            onToggleAllTenses={handleToggleAllTenses}
            onConfirm={handleTenseConfirm}
          />
        )}

        {currentStep?.kind === "duration" && (
          <DurationSelection
            selectedSeconds={timeLimitSeconds}
            onSelect={setTimeLimitSeconds}
            onConfirm={fetchRandomVerbConjugation}
          />
        )}

        {isActiveConjugation && !isTimeUp && (
          <ConjugationInput
            randomVerb={randomVerb}
            tenseLabels={definition.tenseLabels}
            accentChars={definition.accentChars}
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
            questionKey={questionsSeen}
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
              <Button onClick={handleConjugateAgain}>Conjugate Again</Button>
            </div>
          </QuestionCard>
        )}
      </div>
    </div>
  );
};

export default ConjugateClient;
