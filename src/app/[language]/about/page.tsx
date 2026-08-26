import type { Metadata } from "next";
import PageHeader from "../../../components/PageHeader";
import { LANGUAGES } from "../../../languages/registry";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return {
    title: "About DialecTrek",
    description: `A tool for learning ${definition.displayName}.`,
  };
};

const AboutPage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  return (
    <div className="page">
      <PageHeader
        title="About DialecTrek"
        subtitle="A tool for learning a new language."
      />

      <div className="about-content">
        <h2>Everything you need, in one place</h2>
        <p>
          DialecTrek brings together what you need to learn — starting with
          verb conjugation, with grammar and vocabulary on the way — and a
          quiz mode, so you're never bouncing between a dozen tabs just to
          look something up or find something to practice.
        </p>

        <h2>Learn your way</h2>
        <p>
          Browse to look up what you need right now, or jump into practice
          mode for a quiz. Before each round, choose what's in the mix — so
          practice fits how you actually learn, not a one-size-fits-all
          drill.
        </p>

        <h2>Built for efficiency</h2>
        <p>
          DialecTrek quizzes you one question at a time and tells you right
          away whether you got it right, so there's no wasted motion.
          Whether you're brushing up before a trip or working through a
          course, it's meant to be a quick, no-friction tool you can come
          back to as often as you like.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
