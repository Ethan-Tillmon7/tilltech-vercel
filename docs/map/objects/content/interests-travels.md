---
type: object
cluster: content
universe: ghost
status: verified
verified: 2026-10-06 @ 0ab6594
entity: src/components/_parked/interests/InterestTabs.tsx
---

# Interests and travels (ghost)

Favorite-things tabs (`src/data/interests.json`) and a Leaflet world map, travel stats and photo gallery (`src/data/travels.json`). The Interests section was removed from the site on 2026-03-10 (commit `b171eec`). Nothing renders any of it. Parked for possible future integration (owner, 2026-10-06).

## Why this shape

It was the original plan's Interests/Travels pages (see `docs/planning/`), unwired when the site shrank to four routes. It was kept, not deleted, so it can come back.

## Shape

- `InterestTabs.tsx` is imported by nothing. Its travel imports are already commented out (`InterestTabs.tsx:4-6`).
- `interests.json` has no importer. Type `FavoriteItem` at `src/types/index.ts:100-108`.
- `travels.json` (`countries`, `usStates`, `locations`, `photos` (empty)) is read only by `src/components/_parked/travels/`: `MapInner.tsx:6,32`, `TravelStats.tsx:4,7-8`, `PhotoGallery.tsx:7,13`. `WorldMap.tsx` dynamically loads `MapInner`. Types at `types/index.ts:111-142`.
- `leaflet`, `react-leaflet`, `@types/leaflet` (`package.json:16,22,30`) and `react-photo-album`/`yet-another-react-lightbox` exist only for this code.

## Connected to

- **looks-like-but-is-not:** [about](about.md) `placesLived`, which is live on `/about`

## If you change this

- **Hits:** reviving it means adding a route + a `navigation.json`/`SectionGrid.tsx`/`sitemap.ts` entry ([nav-and-social](nav-and-social.md)), and un-commenting `InterestTabs.tsx:4-6`. Leaflet components need `"use client"`.
- **Does not hit:** any live page. Edits here are invisible, so don't use it to test a change.

## Surfaces

| Surface | Role |
| --- | --- |
| none | — |

## See

- Source: `src/components/_parked/interests/InterestTabs.tsx`
