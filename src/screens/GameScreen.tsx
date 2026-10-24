import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HUD } from '../components/HUD';
import { Board } from '../components/Board';
import { ControlBar } from '../components/ControlBar';
import { PauseModal } from '../components/Modals/PauseModal';
import { SettingsModal } from '../components/Modals/SettingsModal';
import { WinModal } from '../components/Modals/WinModal';
import { Block, Level, HintAction, UserProgress } from '../types/game';
import { LEVELS } from '../data/levels';
import { StorageService } from '../services/storage';
import { AudioService } from '../services/audio';
import { AdService } from '../services/adService';
import { solvePuzzle } from '../utils/solver';
import { verifyBoardIntegrity } from '../utils/boardLogic';
import { THEME, FONTS } from '../constants/theme';

interface GameScreenProps {
  levelId: number;
  progress: UserProgress;
  onBackToLevelSelect: () => void;
  onBackToHome: () => void;
  onNextLevel: (nextLevelId: number) => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onToggleHaptics: () => void;
  onProgressUpdated: (updated: UserProgress) => void;
}

interface StateSnapshot {
  blocks: Block[];
  moves: number;
  isWon: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const GameScreen: React.FC<GameScreenProps> = ({
  levelId,
  progress,
  onBackToLevelSelect,
  onBackToHome,
  onNextLevel,
  onToggleSound,
  onToggleMusic,
  onToggleHaptics,
  onProgressUpdated,
}) => {
  const currentLevel = LEVELS.find((l) => l.id === levelId) || LEVELS[0];

  const [blocks, setBlocks] = useState<Block[]>(() =>
    currentLevel.blocks.map((b) => ({ ...b }))
  );
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState<StateSnapshot[]>([]);
  const [usedHints, setUsedHints] = useState(false);
  const [activeHint, setActiveHint] = useState<HintAction | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [dragCancelToken, setDragCancelToken] = useState(0);
  const [hasUsedFreeRetry, setHasUsedFreeRetry] = useState(false);

  // Modals
  const [showPause, setShowPause] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [winStats, setWinStats] = useState({
    stars: 1,
    crown: false,
    isNewBest: false,
  });

  // Intercept Android hardware back button during gameplay to show Menu popup
  useEffect(() => {
    const onBackPress = () => {
      if (showWin) return false;
      if (showSettings) {
        setShowSettings(false);
        setShowPause(true);
        return true;
      }
      if (showPause) {
        setShowPause(false);
        return true;
      }
      setDragCancelToken((t) => t + 1);
      setShowPause(true);
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [showWin, showPause, showSettings]);

  // Board occupies ~90% of screen width on mobile portrait (Fix 14)
  const boardSize = Math.floor(Math.min(SCREEN_WIDTH * 0.90, 360));

  // Reload level when levelId changes (Canonical Rule 17)
  useEffect(() => {
    setBlocks(currentLevel.blocks.map((b) => ({ ...b })));
    setMoves(0);
    setHistory([]);
    setUsedHints(false);
    setActiveHint(null);
    setIsWon(false);
    setShowPause(false);
    setShowSettings(false);
    setShowWin(false);
    setHasUsedFreeRetry(false);
    setDragCancelToken((t) => t + 1);
  }, [levelId, currentLevel]);

  // Handle discrete 1-cell block move (Canonical Rules 5, 7, 8, 13, 14, 15)
  const handleMoveBlock = async (
    blockId: string,
    toRow: number,
    toCol: number
  ) => {
    if (isWon) return;

    // Snapshot full state for atomic undo (Canonical Rule 16)
    setHistory((prev) => [
      ...prev,
      {
        blocks: blocks.map((b) => ({ ...b })),
        moves,
        isWon,
      },
    ]);

    // Update block coordinates
    const nextBlocks = blocks.map((b) =>
      b.id === blockId ? { ...b, row: toRow, col: toCol } : b
    );

    // Consistency Check: ensure no overlap across any blocks (Canonical Rule 15)
    if (!verifyBoardIntegrity(nextBlocks)) {
      console.warn('Illegal state detected, rolling back move');
      return;
    }

    const nextMoves = moves + 1;
    setBlocks(nextBlocks);
    setMoves(nextMoves);
    setActiveHint(null);

    // Win Check: target block right edge at column 6 and exitRow matches (Canonical Rules 13 & 14)
    const movingBlock = nextBlocks.find((b) => b.id === blockId);
    if (
      movingBlock?.isTarget &&
      movingBlock.row === currentLevel.exitRow &&
      movingBlock.col + movingBlock.length === 6 &&
      !isWon
    ) {
      setIsWon(true);
      setDragCancelToken((t) => t + 1);

      const result = await StorageService.recordLevelWin(
        currentLevel.id,
        nextMoves,
        currentLevel.par,
        usedHints
      );

      setWinStats(result);
      onProgressUpdated(StorageService.getProgress());

      setTimeout(() => {
        setShowWin(true);
      }, 500);
    }
  };

  // Atomic Undo: restores ENTIRE prior state (Canonical Rule 16)
  const handleUndo = () => {
    if (history.length === 0 || isWon) return;
    AudioService.playWoodClick();

    const lastSnapshot = history[history.length - 1];
    setBlocks(lastSnapshot.blocks.map((b) => ({ ...b })));
    setMoves(lastSnapshot.moves);
    setIsWon(lastSnapshot.isWon);
    setHistory((h) => h.slice(0, h.length - 1));
    setActiveHint(null);
    setDragCancelToken((t) => t + 1);
  };

  // Full Reset: 1st retry free, subsequent retries require a 5s skippable ad
  const handleReset = () => {
    AudioService.playWoodClick();
    if (!hasUsedFreeRetry) {
      setHasUsedFreeRetry(true);
      setBlocks(currentLevel.blocks.map((b) => ({ ...b })));
      setMoves(0);
      setHistory([]);
      setActiveHint(null);
      setIsWon(false);
      setShowPause(false);
      setShowWin(false);
      setDragCancelToken((t) => t + 1);
    } else {
      AdService.showAd({
        reason: 'retry',
        onComplete: () => {
          setBlocks(currentLevel.blocks.map((b) => ({ ...b })));
          setMoves(0);
          setHistory([]);
          setActiveHint(null);
          setIsWon(false);
          setShowPause(false);
          setShowWin(false);
          setDragCancelToken((t) => t + 1);
        },
      });
    }
  };

  // Hint: exactly 1 starting hint, subsequent hints require a 5s skippable ad
  const handleHint = async () => {
    if (isWon) return;

    const solverResult = solvePuzzle(blocks, currentLevel.exitRow);
    if (!solverResult.solvable || !solverResult.nextMove) {
      AudioService.playRejectThud();
      return;
    }

    if (progress.hintsRemaining > 0) {
      AudioService.playWoodClick();
      await StorageService.consumeHintToken();
      onProgressUpdated(StorageService.getProgress());
      setUsedHints(true);
      setActiveHint(solverResult.nextMove || null);
    } else {
      AudioService.playWoodClick();
      AdService.showAd({
        reason: 'hint',
        onComplete: () => {
          setUsedHints(true);
          setActiveHint(solverResult.nextMove || null);
        },
      });
    }
  };

  const bestMoves = progress.levelScores[currentLevel.id]?.bestMoves;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HUD Top Bar */}
        <View style={styles.hudWrapper}>
          <HUD
            levelNumber={currentLevel.id}
            tier={currentLevel.tier}
            moves={moves}
            par={currentLevel.par}
            bestMoves={bestMoves}
            stars={progress.levelScores[currentLevel.id]?.stars || 0}
          />
        </View>

        {/* Hint Banner (if active) */}
        {activeHint ? (
          <View style={styles.hintBanner}>
            <Text style={styles.hintBannerText}>
              💡 {activeHint.explanation || 'Slide indicated piece'}
            </Text>
          </View>
        ) : (
          <View style={styles.hintPlaceholder} />
        )}

        {/* 6x6 Wooden Puzzle Board (Centered, 90% screen width) */}
        <Board
          boardSize={boardSize}
          blocks={blocks}
          exitRow={currentLevel.exitRow}
          onMoveBlock={handleMoveBlock}
          hint={activeHint}
          isWon={isWon}
          dragCancelToken={dragCancelToken}
        />

        {/* Control Bar (Pause, Hint with AD icon, Reset with AD icon) */}
        <View style={styles.controlsWrapper}>
          <ControlBar
            onPause={() => {
              setDragCancelToken((t) => t + 1);
              setShowPause(true);
            }}
            onHint={handleHint}
            onReset={handleReset}
            hintsRemaining={progress.hintsRemaining}
            retryRequiresAd={hasUsedFreeRetry}
          />
        </View>
      </View>

      {/* In-Game Menu Popup (Image 3 Style: Resume, Settings, Main Menu) */}
      <PauseModal
        visible={showPause}
        onResume={() => setShowPause(false)}
        onSettings={() => {
          setShowPause(false);
          setShowSettings(true);
        }}
        onHome={() => {
          setShowPause(false);
          onBackToHome();
        }}
      />

      {/* Settings Modal (Image 3 Style) */}
      <SettingsModal
        visible={showSettings}
        onClose={() => {
          setShowSettings(false);
          setShowPause(true);
        }}
        settings={progress.settings}
        onToggleSound={onToggleSound}
        onToggleMusic={onToggleMusic}
        onToggleHaptics={onToggleHaptics}
        onResetProgress={() => {}}
      />

      {/* Win Modal */}
      <WinModal
        visible={showWin}
        levelNumber={currentLevel.id}
        moves={moves}
        par={currentLevel.par}
        bestMoves={bestMoves ? Math.min(bestMoves, moves) : moves}
        stars={winStats.stars}
        hasCrown={winStats.crown}
        onNextLevel={() => {
          setShowWin(false);
          const nextId = currentLevel.id + 1;
          const isTierFinal = currentLevel.id % 12 === 0;

          if (isTierFinal && nextId <= LEVELS.length) {
            AdService.showAd({
              reason: 'tier',
              onComplete: async () => {
                await StorageService.unlockLevel(nextId);
                onProgressUpdated(StorageService.getProgress());
                onNextLevel(nextId);
              },
            });
          } else if (nextId <= LEVELS.length) {
            onNextLevel(nextId);
          } else {
            onBackToLevelSelect();
          }
        }}
        onReplay={() => {
          setShowWin(false);
          handleReset();
        }}
        onLevelSelect={() => {
          setShowWin(false);
          onBackToLevelSelect();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1008',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  hudWrapper: {
    width: '100%',
  },
  controlsWrapper: {
    width: '100%',
  },
  hintBanner: {
    backgroundColor: '#4A2B14',
    width: '88%',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  hintBannerText: {
    color: '#FFDEAA',
    fontSize: 13,
    fontFamily: FONTS.bold,
    letterSpacing: 0.5,
  },
  hintPlaceholder: {
    height: 31,
  },
});
