---
type: object
cluster: wiring
universe: live
status: verified
verified: 2026-10-06 @ 0ab6594
entity: src/app/api/github/repos/route.ts
---

# GitHub enrichment

Live star count and language on project cards. `GET /api/github/repos` returns a map of `GitHubRepoInfo` keyed by project `id`.

## Why this shape

The server route holds the optional token and caches the result, so visitors don't hit GitHub's 60/hr anonymous limit. Keying by `id` means the card needs no URL parsing.

## Shape

- Route reads `projects.json` directly (`src/app/api/github/repos/route.ts:4`), fetches every project with a `githubUrl` (`:22-28`), and silently skips failures (`:29-31`)
- In-memory cache: 30 min (`route.ts:6-8`) plus CDN `s-maxage=1800` (`:16`). Client SWR dedupes for 10 min (`src/hooks/useGitHub.ts:16`).
- `src/lib/github.ts:13`: `GITHUB_TOKEN` is optional. `:38` parses `github.com/<owner>/<repo>`.
- Rendered at `src/components/portfolio/ProjectCard.tsx:170` (stars, only if >0) and `:175` (language). `forks`, `updatedAt` and `openIssues` are fetched but not shown.

## Connected to

- **owned-by:** [project](../content/project.md), joined on `id`

## If you change this

- **Hits:** showing forks or last-updated is a `ProjectCard.tsx` change only; the data is already there. Changing the key away from `id` breaks `ProjectGrid.tsx:48`.
- **Does not hit:** private repos. They fail and are skipped, so no error ever reaches the page.

## Surfaces

| Surface | Role |
| --- | --- |
| `/portfolio` via `useGitHubRepos` | reads |
| GitHub REST API (external) | source |

## See

- Source: `src/app/api/github/repos/route.ts`
