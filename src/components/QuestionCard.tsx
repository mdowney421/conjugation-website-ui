import type { ReactNode } from "react";

type QuestionCardProps = {
  title?: string;
  children: ReactNode;
};

const QuestionCard = ({ title, children }: QuestionCardProps) => (
  <div className="question-card">
    {title && <h2>{title}</h2>}
    {children}
  </div>
);

export default QuestionCard;
