#!/usr/bin/env node

// Polyfill for ReadableStream (fixes undici issue)
if (typeof globalThis.ReadableStream === 'undefined') {
  const { ReadableStream } = require('stream/web');
  globalThis.ReadableStream = ReadableStream;
}

// Run Expo export
const { spawnSync } = require('child_process');

console.log('📦 Bundling Android app with Expo...');

const result = spawnSync('npx', ['expo', 'export', '--platform', 'android'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NODE_ENV: 'production' }
});

if (result.status === 0) {
  console.log('✅ Bundle created successfully!');
  process.exit(0);
} else {
  console.error('❌ Bundle failed!');
  process.exit(1);
}
