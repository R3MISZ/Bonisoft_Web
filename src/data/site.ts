/**
 * Values that appear in more than one place on the site.
 * Keep them here so contact details can never drift apart between sections.
 */
export const site = {
  name: "Bonisoft",
  legalName: "Bonisoft Technologies GmbH",
  title: "Bonisoft – Operative Mitarbeiter-App für den Mittelstand",
  description:
    "Bonisoft macht operative Leistung messbar, Prozesse transparent und Kommunikation wirksam – dort, wo klassische Systeme nicht ankommen.",
  email: "info@bonisoft.de",
  phone: "+49 151 51827913",
  phoneHref: "+4915151827913",
  linkedin: "https://www.linkedin.com/company/bonisoft",
} as const;

/**
 * Header navigation. `also` lists further sections that belong to the same
 * entry — the scrollspy keeps it marked while any of them is on screen.
 */
export const navLinks = [
  { href: "#realitaet", label: "Realität" },
  { href: "#loesung", label: "Lösung", also: ["#belohnung"] },
  { href: "#produkt", label: "Produkt", also: ["#aktionsmodule", "#plattform"] },
  { href: "#branchen", label: "Branchen" },
  { href: "#business-case", label: "Zahlen" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
] as const;

/** Linked from the contact form as well, so both point at the same page. */
export const privacyPath = "/datenschutz";

export const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: privacyPath, label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
] as const;

/**
 * Where the contact form posts to. Empty until a backend endpoint exists —
 * the form says so out loud rather than pretending to send.
 */
export const contactEndpoint = "";

export const headcountOptions = ["1–50", "51–150", "151–500", "über 500"] as const;
