# components/_parked/

Built, working features that no page renders. Kept for possible future integration (Ethan, 2026-10-06). Don't import from here into a live page without reading the matching card first.

| Folder | What it is | Card |
| --- | --- | --- |
| `health/` | Strava feed, marathon countdown, fitness goals | `docs/map/objects/wiring/health-strava.md` |
| `interests/` | Favorite books, music and places tabs | `docs/map/objects/content/interests-travels.md` |
| `travels/` | Leaflet world map, travel stats, photo gallery | `docs/map/objects/content/interests-travels.md` |

These still live outside this folder, because other code or routes depend on their location:

- `src/hooks/useStrava.ts`, `src/hooks/useCountdown.ts`
- `src/lib/strava.ts`
- `src/app/api/strava/activities/route.ts`, which is still built and reachable
- `src/data/interests.json`, `src/data/travels.json`

To revive one: move its folder back to `src/components/`, add a route under `src/app/`, then add nav entries. The card lists every place that needs one.
