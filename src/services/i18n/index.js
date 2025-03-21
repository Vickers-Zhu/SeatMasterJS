// src/services/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";
import * as RNLocalize from "react-native-localize";

// Import translations
import en from "./locales/en/en";
import ja from "./locales/ja/ja";
import zh from "./locales/zh/zh";
const resources = {
  en: {
    common: en.common,
    auth: en.auth,
    restaurant: en.restaurant,
    // other namespaces
  },
  ja: {
    common: ja.common,
    auth: ja.auth,
    restaurant: ja.restaurant,
    // other namespaces
  },
  zh: {
    common: zh.common,
    auth: zh.auth,
    restaurant: zh.restaurant,
    // other namespaces
  },
};
// Get device language
const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
const supportedLanguages = ["en", "ja", "zh"]; // Add your supported languages

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    resources,
    lng: supportedLanguages.includes(deviceLanguage) ? deviceLanguage : "en",
    fallbackLng: "en",
    ns: ["common", "auth", "restaurant", "reservations", "settings"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
