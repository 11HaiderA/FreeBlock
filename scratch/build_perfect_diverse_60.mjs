import fs from 'fs';

// 1. Geometry Validator
function isValidGeometry(blocks) {
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

// 2. Exact BFS Solver
function solve(blocks, maxVisited = 30000) {
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
        if (p.c - 1 >= 0 && grid[p.r][p.c - 1] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r, c: p.c - 1 } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
        const frontCol = p.c + b.length;
        if (frontCol < 6 && grid[p.r][frontCol] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r, c: p.c + 1 } : pt
          );
          if (i === targetIdx && p.c + 1 + b.length === 6) {
            return { minMoves: curr.dist + 1 };
          }
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
      } else {
        if (p.r - 1 >= 0 && grid[p.r - 1][p.c] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r - 1, c: p.c } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
        const frontRow = p.r + b.length;
        if (frontRow < 6 && grid[frontRow][p.c] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r + 1, c: p.c } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
      }
    }
  }
  return null;
}

// 3. Backward BFS Explorer from winning positions
function backwardExplore(winBlocks, maxStates = 40000) {
  const serialize = (pos) => pos.map((p) => `${p.r},${p.c}`).join(';');
  const initialPos = winBlocks.map((b) => ({ r: b.row, c: b.col }));

  const visited = new Map();
  const initialKey = serialize(initialPos);
  visited.set(initialKey, 0);

  const queue = [{ pos: initialPos, dist: 0 }];
  const statesByDist = new Map();

  while (queue.length > 0 && visited.size < maxStates) {
    const curr = queue.shift();

    if (!statesByDist.has(curr.dist)) {
      statesByDist.set(curr.dist, []);
    }
    statesByDist.get(curr.dist).push(curr.pos);

    const grid = Array.from({ length: 6 }, () => Array(6).fill(-1));
    for (let i = 0; i < winBlocks.length; i++) {
      const b = winBlocks[i];
      const p = curr.pos[i];
      const h = b.orientation === 'v' ? b.length : 1;
      const w = b.orientation === 'h' ? b.length : 1;
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          grid[p.r + r][p.c + c] = i;
        }
      }
    }

    for (let i = 0; i < winBlocks.length; i++) {
      const b = winBlocks[i];
      const p = curr.pos[i];

      if (b.orientation === 'h') {
        if (p.c - 1 >= 0 && grid[p.r][p.c - 1] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r, c: p.c - 1 } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.set(key, curr.dist + 1);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
        const frontCol = p.c + b.length;
        if (frontCol < 6 && grid[p.r][frontCol] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r, c: p.c + 1 } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.set(key, curr.dist + 1);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
      } else {
        if (p.r - 1 >= 0 && grid[p.r - 1][p.c] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r - 1, c: p.c } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.set(key, curr.dist + 1);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
        const frontRow = p.r + b.length;
        if (frontRow < 6 && grid[frontRow][p.c] === -1) {
          const nextPos = curr.pos.map((pt, idx) =>
            idx === i ? { r: p.r + 1, c: p.c } : pt
          );
          const key = serialize(nextPos);
          if (!visited.has(key)) {
            visited.set(key, curr.dist + 1);
            queue.push({ pos: nextPos, dist: curr.dist + 1 });
          }
        }
      }
    }
  }
  return statesByDist;
}

console.log('Building 60 diverse, unique levels with exact difficulty curve...');

// 1. Beginner Seeds (4 to 6 blocks)
const beginnerSeeds = [
  // B1: 4 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
    { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
  ],
  // B2: 4 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 3, col: 2, length: 2, orientation: 'h' },
    { id: 'v2', row: 3, col: 4, length: 2, orientation: 'v' },
  ],
  // B3: 5 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 2, length: 2, orientation: 'h' },
  ],
  // B4: 5 blocks (with 1x3 log)
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 2, length: 3, orientation: 'h' },
    { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'v2', row: 2, col: 0, length: 2, orientation: 'v' },
  ],
  // B5: 5 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 1, length: 3, orientation: 'v' },
    { id: 'h1', row: 1, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 2, length: 2, orientation: 'h' },
  ],
  // B6: 6 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
    { id: 'v3', row: 1, col: 5, length: 2, orientation: 'v' },
    { id: 'h2', row: 4, col: 1, length: 3, orientation: 'h' },
  ],
  // B7: 6 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 3, col: 2, length: 2, orientation: 'h' },
    { id: 'v3', row: 2, col: 1, length: 2, orientation: 'v' },
    { id: 'h2', row: 0, col: 4, length: 2, orientation: 'h' },
  ],
  // B8: 6 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 3, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
    { id: 'v3', row: 0, col: 5, length: 3, orientation: 'v' },
  ]
];

