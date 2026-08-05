# Chapter 08 — Practice Ladder

[← Index](../../08_Stack_Queue.md) · [Lời giải](../../solutions/08_Stack_Queue_Solutions.md)

## Tầng 1 — Nhận diện (12)

Với mỗi đề ghi ID, order lấy state, state tối thiểu và invariant.

### S08-R01 `[SQ-01]`
Kiểm tra ba loại dấu ngoặc lồng đúng.
### S08-R02 `[SQ-01]`
Editor có lệnh `TYPE x` và `UNDO`; cần khôi phục thao tác mới nhất.
### S08-R03 `[SQ-02]`
Với mỗi ngày, tìm nhiệt độ cao hơn đầu tiên bên phải và khoảng cách.
### S08-R04 `[SQ-02]`
Next greater-or-equal: chỉ ra condition pop khác strict greater.
### S08-R05 `[SQ-03]`
Xử lý ticket theo thứ tự đến, ticket mới có thể sinh ticket khác.
### S08-R06 `[SQ-03]`
Xử lý queue theo từng batch hiện có; item sinh trong batch chỉ sang batch sau.
### S08-R07 `[SQ-04]`
Buffer capacity cố định phải reject khi full.
### S08-R08 `[SQ-04]`
Giải thích vì sao `head===tail` chưa đủ phân biệt full/empty.
### S08-R09 `[SQ-05]`
Shortest path trên graph không trọng số.
### S08-R10 `[SQ-05]`
Lan truyền từ nhiều nguồn cùng lúc; seed mọi nguồn distance 0.
### S08-R11 `[SQ-03/SQ-05]`
Queue có duplicate state do mark visited khi dequeue; sửa thời điểm mark.
### S08-R12 `[SQ-01/SQ-03]`
Task mới nhất hay task cũ nhất phải chạy trước? Chọn stack/queue từ contract.

## Tầng 2 — Điền khuyết (3)

### S08-F01 `[SQ-01]`
```js-fill
if (isOpen(char)) stack.___(char);
else if (stack.___() !== matching.get(char)) return false;
return stack.___ === 0;
```

### S08-F02 `[SQ-02]`
```js-fill
while (stack.length && values[index] > values[stack[stack.length - 1]]) {
  const previous = stack.___();
  answer[previous] = ___ - previous;
}
stack.___(index);
```

### S08-F03 `[SQ-03/SQ-05]`
```js-fill
const queue = [start];
let head = 0;
visited[start] = true;
while (___ < queue.length) {
  const current = queue[___++];
}
```

## Tầng 3 — Dựng logic (3)

### S08-L01 `[SQ-01]`
Evaluate postfix với số và `+,-,*`; nêu order operand cho phép trừ.
### S08-L02 `[SQ-03]`
Round-robin: lấy đầu queue, trừ quantum, unfinished thì enqueue lại. Không dùng `shift()`.
### S08-L03 `[SQ-04]`
Viết state/check/update cho circular queue capacity 1 và 3.

## Transfer Test A

### S08-T01 — Undo có ngưỡng `[SQ-01/SQ-03]`

Stream command FIFO gồm `ADD x`, `UNDO`, `COMMIT`. Queue đọc command theo order; stack giữ các `ADD` chưa commit. `UNDO` bỏ ADD gần nhất; `COMMIT` cộng toàn bộ pending vào kết quả rồi xóa stack. Trả các value đã commit.

## Tầng 4 — Pseudocode (3)

### S08-P01 `[SQ-02]`
Previous smaller strict cho mỗi index; không có trả -1. Chọn chiều scan và condition pop.
### S08-P02 `[SQ-03]`
Mỗi batch xử lý đúng số item có ở đầu batch; item sinh ra để batch kế.
### S08-P03 `[SQ-05]`
Multi-source BFS trên grid 0/1; trả distance tới nguồn gần nhất cho mọi ô đi được.

## Tầng 5 — Tự code (3)

### S08-C01 `[SQ-01]` — Bracket matcher
Viết matcher ba loại ngoặc; ký tự khác bỏ qua; empty true.
### S08-C02 `[SQ-02]` — Next greater distance
Trả distance tới value strict greater đầu tiên bên phải, không có trả 0.
### S08-C03 `[SQ-05]` — BFS distance
Adjacency list; trả distance từ start, unreachable -1; mark khi enqueue.

## Tầng 6 — Biến thể (3)

### S08-V01 `[SQ-02]`
Đổi next greater strict thành greater-or-equal; viết full implementation và revealing duplicate test.
### S08-V02 `[SQ-04]`
Circular queue khi full overwrite oldest thay vì reject; nêu update head/tail/size.
### S08-V03 `[SQ-05]`
Multi-source BFS graph; sources có duplicate và có thể empty.

## Transfer Test B

### S08-T02 — Lan truyền có undo log `[SQ-05/SQ-01]`

BFS lan từ nhiều nguồn trên graph; mỗi lần discover node, push `{node,oldDistance}` vào history stack. Viết `rollback(k)` khôi phục k discovery cuối để minh họa queue quyết định thứ tự explore còn stack quyết định thứ tự undo. Không cần tiếp tục BFS sau rollback.

## Mini-test S08-M01 — 50 phút

1. **S08-M01.1 `[SQ-01]`:** simplify path tuyệt đối với `.`, `..` bằng stack.
2. **S08-M01.2 `[SQ-03]`:** mô phỏng hot-potato queue bằng head index; item sống sót enqueue lại.
3. **S08-M01.3 `[SQ-05]`:** shortest moves từ `start` tới `target` với transitions `x-1,x+1,2*x` trong bound `[0,max]`.

