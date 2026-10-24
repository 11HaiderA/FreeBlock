import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { THEME, FONTS } from '../constants/theme';
import { DifficultyTier } from '../types/game';

interface HUDProps {
  levelNumber: number;
  tier: DifficultyTier;
  moves: number;
  par: number;
  bestMoves?: number;
  stars?: number;
}

export const HUD: React.FC<HUDProps> = ({
  levelNumber,
  tier,
  moves,
  par,
  bestMoves,
  stars = 0,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Card: Moves Box (Image 2 Style) */}
      <View style={styles.hudCard}>
        <Text style={styles.cardHeader}>Moves</Text>
        <Text style={styles.movesNumber}>{moves}</Text>
        <Text style={styles.bestSubText}>
          Best : {bestMoves !== undefined ? bestMoves : '--'}/{par}
        </Text>
      </View>

      {/* Right Card: Level & Tier Box with Stars (Image 2 Style) */}
      <View style={styles.hudCard}>
        <Text style={styles.cardHeader}>{tier}</Text>
        <Text style={styles.levelNumber}>{levelNumber}</Text>
        <View style={styles.starsRow}>
          <Text style={styles.navArrow}>◀</Text>
          <View style={styles.starIcons}>
            <Text style={[styles.starMini, stars >= 1 ? styles.starGold : styles.starDim]}>★</Text>
            <Text style={[styles.starMini, stars >= 2 ? styles.starGold : styles.starDim]}>★</Text>
            <Text style={[styles.starMini, stars >= 3 ? styles.starGold : styles.starDim]}>★</Text>
          </View>
          <Text style={styles.navArrow}>▶</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 16,
    width: '100%',
  },
  hudCard: {
    flex: 1,
    maxWidth: 165,
    backgroundColor: '#42220E',
    borderRadius: 12,
    borderWidth: 2.5,
    borderTopColor: '#6B3818',
    borderLeftColor: '#582E13',
    borderRightColor: '#241005',
    borderBottomColor: '#1A0B03',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  cardHeader: {
    color: '#FFE2C2',
    fontSize: 12,
    fontFamily: FONTS.bold,
    letterSpacing: 0.8,
    marginBottom: 1,
  },
  movesNumber: {
    color: '#FFD700',
    fontSize: 28,
    fontFamily: FONTS.display,
    lineHeight: 32,
    textShadowColor: 'rgba(40, 16, 3, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  levelNumber: {
    color: '#FFFDF9',
    fontSize: 26,
    fontFamily: FONTS.display,
    lineHeight: 30,
    textShadowColor: 'rgba(40, 16, 3, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  bestSubText: {
    color: '#D4A373',
    fontSize: 11,
    fontFamily: FONTS.bold,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 2,
  },
  navArrow: {
    color: '#A06E42',
    fontSize: 9,
  },
  starIcons: {
    flexDirection: 'row',
    gap: 3,
  },
  starMini: {
    fontSize: 12,
  },
  starGold: {
    color: '#FFD700',
  },
  starDim: {
    color: '#704622',
  },
});
