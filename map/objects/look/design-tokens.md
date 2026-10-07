---
type: object
cluster: look
universe: live
status: verified
verified: 2026-10-06 @ 0ab6594
entity: src/app/globals.css
---

# Design tokens

Where the palette and fonts in `/DESIGN.md` become code. The values live in DESIGN.md; this card only says where they're wired.

## Why this shape

Tailwind v4 reads tokens from a CSS `@theme` block, which gives classes like `text-primary` and `font-pixel`. A parallel `:root` set exists for plain-CSS uses like the scrollbar.

## Shape

- Fonts: Google Fonts `@import` at `src/app/globals.css:1`, not `next/font`
- Tailwind tokens: `@theme` at `globals.css:4-13`
- **Duplicate** plain variables: `:root` at `globals.css:15-21`, used by `body` and the scrollbar (`:23-48`)
- Body defaults: `src/app/layout.tsx:28`
- Some components hardcode the green as `rgba(66, 186, 64, …)`, e.g. `src/components/portfolio/ProjectCard.tsx:35`
- `.impeccable/design.json` is generated from DESIGN.md by the impeccable tool. Don't hand-edit it.

## Connected to

- **owned-by:** `/DESIGN.md`, the only home for color and type decisions

## If you change this

- **Hits:** changing a color means DESIGN.md + `@theme` + `:root` (both blocks) + any hardcoded `rgba(66, 186, 64` (grep for it).
- **Does not hit:** `docs/planning/color-palette/`. It's historical and won't update anything.

## Surfaces

| Surface | Role |
| --- | --- |
| Every page | reads |

## See

- Source: `src/app/globals.css`
