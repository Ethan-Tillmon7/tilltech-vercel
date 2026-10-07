#!/usr/bin/env bash
# Regenerate AGENTS.md as a byte-identical twin of CLAUDE.md at the repo root.
# Edit CLAUDE.md, never AGENTS.md.
set -euo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"
cp "$root/CLAUDE.md" "$root/AGENTS.md"
cmp -s "$root/CLAUDE.md" "$root/AGENTS.md" && echo "AGENTS.md synced"
