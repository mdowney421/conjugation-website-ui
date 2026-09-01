// Each grammar topic's "where it gets interesting" collision needs its own
// visual metaphor -- the wavy-line-cut-by-a-point diagram only makes sense
// for preterite vs. imperfect's ongoing-action-interrupted-by-an-event
// shape. These are keyed by topic slug and picked in GrammarTopicDetail; a
// topic with a collision but no entry here just renders without a diagram.

const TONE_A = "var(--color-accent-3)";
const TONE_B = "var(--color-accent-4)";
const NEUTRAL = "var(--color-border)";

// Every diagram shares the same frame -- only the content inside changes.
const DiagramFrame = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <svg className="grammar-collision-diagram" viewBox="0 0 640 130" role="img" aria-label={label}>
    {children}
  </svg>
);

// A faint dashed stroke, used wherever a diagram needs to show "still the
// baseline" or "still unresolved" rather than a solid, definite line.
const DashedLine = ({ d, color = NEUTRAL, dash = "2 6" }: { d: string; color?: string; dash?: string }) => (
  <path d={d} fill="none" stroke={color} strokeWidth="2" strokeDasharray={dash} strokeLinecap="round" />
);

// An isosceles triangle pointing from a base at baseX toward a tip at
// tipX, centered vertically on y -- the shared shape behind every
// left/right arrowhead (and, at a wider halfHeight, a small flag).
const Arrowhead = ({
  baseX,
  tipX,
  y,
  halfHeight,
  color,
}: {
  baseX: number;
  tipX: number;
  y: number;
  halfHeight: number;
  color: string;
}) => <path d={`M ${baseX} ${y - halfHeight} L ${tipX} ${y} L ${baseX} ${y + halfHeight} Z`} fill={color} />;

// Preterite vs. imperfect: a gentle wave for the ongoing ("tone b") action,
// cut by a single point for the interrupting ("tone a") one.
const PreteriteImperfectDiagram = () => (
  <DiagramFrame label="A wavy line representing an ongoing action, interrupted partway through by a single point representing a second action.">
    <path
      d="M 20 65 C 60 45, 100 85, 140 65 C 180 45, 220 85, 260 65 C 300 45, 340 85, 380 65"
      fill="none"
      stroke={TONE_B}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <DashedLine d="M 380 65 L 620 65" />
    <line x1="380" y1="65" x2="380" y2="30" stroke={TONE_A} strokeWidth="2" />
    <circle cx="380" cy="65" r="7" fill={TONE_A} />
  </DiagramFrame>
);

// Ser vs. estar: a flat, unbroken line for the trait that never moves,
// against a line that holds the same baseline but rises into a bump for
// one temporary stretch -- the trait doesn't budge, the state does (and
// then settles back down).
const SerEstarDiagram = () => (
  <DiagramFrame label="A flat, unbroken line representing a permanent trait, above a mostly flat line that rises into a single temporary bump representing a passing state.">
    <line x1="20" y1="38" x2="620" y2="38" stroke={TONE_A} strokeWidth="3" strokeLinecap="round" />
    <DashedLine d="M 20 95 L 250 95" />
    <path
      d="M 250 95 C 270 55, 330 55, 350 95"
      fill="none"
      stroke={TONE_B}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <DashedLine d="M 350 95 L 620 95" />
    <circle cx="300" cy="63" r="5" fill={TONE_B} />
  </DiagramFrame>
);

// Subjunctive triggers: one solid path to a single destination for a
// statement of fact, against several thin, diverging dashed paths to
// separate open endpoints for a statement that isn't settled.
const SubjunctiveTriggersDiagram = () => (
  <DiagramFrame label="A single solid line to one destination representing a certain statement, above several thin dashed lines branching out to separate open endpoints representing an unsettled one.">
    <circle cx="40" cy="35" r="6" fill={NEUTRAL} />
    <line x1="52" y1="35" x2="570" y2="35" stroke={TONE_A} strokeWidth="3" strokeLinecap="round" />
    <Arrowhead baseX={570} tipX={595} y={35} halfHeight={8} color={TONE_A} />
    <circle cx="40" cy="98" r="6" fill={NEUTRAL} />
    <DashedLine d="M 52 94 L 580 68" color={TONE_B} dash="3 6" />
    <DashedLine d="M 52 98 L 580 98" color={TONE_B} dash="3 6" />
    <DashedLine d="M 52 102 L 580 124" color={TONE_B} dash="3 6" />
    <circle cx="585" cy="68" r="5" fill="none" stroke={TONE_B} strokeWidth="2" />
    <circle cx="585" cy="98" r="5" fill="none" stroke={TONE_B} strokeWidth="2" />
    <circle cx="585" cy="124" r="5" fill="none" stroke={TONE_B} strokeWidth="2" />
  </DiagramFrame>
);

