# Stack/Queue để tự giải đề lạ — chọn theo thứ tự xử lý

[← Chương Stack/Queue](../../08_Stack_Queue.md) · [Nhập môn cú pháp](00_Beginner_Guide.md) · [Bộ đề thật](04_Programmers_PCCP_Set.md)

## Câu hỏi duy nhất trước khi chọn cấu trúc

> Phần tử nào trong những phần tử đang chờ phải được xử lý tiếp theo?

| Câu trả lời | Cấu trúc |
| --- | --- |
| Mới vào gần nhất | Stack (LIFO) |
| Vào trước xử lý trước | Queue (FIFO) |
| Chưa biết đáp án, nhưng current mới có thể loại nhiều ứng viên cũ | Monotonic stack |
| State cách start ít bước nhất | BFS queue + visited |

Đừng dùng stack vì đề có chữ “xếp chồng”, hoặc queue vì đề có danh sách. Chính **thứ tự lấy ra** mới quyết định.

## 1. Stack thường — unfinished state nằm trên đỉnh

### Matching: thứ mở gần nhất phải được đóng trước

Với ngoặc, khi gặp `)`, chỉ `(` gần nhất chưa đóng mới có quyền match. Đó là LIFO.

```js
function isValidParentheses(text) {
  const stack = [];
  const matchingOpen = new Map([[")", "("], ["]", "["], ["}", "{"]]);

  for (const character of text) {
    if (character === "(" || character === "[" || character === "{") {
      stack.push(character);
      continue;
    }

    if (stack.pop() !== matchingOpen.get(character)) return false;
  }

  return stack.length === 0;
}
```

**State nghĩa là gì?** Stack chứa đúng các opening chưa được match, theo thứ tự mở. Cuối cùng còn opening nghĩa là chưa đóng đủ.

**Test phá lỗi:** `")("` phải false ngay; `"(()"` phải false sau loop; `""` true.

### Reduction: current có thể triệt tiêu item gần nhất

Trong Game gắp thú hoặc xóa cặp liền nhau, stack không phải “danh sách lịch sử”; nó là output đã rút gọn. Khi current bằng top, pop; khi khác, push.

```js
function removeAdjacentPairs(values) {
  const stack = [];

  for (const value of values) {
    if (stack[stack.length - 1] === value) stack.pop();
    else stack.push(value);
  }

  return stack;
}
```

**Test phá lỗi:** `[1, 2, 2, 1]` trở thành `[]`, cho thấy pop có thể làm current sau đó “gần” top mới.

### Undo

Khi normal command thay state, push state cũ vào stack. Khi `UNDO`, pop state cũ. Đừng push state mới; undo sẽ quay lại chính nó.

## 2. Monotonic stack — các ứng viên chưa có đáp án

Đề hỏi “phần tử lớn hơn đầu tiên phía bên phải”, “giá giữ bao lâu”, “current có thể loại ai?”.

Stack lưu **index chưa biết đáp án**, không lưu đáp án đã xong. Với next greater:

```js
function nextGreaterValues(values) {
  const result = Array(values.length).fill(-1);
  const unresolvedIndexes = [];

  for (let index = 0; index < values.length; index += 1) {
    while (
      unresolvedIndexes.length > 0
      && values[unresolvedIndexes[unresolvedIndexes.length - 1]] < values[index]
    ) {
      const oldIndex = unresolvedIndexes.pop();
      result[oldIndex] = values[index];
    }

    unresolvedIndexes.push(index);
  }

  return result;
}
```

### Vì sao `while` không thành `O(n²)`?

Mỗi index chỉ được push một lần, và một khi pop thì không quay lại stack. Tổng số lần pop cả chương trình tối đa n. `while` nằm trong `for` nhưng tổng vẫn `O(n)`.

**Test phá lỗi:** `[2, 2, 3]` buộc bạn quyết định strict greater (`<`) hay greater-or-equal (`<=`). Dấu so sánh là luật đề, không phải chi tiết vặt.

## 3. Queue — việc đến trước phải được xử lý trước

Trong JavaScript, queue hiệu quả dùng array và `head`, không gọi `shift()` lặp lại.

```js
function processInArrivalOrder(tasks) {
  const queue = [...tasks];
  let head = 0;
  const result = [];

  while (head < queue.length) {
    const task = queue[head++];
    result.push(task);
  }

  return result;
}
```

`shift()` xóa đầu array và dời các phần tử còn lại. Với queue dài, dùng `head` tránh việc đó. MDN xác nhận `shift()` vừa loại phần đầu vừa thay đổi mảng gốc; tra [MDN shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) khi cần API.

### Batch queue: ranh giới nhóm nằm ở đâu?

