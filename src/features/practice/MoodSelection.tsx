import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";

export type MoodChoice = "indicative" | "subjunctive" | "both";

type MoodSelectionProps = {
  onSelect: (choice: MoodChoice) => void;
};

const MoodSelection = ({ onSelect }: MoodSelectionProps) => {
  return (
    <QuestionCard title="Which mood do you want to practice?">
      <div className="choice-row">
        <Button variant="outline" onClick={() => onSelect("indicative")}>
          Indicative
        </Button>
        <Button variant="outline" onClick={() => onSelect("subjunctive")}>
          Subjunctive
        </Button>
        <Button variant="outline" onClick={() => onSelect("both")}>
          Both
        </Button>
      </div>
    </QuestionCard>
  );
};

export default MoodSelection;