// 2. Intermediate Seeds (7 to 8 blocks)
const intermediateSeeds = [
  // I1: 7 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'v3', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 3, length: 2, orientation: 'h' },
    { id: 'v4', row: 2, col: 1, length: 2, orientation: 'v' },
  ],
  // I2: 7 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 3, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 1, length: 2, orientation: 'h' },
    { id: 'v3', row: 2, col: 2, length: 2, orientation: 'v' },
    { id: 'h3', row: 4, col: 3, length: 2, orientation: 'h' },
  ],
  // I3: 7 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'v3', row: 1, col: 1, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 2, length: 3, orientation: 'h' },
    { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
    { id: 'h3', row: 4, col: 2, length: 2, orientation: 'h' },
  ],
  // I4: 8 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 3, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 3, orientation: 'v' },
    { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'v3', row: 2, col: 1, length: 2, orientation: 'v' },
    { id: 'h3', row: 4, col: 2, length: 2, orientation: 'h' },
    { id: 'v4', row: 0, col: 5, length: 2, orientation: 'v' },
  ],
  // I5: 8 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 0, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'v5', row: 1, col: 2, length: 3, orientation: 'v' },
  ],
  // I6: 8 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v2', row: 3, col: 2, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 3, orientation: 'h' },
    { id: 'v3', row: 1, col: 1, length: 2, orientation: 'v' },
    { id: 'h2', row: 3, col: 3, length: 2, orientation: 'h' },
    { id: 'h3', row: 5, col: 0, length: 3, orientation: 'h' },
    { id: 'v4', row: 2, col: 5, length: 3, orientation: 'v' },
  ]
];

// 3. Advanced & Expert Seeds (9 to 10 blocks)
const advancedSeeds = [
  // A1: 9 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 3, orientation: 'v' },
    { id: 'v2', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v3', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'v4', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v5', row: 3, col: 2, length: 2, orientation: 'v' },
    { id: 'h3', row: 5, col: 3, length: 2, orientation: 'h' },
  ],
  // A2: 9 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 2, length: 3, orientation: 'v' },
    { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'v3', row: 3, col: 3, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
    { id: 'h3', row: 0, col: 4, length: 2, orientation: 'h' },
    { id: 'v4', row: 2, col: 1, length: 2, orientation: 'v' },
    { id: 'h4', row: 5, col: 2, length: 3, orientation: 'h' },
  ],
  // A3: 10 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'v1', row: 0, col: 0, length: 2, orientation: 'v' },
    { id: 'v2', row: 2, col: 0, length: 2, orientation: 'v' },
    { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
    { id: 'v4', row: 2, col: 3, length: 2, orientation: 'v' },
    { id: 'v5', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'v6', row: 3, col: 2, length: 2, orientation: 'v' },
    { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
    { id: 'h3', row: 5, col: 3, length: 2, orientation: 'h' },
  ],
  // A4: 10 blocks (Famous Rush Hour Master Seed)
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'b1', row: 0, col: 0, length: 3, orientation: 'h' },
    { id: 'b2', row: 0, col: 3, length: 3, orientation: 'v' },
    { id: 'b3', row: 1, col: 0, length: 3, orientation: 'v' },
    { id: 'b4', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'b5', row: 3, col: 1, length: 2, orientation: 'h' },
    { id: 'b6', row: 3, col: 4, length: 3, orientation: 'v' },
    { id: 'b7', row: 4, col: 0, length: 2, orientation: 'h' },
    { id: 'b8', row: 4, col: 2, length: 2, orientation: 'v' },
    { id: 'b9', row: 5, col: 0, length: 3, orientation: 'h' },
  ]
];

