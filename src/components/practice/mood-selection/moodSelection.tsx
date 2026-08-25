export type MoodChoice = "indicative" | "subjunctive" | "both";

type MoodSelectionProps = {
  onSelect: (choice: MoodChoice) => void;
};

const MoodSelection = ({ onSelect }: MoodSelectionProps) => {
  return (
    <div className="question-card">
      <h2>Which mood do you want to practice?</h2>
      <div className="choice-row">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onSelect("indicative")}
        >
          Indicative
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onSelect("subjunctive")}
        >
          Subjunctive
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onSelect("both")}
        >
          Both
        </button>
      </div>
    </div>
  );
};

export default MoodSelection;
