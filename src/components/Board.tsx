import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Text, Platform } from 'react-native';
import { Block, HintAction } from '../types/game';
import { THEME } from '../constants/theme';
import { BlockPiece } from './BlockPiece';

interface BoardProps {
  boardSize: number;
  blocks: Block[];
  exitRow: number;
  onMoveBlock: (blockId: string, toRow: number, toCol: number) => void;
  hint?: HintAction | null;
  isWon?: boolean;
  dragCancelToken?: number;
}

export const Board: React.FC<BoardProps> = ({
  boardSize,
  blocks,
  exitRow,
  onMoveBlock,
  hint,
  isWon = false,
  dragCancelToken = 0,
}) => {
  // Ensure integer cell size so all 6 columns and 6 rows are mathematically uniform
  const cellSize = Math.floor(boardSize / 6);
  const exactBoardSize = cellSize * 6;
  const frameBorderWidth = 10;

  // Global single-drag coordinator for board
  const activeDragBlockIdRef = useRef<string | null>(null);

  useEffect(() => {
    activeDragBlockIdRef.current = null;
  }, [dragCancelToken, isWon]);

  // Continuous left-to-right chevron animation for exit gate (Fix 3.6)
  const chevronAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(chevronAnim, {
          toValue: 5,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(chevronAnim, {
          toValue: 0,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [chevronAnim]);

  // Generate strictly 6 columns x 6 rows with distinct contrast checker shades
  // Cell A: #6B4423, Cell B: #7A4E2A (Fix 1.1 & Fix 3.1)
  const cells = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      const isEven = (r + c) % 2 === 0;
      cells.push(
        <View
          key={`cell-${r}-${c}`}
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
    <View style={styles.boardWrapper}>
      {/* Heavy Outer Wooden Frame with Bevel and Inner Depth (Fix 3.2) */}
      <View
        style={[
          styles.outerFrame,
          {
            width: exactBoardSize + frameBorderWidth * 2,
            height: exactBoardSize + frameBorderWidth * 2,
            padding: frameBorderWidth,
          },
        ]}
      >
        {/* Frame Highlight Bevel on top and left */}
        <View style={styles.frameTopHighlight} />
        <View style={styles.frameLeftHighlight} />

        {/* Recessed Inner Tray (Strictly 6x6 cells) */}
        <View
          style={[
            styles.innerTray,
            {
              width: exactBoardSize,
              height: exactBoardSize,
            },
          ]}
        >
          {/* Inner Depth Shadow around tray */}
          <View style={styles.innerShadowOverlay} pointerEvents="none" />

          {/* Background checker grid cells (Strictly 6 columns x 6 rows) */}
          {cells}

          {/* Interactive Block Pieces */}
          {blocks.map((block) => (
            <BlockPiece
              key={block.id}
              block={block}
              cellSize={cellSize}
              allBlocks={blocks}
              onMove={onMoveBlock}
              hint={hint}
              isWon={isWon}
              activeDragBlockIdRef={activeDragBlockIdRef}
              dragCancelToken={dragCancelToken}
            />
          ))}
        </View>

        {/* Exit Gate anchored flush to right edge of board at exitRow (Fix 1.4 & Fix 3.6) */}
        <View
          style={[
            styles.exitGateGlowWrapper,
            {
              top: frameBorderWidth + exitRow * cellSize,
              height: cellSize,
            },
          ]}
        >
          {/* Soft Gold Radial Glow behind exit gate */}
          <View style={styles.exitGoldGlow} />

          <View style={[styles.exitGate, { height: cellSize - 4 }]}>
            <Animated.View
              style={[
                styles.chevronContainer,
                { transform: [{ translateX: chevronAnim }] },
              ]}
            >
              <Text style={styles.chevronText}>»</Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  outerFrame: {
    backgroundColor: '#8C4D1E',
    borderRadius: 18,
    borderWidth: 4,
    borderTopColor: '#F2CE98',
    borderLeftColor: '#DFAB6E',
    borderRightColor: '#54290B',
    borderBottomColor: '#3E1D06',
    ...THEME.shadows.board,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameTopHighlight: {
    position: 'absolute',
    top: 2,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: 'rgba(255, 230, 190, 0.28)',
    borderRadius: 1,
  },
  frameLeftHighlight: {
    position: 'absolute',
    top: 8,
    left: 2,
    bottom: 8,
    width: 2,
    backgroundColor: 'rgba(255, 230, 190, 0.18)',
    borderRadius: 1,
  },
  innerTray: {
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#261208',
    borderWidth: 2,
    borderColor: '#1F0C04',
  },
  innerShadowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'rgba(15, 6, 2, 0.65)',
    zIndex: 2,
    borderRadius: 4,
  },
  cell: {
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: 'rgba(35, 18, 8, 0.5)',
  },
  exitGateGlowWrapper: {
    position: 'absolute',
    right: -10,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 35,
  },
  exitGoldGlow: {
    position: 'absolute',
    width: 28,
    height: 38,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 215, 0, 0.35)',
    ...(Platform.OS === 'web'
      ? ({
          filter: 'blur(6px)',
        } as any)
      : {}),
  },
  exitGate: {
    width: 18,
    backgroundColor: '#C62828',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 6,
    elevation: 8,
  },
  chevronContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    color: '#FFE082',
    fontSize: 15,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 2,
  },
});
