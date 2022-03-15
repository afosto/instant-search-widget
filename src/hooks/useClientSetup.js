import { useCallback, useEffect, useState } from 'preact/hooks';
import afostoInstantSearch from '@afosto/instant-search-client';

const useClientSetup = (key) => {
  const [client, setClient] = useState(null);
  const [settings, setSettings] = useState({});

  const fetchSettings = useCallback(async () => {
    const settings = await client.getSettings();
    setSettings(settings);
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

  return { client, fetchSettings, settings };
};

export default useClientSetup;
