import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { InstantSearch } from 'react-instantsearch-dom';
import useClickListener from '../../hooks/useClickListener';
import useClientSetup from '../../hooks/useClientSetup';
import CloseButton from '../CloseButton';
import Filters from '../Filters';
import Hits from '../Hits';
import HitsPerPage from '../HitsPerPage';
import Pagination from '../Pagination';
import SearchBox from '../SearchBox';
import WidgetProvider from '../WidgetProvider';

const MotionDialogOverlay = m(DialogOverlay);
const MotionDialogContent = m(DialogContent);

const Widget = ({ config, locale, searchKey, translations }) => {
  const [open, setOpen] = useState(false);

  const { client, isFetchingSettings, settings } = useClientSetup(searchKey);
  const [firstIndex] = settings.indexes || [];
  const mainIndexKey = settings.filters?.show_for || firstIndex?.alias;
  const mainIndex = (settings.indexes || []).find(index => index.alias === mainIndexKey);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useClickListener(handleOpen);

  return (
    <WidgetProvider value={{ client, config, isFetchingSettings, locale, settings, translations }}>
      <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (<MotionDialogOverlay
          initial={{ opacity: 0}}
          animate={{ opacity: 1, transition: { type: 'tween', duration: .225, ease: [0.4, 0, 0.2, 1] } }}
          exit={{ opacity: 0, transition: { type: 'tween', duration: .195, ease: [0.4, 0, 0.2, 1] } }}
          className="af-is-widget__dialog"
          onDismiss={handleClose}
          isOpen
        >
          <MotionDialogContent
            initial={{ y: -20}}
            animate={{ y: 0, transition: { type: 'tween', duration: .225, ease: [0.4, 0, 0.2, 1] } }}
            exit={{ y: -20, transition: { type: 'tween', duration: .195, ease: [0.4, 0, 0.2, 1] } }}
            className="af-is-widget__content">
            <div className="af-is-widget__layout">
              <CloseButton onClick={handleClose}/>
              <InstantSearch
                indexName={mainIndex?.alias}
                searchClient={client}
              >
                <Filters />
                <SearchBox onClose={handleClose} />
                <HitsPerPage />
                <Hits />
                <Pagination />
              </InstantSearch>
            </div>
          </MotionDialogContent>
        </MotionDialogOverlay>
          )}
      </AnimatePresence>
      </LazyMotion>
    </WidgetProvider>
  );
};

export default Widget;
