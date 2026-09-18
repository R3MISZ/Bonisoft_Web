import type { ModuleId } from "./modules";

/**
 * Industries are the second entry point next to the modules.
 * `moduleIds` links both axes so a visitor can jump from their industry
 * to the modules that matter for it.
 */
export const industries = [
  {
    slug: "logistik",
    name: "Logistik & Spedition",
    text: "Für Lager, Fuhrpark und Werkstatt – von der Pickingquote bis zur Ladungssicherung.",
    kpis: ["Pickingquote", "Anwesenheit", "Fahrer-Score", "Ladungssicherung", "Schadensquote"],
    moduleIds: ["kpi", "checklisten", "bonus"] satisfies ModuleId[],
  },
  {
    slug: "industrie",
    name: "Industrie & Produktion",
    text: "Compliance und Prozesstreue in der Produktion, ohne Papier und Aushang.",
    kpis: ["Arbeitssicherheit", "Qualität", "Fehlerquote", "Produktivität"],
    moduleIds: ["checklisten", "kpi", "kommunikation"] satisfies ModuleId[],
  },
  {
    slug: "handwerk",
    name: "Handwerk & Bau",
    text: "Checklisten, Fotodokumentation und Aufgabensteuerung direkt aufs Smartphone.",
    kpis: ["Checklisten", "Fotodokumentation", "Aufgabensteuerung"],
    moduleIds: ["checklisten", "app", "kommunikation"] satisfies ModuleId[],
  },
  {
    slug: "service",
    name: "Service & Werkstatt",
    text: "Einheitliche Abläufe und Transparenz in komplexen Serviceprozessen.",
    kpis: ["Dokumentation", "Ordnung am Arbeitsplatz", "Kundenzufriedenheit"],
    moduleIds: ["checklisten", "kpi", "gamification"] satisfies ModuleId[],
  },
] as const;
