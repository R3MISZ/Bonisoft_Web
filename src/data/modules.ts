/**
 * Section 3: the six product modules.
 * Wording normalised to formal "Sie" — the live site mixes "Sie" and "ihr".
 */
export const modules = [
  {
    id: "kpi",
    name: "KPI-Verwaltung",
    summary: "Ziele und Prozesse transparent, messbar und steuerbar machen.",
    detail:
      "Sie legen fest, welche Kennzahlen zählen – von der Pickingquote bis zum Verbrauch. Bonisoft sammelt die Daten aus Ihren bestehenden Systemen und macht sie für beide Seiten sichtbar.",
  },
  {
    id: "bonus",
    name: "Bonus & Benefits",
    summary: "Leistung sichtbar machen und fair vergüten.",
    detail:
      "Von steuerfreien Sachbezügen über Bruttobonus und Jobrad bis zur betrieblichen Altersvorsorge – Sie entscheiden über den Baukasten, Bonisoft übernimmt die Abwicklung.",
  },
  {
    id: "gamification",
    name: "Gamification",
    summary: "Anerkennung, die im Arbeitsalltag ankommt.",
    detail:
      "Mitarbeitende sammeln Punkte bei Zielerreichung und erhalten Abzeichen für Meilensteine. Kein Wettbewerb gegeneinander, sondern sichtbarer Fortschritt am eigenen Ziel.",
  },
  {
    id: "checklisten",
    name: "Checklisten & Compliance",
    summary: "Prozesstreue dokumentiert statt vorausgesetzt.",
    detail:
      "Eigene Checklisten und Dokumentationen über den digitalen Baukasten – mit Fotonachweis, Zeitstempel und Auswertung. Von der Staplerpflege bis zum Hallenrundgang.",
  },
  {
    id: "kommunikation",
    name: "Kommunikation",
    summary: "Der direkte Draht, auch ohne Firmen-E-Mail.",
    detail:
      "Zentraler Platz für News, Termine und Dokumente. Wichtige Mitteilungen erreichen die Schicht, bevor sie über den Flurfunk ankommt.",
  },
  {
    id: "app",
    name: "Mitarbeiter-App",
    summary: "Zugang für alle, ohne Schulung.",
    detail:
      "Läuft auf jedem privaten Smartphone. Anmeldung per QR-Code oder Mitarbeiter-ID – ohne E-Mail-Adresse, ohne PC-Arbeitsplatz, ohne IT-Rollout.",
  },
] as const;

export type ModuleId = (typeof modules)[number]["id"];
