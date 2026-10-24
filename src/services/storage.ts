import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, LevelProgress, GameSettings } from '../types/game';

const STORAGE_KEY = '@freeblock_user_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  unlockedLevels: [1],
  levelScores: {},
  hintsRemaining: 1,
  settings: {
    sound: true,
    music: true,
    haptics: true,
  },
  currentLevelId: 1,
};

let cachedProgress: UserProgress = { ...DEFAULT_PROGRESS };

export const StorageService = {
  async loadProgress(): Promise<UserProgress> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const parsed = JSON.parse(json);
        cachedProgress = {
          ...DEFAULT_PROGRESS,
          ...parsed,
          hintsRemaining: typeof parsed.hintsRemaining === 'number' ? Math.min(parsed.hintsRemaining, 1) : 1,
          settings: {
            ...DEFAULT_PROGRESS.settings,
            ...(parsed.settings || {}),
          },
        };
      } else {
        cachedProgress = { ...DEFAULT_PROGRESS };
      }
    } catch (e) {
      console.warn('Failed to load progress from storage, using cached/default', e);
    }
    return cachedProgress;
  },

  async saveProgress(progress: Partial<UserProgress>): Promise<UserProgress> {
    cachedProgress = {
      ...cachedProgress,
      ...progress,
    };
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cachedProgress));
    } catch (e) {
      console.warn('Failed to save progress to storage', e);
    }
    return cachedProgress;
  },

  getProgress(): UserProgress {
    return cachedProgress;
  },

  async recordLevelWin(
    levelId: number,
    moves: number,
    par: number,
    usedHints: boolean
  ): Promise<{ stars: number; crown: boolean; isNewBest: boolean }> {
    // Star logic according to FreeBlock.md:
    // - Three stars: matched or beat par
    // - Two stars: par + 1 or par + 2
    // - One star: par + 3 or more
    let stars = 1;
    if (moves <= par) {
      stars = 3;
    } else if (moves <= par + 2) {
      stars = 2;
    }

    const crown = stars === 3 && !usedHints;

    const existing = cachedProgress.levelScores[levelId];
    const isNewBest = !existing || moves < existing.bestMoves;
    const bestStars = Math.max(existing?.stars || 0, stars);
    const bestMoves = existing ? Math.min(existing.bestMoves, moves) : moves;
    const hasCrown = existing?.crown || crown;

    const updatedScores = {
      ...cachedProgress.levelScores,
      [levelId]: {
        completed: true,
        stars: bestStars,
        bestMoves,
        crown: hasCrown,
      },
    };

    // Unlock next level if not a tier-final boundary
    const nextLevelId = levelId + 1;
    const isTierFinal = levelId % 12 === 0;
    const unlockedSet = new Set(cachedProgress.unlockedLevels);

    // Intra-tier levels unlock automatically; tier boundaries unlock after watching the tier ad
    if (!isTierFinal && nextLevelId <= 60) {
      unlockedSet.add(nextLevelId);
    }

    await this.saveProgress({
      unlockedLevels: Array.from(unlockedSet),
      levelScores: updatedScores,
      currentLevelId: isTierFinal ? levelId : nextLevelId,
    });

    return { stars, crown, isNewBest };
  },

  async unlockLevel(levelId: number): Promise<void> {
    const unlockedSet = new Set(cachedProgress.unlockedLevels);
    unlockedSet.add(levelId);
    await this.saveProgress({
      unlockedLevels: Array.from(unlockedSet),
      currentLevelId: levelId,
    });
  },

  async consumeHintToken(): Promise<boolean> {
    if (cachedProgress.hintsRemaining <= 0) return false;
    await this.saveProgress({
      hintsRemaining: cachedProgress.hintsRemaining - 1,
    });
    return true;
  },

  async useHintToken(): Promise<boolean> {
    return this.consumeHintToken();
  },

  async addHintTokens(count: number): Promise<number> {
    const updated = cachedProgress.hintsRemaining + count;
    await this.saveProgress({ hintsRemaining: updated });
    return updated;
  },

  async updateSettings(settings: Partial<GameSettings>): Promise<GameSettings> {
    const updated = {
      ...cachedProgress.settings,
      ...settings,
    };
    await this.saveProgress({ settings: updated });
    return updated;
  },

  async resetAllProgress(): Promise<UserProgress> {
    cachedProgress = { ...DEFAULT_PROGRESS };
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to reset progress', e);
    }
    return cachedProgress;
  },
};
