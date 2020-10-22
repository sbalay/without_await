const reactNativePreset = require('react-native/jest-preset');

module.exports = Object.assign({}, reactNativePreset, {
  setupFiles: [require.resolve('./save-promise.js')]
    .concat(reactNativePreset.setupFiles)
    .concat([require.resolve('./restore-promise.js')]),
});
