import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './content/locales/en.json';
import plTranslation from './content/locales/pl.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslation },
      pl: { translation: plTranslation }
    },
    lng: 'pl', // default language
    fallbackLng: 'pl',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // not needed for React
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
