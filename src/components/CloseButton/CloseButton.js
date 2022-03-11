import { h } from 'preact';

const CloseButton = ({ onClick }) => (
  <button className="af-is-widget__close-button" onClick={onClick}>
    <span aria-hidden>×</span>
  </button>
);


export default CloseButton;