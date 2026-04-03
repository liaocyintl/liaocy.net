import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

export default function TravelPage(): JSX.Element {
  return (
    <Layout
      title={translate({ id: 'travel.pageTitle', message: 'Explore the World' })}
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            {translate({ id: 'travel.heroTitle', message: 'Explore the World' })}
          </h1>
          <p className={styles.heroSubtitle}>
            {translate({
              id: 'travel.heroSubtitle',
              message: 'Guides and tools for studying and living abroad',
            })}
          </p>
        </div>
      </header>

      <main>
        <div className={styles.cardGrid}>
          <Link to="/travel/australia" className={styles.card}>
            <div className={styles.cardFlag}>🇦🇺</div>
            <h2 className={styles.cardTitle}>
              {translate({
                id: 'travel.australia.title',
                message: 'Australia Study Guide',
              })}
            </h2>
            <p className={styles.cardDesc}>
              {translate({
                id: 'travel.australia.desc',
                message:
                  'A comprehensive guide to studying in Australia — universities, cities, part-time work, careers, and daily life.',
              })}
            </p>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
