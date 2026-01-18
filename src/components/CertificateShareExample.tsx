/**
 * Certificate Sharing Example
 * 
 * Standalone example showing how to share an image with a fixed link
 * in React Native using react-native-share.
 * 
 * This can be adapted for any image sharing scenario in your app.
 */

import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import * as FileSystem from 'expo-file-system/legacy';

const CertificateShareExample = () => {
  // Reference to the view you want to capture
  const certificateRef = useRef<View>(null);

  /**
   * Main sharing function
   * Captures a view as image and shares it with text
   */
  const handleShareCertificate = async () => {
    try {
      // Step 1: Validate the ref exists
      if (!certificateRef.current) {
        Alert.alert('Error', 'Certificate not ready. Please try again.');
        return;
      }

      // Step 2: Show loading feedback (optional but recommended)
      Alert.alert('Preparing...', 'Capturing your certificate');

      // Step 3: Capture the view as an image
      const capturedUri = await captureRef(certificateRef, {
        format: 'png',      // PNG format for best quality
        quality: 1,         // 1 = highest quality (0.1 - 1)
        result: 'tmpfile',  // Save as temporary file
      });

      // Step 4: Move to cache directory with permanent name
      const timestamp = Date.now();
      const fileName = `certificate_${timestamp}.png`;
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      
      await FileSystem.moveAsync({
        from: capturedUri,
        to: fileUri,
      });

      // Step 5: Prepare the share content
      const FIXED_LINK = 'https://example.com'; // Your fixed link
      const shareMessage = `
🏆 Check out my achievement!

I just earned this certificate in Wobbly Runner!

Download the app and compete with me:
${FIXED_LINK}
      `.trim();

      // Step 6: Configure share options
      const shareOptions = {
        title: 'Share Certificate',           // Dialog title
        message: shareMessage,                 // Text that accompanies the image
        url: Platform.OS === 'ios' 
          ? fileUri                            // iOS: direct file path
          : `file://${fileUri}`,               // Android: needs file:// prefix
        type: 'image/png',                     // MIME type
        subject: 'My Achievement Certificate', // Email subject line
        failOnCancel: false,                   // Don't throw error if user cancels
      };

      // Step 7: Open the native share dialog
      const result = await Share.open(shareOptions);

      // Step 8: Handle successful share (optional)
      if (result && result.success) {
        console.log('Share successful!', result);
        // Optional: reward user, track analytics, etc.
      }

    } catch (error: any) {
      console.error('Sharing error:', error);

      // Handle user cancellation gracefully (not an actual error)
      if (error?.message?.includes('User did not share')) {
        console.log('User cancelled the share');
        return; // Don't show error alert
      }

      // Handle actual errors
      Alert.alert(
        'Sharing Failed',
        'Unable to share the certificate. Please try again.'
      );
    }
  };

  /**
   * Alternative: Share to specific platform (WhatsApp example)
   */
  const shareToWhatsApp = async () => {
    try {
      if (!certificateRef.current) return;

      // Capture and save (same as above)
      const uri = await captureRef(certificateRef, { format: 'png', quality: 1 });
      const fileUri = `${FileSystem.cacheDirectory}certificate_${Date.now()}.png`;
      await FileSystem.moveAsync({ from: uri, to: fileUri });

      // Share directly to WhatsApp
      await Share.shareSingle({
        title: 'Share to WhatsApp',
        message: '🏆 Check out my achievement!\n\nhttps://example.com',
        url: Platform.OS === 'ios' ? fileUri : `file://${fileUri}`,
        social: Share.Social.WHATSAPP, // Direct to WhatsApp
        type: 'image/png',
      });

    } catch (error: any) {
      if (error?.message?.includes('not installed')) {
        Alert.alert('WhatsApp Not Found', 'Please install WhatsApp to share.');
      } else {
        console.error('WhatsApp share error:', error);
      }
    }
  };

  /**
   * Alternative: Share with custom options per platform
   */
  const shareWithPlatformOptions = async () => {
    try {
      if (!certificateRef.current) return;

      const uri = await captureRef(certificateRef, { format: 'png', quality: 1 });
      const fileUri = `${FileSystem.cacheDirectory}certificate_${Date.now()}.png`;
      await FileSystem.moveAsync({ from: uri, to: fileUri });

      // Different messages for different contexts
      const LINK = 'https://example.com';
      
      await Share.open({
        title: 'Share Certificate',
        message: `🏆 My Achievement!\n\n${LINK}`,
        url: Platform.OS === 'ios' ? fileUri : `file://${fileUri}`,
        type: 'image/png',
        
        // Email-specific options
        subject: 'My Wobbly Runner Achievement',
        email: '', // Optional: pre-fill recipient
        
        // Social media options
        social: undefined, // Let user choose
        
        // Advanced options
        filename: 'certificate.png',     // Custom filename
        saveToFiles: false,               // iOS: don't show "Save to Files"
        failOnCancel: false,
      });

    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* The view you want to capture - must have ref and collapsable={false} on Android */}
      <View 
        ref={certificateRef} 
        collapsable={false}  // Important for Android!
        style={{ 
          padding: 20, 
          backgroundColor: '#fff',
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          🏆 Certificate of Achievement
        </Text>
        <Text style={{ marginTop: 10 }}>
          This certifies that...
        </Text>
        {/* Your certificate content */}
      </View>

      {/* Share Buttons */}
      <TouchableOpacity 
        onPress={handleShareCertificate}
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          📤 Share Certificate
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={shareToWhatsApp}
        style={{
          backgroundColor: '#25D366',
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          📱 Share to WhatsApp
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CertificateShareExample;

/**
 * PLATFORM-SPECIFIC NOTES
 * 
 * ANDROID:
 * ✅ Image + text work together in most apps
 * ✅ WhatsApp, Telegram, Email: Full support
 * ⚠️ Instagram: Image only (no caption)
 * 🔧 Must add collapsable={false} to captured view
 * 🔧 File URI needs file:// prefix
 * 
 * iOS:
 * ✅ Image + text work together in most apps
 * ✅ WhatsApp, iMessage, Email: Full support
 * ⚠️ Instagram: Image only in most contexts
 * 🔧 File URI: direct path (no file:// prefix)
 * 🔧 UTI type: 'public.png' can be used
 * 
 * INSTAGRAM LIMITATIONS:
 * - Instagram Feed posts: Cannot be automated
 * - Instagram Stories: Use Share.Social.INSTAGRAM_STORIES (image only)
 * - Instagram DM: Text + image not supported via API
 * 
 * BEST PRACTICES:
 * 1. Always add collapsable={false} to the View you're capturing (Android requirement)
 * 2. Use high-quality PNG for certificates (quality: 1)
 * 3. Handle user cancellation gracefully (it's not an error)
 * 4. Save to cache directory (auto-cleaned by OS)
 * 5. Show loading feedback during capture
 * 6. Test on real devices for accurate results
 * 
 * TROUBLESHOOTING:
 * - "Blank image": Add collapsable={false} to View
 * - "File not found": Check file path format for platform
 * - "Share fails silently": Check console for errors
 * - "Text not included": Verify 'message' property is set
 */
