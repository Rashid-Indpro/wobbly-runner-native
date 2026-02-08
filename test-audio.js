// Test if background.mp3 can be loaded
const fs = require('fs');
const path = require('path');

const audioPath = path.join(__dirname, 'src', 'assets', 'sounds', 'background.mp3');

console.log('🔍 Testing background.mp3...');
console.log('📁 Path:', audioPath);
console.log('📊 Exists:', fs.existsSync(audioPath));

if (fs.existsSync(audioPath)) {
  const stats = fs.statSync(audioPath);
  console.log('📏 Size:', stats.size, 'bytes');
  
  // Read first 10 bytes
  const buffer = Buffer.alloc(10);
  const fd = fs.openSync(audioPath, 'r');
  fs.readSync(fd, buffer, 0, 10, 0);
  fs.closeSync(fd);
  
  console.log('🔢 First 10 bytes:', buffer.toString('hex'));
  console.log('📝 Header:', buffer.toString('ascii', 0, 3));
  
  // Check if it's a valid MP3
  const isID3 = buffer.toString('ascii', 0, 3) === 'ID3';
  const isMP3Frame = buffer[0] === 0xFF && (buffer[1] & 0xE0) === 0xE0;
  
  if (isID3) {
    console.log('✅ Valid MP3 with ID3 tags');
  } else if (isMP3Frame) {
    console.log('✅ Valid MP3 without ID3 tags');
  } else {
    console.log('❌ NOT A VALID MP3 FILE!');
    console.log('⚠️  This file cannot be played by expo-av');
  }
} else {
  console.log('❌ File not found!');
}
