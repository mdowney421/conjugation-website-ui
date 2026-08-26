import type { Tense } from "../types";
import type { LanguageDefinition } from "../registry";

export const es: LanguageDefinition = {
  code: "es",
  displayName: "Spanish",
  enabled: true,
  verbCount: 100,
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
  // Preterite, future, conditional (simple and perfect), and preterite
  // perfect have no subjunctive form in Spanish at all. Imperfect,
  // perfect, and pluperfect do (and this app supports them), so they're
  // excluded from this list.
  indicativeOnlyTenses: [
    "preterite",
    "future",
    "future_perfect",
    "conditional",
    "conditional_perfect",
    "preterite_perfect",
  ],
  hasSubjunctive: true,
  accentChars: ["á", "é", "í", "ó", "ú", "ñ"],
  extraToggles: [
    { key: "useRegionalVariant", prompt: 'Do you want to include "vosotros"?' },
  ],
};
