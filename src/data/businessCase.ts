/**
 * The business case. Inputs are data, results are computed below —
 * so the numbers shown can never drift apart from the assumptions.
 */
const fuel = {
  kmPerYear: 120_000,
  litresPer100km: 32,
  pricePerLitre: 1.8,
  savingRate: 0.04,
  fleetSize: 100,
};

const health = {
  sickDaysPerYear: 30,
  daysSaved: 3,
  costPerDay: 350,
  headcount: 100,
};

const fuelCostPerTruck = (fuel.kmPerYear / 100) * fuel.litresPer100km * fuel.pricePerLitre;
const fuelSavingPerTruck = fuelCostPerTruck * fuel.savingRate;
const healthSavingPerEmployee = health.daysSaved * health.costPerDay;

export const businessCase = {
  cases: [
    {
      label: "Spritverbrauch",
      headline: "4 % weniger Diesel",
      rows: [
        { label: "Jahresfahrleistung", value: "120.000 km" },
        { label: "Ø Verbrauch", value: "32 l / 100 km" },
        { label: "Dieselpreis", value: "1,80 € / l" },
        { label: "Treibstoffkosten p. a.", value: euro(fuelCostPerTruck) },
      ],
      perUnit: { value: euro(fuelSavingPerTruck), label: "pro LKW und Jahr" },
      total: { value: euro(fuelSavingPerTruck * fuel.fleetSize), label: "bei 100 LKW" },
    },
    {
      label: "Krankenstand",
      headline: "3 Krankheitstage weniger",
      rows: [
        { label: "Ø Krankenstand", value: "30 Tage / Jahr" },
        { label: "Zielverbesserung", value: "3 Tage weniger" },
        { label: "Kalkulierter Tagessatz", value: "350 €" },
        { label: "Ersparnis je Mitarbeitendem", value: euro(healthSavingPerEmployee) },
      ],
      perUnit: { value: euro(healthSavingPerEmployee), label: "pro Mitarbeitendem und Jahr" },
      total: { value: euro(healthSavingPerEmployee * health.headcount), label: "bei 100 Mitarbeitenden" },
    },
  ],
  grandTotal: euro(fuelSavingPerTruck * fuel.fleetSize + healthSavingPerEmployee * health.headcount),
} as const;

function euro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
