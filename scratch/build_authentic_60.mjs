import fs from 'fs';

// 6x6 Board Geometry & BFS Solver
function isValid(blocks) {
  const occ = new Set();
  for (const b of blocks) {
    const h = b.orientation === 'v' ? b.length : 1;
    const w = b.orientation === 'h' ? b.length : 1;
    if (b.row < 0 || b.row + h > 6 || b.col < 0 || b.col + w > 6) return false;
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const k = `${b.row + r},${b.col + c}`;
        if (occ.has(k)) return false;
        occ.add(k);
      }
    }
  }
  return true;
}

function solve(blocks, maxVisited = 50000) {
  const targetIdx = blocks.findIndex((b) => b.isTarget);
  if (targetIdx === -1) return null;
  const target = blocks[targetIdx];
  if (blocks[targetIdx].col + target.length === 6) return { minMoves: 0 };

  const serialize = (pos) => pos.map((p) => `${p.r},${p.c}`).join(';');
  const initialPos = blocks.map((b) => ({ r: b.row, c: b.col }));

  const visited = new Set();
  visited.add(serialize(initialPos));
  const queue = [{ pos: initialPos, dist: 0 }];

  while (queue.length > 0) {
    if (visited.size > maxVisited) return null;
    const curr = queue.shift();

    const grid = Array.from({ length: 6 }, () => Array(6).fill(-1));
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const p = curr.pos[i];
      const h = b.orientation === 'v' ? b.length : 1;
      const w = b.orientation === 'h' ? b.length : 1;
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          grid[p.r + r][p.c + c] = i;
        }
      }
    }

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const p = curr.pos[i];

      if (b.orientation === 'h') {
        let step = 1;
        while (p.c - step >= 0 && grid[p.r][p.c - step] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r, c: p.c - step } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
          step++;
        }
        step = 1;
        while (p.c + b.length - 1 + step < 6 && grid[p.r][p.c + b.length - 1 + step] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r, c: p.c + step } : pt
          );
          if (i === targetIdx && p.c + step + b.length === 6) {
            return { minMoves: curr.dist + 1 };
          }
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
          step++;
        }
      } else {
        let step = 1;
        while (p.r - step >= 0 && grid[p.r - step][p.c] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r - step, c: p.c } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
          step++;
        }
        step = 1;
        while (p.r + b.length - 1 + step < 6 && grid[p.r + b.length - 1 + step][p.c] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r + step, c: p.c } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
          step++;
        }
      }
    }
  }
  return null;
}

// Reachable states exploration from a seed
function exploreAllStates(seed, maxStates = 8000) {
  const serialize = (pos) => pos.map((p) => `${p.r},${p.c}`).join(';');
  const initialPos = seed.map((b) => ({ r: b.row, c: b.col }));

  const visited = new Set();
  visited.add(serialize(initialPos));
  const queue = [initialPos];
  const states = [];

  while (queue.length > 0 && states.length < maxStates) {
    const curr = queue.shift();
    states.push(curr);

    const grid = Array.from({ length: 6 }, () => Array(6).fill(-1));
    for (let i = 0; i < seed.length; i++) {
      const b = seed[i];
      const p = curr[i];
      const h = b.orientation === 'v' ? b.length : 1;
      const w = b.orientation === 'h' ? b.length : 1;
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          grid[p.r + r][p.c + c] = i;
        }
      }
    }

    for (let i = 0; i < seed.length; i++) {
      const b = seed[i];
      const p = curr[i];

      if (b.orientation === 'h') {
        let step = 1;
        while (p.c - step >= 0 && grid[p.r][p.c - step] === -1) {
          const next = curr.map((pt, idx) => (idx === i ? { r: p.r, c: p.c - step } : pt));
          const key = serialize(next);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push(next);
          }
          step++;
        }
        step = 1;
        while (p.c + b.length - 1 + step < 6 && grid[p.r][p.c + b.length - 1 + step] === -1) {
          const next = curr.map((pt, idx) => (idx === i ? { r: p.r, c: p.c + step } : pt));
          const key = serialize(next);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push(next);
          }
          step++;
        }
      } else {
        let step = 1;
        while (p.r - step >= 0 && grid[p.r - step][p.c] === -1) {
          const next = curr.map((pt, idx) => (idx === i ? { r: p.r - step, c: p.c } : pt));
          const key = serialize(next);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push(next);
          }
          step++;
        }
        step = 1;
        while (p.r + b.length - 1 + step < 6 && grid[p.r + b.length - 1 + step][p.c] === -1) {
          const next = curr.map((pt, idx) => (idx === i ? { r: p.r + step, c: p.c } : pt));
          const key = serialize(next);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push(next);
          }
          step++;
        }
      }
    }
  }
  return states;
}

