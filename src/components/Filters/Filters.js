import { h } from 'preact';
import { ClearRefinements, DynamicWidgets, Panel, RefinementList } from 'react-instantsearch-dom';
import { DEFAULT_FILTER_MAX_OPTIONS_COUNT, DEFAULT_FILTER_OPTIONS_COUNT } from '../../constants';
import useWidgetContext from '../../hooks/useWidgetContext';
import RangeSlider from '../RangeSlider';

const Filters = () => {
  const { settings, translations, showFilters, setShowFilters } = useWidgetContext();
  const [firstIndex] = settings.indexes || [];
  const mainIndexKey = settings.filters?.show_for || firstIndex?.alias;
  const mainIndex = (settings.indexes || []).find(index => index.alias === mainIndexKey);
  const filters = mainIndex?.filters || [];

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  return (
    <div className={`af-is-widget__filters${showFilters ? ' af-is-widget__filters--open' : ''}`}>
      <div className="af-is-widget__filters__header">
        <span className="af-is-widget__filters__header__title">Filters</span>
        <button className="af-is-widget__filters__header__close" onClick={handleCloseFilters}>
          {translations.close}
        </button>
      </div>
      <ClearRefinements translations={{ reset: translations.filters.reset }} />
      <DynamicWidgets
        maxValuesPerFacet={1000} // Suppress warning
        fallbackComponent={({ attribute }) => (
          <Panel header={attribute}>
            <RefinementList
              attribute={attribute}
              limit={DEFAULT_FILTER_OPTIONS_COUNT}
              showMoreLimit={DEFAULT_FILTER_MAX_OPTIONS_COUNT}
            />
          </Panel>
        )}
      >
        {filters.map(filter => {
          const header = filter.label || filter.key;

          switch (filter.type) {
            case 'NUMBER':
              return (
                <Panel key={filter.key} header={header}>
                  <RangeSlider attribute={filter.key} />
                </Panel>
              );
            case 'STRING':
            default:
              return (
                <Panel key={filter.key} header={header}>
                  <RefinementList
                    attribute={filter.key}
                    operator="and"
                    limit={filter.options_count || DEFAULT_FILTER_OPTIONS_COUNT}
                    showMoreLimit={filter.max_options_count || DEFAULT_FILTER_MAX_OPTIONS_COUNT}
                    translations={{
                      noResults: translations.filters.noResults,
                      showMore: expanded =>
                        translations.filters[expanded ? 'showLess' : 'showMore'],
                    }}
                    showMore
                  />
                </Panel>
              );
          }
        })}
      </DynamicWidgets>
    </div>
  );
};

export default Filters;
