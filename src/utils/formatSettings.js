const formatSettings = settings => {
  const indexes = (settings?.indexes || []).map(index => ({
    ...index,
    template: {
      ...index.template,
      mapping: Object.fromEntries(
        (index.template?.mapping || []).map(mapping => [mapping.to, mapping.from]),
      ),
      _rawMapping: index.template?.mapping || [],
    },
  }));

  return {
    ...settings,
    indexes,
  };
};

export default formatSettings;
