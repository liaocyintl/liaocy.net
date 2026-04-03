import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

/* Animated SVG ping pong paddle with bouncing ball */
function PaddleAnimation() {
  return (
    <svg className={styles.paddleSvg} viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background decorative circles */}
      <circle cx="200" cy="110" r="100" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
      <circle cx="200" cy="110" r="70" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
      <circle cx="200" cy="110" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />

      {/* Paddle body */}
      <ellipse cx="170" cy="115" rx="55" ry="65" fill="var(--ifm-color-primary)" opacity="0.15" stroke="var(--ifm-color-primary)" strokeWidth="2" opacity="0.4" />
      {/* Paddle rubber (red side) */}
      <ellipse cx="170" cy="115" rx="48" ry="58" fill="#e53935" opacity="0.2" />
      {/* Paddle handle */}
      <rect x="210" y="155" width="50" height="18" rx="4" fill="currentColor" opacity="0.15" transform="rotate(-25 210 155)" />
      <rect x="212" y="157" width="46" height="14" rx="3" fill="var(--ifm-color-primary)" opacity="0.1" transform="rotate(-25 212 157)" />

      {/* Ball with bouncing animation */}
      <circle cx="300" cy="70" r="12" fill="var(--ifm-color-primary)" opacity="0.9">
        <animate attributeName="cy" values="70;140;70" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.33 0 0.67 1; 0.33 0 0.67 1" />
        <animate attributeName="r" values="12;11;12" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Ball shadow */}
      <ellipse cx="300" cy="170" rx="15" ry="4" fill="currentColor" opacity="0.1">
        <animate attributeName="rx" values="8;15;8" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.33 0 0.67 1; 0.33 0 0.67 1" />
        <animate attributeName="opacity" values="0.15;0.06;0.15" dur="1.5s" repeatCount="indefinite" />
      </ellipse>

      {/* Motion lines around ball */}
      <line x1="320" y1="65" x2="335" y2="60" stroke="var(--ifm-color-primary)" strokeWidth="1.5" opacity="0">
        <animate attributeName="opacity" values="0;0.5;0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <line x1="318" y1="75" x2="333" y2="78" stroke="var(--ifm-color-primary)" strokeWidth="1.5" opacity="0">
        <animate attributeName="opacity" values="0;0.4;0" dur="1.5s" repeatCount="indefinite" begin="0.1s" />
      </line>

      {/* Pulse rings */}
      <circle cx="300" cy="70" r="12" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="12;30" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70;140;70" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.33 0 0.67 1; 0.33 0 0.67 1" />
      </circle>
    </svg>
  );
}

/* SVG paddle icon for card */
function PaddleIcon() {
  return (
    <svg className={styles.cardIcon} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="85" cy="75" rx="45" ry="55" fill="var(--ifm-color-primary)" opacity="0.08" stroke="var(--ifm-color-primary)" strokeWidth="1.5" opacity="0.2" />
      <ellipse cx="85" cy="75" rx="38" ry="48" fill="#e53935" opacity="0.12" />
      <rect x="120" y="108" width="42" height="14" rx="3" fill="currentColor" opacity="0.12" transform="rotate(-25 120 108)" />
      <circle cx="155" cy="55" r="10" fill="var(--ifm-color-primary)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

const sports = [
  {
    id: 'table-tennis',
    title: translate({ id: 'sports.tableTennis.title', message: 'Table Tennis' }),
    description: translate({
      id: 'sports.tableTennis.desc',
      message: 'A comprehensive guide to table tennis — history, equipment, techniques, and rules for players of all levels.',
    }),
    link: '/sports/table-tennis',
    stats: [
      { value: '20+', label: translate({ id: 'sports.tt.stat.techniques', message: 'Techniques' }) },
      { value: '6', label: translate({ id: 'sports.tt.stat.equipment', message: 'Equipment Types' }) },
      { value: '6', label: translate({ id: 'sports.tt.stat.rules', message: 'Rule Sections' }) },
    ],
    gradient: 'linear-gradient(135deg, #e53935, #ff7043, #ffab91)',
    visual: <PaddleIcon />,
  },
];

export default function SportsPage(): JSX.Element {
  return (
    <Layout title={translate({ id: 'sports.pageTitle', message: 'Sports' })}>
      <header className={styles.hero}>
        <div className={styles.heroOrbs} />
        <div className={styles.heroContent}>
          <PaddleAnimation />
          <h1 className={styles.heroTitle}>
            {translate({ id: 'sports.heroTitle', message: 'Sports' })}
          </h1>
          <p className={styles.heroSubtitle}>
            {translate({ id: 'sports.heroSubtitle', message: 'Guides and techniques for the sports I love' })}
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionLabel}>
          {translate({ id: 'sports.activities', message: 'Activities' })}
        </h2>

        {sports.map((sport) => (
          <Link key={sport.id} to={sport.link} className={styles.destCard}>
            <div className={styles.destGradient} style={{ background: sport.gradient }} />
            <div className={styles.destBody}>
              <div className={styles.destHeader}>
                <div className={styles.destVisual}>{sport.visual}</div>
                <div className={styles.destInfo}>
                  <h3 className={styles.destTitle}>{sport.title}</h3>
                  <p className={styles.destDesc}>{sport.description}</p>
                </div>
              </div>
              <div className={styles.destStats}>
                {sport.stats.map((stat) => (
                  <div key={stat.label} className={styles.statItem}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.destCta}>
                {translate({ id: 'sports.viewGuide', message: 'View Guide \u2192' })}
              </div>
            </div>
          </Link>
        ))}

        <p className={styles.comingSoon}>
          {translate({ id: 'sports.comingSoon', message: 'More sports coming soon...' })}
        </p>
      </main>
    </Layout>
  );
}
