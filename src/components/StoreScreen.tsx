import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';
import LinearGradient from './LinearGradient';
import { PowerUp, Skin, Rarity } from '../types';
import { POWER_UPS, SKINS } from '../constants';

interface StoreScreenProps {
  totalCoins: number;
  ownedPowerUses: Record<string, number>;
  equippedPowerIds: string[];
  unlockedSkins: string[];
  selectedSkinId: string;
  onBuySkin: (skin: Skin) => void;
  onBuyPower: (power: PowerUp) => void;
  onEquipPower: (id: string) => void;
  onSelectSkin: (id: string) => void;
  onBack: () => void;
  onSelectPowerAd: (p: PowerUp) => void;
  onWatchAdForCoins: () => void;
}

const StoreScreen: React.FC<StoreScreenProps> = ({ 
  totalCoins, ownedPowerUses, equippedPowerIds, unlockedSkins, selectedSkinId, 
  onBuySkin, onBuyPower, onEquipPower, onSelectSkin, onBack, onSelectPowerAd, onWatchAdForCoins 
}) => {
  const [tab, setTab] = useState<'POWERS' | 'SKINS'>('SKINS');
  const [previewSkin, setPreviewSkin] = useState<Skin | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const powers = Object.values(POWER_UPS);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getRarityColor = (rarity: Rarity) => {
    switch(rarity) {
      case 'COMMON': return '#A1A1AA';
      case 'RARE': return '#60A5FA';
      case 'EPIC': return '#C084FC';
      case 'LEGENDARY': return '#FB923C';
      case 'MYTHIC': return '#E879F9';
      default: return '#FFFFFF';
    }
  };

  const getRarityBgColor = (rarity: Rarity) => {
    switch(rarity) {
      case 'COMMON': return 'rgba(161, 161, 170, 0.1)';
      case 'RARE': return 'rgba(96, 165, 250, 0.1)';
      case 'EPIC': return 'rgba(192, 132, 252, 0.1)';
      case 'LEGENDARY': return 'rgba(251, 146, 60, 0.1)';
      case 'MYTHIC': return 'rgba(232, 121, 249, 0.1)';
      default: return 'rgba(161, 161, 170, 0.1)';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={onBack} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Icon name="chevron-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crystal Vault</Text>
        </View>
        <LinearGradient
          colors={['rgba(250, 204, 21, 0.2)', 'rgba(250, 204, 21, 0.1)']}
          style={styles.coinsDisplay}
        >
          <Text style={styles.coinsText}>🪙 {totalCoins}</Text>
        </LinearGradient>
      </View>

      <TouchableOpacity 
        onPress={onWatchAdForCoins}
        style={styles.adBanner}
        activeOpacity={0.8}
      >
        <View style={styles.adBannerLeft}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <View style={styles.adIconWrapper}>
              <Icon name="dollar-sign" size={20} color="#000000" />
            </View>
          </Animated.View>
          <View>
            <Text style={styles.adBannerLabel}>Low on Coins?</Text>
            <Text style={styles.adBannerTitle}>Watch Ad for 2500 Coins!</Text>
          </View>
        </View>
        <View style={styles.adBannerButton}>
          <Text style={styles.adBannerButtonText}>Watch</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          onPress={() => setTab('SKINS')}
          style={[styles.tabButton, tab === 'SKINS' && styles.tabButtonActive]}
          activeOpacity={0.7}
        >
          <Icon name="user" size={16} color={tab === 'SKINS' ? '#FFFFFF' : '#71717A'} />
          <Text style={[styles.tabButtonText, tab === 'SKINS' && styles.tabButtonTextActive]}>Wobblers</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setTab('POWERS')}
          style={[styles.tabButton, tab === 'POWERS' && styles.tabButtonActive]}
          activeOpacity={0.7}
        >
          <Icon name="zap" size={16} color={tab === 'POWERS' ? '#FFFFFF' : '#71717A'} />
          <Text style={[styles.tabButtonText, tab === 'POWERS' && styles.tabButtonTextActive]}>Powers</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'POWERS' ? (
          <>
            <LinearGradient
              colors={['rgba(79, 70, 229, 0.3)', 'rgba(139, 92, 246, 0.3)']}
              style={styles.equippedCard}
            >
              <View style={styles.equippedCardContent}>
                <View style={styles.equippedIconWrapper}>
                  <Icon name="star" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.equippedTextContainer}>
                  <Text style={styles.equippedTitle}>Battle Ready</Text>
                  <Text style={styles.equippedDesc}>Equip up to 3 powers to bring into battle!</Text>
                </View>
              </View>
              <View style={styles.equippedSlotsRow}>
                {[0, 1, 2].map(i => {
                  const pId = equippedPowerIds[i];
                  const p = pId ? powers.find(pw => pw.id === pId) : null;
                  return (
                    <View key={i} style={[styles.equippedSlot, p && styles.equippedSlotFilled]}>
                      {p ? <Text style={styles.equippedSlotIcon}>{p.icon}</Text> : <View style={styles.equippedSlotDot} />}
                    </View>
                  );
                })}
              </View>
            </LinearGradient>

            {powers.map((p) => {
              const isEquipped = equippedPowerIds.includes(p.id);
              const uses = ownedPowerUses[p.id] || 0;
              const price = p.coinPrice || 1000;
              const canAfford = totalCoins >= price;
              return (
                <View 
                  key={p.id}
                  style={[styles.powerCard, isEquipped && styles.powerCardEquipped]}
                >
                  <View style={styles.powerCardRow}>
                    <View style={styles.powerIconContainer}>
                      <Text style={styles.powerIcon}>{p.icon}</Text>
                    </View>
                    <View style={styles.powerInfoContainer}>
                      <View style={styles.powerTitleRow}>
                        <Text style={styles.powerName}>{p.name}</Text>
                        <View style={styles.powerDurationBadge}>
                          <Text style={styles.powerDurationText}>{p.purchasedDuration/1000}s Power</Text>
                        </View>
                      </View>
                      <Text style={styles.powerDesc}>{p.description}</Text>
                      {uses > 0 && (
                        <Text style={styles.powerUsesText}>{uses} Uses Available</Text>
                      )}
                    </View>
                    <View style={styles.powerActions}>
                      {uses > 0 ? (
                        <TouchableOpacity 
                          onPress={() => onEquipPower(p.id)}
                          style={[styles.equipButton, isEquipped && styles.equipButtonActive]}
                          activeOpacity={0.8}
                        >
                          <Icon name={isEquipped ? "x" : "check"} size={12} color={isEquipped ? "#000000" : "#FFFFFF"} />
                          <Text style={[styles.equipButtonText, isEquipped && styles.equipButtonTextActive]}>
                            {isEquipped ? 'REMOVE' : 'EQUIP'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity 
                          onPress={() => onBuyPower(p)}
                          style={[styles.buyButton, !canAfford && styles.buyButtonDisabled]}
                          activeOpacity={0.8}
                        >
                          <Text style={[styles.buyButtonText, !canAfford && styles.buyButtonTextDisabled]}>🪙 {price}</Text>
                          <Text style={[styles.buyButtonSubtext, !canAfford && styles.buyButtonTextDisabled]}>3 USES</Text>
                        </TouchableOpacity>
                      )}
                      
                      {uses === 0 && (
                        <TouchableOpacity 
                          onPress={() => onSelectPowerAd(p)}
                          style={styles.freeAdButton}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.freeAdButtonText}>FREE AD</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        ) : (
          <View style={styles.skinsGrid}>
            {SKINS.map((skin) => {
              const isUnlocked = unlockedSkins.includes(skin.id);
              const isSelected = selectedSkinId === skin.id;
              const canAfford = totalCoins >= skin.price;
              
              return (
                <TouchableOpacity 
                  key={skin.id}
                  style={[
                    styles.skinCard,
                    isSelected && styles.skinCardSelected
                  ]}
                  onPress={() => setPreviewSkin(skin)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.skinRarityBadge, { backgroundColor: getRarityBgColor(skin.rarity) }]}>
                    <Text style={[styles.skinRarityText, { color: getRarityColor(skin.rarity) }]}>{skin.rarity}</Text>
                  </View>

                  <View 
                    style={[
                      styles.skinIconContainer,
                      { backgroundColor: skin.color },
                      !isUnlocked && styles.skinIconLocked
                    ]}
                  >
                    <Text style={styles.skinIconText}>{skin.icon}</Text>
                    {!isUnlocked && <Icon name="lock" size={24} color="rgba(255, 255, 255, 0.5)" style={styles.skinLockIcon} />}
                  </View>
                  
                  <Text style={[styles.skinName, { color: getRarityColor(skin.rarity) }]}>{skin.name}</Text>
                  
                  {isUnlocked ? (
                    <TouchableOpacity 
                      onPress={(e) => { e.stopPropagation(); onSelectSkin(skin.id); }}
                      style={[styles.skinSelectButton, isSelected && styles.skinSelectButtonActive]}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.skinSelectButtonText, isSelected && styles.skinSelectButtonTextActive]}>
                        {isSelected ? 'EQUIPPED' : 'SELECT'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.skinBuyContainer}>
                      <Text style={[styles.skinPrice, !canAfford && styles.skinPriceDisabled]}>
                        🪙 {skin.price.toLocaleString()}
                      </Text>
                      <TouchableOpacity 
                        onPress={(e) => { 
                          e.stopPropagation(); 
                          if (canAfford) onBuySkin(skin);
                          else onWatchAdForCoins();
                        }}
                        style={[styles.skinBuyButton, !canAfford && styles.skinBuyButtonDisabled]}
                        activeOpacity={0.8}
                      >
                        <Icon name={canAfford ? "shopping-cart" : "dollar-sign"} size={10} color={canAfford ? "#000000" : "#71717A"} />
                        <Text style={[styles.skinBuyButtonText, !canAfford && styles.skinBuyButtonTextDisabled]}>
                          {canAfford ? 'BUY NOW' : 'GET COINS'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={previewSkin !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewSkin(null)}
      >
        {previewSkin && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              onPress={() => setPreviewSkin(null)}
              style={styles.modalCloseButton}
              activeOpacity={0.7}
            >
              <Icon name="x" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.modalContent}>
              <View style={styles.previewContainer}>
                <View style={[styles.previewGlow, { backgroundColor: previewSkin.color }]} />
                <View 
                  style={[styles.previewIcon, { backgroundColor: previewSkin.color }]}
                >
                  <Text style={styles.previewIconText}>{previewSkin.icon}</Text>
                </View>
              </View>

              <View style={styles.previewTextContainer}>
                <Text style={[styles.previewRarity, { color: getRarityColor(previewSkin.rarity) }]}>
                  {previewSkin.rarity} WOBBLER
                </Text>
                <Text style={styles.previewName}>{previewSkin.name}</Text>
              </View>

              <View style={styles.perksCard}>
                <BenefitItem icon="trending-up" label="Score Multiplier" value={`${previewSkin.perks.scoreMult}x`} color="#22C55E" />
                <BenefitItem icon="dollar-sign" label="Coin Collection" value={`${previewSkin.perks.coinMult}x`} color="#EAB308" />
                <BenefitItem icon="target" label="Magnet Range" value={`+${previewSkin.perks.magnetRangeBonus}m`} color="#3B82F6" />
                <BenefitItem icon="clock" label="Shield Bonus" value={`+${previewSkin.perks.invincibilityBonus / 1000}s`} color="#A855F7" />
              </View>

              <View style={styles.modalButtonRow}>
                {unlockedSkins.includes(previewSkin.id) ? (
                  <TouchableOpacity 
                    onPress={() => { onSelectSkin(previewSkin.id); setPreviewSkin(null); }}
                    style={[
                      styles.modalActionButton,
                      selectedSkinId === previewSkin.id && styles.modalActionButtonDisabled
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.modalActionButtonText,
                      selectedSkinId === previewSkin.id && styles.modalActionButtonTextDisabled
                    ]}>
                      {selectedSkinId === previewSkin.id ? 'ALREADY EQUIPPED' : 'EQUIP NOW'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    onPress={() => { 
                      if (totalCoins >= previewSkin.price) {
                        onBuySkin(previewSkin); 
                        setPreviewSkin(null); 
                      } else {
                        onWatchAdForCoins();
                        setPreviewSkin(null);
                      }
                    }}
                    style={[
                      styles.modalActionButton,
                      totalCoins < previewSkin.price && styles.modalActionButtonAlt
                    ]}
                    activeOpacity={0.8}
                  >
                    <Icon 
                      name={totalCoins >= previewSkin.price ? "shopping-cart" : "dollar-sign"} 
                      size={20} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.modalActionButtonText}>
                      {totalCoins >= previewSkin.price 
                        ? `BUY FOR 🪙 ${previewSkin.price.toLocaleString()}` 
                        : 'GET COINS VIA AD'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const BenefitItem: React.FC<{ icon: string, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <View style={styles.benefitItem}>
    <View style={styles.benefitLeft}>
      <View style={styles.benefitIconWrapper}>
        <Icon name={icon as any} size={18} color={color} />
      </View>
      <Text style={styles.benefitLabel}>{label}</Text>
    </View>
    <Text style={[styles.benefitValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#09090B',
    padding: 24,
  },
  header: {
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
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  coinsDisplay: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.3)',
  },
  coinsText: {
    color: '#FACC15',
    fontWeight: '900',
    fontSize: 16,
  },
  adBanner: {
    marginBottom: 24,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'rgba(234, 179, 8, 0.3)',
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
  },
  adBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adIconWrapper: {
    backgroundColor: '#EAB308',
    padding: 8,
    borderRadius: 12,
  },
  adBannerLabel: {
    color: '#EAB308',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 2,
  },
  adBannerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  adBannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  adBannerButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 6,
    backgroundColor: '#18181B',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#4F46E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  tabButtonText: {
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#71717A',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  equippedCard: {
    borderRadius: 40,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(79, 70, 229, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  equippedCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  equippedIconWrapper: {
    padding: 12,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  equippedTextContainer: {
    flex: 1,
  },
  equippedTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  equippedDesc: {
    color: '#C7D2FE',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
    opacity: 0.8,
  },
  equippedSlotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  equippedSlot: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  equippedSlotFilled: {
    backgroundColor: 'rgba(79, 70, 229, 0.4)',
    borderColor: '#818CF8',
    borderStyle: 'solid',
  },
  equippedSlotIcon: {
    fontSize: 28,
  },
  equippedSlotDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  powerCard: {
    backgroundColor: '#18181B',
    borderRadius: 40,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 16,
  },
  powerCardEquipped: {
    borderColor: '#818CF8',
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
  },
  powerCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  powerIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(39, 39, 42, 0.8)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  powerIcon: {
    fontSize: 40,
  },
  powerInfoContainer: {
    flex: 1,
  },
  powerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  powerName: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  powerDurationBadge: {
    backgroundColor: 'rgba(129, 140, 248, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexShrink: 0,
  },
  powerDurationText: {
    color: '#C7D2FE',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  powerDesc: {
    color: '#71717A',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 16,
    marginBottom: 8,
  },
  powerUsesText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#818CF8',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  powerActions: {
    minWidth: 80,
    gap: 8,
  },
  equipButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  equipButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  equipButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 2,
  },
  equipButtonTextActive: {
    color: '#000000',
  },
  buyButton: {
    backgroundColor: '#FACC15',
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#27272A',
  },
  buyButtonText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 9,
  },
  buyButtonTextDisabled: {
    color: '#71717A',
  },
  buyButtonSubtext: {
    color: '#000000',
    fontSize: 7,
    fontWeight: '700',
    opacity: 0.7,
  },
  freeAdButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  freeAdButtonText: {
    color: '#A1A1AA',
    fontWeight: '900',
    fontSize: 8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  skinsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  skinCard: {
    width: '47%',
    backgroundColor: '#18181B',
    borderRadius: 40,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    position: 'relative',
  },
  skinCardSelected: {
    borderColor: '#FACC15',
    backgroundColor: 'rgba(250, 204, 21, 0.05)',
  },
  skinRarityBadge: {
    position: 'absolute',
    top: 12,
    left: '50%',
    transform: [{ translateX: -40 }],
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  skinRarityText: {
    fontSize: 7,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  skinIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  skinIconLocked: {
    opacity: 0.4,
  },
  skinIconText: {
    fontSize: 48,
  },
  skinLockIcon: {
    position: 'absolute',
  },
  skinName: {
    fontWeight: '900',
    fontSize: 11,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  skinSelectButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#27272A',
  },
  skinSelectButtonActive: {
    backgroundColor: '#FACC15',
  },
  skinSelectButtonText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  skinSelectButtonTextActive: {
    color: '#000000',
  },
  skinBuyContainer: {
    width: '100%',
    alignItems: 'center',
  },
  skinPrice: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FACC15',
    marginBottom: 6,
  },
  skinPriceDisabled: {
    color: '#71717A',
    opacity: 0.6,
  },
  skinBuyButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#FACC15',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  skinBuyButtonDisabled: {
    backgroundColor: '#27272A',
  },
  skinBuyButtonText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000000',
  },
  skinBuyButtonTextDisabled: {
    color: '#71717A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(9, 9, 11, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 32,
    right: 32,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalContent: {
    width: '100%',
    maxWidth: 384,
    alignItems: 'center',
  },
  previewContainer: {
    position: 'relative',
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
    width: 192,
    height: 192,
  },
  previewGlow: {
    position: 'absolute',
    width: 192,
    height: 192,
    borderRadius: 96,
    opacity: 0.4,
  },
  previewIcon: {
    width: 192,
    height: 192,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
    elevation: 20,
  },
  previewIconText: {
    fontSize: 100,
  },
  previewTextContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  previewRarity: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 8,
  },
  previewName: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
    textAlign: 'center',
  },
  perksCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 48,
    padding: 32,
    marginBottom: 40,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  benefitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIconWrapper: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  benefitLabel: {
    color: '#A1A1AA',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  benefitValue: {
    fontWeight: '900',
    fontSize: 18,
  },
  modalButtonRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  modalActionButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 32,
    backgroundColor: '#FACC15',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  modalActionButtonDisabled: {
    backgroundColor: '#27272A',
  },
  modalActionButtonAlt: {
    backgroundColor: '#4F46E5',
  },
  modalActionButtonText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  modalActionButtonTextDisabled: {
    color: '#71717A',
  },
});

export default StoreScreen;
