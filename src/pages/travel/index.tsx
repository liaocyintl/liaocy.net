import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

/* Animated SVG world map with flight path */
function GlobeAnimation() {
  return (
    <svg className={styles.globeSvg} viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid lines for globe feel */}
      <ellipse cx="200" cy="110" rx="180" ry="90" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <ellipse cx="200" cy="110" rx="120" ry="90" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <ellipse cx="200" cy="110" rx="60" ry="90" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
      <line x1="20" y1="110" x2="380" y2="110" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <line x1="200" y1="20" x2="200" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <ellipse cx="200" cy="70" rx="180" ry="12" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
      <ellipse cx="200" cy="150" rx="180" ry="12" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />

      {/* Simplified continent blobs */}
      {/* Asia */}
      <path d="M240 55 C260 50, 290 55, 310 65 C320 75, 310 90, 295 95 C280 100, 260 95, 250 85 C240 75, 235 65, 240 55Z" fill="currentColor" opacity="0.12" />
      {/* Australia */}
      <path d="M300 135 C310 128, 335 125, 345 130 C355 138, 355 155, 345 162 C335 168, 310 168, 305 158 C298 150, 292 142, 300 135Z" fill="var(--ifm-color-primary)" opacity="0.25" />
      {/* Europe */}
      <path d="M175 52 C185 48, 205 45, 215 50 C220 55, 218 65, 210 70 C200 72, 185 68, 178 62 C172 57, 172 54, 175 52Z" fill="currentColor" opacity="0.1" />
      {/* Africa */}
      <path d="M185 80 C195 75, 210 78, 215 88 C218 100, 212 118, 205 125 C198 130, 188 125, 185 115 C182 105, 180 90, 185 80Z" fill="currentColor" opacity="0.1" />
      {/* Americas */}
      <path d="M80 55 C90 48, 105 50, 110 60 C115 72, 108 90, 100 100 C92 108, 82 112, 78 105 C72 95, 70 65, 80 55Z" fill="currentColor" opacity="0.1" />
      <path d="M85 115 C92 110, 105 115, 108 125 C110 135, 105 150, 95 158 C88 162, 80 155, 78 145 C76 135, 80 120, 85 115Z" fill="currentColor" opacity="0.08" />

      {/* Flight path: Tokyo → Sydney (curved arc) */}
      <path
        d="M280 65 C310 75, 340 95, 330 140"
        stroke="var(--ifm-color-primary)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        fill="none"
        opacity="0.6"
      >
        <animate attributeName="stroke-dashoffset" from="40" to="0" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Dots at endpoints */}
      <circle cx="280" cy="65" r="4" fill="var(--ifm-color-primary)" opacity="0.9">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="330" cy="140" r="4" fill="var(--ifm-color-accent, #fb923c)" opacity="0.9">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </circle>

      {/* Moving plane along path */}
      <g opacity="0.9">
        <path d="M-6,-3 L6,0 L-6,3 L-4,0Z" fill="var(--ifm-color-primary)">
          <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
            <mpath href="#flightPath" />
          </animateMotion>
        </path>
      </g>
      <path id="flightPath" d="M280 65 C310 75, 340 95, 330 140" fill="none" stroke="none" />

      {/* Pulse rings on Australia */}
      <circle cx="330" cy="140" r="8" fill="none" stroke="var(--ifm-color-accent, #fb923c)" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="8;24" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* SVG Australia outline for card */
