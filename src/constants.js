import DefaultHit from './components/DefaultHit';
import PagesHit from './components/PagesHit';
import ProductHit from './components/ProductHit';

export const DEFAULT_LOCALE = 'en';

export const DEFAULT_TRANSLATIONS = {
  close: 'Close',
  filters: {
    noResults: 'No results',
    reset: 'Clear filters',
    showMore: 'Show more',
    showLess: 'Show less',
  },
  hitsPerPage: {
    optionsLabel: '{value} results',
  },
  search: {
    placeholder: 'Search...',
    resetTitle: 'Clear your search query.',
    submitTitle: 'Submit your search query.',
  },
  stats: {
    resultsLabel: '{value} results found',
  },
};

export const DEFAULT_HITS_PER_PAGE = 12;

export const DEFAULT_HITS_PER_PAGE_OPTIONS = [12, 24, 48];

export const DEFAULT_FILTER_OPTIONS_COUNT = 10;

export const DEFAULT_FILTER_MAX_OPTIONS_COUNT = 25;

export const DEFAULT_HIT_TEMPLATES = {
  PRODUCTS: ProductHit,
  PAGES: PagesHit,
  DEFAULT: DefaultHit,
};

export const EVENT_KEY_WIDGET_VISIBILITY = 'afInstantSearch.changeVisibility';
