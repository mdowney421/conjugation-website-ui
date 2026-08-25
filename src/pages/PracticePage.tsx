import { useState } from "react";
import VerbTypeSelection from "../features/practice/VerbTypeSelection";
import MoodSelection, {
  type MoodChoice,
} from "../features/practice/MoodSelection";
import ConjugationInput from "../features/practice/ConjugationInput";
import { fetchRandomVerbConjugation as fetchVerb } from "../languages/spanish/api";
import type { Mood, VerbConjugation } from "../languages/spanish/types";

const PracticePage = () => {
  const [useIrregularVerbs, setUseIrregularVerbs] = useState<
    boolean | undefined
  >();
  const [useVosotros, setUseVosotros] = useState<boolean | undefined>();
  const [moodChoice, setMoodChoice] = useState<MoodChoice | undefined>();
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
    setQuestionNumber(3);
  };

  const handleMoodSelection = (choice: MoodChoice) => {
    setMoodChoice(choice);
    fetchRandomVerbConjugation(undefined, choice);
  };

  const resolveMood = (choice?: MoodChoice): Mood => {
    const effective = choice ?? moodChoice;
    if (effective === "both") {
      return Math.random() < 0.5 ? "indicative" : "subjunctive";
    }
    return effective === "subjunctive" ? "subjunctive" : "indicative";
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

  const fetchRandomVerbConjugation = async (
    vosotrosOverride?: boolean,
    moodOverride?: MoodChoice,
  ) => {
    const verb = await fetchVerb(
      useIrregularVerbs,
      vosotrosOverride ?? useVosotros,
      resolveMood(moodOverride),
    );
    setRandomVerb(verb ?? null);
    setQuestionNumber(0);
    setIsCorrectAnswer("");
    setUserGuess("");
    setShowHint(false);
    setHasMissed(false);
  };

  const isSetupStep = questionNumber >= 1 && questionNumber <= 3;

  return (
    <>
      <div className="page-header">
        <h1>Practice</h1>
        <p>
          Answer a few quick questions, then start conjugating in the
          present tense.
        </p>
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
          <MoodSelection onSelect={handleMoodSelection} />
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
