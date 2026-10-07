# Objects index

One line per thing in the site. Open the card, not the folder.

| Card | Universe | Status | One line |
| --- | --- | --- | --- |
| [content/project](content/project.md) | live | verified | A portfolio project: `src/data/projects.json` → `/portfolio` grid |
| [content/about](content/about.md) | live | verified | Bio, education, places lived, timeline: `src/data/about.json` → `/about` |
| [content/skills](content/skills.md) | live | verified | Skill categories: `src/data/skills.json` → `/portfolio`. Only `name` renders |
| [content/resume](content/resume.md) | live | verified | Résumé PDF in `public/resume/`, path hardcoded twice in `ResumeViewer` |
| [content/nav-and-social](content/nav-and-social.md) | live | verified | Header/menu links and social icons. Route list also lives in 2 other places |
| [wiring/contact-route](wiring/contact-route.md) | live | verified | `/contact` form → `POST /api/contact` → EmailJS |
| [wiring/github-enrichment](wiring/github-enrichment.md) | live | verified | Stars/language on project cards via `/api/github/repos` |
| [look/design-tokens](look/design-tokens.md) | live | verified | Where `DESIGN.md` colors/fonts become code: `globals.css` + `layout.tsx` |
| [wiring/health-strava](wiring/health-strava.md) | ghost | verified | Strava feed, marathon countdown, fitness goals. Endpoint deployed, no UI |
| [content/interests-travels](content/interests-travels.md) | ghost | verified | Interest tabs, world map, travel stats, photo gallery. Nothing renders them |

Not carded (small, single-file, no cross-links): `src/app/{error,loading,not-found}.tsx`, `robots.ts`, `common/Analytics.tsx`, the `common/` UI primitives. `common/Card.tsx` is imported by nothing.
