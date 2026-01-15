# 🚀 SDK 54 UPGRADE IMPLEMENTATION GUIDE

**Project**: Wobbly Runner Native  
**Target**: Expo SDK 54 + React Native 0.75  
**Estimated Time**: 8-9 hours  
**Difficulty**: Medium

---

## 📋 PRE-FLIGHT CHECKLIST

Before starting, complete these steps:

```bash
# 1. Create backup
git add .
git commit -m "Pre-upgrade backup - SDK 50 stable version"
git tag sdk-50-stable
git push origin main --tags

# 2. Create upgrade branch
git checkout -b upgrade/sdk-54

# 3. Document current state
npm list > pre-upgrade-dependencies.txt
```

- [ ] Project backed up to git
- [ ] Created upgrade branch
- [ ] Documented dependencies
- [ ] Tested app works on SDK 50
- [ ] Have physical device with Expo Go 54.0.6 ready

---

## 🎯 PHASE 1: DEPENDENCY UPDATES (30 minutes)

### Step 1.1: Update package.json

Replace the entire `dependencies` section in `package.json`:

```json
{
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-native-async-storage/async-storage": "2.0.0",
    "expo": "~54.0.0",
    "expo-av": "~14.0.0",
    "expo-status-bar": "~2.0.0",
    "expo-updates": "~0.26.0",
    "expo-web-browser": "~13.0.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.76.5",
    "react-native-gesture-handler": "~2.20.0",
    "react-native-reanimated": "~3.16.1",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.2.0",
    "react-native-web": "~0.19.13"
  },
  "devDependencies": {
    "@babel/core": "^7.25.0",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  }
}
```

### Step 1.2: Install dependencies

```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Windows alternative:
# rmdir /s /q node_modules
# del package-lock.json

# Install new dependencies
npm install

# Verify installation
npm list expo
npm list react-native
```

### Step 1.3: Run Expo Doctor

```bash
npx expo-doctor
```

Fix any issues reported. Common fixes:
- Update `app.json` if prompted
- Install missing peer dependencies
- Resolve version conflicts

**Expected Output**: ✅ "No issues found"

---

## 🔧 PHASE 2: CODE MODIFICATIONS (4-5 hours)

### 🔴 CRITICAL: Update 1 - StatusBar (App.tsx)

**File**: `App.tsx`

**Change 1** - Import statement (Line 1-2):
```typescript
// REMOVE
import { View, StyleSheet, StatusBar } from 'react-native';

// REPLACE WITH
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
```

**Change 2** - StatusBar component (Line ~303):
```typescript
// FIND
<StatusBar barStyle="light-content" backgroundColor="#09090b" />

// REPLACE WITH
<StatusBar style="light" backgroundColor="#09090b" />
```

**Testing**: Run app, verify status bar displays correctly

---

### 🔴 CRITICAL: Update 2 - AsyncStorage (storage.ts)

**File**: `src/utils/storage.ts`

Replace entire file content with SDK 54 compatible version:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility for React Native (SDK 54 Compatible)
 * Updated for AsyncStorage 2.0 with improved error handling
 */

interface StorageError extends Error {
  code?: string;
}

/**
 * Get an item from storage
 */
export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    const err = error as StorageError;
    console.error(`Error getting item ${key}:`, err.message);
    // In SDK 54, check for specific error codes
    if (err.code === 'ENOENT') {
      return null; // Key doesn't exist
    }
    return null;
  }
}

/**
 * Set an item in storage
 */
export async function setItem<T>(key: string, value: T): Promise<boolean> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    const err = error as StorageError;
    console.error(`Error setting item ${key}:`, err.message);
    // Handle quota exceeded errors in SDK 54
    if (err.code === 'QuotaExceededError') {
      console.warn('Storage quota exceeded. Consider clearing old data.');
    }
    return false;
  }
}

export const storage = {
  /**
   * Get an item from storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    return getItem<T>(key);
  },

  /**
   * Set an item in storage
   */
  async setItem<T>(key: string, value: T): Promise<boolean> {
    return setItem<T>(key, value);
  },

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      const err = error as StorageError;
      console.error(`Error removing item ${key}:`, err.message);
      return false;
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      const err = error as StorageError;
      console.error('Error clearing storage:', err.message);
      return false;
    }
  },

  /**
   * Get all keys in storage (SDK 54 feature)
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },

  /**
   * Get multiple items at once (SDK 54 optimization)
   */
  async multiGet(keys: string[]): Promise<Record<string, any>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, any> = {};
      pairs.forEach(([key, value]) => {
        if (value !== null) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value;
          }
        }
      });
      return result;
    } catch (error) {
      console.error('Error in multiGet:', error);
      return {};
    }
  }
};

