import { h } from 'preact';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { useCallback, useState } from 'preact/hooks';
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

const Widget = ({ config, searchKey }) => {
  const [open, setOpen] = useState(false);

  const { client, settings } = useClientSetup(searchKey);
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
    <WidgetProvider value={{client, settings}}>
      <DialogOverlay
        className="af-is-widget__dialog"
        isOpen={open}
        onDismiss={handleClose}
      >
        <DialogContent className="af-is-widget__content">
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
        </DialogContent>
      </DialogOverlay>
    </WidgetProvider>
  );
};

export default Widget;
