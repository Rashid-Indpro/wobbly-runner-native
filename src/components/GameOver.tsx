import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

interface GameOverProps {
  score: number;
  coins: number;
  onRevive: () => void;
  onFinish: (action: 'RETRY' | 'MENU') => void;
  canRevive: boolean;
}

const GameOver: React.FC<GameOverProps> = ({ score, coins, onRevive, onFinish, canRevive }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scale in animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Funny Splat Visual */}
      <Animated.View style={[styles.splatContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={[styles.glowCircle, { transform: [{ scale: pulseAnim }] }]} />
        <Text style={styles.emojiLarge}>😵‍💫</Text>
        <View style={styles.splatBadge}>
          <Text style={styles.splatText}>SPLAT!</Text>
        </View>
      </Animated.View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleLine1}>WOBBLE</Text>
        <Text style={styles.titleLine2}>OVER!</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.scoreText}>{score} PTS</Text>
        <Text style={styles.coinsText}>🪙 {coins} COINS COLLECTED</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {canRevive && (
          <TouchableOpacity 
            onPress={onRevive}
            style={styles.reviveButton}
            activeOpacity={0.8}
          >
            <Icon name="play-circle" size={28} color="#FFFFFF" />
            <Text style={styles.reviveButtonText}>REVIVE</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            onPress={() => onFinish('RETRY')}
            style={styles.retryButton}
            activeOpacity={0.8}
          >
            <Icon name="rotate-ccw" size={20} color="#EA580C" />
            <Text style={styles.retryButtonText}>RETRY</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onFinish('MENU')}
            style={styles.menuButton}
            activeOpacity={0.8}
          >
            <Icon name="home" size={20} color="#FFFFFF" />
            <Text style={styles.menuButtonText}>MENU</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.quoteText}>"Better luck next time, wobbly friend!"</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  splatContainer: {
    position: 'relative',
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  glowCircle: {
    position: 'absolute',
    width: 128,
    height: 128,
    backgroundColor: '#FACC15',
    borderRadius: 64,
    opacity: 0.5,
  },
  emojiLarge: {
    fontSize: 96,
    textAlign: 'center',
    transform: [{ rotate: '12deg' }],
  },
  splatBadge: {
    position: 'absolute',
    bottom: -16,
    left: -16,
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    transform: [{ rotate: '-12deg' }],
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  splatText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  titleLine1: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  titleLine2: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  statsContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
  },
  scoreText: {
    color: '#FACC15',
    fontWeight: '900',
    fontSize: 28,
    letterSpacing: 1,
  },
  coinsText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  reviveButton: {
    width: '100%',
    backgroundColor: '#3B82F6',
    paddingVertical: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  reviveButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 24,
    letterSpacing: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  retryButtonText: {
    color: '#EA580C',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  menuButton: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  quoteText: {
    marginTop: 32,
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default GameOver;