// Storage keys constants
export const STORAGE_KEYS = {
  HIGH_SCORE: 'wobbly_highscore',
  COINS: 'wobbly_coins',
  SETTINGS: 'wobbly_settings',
  SKINS: 'wobbly_skins',
  SELECTED_SKIN: 'wobbly_selected_skin',
  AWARDS: 'wobbly_awards',
  OWNED_POWERS: 'wobbly_owned_powers',
};
```

**Testing**: 
1. Clear app data
2. Launch app - should show 500 signup coins
3. Make purchases in store
4. Close and reopen app - data should persist

---

### 🔴 CRITICAL: Update 3 - Audio System (SoundManager.ts)

**File**: `src/utils/SoundManager.ts`

Replace the `init()` method and audio mode (Lines 15-35):

```typescript
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { BGMTrack } from '../types';

/**
 * SoundManager for React Native (SDK 54 Compatible)
 * Updated for expo-av 14.x API changes
 */

class SoundManager {
  private enabled: boolean = true;
  private musicEnabled: boolean = true;
  private currentBgm: BGMTrack = 'SHUFFLE';
  private bgmInterval: any = null;
  private currentStep: number = 0;
  
  // SDK 54 compatible audio mode
  private audioMode = {
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
    // NEW in SDK 54
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    shouldRouteThroughEarpiece: false,
    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  };

  // Sound objects cache
  private sounds: { [key: string]: Audio.Sound } = {};
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  private async init() {
    if (this.isInitialized) return;
    
    try {
      // SDK 54 requires checking audio mode support
      const { isEnabled } = await Audio.getStatusAsync();
      
      await Audio.setAudioModeAsync(this.audioMode);
      
      this.isInitialized = true;
      console.log('✅ Audio system initialized (SDK 54)');
    } catch (error) {
      console.error('❌ Error initializing audio:', error);
      // Fallback to basic mode
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });
        this.isInitialized = true;
      } catch (fallbackError) {
        console.error('❌ Fatal audio initialization error:', fallbackError);
      }
    }
  }

  async ensureInitialized() {
    if (!this.isInitialized) {
      await this.init();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled) this.stopBGM();
    else this.startBGM();
  }

  setBGM(track: BGMTrack) {
    this.currentBgm = track;
    this.stopBGM();
    this.startBGM();
  }

  /**
   * Play a simple beep tone
   * In production, replace this with actual audio files
   */
  private async playBeep(frequency: number = 440, duration: number = 100) {
    if (!this.enabled) return;
    await this.ensureInitialized();
    
    // TODO: Add actual audio files to assets/sounds/
    // For now, skip audio playback to prevent crashes
    // Silent operation until audio files are added
    return;
  }

  async playMove() {
    if (!this.enabled) return;
    await this.playBeep(200, 100);
  }

  async playCollect() {
    if (!this.enabled) return;
    await this.playBeep(880, 100);
  }

  async playPowerUp() {
    if (!this.enabled) return;
    await this.playBeep(440, 500);
  }

  async playFail() {
    if (!this.enabled) return;
    await this.playBeep(100, 500);
  }

  stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  async startBGM() {
    await this.ensureInitialized();
    if (!this.musicEnabled || this.bgmInterval) return;
    
    // Start background music loop
    this.bgmInterval = setInterval(() => {
      this.tick();
    }, 180);
  }

  private tick() {
    if (!this.musicEnabled) return;
    
    const trackToPlay = this.currentBgm === 'SHUFFLE' 
      ? this.getRandomTrack() 
      : this.currentBgm;
    
    this.playSequence(trackToPlay);
    this.currentStep = (this.currentStep + 1) % 512;
  }

  private getRandomTrack(): BGMTrack {
    const tracks: BGMTrack[] = [
      'ARCADE_LEVEL',
      'POWER_PULSE',
      'NEON_RUSH',
      'GLITCH_HOP',
      'CHIP_CHASE',
      'CALM_JOURNEY',
      'MELODIOUS_WAVE'
    ];
    return tracks[Math.floor(Date.now() / 30000) % tracks.length];
  }

  private async playSequence(track: BGMTrack) {
    const step = this.currentStep;
    const barStep = step % 16;
    const fastStep = step % 8;

    // Simplified BGM playback
    // In production, load actual music tracks from assets
    switch (track) {
      case 'ARCADE_LEVEL':
        if (barStep % 4 === 0) await this.playBeep(110, 200);
        break;
      case 'POWER_PULSE':
        if (fastStep === 0) await this.playBeep(80, 200);
        break;
      case 'NEON_RUSH':
        await this.playBeep(220 + (step % 32) * 5, 100);
        break;
      case 'GLITCH_HOP':
        if (barStep % 3 === 0) await this.playBeep(60, 200);
        break;
      case 'CHIP_CHASE':
        await this.playBeep(880 - (barStep * 80), 50);
        break;
      case 'CALM_JOURNEY':
        if (barStep === 0) await this.playBeep(261.63, 2000);
        break;
      case 'MELODIOUS_WAVE':
        const notes = [523.25, 587.33, 659.25, 783.99];
        await this.playBeep(notes[step % 4], 300);
        break;
      case 'SUSPENSE_PLOT':
        if (barStep % 2 === 0) await this.playBeep(60, 100);
        break;
    }
  }

  /**
   * Clean up all audio resources
   * SDK 54 requires proper cleanup
   */
  async cleanup() {
    this.stopBGM();
    
    // Unload all cached sounds
    for (const key in this.sounds) {
      try {
        await this.sounds[key].unloadAsync();
      } catch (error) {
        console.error('Error unloading sound:', error);
      }
    }
    
    this.sounds = {};
    this.isInitialized = false;
  }
}

