import axios from "axios";

export type VerbConjugation = {
  form_english?: string;
  form_spanish?: string;
};

export const fetchRandomVerbConjugation = async (
  useIrregularVerbs?: boolean,
  useVosotros?: boolean,
  tenseSelection: string[] = []
): Promise<VerbConjugation | undefined> => {
  try {
    const tensesParam = tenseSelection.join(",");
    const response = await axios.get<VerbConjugation[]>(
      "http://127.0.0.1:8000/get-random-verb-conjugation",
      {
        params: {
          mood: "indicative",
          use_irregular: useIrregularVerbs,
          use_vosotros: useVosotros,
          tenses: tensesParam,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error("error fetching random verb conjugation: ", error);
    return undefined;
  }
};
