import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

interface GameplayTipProps {
  onContinue: () => void;
}

const GameplayTip: React.FC<GameplayTipProps> = ({ onContinue }) => {
  // Key collectible icons - most important ones
  const collectibles = [
    { icon: '🪙', label: 'Coins' },
    { icon: '💎', label: 'Gems' },
    { icon: '⚡', label: 'Power-ups' }
  ];

  // Key obstacle icons - most common dangers
  const obstacles = [
    { icon: '☠️', label: 'Skull' },
    { icon: '🪤', label: 'Trap' },
    { icon: '🦂', label: 'Scorpion' },
    { icon: '🕷️', label: 'Spider' },
    { icon: '💀', label: 'Death' },
    { icon: '🔥', label: 'Fire' },
    { icon: '💣', label: 'Bomb' },
    { icon: '🌵', label: 'Cactus' }
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🎮</Text>
          <Text style={styles.title}>GAMEPLAY GUIDE</Text>
          <Text style={styles.subtitle}>Swipe or Tap to Move Between Lanes</Text>
        </View>

        {/* TO COLLECT Section */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { backgroundColor: '#10B98120' }]}>
            <Icon name="check-circle" size={28} color="#10B981" />
            <Text style={[styles.sectionTitle, { color: '#10B981' }]}>COLLECT THESE</Text>
          </View>
          <View style={styles.iconRow}>
            {collectibles.map((item, idx) => (
              <View key={idx} style={[styles.iconCard, { borderColor: '#10B981' }]}>
                <Text style={styles.iconLarge}>{item.icon}</Text>
                <Text style={styles.iconLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* TO AVOID Section */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { backgroundColor: '#EF444420' }]}>
            <Icon name="x-circle" size={28} color="#EF4444" />
            <Text style={[styles.sectionTitle, { color: '#EF4444' }]}>AVOID THESE</Text>
          </View>
          <View style={styles.iconGrid}>
            {obstacles.map((item, idx) => (
              <View key={idx} style={[styles.iconCard, { borderColor: '#EF4444' }]}>
                <Text style={styles.iconMedium}>{item.icon}</Text>
                <Text style={styles.iconLabelSmall}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>CONTINUE TO PLAY</Text>
          <Icon name="play" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  container: {
    backgroundColor: '#1F1F23',
    borderRadius: 24,
    width: '100%',
    maxWidth: 420,
    padding: 24,
    borderWidth: 3,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  iconCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27272A',
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    minWidth: 80,
  },
  iconLarge: {
    fontSize: 48,
    marginBottom: 4,
  },
  iconMedium: {
    fontSize: 36,
    marginBottom: 2,
  },
  iconLabel: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '600',
    marginTop: 4,
  },
  iconLabelSmall: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default GameplayTip;
