# Welcome to my personal portfolio site code repository! Cool stuff around here, right?

Source for [tilltechnologies.ai](https://tilltechnologies.ai), Ethan Tillmon's personal site: who I am, what I've built, and how to reach me.

# Below is the 'Technical Mumbo-Jumbo'

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion.

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in what you need; the site runs without any of them
npm run dev                  # http://localhost:3000
```

## Changing the site

Nearly everything a visitor reads lives in `src/data/*.json` (projects, about, skills, nav, social), not in components.

| To | See |
| --- | --- |
| Add a project | [docs/map/processes/add-a-project.md](docs/map/processes/add-a-project.md) |
| Swap in a new résumé | [docs/map/processes/update-the-resume.md](docs/map/processes/update-the-resume.md) |
| Change the look | [DESIGN.md](DESIGN.md) |
| Understand who the site is for | [PRODUCT.md](PRODUCT.md) |

## Shipping

Pushing this repo doesn't deploy. Vercel builds from the `tilltech-vercel` mirror:

```bash
npm run ship   # clean-tree check, build, push main here and to the mirror
```

Details: [docs/map/processes/ship-to-production.md](docs/map/processes/ship-to-production.md).

## Docs

[docs/README.md](docs/README.md) indexes the rest: the agent map, planning history and archived files.
