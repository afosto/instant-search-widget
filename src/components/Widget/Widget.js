import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { InstantSearch } from 'react-instantsearch-dom';
import useVisibilityListener from '../../hooks/useVisibilityListener';
import useClientSetup from '../../hooks/useClientSetup';
import CloseButton from '../CloseButton';
import Filters from '../Filters';
import Hits from '../Hits';
import HitsPerPage from '../HitsPerPage';
import Pagination from '../Pagination';
import ScrollLock from '../ScrollLock';
import SearchBox from '../SearchBox';
import WidgetProvider from '../WidgetProvider';

const MotionDialogOverlay = m(DialogOverlay);
const MotionDialogContent = m(DialogContent);

const Widget = ({ config, locale, searchKey, translations }) => {
  const { searchState: initialSearchState, hideFilters } = config || {};
  const [searchState, setSearchState] = useState(initialSearchState);
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { client, isFetchingSettings, settings } = useClientSetup(searchKey);
  const [firstIndex] = settings.indexes || [];
  const mainIndexKey = settings.filters?.show_for || firstIndex?.alias;
  const mainIndex = (settings.indexes || []).find(index => index.alias === mainIndexKey);

  const handleClose = useCallback(() => {
    setOpen(false);
    setShowFilters(false);
  }, []);

  const handleVisibilityEvent = useCallback(event => {
    const visible = !!event?.detail?.show;
    setOpen(visible);
  }, []);

  useVisibilityListener(handleVisibilityEvent);

  return (
    <WidgetProvider
      value={{
        client,
        config,
        isFetchingSettings,
        locale,
        settings,
        translations,
        showFilters,
        setShowFilters,
      }}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {open && (
            <ScrollLock>
              <MotionDialogOverlay
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { type: 'tween', duration: 0.225, ease: [0.4, 0, 0.2, 1] },
                }}
                exit={{
                  opacity: 0,
                  transition: { type: 'tween', duration: 0.195, ease: [0.4, 0, 0.2, 1] },
                }}
                className="af-is-widget__dialog"
                onDismiss={handleClose}
                isOpen
                dangerouslyBypassScrollLock
              >
                <MotionDialogContent
                  initial={{ y: -20 }}
                  animate={{
                    y: 0,
                    transition: { type: 'tween', duration: 0.225, ease: [0.4, 0, 0.2, 1] },
                  }}
                  exit={{
                    y: -20,
                    transition: { type: 'tween', duration: 0.195, ease: [0.4, 0, 0.2, 1] },
                  }}
                  className="af-is-widget__content"
                >
                  <div className="af-is-widget__layout">
                    <CloseButton onClick={handleClose} />
                    <InstantSearch
                      indexName={mainIndex?.alias}
                      searchClient={client}
                      {...(typeof searchState === 'object'
                        ? { searchState, onSearchStateChange: newState => setSearchState(newState) }
                        : {})}
                    >
                      <Filters hideFilters={hideFilters} />
                      <SearchBox onClose={handleClose} />
                      <HitsPerPage />
                      <Hits />
                      <Pagination />
                    </InstantSearch>
                  </div>
                </MotionDialogContent>
              </MotionDialogOverlay>
            </ScrollLock>
          )}
        </AnimatePresence>
      </LazyMotion>
    </WidgetProvider>
  );
};

export default Widget;
