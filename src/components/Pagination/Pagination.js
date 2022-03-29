import { h } from 'preact';
import { Pagination as AisPagination } from 'react-instantsearch-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

export const Pagination = () => {
  let padding = 0;
  padding = useMediaQuery('(min-width: 400px) and (max-width: 499px), (min-width: 700px) and (max-width: 799px)') ? 1: padding;
  padding = useMediaQuery('(min-width: 500px) and (max-width: 599px), (min-width: 800px)') ? 2: padding;

  return (
    <div className="af-is-widget__pagination">
      <AisPagination padding={padding} showLast={false} showFirst={false} />
    </div>
  );
}

export default Pagination;
