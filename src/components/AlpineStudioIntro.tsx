import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import LinearGradient from './LinearGradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AlpineStudioIntroProps {
  onComplete: () => void;
}

const AlpineStudioIntro: React.FC<AlpineStudioIntroProps> = ({ onComplete }) => {
  // Logo animations
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(15)).current;
  const logoScale = useRef(new Animated.Value(0.95)).current;
  
  // Presents animations
  const presentsOpacity = useRef(new Animated.Value(0)).current;
  const presentsTranslateY = useRef(new Animated.Value(5)).current;
  
  // Progress bar animation
  const progressWidth = useRef(new Animated.Value(0)).current;
  
  // Shine effect
  const shinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('🎬 InteraMinds intro: Starting animation...');

    // Logo reveal animation (0-2s) - matching HTML keyframes exactly
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bezier(0.22, 0.61, 0.36, 1),
      useNativeDriver: true,
    }).start();

    Animated.timing(logoTranslateY, {
      toValue: 0,
      duration: 2000,
      easing: Easing.bezier(0.22, 0.61, 0.36, 1),
      useNativeDriver: true,
    }).start();

    // Scale animation with exact keyframes
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800, // 0-40% of 2000ms
        easing: Easing.bezier(0.22, 0.61, 0.36, 1),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1.02,
        duration: 400, // 60-80% of 2000ms
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800, // 80-100% of 2000ms
        useNativeDriver: true,
      }),
    ]).start();

    // "presents" animation (starts at 1.5s, duration 0.8s)
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(presentsOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(presentsTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);

    // Progress bar fill (0-3s linear)
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Shine animation (starts at 2s, loops infinitely)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shinePosition, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(shinePosition, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, 2000);

    // Complete after 3 seconds
    const timer = setTimeout(() => {
      console.log('✅ 3-second animation complete');
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Interpolate shine effect
  const shineBrightness = shinePosition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.15, 1],
  });

  // Interpolate progress bar width
  const progressBarWidth = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Logo with gradient */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [
              { translateY: logoTranslateY },
              { scale: logoScale },
            ],
          }}
        >
          <LinearGradient
            colors={['#3b82f6', '#8b5cf6', '#3b82f6']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientBackground}
          >
            <Animated.Text
              style={[
                styles.logo,
                {
                  opacity: shineBrightness,
                },
              ]}
            >
              InteraMinds
            </Animated.Text>
          </LinearGradient>
        </Animated.View>

        {/* "presents" text */}
        <Animated.Text
          style={[
            styles.presents,
            {
              opacity: presentsOpacity,
              transform: [{ translateY: presentsTranslateY }],
            },
          ]}
        >
          presents
        </Animated.Text>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: progressBarWidth }]}>
            <LinearGradient
              colors={['#3b82f6', '#8b5cf6']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.progressGradient}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  gradientBackground: {
    borderRadius: 0,
  },
  logo: {
    fontFamily: 'System',
    fontSize: 56, // 3.5rem
    fontWeight: '700',
    letterSpacing: -0.5,
    color: 'white',
    marginBottom: 10,
  },
  presents: {
    fontFamily: 'System',
    fontSize: 16, // 1rem
    fontWeight: '400',
    color: '#8a8a9e',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  progressBar: {
    position: 'absolute',
    bottom: -25,
    width: 200,
    height: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
  },
  progressGradient: {
    width: '100%',
    height: '100%',
  },
});

export default AlpineStudioIntro;
