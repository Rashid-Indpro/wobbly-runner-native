import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import LinearGradient from './LinearGradient';

interface AdSimulatorProps {
  onComplete: () => void;
}

const AdSimulator: React.FC<AdSimulatorProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [showClose, setShowClose] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Pulse animation for icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
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

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressWidth = ((5 - timeLeft) / 5) * 100;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.infoTag}>
        <Icon name="info" size={14} color="rgba(255, 255, 255, 0.6)" />
        <Text style={styles.infoText}>Sample Reward Ad</Text>
      </View>

      <View style={styles.topRight}>
        {showClose ? (
          <TouchableOpacity 
            onPress={onComplete}
            style={styles.closeButton}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>CLOSE AD</Text>
            <Icon name="x" size={20} color="#000000" />
          </TouchableOpacity>
        ) : (
          <View style={styles.timerBadge}>
            <Icon name="clock" size={16} color="#FFFFFF" />
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <LinearGradient
            colors={['#6366F1', '#A855F7', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Text style={styles.iconEmoji}>✨</Text>
          </LinearGradient>
        </Animated.View>
        
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleLine1}>UNBELIEVABLE</Text>
            <Text style={styles.titleLine2}>GAMEPLAY</Text>
          </View>
          <Text style={styles.description}>
            Experience the next generation of wobbly physics! Reach new high scores and unlock exclusive rewards.
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progressWidth}%` }]} />
        </View>

        <Text style={styles.disclaimer}>
          Compliant with global ad standards • No tracking
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  infoTag: {
    position: 'absolute',
    top: 24,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoText: {
    fontSize: 10,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  topRight: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButtonText: {
    fontWeight: '900',
    fontSize: 14,
    color: '#000000',
  },
  timerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  timerText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  contentContainer: {
    maxWidth: 384,
    width: '100%',
    alignItems: 'center',
    gap: 32,
  },
  iconGradient: {
    width: 128,
    height: 128,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
  iconEmoji: {
    fontSize: 64,
  },
  textContainer: {
    gap: 16,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleLine1: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -1,
    textAlign: 'center',
  },
  titleLine2: {
    color: '#818CF8',
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -1,
    textAlign: 'center',
  },
  description: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  disclaimer: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
});

export default AdSimulator;
