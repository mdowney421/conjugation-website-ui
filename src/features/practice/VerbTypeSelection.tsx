"use client";

import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";

type VerbTypeSelectionProps = {
  prompt: string;
  onYes: () => void;
  onNo: () => void;
};

const VerbTypeSelection = ({ prompt, onYes, onNo }: VerbTypeSelectionProps) => {
  return (
    <QuestionCard title={prompt}>
      <div className="choice-row">
        <Button onClick={onYes}>Yes</Button>
        <Button variant="outline" onClick={onNo}>
          No
        </Button>
      </div>
    </QuestionCard>
  );
};

export default VerbTypeSelection;
