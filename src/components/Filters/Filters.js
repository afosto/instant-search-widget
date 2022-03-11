import { h } from 'preact';
import { ClearRefinements, DynamicWidgets, Panel, RefinementList } from 'react-instantsearch-dom';

import useWidgetContext from '../../hooks/useWidgetContext';
import RangeSlider from '../RangeSlider';

const Filters = () => {
  const { settings } = useWidgetContext();
  const [firstIndex] = settings.indexes || [];
  const mainIndexKey = settings.filters?.show_for || firstIndex?.alias;
  const mainIndex = (settings.indexes || []).find(index => index.alias === mainIndexKey);
  const filters = mainIndex?.filters || [];

  return (
    <div className="af-is-widget__filters">
      <ClearRefinements/>
      <DynamicWidgets
        maxValuesPerFacet={1000} // Suppress warning
        transformItems={(_, {results}) => Object.keys(results._rawResults[0].facets)}
        fallbackComponent={RefinementList}
      >
        {filters.map(filter => {
          switch (filter.type) {
            case 'NUMBER':
              return (
                <Panel key={filter.key} header={filter.label}>
                  <RangeSlider attribute={filter.key} />
                </Panel>
              );
            case 'STRING':
            default:
              return (
                <Panel key={filter.key} header={filter.label}>
                  <RefinementList
                    attribute={filter.key}
                    operator="and"
                    limit={filter.options_count || 10}
                    showMoreLimit={filter.max_options_count || 25}
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