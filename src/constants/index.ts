
import { PowerUpType, PowerUp, Skin, Challenge, Achievement, Rarity } from '../types';

export const POWER_UPS: Record<PowerUpType, PowerUp> = {
  [PowerUpType.SLOW_MO]: { id: 'p1', type: PowerUpType.SLOW_MO, name: 'Sluggish Time', description: 'Slows down everything!', color: '#34d399', icon: '⏱️', duration: 9000, purchasedDuration: 15000, startingPowerUsesRemaining: 0, coinPrice: 800 },
  [PowerUpType.MAGNET]: { id: 'p2', type: PowerUpType.MAGNET, name: 'Greedy Magnet', description: 'Pulls all coins nearby!', color: '#60a5fa', icon: '🧲', duration: 9000, purchasedDuration: 20000, startingPowerUsesRemaining: 0, coinPrice: 1200 },
  [PowerUpType.INVINCIBLE]: { id: 'p3', type: PowerUpType.INVINCIBLE, name: 'Wobble Bubble', description: 'Nothing can pop your vibe!', color: '#fbbf24', icon: '🛡️', duration: 9000, purchasedDuration: 18000, startingPowerUsesRemaining: 0, coinPrice: 2000 },
  [PowerUpType.MULTIPLIER]: { id: 'p4', type: PowerUpType.MULTIPLIER, name: 'Score Rocket', description: 'Double points for double fun!', color: '#f472b6', icon: '🚀', duration: 9000, purchasedDuration: 30000, startingPowerUsesRemaining: 0, coinPrice: 1500 },
  [PowerUpType.TIME_FREEZE]: { id: 'p5', type: PowerUpType.TIME_FREEZE, name: 'Ice Chill', description: 'Freeze obstacles!', color: '#2dd4bf', icon: '❄️', duration: 9000, purchasedDuration: 15000, startingPowerUsesRemaining: 0, coinPrice: 1800 },
  [PowerUpType.CHAOS]: { id: 'p6', type: PowerUpType.CHAOS, name: 'Disco Panic', description: 'Crazy colors and speed!', color: '#a78bfa', icon: '🕺', duration: 9000, purchasedDuration: 25000, startingPowerUsesRemaining: 0, coinPrice: 1000 },
  [PowerUpType.RUBBER]: { id: 'p7', type: PowerUpType.RUBBER, name: 'Bouncy Shoes', description: 'Bounce over obstacles!', color: '#fb7185', icon: '👟', duration: 9000, purchasedDuration: 25000, startingPowerUsesRemaining: 0, coinPrice: 1100 },
  [PowerUpType.TINY]: { id: 'p8', type: PowerUpType.TINY, name: 'Mini Me', description: 'Shrink down to slip away!', color: '#9ca3af', icon: '🤏', duration: 9000, purchasedDuration: 40000, startingPowerUsesRemaining: 0, coinPrice: 900 },
  [PowerUpType.GIANT]: { id: 'p9', type: PowerUpType.GIANT, name: 'Big Boi', description: 'Stomp through obstacles!', color: '#ea580c', icon: '🦍', duration: 9000, purchasedDuration: 20000, startingPowerUsesRemaining: 0, coinPrice: 2500 },
  [PowerUpType.SCREEN_FLIP]: { id: 'p10', type: PowerUpType.SCREEN_FLIP, name: 'Upside Down', description: 'Classic prank! (Score 3x)', color: '#4ade80', icon: '🙃', duration: 9000, purchasedDuration: 55000, startingPowerUsesRemaining: 0, coinPrice: 1400 },
  [PowerUpType.SONIC_DASH]: { id: 'p11', type: PowerUpType.SONIC_DASH, name: 'Sonic Blur', description: 'Extreme speed burst!', color: '#3b82f6', icon: '💨', duration: 9000, purchasedDuration: 15000, startingPowerUsesRemaining: 0, coinPrice: 1600 },
  [PowerUpType.COIN_RAIN]: { id: 'p12', type: PowerUpType.COIN_RAIN, name: 'Gold Rush', description: 'Double value on all coins!', color: '#facc15', icon: '⛈️', duration: 9000, purchasedDuration: 35000, startingPowerUsesRemaining: 0, coinPrice: 3000 },
  [PowerUpType.GHOST_WALK]: { id: 'p13', type: PowerUpType.GHOST_WALK, name: 'Ethereal Soul', description: 'Phase through everything!', color: '#e2e8f0', icon: '👻', duration: 9000, purchasedDuration: 22000, startingPowerUsesRemaining: 0, coinPrice: 4000 },
  [PowerUpType.SHIELD_BURST]: { id: 'p14', type: PowerUpType.SHIELD_BURST, name: 'Nova Blast', description: 'Destroy nearby obstacles!', color: '#ef4444', icon: '💥', duration: 9000, purchasedDuration: 15000, startingPowerUsesRemaining: 0, coinPrice: 3500 },
  [PowerUpType.SUPER_JUMP]: { id: 'p15', type: PowerUpType.SUPER_JUMP, name: 'Sky Leaper', description: 'Fly high over the mess!', color: '#8b5cf6', icon: '🦘', duration: 9000, purchasedDuration: 25000, startingPowerUsesRemaining: 0, coinPrice: 1300 }
};

