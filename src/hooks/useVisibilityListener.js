import { useEffect } from 'preact/hooks';
import { EVENT_KEY_WIDGET_VISIBILITY } from '../constants';

const useVisibilityListener = onClick => {
  useEffect(() => {
    document.addEventListener(EVENT_KEY_WIDGET_VISIBILITY, onClick);

    return () => {
      document.removeEventListener(EVENT_KEY_WIDGET_VISIBILITY, onClick);
    };
  }, [onClick]);
};

export default useVisibilityListener;
