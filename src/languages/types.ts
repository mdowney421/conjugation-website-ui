export type Mood = "indicative" | "subjunctive";

export type Tense =
  | "present"
  | "preterite"
  | "imperfect"
  | "perfect"
  | "future"
  | "future_perfect"
  | "conditional"
  | "conditional_perfect"
  | "preterite_perfect"
  | "pluperfect"
  | "imperative";

export type Polarity = "affirmative" | "negative";

export type VerbEntry = [string, string];

export type VerbConjugation = {
  form_english?: string;
  form_target?: string;
  form_target_alt?: string | null;
  pronoun_english?: string;
  infinitive_target?: string;
  mood?: Mood;
  tense?: Tense;
  polarity?: Polarity;
};

export type PronounConjugation = {
  pronoun_target: string;
  pronoun_english: string;
  form_target: string;
  form_target_alt?: string | null;
  form_english: string;
};

export type VerbConjugationTable = {
  infinitive_target: string;
  infinitive_english: string;
  mood: Mood;
  tense: Tense;
  conjugations: PronounConjugation[];
};

// The imperative has no single "mood"-like axis to pick a form with --
// affirmative and negative are both worth seeing side by side, so this
// shape carries both instead of the usual single form_target/form_english.
export type ImperativeConjugation = {
  pronoun_target: string;
  pronoun_english: string;
  form_target_affirmative: string;
  form_target_negative: string;
  form_english_affirmative: string;
  form_english_negative: string;
};

export type ImperativeConjugationTable = {
  infinitive_target: string;
  infinitive_english: string;
  tense: "imperative";
  conjugations: ImperativeConjugation[];
};
