import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from './LinearGradient';
import { wp, hp, scale, verticalScale, moderateScale, responsiveFontSize } from '../utils/responsive';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(2); // Start at phase 2 with content visible
  const fadeAnim = new Animated.Value(1); // Start fully visible
  const scaleAnim = new Animated.Value(1); // Start at normal scale
  const bounceAnim = new Animated.Value(0);
  const wobbleAnim = new Animated.Value(0);
  const emojiPulseAnim = new Animated.Value(1);
  const sparkleRotateAnim = new Animated.Value(0);
  const glowAnim = new Animated.Value(0.4);

  useEffect(() => {
    // Character is visible from start (no fade-in needed)
    
    // Stage 3: Title Shimmer
    const t3 = setTimeout(() => setPhase(3), 1000);
    // Stage 4: Founders Reveal
    const t4 = setTimeout(() => setPhase(4), 2200);
    // Complete
    const t5 = setTimeout(() => onComplete(), 4500);

    // Bounce animation for logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Wobble rotation for character (continuous)
    Animated.loop(
      Animated.sequence([
        Animated.timing(wobbleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: -1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Emoji pulse animation (breathing effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(emojiPulseAnim, {
          toValue: 1.15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(emojiPulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Sparkle rotation animation
    Animated.loop(
      Animated.timing(sparkleRotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Glow pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();

    return () => {
      [t3, t4, t5].forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Background - enhanced visibility */}
      <View style={styles.background}>
        <View style={styles.glowCircle} />
      </View>

      {/* Logo - now visible from start with beautiful animations */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim },
            ],
          },
        ]}>
        <Animated.View
          style={{
            shadowColor: '#f97316',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: glowAnim,
            shadowRadius: 60,
            elevation: 20,
          }}>
          <LinearGradient
            colors={['#facc15', '#f97316', '#dc2626']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoBox}>
            <Animated.Text
              style={[
                styles.logoEmoji,
                {
                  transform: [
                    {
                      rotate: wobbleAnim.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: ['-15deg', '-12deg', '-9deg'],
                      }),
                    },
                    { scale: emojiPulseAnim },
                  ],
                },
              ]}>
              🤪
            </Animated.Text>
          </LinearGradient>
        </Animated.View>
        <Animated.View
          style={[
            styles.sparkleBox,
            {
              transform: [
                {
                  rotate: sparkleRotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                { scale: emojiPulseAnim },
              ],
            },
          ]}>
          <Text style={styles.sparkle}>✨</Text>
        </Animated.View>
      </Animated.View>

      {/* Phase 3: Title */}
      {phase >= 3 && (
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.title}>WOBBLY RUNNER</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>CHAOS DASH</Text>
            <View style={styles.underline} />
          </View>
        </Animated.View>
      )}

      {/* Phase 4: Founders */}
      {phase >= 4 && (
        <View style={styles.foundersContainer}>
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.productionText}>A PRODUCTION BY</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.foundersRow}>
            {/* Tanveer */}
            <View style={styles.founderCard}>
              <View style={styles.avatarGlow}>
                <Image
                  source={require('../../assets/images/tanveerAlamPhoto.jpg')}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.founderName}>TANVEER ALAM</Text>
              <Text style={styles.founderRole}>
                Lead Designer & Creative Director
              </Text>
            </View>

            <Text style={styles.separator}>×</Text>

            {/* Rashid */}
            <View style={styles.founderCard}>
              <View style={styles.avatarGlow}>
                <Image
                  source={require('../../assets/images/mdRashidPhoto.jpg')}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.founderName}>MD RASHID</Text>
              <Text style={styles.founderRole}>
                Technical Lead & Engine Architect
              </Text>
            </View>
          </View>
        </View>
      )}
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
    backgroundColor: '#09090b',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5000,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glowCircle: {
    position: 'absolute',
    top: hp(50) - wp(40),
    left: wp(10),
    width: wp(80),
    height: wp(80),
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderRadius: wp(40),
  },
  flashContainer: {
    position: 'absolute',
    top: hp(50),
    left: wp(50),
  },
  flash: {
    width: scale(4),
    height: scale(4),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  logoBox: {
    width: scale(112),
    height: scale(112),
    borderRadius: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 80,
    elevation: 20,
  },
  logoEmoji: {
    fontSize: responsiveFontSize(64),
    transform: [{ rotate: '-12deg' }],
  },
  sparkleBox: {
    position: 'absolute',
    bottom: scale(-16),
    right: scale(-16),
    width: scale(48),
    height: scale(48),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  sparkle: {
    fontSize: responsiveFontSize(24),
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  title: {
    fontSize: responsiveFontSize(40),
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  subtitleContainer: {
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  subtitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 12,
    textTransform: 'uppercase',
  },
  underline: {
    marginTop: verticalScale(8),
    width: wp(30),
    height: verticalScale(2),
    backgroundColor: '#6366f1',
  },
  foundersContainer: {
    position: 'absolute',
    bottom: verticalScale(64),
    alignItems: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  divider: {
    width: scale(48),
    height: 1,
    backgroundColor: '#27272a',
  },
  productionText: {
    fontSize: responsiveFontSize(9),
    fontWeight: '900',
    color: '#71717a',
    letterSpacing: 4,
    marginHorizontal: scale(16),
  },
  foundersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(48),
  },
  founderCard: {
    alignItems: 'center',
    gap: verticalScale(16),
  },
  avatarGlow: {
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  founderName: {
    fontSize: responsiveFontSize(10),
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  founderRole: {
    fontSize: responsiveFontSize(7),
    fontWeight: '900',
    color: '#52525b',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  separator: {
    fontSize: responsiveFontSize(24),
    fontWeight: '900',
    color: '#27272a',
  },
});

export default SplashScreen;
