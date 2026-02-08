import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';
import { wp, hp, scale, verticalScale, moderateScale, responsiveFontSize } from '../utils/responsive';

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
    <SafeAreaView style={styles.overlay} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🎮</Text>
          <Text style={styles.title}>GAMEPLAY GUIDE</Text>
          <Text style={styles.subtitle}>Swipe or Tap to Move Between Lanes</Text>
        </View>

        {/* TO COLLECT Section */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { backgroundColor: '#10B98120' }]}>
            <Icon name="check-circle" size={scale(20)} color="#10B981" />
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
            <Icon name="x-circle" size={scale(20)} color="#EF4444" />
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
          <Icon name="play" size={scale(24)} color="#FFFFFF" />
        </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    padding: scale(20),
  },
  container: {
    backgroundColor: '#1F1F23',
    borderRadius: moderateScale(24),
    width: '100%',
    maxWidth: wp(90),
    maxHeight: hp(85),
    borderWidth: 3,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  scrollContent: {
    padding: scale(16),
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(16),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  emoji: {
    fontSize: responsiveFontSize(32),
    marginBottom: verticalScale(6),
  },
  title: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: verticalScale(4),
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: responsiveFontSize(12),
    color: '#94A3B8',
    textAlign: 'center',
  },
  section: {
    marginBottom: verticalScale(12),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(8),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
    gap: scale(8),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: scale(12),
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
    justifyContent: 'center',
  },
  iconCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27272A',
    borderRadius: moderateScale(12),
    padding: scale(8),
    borderWidth: 2,
    minWidth: scale(65),
  },
  iconLarge: {
    fontSize: responsiveFontSize(32),
    marginBottom: verticalScale(2),
  },
  iconMedium: {
    fontSize: responsiveFontSize(28),
    marginBottom: verticalScale(2),
  },
  iconLabel: {
    fontSize: responsiveFontSize(10),
    color: '#D1D5DB',
    fontWeight: '600',
    marginTop: verticalScale(2),
  },
  iconLabelSmall: {
    fontSize: responsiveFontSize(9),
    color: '#9CA3AF',
    marginTop: verticalScale(2),
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    borderRadius: moderateScale(12),
    padding: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(12),
    gap: scale(8),
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default GameplayTip;
