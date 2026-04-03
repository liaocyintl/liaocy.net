import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './index.module.css';
import clsx from 'clsx';

export interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabBar({ tabs, activeTab, onTabChange }: TabBarProps): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <nav className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={clsx(styles.tab, activeTab === tab.id && styles.tabActive)}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
