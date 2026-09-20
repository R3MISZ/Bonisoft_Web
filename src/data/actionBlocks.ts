/**
 * The building blocks an action module is assembled from, as they exist in the
 * product today. Labels match the wizard so a demo never contradicts the page.
 */
export const actionBlocks = [
  { label: "Checkliste", icon: "checklist" },
  { label: "Fotodokumentation", icon: "photo" },
  { label: "Sternebewertung", icon: "stars" },
  { label: "Daumenbewertung", icon: "thumbs" },
  { label: "Textfeld", icon: "text" },
  { label: "Dropdown", icon: "dropdown" },
  { label: "Datum", icon: "date" },
  { label: "Terminumfrage", icon: "survey" },
  { label: "Verlinkung", icon: "link" },
  { label: "Geburtstagsbonus", icon: "birthday" },
  { label: "Jubiläumsbonus", icon: "anniversary" },
  { label: "Monatlicher Sachbezug", icon: "benefit" },
] as const;

export type ActionBlockIcon = (typeof actionBlocks)[number]["icon"];

/** What happens after an employee hands a task in. */
export const approvalSteps = [
  {
    title: "Automatisch freigeben",
    text: "Für alles, was sich nicht bestreiten lässt: Anwesenheit, abgehakte Checkliste, erfasste Zeit.",
  },
  {
    title: "Vorher prüfen",
    text: "Bei Nachweisen mit Ermessensspielraum landet der Abschluss erst zur Freigabe im Portal – mit Foto, Antwort und Zeitpunkt.",
  },
  {
    title: "Kürzen statt ablehnen",
    text: "Halb erledigt ist nicht gar nicht erledigt. Die Belohnung lässt sich reduzieren, statt sie ganz zu verweigern.",
  },
] as const;
