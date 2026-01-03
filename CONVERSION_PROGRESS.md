# Wobbly Runner - React Native Conversion

## ✅ Completed Files

### 1. Types (src/types/index.ts)
- ✅ Pure TypeScript - No changes needed
- All interfaces and types work identically in React Native

### 2. Constants (src/constants/index.ts)
- ✅ Pure TypeScript - No changes needed
- POWER_UPS, SKINS, ACHIEVEMENTS all portable

### 3. Storage Utility (src/utils/storage.ts)
- ✅ Created AsyncStorage wrapper
- Replaces web localStorage
- Provides same API with async operations

## 🔧 Setup Instructions

### Install Dependencies
```bash
cd wobbly_runner_native
npm install
```

### Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli
```

### Run the App
```bash
npm start
# Then press 'a' for Android or 'i' for iOS
```

## 📋 Next Steps

### Step 4: Convert SoundManager.ts
- Replace Web Audio API with expo-av
- File: src/utils/SoundManager.ts

### Step 5: Convert SplashScreen Component
- Replace div with View
- Replace img with Image
- Convert Tailwind to StyleSheet
- File: src/components/SplashScreen.tsx

### Step 6: Convert MainMenu Component
- Replace HTML elements with React Native components
- Convert all Tailwind classes to StyleSheet
- File: src/components/MainMenu.tsx

### Step 7: Continue with remaining components
- AboutUs.tsx
- SettingsScreen.tsx
- GameOver.tsx
- Tutorial.tsx
- AdSimulator.tsx
- StoreScreen.tsx
- AchievementsScreen.tsx
- UIOverlay.tsx

### Step 8: Convert GameContainer (Most Complex)
- Use @shopify/react-native-skia for canvas rendering
- Port all game logic and physics
- Handle touch gestures instead of mouse/keyboard

## 🎯 Current Status

**Completed: 3/12 files**

- ✅ types/index.ts
- ✅ constants/index.ts  
- ✅ utils/storage.ts
- ⏳ utils/SoundManager.ts (Next)
- ⏳ components/SplashScreen.tsx
- ⏳ components/MainMenu.tsx
- ⏳ components/* (7 more)
- ⏳ components/GameContainer.tsx

Ready to continue? We'll convert one component at a time!
