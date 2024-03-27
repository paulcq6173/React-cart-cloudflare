import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEN from './en/common.json';
import searchResultEN from './en/searchResult.json';
import productEN from './en/productPage.json';
import cartEN from './en/cart.json';
import commonZH from './zh/common.json';
import searchResultZH from './zh/searchResult.json';
import productZH from './zh/productPage.json';
import cartZH from './zh/cart.json';

export const fallbackLng = 'en';
export const defaultNS = 'common';
export const resources = {
  en: {
    common: commonEN,
    searchResult: searchResultEN,
    product: productEN,
    cart: cartEN,
  },
  zh: {
    common: commonZH,
    searchResult: searchResultZH,
    product: productZH,
    cart: cartZH,
  },
} as const;

i18next.use(initReactI18next).init({
  //debug: true,
  // default language folder
  // if you're using a language detector,
  // do not define the lng option
  lng: fallbackLng,
  fallbackLng: fallbackLng,
  interpolation: {
    // 是否要讓字詞 escaped 來防止 xss 攻擊，
    // 這裡因為 React.js 已經做了，就設成 false即可
    escapeValue: false,
  },
  resources,
  defaultNS,
});
