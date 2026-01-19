import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface AlpineStudioIntroProps {
  onComplete: () => void;
}

const AlpineStudioIntro: React.FC<AlpineStudioIntroProps> = ({ onComplete }) => {
  // Animation Nodes
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const alpineOpacity = useRef(new Animated.Value(0)).current;
  const alpineTranslateY = useRef(new Animated.Value(20)).current;
  const techBarScaleX = useRef(new Animated.Value(0)).current;
  const techBarOpacity = useRef(new Animated.Value(0)).current;
  const presentsOpacity = useRef(new Animated.Value(0)).current;
  const presentsTranslateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    // Reveal Sequence
    Animated.sequence([
      // 1. Logo Symbol Reveal (at 600ms)
      Animated.delay(600),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.out(Easing.exp) }),
        Animated.timing(logoScale, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.out(Easing.exp) }),
      ]),

      // 2. ALPINE Text Reveal (at 2200ms)
      Animated.delay(800),
      Animated.parallel([
        Animated.timing(alpineOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(alpineTranslateY, { toValue: 0, duration: 1200, useNativeDriver: true, easing: Easing.out(Easing.exp) }),
      ]),

      // 3. TECHNOLOGIES Bar Reveal (at 3600ms)
      Animated.delay(600),
      Animated.parallel([
        Animated.timing(techBarOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(techBarScaleX, { toValue: 1, duration: 1200, useNativeDriver: true, easing: Easing.out(Easing.exp) }),
      ]),

      // 4. PRESENTS Reveal (at 5500ms)
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(presentsOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(presentsTranslateY, { toValue: 0, duration: 1000, useNativeDriver: true, easing: Easing.out(Easing.exp) }),
      ]),
    ]).start();

    // 5. Completion (at 8500ms)
    const timer = setTimeout(onComplete, 8500);
    return () => clearTimeout(timer);
  }, []);

  const techChars = "TECHNOLOGIES".split("");

  return (
    <View style={styles.container}>
      {/* Background Atmosphere (Simulated Glow) */}
      <View style={styles.glow} />

      {/* Monolith Apex Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Svg viewBox="0 0 100 100" width={100} height={100}>
          <Path d="M50 5 L95 85 L5 85 Z" fill="white" />
          <Path d="M50 30 L75 75 L25 75 Z" fill="black" />
          <Rect x="49.5" y="5" width="1" height="80" fill="rgba(0,0,0,0.3)" />
        </Svg>
        <View style={styles.reflectionLine} />
      </Animated.View>

      {/* Brand Lockup */}
      <View style={styles.brandContainer}>
        {/* ALPINE */}
        <Animated.View style={{ opacity: alpineOpacity, transform: [{ translateY: alpineTranslateY }] }}>
          <Text style={styles.alpineText}>ALPINE</Text>
        </Animated.View>

        {/* TECHNOLOGIES Solid Bar */}
        <Animated.View style={[styles.techBarWrapper, { 
          opacity: techBarOpacity,
          transform: [{ scaleX: techBarScaleX }]
        }]}>
          <View style={styles.techBarInner}>
            {techChars.map((char, i) => (
              <Text key={i} style={styles.techChar}>{char}</Text>
            ))}
          </View>
        </Animated.View>
      </View>

      {/* PRESENTS - Solid Architectural Style */}
      <Animated.View style={[styles.presentsContainer, { 
        opacity: presentsOpacity, 
        transform: [{ translateY: presentsTranslateY }] 
      }]}>
        <View style={styles.presentsStrike} />
        <Text style={styles.presentsText}>PRESENTS</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    top: height * 0.45,
    width: width * 1.5,
    height: 1,
    backgroundColor: 'rgba(34, 211, 238, 0.15)',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  reflectionLine: {
    marginTop: 8,
    height: 1,
    width: 140,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  brandContainer: {
    alignItems: 'center',
  },
  alpineText: {
    color: 'white',
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: -3,
    lineHeight: 72,
  },
  techBarWrapper: {
    marginTop: 8,
    overflow: 'hidden',
  },
  techBarInner: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: '100%',
  },
  techChar: {
    color: '#010101',
    fontSize: 9,
    fontWeight: '900',
  },
  presentsContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  presentsStrike: {
    height: 3,
    width: 40,
    backgroundColor: 'white',
    marginBottom: 12,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  presentsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});

export default AlpineStudioIntro;
