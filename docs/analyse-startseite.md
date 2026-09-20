# Kritische Analyse der Startseite

Stand: 19.09.2026, gemessen am Dev-Stand.

## Messwerte

| | Wert |
|---|---|
| Gesamthöhe | 15.965 px ≈ 20 Bildschirme |
| Wörter | 1.235 ≈ 5–6 Minuten Lesezeit |
| Abschnitte | 14 |
| Interaktive Elemente | 33 |
| Dauerhaft animierte Elemente | 25 |

Die alte Seite bonisoft.de war rund 17.000 px lang. Wir sind also kaum kürzer —
Potenzialrechner und Testimonial sind raus, Produkt-Demo und Laufband dazugekommen.

## Was trägt

- Dramaturgie der ersten drei Abschnitte: Problem mit echten Zitaten, Diagramm, Lösung
- Business Case mit offengelegter Rechnung — das glaubwürdigste Element der Seite
- Produkt-Demo beantwortet „wie sieht das aus", woran die alte Seite komplett vorbeilief

## Befunde

1. **„Module" bedeutete zwei Dinge** — 6 Produktbereiche vs. 11 technische Bausteine.
   Entschieden: die 6 fliegen raus, die 11 bleiben (sind in bonisoft.de nachschlagbar).
2. **Drei Abschnitte behaupten dasselbe** — Lösung/Säulen, Warum Bonisoft, Datenschutz.
   Entschieden: die drei Säulen fliegen raus, Inhalt geht in den Vorspann.
3. **Mittelteil zerreißt die Produktgeschichte** — „Warum Bonisoft" saß zwischen Demo
   und Ablauf. Entschieden: neue Reihenfolge, siehe unten.
4. **Alle 14 Abschnitte haben denselben Takt** (Eyebrow, Überschrift, Vorspann, Inhalt)
   und die Überschriften wiederholen Muster: dreimal „zwei", zweimal Verneinung.
   Noch offen.
5. **Hero ist 526 px reiner Text**, kein Bild, kein Knopf. Noch offen — Vorschlag:
   verkleinertes Telefon aus der Produkt-Demo.
6. **Kein Kundenbeleg.** Alle Zahlen sind Modellrechnungen. Grösste inhaltliche Lücke.

## Entscheidungen vom 19.09.2026

| Frage | Antwort |
|---|---|
| Zielperson | Geschäftsführer / Betriebsleiter, 100–1.500 Mitarbeitende, Logistik, Produktion, Handwerk, Service |
| Kundenbelege | echte Kunden gewünscht, Freigabe wird eingeholt; bis dahin Platzhalter „Firma 1–3" |
| Module | die 6 Produktbereiche werden gelöscht |
| Abschluss der Seite | Formular ist der einzige Weg; danach 20-Minuten-Gespräch mit Maximilian oder Michael |

## Reihenfolge

Hero → Referenzen → Realität → Lösung → Produkt-Demo → Plattform →
So funktioniert es → Branchen → Warum Bonisoft → Business Case →
Datenschutz → Team → FAQ → Kontakt

Begründung: Das Produkt bleibt am Stück (Demo, Plattform, Ablauf), die Einordnung
für den eigenen Betrieb folgt (Branchen), dann die Positionierung und erst danach
die Zahlen. „Warum Bonisoft" steht damit weiterhin vor dem Business Case.

## Offen

- Hero-Visual
- Gleichförmiger Abschnittstakt
- Echte Referenzen einsetzen, sobald freigegeben
- Impressum, Datenschutz, AGB sind verlinkt, aber nicht vorhanden
- Formular-Endpunkt fehlt (`contactEndpoint` in `src/data/site.ts` ist leer)

## Umgesetzt am 19.09.2026

- Abschnitt „Unsere Module" (6 Produktbereiche) gelöscht, samt `ModuleSelector.tsx`
  und `src/data/modules.ts`. Die Inhalte stehen weiter auf bonisoft.de.
- Drei Säulen aus „Die Lösung" gelöscht (`src/data/pillars.ts`), Aussage steckt jetzt
  in einem Satz im Vorspann.
