import Link from "next/link";
import GrammarQuiz from "./GrammarQuiz";
import GrammarText from "./GrammarText";
import type { GrammarTopic } from "../../languages/types";

const ShiftFormCell = ({
  tone,
  form,
}: {
  tone: "a" | "b";
  form: { form: string; meaning: string };
}) => (
  <td>
    <span className={`grammar-shift-form grammar-tone-${tone}`}>{form.form}</span>
    <span className="grammar-shift-meaning">{form.meaning}</span>
  </td>
);

type GrammarTopicDetailProps = {
  topic: GrammarTopic;
  practiceHref: string;
};

// A gentle wave for the ongoing ("tone b") action, cut by a single point
// for the interrupting ("tone a") one -- the shape is illustrative rather
// than tied to any topic's specific wording, so it's the same for every
// topic that has a collision example.
const CollisionDiagram = () => (
  <svg
    className="grammar-collision-diagram"
    viewBox="0 0 640 130"
    role="img"
    aria-label="A wavy line representing an ongoing action, interrupted partway through by a single point representing a second action."
  >
    <path
      d="M 20 65 C 60 45, 100 85, 140 65 C 180 45, 220 85, 260 65 C 300 45, 340 85, 380 65"
      fill="none"
      stroke="var(--color-accent-4)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="380"
      y1="65"
      x2="620"
      y2="65"
      stroke="var(--color-border)"
      strokeWidth="2"
      strokeDasharray="2 6"
      strokeLinecap="round"
    />
    <line x1="380" y1="65" x2="380" y2="30" stroke="var(--color-accent-3)" strokeWidth="2" />
    <circle cx="380" cy="65" r="7" fill="var(--color-accent-3)" />
  </svg>
);

const GrammarTopicDetail = ({ topic, practiceHref }: GrammarTopicDetailProps) => {
  const [sideA, sideB] = topic.compare;

  return (
    <div className="grammar-detail">
      <p className="grammar-lede">{topic.lede}</p>

      <div className="grammar-quick-take">
        <div className="grammar-quick-take-rule" aria-hidden="true" />
        <div>
          <div className="grammar-quick-take-label">The short version</div>
          <p>
            <GrammarText parts={topic.quickTake} />
          </p>
        </div>
      </div>

      <section>
        <div className="grammar-section-label">Side by side</div>
        <div className="grammar-compare-grid">
          {([["a", sideA], ["b", sideB]] as const).map(([tone, side]) => (
            <div key={tone} className={`grammar-compare-card grammar-compare-card--${tone}`}>
              <h3>{side.label}</h3>
              <p className="grammar-compare-kicker">{side.kicker}</p>
              <div className="grammar-trigger-chips">
                {side.triggers.map((trigger) => (
                  <span className="grammar-trigger-chip" key={trigger}>
                    {trigger}
                  </span>
                ))}
              </div>
              <div className="grammar-example-list">
                {side.examples.map((example, index) => (
                  <div className="grammar-example" key={index}>
                    <div className="grammar-example-target">
                      <GrammarText parts={example.parts} />
                    </div>
                    <div className="grammar-example-gloss">{example.gloss}</div>
                    <div className="grammar-example-why">{example.why}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {topic.collision && (
        <section>
          <div className="grammar-section-label">Where it gets interesting</div>
          <div className="grammar-collision-card">
            <p className="grammar-collision-sentence">
              <GrammarText parts={topic.collision.parts} />
            </p>
            <p className="grammar-collision-gloss">{topic.collision.gloss}</p>
            <CollisionDiagram />
            <p className="grammar-collision-note">{topic.collision.note}</p>
          </div>
        </section>
      )}

      {topic.shiftTable && topic.shiftTable.length > 0 && (
        <section>
          <div className="grammar-section-label">Verbs that change meaning</div>
          {topic.shiftTableIntro && <p className="grammar-shift-intro">{topic.shiftTableIntro}</p>}
          <div className="grammar-shift-table-wrap">
            <table className="grammar-shift-table">
              <thead>
                <tr>
                  <th>Verb</th>
                  <th>{sideB.label}</th>
                  <th>{sideA.label}</th>
                </tr>
              </thead>
              <tbody>
                {topic.shiftTable.map((row) => (
                  <tr key={row.verb}>
                    <td className="grammar-shift-verb">{row.verb}</td>
                    <ShiftFormCell tone="b" form={row.formB} />
                    <ShiftFormCell tone="a" form={row.formA} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {topic.quiz && topic.quiz.length > 0 && (
        <section>
          <div className="grammar-section-label">Test yourself</div>
          <GrammarQuiz questions={topic.quiz} sideA={sideA} sideB={sideB} />
        </section>
      )}

      <div className="grammar-cta-row">
        <div>
          <h3>{topic.practiceCta.heading}</h3>
          <p>{topic.practiceCta.body}</p>
        </div>
        <Link href={practiceHref} className="btn btn-primary">
          {topic.practiceCta.buttonLabel}
        </Link>
      </div>
    </div>
  );
};

export default GrammarTopicDetail;