// 24 structurally distinct base puzzle seeds
const SEEDS = [
  // 1. Beginner 4-block: A
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
    { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
  ],
  // 2. Beginner 4-block: B
  [
    { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 3, col: 2, length: 2, orientation: 'h' },
    { id: 'v2', row: 3, col: 4, length: 2, orientation: 'v' },
  ],
  // 3. Beginner 5-block: Two Pillars
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 2, length: 2, orientation: 'h' },
  ],
  // 4. Beginner 5-block: Timber Log
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 2, length: 3, orientation: 'h' },
    { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'v2', row: 2, col: 4, length: 2, orientation: 'v' },
  ],
  // 5. Beginner 5-block: Crossroad
  [
    { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 4, length: 3, orientation: 'v' },
    { id: 'h1', row: 1, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 1, length: 2, orientation: 'h' },
  ],
  // 6. Beginner 6-block: Sliding Alcove
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
    { id: 'v3', row: 1, col: 5, length: 2, orientation: 'v' },
    { id: 'h2', row: 4, col: 1, length: 3, orientation: 'h' },
  ],
  // 7. Beginner 6-block: Pinwheel Step
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 3, col: 2, length: 2, orientation: 'h' },
    { id: 'v3', row: 2, col: 4, length: 2, orientation: 'v' },
    { id: 'h2', row: 0, col: 4, length: 2, orientation: 'h' },
  ],
  // 8. Beginner 6-block: Forest Gate
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 3, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
    { id: 'v3', row: 0, col: 5, length: 3, orientation: 'v' },
  ],
  // 9. Intermediate 7-block: Triple Barricade
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'v3', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 3, length: 2, orientation: 'h' },
    { id: 'v4', row: 2, col: 5, length: 2, orientation: 'v' },
  ],
  // 10. Intermediate 7-block: Birch Maze
  [
    { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 3, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 1, length: 2, orientation: 'h' },
    { id: 'v3', row: 2, col: 4, length: 2, orientation: 'v' },
    { id: 'h3', row: 4, col: 3, length: 2, orientation: 'h' },
  ],
  // 11. Intermediate 7-block: Cedar Labyrinth
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'v3', row: 1, col: 4, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 2, length: 3, orientation: 'h' },
    { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
    { id: 'h3', row: 4, col: 2, length: 2, orientation: 'h' },
  ],
  // 12. Intermediate 8-block: Twin Logs
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 3, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'v3', row: 2, col: 4, length: 2, orientation: 'v' },
    { id: 'h3', row: 4, col: 2, length: 2, orientation: 'h' },
    { id: 'v4', row: 0, col: 5, length: 2, orientation: 'v' },
  ],
  // 13. Intermediate 8-block: Oak Shuffle
  [
    { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 0, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'v5', row: 1, col: 4, length: 3, orientation: 'v' },
  ],
  // 14. Intermediate 8-block: Amber Corridors
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 3, col: 2, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 3, orientation: 'h' },
    { id: 'v3', row: 1, col: 4, length: 2, orientation: 'v' },
    { id: 'h2', row: 3, col: 3, length: 2, orientation: 'h' },
    { id: 'h3', row: 5, col: 0, length: 3, orientation: 'h' },
    { id: 'v4', row: 2, col: 5, length: 3, orientation: 'v' },
  ],
  // 15. Advanced 9-block: The Interlock
  [
    { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 3, orientation: 'v' },
    { id: 'v2', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v3', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'v4', row: 1, col: 4, length: 2, orientation: 'v' },
    { id: 'v5', row: 3, col: 4, length: 2, orientation: 'v' },
    { id: 'h3', row: 5, col: 3, length: 2, orientation: 'h' },
  ],
  // 16. Advanced 9-block: Maple Wall
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 3, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'v3', row: 3, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
    { id: 'h3', row: 0, col: 4, length: 2, orientation: 'h' },
    { id: 'v4', row: 2, col: 4, length: 2, orientation: 'v' },
    { id: 'h4', row: 5, col: 2, length: 3, orientation: 'h' },
  ],
  // 17. Advanced 10-block: Pine Fortress
  [
    { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 0, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'v5', row: 1, col: 4, length: 2, orientation: 'v' },
    { id: 'v6', row: 3, col: 4, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'h3', row: 5, col: 3, length: 2, orientation: 'h' },
  ],
  // 18. Expert 10-block: Rush Gate
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 3, col: 3, length: 2, orientation: 'v' },
    { id: 'v5', row: 1, col: 4, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'h3', row: 0, col: 4, length: 2, orientation: 'h' },
    { id: 'h4', row: 5, col: 2, length: 3, orientation: 'h' },
  ],
  // 19. Expert 11-block: Redwood Enigma
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'v5', row: 1, col: 4, length: 2, orientation: 'v' },
    { id: 'v6', row: 3, col: 4, length: 2, orientation: 'v' },
    { id: 'v7', row: 2, col: 5, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'h3', row: 5, col: 2, length: 3, orientation: 'h' },
  ],
  // 20. Master 12-block: Master Knot
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 1, length: 2, orientation: 'v' },
    { id: 'v2', row: 3, col: 0, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'v5', row: 2, col: 4, length: 2, orientation: 'v' },
    { id: 'v6', row: 4, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 4, length: 2, orientation: 'h' },
    { id: 'h2', row: 1, col: 4, length: 2, orientation: 'h' },
    { id: 'h3', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'h4', row: 5, col: 0, length: 2, orientation: 'h' },
    { id: 'h5', row: 5, col: 4, length: 2, orientation: 'h' },
  ],
  // 21. Master 11-block: Deep Corridor
  [
    { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 0, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'v5', row: 0, col: 4, length: 2, orientation: 'v' },
    { id: 'v6', row: 2, col: 4, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'h3', row: 5, col: 0, length: 3, orientation: 'h' },
    { id: 'h4', row: 4, col: 4, length: 2, orientation: 'h' },
  ],
  // 22. Master 12-block: Grand Puzzle
  [
    { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 3, col: 3, length: 2, orientation: 'v' },
    { id: 'v5', row: 0, col: 4, length: 2, orientation: 'v' },
    { id: 'v6', row: 3, col: 4, length: 2, orientation: 'v' },
    { id: 'v7', row: 1, col: 5, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'h3', row: 5, col: 2, length: 2, orientation: 'h' },
    { id: 'h4', row: 5, col: 4, length: 2, orientation: 'h' },
  ]
];

