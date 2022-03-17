import { h } from 'preact';
import { SearchBox as AisSearchBox } from 'react-instantsearch-dom';
import useWidgetContext from '../../hooks/useWidgetContext';
import isDefined from '../../utils/isDefined';

const SearchBox = ({ onClose }) => {
  const { settings, translations } = useWidgetContext();
  const searchAsYouType = isDefined(settings?.is_autocomplete) ? settings.is_autocomplete : true;

  return (
    <div className="af-is-widget__search">
      <AisSearchBox
        searchAsYouType={searchAsYouType}
        translations={{
          submitTitle: translations.search.submitTitle,
          resetTitle: translations.search.resetTitle,
          placeholder: translations.search.placeholder,
        }}
        autoFocus
      />
      <button className="af-is-widget__search__close" onClick={onClose}>
        {translations.close}
      </button>
    </div>
  );
};

export default SearchBox;
