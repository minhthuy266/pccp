/*
 * JavaScript ES2021 templates for Programmers / PCCP.
 * compare(a, b) < 0 means `a` has higher priority than `b`.
 * Learn the invariant of each template; do not paste blindly.
 */

// ---------- Array / String / Map / Set ----------

// Precondition: initialValue is primitive. With an object/array, cells in the
// same row would share that reference; use a factory when independent objects
// are required.
function makeGrid(rows, cols, initialValue = 0) {
  return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}

function countFrequency(values) {
  const frequency = new Map();

  for (const value of values) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1);
  }

  return frequency;
}

// Numeric sort mutates the array, so copy first when necessary.
function sortedAscending(values) {
  return [...values].sort((a, b) => a - b);
}

// Official practice application: matrix scan + mutation + reduction stack.
function craneGame(board, moves) {
  const basket = [];
  let removed = 0;

  for (const move of moves) {
    const col = move - 1;

    for (let row = 0; row < board.length; row++) {
      if (board[row][col] === 0) continue;

      const doll = board[row][col];
      board[row][col] = 0;

      if (basket[basket.length - 1] === doll) {
        basket.pop();
        removed += 2;
      } else {
        basket.push(doll);
      }

      break;
    }
  }

  return removed;
}

// ---------- Prefix sum ----------

function buildPrefixSum(values) {
  const prefix = Array(values.length + 1).fill(0);

  for (let i = 0; i < values.length; i++) {
    prefix[i + 1] = prefix[i] + values[i];
  }

  return prefix;
}

// Inclusive range [left, right].
function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}

// Precondition: grid is a non-empty rectangular matrix.
function buildPrefixSum2D(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const prefix = makeGrid(rows + 1, cols + 1, 0);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      prefix[row + 1][col + 1] =
        grid[row][col] +
        prefix[row][col + 1] +
        prefix[row + 1][col] -
        prefix[row][col];
    }
  }

  return prefix;
}

// Inclusive rectangle: (row1, col1) through (row2, col2).
function rectangleSum(prefix, row1, col1, row2, col2) {
  return (
    prefix[row2 + 1][col2 + 1] -
    prefix[row1][col2 + 1] -
    prefix[row2 + 1][col1] +
    prefix[row1][col1]
  );
}

// Apply inclusive rectangle additions, then materialize the final grid.
// Each update is [row1, col1, row2, col2, delta].
function applyRectangleUpdates(rows, cols, updates) {
  const difference = makeGrid(rows + 1, cols + 1, 0);

  for (const [row1, col1, row2, col2, delta] of updates) {
    difference[row1][col1] += delta;
    difference[row1][col2 + 1] -= delta;
    difference[row2 + 1][col1] -= delta;
    difference[row2 + 1][col2 + 1] += delta;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      difference[row][col] += difference[row][col - 1];
    }
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 1; row < rows; row++) {
      difference[row][col] += difference[row - 1][col];
    }
  }

  return difference.slice(0, rows).map((line) => line.slice(0, cols));
}

// Longest contiguous segment containing at most `maxDistinct` distinct values.
function longestWindowAtMostKDistinct(values, maxDistinct) {
  if (maxDistinct < 0) return 0;

  const count = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < values.length; right++) {
    const entering = values[right];
    count.set(entering, (count.get(entering) ?? 0) + 1);

    while (count.size > maxDistinct) {
      const leaving = values[left++];
      const remaining = count.get(leaving) - 1;

      if (remaining === 0) count.delete(leaving);
      else count.set(leaving, remaining);
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}

// ---------- Queue / Deque ----------

// In most BFS problems this is enough:
// const queue = [start];
// let head = 0;
// while (head < queue.length) {
//   const current = queue[head++];
// }

class Deque {
  constructor() {
    this.data = Object.create(null);
    this.left = 0;
    this.right = 0; // Active interval is [left, right).
  }

  get size() {
    return this.right - this.left;
  }

  isEmpty() {
    return this.left === this.right;
  }

  pushFront(value) {
    this.data[--this.left] = value;
  }

  pushBack(value) {
    this.data[this.right++] = value;
  }

  popFront() {
    if (this.isEmpty()) return undefined;

    const value = this.data[this.left];
    delete this.data[this.left++];
    return value;
  }

  popBack() {
    if (this.isEmpty()) return undefined;

    const index = --this.right;
    const value = this.data[index];
    delete this.data[index];
    return value;
  }

  front() {
    return this.isEmpty() ? undefined : this.data[this.left];
  }

  back() {
    return this.isEmpty() ? undefined : this.data[this.right - 1];
  }
}

// ---------- Priority queue / Heap ----------

class Heap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }

  get size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    const heap = this.data;
    heap.push(value);

    let index = heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(heap[parent], heap[index]) <= 0) break;

      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
  }

  pop() {
    const heap = this.data;
    if (heap.length === 0) return undefined;

    const root = heap[0];
    const last = heap.pop();

    if (heap.length === 0) return root;

    heap[0] = last;
    let index = 0;

    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let best = index;

      if (left < heap.length && this.compare(heap[left], heap[best]) < 0) {
        best = left;
      }

      if (right < heap.length && this.compare(heap[right], heap[best]) < 0) {
        best = right;
      }

      if (best === index) break;

      [heap[index], heap[best]] = [heap[best], heap[index]];
      index = best;
    }

    return root;
  }
}