- Verweise, die dadurch ins Leere zeigten, umformuliert: Branchen („Die Module
  bleiben dieselben" → „Die Plattform bleibt dieselbe"), Kontakt („welches Modul" →
  „welche Kennzahl"), Business Case, `why.ts`.
- Neue Reihenfolge umgesetzt.
- Referenzband nach dem Hero (`References.astro`, `src/data/references.ts`) —
  Platzhalter „Firma 1–3", gleiche Lauftechnik wie das Plattform-Band.
- Hero benennt die Zielgruppe (100–1.500 Mitarbeitende, vier Branchen).
- Kontakt zeigt in drei Schritten, was nach dem Absenden passiert.

Ergebnis: 14.518 px statt 15.965 px (18,3 statt 20,1 Bildschirme), 1.221 Wörter.

## Umbau auf Erzählung „B" am 20.09.2026

Grundlage: `docs/produktwissen.md` (Fachwissen aus Portal und Backend).
Leitgedanke: Der Sachbezug ist der Türöffner — die App wird geöffnet, weil sie
sich auszahlt, und deshalb kommt dort auch alles andere an.

Neu:

- `Rewards.astro` + `src/data/rewards.ts` — „Was ein Punkt wert ist": Kurs
  10 Punkte = 1 €, fünf Auszahlungswege.
- `ActionModules.astro` + `src/data/actionBlocks.ts` — Bausteine einer Aufgabe
  und die Freigabe („Und wenn jemand schummelt?").

Neu geschrieben: Hero, Lösung (Mechanismus in drei Schritten), Plattform-Vorspann,
`faq.ts`.

Gelöscht: Abschnitt „Warum Bonisoft" samt `WhyBonisoft.astro` und `src/data/why.ts` —
nach dem Umbau wiederholte er nur, was Lösung, Produkt und Freigabe schon zeigen.
Zwei Argumente daraus leben als zwei Sätze in „Die Lösung" weiter: Zugang ohne
E-Mail und PC, Einrichtung gemeinsam.

Gekürzt: Datenschutz von vier Kacheln mit Fließtext auf eine Zeile mit vier
Stichpunkten (406 px → 250 px).

Ergebnis: 12.189 px statt 13.169 px (13,5 statt 14,6 Bildschirme), 15 Abschnitte.

Nächste Kandidaten, noch nicht angefasst: Branchen (1.287 px, größter Abschnitt,
vier gleichförmige Kacheln) und Team (1.000 px für sieben Personen).

## Interaktives am 20.09.2026

**Business Case ist ein Rechner** (`BusinessCaseCalculator.tsx`, Insel). Ein fester
Hebel — Mitarbeiterbindung, Regler für Mitarbeitende und Fluktuationsquote — plus
ein wählbarer zweiter: Fuhrpark (Sprit) oder Verwaltung (eingesparte Minuten).
Der Krankenstand ist raus: 30 Krankheitstage lagen weit über dem Bundesschnitt und
die Wirkung war nicht belegbar.

Die Gesamtsumme zählt beim Hereinscrollen hoch (`CountUp.tsx`, wiederverwendbarer
Haken, respektiert `prefers-reduced-motion`). Bewusst nur diese eine Stelle.

**Der Aufgaben-Baukasten** (`TaskBuilder.tsx`, Insel im Abschnitt „Aufgaben")
bildet den Modulaufbau-Reiter des Portals nach: Bausteine links, Telefon in der
Mitte, Einstellungen des gewählten Bausteins rechts.

Abweichungen vom Portal, jeweils mit Grund:

- **Klicken statt Ziehen.** Drag-and-drop scheitert auf Touch und per Tastatur.
  Reihenfolge ändern über Pfeil hoch/runter.
- **Acht statt dreizehn Bausteine.** Jubiläums- und Geburtstagsbonus,
  Terminumfrage und monatlicher Sachbezug haben keine sichtbare Eingabe.
- **X immer sichtbar** statt nur am ausgewählten Baustein.
- **Keine Dienstmodul-Auswahl beim Link** — das Ziel ist ein reines Textfeld,
  weil „Dienstmodul" an dieser Stelle der Seite noch nicht erklärt ist.

Die Vorschauen sind `Bonisoft_Portal/src/pages/action-modules/editor/subtypes-tab/previews.tsx`
nachempfunden (Checkliste als Kreise mit türkis gefülltem ersten Eintrag, fünf
**leere** Sterne, „Bild aufnehmen", „tt.mm.jjjj", „Link öffnen"). Wer daran etwas
ändert, sollte vorher dort nachsehen.

Editierbar sind: Modulname, Beschreibung für Mitarbeiter, Belohnung in Punkten
(mit Euro-Gegenwert), Pflichtfeld je Baustein, Antworttyp und Einträge der
Checkliste, Einträge des Dropdowns, Button-Text und Ziel der Verlinkung.

## Offen

- **Adresse der kostenlosen Testversion** — darauf soll ein Knopf unter dem
  Baukasten zeigen. Fehlt noch, deshalb kein Knopf.
- **Business-Case-Annahmen**: 10.000 € je Neubesetzung und 10 % verhinderte
  Abgänge sind konservative Platzhalter von Claude, keine Bonisoft-Zahlen.
  Kacper fragt bei Max/Michael nach, auch nach belastbaren Hebeln je Branche.
- **Hilfetext der Verlinkung** spricht noch von „oder zu einem Dienstmodul",
  obwohl die Auswahl raus ist.
- **Fotodokumentation**: Einstellungen (Beschreibung, Beispielbild, ein Bild vs.
  mehrere) noch nicht im Baukasten.
