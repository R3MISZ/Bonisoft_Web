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
