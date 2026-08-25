import { Link } from "react-router-dom";

type ActionCardProps = {
  to: string;
  icon: string;
  title: string;
  description: string;
};

const ActionCard = ({ to, icon, title, description }: ActionCardProps) => (
  <Link to={to} className="action-card">
    <span className="action-card-icon">{icon}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </Link>
);

export default ActionCard;
