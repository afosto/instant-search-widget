import { h } from 'preact';
import { Stats as AisStats } from 'react-instantsearch-dom';

const Stats = () => (
  <div className="af-is-widget__stats">
    <AisStats
      translations={{
        stats(nbHits) {
          return `${nbHits.toLocaleString()} results found`;
        }
      }}
    />
  </div>
);


export default Stats;
