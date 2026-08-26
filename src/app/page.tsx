import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FeatureItem from "../components/FeatureItem";
import { LANGUAGES } from "../languages/registry";

export const metadata: Metadata = {
  title: { absolute: "Trekuent — Learn Verb Conjugations" },
  description:
    "Trekuent — look up Spanish verbs and practice conjugating them across every tense.",
};

const LanguagePickerPage = () => {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-media">
          <Image
            src="/TrekuentHeroImage.png"
            alt="A traveler pauses on a mountain trail marked with icons for reading, conversation, and practice, following it toward a flag at the summit"
            fill
            priority
            sizes="100vw"
            className="hero-bg-image"
          />
          <div className="hero-scrim" />
        </div>
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Trekuent</h1>
            <p>
              Language learning is a journey — we're just here to point out the
              shortcuts.
            </p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-heading">Choose a language to practice</h2>
        <div className="language-cards">
          {Object.values(LANGUAGES).map((language) => (
            <Link
              key={language.code}
              href={`/${language.code}`}
              className={`language-card language-card--${language.code}`}
            >
              <h3>{language.displayName}</h3>
            </Link>
          ))}
          <div className="language-card language-card--fr disabled">
            <h3>French</h3>
            <span className="language-card-badge">Coming soon</span>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="feature-grid">
          <FeatureItem
            title="Quick lookups"
            description="Find verb conjugations in seconds, no clutter."
          />
          <FeatureItem
            title="Targeted practice"
            description="Choose exactly which tenses and verb types to master."
          />
          <FeatureItem
            title="Built around common verbs"
            description="Focused on the common verbs you'll actually use, not an overwhelming list."
          />
        </div>
      </div>
    </div>
  );
};

export default LanguagePickerPage;
