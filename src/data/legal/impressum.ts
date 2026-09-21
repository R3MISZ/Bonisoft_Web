import type { LegalSection } from "./types";

export const impressum: LegalSection[] = [
  {
    id: "anbieter",
    title: "Anbieter",
    blocks: [
      { kind: "p", text: "BoniSoft Technologies GmbH" },
      { kind: "p", text: "Hauptverwaltung: Kurallee 1a, 24159 Kiel" },
      { kind: "p", text: "Handelsregister: 28484 KI" },
      { kind: "p", text: "Registergericht: Amtsgericht Kiel" },
      {
        kind: "p",
        text: "Vertreten durch: Geschäftsführer Maximilian Hunfeld und Michael Hötte",
      },
    ],
  },
  {
    id: "kontakt",
    title: "Kontakt",
    blocks: [{ kind: "p", text: "E-Mail: info@bonisoft.de" }],
  },
  {
    id: "umsatzsteuer",
    title: "Umsatzsteuer-ID",
    blocks: [
      {
        kind: "p",
        text: "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 364357785",
      },
    ],
  },
  {
    id: "streitbeilegung",
    title: "Verbraucherstreitbeilegung / Universalschlichtungsstelle",
    blocks: [
      {
        kind: "p",
        text: "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      },
    ],
  },
];
