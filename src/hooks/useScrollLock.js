import { useLayoutEffect } from 'preact/hooks';

const useScrollLock = () => {
  useLayoutEffect(
    () => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      // eslint-disable-next-line no-return-assign
      return () => (document.body.style.overflow = originalStyle);
    },
    [],
  );
}

export default useScrollLock;
