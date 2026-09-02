import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const gridSolution = `function shortestGameMap(maps) {
  const rows = maps.length;
  if (!rows || !maps[0].length) return -1;
  const cols = maps[0].length;
  if (maps[0][0] !== 1 || maps[rows - 1][cols - 1] !== 1) return -1;
  const distance = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const queue = [[0, 0]];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  distance[0][0] = 1;
  for (let head = 0; head < queue.length; head++) {
    const [row, col] = queue[head];
    if (row === rows - 1 && col === cols - 1) return distance[row][col];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
      if (maps[nextRow][nextCol] !== 1 || distance[nextRow][nextCol] !== -1) continue;
      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }
  return -1;
}`;

const gridTests = [
  { label: "official reachable", expression: "shortestGameMap([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]])", expected: "11" },
  { label: "official unreachable", expression: "shortestGameMap([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]])", expected: "-1" },
  { label: "rectangular", expression: "shortestGameMap([[1,1,1,1],[1,0,0,1]])", expected: "5" },
  { label: "single cell", expression: "shortestGameMap([[1]])", expected: "1" },
];

const multiSourceGridSolution = `function distanceFromNearestSource(grid, sources) {
  const rows = grid.length;
  if (!rows || !grid[0].length) return [];
  const cols = grid[0].length;
  const distance = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const queue = [];
  for (const [row, col] of sources) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) continue;
    if (grid[row][col] !== 1 || distance[row][col] !== -1) continue;
    distance[row][col] = 0;
    queue.push([row, col]);
  }
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let head = 0; head < queue.length; head++) {
    const [row, col] = queue[head];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
      if (grid[nextRow][nextCol] !== 1 || distance[nextRow][nextCol] !== -1) continue;
      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }
  return distance;
}`;

const diagonalGridSolution = `function shortestGridPath8(grid) {
  const rows = grid.length;
  if (!rows || !grid[0].length || grid[0][0] !== 1) return -1;
  const cols = grid[0].length;
  const distance = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const queue = [[0, 0]];
  distance[0][0] = 1;
  const directions = [];
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    if (dr !== 0 || dc !== 0) directions.push([dr, dc]);
  }
  for (let head = 0; head < queue.length; head++) {
    const [row, col] = queue[head];
    if (row === rows - 1 && col === cols - 1) return distance[row][col];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
      if (grid[nextRow][nextCol] !== 1 || distance[nextRow][nextCol] !== -1) continue;
      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }
  return -1;
}`;

const gridChallenges: TransferChallenge[] = [
  {
    kind: "DEBUG", id: "debug-rectangular-bounds", title: "Debug dùng cols làm giới hạn row",
    change: "Grid có rows và cols độc lập; mọi bounds check phải dùng đúng dimension.", functionSignature: "shortestGameMap(maps)",
    starterCode: gridSolution.replace("nextRow >= rows", "nextRow >= cols"), solution: gridSolution, tests: gridTests,
  },
  {
    kind: "DEBUG", id: "debug-distance-origin", title: "Debug sai đơn vị độ dài",
    change: "Contract OF038 đếm cả ô bắt đầu và ô kết thúc, nên start distance là 1.", functionSignature: "shortestGameMap(maps)",
    starterCode: gridSolution.replace("distance[0][0] = 1;", "distance[0][0] = 0;"), solution: gridSolution, tests: gridTests,
  },
  {
    kind: "VARIANT", id: "variant-grid-multi-source", title: "Một start → nhiều source",
    change: "Seed đồng thời mọi source hợp lệ ở distance 0 và trả distance tới source gần nhất cho mọi ô.", functionSignature: "distanceFromNearestSource(grid, sources)",
    starterCode: "function distanceFromNearestSource(grid, sources) {\n  // seed all sources in one queue\n}", solution: multiSourceGridSolution,
    tests: [
      { label: "two corners", expression: "distanceFromNearestSource([[1,1,1],[1,1,1]],[[0,0],[1,2]])", expected: "[[0,1,1],[1,1,0]]" },
      { label: "wall remains unreachable", expression: "distanceFromNearestSource([[1,0,1],[1,1,1]],[[0,0]])", expected: "[[0,-1,4],[1,2,3]]" },
      { label: "duplicate source", expression: "distanceFromNearestSource([[1,1]],[[0,0],[0,0]])", expected: "[[0,1]]" },
    ],
  },
  {
    kind: "VARIANT", id: "variant-eight-neighbors", title: "4 hướng → 8 hướng",
    change: "Cho phép cả diagonal; vẫn mark trước enqueue và đếm số ô trên đường đi.", functionSignature: "shortestGridPath8(grid)",
    starterCode: "function shortestGridPath8(grid) {\n  // eight-neighbor BFS\n}", solution: diagonalGridSolution,
    tests: [
      { label: "diagonal shortcut", expression: "shortestGridPath8([[1,0],[0,1]])", expected: "2" },
      { label: "open rectangle", expression: "shortestGridPath8([[1,1,1],[1,1,1]])", expected: "3" },
      { label: "blocked target", expression: "shortestGridPath8([[1,1],[1,0]])", expected: "-1" },
    ],
  },
];

