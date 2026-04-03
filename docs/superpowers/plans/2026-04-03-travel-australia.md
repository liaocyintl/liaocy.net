# 游天下 — Australia Study Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "游天下" section to liaocy.net with a React-based Australia Study Guide featuring 5 interactive modules, Leaflet map, i18n (en/ja/zh), and unified dark/light theme.

**Architecture:** Docusaurus custom pages at `/travel` (landing) and `/travel/australia` (main app). Each of the 5 modules is an independent React component rendered within a tabbed layout. JSON data files are organized by locale and imported based on current language. All styling uses CSS modules with site CSS variables.

**Tech Stack:** React 18, Docusaurus 3, react-leaflet + leaflet, CSS modules, Docusaurus i18n (translate())

---

### File Structure

```
src/
  pages/
    travel/
      index.tsx                    ← Landing page (/travel)
      index.module.css
      australia.tsx                ← Main Australia page with tabs
      australia.module.css
  components/
    travel/
      TabBar/
        index.tsx                  ← Sticky tab bar component
        index.module.css
      UniversityMap/
        index.tsx                  ← Leaflet map + university list
        index.module.css
      CityGuide/
        index.tsx                  ← City cards grid
        index.module.css
      WorkGuide/
        index.tsx                  ← Jobs + calculator + visa table
        index.module.css
      CareerGuide/
        index.tsx                  ← Industries + employers
        index.module.css
      LifestyleGuide/
        index.tsx                  ← Lifestyle sub-tabs with card grids
        index.module.css
  data/
    australia/
      zh/                          ← Chinese data (primary, from original app)
        universities.json
        cities.json
        jobs.json
        visas.json
        industries.json
        companies.json
        lifestyle.json
      en/                          ← English translations
        (same 7 files)
      ja/                          ← Japanese translations
        (same 7 files)
      index.ts                     ← Locale-aware data loader
```

---

### Task 1: Install Dependencies and Scaffold Directories

**Files:**
- Modify: `package.json`
- Create: `src/data/australia/index.ts`

- [ ] **Step 1: Install react-leaflet and leaflet**

```bash
npx --yes yarn add react-leaflet leaflet @types/leaflet
```

- [ ] **Step 2: Create directory structure**

```bash
mkdir -p src/pages/travel
mkdir -p src/components/travel/{TabBar,UniversityMap,CityGuide,WorkGuide,CareerGuide,LifestyleGuide}
mkdir -p src/data/australia/{zh,en,ja}
```

- [ ] **Step 3: Create locale-aware data loader**

Create `src/data/australia/index.ts`:

```ts
import { useDocusaurusContext } from '@docusaurus/useDocusaurusContext';

export function useLocaleData() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  // Dynamic imports based on locale
  const dataMap = {
    zh: () => ({
      universities: require('./zh/universities.json'),
      cities: require('./zh/cities.json'),
      jobs: require('./zh/jobs.json'),
      visas: require('./zh/visas.json'),
      industries: require('./zh/industries.json'),
      companies: require('./zh/companies.json'),
      lifestyle: require('./zh/lifestyle.json'),
    }),
    en: () => ({
      universities: require('./en/universities.json'),
      cities: require('./en/cities.json'),
      jobs: require('./en/jobs.json'),
      visas: require('./en/visas.json'),
      industries: require('./en/industries.json'),
      companies: require('./en/companies.json'),
      lifestyle: require('./en/lifestyle.json'),
    }),
    ja: () => ({
      universities: require('./ja/universities.json'),
      cities: require('./ja/cities.json'),
      jobs: require('./ja/jobs.json'),
      visas: require('./ja/visas.json'),
      industries: require('./ja/industries.json'),
      companies: require('./ja/companies.json'),
      lifestyle: require('./ja/lifestyle.json'),
    }),
  };

  return (dataMap[locale] || dataMap.en)();
}
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold 游天下 directory structure and install react-leaflet"
```

---

### Task 2: Create Chinese Data Files (Primary Source)

**Files:**
- Create: all 7 files under `src/data/australia/zh/`

