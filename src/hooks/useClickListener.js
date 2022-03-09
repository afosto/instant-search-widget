import { useEffect } from 'preact/hooks';

const useClickListener = (onClick) => {
  useEffect(() => {
    const elements = [...document.querySelectorAll('[data-af-instant-search]')];

    elements.forEach(element => {
      element.addEventListener('click', onClick);
    });

    return () => {
      elements.forEach(element => {
        element.removeEventListener('click', onClick);
      });
    };
  }, [onClick]);
};

export default useClickListener;
