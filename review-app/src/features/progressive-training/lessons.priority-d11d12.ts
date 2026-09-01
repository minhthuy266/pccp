import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const powerGridSolution = `function minimumPowerGridDifference(n, wires) {
  const adjacency = Array.from({ length: n + 1 }, () => []);
  for (const [from, to] of wires) {
    adjacency[from].push(to);
    adjacency[to].push(from);
  }
  let best = Infinity;
  for (const [cutFrom, cutTo] of wires) {
    const visited = Array(n + 1).fill(false);
    const stack = [1];
    visited[1] = true;
    let componentSize = 0;
    while (stack.length > 0) {
      const node = stack.pop();
      componentSize++;
      for (const neighbor of adjacency[node]) {
        const isCutEdge = (node === cutFrom && neighbor === cutTo) ||
          (node === cutTo && neighbor === cutFrom);
        if (isCutEdge || visited[neighbor]) continue;
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }
    best = Math.min(best, Math.abs(n - 2 * componentSize));
  }
  return best;
}`;

const powerGridTests = [
  { label: "official sample", expression: "minimumPowerGridDifference(9,[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]])", expected: "3" },
  { label: "balanced chain", expression: "minimumPowerGridDifference(4,[[1,2],[2,3],[3,4]])", expected: "0" },
  { label: "reverse optimal cut orientation", expression: "minimumPowerGridDifference(4,[[1,2],[3,2],[3,4]])", expected: "0" },
  { label: "single wire", expression: "minimumPowerGridDifference(2,[[1,2]])", expected: "0" },
];

const componentAfterCutSolution = `function componentSizeAfterCut(n, wires, cutFrom, cutTo) {
  const adjacency = Array.from({ length: n + 1 }, () => []);
  for (const [from, to] of wires) { adjacency[from].push(to); adjacency[to].push(from); }
  const visited = Array(n + 1).fill(false), stack = [1];
  visited[1] = true;
  let size = 0;
  while (stack.length) {
    const node = stack.pop(); size++;
    for (const neighbor of adjacency[node]) {
      if (((node === cutFrom && neighbor === cutTo) || (node === cutTo && neighbor === cutFrom)) || visited[neighbor]) continue;
      visited[neighbor] = true; stack.push(neighbor);
    }
  }
  return size;
}`;

const treeDepthSolution = `function treeDepths(n, edges, root) {
  const adjacency = Array.from({ length: n + 1 }, () => []);
  for (const [from, to] of edges) { adjacency[from].push(to); adjacency[to].push(from); }
  const depth = Array(n + 1).fill(-1), queue = [root];
  depth[root] = 0;
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    for (const next of adjacency[node]) {
      if (depth[next] !== -1) continue;
      depth[next] = depth[node] + 1;
      queue.push(next);
    }
  }
  return depth.slice(1);
}`;

const powerChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-one-way-cut", title: "Debug chỉ bỏ một hướng của cạnh", change: "Adjacency vô hướng; cut phải bị chặn ở cả a→b và b→a.", functionSignature: "minimumPowerGridDifference(n, wires)", starterCode: powerGridSolution.replace("(node === cutTo && neighbor === cutFrom)", "false"), solution: powerGridSolution, tests: powerGridTests },
  { kind: "DEBUG", id: "debug-reused-visited", title: "Debug visited không reset", change: "Mỗi candidate cut là một traversal độc lập và cần visited mới.", functionSignature: "minimumPowerGridDifference(n, wires)", starterCode: powerGridSolution.replace("  for (const [cutFrom, cutTo] of wires) {\n    const visited = Array(n + 1).fill(false);", "  const visited = Array(n + 1).fill(false);\n  for (const [cutFrom, cutTo] of wires) {"), solution: powerGridSolution, tests: powerGridTests },
  { kind: "VARIANT", id: "variant-one-component", title: "Minimize mọi cut → đếm một cut chỉ định", change: "Bỏ outer optimization; contract trả size phía chứa node 1.", functionSignature: "componentSizeAfterCut(n, wires, cutFrom, cutTo)", starterCode: "function componentSizeAfterCut(n, wires, cutFrom, cutTo) {\n  // traverse once, skip both cut directions\n}", solution: componentAfterCutSolution, tests: [
    { label: "middle chain", expression: "componentSizeAfterCut(4,[[1,2],[2,3],[3,4]],2,3)", expected: "2" },
    { label: "cut at root", expression: "componentSizeAfterCut(4,[[1,2],[2,3],[2,4]],1,2)", expected: "1" },
    { label: "reverse args", expression: "componentSizeAfterCut(3,[[1,2],[2,3]],3,2)", expected: "2" },
  ] },
  { kind: "VARIANT", id: "variant-tree-depth", title: "Cut traversal → depth từ root", change: "Không cắt edge; visited/depth ngăn quay lại parent trong tree hai chiều.", functionSignature: "treeDepths(n, edges, root)", starterCode: "function treeDepths(n, edges, root) {\n  // BFS, never revisit parent\n}", solution: treeDepthSolution, tests: [
    { label: "branched", expression: "treeDepths(5,[[1,2],[1,3],[3,4],[3,5]],1)", expected: "[0,1,1,2,2]" },
    { label: "different root", expression: "treeDepths(3,[[1,2],[2,3]],2)", expected: "[1,0,1]" },
    { label: "single", expression: "treeDepths(1,[],1)", expected: "[0]" },
  ] },
];

const interceptionSolution = `function minimumInterceptors(targets) {
  const sortedTargets = [...targets].sort((first, second) => first[1] - second[1]);
  let interceptorCount = 0;
  let lastShotEnd = -Infinity;
  for (const [start, end] of sortedTargets) {
    if (start < lastShotEnd) continue;
    interceptorCount++;
    lastShotEnd = end;
  }
  return interceptorCount;
}`;

const interceptionTests = [
  { label: "official sample", expression: "minimumInterceptors([[4,5],[4,8],[10,14],[11,13],[5,12],[3,7],[1,4]])", expected: "3" },
  { label: "touching open endpoints", expression: "minimumInterceptors([[1,3],[3,5]])", expected: "2" },
  { label: "start-sort trap", expression: "minimumInterceptors([[1,10],[2,3],[4,5]])", expected: "2" },
  { label: "all overlap", expression: "minimumInterceptors([[1,8],[2,7],[3,6]])", expected: "1" },
];

const closedShotsSolution = `function minimumClosedIntervalShots(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let shots = 0, lastShot = -Infinity;
  for (const [start, end] of sorted) {
    if (start <= lastShot) continue;
    shots++; lastShot = end;
  }
  return shots;
}`;

const nonOverlapSolution = `function maximumNonOverlappingIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  let selected = 0, lastEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start < lastEnd) continue;
    selected++; lastEnd = end;
  }
  return selected;
}`;

const interceptionChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-open-boundary", title: "Debug boundary interval mở", change: "Hai interval chỉ chạm endpoint không được xem là cùng một shot.", functionSignature: "minimumInterceptors(targets)", starterCode: interceptionSolution.replace("start < lastShotEnd", "start <= lastShotEnd"), solution: interceptionSolution, tests: interceptionTests },
  { kind: "DEBUG", id: "debug-sort-start", title: "Debug sort theo start", change: "Exchange argument cần earliest end, không phải earliest start.", functionSignature: "minimumInterceptors(targets)", starterCode: interceptionSolution.replace("first[1] - second[1]", "first[0] - second[0]"), solution: interceptionSolution, tests: interceptionTests },
  { kind: "VARIANT", id: "variant-closed-boundary", title: "Interval mở → interval đóng", change: "Shot được đặt tại endpoint; equality giờ đã cover nên dấu boundary đổi.", functionSignature: "minimumClosedIntervalShots(intervals)", starterCode: "function minimumClosedIntervalShots(intervals) {\n  // closed intervals: equality is covered\n}", solution: closedShotsSolution, tests: [
    { label: "touching closed", expression: "minimumClosedIntervalShots([[1,3],[3,5]])", expected: "1" },
    { label: "disjoint", expression: "minimumClosedIntervalShots([[1,2],[3,4]])", expected: "2" },
    { label: "nested", expression: "minimumClosedIntervalShots([[1,10],[2,3],[3,4]])", expected: "1" },
  ] },
  { kind: "VARIANT", id: "variant-lab-e", title: "Lab E — chọn nhiều interval half-open nhất", change: "Objective đổi từ minimum stabbing points sang maximum compatible selections; earliest-finish proof giữ nguyên.", functionSignature: "maximumNonOverlappingIntervals(intervals)", starterCode: "function maximumNonOverlappingIntervals(intervals) {\n  // earliest finish; [a,b) and [b,c) are compatible\n}", solution: nonOverlapSolution, tests: [
    { label: "touching compatible", expression: "maximumNonOverlappingIntervals([[1,3],[3,5],[2,4]])", expected: "2" },
    { label: "classic", expression: "maximumNonOverlappingIntervals([[1,2],[2,3],[1,3],[3,4]])", expected: "3" },
    { label: "empty", expression: "maximumNonOverlappingIntervals([])", expected: "0" },
  ] },
];

