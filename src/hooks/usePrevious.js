import { useEffect, useRef } from 'preact/hooks';

const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
