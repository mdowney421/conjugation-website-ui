"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import TimerStat from "../../components/TimerStat";
import CounterStat from "../../components/CounterStat";
import { fetchRandomWord } from "../../languages/api";
import type { LanguageDefinition } from "../../languages/registry";
import type { RandomWord } from "../../languages/types";

type FlashcardsClientProps = {
  code: string;
  definition: LanguageDefinition;
};

const FlashcardsClient = ({ code, definition }: FlashcardsClientProps) => {
  const [word, setWord] = useState<RandomWord | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seenCount, setSeenCount] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [showFlipHint, setShowFlipHint] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [scoreBump, setScoreBump] = useState(false);

  const loadNextWord = async () => {
    setIsLoading(true);
    setIsFlipped(false);
    const nextWord = await fetchRandomWord(code);
    setWord(nextWord ?? null);
    setIsLoading(false);
    setStartTime((prev) => prev ?? Date.now());
  };

  const toggleFlipped = () => {
    setShowFlipHint(false);
    setIsFlipped((flipped) => !flipped);
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

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setIsFlipped(false);
      const nextWord = await fetchRandomWord(code);
      if (cancelled) return;
      setWord(nextWord ?? null);
      setIsLoading(false);
      setStartTime((prev) => prev ?? Date.now());
    })();

    return () => {
      cancelled = true;
    };
  }, [code]);

  useEffect(() => {
    if (startTime === null) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (knownCount === 0) return;
    setScoreBump(true);
    const timeout = setTimeout(() => setScoreBump(false), 500);
    return () => clearTimeout(timeout);
  }, [knownCount]);

  return (
    <div className="page">
      <PageHeader
        title="Flashcards"
        subtitle={`Flip through the ${definition.wordCount} most common ${definition.displayName} words.`}
      />

      <div className="flashcards-card">
        {startTime !== null && (
          <div className="practice-stats">
            <TimerStat seconds={elapsedSeconds} label="time" />
            <CounterStat count={knownCount} total={seenCount} label="known" bump={scoreBump} />
          </div>
        )}

        {word && (
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
                  <span className="flashcard-word">{word.word_target}</span>
                </div>
                <div className="flashcard-face flashcard-face--back">
                  <span className="flashcard-word">{word.word_english}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!word && !isLoading && (
          <EmptyState>Couldn&apos;t load a word right now. Try again in a moment.</EmptyState>
        )}

        {isFlipped && (
          <div className="flashcards-controls">
            <Button variant="outline" onClick={handleDidntKnowIt} disabled={isLoading}>
              I didn&apos;t know it
            </Button>
            <Button onClick={handleKnewIt} disabled={isLoading}>
              I knew it
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsClient;
