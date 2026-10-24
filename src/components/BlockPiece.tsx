import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  Platform,
  Easing,
} from 'react-native';
import { Block, HintAction } from '../types/game';
import { THEME } from '../constants/theme';
import { AudioService } from '../services/audio';
import { getBlockMoveRange, BlockMoveRange } from '../utils/boardLogic';

interface BlockPieceProps {
  block: Block;
  cellSize: number;
  allBlocks: Block[];
  onMove: (blockId: string, toRow: number, toCol: number) => void;
  hint?: HintAction | null;
  isWon?: boolean;
  activeDragBlockIdRef: React.MutableRefObject<string | null>;
  dragCancelToken: number;
}

export const BlockPiece: React.FC<BlockPieceProps> = ({
  block,
  cellSize,
  allBlocks,
  onMove,
  hint,
  isWon = false,
  activeDragBlockIdRef,
  dragCancelToken,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Mutable refs for current props
  const blockRef = useRef(block);
  blockRef.current = block;

  const allBlocksRef = useRef(allBlocks);
  allBlocksRef.current = allBlocks;

  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const cellSizeRef = useRef(cellSize);
  cellSizeRef.current = cellSize;

  const isWonRef = useRef(isWon);
  isWonRef.current = isWon;

  // Gesture state tracker refs
  const hasCommittedRef = useRef<boolean>(false);
  const currentClampedOffset = useRef<number>(0);
  const lastSlideCellRef = useRef<number>(0);
  const moveRangeRef = useRef<BlockMoveRange>({ minCells: 0, maxCells: 0 });

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const liftAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const isTarget = !!block.isTarget;
  const isHorizontal = block.orientation === 'h';
  const isHinted = hint && hint.blockId === block.id;

  // Synchronous position reset BEFORE paint to guarantee zero frame backward lag / flicker
  useLayoutEffect(() => {
    hasCommittedRef.current = false;
    currentClampedOffset.current = 0;
    pan.setValue({ x: 0, y: 0 });
  }, [block.row, block.col]);

  // Cancel any active drag immediately when token or isWon changes
  const cancelGesture = () => {
    setIsDragging(false);
    if (activeDragBlockIdRef.current === block.id) {
      activeDragBlockIdRef.current = null;
    }
    hasCommittedRef.current = false;
    currentClampedOffset.current = 0;
    pan.setValue({ x: 0, y: 0 });
    Animated.timing(liftAnim, {
      toValue: 1,
      duration: 80,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    cancelGesture();
  }, [dragCancelToken, isWon]);

  // Win exit slide animation for target red block through the gate
  useEffect(() => {
    if (isWon && isTarget) {
      Animated.timing(pan.x, {
        toValue: cellSize * 2.5,
        duration: 450,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [isWon, isTarget, cellSize, pan.x]);

  // Hint pulsing animation
  useEffect(() => {
    if (isHinted) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isHinted, pulseAnim]);

  // Finish gesture on finger release: snap to destination cell with swipe & flick physics
  const finishGesture = (gestureState?: {
    vx?: number;
    vy?: number;
    dx?: number;
    dy?: number;
  }) => {
    setIsDragging(false);
    if (activeDragBlockIdRef.current === block.id) {
      activeDragBlockIdRef.current = null;
    }

    Animated.timing(liftAnim, {
      toValue: 1,
      duration: 80,
      useNativeDriver: false,
    }).start();

    if (isWonRef.current || hasCommittedRef.current) {
      return;
    }

    const currentBlock = blockRef.current;
    const currentCell = cellSizeRef.current;
    const offset = currentClampedOffset.current;
    const range = moveRangeRef.current;

    const isH = currentBlock.orientation === 'h';
    const velocity = isH ? (gestureState?.vx ?? 0) : (gestureState?.vy ?? 0);
    const gestureDelta = isH ? (gestureState?.dx ?? offset) : (gestureState?.dy ?? offset);

    // Calculate discrete steps from displacement
    const rawSteps = offset / currentCell;
    let targetSteps = Math.round(rawSteps);

    // High-responsiveness swipe & flick detection:
    // If user flicked with notable velocity or dragged > 25% of a cell in swipe direction
    if (velocity > 0.2 || (gestureDelta > 10 && rawSteps >= 0.25)) {
      targetSteps = Math.max(1, Math.ceil(rawSteps));
    } else if (velocity < -0.2 || (gestureDelta < -10 && rawSteps <= -0.25)) {
      targetSteps = Math.min(-1, Math.floor(rawSteps));
    }

    // Strictly clamp to legal corridor range
    targetSteps = Math.max(range.minCells, Math.min(range.maxCells, targetSteps));

    if (targetSteps !== 0) {
      hasCommittedRef.current = true;
      const snapOffset = targetSteps * currentCell;
      const animTarget = isH ? pan.x : pan.y;

      const targetRow =
        currentBlock.orientation === 'v'
          ? currentBlock.row + targetSteps
          : currentBlock.row;
      const targetCol =
        currentBlock.orientation === 'h'
          ? currentBlock.col + targetSteps
          : currentBlock.col;

      // Animate swiftly and cleanly to target grid cell (65ms ease-out)
      Animated.timing(animTarget, {
        toValue: snapOffset,
        duration: 65,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        AudioService.playBlockSnap();
        // Commit coordinate move to Game state
        onMoveRef.current(currentBlock.id, targetRow, targetCol);

        // Fallback safety timeout in case state update is delayed
        setTimeout(() => {
          if (hasCommittedRef.current) {
            hasCommittedRef.current = false;
            pan.setValue({ x: 0, y: 0 });
            currentClampedOffset.current = 0;
          }
        }, 200);
      });
    } else {
      // Returned to origin cell (crisp spring)
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        bounciness: 2,
        speed: 30,
        useNativeDriver: false,
      }).start(() => {
        currentClampedOffset.current = 0;
      });
    }
  };

  // PanResponder with Full Multi-Cell Fluid Dragging across all free cells
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        !isWonRef.current &&
        (activeDragBlockIdRef.current === null || activeDragBlockIdRef.current === block.id),
      onMoveShouldSetPanResponder: (_, gesture) =>
        !isWonRef.current &&
        (activeDragBlockIdRef.current === null || activeDragBlockIdRef.current === block.id) &&
        (Math.abs(gesture.dx) > 1 || Math.abs(gesture.dy) > 1),
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: () => {
        if (isWonRef.current) return;
        if (
          activeDragBlockIdRef.current !== null &&
          activeDragBlockIdRef.current !== block.id
        ) {
          return;
        }

        activeDragBlockIdRef.current = block.id;
        setIsDragging(true);
        hasCommittedRef.current = false;
        currentClampedOffset.current = 0;
        lastSlideCellRef.current = 0;
        pan.setValue({ x: 0, y: 0 });
        AudioService.playWoodClick();

        // Calculate available movement range across entire corridor
        moveRangeRef.current = getBlockMoveRange(
          blockRef.current,
          allBlocksRef.current
        );

        // Visual tactile lift
        Animated.timing(liftAnim, {
          toValue: 1.03,
          duration: 80,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: (_, gesture) => {
        if (isWonRef.current || hasCommittedRef.current) return;
        if (activeDragBlockIdRef.current !== block.id) return;

        const currentBlock = blockRef.current;
        const currentCell = cellSizeRef.current;
        const range = moveRangeRef.current;

        // Fluid continuous drag across ALL available free cells in corridor (no axis freezing)
        if (currentBlock.orientation === 'h') {
          const minOffset = range.minCells * currentCell;
          const maxOffset = range.maxCells * currentCell;
          const clampedX = Math.max(minOffset, Math.min(maxOffset, gesture.dx));

          currentClampedOffset.current = clampedX;
          pan.x.setValue(clampedX);
          pan.y.setValue(0);

          const cellStep = Math.round(clampedX / currentCell);
          if (cellStep !== lastSlideCellRef.current && cellStep !== 0) {
            lastSlideCellRef.current = cellStep;
            AudioService.playBlockSlide();
          }
        } else {
          const minOffset = range.minCells * currentCell;
          const maxOffset = range.maxCells * currentCell;
          const clampedY = Math.max(minOffset, Math.min(maxOffset, gesture.dy));

          currentClampedOffset.current = clampedY;
          pan.y.setValue(clampedY);
          pan.x.setValue(0);

          const cellStep = Math.round(clampedY / currentCell);
          if (cellStep !== lastSlideCellRef.current && cellStep !== 0) {
            lastSlideCellRef.current = cellStep;
            AudioService.playBlockSlide();
          }
        }
      },
      onPanResponderRelease: (_, gesture) => {
        finishGesture(gesture);
      },
      onPanResponderTerminate: () => {
        cancelGesture();
      },
    })
  ).current;

  // Canonical Sizing with 2px Inset on all sides (guarantees 4px gap between blocks)
  const left = block.col * cellSize + 2;
  const top = block.row * cellSize + 2;
  const width = (isHorizontal ? block.length * cellSize : cellSize) - 4;
  const height = (isHorizontal ? cellSize : block.length * cellSize) - 4;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left,
          top,
          width,
          height,
          zIndex: isDragging ? 50 : 10,
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: isHinted ? pulseAnim : liftAnim },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          styles.pieceInner,
          isTarget ? styles.targetBlock : styles.woodBlock,
          isDragging && styles.pieceDragging,
          isHinted && styles.hintBorder,
        ]}
      >
        {/* Cartoon Wood Specular Highlights */}
        <View
          style={[
            styles.topBevel,
            isTarget ? styles.targetTopBevel : styles.woodTopBevel,
          ]}
        />
        <View
          style={[
            styles.leftBevel,
            isTarget ? styles.targetLeftBevel : styles.woodLeftBevel,
          ]}
        />

        {/* Realistic Stylized Wood Texture / Grooves */}
        {isTarget ? (
          <View style={styles.realisticGrainContainer}>
            <View style={[styles.redGrainLine, { width: '88%', top: '22%' }]} />
            <View style={[styles.redGrainLine, { width: '68%', top: '50%' }]} />
            <View style={[styles.redGrainLine, { width: '80%', top: '76%' }]} />
            <View style={styles.redSubtleShine} />
          </View>
        ) : (
          <View style={styles.realisticGrainContainer}>
            {isHorizontal ? (
              <>
                <View style={[styles.woodGrainLine, { width: '86%', top: '20%' }]} />
                <View style={[styles.woodGrainLine, { width: '64%', top: '50%' }]} />
                <View style={[styles.woodGrainLine, { width: '78%', top: '80%' }]} />
              </>
            ) : (
              <>
                <View style={[styles.woodGrainLineV, { height: '86%', left: '20%' }]} />
                <View style={[styles.woodGrainLineV, { height: '64%', left: '50%' }]} />
                <View style={[styles.woodGrainLineV, { height: '78%', left: '80%' }]} />
              </>
            )}
            <View style={styles.woodSubtleShine} />
          </View>
        )}

        {/* Hint Arrow Overlay */}
        {isHinted && hint && (
          <View style={styles.hintIndicator}>
            <Text style={styles.hintArrow}>
              {hint.direction === 'left' && '◀'}
              {hint.direction === 'right' && '▶'}
              {hint.direction === 'up' && '▲'}
              {hint.direction === 'down' && '▼'}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...(Platform.OS === 'web'
      ? ({
          userSelect: 'none',
          cursor: 'grab',
          touchAction: 'none',
        } as any)
      : {}),
  },
  pieceInner: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadows.block,
  },
  pieceDragging: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 10,
    elevation: 12,
    borderColor: '#FFE082',
  },
  woodBlock: {
    backgroundColor: '#DFC49B',
    borderTopColor: '#FFF2DD',
    borderLeftColor: '#F5E0C3',
    borderRightColor: '#9C7245',
    borderBottomColor: '#6B4A28',
    borderBottomWidth: 3.5,
    borderRightWidth: 2,
  },
  targetBlock: {
    backgroundColor: '#C62828',
    borderTopColor: '#FF8A80',
    borderLeftColor: '#EF5350',
    borderRightColor: '#780000',
    borderBottomColor: '#4A0000',
    borderBottomWidth: 3.5,
    borderRightWidth: 2,
  },
  topBevel: {
    position: 'absolute',
    top: 1,
    left: 3,
    right: 3,
    height: 2.5,
    borderRadius: 1.5,
  },
  leftBevel: {
    position: 'absolute',
    top: 2,
    left: 1.5,
    bottom: 2,
    width: 2,
    borderRadius: 1,
  },
  woodTopBevel: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  woodLeftBevel: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  targetTopBevel: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  targetLeftBevel: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  realisticGrainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  woodGrainLine: {
    position: 'absolute',
    height: 1.5,
    backgroundColor: '#8A623A',
    opacity: 0.28,
    borderRadius: 1,
  },
  woodGrainLineV: {
    position: 'absolute',
    width: 1.5,
    backgroundColor: '#8A623A',
    opacity: 0.28,
    borderRadius: 1,
  },
  woodSubtleShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  redGrainLine: {
    position: 'absolute',
    height: 1.5,
    backgroundColor: '#4E0303',
    opacity: 0.32,
    borderRadius: 1,
  },
  redSubtleShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  hintBorder: {
    borderColor: '#FFD700',
    borderWidth: 2.5,
    shadowColor: '#FFD700',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  hintIndicator: {
    position: 'absolute',
    backgroundColor: 'rgba(20, 10, 5, 0.88)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FFD700',
    zIndex: 30,
  },
  hintArrow: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '900',
  },
});
