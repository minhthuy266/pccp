# Stack/Queue phần lõi từ gốc: state nào được phép xử lý tiếp?

[← Lộ trình mastery](00_Exam_Mastery_Guide.md) · [Theory tham chiếu](01_Stack_Monotonic.md) · [Bộ đề thật](04_Programmers_PCCP_Set.md)

Mọi phần dưới đây bắt đầu bằng **thứ tự xử lý**, không bắt đầu bằng tên cấu trúc dữ liệu. Nếu bạn tự trả lời được phần tử nào có quyền xử lý tiếp, bạn sẽ chọn đúng stack hay queue.

## 1. Matching và reduction: vì sao phải nhìn đúng phần tử gần nhất?

### Matching ngoặc

Trong `"([{}])"`, khi gặp `}`, nó phải đóng `{` vừa mở gần nhất. Nó không thể đóng `(` hay `[`, dù chúng cũng chưa được đóng. Đây là quy tắc last-in-first-out.

Ta định nghĩa stack như sau:

> Stack chứa các opening bracket chưa được match; đỉnh stack là opening gần current nhất.

```js
function areBracketsValid(text) {
  const expectedOpenByClose = new Map([[")", "("], ["]", "["], ["}", "{"]]);
  const stack = [];

  for (const character of text) {
    if (character === "(" || character === "[" || character === "{") {
      stack.push(character);
      continue;
    }

    const expectedOpen = expectedOpenByClose.get(character);
    const actualOpen = stack.pop();
    if (actualOpen !== expectedOpen) return false;
  }

  return stack.length === 0;
}
```

### Dry run `"([)]"`

| Ký tự | Stack trước | Việc làm | Stack sau |
| --- | --- | --- | --- |
| `(` | `[]` | push | `[(]` |
| `[` | `[(]` | push | `[(, []` |
| `)` | `[(, []` | pop ra `[` nhưng cần `(` → false | dừng |

Không được chỉ đếm số open và close. `"([)]"` có cùng số lượng nhưng thứ tự lồng sai.

### Reduction: stack là output đã rút gọn

Trong bài xóa cặp cạnh nhau, `stack` có nghĩa khác: nó là kết quả rút gọn của prefix đã đọc. Current bằng top thì hai item triệt tiêu; không bằng thì current được giữ.

```js
function reduceAdjacentEqualValues(values) {
  const reduced = [];

  for (const value of values) {
    if (reduced[reduced.length - 1] === value) {
      reduced.pop();
    } else {
      reduced.push(value);
    }
  }

  return reduced;
}
```

Test `[1, 2, 2, 1] → []` rất quan trọng. Sau khi cặp `2,2` biến mất, hai số `1` trở thành kề nhau và cũng phải biến mất. Một biến `previous` đơn lẻ không xử lý được chuỗi triệt tiêu như vậy.

### Khi stack không cần thiết?

Nếu item sai chỉ bị bỏ độc lập và việc bỏ nó không làm hai item cũ trở thành hàng xóm mới, `filter` là đủ. Stack chỉ đáng dùng khi current phải so với **output chưa bị đóng/rút gọn gần nhất**.

---

## 2. Monotonic stack: không giữ “lớn nhất”, mà giữ người chưa có đáp án

### Bài toán

Với mỗi số, trả số lớn hơn đầu tiên ở bên phải; không có trả `-1`.

```text
[2, 1, 2, 4, 3] → [4, 2, 4, -1, -1]
```

### Cách chậm

Ở mỗi index, quét bên phải đến khi thấy số lớn hơn. Những phần suffix giống nhau bị quét lặp, tệ nhất `O(n²)`.

### State thật sự

`unresolvedIndexes` là stack index sao cho:

- chúng chưa tìm thấy số lớn hơn bên phải;
- value ở các index đó giảm dần từ đáy lên đỉnh;
- top là ứng viên gần current nhất cần được current trả lời.

Khi current lớn hơn top, current chính là first greater của top. Pop top, ghi đáp án. Có thể current trả lời nhiều top, nên dùng `while`.

```js
function firstGreaterOnRight(values) {
  const answer = Array(values.length).fill(-1);
  const unresolvedIndexes = [];

  for (let index = 0; index < values.length; index += 1) {
    while (
      unresolvedIndexes.length > 0
      && values[unresolvedIndexes[unresolvedIndexes.length - 1]] < values[index]
    ) {
      const oldIndex = unresolvedIndexes.pop();
      answer[oldIndex] = values[index];
    }

    unresolvedIndexes.push(index);
  }

  return answer;
}
```

### Dry run với `[2, 1, 2, 4]`

| index/value | Stack index trước | Pop vì current lớn hơn? | Answer mới | Stack sau |
| --- | --- | --- | --- | --- |
| 0 / 2 | `[]` | không | — | `[0]` |
| 1 / 1 | `[0]` | không | — | `[0,1]` |
| 2 / 2 | `[0,1]` | pop 1 vì `1 < 2` | `answer[1]=2` | `[0,2]` |
| 3 / 4 | `[0,2]` | pop 2, pop 0 | `answer[2]=4`, `answer[0]=4` | `[3]` |