// 4. Master Seeds (11 blocks, very deep)
const masterSeeds = [
  // M1: 11 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'b1', row: 0, col: 0, length: 2, orientation: 'h' },
    { id: 'b2', row: 0, col: 2, length: 2, orientation: 'v' },
    { id: 'b3', row: 0, col: 3, length: 2, orientation: 'h' },
    { id: 'b4', row: 0, col: 5, length: 2, orientation: 'v' },
    { id: 'b5', row: 1, col: 0, length: 2, orientation: 'v' },
    { id: 'b6', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'b7', row: 3, col: 0, length: 3, orientation: 'v' },
    { id: 'b8', row: 3, col: 1, length: 2, orientation: 'h' },
    { id: 'b9', row: 3, col: 3, length: 2, orientation: 'h' },
    { id: 'b10', row: 4, col: 2, length: 2, orientation: 'v' },
    { id: 'b11', row: 5, col: 0, length: 3, orientation: 'h' },
  ],
  // M2: 11 blocks
  [
    { id: 'target', row: 2, col: 4, length: 2, orientation: 'h', isTarget: true },
    { id: 'b1', row: 0, col: 1, length: 2, orientation: 'h' },
    { id: 'b2', row: 0, col: 3, length: 3, orientation: 'h' },
    { id: 'b3', row: 1, col: 0, length: 3, orientation: 'v' },
    { id: 'b4', row: 1, col: 1, length: 2, orientation: 'v' },
    { id: 'b5', row: 1, col: 2, length: 2, orientation: 'v' },
    { id: 'b6', row: 1, col: 3, length: 2, orientation: 'v' },
    { id: 'b7', row: 3, col: 1, length: 2, orientation: 'h' },
    { id: 'b8', row: 3, col: 4, length: 2, orientation: 'v' },
    { id: 'b9', row: 4, col: 2, length: 2, orientation: 'h' },
    { id: 'b10', row: 5, col: 0, length: 2, orientation: 'h' },
    { id: 'b11', row: 5, col: 3, length: 3, orientation: 'h' },
  ]
];

// Harvest states by category
function harvest(seedsList, maxStatesPerSeed = 10000) {
  const map = new Map(); // dist -> array of { blocks, par }
  for (const seed of seedsList) {
    if (!isValidGeometry(seed)) continue;
    const states = backwardExplore(seed, maxStatesPerSeed);
    for (const [dist, list] of states.entries()) {
      for (const pos of list) {
        if (pos[0].c >= 4) continue; // target not solved yet
        const blocks = seed.map((b, idx) => ({ ...b, row: pos[idx].r, col: pos[idx].c }));
        if (isValidGeometry(blocks)) {
          const sol = solve(blocks, 15000);
          if (sol && sol.minMoves >= 2) {
            const p = sol.minMoves;
            if (!map.has(p)) map.set(p, []);
            map.get(p).push({ blocks, par: p, blockCount: seed.length });
          }
        }
      }
    }
  }
  return map;
}

console.log('Harvesting Beginner candidates...');
const begMap = harvest(beginnerSeeds, 3000);
console.log('Harvesting Intermediate candidates...');
const intMap = harvest(intermediateSeeds, 5000);
console.log('Harvesting Advanced/Expert candidates...');
const advMap = harvest(advancedSeeds, 8000);
console.log('Harvesting Master candidates...');
const mstMap = harvest(masterSeeds, 15000);

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

console.log('Beginner map pars:', [...begMap.keys()].sort((a,b)=>a-b));
console.log('Intermediate map pars:', [...intMap.keys()].sort((a,b)=>a-b));
console.log('Advanced map pars:', [...advMap.keys()].sort((a,b)=>a-b));
console.log('Master map pars:', [...mstMap.keys()].sort((a,b)=>a-b));

