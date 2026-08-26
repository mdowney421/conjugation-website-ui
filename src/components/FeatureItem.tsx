type FeatureItemProps = {
  title: string;
  description: string;
};

const FeatureItem = ({ title, description }: FeatureItemProps) => (
  <div className="feature">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default FeatureItem;
