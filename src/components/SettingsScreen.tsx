import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';
import { Settings, BGMTrack, LegalPageType } from '../types';
import AboutUs from './AboutUs';
import { storage } from '../utils/storage';

interface SettingsScreenProps {
  settings: Settings;
  onSave: (s: Settings) => void;
  onBack: () => void;
  onShowTutorial: () => void;
  onOpenLegalPage?: (type: LegalPageType) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, onSave, onBack, onShowTutorial, onOpenLegalPage }) => {
  const [view, setView] = useState<'MAIN' | 'ABOUT' | 'POLICY' | 'TERMS' | 'CONSENT'>('MAIN');

  const toggle = (key: keyof Settings) => {
    onSave({ ...settings, [key]: !settings[key] });
  };

  const handleResetProfile = () => {
    Alert.alert(
      'Reset Profile',
      'Erase all progress? This action is permanent.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await storage.clear();
            // App would need to restart or reload state
          },
        },
      ]
    );
  };

  if (view === 'ABOUT') return <AboutUs onBack={() => setView('MAIN')} onOpenLegalPage={onOpenLegalPage || (() => {})} />;

  // Legal & Data Views
  if (view === 'POLICY' || view === 'TERMS' || view === 'CONSENT') {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.viewTitle}>
              {view === 'CONSENT' ? 'Personalization' : view === 'POLICY' ? 'Privacy Policy' : 'Terms of Service'}
            </Text>
            <TouchableOpacity 
              onPress={() => setView('MAIN')} 
              style={styles.headerCloseButton}
              activeOpacity={0.7}
            >
              <Icon name="chevron-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.legalScrollView} contentContainerStyle={styles.legalScrollContent}>
          {view === 'CONSENT' && (
            <View style={styles.consentContent}>
              <Text style={styles.legalText}>
                We respect your privacy. By enabling personalized ads, you help keep Wobbly Runner free for everyone. We never sell your personal identification data.
              </Text>
              <View style={styles.consentStatusCard}>
                <Text style={styles.consentStatusLabel}>Current Status</Text>
                <View style={[styles.consentStatusBadge, settings.hasConsented ? styles.consentActive : styles.consentInactive]}>
                  <Text style={[styles.consentStatusText, settings.hasConsented ? styles.consentActiveText : styles.consentInactiveText]}>
                    {settings.hasConsented ? 'Premium Data Sync Active' : 'Basic Ads Only'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => { onSave({ ...settings, hasConsented: true }); setView('MAIN'); }}
                style={styles.acceptButton}
                activeOpacity={0.8}
              >
                <Text style={styles.acceptButtonText}>Accept Personalization</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { onSave({ ...settings, hasConsented: false }); setView('MAIN'); }}
                style={styles.optOutButton}
                activeOpacity={0.8}
              >
                <Text style={styles.optOutButtonText}>Opt-Out</Text>
              </TouchableOpacity>
            </View>
          )}
          {view === 'POLICY' && (
            <View style={styles.legalTextContent}>
              <Text style={styles.legalHeading}>Privacy Policy</Text>
              <Text style={styles.legalText}>Last Updated: May 2024</Text>
              <Text style={styles.legalText}>
                <Text style={styles.legalBold}>1. Data Collection:</Text> We do not collect Personally Identifiable Information (PII). We collect non-personal device IDs and gameplay statistics to improve performance.
              </Text>
              <Text style={styles.legalText}>
                <Text style={styles.legalBold}>2. Third-Party Services:</Text> We use Google AdMob for advertisements. These providers may use cookies and device identifiers to serve personalized content if you grant consent.
              </Text>
              <Text style={styles.legalText}>
                <Text style={styles.legalBold}>3. Children's Privacy:</Text> Wobbly Runner is family-friendly. We strictly adhere to COPPA and GDPR-K guidelines.
              </Text>
            </View>
          )}
          {view === 'TERMS' && (
            <View style={styles.legalTextContent}>
              <Text style={styles.legalHeading}>Terms of Service</Text>
              <Text style={styles.legalText}>
                <Text style={styles.legalBold}>1. Acceptance:</Text> By playing Wobbly Runner, you agree to these terms.
              </Text>
              <Text style={styles.legalText}>
                <Text style={styles.legalBold}>2. Virtual Currency:</Text> "Coins" are virtual in-game items with no real-world monetary value.
              </Text>
              <Text style={styles.legalText}>
                <Text style={styles.legalBold}>3. Fair Play:</Text> Users are prohibited from using scripts, hacks, or exploits.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main Settings View
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={onBack} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>System Configuration</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Controls */}
        <View style={styles.controlsCard}>
          <SettingToggle 
            label="Audio Effects" 
            enabled={settings.soundEnabled} 
            icon={settings.soundEnabled ? "volume-2" : "volume-x"}
            onToggle={() => toggle('soundEnabled')} 
          />
          <SettingToggle 
            label="Music Playback" 
            enabled={settings.musicEnabled} 
            icon="music"
            onToggle={() => toggle('musicEnabled')} 
          />
          <SettingToggle 
            label="Vibration & Haptics" 
            enabled={settings.vibrationEnabled} 
            icon={settings.vibrationEnabled ? "bell" : "bell-off"}
            onToggle={() => toggle('vibrationEnabled')} 
          />
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksRow}>
          <SettingsButton 
            color="#EA580C" 
            icon="book-open" 
            label="Tutorial" 
            onClick={onShowTutorial} 
          />
          <SettingsButton 
            color="#4F46E5" 
            icon="user" 
            label="About Studio" 
            onClick={() => setView('ABOUT')} 
          />
        </View>

        {/* Info & Policy */}
        <View style={styles.menuCard}>
          <MenuLink 
            label="Privacy Policy" 
            icon="shield" 
            onClick={() => setView('POLICY')} 
          />
          <MenuLink 
            label="Ad Personalization" 
            icon="lock" 
            onClick={() => setView('CONSENT')} 
          />
          <MenuLink 
            label="Terms of Service" 
            icon="check-circle" 
            onClick={() => setView('TERMS')} 
          />
        </View>

        {/* Danger Zone */}
        <TouchableOpacity 
          onPress={handleResetProfile}
          style={styles.resetButton}
          activeOpacity={0.7}
        >
          <Icon name="trash-2" size={18} color="#EF4444" />
          <Text style={styles.resetButtonText}>Reset Profile</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 2.5.0 Prestige</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingToggle: React.FC<{ label: string; enabled: boolean; icon: string; onToggle: () => void }> = ({ label, enabled, icon, onToggle }) => (
  <TouchableOpacity 
    onPress={onToggle} 
    style={styles.toggleButton}
    activeOpacity={0.7}
  >
    <View style={styles.toggleLeft}>
      <View style={[styles.toggleIconContainer, enabled ? styles.toggleIconActive : styles.toggleIconInactive]}>
        <Icon name={icon as any} size={18} color={enabled ? "#818CF8" : "#52525B"} />
      </View>
      <Text style={styles.toggleLabel}>{label}</Text>
    </View>
    <View style={[styles.toggleSwitch, enabled && styles.toggleSwitchActive]}>
      <View style={[styles.toggleThumb, enabled && styles.toggleThumbActive]} />
    </View>
  </TouchableOpacity>
);