Phát triển tính năng không xử lý từng task độc lập: task đầu chưa xong thì task sau dù xong cũng phải chờ. Câu hỏi là “điều kiện nào chốt một batch?”. Với mỗi phần tử mới, nó ở cùng batch nếu ngày hoàn thành không vượt ngày đầu batch; nếu vượt thì flush batch cũ.

### Capacity/time queue: queue không chỉ giữ item

Xe tải qua cầu cần biết item nào còn trên cầu và lúc nào nó rời/cân nặng đang chiếm. State queue có thể là `[leaveTime, weight]`, cùng `currentWeight`.

Đây là simulation + queue: simulation quyết định thời gian, queue giữ thứ tự rời cầu.

## 4. Queue cho BFS — queue quyết định khoảng cách

BFS không phải “dùng queue là xong”. State trong queue phải là một vị trí hợp lệ, và visited phải đánh dấu **khi enqueue**.

```js
function shortestDistance(graph, start, target) {
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

Khi node được enqueue, đây là đường ngắn nhất đầu tiên tới node trong graph không trọng số. Nếu đợi dequeue mới mark, nhiều parent có thể enqueue cùng node làm queue phình to và logic khó kiểm soát.

## 5. Những “false friend” phải tránh

| Nhìn thấy | Chưa chắc là |
| --- | --- |
| Cần chọn priority cao nhất liên tục | Queue — có thể cần heap |
| Duyệt mê cung để tìm đường ngắn | Stack — phải BFS queue |
| Mảng cần bỏ các item không hợp lệ | Stack — đôi khi filter thường đủ |
| Cần undo nhiều loại state | Chỉ stack — phải định nghĩa snapshot/transition trước |
| Có `queue` trong code | BFS — có thể chỉ là FIFO simulation |

## 6. Lộ trình đề thật

1. **Không thích số giống nhau** — reduction stack.
2. **Dấu ngoặc đúng** — matching và empty cuối.
3. **Phát triển tính năng** — batch FIFO.
4. **Process** — re-enqueue khi chưa phải priority hiện tại.
5. **Xe tải qua cầu** — capacity/time queue.
6. **Giá cổ phiếu** — stack phiên bản đơn giản rồi monotonic stack.
7. **Tạo số lớn** — monotonic stack + số lần xóa.
8. **Số lớn hơn phía sau** — unresolved index stack.
9. **Đường ngắn nhất bản đồ game** — BFS shortest path.
10. **Khai thác dầu** — component BFS, queue là frontier.

Đọc đề tự chứa tại [bộ 22 bài](04_Programmers_PCCP_Set.md); làm trước khi mở [solutions](../../solutions/08_Stack_Queue_Programmers_Solutions.md).

## 7. Bài kiểm tra mastery Stack/Queue

1. Viết bracket matcher, tự test `""`, `"([)]"`, `"([])"`, `"(()"`.
2. Với `[2, 2, 3]`, tự chọn dấu so sánh cho next **strictly greater** và giải thích.
3. Viết queue `head` index; cấm dùng `shift()`.
4. Vẽ một graph có hai đường cùng vào node X. Giải thích tại sao visited phải mark lúc enqueue.
5. Cho hàng xe, mỗi xe có `arrival`, `weight`, `leaveTime`; nói rõ queue giữ gì và biến nào phải cập nhật khi xe vào/ra.

Không làm được câu nào thì quay đúng mục 1–4, không đọc lại toàn bộ bài.

## Nguồn research và cách dùng

- [Programmers Stack/Queue Kit](https://school.programmers.co.kr/learn/courses/30/parts/12081) hiện có sáu bài lõi, từ reduction/matching đến batching, scheduling, capacity queue và stock duration. Lộ trình ở mục 6 bắt đầu từ đúng các biến thể đó.
- [Programmers Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit) mô tả rõ Stack/Queue là nhóm LIFO/FIFO; lesson mở rộng thêm monotonic stack và BFS vì đây là hai transfer quan trọng khi thi PCCP.
- [PCCP preparation course](https://school.programmers.co.kr/learn/courses/14760/14760-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-pccp-%ED%95%A9%EA%B2%A9-%EB%8C%80%EB%B9%84-%EC%8B%A4%EC%A0%84-%EB%AA%A8%EC%9D%98%EA%B3%A0%EC%82%AC-%ED%95%B4%EC%84%A4-%EA%B0%95%EC%9D%98python%ED%8E%B8) được dùng để đối chiếu phạm vi PCCP rộng hơn; không lấy code/nội dung trả phí từ khóa học.
- API được đối chiếu với [MDN Array.shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift); trong bài input lớn vẫn dùng `head` index để không dời lại cả array.
