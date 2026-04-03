import React, { useState } from 'react';
import { translate } from '@docusaurus/Translate';
import { useTableTennisData } from '@site/src/data/sports/table-tennis';
import styles from './index.module.css';

interface EquipmentItem {
  name: string;
  description: string;
  characteristics: string[];
  brands: string[];
  price_range: string;
}

interface EquipmentCategory {
  id: string;
  icon: string;
  name: string;
  description: string;
  items: EquipmentItem[];
}

export default function EquipmentGuide(): JSX.Element {
  const { equipment } = useTableTennisData() as { equipment: { categories: EquipmentCategory[] } };
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(equipment.categories.map((c) => c.id))
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="container">
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'tt.equipment.title', message: 'Equipment Guide' })}
      </h2>
      <div className={styles.categories}>
        {equipment.categories.map((category) => (
          <div className={styles.category} key={category.id}>
            <button
              className={styles.categoryHeader}
              onClick={() => toggleCategory(category.id)}
              aria-expanded={expandedCategories.has(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.categoryDesc}>{category.description}</p>
              </div>
              <span className={styles.chevron}>
                {expandedCategories.has(category.id) ? '\u25B2' : '\u25BC'}
              </span>
            </button>
            {expandedCategories.has(category.id) && (
              <div className={styles.itemsGrid}>
                {category.items.map((item) => (
                  <div className={styles.itemCard} key={item.name}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemDesc}>{item.description}</p>
                    <div className={styles.tags}>
                      {item.characteristics.map((tag) => (
                        <span className={styles.tag} key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.itemMeta}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>
                          {translate({ id: 'tt.equipment.brands', message: 'Brands' })}
                        </span>
                        <span className={styles.metaValue}>
                          {item.brands.join(', ')}
                        </span>
                      </div>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>
                          {translate({ id: 'tt.equipment.price', message: 'Price Range' })}
                        </span>
                        <span className={styles.metaValue}>{item.price_range}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
