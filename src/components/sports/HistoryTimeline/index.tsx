import React from 'react';
import { translate } from '@docusaurus/Translate';
import { useTableTennisData } from '@site/src/data/sports/table-tennis';
import styles from './index.module.css';

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export default function HistoryTimeline(): JSX.Element {
  const { history } = useTableTennisData() as { history: Milestone[] };

  return (
    <div className="container">
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'tt.history.title', message: 'Table Tennis History' })}
      </h2>
      <div className={styles.timeline}>
        <div className={styles.timelineLine} />
        {history.map((milestone, index) => (
          <div
            className={styles.milestone}
            key={milestone.year}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.yearColumn}>
              <span className={styles.year}>{milestone.year}</span>
            </div>
            <div className={styles.dot}>
              <span className={styles.dotIcon}>{milestone.icon}</span>
            </div>
            <div className={styles.content}>
              <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
              <p className={styles.milestoneDesc}>{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
