# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Chenyi (Jackie) Liao built with **Docusaurus 3.9** (React 18 / TypeScript 5.2). Deployed to GitHub Pages at https://liaocy.net.

The site features a professional portfolio homepage, travel guides (Australia study abroad), and sports content (table tennis), all available in three languages (English, Japanese, Chinese).

## Commands

```bash
yarn start        # Dev server with hot reload
yarn build        # Production build (output: /build)
yarn serve        # Serve production build locally
yarn typecheck    # TypeScript type checking (tsc)
yarn clear        # Clear Docusaurus cache
```

No test suite exists. Use `yarn build` to verify changes don't break the site.

## Architecture

### Configuration

- **docusaurus.config.js** — Main config: site metadata, navbar, footer, theme, plugins, i18n, markdown/MDX (mermaid enabled), Google Tag Manager
- **sidebars.js** — Auto-generated sidebar from docs/ filesystem structure
- **tsconfig.json** — Extends @docusaurus/tsconfig (editor support only, not used for compilation)

### Pages (`src/pages/`)

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.tsx` | Homepage: typewriter hero, module chips (About/Travel/Sports), TechBackground, SkillWordCloud, TimeLine |
| `/about` | `about.tsx` | Detailed resume/timeline page |
| `/sports` | `sports/index.tsx` | Sports landing page with animated SVG and cards |
| `/sports/table-tennis` | `sports/table-tennis.tsx` | Tab-based page (History/Equipment/Techniques/Rules) |
| `/travel` | `travel/index.tsx` | Travel landing page with animated globe SVG |
| `/travel/australia` | `travel/australia.tsx` | Tab-based Australia study guide (Universities/Cities/Work/Career/Lifestyle) with hash-based tab persistence |

### Components (`src/components/`)

**Homepage:**
- `TechBackground/` — Canvas particle animation with connecting lines (theme-aware colors)
- `SkillWordCloud/` — Interactive word cloud of 56 technical skills (react-wordcloud)
- `TimeLine/` — Vertical timeline for work experience, 16+ AWS certifications, education (react-vertical-timeline-component, color-coded: blue=work, gold=certs, red=education)
- `HomepageFeatures/` — Wraps SkillWordCloud and TimeLine

**Travel (`travel/`):**
- `UniversityMap/` — Interactive Leaflet map of Australian universities, filterable by group (Go8, ATN, IRU, RUN)
- `CityGuide/` — Grid of cities with population, climate, costs, industries
- `WorkGuide/` — Part-time job opportunities and visa comparison
- `CareerGuide/` — Career/industry information
- `LifestyleGuide/` — Cost of living, accommodation, social activities
- `TabBar/` — Reusable tab navigation with keyboard accessibility

**Sports (`sports/`):**
- `HistoryTimeline/` — Table tennis history milestones
- `EquipmentGuide/` — Expandable equipment cards with custom SVG illustrations
- `TechniqueGuide/` — Filter-based technique display by difficulty level
- `RulesGuide/` — Rules organized by section with diagrams
- `Illustrations.tsx` — SVG component library (PaddleAnatomy, RubberTypes, TableDimensions, etc.)

### Data Layer (`src/data/`)

Locale-specific JSON files with custom hooks for data loading:

- **`australia/`** — `{en,ja,zh}/` subdirectories with `cities.json`, `universities.json`, `jobs.json`, `visas.json`, `industries.json`, `companies.json`, `lifestyle.json`
  - Hook: `useLocaleData()` returns locale-appropriate data based on `i18n.currentLocale`
- **`sports/table-tennis/`** — `{en,ja,zh}/` subdirectories with `history.json`, `equipment.json`, `techniques.json`, `rules.json`
  - Hook: `useTableTennisData()` returns locale-appropriate sports data

### Styling (`src/css/custom.css`)

- Fonts: **IBM Plex Sans** (body) + **IBM Plex Mono** (code)
- Color scheme: tech blue primary (#1a5cff light / #5b9eff dark), orange accent (#f97316 / #fb923c)
- Dark background: #090c10; Light background: #f8f9fb
- Frosted glass navbar (backdrop-filter blur)
- Global animations: fadeIn, fadeInUp, shimmer keyframes

### Other

- **src/clientModules/preserveHash.js** — Preserves URL hash fragments when switching locales
- **blog/** — Blog posts in Markdown/MDX (date-prefixed files, authors.yml for metadata)
- **docs/** — Documentation pages (auto-sidebar); includes `superpowers/` subdirectory for plans/specs
- **static/** — Favicon, logos, social card, CNAME file, .nojekyll
- **i18n/** — Translations for `ja` and `zh` locales (code.json for UI strings, mirrored docs/blog content)
- **scripts/i18n.sh** — Generates translation scaffolding (`yarn write-translations` + copies docs/blog per locale)

## Key Details

- Color mode: dark default, user can toggle, respects system preference (`respectPrefersColorScheme: true`)
- Multilingual local search via @cmfcmf/docusaurus-search-local with CJK tokenization (@node-rs/jieba)
- Interactive maps use react-leaflet (browser-only, lazy loaded via `BrowserOnly`)
- CI: GitHub Actions deploys on push to main (`deploy.yml`); PRs get test builds (`test-deploy.yml`)
- Package manager: **Yarn** (use `yarn` not `npm`)
- Node requirement: >=16.14
- MDX format with Mermaid diagram support and MDX v1 compatibility mode

## Conventions

- Data is locale-separated into `{en,ja,zh}/` subdirectories under `src/data/`, loaded via custom hooks
- Travel/sports pages use tab-based layouts with hash persistence for deep linking
- SVG illustrations are inline React components (not external files) in `sports/Illustrations.tsx`
- Component folders follow `ComponentName/index.tsx` + optional `styles.module.css` pattern
- Translation keys use dot-notation namespaces: `homepage.*`, `about.*`, `tt.*` (table tennis), `aus.*` (Australia)
