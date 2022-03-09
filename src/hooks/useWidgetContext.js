import { useContext } from 'preact/hooks';
import { WidgetContext } from '../components/WidgetProvider';

const useWidgetContext = () => useContext(WidgetContext);

export default useWidgetContext;
