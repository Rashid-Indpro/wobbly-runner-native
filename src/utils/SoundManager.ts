import { Audio } from 'expo-av';
import { BGMTrack } from '../types';

/**
 * SoundManager for React Native
 * Converted from Web Audio API to expo-av
 * 
 * Note: This version uses simple beep sounds. For production, 
 * you should add actual audio files to assets/ folder and load them.
 */

class SoundManager {
  private enabled: boolean = true;
  private musicEnabled: boolean = true;
  private currentBgm: BGMTrack = 'SHUFFLE';
  private bgmInterval: any = null;
  private currentStep: number = 0;
  private audioMode: Audio.AudioMode = {
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
  };

  // Sound objects cache
  private sounds: { [key: string]: Audio.Sound } = {};

  constructor() {
    this.init();
  }

  private async init() {
    try {
      await Audio.setAudioModeAsync(this.audioMode);
    } catch (error) {
      console.error('Error initializing audio:', error);
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

    // TODO: Add actual audio files to assets/sounds/
    // For now, skip audio playback to prevent crashes
    // Silent operation until audio files are added
    return;
  }

  async playMove() {
    if (!this.enabled) return;
    // Low frequency beep for movement
    await this.playBeep(200, 100);
  }

  async playCollect() {
    if (!this.enabled) return;
    // High frequency beep for collection
    await this.playBeep(880, 100);
  }

  async playPowerUp() {
    if (!this.enabled) return;
    // Medium frequency for power-up
    await this.playBeep(440, 500);
  }

  async playFail() {
    if (!this.enabled) return;
    // Low frequency for failure
    await this.playBeep(100, 500);
  }

  stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  startBGM() {
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
   * Call this when app is closing or unmounting
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
  }
}

export const soundManager = new SoundManager();

/**
 * TODO: For production quality audio:
 * 
 * 1. Create assets/sounds/ folder
 * 2. Add these audio files:
 *    - beep.mp3 (for UI sounds)
 *    - move.mp3
 *    - collect.mp3
 *    - powerup.mp3
 *    - fail.mp3
 * 
 * 3. Add music tracks:
 *    - arcade_level.mp3
 *    - power_pulse.mp3
 *    - neon_rush.mp3
 *    - glitch_hop.mp3
 *    - chip_chase.mp3
 *    - calm_journey.mp3
 *    - melodious_wave.mp3
 *    - suspense_plot.mp3
 * 
 * 4. Update the playBeep and playSequence methods to use actual files
 */
