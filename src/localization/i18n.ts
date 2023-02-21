import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ru,
    },
  },
  supportedLngs: ['en', 'ru'],
  fallbackLng: 'en',
  debug: true,
  detection: {
    order: ['queryString', 'cookie'],
    caches: ['cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
