#!/usr/bin/env bash
# Regenerate AGENTS.md from CLAUDE.md at the repo root. Edit CLAUDE.md, never AGENTS.md.
# `next dev` upserts its own <!-- BEGIN:nextjs-… --> … <!-- END:nextjs-… --> blocks into AGENTS.md;
# those are carried over, so this script and Next never undo each other.
set -euo pipefail
root="$(cd "$(dirname "$0")/../../.." && pwd)"
agents="$root/AGENTS.md"

next_blocks=""
if [ -f "$agents" ]; then
  next_blocks="$(awk '/<!-- BEGIN:nextjs-/{on=1} on{print} /<!-- END:nextjs-/{on=0; print ""}' "$agents")"
fi

{
  cat "$root/CLAUDE.md"
  if [ -n "$next_blocks" ]; then
    printf '\n%s\n' "$next_blocks"
  fi
} > "$agents.tmp"
mv "$agents.tmp" "$agents"
echo "AGENTS.md synced from CLAUDE.md$([ -n "$next_blocks" ] && echo " (Next.js blocks kept)")"
