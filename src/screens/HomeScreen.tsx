import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  StatusBar,
  Dimensions,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WoodButton } from '../components/WoodButton';
import { SettingsModal } from '../components/Modals/SettingsModal';
import { HowToPlayModal } from '../components/Modals/HowToPlayModal';
import { ExitConfirmModal } from '../components/Modals/ExitConfirmModal';
import { THEME, FONTS } from '../constants/theme';
import { UserProgress } from '../types/game';
import { LEVELS } from '../data/levels';

interface HomeScreenProps {
  progress: UserProgress;
  onPlayCurrent: () => void;
  onOpenLevelSelect: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onToggleHaptics: () => void;
  onResetProgress: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onPlayCurrent,
  onOpenLevelSelect,
  onToggleSound,
  onToggleMusic,
  onToggleHaptics,
  onResetProgress,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Floating gentle bobbing animation for logo and title
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Intercept Android hardware back button to show Exit Confirmation modal
  useEffect(() => {
    const onBackPress = () => {
      setShowExitConfirm(true);
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  const currentLvl = progress.currentLevelId || 1;
  const totalLevels = LEVELS.length || 60;
  const completedCount = Object.keys(progress.levelScores || {}).length;

  return (
    <ImageBackground
      source={require('../../assets/wood_bg.jpg')}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlayVignette}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="#1A0D06" />

          {/* Top Floating Logo & FreeBlock Brand Showcase */}
          <Animated.View
            style={[
              styles.floatingHeader,
              { transform: [{ translateY: floatAnim }] },
            ]}
          >
            {/* Same wood puzzle logo as Opening Screen */}
            <View style={styles.logoFrame}>
              <Image
                source={require('../../assets/opening_logo.jpg')}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>

            {/* Wordmark matching Opening Screen */}
            <View style={styles.titleRow}>
              <Text style={styles.titleFree}>Free</Text>
              <Text style={styles.titleBlock}>Block</Text>
            </View>

            <View style={styles.subtitlePill}>
              <Text style={styles.appSubtitle}>SLIDING PUZZLE MASTERY</Text>
            </View>

            {/* Progress indicator badge */}
            <View style={styles.progressIndicator}>
              <Text style={styles.progressText}>
                Level {currentLvl} of {totalLevels} • {completedCount} Solved
              </Text>
            </View>
          </Animated.View>

          {/* Center Main Action Buttons with Carved Icons */}
          <View style={styles.menuStack}>
            {/* 1. PLAY (Primary action with Level subtitle) */}
            <WoodButton
              title="PLAY"
              subtitle={currentLvl > 1 ? `LEVEL ${currentLvl}` : 'LEVEL 1'}
              variant="gold"
              size="large"
              iconName="play"
              iconSize={26}
              onPress={onPlayCurrent}
              style={styles.menuBtn}
            />

            {/* 2. LEVELS */}
            <WoodButton
              title="LEVELS"
              subtitle="All 5 Tiers"
              variant="primary"
              size="large"
              iconName="menu"
              iconSize={26}
              onPress={onOpenLevelSelect}
              style={styles.menuBtn}
            />
          </View>

          {/* Bottom Bar: Exact Squircle Carved Wooden Buttons */}
          <View style={styles.bottomBar}>
            {/* Left Bottom: How To Play (?) Icon */}
            <WoodButton
              size="square"
              variant="icon"
              iconName="help"
              iconSize={30}
              onPress={() => setShowHowToPlay(true)}
            />

            {/* Center: Version text */}
            <Text style={styles.versionText}>v1.0 • Pure Logic</Text>

            {/* Right Bottom: Settings Icon */}
            <WoodButton
              size="square"
              variant="icon"
              iconName="settings"
              iconSize={26}
              onPress={() => setShowSettings(true)}
            />
          </View>
        </SafeAreaView>
      </View>

      {/* Settings Modal */}
      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        settings={progress.settings}
        onToggleSound={onToggleSound}
        onToggleMusic={onToggleMusic}
        onToggleHaptics={onToggleHaptics}
        onResetProgress={onResetProgress}
      />

      {/* How To Play Tutorial Modal */}
      <HowToPlayModal
        visible={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      {/* Exit Confirmation Modal (Triggered by Android Back Button) */}
      <ExitConfirmModal
        visible={showExitConfirm}
        onConfirmExit={() => BackHandler.exitApp()}
        onCancel={() => setShowExitConfirm(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayVignette: {
    flex: 1,
    backgroundColor: 'rgba(18, 9, 4, 0.68)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  floatingHeader: {
    alignItems: 'center',
    marginTop: 12,
  },
  logoFrame: {
    width: 106,
    height: 106,
    borderRadius: 22,
    borderWidth: 2.8,
    borderColor: '#4A2107',
    overflow: 'hidden',
    backgroundColor: '#7A3F17',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 8,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleFree: {
    fontFamily: FONTS.title,
    fontSize: 38,
    color: '#FFD700',
    letterSpacing: 2,
    textShadowColor: 'rgba(35, 12, 3, 0.95)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  titleBlock: {
    fontFamily: FONTS.title,
    fontSize: 38,
    color: '#FFF8EC',
    letterSpacing: 2,
    textShadowColor: 'rgba(35, 12, 3, 0.95)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  subtitlePill: {
    backgroundColor: 'rgba(65, 33, 14, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7A431D',
    marginTop: 8,
  },
  appSubtitle: {
    fontFamily: FONTS.bold,
    color: '#FFD54F',
    fontSize: 11,
    letterSpacing: 2,
  },
  progressIndicator: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(26, 12, 5, 0.6)',
    borderRadius: 8,
  },
  progressText: {
    fontFamily: FONTS.semiBold,
    color: '#D4A373',
    fontSize: 12,
  },
  menuStack: {
    width: '100%',
    maxWidth: 290,
    gap: 14,
    alignItems: 'center',
  },
  menuBtn: {
    width: '100%',
    justifyContent: 'center',
  },
  bottomBar: {
    width: '100%',
    maxWidth: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  versionText: {
    fontFamily: FONTS.regular,
    color: '#F5DEB3',
    opacity: 0.65,
    fontSize: 12,
    letterSpacing: 0.8,
  },
});
