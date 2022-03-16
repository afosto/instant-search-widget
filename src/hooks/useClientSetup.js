import { useCallback, useEffect, useState } from 'preact/hooks';
import afostoInstantSearch from '@afosto/instant-search-client';

const useClientSetup = (key) => {
  const [client, setClient] = useState(null);
  const [isFetchingSettings, setIsFetchingSettings] = useState(true);
  const [settings, setSettings] = useState({});

  const fetchSettings = useCallback(async () => {
    setIsFetchingSettings(true);
    const settings = await client.getSettings();
    setSettings(settings);
    setIsFetchingSettings(false);
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
