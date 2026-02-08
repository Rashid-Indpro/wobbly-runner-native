import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';
import { wp, hp, scale, verticalScale, moderateScale, responsiveFontSize } from '../utils/responsive';

interface TutorialProps {
  onComplete: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const steps = [
    {
      title: "MEET BLOOP!",
      desc: "This is Bloop. He's wobbly, he's silly, and he loves to slide!",
      icon: "🤪",
      bg: "#FACC15"
    },
    {
      title: "HOW TO MOVE",
      desc: "Tap left, middle, or right side of your screen to switch lanes.",
      icon: "👈👉",
      bg: "#3B82F6"
    },
    {
      title: "COLLECT COINS",
      desc: "Grab as many coins as you can to show off your high score!",
      icon: "🪙",
      bg: "#F97316"
    },
    {
      title: "WATCH OUT!",
      desc: "Avoid Skulls, Traps, Scorpions, and Spiders. They will make you SPLAT!",
      icon: "☠️🪤🦂",
      bg: "#EF4444"
    },
    {
      title: "POWER UP!",
      desc: "Grab colorful icons for magic abilities like Invincibility or Magnet!",
      icon: "⚡🛡️",
      bg: "#9333EA"
    }
  ];

  const current = steps[step];

  useEffect(() => {
    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade in animation
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [step]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: current.bg }]} edges={['top', 'left', 'right', 'bottom']}>
      <Animated.View 
        style={[
          styles.iconContainer,
          {
            transform: [{ translateY: bounceAnim }],
            opacity: fadeAnim,
          }
        ]}
      >
        <Text style={styles.iconLarge}>{current.icon}</Text>
      </Animated.View>

      <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.description}>{current.desc}</Text>

        <TouchableOpacity 
          onPress={handleNext}
          style={styles.nextButton}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {step < steps.length - 1 ? 'NEXT' : "LET'S ROLL!"}
          </Text>
          <Icon name="chevron-right" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {steps.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot,
                i === step ? styles.dotActive : styles.dotInactive
              ]} 
            />
          ))}
        </View>
      </Animated.View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(32),
  },
  iconContainer: {
    marginBottom: verticalScale(48),
  },
  iconLarge: {
    fontSize: responsiveFontSize(108),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: moderateScale(48),
    padding: scale(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
    maxWidth: wp(90),
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(28),
    fontWeight: '900',
    color: '#000000',
    marginBottom: verticalScale(16),
    textAlign: 'center',
    letterSpacing: 1,
  },
  description: {
    color: '#52525B',
    fontWeight: '700',
    fontSize: responsiveFontSize(16),
    marginBottom: verticalScale(32),
    lineHeight: scale(24),
    textAlign: 'center',
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: responsiveFontSize(18),
    letterSpacing: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: scale(8),
    justifyContent: 'center',
    marginTop: verticalScale(24),
  },
  dot: {
    height: verticalScale(8),
    borderRadius: moderateScale(4),
  },
  dotActive: {
    width: scale(32),
    backgroundColor: '#000000',
  },
  dotInactive: {
    width: scale(8),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default Tutorial;
