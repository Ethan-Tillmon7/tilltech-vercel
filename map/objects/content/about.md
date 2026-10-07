---
type: object
cluster: content
universe: live
status: verified
verified: 2026-10-06 @ 0ab6594
entity: src/data/about.json
---

# About

`src/data/about.json`, four keys (`bio`, `education`, `placesLived`, `timeline`), each rendered by its own component on `/about`.

## Why this shape

One file per page keeps "update my story" to a single edit. Each key maps 1:1 to a component, so sections can be reordered in `src/app/about/page.tsx` without touching data.

## Shape

- `bio`: string → `src/components/about/Bio.tsx:30`. The profile photo path is hardcoded at `Bio.tsx:17` (`/images/profile/CompositePicture.png`), not in JSON.
- `education[]`: `Education`, `src/types/index.ts:50-58` → `Education.tsx:14`
- `placesLived[]`: `PlaceLived`, `types/index.ts:69-74` → `PlacesLived.tsx:14`
- `timeline[]`: `TimelineEvent`, `types/index.ts:60-67` → `Timeline.tsx:20`. The dot color per `type` is at `Timeline.tsx:6-11`.

## Connected to

- **owned-by:** route `/about` (`src/app/about/page.tsx`)
- **looks-like-but-is-not:** `placesLived` is not travels. The `travels.json` map is a ghost ([interests-travels](interests-travels.md))
- **joins:** PRODUCT.md, which flags the site's facts as stale (2026-10-06). This file is where most of them live

## If you change this

- **Hits:** a new timeline `type` needs `types/index.ts:65` and a color in `Timeline.tsx:6-11`, or the dot gets no color. Swapping the photo means editing `Bio.tsx:17`.
- **Does not hit:** résumé PDF ([resume](resume.md)) and `skills.json`. Updating your story here doesn't update them.

## Surfaces

| Surface | Role |
| --- | --- |
| `/about` | reads |

## See

- Source: `src/data/about.json`
