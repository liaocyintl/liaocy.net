# liaocy.net

Personal website of Chenyi (Jackie) Liao — built with [Docusaurus 3](https://docusaurus.io/) and deployed to [liaocy.net](https://liaocy.net) via GitHub Pages.

## Features

- **Multilingual** — English, Japanese (日本語), and Chinese (中文)
- **Portfolio homepage** — Animated hero, skill word cloud, work/education timeline
- **Travel guide** — Australia study abroad guide with interactive university map, city guides, visa & career info
- **Sports content** — Table tennis history, equipment guide, techniques, and rules
- **Full-text search** — Multilingual local search with CJK tokenization
- **Dark / light mode** — Defaults to dark, respects system preference

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Docusaurus 3.10 (React 18 / TypeScript) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Maps | react-leaflet |
| Search | @cmfcmf/docusaurus-search-local |
| Package manager | Yarn |

## Development

**Requirements:** Node.js ≥ 16.14, Yarn

```bash
# Install dependencies
yarn

# Start dev server with hot reload (default locale)
yarn start

# Start dev server for a specific locale
yarn start --locale ja

# Production build (all 3 locales)
yarn build

# Serve production build locally
yarn serve

# Type check
yarn typecheck

# Clear Docusaurus cache
yarn clear
```

## Project Structure

```
src/
├── pages/          # Route pages (index, about, travel/*, sports/*)
├── components/     # Reusable components (TechBackground, TimeLine, maps, etc.)
├── data/           # Locale-separated JSON data (en/ja/zh)
│   ├── australia/  # University, city, job, visa, lifestyle data
│   └── sports/     # Table tennis history, equipment, techniques, rules
└── css/            # Global styles

i18n/               # Translation files for ja and zh locales
docs/               # Documentation pages (auto-generated sidebar)
blog/               # Blog posts
static/             # Static assets (favicon, images, CNAME)
```

## Deployment

Pushes to `main` are automatically deployed via GitHub Actions. Pull requests trigger a test build.

## License

Content and source code © Chenyi Liao. All rights reserved.
