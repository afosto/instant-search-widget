import { h } from 'preact';
import { createContext } from 'preact';

const initialState = {
  alias: null,
  template: {},
};

export const IndexContext = createContext(initialState);

const IndexProvider = ({ children, value }) => (
  <IndexContext.Provider value={value}>{children}</IndexContext.Provider>
);

export default IndexProvider;
