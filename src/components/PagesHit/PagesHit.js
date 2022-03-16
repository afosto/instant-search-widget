import { h } from 'preact';
import useIndexContext from '../../hooks/useIndexContext';

const PagesHit = ({ hit }) => {
  const { template } = useIndexContext();
  const { mapping = {} } = template || {};
  const url = hit[mapping.url || 'url'];
  const title = hit[mapping.title || 'title'];

  return (
    <a href={url} className="ais-Hits-item-inner">
      <span className="ais-Hits-item-title">
        {title}
      </span>
    </a>
  );
}

export default PagesHit;
