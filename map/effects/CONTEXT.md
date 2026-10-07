# Change impact

"I'm changing X, which cards do I open?" This is a catalog only; the waterfalls live on the cards. If this table and a card disagree, fix the card. For step-by-step how-tos, see `../processes/CONTEXT.md`.

## Inside the repo

| Changing | Open | Watch for |
| --- | --- | --- |
| A project (add, edit, reorder) | [project](../objects/content/project.md) | Array order is display order; `order`/`featured` do nothing |
| A project's GitHub link or `id` | [project](../objects/content/project.md), [github-enrichment](../objects/wiring/github-enrichment.md) | Stats are keyed by `id` |
| Bio, education, timeline, places | [about](../objects/content/about.md) | New timeline `type` needs a color |
| Skills | [skills](../objects/content/skills.md) | Only `name` renders |
| Résumé PDF | [resume](../objects/content/resume.md) | Path hardcoded twice; iframe likely blocked by `X-Frame-Options` |
| A route (add, rename, remove) | [nav-and-social](../objects/content/nav-and-social.md) | 4 places: route folder, `navigation.json`, `SectionGrid.tsx`, `sitemap.ts` |
| A social link | [nav-and-social](../objects/content/nav-and-social.md) | Two `iconMap`s |
| Contact form or email delivery | [contact-route](../objects/wiring/contact-route.md) | Missing env = fake success |
| Colors or fonts | `/DESIGN.md`, then [design-tokens](../objects/look/design-tokens.md) | Two token blocks + hardcoded `rgba` |
| Security headers (`next.config.ts`) | [resume](../objects/content/resume.md) | Headers apply to `public/` files too |
| Reviving health / interests / travels | [health-strava](../objects/wiring/health-strava.md), [interests-travels](../objects/content/interests-travels.md) | Ghost. Needs routes + nav entries |

## Outside the repo (points in; nothing here names them)

| Consumer | What it depends on | Lands on |
| --- | --- | --- |
| github.com/Ethan-Tillmon7/tilltech-vercel (production deploy) | This repo's `main`, fast-forwarded by `npm run ship`. On 2026-10-06 it was at `bef3fb0` (2026-04-14); `0ab6594` (Next 16.4) and all uncommitted work are unshipped. Steps: `../processes/ship-to-production.md` | every card |
| Vercel project for `tilltech-vercel` | Env vars `GITHUB_TOKEN`, `NEXT_PUBLIC_EMAILJS_*`, `STRAVA_*`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` (names in `.env.example`) | contact-route, github-enrichment, health-strava |
| EmailJS template (emailjs.com) | Params `name`, `email`, `subject`, `message` | contact-route |
| Search engines, inbound links | `https://tilltechnologies.ai` hardcoded in `src/app/sitemap.ts:4` and `src/app/robots.ts:6`; any public URL, including the résumé PDF | nav-and-social, resume |

Owner confirmed 2026-10-06: nothing external links to the files moved out of `public/` (`HighSchoolBlackJack.py`, the overview doc, the palette files, the demo script). Not yet asked: whether anything links directly to the résumé PDF URL.
