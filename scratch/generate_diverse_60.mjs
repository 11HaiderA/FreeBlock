import fs from 'fs';

// 6x6 Board Geometry & Solver
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

function solve(blocks, maxVisited = 35000) {
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

    // Try multi-cell moves or 1-cell moves
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const p = curr.pos[i];

      if (b.orientation === 'h') {
        // Move Left (1 to multiple cells)
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
        // Move Right (1 to multiple cells)
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
        // Move Up (1 to multiple cells)
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
        // Move Down (1 to multiple cells)
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

// 25+ Truly Distinct Handcrafted Puzzle Templates with Varied Block Counts & Types
// Spanning from 4 blocks (gentle introductory) up to 13 blocks (deep interlocking master)
const TEMPLATES = [
  // 1. Gentle Intro 1 (4 blocks): Target + 1 vertical blocking + 2 horizontal rails
  {
    name: "Clear Way",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
      { id: 'v2', row: 2, col: 4, length: 2, orientation: 'v' },
    ]
  },
  // 2. Gentle Intro 2 (4 blocks): Target + vertical gate + bottom slide
  {
    name: "Sunlit Gate",
    blocks: [
      { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 1, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 3, col: 2, length: 2, orientation: 'h' },
      { id: 'v2', row: 3, col: 4, length: 2, orientation: 'v' },
    ]
  },
  // 3. Two Pillars (5 blocks): Two vertical blockers
  {
    name: "Two Pillars",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
      { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
      { id: 'h2', row: 4, col: 2, length: 2, orientation: 'h' },
    ]
  },
  // 4. The 3-Block Log (5 blocks): 1x3 vertical log
  {
    name: "Timber Log",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 1, col: 2, length: 3, orientation: 'v' },
      { id: 'h1', row: 0, col: 2, length: 3, orientation: 'h' },
      { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
      { id: 'v2', row: 2, col: 4, length: 2, orientation: 'v' },
    ]
  },
  // 5. Crossroad (5 blocks): S-interlock
  {
    name: "Crossroad",
    blocks: [
      { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 3, length: 2, orientation: 'v' },
      { id: 'v2', row: 2, col: 4, length: 3, orientation: 'v' },
      { id: 'h1', row: 1, col: 1, length: 2, orientation: 'h' },
      { id: 'h2', row: 3, col: 1, length: 2, orientation: 'h' },
    ]
  },
  // 6. Sliding Alcove (6 blocks)
  {
    name: "Sliding Alcove",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
      { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
      { id: 'v3', row: 1, col: 5, length: 2, orientation: 'v' },
      { id: 'h2', row: 4, col: 1, length: 3, orientation: 'h' },
    ]
  },
  // 7. Pinwheel Step (6 blocks)
  {
    name: "Pinwheel Step",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
      { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 3, col: 2, length: 2, orientation: 'h' },
      { id: 'v3', row: 2, col: 4, length: 2, orientation: 'v' },
      { id: 'h2', row: 0, col: 4, length: 2, orientation: 'h' },
    ]
  },
  // 8. Forest Gate (6 blocks)
  {
    name: "Forest Gate",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
      { id: 'v2', row: 2, col: 3, length: 3, orientation: 'v' },
      { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
      { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
      { id: 'v3', row: 0, col: 5, length: 3, orientation: 'v' },
    ]
  },
  // 9. Triple Barricade (7 blocks)
  {
    name: "Triple Barricade",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 2, length: 2, orientation: 'v' },
      { id: 'v2', row: 2, col: 2, length: 2, orientation: 'v' },
      { id: 'v3', row: 1, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 3, length: 2, orientation: 'h' },
      { id: 'h2', row: 3, col: 3, length: 2, orientation: 'h' },
      { id: 'v4', row: 2, col: 5, length: 2, orientation: 'v' },
    ]
  },
  // 10. Birch Maze (7 blocks)
  {
    name: "Birch Maze",
    blocks: [
      { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 0, length: 3, orientation: 'v' },
      { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
      { id: 'h2', row: 3, col: 1, length: 2, orientation: 'h' },
      { id: 'v3', row: 2, col: 4, length: 2, orientation: 'v' },
      { id: 'h3', row: 4, col: 3, length: 2, orientation: 'h' },
    ]
  },
  // 11. Cedar Labyrinth (7 blocks)
  {
    name: "Cedar Labyrinth",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
      { id: 'v2', row: 2, col: 3, length: 2, orientation: 'v' },
      { id: 'v3', row: 1, col: 4, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 2, length: 3, orientation: 'h' },
      { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
      { id: 'h3', row: 4, col: 2, length: 2, orientation: 'h' },
    ]
  },
  // 12. Twin Logs (8 blocks)
  {
    name: "Twin Logs",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 2, length: 3, orientation: 'v' },
      { id: 'v2', row: 1, col: 3, length: 3, orientation: 'v' },
      { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
      { id: 'h2', row: 4, col: 0, length: 2, orientation: 'h' },
      { id: 'v3', row: 2, col: 4, length: 2, orientation: 'v' },
      { id: 'h3', row: 4, col: 2, length: 2, orientation: 'h' },
      { id: 'v4', row: 0, col: 5, length: 2, orientation: 'v' },
    ]
  },
  // 13. Oak Shuffle (8 blocks)
  {
    name: "Oak Shuffle",
    blocks: [
      { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 0, length: 2, orientation: 'v' },
      { id: 'v2', row: 2, col: 0, length: 2, orientation: 'v' },
      { id: 'v3', row: 0, col: 3, length: 2, orientation: 'v' },
      { id: 'v4', row: 2, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
      { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
      { id: 'v5', row: 1, col: 4, length: 3, orientation: 'v' },
    ]
  },
  // 14. Amber Corridors (8 blocks)
  {
    name: "Amber Corridors",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 1, col: 2, length: 2, orientation: 'v' },
      { id: 'v2', row: 3, col: 2, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 1, length: 3, orientation: 'h' },
      { id: 'v3', row: 1, col: 4, length: 2, orientation: 'v' },
      { id: 'h2', row: 3, col: 3, length: 2, orientation: 'h' },
      { id: 'h3', row: 5, col: 0, length: 3, orientation: 'h' },
      { id: 'v4', row: 2, col: 5, length: 3, orientation: 'v' },
    ]
  },
  // 15. The Interlock (9 blocks)
  {
    name: "The Interlock",
    blocks: [
      { id: 'target', row: 2, col: 1, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 0, length: 3, orientation: 'v' },
      { id: 'v2', row: 0, col: 3, length: 2, orientation: 'v' },
      { id: 'v3', row: 2, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 1, length: 2, orientation: 'h' },
      { id: 'h2', row: 4, col: 1, length: 2, orientation: 'h' },
      { id: 'v4', row: 1, col: 4, length: 2, orientation: 'v' },
      { id: 'v5', row: 3, col: 4, length: 2, orientation: 'v' },
      { id: 'h3', row: 5, col: 3, length: 2, orientation: 'h' },
    ]
  },
  // 16. Maple Wall (9 blocks)
  {
    name: "Maple Wall",
    blocks: [
      { id: 'target', row: 2, col: 0, length: 2, orientation: 'h', isTarget: true },
      { id: 'v1', row: 0, col: 2, length: 3, orientation: 'v' },
      { id: 'v2', row: 1, col: 3, length: 2, orientation: 'v' },
      { id: 'v3', row: 3, col: 3, length: 2, orientation: 'v' },
      { id: 'h1', row: 0, col: 0, length: 2, orientation: 'h' },
      { id: 'h2', row: 3, col: 0, length: 2, orientation: 'h' },
      { id: 'h3', row: 0, col: 4, length: 2, orientation: 'h' },
      { id: 'v4', row: 2, col: 4, length: 2, orientation: 'v' },
      { id: 'h4', row: 5, col: 2, length: 3, orientation: 'h' },
    ]
  },
  // 17. Pine Fortress (10 blocks)
  {
    name: "Pine Fortress",
    blocks: [
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
    ]
  },
  // 18. Rush Gate (10 blocks)
  {
    name: "Rush Gate",
    blocks: [
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
    ]
  },
  // 19. Redwood Enigma (11 blocks)
  {
    name: "Redwood Enigma",
    blocks: [
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
    ]
  },
  // 20. Master Knot (12 blocks)
  {
    name: "Master Knot",
    blocks: [
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
    ]
  }
];

console.log(`Analyzing ${TEMPLATES.length} handcrafted templates...`);

const results = [];
for (let i = 0; i < TEMPLATES.length; i++) {
  const t = TEMPLATES[i];
  if (!isValid(t.blocks)) {
    console.error(`Template ${i + 1} (${t.name}) has invalid geometry!`);
    continue;
  }
  const sol = solve(t.blocks);
  if (sol) {
    results.push({
      templateIndex: i,
      name: t.name,
      blockCount: t.blocks.length,
      par: sol.minMoves,
      blocks: t.blocks
    });
    console.log(`Template ${i + 1}: "${t.name}" (${t.blocks.length} blocks) -> Par: ${sol.minMoves}`);
  } else {
    console.log(`Template ${i + 1}: "${t.name}" -> Unsolvable or max depth`);
  }
}

console.log(`Found ${results.length} directly solvable unique templates!`);
