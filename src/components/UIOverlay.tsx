import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { PowerUp } from '../types';

interface UIOverlayProps {
  score: number;
  coins: number;
  activePower: (PowerUp & { currentExpiry: number, currentStart: number }) | null;
  onPause: () => void;
  onBack: () => void;
  isPaused: boolean;
  equippedPowers: PowerUp[];
  ownedPowerUses: Record<string, number>;
  onUseEquippedPower: (p: PowerUp) => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ 
  score, 
  coins, 
  activePower, 
  onPause, 
  onBack,
  isPaused, 
  equippedPowers, 
  ownedPowerUses, 
  onUseEquippedPower 
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!activePower) {
      setProgress(100);
      return;
    }

    // Immediately calculate and set initial progress
    const calculateProgress = () => {
      const total = activePower.currentExpiry - activePower.currentStart;
      const remaining = activePower.currentExpiry - Date.now();
      return Math.max(0, Math.min(100, (remaining / total) * 100));
    };

    // Set initial progress immediately
    setProgress(calculateProgress());

    // Update progress every 50ms for smooth animation
    const interval = setInterval(() => {
      const pct = calculateProgress();
      setProgress(pct);
      if (pct <= 0) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [activePower]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.topRow}>
        <View style={styles.statsContainer}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>{score}</Text>
          </View>
          <View style={styles.coinsBox}>
            <Text style={styles.coinsText}>🪙 {coins}</Text>
          </View>
        </View>

        <View style={styles.controlButtons}>
          <TouchableOpacity 
            onPress={onBack}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onPause}
            style={styles.pauseButton}
            activeOpacity={0.8}
          >
            {isPaused ? (
              <Icon name="play" size={24} color="#FFFFFF" />
            ) : (
              <Icon name="pause" size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        {activePower && (
          <View style={styles.activePowerCard}>
            <View style={styles.activePowerRow}>
              <Text style={styles.activePowerIcon}>{activePower.icon}</Text>
              <Text style={styles.activePowerName}>{activePower.name}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
          </View>
        )}

        <View style={styles.equippedPowersRow} pointerEvents="box-none">
          {equippedPowers.map(p => {
            const uses = ownedPowerUses[p.id] || 0;
            return (
              <TouchableOpacity
                key={p.id}
                onPress={() => onUseEquippedPower(p)}
                disabled={uses <= 0}
                style={[
                  styles.powerButton,
                  uses > 0 ? styles.powerButtonActive : styles.powerButtonInactive
                ]}
                activeOpacity={0.8}
              >
                <Text style={styles.powerButtonIcon}>{p.icon}</Text>
                <Text style={styles.powerButtonUses}>{uses}x</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statsContainer: {
    gap: 4,
  },
  scoreBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreText: {
    color: '#FACC15',
    fontSize: 24,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  coinsBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coinsText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    gap: 24,
  },
  activePowerCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 24,
    alignItems: 'center',
    gap: 4,
  },
  activePowerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activePowerIcon: {
    fontSize: 28,
  },
  activePowerName: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  progressBarContainer: {
    width: 200,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  equippedPowersRow: {
    flexDirection: 'row',
    gap: 16,
  },
  powerButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerButtonActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  powerButtonInactive: {
    backgroundColor: 'rgba(39, 39, 42, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.5,
  },
  powerButtonIcon: {
    fontSize: 28,
    lineHeight: 28,
  },
  powerButtonUses: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
});

export default UIOverlay;