export const SKINS: Skin[] = [
  { id: 's1', name: 'Classic Bloop', price: 0, icon: '🤪', color: '#fde047', isUnlocked: true, rarity: 'COMMON', previewAnimation: 'FLOAT', perks: { scoreMult: 1, coinMult: 1, magnetRangeBonus: 0, speedReduction: 0, invincibilityBonus: 0 } },
  { id: 's2', name: 'Cool Cat', price: 2500, icon: '😎', color: '#60a5fa', isUnlocked: false, rarity: 'RARE', previewAnimation: 'PULSE', perks: { scoreMult: 1.1, coinMult: 1.2, magnetRangeBonus: 30, speedReduction: 0, invincibilityBonus: 1000 } },
  { id: 's3', name: 'Grumpy Bear', price: 7500, icon: '🐻', color: '#fb7185', isUnlocked: false, rarity: 'RARE', previewAnimation: 'PULSE', perks: { scoreMult: 1, coinMult: 1.5, magnetRangeBonus: 0, speedReduction: 0.05, invincibilityBonus: 0 } },
  { id: 's12', name: 'Zombie Blob', price: 12500, icon: '🧟', color: '#84cc16', isUnlocked: false, rarity: 'RARE', previewAnimation: 'JITTER', perks: { scoreMult: 1.2, coinMult: 1.5, magnetRangeBonus: 20, speedReduction: 0.08, invincibilityBonus: 500 } },
  { id: 's4', name: 'Robo Runner', price: 25000, icon: '🤖', color: '#94a3b8', isUnlocked: false, rarity: 'EPIC', previewAnimation: 'GLITCH', perks: { scoreMult: 1.5, coinMult: 1.5, magnetRangeBonus: 60, speedReduction: 0, invincibilityBonus: 2000 } },
  { id: 's13', name: 'Pirate Bloop', price: 45000, icon: '🏴‍☠️', color: '#78350f', isUnlocked: false, rarity: 'EPIC', previewAnimation: 'FLOAT', perks: { scoreMult: 1.6, coinMult: 2.0, magnetRangeBonus: 40, speedReduction: 0.02, invincibilityBonus: 1000 } },
  { id: 's5', name: 'Ninja Blob', price: 120000, icon: '🥷', color: '#18181b', isUnlocked: false, rarity: 'EPIC', previewAnimation: 'JITTER', perks: { scoreMult: 1.2, coinMult: 2.0, magnetRangeBonus: 0, speedReduction: 0.1, invincibilityBonus: 0 } },
  { id: 's14', name: 'Alien Scout', price: 250000, icon: '👽', color: '#22c55e', isUnlocked: false, rarity: 'EPIC', previewAnimation: 'PULSE', perks: { scoreMult: 1.8, coinMult: 1.8, magnetRangeBonus: 100, speedReduction: 0, invincibilityBonus: 1500 } },
  { id: 's6', name: 'Ghosty', price: 600000, icon: '👻', color: '#f8fafc', isUnlocked: false, rarity: 'LEGENDARY', previewAnimation: 'FLOAT', perks: { scoreMult: 2.0, coinMult: 2.5, magnetRangeBonus: 100, speedReduction: 0.05, invincibilityBonus: 4000 } },
  { id: 's15', name: 'Super Hero', price: 1500000, icon: '🦸', color: '#3b82f6', isUnlocked: false, rarity: 'LEGENDARY', previewAnimation: 'PULSE', perks: { scoreMult: 2.5, coinMult: 2.0, magnetRangeBonus: 80, speedReduction: 0, invincibilityBonus: 5000 } },
  { id: 's7', name: 'Fire Sprite', price: 4000000, icon: '🔥', color: '#ef4444', isUnlocked: false, rarity: 'LEGENDARY', previewAnimation: 'PULSE', perks: { scoreMult: 3.5, coinMult: 2.5, magnetRangeBonus: 0, speedReduction: -0.15, invincibilityBonus: 0 } },
  { id: 's8', name: 'Cyber Glitch', price: 10000000, icon: '👾', color: '#a855f7', isUnlocked: false, rarity: 'MYTHIC', previewAnimation: 'GLITCH', perks: { scoreMult: 5.0, coinMult: 5.0, magnetRangeBonus: 200, speedReduction: 0, invincibilityBonus: 6000 } },
  { id: 's11', name: 'Diamond Sparkle', price: 25000000, icon: '💎', color: '#38bdf8', isUnlocked: false, rarity: 'MYTHIC', previewAnimation: 'PULSE', perks: { scoreMult: 6.0, coinMult: 8.0, magnetRangeBonus: 250, speedReduction: 0, invincibilityBonus: 7000 } },
  { id: 's9', name: 'Golden Idol', price: 60000000, icon: '👑', color: '#fbbf24', isUnlocked: false, rarity: 'MYTHIC', previewAnimation: 'SPIN', perks: { scoreMult: 8.0, coinMult: 15.0, magnetRangeBonus: 350, speedReduction: 0.1, invincibilityBonus: 10000 } },
  { id: 's10', name: 'Cosmic Void', price: 150000000, icon: '🌌', color: '#4f46e5', isUnlocked: false, rarity: 'MYTHIC', previewAnimation: 'FLOAT', perks: { scoreMult: 15.0, coinMult: 30.0, magnetRangeBonus: 800, speedReduction: 0.2, invincibilityBonus: 20000 } },
  { id: 's16', name: 'Chaos King', price: 500000000, icon: '👹', color: '#000000', isUnlocked: false, rarity: 'MYTHIC', previewAnimation: 'GLITCH', perks: { scoreMult: 50.0, coinMult: 100.0, magnetRangeBonus: 1500, speedReduction: 0.3, invincibilityBonus: 50000 } }
];

