import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { RewardedAd, RewardedAdEventType, AdEventType, TestIds } from 'react-native-google-mobile-ads';

interface RewardedAdManagerProps {
  onComplete: () => void;
  onError?: () => void;
}

// Production AdMob ID - always use production ID for release builds
// If you need to test ads during development, temporarily replace with TestIds.REWARDED
const AD_UNIT_ID = 'ca-app-pub-9218417844776973/9111323742';

const RewardedAdManager: React.FC<RewardedAdManagerProps> = ({ onComplete, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create rewarded ad instance
    const rewarded = RewardedAd.createForAdRequest(AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: false,
    });

    let hasEarnedReward = false;

    // Set up event listeners
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('✅ Rewarded ad loaded successfully');
      setIsLoading(false);
      // Show the ad immediately after it loads
      rewarded.show();
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('💰 User earned reward:', reward);
        hasEarnedReward = true;
      }
    );

    const unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('🚪 Rewarded ad closed');
      if (hasEarnedReward) {
        onComplete();
      } else {
        console.log('⚠️ User closed ad without earning reward');
        if (onError) {
          onError();
        } else {
          onComplete();
        }
      }
    });

    const unsubscribeError = rewarded.addAdEventListener(AdEventType.ERROR, error => {
      console.error('❌ Rewarded ad error:', error);
      setError('Ad not available. Try again later.');
      setIsLoading(false);
      // Always complete after error so user isn't stuck
      setTimeout(() => {
        if (onError) {
          onError();
        } else {
          onComplete();
        }
      }, 2000);
    });

    // Load the ad
    console.log('📺 Loading rewarded ad...');
    rewarded.load();

    // Cleanup
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
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
          <Text style={styles.errorSubtext}>Please try again later</Text>
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

export default RewardedAdManager;
