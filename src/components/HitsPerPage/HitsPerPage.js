import { h } from 'preact';
import { HitsPerPage as AisHitsPerPage } from 'react-instantsearch-dom';
import useWidgetContext from '../../hooks/useWidgetContext';

const HitsPerPage = () => {
  const { settings } = useWidgetContext();
  const [firstIndex] = settings.indexes || [];
  const mainIndexKey = settings.filters?.show_for || firstIndex?.alias;
  const mainIndex = (settings.indexes || []).find(index => index.alias === mainIndexKey);

  return (
    <div className="af-is-widget__page-size">
      <AisHitsPerPage
        items={[
          { value: 12, label: "12 items" },
          { value: 24, label: "24 items" },
          { value: 48, label: "48 items" }
        ]}
        defaultRefinement={mainIndex?.results_per_page || 12}
      />
    </div>
  );
};

export default HitsPerPage;
