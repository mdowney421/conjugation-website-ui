import axios from "axios";
import type {
  Mood,
  VerbConjugation,
  VerbConjugationTable,
  VerbEntry,
} from "./types";

const BASE_URL = "http://127.0.0.1:8000";

export const fetchAllVerbs = async (): Promise<VerbEntry[]> => {
  try {
    const response = await axios.get<VerbEntry[]>(`${BASE_URL}/get-all-verbs`);
    return response.data;
  } catch (error) {
    console.error("error fetching verbs list: ", error);
    return [];
  }
};

export const fetchRandomVerbConjugation = async (
  useIrregularVerbs?: boolean,
  useVosotros?: boolean,
  mood: Mood = "indicative",
): Promise<VerbConjugation | undefined> => {
  try {
    const response = await axios.get<VerbConjugation[]>(
      `${BASE_URL}/get-random-verb-conjugation`,
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
      `${BASE_URL}/get-verb-conjugation`,
      { params: { verb, mood } },
    );
    return response.data;
  } catch (error) {
    console.error("error fetching verb conjugation: ", error);
    return undefined;
  }
};
