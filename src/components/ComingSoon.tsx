import Link from "next/link";
import PageHeader from "./PageHeader";
import EmptyState from "./EmptyState";

type ComingSoonProps = {
  title: string;
  displayName: string;
  flashcardsHref: string;
};

const ComingSoon = ({ title, displayName, flashcardsHref }: ComingSoonProps) => (
  <div className="page">
    <PageHeader title={title} />
    <EmptyState>
      <span className="coming-soon-emoji" aria-hidden="true">
        🚧
      </span>
      <p className="coming-soon-heading">Under construction</p>
      <p>
        We haven&apos;t built {title.toLowerCase()} for {displayName} yet, but
        flashcards are ready to go in the meantime.
      </p>
      <Link href={flashcardsHref} className="btn btn-primary">
        Study flashcards
      </Link>
    </EmptyState>
  </div>
);

export default ComingSoon;
