"use client";

import QuestionCard from "../../components/QuestionCard";

type CategorySelectionProps = {
  categories: string[];
  onSelect: (category: string | null) => void;
};

export const formatCategory = (category: string): string =>
  category.charAt(0).toUpperCase() + category.slice(1);

const CategorySelection = ({ categories, onSelect }: CategorySelectionProps) => (
  <QuestionCard title="Which category of words would you like to study?">
    <div className="chip-grid">
      <button type="button" className="chip" onClick={() => onSelect(null)}>
        All words
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="chip"
          onClick={() => onSelect(category)}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  </QuestionCard>
);

export default CategorySelection;