function AustraliaOutline() {
  return (
    <svg className={styles.ausOutline} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M45 50 C50 35, 75 20, 100 18 C120 16, 145 22, 160 35 C172 46, 178 62, 175 80 C172 95, 162 108, 148 118 C135 127, 118 132, 100 130 C82 128, 65 120, 52 108 C40 96, 35 78, 38 65 C40 55, 42 52, 45 50Z"
        fill="var(--ifm-color-primary)"
        opacity="0.08"
        stroke="var(--ifm-color-primary)"
        strokeWidth="1"
        opacity="0.2"
      />
      {/* City dots with labels */}
      {/* Sydney */}
      <circle cx="155" cy="85" r="3" fill="var(--ifm-color-primary)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Melbourne */}
      <circle cx="140" cy="105" r="3" fill="var(--ifm-color-primary)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      {/* Brisbane */}
      <circle cx="160" cy="62" r="2.5" fill="var(--ifm-color-primary)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="1s" />
      </circle>
      {/* Perth */}
      <circle cx="52" cy="80" r="2.5" fill="var(--ifm-color-primary)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="1.5s" />
      </circle>
      {/* Adelaide */}
      <circle cx="118" cy="100" r="2" fill="var(--ifm-color-primary)" opacity="0.6" />
      {/* Connection lines */}
      <line x1="155" y1="85" x2="140" y2="105" stroke="var(--ifm-color-primary)" strokeWidth="0.5" opacity="0.2" />
      <line x1="155" y1="85" x2="160" y2="62" stroke="var(--ifm-color-primary)" strokeWidth="0.5" opacity="0.2" />
      <line x1="140" y1="105" x2="118" y2="100" stroke="var(--ifm-color-primary)" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

const destinations = [
  {
    id: 'australia',
    title: translate({ id: 'travel.australia.title', message: 'Study in Australia' }),
    description: translate({
      id: 'travel.australia.desc',
      message: 'A comprehensive guide to studying in Australia — universities, cities, part-time work, careers, and daily life.',
    }),
    link: '/travel/australia',
    stats: [
      { value: '37', label: translate({ id: 'travel.aus.stat.unis', message: 'Universities' }) },
      { value: '15', label: translate({ id: 'travel.aus.stat.cities', message: 'Cities' }) },
      { value: '16', label: translate({ id: 'travel.aus.stat.jobs', message: 'Job Types' }) },
      { value: '3', label: translate({ id: 'travel.aus.stat.visas', message: 'Visa Guides' }) },
    ],
    gradient: 'linear-gradient(135deg, #0077b6, #00b4d8, #90e0ef)',
    visual: <AustraliaOutline />,
  },
];

export default function TravelPage(): JSX.Element {
  return (
    <Layout title={translate({ id: 'travel.pageTitle', message: 'Explore the World' })}>
      <header className={styles.hero}>
        <div className={styles.heroOrbs} />
        <div className={styles.heroContent}>
          <GlobeAnimation />
          <h1 className={styles.heroTitle}>
            {translate({ id: 'travel.heroTitle', message: 'Explore the World' })}
          </h1>
          <p className={styles.heroSubtitle}>
            {translate({ id: 'travel.heroSubtitle', message: 'Guides and tools for studying and living abroad' })}
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionLabel}>
          {translate({ id: 'travel.destinations', message: 'Destinations' })}
        </h2>

        {destinations.map((dest) => (
          <Link key={dest.id} to={dest.link} className={styles.destCard}>
            <div className={styles.destGradient} style={{ background: dest.gradient }} />
            <div className={styles.destBody}>
              <div className={styles.destHeader}>
                <div className={styles.destVisual}>{dest.visual}</div>
                <div className={styles.destInfo}>
                  <h3 className={styles.destTitle}>{dest.title}</h3>
                  <p className={styles.destDesc}>{dest.description}</p>
                </div>
              </div>
              <div className={styles.destStats}>
                {dest.stats.map((stat) => (
                  <div key={stat.label} className={styles.statItem}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.destCta}>
                {translate({ id: 'travel.viewGuide', message: 'View Guide →' })}
              </div>
            </div>
          </Link>
        ))}

        <p className={styles.comingSoon}>
          {translate({ id: 'travel.comingSoon', message: 'More destinations coming soon...' })}
        </p>
      </main>
    </Layout>
  );
}
