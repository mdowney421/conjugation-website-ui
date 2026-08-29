type CounterStatProps = {
  count: number;
  total: number;
  label: string;
  bump?: boolean;
};

const CounterStat = ({ count, total, label, bump = false }: CounterStatProps) => (
  <div className={`stat-card stat-card--score${bump ? " bump" : ""}`}>
    <span className="stat-icon" aria-hidden="true">
      🎯
    </span>
    <span className="stat-value">
      {count}
      <span className="stat-value-of">/{total}</span>
    </span>
    <span className="stat-label">{label}</span>
  </div>
);

export default CounterStat;
