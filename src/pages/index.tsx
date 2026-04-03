import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import TechBackground from '@site/src/components/TechBackground';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import React, { useEffect, useState } from 'react';
import { translate } from '@docusaurus/Translate';

const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(() => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayText;
};

const modules = [
  {
    emoji: '👤',
    title: translate({ id: 'homepage.module.about', message: 'About Me' }),
    desc: translate({ id: 'homepage.module.about.desc', message: 'Experience, certifications, and background' }),
    link: '/about',
  },
  {
    emoji: '🌏',
    title: translate({ id: 'homepage.module.travel', message: 'Explore the World' }),
    desc: translate({ id: 'homepage.module.travel.desc', message: 'Guides for studying and living abroad' }),
    link: '/travel',
  },
  {
    emoji: '🏓',
    title: translate({ id: 'homepage.module.sports', message: 'Sports' }),
    desc: translate({ id: 'homepage.module.sports.desc', message: 'Guides and techniques for sports' }),
    link: '/sports',
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const tagline = useTypewriter(siteConfig.tagline || '', 50);

  return (
    <header className={styles.heroBanner}>
      <TechBackground />
      <div className="container" style={{ zIndex: 1, position: 'relative' }}>
        <Heading as="h1" className={styles.heroTitle}>
          {translate({ id: 'homepage.fullName', message: 'Chenyi (Jackie) Liao' })}
        </Heading>
        <p className={styles.heroSubtitle}>
          {tagline.includes('Ph.D.') ? (
            <>
              {tagline.split(/,\s*Ph\.D\./)[0]}
              <br />
              Ph.D.{tagline.split(/Ph\.D\./)[1]}
            </>
          ) : (
            tagline
          )}
          {' '}<span className={styles.cursor}>|</span>
        </p>
        <div className={styles.moduleRow}>
          {modules.map((mod) => (
            <Link key={mod.link} to={mod.link} className={styles.moduleChip}>
              <span className={styles.chipEmoji}>{mod.emoji}</span>
              <span className={styles.chipText}>{mod.title}</span>
            </Link>
          ))}
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
    </Layout>
  );
}
