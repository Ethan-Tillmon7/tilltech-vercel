#!/usr/bin/env bash
# Ship main to production.
# Vercel builds tilltechnologies.ai from github.com/Ethan-Tillmon7/tilltech-vercel, which mirrors
# this repo's main. Pushing main there (fast-forward only) is the deploy.
# Uses the URL directly, not a remote name, so local remote config can't point it somewhere else.
set -euo pipefail

DEPLOY_URL="https://github.com/Ethan-Tillmon7/tilltech-vercel.git"

cd "$(git rev-parse --show-toplevel)"

if [ "$(git branch --show-current)" != "main" ]; then
  echo "Ship from main only." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree not clean. Commit, stash, or remove untracked files first;" >&2
  echo "a local build that leans on uncommitted files can pass here and fail on Vercel." >&2
  git status --short >&2
  exit 1
fi

git fetch -q origin main
git fetch -q "$DEPLOY_URL" main
deployed="$(git rev-parse FETCH_HEAD)"

if ! git merge-base --is-ancestor "$deployed" HEAD; then
  echo "The deploy repo has commits that main doesn't. Someone committed to it directly." >&2
  echo "Inspect with: git log --oneline HEAD..$deployed   (never force-push to fix this)" >&2
  exit 1
fi

pending="$(git log --oneline "$deployed..HEAD")"
if [ -z "$pending" ]; then
  echo "Nothing to ship: production is already at $(git rev-parse --short HEAD)."
  exit 0
fi

echo "Production is at $(git rev-parse --short "$deployed"). Shipping:"
echo "$pending"

npm run build

git push origin main
git push "$DEPLOY_URL" main

echo "Shipped $(git rev-parse --short HEAD). Vercel is building it from tilltech-vercel."
