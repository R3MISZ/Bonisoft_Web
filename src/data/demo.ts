/**
 * Demo content for the interactive product preview.
 * Portal and app have different navigation because they serve different jobs —
 * the manager steers by area, the employee acts on what is next.
 */
export type PortalViewId = (typeof portalViews)[number]["id"];
export type MobileViewId = (typeof mobileNav)[number]["id"];

export const portalViews = [
  {
    id: "kennzahlen",
    label: "Kennzahlen",
    title: "Standort Dortmund · KW 38",
    stats: [
      { label: "Pickingquote", value: "96 %", trend: "+4" },
      { label: "Anwesenheit", value: "94 %", trend: "+1" },
      { label: "Fahrer-Score", value: "82", trend: "+7" },
      { label: "Schadensquote", value: "1,2 %", trend: "−0,4" },
    ],
    rows: [
      { title: "Schicht Früh", meta: "18 Mitarbeitende", status: "Ziel erreicht" },
      { title: "Schicht Spät", meta: "15 Mitarbeitende", status: "Ziel erreicht" },
      { title: "Schicht Nacht", meta: "9 Mitarbeitende", status: "Knapp darunter" },
    ],
  },
  {
    id: "aufgaben",
    label: "Aufgaben",
    title: "Offene Checklisten",
    stats: [
      { label: "Offen", value: "6", trend: "" },
      { label: "Heute fällig", value: "3", trend: "" },
      { label: "Quote", value: "91 %", trend: "+3" },
    ],
    rows: [
      { title: "Staplerpflege", meta: "Halle 2 · täglich", status: "Offen" },
      { title: "Ladungssicherung prüfen", meta: "Rampe 4 · je Tour", status: "Offen" },
      { title: "Hallenrundgang", meta: "Sicherheit · wöchentlich", status: "Offen" },
      { title: "Fotodokumentation Schaden", meta: "LKW B-ON 4412", status: "Erledigt" },
    ],
  },
  {
    id: "dienstplan",
    label: "Dienstplan",
    title: "Woche 38 · Schichtbesetzung",
    stats: [
      { label: "Besetzt", value: "42 / 45", trend: "" },
      { label: "Offene Schichten", value: "3", trend: "" },
      { label: "Tauschanfragen", value: "2", trend: "" },
    ],
    rows: [
      { title: "Früh 06:00 – 14:00", meta: "18 von 18 besetzt", status: "Vollständig" },
      { title: "Spät 14:00 – 22:00", meta: "14 von 15 besetzt", status: "1 offen" },
      { title: "Nacht 22:00 – 06:00", meta: "9 von 12 besetzt", status: "3 offen" },
    ],
  },
  {
    id: "gutscheine",
    label: "Gutscheine",
    title: "Ausgeschüttete Benefits",
    stats: [
      { label: "Budget genutzt", value: "68 %", trend: "" },
      { label: "Ausgezahlt Q3", value: "12.400 €", trend: "" },
      { label: "Einlösequote", value: "87 %", trend: "+5" },
    ],
    rows: [
      { title: "Tankgutscheine", meta: "38 Mitarbeitende", status: "1.900 €" },
      { title: "Einkaufsgutscheine", meta: "24 Mitarbeitende", status: "960 €" },
      { title: "Jobrad-Zuschuss", meta: "11 Mitarbeitende", status: "monatlich" },
    ],
  },
] as const;

/** Bottom navigation of the employee app. Order matters. */
export const mobileNav = [
  { id: "aktionen", label: "Aktionen" },
  { id: "dashboard", label: "Dashboard" },
  { id: "konto", label: "Konto" },
  { id: "shop", label: "Shop" },
  { id: "dienste", label: "Dienste" },
] as const;

/** Header of the employee app, shown above every view. */
export const mobileHeader = {
  points: "890",
  streak: "2",
  initials: "Mi",
} as const;

