# Queue nâng cao từ gốc: scheduling, capacity, circular buffer và BFS state

[← Stack/Queue lõi](01_Core_From_Zero.md) · [Bộ đề thật](04_Programmers_PCCP_Set.md) · [Solutions](../../solutions/08_Stack_Queue_Programmers_Solutions.md)

Queue nâng cao không phải là “một array có `push`”. Điều cần học là: item nào chờ, lý do nó được ở lại/hết chờ, và event nào cho phép nó rời queue.

## 1. Re-enqueue scheduling: không đến lượt thì quay lại cuối hàng

### Bài toán kiểu Process

Mỗi job có priority. Luôn in job có priority cao nhất trong các job đang chờ. Nếu job đầu queue chưa phải cao nhất, đưa nó xuống cuối hàng. Hỏi job ở `location` được in thứ mấy.

State:

- `queue`: các job chờ theo FIFO hiện tại;
- `countByPriority`: còn bao nhiêu job của từng priority;
- `currentMax`: priority cao nhất còn tồn tại;
- `printed`: đã in bao nhiêu job.

```js
function printOrderOfTarget(priorities, location) {
  const queue = priorities.map((priority, index) => ({ priority, index }));
  const countByPriority = Array(10).fill(0);
  for (const priority of priorities) countByPriority[priority] += 1;

  let currentMax = 9;
  let head = 0;
  let printed = 0;

  while (head < queue.length) {
    while (countByPriority[currentMax] === 0) currentMax -= 1;

    const job = queue[head++];
    if (job.priority !== currentMax) {
      queue.push(job);
      continue;
    }

    countByPriority[job.priority] -= 1;
    printed += 1;
    if (job.index === location) return printed;
  }

  return -1;
}
```

Không `sort()` queue ban đầu: priority chỉ quyết định **có được in tại lượt này không**; những job cùng priority vẫn phải giữ order queue. Array count 10 ô phù hợp vì priority đề chuẩn nằm trong miền nhỏ. Nếu priority là number tùy ý, dùng frequency Map hoặc heap tùy constraint.

**Test phá lỗi:** priorities `[1, 1, 9, 1, 1, 1]`, location `0` trả 5. Nó kiểm tra rằng job đầu thật sự quay lại sau các job cùng priority cao hơn.

## 2. Capacity/time queue: queue giữ event rời đi

### Bài toán kiểu xe tải qua cầu

Truck đi vào bridge theo thứ tự. Bridge có length (mỗi truck mất từng ấy time để ra) và giới hạn tổng weight. Hỏi thời điểm truck cuối ra.

Queue không cần giữ truck đã đi xong. Mỗi entry `[leaveTime, weight]` là một truck **đang trên bridge**. `currentWeight` là tổng weight của chính những entry còn sống.

```js
function crossingTime(bridgeLength, maxWeight, truckWeights) {
  const onBridge = [];
  let head = 0;
  let currentWeight = 0;
  let time = 0;

  for (const truckWeight of truckWeights) {
    // Nhảy tới lúc truck kế có thể được xét vào cầu.
    time += 1;

    while (head < onBridge.length && onBridge[head][0] <= time) {
      currentWeight -= onBridge[head][1];
      head += 1;
    }

    // Nếu cầu còn quá nặng, nhảy thẳng tới truck đầu tiên rời cầu.
    while (currentWeight + truckWeight > maxWeight) {
      time = onBridge[head][0];
      currentWeight -= onBridge[head][1];
      head += 1;
      while (head < onBridge.length && onBridge[head][0] <= time) {
        currentWeight -= onBridge[head][1];
        head += 1;
      }
    }

    onBridge.push([time + bridgeLength, truckWeight]);
    currentWeight += truckWeight;
  }

  return onBridge[onBridge.length - 1][0];
}
```

Điều phải kiểm tra khi dry run:

```text
currentWeight = tổng weight mọi entry từ head đến cuối onBridge
mọi entry trước head đã rời cầu và tuyệt đối không được trừ thêm lần nữa
```

Nếu đề diễn giải “mỗi giây xe vào/ra” rõ hơn cho bạn, mô phỏng từng giây cũng hoàn toàn đúng khi constraint cho phép. Event jump chỉ là cách giảm thời gian trống.

## 3. Circular queue: `head === tail` chưa nói được empty hay full

Circular queue chỉ cần khi buffer có capacity cố định. Với array queue thông thường/BFS, head index đơn giản hơn.

```js
class CircularQueue {
  constructor(capacity) {
    this.buffer = Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  enqueue(value) {
    if (this.size === this.buffer.length) return false;
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.buffer.length;
    this.size += 1;
    return true;
  }

  dequeue() {
    if (this.size === 0) return null;
    const value = this.buffer[this.head];
    this.head = (this.head + 1) % this.buffer.length;
    this.size -= 1;
    return value;
  }
}
```

`size` phân biệt hai trạng thái cùng có `head === tail`:

- `size === 0`: empty;
- `size === capacity`: full.

Không có `size`, phải hy sinh một slot hoặc dùng cờ khác. Đây là pattern implementation, không phải lựa chọn mặc định cho mọi queue.

## 4. BFS component và state nhiều chiều

### Component BFS

Khi cần đếm một vùng liên thông, mỗi lượt BFS lấy một ô/node chưa visited, sau đó queue lo toàn bộ component đó. Queue owner là BFS; Set/matrix visited ngăn lặp.

### State nhiều chiều

Đề có “đã lấy lever chưa”, “còn một lượt phá tường”, “đang ngày hay đêm” thì node không chỉ là coordinate. Ví dụ `[row, col, hasLever]`.

```js
function shortestPathWithOneWallBreak(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [[0, 0, 0, 1]]; // row, col, breaksUsed, distance
  const visited = new Set(["0|0|0"]);
  let head = 0;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (head < queue.length) {
    const [row, col, breaksUsed, distance] = queue[head++];
    if (row === rows - 1 && col === cols - 1) return distance;

    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;

      const nextBreaksUsed = breaksUsed + (grid[nextRow][nextCol] === 1 ? 1 : 0);
      if (nextBreaksUsed > 1) continue;

      const key = `${nextRow}|${nextCol}|${nextBreaksUsed}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push([nextRow, nextCol, nextBreaksUsed, distance + 1]);
    }
  }

  return -1;
}
```

Nếu visited chỉ là `row,col`, đi vào một ô sau khi đã dùng quyền phá tường sẽ chặn sai đường đi tới cùng ô nhưng còn quyền phá tường. “State trong queue” và “key visited” luôn phải có cùng thông tin có ý nghĩa cho tương lai.

## 5. Mixed test Stack/Queue

1. Logs ngoặc với ba loại ngoặc: state top là gì, empty cuối nghĩa gì?
2. Mỗi ngày có giá cổ phiếu, trả ngày đầu có giá thấp hơn. Stack lưu index hay value? Vì sao cần index để tính distance?
3. Hàng printer có priority bất kỳ lớn tới `10^9`. Đổi `countByPriority` array sang Map/heap thế nào?
4. Grid có chìa khóa và cửa. Queue state/visited key cần thêm field nào?

Sau khi làm, quay [practice](03_Practice_Ladder.md) và [22 bài thật](04_Programmers_PCCP_Set.md). Câu 3 và 4 là transfer test: không cần chép một template khác; chỉ cần state của template cũ đủ nghĩa hơn.
