import { Block } from '../types/game';

/**
 * Checks if moving block to (targetRow, targetCol) is 100% legal.
 * 
 * Rules enforced:
 * 1. Target coordinate must change by at most 1 cell along the allowed orientation.
 * 2. Entire destination footprint must be within the 6x6 board (0..5).
 * 3. Every cell of the destination footprint must be empty (or occupied by the moving block itself).
 */
export function isMoveLegal(
  block: Block,
  targetRow: number,
  targetCol: number,
  allBlocks: Block[]
): boolean {
  const height = block.orientation === 'v' ? block.length : 1;
  const width = block.orientation === 'h' ? block.length : 1;

  // 1. Board bounds check for destination footprint
  if (targetRow < 0 || targetRow + height > 6) return false;
  if (targetCol < 0 || targetCol + width > 6) return false;

  // 2. Strict orientation constraint
  if (block.orientation === 'h' && targetRow !== block.row) return false;
  if (block.orientation === 'v' && targetCol !== block.col) return false;

  // 3. Collision check against all other blocks on destination footprint
  for (const other of allBlocks) {
    if (other.id === block.id) continue;

    const oHeight = other.orientation === 'v' ? other.length : 1;
    const oWidth = other.orientation === 'h' ? other.length : 1;

    // AABB intersection check between destination footprint and other block
    const overlapRow =
      Math.max(targetRow, other.row) < Math.min(targetRow + height, other.row + oHeight);
    const overlapCol =
      Math.max(targetCol, other.col) < Math.min(targetCol + width, other.col + oWidth);

    if (overlapRow && overlapCol) {
      return false; // Overlap detected!
    }
  }

  return true;
}

/**
 * Verifies that the entire board is valid (no overlapping cells, all within 6x6 bounds).
 */
export function verifyBoardIntegrity(blocks: Block[]): boolean {
  let totalCells = 0;
  const occupied = new Set<string>();
  for (const b of blocks) {
    totalCells += b.length;
    const height = b.orientation === 'v' ? b.length : 1;
    const width = b.orientation === 'h' ? b.length : 1;

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const row = b.row + r;
        const col = b.col + c;

        if (row < 0 || row >= 6 || col < 0 || col >= 6) {
          return false;
        }

        const key = `${row},${col}`;
        if (occupied.has(key)) {
          return false; // Two blocks occupy the same cell!
        }
        occupied.add(key);
      }
    }
  }
  // Count of total cells occupied by all blocks must equal unique occupied cells
  return totalCells === occupied.size;
}

/**
 * Calculates the full continuous movement range (in cell units) for a block
 * allowing it to slide smoothly across ALL consecutive free cells in its corridor.
 */
export interface BlockMoveRange {
  minCells: number; // Negative or 0 (how many cells it can slide left / up)
  maxCells: number; // Positive or 0 (how many cells it can slide right / down)
}

export function getBlockMoveRange(
  block: Block,
  allBlocks: Block[]
): BlockMoveRange {
  let minCells = 0;
  let maxCells = 0;

  if (block.orientation === 'h') {
    // Check how many cells we can move left
    let testCol = block.col - 1;
    while (testCol >= 0 && isMoveLegal(block, block.row, testCol, allBlocks)) {
      minCells--;
      testCol--;
    }
    // Check how many cells we can move right
    testCol = block.col + 1;
    while (testCol + block.length <= 6 && isMoveLegal(block, block.row, testCol, allBlocks)) {
      maxCells++;
      testCol++;
    }
  } else {
    // Check how many cells we can move up
    let testRow = block.row - 1;
    while (testRow >= 0 && isMoveLegal(block, testRow, block.col, allBlocks)) {
      minCells--;
      testRow--;
    }
    // Check how many cells we can move down
    testRow = block.row + 1;
    while (testRow + block.length <= 6 && isMoveLegal(block, testRow, block.col, allBlocks)) {
      maxCells++;
      testRow++;
    }
  }

  return { minCells, maxCells };
}

