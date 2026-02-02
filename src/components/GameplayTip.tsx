import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

interface GameplayTipProps {
  onContinue: () => void;
}

const GameplayTip: React.FC<GameplayTipProps> = ({ onContinue }) => {
  // Collectible icons
  const collectibles = [
    { icon: '🪙', label: 'Coins' },
    { icon: '💎', label: 'Gems' },
    { icon: '⚡', label: 'Powers' }
  ];

  // Obstacle icons - all the dangerous ones
  const obstacles = [
    { icon: '☠️', label: 'Skull' },
    { icon: '🪤', label: 'Trap' },
    { icon: '🦂', label: 'Scorpion' },
    { icon: '🕷️', label: 'Spider' },
    { icon: '💀', label: 'Death' },
    { icon: '🪵', label: 'Rake' },
    { icon: '🌵', label: 'Cactus' },
    { icon: '🔥', label: 'Fire' },
    { icon: '👽', label: 'Alien' },
    { icon: '💣', label: 'Bomb' },
    { icon: '⚙️', label: 'Saw' },
    { icon: '🛸', label: 'UFO' },
    { icon: '🚗', label: 'Car' },
    { icon: '🧨', label: 'TNT' },
    { icon: '⚡', label: 'Laser' },
    { icon: '⛓️', label: 'Spikes' },
    { icon: '🌋', label: 'Lava' },
    { icon: '🌪️', label: 'Tornado' },
    { icon: '🏗️', label: 'Anvil' }
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🎮 GAMEPLAY GUIDE</Text>
          <Text style={styles.subtitle}>Remember These Icons!</Text>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* TO BE EATEN Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="check-circle" size={24} color="#10B981" />
              <Text style={styles.sectionTitle}>TO BE EATEN</Text>
            </View>
            <View style={styles.iconGrid}>
              {collectibles.map((item, idx) => (
                <View key={idx} style={styles.iconCard}>
                  <Text style={styles.iconLarge}>{item.icon}</Text>
                  <Text style={styles.iconLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.sectionDesc}>
              Collect these to earn coins, gems, and activate special powers!
            </Text>
          </View>

          {/* TO BE AVOIDED Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="x-circle" size={24} color="#EF4444" />
              <Text style={styles.sectionTitle}>TO BE AVOIDED</Text>
            </View>
            <View style={styles.iconGrid}>
              {obstacles.map((item, idx) => (
                <View key={idx} style={styles.iconCard}>
                  <Text style={styles.iconMedium}>{item.icon}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.sectionDesc}>
              Avoid these obstacles or the game ends! Stay alert!
            </Text>
          </View>
        </ScrollView>

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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  container: {
    backgroundColor: '#18181B',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '85%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#27272A',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 10,
    lineHeight: 20,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  iconCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27272A',
    borderRadius: 12,
    padding: 10,
    minWidth: 65,
  },
  iconLarge: {
    fontSize: 40,
  },
  iconMedium: {
    fontSize: 32,
  },
  iconLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 10,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameplayTip;
