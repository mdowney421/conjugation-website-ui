import Link from "next/link";

type ActionCardProps = {
  to: string;
  title: string;
  description: string;
};

const ActionCard = ({ to, title, description }: ActionCardProps) => (
  <Link href={to} className="action-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </Link>
);

export default ActionCard;
