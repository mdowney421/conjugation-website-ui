import type { Tense } from "./types";
import { es } from "./es/config";

export type LanguageDefinition = {
  code: string;
  displayName: string;
  flagEmoji: string;
  enabled: boolean;
  verbCount: number;
  tenseLabels: Record<Tense, string>;
  indicativeOnlyTenses: Tense[];
  hasSubjunctive: boolean;
  accentChars: string[];
  extraToggles: { key: string; prompt: string }[];
};

export const LANGUAGES: Record<string, LanguageDefinition> = { es };
