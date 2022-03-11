import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Pagination,
  HitsPerPage,
  CurrentRefinements,
  ClearRefinements,
  RefinementList,
  DynamicWidgets,
  Panel,
} from "react-instantsearch-dom";
import Hit from '../Hit';
import WidgetProvider from '../WidgetProvider';
import useClickListener from '../../hooks/useClickListener';
import useClientSetup from '../../hooks/useClientSetup';
import isDefined from '../../utils/isDefined';

const Widget = ({ config, locale, searchKey, translations }) => {
  const [open, setOpen] = useState(false);
  const { client, settings } = useClientSetup(searchKey);
  const [firstIndex] = settings.indexes || [];
  const mainIndexKey = settings.filters?.show_for || firstIndex?.alias;
  const mainIndex = (settings.indexes || []).find(index => index.alias === mainIndexKey);
  const filters = mainIndex?.filters || [];
  const searchAsYouType = isDefined(settings?.is_autocomplete) ? settings.is_autocomplete : true;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useClickListener(handleOpen);

  return (
    <WidgetProvider value={{ client, config, locale, settings, translations }}>
      <DialogOverlay
        className="af-is-widget__dialog"
        isOpen={open}
        onDismiss={handleClose}
      >
        <DialogContent className="af-is-widget__content">
          <InstantSearch
            indexName={mainIndex?.alias}
            searchClient={client}
          >
            <button className="af-is-widget__close-button" onClick={handleClose}>
              <span aria-hidden>×</span>
            </button>
            <div className="af-is-widget__filters">
              <div className="af-is-widget__filters__active-filters">
                <CurrentRefinements />
                <ClearRefinements translations={{ reset: translations.filters.reset }} />
              </div>
              <div className="af-is-widget__filters__filters">
                <DynamicWidgets
                  maxValuesPerFacet={1000} // Suppress warning
                  transformItems={(_, { results }) => Object.keys(results._rawResults[0].facets)}
                >
                  {filters.map(filter => (
                    <Panel key={filter.key} header={filter.label}>
                      <RefinementList
                        attribute={filter.key}
                        operator="and"
                        limit={filter.options_count || 10}
                        showMoreLimit={filter.max_options_count || 25}
                        translations={{
                          noResults: translations.filters.noResults,
                          showMore: expanded => {
                            return expanded ? translations.filters.showLess : translations.filters.showMore;
                          }
                        }}
                        showMore
                      />
                    </Panel>
                  ))}
                </DynamicWidgets>
              </div>
            </div>
            <div className="af-is-widget__search">
              <SearchBox searchAsYouType={searchAsYouType} autoFocus />
            </div>
            <div className="af-is-widget__stats">
              <Stats />
            </div>
            <div className="af-is-widget__page-size">
              <HitsPerPage
                items={[
                  { value: 5, label: "Show 5 hits" },
                  { value: 10, label: "Show 10 hits" },
                  { value: 25, label: "Show 25 hits" },
                ]}
                defaultRefinement={mainIndex?.results_per_page || 10}
              />
            </div>
            <div className="af-is-widget__results">
              <Hits hitComponent={Hit} />
            </div>
            <div className="af-is-widget__pagination">
              <Pagination />
            </div>
          </InstantSearch>
        </DialogContent>
      </DialogOverlay>
    </WidgetProvider>
  );
};

export default Widget;
