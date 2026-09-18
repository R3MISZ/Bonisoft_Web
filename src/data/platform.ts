/**
 * The service modules Bonisoft ships today. These are building blocks —
 * a customer configures them into concrete services (see mobileServices).
 * Colours mirror the module picker in the product.
 */
export const modules = [
  { label: "Kalender", icon: "calendar", color: "bg-teal-500" },
  { label: "Datei", icon: "file", color: "bg-indigo-500" },
  { label: "Ordner", icon: "folder", color: "bg-amber-500" },
  { label: "Text", icon: "text", color: "bg-emerald-500" },
  { label: "Link", icon: "link", color: "bg-blue-500" },
  { label: "Leaderboard", icon: "trophy", color: "bg-orange-500" },
  { label: "Zeiterfassung", icon: "clock", color: "bg-violet-500" },
  { label: "Abwesenheit", icon: "absence", color: "bg-red-500" },
  { label: "Persönliche Dokumente", icon: "personalDocs", color: "bg-slate-500" },
  { label: "Statussystem", icon: "status", color: "bg-yellow-500" },
  { label: "Versicherung", icon: "insurance", color: "bg-rose-700" },
] as const;

export type ModuleIcon = (typeof modules)[number]["icon"];

/** Three rows for the marquee; split so no row runs noticeably short. */
export const moduleRows = [
  modules.slice(0, 4),
  modules.slice(4, 8),
  modules.slice(8),
] as const;
