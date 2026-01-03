#!/bin/bash
# Quick Setup Script for Wobbly Runner Native

echo "🎮 Wobbly Runner - React Native Setup"
echo "======================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

echo "🚀 Starting Expo development server..."
echo ""
echo "Options:"
echo "  Press 'a' - Open on Android device/emulator"
echo "  Press 'i' - Open on iOS simulator (Mac only)"
echo "  Press 'w' - Open in web browser"
echo "  Scan QR code with Expo Go app on your phone"
echo ""

npm start
