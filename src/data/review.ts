/**
 * Demo data for the approval view: who handed in what, and what the manager
 * sees before deciding. Mirrors the portal's incentive view, reduced to the
 * three columns that carry the point — no filters, no pagination.
 */
export type Verdict = "approved" | "reduced" | "open";

export interface ReviewEntry {
  /** Day the task was handed in; the portal shows a period here. */
  period: string;
  verdict: Verdict;
  completedAt: string;
  /** What was actually credited — below `maxPoints` when the manager cut it. */
  points: number;
  status: string;
  checklist: { label: string; ok: boolean }[];
  photo: string;
  /** Only where the manager left one. */
  note?: string;
}

export interface ReviewPerson {
  name: string;
  initials: string;
  entries: ReviewEntry[];
}

export const reviewModule = {
  name: "Ladungssicherung vor Fahrtantritt",
  maxPoints: 40,
};

const checklistDone = [
  { label: "Gurte gespannt", ok: true },
  { label: "Kanten geschützt", ok: true },
  { label: "Ladung formschlüssig", ok: true },
];

const checklistNoEdges = [
  { label: "Gurte gespannt", ok: true },
  { label: "Kanten geschützt", ok: false },
  { label: "Ladung formschlüssig", ok: true },
];

const photoGood = "Ladefläche von hinten, Gurte und Kantenschutz sichtbar";

export const reviewPeople: ReviewPerson[] = [
  {
    name: "Anna Berger",
    initials: "AB",
    entries: [
      {
        period: "19.09.2026",
        verdict: "approved",
        completedAt: "19.09.2026, 06:12 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
      {
        period: "18.09.2026",
        verdict: "approved",
        completedAt: "18.09.2026, 05:58 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
      {
        period: "17.09.2026",
        verdict: "approved",
        completedAt: "17.09.2026, 06:20 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: "Ladefläche von hinten, Spanngurte doppelt gesetzt",
      },
      {
        period: "16.09.2026",
        verdict: "approved",
        completedAt: "16.09.2026, 06:05 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
    ],
  },
  {
    name: "Deniz Yılmaz",
    initials: "DY",
    entries: [
      {
        period: "19.09.2026",
        verdict: "reduced",
        completedAt: "19.09.2026, 06:41 Uhr",
        points: 10,
        status: "Gekürzt",
        checklist: checklistDone,
        photo: "Aufnahme der leeren Ladefläche, keine Ladung zu erkennen",
        note: "Foto zeigt die Sicherung nicht. Belohnung gekürzt, Fahrer informiert.",
      },
      {
        period: "18.09.2026",
        verdict: "approved",
        completedAt: "18.09.2026, 06:33 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
      {
        period: "16.09.2026",
        verdict: "approved",
        completedAt: "16.09.2026, 07:14 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: "Seitliche Aufnahme, Zurrpunkte im Bild",
      },
    ],
  },
  {
    name: "Jonas Krüger",
    initials: "JK",
    entries: [
      {
        period: "19.09.2026",
        verdict: "open",
        completedAt: "19.09.2026, 07:03 Uhr",
        points: 0,
        status: "Wartet auf Freigabe",
        checklist: checklistNoEdges,
        photo: "Ladefläche seitlich, Kantenschutz fehlt an zwei Stellen",
      },
      {
        period: "18.09.2026",
        verdict: "reduced",
        completedAt: "18.09.2026, 06:47 Uhr",
        points: 20,
        status: "Gekürzt",
        checklist: checklistNoEdges,
        photo: "Ladefläche von hinten, Kantenschutz nur an der linken Seite",
        note: "Teilweise gesichert. Halbe Belohnung, Hinweis an den Disponenten.",
      },
      {
        period: "15.09.2026",
        verdict: "approved",
        completedAt: "15.09.2026, 05:51 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
    ],
  },
  {
    name: "Sara Klein",
    initials: "SK",
    entries: [
      {
        period: "19.09.2026",
        verdict: "approved",
        completedAt: "19.09.2026, 05:44 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
      {
        period: "17.09.2026",
        verdict: "open",
        completedAt: "17.09.2026, 06:28 Uhr",
        points: 0,
        status: "Wartet auf Freigabe",
        checklist: checklistDone,
        photo: "Aufnahme bei Dämmerung, Gurte erkennbar, Kanten im Schatten",
      },
      {
        period: "16.09.2026",
        verdict: "approved",
        completedAt: "16.09.2026, 05:37 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
      {
        period: "15.09.2026",
        verdict: "approved",
        completedAt: "15.09.2026, 06:02 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: "Ladefläche von hinten, Ladung bündig an der Stirnwand",
      },
      {
        period: "12.09.2026",
        verdict: "approved",
        completedAt: "12.09.2026, 05:49 Uhr",
        points: 40,
        status: "Freigegeben",
        checklist: checklistDone,
        photo: photoGood,
      },
    ],
  },
];
