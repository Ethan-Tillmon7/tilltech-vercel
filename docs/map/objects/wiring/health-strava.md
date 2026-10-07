---
type: object
cluster: wiring
universe: ghost
status: verified
verified: 2026-10-06 @ 0ab6594
entity: src/lib/strava.ts
---

# Health and Strava (ghost)

Strava activity feed, marathon countdown and fitness goals (`src/components/health/`). No page renders them. Parked for possible future integration (owner, 2026-10-06).

## Why this shape

It was the original plan's Health page. The OAuth refresh-token flow lives server-side so the client secret never reaches the browser.

## Shape

- `StravaFeed.tsx:6` → `src/hooks/useStrava.ts:13` → `GET /api/strava/activities` (`src/app/api/strava/activities/route.ts:10`) → `src/lib/strava.ts:36`
- `lib/strava.ts:9-11` checks the env vars `STRAVA_CLIENT_ID` / `_SECRET` / `_REFRESH_TOKEN`
- **The API route is still built and reachable** even though no UI calls it
- `MarathonCountdown.tsx:5` uses `src/hooks/useCountdown.ts`. `FitnessGoals.tsx:7` hardcodes its goals inline, with no JSON.
- Types `StravaActivity`, `FitnessGoal`: `src/types/index.ts:77-97`

## Connected to

- **looks-like-but-is-not:** [github-enrichment](github-enrichment.md). Same hook → route → lib pattern, but that one is live.

## If you change this

- **Hits:** reviving it means a route + nav entries ([nav-and-social](../content/nav-and-social.md)) + Strava env vars in the `tilltech-vercel` Vercel project. Removing it means also deleting the API route, `lib/strava.ts`, both hooks and the types.
- **Does not hit:** any live page.

## Surfaces

| Surface | Role |
| --- | --- |
| `/api/strava/activities` | reachable, no caller |

## See

- Source: `src/lib/strava.ts`
