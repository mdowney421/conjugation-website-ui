type TimerStatProps = {
  seconds: number;
  label: string;
  lowTime?: boolean;
};

const formatElapsedTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const TimerStat = ({ seconds, label, lowTime = false }: TimerStatProps) => (
  <div className={`stat-card stat-card--timer${lowTime ? " low-time" : ""}`}>
    <span className="stat-icon" aria-hidden="true">
      ⏱️
    </span>
    <span className="stat-value">{formatElapsedTime(seconds)}</span>
    <span className="stat-label">{label}</span>
  </div>
);

export default TimerStat;
