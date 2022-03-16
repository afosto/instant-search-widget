import { h } from 'preact';
import { Stats as AisStats } from 'react-instantsearch-dom';
import useWidgetContext from '../../hooks/useWidgetContext';

const Stats = () => {
  const { translations } = useWidgetContext();

  return (
    <div className="af-is-widget__stats">
      <AisStats
        translations={{
          stats: nbHits => translations.stats.resultsLabel.replace('{value}', nbHits.toLocaleString())
        }}
      />
    </div>
  );
};

export default Stats;
