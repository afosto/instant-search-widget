import { h } from 'preact';
import { Hits as AisHits, Index } from 'react-instantsearch-dom';
import { DEFAULT_HIT_TEMPLATES } from '../../constants';
import useWidgetContext from '../../hooks/useWidgetContext';
import IndexProvider from '../IndexProvider';
import Stats from '../Stats';

const Hits = () => {
  const { settings } = useWidgetContext();
  const { indexes } = settings || {};

  return (
    <div className="af-is-widget__results">
      {indexes.map(({ alias, template = {} }) => {
        const { name = 'DEFAULT' } = template;
        const hitComponent = DEFAULT_HIT_TEMPLATES[name] || DEFAULT_HIT_TEMPLATES.DEFAULT;
        const templateKey = DEFAULT_HIT_TEMPLATES[name] ? name.toLowerCase() : 'default';

        return (
          <Index indexName={alias} key={alias}>
            <IndexProvider value={{ alias, template }}>
              <div>
                <div className="af-is-widget__results__header">
                  {`${name.charAt(0)}${name.slice(1).toLowerCase()}`}
                  <Stats />
                </div>
                <div className={`af-is-widget__results__grid af-is-widget__results__${templateKey}`}>
                  <AisHits hitComponent={hitComponent} />
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
