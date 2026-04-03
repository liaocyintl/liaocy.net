import React, { useState, useMemo } from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocaleData } from '@site/src/data/australia';
import styles from './index.module.css';

interface Industry {
  industry_zh: string;
  industry_en: string;
  icon: string;
  avg_salary: number;
  salary_range_min: number;
  salary_range_max: number;
  weekly_hours: number;
  employed: number;
  growth_rate: number;
  demand_level: string;
  visa_friendly: boolean;
  skills_zh: string[];
  description_zh: string;
}

interface Company {
  name: string;
  name_zh: string;
  industry_zh: string;
  industry_en: string;
  headquarters: string;
  employees_au: number;
  website: string;
  description_zh: string;
  hiring_roles_zh: string[];
  avg_graduate_salary: number;
  visa_sponsor: boolean;
  glassdoor_rating: number;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

function formatAUD(n: number): string {
  return `$${n.toLocaleString()}`;
}

/** Map demand_level values (any locale) to HIGH / MEDIUM / LOW */
function normalizeDemand(level: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  const l = level.toLowerCase();
  if (l === 'high' || l === '高') return 'HIGH';
  if (l === 'low' || l === '低') return 'LOW';
  return 'MEDIUM';
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return '\u2605'.repeat(full) + (half ? '\u00BD' : '');
}

export default function CareerGuide(): JSX.Element {
  const { industries, companies } = useLocaleData() as {
    industries: Industry[];
    companies: Company[];
  };
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  const getIndustryName = (ind: Industry): string =>
    locale === 'zh' ? ind.industry_zh : ind.industry_en;

  const getCompanyIndustry = (c: Company): string =>
    locale === 'zh' ? c.industry_zh : c.industry_en;

  // ── Employer filter ──
  const allLabel = translate({ id: 'aus.career.all', message: 'All' });

  const industryOptions = useMemo(() => {
    const names = Array.from(
      new Set(
        companies.map((c) => (locale === 'zh' ? c.industry_zh : c.industry_en)),
      ),
    );
    return [allLabel, ...names];
  }, [companies, locale, allLabel]);

  const [activeIndustry, setActiveIndustry] = useState(allLabel);

  const filteredCompanies = useMemo(() => {
    if (activeIndustry === allLabel) return companies;
    return companies.filter(
      (c) =>
        (locale === 'zh' ? c.industry_zh : c.industry_en) === activeIndustry,
    );
  }, [companies, activeIndustry, allLabel, locale]);

  const demandBadgeClass = (level: string) => {
    const n = normalizeDemand(level);
    if (n === 'HIGH') return styles.badgeHigh;
    if (n === 'LOW') return styles.badgeLow;
    return styles.badgeMedium;
  };

  return (
    <div className="container">
      {/* ══════════ Industry Cards ══════════ */}
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.career.industries', message: 'Industry Overview' })}
      </h2>
      <div className={styles.cardGrid}>
        {industries.map((ind) => {
          const demand = normalizeDemand(ind.demand_level);
          return (
            <div className={styles.card} key={ind.industry_en}>
              {/* Header */}
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{ind.icon}</span>
                <h3 className={styles.cardName}>{getIndustryName(ind)}</h3>
              </div>

              {/* Description */}
              <p className={styles.cardDesc}>{ind.description_zh}</p>

              {/* Meta */}
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>
                    {translate({ id: 'aus.career.avgSalary', message: 'Avg Salary' })}
                  </span>
                  <span className={styles.metaValue}>{formatAUD(ind.avg_salary)}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>
                    {translate({ id: 'aus.career.salaryRange', message: 'Salary Range' })}
                  </span>
                  <span className={styles.metaValue}>
                    {formatAUD(ind.salary_range_min)} - {formatAUD(ind.salary_range_max)}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>
                    {translate({ id: 'aus.career.weeklyHours', message: 'Weekly Hours' })}
                  </span>
                  <span className={styles.metaValue}>{ind.weekly_hours}h</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>
                    {translate({ id: 'aus.career.employees', message: 'Employees' })}
                  </span>
                  <span className={styles.metaValue}>{formatNumber(ind.employed)}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>
                    {translate({ id: 'aus.career.growthRate', message: 'Growth Rate' })}
                  </span>
                  <span className={styles.metaValue}>{ind.growth_rate}%</span>
                </div>
              </div>

              {/* Badges */}
              <div className={styles.badgeRow}>
                <span className={`${styles.badge} ${demandBadgeClass(ind.demand_level)}`}>
                  {translate({ id: 'aus.career.demand', message: 'Demand' })}:{' '}
                  {ind.demand_level}
                </span>
                <span
                  className={`${styles.badge} ${ind.visa_friendly ? styles.badgeGreen : styles.badgeRed}`}
                >
                  {translate({ id: 'aus.career.visaFriendly', message: 'Visa Friendly' })}:{' '}
                  {ind.visa_friendly ? '\u2714' : '\u2718'}
                </span>
              </div>

              {/* Skills */}
              <div className={styles.tags}>
                {ind.skills_zh.map((skill) => (
                  <span className={styles.tag} key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════ Employer Directory ══════════ */}
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.career.employers', message: 'Employer Directory' })}
      </h2>

      <div className={styles.filterTabs}>
        {industryOptions.map((opt) => (
          <button
            key={opt}
            className={`${styles.filterTab} ${activeIndustry === opt ? styles.filterTabActive : ''}`}
            onClick={() => setActiveIndustry(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className={styles.cardGrid}>
        {filteredCompanies.map((c) => (
          <div className={styles.card} key={c.name}>
            {/* Header */}
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardName}>{c.name}</h3>
                {c.name_zh !== c.name && (
                  <p className={styles.companySubname}>{c.name_zh}</p>
                )}
              </div>
            </div>

            {/* Meta */}
            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.career.industry', message: 'Industry' })}
                </span>
                <span className={styles.metaValue}>{getCompanyIndustry(c)}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.career.headquarters', message: 'HQ' })}
                </span>
                <span className={styles.metaValue}>{c.headquarters}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.career.auEmployees', message: 'AU Employees' })}
                </span>
                <span className={styles.metaValue}>{formatNumber(c.employees_au)}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.career.gradSalary', message: 'Grad Salary' })}
                </span>
                <span className={styles.metaValue}>{formatAUD(c.avg_graduate_salary)}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.career.glassdoor', message: 'Glassdoor' })}
                </span>
                <span className={styles.metaValue}>
                  <span className={styles.ratingStars}>{renderStars(c.glassdoor_rating)}</span>{' '}
                  {c.glassdoor_rating}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className={styles.badgeRow}>
              <span
                className={`${styles.badge} ${c.visa_sponsor ? styles.badgeGreen : styles.badgeRed}`}
              >
                {translate({ id: 'aus.career.visaSponsor', message: 'Visa Sponsor' })}:{' '}
                {c.visa_sponsor ? '\u2714' : '\u2718'}
              </span>
            </div>

            {/* Hiring roles */}
            <div className={styles.tags}>
              {c.hiring_roles_zh.map((role) => (
                <span className={styles.tag} key={role}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
