import { useState } from "react";
import PageHeader from "../components/PageHeader";
import VerbTypeSelection from "../features/practice/VerbTypeSelection";
import ChoiceSelection from "../features/practice/ChoiceSelection";
import ConjugationInput from "../features/practice/ConjugationInput";
import { fetchRandomVerbConjugation as fetchVerb } from "../languages/spanish/api";
import type { Mood, Tense, VerbConjugation } from "../languages/spanish/types";

type MoodChoice = Mood | "both";
type TenseChoice = Tense | "all";

const TENSES: Tense[] = ["present", "preterite", "imperfect"];
// Preterite has no subjunctive form in Spanish at all. Imperfect does
// (and this app supports it), so it's excluded from this list.
const INDICATIVE_ONLY_TENSES: Tense[] = ["preterite"];

const PracticePage = () => {
  const [useIrregularVerbs, setUseIrregularVerbs] = useState<
    boolean | undefined
  >();
  const [useVosotros, setUseVosotros] = useState<boolean | undefined>();
  const [tenseChoice, setTenseChoice] = useState<TenseChoice | undefined>();
  const [moodChoice, setMoodChoice] = useState<MoodChoice | undefined>();
  const [randomVerb, setRandomVerb] = useState<VerbConjugation | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [hasMissed, setHasMissed] = useState<boolean>(false);

  const handleIrregularityQuestion = (userResponse: boolean) => {
    setUseIrregularVerbs(userResponse);
    setQuestionNumber(2);
  };

  const handleVosotrosQuestion = (userResponse: boolean) => {
    setUseVosotros(userResponse);
    setQuestionNumber(3);
  };

  const handleTenseSelection = (choice: TenseChoice) => {
    setTenseChoice(choice);
    if ((INDICATIVE_ONLY_TENSES as TenseChoice[]).includes(choice)) {
      // Preterite has no subjunctive form here, so the mood question
      // would be moot -- skip straight to the quiz.
      fetchRandomVerbConjugation(undefined, undefined, choice);
      return;
    }
    setQuestionNumber(4);
  };

  const handleMoodSelection = (choice: MoodChoice) => {
    setMoodChoice(choice);
    fetchRandomVerbConjugation(undefined, choice);
  };

  const resolveTense = (choice?: TenseChoice): Tense => {
    const effective = choice ?? tenseChoice;
    if (!effective || effective === "all") {
      return TENSES[Math.floor(Math.random() * TENSES.length)];
    }
    return effective;
  };

  const resolveMood = (
    resolvedTense: Tense,
    choice?: MoodChoice,
  ): Mood => {
    // Preterite has no subjunctive form in this app, so any round
    // that lands on it always uses the indicative.
    if ((INDICATIVE_ONLY_TENSES as Tense[]).includes(resolvedTense)) {
      return "indicative";
    }
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

    const correct =
      userGuess === randomVerb?.form_spanish ||
      (!!randomVerb?.form_spanish_alt && userGuess === randomVerb.form_spanish_alt);
    setIsCorrectAnswer(correct ? "true" : "false");
    if (!correct) {
      setHasMissed(true);
    }
  };

  const fetchRandomVerbConjugation = async (
    vosotrosOverride?: boolean,
    moodOverride?: MoodChoice,
    tenseOverride?: TenseChoice,
  ) => {
    const tense = resolveTense(tenseOverride);
    const verb = await fetchVerb(
      useIrregularVerbs,
      vosotrosOverride ?? useVosotros,
      resolveMood(tense, moodOverride),
      tense,
    );
    setRandomVerb(verb ?? null);
    setQuestionNumber(0);
    setIsCorrectAnswer("");
    setUserGuess("");
    setShowHint(false);
    setShowAnswer(false);
    setHasMissed(false);
  };

  const isSetupStep = questionNumber >= 1 && questionNumber <= 4;

  return (
    <>
      <PageHeader
        title="Practice"
        subtitle="Answer a few quick questions, then start conjugating."
      />

      <div className="practice-card">
        {isSetupStep && (
          <div className="step-progress">
            {[1, 2, 3, 4].map((step) => (
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
          <ChoiceSelection
            title="Which tense do you want to practice?"
            options={[
              { value: "present", label: "Present" },
              { value: "preterite", label: "Preterite" },
              { value: "imperfect", label: "Imperfect" },
              { value: "all", label: "All" },
            ]}
            onSelect={handleTenseSelection}
          />
        )}

        {questionNumber === 4 && (
          <ChoiceSelection
            title="Which mood do you want to practice?"
            options={[
              { value: "indicative", label: "Indicative" },
              { value: "subjunctive", label: "Subjunctive" },
              { value: "both", label: "Both" },
            ]}
            onSelect={handleMoodSelection}
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
            showAnswer={showAnswer}
            onShowAnswer={() => setShowAnswer(true)}
            hasMissed={hasMissed}
          />
        )}
      </div>
    </>
  );
};

export default PracticePage;
