import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function useLocaleData() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  const dataMap = {
    zh: () => ({
      universities: require('./zh/universities.json'),
      cities: require('./zh/cities.json'),
      jobs: require('./zh/jobs.json'),
      visas: require('./zh/visas.json'),
      industries: require('./zh/industries.json'),
      companies: require('./zh/companies.json'),
      lifestyle: require('./zh/lifestyle.json'),
    }),
    en: () => ({
      universities: require('./en/universities.json'),
      cities: require('./en/cities.json'),
      jobs: require('./en/jobs.json'),
      visas: require('./en/visas.json'),
      industries: require('./en/industries.json'),
      companies: require('./en/companies.json'),
      lifestyle: require('./en/lifestyle.json'),
    }),
    ja: () => ({
      universities: require('./ja/universities.json'),
      cities: require('./ja/cities.json'),
      jobs: require('./ja/jobs.json'),
      visas: require('./ja/visas.json'),
      industries: require('./ja/industries.json'),
      companies: require('./ja/companies.json'),
      lifestyle: require('./ja/lifestyle.json'),
    }),
  };

  return (dataMap[locale] || dataMap.en)();
}
