import { h, Fragment } from 'preact';

const ProductHit = ({ hit }) => {
  const formatLocale = window.navigator.language;
  const currencySettings = { style: 'currency', currency: 'EUR' };

  return (
    <a href={hit.product_url} className="ais-Hits-item-inner">
      <div className="ais-Hits-item-image">
        <img src={hit.image_link} />
      </div>
      <span className="ais-Hits-item-title">
        {hit.title}
      </span>
      <span className="ais-Hits-item-description">
        {hit.description}
      </span>
      <span className="ais-Hits-item-price-display">
        {new Intl.NumberFormat(formatLocale, currencySettings).format(hit.sale_price ? hit.sale_price : hit.price)}
            {hit.sale_price ? (
              <s className="ais-Hits-item-price-original">
                {new Intl.NumberFormat(formatLocale, currencySettings).format(hit.price)}
              </s>
            ): null}
      </span>
    </a>
  );
}

export default ProductHit;
