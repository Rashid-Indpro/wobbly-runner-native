
export type GameState = 'ALPINE_INTRO' | 'SPLASH' | 'MAIN_MENU' | 'PLAYING' | 'STORE' | 'SETTINGS' | 'GAME_OVER' | 'AD_WATCHING' | 'TUTORIAL' | 'ACHIEVEMENTS' | 'CONSENT' | 'ABOUT_US' | 'LEGAL_PRIVACY' | 'LEGAL_TERMS' | 'LEGAL_ABOUT' | 'LEGAL_CONTACT';

export type LegalPageType = 'PRIVACY' | 'TERMS' | 'ABOUT' | 'CONTACT';

export enum PowerUpType {
  SLOW_MO = 'SLOW_MO',
  MAGNET = 'MAGNET',
  INVINCIBLE = 'INVINCIBLE',
  MULTIPLIER = 'MULTIPLIER',
  TIME_FREEZE = 'TIME_FREEZE',
  CHAOS = 'CHAOS',
  RUBBER = 'RUBBER',
  TINY = 'TINY',
  GIANT = 'GIANT',
  SCREEN_FLIP = 'SCREEN_FLIP',
  SONIC_DASH = 'SONIC_DASH',
  COIN_RAIN = 'COIN_RAIN',
  GHOST_WALK = 'GHOST_WALK',
  SHIELD_BURST = 'SHIELD_BURST',
  SUPER_JUMP = 'SUPER_JUMP'
}

export type BGMTrack = 
  | 'SHUFFLE' 
  | 'CALM_JOURNEY'
  | 'MELODIOUS_WAVE'
  | 'SUSPENSE_PLOT'
  | 'ARCADE_LEVEL'
  | 'POWER_PULSE'
  | 'NEON_RUSH'
  | 'GLITCH_HOP'
  | 'CHIP_CHASE';

export interface PowerUp {
  id: string;
  type: PowerUpType;
  name: string;
  description: string;
  color: string;
  icon: string;
  duration: number; // Base duration for in-game pickups (9s)
  purchasedDuration: number; // Enhanced duration for purchased uses (15s - 55s)
  startingPowerUsesRemaining: number;
  coinPrice?: number;
}

export type ObstacleBehavior = 'STATIONARY' | 'SINE_WAVE' | 'LANE_SWITCH' | 'TELEPORT';

export interface Obstacle {
  id: string;
  x: number;
  y: number;
  baseX: number;
  width: number;
  height: number;
  type: 'BANANA' | 'RAKE' | 'PIE' | 'CHICKEN' | 'CACTUS' | 'GHOST' | 'FIRE' | 'CRAB' | 'ALIEN' | 'ANVIL' | 'TORNADO' | 'UFO' | 'CAR' | 'SAW' | 'BOMB' | 'TNT' | 'SPIKES' | 'LAVA' | 'LASER';
  speed: number;
  behavior: ObstacleBehavior;
  lane: number;
  rotation: number;
}

export interface Collectible {
  id: string;
  x: number;
  y: number;
  type: 'COIN' | 'POWER_UP' | 'GEM';
  powerType?: PowerUpType;
}

export interface SkinPerks {
  scoreMult: number;
  coinMult: number;
  magnetRangeBonus: number;
  speedReduction: number; 
  invincibilityBonus: number; 
}

export type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC';

export interface Skin {
  id: string;
  name: string;
  price: number;
  icon: string;
  color: string;
  rarity: Rarity;
  isUnlocked: boolean;
  perks: SkinPerks;
  previewAnimation: 'FLOAT' | 'PULSE' | 'JITTER' | 'SPIN' | 'GLITCH';
  milestoneScore?: number;
  milestoneCoins?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  goal: number;
  rewardCoins: number;
  rarity: Rarity;
}

export interface Challenge {
  id: string;
  description: string;
  goal: number;
  progress: number;
  reward: number;
  isCompleted: boolean;
  type: 'SCORE' | 'COINS' | 'POWERUPS' | 'SURVIVAL';
}

export interface RunStats {
  score: number;
  coins: number;
  powerUpsUsed: number;
  distanceTraveled: number;
}

export interface Settings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  hasSeenTutorial: boolean;
  hasConsented: boolean;
  selectedBGM: BGMTrack;
  equippedPowerIds: string[];
}
