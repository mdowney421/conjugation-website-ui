export type DifficultyLevel = "novice" | "beginner" | "intermediate" | "advanced";

export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  durationSeconds: number;
  // Elo-style rating built up from "harder/easier than the last one" votes.
  // The beginner/intermediate/advanced badge is just this score bucketed --
  // there's no separately-stored level to fall out of sync with it.
  difficultyScore: number;
  likeCount: number;
};

export type SortMode = "easiest" | "hardest" | "most-liked" | "random";

export const levelForScore = (score: number): DifficultyLevel => {
  if (score < 700) return "novice";
  if (score < 1000) return "beginner";
  if (score < 1300) return "intermediate";
  return "advanced";
};

export const levelLabel: Record<DifficultyLevel, string> = {
  novice: "Novice",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const formatDuration = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
