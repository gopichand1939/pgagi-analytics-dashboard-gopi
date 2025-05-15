import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          dashboard: 'Dashboard',
          overview: 'Overview',
          weather: 'Weather',
          stocks: 'Stocks',
          news: 'News',
          movies: 'Movies',
        },
      },
      es: {
        translation: {
          dashboard: 'Tablero',
          overview: 'Resumen',
          weather: 'Clima',
          stocks: 'Acciones',
          news: 'Noticias',
          movies: 'Películas',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
