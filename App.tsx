import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import { TitanOne_400Regular } from '@expo-google-fonts/titan-one';
import { SplashScreen } from './src/screens/SplashScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LevelSelectScreen } from './src/screens/LevelSelectScreen';
import { GameScreen } from './src/screens/GameScreen';
import { FullScreenAdModal } from './src/components/Modals/FullScreenAdModal';
import { StorageService, DEFAULT_PROGRESS } from './src/services/storage';
import { AudioService } from './src/services/audio';
import { AdService, AdReason } from './src/services/adService';
import { UserProgress, ScreenType } from './src/types/game';
import { LEVELS } from './src/data/levels';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('splash');
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [adModalConfig, setAdModalConfig] = useState<{
    visible: boolean;
    reason: AdReason;
    onComplete: () => void;
  }>({
    visible: false,
    reason: 'timer',
    onComplete: () => {},
  });

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    TitanOne_400Regular,
  });

  useEffect(() => {
    async function init() {
      const saved = await StorageService.loadProgress();
      setProgress(saved);
      setActiveLevelId(saved.currentLevelId || 1);
      setIsReady(true);
    }
    init();

    // Initialize AdService and register the in-app 5s skippable ad modal
    AdService.init();
    AdService.registerFallbackModalHandler((opts) => {
      setAdModalConfig({
        visible: true,
        reason: opts.reason,
        onComplete: opts.onComplete,
      });
    });

    return () => {
      AdService.registerFallbackModalHandler(null);
    };
  }, []);

  // 15-minute consecutive active gameplay timer
  useEffect(() => {
    if (isReady && screen === 'game') {
      AdService.startPlaytimeTracker(() => {
        AdService.showAd({
          reason: 'timer',
          onComplete: () => {},
        });
      });
    } else {
      AdService.pausePlaytimeTracker();
    }
  }, [isReady, screen]);

  // Sync background music state when settings change or screen is not splash
  useEffect(() => {
    if (isReady && screen !== 'splash') {
      if (progress.settings.music) {
        AudioService.startBackgroundMusic();
      } else {
        AudioService.stopBackgroundMusic();
      }
    }
  }, [isReady, screen, progress.settings.music]);

  const handleToggleSound = async () => {
    const updated = await StorageService.updateSettings({
      sound: !progress.settings.sound,
    });
    setProgress((p) => ({ ...p, settings: updated }));
  };

  const handleToggleMusic = async () => {
    const nextMusic = !progress.settings.music;
    const updated = await StorageService.updateSettings({
      music: nextMusic,
    });
    setProgress((p) => ({ ...p, settings: updated }));
    AudioService.setMusicEnabled(nextMusic);
  };

  const handleToggleHaptics = async () => {
    const updated = await StorageService.updateSettings({
      haptics: !progress.settings.haptics,
    });
    setProgress((p) => ({ ...p, settings: updated }));
  };

  const handleResetProgress = async () => {
    const fresh = await StorageService.resetAllProgress();
    setProgress(fresh);
    setActiveLevelId(1);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />

        {screen === 'splash' && (
          <SplashScreen
            onFinish={() => {
              setScreen('home');
              if (progress.settings.music) {
                AudioService.startBackgroundMusic();
              }
            }}
          />
        )}

        {screen === 'home' && (
          <HomeScreen
            progress={progress}
            onPlayCurrent={() => {
              setActiveLevelId(progress.currentLevelId || 1);
              setScreen('game');
            }}
            onOpenLevelSelect={() => setScreen('levelSelect')}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
            onToggleHaptics={handleToggleHaptics}
            onResetProgress={handleResetProgress}
          />
        )}

        {screen === 'levelSelect' && (
          <LevelSelectScreen
            progress={progress}
            onSelectLevel={(lvlId) => {
              setActiveLevelId(lvlId);
              setScreen('game');
            }}
            onBack={() => setScreen('home')}
            onProgressUpdated={(updated) => setProgress(updated)}
          />
        )}

        {screen === 'game' && (
          <GameScreen
            levelId={activeLevelId}
            progress={progress}
            onBackToLevelSelect={() => setScreen('levelSelect')}
            onBackToHome={() => setScreen('home')}
            onNextLevel={(nextLvl) => {
              if (nextLvl <= LEVELS.length) {
                setActiveLevelId(nextLvl);
              } else {
                setScreen('levelSelect');
              }
            }}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
            onToggleHaptics={handleToggleHaptics}
            onProgressUpdated={(updated) => setProgress(updated)}
          />
        )}

        {/* Global Full-Screen Ad Modal (5s skippable, sound-compliant) */}
        <FullScreenAdModal
          visible={adModalConfig.visible}
          reason={adModalConfig.reason}
          onClose={() => {
            setAdModalConfig((prev) => ({ ...prev, visible: false }));
          }}
          onReward={() => {
            adModalConfig.onComplete();
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0E08',
  },
});