console.log('Generating rich state pool from 22 diverse seeds...');

const pool = [];

for (let sIdx = 0; sIdx < SEEDS.length; sIdx++) {
  const seed = SEEDS[sIdx];
  const states = exploreAllStates(seed, 2000);
  console.log(`Seed ${sIdx + 1} (${seed.length} blocks) -> ${states.length} reachable states.`);

  for (const pos of states) {
    // If target block is already at exit, skip
    if (pos[0].c >= 4) continue;

    const candidate = seed.map((b, idx) => ({
      ...b,
      row: pos[idx].r,
      col: pos[idx].c
    }));

    if (isValid(candidate)) {
      const sol = solve(candidate, 8000);
      if (sol && sol.minMoves >= 2) {
        pool.push({
          seedIndex: sIdx,
          blockCount: seed.length,
          blocks: candidate,
          par: sol.minMoves
        });
      }
    }
  }
}

console.log(`Generated pool of ${pool.length} validated unique states!`);

// Distinct Tier Targets:
// Beginner: Levels 1-12 (blockCount 4-6, par 3-8)
// Intermediate: Levels 13-24 (blockCount 6-8, par 7-14)
// Advanced: Levels 25-36 (blockCount 8-10, par 12-22)
// Expert: Levels 37-48 (blockCount 9-11, par 18-28)
// Master: Levels 49-60 (blockCount 10-12, par 22-40)

