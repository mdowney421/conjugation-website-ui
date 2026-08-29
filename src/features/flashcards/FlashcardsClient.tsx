"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
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

  const loadNextWord = async () => {
    setIsLoading(true);
    setIsFlipped(false);
    const nextWord = await fetchRandomWord(code);
    setWord(nextWord ?? null);
    setIsLoading(false);
    setSeenCount((prev) => prev + 1);
  };

  const handleKnewIt = () => {
    setKnownCount((prev) => prev + 1);
    loadNextWord();
  };

  const handleDidntKnowIt = () => {
    loadNextWord();
  };

  useEffect(() => {
    loadNextWord();
  }, [code]);

  return (
    <div className="page">
      <PageHeader
        title="Flashcards"
        subtitle={`Flip through the ${definition.wordCount} most common ${definition.displayName} words.`}
      />

      <div className="flashcards-card">
        {word && (
          <div
            className={`flashcard${isFlipped ? " flipped" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => setIsFlipped((flipped) => !flipped)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsFlipped((flipped) => !flipped);
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

        {seenCount > 0 && (
          <span className="flashcards-count">
            {knownCount}/{seenCount} known
          </span>
        )}
      </div>
    </div>
  );
};

export default FlashcardsClient;
