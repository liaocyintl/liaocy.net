import React, { useState, useEffect, lazy, Suspense } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import TabBar, { Tab } from '@site/src/components/travel/TabBar';
import styles from './australia.module.css';

const UniversityMap = lazy(() => import('@site/src/components/travel/UniversityMap'));
const CityGuide = lazy(() => import('@site/src/components/travel/CityGuide'));
const WorkGuide = lazy(() => import('@site/src/components/travel/WorkGuide'));
const CareerGuide = lazy(() => import('@site/src/components/travel/CareerGuide'));
const LifestyleGuide = lazy(() => import('@site/src/components/travel/LifestyleGuide'));

const TABS: Tab[] = [
  {
    id: 'universities',
    label: translate({ id: 'aus.tab.universities', message: 'Universities' }),
    icon: '\uD83C\uDF93',
  },
  {
    id: 'cities',
    label: translate({ id: 'aus.tab.cities', message: 'Cities' }),
    icon: '\uD83C\uDFD9\uFE0F',
  },
  {
    id: 'work',
    label: translate({ id: 'aus.tab.work', message: 'Part-time Work' }),
    icon: '\uD83D\uDCBC',
  },
  {
    id: 'career',
    label: translate({ id: 'aus.tab.career', message: 'Careers' }),
    icon: '\uD83D\uDCC8',
  },
  {
    id: 'lifestyle',
    label: translate({ id: 'aus.tab.lifestyle', message: 'Lifestyle' }),
    icon: '\uD83C\uDF0F',
  },
];

const VALID_TABS = new Set(TABS.map((t) => t.id));

function getTabFromHash(): string {
  if (typeof window === 'undefined') return 'universities';
  const hash = window.location.hash.replace('#', '');
  return VALID_TABS.has(hash) ? hash : 'universities';
}

export default function AustraliaPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState('universities');

  // Sync tab from URL hash on mount and hash change
  useEffect(() => {
    setActiveTab(getTabFromHash());
    const onHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.history.replaceState(null, '', `#${tabId}`);
  };

  return (
    <Layout
      title={translate({ id: 'aus.pageTitle', message: 'Australia Study Guide' })}
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <div className={styles.heroFlag}>🇦🇺</div>
          <h1 className={styles.heroTitle}>
            {translate({ id: 'aus.heroTitle', message: 'Australia Study Guide' })}
          </h1>
          <p className={styles.heroSubtitle}>
            {translate({
              id: 'aus.heroSubtitle',
              message: 'Everything you need to know about studying and living in Australia',
            })}
          </p>
        </div>
      </header>

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      <div className={styles.tabContent}>
        {activeTab === 'universities' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <UniversityMap />
          </Suspense>
        )}
        {activeTab === 'cities' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <CityGuide />
          </Suspense>
        )}
        {activeTab === 'work' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <WorkGuide />
          </Suspense>
        )}
        {activeTab === 'career' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <CareerGuide />
          </Suspense>
        )}
        {activeTab === 'lifestyle' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <LifestyleGuide />
          </Suspense>
        )}
      </div>
    </Layout>
  );
}
