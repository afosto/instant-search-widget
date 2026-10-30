import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { connectScrollTo } from 'react-instantsearch-dom';
import usePrevious from '../../hooks/usePrevious';

const ScrollRestoration = ({ children, value, hasNotChanged }) => {
  const elementRef = useRef(null);
  const prevProps = usePrevious({ value, hasNotChanged });

  useEffect(() => {
    if (hasNotChanged && value !== prevProps?.value) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return <div ref={elementRef}>{children}</div>;
};

export default connectScrollTo(ScrollRestoration);
