/* eslint-disable no-use-before-define */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from './locales/en.json';

Vue.use(VueI18n);

export const supportedlanguages = ['en', 'el'];
const loadedLanguages = ['en'];
const messages = {
  en: enLocale
};
export function isValidLanguage(lang) {
  return Object.keys(supportedlanguages).includes(lang);
}
export function getStartingLocale() {
  // if language at local storage
  const chooseLanguage = window.localStorage.getItem('language');
  if (chooseLanguage) {
    return chooseLanguage;
  }
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  if (language && isValidLanguage(language)) {
    return language;
  }
  return 'en';
}
export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages
});
export function setI18nLanguage(lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  window.localStorage.setItem('language', lang);
  return lang;
}
export function loadLanguageAsync(lang) {
  // Make sure it's a valid language
  if (!supportedlanguages.includes(lang)) {
    lang = 'en';
  }
  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `./locales/${lang}.json`).then(
    (messages) => {
      i18n.setLocaleMessage(lang, messages);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    }
  );
}
