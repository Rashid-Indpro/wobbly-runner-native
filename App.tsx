import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import { GameState, Settings, PowerUp, RunStats, Skin, Achievement, LegalPageType } from './src/types';
import { SKINS, INITIAL_ACHIEVEMENTS, POWER_UPS, LEGAL_PAGES } from './src/constants';
import { getItem, setItem } from './src/utils/storage';
import MainMenu from './src/components/MainMenu';
import GameContainer from './src/components/GameContainer';
import StoreScreen from './src/components/StoreScreen';
import SettingsScreen from './src/components/SettingsScreen';
import Tutorial from './src/components/Tutorial';
import RewardedAdManager from './src/components/RewardedAdManager';
import AchievementsScreen from './src/components/AchievementsScreen';
import SplashScreen from './src/components/SplashScreen';
import AboutUs from './src/components/AboutUs';
import LegalWebView from './src/components/LegalWebView';
import AlpineStudioIntro from './src/components/AlpineStudioIntro';
import { soundManager } from './src/utils/SoundManager';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('ALPINE_INTRO');
  const [gameId, setGameId] = useState(0);
  const [hasShownAlpineIntro, setHasShownAlpineIntro] = useState(false);
  const [highScore, setHighScore] = useState<number>(0);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [settings, setSettings] = useState<Settings>({
    soundEnabled: true,
    musicEnabled: true,
    vibrationEnabled: true,
    hasSeenTutorial: false,
    hasConsented: false,
    selectedBGM: 'SHUFFLE',
    equippedPowerIds: []
  });
  
  const [unlockedSkins, setUnlockedSkins] = useState<string[]>(['s1']);
  const [selectedSkinId, setSelectedSkinId] = useState<string>('s1');
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [ownedPowerUses, setOwnedPowerUses] = useState<Record<string, number>>({});
  
  const [adPurpose, setAdPurpose] = useState<'REVIVE' | 'STORE' | 'START' | 'SKIN' | 'GET_COINS' | null>(null);
  const [adPurposeItem, setAdPurposeItem] = useState<any>(null);
  
  // Helper function to open legal pages
  const openLegalPage = (type: LegalPageType) => {
    console.log(`📄 User requested ${type} page`);
    switch (type) {
      case 'PRIVACY':
        setGameState('LEGAL_PRIVACY');
        break;
      case 'TERMS':
        setGameState('LEGAL_TERMS');
        break;
      case 'ABOUT':
        setGameState('LEGAL_ABOUT');
        break;
      case 'CONTACT':
        setGameState('LEGAL_CONTACT');
        break;
    }
  };

  useEffect(() => {
    // Initialize Google Mobile Ads SDK once at startup
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('✅ Google Mobile Ads SDK initialized successfully');
      })
      .catch(error => {
        console.error('❌ Failed to initialize Google Mobile Ads SDK:', error);
      });

    const loadData = async () => {
      const savedHighScore = await getItem<number>('highScore');
      const savedCoins = await getItem<number>('coins');
      const savedSettings = await getItem<Settings>('settings');
      const savedSkins = await getItem<string[]>('unlockedSkins');
      const savedSkinId = await getItem<string>('selectedSkin');
      const savedAwards = await getItem<Achievement[]>('achievements');
      const savedOwnedPowers = await getItem<Record<string, number>>('ownedPowers');
      
      if (savedHighScore) setHighScore(savedHighScore);
      
      // SIGN-UP BONUS: 500 Coins for new users
      if (savedCoins === null) {
        setTotalCoins(500); 
        await setItem('coins', 500);
      } else {
        setTotalCoins(savedCoins);
      }

      if (savedSkins) setUnlockedSkins(savedSkins);
      if (savedSkinId) setSelectedSkinId(savedSkinId);
      if (savedOwnedPowers) setOwnedPowerUses(savedOwnedPowers);
      
      if (savedAwards) {
        const merged = INITIAL_ACHIEVEMENTS.map(initial => {
          const found = savedAwards.find(s => s.id === initial.id);
          return found ? { ...initial, ...found } : initial;
        });
        setAchievements(merged);
      } else {
        setAchievements(INITIAL_ACHIEVEMENTS);
      }
      
      if (savedSettings) {
        setSettings(prev => ({ ...prev, ...savedSettings }));
        soundManager.setEnabled(savedSettings.soundEnabled);
        soundManager.setBackgroundAudioEnabled(savedSettings.musicEnabled);
      }
    };

    loadData();
  }, []);

  // Preload background audio when Alpine intro is showing
  useEffect(() => {
    if (gameState === 'ALPINE_INTRO') {
      soundManager.preloadBackgroundAudio();
    }
  }, [gameState]);

  const handleAlpineIntroComplete = () => {
    console.log('✨ Alpine Technologies intro completed');
    setHasShownAlpineIntro(true);
    // Start music immediately before transitioning to splash
    soundManager.playBackgroundAudio();
    // Transition to splash on next frame for smooth timing
    setTimeout(() => setGameState('SPLASH'), 0);
  };

  const handleSplashComplete = () => {
    console.log('🚀 App launched - Splash screen completed');
    if (!settings.hasSeenTutorial) {
      console.log('📚 First time user - Showing tutorial');
      setGameState('TUTORIAL');
    } else {
      console.log('🏠 Returning user - Going to main menu');
      setGameState('MAIN_MENU');
    }
    updateAchievements({ score: 0, coins: 0, powerUpsUsed: 0, distanceTraveled: 0 }, true);
  };

  const onStartGameRequested = () => {
    console.log('🎯 User requested game start');
    if (Math.random() < 0.2) { 
      console.log('📺 Showing ad before game start');
      soundManager.stopBackgroundAudio();
      setAdPurpose('START');
      setGameState('AD_WATCHING');
    } else {
      console.log('🎮 Starting game directly - Game ID:', gameId + 1);
      setGameId(prev => prev + 1);
      setGameState('PLAYING');
    }
  };

  const updateAchievements = (stats: RunStats, isFirstLoad: boolean = false) => {
    setAchievements(prev => {
      const next = prev.map(a => {
        if (a.isUnlocked) return a;
        let progress = a.progress;
        if (a.id === 'genesis_0' && isFirstLoad) progress = 1;
        else {
          if (a.id.startsWith('score_')) {
            if (stats.score >= a.goal) progress = a.goal;
          } else if (a.id.startsWith('coin_')) {
            progress += stats.coins;
          }
        }
        const isUnlocked = progress >= a.goal;
        if (isUnlocked && !a.isUnlocked) {
          setTotalCoins(c => {
            const newC = c + a.rewardCoins;
            setItem('coins', newC);
            return newC;
          });
          soundManager.playPowerUp();
        }
        return { ...a, progress, isUnlocked };
      });
      setItem('achievements', next);
      return next;
    });
  };

  const handleGameOver = (stats: RunStats, action: 'RETRY' | 'MENU') => {
    const { score, coins } = stats;
    if (score > highScore) {
      setHighScore(score);
      setItem('highScore', score);
    }
    const newTotalCoins = totalCoins + coins;
    setTotalCoins(newTotalCoins);
    setItem('coins', newTotalCoins);
    updateAchievements(stats);
    if (action === 'RETRY') onStartGameRequested();
    else setGameState('MAIN_MENU');
  };

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    soundManager.setEnabled(newSettings.soundEnabled);
    soundManager.setBackgroundAudioEnabled(newSettings.musicEnabled);
    // Stop music if disabled, but don't auto-start if enabled
    if (!newSettings.musicEnabled) {
      soundManager.stopBackgroundAudio();
    }
    setItem('settings', newSettings);
  };

  const requestAd = (purpose: 'REVIVE' | 'STORE' | 'SKIN' | 'GET_COINS', item: any = null) => {
    soundManager.stopBackgroundAudio();
    setAdPurpose(purpose);
    setAdPurposeItem(item);
    setGameState('AD_WATCHING');
  };

  const handleBuySkin = (skin: Skin) => {
    if (totalCoins >= skin.price) {
      const newCoins = totalCoins - skin.price;
      setTotalCoins(newCoins);
      setItem('coins', newCoins);
      const newSkins = [...unlockedSkins, skin.id];
      setUnlockedSkins(newSkins);
      setItem('unlockedSkins', newSkins);
      soundManager.playPowerUp();
    }
  };

  const handleBuyPower = (power: PowerUp) => {
    const price = power.coinPrice || 1000;
    if (totalCoins >= price) {
      const newCoins = totalCoins - price;
      setTotalCoins(newCoins);
      setItem('coins', newCoins);
      
      const newOwned = { ...ownedPowerUses };
      newOwned[power.id] = (newOwned[power.id] || 0) + 3;
      setOwnedPowerUses(newOwned);
      setItem('ownedPowers', newOwned);
      
      soundManager.playPowerUp();
    }
  };

  const handleEquipPower = (id: string) => {
    setSettings(prev => {
      let nextEquipped = [...prev.equippedPowerIds];
      if (nextEquipped.includes(id)) {
        nextEquipped = nextEquipped.filter(pid => pid !== id);
      } else if (nextEquipped.length < 3) {
        nextEquipped.push(id);
      }
      const nextSettings = { ...prev, equippedPowerIds: nextEquipped };
      setItem('settings', nextSettings);
      return nextSettings;
    });
  };

  const handleUseEquippedPower = (id: string) => {
    const newOwned = { ...ownedPowerUses };
    if (newOwned[id] > 0) {
      newOwned[id] -= 1;
      setOwnedPowerUses(newOwned);
      setItem('ownedPowers', newOwned);
    }
  };

  const handleAdComplete = () => {
    soundManager.playBackgroundAudio();
    if (adPurpose === 'STORE' && adPurposeItem) {
      const newOwned = { ...ownedPowerUses };
      newOwned[adPurposeItem.id] = (newOwned[adPurposeItem.id] || 0) + 3;
      setOwnedPowerUses(newOwned);
      setItem('ownedPowers', newOwned);
      setGameState('STORE');
    } else if (adPurpose === 'GET_COINS') {
      const newCoins = totalCoins + 2500; 
      setTotalCoins(newCoins);
      setItem('coins', newCoins);
      setGameState('STORE');
    } else if (adPurpose === 'REVIVE') setGameState('PLAYING');
    else if (adPurpose === 'START') {
      setGameId(prev => prev + 1);
      setGameState('PLAYING');
    } else setGameState('MAIN_MENU');
    setAdPurpose(null);
    setAdPurposeItem(null);
  };

  const activeSkin = SKINS.find(s => s.id === selectedSkinId) || SKINS[0];
  const equippedPowers = settings.equippedPowerIds
    .map(id => Object.values(POWER_UPS).find(p => p.id === id))
    .filter(Boolean) as PowerUp[];

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" translucent={false} />
        {gameState === 'ALPINE_INTRO' && <AlpineStudioIntro onComplete={handleAlpineIntroComplete} />}
        {gameState === 'SPLASH' && <SplashScreen onComplete={handleSplashComplete} />}
        {gameState === 'MAIN_MENU' && (
        <MainMenu 
          highScore={highScore}
          onStart={onStartGameRequested}
          onStore={() => {
            console.log('🛒 Navigating to Store');
            setGameState('STORE');
          }}
          onSettings={() => {
            console.log('⚙️ Navigating to Settings');
            setGameState('SETTINGS');
          }}
          onAchievements={() => {
            console.log('🏆 Navigating to Achievements');
            setGameState('ACHIEVEMENTS');
          }}
          onAboutUs={() => {
            console.log('ℹ️ Navigating to About Us');
            setGameState('ABOUT_US');
          }}
          activeSkin={activeSkin}
          achievements={achievements}
          equippedPowers={equippedPowers}
          ownedPowerUses={ownedPowerUses}
        />
      )}
      {(gameState === 'PLAYING' || (gameState === 'AD_WATCHING' && adPurpose === 'REVIVE')) && (
        <GameContainer 
          key={gameId}
          settings={settings}
          activeSkin={activeSkin}
          onGameOver={(score, coins, powerUpsUsed, action) => handleGameOver({ score, coins, powerUpsUsed, distanceTraveled: score }, action)}
          equippedPowers={equippedPowers}
          ownedPowerUses={ownedPowerUses}
          onUsePower={handleUseEquippedPower}
          onRequestRevive={() => requestAd('REVIVE')}
          onExit={() => setGameState('MAIN_MENU')}
          isExternalAdShowing={gameState === 'AD_WATCHING' && adPurpose === 'REVIVE'}
        />
      )}
      {gameState === 'STORE' && (
        <StoreScreen 
          totalCoins={totalCoins}
          ownedPowerUses={ownedPowerUses}
          equippedPowerIds={settings.equippedPowerIds}
          unlockedSkins={unlockedSkins}
          selectedSkinId={selectedSkinId}
          onBuySkin={handleBuySkin}
          onBuyPower={handleBuyPower}
          onEquipPower={handleEquipPower}
          onSelectSkin={(id) => { setSelectedSkinId(id); setItem('selectedSkin', id); }}
          onBack={() => setGameState('MAIN_MENU')}
          onSelectPowerAd={(p) => requestAd('STORE', p)}
          onWatchAdForCoins={() => requestAd('GET_COINS')}
        />
      )}
      {gameState === 'SETTINGS' && (
        <SettingsScreen 
          settings={settings}
          onSave={handleSaveSettings}
          onBack={() => setGameState('MAIN_MENU')}
          onShowTutorial={() => setGameState('TUTORIAL')}
          onOpenLegalPage={openLegalPage}
        />
      )}
      {gameState === 'ACHIEVEMENTS' && (
        <AchievementsScreen achievements={achievements} onBack={() => setGameState('MAIN_MENU')} />
      )}
      {gameState === 'ABOUT_US' && (
        <AboutUs 
          onBack={() => {
            console.log('⬅️ Returning to main menu from About Us');
            setGameState('MAIN_MENU');
          }}
          onOpenLegalPage={openLegalPage}
        />
      )}
      {gameState === 'LEGAL_PRIVACY' && (
        <LegalWebView 
          url={LEGAL_PAGES.PRIVACY}
          title="Privacy Policy"
          onBack={() => setGameState('ABOUT_US')}
        />
      )}
      {gameState === 'LEGAL_TERMS' && (
        <LegalWebView 
          url={LEGAL_PAGES.TERMS}
          title="Terms & Conditions"
          onBack={() => setGameState('ABOUT_US')}
        />
      )}
      {gameState === 'LEGAL_ABOUT' && (
        <LegalWebView 
          url={LEGAL_PAGES.ABOUT}
          title="About Us"
          onBack={() => setGameState('ABOUT_US')}
        />
      )}
      {gameState === 'LEGAL_CONTACT' && (
        <LegalWebView 
          url={LEGAL_PAGES.CONTACT}
          title="Contact Us"
          onBack={() => setGameState('ABOUT_US')}
        />
      )}
      {gameState === 'TUTORIAL' && (
        <Tutorial onComplete={() => {
          handleSaveSettings({ ...settings, hasSeenTutorial: true });
          setGameState('MAIN_MENU');
        }} />
      )}
      {gameState === 'AD_WATCHING' && (
        <RewardedAdManager onComplete={handleAdComplete} />
      )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
});

export default App;
