const formatSettings = settings => {
  const indexes = (settings?.indexes || []).map(index => ({
    ...index,
    template: {
      ...(index.template || {}),
      mapping: (index.template?.mapping || []).reduce((acc, mapping) => ({
        ...acc,
        [mapping.to]: mapping.from,
      }), {}),
      _rawMapping: index.template?.mapping || [],
    },
  }));

  return {
    ...settings,
    indexes,
  };
};

export default formatSettings;