// Flatten into sorted candidate lists
function flatten(map) {
  const arr = [];
  for (const list of map.values()) {
    arr.push(...list);
  }
  return arr.sort((a, b) => a.par - b.par);
}

const begList = flatten(begMap);
const intList = flatten(intMap);
const advList = flatten(advMap);
const mstList = flatten(mstMap);

const all60 = [];
const usedSigs = new Set();

function sig(b) {
  return b.map(x => `${x.id}:${x.row},${x.col}`).sort().join('|');
}

function pickBest(list, targetPar, fallbackLists = []) {
  // 1. Try to find candidate matching targetPar or within ±2
  for (let delta = 0; delta <= 15; delta++) {
    for (const sign of [0, 1, -1]) {
      const p = targetPar + delta * sign;
      const found = list.find(item => item.par === p && !usedSigs.has(sig(item.blocks)));
      if (found) {
        usedSigs.add(sig(found.blocks));
        return found;
      }
    }
  }

  // 2. Try fallbacks
  for (const fList of fallbackLists) {
    const found = fList.find(item => !usedSigs.has(sig(item.blocks)));
    if (found) {
      usedSigs.add(sig(found.blocks));
      return found;
    }
  }

  // 3. Fallback to any unused
  const any = list.find(item => !usedSigs.has(sig(item.blocks))) || list[0];
  usedSigs.add(sig(any.blocks));
  return any;
}

// 1. Beginner: Levels 1-12 (par 3 to 9)
const begPars = [3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9];
for (let i = 1; i <= 12; i++) {
  const item = pickBest(begList, begPars[i - 1], [intList]);
  all60.push({
    id: i,
    tier: 'Beginner',
    name: levelNames[i - 1],
    par: item.par,
    exitRow: 2,
    blocks: item.blocks
  });
}

// 2. Intermediate: Levels 13-24 (par 8 to 15)
const intPars = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 14];
for (let i = 13; i <= 24; i++) {
  const item = pickBest(intList, intPars[i - 13], [advList, begList]);
  all60.push({
    id: i,
    tier: 'Intermediate',
    name: levelNames[i - 1],
    par: item.par,
    exitRow: 2,
    blocks: item.blocks
  });
}

// 3. Advanced: Levels 25-36 (par 14 to 22)
const advPars = [14, 14, 15, 15, 16, 16, 17, 18, 19, 20, 21, 22];
for (let i = 25; i <= 36; i++) {
  const item = pickBest(advList, advPars[i - 25], [mstList, intList]);
  all60.push({
    id: i,
    tier: 'Advanced',
    name: levelNames[i - 1],
    par: item.par,
    exitRow: 2,
    blocks: item.blocks
  });
}

// 4. Expert: Levels 37-48 (par 22 to 32)
const expPars = [22, 23, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
for (let i = 37; i <= 48; i++) {
  const item = pickBest(advList.concat(mstList), expPars[i - 37], [mstList, advList]);
  all60.push({
    id: i,
    tier: 'Expert',
    name: levelNames[i - 1],
    par: item.par,
    exitRow: 2,
    blocks: item.blocks
  });
}

// 5. Master: Levels 49-60 (par 28 to 45)
const mstPars = [28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 40, 42];
for (let i = 49; i <= 60; i++) {
  const item = pickBest(mstList, mstPars[i - 49], [advList]);
  all60.push({
    id: i,
    tier: 'Master',
    name: levelNames[i - 1],
    par: item.par,
    exitRow: 2,
    blocks: item.blocks
  });
}

console.log('--- ALL 60 VERIFIED LEVELS ---');
for (const l of all60) {
  console.log(`Lvl ${l.id} [${l.tier}]: "${l.name}" | Blocks: ${l.blocks.length} | Par: ${l.par}`);
}

const fileContent = `import { Level } from '../types/game';

export const LEVELS: Level[] = ${JSON.stringify(all60, null, 2)};
`;

fs.writeFileSync('src/data/levels.ts', fileContent, 'utf-8');
console.log('Successfully written authentic 60 levels to src/data/levels.ts!');
