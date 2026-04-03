import React from 'react';
import { translate } from '@docusaurus/Translate';
import { useTableTennisData } from '@site/src/data/sports/table-tennis';
import styles from './index.module.css';

interface RulesSection {
  title: string;
  icon: string;
  rules: string[];
}

export default function RulesGuide(): JSX.Element {
  const { rules } = useTableTennisData() as { rules: { sections: RulesSection[] } };

  return (
    <div className="container">
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'tt.rules.title', message: 'Official Rules' })}
      </h2>
      <div className={styles.grid}>
        {rules.sections.map((section) => (
          <div className={styles.card} key={section.title}>
            <div className={styles.cardHeader}>
              <span className={styles.sectionIcon}>{section.icon}</span>
              <h3 className={styles.sectionName}>{section.title}</h3>
            </div>
            <ul className={styles.rulesList}>
              {section.rules.map((rule, i) => (
                <li key={i} className={styles.ruleItem}>
                  <span className={styles.ruleNumber}>{i + 1}</span>
                  <span className={styles.ruleText}>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
