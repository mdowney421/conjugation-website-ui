const VerbTypeSelection = ({ prompt, onYes, onNo }) => {
  return (
    <div className="row">
      <p className="display-5">{prompt}</p>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-success mx-3"
            onClick={onYes}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-outline-success mx-3"
            onClick={onNo}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerbTypeSelection;
