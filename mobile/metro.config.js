/* eslint-env node */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Extensions nécessaires pour TensorFlow.js
config.resolver.assetExts.push('bin', 'txt', 'jpg', 'png', 'json');

module.exports = withNativeWind(config, { input: './global.css' });