/** Industries are the second entry point into the product. */
export const industries = [
  {
    slug: "logistik",
    image: "/industries/logistik.webp",
    name: "Logistik & Spedition",
    text: "Für Lager, Fuhrpark und Werkstatt – von der Pickingquote bis zur Ladungssicherung.",
    kpis: ["Pickingquote", "Anwesenheit", "Fahrer-Score", "Ladungssicherung", "Schadensquote"],
  },
  {
    slug: "industrie",
    image: "/industries/industrie.webp",
    name: "Industrie & Produktion",
    text: "Compliance und Prozesstreue in der Produktion, ohne Papier und Aushang.",
    kpis: ["Arbeitssicherheit", "Qualität", "Fehlerquote", "Produktivität"],
  },
  {
    slug: "handwerk",
    image: "/industries/handwerk.webp",
    name: "Handwerk & Bau",
    text: "Checklisten, Fotodokumentation und Aufgabensteuerung direkt aufs Smartphone.",
    kpis: ["Checklisten", "Fotodokumentation", "Aufgabensteuerung"],
  },
  {
    slug: "service",
    image: "/industries/service.webp",
    name: "Service & Werkstatt",
    text: "Einheitliche Abläufe und Transparenz in komplexen Serviceprozessen.",
    kpis: ["Dokumentation", "Ordnung am Arbeitsplatz", "Kundenzufriedenheit"],
  },
] as const;
