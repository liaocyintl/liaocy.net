import React, { useState } from 'react';
import { translate } from '@docusaurus/Translate';
import { useTableTennisData } from '@site/src/data/sports/table-tennis';
import styles from './index.module.css';
import clsx from 'clsx';

interface Technique {
  name: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  key_points: string[];
  common_mistakes: string[];
}

interface TechniqueCategory {
  id: string;
  name: string;
  techniques: Technique[];
}

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default function TechniqueGuide(): JSX.Element {
  const { techniques } = useTableTennisData() as { techniques: { categories: TechniqueCategory[] } };
  const [activeFilter, setActiveFilter] = useState('all');

  const allLabel = translate({ id: 'tt.techniques.all', message: 'All' });
  const filters = [
    { id: 'all', label: allLabel },
    ...techniques.categories.map((cat) => ({ id: cat.id, label: cat.name })),
  ];

  const filteredCategories = activeFilter === 'all'
    ? techniques.categories
    : techniques.categories.filter((c) => c.id === activeFilter);

  return (
    <div className="container">
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'tt.techniques.title', message: 'Technique Guide' })}
      </h2>

      <div className={styles.filterBar}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={clsx(styles.filterBtn, activeFilter === filter.id && styles.filterBtnActive)}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredCategories.map((category) => (
        <div key={category.id} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>{category.name}</h3>
          <div className={styles.grid}>
            {category.techniques.map((tech) => (
              <div className={styles.card} key={tech.name}>
                <div className={styles.cardHeader}>
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <div className={styles.headerInfo}>
                    <h4 className={styles.techName}>{tech.name}</h4>
                    <span className={clsx(styles.diffBadge, styles[`diff_${tech.difficulty}`])}>
                      {DIFFICULTY_LABELS[tech.difficulty] || tech.difficulty}
                    </span>
                  </div>
                </div>
                <p className={styles.techDesc}>{tech.description}</p>

                <div className={styles.pointsSection}>
                  <h5 className={styles.pointsLabel}>
                    {translate({ id: 'tt.techniques.keyPoints', message: 'Key Points' })}
                  </h5>
                  <ol className={styles.pointsList}>
                    {tech.key_points.map((point, i) => (
                      <li key={i} className={styles.pointItem}>{point}</li>
                    ))}
                  </ol>
                </div>

                <div className={styles.mistakesSection}>
                  <h5 className={styles.mistakesLabel}>
                    {translate({ id: 'tt.techniques.mistakes', message: 'Common Mistakes' })}
                  </h5>
                  <ul className={styles.mistakesList}>
                    {tech.common_mistakes.map((mistake, i) => (
                      <li key={i} className={styles.mistakeItem}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
