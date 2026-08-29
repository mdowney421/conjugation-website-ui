"use client";

import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import type { Mood } from "../../languages/types";

export type MoodChoice = Mood | "both";

type MoodSelectionProps = {
  onSelect: (choice: MoodChoice) => void;
};

const MoodSelection = ({ onSelect }: MoodSelectionProps) => {
  return (
    <QuestionCard title="Which mood would you like to practice?">
      <div className="choice-row">
        <Button onClick={() => onSelect("indicative")}>Indicative</Button>
        <Button onClick={() => onSelect("subjunctive")}>Subjunctive</Button>
        <Button variant="outline" onClick={() => onSelect("both")}>
          Both
        </Button>
      </div>
    </QuestionCard>
  );
};

export default MoodSelection;