const SettingsButton: React.FC<{ color: string; icon: string; label: string; onClick: () => void }> = ({ color, icon, label, onClick }) => (
  <TouchableOpacity 
    onPress={onClick} 
    style={[styles.settingsButton, { backgroundColor: color }]}
    activeOpacity={0.8}
  >
    <View style={styles.settingsButtonIconWrapper}>
      <Icon name={icon as any} size={20} color="#FFFFFF" />
    </View>
    <Text style={styles.settingsButtonText}>{label}</Text>
  </TouchableOpacity>
);

const MenuLink: React.FC<{ label: string; icon: string; onClick: () => void }> = ({ label, icon, onClick }) => (
  <TouchableOpacity 
    onPress={onClick} 
    style={styles.menuLink}
    activeOpacity={0.7}
  >
    <View style={styles.menuLinkLeft}>
      <Icon name={icon as any} size={16} color="#71717A" />
      <Text style={styles.menuLinkLabel}>{label}</Text>
    </View>
    <Icon name="chevron-right" size={16} color="#3F3F46" />
  </TouchableOpacity>
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
  headerContainer: {
    marginBottom: 32,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 8,
    fontWeight: '900',
    color: '#818CF8',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginTop: 2,
  },
  headerCloseButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  controlsCard: {
    backgroundColor: '#18181B',
    borderRadius: 40,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 8,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  toggleIconContainer: {
    padding: 10,
    borderRadius: 12,
  },
  toggleIconActive: {
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
  },
  toggleIconInactive: {
    backgroundColor: 'rgba(82, 82, 91, 0.1)',
  },
  toggleLabel: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  toggleSwitch: {
    width: 56,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3F3F46',
    padding: 4,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#4F46E5',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    transform: [{ translateX: 28 }],
  },
  bgmSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  bgmSelectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bgmIconContainer: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
  },
  bgmSelectLabel: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bgmSelectRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bgmSelectValue: {
    fontSize: 10,
    color: '#71717A',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  quickLinksRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  settingsButton: {
    flex: 1,
    padding: 24,
    borderRadius: 40,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingsButtonIconWrapper: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
  },
  settingsButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  menuCard: {
    backgroundColor: '#18181B',
    borderRadius: 40,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  menuLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
  },
  menuLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuLinkLabel: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  resetButtonText: {
    color: '#EF4444',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  versionContainer: {
    paddingTop: 16,
    alignItems: 'center',
    opacity: 0.2,
  },
  versionText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  // BGM View Styles
  bgmScrollView: {
    flex: 1,
  },
  bgmScrollContent: {
    padding: 12,
    paddingBottom: 40,
  },
  viewTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  bgmTrackButton: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: '#18181B',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bgmTrackButtonSelected: {
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  bgmTrackText: {
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#52525B',
  },
  bgmTrackTextSelected: {
    color: '#FFFFFF',
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6366F1',
  },
  // Legal Views Styles
  legalScrollView: {
    flex: 1,
  },
  legalScrollContent: {
    padding: 32,
    paddingBottom: 80,
  },
  consentContent: {
    maxWidth: 512,
    alignSelf: 'center',
    width: '100%',
  },
  legalText: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 24,
  },
  legalTextContent: {
    maxWidth: 512,
    alignSelf: 'center',
    width: '100%',
  },
  legalHeading: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 16,
  },
  legalBold: {
    fontWeight: '900',
  },
  consentStatusCard: {
    padding: 20,
    backgroundColor: '#18181B',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
  },
  consentStatusLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  consentStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  consentActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  consentInactive: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: 'rgba(249, 115, 22, 0.2)',
  },
  consentStatusText: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  consentActiveText: {
    color: '#22C55E',
  },
  consentInactiveText: {
    color: '#F97316',
  },
  acceptButton: {
    width: '100%',
    paddingVertical: 24,
    backgroundColor: '#4F46E5',
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
  },
  optOutButton: {
    width: '100%',
    paddingVertical: 24,
    backgroundColor: '#27272A',
    borderRadius: 40,
    alignItems: 'center',
  },
  optOutButtonText: {
    color: '#71717A',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
  },
});

export default SettingsScreen;
