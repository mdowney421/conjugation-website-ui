"use client";

import { useState } from "react";
import Button from "../../components/Button";
import Confetti from "../../components/Confetti";
import CounterStat from "../../components/CounterStat";
import QuestionCard from "../../components/QuestionCard";
import type { GrammarCompareSide, GrammarQuizQuestion } from "../../languages/types";

type GrammarQuizProps = {
  questions: GrammarQuizQuestion[];
  sideA: GrammarCompareSide;
  sideB: GrammarCompareSide;
};

const shuffled = (questions: GrammarQuizQuestion[]) => {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const choiceClassName = (
  tone: "a" | "b",
  selectedTone: "a" | "b" | null,
  correctTone: "a" | "b",
) => {
  const isAnswered = selectedTone !== null;
  const classes = ["chip", "grammar-quiz-choice", `grammar-quiz-choice--${tone}`];
  if (selectedTone === tone) classes.push("selected");
  if (isAnswered && correctTone === tone) classes.push("correct");
  if (isAnswered && selectedTone === tone && correctTone !== tone) classes.push("incorrect");
  return classes.join(" ");
};

const GrammarQuiz = ({ questions, sideA, sideB }: GrammarQuizProps) => {
  const [order, setOrder] = useState(questions);
  const [index, setIndex] = useState(0);
  const [selectedTone, setSelectedTone] = useState<"a" | "b" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const question = order[index];
  const isAnswered = selectedTone !== null;
  const isCorrect = isAnswered && selectedTone === question.correctTone;

  const handleSelect = (tone: "a" | "b") => {
    if (isAnswered) return;
    setSelectedTone(tone);
    if (tone === question.correctTone) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (index + 1 >= order.length) {
      setIsComplete(true);
      if (correctCount === order.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2800);
      }
      return;
    }
    setIndex((prev) => prev + 1);
    setSelectedTone(null);
  };

  const handleRestart = () => {
    setOrder(shuffled(questions));
    setIndex(0);
    setSelectedTone(null);
    setCorrectCount(0);
    setIsComplete(false);
    setShowConfetti(false);
  };

  if (isComplete) {
    return (
      <QuestionCard title="Quiz complete">
        <div className="time-up-content visible">
          <div className="time-up-score">
            {correctCount}
            <span className="time-up-score-of">/{order.length}</span>
          </div>
          <p className="time-up-summary">
            {Math.round((correctCount / order.length) * 100)}% correct
          </p>
          <Button onClick={handleRestart}>Try again</Button>
        </div>
        {showConfetti && <Confetti />}
      </QuestionCard>
    );
  }

  return (
    <div className="grammar-quiz">
      <div className="grammar-quiz-header">
        <span className="grammar-quiz-progress">
          Question {index + 1} of {order.length}
        </span>
        <CounterStat count={correctCount} total={index + (isAnswered ? 1 : 0)} label="correct" />
      </div>

      <QuestionCard animationKey={index}>
        <p className="grammar-quiz-sentence">
          {question.before}
          <span className="grammar-quiz-blank">
            {isAnswered ? (
              <b className={`grammar-tone-${question.correctTone}`}>{question.correctForm}</b>
            ) : (
              "____"
            )}
          </span>
          {question.after}
        </p>
        <p className="grammar-quiz-infinitive">({question.infinitive})</p>

        <div className="choice-row">
          {([["a", sideA], ["b", sideB]] as const).map(([tone, side]) => (
            <button
              key={tone}
              type="button"
              className={choiceClassName(tone, selectedTone, question.correctTone)}
              onClick={() => handleSelect(tone)}
              disabled={isAnswered}
            >
              {side.label}
            </button>
          ))}
        </div>

        {isAnswered && (
          <>
            <div className={`feedback-banner ${isCorrect ? "correct" : "incorrect"}`}>
              {isCorrect ? "Correct" : "Not quite"}
            </div>
            <p className="grammar-quiz-explanation">{question.explanation}</p>
            <div className="quiz-actions">
              <Button onClick={handleNext}>
                {index + 1 >= order.length ? "See results" : "Next question"}
              </Button>
            </div>
          </>
        )}
      </QuestionCard>
    </div>
  );
};

export default GrammarQuiz;
