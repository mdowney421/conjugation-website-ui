import type { ReactNode } from "react";

type QuestionCardProps = {
  title?: string;
  children: ReactNode;
  animationKey?: string | number;
};

const QuestionCard = ({ title, children, animationKey }: QuestionCardProps) => (
  <div className="question-card" key={animationKey}>
    {title && <h2>{title}</h2>}
    {children}
  </div>
);

export default QuestionCard;
