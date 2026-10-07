#!/usr/bin/env bash
# Ship main to production.
# Vercel builds tilltechnologies.ai from github.com/Ethan-Tillmon7/tilltech-vercel, which mirrors
# this repo's main. Pushing main there (fast-forward only) is the deploy.
set -euo pipefail

DEPLOY_REMOTE="vercel"
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

git remote get-url "$DEPLOY_REMOTE" >/dev/null 2>&1 || git remote add "$DEPLOY_REMOTE" "$DEPLOY_URL"

git fetch -q origin main
git fetch -q "$DEPLOY_REMOTE" main

if ! git merge-base --is-ancestor "$DEPLOY_REMOTE/main" HEAD; then
  echo "$DEPLOY_REMOTE/main has commits that main doesn't. Someone committed to the deploy repo directly." >&2
  echo "Inspect with: git log --oneline HEAD..$DEPLOY_REMOTE/main   (never force-push to fix this)" >&2
  exit 1
fi

pending="$(git log --oneline "$DEPLOY_REMOTE/main..HEAD")"
if [ -z "$pending" ]; then
  echo "Nothing to ship: production is already at $(git rev-parse --short HEAD)."
  exit 0
fi

echo "Shipping:"
echo "$pending"

npm run build

git push origin main
git push "$DEPLOY_REMOTE" main

echo "Shipped $(git rev-parse --short HEAD). Vercel is building it from tilltech-vercel."
