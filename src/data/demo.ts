import { portalActionModules, portalServiceModules } from "./portal";

/**
 * Demo content for the interactive product preview.
 * Portal and app have different navigation because they serve different jobs —
 * the manager steers by area, the employee acts on what is next.
 */
export type MobileViewId = (typeof mobileNav)[number]["id"];

/**
 * Actions this employee already finished today. They exist in the portal like
 * every other action — the app just shows them below the open ones, greyed out.
 */
const doneToday: Record<string, string> = {
  "Schichtübergabe dokumentieren": "Heute, 06:12 Uhr",
  "Wareneingang prüfen": "Heute, 07:40 Uhr",
};

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
  initials: "AB",
} as const;

/** Views that render as a simple list. Shop has its own layout, see below. */
export const mobileListViews = {
  aktionen: {
    title: "Heute zu erledigen",
    /* Same tasks the manager configured in the portal — one source, two views. */
    rows: portalActionModules.cards
      .filter((card) => !(card.name in doneToday))
      .map((card) => ({
        title: card.name,
        meta: card.description,
        points: card.reward,
        icon: card.icon,
      })),
    /* Sits below the open tasks, greyed out — done is done, but it stays visible. */
    doneHeading: "Erledigte Aktionen",
    done: portalActionModules.cards
      .filter((card) => card.name in doneToday)
      .map((card) => ({
        title: card.name,
        meta: doneToday[card.name],
        points: card.reward,
        icon: card.icon,
      })),
  },
  dashboard: {
    title: "Deine Woche",
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
} as const;

/**
 * Konto tab: the partner grid the employee picks from. Names are invented —
 * no third-party logos on a public marketing page without a licence.
 */
export const mobileAccount = {
  searchPlaceholder: "Suchen",
  partners: [
    { name: "Tankstelle", color: "bg-red-600" },
    { name: "Supermarkt", color: "bg-emerald-600" },
    { name: "Baumarkt", color: "bg-amber-500" },
    { name: "Elektronik", color: "bg-sky-600" },
    { name: "Möbelhaus", color: "bg-rose-500" },
    { name: "Drogerie", color: "bg-violet-600" },
    { name: "Mode", color: "bg-ink-800" },
    { name: "Streaming", color: "bg-teal-600" },
    { name: "Sport", color: "bg-orange-500" },
    { name: "Buchhandel", color: "bg-indigo-500" },
    { name: "Restaurant", color: "bg-lime-600" },
    { name: "Reise", color: "bg-cyan-600" },
    { name: "Kaffee", color: "bg-yellow-600" },
    { name: "Spielwaren", color: "bg-fuchsia-600" },
    { name: "Mietwagen", color: "bg-slate-600" },
  ],
} as const;

/**
 * Shop view. Partner tiles stay generic on purpose — no third-party logos
 * on a public marketing page without a licence.
 */
export const mobileShop = {
  benefits: {
    heading: "Steuerfreier Sachbezug",
    tiles: [
      { name: "Tankkarte", hint: "50 € / Monat", color: "bg-blue-600" },
      { name: "Supermarkt", hint: "frei wählbar", color: "bg-red-600" },
      { name: "Weitere", hint: "30+ Partner", color: "bg-emerald-600" },
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
 * Dienste tab: exactly the service modules the manager set to visible.
 * Hidden ones never reach the app — that is the point of the pairing.
 */
export const mobileServices = portalServiceModules.cards.filter((card) => card.visible);
