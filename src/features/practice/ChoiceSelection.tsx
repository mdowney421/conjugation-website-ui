import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";

type ChoiceOption<T extends string> = {
  value: T;
  label: string;
};

type ChoiceSelectionProps<T extends string> = {
  title: string;
  options: ChoiceOption<T>[];
  onSelect: (value: T) => void;
};

const ChoiceSelection = <T extends string>({
  title,
  options,
  onSelect,
}: ChoiceSelectionProps<T>) => {
  return (
    <QuestionCard title={title}>
      <div className="choice-row">
        {options.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </QuestionCard>
  );
};

export default ChoiceSelection;
