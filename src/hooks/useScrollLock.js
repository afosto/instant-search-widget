import { useLayoutEffect } from 'preact/hooks';

const useScrollLock = () => {
  useLayoutEffect(
    () => {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      const originalComputedPaddingRight = window.getComputedStyle(document.body).paddingRight;
      const originalPaddingRight = document.body.style.paddingRight;
      const documentWidth = document.documentElement.clientWidth;
      const windowWidth = window.innerWidth;
      const scrollBarWidth = windowWidth - documentWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth + parseFloat(originalComputedPaddingRight || 0)}px`;
      // eslint-disable-next-line no-return-assign
      return () => {
        document.body.style.overflow = originalOverflow === 'visible' ? null : originalOverflow;
        document.body.style.paddingRight = originalPaddingRight || null;
      };
    },
    [],
  );
}

export default useScrollLock;
