import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Animated,
} from 'react-native';
import { WoodButton } from '../WoodButton';
import { ArchedRibbon } from '../ArchedRibbon';
import { WoodPlankButton } from '../WoodPlankButton';
import { THEME, FONTS } from '../../constants/theme';

interface HowToPlayModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  visible,
  onClose,
}) => {
  const cellSize = 28;
  const gridWidth = cellSize * 6; // 168px 6x6 grid

  // Animation values for the demonstration blocks (Native Driver for 60fps)
  const horizontalSlideAnim = useRef(new Animated.Value(0)).current;
  const verticalSlideAnim = useRef(new Animated.Value(0)).current;
  const targetExitAnim = useRef(new Animated.Value(0)).current;

  // Seamless continuous demonstration loop showing all 3 mechanics in one realistic puzzle sequence
  useEffect(() => {
    if (!visible) return;

    horizontalSlideAnim.setValue(0);
    verticalSlideAnim.setValue(0);
    targetExitAnim.setValue(0);

    const animation = Animated.loop(
      Animated.sequence([
        // Step 1: Horizontal block slides left to make space
        Animated.timing(horizontalSlideAnim, {
          toValue: -2 * cellSize,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.delay(250),

        // Step 2: Vertical block slides UP into the newly cleared lane
        Animated.timing(verticalSlideAnim, {
          toValue: -2 * cellSize,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.delay(250),

        // Step 3: Red block slides forward through the unblocked row out the Exit gate!
        Animated.timing(targetExitAnim, {
          toValue: 3 * cellSize,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.delay(1100),

        // Step 4: Smooth parallel reset back to initial positions
        Animated.parallel([
          Animated.timing(targetExitAnim, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.timing(verticalSlideAnim, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.timing(horizontalSlideAnim, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(400),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [visible, cellSize, horizontalSlideAnim, verticalSlideAnim, targetExitAnim]);

  // Build 6x6 checker cells for tutorial board
  const cells = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      const isEven = (r + c) % 2 === 0;
      cells.push(
        <View
          key={`tutorial-cell-${r}-${c}`}
          style={[
            styles.cell,
            {
              width: cellSize,
              height: cellSize,
              left: c * cellSize,
              top: r * cellSize,
              backgroundColor: isEven ? THEME.colors.cellEven : THEME.colors.cellOdd,
            },
          ]}
        />
      );
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Top-Right Dismiss 'X' Button */}
          <WoodButton
            size="square"
            variant="secondary"
            iconName="close"
            iconSize={18}
            onPress={onClose}
            style={styles.closeXBtn}
          />

          {/* Top Arched Ribbon Banner (Image 3 Style) */}
          <ArchedRibbon title="HOW TO PLAY" variant="green" />

          {/* Mini 6x6 Board Animation Showing All Moves Together */}
          <View style={styles.demoBoardFrame}>
            <View
              style={[
                styles.demoGrid,
                { width: gridWidth, height: gridWidth },
              ]}
            >
              {/* 6x6 Grid Cells */}
              {cells}

              {/* Exit Gate on right edge at Row 2 */}
              <View
                style={[
                  styles.exitGateMarker,
                  {
                    top: 2 * cellSize,
                    height: cellSize,
                    left: gridWidth - 2,
                  },
                ]}
              >
                <View style={styles.exitGlow} />
                <View style={styles.exitGate}>
                  <Text style={styles.exitChevron}>»</Text>
                </View>
              </View>

              {/* 1. Horizontal Demo Block (Row 0, Cols 3-4, length 2) */}
              <Animated.View
                style={[
                  styles.demoBlockH,
                  {
                    top: 0 * cellSize + 2,
                    left: 3 * cellSize + 2,
                    width: 2 * cellSize - 4,
                    height: cellSize - 4,
                    transform: [{ translateX: horizontalSlideAnim }],
                  },
                ]}
              >
                <View style={styles.woodGrainLineH} />
                <Text style={styles.boldArrowH}>◀  ▶</Text>
              </Animated.View>

              {/* 2. Vertical Demo Block (Rows 2-3, Col 3, length 2) */}
              <Animated.View
                style={[
                  styles.demoBlockV,
                  {
                    top: 2 * cellSize + 2,
                    left: 3 * cellSize + 2,
                    width: cellSize - 4,
                    height: 2 * cellSize - 4,
                    transform: [{ translateY: verticalSlideAnim }],
                  },
                ]}
              >
                <View style={styles.woodGrainLineV} />
                <View style={styles.arrowCol}>
                  <Text style={styles.boldArrowV}>▲</Text>
                  <Text style={styles.boldArrowV}>▼</Text>
                </View>
              </Animated.View>

              {/* 3. Red Target Block (Row 2, Cols 1-2, length 2) */}
              <Animated.View
                style={[
                  styles.demoTargetBlock,
                  {
                    top: 2 * cellSize + 2,
                    left: 1 * cellSize + 2,
                    width: 2 * cellSize - 4,
                    height: cellSize - 4,
                    transform: [{ translateX: targetExitAnim }],
                  },
                ]}
              >
                <View style={styles.redBevelHighlight} />
                <Text style={styles.boldArrowRed}>▶▶</Text>
              </Animated.View>
            </View>
          </View>

          {/* All Instructions Added Together In One Unified Guide Card */}
          <View style={styles.rulesCard}>
            {/* Rule 1: Horizontal */}
            <View style={styles.ruleRow}>
              <View style={styles.badgeH}>
                <Text style={styles.badgeArrowText}>◀ ▶</Text>
              </View>
              <View style={styles.ruleTextContainer}>
                <Text style={styles.ruleTitle}>Horizontal Blocks</Text>
                <Text style={styles.ruleDesc}>Slide sideways along their row</Text>
              </View>
            </View>

            <View style={styles.ruleDivider} />

            {/* Rule 2: Vertical */}
            <View style={styles.ruleRow}>
              <View style={styles.badgeV}>
                <Text style={styles.badgeArrowVText}>▲{'\n'}▼</Text>
              </View>
              <View style={styles.ruleTextContainer}>
                <Text style={styles.ruleTitle}>Vertical Blocks</Text>
                <Text style={styles.ruleDesc}>Slide up & down along their column</Text>
              </View>
            </View>

            <View style={styles.ruleDivider} />

            {/* Rule 3: Red Target Block Exit */}
            <View style={styles.ruleRow}>
              <View style={styles.badgeRed}>
                <Text style={styles.badgeRedText}>▶▶</Text>
              </View>
              <View style={styles.ruleTextContainer}>
                <Text style={styles.ruleTitleRed}>Red Target Block</Text>
                <Text style={styles.ruleDesc}>Free the path to slide it out the exit!</Text>
              </View>
            </View>
          </View>

          {/* Bottom Wood Plank Action Button */}
          <WoodPlankButton
            title="GOT IT!"
            variant="wood"
            onPress={onClose}
            style={styles.gotItBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: THEME.colors.bgOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    width: '100%',
    maxWidth: 330,
    backgroundColor: '#351B0D',
    borderRadius: 22,
    borderWidth: 3.5,
    borderTopColor: '#7D4522',
    borderLeftColor: '#68391A',
    borderRightColor: '#261208',
    borderBottomColor: '#1A0C05',
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    ...THEME.shadows.board,
  },
  closeXBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 12,
    zIndex: 25,
  },
  demoBoardFrame: {
    backgroundColor: '#381C0D',
    borderRadius: 12,
    padding: 8,
    borderWidth: 2.5,
    borderColor: '#241006',
    borderTopColor: '#5C3419',
    ...THEME.shadows.board,
    marginTop: 6,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoGrid: {
    position: 'relative',
    backgroundColor: '#261208',
    borderRadius: 6,
    overflow: 'visible',
    borderWidth: 1.5,
    borderColor: '#1F0C04',
  },
  cell: {
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: 'rgba(35, 18, 8, 0.4)',
  },
  exitGateMarker: {
    position: 'absolute',
    width: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  exitGlow: {
    position: 'absolute',
    width: 18,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.45)',
  },
  exitGate: {
    width: 12,
    height: '90%',
    backgroundColor: '#C62828',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1.5,
    borderLeftWidth: 0,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitChevron: {
    color: '#FFE082',
    fontSize: 10,
    fontWeight: '900',
  },
  demoBlockH: {
    position: 'absolute',
    backgroundColor: '#DFC49B',
    borderRadius: 5,
    borderWidth: 1.5,
    borderTopColor: '#FFF2DD',
    borderLeftColor: '#FFF2DD',
    borderRightColor: '#6B4A28',
    borderBottomColor: '#6B4A28',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    overflow: 'hidden',
  },
  demoBlockV: {
    position: 'absolute',
    backgroundColor: '#DFC49B',
    borderRadius: 5,
    borderWidth: 1.5,
    borderTopColor: '#FFF2DD',
    borderLeftColor: '#FFF2DD',
    borderRightColor: '#6B4A28',
    borderBottomColor: '#6B4A28',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    overflow: 'hidden',
  },
  woodGrainLineH: {
    position: 'absolute',
    left: 4,
    right: 4,
    top: '48%',
    height: 1,
    backgroundColor: 'rgba(120, 80, 40, 0.25)',
  },
  woodGrainLineV: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: '48%',
    width: 1,
    backgroundColor: 'rgba(120, 80, 40, 0.25)',
  },
  demoTargetBlock: {
    position: 'absolute',
    backgroundColor: '#C62828',
    borderRadius: 5,
    borderWidth: 1.5,
    borderTopColor: '#FF8A80',
    borderLeftColor: '#EF5350',
    borderRightColor: '#630000',
    borderBottomColor: '#4A0000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  redBevelHighlight: {
    position: 'absolute',
    top: 1,
    left: 2,
    right: 2,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 1,
  },
  boldArrowH: {
    color: '#653F19',
    fontSize: 10,
    fontWeight: '900',
  },
  boldArrowV: {
    color: '#653F19',
    fontSize: 9,
    fontWeight: '900',
  },
  boldArrowRed: {
    color: '#FFE082',
    fontSize: 11,
    fontWeight: '900',
  },
  arrowCol: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '65%',
  },
  rulesCard: {
    width: '100%',
    backgroundColor: '#261309',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#4A2713',
    marginBottom: 14,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  badgeH: {
    width: 38,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#DFC49B',
    borderWidth: 1.5,
    borderTopColor: '#FFF2DD',
    borderLeftColor: '#FFF2DD',
    borderRightColor: '#6B4A28',
    borderBottomColor: '#6B4A28',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeV: {
    width: 38,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#DFC49B',
    borderWidth: 1.5,
    borderTopColor: '#FFF2DD',
    borderLeftColor: '#FFF2DD',
    borderRightColor: '#6B4A28',
    borderBottomColor: '#6B4A28',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeRed: {
    width: 38,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#C62828',
    borderWidth: 1.5,
    borderTopColor: '#FF8A80',
    borderLeftColor: '#EF5350',
    borderRightColor: '#630000',
    borderBottomColor: '#4A0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeArrowText: {
    color: '#523010',
    fontSize: 10,
    fontWeight: '900',
  },
  badgeArrowVText: {
    color: '#523010',
    fontSize: 8,
    lineHeight: 9,
    fontWeight: '900',
    textAlign: 'center',
  },
  badgeRedText: {
    color: '#FFE082',
    fontSize: 10,
    fontWeight: '900',
  },
  ruleTextContainer: {
    flex: 1,
  },
  ruleTitle: {
    color: '#FFE8D1',
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  ruleTitleRed: {
    color: '#FF7B7B',
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  ruleDesc: {
    color: '#CBB299',
    fontSize: 11,
    fontFamily: FONTS.regular,
    marginTop: 1,
  },
  ruleDivider: {
    height: 1,
    backgroundColor: '#3D1F0E',
    marginVertical: 4,
  },
  gotItBtn: {
    width: '100%',
  },
});
