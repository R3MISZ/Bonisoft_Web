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
    text: "Festlegen, welche Kennzahlen zählen und wo der größte Hebel liegt.",
  },
  {
    column: 2,
    lane: "manager",
    title: "Aktionen erstellen",
    text: "Regeln hinterlegen: Welche Aufgabe zahlt auf welches Ziel ein?",
  },
  {
    column: 3,
    lane: "employee",
    title: "Aktionen umsetzen",
    text: "Aufgaben und Checklisten landen direkt in der App – dort, wo gearbeitet wird.",
  },
  {
    column: 4,
    lane: "manager",
    title: "Ergebnis & Feedback",
    text: "Leistung wird sichtbar, auf beiden Seiten und ohne Nachfragen.",
  },
  {
    column: 5,
    lane: "manager",
    title: "Prozesse verbessern",
    text: "Datenbasiert nachjustieren und auf weitere Standorte ausrollen.",
  },
] as const satisfies readonly { column: number; lane: Lane; title: string; text: string }[];

/** Runs alongside step 4 rather than after it — the reward is not a project phase. */
export const rewardStep = {
  column: 4,
  lane: "employee",
  title: "Belohnung abholen",
  text: "Punkte, Prämien und Anerkennung – unmittelbar, nicht am Jahresende.",
} as const;
