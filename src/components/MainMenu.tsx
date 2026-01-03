import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import LinearGradient from './LinearGradient';
import { Feather as Icon } from '@expo/vector-icons';
import { Skin, Achievement, Rarity, PowerUp } from '../types';

const { width, height } = Dimensions.get('window');

interface MainMenuProps {
  highScore: number;
  onStart: () => void;
  onStore: () => void;
  onSettings: () => void;
  onAchievements: () => void;
  onAboutUs: () => void;
  activeSkin: Skin;
  achievements: Achievement[];
  equippedPowers: PowerUp[];
  ownedPowerUses: Record<string, number>;
}

const MainMenu: React.FC<MainMenuProps> = ({
  highScore,
  onStart,
  onStore,
  onSettings,
  onAchievements,
  onAboutUs,
  activeSkin,
  achievements,
  equippedPowers,
  ownedPowerUses,
}) => {
  const [showAwardDetails, setShowAwardDetails] = useState(false);

  const rarityOrder: Rarity[] = ['MYTHIC', 'LEGENDARY', 'EPIC', 'RARE', 'COMMON'];
  const unlocked = achievements.filter(a => a.isUnlocked);
  const bestAward = rarityOrder.reduce((found: Achievement | null, rarity) => {
    if (found) return found;
    return unlocked.find(a => a.rarity === rarity) || null;
  }, null);

  const getRarityGlow = (rarity: Rarity) => {
    switch (rarity) {
      case 'COMMON':
        return { backgroundColor: '#a1a1aa', shadowColor: '#a1a1aa' };
      case 'RARE':
        return { backgroundColor: '#3b82f6', shadowColor: '#3b82f6' };
      case 'EPIC':
        return { backgroundColor: '#a855f7', shadowColor: '#a855f7' };
      case 'LEGENDARY':
        return { backgroundColor: '#f97316', shadowColor: '#f97316' };
      case 'MYTHIC':
        return { backgroundColor: '#ec4899', shadowColor: '#ec4899' };
      default:
        return { backgroundColor: '#a1a1aa', shadowColor: '#a1a1aa' };
    }
  };

  const getRarityTextColor = (rarity: Rarity) => {
    switch (rarity) {
      case 'COMMON':
        return '#a1a1aa';
      case 'RARE':
        return '#60a5fa';
      case 'EPIC':
        return '#c084fc';
      case 'LEGENDARY':
        return '#fb923c';
      case 'MYTHIC':
        return '#f472b6';
      default:
        return '#ffffff';
    }
  };

  return (
    <View style={styles.container}>
      {/* Background gradients */}
      <View style={styles.backgroundGradients}>
        <View style={[styles.gradientCircle, styles.gradientCircle1]} />
        <View style={[styles.gradientCircle, styles.gradientCircle2]} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleMain}>WOBBLY{'\n'}RUNNER</Text>
          <View style={styles.subtitleBadge}>
            <Text style={styles.subtitleText}>CHAOS DASH</Text>
          </View>
        </View>

        {/* Best Award Badge */}
        {bestAward && (
          <TouchableOpacity
            style={styles.awardBadge}
            onPress={() => setShowAwardDetails(true)}
            activeOpacity={0.8}>
            <View
              style={[
                styles.awardIcon,
                getRarityGlow(bestAward.rarity),
                { shadowOpacity: 0.6, shadowRadius: 15, elevation: 10 },
              ]}>
              <Text style={styles.awardEmoji}>{bestAward.icon}</Text>
            </View>
            <View style={styles.awardLabel}>
              <Text
                style={[
                  styles.awardRarity,
                  { color: getRarityTextColor(bestAward.rarity) },
                ]}>
                {bestAward.rarity}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Active Skin Display */}
        <TouchableOpacity
          style={styles.skinContainer}
          onPress={() => {
            console.log('🛒 User pressed skin container - Opening Store');
            onStore();
          }}
          activeOpacity={0.9}>
          <View style={styles.skinGlow} />
          <View
            style={[
              styles.skinBox,
              { borderColor: activeSkin.color + '44' },
            ]}>
            <Text style={styles.skinIcon}>{activeSkin.icon}</Text>
            <View
              style={[
                styles.skinOverlay,
                { backgroundColor: activeSkin.color },
              ]}
            />
          </View>
          <View
            style={[
              styles.skinNameBadge,
              { backgroundColor: activeSkin.color + '20' },
            ]}>
            <View
              style={[
                styles.skinDot,
                { backgroundColor: activeSkin.color },
              ]}
            />
            <Text style={styles.skinName}>{activeSkin.name}</Text>
          </View>
        </TouchableOpacity>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Icon name="award" size={20} color="#facc15" />
            <Text style={styles.statValue}>{highScore}</Text>
            <Text style={styles.statLabel}>BEST SCORE</Text>
          </View>

          <TouchableOpacity
            style={styles.achievementCard}
            onPress={() => {
              console.log('🏆 User pressed achievements button');
              onAchievements();
            }}
            activeOpacity={0.8}>
            <Icon name="award" size={20} color="#818cf8" />
            <View style={styles.achievementDot} />
            <Text style={styles.achievementTitle}>HALL OF FAME</Text>
            <Text style={styles.achievementProgress}>
              {unlocked.length}/{achievements.length} UNLOCKED
            </Text>
          </TouchableOpacity>
        </View>

        {/* Equipped Powers */}
        <View style={styles.powersContainer}>
          {equippedPowers.length > 0 ? (
            equippedPowers.map(p => (
              <View key={p.id} style={styles.powerBadge}>
                <Text style={styles.powerIcon}>{p.icon}</Text>
                <Text style={styles.powerCount}>
                  {ownedPowerUses[p.id] || 0}x
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noPowersText}>NO POWERS EQUIPPED</Text>
          )}
        </View>

        {/* DASH Button */}
        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => {
            console.log('🎮 User pressed DASH button - Starting game!');
            onStart();
          }}
          activeOpacity={0.9}>
          <View style={styles.dashButtonInner}>
            <Icon name="play" size={40} color="#4338ca" />
            <Text style={styles.dashButtonText}>DASH</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              console.log('🛒 User pressed Store button');
              onStore();
            }}
            activeOpacity={0.8}>
            <Icon name="shopping-bag" size={20} color="#71717a" />
            <Text style={styles.bottomButtonText}>STORE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              console.log('⚙️ User pressed Settings button');
              onSettings();
            }}
            activeOpacity={0.8}>
            <Icon name="settings" size={20} color="#71717a" />
            <Text style={styles.bottomButtonText}>SETTINGS</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Credits */}
        <TouchableOpacity style={styles.footerContainer} onPress={onAboutUs} activeOpacity={0.7}>
          <View style={styles.founderRow}>
            <Image
              source={require('../../assets/images/tanveerAlamPhoto.jpg')}
              style={styles.founderAvatar}
              resizeMode="cover"
            />
            <Text style={styles.founderName}>Tanveer</Text>
          </View>

          <View style={styles.dotSeparator} />

          <View style={styles.founderRow}>
            <Image
              source={require('../../assets/images/mdRashidPhoto.jpg')}
              style={styles.founderAvatar}
              resizeMode="cover"
            />
            <Text style={styles.founderName}>Rashid</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Award Details Modal */}
      {showAwardDetails && bestAward && (
        <Modal
          visible={showAwardDetails}
          transparent
          animationType="fade"
          onRequestClose={() => setShowAwardDetails(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowAwardDetails(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAwardDetails(false)}
                activeOpacity={0.8}>
                <Icon name="x" size={20} color="#ffffff" />
              </TouchableOpacity>

              <View
                style={[
                  styles.modalAwardIcon,
                  getRarityGlow(bestAward.rarity),
                  { shadowOpacity: 0.7, shadowRadius: 30, elevation: 15 },
                ]}>
                <Text style={styles.modalAwardEmoji}>{bestAward.icon}</Text>
              </View>

              <Text
                style={[
                  styles.modalRarity,
                  { color: getRarityTextColor(bestAward.rarity) },
                ]}>
                PRESTIGE {bestAward.rarity}
              </Text>

              <Text style={styles.modalTitle}>{bestAward.title}</Text>

              <Text style={styles.modalDescription}>
                {bestAward.description}
              </Text>

              <View style={styles.certificateBox}>
                <View style={styles.certificateHeader}>
                  <Icon name="info" size={16} color="#818cf8" />
                  <Text style={styles.certificateHeaderText}>
                    DIGITAL CERTIFICATE
                  </Text>
                </View>
                <Text style={styles.certificateText}>
                  You can personalize and download your official certificate
                  under the <Text style={styles.certificateHighlight}>Hall of Fame</Text>.
                </Text>
              </View>

              <Text style={styles.modalFooter}>
                Chaos Dash • Verified Prestige Achievement
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  backgroundGradients: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientCircle: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
  },
  gradientCircle1: {
    top: height * 0.15,
    left: width * 0.15,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  gradientCircle2: {
    bottom: height * 0.15,
    right: width * 0.15,
    backgroundColor: 'rgba(217, 70, 239, 0.1)',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
    transform: [{ rotate: '-2deg' }],
  },
  titleMain: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -2,
    lineHeight: 52,
    textShadowColor: 'rgba(79, 70, 229, 0.3)',
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 10,
  },
  subtitleBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(79, 70, 229, 0.5)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 8,
  },
  awardBadge: {
    position: 'absolute',
    top: 180,
    right: 16,
    zIndex: 20,
    alignItems: 'center',
  },
  awardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  awardEmoji: {
    fontSize: 28,
  },
  awardLabel: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  awardRarity: {
    fontSize: 6,
    fontWeight: '900',
    letterSpacing: 2,
  },
  skinContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  skinGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  skinBox: {
    width: 176,
    height: 176,
    borderRadius: 48,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 20,
  },
  skinIcon: {
    fontSize: 96,
    zIndex: 2,
  },
  skinOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 40,
    opacity: 0.2,
  },
  skinNameBadge: {
    marginTop: -24,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  skinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  skinName: {
    fontSize: 10,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    maxWidth: 400,
    marginTop: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#71717a',
    letterSpacing: 1.5,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.2)',
  },
  achievementDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
  },
  achievementTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  achievementProgress: {
    fontSize: 8,
    fontWeight: '900',
    color: 'rgba(129, 140, 248, 0.6)',
    letterSpacing: 1.5,
  },
  powersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 16,
    width: '100%',
    maxWidth: 400,
  },
  powerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  powerIcon: {
    fontSize: 12,
  },
  powerCount: {
    fontSize: 10,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
  },
  noPowersText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#52525b',
    letterSpacing: 2,
  },
  dashButton: {
    width: '100%',
    maxWidth: 400,
    marginVertical: 24,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    shadowColor: '#4338ca',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },
  dashButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 32,
  },
  dashButtonText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#4338ca',
    letterSpacing: 2,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 24,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomButtonText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
  },
  founderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  founderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  founderName: {
    fontSize: 8,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  dotSeparator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366f1',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  modalContent: {
    backgroundColor: '#18181b',
    borderRadius: 40,
    padding: 40,
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalAwardIcon: {
    width: 128,
    height: 128,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalAwardEmoji: {
    fontSize: 64,
  },
  modalRarity: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 14,
    fontWeight: '700',
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  certificateBox: {
    width: '100%',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.2)',
    gap: 8,
  },
  certificateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  certificateHeaderText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#818cf8',
    letterSpacing: 2,
  },
  certificateText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#a1a1aa',
    lineHeight: 14,
  },
  certificateHighlight: {
    color: '#ffffff',
  },
  modalFooter: {
    marginTop: 32,
    fontSize: 8,
    fontWeight: '900',
    color: '#52525b',
    letterSpacing: 2,
  },
});

export default MainMenu;
