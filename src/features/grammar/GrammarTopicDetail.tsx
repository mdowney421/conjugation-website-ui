import GrammarQuizSection from "./GrammarQuizSection";
import GrammarText from "./GrammarText";
import { collisionDiagrams } from "./CollisionDiagrams";
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
};

const GrammarTopicDetail = ({ topic }: GrammarTopicDetailProps) => {
  const [sideA, sideB] = topic.compare;
  const CollisionDiagram = collisionDiagrams[topic.slug];

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
            {CollisionDiagram && <CollisionDiagram />}
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
          <GrammarQuizSection
            questions={topic.quiz}
            sideA={sideA}
            sideB={sideB}
            cta={topic.quizCta}
          />
        </section>
      )}
    </div>
  );
};

export default GrammarTopicDetail;
