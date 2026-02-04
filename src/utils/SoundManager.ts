import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { BGMTrack } from '../types';

/**
 * SoundManager for React Native (SDK 54 Compatible)
 * Updated for expo-av 14.x API changes
 */

class SoundManager {
  private enabled: boolean = true;
  private backgroundAudioEnabled: boolean = true;
  private menuBgmEnabled: boolean = true;
  private backgroundAudioSound: Audio.Sound | null = null;
  private menuBgmSound: Audio.Sound | null = null;
  private isBackgroundPlaying: boolean = false;
  private isMenuBgmPlaying: boolean = false;
  
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

  setBackgroundAudioEnabled(enabled: boolean) {
    this.backgroundAudioEnabled = enabled;
    
    // Immediately stop music if disabled
    if (!enabled && this.isBackgroundPlaying) {
      this.stopBackgroundAudio();
    }
  }

  getBackgroundAudioEnabled(): boolean {
    return this.backgroundAudioEnabled;
  }

  setMenuBgmEnabled(enabled: boolean) {
    this.menuBgmEnabled = enabled;
    
    if (!enabled && this.isMenuBgmPlaying) {
      // Immediately stop menu BGM if disabled
      this.stopMenuBgm();
    } else if (enabled && !this.isMenuBgmPlaying && this.menuBgmSound) {
      // Only start if already preloaded (means we're past intro)
      this.playMenuBgm();
    }
  }

  getMenuBgmEnabled(): boolean {
    return this.menuBgmEnabled;
  }

  /**
   * Play a sound effect from file
   */
  private async playSound(soundKey: string, fileName: string) {
    if (!this.enabled) return;
    await this.ensureInitialized();
    
    try {
      // Check if sound is already cached
      if (!this.sounds[soundKey]) {
        const { sound } = await Audio.Sound.createAsync(
          fileName as any,
          { shouldPlay: false }
        );
        this.sounds[soundKey] = sound;
      }
      
      // Play the sound
      await this.sounds[soundKey].replayAsync();
    } catch (error) {
      // Silently fail if audio file doesn't exist
      // console.log(`Audio file not found: ${soundKey}`);
    }
  }

  async playMove() {
    await this.playSound('move', require('../assets/sounds/move.mp3'));
  }

  async playCollect() {
    await this.playSound('collect', require('../assets/sounds/collect.mp3'));
  }

  async playPowerUp() {
    await this.playSound('powerup', require('../assets/sounds/powerup.mp3'));
  }

  async playFail() {
    await this.playSound('fail', require('../assets/sounds/fail.mp3'));
  }

