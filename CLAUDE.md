# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Chenyi (Jackie) Liao built with **Docusaurus 3** (React/TypeScript). Deployed to GitHub Pages at https://liaocy.net.

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

- **docusaurus.config.js** — Main config: site metadata, navbar, footer, theme, plugins, i18n (en/ja/zh), search, markdown/MDX settings
- **src/pages/index.tsx** — Homepage with typewriter animation hero, skills word cloud, and experience timeline
- **src/components/** — Custom React components:
  - `TechBackground/` — Canvas particle animation for hero background
  - `SkillWordCloud/` — Interactive word cloud of technical skills (react-wordcloud)
  - `TimeLine/` — Vertical timeline for work experience, certifications, education (color-coded: blue=work, gold=certs, red=education)
- **src/css/custom.css** — Theme overrides (Infima CSS variables, fonts: Inter + JetBrains Mono)
- **blog/** — Blog posts in Markdown/MDX
- **docs/** — Documentation pages (auto-sidebar from filesystem)
- **static/** — Static assets, CNAME file
- **i18n/** — Internationalization translations (EN, JA, ZH with CJK tokenization via Jieba)

## Key Details

- Dark mode only (disableSwitch: true in theme config)
- Multilingual local search via @cmfcmf/docusaurus-search-local
- CI: GitHub Actions deploys on push to main; PRs get test builds
- Package manager: **Yarn** (use `yarn` not `npm`)
