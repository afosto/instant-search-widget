import { Fragment, h } from 'preact';
import useScrollLock from '../../hooks/useScrollLock';

const ScrollLock = ({ children }) => {
  useScrollLock();

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default ScrollLock;
