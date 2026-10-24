import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WoodButton } from '../components/WoodButton';
import { THEME, FONTS } from '../constants/theme';
import { LEVELS } from '../data/levels';
import { UserProgress, DifficultyTier } from '../types/game';
import { AudioService } from '../services/audio';
import { AdService } from '../services/adService';
import { StorageService } from '../services/storage';

interface LevelSelectScreenProps {
  progress: UserProgress;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
  onProgressUpdated?: (updated: UserProgress) => void;
}

const TIERS: DifficultyTier[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  progress,
  onSelectLevel,
  onBack,
  onProgressUpdated,
}) => {
  const [selectedTier, setSelectedTier] = useState<DifficultyTier>('Beginner');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Gentle pulse on the next playable level
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  // Filter levels for the active tier
  const tierLevels = LEVELS.filter((lvl) => lvl.tier === selectedTier);

  // Total stars in current tier
  const tierStars = tierLevels.reduce(
    (acc, lvl) => acc + (progress.levelScores[lvl.id]?.stars || 0),
    0
  );
  const maxTierStars = Math.max(tierLevels.length * 3, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <WoodButton
          size="square"
          variant="icon"
          iconName="back"
          iconSize={26}
          onPress={onBack}
        />

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>SELECT LEVEL</Text>
          <Text style={styles.headerSub}>
            {tierStars} / {maxTierStars} ⭐
          </Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Difficulty Tier Tabs (Smooth Horizontal Scroll) */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {TIERS.map((tier) => {
            const isActive = tier === selectedTier;
            return (
              <TouchableOpacity
                key={tier}
                onPress={() => {
                  AudioService.playWoodClick();
                  setSelectedTier(tier);
                }}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.tabText, isActive && styles.tabTextActive]}
                >
                  {tier}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Grid of Squircle Carved Wooden Level Tiles (Matches User Image) */}
      <ScrollView
        contentContainerStyle={styles.scrollGrid}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {tierLevels.map((lvl) => {
            const isUnlocked = progress.unlockedLevels.includes(lvl.id);
            const canUnlockViaAd =
              !isUnlocked &&
              lvl.id > 1 &&
              (lvl.id - 1) % 12 === 0 &&
              !!progress.levelScores[lvl.id - 1]?.completed;
            const score = progress.levelScores[lvl.id];
            const isCompleted = !!score?.completed;
            const stars = score?.stars || 0;
            const hasCrown = !!score?.crown;
            const isNext = lvl.id === progress.currentLevelId;

            return (
              <Animated.View
                key={lvl.id}
                style={[
                  styles.tileWrapper,
                  (isNext || canUnlockViaAd) && { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.88}
                  disabled={!isUnlocked && !canUnlockViaAd}
                  onPress={() => {
                    AudioService.playWoodClick();
                    if (isUnlocked) {
                      onSelectLevel(lvl.id);
                    } else if (canUnlockViaAd) {
                      AdService.showAd({
                        reason: 'tier',
                        onComplete: async () => {
                          await StorageService.unlockLevel(lvl.id);
                          onProgressUpdated?.(StorageService.getProgress());
                          onSelectLevel(lvl.id);
                        },
                      });
                    }
                  }}
                  style={[
                    styles.levelTile,
                    !isUnlocked && styles.levelTileLocked,
                    canUnlockViaAd && styles.levelTileCanUnlock,
                    isCompleted && stars === 3 && styles.levelTilePerfect,
                    isNext && styles.levelTileNext,
                  ]}
                >
                  {/* Glossy top-left specular highlight curve */}
                  <View style={styles.tileTopHighlight} />
                  <View style={styles.tileLeftHighlight} />

                  {/* Wood notch / split detail on edge */}
                  <View style={styles.tileNotch} />

                  {/* Prominent Crown badge on perfect completed levels */}
                  {hasCrown && (
                    <View style={styles.crownBadge}>
                      <Text style={styles.crownBadgeIcon}>👑</Text>
                    </View>
                  )}

                  {/* Carved Wooden Number in Titan One */}
                  <Text
                    style={[
                      styles.levelNumber,
                      !isUnlocked && !canUnlockViaAd && styles.levelNumberLocked,
                    ]}
                  >
                    {lvl.id}
                  </Text>

                  {isUnlocked ? (
                    <View style={styles.starsContainer}>
                      <Text
                        style={[
                          styles.starSymbol,
                          stars >= 1 ? styles.starGolden : styles.starMuted,
                        ]}
                      >
                        ★
                      </Text>
                      <Text
                        style={[
                          styles.starSymbol,
                          stars >= 2 ? styles.starGolden : styles.starMuted,
                        ]}
                      >
                        ★
                      </Text>
                      <Text
                        style={[
                          styles.starSymbol,
                          stars >= 3 ? styles.starGolden : styles.starMuted,
                        ]}
                      >
                        ★
                      </Text>
                    </View>
                  ) : canUnlockViaAd ? (
                    <View style={styles.adUnlockContainer}>
                      <Ionicons name="videocam" size={10} color="#FFD54F" />
                      <Text style={styles.adUnlockText}>UNLOCK</Text>
                    </View>
                  ) : (
                    <View style={styles.lockedContainer}>
                      <Text style={styles.padlockIcon}>🔒</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1008',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.title,
    color: '#FFDEAA',
    fontSize: 24,
    letterSpacing: 2,
  },
  headerSub: {
    fontFamily: FONTS.bold,
    color: '#FFD54F',
    fontSize: 13,
    marginTop: 2,
  },
  headerRightSpacer: {
    width: 58,
  },
  tabsWrapper: {
    marginBottom: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#2D160A',
    borderWidth: 2,
    borderColor: '#4A2713',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#C87B2E',
    borderWidth: 2,
    borderColor: '#542509',
  },
  tabText: {
    fontFamily: FONTS.bold,
    color: '#A08064',
    fontSize: 13,
  },
  tabTextActive: {
    color: '#FFFDF7',
  },
  scrollGrid: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  tileWrapper: {
    width: (SCREEN_WIDTH - 32 - 24) / 3, // Uniform 3-column squircle tiles
    aspectRatio: 1,
  },
  levelTile: {
    flex: 1,
    backgroundColor: '#C87B2E',
    borderRadius: 18,
    borderWidth: 2.5,
    borderBottomWidth: 3.5,
    borderColor: '#542509',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#2B1203',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 4,
  },
  levelTileLocked: {
    backgroundColor: '#4E260F',
    borderColor: '#301303',
    borderBottomColor: '#240C01',
    opacity: 0.7,
  },
  levelTilePerfect: {
    borderColor: '#FFD700',
    borderWidth: 2.5,
  },
  levelTileNext: {
    backgroundColor: '#E59529',
    borderColor: '#FFD700',
    borderWidth: 2.5,
    shadowColor: '#FFD700',
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  tileTopHighlight: {
    position: 'absolute',
    top: 3,
    left: 5,
    right: 6,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 2,
  },
  tileLeftHighlight: {
    position: 'absolute',
    top: 5,
    left: 3,
    width: 2.5,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 2,
  },
  tileNotch: {
    position: 'absolute',
    left: 0,
    top: '48%',
    width: 4,
    height: 2,
    backgroundColor: '#542509',
    borderRadius: 1,
  },
  crownBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    zIndex: 15,
  },
  crownBadgeIcon: {
    fontSize: 22,
  },
  levelNumber: {
    fontFamily: FONTS.title,
    color: '#FFFDF7',
    fontSize: 26,
    marginBottom: 4,
    textShadowColor: 'rgba(40, 16, 2, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  levelNumberLocked: {
    color: '#7A431D',
    fontSize: 22,
    marginBottom: 2,
    textShadowColor: 'transparent',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  starSymbol: {
    fontSize: 14,
  },
  starGolden: {
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  starMuted: {
    color: '#663B16',
  },
  lockedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  padlockIcon: {
    fontSize: 16,
  },
  levelTileCanUnlock: {
    backgroundColor: '#6C3612',
    borderColor: '#F59E0B',
    borderWidth: 2,
    borderBottomWidth: 3.5,
    opacity: 1,
    shadowColor: '#F59E0B',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  adUnlockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#B45309',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: 2,
  },
  adUnlockText: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 9,
    letterSpacing: 0.5,
  },
});
