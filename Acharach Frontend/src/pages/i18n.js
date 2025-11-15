import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import global_en from '../translations/en/global.json';
import global_am from '../translations/am/global.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: global_en,
    },
    am: {
      translation: global_am,
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes the values
  },
});

export default i18n;
