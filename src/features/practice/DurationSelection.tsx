import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";

export const DURATION_OPTIONS: { label: string; seconds: number | null }[] = [
  { label: "1 min", seconds: 60 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "No limit", seconds: null },
];

type DurationSelectionProps = {
  selectedSeconds: number | null | undefined;
  onSelect: (seconds: number | null) => void;
  onConfirm: () => void;
};

const DurationSelection = ({
  selectedSeconds,
  onSelect,
  onConfirm,
}: DurationSelectionProps) => {
  return (
    <QuestionCard title="How long do you want to practice?">
      <div className="chip-grid">
        {DURATION_OPTIONS.map((option) => (
          <button
            key={option.label}
            type="button"
            className={`chip${selectedSeconds === option.seconds ? " selected" : ""}`}
            onClick={() => onSelect(option.seconds)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <Button disabled={selectedSeconds === undefined} onClick={onConfirm}>
        Start practicing!
      </Button>
    </QuestionCard>
  );
};

export default DurationSelection;
