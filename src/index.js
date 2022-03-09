import { h, render } from 'preact';
import Widget from './components/Widget';
import './styles/index.scss';

const initWidget = (key, config = {}) => {
  if (!key) {
    throw new Error('Provide a search engine key');
  }

  render(h(Widget, { config, searchKey: key }), document.body);
};

export default initWidget;
