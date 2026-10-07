---
type: process
status: verified
verified: 2026-10-06 @ 1d7c907; deploy main = bef3fb0 via ls-remote
consumes: []
produces: []
---

# Ship to production

Push this repo's `main` to the deploy mirror, github.com/Ethan-Tillmon7/tilltech-vercel, which Vercel builds as tilltechnologies.ai.

## Input → Movement → Output

Input: committed work on `main`. Movement: `npm run ship` checks the tree, builds, pushes `main` to `origin`, then fast-forwards the `vercel` remote. Output: a Vercel production deploy of that commit.

## Why this shape

The deploy repo shares this repo's history: its `main` was `bef3fb0` on 2026-10-06, the same commit as here. So shipping is a fast-forward push; no copying, no replaying. Fast-forward-only means the script refuses if anyone committed to the deploy repo directly, so production can never silently lose a change.

## Steps

1. Commit your work on `main`.
2. `npm run ship` (`scripts/ship.sh`). It:
   - refuses unless on `main` with a clean tree, untracked files included (`ship.sh:12-22`)
   - fetches the deploy repo **by URL**, not by remote name (`:25-26`)
   - refuses if the deployed commit isn't an ancestor of `HEAD` (`:28-32`)
   - exits early if there's nothing to ship (`:34-38`)
   - runs `npm run build`, then pushes `origin` and the deploy URL (`:43-46`)

Local remotes as of 2026-10-06: `vercel` points at a nonexistent `tilltechnologies-vercel.git`, and `tilltech` and `vercel-repo` both point at the right URL. The script ignores all three. The first version used a remote named `vercel` and failed on that collision.
3. Watch the deploy in the Vercel dashboard for the `tilltech-vercel` project.

## If you change this

- **Hits:** env vars live on that Vercel project, not here ([contact-route](../objects/wiring/contact-route.md), [github-enrichment](../objects/wiring/github-enrichment.md)). Renaming or moving the deploy repo means updating `DEPLOY_URL` in `ship.sh:8`.
- **Does not hit:** `../tilltech-vercel`, the local folder. It's a stale clone (23 commits behind its own remote on 2026-10-06), not part of shipping. Don't read deploy state from it.

## Surfaces

| Surface | Role |
| --- | --- |
| Owner | runs `npm run ship` |
| GitHub `tilltech-vercel` | mirror of `main` |
| Vercel | builds and serves |

## See

- Objects: every card in `../objects/_index.md`
- Source: `scripts/ship.sh`
