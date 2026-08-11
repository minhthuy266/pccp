# Lời giải bộ Stack/Queue Programmers/PCCP — JavaScript

[← Bộ đề](../chapters/08_stack_queue/04_Programmers_PCCP_Set.md) · [← Index](../08_Stack_Queue.md)

> Mỗi code block độc lập. Khi nộp Programmers, đổi tên function thành `solution`. Comment tập trung vào ý nghĩa state và thứ tự transition.

Các bài monotonic map về [canonical `SQ-02`](../chapters/08_stack_queue/01_Stack_Monotonic.md#sq-02--monotonic-stack-các-index-chưa-được-giải-quyết). Mỗi bài dưới đây chỉ ghi knobs và phần lệch khỏi template.

## SQ-P01 — Không thích số giống nhau

```js
function removeConsecutiveDuplicates(arr) {
  // answer đồng thời là output và stack của các run đã chốt.
  const answer = [];

  for (const value of arr) {
    // Chỉ push khi current bắt đầu một run mới.
    if (answer.length === 0 || answer.at(-1) !== value) {
      answer.push(value);
    }
  }

  return answer;
}
```

**Invariant:** `answer` là kết quả đúng của prefix đã xử lý. **Complexity:** `O(n)` time/space. **Bẫy:** dùng Set sẽ xóa cả duplicate không liên tiếp như `[1,2,1]`.

## SQ-P02 — Phát triển tính năng

```js
function countFeatureDeploymentBatches(progresses, speeds) {
  // Bước 1: Đổi mỗi feature thành ngày hoàn thành độc lập.
  const finishDays = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index]),
  );

  const batches = [];
  let head = 0;

  // Bước 2: Feature tại head quyết định ngày release của batch hiện tại.
  while (head < finishDays.length) {
    const releaseDay = finishDays[head];
    let batchSize = 0;

    // Feature phía sau hoàn thành không muộn hơn releaseDay được đi cùng batch.
    while (head < finishDays.length && finishDays[head] <= releaseDay) {
      head++;
      batchSize++;
    }

    batches.push(batchSize);
  }

  return batches;
}
```

**Invariant:** mọi feature trước `head` đã được phát hành đúng batch; feature tại head chưa phát hành. **Complexity:** `O(n)`. **Bẫy:** sort ngày hoàn thành làm mất thứ tự queue.

## SQ-P03 — Dấu ngoặc đúng

```js
function isValidParenthesesString(s) {
  const stack = [];

  for (const character of s) {
    if (character === "(") {
      stack.push(character);
    } else {
      // Dấu đóng không có opening gần nhất để ghép.
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  // Còn opening nghĩa là chuỗi chưa khép hết.
  return stack.length === 0;
}
```

**Complexity:** `O(n)`/`O(n)`. Có thể tối ưu space bằng counter vì chỉ có một loại ngoặc. **Bẫy:** chỉ so tổng số dấu mà không check từng prefix.

## SQ-P04 — Process

```js
function targetProcessExecutionOrder(priorities, location) {
  const queue = priorities.map((priority, index) => ({ priority, index }));
  const remainingByPriority = Array(10).fill(0);
  let head = 0;
  let executedCount = 0;

  for (const priority of priorities) {
    remainingByPriority[priority]++;
  }

  function hasHigherPriority(priority) {
    for (let candidate = priority + 1; candidate <= 9; candidate++) {
      if (remainingByPriority[candidate] > 0) return true;
    }
    return false;
  }

  while (head < queue.length) {
    const process = queue[head++];

    // Process chưa đủ ưu tiên quay lại cuối queue.
    if (hasHigherPriority(process.priority)) {
      queue.push(process);
      continue;
    }

    // Chỉ khi thực thi mới xóa khỏi frequency state.
    remainingByPriority[process.priority]--;
    executedCount++;

    if (process.index === location) {
      return executedCount;
    }
  }

  return -1;
}
```

**Complexity:** `O(n)` vì priority chỉ 1..9; queue có thể re-enqueue nhưng mỗi vòng quay bị giới hạn bởi số process. **Bẫy:** không giữ original index; xóa priority khi re-enqueue.

## SQ-P05 — Xe tải qua cầu

```js
function timeForAllTrucksToCross(bridgeLength, weightLimit, truckWeights) {
  // onBridge[bridgeHead..] là các xe đang trên cầu theo thứ tự vào.
  const onBridge = [];
  let bridgeHead = 0;
  let waitingIndex = 0;
  let currentWeight = 0;
  let time = 0;

  while (waitingIndex < truckWeights.length || bridgeHead < onBridge.length) {
    time++;

    // Bước 1: Xe đủ bridgeLength giây rời cầu trước khi xét xe mới.
    if (
      bridgeHead < onBridge.length &&
      onBridge[bridgeHead].exitTime === time
    ) {
      currentWeight -= onBridge[bridgeHead].weight;
      bridgeHead++;
    }

    // Bước 2: Mỗi giây tối đa một xe đầu hàng được vào nếu không quá tải.
    if (
      waitingIndex < truckWeights.length &&
      currentWeight + truckWeights[waitingIndex] <= weightLimit
    ) {
      const truckWeight = truckWeights[waitingIndex++];
      currentWeight += truckWeight;
      onBridge.push({
        weight: truckWeight,
        exitTime: time + bridgeLength,
      });
    }
  }

  return time;
}
```

**Invariant:** `currentWeight` bằng tổng weight của interval xe chưa exit. **Complexity:** `O(n + answerTime)`; mỗi xe enqueue/dequeue một lần. **Bẫy:** cho nhiều xe vào cùng một giây; xử lý vào trước ra.

## SQ-P06 — Giá cổ phiếu

**Pattern/knobs:** `SQ-02`, right-resolve; smaller, strict, index, distance tới cuối. **Giữ nguyên:** unresolved indices và `while→pop→write→push`. **Thay đổi:** flush index còn lại; giá bằng nhau không phải giảm. **Test riêng:** `[1,1]→[1,0]`.

```js
function stockPriceDurations(prices) {
  const answer = Array(prices.length).fill(0);
  const unresolvedIndexes = [];

  for (let index = 0; index < prices.length; index++) {
    // Current thấp hơn sẽ là thời điểm giảm đầu tiên của mọi top lớn hơn.
    while (
      unresolvedIndexes.length > 0 &&
      prices[index] < prices[unresolvedIndexes.at(-1)]
    ) {
      const previousIndex = unresolvedIndexes.pop();
      answer[previousIndex] = index - previousIndex;
    }

    unresolvedIndexes.push(index);
  }

  // Các index còn lại không giảm; duration kéo tới cuối.
  while (unresolvedIndexes.length > 0) {
    const index = unresolvedIndexes.pop();
    answer[index] = prices.length - 1 - index;
  }

  return answer;
}
```

**Complexity:** `O(n)` vì mỗi index push/pop tối đa một lần. **Bẫy:** dùng `<=` khiến giá bằng nhau bị coi là giảm.

## SQ-P07 — Tạo số lớn

**Pattern/knobs:** `SQ-02`, dominated-pop; greater, strict, value stack, output string, budget `k`. **Giữ nguyên:** current pop liên tiếp top kém rồi được push. **Thay đổi:** pop loại ứng viên thay vì ghi answer; còn budget phải xóa đuôi. **Test riêng:** `"9876",2→"98"`.

```js
function makeLargestNumberAfterRemoving(number, k) {
  const digits = [];
  let removalsLeft = k;

  for (const digit of number) {
    // Digit lớn hiện tại nên thay digit nhỏ gần nhất bên trái nếu còn quyền xóa.
    while (
      removalsLeft > 0 &&
      digits.length > 0 &&
      digits.at(-1) < digit
    ) {
      digits.pop();
      removalsLeft--;
    }

    digits.push(digit);
  }

  // Chuỗi không tăng như 9876 không pop được; xóa phần cuối nhỏ nhất về vị trí.
  if (removalsLeft > 0) {
    digits.length -= removalsLeft;
  }

  return digits.join("");
}
```

**Invariant:** stack là subsequence lớn nhất có thể của prefix với số lần xóa đã dùng. **Complexity:** `O(n)`. **Bẫy:** quên xóa phần đuôi còn dư.

## SQ-P08 — Game gắp thú

```js
function countRemovedDolls(board, moves) {
  const rows = board.length;
  const cols = board[0].length;
  const nextRowByColumn = Array(cols).fill(0);
  const basket = [];
  let removedCount = 0;

  // Bước 1: Tìm trước vị trí chưa lấy đầu tiên của mỗi cột.
  for (let col = 0; col < cols; col++) {
    while (nextRowByColumn[col] < rows && board[nextRowByColumn[col]][col] === 0) {
      nextRowByColumn[col]++;
    }
  }

  for (const oneBasedColumn of moves) {
    const col = oneBasedColumn - 1;
    const row = nextRowByColumn[col];

    if (row >= rows) continue; // cột rỗng

    const doll = board[row][col];
    nextRowByColumn[col]++;

    // Bước 2: Sau khi lấy, tiến pointer qua các ô 0 nếu có.
    while (nextRowByColumn[col] < rows && board[nextRowByColumn[col]][col] === 0) {
      nextRowByColumn[col]++;
    }

    // Bước 3: Basket dùng LIFO để so với doll vừa đặt gần nhất.
    if (basket.length > 0 && basket.at(-1) === doll) {
      basket.pop();
      removedCount += 2;
    } else {
      basket.push(doll);
    }
  }

  return removedCount;
}
```

**Complexity:** `O(rows*cols + moves)`. **Bẫy:** quét lại cả cột cho mỗi move; nhầm column 1-based.

## SQ-P09 — Xóa cặp liền nhau

```js
function canRemoveAllAdjacentPairs(s) {
  const reducedPrefix = [];

  for (const character of s) {
    if (reducedPrefix.length > 0 && reducedPrefix.at(-1) === character) {
      reducedPrefix.pop();
    } else {
      reducedPrefix.push(character);
    }
  }

  return reducedPrefix.length === 0 ? 1 : 0;
}
```

**Invariant:** stack là chuỗi còn lại sau khi rút gọn hoàn toàn prefix. **Complexity:** `O(n)`. **Bẫy:** replace chuỗi lặp lại có thể `O(n²)`.

## SQ-P10 — Xoay dấu ngoặc

```js
function countValidBracketRotations(s) {
  const matchingOpen = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  function isValid(text) {
    const stack = [];

    for (const character of text) {
      if ("([{".includes(character)) {
        stack.push(character);
      } else if (stack.pop() !== matchingOpen.get(character)) {
        return false;
      }
    }
    return stack.length === 0;
  }

  let answer = 0;
  for (let offset = 0; offset < s.length; offset++) {
    const rotated = s.slice(offset) + s.slice(0, offset);
    if (isValid(rotated)) answer++;
  }
  return answer;
}
```

**Complexity:** `O(n²)`, phù hợp với constraint bài. **Bẫy:** chỉ đếm loại dấu; quên stack cuối. 

## SQ-P11 — Hộp hàng

```js
function countLoadedBoxes(order) {
  const auxiliaryBelt = [];
  let nextMainBox = 1;
  let loadedCount = 0;

  for (const targetBox of order) {
    // Bước 1: Đưa hộp từ băng chính sang stack cho tới target.
    while (nextMainBox <= order.length && nextMainBox <= targetBox) {
      auxiliaryBelt.push(nextMainBox++);
    }

    // Bước 2: Chỉ top stack mới lấy được; sai top thì quy trình dừng.
    if (auxiliaryBelt.at(-1) !== targetBox) {
      break;
    }

    auxiliaryBelt.pop();
    loadedCount++;
  }

  return loadedCount;
}
```

**Complexity:** `O(n)`. **Bẫy:** tìm target sâu trong stack dù không thể lấy qua các hộp phía trên.

## SQ-P12 — Làm hai queue có tổng bằng nhau

```js
function minOperationsToEqualQueueSums(queue1, queue2) {
  const combined = [...queue1, ...queue2];
  const total = combined.reduce((sum, value) => sum + value, 0);

  if (total % 2 !== 0) return -1;

  const target = total / 2;
  let currentSum = queue1.reduce((sum, value) => sum + value, 0);
  let left = 0;
  let right = queue1.length;
  let operationCount = 0;
  const maxOperations = combined.length * 3;

  // [left,right) trên array vòng biểu diễn các phần tử hiện ở queue1.
  while (operationCount <= maxOperations) {
    if (currentSum === target) return operationCount;

    if (currentSum < target) {
      currentSum += combined[right % combined.length];
      right++;
    } else {
      currentSum -= combined[left % combined.length];
      left++;
    }

    operationCount++;
  }

  return -1;
}
```

**Complexity:** `O(n)` với bound số lần dịch pointer; `O(n)` copy. **Bẫy:** mô phỏng bằng `shift()`; tổng lẻ; không có termination bound.

## SQ-P13 — Số lớn hơn phía sau

**Pattern/knobs:** `SQ-02`, right-resolve; greater, strict, index, trả value, default `-1`. **Giữ nguyên:** `while→pop→write→push`. **Thay đổi:** ghi `numbers[index]`, không tính distance. **Test riêng:** `[2,2]→[-1,-1]`.

```js
function nextGreaterNumbers(numbers) {
  const answer = Array(numbers.length).fill(-1);
  const unresolvedIndexes = [];

  for (let index = 0; index < numbers.length; index++) {
    while (
      unresolvedIndexes.length > 0 &&
      numbers[index] > numbers[unresolvedIndexes.at(-1)]
    ) {
      answer[unresolvedIndexes.pop()] = numbers[index];
    }
    unresolvedIndexes.push(index);
  }

  return answer;
}
```

**Complexity:** `O(n)` time/space. **Bẫy:** push value thay index khiến không biết ghi đáp án vào đâu.

## SQ-B01 — Đường ngắn nhất bản đồ game

```js
function shortestGameMapPath(maps) {
  const rows = maps.length;
  const cols = maps[0].length;
  const distance = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const queue = [[0, 0]];
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  distance[0][0] = 1;

  while (head < queue.length) {
    const [row, col] = queue[head++];

    if (row === rows - 1 && col === cols - 1) {
      return distance[row][col];
    }

    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      const isInside =
        nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols;

      if (
        !isInside ||
        maps[nextRow][nextCol] === 0 ||
        distance[nextRow][nextCol] !== -1
      ) {
        continue;
      }

      // Mark distance khi enqueue để mỗi ô vào queue tối đa một lần.
      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }

  return -1;
}
```

**Invariant:** queue có distance không giảm; lần đầu gán distance là shortest. **Complexity:** `O(rows*cols)`.

## SQ-B02 — Network

```js
function countComputerNetworks(n, computers) {
  const visited = Array(n).fill(false);
  let networkCount = 0;

  for (let start = 0; start < n; start++) {
    if (visited[start]) continue;

    // Mỗi start chưa visited mở ra đúng một component mới.
    networkCount++;
    const queue = [start];
    let head = 0;
    visited[start] = true;

    while (head < queue.length) {
      const current = queue[head++];

      for (let next = 0; next < n; next++) {
        if (computers[current][next] === 0 || visited[next]) continue;
        visited[next] = true;
        queue.push(next);
      }
    }
  }

  return networkCount;
}
```

**Complexity:** `O(n²)` do adjacency matrix. **Bẫy:** tăng count cho từng node thay vì từng lần seed BFS.

## SQ-B03 — Biến đổi từ

```js
function minWordTransformations(begin, target, words) {
  const targetIndex = words.indexOf(target);
  if (targetIndex === -1) return 0;

  function differsByOneCharacter(first, second) {
    let differenceCount = 0;
    for (let index = 0; index < first.length; index++) {
      if (first[index] !== second[index]) differenceCount++;
      if (differenceCount > 1) return false;
    }
    return differenceCount === 1;
  }

  const queue = [[begin, 0]];
  const visited = Array(words.length).fill(false);
  let head = 0;

  while (head < queue.length) {
    const [currentWord, stepCount] = queue[head++];

    for (let index = 0; index < words.length; index++) {
      if (visited[index] || !differsByOneCharacter(currentWord, words[index])) {
        continue;
      }

      if (words[index] === target) return stepCount + 1;

      visited[index] = true;
      queue.push([words[index], stepCount + 1]);
    }
  }

  return 0;
}
```

**Complexity:** `O(W² * L)`. **Bẫy:** DFS lần đầu chạm target không đảm bảo ít bước nhất; visited mark khi dequeue.

## SQ-B04 — Nhặt vật phẩm

```js
function shortestItemPickupDistance(
  rectangle,
  characterX,
  characterY,
  itemX,
  itemY,
) {
  // Scale x2 để hai đường chéo/góc chạm không tạo shortcut giả.
  const boardSize = 102;
  const board = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(0),
  );

  // Bước 1: Tô toàn bộ vùng chữ nhật.
  for (const [x1, y1, x2, y2] of rectangle) {
    for (let x = x1 * 2; x <= x2 * 2; x++) {
      for (let y = y1 * 2; y <= y2 * 2; y++) {
        board[x][y] = 1;
      }
    }
  }

  // Bước 2: Xóa interior; chỉ giữ union boundary.
  for (const [x1, y1, x2, y2] of rectangle) {
    for (let x = x1 * 2 + 1; x < x2 * 2; x++) {
      for (let y = y1 * 2 + 1; y < y2 * 2; y++) {
        board[x][y] = 0;
      }
    }
  }

  const start = [characterX * 2, characterY * 2];
  const target = [itemX * 2, itemY * 2];
  const queue = [start];
  const distance = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(-1),
  );
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  distance[start[0]][start[1]] = 0;

  while (head < queue.length) {
    const [x, y] = queue[head++];
    if (x === target[0] && y === target[1]) {
      return distance[x][y] / 2;
    }

    for (const [dx, dy] of directions) {
      const nextX = x + dx;
      const nextY = y + dy;
      if (
        nextX < 0 || nextX >= boardSize ||
        nextY < 0 || nextY >= boardSize ||
        board[nextX][nextY] !== 1 ||
        distance[nextX][nextY] !== -1
      ) {
        continue;
      }

      distance[nextX][nextY] = distance[x][y] + 1;
      queue.push([nextX, nextY]);
    }
  }

  return -1;
}
```

**Complexity:** grid scale bị chặn nhỏ nên tuyến tính theo board. **Bẫy:** không scale ×2; xóa interior ngay lúc tô từng rectangle làm hỏng overlap.

## SQ-B05 — Ghép mảnh puzzle

```js
function fillPuzzleWithQueue(gameBoard, table) {
  const size = gameBoard.length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function extractComponents(board, targetValue) {
    const visited = Array.from({ length: size }, () => Array(size).fill(false));
    const components = [];

    for (let startRow = 0; startRow < size; startRow++) {
      for (let startCol = 0; startCol < size; startCol++) {
        if (board[startRow][startCol] !== targetValue || visited[startRow][startCol]) {
          continue;
        }

        const queue = [[startRow, startCol]];
        const cells = [];
        let head = 0;
        visited[startRow][startCol] = true;

        while (head < queue.length) {
          const [row, col] = queue[head++];
          cells.push([row, col]);

          for (const [dr, dc] of directions) {
            const nextRow = row + dr;
            const nextCol = col + dc;
            const isInside =
              nextRow >= 0 && nextRow < size && nextCol >= 0 && nextCol < size;
            if (
              isInside &&
              !visited[nextRow][nextCol] &&
              board[nextRow][nextCol] === targetValue
            ) {
              visited[nextRow][nextCol] = true;
              queue.push([nextRow, nextCol]);
            }
          }
        }

        components.push(cells);
      }
    }
    return components;
  }

  function normalize(cells) {
    const minRow = Math.min(...cells.map(([row]) => row));
    const minCol = Math.min(...cells.map(([, col]) => col));
    return cells
      .map(([row, col]) => [row - minRow, col - minCol])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1])
      .map(([row, col]) => `${row},${col}`)
      .join(";");
  }

  function canonical(cells) {
    let rotated = cells.map(([row, col]) => [row, col]);
    const signatures = [];
    for (let turn = 0; turn < 4; turn++) {
      signatures.push(normalize(rotated));
      rotated = rotated.map(([row, col]) => [col, -row]);
    }
    return signatures.sort()[0];
  }

  const pieceCount = new Map();
  for (const piece of extractComponents(table, 1)) {
    const key = canonical(piece);
    pieceCount.set(key, (pieceCount.get(key) ?? 0) + 1);
  }

  let answer = 0;
  for (const hole of extractComponents(gameBoard, 0)) {
    const key = canonical(hole);
    const available = pieceCount.get(key) ?? 0;
    if (available > 0) {
      answer += hole.length;
      pieceCount.set(key, available - 1);
    }
  }
  return answer;
}
```

**Algorithm owner:** BFS extract component. **Helper:** Map canonical shape. **Complexity:** tuyến tính theo ô cộng sort tọa độ component.

## SQ-B06 — Node xa nhất

```js
function countFarthestNodes(n, edges) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const distance = Array(n + 1).fill(-1);
  const queue = [1];
  let head = 0;
  distance[1] = 0;

  while (head < queue.length) {
    const node = queue[head++];
    for (const next of graph[node]) {
      if (distance[next] !== -1) continue;
      distance[next] = distance[node] + 1;
      queue.push(next);
    }
  }

  const maxDistance = Math.max(...distance.slice(1));
  return distance.slice(1).filter((value) => value === maxDistance).length;
}
```

**Complexity:** `O(V+E)`. **Bẫy:** sort path length hoặc DFS rồi tin lần chạm đầu là shortest.

## SQ-B07 — Thoát mê cung

```js
function minMazeEscapeTime(maps) {
  const rows = maps.length;
  const cols = maps[0].length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let start;
  let lever;
  let exit;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (maps[row][col] === "S") start = [row, col];
      else if (maps[row][col] === "L") lever = [row, col];
      else if (maps[row][col] === "E") exit = [row, col];
    }
  }

  function shortestDistance(source, target) {
    const distance = Array.from({ length: rows }, () => Array(cols).fill(-1));
    const queue = [source];
    let head = 0;
    distance[source[0]][source[1]] = 0;

    while (head < queue.length) {
      const [row, col] = queue[head++];
      if (row === target[0] && col === target[1]) return distance[row][col];

      for (const [dr, dc] of directions) {
        const nextRow = row + dr;
        const nextCol = col + dc;
        const isInside =
          nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols;
        if (
          !isInside ||
          maps[nextRow][nextCol] === "X" ||
          distance[nextRow][nextCol] !== -1
        ) continue;

        distance[nextRow][nextCol] = distance[row][col] + 1;
        queue.push([nextRow, nextCol]);
      }
    }
    return -1;
  }

  const toLever = shortestDistance(start, lever);
  if (toLever === -1) return -1;
  const toExit = shortestDistance(lever, exit);
  if (toExit === -1) return -1;
  return toLever + toExit;
}
```

**Concept:** cùng một BFS skeleton, chạy hai contract source-target độc lập. **Bẫy:** tìm đường thẳng S→E mà bỏ qua lever.

## SQ-B08 — Biến đổi số

```js
function minNumberTransformations(x, y, n) {
  const distance = Array(y + 1).fill(-1);
  const queue = [x];
  let head = 0;
  distance[x] = 0;

  while (head < queue.length) {
    const current = queue[head++];
    if (current === y) return distance[current];

    for (const next of [current + n, current * 2, current * 3]) {
      if (next > y || distance[next] !== -1) continue;
      distance[next] = distance[current] + 1;
      queue.push(next);
    }
  }

  return -1;
}
```

**Complexity:** `O(y-x)` state bound. **Bẫy:** không bound `next <= y`; DFS exponential; quên `x === y`.

## SQ-C01 — Khai thác dầu

```js
function maxOilByDrillingColumn(land) {
  const rows = land.length;
  const cols = land[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const oilByColumn = Array(cols).fill(0);
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  for (let startRow = 0; startRow < rows; startRow++) {
    for (let startCol = 0; startCol < cols; startCol++) {
      if (land[startRow][startCol] === 0 || visited[startRow][startCol]) {
        continue;
      }

      // Bước 1: BFS trọn component đúng một lần.
      const queue = [[startRow, startCol]];
      const touchedColumns = new Set();
      let head = 0;
      let oilSize = 0;
      visited[startRow][startCol] = true;

      while (head < queue.length) {
        const [row, col] = queue[head++];
        oilSize++;
        touchedColumns.add(col);

        for (const [dr, dc] of directions) {
          const nextRow = row + dr;
          const nextCol = col + dc;
          const isInside =
            nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols;
          if (
            isInside &&
            land[nextRow][nextCol] === 1 &&
            !visited[nextRow][nextCol]
          ) {
            visited[nextRow][nextCol] = true;
            queue.push([nextRow, nextCol]);
          }
        }
      }

      // Bước 2: Phân phối contribution một lần cho mỗi cột component chạm.
      for (const col of touchedColumns) {
        oilByColumn[col] += oilSize;
      }
    }
  }

  return Math.max(...oilByColumn);
}
```

**Complexity:** `O(rows*cols)`. **Bẫy:** BFS lại theo từng cột; mark visited khi dequeue; cộng component nhiều lần cho cùng cột.
