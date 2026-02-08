// Test what require returns for audio files
const backgroundModule = require('./src/assets/sounds/background.mp3');
const collectModule = require('./src/assets/sounds/collect.mp3');

console.log('Background module:', backgroundModule);
console.log('Collect module:', collectModule);
console.log('Type:', typeof backgroundModule);
