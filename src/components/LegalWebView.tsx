import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Feather as Icon } from '@expo/vector-icons';
import { wp, hp, scale, verticalScale, moderateScale, responsiveFontSize } from '../utils/responsive';

interface LegalWebViewProps {
  url: string;
  title: string;
  onBack: () => void;
}

const LegalWebView: React.FC<LegalWebViewProps> = ({ url, title, onBack }) => {
  console.log(`📄 Opening legal page: ${title} - ${url}`);

  const openInBrowser = async () => {
    try {
      console.log(`🌐 Opening ${title} in web browser`);
      
      // SDK 54 compatible options
      await WebBrowser.openBrowserAsync(url, {
        // iOS options
        controlsColor: '#4338ca',
        dismissButtonStyle: 'close',
        readerMode: false,
        
        // Android options
        toolbarColor: '#4338ca',
        enableBarCollapsing: false,
        showInRecents: false,
      });
    } catch (error) {
      console.error(`❌ Error opening legal page: ${title}`, error);
    }
  };

  React.useEffect(() => {
    // Automatically open the page when component mounts
    openInBrowser();
    // Immediately go back to keep the app flow smooth
    setTimeout(() => {
      console.log(`⬅️ Auto-returning from legal page: ${title}`);
      onBack();
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            console.log(`⬅️ User closed legal page: ${title}`);
            onBack();
          }}
          activeOpacity={0.7}
        >
          <Icon name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        
        <View style={styles.placeholder} />
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <Icon name="external-link" size={48} color="#667eea" />
        <Text style={styles.contentTitle}>Opening in Browser</Text>
        <Text style={styles.contentDescription}>
          {title} is opening in your default browser for the best reading experience.
        </Text>
        
        <TouchableOpacity 
          style={styles.reopenButton}
          onPress={openInBrowser}
          activeOpacity={0.8}
        >
          <Icon name="refresh-cw" size={20} color="#ffffff" />
          <Text style={styles.reopenButtonText}>Open Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  header: {
    backgroundColor: '#4338ca',
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(15),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: scale(8),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: scale(10),
  },
  placeholder: {
    width: scale(40),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(40),
  },
  contentTitle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(24),
    fontWeight: '700',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  contentDescription: {
    color: '#a1a1aa',
    fontSize: responsiveFontSize(16),
    lineHeight: scale(24),
    textAlign: 'center',
    marginBottom: verticalScale(40),
  },
  reopenButton: {
    backgroundColor: '#4338ca',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(25),
    borderRadius: moderateScale(12),
    gap: scale(10),
  },
  reopenButtonText: {
    color: '#ffffff',
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
});

export default LegalWebView;