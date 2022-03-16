import { h } from 'preact';
import { Hits as AisHits, Index } from 'react-instantsearch-dom';
import useWidgetContext from '../../hooks/useWidgetContext';
import DefaultHit from '../DefaultHit';
import IndexProvider from '../IndexProvider';
import PagesHit from '../PagesHit';
import ProductHit from '../ProductHit';
import Stats from '../Stats';

const Hits = () => {
  const { settings } = useWidgetContext();
  const { indexes } = settings || {};

  const hitTemplates = {
    PRODUCTS: ProductHit,
    PAGES: PagesHit,
    DEFAULT: DefaultHit,
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
                <div className={`af-is-widget__results__grid af-is-widget__results__${Object.keys(hitTemplates).includes(name) ? name.toLowerCase() : 'default'}`}>
                  <AisHits hitComponent={hitTemplates[name] ? hitTemplates[name] : hitTemplates['DEFAULT']} />
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
