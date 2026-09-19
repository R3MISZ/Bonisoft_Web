/**
 * Org chart for the team section.
 * `below` hangs a unit under another one — Entwicklung reports into
 * Produktmanagement, so it sits one level deeper rather than beside it.
 */
export const leadership = [
  { name: "Maximilian Hunfeld", title: "Gründer & CEO" },
  { name: "Michael Hötte", title: "Mitgründer & CTO" },
] as const;

export const teamUnits = [
  {
    unit: "Verwaltung",
    members: [{ name: "Ramona Landahl", title: "Verwaltung" }],
  },
  {
    unit: "Produktmanagement",
    members: [
      { name: "Sven Merten", title: "Produktmanager" },
      { name: "Leon Minho Brosch", title: "Produktmanager" },
    ],
    below: {
      unit: "Entwicklung",
      members: [
        { name: "Benedikt Kolb", title: "Softwareentwickler" },
        { name: "Kacper Remiszewski", title: "Softwareentwickler" },
      ],
    },
  },
] as const;
