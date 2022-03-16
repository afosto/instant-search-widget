import { h, Fragment } from 'preact';

const PagesHit = ({ hit }) => (
  <a href={hit.url} className="ais-Hits-item-inner">
    <span className="ais-Hits-item-title">
      {hit.title}
    </span>
  </a>
);

export default PagesHit;
