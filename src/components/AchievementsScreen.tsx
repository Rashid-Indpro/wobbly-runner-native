import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Animated, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Achievement, Rarity } from '../types';

interface AchievementsScreenProps {
  achievements: Achievement[];
  onBack: () => void;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ achievements, onBack }) => {
  const [selectedAward, setSelectedAward] = useState<Achievement | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [filter, setFilter] = useState<Rarity | 'ALL'>('ALL');
  const [revealActive, setRevealActive] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(5)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const certificateRef = useRef<View>(null);

  useEffect(() => {
    loadUserName();
  }, []);

  useEffect(() => {
    saveUserName();
  }, [userName]);

  useEffect(() => {
    if (selectedAward && selectedAward.isUnlocked) {
      setRevealActive(false);
      const timer = setTimeout(() => {
        setRevealActive(true);
        // Reveal animation
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedAward]);

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('wobbly_user_name');
      if (name) setUserName(name);
    } catch (error) {
      console.error('Failed to load user name:', error);
    }
  };

  const saveUserName = async () => {
    try {
      await AsyncStorage.setItem('wobbly_user_name', userName);
    } catch (error) {
      console.error('Failed to save user name:', error);
    }
  };

  const rarityWeight = { MYTHIC: 5, LEGENDARY: 4, EPIC: 3, RARE: 2, COMMON: 1 };
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.isUnlocked !== b.isUnlocked) return a.isUnlocked ? -1 : 1;
    return rarityWeight[b.rarity] - rarityWeight[a.rarity];
  });

  const filteredAchievements = filter === 'ALL' 
    ? sortedAchievements 
    : sortedAchievements.filter(a => a.rarity === filter);

  const stats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.isUnlocked).length
  };

  const getRarityTagColor = (rarity: Rarity) => {
    switch(rarity) {
      case 'COMMON': return '#71717A';
      case 'RARE': return '#60A5FA';
      case 'EPIC': return '#C084FC';
      case 'LEGENDARY': return '#FB923C';
      case 'MYTHIC': return '#F9A8D4';
      default: return '#71717A';
    }
  };

  const getPrestigeSalutation = (rarity: Rarity) => {
    switch(rarity) {
      case 'COMMON': return 'WOBBLY RUNNER ASPIRANT';
      case 'RARE': return 'ELITE CHAOS NAVIGATOR';
      case 'EPIC': return 'MEGA STAR OF WOBBLY RUNNER';
      case 'LEGENDARY': return 'ULTIMATE REALITY BENDER';
      case 'MYTHIC': return 'ASCENDED CHAOS DEITY';
      default: return 'PRESTIGE RUNNER';
    }
  };

  const handleShare = async () => {
    if (!selectedAward || !selectedAward.isUnlocked) return;
    
    try {
      // Check if sharing is available on this device
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Sharing Not Available', 'Sharing is not available on this device.');
        return;
      }

      // Show loading state (optional)
      Alert.alert('Preparing Certificate', 'Capturing your achievement...');

      // Capture the certificate view as an image
      if (!certificateRef.current) {
        Alert.alert('Error', 'Unable to capture certificate. Please try again.');
        return;
      }

      const uri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1,
      });

      // Create a temporary file path for the captured image
      const fileUri = `${FileSystem.cacheDirectory}wobbly_runner_certificate_${Date.now()}.png`;
      
      // Move the captured image to the cache directory
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Share the certificate with a message including the app download link
      const downloadLink = 'https://example.com';
      const message = `🚀 MY AURA IS PEAK! I just became the ${getPrestigeSalutation(selectedAward.rarity)}! 🤪\n\nDownload the app: ${downloadLink}`;

      await Sharing.shareAsync(fileUri, {
        mimeType: 'image/png',
        dialogTitle: 'Share Your Achievement',
        UTI: 'public.png',
      });

      // Clean up the temporary file after sharing
      // Note: We don't delete immediately as the sharing might still be in progress
      // The OS will clean up the cache directory eventually
      
    } catch (error) {
      console.error('Error sharing certificate:', error);
      Alert.alert('Share Failed', 'Unable to share the certificate. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={onBack} 
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Icon name="chevron-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Hall of Fame</Text>
              <Text style={styles.headerSubtitle}>Prestige Records</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>{stats.unlocked}/{stats.total}</Text>
              <View style={styles.statsDot} />
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(stats.unlocked/stats.total)*100}%` }]} />
            </View>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterScrollContent}
        >
          {(['ALL', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'] as const).map((r) => (
            <TouchableOpacity 
              key={r}
              onPress={() => setFilter(r as any)}
              style={[styles.filterButton, filter === r && styles.filterButtonActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, filter === r && styles.filterButtonTextActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.achievementsGrid}>
          {filteredAchievements.map((a) => (
            <TouchableOpacity 
              key={a.id} 
              onPress={() => setSelectedAward(a)}
              style={[
                styles.achievementCard,
                a.isUnlocked ? styles.achievementCardUnlocked : styles.achievementCardLocked
              ]}
              activeOpacity={0.8}
            >
              <View style={styles.achievementContent}>
                <View style={[styles.achievementIcon, !a.isUnlocked && styles.achievementIconLocked]}>
                  {a.isUnlocked ? (
                    <Text style={styles.achievementIconText}>{a.icon}</Text>
                  ) : (
                    <Icon name="lock" size={24} color="#3F3F46" />
                  )}
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={[styles.achievementRarity, { color: getRarityTagColor(a.rarity) }]}>
                    {a.rarity}
                  </Text>
                  <Text style={[styles.achievementTitle, !a.isUnlocked && styles.achievementTitleLocked]}>
                    {a.isUnlocked ? a.title : 'RESTRICTED'}
                  </Text>
                </View>
              </View>
              {a.isUnlocked && (
                <View style={styles.achievementBadge}>
                  <Icon name="shield" size={16} color="#818CF8" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={selectedAward !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAward(null)}
      >
        {selectedAward && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              onPress={() => setSelectedAward(null)}
              style={styles.modalCloseButton}
              activeOpacity={0.7}
            >
              <Icon name="x" size={28} color="#FFFFFF" />
              <Text style={styles.modalCloseText}>Exit View</Text>
            </TouchableOpacity>

            <ScrollView 
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View ref={certificateRef} collapsable={false} style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderEmoji}>🤪</Text>
                  <Text style={styles.modalHeaderTitle}>Wobbly Runner</Text>
                  <Text style={styles.modalHeaderSubtitle}>Chaos Dash</Text>
                </View>

                <View style={styles.modalIconContainer}>
                  {selectedAward.isUnlocked ? (
                    <>
                      <Animated.View 
                        style={[
                          styles.modalIconGlow,
                          {
                            opacity: glowAnim,
                            transform: [{ scale: glowAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 1.5]
                            })}]
                          }
                        ]} 
                      />
                      <Animated.Text 
                        style={[
                          styles.modalIconText,
                          {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }, { rotate: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['45deg', '0deg']
                            })}]
                          }
                        ]}
                      >
                        {selectedAward.icon}
                      </Animated.Text>
                    </>
                  ) : (
                    <View style={styles.modalIconLocked}>
                      <Icon name="alert-triangle" size={64} color="#27272A" />
                    </View>
                  )}
                </View>

                <Text style={[styles.modalTitle, !selectedAward.isUnlocked && styles.modalTitleLocked]}>
                  {selectedAward.isUnlocked ? selectedAward.title : 'RESTRICTED RECORD'}
                </Text>

                <View style={styles.modalDetailsContainer}>
                  <Text style={styles.modalSalutation}>{getPrestigeSalutation(selectedAward.rarity)}</Text>
                  {selectedAward.isUnlocked ? (
                    <View style={styles.nameInputContainer}>
                      <TextInput
                        placeholder="ENTER NAME"
                        maxLength={12}
                        value={userName}
                        onChangeText={(text) => setUserName(text.toUpperCase())}
                        style={styles.nameInput}
                        placeholderTextColor="#27272A"
                        autoComplete="off"
                        autoCorrect={false}
                        autoCapitalize="characters"
                        spellCheck={false}
                        keyboardType="default"
                      />
                    </View>
                  ) : (
                    <View style={styles.verificationPending}>
                      <Text style={styles.verificationText}>VERIFICATION PENDING</Text>
                      <Text style={styles.verificationDesc}>{selectedAward.description}</Text>
                    </View>
                  )}
                </View>

                {selectedAward.isUnlocked && (
                  <View style={styles.descriptionCard}>
                    <Text style={styles.descriptionText}>"{selectedAward.description}"</Text>
                  </View>
                )}

                <View style={styles.signaturesContainer}>
                  <View style={styles.signatureBlock}>
                    <Text style={styles.signatureName}>Tanveer Alam</Text>
                    <Text style={styles.signatureTitle}>Lead Designer</Text>
                    <Text style={styles.signatureTitle}>& Creative Director</Text>
                  </View>
                  <View style={styles.signatureBlock}>
                    <Text style={styles.signatureName}>Md Rashid</Text>
                    <Text style={styles.signatureTitle}>Technical Lead</Text>
                    <Text style={styles.signatureTitle}>& Engine Architect</Text>
                  </View>
                </View>

                {selectedAward.isUnlocked && revealActive && (
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity 
                      onPress={handleShare}
                      style={styles.shareButton}
                      activeOpacity={0.8}
                    >
                      <Icon name="share-2" size={18} color="#FFFFFF" />
                      <Text style={styles.shareButtonText}>FLEX RECORD</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <Text style={styles.modalFooter}>
                  Claim your glory • Chaos Dash Legend
                </Text>
              </View>
            </ScrollView>

            <Text style={styles.scrollHint}>Scroll to see full record</Text>
          </View>
        )}
      </Modal>
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
    backgroundColor: '#09090B',
  },
  header: {
    padding: 24,
    paddingBottom: 8,
    backgroundColor: 'rgba(9, 9, 11, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 9,
    fontWeight: '900',
    color: '#818CF8',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statsText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  progressBar: {
    width: 96,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterScrollContent: {
    gap: 8,
    paddingRight: 24,
  },
  filterButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  filterButtonActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    shadowColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  filterButtonText: {
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#71717A',
  },
  filterButtonTextActive: {
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 128,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  achievementCard: {
    width: '47%',
    borderRadius: 40,
    padding: 20,
    borderWidth: 2,
    position: 'relative',
  },
  achievementCardUnlocked: {
    borderColor: 'rgba(99, 102, 241, 0.4)',
    backgroundColor: '#18181B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 10,
  },
  achievementCardLocked: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(24, 24, 27, 0.4)',
    opacity: 0.3,
  },
  achievementContent: {
    alignItems: 'center',
    gap: 16,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconLocked: {
    transform: [{ scale: 0.75 }],
  },
  achievementIconText: {
    fontSize: 40,
  },
  achievementInfo: {
    width: '100%',
    alignItems: 'center',
  },
  achievementRarity: {
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  achievementTitle: {
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#3F3F46',
  },
  achievementBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    padding: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 24,
    zIndex: 150,
    shadowColor: 'rgba(79, 70, 229, 0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#818CF8',
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  modalScroll: {
    flex: 1,
    width: '100%',
    maxWidth: 768,
  },
  modalScrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#020617',
    borderWidth: 4,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: 24,
    shadowColor: 'rgba(79, 70, 229, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 30,
    padding: 24,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 720,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  modalHeaderTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalHeaderSubtitle: {
    fontSize: 9,
    fontWeight: '900',
    color: '#818CF8',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginTop: 2,
  },
  modalIconContainer: {
    position: 'relative',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalIconGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 50,
  },
  modalIconText: {
    fontSize: 70,
    textShadowColor: 'rgba(99, 102, 241, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  modalIconLocked: {
    width: 128,
    height: 128,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.4,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  modalTitleLocked: {
    color: '#27272A',
  },
  modalDetailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  modalSalutation: {
    color: '#818CF8',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 12,
  },
  nameInputContainer: {
    maxWidth: 384,
    alignSelf: 'center',
    width: '100%',
  },
  nameInput: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  verificationPending: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 32,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    gap: 12,
  },
  verificationText: {
    color: '#3F3F46',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  verificationDesc: {
    color: '#52525B',
    fontSize: 9,
    fontWeight: '700',
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
    width: '100%',
    marginBottom: 20,
  },
  descriptionText: {
    color: '#E2E8F0',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  signaturesContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 20,
  },
  signatureBlock: {
    flex: 1,
    alignItems: 'center',
  },
  signatureName: {
    fontSize: 13,
    fontWeight: '900',
    color: 'rgba(129, 140, 248, 0.9)',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  signatureTitle: {
    fontSize: 7,
    color: '#52525B',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    lineHeight: 10,
  },
  actionsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  shareButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  modalFooter: {
    fontSize: 9,
    color: 'rgba(99, 102, 241, 0.4)',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  scrollHint: {
    marginTop: 24,
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
});

export default AchievementsScreen;
