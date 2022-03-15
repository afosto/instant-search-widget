import { h, Fragment } from 'preact';
import useIndexContext from '../../hooks/useIndexContext';

const PagesHit = ({ hit }) => {
  const { template } = useIndexContext();
  const { mapping = {} } = template || {};

  return (
    <a href={hit[mapping?.url || 'url']} className="ais-Hits-item-inner">
      <span className="ais-Hits-item-title">
        {hit[mapping?.title || 'title']}
      </span>
    </a>
  );
}

export default PagesHit;
