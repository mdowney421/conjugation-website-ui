import Link from "next/link";

type BackLinkProps = { to: string; label: string } | { onClick: () => void; label: string };

// A plain page-to-page link most of the time, but some pages (Watch) need
// to go back through router history instead of to a fixed URL, to
// preserve filters/pagination state -- hence the onClick alternative.
// Both render as the same className so a back link looks identical
// everywhere regardless of which one a given page needs.
const BackLink = (props: BackLinkProps) =>
  "to" in props ? (
    <Link href={props.to} className="back-link">
      {props.label}
    </Link>
  ) : (
    <button type="button" className="back-link" onClick={props.onClick}>
      {props.label}
    </button>
  );

export default BackLink;
