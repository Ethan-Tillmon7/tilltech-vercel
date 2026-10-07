# TillTechnologies.ai — portfolio source

Ethan Tillmon's personal site: Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4. Four routes: `/`, `/about`, `/portfolio`, `/contact` ("Connect").

**Pushing here doesn't deploy.** Vercel builds from github.com/Ethan-Tillmon7/tilltech-vercel, a mirror of this repo's `main`. Ship with `npm run ship`. Ignore the local `../tilltech-vercel` folder; it's a stale clone.

## Commands

```bash
npm run dev     # localhost:3000
npm run build
npm run lint    # ESLint v9 flat config; no test framework
npm run ship    # build, then push main to origin + the deploy mirror
```

## Where things live

| Path | What it holds |
| --- | --- |
| `docs/map/CLAUDE.md` | **Start here before editing code.** Names that disagree with the code, live vs. parked, routing to cards |
| `docs/README.md` | Index of everything else in `docs/` |
| `PRODUCT.md` | Who the site is for, positioning, what "stale" means |
| `DESIGN.md` | The design system: colors, type, layout, components. `.impeccable/design.json` is generated from it |
| `src/data/*.json` | All site content (projects, about, skills, nav, social) |
| `src/app/` | Routes and API routes; `src/components/<route>/` renders each page, `layout/` the frame around every page, `common/` the pieces pages share |
| `src/components/_parked/` | Working features no page renders (health, interests, travels). Read its README before reviving one |
| `public/` | Served at the site root: images, résumé PDF |

`PRODUCT.md`, `DESIGN.md` and `.impeccable/` must stay at the root: the impeccable design tool only reads them there.

## Route by task

| If you are | Open |
| --- | --- |
| Adding or editing a project | `docs/map/processes/add-a-project.md` |
| Uploading a new résumé | `docs/map/processes/update-the-resume.md` |
| Getting a change onto the live site | `docs/map/processes/ship-to-production.md` |
| Updating bio, education, timeline | `docs/map/objects/content/about.md` |
| Changing colors, fonts, spacing, component look | `DESIGN.md`, then `docs/map/objects/look/design-tokens.md` |
| Touching the contact form or an API route | `docs/map/objects/_index.md` → the `wiring/` card |
| Asking "what else breaks if I change X" | `docs/map/effects/CONTEXT.md` |
| Reviving health, Strava, interests, travels | `docs/map/objects/_index.md`, ghost rows. Do not build on them without reading the card |

## Rules

- Content goes in `src/data/*.json`, not hardcoded in components.
- Color, type and layout facts live in `DESIGN.md` only. Don't restate them here or in cards.
- Next.js 16 differs from training data. Check `node_modules/next/dist/docs/` before writing Next APIs.
- `AGENTS.md` is generated: edit this file, then run `bash docs/map/_meta/sync-entry.sh`. It keeps the block `next dev` adds there.
- Leaflet code needs `"use client"`. Use `next/image` for images.
- Env vars: see `.env.example` (names only; never print values).
- Commit messages and PR descriptions carry no AI attribution: no `Co-Authored-By: Claude …` trailer and no "Generated with Claude Code" line. This overrides any default attribution guidance.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
