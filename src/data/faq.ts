/**
 * Objection handling. Renders as native <details>, so it ships no JavaScript.
 * `link` points at the section that shows the answer instead of repeating it.
 */
export interface FaqEntry {
  question: string;
  answer: string;
  /** Optional pointer to the section that shows the answer. */
  link?: { href: string; label: string };
}

export const faq: FaqEntry[] = [
  {
    question: "Was ist ein Punkt wert?",
    answer:
      "Zehn Punkte entsprechen einem Euro – der Kurs ist im System fest hinterlegt und für alle gleich. Wohin das Guthaben fließt, legt Ihr Unternehmen fest: steuerfreier Sachbezug, Gutscheinshop, Auszahlung über die Lohnabrechnung oder betriebliche Altersvorsorge.",
  },
  {
    question: "Was hindert Mitarbeitende daran, sich Punkte zu erschleichen?",
    answer:
      "Sie entscheiden pro Aufgabenart, ob die Belohnung automatisch gutgeschrieben wird oder erst nach Freigabe im Portal. Zu jedem Abschluss sehen Sie die abgegebenen Antworten, hochgeladene Fotos und den Zeitpunkt. Die Belohnung lässt sich auch kürzen, statt sie ganz zu verweigern.",
  },
  {
    question: "Wer richtet die Aufgaben ein?",
    answer:
      "Zu Beginn wir, gemeinsam mit Ihnen. Der Baukasten ist mächtig, und die ersten Aufgaben sollen sitzen. Danach können Sie im Portal selbst Aufgaben anlegen und bestehende ändern – viele unserer Kunden tun das.",
  },
  {
    question: "Für welche Unternehmen ist Bonisoft geeignet?",
    answer:
      "Für Betriebe mit vielen Mitarbeitenden ohne festen Schreibtisch – Logistik, Produktion, Handwerk, Bau und Service. Die meisten unserer Kunden haben zwischen 100 und 1.500 Mitarbeitende, der kleinste rund 20, der größte etwa 7.000.",
  },
  {
    question: "Brauchen Mitarbeitende eine besondere technische Ausstattung?",
    answer:
      "Nein. Die App läuft auf jedem Smartphone, auch auf dem privaten. Es braucht kein Firmengerät, keinen PC und keine Schulung.",
  },
  {
    question: "Wie aufwendig ist das Onboarding für Mitarbeitende?",
    answer:
      "Sie legen die Mitarbeitenden im Portal an – einzeln oder als Liste. Dabei entsteht je Person ein Einladungscode, den Sie als Nachricht weitergeben oder als PDF mit Anleitung verschicken können. In der App gibt die Person den Code ein, hinterlegt eine E-Mail-Adresse und vergibt ihr eigenes Passwort. Die Adresse darf privat sein – im Portal ist sie nicht einsehbar.",
  },
  {
    question: "Kann Bonisoft mehr als Aufgaben und Prämien?",
    answer:
      "Ja, und für viele Kunden ist das der eigentliche Grund. Neben den Aufgaben gibt es elf Dienstmodule – von der Zeiterfassung bis zur Rangliste. Was Sie davon nutzen, entscheiden Sie.",
    link: { href: "#plattform", label: "Dienstmodule ansehen" },
  },
  {
    question: "Wie schnell lässt sich Bonisoft einführen?",
    answer:
      "Je nach Unternehmensgröße innerhalb weniger Wochen. Der modulare Aufbau erlaubt einen schrittweisen Start mit einem Standort oder einer einzigen Aufgabe.",
  },
  {
    question: "Was kostet Bonisoft?",
    answer:
      "Zur Orientierung: abhängig von Unternehmensgröße, Modulauswahl und Umfang meist zwischen 5 und 10 Euro pro Mitarbeitendem und Monat. Ein individuelles Angebot erstellen wir nach einem kurzen Kennenlernen.",
  },
  {
    question: "Ist Bonisoft DSGVO-konform?",
    answer:
      "Ja. Entwicklung, Betrieb und Hosting finden in Deutschland statt, in deutschen Rechenzentren. Wir schließen einen Auftragsverarbeitungsvertrag ab und haben ein Löschkonzept. Leistungsdaten sind so ausgelegt, dass sie der Steuerung von Teams dienen und nicht der Kontrolle Einzelner.",
  },
];
