---
type: process
status: verified
verified: 2026-10-06 @ working tree (post-layout pass)
consumes: [resume]
produces: [resume]
---

# Update the résumé

Replace the served résumé PDF with a new version and point the viewer at it.

## Input → Movement → Output

Input: a new exported PDF. Movement: add it under a new versioned name, repoint the one hardcoded URL, and retire the old file. Output: `/portfolio`'s download button (and iframe) serve the new version.

## Why this shape

The file name carries the version, so the URL changes each time and the code has to follow. Past practice (`b171eec`, v1.2 → v1.3) removed old versions from `public/`, so a stale résumé isn't left downloadable at an old URL.

## Steps

1. Export to `public/resume/Resumé v<N>-PDF.pdf`.
2. Update `RESUME_URL` in `src/components/portfolio/ResumeViewer.tsx:8`. Keep the `%C3%A9` (precomposed é). Git stores names precomposed, which matches. A local `next start` on macOS will 404 that URL, because the filesystem stores the name decomposed. Production is fine.
3. Move the previous PDF to `docs/_archive/resume/` (this repo's convention since 2026-10-06; before that, old versions were deleted).
4. The `.docx` source sits beside the PDF in `public/resume/` by owner choice (2026-10-06). It's publicly downloadable at its URL, though nothing links to it. Retire the old `.docx` with the old PDF.
5. If the résumé's facts changed, check [about](../objects/content/about.md) and [skills](../objects/content/skills.md). They're separate homes and won't update themselves.
6. [ship-to-production](ship-to-production.md).

## If you change this

- **Hits:** any outside link to the old PDF URL (not yet asked whether one exists).
- **Does not hit:** the iframe's frame header. The `SAMEORIGIN` rule in `next.config.ts` covers all of `/resume/*`.

## Surfaces

| Surface | Role |
| --- | --- |
| Owner | writes the PDF |
| `/portfolio` visitors | read and download |

## See

- Objects: [resume](../objects/content/resume.md)
- Source: `src/components/portfolio/ResumeViewer.tsx`