const immigrationSolution = `function minimumImmigrationTimeBigInt(people, times) {
  const target = BigInt(people);
  const durations = times.map((time) => BigInt(time));
  let fastest = durations[0];
  for (const duration of durations) if (duration < fastest) fastest = duration;
  let low = 0n;
  let high = fastest * target;
  while (low < high) {
    const middle = (low + high) / 2n;
    let processed = 0n;
    for (const duration of durations) {
      processed += middle / duration;
      if (processed >= target) break;
    }
    if (processed >= target) high = middle;
    else low = middle + 1n;
  }
  return low;
}`;

const immigrationTests = [
  { label: "official sample", expression: "minimumImmigrationTimeBigInt(6,[7,10]).toString()", expected: "\"28\"" },
  { label: "one officer", expression: "minimumImmigrationTimeBigInt(10,[3]).toString()", expected: "\"30\"" },
  { label: "first feasible boundary", expression: "minimumImmigrationTimeBigInt(1,[7,10]).toString()", expected: "\"7\"" },
  { label: "beyond safe integer", expression: "minimumImmigrationTimeBigInt(1000000000,[1000000000]).toString()", expected: "\"1000000000000000000\"" },
];

const drillSolutions = {
  ship: `function minimumShipCapacity(weights, days) {
  let low = Math.max(...weights), high = weights.reduce((sum, value) => sum + value, 0);
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    let usedDays = 1, load = 0;
    for (const weight of weights) { if (load + weight > mid) { usedDays++; load = 0; } load += weight; }
    if (usedDays <= days) high = mid; else low = mid + 1;
  }
  return low;
}`,
  piles: `function minimumPileSpeed(piles, hours) {
  let low = 1, high = Math.max(...piles);
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    let needed = 0;
    for (const pile of piles) { needed += Math.ceil(pile / mid); if (needed > hours) break; }
    if (needed <= hours) high = mid; else low = mid + 1;
  }
  return low;
}`,
  groups: `function minimumLargestGroupSum(values, groups) {
  let low = Math.max(...values), high = values.reduce((sum, value) => sum + value, 0);
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    let count = 1, sum = 0;
    for (const value of values) { if (sum + value > mid) { count++; sum = 0; } sum += value; }
    if (count <= groups) high = mid; else low = mid + 1;
  }
  return low;
}`,
  stations: `function maximumMinimumStationGap(coordinates, stations) {
  const sorted = [...coordinates].sort((a, b) => a - b);
  let low = 0, high = sorted.at(-1) - sorted[0];
  while (low < high) {
    const mid = low + Math.ceil((high - low) / 2);
    let placed = 1, last = sorted[0];
    for (let i = 1; i < sorted.length; i++) if (sorted[i] - last >= mid) { placed++; last = sorted[i]; }
    if (placed >= stations) low = mid; else high = mid - 1;
  }
  return low;
}`,
  pieces: `function maximumUniformPieceLength(lengths, pieces) {
  let low = 1, high = Math.max(...lengths);
  while (low < high) {
    const mid = low + Math.ceil((high - low) / 2);
    let made = 0;
    for (const rod of lengths) { made += Math.floor(rod / mid); if (made >= pieces) break; }
    if (made >= pieces) low = mid; else high = mid - 1;
  }
  return low;
}`,
  budget: `function maximumBudgetCap(requests, budget) {
  let low = 0, high = Math.max(...requests);
  while (low < high) {
    const mid = low + Math.ceil((high - low) / 2);
    let allocated = 0;
    for (const request of requests) { allocated += Math.min(request, mid); if (allocated > budget) break; }
    if (allocated <= budget) low = mid; else high = mid - 1;
  }
  return low;
}`,
};

const binaryChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-infeasible-high", title: "Debug upper bound không feasible", change: "Closed search invariant cần high chứa một đáp án khả thi.", functionSignature: "minimumImmigrationTimeBigInt(people, times)", starterCode: immigrationSolution.replace("fastest * target", "fastest * (target - 1n)"), solution: immigrationSolution, tests: immigrationTests },
  { kind: "DEBUG", id: "debug-skip-candidate", title: "Debug bỏ quá một candidate", change: "Khi mid false chỉ loại tới mid; middle+1 vẫn có thể chính là first feasible.", functionSignature: "minimumImmigrationTimeBigInt(people, times)", starterCode: immigrationSolution.replace("low = middle + 1n;", "low = middle + 2n;"), solution: immigrationSolution, tests: immigrationTests },
  { kind: "VARIANT", id: "drill-1-ship-capacity", title: "Drill 1 — sức chứa nhỏ nhất", change: "First true; bounds max/sum; predicate greedy đếm ngày.", functionSignature: "minimumShipCapacity(weights, days)", starterCode: "function minimumShipCapacity(weights, days) {\n  // first feasible capacity\n}", solution: drillSolutions.ship, tests: [
    { label: "boundary", expression: "minimumShipCapacity([1,2,3,1,1],4)", expected: "3" }, { label: "three days", expression: "minimumShipCapacity([3,2,2,4,1,4],3)", expected: "6" },
  ] },
  { kind: "VARIANT", id: "drill-2-pile-speed", title: "Drill 2 — tốc độ nhỏ nhất", change: "First true; predicate tổng ceil(pile/speed).", functionSignature: "minimumPileSpeed(piles, hours)", starterCode: "function minimumPileSpeed(piles, hours) {\n  // first feasible speed\n}", solution: drillSolutions.piles, tests: [
    { label: "eight hours", expression: "minimumPileSpeed([3,6,7,11],8)", expected: "4" }, { label: "one hour each", expression: "minimumPileSpeed([30,11,23,4,20],5)", expected: "30" },
  ] },
  { kind: "VARIANT", id: "drill-3-split-array", title: "Drill 3 — minimize tổng đoạn lớn nhất", change: "First true; predicate greedy đếm số đoạn liên tiếp.", functionSignature: "minimumLargestGroupSum(values, groups)", starterCode: "function minimumLargestGroupSum(values, groups) {\n  // first feasible segment limit\n}", solution: drillSolutions.groups, tests: [
    { label: "classic", expression: "minimumLargestGroupSum([7,2,5,10,8],2)", expected: "18" }, { label: "two groups", expression: "minimumLargestGroupSum([1,2,3,4,5],2)", expected: "9" },
  ] },
  { kind: "VARIANT", id: "drill-4-station-gap", title: "Drill 4 — maximize khoảng cách nhỏ nhất", change: "Last true; upper midpoint; greedy đặt vị trí sớm nhất hợp lệ.", functionSignature: "maximumMinimumStationGap(coordinates, stations)", starterCode: "function maximumMinimumStationGap(coordinates, stations) {\n  // last feasible gap\n}", solution: drillSolutions.stations, tests: [
    { label: "three stations", expression: "maximumMinimumStationGap([1,2,4,8,9],3)", expected: "3" }, { label: "endpoints", expression: "maximumMinimumStationGap([0,10],2)", expected: "10" },
  ] },
  { kind: "VARIANT", id: "drill-5-uniform-cut", title: "Drill 5 — độ dài cắt lớn nhất", change: "Last true; predicate tổng floor(rod/length).", functionSignature: "maximumUniformPieceLength(lengths, pieces)", starterCode: "function maximumUniformPieceLength(lengths, pieces) {\n  // last feasible piece length\n}", solution: drillSolutions.pieces, tests: [
    { label: "cable sample", expression: "maximumUniformPieceLength([802,743,457,539],11)", expected: "200" }, { label: "boundary", expression: "maximumUniformPieceLength([5,7,9],5)", expected: "3" },
  ] },
  { kind: "VARIANT", id: "drill-6-budget-cap", title: "Drill 6 — trần ngân sách lớn nhất", change: "Last true; predicate sum(min(request,cap)) <= budget.", functionSignature: "maximumBudgetCap(requests, budget)", starterCode: "function maximumBudgetCap(requests, budget) {\n  // last feasible cap\n}", solution: drillSolutions.budget, tests: [
    { label: "classic", expression: "maximumBudgetCap([120,110,140,150],485)", expected: "127" }, { label: "full funding", expression: "maximumBudgetCap([10,20],100)", expected: "20" },
  ] },
];

