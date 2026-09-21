/**
 * Shapes for the three legal pages. Their wording is legal text taken from
 * bonisoft.de — kept as data so the pages stay pure layout and nobody has to
 * read JSX to correct a clause.
 */

/** A paragraph, a heading, a bullet list, or a numbered AGB clause. */
export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  /** A deeper heading inside a subsection. */
  | { kind: "hs"; text: string }
  | { kind: "ul"; items: string[] }
  /** The clause number is set apart from the sentence. */
  | { kind: "clause"; no: string; text: string };

export interface LegalSection {
  /** Anchor and table-of-contents target. */
  id: string;
  title: string;
  blocks: LegalBlock[];
}
