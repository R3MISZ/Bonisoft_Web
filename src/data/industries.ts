/** Industries are the second entry point into the product. */
export const industries = [
  {
    slug: "logistik",
    name: "Logistik & Spedition",
    text: "Für Lager, Fuhrpark und Werkstatt – von der Pickingquote bis zur Ladungssicherung.",
    kpis: ["Pickingquote", "Anwesenheit", "Fahrer-Score", "Ladungssicherung", "Schadensquote"],
  },
  {
    slug: "industrie",
    name: "Industrie & Produktion",
    text: "Compliance und Prozesstreue in der Produktion, ohne Papier und Aushang.",
    kpis: ["Arbeitssicherheit", "Qualität", "Fehlerquote", "Produktivität"],
  },
  {
    slug: "handwerk",
    name: "Handwerk & Bau",
    text: "Checklisten, Fotodokumentation und Aufgabensteuerung direkt aufs Smartphone.",
    kpis: ["Checklisten", "Fotodokumentation", "Aufgabensteuerung"],
  },
  {
    slug: "service",
    name: "Service & Werkstatt",
    text: "Einheitliche Abläufe und Transparenz in komplexen Serviceprozessen.",
    kpis: ["Dokumentation", "Ordnung am Arbeitsplatz", "Kundenzufriedenheit"],
  },
] as const;
