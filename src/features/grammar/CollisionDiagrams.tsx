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

// Être vs. avoir: a wide cluster of small circles (most verbs) funneling
// into the avoir arrow, and a smaller cluster (movement and reflexive
// verbs) funneling into the être arrow below it -- with one dot breaking
// off the être cluster and curving back up toward avoir, for the handful
// of movement verbs that switch auxiliaries the moment they take a direct
// object.
const AvoirEtreDiagram = () => (
  <DiagramFrame label="A wide cluster of small circles representing most verbs converging on a single avoir arrow, and a smaller cluster representing movement and reflexive verbs converging on a separate être arrow below it, with one circle breaking off the être cluster and curving back up toward the avoir arrow.">
    {[20, 45, 70, 95, 120].map((x) => (
      <circle key={`a-${x}`} cx={x} cy="30" r="6" fill={NEUTRAL} />
    ))}
    {[20, 45, 70, 95, 120].map((x) => (
      <line key={`al-${x}`} x1={x} y1="30" x2="180" y2="30" stroke={NEUTRAL} strokeWidth="1" />
    ))}
    <line x1="180" y1="30" x2="590" y2="30" stroke={TONE_A} strokeWidth="3" strokeLinecap="round" />
    <Arrowhead baseX={590} tipX={614} y={30} halfHeight={8} color={TONE_A} />

    {[20, 45, 70].map((x) => (
      <circle key={`b-${x}`} cx={x} cy="95" r="6" fill={NEUTRAL} />
    ))}
    {[20, 45, 70].map((x) => (
      <line key={`bl-${x}`} x1={x} y1="95" x2="150" y2="95" stroke={NEUTRAL} strokeWidth="1" />
    ))}
    <line x1="150" y1="95" x2="430" y2="95" stroke={TONE_B} strokeWidth="3" strokeLinecap="round" />
    <Arrowhead baseX={430} tipX={454} y={95} halfHeight={8} color={TONE_B} />

    <path d="M 150 95 C 220 95, 260 40, 300 32" fill="none" stroke={TONE_B} strokeWidth="2" strokeDasharray="3 5" />
    <circle cx="300" cy="32" r="5" fill="none" stroke={TONE_A} strokeWidth="2" />
  </DiagramFrame>
);

// Object pronoun order: the same verb bar in both rows, preceded by two
// pronoun tokens -- the le/la/les token (mid tone) sits closest to the
// verb when paired with me/te/nous/vous (top row), but jumps to the front
// of the pair when paired with lui/leur instead (bottom row).
const ObjectPronounOrderDiagram = () => (
  <DiagramFrame label="Two identical verb bars, each preceded by two pronoun tokens. In the top row the me/te/nous/vous token leads, followed by the le/la/les token closest to the verb. In the bottom row the le/la/les token leads instead, followed by the lui/leur token closest to the verb.">
    <rect x="345" y="22" width="170" height="24" rx="12" fill="none" stroke={NEUTRAL} strokeWidth="2" />
    <rect x="125" y="22" width="90" height="24" rx="12" fill={TONE_A} />
    <rect x="235" y="22" width="90" height="24" rx="12" fill={NEUTRAL} />

    <rect x="345" y="86" width="170" height="24" rx="12" fill="none" stroke={NEUTRAL} strokeWidth="2" />
    <rect x="125" y="86" width="90" height="24" rx="12" fill={NEUTRAL} />
    <rect x="235" y="86" width="90" height="24" rx="12" fill={TONE_B} />
  </DiagramFrame>
);

// Partitive articles: negation (the no-entry icon on the arrow) shrinks
// the du/de la/des token down to a plain de in the top row -- but when
// the negated verb is être making an identity claim rather than denying
// the noun's existence, that same negation has no effect and the token
// survives unchanged (bottom row), matching the ce n'est pas exception
// in the collision sentence.
const PartitiveArticlesDiagram = () => (
  <DiagramFrame label="Two rows, each starting from the same pill-shaped token representing du, de la, or des. In the top row, an arrow marked with a no-entry icon for negation leads to a smaller circle representing the reduced de. In the bottom row, the same arrow carries no such marking, and the pill-shaped token survives unchanged on the other side, representing the exception when the negated verb is être.">
    <rect x="62" y="24" width="70" height="22" rx="11" fill={TONE_A} />
    <line x1="152" y1="35" x2="462" y2="35" stroke={NEUTRAL} strokeWidth="2.5" strokeLinecap="round" />
    <Arrowhead baseX={462} tipX={482} y={35} halfHeight={8} color={NEUTRAL} />
    <circle cx="307" cy="35" r="10" fill="none" stroke={TONE_B} strokeWidth="2" />
    <line x1="300" y1="28" x2="314" y2="42" stroke={TONE_B} strokeWidth="2" strokeLinecap="round" />
    <circle cx="542" cy="35" r="11" fill={TONE_B} />

    <rect x="62" y="87" width="70" height="22" rx="11" fill={TONE_A} />
    <line x1="152" y1="98" x2="462" y2="98" stroke={NEUTRAL} strokeWidth="2.5" strokeLinecap="round" />
    <Arrowhead baseX={462} tipX={482} y={98} halfHeight={8} color={NEUTRAL} />
    <rect x="507" y="87" width="70" height="22" rx="11" fill={TONE_A} />
  </DiagramFrame>
);

// Gender & adjective agreement: one adjective splitting into a masculine
// line and a feminine line, with a short dashed branch off the masculine
// line for the special third form used only before a vowel sound.
const GenderAgreementDiagram = () => (
  <DiagramFrame label="A central node branching into a masculine line and a feminine line, with a short additional dashed branch off the masculine line representing the special form used before a vowel sound.">
    <circle cx="60" cy="65" r="10" fill={NEUTRAL} />
    <line x1="70" y1="65" x2="300" y2="35" stroke={TONE_A} strokeWidth="3" strokeLinecap="round" />
    <circle cx="300" cy="35" r="7" fill={TONE_A} />
    <DashedLine d="M 300 35 L 470 20" color={TONE_A} />
    <circle cx="470" cy="20" r="6" fill="none" stroke={TONE_A} strokeWidth="2" />
    <line x1="70" y1="65" x2="300" y2="98" stroke={TONE_B} strokeWidth="3" strokeLinecap="round" />
    <circle cx="300" cy="98" r="7" fill={TONE_B} />
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
  "etre-vs-avoir": AvoirEtreDiagram,
  "object-pronoun-order": ObjectPronounOrderDiagram,
  "partitive-articles": PartitiveArticlesDiagram,
  "gender-adjective-agreement": GenderAgreementDiagram,
};
