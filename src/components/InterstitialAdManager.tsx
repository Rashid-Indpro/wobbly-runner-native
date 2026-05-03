import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

interface InterstitialAdManagerProps {
  onComplete: () => void;
  onError?: () => void;
}

// Production Interstitial Ad ID for Game Over
// This is a NON-REWARDED ad that shows on game over only
const GAME_OVER_AD_ID = 'ca-app-pub-9218417844276973/6253096541';

const InterstitialAdManager: React.FC<InterstitialAdManagerProps> = ({ onComplete, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create interstitial ad instance
    const interstitial = InterstitialAd.createForAdRequest(GAME_OVER_AD_ID, {
      requestNonPersonalizedAdsOnly: false,
    });

    // Set up event listeners
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('✅ Game Over interstitial ad loaded successfully');
      setIsLoading(false);
      // Show the ad immediately after it loads
      interstitial.show();
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('🚪 Game Over ad closed - continuing to game over screen');
      onComplete();
    });

    const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, error => {
      console.error('❌ Game Over ad error:', error);
      setError('Ad not available.');
      setIsLoading(false);
      // Always complete after error so user isn't stuck
      setTimeout(() => {
        if (onError) {
          onError();
        } else {
          onComplete();
        }
      }, 1500);
    });

    // Load the ad
    console.log('📺 Loading Game Over interstitial ad...');
    interstitial.load();

    // Cleanup
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, [onComplete, onError]);

  // Show loading screen while ad is loading
  return (
    <View style={styles.container}>
      {isLoading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading Ad...</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ad not available</Text>
          <Text style={styles.errorSubtext}>Continuing...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: '700',
  },
  errorSubtext: {
    color: '#94A3B8',
    fontSize: 14,
  },
});

export default InterstitialAdManager;
