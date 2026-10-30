import { useLayoutEffect } from 'preact/hooks';

const useScrollLock = () => {
  useLayoutEffect(() => {
    const originalOverflow = getComputedStyle(document.body).overflow;
    const originalComputedPaddingRight = getComputedStyle(document.body).paddingRight;
    const originalPaddingRight = document.body.style.paddingRight;
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;

    document.body.style.overflow = 'hidden';
    // Number() would turn the computed value (e.g. "15px") into NaN; parseFloat reads the leading number.
    // eslint-disable-next-line unicorn/prefer-number-coercion
    const paddingRight = Number.parseFloat(originalComputedPaddingRight || 0);
    document.body.style.paddingRight = `${scrollBarWidth + paddingRight}px`;
    return () => {
      document.body.style.overflow = originalOverflow === 'visible' ? null : originalOverflow;
      document.body.style.paddingRight = originalPaddingRight || null;
    };
  }, []);
};

export default useScrollLock;
