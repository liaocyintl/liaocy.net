import React, { useState, useMemo } from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocaleData } from '@site/src/data/australia';
import styles from './index.module.css';

interface Job {
  job_zh: string;
  job_en: string;
  category: string;
  hourly_min: number;
  hourly_max: number;
  weekend_rate: number;
  evening_rate: number;
  description_zh: string;
  english_required: string;
  flexibility: string;
}

interface Visa {
  visa_name_zh: string;
  visa_name_en: string;
  subclass: string;
  work_hours: string;
  duration: string;
  eligibility: string;
  description: string;
  pros: string[];
  cons: string[];
}

function formatAUD(n: number): string {
  return `$${n.toFixed(2)}`;
}

export default function WorkGuide(): JSX.Element {
  const { jobs, visas } = useLocaleData() as { jobs: Job[]; visas: Visa[] };
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  // --- Income Calculator ---
  const [hourlyWage, setHourlyWage] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);

  const weekly = hourlyWage * hoursPerWeek;
  const monthly = weekly * 4.33;
  const yearly = weekly * 52;

  // --- Job Category Filter ---
  const allLabel = translate({ id: 'aus.work.all', message: 'All' });

  const categories = useMemo(() => {
    const cats = Array.from(new Set(jobs.map((j) => j.category)));
    return [allLabel, ...cats];
  }, [jobs, allLabel]);

  const [activeCategory, setActiveCategory] = useState(allLabel);

  const filteredJobs = useMemo(() => {
    if (activeCategory === allLabel) return jobs;
    return jobs.filter((j) => j.category === activeCategory);
  }, [jobs, activeCategory, allLabel]);

  const getJobName = (job: Job): string => {
    if (locale === 'zh') return job.job_zh;
    return job.job_en;
  };

  const getVisaName = (visa: Visa): string => {
    if (locale === 'zh') return visa.visa_name_zh;
    return visa.visa_name_en;
  };

  return (
    <div className="container">
      {/* ── Income Calculator ── */}
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.work.calculator', message: 'Income Calculator' })}
      </h2>
      <div className={styles.calculator}>
        <div className={styles.calcInputs}>
          <div className={styles.inputGroup}>
            <label>
              {translate({ id: 'aus.work.hourlyWage', message: 'Hourly Wage (AUD)' })}
            </label>
            <input
              type="number"
              min={0}
              step={0.5}
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value) || 0)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>
              {translate({ id: 'aus.work.hoursPerWeek', message: 'Hours / Week' })}
            </label>
            <input
              type="number"
              min={0}
              max={168}
              step={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className={styles.calcResults}>
          <div className={styles.resultBox}>
            <div className={styles.resultLabel}>
              {translate({ id: 'aus.work.weekly', message: 'Weekly' })}
            </div>
            <div className={styles.resultValue}>{formatAUD(weekly)}</div>
          </div>
          <div className={styles.resultBox}>
            <div className={styles.resultLabel}>
              {translate({ id: 'aus.work.monthly', message: 'Monthly' })}
            </div>
            <div className={styles.resultValue}>{formatAUD(monthly)}</div>
          </div>
          <div className={styles.resultBox}>
            <div className={styles.resultLabel}>
              {translate({ id: 'aus.work.yearly', message: 'Yearly' })}
            </div>
            <div className={styles.resultValue}>{formatAUD(yearly)}</div>
          </div>
        </div>
      </div>

      {/* ── Job Cards ── */}
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.work.jobListings', message: 'Common Part-time Jobs' })}
      </h2>
      <div className={styles.filterTabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.jobGrid}>
        {filteredJobs.map((job) => (
          <div className={styles.jobCard} key={job.job_en}>
            <span className={styles.categoryBadge}>{job.category}</span>
            <h3 className={styles.jobName}>{getJobName(job)}</h3>
            <div className={styles.jobMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.work.hourlyRate', message: 'Hourly Rate' })}
                </span>
                <span className={styles.metaValue}>
                  ${job.hourly_min} - ${job.hourly_max}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.work.weekendRate', message: 'Weekend Rate' })}
                </span>
                <span className={styles.metaValue}>{job.weekend_rate}x</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.work.eveningRate', message: 'Evening Rate' })}
                </span>
                <span className={styles.metaValue}>{job.evening_rate}x</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.work.englishReq', message: 'English' })}
                </span>
                <span className={styles.metaValue}>{job.english_required}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.work.flexibility', message: 'Flexibility' })}
                </span>
                <span className={styles.metaValue}>{job.flexibility}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Visa Comparison Table ── */}
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.work.visaComparison', message: 'Visa Comparison' })}
      </h2>
      <div className={styles.tableWrapper}>
        <table className={styles.visaTable}>
          <thead>
            <tr>
              <th />
              {visas.map((v) => (
                <th key={v.subclass}>{getVisaName(v)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.rowLabel}>
                {translate({ id: 'aus.work.subclass', message: 'Subclass' })}
              </td>
              {visas.map((v) => (
                <td key={v.subclass}>{v.subclass}</td>
              ))}
            </tr>
            <tr>
              <td className={styles.rowLabel}>
                {translate({ id: 'aus.work.workHours', message: 'Work Hours' })}
              </td>
              {visas.map((v) => (
                <td key={v.subclass}>{v.work_hours}</td>
              ))}
            </tr>
            <tr>
              <td className={styles.rowLabel}>
                {translate({ id: 'aus.work.duration', message: 'Duration' })}
              </td>
              {visas.map((v) => (
                <td key={v.subclass}>{v.duration}</td>
              ))}
            </tr>
            <tr>
              <td className={styles.rowLabel}>
                {translate({ id: 'aus.work.eligibility', message: 'Eligibility' })}
              </td>
              {visas.map((v) => (
                <td key={v.subclass}>{v.eligibility}</td>
              ))}
            </tr>
            <tr>
              <td className={styles.rowLabel}>
                {translate({ id: 'aus.work.prosAndCons', message: 'Pros & Cons' })}
              </td>
              {visas.map((v) => (
                <td key={v.subclass}>
                  <div className={styles.prosLabel}>
                    {translate({ id: 'aus.work.pros', message: 'Pros' })}
                  </div>
                  <ul>
                    {v.pros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <div className={styles.consLabel}>
                    {translate({ id: 'aus.work.cons', message: 'Cons' })}
                  </div>
                  <ul>
                    {v.cons.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
