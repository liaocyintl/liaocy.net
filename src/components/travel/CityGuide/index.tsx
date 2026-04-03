import React from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocaleData } from '@site/src/data/australia';
import styles from './index.module.css';

interface City {
  name_en: string;
  name_zh: string;
  state: string;
  population: number;
  climate: string;
  industries: string[];
  median_income: number;
  rent_weekly: number;
  monthly_transport: number;
  meal_avg: number;
  coffee_avg: number;
  university_count: number;
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export default function CityGuide(): JSX.Element {
  const { cities } = useLocaleData() as { cities: City[] };
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  return (
    <div className="container">
      <div className={styles.grid}>
        {cities.map((city) => {
          const displayName = locale === 'zh' ? city.name_zh : city.name_en;

          return (
            <div className={styles.card} key={city.name_en}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cityName}>{displayName}</h3>
                <span className={styles.stateBadge}>{city.state}</span>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {translate({ id: 'aus.city.population', message: 'Population' })}
                  </span>
                  <span className={styles.statValue}>
                    {formatNumber(city.population)}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {translate({ id: 'aus.city.medianIncome', message: 'Median Income' })}
                  </span>
                  <span className={styles.statValue}>
                    ${formatNumber(city.median_income)}/yr
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {translate({ id: 'aus.city.rentWeek', message: 'Rent/week' })}
                  </span>
                  <span className={styles.statValue}>
                    ${formatNumber(city.rent_weekly)}/week
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {translate({ id: 'aus.city.transportMonth', message: 'Transport/month' })}
                  </span>
                  <span className={styles.statValue}>
                    ${formatNumber(city.monthly_transport)}/month
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {translate({ id: 'aus.city.avgMeal', message: 'Avg Meal' })}
                  </span>
                  <span className={styles.statValue}>
                    ${city.meal_avg}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {translate({ id: 'aus.city.coffee', message: 'Coffee' })}
                  </span>
                  <span className={styles.statValue}>
                    ${city.coffee_avg.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <div className={styles.sectionLabel}>
                  {translate({ id: 'aus.city.climate', message: 'Climate' })}
                </div>
                <p className={styles.climate}>{city.climate}</p>
              </div>

              <div>
                <div className={styles.sectionLabel}>
                  {translate({ id: 'aus.city.industries', message: 'Industries' })}
                </div>
                <div className={styles.industries}>
                  {city.industries.map((ind) => (
                    <span className={styles.industryTag} key={ind}>
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.uniBadge}>
                <span className={styles.uniBadgeCount}>{city.university_count}</span>
                {translate({ id: 'aus.city.universities', message: 'Universities' })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
