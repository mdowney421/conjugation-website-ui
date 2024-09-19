import React, { useState } from "react";
import VerbTypeSelection from "./verb-type-selection/verbTypeSelection";
import TenseSelection from "./tense-selection/tenseSelection";
import ConjugationInput from "./conjugation-input/conjugationInput";
import { fetchRandomVerbConjugation as fetchVerb } from "../../api/api";

const PracticePage = () => {
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

  const handleIrregularityQuestion = (userResponse) => {
    setUseIrregularVerbs(userResponse);
    setQuestionNumber(2);
  };

  const handleVosotrosQuestion = (userResponse) => {
    setUseVosotros(userResponse);
    setQuestionNumber(3);
  };

  const handleTenseQuestion = (userResponse) => {
    if (tenseSelection.includes(userResponse)) {
      setTenseSelection(
        tenseSelection.filter((tense) => tense !== userResponse)
      );
    } else {
      setTenseSelection([...tenseSelection, userResponse]);
    }
  };

  const handleInputChange = (event) => setUserGuess(event.target.value);

  const handleSubmitGuess = (event) => {
    event.preventDefault();
    setIsCorrectAnswer(
      userGuess === randomVerb?.form_spanish ? "true" : "false"
    );
  };

  const fetchRandomVerbConjugation = async () => {
    const verb = await fetchVerb(
      useIrregularVerbs,
      useVosotros,
      tenseSelection
    );
    setRandomVerb(verb);
    setQuestionNumber(0);
    setIsCorrectAnswer("");
    setUserGuess("");
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="display-4">Practice</div>
      </div>
      <hr className="my-5" />

      {questionNumber === 1 && (
        <VerbTypeSelection
          prompt="Do you want irregular verbs?"
          onYes={() => handleIrregularityQuestion(true)}
          onNo={() => handleIrregularityQuestion(false)}
        />
      )}

      {questionNumber === 2 && (
        <VerbTypeSelection
          prompt='Do you want to include "vosotros"?'
          onYes={() => handleVosotrosQuestion(true)}
          onNo={() => handleVosotrosQuestion(false)}
        />
      )}

      {questionNumber === 3 && (
        <TenseSelection
          tenseList={tenseList}
          tenseSelection={tenseSelection}
          handleThirdQuestion={handleTenseQuestion}
          fetchRandomVerbConjugation={fetchRandomVerbConjugation}
        />
      )}

      {questionNumber === 0 && (
        <ConjugationInput
          randomVerb={randomVerb}
          handleInputChange={handleInputChange}
          handleSubmitGuess={handleSubmitGuess}
          isCorrectAnswer={isCorrectAnswer}
          fetchRandomVerbConjugation={fetchRandomVerbConjugation}
          userGuess={userGuess}
        />
      )}
    </div>
  );
};

export default PracticePage;
