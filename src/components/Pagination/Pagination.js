import { h } from 'preact';
import { Pagination as AisPagination } from 'react-instantsearch-dom';

export const Pagination = () => (
  <div className="af-is-widget__pagination">
    <AisPagination padding={2} showLast={false} showFirst={false} translations={{
      previous: '‹',
      next: '›',
      first: '«',
      last: '»',
    }} />
  </div>
);

export default Pagination;
