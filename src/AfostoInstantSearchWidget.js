import { h, render } from 'preact';
import merge from 'lodash.merge';
import Widget from './components/Widget';
import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS } from './constants';

const AfostoInstantSearchWidget = () => {
  let isInitialized = false;
  let props = {
    locale: DEFAULT_LOCALE,
    config: {},
    searchKey: undefined,
  };
  const translationMessages = {};

  const renderWidget = () => {
    const locale = props.locale || DEFAULT_LOCALE;
    const translations = merge(DEFAULT_TRANSLATIONS, translationMessages[locale] || {});
    render(h(Widget, { ...props, locale, translations }), document.body);
  };

  const init = (key, config = {}) => {
    if (!key) {
      throw new Error('Provide a search engine key');
    }

    props = {
      ...props,
      config,
      locale: config?.locale || props.locale,
      searchKey: key,
    };
    isInitialized = true;

    renderWidget();
  };

  const addMessages = (locale, messages = {}) => {
    translationMessages[locale] = messages;

    if (isInitialized && locale === props.config?.locale) {
      renderWidget();
    }
  };

  const setLocale = locale => {
    props.locale = locale;

    if (isInitialized) {
      renderWidget();
    }
  };

  return {
    addMessages,
    init,
    setLocale,
  };
};

export default AfostoInstantSearchWidget();
