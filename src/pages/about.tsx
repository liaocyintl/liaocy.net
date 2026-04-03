import React from 'react';
import Layout from '@theme/Layout';
import ResumeTimeLine from '@site/src/components/TimeLine';
import { translate } from '@docusaurus/Translate';
import styles from './about.module.css';

export default function AboutPage(): JSX.Element {
  return (
    <Layout title={translate({ id: 'about.pageTitle', message: 'About Me' })}>
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            {translate({ id: 'about.heroTitle', message: 'About Me' })}
          </h1>
          <p className={styles.heroSubtitle}>
            {translate({
              id: 'about.heroSubtitle',
              message: 'Senior System Engineer at TOYOTA Motor Corporation | Ph.D. in Computer Science',
            })}
          </p>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {translate({ id: 'about.experienceCerts', message: 'Experience & Certifications' })}
          </h2>
          <ResumeTimeLine />
        </section>
      </main>
    </Layout>
  );
}