Copy the JSON data from the original app at `/Users/liaocy/Projects/australia_study/data/` into `src/data/australia/zh/`. The files are:

- [ ] **Step 1: Copy all JSON data files from original app**

```bash
cp /Users/liaocy/Projects/australia_study/data/universities.json src/data/australia/zh/
cp /Users/liaocy/Projects/australia_study/data/cities.json src/data/australia/zh/
cp /Users/liaocy/Projects/australia_study/data/jobs.json src/data/australia/zh/
cp /Users/liaocy/Projects/australia_study/data/visas.json src/data/australia/zh/
cp /Users/liaocy/Projects/australia_study/data/industries.json src/data/australia/zh/
cp /Users/liaocy/Projects/australia_study/data/companies.json src/data/australia/zh/
cp /Users/liaocy/Projects/australia_study/data/lifestyle.json src/data/australia/zh/
```

- [ ] **Step 2: Commit**

```bash
git add src/data/australia/zh/ && git commit -m "data: add Chinese data files for Australia study guide"
```

---

### Task 3: Create English Data Files

**Files:**
- Create: all 7 files under `src/data/australia/en/`

Translate all Chinese text fields (`*_zh` fields, `description_zh`, `tips_zh`, etc.) to English. Keep numeric fields, coordinates, URLs, and English names (`name_en`, `job_en`, etc.) unchanged. For each file:

- Fields ending in `_zh` → create corresponding English text
- Array fields containing Chinese text → translate each entry
- Proper nouns (university names, company names) → use their `name_en` or official English names

- [ ] **Step 1: Create all 7 English JSON files**

Read each zh JSON file, translate all Chinese text fields to English, and write to `src/data/australia/en/`. The structure must match zh exactly (same keys, same array lengths).

- [ ] **Step 2: Validate JSON syntax**

```bash
for f in src/data/australia/en/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8')); console.log('OK: $f')"; done
```

- [ ] **Step 3: Commit**

```bash
git add src/data/australia/en/ && git commit -m "data: add English data files for Australia study guide"
```

---

### Task 4: Create Japanese Data Files

**Files:**
- Create: all 7 files under `src/data/australia/ja/`

Same approach as Task 3 but translate to Japanese. Use natural Japanese expressions, not machine-translation style.

- [ ] **Step 1: Create all 7 Japanese JSON files**

Read each zh JSON file, translate all Chinese text fields to Japanese, and write to `src/data/australia/ja/`.

- [ ] **Step 2: Validate JSON syntax**

```bash
for f in src/data/australia/ja/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8')); console.log('OK: $f')"; done
```

- [ ] **Step 3: Commit**

```bash
git add src/data/australia/ja/ && git commit -m "data: add Japanese data files for Australia study guide"
```

---

### Task 5: Create TabBar Component

**Files:**
- Create: `src/components/travel/TabBar/index.tsx`
- Create: `src/components/travel/TabBar/index.module.css`

- [ ] **Step 1: Create TabBar component**

`src/components/travel/TabBar/index.tsx`:

```tsx
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './index.module.css';

type Tab = {
  id: string;
  label: string;
  icon: string;
};

type Props = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
};

export default function TabBar({ tabs, activeTab, onTabChange }: Props) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <nav className={styles.tabBar} data-theme={colorMode}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create TabBar styles**

`src/components/travel/TabBar/index.module.css`:

```css
.tabBar {
  position: sticky;
  top: 60px;
  z-index: 100;
  background: var(--ifm-background-color);
  border-bottom: 1px solid var(--ifm-toc-border-color);
  padding: 0;
}

