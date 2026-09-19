/**
 * Customers shown in the reference band.
 * Placeholders until the companies have given their permission — replace
 * `name` with the real company and pick a fitting icon and colour.
 * Once real logos exist, the tile shows the logo instead of icon and name.
 */
export const references = [
  { name: "Firma 1", icon: "truck", color: "bg-teal-600" },
  { name: "Firma 2", icon: "factory", color: "bg-indigo-500" },
  { name: "Firma 3", icon: "hardhat", color: "bg-amber-500" },
] as const;

export type ReferenceIcon = (typeof references)[number]["icon"];
