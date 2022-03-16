import { h, Fragment } from 'preact';
import useIndexContext from '../../hooks/useIndexContext';

const ProductHit = ({ hit }) => {
  const { template } = useIndexContext();
  const { mapping = {} } = template || {};
  const formatLocale = window.navigator.language;
  const currencySettings = { style: 'currency', currency: 'EUR' };

  return (
    <a href={hit[mapping.url || 'url']} className="ais-Hits-item-inner">
      {hit[mapping.image || 'image'] && (
        <div className="ais-Hits-item-image">
          <img src={hit[mapping.image || 'image']} />
        </div>
      )}
      {hit[mapping.title || 'title'] && (
        <span className="ais-Hits-item-title">
          {hit[mapping.title || 'title']}
        </span>
      )}
      {hit[mapping.description || 'description'] && (
        <span className="ais-Hits-item-description">
          {hit[mapping.description || 'description']}
        </span>
      )}
      {(hit[mapping.sale_price || 'sale_price'] || hit[mapping.price || 'price']) && (
        <span className="ais-Hits-item-price-display">
          {new Intl.NumberFormat(formatLocale, currencySettings).format(hit.sale_price ? hit.sale_price : hit.price)}
          {hit[mapping.sale_price || 'sale_price'] && hit[mapping.price || 'price'] ? (
            <s className="ais-Hits-item-price-original">
              {new Intl.NumberFormat(formatLocale, currencySettings).format(hit.price)}
            </s>
          ): null}
        </span>
      )}
    </a>
  );
}

export default ProductHit;
