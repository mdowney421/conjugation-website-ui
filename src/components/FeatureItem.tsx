type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => (
  <div className="feature">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default FeatureItem;
