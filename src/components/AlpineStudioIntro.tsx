import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import LinearGradient from './LinearGradient';

interface AlpineStudioIntroProps {
  onComplete: () => void;
}

const AlpineStudioIntro: React.FC<AlpineStudioIntroProps> = ({ onComplete }) => {
  // Animation Values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(15)).current;
  const presentsOpacity = useRef(new Animated.Value(0)).current;
  const presentsTranslateY = useRef(new Animated.Value(5)).current;

  useEffect(() => {
    // Animation Sequence
    Animated.sequence([
      // Initial delay
      Animated.delay(300),
      
      // 1. Logo fade in and up (1.2s)
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1200,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 1200,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          useNativeDriver: true,
        }),
      ]),
      
      // Small delay before presents
      Animated.delay(200),
      
      // 2. "presents" text fade in (1.5s)
      Animated.parallel([
        Animated.timing(presentsOpacity, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(presentsTranslateY, {
          toValue: 0,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      
      // Hold the screen for a moment
      Animated.delay(1000),
    ]).start();

    // Complete after 4 seconds total (shorter, cleaner intro)
    const timer = setTimeout(onComplete, 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* InteraMinds Text with Gradient */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ translateY: logoTranslateY }],
          }}
        >
          <LinearGradient
            colors={['#3b82f6', '#8b5cf6']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientWrapper}
          >
            <Text style={styles.logoText}>InteraMinds</Text>
          </LinearGradient>
        </Animated.View>

        {/* Presents Text */}
        <Animated.View
          style={{
            opacity: presentsOpacity,
            transform: [{ translateY: presentsTranslateY }],
          }}
        >
          <Text style={styles.presentsText}>PRESENTS</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  gradientWrapper: {
    borderRadius: 8,
  },
  logoText: {
    fontFamily: 'System',
    fontSize: 56,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: 'transparent',
    marginBottom: 10,
  },
  presentsText: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#8a8a9e',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 8,
  },
});

export default AlpineStudioIntro;