const expandedSolution = `function shortestPathWithOneBreak(grid) {
  const rows = grid.length;
  if (!rows || !grid[0].length) return -1;
  const cols = grid[0].length;
  const distance = Array.from({ length: rows }, () => Array.from({ length: cols }, () => [-1, -1]));
  const queue = [[0, 0, 0]];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  distance[0][0][0] = 0;
  for (let head = 0; head < queue.length; head++) {
    const [row, col, usedBreak] = queue[head];
    if (row === rows - 1 && col === cols - 1) return distance[row][col][usedBreak];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
      const nextUsedBreak = usedBreak + (grid[nextRow][nextCol] === 1 ? 1 : 0);
      if (nextUsedBreak > 1 || distance[nextRow][nextCol][nextUsedBreak] !== -1) continue;
      distance[nextRow][nextCol][nextUsedBreak] = distance[row][col][usedBreak] + 1;
      queue.push([nextRow, nextCol, nextUsedBreak]);
    }
  }
  return -1;
}`;

const expandedTests = [
  { label: "must break", expression: "shortestPathWithOneBreak([[0,1,0],[0,1,0],[0,1,0]])", expected: "4" },
  { label: "save break for later", expression: "shortestPathWithOneBreak([[0,0,1,0],[0,1,1,0],[0,0,0,0]])", expected: "5" },
  { label: "same cell different resource", expression: "shortestPathWithOneBreak([[0,0,1],[1,0,1],[0,1,0]])", expected: "4" },
  { label: "unreachable after one break", expression: "shortestPathWithOneBreak([[0,1,1,0],[0,1,1,0]])", expected: "-1" },
  { label: "single cell", expression: "shortestPathWithOneBreak([[0]])", expected: "0" },
];

const budgetSolution = `function shortestPathWithBreakBudget(grid, budget) {
  const rows = grid.length;
  if (!rows || !grid[0].length || budget < 0) return -1;
  const cols = grid[0].length;
  const distance = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Array(budget + 1).fill(-1)));
  const queue = [[0, 0, 0]];
  distance[0][0][0] = 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let head = 0; head < queue.length; head++) {
    const [row, col, used] = queue[head];
    if (row === rows - 1 && col === cols - 1) return distance[row][col][used];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
      const nextUsed = used + (grid[nextRow][nextCol] === 1 ? 1 : 0);
      if (nextUsed > budget || distance[nextRow][nextCol][nextUsed] !== -1) continue;
      distance[nextRow][nextCol][nextUsed] = distance[row][col][used] + 1;
      queue.push([nextRow, nextCol, nextUsed]);
    }
  }
  return -1;
}`;

const keyDoorSolution = `function shortestPathWithKey(board) {
  const rows = board.length;
  if (!rows || !board[0].length) return -1;
  const cols = board[0].length;
  let start = null;
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) if (board[row][col] === "S") start = [row, col];
  if (!start) return -1;
  const distance = Array.from({ length: rows }, () => Array.from({ length: cols }, () => [-1, -1]));
  const queue = [[start[0], start[1], 0]];
  distance[start[0]][start[1]][0] = 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let head = 0; head < queue.length; head++) {
    const [row, col, hasKey] = queue[head];
    if (board[row][col] === "E") return distance[row][col][hasKey];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
      const cell = board[nextRow][nextCol];
      if (cell === "#" || (cell === "D" && !hasKey)) continue;
      const nextHasKey = hasKey || cell === "K" ? 1 : 0;
      if (distance[nextRow][nextCol][nextHasKey] !== -1) continue;
      distance[nextRow][nextCol][nextHasKey] = distance[row][col][hasKey] + 1;
      queue.push([nextRow, nextCol, nextHasKey]);
    }
  }
  return -1;
}`;

