export type DifficultyLevel = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  durationSeconds: number;
  // Elo-style rating built up from "harder/easier than the last one" votes.
  // The A1-C2 badge is just this score bucketed --
  // there's no separately-stored level to fall out of sync with it.
  difficultyScore: number;
  likeCount: number;
};

export type SortMode = "easiest" | "hardest" | "most-liked" | "random";

export const levelForScore = (score: number): DifficultyLevel => {
  if (score < 700) return "a1";
  if (score < 850) return "a2";
  if (score < 1000) return "b1";
  if (score < 1150) return "b2";
  if (score < 1300) return "c1";
  return "c2";
};

export const levelLabel: Record<DifficultyLevel, string> = {
  a1: "A1 · Beginner",
  a2: "A2 · Elementary",
  b1: "B1 · Intermediate",
  b2: "B2 · Upper-Intermediate",
  c1: "C1 · Advanced",
  c2: "C2 · Mastery",
};

export const formatDuration = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
