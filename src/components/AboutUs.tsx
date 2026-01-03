import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, Animated } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import LinearGradient from './LinearGradient';

interface AboutUsProps {
  onBack: () => void;
}

const TANVEER_IMAGE = require('../../assets/images/tanveerAlamPhoto.jpg');
const RASHID_IMAGE = require('../../assets/images/mdRashidPhoto.jpg');

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  const [viewerImage, setViewerImage] = useState<{ image: any, name: string } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const maxHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2000]
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onBack} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Studio Profile</Text>
          <Text style={styles.headerSubtitle}>Mastery & Vision</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Narrative Section */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={['rgba(79, 70, 229, 0.2)', 'transparent', 'rgba(192, 132, 252, 0.2)']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.heroCard}>
            <View style={styles.heroTitleRow}>
              <LinearGradient
                colors={['#4F46E5', '#6366F1']}
                style={styles.heroIconWrapper}
              >
                <Icon name="zap" size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.heroTitleLabel}>The Origin Story</Text>
            </View>

            <View style={styles.heroTitleContainer}>
              <Text style={styles.heroMainTitle}>Engineering </Text>
              <Text style={[styles.heroMainTitle, styles.heroAccent1]}>Chaos </Text>
              <Text style={styles.heroMainTitle}>into </Text>
              <Text style={[styles.heroMainTitle, styles.heroAccent2]}>Art.</Text>
            </View>

            <Text style={styles.heroDescription}>
              Wobbly Runner: Chaos Dash is the flagship creation born from the collaborative genius of Tanveer Alam and Md Rashid.
            </Text>
            
            <Animated.View style={[styles.expandedContent, { maxHeight }]}>
              <View style={styles.expandedInner}>
                <View style={styles.visionSection}>
                  <View style={styles.visionTitleRow}>
                    <Icon name="target" size={18} color="#818CF8" />
                    <Text style={styles.visionTitle}>Our Vision</Text>
                  </View>
                  <Text style={styles.visionText}>
                    At Wobbly Games Studio, we believe physics shouldn't just be realistic—it should be hilarious. Our vision is to bridge the gap between high-performance mobile engineering and instinctive, joy-filled gameplay. We create experiences that are as fun to fail as they are to win.
                  </Text>
                </View>

                <View style={styles.visionSection}>
                  <View style={styles.visionTitleRow}>
                    <Icon name="award" size={18} color="#E879F9" />
                    <Text style={styles.visionTitle}>The Philosophy</Text>
                  </View>
                  <Text style={styles.visionText}>
                    Every obstacle, every frame, and every wobble is intentional. By combining Tanveer's aesthetic architectonics with Rashid's robust engine logic, we've crafted a 'Wobble-Verse' that feels premium, looks stunning in 4K, and remains accessible to everyone.
                  </Text>
                </View>

                <View style={styles.valuesCard}>
                  <View style={styles.visionTitleRow}>
                    <Icon name="users" size={18} color="#EAB308" />
                    <Text style={styles.visionTitle}>Studio Values</Text>
                  </View>
                  <View style={styles.valuesGrid}>
                    {['Quality First', 'Player Joy', 'Pure Physics', 'Zero Lag'].map((value, i) => (
                      <View key={value} style={styles.valueItem}>
                        <View style={[styles.valueDot, i % 2 === 0 ? styles.valueDot1 : styles.valueDot2]} />
                        <Text style={styles.valueText}>{value}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </Animated.View>

            <TouchableOpacity 
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.expandButton}
              activeOpacity={0.8}
            >
              <Text style={styles.expandButtonText}>
                {isExpanded ? 'Collapse Insight' : 'Discover the Full Vision'}
              </Text>
              <Animated.View style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}>
                <Icon name="chevron-down" size={16} color="#818CF8" />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Founder Cards Header */}
        <Text style={styles.foundersHeader}>The Architects Behind the Dash</Text>
        
        {/* Founder Cards */}
        <View style={styles.foundersContainer}>
          <FounderCard 
            name="Tanveer Alam" 
            role="Lead Designer & Creative Director" 
            color="#F97316" 
            image={TANVEER_IMAGE}
            description="The visionary mind behind the game's soul. Tanveer specializes in human-centric design, ensuring that every wobbly movement feels responsive and every color palette sparks joy."
            tags={["UX Lead", "Game Designer", "Visual Master"]}
            onClick={() => setViewerImage({ image: TANVEER_IMAGE, name: "Tanveer Alam" })}
          />

          <FounderCard 
            name="Md Rashid" 
            role="Technical Lead & Engine Architect" 
            color="#3B82F6" 
            image={RASHID_IMAGE}
            description="The technical heartbeat of the project. Rashid's expertise in high-performance algorithms ensures that even with hundreds of physics-based obstacles, the game remains buttery smooth."
            tags={["Engine Dev", "Optimization", "Logic Architect"]}
            onClick={() => setViewerImage({ image: RASHID_IMAGE, name: "Md Rashid" })}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Icon name="heart" size={16} color="#EF4444" />
            <Text style={styles.footerText}>Crafted with Obsession</Text>
          </View>
          <Text style={styles.footerCopyright}>
            © 2024 WOBBLY GAMES STUDIO • PRESTIGE EDITION
          </Text>
        </View>
      </ScrollView>

      {/* Image Viewer Modal */}
      <Modal
        visible={viewerImage !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setViewerImage(null)}
      >
        {viewerImage && (
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setViewerImage(null)}
          >
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setViewerImage(null)}
              activeOpacity={0.7}
            >
              <Icon name="x" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalContent}
              activeOpacity={1}
            >
              <Image 
                source={viewerImage.image} 
                style={styles.modalImage}
                resizeMode="contain"
              />
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalName}>{viewerImage.name}</Text>
                <Text style={styles.modalHint}>Tap Anywhere To Close</Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </Modal>
    </View>
  );
};

