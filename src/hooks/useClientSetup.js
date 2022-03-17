import { useCallback, useEffect, useState } from 'preact/hooks';
import afostoInstantSearch from '@afosto/instant-search-client';
import formatSettings from '../utils/formatSettings';

const useClientSetup = key => {
  const [client, setClient] = useState(null);
  const [isFetchingSettings, setIsFetchingSettings] = useState(true);
  const [settings, setSettings] = useState({});

  const fetchSettings = useCallback(async () => {
    try {
      setIsFetchingSettings(true);
      const clientSettings = await client.getSettings();
      setSettings(formatSettings(clientSettings));
    } catch (error) {
      setSettings({});
    } finally {
      setIsFetchingSettings(false);
    }
  }, [client]);

  useEffect(() => {
    const instantSearchClient = afostoInstantSearch(key);
    setClient(instantSearchClient);
  }, [key]);

  useEffect(() => {
    if (client) {
      fetchSettings();
    }
  }, [client, fetchSettings]);

  return { client, fetchSettings, isFetchingSettings, settings };
};

export default useClientSetup;
