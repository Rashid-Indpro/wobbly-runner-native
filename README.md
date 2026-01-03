# Wobbly Runner - React Native

An endless runner mobile game built with React Native, Expo, and TypeScript.

## Features

- 🎮 Endless runner gameplay with 3-lane system
- 🎨 16 unique skins with special perks
- ⚡ 15 power-ups with unique effects
- 🏆 100+ achievements with rewards
- 🎵 Dynamic background music system
- 💰 In-game currency and store
- 📱 Native iOS and Android support

## Tech Stack

- **React Native 0.73.6** - Mobile app framework
- **Expo ~50.0.0** - Development platform
- **TypeScript 5.3.3** - Type safety
- **@shopify/react-native-skia** - High-performance game rendering
- **expo-av** - Audio system
- **AsyncStorage** - Data persistence

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Project Structure

```
wobbly_runner_native/
├── App.tsx                 # Main app component
├── index.js                # Entry point
├── src/
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   ├── constants/
│   │   └── index.ts        # Game data and configuration
│   ├── utils/
│   │   ├── storage.ts      # AsyncStorage wrapper
│   │   └── SoundManager.ts # Audio management
│   └── components/
│       ├── GameContainer.tsx        # Game engine
│       ├── MainMenu.tsx             # Main menu screen
│       ├── SplashScreen.tsx         # Loading screen
│       ├── GameOver.tsx             # Game over screen
│       ├── StoreScreen.tsx          # Shop interface
│       ├── SettingsScreen.tsx       # Settings menu
│       ├── AchievementsScreen.tsx   # Achievements display
│       ├── Tutorial.tsx             # Tutorial flow
│       ├── AdSimulator.tsx          # Ad simulation
│       ├── AboutUs.tsx              # About developers
│       └── UIOverlay.tsx            # In-game HUD
└── assets/
    └── images/              # Game assets
```

## Game Mechanics

### Controls
- **Tap left/right** - Switch lanes
- **Pause button** - Pause game
- **Power-up buttons** - Activate equipped powers

### Scoring
- Distance traveled = score
- Collect coins and gems
- Unlock achievements for bonus coins
- Skin perks multiply score and coins

### Power-Ups
- **Invincible** - Immunity to obstacles
- **Magnet** - Auto-collect coins
- **Giant** - Larger size crushes obstacles
- **Tiny** - Smaller size for easier dodging
- **Coin Rain** - Double coin value
- **Time Freeze** - Stop obstacles
- And 9 more unique effects!

## Development

### Adding New Skins
Edit [src/constants/index.ts](src/constants/index.ts) and add to `SKINS` array:

```typescript
{
  id: 's17',
  icon: '🦄',
  name: 'Unicorn',
  price: 5000,
  rarity: 'LEGENDARY',
  color: '#FF00FF',
  perks: {
    scoreMult: 1.5,
    coinMult: 1.3,
    magnetRangeBonus: 50,
    invincibilityBonus: 1000,
    speedReduction: 0.1
  }
}
```

### Adding New Power-Ups
Edit [src/constants/index.ts](src/constants/index.ts) and add to `POWER_UPS`:

```typescript
[PowerUpType.NEW_POWER]: {
  id: 'power_new',
  type: PowerUpType.NEW_POWER,
  name: 'New Power',
  icon: '✨',
  description: 'Does something cool',
  color: '#FF6B6B',
  duration: 5000,
  coinPrice: 1500
}
```

Then implement logic in [src/components/GameContainer.tsx](src/components/GameContainer.tsx).

## Performance

- Game runs at 60 FPS using Skia rendering
- Optimized collision detection
- Efficient object pooling for obstacles
- Smooth animations with React Native Animated API

## Credits

Developed by:
- **Tanveer Alam** - Lead Developer
- **MD Rashid** - Co-Developer

## License

MIT License - feel free to use for learning and personal projects!
