"use client";

import { useState } from "react";
import GrammarQuiz from "./GrammarQuiz";
import type { GrammarCompareSide, GrammarQuizQuestion } from "../../languages/types";

type GrammarQuizSectionProps = {
  questions: GrammarQuizQuestion[];
  sideA: GrammarCompareSide;
  sideB: GrammarCompareSide;
  cta: { heading: string; body: string; buttonLabel: string };
};

// Keeps the quiz behind a CTA card instead of dropping straight into the
// first question -- reuses the same card styling the old bottom-of-page
// "practice conjugating" link had.
const GrammarQuizSection = ({ questions, sideA, sideB, cta }: GrammarQuizSectionProps) => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="grammar-cta-row">
        <div>
          <h3>{cta.heading}</h3>
          <p>{cta.body}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setStarted(true)}>
          {cta.buttonLabel}
        </button>
      </div>
    );
  }

  return <GrammarQuiz questions={questions} sideA={sideA} sideB={sideB} />;
};

export default GrammarQuizSection;
