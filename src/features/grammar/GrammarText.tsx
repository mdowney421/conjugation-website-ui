import type { GrammarTextPart } from "../../languages/types";

const GrammarText = ({ parts }: { parts: GrammarTextPart[] }) => (
  <>
    {parts.map((part, index) =>
      part.tone ? (
        <b key={index} className={`grammar-tone-${part.tone}`}>
          {part.text}
        </b>
      ) : (
        <span key={index}>{part.text}</span>
      ),
    )}
  </>
);

export default GrammarText;