interface FounderCardProps {
  name: string;
  role: string;
  color: string;
  image: any;
  description: string;
  tags: string[];
  onClick: () => void;
}

const FounderCard: React.FC<FounderCardProps> = ({ name, role, color, image, description, tags, onClick }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity 
      onPress={onClick}
      style={styles.founderCard}
      activeOpacity={0.9}
    >
      <View style={styles.founderImageContainer}>
        <Animated.View 
          style={[
            styles.founderGlow,
            { 
              backgroundColor: color,
              transform: [{ scale: pulseAnim }]
            }
          ]} 
        />
        <View style={styles.founderImageWrapper}>
          <Image 
            source={image} 
            style={styles.founderImage}
            resizeMode="cover"
          />
          <View style={styles.founderImageOverlay}>
            <Icon name="maximize-2" size={32} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <View style={styles.founderInfo}>
        <Text style={styles.founderName}>{name}</Text>
        <Text style={styles.founderRole}>{role}</Text>

        <Text style={styles.founderDescription}>{description}</Text>

        <View style={styles.founderTags}>
          {tags.map(tag => (
            <View key={tag} style={styles.founderTag}>
              <Text style={styles.founderTagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.founderSocials}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Icon name="github" size={18} color="#71717A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Icon name="linkedin" size={18} color="#71717A" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(9, 9, 11, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 30,
  },
  backButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#818CF8',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 96,
  },
  heroContainer: {
    position: 'relative',
    marginBottom: 48,
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 48,
  },
  heroCard: {
    backgroundColor: 'rgba(24, 24, 27, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 48,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  heroIconWrapper: {
    padding: 10,
    borderRadius: 12,
    shadowColor: 'rgba(79, 70, 229, 0.4)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  heroTitleLabel: {
    fontWeight: '900',
    color: '#FFFFFF',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  heroTitleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  heroMainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  heroAccent1: {
    color: '#818CF8',
  },
  heroAccent2: {
    color: '#E879F9',
  },
  heroDescription: {
    color: '#D4D4D8',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 16,
  },
  expandedContent: {
    overflow: 'hidden',
  },
  expandedInner: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 16,
    gap: 32,
  },
  visionSection: {
    gap: 12,
  },
  visionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  visionTitle: {
    fontWeight: '900',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  visionText: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  valuesCard: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 12,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '45%',
  },
  valueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  valueDot1: {
    backgroundColor: '#6366F1',
  },
  valueDot2: {
    backgroundColor: '#E879F9',
  },
  valueText: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#71717A',
    letterSpacing: 1,
  },
  expandButton: {
    marginTop: 24,
    width: '100%',
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  expandButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  foundersHeader: {
    color: '#71717A',
    fontWeight: '900',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 5,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  foundersContainer: {
    gap: 48,
    marginBottom: 48,
  },
  founderCard: {
    backgroundColor: 'rgba(24, 24, 27, 0.4)',
    borderRadius: 48,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  founderImageContainer: {
    position: 'absolute',
    top: -40,
    left: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
  },
  founderGlow: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
    opacity: 0.2,
  },
  founderImageWrapper: {
    position: 'relative',
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#09090B',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  founderImage: {
    width: '100%',
    height: '100%',
  },
  founderImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  founderInfo: {
    marginTop: 80,
    alignItems: 'center',
  },
  founderName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  founderRole: {
    color: '#71717A',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 24,
  },
  founderDescription: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
  },
  founderTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 32,
  },
  founderTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  founderTagText: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  founderSocials: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    opacity: 0.4,
  },
  footerText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  footerCopyright: {
    color: '#3F3F46',
    fontWeight: '900',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 24,
    zIndex: 3001,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  modalContent: {
    maxWidth: 512,
    width: '100%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    maxHeight: 512,
    borderRadius: 56,
    shadowColor: 'rgba(255, 255, 255, 0.15)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 120,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTextContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  modalName: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  modalHint: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default AboutUs;
