---
type: object
cluster: content
universe: live
status: verified
verified: 2026-10-06 @ working tree (post-harden + adapt)
entity: src/data/projects.json
---

# Project

One entry in `src/data/projects.json` (type `Project`), rendered as a card in the `/portfolio` grid.

## Why this shape

Projects are static JSON so adding one is a data edit, not a code change. The `id` is the join key for live GitHub stats. The media fields are mutually exclusive in a fixed order, which lets one card component handle videos, carousels, grids and plain thumbnails.

## Shape

- Type: `src/types/index.ts:16-33`. Cast without validation at `src/components/portfolio/ProjectGrid.tsx:10`. A typo'd key compiles fine and silently doesn't render.
- **Display order = array order in the JSON.** `order` and `featured` are declared but never read anywhere in `src/`. `longDescription` is never read either.
- `category` must be `professional` | `personal` | `academic`. The filter buttons are hardcoded to those three, and hide any with no projects (`ProjectGrid.tsx:12`).
- Media picks the **first** match (`src/components/portfolio/ProjectCard.tsx`):
  1. `demoUrl`, a video (`:78`); if the video fails to load it falls through to the image path (`:97`, `:176`)
  2. `screenshots` (>1) + `screenshotLayout: "carousel"` (`:113`), otherwise the grid layout
  3. `thumbnailUrl` (`:181`). On load error it falls back to a blank-screen well showing the project title (`:176`, `:186`)
- Chips sit above the title: `category` (`:195`), `status: "in-development"` (`:197`). Then `techStack` badges (`:210`). Links: `githubUrl` (`:216`), `liveUrl` (`:236`).
- As of 2026-10-06, 4 `thumbnailUrl`s point at images that exist nowhere: guided-buying, letter-links, retro-rumble, ieee754. Retro Rumble never shows its thumbnail because the video wins; the other 3 show the titled blank-screen fallback. To fix one, drop a file at the path its `thumbnailUrl` already names.

## Connected to

- **owns:** its images under `public/images/projects/`
- **joins:** [github-enrichment](../wiring/github-enrichment.md), keyed by `id`, only if `githubUrl` is a github.com URL
- **looks-like-but-is-not:** `skills.json` categories. Unrelated `category` vocabulary

## If you change this

- **Hits:** renaming `id` drops that card's GitHub stars until the cache expires. Adding a `category` value needs `types/index.ts:30` **and** `ProjectGrid.tsx:12`. Adding a media field needs a branch in `ProjectCard.tsx`.
- **Does not hit:** `order`/`featured`. Editing them changes nothing; reorder the array instead. Also unaffected: the home page `SectionGrid`, which doesn't read projects.

## Surfaces

| Surface | Role |
| --- | --- |
| `/portfolio` via `ProjectGrid` | reads |
| `/api/github/repos` | reads `id` + `githubUrl` |
| Live site | only after the change is copied to `../tilltech-vercel` |

## See

- Source: `src/data/projects.json`
