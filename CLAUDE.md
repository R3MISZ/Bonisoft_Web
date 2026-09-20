## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Fallen in diesem Projekt

**Dev-Server neu starten, wenn eine Änderung nicht ankommt.** Zweimal pro Sitzung
aufgetreten: eine neue Tailwind-Klasse landet nicht im Stylesheet, oder eine
Änderung an einem `<style>`-Block in einer `.astro`-Datei wird nicht ausgeliefert.
Der Code ist dann richtig, der Zwischenspeicher alt. Erst neu starten, dann
Fehler suchen.

**Niemals `astro build` laufen lassen, während der Dev-Server läuft.** Das
überschreibt `node_modules/.vite`, danach scheitern alle `client:visible`-Inseln
mit `504 Outdated Optimize Dep`.

**Tailwind baut nur Klassen, die es im Quelltext findet.** Ein zur Laufzeit
zusammengesetzter Klassenname existiert dort nicht. Deshalb
stehen in `moduleLook.ts` die Textfarben ausgeschrieben.

**Formularwerte überleben Seitenwechsel.** Regler und Eingaben stehen nach
Zurück/Vorwärts nicht auf ihrer Voreinstellung — das ist die Wiederherstellung des
Browsers, kein Fehler im Zustand. Zum Prüfen wirklich neu laden.

## Inhaltliche Grundlage

`docs/produktwissen.md` — was das Produkt kann, mit Quellenangabe je Aussage
(Portal-Übersetzungen, Backend-Code). Vor Textarbeit dort nachlesen, nicht raten.
`docs/analyse-startseite.md` — Aufbau der Startseite, Entscheidungen, Protokoll.
