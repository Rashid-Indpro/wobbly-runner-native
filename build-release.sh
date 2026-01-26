#!/bin/bash

# 🚀 Wobbly Runner Release Build Script
# This script helps you build a production-ready release

echo "🎮 Wobbly Runner - Release Build Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if keystore exists
if [ ! -f "android/app/wobbly-runner-release.keystore" ]; then
    echo "❌ Error: Release keystore not found!"
    echo "📖 Please follow RELEASE_KEYSTORE_SETUP.md to generate your keystore first"
    exit 1
fi

# Check if credentials are configured
if ! grep -q "WOBBLY_RUNNER_UPLOAD_STORE_FILE" android/gradle.properties; then
    echo "❌ Error: Keystore credentials not configured!"
    echo "📖 Please add your keystore credentials to android/gradle.properties"
    echo "   See RELEASE_KEYSTORE_SETUP.md for details"
    exit 1
fi

echo "✅ Keystore found and configured"
echo ""

# Ask user what to build
echo "What would you like to build?"
echo "1) AAB (Android App Bundle - for Play Store)"
echo "2) APK (for testing)"
echo "3) Both"
read -p "Enter choice [1-3]: " choice

echo ""
echo "🧹 Cleaning previous builds..."
cd android
./gradlew clean

case $choice in
    1)
        echo ""
        echo "🏗️  Building release AAB..."
        ./gradlew bundleRelease
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Release AAB built successfully!"
            echo "📦 Location: android/app/build/outputs/bundle/release/app-release.aab"
            echo ""
            echo "📤 Next steps:"
            echo "1. Test the AAB: Upload to Play Console Internal Testing"
            echo "2. Once tested, promote to Production"
        else
            echo ""
            echo "❌ Build failed! Check the error messages above"
            exit 1
        fi
        ;;
    2)
        echo ""
        echo "🏗️  Building release APK..."
        ./gradlew assembleRelease
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Release APK built successfully!"
            echo "📦 Location: android/app/build/outputs/apk/release/app-release.apk"
            echo ""
            echo "📱 To install on device:"
            echo "   adb install app/build/outputs/apk/release/app-release.apk"
        else
            echo ""
            echo "❌ Build failed! Check the error messages above"
            exit 1
        fi
        ;;
    3)
        echo ""
        echo "🏗️  Building release AAB..."
        ./gradlew bundleRelease
        
        if [ $? -eq 0 ]; then
            echo "✅ AAB built successfully!"
        else
            echo "❌ AAB build failed!"
            exit 1
        fi
        
        echo ""
        echo "🏗️  Building release APK..."
        ./gradlew assembleRelease
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Both builds completed successfully!"
            echo ""
            echo "📦 Outputs:"
            echo "   AAB: android/app/build/outputs/bundle/release/app-release.aab"
            echo "   APK: android/app/build/outputs/apk/release/app-release.apk"
        else
            echo "❌ APK build failed!"
            exit 1
        fi
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

cd ..

echo ""
echo "🎉 Build process complete!"
echo ""
echo "📋 Remember to:"
echo "✓ Test the release build on a real device"
echo "✓ Verify AdMob ads are showing (real ads, not test)"
echo "✓ Check all features work correctly"
echo "✓ Upload to Play Console when ready"
echo ""
