import { useCallback, useEffect, useState } from 'preact/hooks';
import afostoInstantSearch from '@afosto/instant-search-client';
import formatSettings from '../utils/formatSettings';

const useClientSetup = (key) => {
  const [client, setClient] = useState(null);
  const [isFetchingSettings, setIsFetchingSettings] = useState(true);
  const [settings, setSettings] = useState({});

  const fetchSettings = useCallback(async () => {
    try {
      setIsFetchingSettings(true);
      const settings = await client.getSettings();
      setSettings(formatSettings(settings));
    } catch (error) {
      setSettings({});
    } finally {
      setIsFetchingSettings(false);
    }
  }, [client]);

  useEffect(() => {
    const client = afostoInstantSearch(key);
    setClient(client);
  }, [key]);

  useEffect(() => {
    if (client) {
      fetchSettings();
    }
  }, [client, fetchSettings]);

  return { client, fetchSettings, isFetchingSettings, settings };
};

export default useClientSetup;
