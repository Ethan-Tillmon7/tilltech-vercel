---
type: object
cluster: content
universe: live
status: verified
verified: 2026-10-06 @ 0ab6594
entity: src/data/navigation.json
---

# Nav and social

`src/data/navigation.json` (the four routes in the header and mobile menu) and `src/data/social.json` (GitHub and LinkedIn icons in the footer and on `/contact`).

## Why this shape

One JSON list per menu so the header and mobile menu stay in sync. The route list is **not** single-sourced, though: two other places restate it.

## Shape

- `NavItem` `src/types/index.ts:2-6`. Read at `src/components/layout/Header.tsx:8,46` and `MobileMenu.tsx:5,42`. Only `label` and `href` are used; `icon` is ignored.
- Route list restated: home cards `src/components/home/SectionGrid.tsx:8,14,20`, sitemap `src/app/sitemap.ts:6-11`
- `SocialLink` `types/index.ts:9-13`. Read at `src/components/contact/SocialLinks.tsx:5` and `src/components/layout/Footer.tsx:5`
- `icon` is a string looked up in a **separate `iconMap` in each consumer**: `SocialLinks.tsx:7-11` and `Footer.tsx:7`. An unknown name renders nothing (`?? null`).
- Instagram was removed on 2026-10-07 until there's a real profile URL. Both `iconMap`s still include `FaInstagram`, so restoring it is a `social.json` edit only.

## Connected to

- **joins:** every `src/app/*/page.tsx` route

## If you change this

- **Hits:** adding or renaming a route means `navigation.json` + `SectionGrid.tsx` + `sitemap.ts` + the route folder. Adding a social platform means `social.json` + **both** `iconMap`s.
- **Does not hit:** `robots.ts` (no route list); `layout.tsx` metadata.

## Surfaces

| Surface | Role |
| --- | --- |
| Every page (header/footer) | reads |
| `/contact` | reads social |

## See

- Source: `src/data/navigation.json`, `src/data/social.json`
