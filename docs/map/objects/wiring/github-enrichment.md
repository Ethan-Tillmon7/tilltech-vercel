---
type: object
cluster: wiring
universe: live
status: verified
verified: 2026-10-06 @ working tree (harden pass)
entity: src/app/api/github/repos/route.ts
---

# GitHub enrichment

Live star count and language on project cards. `GET /api/github/repos` returns a map of `GitHubRepoInfo` keyed by project `id`.

## Why this shape

The server route holds the optional token and caches the result, so visitors don't hit GitHub's 60/hr anonymous limit. Keying by `id` means the card needs no URL parsing.

## Shape

- Route reads `projects.json` directly (`src/app/api/github/repos/route.ts:4`), fetches every project with a `githubUrl` (`:23`), and silently skips failures (`:30`). If every fetch fails, it keeps serving the last good set and retries in 5 min, instead of caching nothing for 30.
- In-memory cache: 30 min (`route.ts:6-8`) plus CDN `s-maxage=1800` (`:17`). Client SWR dedupes for 10 min (`src/hooks/useGitHub.ts:16`).
- `src/lib/github.ts:14`: `GITHUB_TOKEN` is optional. On a 401 (expired or revoked token) it retries anonymously (`:22`). Each request times out after 5s. `:43` parses `github.com/<owner>/<repo>`.
- As of 2026-10-06, the local `.env.local` token returns 401, and the `RAgent` and `Letter-Links` repos return 404 publicly (private or renamed), so their `githubUrl`s were set to `null`. Restore a URL only once its repo is public.
- Rendered at `src/components/portfolio/ProjectCard.tsx:227` (stars, only if >0, compact-formatted) and `:233` (language). `forks`, `updatedAt` and `openIssues` are fetched but not shown.

## Connected to

- **owned-by:** [project](../content/project.md), joined on `id`

## If you change this

- **Hits:** showing forks or last-updated is a `ProjectCard.tsx` change only; the data is already there. Changing the key away from `id` breaks `ProjectGrid.tsx:57`.
- **Does not hit:** private repos. They fail and are skipped, so no error ever reaches the page.

## Surfaces

| Surface | Role |
| --- | --- |
| `/portfolio` via `useGitHubRepos` | reads |
| GitHub REST API (external) | source |

## See

- Source: `src/app/api/github/repos/route.ts`