const generateAchievements = (): Achievement[] => {
  const awards: Achievement[] = [];
  
  // 1. GENESIS
  awards.push({
    id: 'genesis_0',
    title: 'The Genesis',
    description: 'Welcome to Chaos. Your journey as a runner has officially begun.',
    icon: '🧬',
    isUnlocked: false,
    progress: 0,
    goal: 1,
    rewardCoins: 500,
    rarity: 'COMMON'
  });

  // 2. SCORE MILESTONES (40 Awards)
  for (let i = 1; i <= 40; i++) {
    const score = i <= 20 ? i * 5000 : 100000 + (i - 20) * 2500000;
    let rarity: Rarity = 'COMMON';
    if (i > 10) rarity = 'RARE';
    if (i > 20) rarity = 'EPIC';
    if (i > 30) rarity = 'LEGENDARY';
    if (i > 38) rarity = 'MYTHIC';

    awards.push({
      id: `score_${i}`,
      title: `Prestige Tier ${i}`,
      description: `Prove your survival skills by reaching ${score.toLocaleString()} points.`,
      icon: i > 30 ? '👑' : (i > 20 ? '🥈' : '🥉'),
      isUnlocked: false,
      progress: 0,
      goal: score,
      rewardCoins: 100 * i,
      rarity
    });
  }

  // 3. COIN MILESTONES (20 Awards)
  for (let i = 1; i <= 20; i++) {
    const coinGoal = i * 25000 * i;
    let rarity: Rarity = 'RARE';
    if (i > 10) rarity = 'EPIC';
    if (i > 15) rarity = 'LEGENDARY';
    if (i === 20) rarity = 'MYTHIC';

    awards.push({
      id: `coin_${i}`,
      title: `Treasurer Level ${i}`,
      description: `Amass a massive fortune of ${coinGoal.toLocaleString()} coins.`,
      icon: '💰',
      isUnlocked: false,
      progress: 0,
      goal: coinGoal,
      rewardCoins: 500 * i,
      rarity
    });
  }

  // 4. POWER-UP SPECIALISTS (15 Awards)
  const powerTypes = Object.values(PowerUpType);
  powerTypes.forEach((p) => {
    awards.push({
      id: `spec_${p}`,
      title: `${p.replace('_', ' ')} Master`,
      description: `Collect the ${p} power-up 50 times in-game.`,
      icon: '🧪',
      isUnlocked: false,
      progress: 0,
      goal: 50,
      rewardCoins: 1000,
      rarity: 'EPIC'
    });
  });

  // 5. MEME & SKILL CHALLENGES (24 Awards)
  const memes = [
    { t: "Skill Issue", d: "Die 50 times total.", i: "🤡", g: 50, r: 'COMMON' },
    { t: "Touch Grass", d: "Play for a total of 1 hour.", i: "🌱", g: 3600, r: 'LEGENDARY' },
    { t: "Aura +1000", d: "Near miss 100 obstacles in one run.", i: "✨", g: 100, r: 'EPIC' },
    { t: "Sigma Slide", d: "Lane switch 10,000 times total.", i: "🗿", g: 10000, r: 'RARE' },
    { t: "No Cap", d: "Unlock 10 premium skins.", i: "🧢", g: 10, r: 'MYTHIC' },
    { t: "Main Character", d: "Survive 5 minutes without power-ups.", i: "🎬", g: 300, r: 'LEGENDARY' },
    { t: "Rizz Lord", d: "Collect 5,000 coins in a single run.", i: "🕺", g: 5000, r: 'EPIC' },
    { t: "Stay Toxic", d: "Hit 500 obstacles while invincible.", i: "☣️", g: 500, r: 'RARE' },
    { t: "Brain Rot", d: "Play 100 games total.", i: "🧠", g: 100, r: 'COMMON' },
    { t: "Clutch God", d: "Revive and gain 10,000 more points.", i: "🧤", g: 10000, r: 'EPIC' },
    { t: "He Is Him", d: "Reach 50,000 points without a skin equipped.", i: "🔥", g: 50000, r: 'MYTHIC' },
    { t: "Giga Chad", d: "Jump over 500 obstacles using Super Jump.", i: "🏋️", g: 500, r: 'EPIC' },
    { t: "Speed Runner", d: "Reach 10,000 points in under 60 seconds.", i: "⏱️", g: 1, r: 'LEGENDARY' },
    { t: "Big Brain", d: "Avoid 50 obstacles during Time Freeze.", i: "🧩", g: 50, r: 'RARE' },
    { t: "Chaos Enjoyer", d: "Play 10 consecutive games.", i: "🌀", g: 10, r: 'COMMON' },
    { t: "Magnet Maniac", d: "Pull 1,000 coins with Magnet.", i: "🧲", g: 1000, r: 'RARE' },
    { t: "Rubber Soul", d: "Bounce 100 times in one life.", i: "🎾", g: 100, r: 'EPIC' },
    { t: "Ghost Host", d: "Phase through 50 walls.", i: "🏚️", g: 50, r: 'LEGENDARY' },
    { t: "Shield Hero", d: "Block 10 deaths in one run.", i: "🔰", g: 10, r: 'MYTHIC' },
    { t: "Coin Rain King", d: "Collect 2,000 coins during a rain.", i: "☔", g: 2000, r: 'LEGENDARY' },
    { t: "Mini Marvel", d: "Survive 30s while Tiny.", i: "🐜", g: 30, r: 'RARE' },
    { t: "Giant Gulp", d: "Stomp 100 obstacles while Giant.", i: "🦖", g: 100, r: 'EPIC' },
    { t: "Flip Master", d: "Play 2 minutes upside down.", i: "🤸", g: 120, r: 'MYTHIC' },
    { t: "True Legend", d: "Complete all daily challenges.", i: "🌟", g: 1, r: 'LEGENDARY' }
  ];

  memes.forEach((m, idx) => {
    awards.push({
      id: `meme_${idx}`,
      title: m.t,
      description: m.d,
      icon: m.i,
      isUnlocked: false,
      progress: 0,
      goal: m.g,
      rewardCoins: 2000,
      rarity: m.r as Rarity
    });
  });

  return awards;
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = generateAchievements();

export const DAILY_CHALLENGES: Challenge[] = [
  { id: 'c1', description: 'Collect 100 coins', goal: 100, progress: 0, reward: 200, isCompleted: false, type: 'COINS' },
  { id: 'c2', description: 'Reach 5000 points', goal: 5000, progress: 0, reward: 500, isCompleted: false, type: 'SCORE' },
  { id: 'c3', description: 'Use 5 power-ups', goal: 5, progress: 0, reward: 300, isCompleted: false, type: 'POWERUPS' }
];

export const INITIAL_SPEED = 5;
export const SPEED_INCREMENT_FACTOR = 0.0006; 
export const SPAWN_RATE = 1400; 
export const COIN_VALUE = 10;