const mergedVisitedBug = `function shortestPathWithOneBreak(grid) {
  const rows = grid.length, cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [[0, 0, 0, 0]];
  visited[0][0] = true;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let head = 0; head < queue.length; head++) {
    const [row, col, usedBreak, distance] = queue[head];
    if (row === rows - 1 && col === cols - 1) return distance;
    for (const [dr, dc] of directions) {
      const nextRow = row + dr, nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols || visited[nextRow][nextCol]) continue;
      const nextUsedBreak = usedBreak + (grid[nextRow][nextCol] === 1 ? 1 : 0);
      if (nextUsedBreak > 1) continue;
      visited[nextRow][nextCol] = true;
      queue.push([nextRow, nextCol, nextUsedBreak, distance + 1]);
    }
  }
  return -1;
}`;

const expandedChallenges: TransferChallenge[] = [
  {
    kind: "DEBUG", id: "debug-merge-expanded-state", title: "Debug visited chỉ có row/col",
    change: "Cùng một ô khi chưa dùng và đã dùng quyền phá tường là hai state khác nhau.", functionSignature: "shortestPathWithOneBreak(grid)",
    starterCode: mergedVisitedBug, solution: expandedSolution, tests: expandedTests,
  },
  {
    kind: "DEBUG", id: "debug-consume-on-open", title: "Debug tiêu quyền trên ô trống",
    change: "usedBreak chỉ tăng khi bước vào wall=1, không tăng trên open=0.", functionSignature: "shortestPathWithOneBreak(grid)",
    starterCode: expandedSolution.replace("grid[nextRow][nextCol] === 1 ? 1 : 0", "grid[nextRow][nextCol] === 0 ? 1 : 0"), solution: expandedSolution, tests: expandedTests,
  },
  {
    kind: "VARIANT", id: "variant-break-budget", title: "Một quyền → budget K",
    change: "Chiều state mở rộng thành used=0..budget; không được collapse các mức used.", functionSignature: "shortestPathWithBreakBudget(grid, budget)",
    starterCode: "function shortestPathWithBreakBudget(grid, budget) {\n  // visited[row][col][used]\n}", solution: budgetSolution,
    tests: [
      { label: "needs two breaks", expression: "shortestPathWithBreakBudget([[0,1,1,0]],2)", expected: "3" },
      { label: "budget too small", expression: "shortestPathWithBreakBudget([[0,1,1,0]],1)", expected: "-1" },
      { label: "zero budget open path", expression: "shortestPathWithBreakBudget([[0,0],[1,0]],0)", expected: "2" },
    ],
  },
  {
    kind: "VARIANT", id: "variant-key-door", title: "Resource count → key boolean",
    change: "State hasKey thay đổi khi nhặt K; D chỉ đi qua khi hasKey=1, nhưng quay lại cùng ô sau khi có key vẫn hợp lệ.", functionSignature: "shortestPathWithKey(board)",
    starterCode: "function shortestPathWithKey(board) {\n  // visited[row][col][hasKey]\n}", solution: keyDoorSolution,
    tests: [
      { label: "collect then return", expression: "shortestPathWithKey([['S','D','E'],['.','K','#']])", expected: "4" },
      { label: "no key", expression: "shortestPathWithKey([['S','D','E']])", expected: "-1" },
      { label: "door not required", expression: "shortestPathWithKey([['S','.','E'],['K','#','#']])", expected: "2" },
    ],
  },
];

