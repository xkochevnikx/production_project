import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//! тут конфиг для тестирования компонентов с переводами. передаём его пропсами в I18nextProvider в который оборачивается компонент в тестовом хелпере componentRender
i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',

    debug: false,

    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    react: {
        useSuspense: false,
    },

    resources: { ru: { translations: {} } },
});

export default i18n;
