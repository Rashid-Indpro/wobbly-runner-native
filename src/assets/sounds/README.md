# Audio Files Directory

## Required File

### Background Music
Place your background music file here as:
- **`background.mp3`**

**Requirements:**
- Format: MP3 (recommended for mobile)
- Should be optimized for mobile (compressed, not too large)
- Will loop continuously during gameplay
- Recommended duration: 30-120 seconds

**Example sources:**
- Create your own
- Use royalty-free music from:
  - Incompetech (incompetech.com)
  - Free Music Archive (freemusicarchive.org)
  - YouTube Audio Library
  - Pixabay (pixabay.com/music)

## Optional Files (for enhanced sound effects)

If you want to replace the placeholder beep sounds, add:
- `move.mp3` - Lane switch sound
- `collect.mp3` - Coin/gem collection sound
- `powerup.mp3` - Power-up activation sound
- `fail.mp3` - Game over sound

## How to Enable

Once you've added `background.mp3`:

1. Open `src/utils/SoundManager.ts`
2. Find the `playBackgroundAudio()` method
3. Uncomment these lines:
```typescript
const { sound } = await Audio.Sound.createAsync(
  require('../assets/sounds/background.mp3'),
  { isLooping: true, shouldPlay: true, volume: 1.0 }
);
this.backgroundAudioSound = sound;
```
4. Remove or comment out the placeholder log:
```typescript
console.log('🎵 Background audio started (placeholder - add file to enable)');
```

## Current Status

✅ **Simplified Background Audio System Active**
- Complex multi-track system removed
- Simple ON/OFF toggle implemented
- Ready for single background audio file
- All sound effects preserved
- Settings persistence maintained

⏳ **Waiting for audio file**
- Place `background.mp3` in this directory
- Uncomment the loading code in SoundManager.ts
- Test the implementation

## Testing Checklist

After adding your audio file:

- [ ] Background audio plays on app start
- [ ] Background audio stops when toggled OFF in settings
- [ ] Background audio resumes when toggled ON in settings
- [ ] Background audio loops seamlessly
- [ ] Sound effects still work (move, collect, powerup, fail)
- [ ] Audio stops during ads
- [ ] Audio resumes after ads
- [ ] Audio stops on game over
- [ ] Audio stops when paused
- [ ] Audio resumes when unpaused