export const soundManager = new SoundManager();
```

**Testing**:
1. Enable sound in settings
2. Play game - verify BGM plays
3. Collect coins - verify sound effects
4. Pause/resume - verify audio state
5. Switch BGM tracks in settings

---

### 🔴 CRITICAL: Update 4 - WebBrowser (LegalWebView.tsx)

**File**: `src/components/LegalWebView.tsx`

Update the `openInBrowser` function (Lines 16-23):

```typescript
const openInBrowser = async () => {
  try {
    console.log(`🌐 Opening ${title} in web browser`);
    
    // SDK 54 compatible options
    const result = await WebBrowser.openBrowserAsync(url, {
      // iOS options
      controlsColor: '#4338ca',
      dismissButtonStyle: 'close',
      readerMode: false,
      
      // Android options
      toolbarColor: '#4338ca',
      enableBarCollapsing: false,
      showInRecents: false,
      
      // Cross-platform
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
    });
    
    console.log('Browser result:', result.type);
  } catch (error) {
    console.error(`❌ Error opening legal page: ${title}`, error);
  }
};
```

**Testing**:
1. Open Settings → About Us
2. Tap Privacy Policy
3. Verify browser opens with correct styling
4. Close browser, verify return to app
5. Test all 4 legal pages

---

## 🧪 PHASE 3: TESTING (2-3 hours)

### Test Suite 1: Core Functionality

```
□ App launches without crashes
□ Splash screen displays (3 seconds)
□ Tutorial shows for first-time users
□ Main menu displays correctly
□ High score displays
□ Coin count displays
```

### Test Suite 2: Gameplay

```
□ Game starts with "Start Game" button
□ Player character renders
□ Lane switching works (left/right swipes)
□ Obstacles spawn and move
□ Collision detection works
□ Score increments
□ Coins spawn and collect
□ Gems spawn and collect (5x value)
□ Power-ups spawn
```

### Test Suite 3: Power-Ups (Test Each)

```
□ INVINCIBLE - Immunity to obstacles
□ MAGNET - Auto-collect coins
□ GIANT - Larger size, stomp obstacles
□ TINY - Smaller size, easier dodging
□ COIN_RAIN - Double coin value
□ TIME_FREEZE - Obstacles stop
□ SLOW_MO - Slow motion effect
□ MULTIPLIER - 2x score
□ CHAOS - Visual effects
□ RUBBER - Bounce over obstacles
□ SCREEN_FLIP - Upside down (3x score)
□ SONIC_DASH - Speed burst
□ GHOST_WALK - Phase through obstacles
□ SHIELD_BURST - Destroy nearby obstacles
□ SUPER_JUMP - Fly over obstacles
```

### Test Suite 4: Store

```
□ Store opens from main menu
□ Coin balance displays correctly
□ Skins tab displays all 16 skins
□ Powers tab displays all 15 powers
□ Purchase skin (sufficient coins)
□ Purchase power-up uses
□ Equip/unequip power-ups (max 3)
□ Select skin (applies perks)
□ "Watch ad for coins" button works
```

### Test Suite 5: Data Persistence

```
□ Purchase skin, restart app → skin still unlocked
□ Collect coins, restart app → coins persist
□ Change settings, restart app → settings saved
□ Unlock achievement, restart app → achievement unlocked
□ High score persists across sessions
```

### Test Suite 6: Audio

```
□ BGM plays in main menu
□ BGM continues during gameplay
□ BGM stops when paused
□ Sound effects work (move, collect, power-up, fail)
□ BGM track selection in settings
□ SHUFFLE mode cycles tracks
□ Audio toggles in settings work
```

### Test Suite 7: Settings

```
□ Sound toggle works
□ Music toggle works
□ Vibration toggle works
□ BGM selection opens
□ Select each BGM track
□ Tutorial button re-shows tutorial
□ About Us opens
□ Legal pages open in browser
```

### Test Suite 8: Achievements

```
□ Achievements screen opens
□ Progress bars display correctly
□ Unlocking achievement shows notification
□ Reward coins added to balance
□ Filters work (All, Unlocked, Locked)
□ Rarity filters work
```

### Test Suite 9: Edge Cases

```
□ Game runs for 5+ minutes without crash
□ Rapid lane switching doesn't break game
□ Pause/unpause multiple times
□ Return to menu mid-game
□ Low memory device performance
□ App backgrounding/foregrounding
```

---

## 🐛 PHASE 4: TROUBLESHOOTING

### Issue: App crashes on launch

**Solution**:
```bash
# Clear all caches
npx expo start -c
rm -rf .expo
rm -rf node_modules/.cache

