import Link from "next/link";
import PageHeader from "./PageHeader";
import EmptyState from "./EmptyState";
import type { LanguageDefinition } from "../languages/registry";

type ComingSoonProps = {
  title: string;
  language: string;
  definition: LanguageDefinition;
};

const joinWithAnd = (items: string[]): string => {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
};

// Which other features are actually live for this language -- so a
// "coming soon" page never undersells what's already built (e.g. French
// has verbs and conjugation practice ready even while grammar isn't).
const ComingSoon = ({ title, language, definition }: ComingSoonProps) => {
  const features = [
    { label: "Verbs", href: `/${language}/verbs`, available: definition.hasVerbs },
    { label: "Conjugate", href: `/${language}/conjugate`, available: definition.hasVerbs },
    { label: "Flashcards", href: `/${language}/flashcards`, available: true },
    {
      label: "Grammar",
      href: `/${language}/grammar`,
      available: definition.grammarTopics.length > 0,
    },
  ].filter((feature) => feature.available);

  return (
    <div className="page">
      <PageHeader title={title} />
      <EmptyState>
        <span className="coming-soon-emoji" aria-hidden="true">
          🚧
        </span>
        <p className="coming-soon-heading">Under construction</p>
        <p className="coming-soon-message">
          We haven&apos;t built {title} for {definition.displayName} yet
          {features.length > 0 && (
            <>, but {joinWithAnd(features.map((feature) => feature.label))} {features.length === 1 ? "is" : "are"} ready to go in the meantime</>
          )}
          .
        </p>
        {features.length > 0 && (
          <div className="quiz-actions">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href} className="btn btn-primary">
                {feature.label}
              </Link>
            ))}
          </div>
        )}
      </EmptyState>
    </div>
  );
};

export default ComingSoon;
