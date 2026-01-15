import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Vibration, Animated } from 'react-native';
import { Settings, PowerUp, PowerUpType, Obstacle, Collectible, Skin, ObstacleBehavior } from '../types';
import { POWER_UPS, INITIAL_SPEED, SPAWN_RATE, COIN_VALUE } from '../constants';
import UIOverlay from './UIOverlay';
import GameOver from './GameOver';
import { soundManager } from '../utils/SoundManager';

// Polyfill for React Native compatibility
// React Native doesn't have requestAnimationFrame/cancelAnimationFrame/performance in global scope
if (typeof requestAnimationFrame === 'undefined') {
  (global as any).requestAnimationFrame = (callback: (time: number) => void) => {
    return setTimeout(() => callback(Date.now()), 1000 / 50) as unknown as number; // 50fps for smoother mobile
  };
}

if (typeof cancelAnimationFrame === 'undefined') {
  (global as any).cancelAnimationFrame = (id: number) => {
    clearTimeout(id as unknown as NodeJS.Timeout);
  };
}

if (typeof performance === 'undefined') {
  (global as any).performance = {
    now: () => Date.now(),
  };
}

interface GameContainerProps {
  settings: Settings;
  activeSkin: Skin;
  onGameOver: (score: number, coins: number, powerUpsUsed: number, action: 'RETRY' | 'MENU') => void;
  equippedPowers: PowerUp[];
  ownedPowerUses: Record<string, number>;
  onUsePower: (id: string) => void;
  onRequestRevive: () => void;
  onExit: () => void;
  isExternalAdShowing?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameContainer: React.FC<GameContainerProps> = ({ 
  settings, 
  activeSkin, 
  onGameOver, 
  equippedPowers, 
  ownedPowerUses, 
  onUsePower, 
  onRequestRevive, 
  onExit, 
  isExternalAdShowing = false
}) => {
  const [score, setScore] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [activePower, setActivePower] = useState<{type: PowerUpType, expiry: number, start: number} | null>(null);
  const [reviveCount, setReviveCount] = useState(0);
  const [, forceUpdate] = useState(0);
  
  // Character effect animations
  const collectEffectScale = useRef(new Animated.Value(1)).current;
  const collectEffectGlow = useRef(new Animated.Value(0)).current;
  const collectEffectRotation = useRef(new Animated.Value(0)).current;
  
  const gameStateRef = useRef({
    player: { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT - 150, targetX: SCREEN_WIDTH / 2, lane: 1, width: 40, height: 40, wobble: 0 },
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
    speed: INITIAL_SPEED,
    lastSpawn: 0,
    score: 0,
    coins: 0,
    powerUpsUsed: 0,
    frame: 0,
    gameOver: false,
    canvasWidth: SCREEN_WIDTH,
    canvasHeight: SCREEN_HEIGHT
  });

  const animationFrameRef = useRef<number | null>(null);
  const wasAdShowingRef = useRef(false);

  const getLaneX = (lane: number, canvasWidth: number) => (canvasWidth / 3) * lane + (canvasWidth / 3) / 2;

  // Trigger joyful collection effect
  const triggerCollectEffect = (type: 'COIN' | 'GEM' | 'POWER_UP') => {
    // Reset all animations to initial state
    collectEffectScale.setValue(1);
    collectEffectGlow.setValue(0);
    collectEffectRotation.setValue(0);

    // Different effect intensity based on collectible type
    const scaleTarget = type === 'GEM' ? 1.35 : type === 'POWER_UP' ? 1.4 : 1.25;
    const glowTarget = type === 'GEM' ? 0.8 : type === 'POWER_UP' ? 1 : 0.6;
    const rotationTarget = type === 'POWER_UP' ? 0.2 : 0.1;

    // Parallel animations for smooth, satisfying effect
    // Using useNativeDriver: false for all to support shadow effects
    Animated.parallel([
      // Scale bounce: quick up, smooth down
      Animated.sequence([
        Animated.spring(collectEffectScale, {
          toValue: scaleTarget,
          tension: 180,
          friction: 8,
          useNativeDriver: false,
        }),
        Animated.spring(collectEffectScale, {
          toValue: 1,
          tension: 120,
          friction: 10,
          useNativeDriver: false,
        }),
      ]),
      // Glow effect
      Animated.sequence([
        Animated.timing(collectEffectGlow, {
          toValue: glowTarget,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(collectEffectGlow, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
      // Subtle rotation wobble
      Animated.sequence([
        Animated.timing(collectEffectRotation, {
          toValue: rotationTarget,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(collectEffectRotation, {
          toValue: -rotationTarget,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(collectEffectRotation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  const getSpeedMultiplier = (internalScore: number) => {
    const s = Math.floor(internalScore / 10);
    const skinReduc = activeSkin.perks.speedReduction;
    return (1.0 + Math.pow(s / 800, 0.85)) * (1.0 - skinReduc);
  };

  // Revive effect
  useEffect(() => {
    if (wasAdShowingRef.current && !isExternalAdShowing && gameStateRef.current.gameOver) {
      gameStateRef.current.gameOver = false;
      setShowGameOver(false);
      gameStateRef.current.obstacles = gameStateRef.current.obstacles.filter(
        o => Math.abs(o.y - gameStateRef.current.player.y) > 300
      );
      setActivePower({ type: PowerUpType.INVINCIBLE, start: Date.now(), expiry: Date.now() + 3000 });
      soundManager.playBackgroundAudio();
    }
    wasAdShowingRef.current = isExternalAdShowing;
  }, [isExternalAdShowing]);

  // Music management
  useEffect(() => {
    if (isExternalAdShowing) soundManager.stopBackgroundAudio();
    else if (!isPaused && !showGameOver) soundManager.playBackgroundAudio();
  }, [isExternalAdShowing, isPaused, showGameOver]);

  // Game loop
  useEffect(() => {
    const spawn = (time: number) => {
      const state = gameStateRef.current;
      const speedMult = getSpeedMultiplier(state.score);
      const difficultyFactor = 1 + (speedMult - 1) * 0.7; 
      const currentSpawnInterval = SPAWN_RATE / difficultyFactor;

      if (time - state.lastSpawn > currentSpawnInterval) {
        const scoreVal = Math.floor(state.score / 10);
        let maxObstacles = 1;
        if (scoreVal > 1500) maxObstacles = Math.random() > 0.5 ? 2 : 1;
        if (scoreVal > 4000) maxObstacles = Math.random() > 0.3 ? 2 : 1;
        if (scoreVal > 8000) maxObstacles = Math.random() > 0.85 ? 3 : 2;

        const lanes = [0, 1, 2].sort(() => Math.random() - 0.5);
        const chosenLanes = lanes.slice(0, maxObstacles);

        chosenLanes.forEach(lane => {
          const x = getLaneX(lane, state.canvasWidth);
          if (Math.random() > 0.35) {
            const pool: Obstacle['type'][] = ['BANANA', 'RAKE'];
            if (scoreVal > 500) pool.push('PIE', 'CHICKEN', 'CACTUS');
            if (scoreVal > 1500) pool.push('FIRE', 'CRAB', 'ALIEN', 'BOMB');
            if (scoreVal > 3000) pool.push('SAW', 'UFO', 'CAR', 'TNT');
            if (scoreVal > 6000) pool.push('LASER', 'SPIKES', 'LAVA', 'TORNADO');

            const type = pool[Math.floor(Math.random() * pool.length)];
            let behavior: ObstacleBehavior = 'STATIONARY';
            if (scoreVal > 2500 && Math.random() > 0.8) behavior = 'SINE_WAVE';
            if (scoreVal > 4500 && (type === 'CAR' || type === 'ALIEN') && Math.random() > 0.7) behavior = 'LANE_SWITCH';
            if (type === 'UFO' || type === 'GHOST') behavior = 'TELEPORT';

            state.obstacles.push({
              id: Math.random().toString(), 
              x, 
              y: -100, 
              baseX: x, 
              width: 45, 
              height: 45,
              type, 
              speed: state.speed, 
              behavior, 
              lane, 
              rotation: 0
            });
          } else {
            const rand = Math.random();
            state.collectibles.push({
              id: Math.random().toString(), 
              x, 
              y: -100,
              type: rand < 0.05 ? 'GEM' : (rand > 0.88 ? 'POWER_UP' : 'COIN'),
              powerType: rand > 0.88 ? Object.values(PowerUpType)[Math.floor(Math.random() * 15)] : undefined
            });
          }
        });
        state.lastSpawn = time;
      }
    };

    const update = () => {
      if (isPaused || gameStateRef.current.gameOver || isExternalAdShowing) return;
      const state = gameStateRef.current;
      state.frame++;      
      // Only log every 300 frames to avoid spam
      if (state.frame === 300) {
        console.log('🎮 Game animation optimized for mobile - smoother movement enabled');
      }
            state.speed = INITIAL_SPEED * getSpeedMultiplier(state.score);
      state.score += (1 * activeSkin.perks.scoreMult);
      setScore(Math.floor(state.score / 10));
      state.player.x += (state.player.targetX - state.player.x) * 0.12; // Reduced from 0.22 for smoother movement
      state.player.wobble = Math.sin(state.frame * 0.08) * 5; // Reduced frequency and amplitude for mobile

      if (activePower && Date.now() > activePower.expiry) setActivePower(null);
      
      const isInvincible = 
        activePower?.type === PowerUpType.INVINCIBLE || 
        activePower?.type === PowerUpType.GIANT ||
        activePower?.type === PowerUpType.GHOST_WALK ||
        activePower?.type === PowerUpType.SONIC_DASH ||
        activePower?.type === PowerUpType.SHIELD_BURST ||
        activePower?.type === PowerUpType.SUPER_JUMP;

      const isTiny = activePower?.type === PowerUpType.TINY;
      const playerSize = isTiny ? 22 : (activePower?.type === PowerUpType.GIANT ? 85 : 45);

      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        if (activePower?.type !== PowerUpType.TIME_FREEZE) {
          obs.y += obs.speed * (activePower?.type === PowerUpType.SONIC_DASH ? 1.5 : 1);
          obs.rotation += 0.03; // Reduced from 0.05 for smoother rotation
          if (obs.behavior === 'SINE_WAVE') obs.x = obs.baseX + Math.sin(obs.y * 0.015) * 45; // Reduced frequency and amplitude
          else if (obs.behavior === 'LANE_SWITCH' && state.frame % 120 === 0) {
            obs.lane = Math.max(0, Math.min(2, obs.lane + (Math.random() > 0.5 ? 1 : -1)));
            obs.baseX = getLaneX(obs.lane, state.canvasWidth);
          } else if (obs.behavior === 'TELEPORT' && state.frame % 60 === 0) obs.x = obs.baseX + (Math.random() - 0.5) * 40;
          if (obs.behavior === 'LANE_SWITCH') obs.x += (obs.baseX - obs.x) * 0.03; // Reduced from 0.05
        }

        const dx = Math.abs(obs.x - state.player.x);
        const dy = Math.abs(obs.y - state.player.y);
        
        if (!isInvincible && dx < 44 && dy < 48) {
          console.log('💥 Game Over! Final score:', Math.floor(state.score / 10), 'Coins:', Math.floor(state.coins));
          state.gameOver = true;
          setShowGameOver(true);
          soundManager.playFail();
          soundManager.stopBackgroundAudio();
          if (settings.vibrationEnabled) {
            Vibration.vibrate(200); // Heavy vibration for game over
          }
          break;
        }
        
        if (obs.y > state.canvasHeight + 200) {
          state.obstacles.splice(i, 1);
        }
      }

      const currentCoinValue = COIN_VALUE * (activePower?.type === PowerUpType.COIN_RAIN ? 2 : 1);

      for (let i = state.collectibles.length - 1; i >= 0; i--) {
        const coll = state.collectibles[i];
        const totalMagnet = (activePower?.type === PowerUpType.MAGNET ? 260 : 0) + activeSkin.perks.magnetRangeBonus;
        const dist = Math.sqrt(Math.pow(coll.x - state.player.x, 2) + Math.pow(coll.y - state.player.y, 2));

        if (totalMagnet > 0 && dist < totalMagnet && (coll.type === 'COIN' || coll.type === 'GEM')) {
           coll.x += (state.player.x - coll.x) * 0.15; // Reduced from 0.25
           coll.y += (state.player.y - coll.y) * 0.15; // Reduced from 0.25
        } else if (activePower?.type !== PowerUpType.TIME_FREEZE) coll.y += state.speed;

        if (Math.abs(coll.x - state.player.x) < 45 && Math.abs(coll.y - state.player.y) < 45) {
          if (coll.type === 'COIN') {
            console.log('🪙 Coin collected! Total coins:', Math.floor(state.coins + (currentCoinValue * activeSkin.perks.coinMult)));
            state.coins += (currentCoinValue * activeSkin.perks.coinMult);
            triggerCollectEffect('COIN'); // ✨ EFFECT TRIGGER
            if (settings.vibrationEnabled) {
              Vibration.vibrate(10); // Light tap for coin
            }
          }
          else if (coll.type === 'GEM') {
            console.log('💎 Gem collected! Total coins:', Math.floor(state.coins + (currentCoinValue * 5 * activeSkin.perks.coinMult)));
            state.coins += (currentCoinValue * 5 * activeSkin.perks.coinMult);
            triggerCollectEffect('GEM'); // ✨ EFFECT TRIGGER
            if (settings.vibrationEnabled) {
              Vibration.vibrate([0, 20, 10, 20]); // Double tap for gem
            }
          }
          else if (coll.powerType) {
            console.log('⚡ Power-up collected:', coll.powerType);
            setActivePower({ 
              type: coll.powerType, 
              start: Date.now(), 
              expiry: Date.now() + POWER_UPS[coll.powerType].duration + activeSkin.perks.invincibilityBonus 
            });
            state.powerUpsUsed++;
            triggerCollectEffect('POWER_UP'); // ✨ EFFECT TRIGGER
            soundManager.playPowerUp();
            if (settings.vibrationEnabled) {
              Vibration.vibrate(50); // Medium vibration for power-up
            }
          }
          setCoinsCollected(Math.floor(state.coins));
          soundManager.playCollect();
          state.collectibles.splice(i, 1);
          continue;
        }
        
        if (coll.y > state.canvasHeight + 200) {
          state.collectibles.splice(i, 1);
        }
      }
      
      spawn(performance.now());
    };

    const gameLoop = () => {
      update();
      forceUpdate(prev => prev + 1);
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, activePower, activeSkin, isExternalAdShowing]);

  const handleManualPowerUse = (power: PowerUp) => {
    if (gameStateRef.current.gameOver || isPaused || isExternalAdShowing) return;
    if ((ownedPowerUses[power.id] || 0) > 0) {
      onUsePower(power.id);
      setActivePower({ 
        type: power.type, 
        start: Date.now(),
        expiry: Date.now() + power.purchasedDuration + activeSkin.perks.invincibilityBonus 
      });
      gameStateRef.current.powerUpsUsed++;
      soundManager.playPowerUp();
      if (settings.vibrationEnabled) {
        Vibration.vibrate(50); // Medium vibration for power-up activation
      }
    }
  };

  // Touch handling
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        if (gameStateRef.current.gameOver || isExternalAdShowing) return;
        const x = evt.nativeEvent.locationX;
        const lane = Math.floor(x / (gameStateRef.current.canvasWidth / 3));
        if (lane !== gameStateRef.current.player.lane) {
          gameStateRef.current.player.lane = lane;
          gameStateRef.current.player.targetX = getLaneX(lane, gameStateRef.current.canvasWidth);
          soundManager.playMove();
          if (settings.vibrationEnabled) {
            Vibration.vibrate(5); // Very light tap for lane switch
          }
        }
      },
    })
  ).current;

  const getObstacleIcon = (type: Obstacle['type']): string => {
    const icons: Record<Obstacle['type'], string> = {
      BANANA: '🍌', RAKE: '🪵', PIE: '🥧', CHICKEN: '🐔', CACTUS: '🌵',
      GHOST: '👻', FIRE: '🔥', CRAB: '🦀', ALIEN: '👽', ANVIL: '🏗️',
      TORNADO: '🌪️', UFO: '🛸', CAR: '🚗', SAW: '⚙️', BOMB: '💣',
      TNT: '🧨', SPIKES: '⛓️', LAVA: '🌋', LASER: '⚡'
    };
    return icons[type] || '🍌';
  };

  const state = gameStateRef.current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Background */}
      <View style={styles.gameArea}>
        {/* Lane lines */}
        {[0, 1, 2].map((i) => {
          const lx = getLaneX(i, state.canvasWidth);
          return (
            <View 
              key={i}
              style={[styles.laneLine, { left: lx - 2 }]}
            />
          );
        })}

        {/* Player */}
        <Animated.View
          style={[
            styles.player,
            {
              left: state.player.x - 24,
              top: state.player.y - 24,
              width: 48 * (activePower?.type === PowerUpType.GIANT ? 1.9 : (activePower?.type === PowerUpType.TINY ? 0.6 : 1)),
              height: 48 * (activePower?.type === PowerUpType.GIANT ? 1.9 : (activePower?.type === PowerUpType.TINY ? 0.6 : 1)),
              backgroundColor: activePower ? POWER_UPS[activePower.type].color : activeSkin.color,
              opacity: activePower?.type === PowerUpType.GHOST_WALK ? 0.5 : 1,
              transform: [
                { scale: collectEffectScale },
                { rotate: collectEffectRotation.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ['-180deg', '180deg']
                }) }
              ],
              shadowColor: '#FFD700',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: collectEffectGlow,
              shadowRadius: collectEffectGlow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20]
              }),
              elevation: collectEffectGlow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 8]
              }),
            },
          ]}
        />

        {/* Player emoji */}
        <Animated.Text
          style={[
            styles.emoji,
            {
              left: state.player.x - 16 * (activePower?.type === PowerUpType.GIANT ? 1.9 : (activePower?.type === PowerUpType.TINY ? 0.6 : 1)),
              top: state.player.y - 16 * (activePower?.type === PowerUpType.GIANT ? 1.9 : (activePower?.type === PowerUpType.TINY ? 0.6 : 1)),
              fontSize: 32 * (activePower?.type === PowerUpType.GIANT ? 1.9 : (activePower?.type === PowerUpType.TINY ? 0.6 : 1)),
              opacity: activePower?.type === PowerUpType.GHOST_WALK ? 0.5 : 1,
              transform: [
                { scale: collectEffectScale },
                { rotate: collectEffectRotation.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ['-180deg', '180deg']
                }) }
              ],
            },
          ]}
        >
          {activeSkin.icon}
        </Animated.Text>
      </View>

      {/* Collectibles */}
      {state.collectibles.map((c) => (
        <Text
          key={c.id}
          style={[
            styles.emoji,
            {
              left: c.x - 19,
              top: c.y - 19,
              fontSize: 38,
            },
          ]}
        >
          {c.type === 'COIN' ? '🪙' : (c.type === 'GEM' ? '💎' : POWER_UPS[c.powerType!].icon)}
        </Text>
      ))}

      {/* Obstacles */}
      {state.obstacles.map((o) => (
        <Text
          key={o.id}
          style={[
            styles.emoji,
            {
              left: o.x - 24,
              top: o.y - 24,
              fontSize: 48,
              transform: [{ rotate: `${o.rotation}rad` }],
            },
          ]}
        >
          {getObstacleIcon(o.type)}
        </Text>
      ))}

      <UIOverlay 
        score={score} 
        coins={coinsCollected} 
        activePower={activePower ? { 
          ...POWER_UPS[activePower.type], 
          currentExpiry: activePower.expiry, 
          currentStart: activePower.start 
        } : null} 
        onPause={() => { 
          setIsPaused(!isPaused); 
          if (!isPaused) soundManager.stopBackgroundAudio(); 
          else soundManager.playBackgroundAudio(); 
        }} 
        isPaused={isPaused} 
        equippedPowers={equippedPowers}
        ownedPowerUses={ownedPowerUses}
        onUseEquippedPower={handleManualPowerUse}
      />

      {showGameOver && !isExternalAdShowing && (
        <GameOver 
          score={score} 
          coins={coinsCollected} 
          onRevive={() => { 
            if (reviveCount < 1) { 
              setReviveCount(1); 
              onRequestRevive(); 
            } 
          }} 
          onFinish={(action) => onGameOver(score, gameStateRef.current.coins, gameStateRef.current.powerUpsUsed, action)} 
          canRevive={reviveCount < 1} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  gameArea: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  laneLine: {
    position: 'absolute',
    width: 4,
    height: '100%',
    backgroundColor: '#18181b',
  },
  player: {
    position: 'absolute',
    borderRadius: 14,
  },
  emoji: {
    position: 'absolute',
    pointerEvents: 'none',
  },
});

export default GameContainer;

