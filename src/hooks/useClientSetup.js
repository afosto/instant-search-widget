import { useCallback, useEffect, useState } from 'preact/hooks';
import afostoInstantSearch from '@afosto/instant-search-client';

const useClientSetup = (key) => {
  const [client, setClient] = useState(null);
  const [settings, setSettings] = useState({});

  const fetchSettings = useCallback(async () => {
    const settings = await client.getSettings();
    const formattedSettings = {
      ...settings,
      filters: {
        show_for: 'test-producten-be-csv',
        sorting: [
          'category',
          'price'
        ],
        options_count: 5,
        max_options_count: 25
      },
      is_autocomplete: true,
      click_tracking: {
        is_enabled: true,
        url: 'string'
      },
      indexes: [
        {
          alias: 'test-producten-be-csv',
          template: 'PRODUCTS',
          results_per_page: 12,
          template_mapping: {

          },
          filters: [
            {
              key: 'merk',
              label: 'Brand',
              type: 'STRING',
              options_count: 10,
              max_options_count: 25
            },
            {
              key: 'sku',
              label: 'SKU',
              type: 'STRING',
              options_count: 10,
              max_options_count: 25
            },
            {
              key: 'price',
              label: 'Price',
              type: 'NUMBER',
            },
          ]
        },
        {
          alias: 'paginas-test',
          template: 'PAGES',
          results_per_page: 12,
          template_mapping: {

          },
        }
      ]
    }
    setSettings(formattedSettings);
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
