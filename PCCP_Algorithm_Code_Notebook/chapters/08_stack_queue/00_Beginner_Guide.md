# Stack/Queue nhập môn — Chọn đúng thứ tự lấy dữ liệu

[← Index](../../08_Stack_Queue.md) · [Tiếp: Stack →](01_Stack_Monotonic.md)

## 1. Một câu phân biệt

```text
Stack: phần tử vào sau được lấy ra trước — LIFO.
Queue: phần tử vào trước được lấy ra trước — FIFO.
```

Hãy tưởng tượng:

- Stack là chồng đĩa: chỉ lấy chiếc trên cùng.
- Queue là hàng chờ: người đến trước được phục vụ trước.

Cả hai đều giữ nhiều phần tử. Khác biệt quan trọng không nằm ở dữ liệu, mà nằm ở **thứ tự phần tử nào được phép đi ra tiếp theo**.

## 2. Stack trong JavaScript

Array đã đủ để làm stack:

```js
const stack = [];

stack.push("A"); // ["A"]
stack.push("B"); // ["A", "B"]

const top = stack[stack.length - 1]; // "B", chỉ xem
const removed = stack.pop();         // "B", xem và xóa
```

| Thao tác | JavaScript | Độ phức tạp |
| --- | --- | --- |
| Push lên đỉnh | `stack.push(value)` | amortized `O(1)` |
| Xem đỉnh | `stack.at(-1)` | `O(1)` |
| Pop đỉnh | `stack.pop()` | `O(1)` |
| Kiểm tra rỗng | `stack.length === 0` | `O(1)` |

### Khi nào nghĩ đến stack?

```text
Dấu đóng cần ghép dấu mở gần nhất.
UNDO cần đảo thao tác mới nhất.
Phần tử hiện tại loại các ứng viên gần nhất ở bên trái.
Cần giữ những việc chưa hoàn tất theo thứ tự lồng nhau.
```

## 3. Ví dụ stack — Dấu ngoặc hợp lệ

```js
function isValidParentheses(text) {
  const stack = [];

  for (const character of text) {
    // Bước 1: Dấu mở là một việc chưa hoàn tất, nên push.
    if (character === "(") {
      stack.push(character);
      continue;
    }

    // Bước 2: Dấu đóng phải khép đúng dấu mở gần nhất.
    if (stack.length === 0) {
      return false;
    }
    stack.pop();
  }

  // Bước 3: Còn dấu mở nghĩa là vẫn có việc chưa được khép.
  return stack.length === 0;
}
```

Invariant:

```text
Sau khi đọc một prefix, stack chứa đúng các dấu mở chưa được đóng.
```

Dry run `(()())`:

| Ký tự | Stack trước | Hành động | Stack sau |
| --- | --- | --- | --- |
| `(` | `[]` | push | `[(]` |
| `(` | `[(]` | push | `[(,(]` |
| `)` | `[(,(]` | pop | `[(]` |
| `(` | `[(]` | push | `[(,(]` |
| `)` | `[(,(]` | pop | `[(]` |
| `)` | `[(]` | pop | `[]` |

## 4. Queue trong JavaScript

Cách dễ nghĩ nhưng không nên dùng cho queue dài:

```js
const first = queue.shift();
```

`shift()` phải dời index của các phần tử còn lại. Gọi lặp lại có thể làm chương trình chậm thành `O(n²)`.

Dùng array và con trỏ `head`:

```js
const queue = [];
let head = 0;

queue.push("A"); // enqueue
queue.push("B");

const first = queue[head++]; // dequeue logic: "A"
const second = queue[head++]; // "B"
```

Phần queue chưa xử lý luôn là:

```text
queue[head..queue.length-1]
```

### Template queue động

```js
const queue = [start];
let head = 0;

while (head < queue.length) {
  const current = queue[head++];

  for (const next of expand(current)) {
    queue.push(next);
  }
}
```

Item mới được `push` vào cuối vẫn được xử lý vì `queue.length` có thể tăng trong lúc vòng lặp chạy.

