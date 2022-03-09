import { h } from 'preact';
import { createContext } from 'preact';

const initialState = {
  client: null,
  settings: {},
};

export const WidgetContext = createContext(initialState);

const WidgetProvider = ({ children, value }) => (
  <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
);

export default WidgetProvider;
