import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ResumeTimeLine from '@site/src/components/TimeLine';
import SkillWordCloud from '@site/src/components/SkillWordCloud';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import React, { useEffect, useState } from 'react';

// Typing effect hook
const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayText;
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const tagline = useTypewriter(siteConfig.tagline || '', 50);

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          {tagline} <span className={styles.cursor}>|</span>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            Technical Blog
          </Link>
          <Link
            className="button button--outline button--primary button--lg"
            href="https://github.com/liaocy-net/liaocy.net">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Senior System Engineer at TOYOTA Motor Corporation | Ph.D. in Computer Science">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <Heading as="h2" className={clsx(styles.sectionTitle)}>Technical Skills</Heading>
          <SkillWordCloud />
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>Experience & Certifications</Heading>
          <ResumeTimeLine />
        </section>
      </main>
    </Layout>
  );
}
