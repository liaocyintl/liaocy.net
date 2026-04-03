# Design: "游天下" Section — Australia Study Guide

## Overview

Add a "游天下" (Explore the World) section to liaocy.net, starting with an Australia Study Guide. The guide is a React rewrite of the existing static SPA at `/Users/liaocy/Projects/australia_study`, integrated into Docusaurus with unified styling, i18n (en/ja/zh), and light/dark mode support.

## Routes & Navigation

- Navbar: "游天下" dropdown (en: "Explore", ja: "世界を巡る")
- `/travel` — Landing page with card grid. Currently one card: Australia Study Guide. Future cards for other destinations.
- `/travel/australia` — Main page: hero banner + sticky tab bar switching 5 modules
- Locale paths auto-handled by Docusaurus: `/ja/travel/australia`, `/zh/travel/australia`

## Page Structure: `/travel/australia`

```
<Layout>                           Docusaurus header/footer
  <HeroBanner />                   Title, subtitle, background
  <StickyTabBar />                 5 tabs, sticky on scroll
    ├── UniversityMap              react-leaflet map + filterable university list
    ├── CityGuide                  City cards grid with stats
    ├── WorkGuide                  Job cards + income calculator + visa comparison
    ├── CareerGuide                Industry cards + employer directory
    └── LifestyleGuide             Weekly schedule + food/hobbies/budget/transport grids
</Layout>
```

## Components

### UniversityMap
- `react-leaflet` map centered on Australia with circle markers per university
- Side panel: filterable list (Go8/ATN/IRU/RUN/Other), each entry shows QS rank, tuition, city
- Click marker → highlight in list, click list → pan to marker
- Data: `universities.json` (37 universities)

### CityGuide
- Responsive card grid (3 cols desktop, 1 col mobile)
- Each card: city name, population, median income, rent, living cost, climate, key industries
- Data: `cities.json` (15 cities)

### WorkGuide
- Income calculator: hourly wage input → computed weekly/monthly/yearly via React state
- Job cards filtered by category tabs (hospitality, retail, farm, etc.)
- Visa comparison table (student visa / WHV / graduate visa)
- Data: `jobs.json` (16 jobs), `visas.json`

### CareerGuide
- Industry cards with salary range, growth rate, employment numbers
- Employer directory: company cards filterable by industry
- Data: `industries.json` (15 industries), `companies.json` (23 employers)

### LifestyleGuide
- Sub-tabs: weekly schedule, food culture, hobbies, budget, transport, holidays, shopping
- Each sub-section renders as a card grid
- Data: `lifestyle.json`

## Data & i18n

### Data files
Copy and restructure JSON data from the original app into:
```
src/data/australia/
  zh/    ← Chinese (original data, primary source)
  en/    ← English translations
  ja/    ← Japanese translations
```

Each locale folder contains: `universities.json`, `cities.json`, `jobs.json`, `visas.json`, `industries.json`, `companies.json`, `lifestyle.json`.

### UI strings
All UI text (tab labels, section titles, calculator labels, filter buttons) wrapped with Docusaurus `translate()`. Translations added to `i18n/ja/code.json` and `i18n/zh/code.json`.

### Locale-aware data loading
Components use `useDocusaurusContext()` to get current locale, then dynamically import the corresponding data directory.

## Styling

- Reuse site CSS variables: `--ifm-color-primary`, `--ifm-font-family-base`, etc.
- Card style consistent with TimeLine component:
  - Dark: `#161b22` bg, `1px solid var(--ifm-color-primary)`, glow shadow
  - Light: `#ffffff` bg, subtle shadow
- Tab bar: primary color active state, sticky positioning
- Responsive: cards collapse to single column on mobile, map goes full-width
- All styles in CSS modules (`.module.css`) for scoping

## Dependencies

- `react-leaflet` + `leaflet` — interactive map
- No other new dependencies; everything else uses existing React/Docusaurus APIs

## Out of Scope

- Server-side data fetching or APIs
- User accounts or saved preferences
- Other destination guides (future work)
- Animated transitions between tabs (keep it simple)
