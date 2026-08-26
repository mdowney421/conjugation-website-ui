import type { Metadata } from "next";
import ActionCard from "../../components/ActionCard";
import { LANGUAGES } from "../../languages/registry";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return {
    title: `${definition.displayName} Verb Conjugation`,
    description: `Look up and practice ${definition.displayName} verb conjugations across every tense.`,
  };
};

const HomePage = async ({ params }: PageProps) => {
  const { language } = await params;

  return (
    <div className="page">
      <div className="section">
        <h2 className="section-heading">What do you want to do today?</h2>
        <div className="action-cards">
          <ActionCard
            to={`/${language}/verbs`}
            title="Look up verbs"
            description="Browse the verb list and find a conjugation fast."
          />
          <ActionCard
            to={`/${language}/practice`}
            title="Practice conjugating"
            description="Quiz yourself on the tenses and verb types you choose."
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