const levelNames = [
  // Beginner (1-12)
  "First Light", "Oak Shifter", "Sunlit Gate", "Two Pillars",
  "Timber Crossing", "Crossroad", "Sliding Alcove", "Pinwheel Step",
  "Forest Gate", "Birch Walk", "Cedar Arch", "River Log",
  // Intermediate (13-24)
  "Triple Barricade", "Birch Maze", "Cedar Labyrinth", "Twin Logs",
  "Oak Shuffle", "Amber Corridors", "Stone Path", "Willow Bend",
  "Mossy Grove", "Rustic Bridge", "Hedge Gate", "Lantern Run",
  // Advanced (25-36)
  "The Interlock", "Maple Wall", "Pine Fortress", "Shadow Timber",
  "Twisted Branch", "Ancient Grove", "Autumn Shifter", "Whispering Pines",
  "Briar Patch", "Iron Oak", "Dense Forest", "Cobblestone Pass",
  // Expert (37-48)
  "Rush Gate", "Redwood Enigma", "Bramble Maze", "Darkwood Wall",
  "Fortress Lock", "Lost Pathway", "Canyon Pass", "Deep Roots",
  "Thorn Barrier", "Stone Labyrinth", "Great Gate", "Summit Slide",
  // Master (49-60)
  "Master Knot", "Deep Corridor", "Grand Puzzle", "Vault of Cedar",
  "The Monolith", "Dragonwood", "Perpetual Shift", "Obsidian Oak",
  "Final Corridor", "Eternal Maze", "Apex Enigma", "Grandmaster Pass"
];

const tiers = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];

const final60 = [];
const usedSignatures = new Set();

function getSig(blocks) {
  return blocks.map(b => `${b.id}:${b.row},${b.col}`).sort().join('|');
}

// Helper to select best candidate for a given target range
function pickCandidate(minBlocks, maxBlocks, minPar, maxPar, preferredSeedIdx = -1) {
  let filtered = pool.filter(c =>
    c.blockCount >= minBlocks &&
    c.blockCount <= maxBlocks &&
    c.par >= minPar &&
    c.par <= maxPar &&
    !usedSignatures.has(getSig(c.blocks))
  );

  if (preferredSeedIdx >= 0) {
    const pref = filtered.filter(c => c.seedIndex === preferredSeedIdx);
    if (pref.length > 0) filtered = pref;
  }

  if (filtered.length === 0) {
    // Relax par constraint slightly
    filtered = pool.filter(c =>
      c.blockCount >= minBlocks &&
      c.blockCount <= maxBlocks &&
      !usedSignatures.has(getSig(c.blocks))
    );
  }

  if (filtered.length === 0) {
    // Relax all
    filtered = pool.filter(c => !usedSignatures.has(getSig(c.blocks)));
  }

  // Pick candidate closest to median par
  filtered.sort((a, b) => a.par - b.par);
  const picked = filtered[Math.floor(filtered.length / 2)] || filtered[0];
  if (picked) {
    usedSignatures.add(getSig(picked.blocks));
  }
  return picked;
}

