import { h, render } from 'preact';
import Widget from './components/Widget';
import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS } from './constants';

const AfostoInstantSearchWidget = () => {
  let isInitialized = false;
  let props = {
    locale: DEFAULT_LOCALE,
    config: {},
    searchKey: undefined,
    translations: {},
  };
  const translationMessages = {};

  const renderWidget = () => {
    const locale = props.locale || DEFAULT_LOCALE;
    const translations = translationMessages[locale] || DEFAULT_TRANSLATIONS;
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
    console.log(locale);
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
