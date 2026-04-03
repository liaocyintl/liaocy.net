import React, { useState, useEffect, lazy, Suspense } from 'react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import TabBar, { Tab } from '@site/src/components/travel/TabBar';
import styles from './table-tennis.module.css';

const HistoryTimeline = lazy(() => import('@site/src/components/sports/HistoryTimeline'));
const EquipmentGuide = lazy(() => import('@site/src/components/sports/EquipmentGuide'));
const TechniqueGuide = lazy(() => import('@site/src/components/sports/TechniqueGuide'));
const RulesGuide = lazy(() => import('@site/src/components/sports/RulesGuide'));

const TABS: Tab[] = [
  {
    id: 'history',
    label: translate({ id: 'tt.tab.history', message: 'History' }),
    icon: '\uD83D\uDCDC',
  },
  {
    id: 'equipment',
    label: translate({ id: 'tt.tab.equipment', message: 'Equipment' }),
    icon: '\uD83C\uDFD3',
  },
  {
    id: 'techniques',
    label: translate({ id: 'tt.tab.techniques', message: 'Techniques' }),
    icon: '\u26A1',
  },
  {
    id: 'rules',
    label: translate({ id: 'tt.tab.rules', message: 'Rules' }),
    icon: '\uD83D\uDCCB',
  },
];

const VALID_TABS = new Set(TABS.map((t) => t.id));

function getTabFromHash(): string {
  if (typeof window === 'undefined') return 'history';
  const hash = window.location.hash.replace('#', '');
  return VALID_TABS.has(hash) ? hash : 'history';
}

export default function TableTennisPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    setActiveTab(getTabFromHash());
    const onHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.history.replaceState(null, '', `#${tabId}`);
  };

  return (
    <Layout
      title={translate({ id: 'tt.pageTitle', message: 'Table Tennis Guide' })}
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <div className={styles.heroFlag}>{'\uD83C\uDFD3'}</div>
          <h1 className={styles.heroTitle}>
            {translate({ id: 'tt.heroTitle', message: 'Table Tennis Guide' })}
          </h1>
          <p className={styles.heroSubtitle}>
            {translate({
              id: 'tt.heroSubtitle',
              message: 'Everything about table tennis — history, equipment, techniques, and rules',
            })}
          </p>
        </div>
      </header>

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      <div className={styles.tabContent}>
        {activeTab === 'history' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <HistoryTimeline />
          </Suspense>
        )}
        {activeTab === 'equipment' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <EquipmentGuide />
          </Suspense>
        )}
        {activeTab === 'techniques' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <TechniqueGuide />
          </Suspense>
        )}
        {activeTab === 'rules' && (
          <Suspense fallback={<div className={styles.placeholder}>Loading...</div>}>
            <RulesGuide />
          </Suspense>
        )}
      </div>
    </Layout>
  );
}