export const priorityD11D12Lessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-OF023-POWER-GRID", familyId: "F13", slug: "of023-power-grid-tree-cut", title: "OF023 — Chia lưới điện: tree edge cut", priority: "P0", basePattern: "Tree edge cut + component traversal", description: "Thử từng cạnh cắt, traversal một phía và không quay lại parent/cạnh đã cắt.", constraints: ["wires tạo tree n node", "skip cut ở cả hai hướng", "visited mới cho từng cut"], functionSignature: "minimumPowerGridDifference(n, wires)", officialSources: ["OF023 — Programmers 86971", "PCCP Thinking Curriculum Ch.10 §10.5"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Tree, cắt đúng một edge và cần size hai component. Pattern?", options: [
      { id: "cut-traverse", label: "Thử cut + traversal", explanation: "Mỗi cut tạo đúng hai component; đếm một phía." }, { id: "shortest", label: "Dijkstra", explanation: "Không có weighted shortest path." }, { id: "dsu", label: "DSU một lượt", explanation: "Không trực tiếp hỗ trợ xóa từng cạnh." }, { id: "greedy", label: "Greedy degree", explanation: "Degree không quyết định component size." },
    ], correctOptionId: "cut-traverse" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State traversal?", canonical: "adjacency, current cut, visited, stack, componentSize và best", acceptedKeywords: [["adjacency", "visited", "component"], ["kề", "visited", "size"]] },
      { id: "GUARD", label: "GUARD", prompt: "Không đi edge nào?", canonical: "skip visited và cut edge ở cả hai hướng", acceptedKeywords: [["visited", "hai hướng"], ["visited", "both"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Traversal đếm gì?", canonical: "visited đúng các node reachable từ 1 khi bỏ current cut", acceptedKeywords: [["reachable", "cut"], ["đi tới", "cắt"]] },
      { id: "ANSWER", label: "ANSWER", prompt: "Từ size c tính diff?", canonical: "Math.abs(n - 2*c)", acceptedKeywords: [["n", "2", "component"], ["n", "2", "size"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Tổng complexity?", canonical: "O(n^2) time, O(n) space", acceptedKeywords: [["n^2", "o(n)"], ["n²", "space"]] },
    ],
    logic: [{ id: "graph", text: "Build adjacency hai chiều một lần" }, { id: "cuts", text: "Duyệt từng wire làm cut" }, { id: "reset", text: "Reset visited/stack/componentSize" }, { id: "walk", text: "Traversal, skip visited và cả hai hướng cut" }, { id: "update", text: "Update |n-2*size|" }, { id: "return", text: "Trả best sau mọi cut" }],
    blocks: [
      { id: "graph", subgoal: "Build graph", code: `function minimumPowerGridDifference(n, wires) {\n  const adjacency = Array.from({ length: n + 1 }, () => []);\n  for (const [from, to] of wires) { adjacency[from].push(to); adjacency[to].push(from); }\n  let best = Infinity;` },
      { id: "cut", subgoal: "Start each cut", code: `for (const [cutFrom, cutTo] of wires) {\n  const visited = Array(n + 1).fill(false), stack = [1];\n  visited[1] = true;\n  let componentSize = 0;` },
      { id: "walk", subgoal: "Traverse component", code: `while (stack.length > 0) {\n  const node = stack.pop();\n  componentSize++;\n  for (const neighbor of adjacency[node]) {\n    const isCutEdge = (node === cutFrom && neighbor === cutTo) || (node === cutTo && neighbor === cutFrom);\n    if (isCutEdge || visited[neighbor]) continue;\n    visited[neighbor] = true;\n    stack.push(neighbor);\n  }\n}` },
      { id: "update", subgoal: "Update difference", code: `best = Math.min(best, Math.abs(n - 2 * componentSize));\n}` },
      { id: "return", subgoal: "Return", code: `return best;\n}` },
    ], solution: powerGridSolution, tests: powerGridTests, challenges: powerChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-OF057-INTERCEPTION", familyId: "F16", slug: "of057-open-interval-interception", title: "OF057 — Hệ thống đánh chặn: earliest end", priority: "P0", basePattern: "Interval greedy by earliest finish + exchange argument", description: "Sort theo end và biểu diễn shot tại end-ε; boundary interval mở quyết định dấu >=.", constraints: ["interval mở (start,end)", "không bắn tại endpoint", "không mutate input"], functionSignature: "minimumInterceptors(targets)", officialSources: ["OF057 — Programmers 181188", "PCCP Thinking Curriculum Lab E"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Chọn ít điểm nhất để stab mọi interval mở. Greedy choice?", options: [
      { id: "earliest-end", label: "End sớm nhất", explanation: "Đặt tại end-ε giữ nhiều không gian nhất cho phần sau." }, { id: "earliest-start", label: "Start sớm nhất", explanation: "Interval dài sớm có thể che mất conflict bên trong." }, { id: "shortest", label: "Interval ngắn nhất", explanation: "Không có exchange argument phù hợp." }, { id: "midpoint", label: "Midpoint", explanation: "Bắn sớm hơn end có thể mất cover." },
    ], correctOptionId: "earliest-end" },
    blueprint: [
      { id: "ORDER", label: "ORDER", prompt: "Sort key?", canonical: "end tăng dần", acceptedKeywords: [["end", "tăng"], ["kết thúc", "sớm"]] },
      { id: "STATE", label: "STATE", prompt: "State scan?", canonical: "lastShotEnd và interceptorCount", acceptedKeywords: [["last", "count"], ["end", "shots"]] },
      { id: "BOUNDARY", label: "BOUNDARY", prompt: "Khi nào cần shot mới?", canonical: "start >= lastShotEnd vì interval mở", acceptedKeywords: [["start", ">=", "last"], ["mở", ">="]] },
      { id: "PROOF", label: "PROOF", prompt: "Exchange argument?", canonical: "thay shot của earliest-end interval bằng end-epsilon không làm mất interval đang overlap", acceptedKeywords: [["earliest", "end"], ["end", "overlap"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n log n) time", acceptedKeywords: [["n log n"]] },
    ],
    logic: [{ id: "sort", text: "Copy và sort target theo end" }, { id: "state", text: "Khởi tạo count=0, boundary=-Infinity" }, { id: "scan", text: "Scan từng interval" }, { id: "covered", text: "Nếu start < boundary thì đã cover" }, { id: "shoot", text: "Ngược lại tăng count và boundary=end" }, { id: "return", text: "Trả count" }],
    blocks: [
      { id: "sort", subgoal: "Sort by end", code: `function minimumInterceptors(targets) {\n  const sortedTargets = [...targets].sort((a, b) => a[1] - b[1]);` },
      { id: "state", subgoal: "Initialize", code: `let interceptorCount = 0;\nlet lastShotEnd = -Infinity;` },
      { id: "scan", subgoal: "Boundary scan", code: `for (const [start, end] of sortedTargets) {\n  if (start < lastShotEnd) continue;\n  interceptorCount++;\n  lastShotEnd = end;\n}` },
      { id: "return", subgoal: "Return", code: `return interceptorCount;\n}` },
    ], solution: interceptionSolution, tests: interceptionTests, challenges: interceptionChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-OF043-IMMIGRATION-BIGINT", familyId: "F14", slug: "of043-immigration-bigint-first-feasible", title: "OF043 — Kiểm tra nhập cảnh: BigInt first feasible", priority: "P0", basePattern: "Binary search on answer: first/last feasible", description: "Giữ answer trong closed interval, chứng minh predicate đơn điệu và dùng BigInt tới 10^18; transfer đủ sáu drill Lab C.", constraints: ["answer có thể vượt Number.MAX_SAFE_INTEGER", "high ban đầu phải feasible", "không trộn Number và BigInt"], functionSignature: "minimumImmigrationTimeBigInt(people, times)", officialSources: ["OF043 — Programmers 43238", "PCCP Thinking Curriculum Ch.9 + Lab C"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Cần minimum T, kiểm được processed(T)>=people và predicate false→true. Pattern?", options: [
      { id: "first-true", label: "First feasible", explanation: "Giữ mid khi true; bỏ mid khi false." }, { id: "last-true", label: "Last feasible", explanation: "Dùng cho true→false/maximize." }, { id: "heap", label: "Mô phỏng heap", explanation: "people quá lớn." }, { id: "scan", label: "Tăng T từng phút", explanation: "Upper bound tới 10^18." },
    ], correctOptionId: "first-true" },
    blueprint: [
      { id: "PREDICATE", label: "PREDICATE", prompt: "feasible(T)?", canonical: "sum floor(T/time[i]) >= people", acceptedKeywords: [["floor", "time", "people"], ["chia", "đủ"]] },
      { id: "MONOTONICITY", label: "MONOTONICITY", prompt: "Chiều đơn điệu?", canonical: "false rồi true vì T tăng không làm processed giảm", acceptedKeywords: [["false", "true"], ["tăng", "không giảm"]] },
      { id: "BOUNDS", label: "BOUNDS", prompt: "Closed bounds?", canonical: "low=0n, high=fastest*target chắc chắn feasible", acceptedKeywords: [["0n", "fastest", "target"], ["high", "feasible"]] },
      { id: "UPDATE", label: "UPDATE", prompt: "First true update?", canonical: "true: high=mid; false: low=mid+1n", acceptedKeywords: [["high", "mid", "low", "1n"]] },
      { id: "SAFETY", label: "SAFETY", prompt: "JavaScript safety?", canonical: "BigInt toàn bộ arithmetic; midpoint chia 2n, không bitwise", acceptedKeywords: [["bigint", "2n"], ["không", "bitwise"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(m log(fastest*people))", acceptedKeywords: [["m", "log"]] },
    ],
    logic: [{ id: "convert", text: "Convert target/durations sang BigInt" }, { id: "bounds", text: "Đặt [0, fastest*target]" }, { id: "mid", text: "Lấy lower midpoint khi low<high" }, { id: "predicate", text: "Cộng processed với cutoff" }, { id: "update", text: "True giữ mid; false bỏ mid" }, { id: "return", text: "Khi hội tụ trả low" }],
    blocks: [
      { id: "convert", subgoal: "BigInt input", code: `function minimumImmigrationTimeBigInt(people, times) {\n  const target = BigInt(people);\n  const durations = times.map((time) => BigInt(time));\n  let fastest = durations[0];\n  for (const duration of durations) if (duration < fastest) fastest = duration;` },
      { id: "bounds", subgoal: "Feasible bounds", code: `let low = 0n;\nlet high = fastest * target;` },
      { id: "search", subgoal: "Mid and predicate", code: `while (low < high) {\n  const middle = (low + high) / 2n;\n  let processed = 0n;\n  for (const duration of durations) {\n    processed += middle / duration;\n    if (processed >= target) break;\n  }` },
      { id: "update", subgoal: "First feasible update", code: `if (processed >= target) high = middle;\n  else low = middle + 1n;\n}` },
      { id: "return", subgoal: "Return BigInt", code: `return low;\n}` },
    ], solution: immigrationSolution, tests: immigrationTests, challenges: binaryChallenges,
  }),
];
