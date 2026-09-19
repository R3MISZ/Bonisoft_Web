/**
 * Demo content for the manager portal.
 * Everything here is invented: fictional company, fictional people.
 */
export type PortalViewId =
  | "dashboard"
  | "mitarbeiter"
  | "gruppen"
  | "aktionen"
  | "dienste";

/** Sidebar, grouped the way the real portal groups it. */
export const portalNav = [
  { group: null, items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }] },
  {
    group: "Management",
    items: [
      { id: "mitarbeiter", label: "Mitarbeiter", icon: "users" },
      { id: "gruppen", label: "Gruppen", icon: "group" },
    ],
  },
  {
    group: "Module",
    items: [
      { id: "aktionen", label: "Aktionen", icon: "zap" },
      { id: "dienste", label: "Dienste", icon: "box" },
    ],
  },
] as const;

export const portalDashboard = {
  title: "Dashboard",
  subtitle: "Willkommen zurück.",
  stats: [
    { label: "Mitarbeiter gesamt", value: "61", icon: "users" },
    { label: "Aktivierte Accounts", value: "17", hint: "28 % Aktivierungsrate", icon: "userCheck" },
    { label: "Höchster Punktestand", value: "20.344", hint: "Anna Berger", icon: "trending" },
    { label: "Meiste Aktionen", value: "62", hint: "Anna Berger", icon: "zap" },
  ],
  chart: {
    title: "Gesamtpunkte pro Mitarbeiter",
    bars: [
      { label: "Anna Berger", value: 20344 },
      { label: "Deniz Yilmaz", value: 14120 },
      { label: "Jonas Krüger", value: 12880 },
      { label: "Sara Klein", value: 11640 },
      { label: "Piotr Nowak", value: 9870 },
    ],
  },
} as const;

export const portalEmployees = {
  title: "Mitarbeiterverwaltung",
  subtitle: "Mitarbeiter verwalten und Module zuweisen.",
  rows: [
    { name: "Anna Berger", position: "Schichtleitung", group: "Lager", status: "Aktiv" },
    { name: "Deniz Yilmaz", position: "Kommissionierung", group: "Lager", status: "Aktiv" },
    { name: "Jonas Krüger", position: "Berufskraftfahrer", group: "Fuhrpark", status: "Aktiv" },
    { name: "Sara Klein", position: "Disposition", group: "Büro", status: "Eingeladen" },
    { name: "Piotr Nowak", position: "Werkstatt", group: "Technik", status: "Aktiv" },
  ],
} as const;

export const portalActionModules = {
  title: "Aktionsmodule",
  subtitle: "Aufgaben, die auf ein Ziel einzahlen.",
  cards: [
    {
      name: "Ladungssicherung prüfen",
      description: "Vor jeder Tour prüfen und per Foto bestätigen.",
      icon: "securing",
      reward: "40",
      participants: "Fuhrpark",
    },
    {
      name: "Hallenrundgang",
      description: "Einmal pro Schicht die Sicherheitspunkte abgehen.",
      icon: "walkthrough",
      reward: "50",
      participants: "Lager",
    },
    {
      name: "Anwesenheitsquote",
      description: "Wird monatlich automatisch ausgewertet.",
      icon: "attendance",
      reward: "200",
      participants: "Unbegrenzt",
    },
    {
      name: "Zertifikate & Schulungen",
      description: "Nachweise hochladen und aktuell halten.",
      icon: "training",
      reward: "150",
      participants: "Unbegrenzt",
    },
    {
      name: "Schichtübergabe dokumentieren",
      description: "Offene Punkte für die nächste Schicht festhalten.",
      icon: "handover",
      reward: "30",
      participants: "Lager",
    },
    {
      name: "Wareneingang prüfen",
      description: "Lieferung gegen den Lieferschein abgleichen.",
      icon: "incoming",
      reward: "60",
      participants: "Lager",
    },
  ],
} as const;

export const portalServiceModules = {
  title: "Service-Module",
  subtitle: "Die Module der Mitarbeiter-App.",
  cards: [
    { name: "Schichtkalender", type: "Kalender", visible: true, scope: "Alle" },
    { name: "Intranet", type: "Link", visible: true, scope: "Alle" },
    { name: "Betriebsvereinbarung", type: "Datei", visible: true, scope: "2 Gruppen" },
    { name: "Stundenzettel", type: "Zeiterfassung", visible: true, scope: "Alle" },
    { name: "Urlaub & Krankmeldung", type: "Abwesenheit", visible: true, scope: "Alle" },
    { name: "Meine Dokumente", type: "Persönliche Dokumente", visible: true, scope: "Alle" },
    { name: "Bestenliste Lager", type: "Leaderboard", visible: false, scope: "1 Gruppe" },
  ],
} as const;

export const portalGroups = {
  title: "Gruppen",
  subtitle: "Gruppen verwalten und Module zuweisen.",
  rows: [
    { name: "Lager", actions: ["clipboard", "trophy", "zap"], extra: 2, services: ["calendar", "link"], members: 12 },
    { name: "Fuhrpark", actions: ["truck", "clock"], extra: 0, services: ["file"], members: 9 },
    { name: "Büro", actions: ["zap"], extra: 0, services: ["calendar", "link"], members: 6 },
    { name: "Technik", actions: ["clipboard"], extra: 0, services: ["calendar"], members: 4 },
    { name: "Disposition", actions: [], extra: 0, services: ["link"], members: 3 },
  ],
} as const;
