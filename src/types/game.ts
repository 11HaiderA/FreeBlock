export type Orientation = 'h' | 'v';

export interface Block {
  id: string;
  row: number; // 0..5
  col: number; // 0..5
  length: number; // 2 or 3 (or 1)
  orientation: Orientation;
  isTarget?: boolean;
}

export type DifficultyTier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';

export interface Level {
  id: number;
  tier: DifficultyTier;
  name: string;
  par: number;
  exitRow: number; // Usually 2 (standard grid row for exit)
  blocks: Block[];
}

export interface MoveRecord {
  blockId: string;
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
}

export interface LevelProgress {
  completed: boolean;
  stars: number; // 0..3
  bestMoves: number;
  crown: boolean; // 3 stars + 0 hints
}

export interface GameSettings {
  sound: boolean;
  music: boolean;
  haptics: boolean;
}

export interface UserProgress {
  unlockedLevels: number[];
  levelScores: Record<number, LevelProgress>;
  hintsRemaining: number;
  settings: GameSettings;
  currentLevelId: number;
}

export type ScreenType = 'splash' | 'home' | 'levelSelect' | 'game';

export interface HintAction {
  blockId: string;
  direction: 'left' | 'right' | 'up' | 'down';
  targetRow: number;
  targetCol: number;
  explanation?: string;
}
