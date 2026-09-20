/**
 * The business case. Only assumptions live here; every figure on the page is
 * derived from them, so the numbers can never drift apart from the premises.
 *
 * One lever always applies — keeping people costs less than replacing them, and
 * that is what a benefit system is for. The second lever depends on the
 * operation, so the reader picks it.
 *
 * Every rate below is an assumption, deliberately conservative, and shown on
 * the page as such. None of them comes from measured customer data.
 */
export const headcount = { label: "Mitarbeitende", min: 20, max: 1500, step: 10, preset: 100 };

export const retention = {
  label: "Mitarbeiterbindung",
  headline: "Jede zehnte Kündigung verhindert",
  slider: { label: "Fluktuation pro Jahr", min: 2, max: 40, step: 1, preset: 15, unit: "%" },
  /** Cost of filling one position again: advertising, onboarding, lost output. */
  costPerReplacement: 10_000,
  /** Share of departures the system is assumed to prevent. */
  preventedShare: 0.1,
  rows: [
    { label: "Kosten je Neubesetzung", value: "10.000 €" },
    { label: "Angenommene Wirkung", value: "10 % weniger Abgänge" },
  ],
  perUnit: { value: "1.000 €", label: "je verhinderter Kündigung × 10" },
};

export const secondaryLevers = [
  {
    id: "fuel",
    tab: "Fuhrpark",
    label: "Spritverbrauch",
    headline: "4 % weniger Diesel",
    slider: { label: "Fahrzeuge im Fuhrpark", min: 5, max: 500, step: 5, preset: 100, unit: "" },
    rows: [
      { label: "Jahresfahrleistung", value: "120.000 km" },
      { label: "Ø Verbrauch", value: "32 l / 100 km" },
      { label: "Dieselpreis", value: "1,80 € / l" },
      { label: "Treibstoffkosten p. a.", value: "69.120 €" },
    ],
    perUnit: { value: "2.765 €", label: "pro Fahrzeug und Jahr" },
    /** Fuel saving per vehicle: 120.000 km × 32 l/100 km × 1,80 € × 4 %. */
    perSliderUnit: (120_000 / 100) * 32 * 1.8 * 0.04,
    /** This lever counts vehicles, not people. */
    scalesWithHeadcount: false,
  },
  {
    id: "admin",
    tab: "Verwaltung",
    label: "Nachweise und Zettelwirtschaft",
    headline: "Zeit statt Papier",
    slider: {
      label: "Eingesparte Minuten je Woche und Person",
      min: 2,
      max: 30,
      step: 1,
      preset: 10,
      unit: "min",
    },
    rows: [
      { label: "Arbeitswochen pro Jahr", value: "45" },
      { label: "Kalkulierter Stundensatz", value: "30 €" },
      { label: "Erfasst statt abgeheftet", value: "Checklisten, Fotos, Zeiten" },
    ],
    perUnit: { value: "225 €", label: "je Person und Jahr bei 10 Minuten" },
    /** Value of one saved minute per week and person, over a year. */
    perSliderUnit: (45 / 60) * 30,
    scalesWithHeadcount: true,
  },
] as const;

export type SecondaryLever = (typeof secondaryLevers)[number];

/** Departures prevented per year, and what that is worth. */
export function retentionSaving(employees: number, turnoverPercent: number): number {
  const departures = employees * (turnoverPercent / 100);
  return departures * retention.preventedShare * retention.costPerReplacement;
}

export function leverSaving(lever: SecondaryLever, employees: number, sliderValue: number): number {
  return lever.scalesWithHeadcount
    ? lever.perSliderUnit * sliderValue * employees
    : lever.perSliderUnit * sliderValue;
}

export function euro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
