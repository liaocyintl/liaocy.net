import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import TabBar, { Tab } from '@site/src/components/travel/TabBar';
import styles from './australia.module.css';

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

export default function AustraliaPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState('universities');

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

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.tabContent}>
        {activeTab === 'universities' && (
          <div className={styles.placeholder}>Universities module coming soon...</div>
        )}
        {activeTab === 'cities' && (
          <div className={styles.placeholder}>Cities module coming soon...</div>
        )}
        {activeTab === 'work' && (
          <div className={styles.placeholder}>Work module coming soon...</div>
        )}
        {activeTab === 'career' && (
          <div className={styles.placeholder}>Career module coming soon...</div>
        )}
        {activeTab === 'lifestyle' && (
          <div className={styles.placeholder}>Lifestyle module coming soon...</div>
        )}
      </div>
    </Layout>
  );
}
