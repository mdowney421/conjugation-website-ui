import { useState } from "react";
import VerbTypeSelection from "./verb-type-selection/verbTypeSelection";
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
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hasMissed, setHasMissed] = useState<boolean>(false);

  const handleIrregularityQuestion = (userResponse: boolean) => {
    setUseIrregularVerbs(userResponse);
    setQuestionNumber(2);
  };

  const handleVosotrosQuestion = (userResponse: boolean) => {
    setUseVosotros(userResponse);
    fetchRandomVerbConjugation(userResponse);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
    if (isCorrectAnswer === "false") {
      setIsCorrectAnswer("");
    }
  };

  const handleSubmitGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCorrectAnswer === "true") {
      fetchRandomVerbConjugation();
      return;
    }

    const correct = userGuess === randomVerb?.form_spanish;
    setIsCorrectAnswer(correct ? "true" : "false");
    if (!correct) {
      setHasMissed(true);
    }
  };

  const fetchRandomVerbConjugation = async (vosotrosOverride?: boolean) => {
    const verb = await fetchVerb(
      useIrregularVerbs,
      vosotrosOverride ?? useVosotros,
    );
    setRandomVerb(verb ?? null);
    setQuestionNumber(0);
    setIsCorrectAnswer("");
    setUserGuess("");
    setShowHint(false);
    setHasMissed(false);
  };

  const isSetupStep = questionNumber === 1 || questionNumber === 2;

  return (
    <>
      <div className="page-header">
        <h1>Practice</h1>
        <p>
          Answer a couple quick questions, then start conjugating in the
          present tense.
        </p>
      </div>

      <div className="practice-card">
        {isSetupStep && (
          <div className="step-progress">
            {[1, 2].map((step) => (
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

        {questionNumber === 0 && (
          <ConjugationInput
            randomVerb={randomVerb}
            handleInputChange={handleInputChange}
            handleSubmitGuess={handleSubmitGuess}
            isCorrectAnswer={isCorrectAnswer}
            fetchRandomVerbConjugation={fetchRandomVerbConjugation}
            userGuess={userGuess}
            showHint={showHint}
            onShowHint={() => setShowHint(true)}
            hasMissed={hasMissed}
          />
        )}
      </div>
    </>
  );
};

export default PracticePage;
