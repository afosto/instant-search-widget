import { useContext } from 'preact/hooks';
import { IndexContext } from '../components/IndexProvider';

const useIndexContext = () => useContext(IndexContext);

export default useIndexContext;
