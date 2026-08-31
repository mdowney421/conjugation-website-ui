import type { Tense } from "../types";
import type { LanguageDefinition } from "../registry";

export const fr: LanguageDefinition = {
  code: "fr",
  displayName: "French",
  flagEmoji: "🇫🇷",
  enabled: true,
  // No conjugation engine for French yet -- flashcards only for now.
  hasVerbs: false,
  verbCount: 0,
  wordCount: 2000,
  tenseLabels: {
    present: "Present",
    preterite: "Preterite",
    imperfect: "Imperfect",
    perfect: "Present Perfect",
    future: "Future",
    future_perfect: "Future Perfect",
    conditional: "Conditional",
    conditional_perfect: "Conditional Perfect",
    preterite_perfect: "Preterite Perfect",
    pluperfect: "Pluperfect",
    imperative: "Imperative",
  } satisfies Record<Tense, string>,
  indicativeOnlyTenses: [
    "preterite",
    "future",
    "future_perfect",
    "conditional",
    "conditional_perfect",
    "preterite_perfect",
  ],
  hasSubjunctive: true,
  accentChars: ["à", "â", "ç", "é", "è", "ê", "î", "ï", "ô", "û", "ù", "œ"],
  extraToggles: [],
};
