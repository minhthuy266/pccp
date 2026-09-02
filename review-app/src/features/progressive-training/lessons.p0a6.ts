import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const networkSolution = `function networkCount(n, computers) {
  const visited = Array(n).fill(false);
  let networks = 0;
  for (let start = 0; start < n; start++) {
    if (visited[start]) continue;
    networks += 1;
    visited[start] = true;
    const stack = [start];
    while (stack.length) {
      const node = stack.pop();
      for (let neighbor = 0; neighbor < n; neighbor++) {
        if (computers[node][neighbor] === 0 || visited[neighbor]) continue;
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }
  }
  return networks;
}`;

const networkTests = [
  { label: "official two", expression: "networkCount(3,[[1,1,0],[1,1,0],[0,0,1]])", expected: "2" },
  { label: "official one", expression: "networkCount(3,[[1,1,0],[1,1,1],[0,1,1]])", expected: "1" },
  { label: "all isolated", expression: "networkCount(4,[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])", expected: "4" },
  { label: "single", expression: "networkCount(1,[[1]])", expected: "1" },
];

const componentSizesSolution = `function componentSizes(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) { graph[a].push(b); graph[b].push(a); }
  const visited = Array(n).fill(false);
  const sizes = [];
  for (let start = 0; start < n; start++) {
    if (visited[start]) continue;
    let size = 0;
    const stack = [start];
    visited[start] = true;
    while (stack.length) {
      const node = stack.pop();
      size += 1;
      for (const next of graph[node]) if (!visited[next]) { visited[next] = true; stack.push(next); }
    }
    sizes.push(size);
  }
  return sizes.sort((a, b) => b - a);
}`;

const gridComponentsSolution = `function countGridComponents(grid) {
  const rows = grid.length;
  if (!rows || !grid[0].length) return 0;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [[-1,0],[1,0],[0,-1],[0,1]];
  let count = 0;
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
    if (grid[row][col] !== 1 || visited[row][col]) continue;
    count += 1;
    const stack = [[row, col]];
    visited[row][col] = true;
    while (stack.length) {
      const [currentRow, currentCol] = stack.pop();
      for (const [dr, dc] of directions) {
        const nextRow = currentRow + dr, nextCol = currentCol + dc;
        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
        if (grid[nextRow][nextCol] !== 1 || visited[nextRow][nextCol]) continue;
        visited[nextRow][nextCol] = true;
        stack.push([nextRow, nextCol]);
      }
    }
  }
  return count;
}`;

const networkChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-reset-global-visited", title: "Debug reset visited theo từng start", change: "Visited phải sống qua toàn outer loop; chỉ frontier được tạo mới cho component mới.", functionSignature: "networkCount(n, computers)", starterCode: networkSolution.replace("  const visited = Array(n).fill(false);", "  let visited = Array(n).fill(false);").replace("  for (let start = 0; start < n; start++) {", "  for (let start = 0; start < n; start++) {\n    visited = Array(n).fill(false);"), solution: networkSolution, tests: networkTests },
  { kind: "DEBUG", id: "debug-count-every-start", title: "Debug đếm mọi node như component mới", change: "Chỉ unseen start mới chứng minh một component mới; visited start phải bị skip.", functionSignature: "networkCount(n, computers)", starterCode: networkSolution.replace("    if (visited[start]) continue;", "    // missing visited-start guard"), solution: networkSolution, tests: networkTests },
  { kind: "VARIANT", id: "variant-component-sizes", title: "Đếm component → lấy size từng component", change: "Giữ outer traversal, thêm local size và finalize sau khi frontier rỗng.", functionSignature: "componentSizes(n, edges)", starterCode: "function componentSizes(n, edges) {\n  // adjacency-list outer traversal\n}", solution: componentSizesSolution, tests: [
    { label: "mixed", expression: "componentSizes(6,[[0,1],[1,2],[3,4]])", expected: "[3,2,1]" },
    { label: "connected", expression: "componentSizes(3,[[0,1],[1,2]])", expected: "[3]" },
    { label: "isolated", expression: "componentSizes(3,[])", expected: "[1,1,1]" },
  ] },
  { kind: "VARIANT", id: "variant-grid-components", title: "Graph matrix → grid components", change: "Outer candidates đổi thành mọi cell; inner neighbor đổi thành bốn hướng và phải bounds trước read.", functionSignature: "countGridComponents(grid)", starterCode: "function countGridComponents(grid) {\n  // outer cells + four-neighbor traversal\n}", solution: gridComponentsSolution, tests: [
    { label: "three islands", expression: "countGridComponents([[1,0,1],[1,0,0],[0,1,1]])", expected: "3" },
    { label: "rectangular connected", expression: "countGridComponents([[1,1,1],[0,0,1]])", expected: "1" },
    { label: "empty", expression: "countGridComponents([])", expected: "0" },
  ] },
];

const profileSolution = `function rootedTreeProfile(n, edges, root) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of edges) { graph[a].push(b); graph[b].push(a); }
  const parent = Array(n + 1).fill(-1);
  const depth = Array(n + 1).fill(-1);
  const order = [root];
  parent[root] = 0;
  depth[root] = 0;
  for (let index = 0; index < order.length; index++) {
    const node = order[index];
    for (const next of graph[node]) {
      if (parent[next] !== -1) continue;
      parent[next] = node;
      depth[next] = depth[node] + 1;
      order.push(next);
    }
  }
  const subtreeSize = Array(n + 1).fill(1);
  for (let index = order.length - 1; index > 0; index--) {
    const node = order[index];
    subtreeSize[parent[node]] += subtreeSize[node];
  }
  return { parent: parent.slice(1), depth: depth.slice(1), subtreeSize: subtreeSize.slice(1) };
}`;

const profileTests = [
  { label: "branched", expression: "rootedTreeProfile(5,[[1,2],[1,3],[3,4],[3,5]],1)", expected: "{\"parent\":[0,1,1,3,3],\"depth\":[0,1,1,2,2],\"subtreeSize\":[5,1,3,1,1]}" },
  { label: "different root", expression: "rootedTreeProfile(3,[[1,2],[2,3]],2)", expected: "{\"parent\":[2,0,2],\"depth\":[1,0,1],\"subtreeSize\":[1,3,1]}" },
  { label: "single", expression: "rootedTreeProfile(1,[],1)", expected: "{\"parent\":[0],\"depth\":[0],\"subtreeSize\":[1]}" },
];

const dfsOrderSolution = `function iterativeDfsOrder(graph, source) {
  const visited = Array(graph.length).fill(false);
  const stack = [source];
  const order = [];
  visited[source] = true;
  while (stack.length) {
    const node = stack.pop();
    order.push(node);
    for (let index = graph[node].length - 1; index >= 0; index--) {
      const next = graph[node][index];
      if (visited[next]) continue;
      visited[next] = true;
      stack.push(next);
    }
  }
  return order;
}`;

const levelCountsSolution = `function treeLevelCounts(n, edges, root) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of edges) { graph[a].push(b); graph[b].push(a); }
  const depth = Array(n + 1).fill(-1), queue = [root], counts = [];
  depth[root] = 0;
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    counts[depth[node]] = (counts[depth[node]] ?? 0) + 1;
    for (const next of graph[node]) if (depth[next] === -1) {
      depth[next] = depth[node] + 1;
      queue.push(next);
    }
  }
  return counts;
}`;

const profileChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-root-unmarked", title: "Debug root chưa được mark", change: "Root phải có parent sentinel trước traversal; nếu không edge từ child sẽ enqueue root lần nữa.", functionSignature: "rootedTreeProfile(n, edges, root)", starterCode: profileSolution.replace("  parent[root] = 0;", "  // root parent is not marked"), solution: profileSolution, tests: profileTests },
  { kind: "DEBUG", id: "debug-forward-subtree", title: "Debug cộng subtree theo preorder", change: "Child size phải hoàn tất trước parent, nên accumulation bắt buộc đi reverse traversal order.", functionSignature: "rootedTreeProfile(n, edges, root)", starterCode: profileSolution.replace("for (let index = order.length - 1; index > 0; index--)", "for (let index = 1; index < order.length; index++)"), solution: profileSolution, tests: profileTests },
  { kind: "VARIANT", id: "variant-iterative-dfs-order", title: "Tree profile → iterative DFS preorder", change: "Để giữ neighbor order như recursive DFS, push neighbor theo thứ tự đảo vào LIFO stack.", functionSignature: "iterativeDfsOrder(graph, source)", starterCode: "function iterativeDfsOrder(graph, source) {\n  // push neighbors in reverse order\n}", solution: dfsOrderSolution, tests: [
    { label: "preorder", expression: "iterativeDfsOrder([[1,2],[3],[],[]],0)", expected: "[0,1,3,2]" },
    { label: "cycle", expression: "iterativeDfsOrder([[1,2],[0,2],[0,1]],0)", expected: "[0,1,2]" },
    { label: "isolated source", expression: "iterativeDfsOrder([[],[]],1)", expected: "[1]" },
  ] },
  { kind: "VARIANT", id: "variant-level-counts", title: "Per-node depth → số node mỗi level", change: "BFS depth giữ nguyên; aggregate count khi dequeue từng node.", functionSignature: "treeLevelCounts(n, edges, root)", starterCode: "function treeLevelCounts(n, edges, root) {\n  // BFS and aggregate by depth\n}", solution: levelCountsSolution, tests: [
    { label: "branched", expression: "treeLevelCounts(5,[[1,2],[1,3],[3,4],[3,5]],1)", expected: "[1,2,2]" },
    { label: "chain middle root", expression: "treeLevelCounts(3,[[1,2],[2,3]],2)", expected: "[1,2]" },
    { label: "single", expression: "treeLevelCounts(1,[],1)", expected: "[1]" },
  ] },
];

