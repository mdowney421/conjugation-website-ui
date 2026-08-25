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
  | "imperative";

export type Polarity = "affirmative" | "negative";

export type VerbEntry = [string, string];

export type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
  form_spanish_alt?: string | null;
  pronoun_english?: string;
  infinitive_spanish?: string;
  mood_english?: Mood;
  tense_english?: Tense;
  polarity_english?: Polarity;
};

export type PronounConjugation = {
  pronoun_spanish: string;
  pronoun_english: string;
  form_spanish: string;
  form_spanish_alt?: string | null;
  form_english: string;
};

export type VerbConjugationTable = {
  infinitive_spanish: string;
  infinitive_english: string;
  mood_english: Mood;
  tense_english: Tense;
  conjugations: PronounConjugation[];
};

// The imperative has no single "mood"-like axis to pick a form with --
// affirmative and negative are both worth seeing side by side, so this
// shape carries both instead of the usual single form_spanish/form_english.
export type ImperativeConjugation = {
  pronoun_spanish: string;
  pronoun_english: string;
  form_spanish_affirmative: string;
  form_spanish_negative: string;
  form_english_affirmative: string;
  form_english_negative: string;
};

export type ImperativeConjugationTable = {
  infinitive_spanish: string;
  infinitive_english: string;
  tense_english: "imperative";
  conjugations: ImperativeConjugation[];
};
