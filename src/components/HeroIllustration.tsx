const GREETINGS: {
  text: string;
  x: number;
  y: number;
  color: string;
}[] = [
  { text: "¡Hola!", x: 18, y: 26, color: "var(--color-primary)" },
  { text: "Bonjour", x: 240, y: 14, color: "var(--color-accent-3)" },
  { text: "Ciao!", x: 262, y: 176, color: "var(--color-accent)" },
  { text: "こんにちは", x: 10, y: 190, color: "var(--color-accent-4)" },
  { text: "Hallo", x: 130, y: 240, color: "var(--color-accent-2)" },
];

const HeroIllustration = () => (
  <svg
    viewBox="0 0 340 280"
    role="img"
    aria-label="A globe surrounded by greetings in different languages"
    className="hero-illustration-svg"
  >
    <circle
      cx="170"
      cy="140"
      r="82"
      fill="var(--color-primary-light)"
      stroke="var(--color-primary)"
      strokeWidth="2"
    />
    <ellipse
      cx="170"
      cy="140"
      rx="82"
      ry="32"
      fill="none"
      stroke="var(--color-primary)"
      strokeOpacity="0.45"
      strokeWidth="1.5"
    />
    <ellipse
      cx="170"
      cy="140"
      rx="35"
      ry="82"
      fill="none"
      stroke="var(--color-primary)"
      strokeOpacity="0.45"
      strokeWidth="1.5"
    />
    <line
      x1="88"
      y1="140"
      x2="252"
      y2="140"
      stroke="var(--color-primary)"
      strokeOpacity="0.45"
      strokeWidth="1.5"
    />

    {GREETINGS.map((greeting) => (
      <g key={greeting.text} transform={`translate(${greeting.x}, ${greeting.y})`}>
        <rect
          width={greeting.text.length * 9.5 + 24}
          height="34"
          rx="17"
          fill={greeting.color}
        />
        <text
          x={(greeting.text.length * 9.5 + 24) / 2}
          y="22"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill="#ffffff"
          fontFamily="var(--font-body)"
        >
          {greeting.text}
        </text>
      </g>
    ))}
  </svg>
);

export default HeroIllustration;