  /**
   * Preload background audio without playing
   * Uses Android raw resource to avoid expo-asset downloadAsync issues in production
   */
  async preloadBackgroundAudio() {
    console.log('🎵 [BGM] preloadBackgroundAudio called');
    console.log('🎵 [BGM] backgroundAudioSound exists?', !!this.backgroundAudioSound);
    console.log('🎵 [BGM] backgroundAudioEnabled?', this.backgroundAudioEnabled);
    
    if (this.backgroundAudioSound || !this.backgroundAudioEnabled) return;
    
    await this.ensureInitialized();
    
    try {
      console.log('🎵 [BGM] Loading background audio from Android raw resource...');
      // Use Android raw resource URI to bypass expo-asset downloadAsync
      // File must be at: android/app/src/main/res/raw/background.mp3
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'android.resource://com.wobblyrunner.app/raw/background' },
        { isLooping: true, shouldPlay: false, volume: 0.25 }
      );
      this.backgroundAudioSound = sound;
      console.log('✅ [BGM] Background audio preloaded successfully!');
    } catch (error) {
      console.error('❌ [BGM] Background audio preload FAILED');
      console.error('❌ [BGM] Error:', error);
      console.error('❌ [BGM] Error message:', error?.message);
      console.error('❌ [BGM] Error name:', error?.name);
    }
  }

  /**
   * Preload menu BGM without playing
   * Uses Android raw resource to avoid expo-asset downloadAsync issues in production
   */
  async preloadMenuBgm() {
    console.log('🎵 [MENU-BGM] preloadMenuBgm called');
    console.log('🎵 [MENU-BGM] menuBgmSound exists?', !!this.menuBgmSound);
    console.log('🎵 [MENU-BGM] menuBgmEnabled?', this.menuBgmEnabled);
    
    if (this.menuBgmSound || !this.menuBgmEnabled) return;
    
    await this.ensureInitialized();
    
    try {
      console.log('🎵 [MENU-BGM] Loading menu BGM from Android raw resource...');
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'android.resource://com.wobblyrunner.app/raw/menubgm' },
        { isLooping: true, shouldPlay: false, volume: 0.25 }
      );
      this.menuBgmSound = sound;
      console.log('✅ [MENU-BGM] Menu BGM preloaded successfully!');
    } catch (error) {
      console.error('❌ [MENU-BGM] Menu BGM preload FAILED');
      console.error('❌ [MENU-BGM] Error:', error);
      console.error('❌ [MENU-BGM] Error message:', error?.message);
    }
  }

  /**
   * Play background audio (single looping file)
   */
  async playBackgroundAudio() {
    if (!this.backgroundAudioEnabled) {
      console.log('🔇 Background audio disabled in settings');
      return;
    }
    
    if (this.isBackgroundPlaying) {
      console.log('🎵 [BGM-PLAY] Background audio already playing');
      return;
    }
    
    // Set flag IMMEDIATELY to prevent race conditions with concurrent calls
    this.isBackgroundPlaying = true;
    
    await this.ensureInitialized();
    
    try {
      // If already preloaded, just play it
      if (this.backgroundAudioSound) {
        console.log('🎵 [BGM-PLAY] Playing preloaded background audio...');
        const status = await this.backgroundAudioSound.getStatusAsync();
        console.log('🎵 [BGM-PLAY] Current status:', JSON.stringify(status));
        await this.backgroundAudioSound.playAsync();
        console.log('✅ [BGM-PLAY] Background audio started (preloaded)');
      } else {
        // Otherwise load and play - use Android raw resource
        console.log('🎵 [BGM-PLAY] Loading and playing background audio from raw resource...');
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'android.resource://com.wobblyrunner.app/raw/background' },
          { isLooping: true, shouldPlay: true, volume: 0.25 }
        );
        this.backgroundAudioSound = sound;
        console.log('✅ [BGM-PLAY] Background audio started (loaded fresh)');
      }
    } catch (error) {
      console.error('❌ [BGM-PLAY] Background audio play FAILED');
      console.error('❌ [BGM-PLAY] Error:', error);
      console.error('❌ [BGM-PLAY] Error message:', error?.message);
      console.error('❌ [BGM-PLAY] Error name:', error?.name);
      console.error('❌ [BGM-PLAY] Error stack:', error?.stack);
      this.isBackgroundPlaying = false;
      this.backgroundAudioSound = null;
    }
  }

  /**
   * Stop background audio
   */
  async stopBackgroundAudio() {
    // Set flag immediately to prevent new playback attempts
    this.isBackgroundPlaying = false;
    
    if (this.backgroundAudioSound) {
      const soundToStop = this.backgroundAudioSound;
      this.backgroundAudioSound = null; // Clear reference immediately
      
      try {
        // Check if sound is actually loaded before attempting to stop
        const status = await soundToStop.getStatusAsync();
        if (status.isLoaded) {
          await soundToStop.stopAsync();
          await soundToStop.unloadAsync();
        }
      } catch (error) {
        // Silently handle - sound may already be unloaded
      }
    }
    console.log('🔇 Background audio stopped');
  }

  /**
   * Play menu BGM (looping)
   */
  async playMenuBgm() {
    if (!this.menuBgmEnabled) {
      console.log('🔇 [MENU-BGM] Menu BGM disabled in settings');
      return;
    }
    
    if (this.isMenuBgmPlaying) {
      console.log('🎵 [MENU-BGM] Menu BGM already playing');
      return;
    }
    
    this.isMenuBgmPlaying = true;
    await this.ensureInitialized();
    
    try {
      if (this.menuBgmSound) {
        console.log('🎵 [MENU-BGM] Playing preloaded menu BGM...');
        await this.menuBgmSound.playAsync();
        console.log('✅ [MENU-BGM] Menu BGM started');
      } else {
        console.log('🎵 [MENU-BGM] Loading and playing menu BGM...');
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'android.resource://com.wobblyrunner.app/raw/menubgm' },
          { isLooping: true, shouldPlay: true, volume: 0.25 }
        );
        this.menuBgmSound = sound;
        console.log('✅ [MENU-BGM] Menu BGM started (loaded fresh)');
      }
    } catch (error) {
      console.error('❌ [MENU-BGM] Menu BGM play FAILED');
      console.error('❌ [MENU-BGM] Error:', error);
      this.isMenuBgmPlaying = false;
      this.menuBgmSound = null;
    }
  }

  /**
   * Stop menu BGM
   */
  async stopMenuBgm() {
    this.isMenuBgmPlaying = false;
    
    if (this.menuBgmSound) {
      try {
        console.log('🔇 [MENU-BGM] Stopping menu BGM...');
        await this.menuBgmSound.stopAsync();
        console.log('✅ [MENU-BGM] Menu BGM stopped');
      } catch (error) {
        console.error('❌ [MENU-BGM] Error stopping menu BGM:', error);
      }
    }
  }

  /**
   * Resume menu BGM (after gameplay)
   */
  async resumeMenuBgm() {
    if (!this.menuBgmEnabled) return;
    
    console.log('🎵 [MENU-BGM] Resuming menu BGM...');
    await this.playMenuBgm();
  }

  /**
   * Clean up all audio resources
   * SDK 54 requires proper cleanup
   */
  async cleanup() {
    await this.stopBackgroundAudio();
    await this.stopMenuBgm();
    
    // Unload menu BGM
    if (this.menuBgmSound) {
      try {
        await this.menuBgmSound.unloadAsync();
        this.menuBgmSound = null;
      } catch (error) {
        console.error('Error unloading menu BGM:', error);
      }
    }
    
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

/**
 * TODO: For production quality audio:
 * 
 * 1. Create src/assets/sounds/ folder
 * 2. Add these audio files:
 *    - background.mp3 (looping background music)
 *    - move.mp3 (optional: lane switch sound)
 *    - collect.mp3 (optional: coin/gem pickup sound)
 *    - powerup.mp3 (optional: power-up activation sound)
 *    - fail.mp3 (optional: game over sound)
 * 
 * 3. Uncomment the Audio.Sound.createAsync() call in playBackgroundAudio()
 * 4. Update playBeep() calls to use actual audio files if needed
 */
