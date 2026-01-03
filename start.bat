@echo off
REM Quick Setup Script for Wobbly Runner Native (Windows)

echo 🎮 Wobbly Runner - React Native Setup
echo ======================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Installing dependencies...
    call npm install
    echo ✅ Dependencies installed!
    echo.
) else (
    echo ✅ Dependencies already installed
    echo.
)

echo 🚀 Starting Expo development server...
echo.
echo Options:
echo   Press 'a' - Open on Android device/emulator
echo   Press 'i' - Open on iOS simulator (Mac only)
echo   Press 'w' - Open in web browser
echo   Scan QR code with Expo Go app on your phone
echo.

call npm start
