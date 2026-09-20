/**
 * Industries are the second entry point into the product. The reader picks one
 * in the business case, and it sets the scene: picture, the figures that get
 * measured there, and where the sliders start.
 *
 * `presets` are starting values, not claims — the reader drags them to their
 * own numbers. The arithmetic behind the calculator is the same for every
 * industry; we have no measured per-industry data and do not pretend to.
 */
export const industries = [
  {
    slug: "logistik",
    image: "/industries/logistik.webp",
    name: "Logistik & Spedition",
    text: "Für Lager, Fuhrpark und Werkstatt – von der Pickingquote bis zur Ladungssicherung.",
    kpis: ["Pickingquote", "Anwesenheit", "Fahrer-Score", "Ladungssicherung", "Schadensquote"],
    presets: { employees: 120, turnover: 18 },
    levers: ["fuel", "admin"],
  },
  {
    slug: "industrie",
    image: "/industries/industrie.webp",
    name: "Industrie & Produktion",
    text: "Compliance und Prozesstreue in der Produktion, ohne Papier und Aushang.",
    kpis: ["Arbeitssicherheit", "Qualität", "Fehlerquote", "Produktivität"],
    presets: { employees: 250, turnover: 12 },
    levers: ["admin"],
  },
  {
    slug: "handwerk",
    image: "/industries/handwerk.webp",
    name: "Handwerk & Bau",
    text: "Checklisten, Fotodokumentation und Aufgabensteuerung direkt aufs Smartphone.",
    kpis: ["Checklisten", "Fotodokumentation", "Aufgabensteuerung"],
    presets: { employees: 60, turnover: 15 },
    levers: ["admin", "fuel"],
  },
  {
    slug: "service",
    image: "/industries/service.webp",
    name: "Service & Werkstatt",
    text: "Einheitliche Abläufe und Transparenz in komplexen Serviceprozessen.",
    kpis: ["Dokumentation", "Ordnung am Arbeitsplatz", "Kundenzufriedenheit"],
    presets: { employees: 80, turnover: 16 },
    levers: ["admin"],
  },
] as const;

export type Industry = (typeof industries)[number];