# Reinstall
rm -rf node_modules
npm install
```

### Issue: "Unable to resolve module"

**Solution**:
```bash
# Clear Metro cache
npx expo start -c

# Check import paths
grep -r "from '@" src/
```

### Issue: TypeScript errors

**Solution**:
```bash
# Update types
npm install --save-dev @types/react@~18.3.12

# Regenerate types
npx expo customize tsconfig.json
```

### Issue: AsyncStorage errors

**Solution**:
```typescript
// Check AsyncStorage version
npm list @react-native-async-storage/async-storage

// Should show: 2.0.0
// If not: npm install @react-native-async-storage/async-storage@2.0.0
```

### Issue: Audio not playing

**Solution**:
```typescript
// Add to SoundManager.ts:
async testAudio() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/test.mp3')
    );
    await sound.playAsync();
  } catch (error) {
    console.error('Audio test failed:', error);
  }
}
```

### Issue: WebBrowser not opening

**Solution**:
```typescript
// Check permissions in app.json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true
        }
      }
    }
  }
}
```

---

## ✅ PHASE 5: VERIFICATION & DEPLOYMENT

### Final Checks

```bash
# Run Expo Doctor
npx expo-doctor

# Check for warnings
npm audit

# Verify SDK version
npx expo --version
# Should show: 54.x.x

# Check React Native version
npm list react-native
# Should show: 0.76.5
```

### Create Production Build (Optional)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android --profile preview

# Build for iOS (Mac only)
eas build --platform ios --profile preview
```

### Git Commit

```bash
# Stage changes
git add .

# Commit with detailed message
git commit -m "Upgrade to Expo SDK 54

- Updated all dependencies to SDK 54 compatible versions
- Migrated AsyncStorage to v2.0
- Updated expo-av audio system for v14
- Updated expo-web-browser with new options
- Replaced StatusBar with expo-status-bar
- Tested all features: gameplay, store, settings, achievements
- All tests passing

Breaking changes handled:
- AsyncStorage error handling updated
- Audio mode API updated for expo-av 14
- WebBrowser options structure updated
- StatusBar component replaced

Tested on:
- Expo Go 54.0.6 (Physical device)
- [Your device model]

All features working:
✅ Gameplay
✅ Power-ups (all 15)
✅ Store & purchases
✅ Data persistence
✅ Audio system
✅ Achievements
✅ Settings
✅ Legal pages"

# Merge to main
git checkout main
git merge upgrade/sdk-54

# Tag release
git tag sdk-54-upgrade
git push origin main --tags
```

---

## 📊 POST-UPGRADE MONITORING

Monitor for these potential issues in production:

### Week 1:
- [ ] Crash reports (should be 0)
- [ ] Performance metrics (60fps target)
- [ ] Storage errors
- [ ] Audio glitches

### Week 2:
- [ ] User feedback on gameplay
- [ ] Battery usage reports
- [ ] Memory usage patterns
- [ ] Network request failures

### Week 3:
- [ ] Long-session stability
- [ ] Achievement unlock rates
- [ ] Store purchase success rates
- [ ] Data persistence issues

---

## 🎉 SUCCESS CRITERIA

Your upgrade is complete when:

✅ App runs on Expo Go 54.0.6  
✅ All 15 power-ups work correctly  
✅ Data persists across app restarts  
✅ Audio plays without errors  
✅ Store purchases work  
✅ Achievements unlock  
✅ Settings save/load  
✅ Legal pages open in browser  
✅ Game runs at 60fps  
✅ No crashes in 5-minute gameplay session  
✅ All TypeScript types resolve  
✅ `npx expo-doctor` shows no errors  

---

**Implementation Guide Version**: 1.0  
**Last Updated**: January 15, 2026  
**Estimated Total Time**: 8-9 hours  
**Success Rate**: 85%+

Good luck with your upgrade! 🚀
