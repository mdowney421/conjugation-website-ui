import type { Metadata } from "next";
import PageHeader from "../../../components/PageHeader";
import { LANGUAGES } from "../../../languages/registry";

type PageProps = { params: Promise<{ language: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return {};
  return {
    title: "About Trekuent",
    description: `A free tool for learning ${definition.displayName} verb conjugation.`,
  };
};

const AboutPage = async ({ params }: PageProps) => {
  const { language } = await params;
  const definition = LANGUAGES[language];
  if (!definition) return null;

  return (
    <div className="page">
      <PageHeader
        title="About Trekuent"
        subtitle={`A free tool for learning ${definition.displayName} verb conjugation.`}
      />

      <div className="about-content">
        <h2>What it does</h2>
        <p>
          Trekuent has two modes: browse the verb list — the {definition.verbCount}{" "}
          most common {definition.displayName} verbs — to look up a
          conjugation you need right now, or jump into practice mode for a
          quiz that quizzes you on random verbs across the tenses you
          choose.
        </p>

        <h2>Practice, your way</h2>
        <p>
          Before each round, pick whether you want irregular verbs in the
          mix, whether to include the "vosotros" form, and which tenses to
          drill — present, preterite, future, and beyond. Trekuent
          then quizzes you one verb at a time and tells you right away
          whether your answer was correct.
        </p>

        <h2>Built for learners</h2>
        <p>
          Whether you're brushing up before a trip or working through a{" "}
          {definition.displayName} course, Trekuent is meant to be a quick,
          no-friction reference and drill tool you can come back to as often
          as you like.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