## 5. Ví dụ queue — Xử lý tác vụ FIFO

```js
function completionTimes(durations) {
  const queue = [...durations];
  const answer = [];
  let head = 0;
  let elapsedTime = 0;

  while (head < queue.length) {
    // Bước 1: Lấy tác vụ đến sớm nhất còn chờ.
    const duration = queue[head++];

    // Bước 2: Thời gian hoàn tất là tổng thời gian đã xử lý.
    elapsedTime += duration;
    answer.push(elapsedTime);
  }

  return answer;
}
```

Invariant:

```text
Mọi item trước head đã được xử lý đúng một lần và theo đúng thứ tự FIFO.
```

## 6. Stack hay queue?

| Câu hỏi | Chọn |
| --- | --- |
| Ai đến sau nhất cần xử lý trước? | Stack |
| Ai đến trước nhất cần xử lý trước? | Queue |
| Closing token ghép opening nào? | Stack |
| UNDO thao tác nào? | Stack |
| Xử lý công việc theo thứ tự đến? | Queue |
| Lan từng lớp/khoảng cách? | Queue/BFS |
| Tìm phần tử lớn hơn kế tiếp? | Monotonic stack |

## 7. Monotonic stack dễ hiểu

Stack thường chỉ quan tâm thứ tự vào/ra. Monotonic stack thêm một invariant về value.

Ví dụ tìm số lớn hơn đầu tiên bên phải:

```js
function nextGreaterValues(values) {
  const answer = Array(values.length).fill(-1);
  const unresolvedIndexes = [];

  for (let index = 0; index < values.length; index++) {
    // Current giải quyết liên tiếp các index nhỏ hơn đang chờ ở top.
    while (
      unresolvedIndexes.length > 0 &&
      values[index] > values[unresolvedIndexes.at(-1)]
    ) {
      const resolvedIndex = unresolvedIndexes.pop();
      answer[resolvedIndex] = values[index];
    }

    // Index hiện tại chưa có đáp án bên phải nên bắt đầu chờ.
    unresolvedIndexes.push(index);
  }

  return answer;
}
```

Mỗi index được push một lần và pop tối đa một lần, nên vòng `while` lồng bên trong vẫn cho tổng `O(n)`.

## 8. Queue và BFS

BFS không đồng nghĩa với queue. BFS là thuật toán quyết định thứ tự khám phá theo lớp; queue là cấu trúc giúp duy trì thứ tự đó.

```text
Algorithm owner: BFS quyết định node distance nhỏ được mở rộng trước.
State helper: queue giữ frontier theo FIFO; visited/distance chống enqueue trùng.
```

Quy tắc quan trọng:

```js
// Mark trước hoặc đúng lúc enqueue.
distance[next] = distance[current] + 1;
queue.push(next);
```

Không chờ đến lúc dequeue mới mark, vì nhiều parent có thể enqueue cùng một node.

## 9. Những lỗi người mới hay gặp

1. Dùng `shift()` trong queue lớn.
2. Dùng queue khi contract cần thao tác mới nhất.
3. Pop stack rồi mới đọc index/value cần ghi đáp án.
4. Monotonic stack dùng `if` thay vì `while`.
5. Nhầm strict `>` với greater-or-equal `>=`.
6. BFS mark visited quá muộn.
7. Queue theo batch nhưng không chụp `batchSize` trước vòng con.
8. Circular queue dùng `head === tail` mà không có `size`.

## 10. Checklist trước khi sang theory

- [ ] Nói được LIFO và FIFO bằng ví dụ.
- [ ] Dùng được `push/pop/top` cho stack.
- [ ] Viết queue bằng `head`, không dùng `shift()`.
- [ ] Nói được invariant của stack chưa hoàn tất.
- [ ] Nói được pending interval `[head, queue.length)`.
- [ ] Giải thích được vì sao monotonic stack là `O(n)`.
- [ ] Biết BFS mark visited khi enqueue.

Sau đó học [Stack và monotonic stack](01_Stack_Monotonic.md).
