---
type: object
cluster: content
universe: live
status: verified
verified: 2026-10-06 @ working tree (post-layout pass)
entity: src/data/skills.json
---

# Skills

`src/data/skills.json`, an array of `SkillCategory` (5 today: Languages, Frameworks, Tools, AI-Assisted Dev, Soft Skills), each a list of `Skill`, rendered on `/portfolio`. There is no `/skills` route.

## Why this shape

Grouped by category so the page can render one block per group without sorting logic.

## Shape

- Types: `src/types/index.ts:36-47`
- Imported at `src/app/portfolio/page.tsx:7`, mapped to `SkillCategory` components
- **Only `skill.name` renders**, as a badge chip (`src/components/portfolio/SkillCategory.tsx:24`). `level`, `icon` and `category` are in the data and the type, but nothing reads them.

## Connected to

- **owned-by:** `/portfolio`, alongside [project](project.md) and [resume](resume.md)
- **looks-like-but-is-not:** the old `SkillBar`/`SkillCloud` components named in the pre-map docs. They don't exist.

## If you change this

- **Hits:** a new category object renders automatically. A new field needs `SkillCategory.tsx`.
- **Does not hit:** changing `level` or `icon` has no visible effect.

## Surfaces

| Surface | Role |
| --- | --- |
| `/portfolio` | reads |

## See

- Source: `src/data/skills.json`
