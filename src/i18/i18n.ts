import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Languages } from '../constants/languages';
import ru from './../../public/locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ru,
    },
  },
  supportedLngs: [Languages.EN, Languages.RU],
  fallbackLng: Languages.EN,
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
