# TillTechnologies.ai — portfolio source

Ethan Tillmon's personal site: Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4. Four routes: `/`, `/about`, `/portfolio`, `/contact` ("Connect").

**Pushing here doesn't deploy.** Vercel builds from github.com/Ethan-Tillmon7/tilltech-vercel, a mirror of this repo's `main`. Ship with `npm run ship`. Ignore the local `../tilltech-vercel` folder; it's a stale clone.

## Commands

```bash
npm run dev     # localhost:3000
npm run build
npm run lint    # ESLint v9 flat config; no test framework
npm run ship    # build, then push main to origin + the deploy mirror (see map/processes/ship-to-production.md)
```

## Where things live

| Path | What it holds |
| --- | --- |
| `map/CLAUDE.md` | **Start here before editing code.** Names that disagree with the code, live vs. parked, and routing to cards |
| `PRODUCT.md` | Who the site is for, positioning, what "stale" means |
| `DESIGN.md` | The design system: colors, type, components, do/don't. `.impeccable/design.json` is generated from it |
| `src/data/*.json` | All site content (projects, about, skills, nav, social) |
| `src/app/` | Routes and API routes; `src/components/<section>/` renders them |
| `public/` | Served at the site root: images, résumé PDF |
| `docs/planning/` | Original Feb 2026 scope doc and palette reference. Historical, not current |
| `_archive/` | Removed from `public/` and root. Not built, not served. Includes the pre-map `CLAUDE.md` |

## Route by task

| If you are | Open |
| --- | --- |
| Adding or editing a project | `map/processes/add-a-project.md` |
| Uploading a new résumé | `map/processes/update-the-resume.md` |
| Getting a change onto the live site | `map/processes/ship-to-production.md` |
| Updating bio, education, timeline | `map/objects/content/about.md` |
| Changing colors, fonts, component look | `DESIGN.md`, then `map/objects/look/design-tokens.md` |
| Touching the contact form or an API route | `map/objects/_index.md` → the `wiring/` card |
| Asking "what else breaks if I change X" | `map/effects/CONTEXT.md` |
| Reviving health, Strava, interests, travels | `map/objects/_index.md`, ghost rows. Do not build on them without reading the card |

## Rules

- Content goes in `src/data/*.json`, not hardcoded in components.
- Color/type facts live in `DESIGN.md` only. Don't restate them here or in cards.
- `AGENTS.md` is generated from this file by `map/_meta/sync-entry.sh`. Edit this file, then run the script.
- Leaflet code needs `"use client"`. Use `next/image` for images.
- Env vars: see `.env.example` (names only; never print values).
