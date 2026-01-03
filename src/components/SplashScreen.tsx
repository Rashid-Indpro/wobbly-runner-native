import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from './LinearGradient';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1.5);
  const bounceAnim = new Animated.Value(0);

  useEffect(() => {
    // Stage 0: Black Screen with subtle particles
    // Stage 1: Lens Flare / Flash
    const t1 = setTimeout(() => setPhase(1), 500);
    // Stage 2: Logo Drops / Slam
    const t2 = setTimeout(() => {
      setPhase(2);
      // Animate logo entrance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200);
    // Stage 3: Title Shimmer
    const t3 = setTimeout(() => setPhase(3), 2000);
    // Stage 4: Founders Reveal
    const t4 = setTimeout(() => setPhase(4), 3200);
    // Complete
    const t5 = setTimeout(() => onComplete(), 5500);

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

    return () => {
      [t1, t2, t3, t4, t5].forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background}>
        <View style={styles.glowCircle} />
      </View>

      {/* Phase 1: Flash */}
      {phase === 1 && (
        <View style={styles.flashContainer}>
          <View style={styles.flash} />
        </View>
      )}

      {/* Phase 2: Logo Assembly */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: phase >= 2 ? fadeAnim : 0,
            transform: [
              { scale: phase >= 2 ? scaleAnim : 1.5 },
              { translateY: bounceAnim },
            ],
          },
        ]}>
        <LinearGradient
          colors={['#facc15', '#f97316', '#dc2626']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoBox}>
          <Text style={styles.logoEmoji}>🤪</Text>
        </LinearGradient>
        <View style={styles.sparkleBox}>
          <Text style={styles.sparkle}>✨</Text>
        </View>
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
    top: height / 2 - width * 0.4,
    left: width * 0.1,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: width * 0.4,
  },
  flashContainer: {
    position: 'absolute',
    top: height / 2,
    left: width / 2,
  },
  flash: {
    width: 4,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    width: 112,
    height: 112,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 80,
    elevation: 20,
  },
  logoEmoji: {
    fontSize: 64,
    transform: [{ rotate: '-12deg' }],
  },
  sparkleBox: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  sparkle: {
    fontSize: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  subtitleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 12,
    textTransform: 'uppercase',
  },
  underline: {
    marginTop: 8,
    width: width * 0.3,
    height: 2,
    backgroundColor: '#6366f1',
  },
  foundersContainer: {
    position: 'absolute',
    bottom: 64,
    alignItems: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  divider: {
    width: 48,
    height: 1,
    backgroundColor: '#27272a',
  },
  productionText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#71717a',
    letterSpacing: 4,
    marginHorizontal: 16,
  },
  foundersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
  },
  founderCard: {
    alignItems: 'center',
    gap: 16,
  },
  avatarGlow: {
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  founderName: {
    fontSize: 10,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  founderRole: {
    fontSize: 7,
    fontWeight: '900',
    color: '#52525b',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  separator: {
    fontSize: 24,
    fontWeight: '900',
    color: '#27272a',
  },
});

export default SplashScreen;
