const removeImports = require('next-remove-imports')();

module.exports = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig,
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },
  });
};
