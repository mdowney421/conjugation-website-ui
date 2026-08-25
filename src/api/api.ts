import axios from "axios";

export type Mood = "indicative" | "subjunctive";

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

export const fetchRandomVerbConjugation = async (
  useIrregularVerbs?: boolean,
  useVosotros?: boolean,
  mood: Mood = "indicative",
): Promise<VerbConjugation | undefined> => {
  try {
    const response = await axios.get<VerbConjugation[]>(
      "http://127.0.0.1:8000/get-random-verb-conjugation",
      {
        params: {
          mood,
          use_irregular: useIrregularVerbs,
          use_vosotros: useVosotros,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error("error fetching random verb conjugation: ", error);
    return undefined;
  }
};

export const fetchVerbConjugation = async (
  verb: string,
  mood: Mood = "indicative",
): Promise<VerbConjugationTable | undefined> => {
  try {
    const response = await axios.get<VerbConjugationTable>(
      "http://127.0.0.1:8000/get-verb-conjugation",
      { params: { verb, mood } },
    );
    return response.data;
  } catch (error) {
    console.error("error fetching verb conjugation: ", error);
    return undefined;
  }
};
