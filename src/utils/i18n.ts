import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { ruLocales } from "locales/ru";
import { viLocales } from "locales/en";

import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translations: viLocales,
  },
  ru: {
    translations: ruLocales,
  },
};

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "en",
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
  });

export default i18n;