// For every index, return the first strictly greater value to its right.
function nextGreaterValues(values) {
  const answer = Array(values.length).fill(-1);
  const unresolved = [];

  for (let index = 0; index < values.length; index++) {
    while (
      unresolved.length > 0 &&
      values[unresolved[unresolved.length - 1]] < values[index]
    ) {
      answer[unresolved.pop()] = values[index];
    }

    unresolved.push(index);
  }

  return answer;
}

// Usage:
// const minHeap = new Heap((a, b) => a - b);
// const maxHeap = new Heap((a, b) => b - a);
// const pairHeap = new Heap((a, b) => a[0] - b[0]);

// ---------- Binary search ----------

// First index whose value is >= target.
function lowerBound(values, target) {
  let left = 0;
  let right = values.length; // Search interval [left, right).

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (values[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

// First index whose value is > target.
function upperBound(values, target) {
  let left = 0;
  let right = values.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (values[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

// Predicate is false...false, true...true. `high` must be feasible.
function firstFeasible(low, high, can) {
  let left = low;
  let right = high;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (can(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// Predicate is true...true, false...false. `low` must be feasible.
function lastFeasible(low, high, can) {
  let left = low;
  let right = high;

  while (left < right) {
    const mid = left + Math.floor((right - left + 1) / 2);

    if (can(mid)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

// ---------- Backtracking ----------

// Precondition: values are distinct. Duplicate inputs produce duplicate
// permutations; deduplicate the input/result explicitly when uniqueness is
// required.
function permutations(values, length) {
  const result = [];
  const path = [];
  const used = Array(values.length).fill(false);

  function search() {
    if (path.length === length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < values.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(values[i]);
      search();
      path.pop();
      used[i] = false;
    }
  }

  search();
  return result;
}

function combinations(values, length) {
  const result = [];
  const path = [];

  function search(start) {
    if (path.length === length) {
      result.push([...path]);
      return;
    }

    const needed = length - path.length;

    for (let i = start; i <= values.length - needed; i++) {
      path.push(values[i]);
      search(i + 1);
      path.pop();
    }
  }

  search(0);
  return result;
}

// ---------- Graph / DFS / BFS ----------

function buildUndirectedGraph(nodeCount, edges) {
  const graph = Array.from({ length: nodeCount }, () => []);

  for (const [from, to] of edges) {
    graph[from].push(to);
    graph[to].push(from);
  }

  return graph;
}

function dfsGraph(graph, start) {
  const visited = Array(graph.length).fill(false);
  const order = [];
  const stack = [start];
  visited[start] = true;

  while (stack.length > 0) {
    const current = stack.pop();
    order.push(current);

    for (let i = graph[current].length - 1; i >= 0; i--) {
      const next = graph[current][i];
      if (visited[next]) continue;

      visited[next] = true;
      stack.push(next);
    }
  }

  return order;
}

function bfsGraph(graph, start) {
  const distance = Array(graph.length).fill(-1);
  const queue = [start];
  let head = 0;
  distance[start] = 0;

  while (head < queue.length) {
    const current = queue[head++];

    for (const next of graph[current]) {
      if (distance[next] !== -1) continue;

      distance[next] = distance[current] + 1;
      queue.push(next);
    }
  }

  return distance;
}

const DIRECTION_ROW = [-1, 1, 0, 0];
const DIRECTION_COL = [0, 0, -1, 1];

// Convention: 1 is passable and 0 is blocked.
function bfsGrid(board, startRow, startCol) {
  const rows = board.length;
  const cols = board[0].length;
  const distance = makeGrid(rows, cols, -1);

  if (board[startRow][startCol] === 0) return distance;

  const queue = [[startRow, startCol]];
  let head = 0;
  distance[startRow][startCol] = 0;

  while (head < queue.length) {
    const [row, col] = queue[head++];

    for (let direction = 0; direction < 4; direction++) {
      const nextRow = row + DIRECTION_ROW[direction];
      const nextCol = col + DIRECTION_COL[direction];

      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
        continue;
      }

      if (board[nextRow][nextCol] === 0) continue;
      if (distance[nextRow][nextCol] !== -1) continue;

      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }

  return distance;
}

// All sources start at distance 0 and expand together.
// `isPassable(row, col)` decides whether a cell can be entered.
function multiSourceBfs(rows, cols, sources, isPassable = () => true) {
  const distance = makeGrid(rows, cols, -1);
  const queue = [];
  let head = 0;

  for (const [row, col] of sources) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) continue;
    if (!isPassable(row, col) || distance[row][col] !== -1) continue;

    distance[row][col] = 0;
    queue.push([row, col]);
  }

  while (head < queue.length) {
    const [row, col] = queue[head++];

    for (let direction = 0; direction < 4; direction++) {
      const nextRow = row + DIRECTION_ROW[direction];
      const nextCol = col + DIRECTION_COL[direction];

      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
        continue;
      }
      if (!isPassable(nextRow, nextCol)) continue;
      if (distance[nextRow][nextCol] !== -1) continue;

      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }

  return distance;
}

// ---------- Weighted graph / Dijkstra ----------

// graph[from] contains [to, nonNegativeWeight].
function dijkstra(graph, start) {
  const distance = Array(graph.length).fill(Infinity);
  const heap = new Heap((a, b) => a[0] - b[0]);

  distance[start] = 0;
  heap.push([0, start]);

  while (heap.size > 0) {
    const [currentDistance, current] = heap.pop();
    if (currentDistance !== distance[current]) continue;

    for (const [next, weight] of graph[current]) {
      const nextDistance = currentDistance + weight;
      if (nextDistance >= distance[next]) continue;

      distance[next] = nextDistance;
      heap.push([nextDistance, next]);
    }
  }

  return distance;
}

// ---------- Union-Find / Disjoint Set Union ----------

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.groupSize = Array(size).fill(1);
  }

  find(value) {
    while (value !== this.parent[value]) {
      this.parent[value] = this.parent[this.parent[value]];
      value = this.parent[value];
    }

    return value;
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) return false;

    if (this.groupSize[rootA] < this.groupSize[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;
    this.groupSize[rootA] += this.groupSize[rootB];
    return true;
  }

  connected(a, b) {
    return this.find(a) === this.find(b);
  }

  sizeOf(value) {
    return this.groupSize[this.find(value)];
  }
}

// ---------- Dynamic programming examples ----------

// Maximum sum with no two adjacent values selected. Selecting no value is
// allowed, so an empty input or an all-negative input returns 0.
function maxNonAdjacentSum(values) {
  let previousTwo = 0;
  let previousOne = 0;

  for (const value of values) {
    const current = Math.max(previousOne, previousTwo + value);
    previousTwo = previousOne;
    previousOne = current;
  }

  return previousOne;
}

// Each item [weight, value] can be used at most once.
function knapsack01(items, capacity) {
  const dp = Array(capacity + 1).fill(0);

  for (const [weight, value] of items) {
    for (let current = capacity; current >= weight; current--) {
      dp[current] = Math.max(dp[current], dp[current - weight] + value);
    }
  }

  return dp[capacity];
}

// Intervals use half-open semantics [start, end). Select the maximum number
// of pairwise non-overlapping intervals.
function maximumNonOverlappingIntervals(intervals) {
  const sorted = [...intervals].sort(
    ([startA, endA], [startB, endB]) => endA - endB || startA - startB,
  );
  let selected = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of sorted) {
    if (start < lastEnd) continue;
    selected++;
    lastEnd = end;
  }

  return selected;
}

// Number of paths from top-left to bottom-right in a 0/1 grid.
// 1 is passable, 0 is blocked. Moves are only right or down.
function countGridPaths(grid, modulo = 1_000_000_007) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dp = Array(cols).fill(0);
  dp[0] = grid[0][0] === 1 ? 1 : 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 0) {
        dp[col] = 0;
        continue;
      }

      if (col > 0) dp[col] = (dp[col] + dp[col - 1]) % modulo;
    }
  }

  return dp[cols - 1];
}
