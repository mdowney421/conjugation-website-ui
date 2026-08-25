import axios from "axios";

export type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
  pronoun_english?: string;
  infinitive_spanish?: string;
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
  mood_english: string;
  tense_english: string;
  conjugations: PronounConjugation[];
};

export const fetchRandomVerbConjugation = async (
  useIrregularVerbs?: boolean,
  useVosotros?: boolean,
): Promise<VerbConjugation | undefined> => {
  try {
    const response = await axios.get<VerbConjugation[]>(
      "http://127.0.0.1:8000/get-random-verb-conjugation",
      {
        params: {
          mood: "indicative",
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
): Promise<VerbConjugationTable | undefined> => {
  try {
    const response = await axios.get<VerbConjugationTable>(
      "http://127.0.0.1:8000/get-verb-conjugation",
      { params: { verb } },
    );
    return response.data;
  } catch (error) {
    console.error("error fetching verb conjugation: ", error);
    return undefined;
  }
};
