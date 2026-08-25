import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import { TENSE_LABELS } from "../../languages/spanish/types";
import type { Tense } from "../../languages/spanish/types";

type TenseSelectionProps = {
  tenseList: Tense[];
  tenseSelection: Tense[];
  onToggleTense: (tense: Tense) => void;
  onConfirm: () => void;
};

const TenseSelection = ({
  tenseList,
  tenseSelection,
  onToggleTense,
  onConfirm,
}: TenseSelectionProps) => {
  return (
    <QuestionCard title="Which tenses would you like to practice?">
      <div className="chip-grid">
        {tenseList.map((tense) => (
          <button
            key={tense}
            type="button"
            className={`chip${tenseSelection.includes(tense) ? " selected" : ""}`}
            onClick={() => onToggleTense(tense)}
          >
            {TENSE_LABELS[tense]}
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
