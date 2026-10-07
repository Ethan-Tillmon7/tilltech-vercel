# map/ — edit map of the portfolio source

A walkable index of this repo for agents about to change it. The code is the source of truth; cards cite it and never restate it. Verified against `main` @ `0ab6594` plus the 2026-10-06 working tree.

## Universes

| Universe | Meaning | Here |
| --- | --- | --- |
| **live** | Rendered on a route, or called by something that is | Projects, about, skills, résumé, nav/social, contact, GitHub stats, theme |
| **ghost** | Present but not wired to any page. Parked for possible future integration (owner, 2026-10-06). Don't build on it without reading the card | Health/Strava, interests, travels |

There is no **leftover** universe yet.

## Names that disagree

| You'll hear | In code it is |
| --- | --- |
| "Connect" | route `/contact`, `src/app/contact/` |
| "Portfolio" page | `/portfolio`: renders projects **and** skills **and** the résumé |
| "Skills" section | `src/components/skills/`. There is no `/skills` route; it lives on `/portfolio` |
| "Interests" / "Travels" / "Health" | Ghost component folders. No route renders them |
| "deploy" / "live site" | GitHub `tilltech-vercel`, a mirror of this `main`, pushed by `npm run ship`. Not the stale local `../tilltech-vercel` folder |

## Where to go

| Question | Open |
| --- | --- |
| What is X? | `objects/_index.md`, then one card |
| How do I do Y (add a project, new résumé, deploy)? | `processes/CONTEXT.md`, then one card |
| What moves if I change X? | `effects/CONTEXT.md` |
| Adding a new card | Copy from `_templates/`, add a row to `objects/_index.md` or `processes/CONTEXT.md` |
| Node types allowed | `_meta/schema.md` |

## Rules for this folder

- Cite `path:line`. If a comment and the code disagree, the code wins and the card says so.
- `status: verified` needs a date and commit. When the code moves, mark the card `stale`. Don't guess.
- Design facts (colors, type, components) have one home: `/DESIGN.md`. Cards link to it.
- Load one card per question. Don't read all of `objects/`.
