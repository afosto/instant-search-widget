import { useEffect, useRef } from 'preact/hooks';

const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  // Reading the ref during render is the point of this hook: it returns the value from the previous render.
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

export default usePrevious;
