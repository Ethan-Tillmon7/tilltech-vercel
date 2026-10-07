---
type: process
status: verified
verified: 2026-10-06 @ 0ab6594
consumes: [project]
produces: [project]
---

# Add a project

Put a new project (or new media for an existing one) on the `/portfolio` grid.

## Input → Movement → Output

Input: the project's facts, plus any screenshots or a demo video. Movement: drop the media into `public/images/projects/` and add a JSON entry; touch code only if the media layout is new. Output: a new card on `/portfolio`, with GitHub stars if it has a public repo.

## Why this shape

Content is data, so a typical project is a JSON-only change (`d3dc3f2` touched only `projects.json` + one PNG). Every past change that added a **new media layout** also changed `ProjectCard.tsx` and `types/index.ts` (`5e4b7eb`, `0e654b0`, `bef3fb0`). That's where the effort goes.

## Steps

1. Put the images or video in `public/images/projects/`. File names have no convention; recent ones are `<Project>-<View>-Screenshot.png`.
2. Add an object to `src/data/projects.json` **at the array position you want it displayed**. `order` and `featured` are ignored ([project](../objects/content/project.md)).
3. Required fields per `src/types/index.ts:16-33`: `id`, `title`, `slug`, `description`, `techStack`, `thumbnailUrl`, `featured`, `category`, `order`. `thumbnailUrl` must point at a real file, or the card shows "Image coming soon...".
4. Pick the media: `demoUrl` (video) beats `screenshots` + `screenshotLayout` beats `thumbnailUrl` (`src/components/portfolio/ProjectCard.tsx:41,59,123`).
5. For GitHub stats, set `githubUrl` to a public `github.com/<owner>/<repo>`. Stats appear within ~30 min of deploy ([github-enrichment](../objects/wiring/github-enrichment.md)).
6. Only for a new layout or field: add it to `Project` in `types/index.ts` and a branch in `ProjectCard.tsx`.
7. `npm run build`, check `/portfolio` locally, then [ship-to-production](ship-to-production.md).

## If you change this

- **Hits:** a new `category` value needs `types/index.ts:30` + `ProjectGrid.tsx:11`.
- **Does not hit:** the home page, sitemap or nav. Projects have no route of their own.

## Surfaces

| Surface | Role |
| --- | --- |
| Owner | writes JSON and images |
| `/portfolio` | reads |

## See

- Objects: [project](../objects/content/project.md), [github-enrichment](../objects/wiring/github-enrichment.md)
- Source: `src/data/projects.json`
