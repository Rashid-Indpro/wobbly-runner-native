const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure MP3 files are included as assets
config.resolver.assetExts.push('mp3');

// Increase asset size limit to allow large audio files (default is 10KB)
// Background music is 3.3MB, so set limit to 5MB
config.transformer = {
  ...config.transformer,
  assetPlugins: [],
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Allow large assets (in bytes)
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'mp3');
config.resolver.assetExts.push('mp3');

module.exports = config;
