/**
 * The service modules Bonisoft ships today. These are building blocks —
 * a customer configures them into concrete services (see mobileServices).
 * Colours mirror the module picker in the product.
 *
 * `description` is what the manager gets when picking the type; the wording
 * follows docs/produktwissen.md, not marketing.
 */
export const modules = [
  {
    label: "Kalender",
    icon: "calendar",
    color: "bg-teal-500",
    description:
      "Termine an einem Ort: Schichten, Betriebsfeiern, Geburtstage, Jubiläen und Abwesenheiten. Aus einem Kalendermodul heraus lassen sich auch Terminumfragen stellen.",
  },
  {
    label: "Datei",
    icon: "file",
    color: "bg-indigo-500",
    description:
      "Eine hochgeladene Datei, etwa die Betriebsvereinbarung als PDF. Sie liegt dort, wo alle hinschauen – nicht im Aushang und nicht im Mailverlauf.",
  },
  {
    label: "Ordner",
    icon: "folder",
    color: "bg-amber-500",
    description:
      "Gruppiert weitere Dienstmodule. Reine Ordnung, damit aus fünfzehn Kacheln keine Wühlkiste wird.",
  },
  {
    label: "Text",
    icon: "text",
    color: "bg-emerald-500",
    description:
      "Ein Beschreibungstext – für Hinweise, Notfallnummern oder die kurze Anleitung, die sonst niemand findet.",
  },
  {
    label: "Link",
    icon: "link",
    color: "bg-blue-500",
    description:
      "Öffnet eine Seite im Browser. So bleiben Intranet, Lohnportal oder Schichtplan-Tool erreichbar, ohne dass jemand eine zweite App installiert.",
  },
  {
    label: "Leaderboard",
    icon: "trophy",
    color: "bg-orange-500",
    description:
      "Eine Rangliste aus selbst gewählten Aktionsmodulen. Die Wertungsrichtung legen Sie fest: höher ist besser – oder niedriger, etwa bei Schäden.",
  },
  {
    label: "Zeiterfassung",
    icon: "clock",
    color: "bg-violet-500",
    description:
      "Stempeln, Arbeitszeitkonten, Projekte, Freigaben und Export. Die Zeit entsteht dort, wo gearbeitet wird, statt hinterher aus Zetteln.",
  },
  {
    label: "Abwesenheit",
    icon: "absence",
    color: "bg-red-500",
    description:
      "Krankmeldung und Urlaubsantrag aus der App, mit Urlaubskontingenten und regionalen Feiertagen – einzeln und halbtägig buchbar.",
  },
  {
    label: "Persönliche Dokumente",
    icon: "personalDocs",
    color: "bg-slate-500",
    description:
      "Lohnabrechnungen und Bescheinigungen lädt die Verwaltung im Stapel hoch. Die Zuordnung läuft automatisch über die Personalnummer im Dateinamen.",
  },
  {
    label: "Statussystem",
    icon: "status",
    color: "bg-yellow-500",
    description:
      "Kein bloßes Abzeichen: Level mit Punktebereich, Farbe und eigenen Auszahlungspunkten. Gemessen wird an einem Wallet, ausgezahlt auf ein zweites.",
  },
  {
    label: "Versicherung",
    icon: "insurance",
    color: "bg-rose-700",
    description:
      "Betriebliche Krankenversicherung und Altersvorsorge, mit Versicherungsnummer je Mitarbeitendem sowie Import und Export über Excel.",
  },
] as const;

export type ModuleIcon = (typeof modules)[number]["icon"];
export type ServiceModule = (typeof modules)[number];
