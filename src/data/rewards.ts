/**
 * What a point is worth and where it can go.
 * The rate is fixed in the product (PointsConstants.PointsToEurFactor = 10),
 * the paths are the shop modules a company can switch on.
 */
export const pointRate = { points: 10, euro: 1 } as const;

export const rewardPaths = [
  {
    name: "Steuerfreier Sachbezug",
    icon: "card",
    text: "Guthaben auf eine Tank- oder Lebensmittelkarte. Kommt beim Mitarbeitenden an, ohne über die Lohnabrechnung zu laufen.",
  },
  {
    name: "Gutscheinshop",
    icon: "gift",
    text: "Gutscheine aus einem Katalog von Handel, Gastronomie und Freizeit. Abgewickelt über unseren Partner Cadooz.",
  },
  {
    name: "Bruttobonus",
    icon: "euro",
    text: "Auszahlung über die Lohnabrechnung. Mitarbeitende entscheiden selbst, wann sie ihr Guthaben abrufen.",
  },
  {
    name: "Komplettauszahlung",
    icon: "repeat",
    text: "Läuft automatisch: an einem festen Tag im Monat wird das Konto ausgezahlt, auf Wunsch bis zu einem Höchstbetrag.",
  },
  {
    name: "Betriebliche Altersvorsorge",
    icon: "pension",
    text: "Einzahlen statt auszahlen. Für Betriebe, die langfristig binden wollen statt monatlich zu belohnen.",
  },
] as const;

export type RewardIcon = (typeof rewardPaths)[number]["icon"];
