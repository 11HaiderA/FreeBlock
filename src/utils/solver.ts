import { Block, HintAction } from '../types/game';

export interface SolverResult {
  solvable: boolean;
  minMoves: number;
  nextMove?: HintAction;
  solutionPath?: { blockId: string; toRow: number; toCol: number }[];
}

/**
 * Fast BFS solver for 6x6 FreeBlock puzzle boards using discrete 1-cell step transitions.
 */
export function solvePuzzle(
  blocks: Block[],
  exitRow: number = 2,
  maxExplored: number = 30000
): SolverResult {
  const targetIndex = blocks.findIndex((b) => b.isTarget);
  if (targetIndex === -1) {
    return { solvable: false, minMoves: 0 };
  }

  const initialPositions = blocks.map((b) => ({ r: b.row, c: b.col }));

  // Check if already won
  const targetBlock = blocks[targetIndex];
  if (initialPositions[targetIndex].c + targetBlock.length === 6) {
    return { solvable: true, minMoves: 0 };
  }

  const serialize = (positions: { r: number; c: number }[]) => {
    return positions.map((p) => `${p.r},${p.c}`).join(';');
  };

  const initialKey = serialize(initialPositions);

  type QueueItem = {
    positions: { r: number; c: number }[];
    parentKey: string | null;
    action?: { blockId: string; toRow: number; toCol: number };
  };

  const visited = new Set<string>();
  visited.add(initialKey);

  const queue: QueueItem[] = [{ positions: initialPositions, parentKey: null }];
  const parentMap = new Map<string, { prevKey: string | null; action?: { blockId: string; toRow: number; toCol: number } }>();
  parentMap.set(initialKey, { prevKey: null });

  let winningKey: string | null = null;
  let exploredCount = 0;

  while (queue.length > 0 && exploredCount < maxExplored) {
    const current = queue.shift()!;
    exploredCount++;
    const currentKey = serialize(current.positions);

    // Build 6x6 grid of occupied cells
    const grid: number[][] = Array.from({ length: 6 }, () => Array(6).fill(-1));
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const pos = current.positions[i];
      for (let l = 0; l < b.length; l++) {
        const r = b.orientation === 'v' ? pos.r + l : pos.r;
        const c = b.orientation === 'h' ? pos.c + l : pos.c;
        if (r >= 0 && r < 6 && c >= 0 && c < 6) {
          grid[r][c] = i;
        }
      }
    }

    // Try moving each block by exactly 1 step (+1 or -1)
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const pos = current.positions[i];

      if (b.orientation === 'h') {
        // Move Left 1 cell
        if (pos.c - 1 >= 0 && grid[pos.r][pos.c - 1] === -1) {
          const newCol = pos.c - 1;
          const nextPositions = current.positions.map((p, idx) =>
            idx === i ? { r: pos.r, c: newCol } : p
          );
          const nextKey = serialize(nextPositions);
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            const action = { blockId: b.id, toRow: pos.r, toCol: newCol };
            parentMap.set(nextKey, { prevKey: currentKey, action });
            queue.push({ positions: nextPositions, parentKey: currentKey, action });
          }
        }

        // Move Right 1 cell
        const frontCol = pos.c + b.length;
        if (frontCol < 6 && grid[pos.r][frontCol] === -1) {
          const newCol = pos.c + 1;
          const nextPositions = current.positions.map((p, idx) =>
            idx === i ? { r: pos.r, c: newCol } : p
          );
          const nextKey = serialize(nextPositions);
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            const action = { blockId: b.id, toRow: pos.r, toCol: newCol };
            parentMap.set(nextKey, { prevKey: currentKey, action });
            queue.push({ positions: nextPositions, parentKey: currentKey, action });

            // Check Win Condition
            if (i === targetIndex && newCol + b.length === 6) {
              winningKey = nextKey;
              break;
            }
          }
        }
        if (winningKey) break;
      } else {
        // Vertical block: Move Up 1 cell
        if (pos.r - 1 >= 0 && grid[pos.r - 1][pos.c] === -1) {
          const newRow = pos.r - 1;
          const nextPositions = current.positions.map((p, idx) =>
            idx === i ? { r: newRow, c: pos.c } : p
          );
          const nextKey = serialize(nextPositions);
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            const action = { blockId: b.id, toRow: newRow, toCol: pos.c };
            parentMap.set(nextKey, { prevKey: currentKey, action });
            queue.push({ positions: nextPositions, parentKey: currentKey, action });
          }
        }

        // Move Down 1 cell
        const frontRow = pos.r + b.length;
        if (frontRow < 6 && grid[frontRow][pos.c] === -1) {
          const newRow = pos.r + 1;
          const nextPositions = current.positions.map((p, idx) =>
            idx === i ? { r: newRow, c: pos.c } : p
          );
          const nextKey = serialize(nextPositions);
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            const action = { blockId: b.id, toRow: newRow, toCol: pos.c };
            parentMap.set(nextKey, { prevKey: currentKey, action });
            queue.push({ positions: nextPositions, parentKey: currentKey, action });
          }
        }
      }
    }

    if (winningKey) break;
  }

  if (!winningKey) {
    return { solvable: false, minMoves: 0 };
  }

  // Reconstruct shortest solution path
  const path: { blockId: string; toRow: number; toCol: number }[] = [];
  let curr: string | null = winningKey;

  while (curr && curr !== initialKey) {
    const record = parentMap.get(curr);
    if (record && record.action) {
      path.unshift(record.action);
      curr = record.prevKey;
    } else {
      break;
    }
  }

  let nextMove: HintAction | undefined;
  if (path.length > 0) {
    const firstStep = path[0];
    const blk = blocks.find((b) => b.id === firstStep.blockId)!;
    let direction: 'left' | 'right' | 'up' | 'down' = 'right';
    if (blk.orientation === 'h') {
      direction = firstStep.toCol > blk.col ? 'right' : 'left';
    } else {
      direction = firstStep.toRow > blk.row ? 'down' : 'up';
    }

    nextMove = {
      blockId: firstStep.blockId,
      direction,
      targetRow: firstStep.toRow,
      targetCol: firstStep.toCol,
      explanation: `Slide piece ${direction}`,
    };
  }

  return {
    solvable: true,
    minMoves: path.length,
    nextMove,
    solutionPath: path,
  };
}
