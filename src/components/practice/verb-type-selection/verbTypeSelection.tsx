type VerbTypeSelectionProps = {
  prompt: string;
  onYes: () => void;
  onNo: () => void;
};

const VerbTypeSelection = ({ prompt, onYes, onNo }: VerbTypeSelectionProps) => {
  return (
    <div className="question-card">
      <h2>{prompt}</h2>
      <div className="choice-row">
        <button type="button" className="btn btn-primary" onClick={onYes}>
          Yes
        </button>
        <button type="button" className="btn btn-outline" onClick={onNo}>
          No
        </button>
      </div>
    </div>
  );
};

export default VerbTypeSelection;