// 1. Beginner (Levels 1 to 12)
for (let i = 1; i <= 12; i++) {
  // Gradual ramp: 4 blocks up to 6 blocks, par 3 to 8
  const maxBlocks = i <= 3 ? 4 : i <= 7 ? 5 : 6;
  const minBlocks = i <= 2 ? 4 : 4;
  const targetPar = 2 + Math.floor(i * 0.6);
  const candidate = pickCandidate(minBlocks, maxBlocks, targetPar - 1, targetPar + 2, (i - 1) % 8);

  final60.push({
    id: i,
    tier: 'Beginner',
    name: levelNames[i - 1],
    par: candidate.par,
    exitRow: 2,
    blocks: candidate.blocks
  });
}

// 2. Intermediate (Levels 13 to 24)
for (let i = 13; i <= 24; i++) {
  const minBlocks = 6;
  const maxBlocks = 8;
  const targetPar = 6 + Math.floor((i - 12) * 0.7);
  const candidate = pickCandidate(minBlocks, maxBlocks, targetPar - 2, targetPar + 3, 8 + ((i - 13) % 7));

  final60.push({
    id: i,
    tier: 'Intermediate',
    name: levelNames[i - 1],
    par: candidate.par,
    exitRow: 2,
    blocks: candidate.blocks
  });
}

// 3. Advanced (Levels 25 to 36)
for (let i = 25; i <= 36; i++) {
  const minBlocks = 8;
  const maxBlocks = 10;
  const targetPar = 10 + Math.floor((i - 24) * 0.9);
  const candidate = pickCandidate(minBlocks, maxBlocks, targetPar - 3, targetPar + 4, 14 + ((i - 25) % 4));

  final60.push({
    id: i,
    tier: 'Advanced',
    name: levelNames[i - 1],
    par: candidate.par,
    exitRow: 2,
    blocks: candidate.blocks
  });
}

// 4. Expert (Levels 37 to 48)
for (let i = 37; i <= 48; i++) {
  const minBlocks = 9;
  const maxBlocks = 11;
  const targetPar = 14 + Math.floor((i - 36) * 1.1);
  const candidate = pickCandidate(minBlocks, maxBlocks, targetPar - 3, targetPar + 5, 17 + ((i - 37) % 3));

  final60.push({
    id: i,
    tier: 'Expert',
    name: levelNames[i - 1],
    par: candidate.par,
    exitRow: 2,
    blocks: candidate.blocks
  });
}

// 5. Master (Levels 49 to 60)
for (let i = 49; i <= 60; i++) {
  const minBlocks = 10;
  const maxBlocks = 12;
  const targetPar = 18 + Math.floor((i - 48) * 1.2);
  const candidate = pickCandidate(minBlocks, maxBlocks, targetPar - 4, targetPar + 8, 19 + ((i - 49) % 3));

  final60.push({
    id: i,
    tier: 'Master',
    name: levelNames[i - 1],
    par: candidate.par,
    exitRow: 2,
    blocks: candidate.blocks
  });
}

console.log(`Successfully generated ${final60.length} distinct, mathematically verified levels!`);

// Print sample stats
for (let i = 0; i < 15; i++) {
  const l = final60[i];
  console.log(`Lvl ${l.id} [${l.tier}]: "${l.name}" | Blocks: ${l.blocks.length} | Par: ${l.par}`);
}
console.log(`Lvl 20 [${final60[19].tier}]: "${final60[19].name}" | Blocks: ${final60[19].blocks.length} | Par: ${final60[19].par}`);
console.log(`Lvl 35 [${final60[34].tier}]: "${final60[34].name}" | Blocks: ${final60[34].blocks.length} | Par: ${final60[34].par}`);
console.log(`Lvl 50 [${final60[49].tier}]: "${final60[49].name}" | Blocks: ${final60[49].blocks.length} | Par: ${final60[49].par}`);
console.log(`Lvl 60 [${final60[59].tier}]: "${final60[59].name}" | Blocks: ${final60[59].blocks.length} | Par: ${final60[59].par}`);

// Write to src/data/levels.ts
const fileContent = `import { Level } from '../types/game';

export const LEVELS: Level[] = ${JSON.stringify(final60, null, 2)};
`;

fs.writeFileSync('src/data/levels.ts', fileContent, 'utf-8');
console.log('Successfully written to src/data/levels.ts!');
