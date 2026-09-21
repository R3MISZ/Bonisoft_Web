/**
 * The loop from goal to improvement, split across two lanes.
 * `column` is the position on the timeline — it doubles as the step number.
 */
export type Lane = "manager" | "employee";

export const laneLabels: Record<Lane, string> = {
  manager: "Führungskraft",
  employee: "Mitarbeitende",
};

export const steps = [
  {
    column: 1,
    lane: "manager",
    title: "Potenziale definieren",
    text: "Welche Kennzahlen zählen – und wo der Hebel liegt.",
  },
  {
    column: 2,
    lane: "manager",
    title: "Aktionen erstellen",
    text: "Welche Aufgabe zahlt auf welches Ziel ein?",
  },
  {
    column: 3,
    lane: "employee",
    title: "Aktionen umsetzen",
    text: "Aufgaben und Checklisten landen in der App.",
  },
  {
    column: 4,
    lane: "manager",
    title: "Ergebnis & Feedback",
    text: "Leistung wird sichtbar – auf beiden Seiten.",
  },
  {
    column: 5,
    lane: "manager",
    title: "Prozesse verbessern",
    text: "Nachjustieren und auf weitere Standorte ausrollen.",
  },
] as const satisfies readonly { column: number; lane: Lane; title: string; text: string }[];

/** Runs alongside step 4 rather than after it — the reward is not a project phase. */
export const rewardStep = {
  column: 4,
  lane: "employee",
  title: "Belohnung abholen",
  text: "Punkte sofort, nicht am Jahresende.",
} as const;
