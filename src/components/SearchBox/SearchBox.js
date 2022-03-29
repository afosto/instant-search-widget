import { h } from 'preact';
import { connectCurrentRefinements, SearchBox as AisSearchBox } from 'react-instantsearch-dom';
import useWidgetContext from '../../hooks/useWidgetContext';
import isDefined from '../../utils/isDefined';


const FilterButton = connectCurrentRefinements(({ onClick, items }) => (
  <button className="af-is-widget__search__filters" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M0 73.7C0 50.67 18.67 32 41.7 32H470.3C493.3 32 512 50.67 512 73.7C512 83.3 508.7 92.6 502.6 100L336 304.5V447.7C336 465.5 321.5 480 303.7 480C296.4 480 289.3 477.5 283.6 472.1L191.1 399.6C181.6 392 176 380.5 176 368.3V304.5L9.373 100C3.311 92.6 0 83.3 0 73.7V73.7zM54.96 80L218.6 280.8C222.1 285.1 224 290.5 224 296V364.4L288 415.2V296C288 290.5 289.9 285.1 293.4 280.8L457 80H54.96z" />
    </svg>
    {!!items.length && <span className="af-is-widget__search__filters-count" />}
  </button>
));

const SearchBox = ({ onClose }) => {
  const { settings, translations, setShowFilters } = useWidgetContext();
  const searchAsYouType = isDefined(settings?.is_autocomplete) ? settings.is_autocomplete : true;
  const handleShowFilters = () => setShowFilters(true);

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
      <FilterButton onClick={handleShowFilters} />
      <button className="af-is-widget__search__close" onClick={onClose}>
        {translations.close}
      </button>
    </div>
  );
};

export default SearchBox;
