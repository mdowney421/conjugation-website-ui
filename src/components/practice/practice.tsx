import { useState } from "react";
import VerbTypeSelection from "./verb-type-selection/verbTypeSelection";
import TenseSelection from "./tense-selection/tenseSelection";
import ConjugationInput from "./conjugation-input/conjugationInput";
import {
  fetchRandomVerbConjugation as fetchVerb,
  type VerbConjugation,
} from "../../api/api";

const PracticePage = () => {
  const [useIrregularVerbs, setUseIrregularVerbs] = useState<
    boolean | undefined
  >();
  const [useVosotros, setUseVosotros] = useState<boolean | undefined>();
  const [randomVerb, setRandomVerb] = useState<VerbConjugation | null>(null);
  const [tenseSelection, setTenseSelection] = useState<string[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");

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

  const handleIrregularityQuestion = (userResponse: boolean) => {
    setUseIrregularVerbs(userResponse);
    setQuestionNumber(2);
  };

  const handleVosotrosQuestion = (userResponse: boolean) => {
    setUseVosotros(userResponse);
    setQuestionNumber(3);
  };

  const handleTenseQuestion = (userResponse: string) => {
    if (tenseSelection.includes(userResponse)) {
      setTenseSelection(
        tenseSelection.filter((tense) => tense !== userResponse),
      );
    } else {
      setTenseSelection([...tenseSelection, userResponse]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserGuess(event.target.value);

  const handleSubmitGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCorrectAnswer(
      userGuess === randomVerb?.form_spanish ? "true" : "false",
    );
  };

  const fetchRandomVerbConjugation = async () => {
    const verb = await fetchVerb(
      useIrregularVerbs,
      useVosotros,
      tenseSelection,
    );
    setRandomVerb(verb ?? null);
    setQuestionNumber(0);
    setIsCorrectAnswer("");
    setUserGuess("");
  };

  const isSetupStep = questionNumber >= 1 && questionNumber <= 3;

  return (
    <>
      <div className="page-header">
        <h1>Practice</h1>
        <p>Answer a few quick questions, then start conjugating.</p>
      </div>

      <div className="practice-card">
        {isSetupStep && (
          <div className="step-progress">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={`step-dot${
                  step === questionNumber
                    ? " active"
                    : step < questionNumber
                      ? " done"
                      : ""
                }`}
              />
            ))}
          </div>
        )}

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
    </>
  );
};

export default PracticePage;
