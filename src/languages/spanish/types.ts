export type Mood = "indicative" | "subjunctive";

export type Tense = "present" | "preterite" | "imperfect" | "perfect" | "conditional";

export type VerbEntry = [string, string];

export type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
  form_spanish_alt?: string | null;
  pronoun_english?: string;
  infinitive_spanish?: string;
  mood_english?: Mood;
  tense_english?: Tense;
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
