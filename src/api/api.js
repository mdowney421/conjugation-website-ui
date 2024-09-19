import axios from "axios";

export const fetchRandomVerbConjugation = async (
  useIrregularVerbs,
  useVosotros,
  tenseSelection
) => {
  try {
    const tensesParam = tenseSelection.join(",");
    const response = await axios.get(
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
  }
};
