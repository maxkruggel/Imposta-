# Begriff-Bilder

Hier liegen optionale Bilder zu den Spielbegriffen. Die App zeigt ein Bild
automatisch auf der Wort-Karte und in der Auflösung an, sobald der Schalter
„Begriff-Bilder" im Setup an ist **und** die passende Datei existiert –
fehlt sie, passiert einfach nichts.

## Ablage-Konvention

```
assets/begriffe/<kategorie-id>/<wort-slug>.webp
```

- **kategorie-id** – die interne ID der Kategorie, z. B. `kueche`,
  `staedte`, `musik`, `technologie`, `film`, `outdoor`, `fotografie`,
  `landwirtschaft`, `nachtleben`, `handwerk`, `sex`
- **wort-slug** – der Begriff in Kleinbuchstaben; Umlaute werden
  umgeschrieben (ä→ae, ö→oe, ü→ue, ß→ss), alles außer a–z/0–9 wird
  zu einem Bindestrich

## Beispiele

| Begriff              | Kategorie | Dateipfad                                          |
|----------------------|-----------|----------------------------------------------------|
| Walk of Shame        | sex       | `assets/begriffe/sex/walk-of-shame.webp`           |
| Mähdrescher          | landwirtschaft | `assets/begriffe/landwirtschaft/maehdrescher.webp` |
| One-Night-Stand      | sex       | `assets/begriffe/sex/one-night-stand.webp`         |

## Format-Empfehlung

WebP, quadratisch oder leicht querformatig, ca. 480 px Kante reicht –
die App zeigt maximal ~120 px Höhe an. Dunkler Hintergrund passt am
besten zum Design (#0a0a0a).
