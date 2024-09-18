import React, { useState } from "react";
import axios from "axios";

const PracticePage = (props) => {
  const [useIrregularVerbs, setUseIrregularVerbs] = useState();
  const [useVosotros, setUseVosotros] = useState();
  const [randomVerb, setRandomVerb] = useState();
  const [tenseSelection, setTenseSelection] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState("");
  const [userGuess, setUserGuess] = useState("");

  const tenseList = [
    "present",
    "preterite",
    "future",
    "imperfect",
    "conditional",
    "present perfect",
    "future perfect",
    "past perfect",
    "preterite (archaic)",
    "conditional perfect",
  ];

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

  const handleInputChange = (event) => {
    setUserGuess(event.target.value);
  };

  const handleSubmitGuess = (event) => {
    event.preventDefault();
    if (userGuess === randomVerb?.form_spanish) {
      setIsCorrectAnswer("true");
    } else {
      setIsCorrectAnswer("false");
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
      setQuestionNumber(0);
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
                {tenseList.map((tense) => {
                  return (
                    <button
                      type="button"
                      className={
                        tenseSelection.includes(tense)
                          ? "btn btn-success mx-3"
                          : "btn btn-outline-success mx-3"
                      }
                      onClick={() => handleThirdQuestion(tense)}
                      key={tense}
                    >
                      {tense.charAt(0).toUpperCase() + tense.slice(1)}
                    </button>
                  );
                })}
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
        ) : (
          <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="col">
                <p className="display-5">{randomVerb?.form_english ?? null}</p>
                <form onSubmit={handleSubmitGuess}>
                  <div className="form-group">
                    {/* <label for="conjugationGuess">RANDOMLY GENERATED VERB</label> */}
                    <input
                      type="conjugation"
                      className="form-control"
                      id="conjugationGuess"
                      placeholder="Enter your conjugation"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-success">
                    Check Answer
                  </button>
                </form>
                {isCorrectAnswer === "true" ? (
                  <p className="display-5">Correct!</p>
                ) : isCorrectAnswer === "false" ? (
                  <p className="display-5">Incorrect!</p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PracticePage;