// Por vs. para: two arrows pivoting on the action itself -- one pointing
// back toward the cause behind it, one pointing forward toward the goal
// it's aimed at.
const PorParaDiagram = () => (
  <DiagramFrame label="An arrow pointing backward from a central point toward its cause, and an arrow pointing forward from that same point toward a flagged goal.">
    <circle cx="320" cy="65" r="9" fill={NEUTRAL} />
    <line x1="300" y1="65" x2="62" y2="65" stroke={TONE_A} strokeWidth="3" strokeLinecap="round" />
    <Arrowhead baseX={62} tipX={40} y={65} halfHeight={10} color={TONE_A} />
    <line x1="340" y1="65" x2="560" y2="65" stroke={TONE_B} strokeWidth="3" strokeLinecap="round" />
    <line x1="560" y1="35" x2="560" y2="90" stroke={TONE_B} strokeWidth="3" strokeLinecap="round" />
    <Arrowhead baseX={560} tipX={600} y={46} halfHeight={11} color={TONE_B} />
  </DiagramFrame>
);

// Object pronoun placement: the same verb bar, stacked in both rows so
// they line up directly -- the only thing that moves is which side of it
// the pronoun sits on, with the polarity icon on the left explaining why.
const ObjectPronounPlacementDiagram = () => (
  <DiagramFrame label="Two identically placed verb bars, one above the other. In the affirmative row the pronoun token sits attached to the right of the bar; in the negative row it sits to the left instead.">
    <line x1="45" y1="35" x2="75" y2="35" stroke={TONE_B} strokeWidth="3" strokeLinecap="round" />
    <line x1="60" y1="20" x2="60" y2="50" stroke={TONE_B} strokeWidth="3" strokeLinecap="round" />
    <rect x="220" y="24" width="340" height="22" rx="11" fill="none" stroke={NEUTRAL} strokeWidth="2" />
    <circle cx="578" cy="35" r="18" fill={TONE_B} />

    <line x1="45" y1="98" x2="75" y2="98" stroke={TONE_A} strokeWidth="3" strokeLinecap="round" />
    <circle cx="202" cy="98" r="18" fill={TONE_A} />
    <rect x="220" y="87" width="340" height="22" rx="11" fill="none" stroke={NEUTRAL} strokeWidth="2" />
  </DiagramFrame>
);

// Personal "a": a row of plain, unmarked objects with one singled out by
// a small tag pointing down at it -- the tag is the only thing that
// changes, not the object itself.
const PersonalADiagram = () => (
  <DiagramFrame label="A row of plain, unmarked circles with one circle singled out by a small tag reading 'a' pointing down at it.">
    {[100, 220, 460, 580].map((x) => (
      <circle key={x} cx={x} cy="85" r="14" fill="none" stroke={NEUTRAL} strokeWidth="2" />
    ))}
    <circle cx="340" cy="85" r="16" fill={TONE_A} />
    <line x1="340" y1="66" x2="340" y2="46" stroke={TONE_A} strokeWidth="2" />
    <rect x="322" y="18" width="36" height="24" rx="6" fill={TONE_A} />
    <text x="340" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--color-surface)">
      a
    </text>
  </DiagramFrame>
);

// Gustar-type verbs: a balance scale that tips toward whichever side
// carries more weight -- one thing liked keeps it level, several things
// tip it -- while the person doing the liking floats above, unattached
// to the mechanism entirely.
const GustarDiagram = () => (
  <DiagramFrame label="A balance scale tipping toward the side carrying more weight, with a small figure representing the person floating above, unconnected to either side of the scale.">
    <circle cx="320" cy="26" r="10" fill="none" stroke={NEUTRAL} strokeWidth="2" />
    <line x1="320" y1="36" x2="320" y2="50" stroke={NEUTRAL} strokeWidth="2" strokeLinecap="round" />

    <path d="M 305 92 L 320 68 L 335 92 Z" fill={NEUTRAL} />
    <line x1="150" y1="58" x2="490" y2="86" stroke={NEUTRAL} strokeWidth="3" strokeLinecap="round" />

    <line x1="150" y1="58" x2="150" y2="80" stroke={TONE_A} strokeWidth="2" />
    <circle cx="150" cy="92" r="11" fill={TONE_A} />

    <line x1="490" y1="86" x2="490" y2="106" stroke={TONE_B} strokeWidth="2" />
    <circle cx="478" cy="118" r="10" fill={TONE_B} />
    <circle cx="500" cy="118" r="10" fill={TONE_B} />
    <circle cx="489" cy="103" r="10" fill={TONE_B} />
  </DiagramFrame>
);

export const collisionDiagrams: Record<string, () => React.JSX.Element> = {
  "preterite-vs-imperfect": PreteriteImperfectDiagram,
  "ser-vs-estar": SerEstarDiagram,
  "subjunctive-triggers": SubjunctiveTriggersDiagram,
  "por-vs-para": PorParaDiagram,
  "object-pronoun-placement": ObjectPronounPlacementDiagram,
  "personal-a": PersonalADiagram,
  "gustar-type-verbs": GustarDiagram,
};
