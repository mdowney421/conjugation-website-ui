export type Mood = "indicative" | "subjunctive";

export type VerbEntry = [string, string];

export type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
  pronoun_english?: string;
  infinitive_spanish?: string;
  mood_english?: Mood;
};

export type PronounConjugation = {
  pronoun_spanish: string;
  pronoun_english: string;
  form_spanish: string;
  form_english: string;
};

export type VerbConjugationTable = {
  infinitive_spanish: string;
  infinitive_english: string;
  mood_english: Mood;
  tense_english: string;
  conjugations: PronounConjugation[];
};
