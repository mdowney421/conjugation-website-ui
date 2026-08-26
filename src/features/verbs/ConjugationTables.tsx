import type {
  ImperativeConjugationTable,
  Tense,
  VerbConjugationTable,
} from "../../languages/types";

// Indicative and subjunctive forms for a tense share one table, laid out
// as parallel columns per pronoun -- a mood badge in the header marks
// which column is which, and the subjunctive column drops in a note
// (via rowSpan) for tenses the language has no subjunctive form for at all.
export const MergedConjugationTable = ({
  indicative,
  subjunctive,
  hasSubjunctive,
  displayName,
}: {
  indicative: VerbConjugationTable;
  subjunctive: VerbConjugationTable | null;
  hasSubjunctive: boolean;
  displayName: string;
}) => {
  const rows = indicative.conjugations;

  return (
    <table className="conjugation-table conjugation-table-merged">
      <thead>
        <tr>
          <th>Pronoun</th>
          <th>
            <span className="mood-badge mood-badge-indicative">Indicative</span>
          </th>
          <th>
            <span className="mood-badge mood-badge-subjunctive">Subjunctive</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const subjunctiveRow = subjunctive?.conjugations[index];
          return (
            <tr key={row.pronoun_target}>
              <td className="pronoun-cell">{row.pronoun_target}</td>
              <td className="target-cell">
                <div className="conjugation-form-group">
                  <span className="conjugation-form">
                    {row.form_target}
                    {row.form_target_alt && ` / ${row.form_target_alt}`}
                  </span>
                  <span className="conjugation-gloss">
                    {row.pronoun_english} {row.form_english}
                  </span>
                </div>
              </td>
              {!hasSubjunctive ? (
                index === 0 && (
                  <td className="no-subjunctive-cell" rowSpan={rows.length}>
                    {displayName} has no subjunctive form for this tense.
                  </td>
                )
              ) : (
                <td className="target-cell">
                  {subjunctiveRow && (
                    <div className="conjugation-form-group">
                      <span className="conjugation-form">
                        {subjunctiveRow.form_target}
                        {subjunctiveRow.form_target_alt && ` / ${subjunctiveRow.form_target_alt}`}
                      </span>
                      <span className="conjugation-gloss">
                        (that) {subjunctiveRow.pronoun_english} {subjunctiveRow.form_english}
                      </span>
                    </div>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// The imperative has no "yo" form and no single indicative/subjunctive
// axis -- affirmative and negative are different enough (and taught
// together often enough) that they get their own columns side by side
// instead of the mood-picker treatment every other tense gets.
export const ImperativeTable = ({ table }: { table: ImperativeConjugationTable }) => (
  <table className="conjugation-table">
    <thead>
      <tr>
        <th>Pronoun</th>
        <th>Affirmative</th>
        <th>Negative</th>
      </tr>
    </thead>
    <tbody>
      {table.conjugations.map((row) => (
        <tr key={row.pronoun_target}>
          <td className="pronoun-cell">{row.pronoun_target}</td>
          <td className="target-cell">
            <div className="conjugation-form-group">
              <span className="conjugation-form">{row.form_target_affirmative}</span>
              <span className="conjugation-gloss">{row.form_english_affirmative}</span>
            </div>
          </td>
          <td className="target-cell">
            <div className="conjugation-form-group">
              <span className="conjugation-form">{row.form_target_negative}</span>
              <span className="conjugation-gloss">{row.form_english_negative}</span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export type TenseGroupConfig = { tense: Tense; label: string; hasSubjunctive: boolean };

// Every tense this app supports, ordered furthest-in-the-past to
// furthest-in-the-future. Tenses with a subjunctive counterpart show
// indicative and subjunctive side by side; the rest are indicative-only
// (Spanish has no subjunctive preterite, future, or conditional).
export const TENSE_GROUPS: TenseGroupConfig[] = [
  { tense: "pluperfect", label: "Pluperfect", hasSubjunctive: true },
  { tense: "preterite_perfect", label: "Preterite Perfect", hasSubjunctive: false },
  { tense: "imperfect", label: "Imperfect", hasSubjunctive: true },
  { tense: "preterite", label: "Preterite", hasSubjunctive: false },
  { tense: "perfect", label: "Present Perfect", hasSubjunctive: true },
  { tense: "present", label: "Present", hasSubjunctive: true },
  { tense: "conditional", label: "Conditional", hasSubjunctive: false },
  { tense: "conditional_perfect", label: "Conditional Perfect", hasSubjunctive: false },
  { tense: "future", label: "Future", hasSubjunctive: false },
  { tense: "future_perfect", label: "Future Perfect", hasSubjunctive: false },
];

// The imperative is built out of present-indicative and present-subjunctive
// forms, so it's shown right after the present-tense group.
export const IMPERATIVE_AFTER_INDEX = TENSE_GROUPS.findIndex((group) => group.tense === "present");

export type GroupData = {
  indicative: VerbConjugationTable | null;
  subjunctive: VerbConjugationTable | null;
};

export const TenseGroupSection = ({
  group,
  data,
  displayName,
}: {
  group: TenseGroupConfig;
  data: GroupData;
  displayName: string;
}) => {
  if (!data.indicative) return null;

  return (
    <div className="conjugation-section">
      <h2 className="conjugation-section-heading">{group.label}</h2>
      <MergedConjugationTable
        indicative={data.indicative}
        subjunctive={data.subjunctive}
        hasSubjunctive={group.hasSubjunctive}
        displayName={displayName}
      />
    </div>
  );
};
