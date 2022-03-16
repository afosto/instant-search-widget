import { h } from 'preact';
import useIndexContext from '../../hooks/useIndexContext';

const ProductHit = ({ hit }) => {
  const { template } = useIndexContext();
  const { mapping = {} } = template || {};
  const description = hit[mapping.description || 'description'];
  const image = hit[mapping.image || 'image'];
  const price = hit[mapping.price || 'price'];
  const salePrice = hit[mapping.sale_price || 'sale_price'];
  const title = hit[mapping.title || 'title'];
  const url = hit[mapping.url || 'url'];
  const formatLocale = window.navigator.language;
  const currencySettings = { style: 'currency', currency: 'EUR' };

  return (
    <a href={url} className="ais-Hits-item-inner">
      {image && (
        <div className="ais-Hits-item-image">
          <img src={image} />
        </div>
      )}
      {title && (
        <span className="ais-Hits-item-title">
          {title}
        </span>
      )}
      {description && (
        <span className="ais-Hits-item-description">
          {description}
        </span>
      )}
      {(salePrice || price) && (
        <span className="ais-Hits-item-price-display">
          {new Intl.NumberFormat(formatLocale, currencySettings).format(salePrice ? salePrice : price)}
          {salePrice && price ? (
            <s className="ais-Hits-item-price-original">
              {new Intl.NumberFormat(formatLocale, currencySettings).format(price)}
            </s>
          ): null}
        </span>
      )}
    </a>
  );
}

export default ProductHit;
