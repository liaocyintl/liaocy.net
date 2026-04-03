import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function useTableTennisData() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const dataMap = {
    zh: () => ({
      history: require('./zh/history.json'),
      equipment: require('./zh/equipment.json'),
      techniques: require('./zh/techniques.json'),
      rules: require('./zh/rules.json'),
    }),
    en: () => ({
      history: require('./en/history.json'),
      equipment: require('./en/equipment.json'),
      techniques: require('./en/techniques.json'),
      rules: require('./en/rules.json'),
    }),
    ja: () => ({
      history: require('./ja/history.json'),
      equipment: require('./ja/equipment.json'),
      techniques: require('./ja/techniques.json'),
      rules: require('./ja/rules.json'),
    }),
  };
  return (dataMap[locale] || dataMap.en)();
}
