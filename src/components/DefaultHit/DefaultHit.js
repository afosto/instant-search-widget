import { h } from 'preact';
import useIndexContext from '../../hooks/useIndexContext';

const DefaultHit = ({ hit }) => {
  const { template } = useIndexContext();
  const { mapping = {} } = template || {};
  const url = hit[mapping.url || 'url'];
  const Tag = url ? 'a' : 'div';
  const tagProps = url ? { href: url } : {};

  return (
    <Tag {...tagProps} className="ais-Hits-item-inner">
      <span className="ais-Hits-item-title">
        {hit.title}
      </span>
      {hit.description && (
        <p className="ais-Hits-item-description">
          {hit.description}
        </p>
      )}
    </Tag>
  );
}

export default DefaultHit;
