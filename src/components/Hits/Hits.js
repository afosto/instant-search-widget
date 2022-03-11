import { h } from 'preact';
import useWidgetContext from '../../hooks/useWidgetContext';
import PagesHit from '../PagesHit';
import ProductHit from '../ProductHit';
import { Hits as AisHits, Index } from 'react-instantsearch-dom';
import Stats from '../Stats';

const Hits = () => {
  const { settings } = useWidgetContext();
  const { indexes } = settings || {};

  const hitTemplates = {
    PRODUCTS: ProductHit,
    PAGES: PagesHit,
  };

  return (
    <div className="af-is-widget__results">
      {indexes.map(({ alias = '', template = '' }) => (
        <Index indexName={alias} key={alias}>
          <div>
            <div className="af-is-widget__results__header">
              {template}
              <Stats />
            </div>
            <div className={`af-is-widget__results__grid af-is-widget__results__${template.toLowerCase()}`}>
              <AisHits hitComponent={hitTemplates[template]} />
            </div>
          </div>
        </Index>
      ))}
    </div>
  );
};

export default Hits;
