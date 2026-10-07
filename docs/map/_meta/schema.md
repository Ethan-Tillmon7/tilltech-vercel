# Node schema

Closed set. Add a type here before using it anywhere else.

| type | Lives in | Template |
| --- | --- | --- |
| `object` | `objects/<cluster>/` | `_templates/object.md` |
| `process` | `processes/` | `_templates/process.md` |

Clusters: `content` (what a visitor reads, edited in `src/data/`), `wiring` (API routes and integrations), `look` (theme).

## Frontmatter

| Field | Values |
| --- | --- |
| `type` | `object` \| `process` |
| `cluster` | `content` \| `wiring` \| `look` |
| `universe` | `live` \| `ghost` |
| `status` | `stub` \| `verified` \| `stale` |
| `verified` | `YYYY-MM-DD @ <commit>` (required when `status: verified`) |
| `entity` | Path of the owning file (objects only) |
| `consumes` / `produces` | Object card names (processes only) |

Add a process only after the movement has happened at least twice in the commit history.
