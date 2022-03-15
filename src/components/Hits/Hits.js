import { h } from 'preact';
import useWidgetContext from '../../hooks/useWidgetContext';
import IndexProvider from '../IndexProvider';
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
      {indexes.map(({ alias = '', template = {} }) => {
        const { name } = template;
        return (
          <Index indexName={alias} key={alias}>
            <IndexProvider value={{ alias, template }}>
              <div>
                <div className="af-is-widget__results__header">
                  {name}
                  <Stats />
                </div>
                <div className={`af-is-widget__results__grid af-is-widget__results__${name.toLowerCase()}`}>
                  <AisHits hitComponent={hitTemplates[name]} />
                </div>
              </div>
            </IndexProvider>
          </Index>
        )
      })}
    </div>
  );
};

export default Hits;
