import type { Tense } from "./types";
import { es } from "./es/config";
import { fr } from "./fr/config";

export type LanguageDefinition = {
  code: string;
  displayName: string;
  flagEmoji: string;
  enabled: boolean;
  // Verb conjugation is only built out for some languages so far (each one
  // needs its own rule engine) -- languages with hasVerbs: false still get
  // flashcards, but the verbs/conjugate routes and nav links are hidden.
  hasVerbs: boolean;
  verbCount: number;
  wordCount: number;
  tenseLabels: Record<Tense, string>;
  indicativeOnlyTenses: Tense[];
  hasSubjunctive: boolean;
  accentChars: string[];
  extraToggles: { key: string; prompt: string }[];
};

export const LANGUAGES: Record<string, LanguageDefinition> = { es, fr };
