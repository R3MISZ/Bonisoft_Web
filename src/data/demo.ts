import { portalActionModules, portalServiceModules } from "./portal";

/**
 * Demo content for the interactive product preview.
 * Portal and app have different navigation because they serve different jobs —
 * the manager steers by area, the employee acts on what is next.
 */
export type MobileViewId = (typeof mobileNav)[number]["id"];

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
    rows: portalActionModules.cards.map((card) => ({
      title: card.name,
      meta: card.description,
      points: card.reward,
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
  konto: {
    title: "Dein Konto",
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
 * Dienste tab: exactly the service modules the manager set to visible.
 * Hidden ones never reach the app — that is the point of the pairing.
 */
export const mobileServices = portalServiceModules.cards.filter((card) => card.visible);
