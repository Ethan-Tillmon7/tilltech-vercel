# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: people who look Ethan up.** Colleagues, collaborators, peers, people coming from LinkedIn or GitHub, and future employers checking his background. They arrive with a name, not a need, and want an accurate picture of who he is, what he has built, and what he is doing now.

**Secondary: hiring managers.** Ethan is employed full time and is not job hunting (confirmed 2026-10-06). The site should still read as credible to a recruiter, but it is no longer optimized to convert one.

## Product Purpose

TillTechnologies.ai is Ethan Tillmon's personal site and the professional record of his career. It exists so that anyone who looks him up finds a current, credible account of his education, client work, and projects, plus a way to reach him.

Success means a visitor leaves with an up-to-date understanding of Ethan and knows how to contact him. A stale fact counts as a failure: the user confirmed on 2026-10-06 that the site is out of date (see Capabilities and Constraints).

## Positioning

A product-minded builder with a software engineering foundation who has shipped for real clients and keeps building ambitious things on his own. His client work spans legacy modernization, procurement, manufacturing digitization and e-commerce (DataMap, Beyond79, Vernon LLC, RecyclePlatinum). His own projects span an iOS app, real-time computer vision, a fintech API, a multiplayer game and a Unity game. He has a CS degree from LSU and an M.S. in IT Management from Tulane, works full time as a Software Developer at Beyond79, and is a part owner at Vernon LLC, an AI & automation consulting firm where he also leads new client acquisition (e.g., Playmaker Sports on retainer).

## Operating Context

- Visitors usually arrive from a link (LinkedIn, GitHub, email signature, résumé) and scan briefly, often on a phone.
- The site uses four routes: Home, About, Portfolio, and Connect (the contact page).
- The contact form posts to `/api/contact`. GitHub and Strava data come from server routes (`/api/github/repos`, `/api/strava/activities`).
- Content lives in static JSON under `src/data/`: about, projects, skills, social, navigation, interests, travels.
- Hosted on Vercel, with Vercel Analytics and Google Analytics.

## Capabilities and Constraints

**Current pages**

- **Home:** typewriter hero ("Hello World... / Welcome to my site") and a grid previewing each section.
- **About:** bio, education, places lived, career and education timeline.
- **Portfolio:** résumé viewer, project grid (professional, personal and academic projects, some with screenshot carousels or a demo video), and skills by category.
- **Connect:** contact form and social links.

**Built but not shown on any page:** health (Strava feed, marathon countdown, fitness goals), interests (tabs), and travels (world map, photo gallery, travel stats). The user wants a *small dose* of personal content: some personality, while the site stays focused on work. Which pieces return, and in what form, is undecided.

**Known stale or placeholder content:**

- **Resolved 2026-10-07:** the part-owner company is Vernon LLC (minority Class B owner); the bio reflects it, and ownership has its own timeline entry (t10, "Part Owner at Vernon LLC", Jan 2026, approximate per Ethan). The bio intentionally names no Vernon clients, Playmaker Sports included (Ethan, 2026-10-07). Keep Vernon client names and CRM specifics (client, pricing, timeline) off the site; the public copy stays at "manufacturing-process digitization" and "a custom CRM now in design".
- The Instagram entry was removed from `social.json` (2026-10-07); restore it once a real profile URL is supplied.
- The Playmaker Sports and Properly Stumped project thumbnails are generated placeholders (2026-10-07); replace `PlaymakerSports-Screenshot.png` and `ProperlyStumped-Screenshot.png` in `public/images/projects/` with real screenshots.
- Fixed 2026-10-07: bio now leads with the Beyond79 full-time role; Tulane entry reads "Graduated May 2026" with an end year; timeline adds t8 (Tulane graduation, May 2026) and t9 (Software Developer at Beyond79, Jul 2026); `placesLived` no longer shows two "Present" rows; RecyclePlatinum `liveUrl` points at production; metadata description updated; skills add PHP, Swift, FastAPI, AWS, Cloudflare, SEO & AEO, Claude Code; Playmaker Sports and Properly Stumped added as professional projects.

**Open decisions:** which projects lead, and whether skills keep their self-rated percentage levels. Both should now be judged against the career-record purpose, not a job-search one.

## Brand Commitments

- **Name:** TillTechnologies.ai is a personal brand for Ethan Tillmon, not a company or consultancy. Never present it as a business or studio.
- **Voice:** casual, a little playful and developer-flavored, judging from existing copy ("Hello World...", the README's "Technical Mumbo-Jumbo"). The user has not confirmed this as binding.

## Evidence on Hand

- Résumé: `public/resume/Resumé v1.4-PDF.pdf` (uploaded 2026-10-06; Word source beside it). Earlier versions are in `docs/_archive/resume/`.
- Profile image: `public/images/profile/CompositePicture.png`.
- Project screenshots in `public/images/projects/`: Joshinator (3), Encore (3), RAgent docs, RecyclePlatinum, Vernon order lookup, Blackjack. Also the Retro Rumble demo video (`RetroRumbleDemo.mp4`) and a `Coupa Certs` folder.
- Public GitHub repos: joshinator-analyzer, Retro-Rumble, IEEE754-Convertor (under `Ethan-Tillmon7`). RAgent and Letter-Links repos are not public (404 as of 2026-10-06), so their cards have no Code link.
- Education and career facts in `src/data/about.json`. Projects in `src/data/projects.json`.

**Absent, never fabricate:** testimonials, client quotes, outcome metrics (traffic, revenue, performance numbers), user counts for personal projects, employer names or titles not supplied by Ethan.

## Product Principles

1. **Current beats comprehensive.** For a career record, an outdated fact damages credibility more than a missing one. Every surface should be easy to keep current from `src/data/`.
2. **The work is the proof.** Credibility comes from real shipped client work and real builds shown honestly. No inflated claims or invented numbers.
3. **A person, in a small dose.** Running, travel and interests add character, but they never compete with the work for attention.
4. **Answer "who is this, and what does he do now?" fast.** Someone who arrives from a link should get his current role and focus without digging.
