import { h } from 'preact';
import { HitsPerPage as AisHitsPerPage } from 'react-instantsearch-dom';
import { DEFAULT_HITS_PER_PAGE, DEFAULT_HITS_PER_PAGE_OPTIONS } from '../../constants';
import useWidgetContext from '../../hooks/useWidgetContext';

const HitsPerPage = () => {
  const { settings, translations } = useWidgetContext();
  const [firstIndex] = settings.indexes || [];
  const mainIndexKey = settings.filters?.show_for || firstIndex?.alias;
  const mainIndex = (settings.indexes || []).find(index => index.alias === mainIndexKey);

  return (
    <div className="af-is-widget__page-size">
      <AisHitsPerPage
        items={DEFAULT_HITS_PER_PAGE_OPTIONS.map(option => ({
          value: option,
          label: translations.hitsPerPage.optionsLabel.replace('{value}', option)
        }))}
        defaultRefinement={mainIndex?.results_per_page || DEFAULT_HITS_PER_PAGE}
      />
    </div>
  );
};

export default HitsPerPage;
