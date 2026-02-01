import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import LinearGradient from './LinearGradient';

interface AlpineStudioIntroProps {
  onComplete: () => void;
}

const AlpineStudioIntro: React.FC<AlpineStudioIntroProps> = ({ onComplete }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(15)).current;
  const logoScale = useRef(new Animated.Value(0.95)).current;
  const presentsOpacity = useRef(new Animated.Value(0)).current;
  const presentsTranslateY = useRef(new Animated.Value(5)).current;
  const gradientPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('🎬 InteraMinds intro: Starting animation...');

    // Logo reveal animation
    Animated.sequence([
      // Main logo reveal
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0.8,
          duration: 400,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1.02,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // "presents" text animation (starts at 1.5s)
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

    // Shine animation for logo (starts at 2s, loops)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(gradientPosition, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(gradientPosition, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 2000);

    // Complete animation after 4 seconds
    const timer = setTimeout(() => {
      console.log('✅ InteraMinds intro animation complete');
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Interpolate brightness for shine effect
  const brightness = gradientPosition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.15, 1],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [
                { translateY: logoTranslateY },
                { scale: logoScale },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#3b82f6', '#8b5cf6']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientBackground}
          >
            <Animated.Text
              style={[
                styles.logo,
                {
                  opacity: brightness,
                },
              ]}
            >
              InteraMinds
            </Animated.Text>
          </LinearGradient>
        </Animated.View>

        <Animated.Text
          style={[
            styles.presents,
            {
              opacity: presentsOpacity,
              transform: [{ translateY: presentsTranslateY }],
            },
          ]}
        >
          PRESENTS
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: 10,
  },
  gradientBackground: {
    borderRadius: 0,
    paddingHorizontal: 0,
  },
  logo: {
    fontFamily: 'System',
    fontSize: 56,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: 'white',
  },
  presents: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#8a8a9e',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 4,
  },
});

export default AlpineStudioIntro;
