# PF11 — Local-state dynamic programming

Nguồn: [OF032](../official-lessons/OF032.md), [OF033](../official-lessons/OF033.md), [OF035](../official-lessons/OF035.md).

## 1. Tín hiệu nhận dạng

Bài có nhiều cách đi/chọn tạo overlapping subproblems; optimum/count tại vị trí hiện tại chỉ cần vài state lân cận đã giải: hai child trong tam giác, ô trên/trái trong grid, hoặc chọn/bỏ phần tử trước trên line.

DP không bắt đầu từ công thức. Nó bắt đầu từ câu: **future cần biết tối thiểu thông tin gì về prefix?**

## 2. Không dùng khi

- Graph state không có thứ tự topo tự nhiên và edge weight đồng đều: BFS có thể là đúng abstraction.
- State phải chứa gần như toàn bộ lịch sử, khiến số state bùng nổ.
- Greedy có exchange proof đơn giản.
- Chỉ enumerate rất ít candidate không lặp; case analysis đủ.

## 3. Decision tree

```text
State là position trong DAG?        → topo/bottom-up DP
Mỗi ô nhận từ trên/trái?             → grid DP
Chọn item cấm chọn hàng xóm?         → take/skip hoặc rolling DP
Line biến thành circle?              → split case đầu chọn/không chọn
Cần count?                           → transition cộng
Cần optimum?                         → min/max
Cần reconstruct path?                → lưu parent/choice
```

## 4. Knobs tạo biến thể

- Count, min, max hay existence quyết định operator.
- Obstacle tạo base zero và chặn transition.
- Modulo áp dụng sau mỗi phép cộng.
- Cho đi những hướng nào; có cycle hay không.
- Circle/endpoint dependency.
- Giá trị âm: base `0` đôi khi vô tình cho phép “không chọn gì”.
- Cần value thôi hay cần cả đường đi.

## 5. Thiết kế state và invariant

Đặt câu đầy đủ, ví dụ `dp[r][c] = số đường hợp lệ từ start tới ô (r,c)` hoặc `dp[i] = tổng lớn nhất dùng các nhà trong prefix 0..i và không lấy kề nhau`. Nếu không nói được câu này, transition dễ trộn ý nghĩa.

Bottom-up invariant: trước khi tính state hiện tại, mọi predecessor mà transition đọc đã đúng. Với rolling DP, các biến scalar phải vẫn đại diện đúng `dp[i-2]`, `dp[i-1]` trước update.

Circle không thể dùng thẳng line DP vì nhà đầu và cuối kề nhau. Split thành hai case exhaustive, disjoint theo constraint: bỏ cuối hoặc bỏ đầu.

## 6. Code core đáng thuộc

```js
function maxNonAdjacent(values) {
  let twoBack = 0;
  let oneBack = 0;
  for (const value of values) {
    const current = Math.max(oneBack, twoBack + value);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}
```

```js
function countGridPaths(rows, columns, blocked, modulo) {
  const dp = Array.from({ length: rows }, () => Array(columns).fill(0));
  dp[0][0] = blocked.has("0,0") ? 0 : 1;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if ((row === 0 && column === 0) || blocked.has(`${row},${column}`)) continue;
      const fromTop = row > 0 ? dp[row - 1][column] : 0;
      const fromLeft = column > 0 ? dp[row][column - 1] : 0;
      dp[row][column] = (fromTop + fromLeft) % modulo;
    }
  }
  return dp[rows - 1][columns - 1];
}
```

## 7. Counterexamples bóc lỗi

- Circle `[10,1,1,10]`: line DP chọn cả đầu và cuối trái luật.
- Grid obstacle tại start: set `dp[0][0]=1` vô điều kiện báo đường giả.
- Puddle coordinate thường cho `(x,y)` nhưng array dùng `[row][column]`; phải đổi rõ.
- Tam giác có số âm: khởi tạo ngoài biên bằng 0 có thể tạo đường không tồn tại tốt giả.
- Rolling update sai thứ tự làm `twoBack` và `oneBack` cùng trỏ state mới.

## 8. Drills biến thể

### Drill A — reconstruct lựa chọn

Ngoài best value, lưu `take[i]` hoặc parent. Khi tie, định nghĩa tie-break trước. Rolling DP không đủ để reconstruct nếu không lưu thêm quyết định.

### Drill B — grid có diagonal

Thêm predecessor `(r-1,c-1)`. Nếu diagonal có cost khác hoặc obstacle crossing rule, transition phải phản ánh contract; không chỉ cộng máy móc.

### Drill C — chọn không kề trong circle và bắt buộc chọn ít nhất một

Với toàn số âm, base 0 của bản cho phép bỏ hết sẽ sai. Đổi state/base để represent “đã chọn” hoặc dùng `-Infinity` cho state impossible.

### Drill D — memory compression

Grid chỉ đọc row trên và cell trái nên có thể dùng array 1D. Giải thích tại update `dp[c]` cũ là top, `dp[c-1]` mới là left.

## 9. Câu hỏi mở tư duy

- Một state mang câu tiếng Việt chính xác nào?
- Predecessor có tạo DAG và thứ tự tính nào?
- Base case là nghiệm thật hay state impossible?
- Operator là cộng/min/max và identity tương ứng là gì?
- Circle/global constraint cần thêm dimension hay split case?

## 10. Checklist 15 giây

Viết ra: **state sentence, dimensions, base, transition, compute order, impossible value, answer location, complexity và có cần reconstruction không**.
