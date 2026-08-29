"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import QuestionCard from "../../components/QuestionCard";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import TimerStat from "../../components/TimerStat";
import CounterStat from "../../components/CounterStat";
import Confetti from "../../components/Confetti";
import CategorySelection, { formatCategory } from "./CategorySelection";
import { fetchRandomWord, fetchWordCategories } from "../../languages/api";
import type { LanguageDefinition } from "../../languages/registry";
import type { RandomWord } from "../../languages/types";

type FlashcardsClientProps = {
  code: string;
  definition: LanguageDefinition;
};

type Direction = "target-to-english" | "english-to-target";

const FlashcardsClient = ({ code, definition }: FlashcardsClientProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null | undefined>(undefined);
  const [word, setWord] = useState<RandomWord | null>(null);
  const [direction, setDirection] = useState<Direction>("target-to-english");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seenCount, setSeenCount] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [showFlipHint, setShowFlipHint] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [elapsedOffsetSeconds, setElapsedOffsetSeconds] = useState(0);
  const [scoreBump, setScoreBump] = useState(false);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState<
    number | null | undefined
  >(undefined);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const remainingSeconds =
    timeLimitSeconds != null
      ? Math.max(timeLimitSeconds - elapsedSeconds, 0)
      : null;
  // "No limit" counts up from the moment it was chosen, not from whenever
  // the session actually started (which may have been earlier, while the
  // timer still read "Set timer").
  const displayedElapsedSeconds = elapsedSeconds - elapsedOffsetSeconds;

  const loadNextWord = async () => {
    setIsLoading(true);
    setIsFlipped(false);
    const nextWord = await fetchRandomWord(code, category ?? undefined);
    setWord(nextWord ?? null);
    setIsLoading(false);
    setStartTime((prev) => prev ?? Date.now());
  };

  const toggleFlipped = () => {
    setShowFlipHint(false);
    setIsFlipped((flipped) => !flipped);
  };

  const handleSetDirection = (next: Direction) => {
    setDirection(next);
    setIsFlipped(false);
  };

  const handleKnewIt = () => {
    setKnownCount((prev) => prev + 1);
    setSeenCount((prev) => prev + 1);
    loadNextWord();
  };

  const handleDidntKnowIt = () => {
    setSeenCount((prev) => prev + 1);
    loadNextWord();
  };

  const handleChooseTimeLimit = (minutes: number | null) => {
    if (minutes === null) {
      setElapsedOffsetSeconds(elapsedSeconds);
      setTimeLimitSeconds(null);
    } else {
      setTimeLimitSeconds(elapsedSeconds + minutes * 60);
    }
  };

  const handleStudyAgain = () => {
    setSeenCount(0);
    setKnownCount(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setElapsedOffsetSeconds(0);
    setIsTimeUp(false);
    setShowConfetti(false);
    setShowSummary(false);
    setTimeLimitSeconds(undefined);
    loadNextWord();
  };

  useEffect(() => {
    let cancelled = false;
    setCategories([]);
    setCategory(undefined);

    (async () => {
      const list = await fetchWordCategories(code);
      if (!cancelled) setCategories(list);
    })();

    return () => {
      cancelled = true;
    };
  }, [code]);

  useEffect(() => {
    if (category === undefined) return;
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setIsFlipped(false);
      const nextWord = await fetchRandomWord(code, category ?? undefined);
      if (cancelled) return;
      setWord(nextWord ?? null);
      setIsLoading(false);
      setStartTime((prev) => prev ?? Date.now());
    })();

    return () => {
      cancelled = true;
    };
  }, [code, category]);

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
    if (knownCount === 0) return;
    setScoreBump(true);
    const timeout = setTimeout(() => setScoreBump(false), 500);
    return () => clearTimeout(timeout);
  }, [knownCount]);

  const isSetupStep = category === undefined;

  return (
    <div className="page">
      <PageHeader
        title="Flashcards"
        subtitle={
          category
            ? `Flip through ${definition.displayName} words in the "${formatCategory(category)}" category.`
            : `Flip through the ${definition.wordCount} most common ${definition.displayName} words.`
        }
      />

      <div className="flashcards-card">
        {isSetupStep ? (
          categories.length > 0 && (
            <CategorySelection categories={categories} onSelect={setCategory} />
          )
        ) : (
          <>
            {!isTimeUp && (
              <div className="direction-toggle">
                <button
                  type="button"
                  role="switch"
                  aria-checked={direction === "english-to-target"}
                  aria-label="Flashcard practice direction"
                  className="lang-toggle"
                  onClick={() =>
                    handleSetDirection(
                      direction === "target-to-english"
                        ? "english-to-target"
                        : "target-to-english",
                    )
                  }
                >
                  <span
                    className={`lang-toggle-thumb${
                      direction === "english-to-target" ? " right" : ""
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`lang-toggle-label${
                      direction === "target-to-english" ? " active" : ""
                    }`}
                  >
                    {definition.displayName}
                  </span>
                  <span
                    className={`lang-toggle-label${
                      direction === "english-to-target" ? " active" : ""
                    }`}
                  >
                    English
                  </span>
                </button>
              </div>
            )}

            {startTime !== null && (
              <div className="practice-stats">
                <TimerStat
                  seconds={remainingSeconds ?? displayedElapsedSeconds}
                  label={remainingSeconds !== null ? "left" : "time"}
                  lowTime={remainingSeconds !== null && remainingSeconds <= 10 && !isTimeUp}
                  currentLimitMinutes={
                    timeLimitSeconds === undefined
                      ? undefined
                      : timeLimitSeconds === null
                        ? null
                        : Math.round((timeLimitSeconds - elapsedSeconds) / 60)
                  }
                  onSetLimitMinutes={isTimeUp ? undefined : handleChooseTimeLimit}
                />
                <CounterStat count={knownCount} total={seenCount} label="known" bump={scoreBump} />
              </div>
            )}

            {word && !isTimeUp && (
              <div className="flashcard-wrap">
                {showFlipHint && (
                  <div className="flip-hint" aria-hidden="true">
                    <span className="flip-hint-bubble">Click to flip!</span>
                    <svg
                      className="flip-hint-arrow"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4V28"
                        stroke="var(--color-primary)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 20L20 32L32 20"
                        stroke="var(--color-primary)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <div
                  className={`flashcard${isFlipped ? " flipped" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={toggleFlipped}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleFlipped();
                    }
                  }}
                  aria-label="Flip flashcard"
                  key={word.rank}
                >
                  <div className="flashcard-inner">
                    <div className="flashcard-face flashcard-face--front">
                      <span className="flashcard-word">
                        {direction === "target-to-english"
                          ? word.word_target
                          : word.word_english}
                      </span>
                    </div>
                    <div className="flashcard-face flashcard-face--back">
                      <span className="flashcard-word">
                        {direction === "target-to-english"
                          ? word.word_english
                          : word.word_target}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!word && !isLoading && !isTimeUp && (
              <EmptyState>Couldn&apos;t load a word right now. Try again in a moment.</EmptyState>
            )}

            {isFlipped && !isTimeUp && (
              <div className="flashcards-controls">
                <Button variant="outline" onClick={handleDidntKnowIt} disabled={isLoading}>
                  I didn&apos;t know it
                </Button>
                <Button onClick={handleKnewIt} disabled={isLoading}>
                  I knew it
                </Button>
              </div>
            )}

            {showConfetti && <Confetti />}

            {isTimeUp && (
              <QuestionCard title="Time's up! 🎉">
                <div className={`time-up-content${showSummary ? " visible" : ""}`}>
                  <div className="time-up-score">
                    {knownCount}
                    <span className="time-up-score-of">/{seenCount}</span>
                  </div>
                  <p className="time-up-summary">
                    {seenCount > 0
                      ? `${Math.round((knownCount / seenCount) * 100)}% known`
                      : "No words answered yet"}
                  </p>
                  <Button onClick={handleStudyAgain}>Study Again</Button>
                </div>
              </QuestionCard>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardsClient;
