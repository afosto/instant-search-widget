import { h, render } from 'preact';
import merge from 'lodash.merge';
import Widget from './components/Widget';
import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS, EVENT_KEY_WIDGET_VISIBILITY } from './constants';

const AfostoInstantSearchWidget = () => {
  let isInitialized = false;
  let props = {
    locale: DEFAULT_LOCALE,
    config: {},
    searchKey: undefined,
  };
  const translationMessages = {};

  const changeWidgetVisibility = show => {
    const event = new CustomEvent(EVENT_KEY_WIDGET_VISIBILITY, { detail: { show } });
    document.dispatchEvent(event);
  };

  const hide = () => {
    changeWidgetVisibility(false);
  };

  const show = () => {
    changeWidgetVisibility(true);
  };

  const destroy = () => {
    const elements = [...document.querySelectorAll('[data-af-instant-search]')];

    elements.forEach(element => {
      element.removeEventListener('click', show);
    });

    render(null, document.body);
  };

  const initClickListeners = () => {
    const elements = [...document.querySelectorAll('[data-af-instant-search]')];

    elements.forEach(element => {
      element.addEventListener('click', show);
    });
  };

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

    // Destroy widget to trigger unmount handlers and remove event listeners.
    destroy();

    initClickListeners();
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
    destroy,
    hide,
    init,
    setLocale,
    show,
  };
};

export default AfostoInstantSearchWidget();
