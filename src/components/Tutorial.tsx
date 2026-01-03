import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

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
      desc: "Avoid Banana Peels, Fires, Crabs, and Aliens. They will make you SPLAT!",
      icon: "🔥🦀👽",
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
    <View style={[styles.container, { backgroundColor: current.bg }]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconContainer: {
    marginBottom: 48,
  },
  iconLarge: {
    fontSize: 108,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 48,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
    maxWidth: 384,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 1,
  },
  description: {
    color: '#52525B',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center',
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 32,
    backgroundColor: '#000000',
  },
  dotInactive: {
    width: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default Tutorial;
