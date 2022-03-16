import { h } from 'preact';

const DefaultHit = ({ hit }) => (
  <div className="ais-Hits-item-inner">
    <span className="ais-Hits-item-title">
      {hit?.title}
    </span>
    <p className="ais-Hits-item-description">
      {hit?.description}
    </p>
  </div>
);

export default DefaultHit;
