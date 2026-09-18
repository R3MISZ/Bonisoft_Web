/**
 * Section 2: the problem, told from both sides.
 * Quotes are verbatim from interviews and carry the section — keep them as data
 * so the wording can be reviewed without touching layout.
 */
export const perspectives = [
  {
    audience: "Management",
    source: "Aus Gesprächen mit über 300 Führungskräften",
    claim: "Wir brauchen Transparenz und Steuerung.",
    points: [
      "Fehlende Leistungsbereitschaft",
      "Dienst nach Vorschrift",
      "Fachkräftemangel",
      "Fehlende Prozesstreue",
    ],
  },
  {
    audience: "Operative Ebene",
    source: "Aus direkten Gesprächen am Arbeitsplatz",
    claim: "Wir wollen gehört und gesehen werden.",
    points: [
      "Ich bin oft der Letzte, der Bescheid weiß.",
      "Was bringt mir der Change?",
      "Was kann ich schon beeinflussen?",
      "Unsere Arbeit wird nicht gesehen.",
    ],
  },
] as const;
