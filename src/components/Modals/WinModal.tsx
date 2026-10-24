import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Animated,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME, FONTS } from '../../constants/theme';
import { AudioService } from '../../services/audio';

interface WinModalProps {
  visible: boolean;
  levelNumber: number;
  moves: number;
  par: number;
  bestMoves: number;
  stars: number; // 1, 2, or 3
  hasCrown?: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onLevelSelect: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  visible,
  levelNumber,
  moves,
  par,
  bestMoves,
  stars,
  onNextLevel,
  onReplay,
  onLevelSelect,
}) => {
  const panelScale = useRef(new Animated.Value(0.7)).current;
  const ribbonAnim = useRef(new Animated.Value(0)).current;
  const star1Anim = useRef(new Animated.Value(0)).current;
  const star2Anim = useRef(new Animated.Value(0)).current;
  const star3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      panelScale.setValue(0.7);
      ribbonAnim.setValue(0);
      star1Anim.setValue(0);
      star2Anim.setValue(0);
      star3Anim.setValue(0);

      AudioService.playWinFanfare();

      Animated.parallel([
        Animated.spring(panelScale, {
          toValue: 1,
          friction: 6,
          tension: 45,
          useNativeDriver: true,
        }),
        Animated.spring(ribbonAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // Staggered star pop-in
      const starAnims = [star1Anim, star2Anim, star3Anim];
      for (let i = 0; i < stars; i++) {
        setTimeout(() => {
          AudioService.playStarNote(i);
          Animated.spring(starAnims[i], {
            toValue: 1,
            friction: 4,
            tension: 55,
            useNativeDriver: true,
          }).start();
        }, 320 + i * 280);
      }
    }
  }, [visible, stars, panelScale, ribbonAnim, star1Anim, star2Anim, star3Anim]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.dialogContainer,
            { transform: [{ scale: panelScale }] },
          ]}
        >
          {/* Top Red Ribbon Banner: "Awesome!" (Image 1 Style) */}
          <Animated.View
            style={[
              styles.ribbonWrapper,
              {
                transform: [
                  {
                    scale: ribbonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.65, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Left Ribbon Notch Tail */}
            <View style={[styles.ribbonTail, styles.ribbonTailLeft]} />

            {/* Ribbon Body */}
            <View style={styles.ribbonBody}>
              <View style={styles.ribbonInnerGlow} />
              <Text style={styles.ribbonTitle}>Awesome!</Text>
            </View>

            {/* Right Ribbon Notch Tail */}
            <View style={[styles.ribbonTail, styles.ribbonTailRight]} />
          </Animated.View>

          {/* Main Square Wooden Board Panel (Image 1 Style) */}
          <View style={styles.woodBoard}>
            {/* Subtle Vertical Wood Grain Lines */}
            <View style={[styles.boardGrain, { left: '22%' }]} />
            <View style={[styles.boardGrain, { left: '48%' }]} />
            <View style={[styles.boardGrain, { left: '74%' }]} />

            {/* 3 Golden Faceted Stars Pedestal */}
            <View style={styles.starsRow}>
              {/* Left Star */}
              <View style={styles.starSlot}>
                <Ionicons name="star" size={50} color="#9E784D" style={styles.emptyStar} />
                {stars >= 1 && (
                  <Animated.View
                    style={[
                      styles.activeStarWrapper,
                      {
                        transform: [{ scale: star1Anim }],
                        opacity: star1Anim,
                      },
                    ]}
                  >
                    <Ionicons name="star" size={52} color="#FFD700" style={styles.goldStar} />
                    <View style={styles.starHighlight} />
                  </Animated.View>
                )}
              </View>

              {/* Center Star (Slightly larger and elevated) */}
              <View style={[styles.starSlot, styles.centerStarSlot]}>
                <Ionicons name="star" size={62} color="#9E784D" style={styles.emptyStar} />
                {stars >= 2 && (
                  <Animated.View
                    style={[
                      styles.activeStarWrapper,
                      {
                        transform: [{ scale: star2Anim }],
                        opacity: star2Anim,
                      },
                    ]}
                  >
                    <Ionicons name="star" size={64} color="#FFD700" style={styles.goldStar} />
                    <View style={styles.starHighlight} />
                  </Animated.View>
                )}
              </View>

              {/* Right Star */}
              <View style={styles.starSlot}>
                <Ionicons name="star" size={50} color="#9E784D" style={styles.emptyStar} />
                {stars >= 3 && (
                  <Animated.View
                    style={[
                      styles.activeStarWrapper,
                      {
                        transform: [{ scale: star3Anim }],
                        opacity: star3Anim,
                      },
                    ]}
                  >
                    <Ionicons name="star" size={52} color="#FFD700" style={styles.goldStar} />
                    <View style={styles.starHighlight} />
                  </Animated.View>
                )}
              </View>
            </View>

            {/* Dark Teal / Green Moves Badge (Image 1 Style) */}
            <View style={styles.movesBadge}>
              <View style={styles.movesBadgeInner}>
                <Text style={styles.movesBadgeText}>Moves : {moves}</Text>
              </View>
            </View>

            {/* Score Stats: Best & Perfect */}
            <View style={styles.scoreStats}>
              <Text style={styles.statLine}>Best : {bestMoves}</Text>
              <Text style={styles.statLine}>Perfect : {par}</Text>
            </View>

            {/* Bottom Row of 3 Rectangular Wood Buttons (Image 1 Style) */}
            <View style={styles.actionsRow}>
              {/* 1. Menu List Button */}
              <Pressable
                onPress={() => {
                  AudioService.playWoodClick();
                  onLevelSelect();
                }}
                style={({ pressed }) => [
                  styles.actionBtn,
                  styles.brownBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <Ionicons name="list" size={24} color="#FFE6C2" />
              </Pressable>

              {/* 2. Replay Button */}
              <Pressable
                onPress={() => {
                  AudioService.playWoodClick();
                  onReplay();
                }}
                style={({ pressed }) => [
                  styles.actionBtn,
                  styles.brownBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <Ionicons name="reload" size={24} color="#FFE6C2" />
              </Pressable>

              {/* 3. Next Level Button (Teal / Green) */}
              <Pressable
                onPress={() => {
                  AudioService.playWoodClick();
                  onNextLevel();
                }}
                style={({ pressed }) => [
                  styles.actionBtn,
                  styles.greenBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <Ionicons name="play-forward" size={24} color="#FFE6C2" />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(12, 6, 3, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialogContainer: {
    width: '92%',
    maxWidth: 320,
    alignItems: 'center',
    position: 'relative',
  },
  ribbonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -16,
    zIndex: 20,
  },
  ribbonTail: {
    width: 18,
    height: 36,
    backgroundColor: '#821313',
    borderWidth: 2,
    borderColor: '#B71C1C',
  },
  ribbonTailLeft: {
    marginRight: -6,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  ribbonTailRight: {
    marginLeft: -6,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  ribbonBody: {
    backgroundColor: '#A81C1C',
    paddingHorizontal: 32,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 2.5,
    borderTopColor: '#FF8A80',
    borderLeftColor: '#E53935',
    borderRightColor: '#6B0909',
    borderBottomColor: '#4A0000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  ribbonInnerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  ribbonTitle: {
    fontFamily: FONTS.title,
    fontSize: 22,
    color: '#FFE29A',
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowColor: 'rgba(50, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  woodBoard: {
    width: '100%',
    backgroundColor: '#E0BD88',
    borderRadius: 16,
    borderWidth: 4,
    borderTopColor: '#FFF2DC',
    borderLeftColor: '#F5DCB5',
    borderRightColor: '#A37948',
    borderBottomColor: '#6E4E28',
    paddingTop: 30,
    paddingBottom: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.65,
    shadowRadius: 14,
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  boardGrain: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#C59E68',
    opacity: 0.35,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
    height: 72,
  },
  starSlot: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerStarSlot: {
    width: 66,
    height: 66,
    marginBottom: 8,
  },
  emptyStar: {
    opacity: 0.45,
  },
  activeStarWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldStar: {
    textShadowColor: 'rgba(180, 110, 0, 0.7)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4,
  },
  starHighlight: {
    position: 'absolute',
    top: 10,
    left: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  movesBadge: {
    backgroundColor: '#1E4647',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4D9690',
    padding: 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 4,
  },
  movesBadgeInner: {
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#193B3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movesBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  scoreStats: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 3,
  },
  statLine: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#4B2A12',
    letterSpacing: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  actionBtn: {
    width: 68,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  brownBtn: {
    backgroundColor: '#8C5023',
    borderTopColor: '#C4814B',
    borderLeftColor: '#A76634',
    borderRightColor: '#5C300E',
    borderBottomColor: '#401F07',
    borderBottomWidth: 3,
  },
  greenBtn: {
    backgroundColor: '#267A53',
    borderTopColor: '#53B787',
    borderLeftColor: '#389A6B',
    borderRightColor: '#164E33',
    borderBottomColor: '#0D3823',
    borderBottomWidth: 3,
  },
  btnPressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.9,
  },
});
