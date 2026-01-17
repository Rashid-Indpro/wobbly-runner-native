import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { BGMTrack } from '../types';

/**
 * SoundManager for React Native (SDK 54 Compatible)
 * Updated for expo-av 14.x API changes
 */

class SoundManager {
  private enabled: boolean = true;
  private backgroundAudioEnabled: boolean = true;
  private backgroundAudioSound: Audio.Sound | null = null;
  private isBackgroundPlaying: boolean = false;
  
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

  async setBackgroundAudioEnabled(enabled: boolean) {
    this.backgroundAudioEnabled = enabled;
    if (!enabled) {
      await this.stopBackgroundAudio();
    } else {
      await this.playBackgroundAudio();
    }
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
   * Play background audio (single looping file)
   */
  async playBackgroundAudio() {
    if (!this.backgroundAudioEnabled || this.isBackgroundPlaying) return;
    
    // Set flag IMMEDIATELY to prevent race conditions with concurrent calls
    this.isBackgroundPlaying = true;
    
    await this.ensureInitialized();
    
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/background.mp3'),
        { isLooping: true, shouldPlay: true, volume: 1.0 }
      );
      this.backgroundAudioSound = sound;
      console.log('🎵 Background audio started');
    } catch (error) {
      console.log('⏳ Background audio file not found - add background.mp3 to assets/sounds/');
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
   * Clean up all audio resources
   * SDK 54 requires proper cleanup
   */
  async cleanup() {
    await this.stopBackgroundAudio();
    
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
