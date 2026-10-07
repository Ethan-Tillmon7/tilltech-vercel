# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TillTechnologies.ai — a personal portfolio website for Ethan Tillmon. Dark-themed with vibrant green accents, featuring sections for bio, portfolio projects, skills, health/fitness tracking, hobbies, travels, and contact.

**Status**: Early scaffolding phase. Dependencies installed and config in place, but component directories are empty and pages use Next.js boilerplate.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (v9 flat config)
```

No test framework is configured yet.

## Tech Stack

- **Next.js 16** with App Router (not Pages Router) and React 19
- **TypeScript** with strict mode; path alias `@/*` → `./src/*`
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin
- **Framer Motion** for animations
- **Leaflet + React Leaflet** for interactive travel map
- **React Hook Form** for forms, **SWR** for data fetching
- **react-type-animation** for typewriter header effect
- **react-photo-album + yet-another-react-lightbox** for photo gallery
- **Axios** for HTTP calls to external APIs

## Architecture

### Routing
Uses Next.js App Router. Pages live in `src/app/`. Root layout at `src/app/layout.tsx`.

### Component Organization
Components are organized by feature section under `src/components/`:
- `layout/` — Header, Footer, Navigation
- `home/` — Hero, TypewriterHeader
- `about/` — Bio, Education, Timeline
- `portfolio/` — ProjectCard, ProjectGrid, ProjectDetail
- `skills/` — SkillBar, SkillCloud, ResumeViewer
- `health/` — StravaFeed, MarathonCountdown, WhoopStats
- `interests/` — FavoriteMovies, FavoriteBooks, FavoritePlaces
- `travels/` — WorldMap, PhotoGallery, LifeTimeline
- `contact/` — ContactForm, SocialLinks
- `common/` — Shared UI primitives (Button, Card, Loading)

### Data & API Integrations
- `src/lib/` — API client modules (Strava, GitHub, Whoop)
- `src/data/` — Static JSON data files (projects, skills, interests, travels)
- External APIs: Strava (fitness activities), GitHub (repo data), Whoop (health metrics), EmailJS (contact form)

### Environment Variables
Defined in `.env.local`. Server-only secrets (no `NEXT_PUBLIC_` prefix) for Strava client secret/refresh token, GitHub token, Whoop key. Client-exposed vars (`NEXT_PUBLIC_`) for Strava client ID, EmailJS credentials, and Google Analytics ID.

## Design System

### Color Palette
| Token        | Hex       | Usage                    |
|-------------|-----------|--------------------------|
| `text`      | `#e9f1e9` | Light text on dark bg    |
| `background`| `#020302` | Near-black background    |
| `primary`   | `#42ba40` | Vibrant green (buttons, accents) |
| `secondary` | `#534a64` | Purple-gray (subtle elements) |
| `accent`    | `#1eae19` | Deep green (hover states) |

Available as CSS variables (`var(--primary)`) and Tailwind classes (`text-primary`, `bg-accent`, etc.).

### Typography
- **Headers**: `font-pixel` — "Press Start 2P" (8-bit retro style)
- **Body**: `font-lato` — Lato (weights: 300, 400, 700, 900)
- Both loaded via Google Fonts import in `globals.css`

### Styling Approach
Tailwind utility classes as the primary styling method. Custom CSS variables in `globals.css` for the color palette. Custom scrollbar styling uses the green theme colors.

## Key Reference Documents

- `TillTechnologiesSiteProjectOverview.txt` — Full project scope, phased development plan, recommended file structure, and setup instructions
- `PortfolioSiteDesignScope.txt` — High-level feature requirements and design choices
- `colorscheme/` — Color palette reference files

## Featured Projects to Showcase

1. Guided Buying Experience (DataMap)
2. RecyclePlatinum site
3. Joshinator Analyzer (`Ethan-Tillmon7/joshinator-analyzer`)
4. RAgent (`Ethan-Tillmon7/RAgent`)
5. Letter Links (`Ethan-Tillmon7/Letter-Links`)
6. Retro Rumble (`Ethan-Tillmon7/Retro-Rumble`)
7. StyleU (optional, `Ethan-Tillmon7/StyleU`)

## Notes

- The root layout (`src/app/layout.tsx`) still uses default Geist fonts from the Next.js template — needs updating to use Lato/Press Start 2P
- Metadata in `layout.tsx` still has boilerplate "Create Next App" title/description
- Leaflet requires `"use client"` directive since it accesses the DOM
- Use Next.js `Image` component for optimized image loading