/** Views that render as a simple list. Shop has its own layout, see below. */
export const mobileListViews = {
  aktionen: {
    title: "Heute zu erledigen",
    checkable: true,
    stats: [
      { label: "Offen", value: "3" },
      { label: "Punkte heute", value: "+120" },
    ],
    rows: [
      { title: "Staplerpflege", meta: "Halle 2 · bis 14:00", status: "40 Punkte" },
      { title: "Ladungssicherung prüfen", meta: "Rampe 4 · je Tour", status: "30 Punkte" },
      { title: "Hallenrundgang", meta: "Sicherheit · heute", status: "50 Punkte" },
      { title: "Schadensfoto hochladen", meta: "LKW B-ON 4412", status: "Erledigt" },
    ],
  },
  dashboard: {
    title: "Deine Woche",
    checkable: false,
    stats: [
      { label: "Pickingquote", value: "96 %" },
      { label: "Anwesenheit", value: "100 %" },
    ],
    rows: [
      { title: "Wochenziel Picking", meta: "96 % von 94 %", status: "Erreicht" },
      { title: "Schadensfreie Touren", meta: "12 von 12", status: "Erreicht" },
      { title: "Checklisten-Quote", meta: "11 von 12", status: "92 %" },
      { title: "Streak", meta: "2 Wochen in Folge", status: "+100" },
    ],
  },
  konto: {
    title: "Dein Konto",
    checkable: false,
    stats: [
      { label: "Punktestand", value: "890" },
      { label: "Sachbezug frei", value: "50 €" },
    ],
    rows: [
      { title: "Hallenrundgang", meta: "18.09. · Aufgabe", status: "+50" },
      { title: "Pickingquote Woche 37", meta: "16.09. · Ziel erreicht", status: "+200" },
      { title: "Tankgutschein", meta: "12.09. · eingelöst", status: "−1.000" },
      { title: "Anwesenheitsprämie", meta: "01.09. · monatlich", status: "+300" },
    ],
  },
} as const;

/**
 * Shop view. Partner tiles stay generic on purpose — no third-party logos
 * on a public marketing page without a licence.
 */
export const mobileShop = {
  benefits: {
    heading: "Steuerfreier Sachbezug",
    tiles: [
      { name: "Tankkarte", hint: "50 € / Monat" },
      { name: "Supermarkt", hint: "frei wählbar" },
      { name: "Weitere", hint: "30+ Partner" },
    ],
  },
  bonus: {
    heading: "Bruttobonus",
    points: "390",
    unit: "verfügbare Punkte",
    action: "Bruttobonus auszahlen",
  },
  voucher: {
    heading: "Gutscheinshop",
    title: "Jetzt Gutscheine sichern",
    text: "Zahle deine gesammelten Punkte als Gutschein aus.",
  },
  pension: {
    heading: "Betriebliche Altersvorsorge",
    points: "390",
    unit: "verfügbare Punkte",
    action: "In Altersvorsorge einzahlen",
  },
} as const;


/**
 * Dienste tab: concrete services a customer built from the modules.
 * `module` names the building block it came from — that link is the message.
 */
export const mobileServices = [
  { label: "Urlaub beantragen", module: "Abwesenheit", icon: "absence", color: "bg-red-500" },
  { label: "Krankmeldung", module: "Abwesenheit", icon: "sick", color: "bg-red-500" },
  { label: "Stundenzettel", module: "Zeiterfassung", icon: "clock", color: "bg-violet-500" },
  { label: "Schichtkalender", module: "Kalender", icon: "calendar", color: "bg-teal-500" },
  { label: "Intranet", module: "Link", icon: "link", color: "bg-blue-500" },
  { label: "Betriebsvereinbarung", module: "Datei", icon: "file", color: "bg-indigo-500" },
  { label: "Meine Dokumente", module: "Persönliche Dokumente", icon: "personalDocs", color: "bg-slate-500" },
  { label: "Bestenliste", module: "Leaderboard", icon: "trophy", color: "bg-orange-500" },
] as const;

export type MobileServiceIcon = (typeof mobileServices)[number]["icon"];
