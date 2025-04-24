import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return {
    t: t as (key: string) => string,
    i18n,
    changeLanguage,
    currentLanguage: i18n.language,
  };
}; 