### `while` có làm chậm không?

Không. Mỗi index push đúng một lần. Mỗi index pop tối đa một lần. Tổng số thao tác stack nhiều nhất khoảng `2n`, nên `O(n)`.

### Strict hay inclusive là luật đề

`[2, 2, 3]`:

- next **strictly greater**: `2` không trả lời `2`, dùng `<` trong while;
- next greater-or-equal: `2` có thể trả lời `2`, dùng `<=`.

Đổi một dấu là đổi contract. Luôn tự tạo test duplicate.

---

## 3. Queue: arrival order và head index

### Queue dùng khi nào?

Task nào vào trước được phép xử lý trước: request, người chờ, job FIFO, node BFS. State queue là những việc đã vào nhưng chưa xử lý.

Trong JavaScript, không dequeue bằng `shift()` trong vòng lặp lớn. `shift()` bỏ đầu và phải đổi index phần còn lại. Dùng một array và con trỏ `head`:

```js
function processFifo(tasks) {
  const queue = [...tasks];
  let head = 0;
  const processed = [];

  while (head < queue.length) {
    const task = queue[head];
    head += 1;
    processed.push(task);
  }

  return processed;
}
```

`queue[head..]` chính là các task chưa xử lý. Những phần tử trước `head` là lịch sử và được bỏ qua; không ảnh hưởng đúng/sai.

### Batch queue: task sau có thể bị chặn bởi task trước

Với Phát triển tính năng, mỗi task có ngày hoàn thành. Task đã xong không thể release nếu task phía trước chưa xong. Vì vậy batch được neo bởi ngày của task đầu tiên chưa release.

```js
function releaseFeatureBatches(progresses, speeds) {
  const releaseDays = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index]),
  );

  const batches = [];
  let batchStartDay = releaseDays[0];
  let batchCount = 1;

  for (let index = 1; index < releaseDays.length; index += 1) {
    if (releaseDays[index] <= batchStartDay) {
      batchCount += 1;
    } else {
      batches.push(batchCount);
      batchStartDay = releaseDays[index];
      batchCount = 1;
    }
  }

  batches.push(batchCount);
  return batches;
}
```

Điểm gốc không phải công thức `ceil`. Điểm gốc là FIFO: task ở index sau có release sớm hơn vẫn không được vượt task trước.

---

## 4. BFS: queue là lý do khoảng cách ngắn nhất

Trong graph không trọng số, queue lấy state có khoảng cách nhỏ nhất chưa mở rộng. Các neighbor của nó được enqueue với `distance + 1`; do FIFO, mọi state distance d được mở rộng trước distance d+1.

```js
function shortestUnweightedDistance(graph, start, target) {
  const queue = [[start, 0]];
  const visited = new Set([start]);
  let head = 0;

  while (head < queue.length) {
    const [node, distance] = queue[head++];
    if (node === target) return distance;

    for (const nextNode of graph[node]) {
      if (visited.has(nextNode)) continue;
      visited.add(nextNode);
      queue.push([nextNode, distance + 1]);
    }
  }

  return -1;
}
```

### Vì sao mark visited lúc enqueue?

Graph `A → B`, `A → C`, `B → D`, `C → D`:

- khi xử lý B, ta enqueue D và mark visited;
- đến C, D đã visited nên không enqueue lại.

Nếu chỉ mark khi dequeue, B và C đều có thể enqueue D. Code vẫn có thể trả đúng ở graph nhỏ, nhưng queue lặp rất nhiều và logic “mỗi state một lần” bị mất.

State BFS đôi khi không chỉ là node. Ví dụ mê cung có lever: `(row, col, hasLever)` mới là state; cùng một ô trước/sau lever là hai tình trạng khác nhau.

## 5. Mini-test không ghi pattern

1. Chuỗi gồm `a`, `b`, `c`; xóa mọi cặp kề nhau giống nhau cho đến ổn định. Vì sao stack đúng hơn chỉ duyệt và bỏ qua?
2. Với giá, trả số ngày đến khi có giá thấp hơn đầu tiên. Stack lưu value hay index? Vì sao?
3. Hàng người chờ in vé; mỗi người có thể quay lại cuối hàng nếu chưa đủ điều kiện. Queue update thế nào để không mất thứ tự?
4. Grid có tường, cần ít bước nhất từ S đến E. Queue element phải chứa gì? visited đánh dấu lúc nào?

Sau khi tự làm, dùng [Practice Ladder](03_Practice_Ladder.md) và [bộ đề thật](04_Programmers_PCCP_Set.md). Circular queue và các queue capacity cố định để ở [theory tham chiếu](02_Queue_Circular_BFS.md), vì chúng ít xuất hiện hơn queue/BFS/monotonic trong mục tiêu hiện tại.
