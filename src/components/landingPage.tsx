import { Link } from "react-router-dom";

const LandingPage = () => {
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
          <Link to="/verbs" className="action-card">
            <span className="action-card-icon">📖</span>
            <h3>Look up verbs</h3>
            <p>Browse the full verb list and find a conjugation fast.</p>
          </Link>
          <Link to="/practice" className="action-card">
            <span className="action-card-icon">✍️</span>
            <h3>Practice conjugating</h3>
            <p>Quiz yourself on the tenses and verb types you choose.</p>
          </Link>
        </div>
      </div>

      <div className="section">
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Quick lookups</h3>
            <p>Find any verb's conjugation in seconds, no clutter.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Targeted practice</h3>
            <p>Choose exactly which tenses and verb types to drill.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🆓</div>
            <h3>Completely free</h3>
            <p>No sign-up, no paywall — just open it and start learning.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
