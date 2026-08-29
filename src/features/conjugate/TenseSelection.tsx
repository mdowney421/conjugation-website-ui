"use client";

import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import type { Tense } from "../../languages/types";

type TenseSelectionProps = {
  tenseList: Tense[];
  tenseSelection: Tense[];
  tenseLabels: Record<Tense, string>;
  onToggleTense: (tense: Tense) => void;
  onToggleAllTenses: () => void;
  onConfirm: () => void;
};

const TenseSelection = ({
  tenseList,
  tenseSelection,
  tenseLabels,
  onToggleTense,
  onToggleAllTenses,
  onConfirm,
}: TenseSelectionProps) => {
  const allSelected = tenseSelection.length === tenseList.length;

  return (
    <QuestionCard title="Which tenses would you like to practice?">
      <div className="select-all-row">
        <Button variant="ghost" className="btn-sm" onClick={onToggleAllTenses}>
          {allSelected ? "Deselect all" : "Select all"}
        </Button>
      </div>
      <div className="chip-grid">
        {tenseList.map((tense) => (
          <button
            key={tense}
            type="button"
            className={`chip${tenseSelection.includes(tense) ? " selected" : ""}`}
            onClick={() => onToggleTense(tense)}
          >
            {tenseLabels[tense]}
          </button>
        ))}
      </div>
      <Button disabled={tenseSelection.length === 0} onClick={onConfirm}>
        Let's conjugate!
      </Button>
    </QuestionCard>
  );
};

export default TenseSelection;
