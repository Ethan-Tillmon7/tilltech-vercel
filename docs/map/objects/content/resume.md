---
type: object
cluster: content
universe: live
status: verified
verified: 2026-10-06 @ working tree (post-layout pass)
entity: public/resume/Resumé v1.4-PDF.pdf
---

# Résumé

The PDF at `public/resume/Resumé v1.4-PDF.pdf`, shown by `ResumeViewer` on `/portfolio` as a collapsible iframe plus a download button.

## Why this shape

A static file means a résumé update is a file swap. The file name is versioned (`v1.4` today), so a new version is a new name, and the code has to follow.

## Shape

- URL-encoded path hardcoded **twice**: download button `src/components/skills/ResumeViewer.tsx:37`, iframe `:57`
- The component lives in `components/skills/` but renders on `/portfolio` (`src/app/portfolio/page.tsx:6,49`)
- `next.config.ts:17-18` sends `X-Frame-Options: DENY` on every path, including this PDF. DENY also blocks same-origin framing, so the inline viewer is **likely blank in browsers**. The download link is unaffected. Not yet confirmed in a browser.

## Connected to

- **joins:** [about](about.md) and [skills](skills.md). Same facts, separate homes. PRODUCT.md notes the PDF is likely as stale as the site.

## If you change this

- **Hits:** a new version means adding the new PDF to `public/resume/`, removing the old one, and updating both lines in `ResumeViewer.tsx` with the `é` → `%C3%A9` encoding. Fixing the iframe means `next.config.ts` (e.g. `SAMEORIGIN` for `/resume/*`).
- **Does not hit:** `about.json`, `skills.json`. Those aren't derived from the PDF.

## Surfaces

| Surface | Role |
| --- | --- |
| `/portfolio` | reads |
| Visitors | download |

## See

- Source: `src/components/skills/ResumeViewer.tsx`
