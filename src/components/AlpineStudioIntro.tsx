import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

interface AlpineStudioIntroProps {
  onComplete: () => void;
}

const AlpineStudioIntro: React.FC<AlpineStudioIntroProps> = ({ onComplete }) => {
  const videoRef = useRef<Video>(null);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🎬 InteraMinds intro: Loading video...');
    
    // Fallback timer in case video fails to load
    const fallbackTimer = setTimeout(() => {
      console.log('⏱️ Video fallback timeout reached, completing intro');
      if (!hasCompleted) {
        setHasCompleted(true);
        onComplete();
      }
    }, 6000); // 6 second fallback

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      if (status.error) {
        console.error('❌ Video error:', status.error);
        setError(`Video error: ${status.error}`);
        // Complete intro on error
        if (!hasCompleted) {
          setHasCompleted(true);
          setTimeout(() => onComplete(), 500);
        }
      }
      return;
    }

    // Video is loaded and playing
    if (status.isPlaying) {
      console.log('▶️ Video is playing');
    }

    // Video finished playing
    if (status.didJustFinish && !hasCompleted) {
      console.log('✅ Video finished, completing intro');
      setHasCompleted(true);
      setTimeout(() => onComplete(), 300);
    }
  };

  const handleError = (error: string) => {
    console.error('❌ Video load error:', error);
    setError(error);
    if (!hasCompleted) {
      setHasCompleted(true);
      setTimeout(() => onComplete(), 500);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/videos/company-intro.mp4')}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={true}
        isLooping={false}
        isMuted={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={handleError}
        useNativeControls={false}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#666',
    fontSize: 14,
  },
});

export default AlpineStudioIntro;
