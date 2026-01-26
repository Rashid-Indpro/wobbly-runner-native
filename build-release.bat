@echo off
REM 🚀 Wobbly Runner Release Build Script (Windows)
REM This script helps you build a production-ready release

echo 🎮 Wobbly Runner - Release Build Script
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

REM Check if keystore exists
if not exist "android\app\wobbly-runner-release.keystore" (
    echo ❌ Error: Release keystore not found!
    echo 📖 Please follow RELEASE_KEYSTORE_SETUP.md to generate your keystore first
    exit /b 1
)

REM Check if credentials are configured
findstr /C:"WOBBLY_RUNNER_UPLOAD_STORE_FILE" android\gradle.properties >nul
if errorlevel 1 (
    echo ❌ Error: Keystore credentials not configured!
    echo 📖 Please add your keystore credentials to android\gradle.properties
    echo    See RELEASE_KEYSTORE_SETUP.md for details
    exit /b 1
)

echo ✅ Keystore found and configured
echo.

REM Ask user what to build
echo What would you like to build?
echo 1^) AAB ^(Android App Bundle - for Play Store^)
echo 2^) APK ^(for testing^)
echo 3^) Both
set /p choice="Enter choice [1-3]: "

echo.
echo 🧹 Cleaning previous builds...
cd android
call gradlew.bat clean

if "%choice%"=="1" goto build_aab
if "%choice%"=="2" goto build_apk
if "%choice%"=="3" goto build_both
echo ❌ Invalid choice
exit /b 1

:build_aab
echo.
echo 🏗️  Building release AAB...
call gradlew.bat bundleRelease

if errorlevel 1 (
    echo.
    echo ❌ Build failed! Check the error messages above
    exit /b 1
)

echo.
echo ✅ Release AAB built successfully!
echo 📦 Location: android\app\build\outputs\bundle\release\app-release.aab
echo.
echo 📤 Next steps:
echo 1. Test the AAB: Upload to Play Console Internal Testing
echo 2. Once tested, promote to Production
goto end

:build_apk
echo.
echo 🏗️  Building release APK...
call gradlew.bat assembleRelease

if errorlevel 1 (
    echo.
    echo ❌ Build failed! Check the error messages above
    exit /b 1
)

echo.
echo ✅ Release APK built successfully!
echo 📦 Location: android\app\build\outputs\apk\release\app-release.apk
echo.
echo 📱 To install on device:
echo    adb install app\build\outputs\apk\release\app-release.apk
goto end

:build_both
echo.
echo 🏗️  Building release AAB...
call gradlew.bat bundleRelease

if errorlevel 1 (
    echo ❌ AAB build failed!
    exit /b 1
)

echo ✅ AAB built successfully!

echo.
echo 🏗️  Building release APK...
call gradlew.bat assembleRelease

if errorlevel 1 (
    echo ❌ APK build failed!
    exit /b 1
)

echo.
echo ✅ Both builds completed successfully!
echo.
echo 📦 Outputs:
echo    AAB: android\app\build\outputs\bundle\release\app-release.aab
echo    APK: android\app\build\outputs\apk\release\app-release.apk

:end
cd ..

echo.
echo 🎉 Build process complete!
echo.
echo 📋 Remember to:
echo ✓ Test the release build on a real device
echo ✓ Verify AdMob ads are showing ^(real ads, not test^)
echo ✓ Check all features work correctly
echo ✓ Upload to Play Console when ready
echo.
pause