export const p0a4bLessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-F12-GRID-BFS", familyId: "F12", slug: "grid-bfs-shortest-game-map", title: "BFS grid — đường ngắn nhất", priority: "P0",
    basePattern: "Grid neighbors + queue head + distance on enqueue", description: "Tìm đường ngắn nhất bốn hướng từ góc trên trái tới góc dưới phải qua các ô 1.",
    constraints: ["maps là grid chữ nhật gồm 0/1", "chỉ đi bốn hướng qua ô 1", "độ dài OF038 tính cả start và target", "không mutate input hoặc dùng Array.shift lặp"],
    functionSignature: "shortestGameMap(maps)", officialSources: ["OF038 — Đường ngắn nhất bản đồ game", "PCCP Thinking Curriculum Ch.10"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Grid không trọng số hỏi số bước ngắn nhất. Chọn engine.", options: [
      { id: "bfs", label: "BFS theo layer", explanation: "Lần discover đầu là shortest path." },
      { id: "dfs", label: "DFS", explanation: "Đường gặp đầu tiên chưa chắc ngắn nhất." },
      { id: "greedy", label: "Đi gần target", explanation: "Obstacle phá heuristic cục bộ." },
      { id: "dijkstra", label: "Dijkstra", explanation: "Đúng nhưng heap là thừa khi cost mọi bước bằng 1." },
    ], correctOptionId: "bfs" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State tối thiểu?", canonical: "row, col và distance[row][col]", acceptedKeywords: [["row", "col", "distance"], ["tọa độ", "khoảng cách"]] },
      { id: "SEED", label: "SEED", prompt: "Start?", canonical: "distance[0][0]=1 rồi enqueue [0,0]", acceptedKeywords: [["0,0", "1"], ["enqueue", "start"]] },
      { id: "NEIGHBORS", label: "NEIGHBORS", prompt: "Transition hợp lệ?", canonical: "bốn hướng, trong bounds, ô 1 và chưa visited", acceptedKeywords: [["4", "bounds", "1"], ["bốn", "chưa"]] },
      { id: "VISITED", label: "VISITED", prompt: "Mark lúc nào?", canonical: "gán distance trước khi enqueue", acceptedKeywords: [["trước", "enqueue"], ["mark", "enqueue"]] },
      { id: "OUTPUT", label: "OUTPUT", prompt: "Đơn vị và unreachable?", canonical: "distance target tính cả hai endpoint; unreachable -1", acceptedKeywords: [["-1", "target"], ["không", "tới", "-1"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(rows*cols) time và space", acceptedKeywords: [["rows*cols"], ["r*c"]] },
    ],
    logic: [
      { id: "shape", text: "Đọc rows/cols riêng và guard endpoint" },
      { id: "seed", text: "Tạo distance -1, seed start bằng 1" },
      { id: "dequeue", text: "Dequeue bằng head và kiểm target" },
      { id: "neighbors", text: "Sinh bốn neighbor rồi lọc bounds/wall/visited" },
      { id: "discover", text: "Gán distance trước enqueue" },
      { id: "unreachable", text: "Hết queue thì trả -1" },
    ],
    blocks: [
      { id: "shape", subgoal: "Khởi tạo shape và guard contract", code: `function shortestGameMap(maps) {\n const rows=maps.length; if (!rows || !maps[0].length) return -1;\n const cols=maps[0].length;\n if (maps[0][0]!==1 || maps[rows-1][cols-1]!==1) return -1;` },
      { id: "seed", subgoal: "Seed distance và queue", code: `const distance=Array.from({length:rows},()=>Array(cols).fill(-1));\nconst queue=[[0,0]], directions=[[-1,0],[1,0],[0,-1],[0,1]];\ndistance[0][0]=1;` },
      { id: "bfs", subgoal: "Expand neighbor hợp lệ và mark trước enqueue", code: `for (let head=0;head<queue.length;head++) {\n const [row,col]=queue[head];\n if (row===rows-1 && col===cols-1) return distance[row][col];\n for (const [dr,dc] of directions) {\n  const nr=row+dr,nc=col+dc;\n  if (nr<0||nr>=rows||nc<0||nc>=cols) continue;\n  if (maps[nr][nc]!==1||distance[nr][nc]!==-1) continue;\n  distance[nr][nc]=distance[row][col]+1; queue.push([nr,nc]);\n }\n}` },
      { id: "return", subgoal: "Trả sentinel khi unreachable", code: `return -1;\n}` },
    ],
    solution: gridSolution, tests: gridTests, challenges: gridChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F12-EXPANDED-STATE-BFS", familyId: "F12", slug: "expanded-state-bfs-one-break", title: "BFS expanded state — một quyền phá tường", priority: "P0",
    basePattern: "Visited by position × resource state", description: "Tìm số bước ngắn nhất trên grid khi được đi xuyên qua tối đa một wall.",
    constraints: ["grid chữ nhật gồm 0=open và 1=wall", "start/end là ô open", "đi bốn hướng", "mỗi wall đi vào tiêu một quyền; được dùng tối đa một lần"],
    functionSignature: "shortestPathWithOneBreak(grid)", officialSources: ["PCCP 모의고사 #2 — Bản đồ kho báu", "PCCP corpus F12"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Cùng tọa độ nhưng tương lai khác nhau tùy quyền đã dùng. Visited phải là gì?", options: [
      { id: "expanded", label: "visited[row][col][used]", explanation: "Position và resource cùng quyết định transitions tương lai." },
      { id: "position", label: "visited[row][col]", explanation: "Collapse hai state có khả năng đi tiếp khác nhau." },
      { id: "dfs", label: "DFS + backtrack", explanation: "Không đảm bảo shortest và search space lặp lớn." },
      { id: "greedy", label: "Phá wall đầu tiên", explanation: "Dùng quyền sớm có thể làm mất đường duy nhất về sau." },
    ], correctOptionId: "expanded" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State đầy đủ?", canonical: "row, col, usedBreak ∈ {0,1}", acceptedKeywords: [["row", "col", "used"], ["tọa độ", "phá"]] },
      { id: "VISITED", label: "VISITED", prompt: "Visited dimension?", canonical: "distance[row][col][usedBreak]", acceptedKeywords: [["row", "col", "used"], ["3", "chiều"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "State mới?", canonical: "nextUsed=used+(next cell là wall)", acceptedKeywords: [["used", "wall"], ["phá", "tường"]] },
      { id: "GUARD", label: "GUARD", prompt: "Khi nào bỏ neighbor?", canonical: "out of bounds, nextUsed>1 hoặc đúng expanded state đã visited", acceptedKeywords: [["nextused", "1", "visited"], ["quyền", "đã", "thăm"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "BFS invariant?", canonical: "mỗi expanded state enqueue một lần với shortest distance", acceptedKeywords: [["state", "enqueue", "shortest"], ["trạng thái", "ngắn nhất"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(rows*cols*2) time và space", acceptedKeywords: [["rows*cols*2"], ["r*c*2"]] },
    ],
    logic: [
      { id: "shape", text: "Tạo distance ba chiều cho usedBreak=0/1" },
      { id: "seed", text: "Seed [0,0,0] ở distance 0" },
      { id: "dequeue", text: "Dequeue state và trả khi chạm target" },
      { id: "derive", text: "Tính nextUsed từ loại ô kế tiếp" },
      { id: "guard", text: "Loại state vượt budget hoặc đã visited" },
      { id: "enqueue", text: "Mark đúng expanded state trước enqueue" },
      { id: "unreachable", text: "Hết queue thì trả -1" },
    ],
    blocks: [
      { id: "shape", subgoal: "Tạo distance theo position × usedBreak", code: `function shortestPathWithOneBreak(grid) {\n const rows=grid.length; if (!rows||!grid[0].length) return -1;\n const cols=grid[0].length;\n const distance=Array.from({length:rows},()=>Array.from({length:cols},()=>[-1,-1]));` },
      { id: "seed", subgoal: "Seed expanded state chưa dùng quyền", code: `const queue=[[0,0,0]], directions=[[-1,0],[1,0],[0,-1],[0,1]];\ndistance[0][0][0]=0;` },
      { id: "bfs", subgoal: "Chuyển state và không collapse resource", code: `for (let head=0;head<queue.length;head++) {\n const [row,col,used]=queue[head];\n if (row===rows-1&&col===cols-1) return distance[row][col][used];\n for (const [dr,dc] of directions) {\n  const nr=row+dr,nc=col+dc;\n  if (nr<0||nr>=rows||nc<0||nc>=cols) continue;\n  const nextUsed=used+(grid[nr][nc]===1?1:0);\n  if (nextUsed>1||distance[nr][nc][nextUsed]!==-1) continue;\n  distance[nr][nc][nextUsed]=distance[row][col][used]+1;\n  queue.push([nr,nc,nextUsed]);\n }\n}` },
      { id: "return", subgoal: "Trả sentinel khi không có expanded state tới đích", code: `return -1;\n}` },
    ],
    solution: expandedSolution, tests: expandedTests, challenges: expandedChallenges,
  }),
];
