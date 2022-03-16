import { h } from 'preact';
import { SearchBox as AisSearchBox } from 'react-instantsearch-dom';
import useWidgetContext from '../../hooks/useWidgetContext';
import isDefined from '../../utils/isDefined';

const SearchBox = ({ onClose }) => {
  const { settings } = useWidgetContext();
  const searchAsYouType = isDefined(settings?.is_autocomplete) ? settings.is_autocomplete : true;

  return (
    <div className="af-is-widget__search">
      <AisSearchBox searchAsYouType={searchAsYouType} autoFocus />
      <button className="af-is-widget__search__close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default SearchBox;
