import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';
import { wp, hp, scale, verticalScale, moderateScale, responsiveFontSize } from '../utils/responsive';

interface GameOverProps {
  score: number;
  coins: number;
  onFinish: (action: 'RETRY' | 'MENU') => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, coins, onFinish }) => {
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
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
    </SafeAreaView>
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
    padding: scale(32),
  },
  splatContainer: {
    position: 'relative',
    marginBottom: verticalScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(160),
    height: scale(160),
  },
  glowCircle: {
    position: 'absolute',
    width: scale(128),
    height: scale(128),
    backgroundColor: '#FACC15',
    borderRadius: scale(64),
    opacity: 0.5,
  },
  emojiLarge: {
    fontSize: responsiveFontSize(96),
    textAlign: 'center',
    transform: [{ rotate: '12deg' }],
  },
  splatBadge: {
    position: 'absolute',
    bottom: scale(-16),
    left: scale(-16),
    backgroundColor: '#DC2626',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
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
    fontSize: responsiveFontSize(14),
    letterSpacing: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  titleLine1: {
    fontSize: responsiveFontSize(48),
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  titleLine2: {
    fontSize: responsiveFontSize(48),
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  statsContainer: {
    alignItems: 'center',
    gap: verticalScale(8),
    marginBottom: verticalScale(40),
  },
  scoreText: {
    color: '#FACC15',
    fontWeight: '900',
    fontSize: responsiveFontSize(28),
    letterSpacing: 1,
  },
  coinsText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '700',
    fontSize: responsiveFontSize(16),
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: wp(85),
    gap: verticalScale(16),
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: scale(16),
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  retryButtonText: {
    color: '#EA580C',
    fontWeight: '900',
    fontSize: responsiveFontSize(16),
    letterSpacing: 0.5,
  },
  menuButton: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: responsiveFontSize(16),
    letterSpacing: 0.5,
  },
  quoteText: {
    marginTop: verticalScale(32),
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: responsiveFontSize(12),
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default GameOver;