export const p0a6Lessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-F13-NETWORK-COMPONENTS", familyId: "F13", slug: "network-connected-components", title: "Connected components — Mạng lưới", priority: "P0", basePattern: "Outer unseen root + inner traversal", description: "Đếm số network trong adjacency matrix bằng outer loop và iterative traversal.",
    constraints: ["computers là adjacency matrix n×n", "graph vô hướng", "isolated node là một component", "visited sống qua toàn outer loop"], functionSignature: "networkCount(n, computers)", officialSources: ["OF037 — Mạng lưới", "PCCP Thinking Curriculum Ch.10 §10.3"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Đề hỏi số nhóm liên thông, gồm cả node isolated. Pattern?", options: [{ id: "components", label: "Outer roots + DFS/BFS", explanation: "Mỗi unseen root mở đúng một component." }, { id: "one-dfs", label: "Một DFS từ node 0", explanation: "Bỏ component không reachable từ 0." }, { id: "shortest", label: "Shortest path", explanation: "Không cần distance." }, { id: "degree", label: "Đếm node degree 0", explanation: "Không đếm các component nhiều node." }], correctOptionId: "components" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State global/local?", canonical: "global visited và networks; local stack cho component hiện tại", acceptedKeywords: [["visited", "networks", "stack"], ["toàn cục", "component"]] },
      { id: "OUTER", label: "OUTER", prompt: "Khi nào tăng count?", canonical: "chỉ khi start chưa visited", acceptedKeywords: [["start", "chưa", "visited"], ["unseen", "count"]] },
      { id: "INNER", label: "INNER", prompt: "Neighbor hợp lệ?", canonical: "matrix edge 1 và neighbor chưa visited", acceptedKeywords: [["1", "visited"], ["edge", "unseen"]] },
      { id: "MARK", label: "MARK", prompt: "Mark lúc nào?", canonical: "mark trước khi push", acceptedKeywords: [["trước", "push"], ["mark", "enqueue"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Sau inner traversal?", canonical: "toàn bộ component của start đã visited đúng một lần", acceptedKeywords: [["component", "visited"], ["toàn bộ", "một lần"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Matrix complexity?", canonical: "O(n^2) time và O(n) space", acceptedKeywords: [["n^2", "o(n)"], ["n²", "space"]] },
    ],
    logic: [{ id: "state", text: "Tạo global visited và network count" }, { id: "outer", text: "Quét mọi start, skip node đã visited" }, { id: "open", text: "Tăng count, mark start và tạo stack" }, { id: "inner", text: "Pop node và quét toàn row matrix" }, { id: "discover", text: "Mark unseen connected neighbor trước push" }, { id: "return", text: "Trả count sau toàn outer loop" }],
    blocks: [
      { id: "state", subgoal: "Tạo global traversal state", code: `function networkCount(n,computers) {\n const visited=Array(n).fill(false); let networks=0;` },
      { id: "outer", subgoal: "Mở traversal từ mỗi unseen root", code: `for (let start=0;start<n;start++) {\n if (visited[start]) continue;\n networks++; visited[start]=true;\n const stack=[start];` },
      { id: "inner", subgoal: "Mark toàn component hiện tại", code: `while (stack.length) {\n const node=stack.pop();\n for (let neighbor=0;neighbor<n;neighbor++) {\n  if (computers[node][neighbor]===0||visited[neighbor]) continue;\n  visited[neighbor]=true; stack.push(neighbor);\n }\n}\n}` },
      { id: "return", subgoal: "Trả số component", code: `return networks;\n}` },
    ], solution: networkSolution, tests: networkTests, challenges: networkChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F13-ROOTED-TREE-PROFILE", familyId: "F13", slug: "rooted-tree-parent-depth-subtree", title: "Rooted tree — parent, depth và subtree", priority: "P0", basePattern: "Forward traversal + reverse-order aggregation", description: "Root một cây vô hướng, tính parent/depth bằng traversal rồi tính subtree size theo reverse order.",
    constraints: ["n node đánh số 1..n", "edges tạo một tree", "root hợp lệ", "không dùng recursion phụ thuộc call-stack"], functionSignature: "rootedTreeProfile(n, edges, root)", officialSources: ["OF023 — Chia lưới điện", "PCCP Thinking Curriculum Ch.10 §10.5"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Cần parent/depth và aggregate từ child lên parent trên tree lớn. Pattern?", options: [{ id: "two-phase", label: "Forward order + reverse fold", explanation: "Forward xác định parent; reverse bảo đảm child hoàn tất trước parent." }, { id: "one-forward", label: "Chỉ cộng lúc discover", explanation: "Chưa biết subtree hoàn chỉnh của child." }, { id: "all-pairs", label: "Floyd-Warshall", explanation: "Thừa O(n³)." }, { id: "sort", label: "Sort edge", explanation: "Không tạo quan hệ root-parent." }], correctOptionId: "two-phase" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State?", canonical: "adjacency, parent, depth, traversal order và subtreeSize", acceptedKeywords: [["parent", "depth", "order"], ["subtree", "adjacency"]] },
      { id: "ROOT", label: "ROOT", prompt: "Seed root?", canonical: "parent[root]=0, depth[root]=0, order=[root]", acceptedKeywords: [["parent", "0", "depth"], ["root", "order"]] },
      { id: "FORWARD", label: "FORWARD", prompt: "Discover child?", canonical: "unseen neighbor nhận parent/depth rồi được append order", acceptedKeywords: [["parent", "depth", "order"], ["child", "append"]] },
      { id: "REVERSE", label: "REVERSE", prompt: "Aggregate?", canonical: "duyệt order ngược, cộng subtreeSize[node] vào parent", acceptedKeywords: [["ngược", "subtree", "parent"], ["reverse", "size"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Reverse invariant?", canonical: "khi xử lý node, mọi descendant đã có size hoàn chỉnh", acceptedKeywords: [["descendant", "hoàn chỉnh"], ["child", "size"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n) time và O(n) space", acceptedKeywords: [["o(n)", "time"], ["n", "space"]] },
    ],
    logic: [{ id: "graph", text: "Build adjacency hai chiều" }, { id: "seed", text: "Mark root và seed traversal order" }, { id: "forward", text: "Traverse forward để gán parent/depth" }, { id: "sizes", text: "Khởi tạo mỗi subtree size bằng 1" }, { id: "reverse", text: "Duyệt order ngược cộng child vào parent" }, { id: "return", text: "Trả parent/depth/subtree không gồm index 0" }],
    blocks: [
      { id: "graph", subgoal: "Build tree và traversal state", code: `function rootedTreeProfile(n,edges,root) {\n const graph=Array.from({length:n+1},()=>[]);\n for (const [a,b] of edges) { graph[a].push(b); graph[b].push(a); }\n const parent=Array(n+1).fill(-1),depth=Array(n+1).fill(-1),order=[root];\n parent[root]=0; depth[root]=0;` },
      { id: "forward", subgoal: "Gán parent/depth không quay lại", code: `for (let index=0;index<order.length;index++) {\n const node=order[index];\n for (const next of graph[node]) {\n  if (parent[next]!==-1) continue;\n  parent[next]=node; depth[next]=depth[node]+1; order.push(next);\n }\n}` },
      { id: "reverse", subgoal: "Aggregate subtree theo reverse order", code: `const subtreeSize=Array(n+1).fill(1);\nfor (let index=order.length-1;index>0;index--) {\n const node=order[index]; subtreeSize[parent[node]]+=subtreeSize[node];\n}` },
      { id: "return", subgoal: "Trả profile theo node 1..n", code: `return {parent:parent.slice(1),depth:depth.slice(1),subtreeSize:subtreeSize.slice(1)};\n}` },
    ], solution: profileSolution, tests: profileTests, challenges: profileChallenges,
  }),
];
