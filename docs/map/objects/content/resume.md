---
type: object
cluster: content
universe: live
status: verified
verified: 2026-10-06 @ working tree (harden pass)
entity: public/resume/Resumé v1.4-PDF.pdf
---

# Résumé

The PDF at `public/resume/Resumé v1.4-PDF.pdf`, shown by `ResumeViewer` on `/portfolio` as a collapsible iframe plus a download button.

## Why this shape

A static file means a résumé update is a file swap. The file name is versioned (`v1.4` today), so a new version is a new name, and the code has to follow.

## Shape

- URL-encoded path in **one** constant, `RESUME_URL` (`src/components/portfolio/ResumeViewer.tsx:8`), used by the download button and the iframe. Downloads are saved as `RESUME_FILENAME` (`:10`, `Ethan-Tillmon-Resume.pdf`).
- Where `navigator.pdfViewerEnabled` is false (Android Chrome, some in-app browsers), the preview shows an "open in a new tab" link instead of a blank frame.
- Local gotcha: macOS stores the file name decomposed (`e` + combining accent), so the `%C3%A9` URL 404s under `next start` on a Mac. Git and Vercel use the precomposed form, which matches.
- The component lives in `components/portfolio/` with the rest of the page (`src/app/portfolio/page.tsx:6,49`)
- `next.config.ts` sends `X-Frame-Options: DENY` everywhere, but a later rule relaxes `/resume/:path*` to `SAMEORIGIN`, so `/portfolio` can frame the PDF. Verified with response headers.

## Connected to

- **joins:** [about](about.md) and [skills](skills.md). Same facts, separate homes. PRODUCT.md notes the PDF is likely as stale as the site.

## If you change this

- **Hits:** a new version means adding the new PDF to `public/resume/`, removing the old one, and updating `RESUME_URL` in `ResumeViewer.tsx` with the `é` → `%C3%A9` encoding. Moving the PDF out of `/resume/` would lose the `SAMEORIGIN` rule in `next.config.ts`.
- **Does not hit:** `about.json`, `skills.json`. Those aren't derived from the PDF.

## Surfaces

| Surface | Role |
| --- | --- |
| `/portfolio` | reads |
| Visitors | download |

## See

- Source: `src/components/portfolio/ResumeViewer.tsx`
