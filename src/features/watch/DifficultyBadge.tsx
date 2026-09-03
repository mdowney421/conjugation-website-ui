import { levelForScore, levelLabel } from "./types";

const DifficultyBadge = ({ score }: { score: number }) => {
  const level = levelForScore(score);
  return <span className={`difficulty-badge difficulty-badge--${level}`}>{levelLabel[level]}</span>;
};

export default DifficultyBadge;
