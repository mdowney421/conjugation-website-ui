import ActionCard from "../components/ActionCard";
import FeatureItem from "../components/FeatureItem";

const HomePage = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-emoji">🐊</div>
        <h1>The ConjuGator</h1>
        <p>
          Welcome to your conjugation destination — a one-stop shop for
          looking up and practicing Spanish verb conjugations.
        </p>
      </div>

      <div className="section">
        <h2 className="section-heading">What do you want to do today?</h2>
        <div className="action-cards">
          <ActionCard
            to="/verbs"
            icon="📖"
            title="Look up verbs"
            description="Browse the full verb list and find a conjugation fast."
          />
          <ActionCard
            to="/practice"
            icon="✍️"
            title="Practice conjugating"
            description="Quiz yourself on the tenses and verb types you choose."
          />
        </div>
      </div>

      <div className="section">
        <div className="feature-grid">
          <FeatureItem
            icon="⚡"
            title="Quick lookups"
            description="Find any verb's conjugation in seconds, no clutter."
          />
          <FeatureItem
            icon="🎯"
            title="Targeted practice"
            description="Choose exactly which tenses and verb types to drill."
          />
          <FeatureItem
            icon="🆓"
            title="Completely free"
            description="No sign-up, no paywall — just open it and start learning."
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