.tabContainer {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabContainer::-webkit-scrollbar {
  display: none;
}

.tab {
  flex: 1;
  min-width: 120px;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: var(--ifm-color-content-secondary);
  font-family: var(--ifm-font-family-base);
  font-size: 0.9rem;
  transition: color 0.2s, border-color 0.2s;
  border-bottom: 3px solid transparent;
}

.tab:hover {
  color: var(--ifm-color-primary);
}

.tab.active {
  color: var(--ifm-color-primary);
  border-bottom-color: var(--ifm-color-primary);
  font-weight: 600;
}

.tabIcon {
  font-size: 1.2rem;
}

.tabLabel {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .tab {
    min-width: 80px;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/travel/TabBar/ && git commit -m "feat: add TabBar component for travel section"
```

---

### Task 6: Create Travel Landing Page and Navbar Entry

**Files:**
- Create: `src/pages/travel/index.tsx`
- Create: `src/pages/travel/index.module.css`
- Modify: `docusaurus.config.js` (navbar items)
- Modify: `i18n/ja/code.json`
- Modify: `i18n/zh/code.json`

- [ ] **Step 1: Create landing page**

`src/pages/travel/index.tsx`:

```tsx
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

const destinations = [
  {
    id: 'australia',
    emoji: '🇦🇺',
    title: translate({ id: 'travel.australia.title', message: 'Study in Australia' }),
    description: translate({
      id: 'travel.australia.desc',
      message: 'A comprehensive guide to studying in Australia — universities, cities, jobs, careers, and lifestyle.',
    }),
    link: '/travel/australia',
  },
];

export default function TravelLanding() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Layout title={translate({ id: 'travel.pageTitle', message: 'Explore the World' })}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          {translate({ id: 'travel.heroTitle', message: 'Explore the World' })}
        </h1>
        <p className={styles.heroSubtitle}>
          {translate({ id: 'travel.heroSubtitle', message: 'Guides and tools for studying and living abroad' })}
        </p>
      </div>
      <main className={styles.main}>
        <div className={styles.cardGrid}>
          {destinations.map((dest) => (
            <Link key={dest.id} to={dest.link} className={styles.card} data-theme={colorMode}>
              <span className={styles.cardEmoji}>{dest.emoji}</span>
              <h2 className={styles.cardTitle}>{dest.title}</h2>
              <p className={styles.cardDesc}>{dest.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
```

- [ ] **Step 2: Create landing page styles**

`src/pages/travel/index.module.css`:

```css
.hero {
  text-align: center;
  padding: 4rem 2rem 2rem;
}

.heroTitle {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.heroSubtitle {
  font-size: 1.2rem;
  opacity: 0.8;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.cardGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  display: block;
  padding: 2rem;
  border-radius: 8px;
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

[data-theme='dark'].card {
  background: #161b22;
  border: 1px solid var(--ifm-color-primary);
  box-shadow: 0 0 10px rgba(0, 102, 204, 0.2);
}

[data-theme='light'].card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.cardEmoji {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.cardTitle {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.cardDesc {
  opacity: 0.8;
  font-size: 0.95rem;
  margin: 0;
}
```

- [ ] **Step 3: Add navbar entry**

In `docusaurus.config.js`, add a "游天下" item to `navbar.items` before the `localeDropdown`:

```js
{
  to: '/travel',
  label: 'Explore',
  position: 'left',
},
```

- [ ] **Step 4: Add i18n translations for navbar and landing page**

Add to `i18n/ja/code.json`:
```json
"travel.pageTitle": { "message": "世界を巡る" },
"travel.heroTitle": { "message": "世界を巡る" },
"travel.heroSubtitle": { "message": "海外留学・生活のガイドとツール" },
"travel.australia.title": { "message": "オーストラリア留学" },
"travel.australia.desc": { "message": "オーストラリア留学の総合ガイド — 大学、都市、アルバイト、就職、生活情報" }
```

Add to `i18n/zh/code.json`:
```json
"travel.pageTitle": { "message": "游天下" },
"travel.heroTitle": { "message": "游天下" },
"travel.heroSubtitle": { "message": "海外留学与生活指南" },
"travel.australia.title": { "message": "澳大利亚留学" },
"travel.australia.desc": { "message": "澳大利亚留学全攻略 — 大学、城市、打工、就业、生活一站式指南" }
```

Add to `i18n/ja/docusaurus-theme-classic/navbar.json`:
```json
"item.label.Explore": { "message": "世界を巡る", "description": "Navbar item with label Explore" }
```

Add to `i18n/zh/docusaurus-theme-classic/navbar.json`:
```json
"item.label.Explore": { "message": "游天下", "description": "Navbar item with label Explore" }
```

- [ ] **Step 5: Build and verify**

```bash
npx docusaurus build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add travel landing page and 游天下 navbar entry with i18n"
```

---

### Task 7: Create Australia Page Shell with Tabs

**Files:**
- Create: `src/pages/travel/australia.tsx`
- Create: `src/pages/travel/australia.module.css`

- [ ] **Step 1: Create Australia page with tab switching**

`src/pages/travel/australia.tsx`:

```tsx
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import TabBar from '@site/src/components/travel/TabBar';
import styles from './australia.module.css';

const TABS = [
  { id: 'universities', label: translate({ id: 'aus.tab.universities', message: 'Universities' }), icon: '🎓' },
  { id: 'cities', label: translate({ id: 'aus.tab.cities', message: 'Cities' }), icon: '🏙️' },
  { id: 'work', label: translate({ id: 'aus.tab.work', message: 'Work' }), icon: '💼' },
  { id: 'career', label: translate({ id: 'aus.tab.career', message: 'Careers' }), icon: '📈' },
  { id: 'lifestyle', label: translate({ id: 'aus.tab.lifestyle', message: 'Lifestyle' }), icon: '🌏' },
];

export default function AustraliaPage() {
  const [activeTab, setActiveTab] = useState('universities');
  const { colorMode } = useColorMode();

  return (
    <Layout title={translate({ id: 'aus.pageTitle', message: 'Study in Australia' })}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          🇦🇺 {translate({ id: 'aus.heroTitle', message: 'Study in Australia' })}
        </h1>
        <p className={styles.heroSubtitle}>
          {translate({ id: 'aus.heroSubtitle', message: 'Everything you need to know about studying and living in Australia' })}
        </p>
      </div>
      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={styles.content}>
        {activeTab === 'universities' && <div>Universities placeholder</div>}
        {activeTab === 'cities' && <div>Cities placeholder</div>}
        {activeTab === 'work' && <div>Work placeholder</div>}
        {activeTab === 'career' && <div>Career placeholder</div>}
        {activeTab === 'lifestyle' && <div>Lifestyle placeholder</div>}
      </main>
    </Layout>
  );
}
```

- [ ] **Step 2: Create Australia page styles**

`src/pages/travel/australia.module.css`:

```css
.hero {
  text-align: center;
  padding: 3rem 2rem 1.5rem;
  background: radial-gradient(circle at center, rgba(0, 102, 204, 0.08) 0%, transparent 70%);
}

[data-theme='dark'] .hero {
  background: radial-gradient(circle at center, rgba(77, 184, 255, 0.1) 0%, transparent 70%);
}

.heroTitle {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.heroSubtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
```

- [ ] **Step 3: Add i18n for tab labels and Australia page**

Add to `i18n/ja/code.json`:
```json
"aus.pageTitle": { "message": "オーストラリア留学" },
"aus.heroTitle": { "message": "オーストラリア留学ガイド" },
"aus.heroSubtitle": { "message": "オーストラリアでの留学・生活に必要な情報を網羅" },
"aus.tab.universities": { "message": "大学マップ" },
"aus.tab.cities": { "message": "都市ガイド" },
"aus.tab.work": { "message": "アルバイト" },
"aus.tab.career": { "message": "就職情報" },
"aus.tab.lifestyle": { "message": "生活ガイド" }
```

Add to `i18n/zh/code.json`:
```json
"aus.pageTitle": { "message": "澳大利亚留学" },
"aus.heroTitle": { "message": "澳大利亚留学指南" },
"aus.heroSubtitle": { "message": "关于澳大利亚留学和生活，你需要知道的一切" },
"aus.tab.universities": { "message": "大学地图" },
"aus.tab.cities": { "message": "城市指南" },
"aus.tab.work": { "message": "打工指南" },
"aus.tab.career": { "message": "就业指南" },
"aus.tab.lifestyle": { "message": "澳洲生活" }
```

- [ ] **Step 4: Build and verify tabs work**

```bash
npx docusaurus build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Australia page shell with sticky tab bar"
```

---

### Task 8: Create UniversityMap Component

**Files:**
- Create: `src/components/travel/UniversityMap/index.tsx`
- Create: `src/components/travel/UniversityMap/index.module.css`
- Modify: `src/pages/travel/australia.tsx` (replace placeholder)

This is the most complex component. It uses react-leaflet for the map and has a side panel with filterable university list. Leaflet CSS must be imported. Since Leaflet requires `window`, use a BrowserOnly wrapper or lazy import.

- [ ] **Step 1: Create UniversityMap component**

The component must:
- Render a Leaflet map centered on Australia (-25.5, 134.5) zoom 4
- Show circle markers for each university, colored by group (Go8=blue, ATN=green, IRU=orange, RUN=purple, Other=gray)
- Side panel with filter buttons (All/Go8/ATN/IRU/RUN/Other) and a scrollable list
- Clicking a university in the list pans the map to it
- Clicking a marker highlights the university in the list
- Use `useLocaleData()` to load data for current locale
- Wrap the map in Docusaurus `BrowserOnly` since Leaflet needs `window`
- Import leaflet CSS in the component

Key fields from `universities.json`: `name_en`, `name_zh`, `city`, `state`, `lat`, `lng`, `group`, `qs_rank`, `tuition_min`, `tuition_max`

The component should use `translate()` for UI labels: "All", "QS Rank", "Tuition", etc.

- [ ] **Step 2: Create UniversityMap styles**

Styles must handle:
- Two-column layout (map left 60%, list right 40%) on desktop, stacked on mobile
- Filter buttons row with active state using primary color
- University list items with hover/selected state
- Responsive: map goes full-width on mobile, list below

- [ ] **Step 3: Add i18n for UniversityMap UI strings**

Add translations for: filter group names, "QS Rank", "Tuition", "per year", etc. to both ja and zh code.json.

- [ ] **Step 4: Wire into australia.tsx**

Replace `<div>Universities placeholder</div>` with `<UniversityMap />` (lazy loaded with BrowserOnly).

- [ ] **Step 5: Build and verify**

```bash
npx docusaurus build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add UniversityMap component with Leaflet and filterable list"
```

---

### Task 9: Create CityGuide Component

**Files:**
- Create: `src/components/travel/CityGuide/index.tsx`
- Create: `src/components/travel/CityGuide/index.module.css`
- Modify: `src/pages/travel/australia.tsx` (replace placeholder)

- [ ] **Step 1: Create CityGuide component**

Renders a responsive card grid. Each card shows:
- City name (locale-aware: `name_zh` or `name_en`)
- State badge
- Population, median income, weekly rent, monthly transport, meal average
- Climate description
- Key industries as tags
- University count

Use `useLocaleData()` for data. Use `translate()` for labels like "Population", "Median Income", "Rent/week", etc.

- [ ] **Step 2: Create CityGuide styles**

Card grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Cards use the unified card style (dark: #161b22 + border glow, light: white + shadow). Stat items in a 2-column grid inside each card. Industry tags as small colored pills.

- [ ] **Step 3: Add i18n for CityGuide labels**

- [ ] **Step 4: Wire into australia.tsx**

Replace cities placeholder.

- [ ] **Step 5: Build and verify, then commit**

```bash
git add -A && git commit -m "feat: add CityGuide component with responsive card grid"
```

---

### Task 10: Create WorkGuide Component

**Files:**
- Create: `src/components/travel/WorkGuide/index.tsx`
- Create: `src/components/travel/WorkGuide/index.module.css`
- Modify: `src/pages/travel/australia.tsx` (replace placeholder)

- [ ] **Step 1: Create WorkGuide component**

Three sections:
1. **Income Calculator** — hourly wage input (React state), hours/week input, displays weekly/monthly/yearly earnings. Simple math, no external deps.
2. **Job Cards** — category filter tabs (Food Service, Retail, Services, Professional, Manual Labor), each card shows job name, hourly rate range, weekend/evening rates, English requirement, flexibility rating.
3. **Visa Comparison Table** — 3-column table comparing Student/WHV/Graduate visas with work hours, duration, pros/cons.

Use `useLocaleData()` for jobs.json and visas.json data.

- [ ] **Step 2: Create WorkGuide styles**

Calculator: input fields styled with site variables, result display in highlighted boxes. Job cards: same grid pattern as CityGuide. Visa table: responsive table with horizontal scroll on mobile.

- [ ] **Step 3: Add i18n for WorkGuide labels**

Calculator labels, category names, visa field labels, etc.

- [ ] **Step 4: Wire into australia.tsx, build, commit**

```bash
git add -A && git commit -m "feat: add WorkGuide component with income calculator and visa comparison"
```

---

### Task 11: Create CareerGuide Component

**Files:**
- Create: `src/components/travel/CareerGuide/index.tsx`
- Create: `src/components/travel/CareerGuide/index.module.css`
- Modify: `src/pages/travel/australia.tsx` (replace placeholder)

- [ ] **Step 1: Create CareerGuide component**

Two sections:
1. **Industry Cards** — grid of industry cards showing: name, average salary, salary range, weekly hours, employment count, growth rate, demand level (color-coded badge: HIGH=green, MEDIUM=yellow, LOW=red), visa-friendly badge, required skills as tags.
2. **Employer Directory** — filter by industry dropdown, company cards showing: name, industry, headquarters, employee count, grad salary, visa sponsor badge, Glassdoor rating, key hiring roles as tags.

- [ ] **Step 2: Create CareerGuide styles**

Industry cards and company cards follow the same card pattern. Demand/visa badges as colored pills. Skills/roles as tags.

- [ ] **Step 3: Add i18n, wire into australia.tsx, build, commit**

```bash
git add -A && git commit -m "feat: add CareerGuide component with industry and employer cards"
```

---

### Task 12: Create LifestyleGuide Component

**Files:**
- Create: `src/components/travel/LifestyleGuide/index.tsx`
- Create: `src/components/travel/LifestyleGuide/index.module.css`
- Modify: `src/pages/travel/australia.tsx` (replace placeholder)

- [ ] **Step 1: Create LifestyleGuide component**

Uses sub-tabs (smaller tab bar or pill buttons) for 7 sections:
1. **Weekly Schedule** — table/timeline showing a typical week (Mon-Sun) with time slots and activities
2. **Food Culture** — cards for breakfast/lunch/dinner habits, coffee culture, dining tips, popular cuisines
3. **Hobbies** — card grid with hobby name, popularity, cost level, student-friendly badge
4. **Monthly Budget** — category breakdown with min/max ranges, total, saving tips
5. **Transport** — cards for each transport mode with student discount info
6. **Public Holidays** — list/cards with date, name, description, student impact
7. **Shopping** — supermarket list, Asian groceries, online shopping platforms, sales events

- [ ] **Step 2: Create LifestyleGuide styles**

Sub-tab pills, section cards, budget table, schedule grid. Consistent with site theme.

- [ ] **Step 3: Add i18n, wire into australia.tsx, build, commit**

```bash
git add -A && git commit -m "feat: add LifestyleGuide component with lifestyle sub-sections"
```

---

### Task 13: Final Integration and Build Verification

**Files:**
- Modify: `src/pages/travel/australia.tsx` (ensure all components wired)

- [ ] **Step 1: Verify all 5 modules render correctly**

```bash
npx docusaurus build 2>&1 | tail -10
```

Expected: `[SUCCESS] Generated static files in "build".` for all 3 locales.

- [ ] **Step 2: Serve and manual verification**

```bash
npx docusaurus serve --port 3000
```

Check:
- `/travel` — landing page shows Australia card
- `/travel/australia` — all 5 tabs work, map loads
- `/ja/travel/australia` — Japanese translations
- `/zh/travel/australia` — Chinese translations
- Toggle dark/light mode — all components adapt

- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "feat: complete 游天下 Australia study guide with i18n and dark/light mode"
```
