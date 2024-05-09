import React, { useState } from "react";
import axios from "axios";

const PracticePage = (props) => {
  const [useIrregularVerbs, setUseIrregularVerbs] = useState();
  const [useVosotros, setUseVosotros] = useState();
  const [randomVerb, setRandomVerb] = useState();
  const [tenseSelection, setTenseSelection] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  const handleFirstQuestion = (userResponse) => {
    setUseIrregularVerbs(userResponse);
    setQuestionNumber(2);
  };

  const handleSecondQuestion = (userResponse) => {
    setUseVosotros(userResponse);
    setQuestionNumber(3);
  };

  const handleThirdQuestion = (userResponse) => {
    if (tenseSelection.includes(userResponse)) {
      const newTenseSelection = tenseSelection.filter(
        (tense) => tense !== userResponse
      );
      setTenseSelection(newTenseSelection);
    } else {
      setTenseSelection([...tenseSelection, userResponse]);
    }
  };

  const fetchRandomVerbConjugation = async () => {
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
      setRandomVerb(response.data[0]);
    } catch (error) {
      console.error("error fetching random verb conjugation: ", error);
    }
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="display-4">Practice</div>
        </div>

        <hr className="my-5" />

        {questionNumber === 1 ? (
          <div className="row">
            <p className="display-5">Do you want irregular verbs?</p>
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-outline-success mx-3"
                  onClick={() => handleFirstQuestion(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mx-3"
                  onClick={() => handleFirstQuestion(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : questionNumber === 2 ? (
          <div className="row">
            <p className="display-5">Do you want to include "vosotros"?</p>
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-outline-success mx-3"
                  onClick={() => handleSecondQuestion(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mx-3"
                  onClick={() => handleSecondQuestion(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : questionNumber === 3 ? (
          <div className="row">
            <p className="display-5">
              Which tenses would you like to practice?
            </p>
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className={
                    tenseSelection.includes("Present")
                      ? "btn btn-success mx-3"
                      : "btn btn-outline-success mx-3"
                  }
                  onClick={() => handleThirdQuestion("Present")}
                >
                  Present
                </button>
                <button
                  type="button"
                  className={
                    tenseSelection.includes("Preterite")
                      ? "btn btn-success mx-3"
                      : "btn btn-outline-success mx-3"
                  }
                  onClick={() => handleThirdQuestion("Preterite")}
                >
                  Preterite
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-outline-success mx-3"
                  onClick={() => fetchRandomVerbConjugation()}
                >
                  Let's conjugate!
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="constainer d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <p className="display-5">
                Translate {randomVerb?.infinitive ?? null}
              </p>
              <p className="display-5">
                in the {randomVerb?.form ?? null} form
              </p>
              <p className="display-5">
                using the {randomVerb?.tense_english ?? null} tense
              </p>
              <form>
                <div className="form-group">
                  {/* <label for="conjugationGuess">RANDOMLY GENERATED VERB</label> */}
                  <input
                    type="conjugation"
                    className="form-control"
                    id="conjugationGuess"
                    placeholder="Enter your conjugation"
                  />
                </div>
                <button type="submit" className="btn btn-outline-success">
                  Check Answer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PracticePage;
