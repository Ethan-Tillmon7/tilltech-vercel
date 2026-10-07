---
type: object
cluster: content
universe: live
status: verified
verified: 2026-10-06 @ 0ab6594 + working tree
entity: src/data/projects.json
---

# Project

One entry in `src/data/projects.json` (type `Project`), rendered as a card in the `/portfolio` grid.

## Why this shape

Projects are static JSON so adding one is a data edit, not a code change. The `id` is the join key for live GitHub stats. The media fields are mutually exclusive in a fixed order, which lets one card component handle videos, carousels, grids and plain thumbnails.

## Shape

- Type: `src/types/index.ts:16-33`. Cast without validation at `src/components/portfolio/ProjectGrid.tsx:10`. A typo'd key compiles fine and silently doesn't render.
- **Display order = array order in the JSON.** `order` and `featured` are declared but never read anywhere in `src/`. `longDescription` is never read either.
- `category` must be `professional` | `personal` | `academic`. The filter buttons are hardcoded to those three (`ProjectGrid.tsx:11`).
- Media picks the **first** match (`src/components/portfolio/ProjectCard.tsx`):
  1. `demoUrl`, a video (`:41`)
  2. `screenshots` (>1) + `screenshotLayout: "carousel"` (`:59`), otherwise the grid layout
  3. `thumbnailUrl` (`:123`), which shows "Image coming soon..." on load error (`:118`, `:129`)
- Badges: `status: "in-development"` (`:138`), `category` (`:144`), `techStack` chips (`:154`). Links: `githubUrl` (`:160`), `liveUrl` (`:178`).
- As of 2026-10-06, 4 `thumbnailUrl`s point at images that exist nowhere: guided-buying, letter-links, retro-rumble, ieee754. Retro Rumble never shows its thumbnail because the video wins; the other 3 show "Image coming soon...". To fix one, drop a file at the path its `thumbnailUrl` already names.

## Connected to

- **owns:** its images under `public/images/projects/`
- **joins:** [github-enrichment](../wiring/github-enrichment.md), keyed by `id`, only if `githubUrl` is a github.com URL
- **looks-like-but-is-not:** `skills.json` categories. Unrelated `category` vocabulary

## If you change this

- **Hits:** renaming `id` drops that card's GitHub stars until the cache expires. Adding a `category` value needs `types/index.ts:30` **and** `ProjectGrid.tsx:11`. Adding a media field needs a branch in `ProjectCard.tsx`.
- **Does not hit:** `order`/`featured`. Editing them changes nothing; reorder the array instead. Also unaffected: the home page `SectionGrid`, which doesn't read projects.

## Surfaces

| Surface | Role |
| --- | --- |
| `/portfolio` via `ProjectGrid` | reads |
| `/api/github/repos` | reads `id` + `githubUrl` |
| Live site | only after the change is copied to `../tilltech-vercel` |

## See

- Source: `src/data/projects.json`
