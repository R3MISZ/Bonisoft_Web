# Produktwissen

Grundlage für die Texte auf der Website. Stand: 19.09.2026.

Quellen: Erklärungen von Kacper, dazu nachgeprüft in `C:\Git\Bonisoft_Portal`
(Übersetzungsdateien unter `public/locales/de/`) und `C:\Git\Bonisoft.Backend`.
Wo unten eine Datei steht, ist die Aussage im Code belegt — alles andere ist
Erzähltes und sollte vor Veröffentlichung gegengelesen werden.

## Grundaufbau

Zwei getrennte Clients, keine Überschneidung:

| Rolle | Zugang |
|---|---|
| Mitarbeitende (`EmployeeUser`) | **nur** die Mobile-App |
| Führungskraft (`CompanyManagementUser`, „CMU") | **nur** das Portal im Browser |
| Bonisoft-Support (im Portal „SuperAdmin") | Portal plus eigene Bereiche |

Beleg: `Bonisoft.Backend/claude-docs/business-context.md`. Es gibt keine
Mitarbeiter-Weboberfläche und keine Manager-App. Das ist der sachliche Kern
unseres Abschnitts „Dieselben Daten, zwei Blickwinkel".

## Punkte

**10 Punkte = 1 €.** Beleg: `Bonisoft.Backend/Constants/PointsConstants.cs`,
`PointsToEurFactor = 10`. Verwendet bei Bruttobonus, Komplettauszahlung,
Altersvorsorge und der Vorschau auf anstehende Bonuszahlungen.

Punkte liegen im **Wallet**. Eine Firma kann mehrere **Wallet-Typen** anlegen —
eigene Konten mit eigenem Namen (Punkte, Flammen, frei wählbar), eines davon ist
das Standard-Wallet. Jedes Aktionsmodul zahlt auf einen bestimmten Wallet-Typ
ein. Keine Umrechnung zwischen Typen im Code.
Beleg: `Bonisoft.Backend.Data/Models/Wallet/WalletType.cs`.

## Aktionsmodule — Aufgaben, die Punkte bringen

Der Mitarbeitende erledigt eine Aufgabe in der App, bekommt Punkte gutgeschrieben.
Eingerichtet werden die Module im **Wizard** — normalerweise durch Bonisoft, weil
der Wizard mächtig ist; die Führungskraft kann aber selbst welche anlegen.

### Die 13 Bausteine

Ein Modul wird aus Bausteinen zusammengesetzt (`action-modules-wizard.json`):

| Baustein | Was er tut |
|---|---|
| Jubiläumsbonus | Bonus-Gutschein beim Firmenjubiläum, gewählte Dienstjahre lösen aus |
| Geburtstagsbonus | Bonus-Gutschein zum Geburtstag |
| Checkliste | Einzelauswahl, Mehrfachauswahl oder Mehrfachauswahl mit Ablehnen |
| Sternebewertung | 0 bis 5 Sterne |
| Daumenbewertung | hoch oder runter |
| Verlinkung | Button zu einer URL oder zu einem Dienstmodul |
| Monatlicher steuerfreier Sachbezug | schließt das Modul sofort ab und schreibt die Belohnung gut |
| Fotodokumentation (mehrere) | mehrere Bilder, optional zu einem PDF zusammengefügt |
| Fotodokumentation (einzeln) | ein Bild |
| Terminumfrage | Zu- oder Absage zu Terminen eines Kalendermoduls |
| Textfeld | freie Texteingabe |
| Dropdown | genau ein Eintrag aus einer Liste |
| Datum | Datumsauswahl |

Feinheiten, die den Wizard ausmachen:

- **Bedingungen** — ein Baustein erscheint nur, wenn ein anderer ausgefüllt oder
  ein Checklisten-Eintrag angehakt ist. Umkehrbar.
- **Zufallsgruppen** — von mehreren Bausteinen derselben Gruppe wird einer
  zufällig gezeigt.
- **Belohnung je Checklisten-Antwort** — positiv, negativ, nicht gewählt.
- **Excel-Import** — Bausteine tragen einen Spaltennamen für den Batch-Upload.

### Belohnung

Sieben Berechnungsarten: feste Belohnung, händische Eingabe, maximale Belohnung,
prozentual der maximalen Belohnung, Score mal Faktor, Score-Bereiche, maximale
Belohnung über den Monat aufgeteilt. Dazu monatlicher Maximalbetrag und eine
Verzögerung des Transaktionszeitpunkts in Tagen.

Zeitplanung: täglich, wöchentlich, monatlich, jährlich, mit Start- und Enddatum
und Regeln zum Überspringen von Wochen.

## Incentive Engine — die Freigabe

Der Manager sieht abgeschlossene Aufgaben und entscheidet, ob sie zählen. Typischer
Fall: Jemand soll per Foto belegen, dass der Wagen richtig geparkt ist, und lädt
irgendein Bild hoch — der Manager kann die Belohnung kürzen oder verweigern.

Freigabe-Einstellungen: automatisch durch das System, durch Portalnutzer, durch
Mitarbeitende, Ablehnung durch Portalnutzer, Ablehnung durch Mitarbeitende.

**Geplant**, noch nicht vorhanden: KI-Unterstützung beim Prüfen, damit bei vielen
Mitarbeitenden nicht jedes Bild von Hand angesehen werden muss. Nicht auf der
Website versprechen.

## Shopmodule — wohin die Punkte fließen

Sechs Typen (`groups.json`); die Firma entscheidet, welche sie nutzt. Anlage und
Änderung erfolgen laut Portal durch Bonisoft.

| Typ | Bedeutung |
|---|---|
| Steuerfreier Sachbezug | Tankkarte, Lebensmittelkarte |
| Steuerfreier Sachbezug Bonus | noch ungeklärt |
| Bruttobonus (`DirectPayout`) | normale Auszahlung, Mitarbeitende lösen selbst aus |
| Gutscheinshop | Gutscheine über den externen Dienst **Cadooz** |
| Betriebliche Altersvorsorge | Einzahlung statt Auszahlung |
| Komplettauszahlung (`FullPayout`) | **automatisch** an einem festen Tag im Monat, ganzer Kontostand, gedeckelt auf einen Höchstbetrag |

Komplettauszahlung gegen Bruttobonus ist der Unterschied zwischen „läuft von
selbst" und „Mitarbeitende entscheiden".
Beleg: `Bonisoft.Backend.ShopModules/Logic/ShopModules/FullPayout/FullPayoutShopModuleLogic.cs`.

## Dienstmodule — alles außer Aufgaben

Der Manager legt sie an und bestimmt den Typ (11 Stück):

| Typ | Was es ist |
|---|---|
| Kalender | Termine, Geburtstage, Jubiläen, Abwesenheiten |
| Datei | eine hochgeladene Datei, etwa ein PDF |
| Ordner | Gruppierung weiterer Dienstmodule, reine Ordnung |
| Text | Beschreibungstext |
| Link | öffnet eine Seite im Browser |
| Leaderboard | Rangliste aus gewählten Aktionsmodulen; Wertungsrichtung „höher ist besser" oder „niedriger ist besser" |
| Zeiterfassung | Stempeln, Arbeitszeitkonten, Projekte, Freigaben, Export |
| Abwesenheit | Krankmeldung, Urlaubsantrag, Urlaubskontingente, regionale Feiertage einzeln und halbtägig |
| Persönliche Dokumente | Manager lädt Dokumente hoch, Zuordnung **automatisch über die Personalnummer im Dateinamen** |
| Statussystem | siehe unten |
| Versicherung | betriebliche Krankenversicherung und Altersvorsorge, Versicherungsnummern je Mitarbeitendem, Excel-Import/-Export |

### Statussystem im Detail

Kein reines Abzeichen: Level mit Punktebereich, Farbe und **Auszahlungspunkten**.
Bereiche dürfen sich nicht überschneiden, das oberste Level darf offen sein. Dazu
ein Auszahlungsintervall (täglich, wöchentlich, monatlich) und **zwei Wallets** —
eines, an dem der Status gemessen wird, eines, auf das ausgezahlt wird. Ohne
Startdatum ist die Auszahlung inaktiv.
Beleg: `service-modules-status.json`.

## Offene Fragen

- ~~50-€-Grenze~~ **geklärt am 20.09.2026**: Der `Monatliche Maximalbetrag` am
  Aktionsmodul steht voreingestellt auf **500 Punkte = 50 €** und bildet damit die
  steuerfreie Sachbezugsgrenze ab. Sie steckt also in dieser Voreinstellung, nicht
  als Konstante im Code. Die Zahl darf auf der Website verwendet werden.
- **„Steuerfreier Sachbezug Bonus"** — eigener Shopmodul-Typ, Zweck unklar.
- **Business Case:** Woher stammen die Annahmen auf bonisoft.de? Dort ergibt
  69.120 € × 4 % = 2.765 €, angezeigt werden 2.592 € (entspricht 3,75 %).
- **Einführung:** Dauer von Vertrag bis erster Aktion, wer richtet ein, welche
  Anbindungen an vorhandene Systeme nötig sind.
- **Echter Kundenfall** mit Ausgangslage und messbarer Veränderung.
