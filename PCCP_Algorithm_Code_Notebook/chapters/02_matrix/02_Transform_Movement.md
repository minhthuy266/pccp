# Matrix transform và movement bridge — `MAT-04..05`

[← Traversal](01_Traversal.md) · [Practice →](03_Practice_Ladder.md)

## Dạng 4 `[MAT-04]` — Transpose, rotate và reflect

**Dấu hiệu nhận dạng:** mỗi source cell đi tới đúng một tọa độ output theo công thức shape/coordinate; không phải di chuyển theo command.

### A. Bản chất

Mỗi source cell đi tới đúng một destination coordinate. Cách an toàn là viết công thức shape output và mapping tọa độ trước code. Transpose matrix `rows×cols` tạo `cols×rows`; rotate 90° clockwise cũng đổi shape thành `cols×rows`.

### B. Mental model

Dán nhãn `(row,col)` lên từng ô rồi chuyển nhãn sang một bảng mới theo công thức; không “xoay bằng mắt”.

### C. Template tư duy

```text
Source shape: rows×cols. Destination shape là gì?
Duyệt: mọi source (row,col).
State: output với các row độc lập.
Mapping: (row,col) → (nextRow,nextCol).
Invariant: mọi source trước current đã được đặt đúng một lần.
Return: output; input có được mutate không?
```

### D. Template code

```js
const output = Array.from({ length: outputRows }, () => Array(outputCols));
for (let row = 0; row < rows; row += 1) {
  for (let col = 0; col < cols; col += 1) {
    const [nextRow, nextCol] = mapCoordinate(row, col, rows, cols);
    output[nextRow][nextCol] = matrix[row][col];
  }
}
```

### E. Bài mẫu — Xoay 90° theo chiều kim đồng hồ

1. **Đề:** trả matrix mới rotate clockwise; empty trả `[]`.  
2. **I/O:** `[[1,2,3],[4,5,6]] → [[4,1],[5,2],[6,3]]`.  
3. **Kể lại:** cột source trở thành row destination; row source đảo thành col.  
4. **Brute:** transpose rồi reverse từng row; đúng nhưng hai giai đoạn và intermediate.  
5. **Bottleneck:** không runtime; dễ nhầm formula/shape.  
6. **Vì sao hợp:** direct coordinate mapping một lượt.  
7. **State:** output `cols×rows`.  
8. **Transition:** `(r,c) → (c, rows-1-r)`.  
9. **Invariant:** mỗi source đã duyệt nằm đúng destination; không collision vì mapping một-một.  
10. **Pseudocode:** empty; rows/cols; allocate cols rows; nested source; assign formula; return.  
11. **Full code:**

```js
function rotateClockwise(matrix) {
  const rows = matrix.length;
  if (rows === 0) return [];
  const cols = matrix[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows));

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const nextRow = col;
      const nextCol = rows - 1 - row;
      rotated[nextRow][nextCol] = matrix[row][col];
    }
  }
  return rotated;
}
```

12. `Array.from` tạo row riêng; `.fill(Array(rows))` làm shared rows. Công thức dùng `rows` cho nextCol, không `cols`, vì destination có số col bằng source rows.  
13. **Dry run:**

| Bước | Source | State trước | Mapping | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | (0,0)=1 | empty 3×2 | →(0,1) | set | row0 `[_,1]` |
| 1 | (0,1)=2 | ... | →(1,1) | set | row1 `[_,2]` |
| 2 | (0,2)=3 | ... | →(2,1) | set | row2 `[_,3]` |
| 3 | (1,0)=4 | ... | →(0,0) | set | row0 `[4,1]` |
| 5 | (1,2)=6 | ... | →(2,0) | set | `[[4,1],[5,2],[6,3]]` |

14. `O(rows*cols)` time and output space. 15. allocate wrong shape; shared rows; use cols in nextCol; mutate input unexpectedly. 16. Biến thể transpose: mapping `(r,c)→(c,r)`; reflect horizontal: `(r,c)→(r,cols-1-c)`.

**Recall Card `[MAT-04]`:** shape trước, formula sau, allocate independent rows. **Blank Page:** rotate 2×3 với coordinate labels. **Mutation:** transpose; counterclockwise; reflect. **Explain Back:** vì sao output cols×rows? Công thức được suy từ góc nào? Mapping có collision không?

## Dạng 5 `[MAT-05]` — Di chuyển và bridge sang flood fill

**Dấu hiệu nhận dạng:** state có vị trí/frontier và transition sang neighbor phải qua bounds, obstacle, visited hoặc rule hợp lệ.

### A. Bản chất

Hai họ dùng cùng primitive `next coordinate + bounds/content check` nhưng khác engine. Simulation có một/vài vị trí và command quyết định bước tiếp. Flood fill có frontier chứa nhiều cell và `visited` ngăn lặp. Không gọi mọi movement là BFS/DFS.

### B. Mental model

Robot làm theo tờ lệnh là simulation; vết mực lan ra mọi ô kề là traversal. Cùng bản đồ, khác người quyết định “bước tiếp theo”.

### C. Template tư duy

```text
Simulation: state=(row,col,direction...), event=command, transition thử next rồi commit nếu valid.
Flood fill: state=frontier+visited, transition sinh mọi neighbor valid chưa thăm.
Bounds/content check dùng MAT-03.
Invariant simulation: position là kết quả sau prefix commands.
Invariant traversal: visited chứa đúng cells đã discover; mark trước enqueue/push.
```

### D. Template code

```js
const nextRow = row + rowDelta;
const nextCol = col + colDelta;
if (isInside(nextRow, nextCol) && isPassable(nextRow, nextCol)) {
  row = nextRow;
  col = nextCol;
}
```

### E. Bài mẫu — Robot đi theo command, gặp tường thì đứng yên

1. **Đề:** grid gồm `S`, `.`, `#`; commands `U/D/L/R`. Mỗi command thử một bước; ngoài biên/tường thì không di chuyển. Trả `[row,col]`.  
2. **I/O:** `[['S','.','#'],['.','.','.']]`, `['R','R','D'] → [1,1]`.  
3. **Kể lại:** start (0,0); R tới (0,1); R bị # nên đứng; D tới (1,1).  
4. **Brute:** command switch với logic bounds lặp bốn lần.  
5. **Bottleneck:** duplicated validation dễ lệch.  
6. **Vì sao hợp:** map command→delta, dùng một transition chung.  
7. **State:** current row/col; command deltas; grid constants.  
8. **Transition:** compute next; invalid giữ state; valid commit both coordinates.  
9. **Invariant:** sau command i, position đúng theo prefix `0..i`.  
10. **Pseudocode:** find S; for command get delta; next; bounds; wall; commit; return.  
11. **Full code:**

```js
function moveRobot(grid, commands) {
  const rows = grid.length;
  const cols = grid[0].length;
  const deltaByCommand = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1],
  };

  let currentRow = 0;
  let currentCol = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (grid[row][col] === "S") {
        currentRow = row;
        currentCol = col;
      }
    }
  }

  for (const command of commands) {
    const [rowDelta, colDelta] = deltaByCommand[command];
    const nextRow = currentRow + rowDelta;
    const nextCol = currentCol + colDelta;
    const isInside = nextRow >= 0 && nextRow < rows
      && nextCol >= 0 && nextCol < cols;
    if (!isInside || grid[nextRow][nextCol] === "#") continue;
    currentRow = nextRow;
    currentCol = nextCol;
  }
  return [currentRow, currentCol];
}
```

12. Compute candidate without mutating current; commit row/col cùng nhau chỉ sau validation. Access grid sau `isInside`; short-circuit `||` bảo vệ read. Start scan có thể return helper nếu contract đúng một S.  
13. **Dry run:**

| Bước | Command/current | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| init | S | — | found (0,0) | set | (0,0) |
| 0 | R | (0,0) | (0,1) passable | commit | (0,1) |
| 1 | R | (0,1) | (0,2) wall | skip | (0,1) |
| 2 | D | (0,1) | (1,1) passable | commit | (1,1) |

14. `O(rows*cols + commands)`, `O(1)` extra. 15. commit row trước validation; read out of bounds; use `shift` irrelevant; confuse command traversal with BFS. 16. Biến thể flood fill reachable count: replace command loop by stack/queue; add `visited`; generate all four directions and mark when discover.

**Recall Card `[MAT-05]`:** candidate→validate→commit; simulation follows command, traversal expands frontier. **Blank Page:** robot with 1×1 grid. **Mutation:** multi-step command transactional; wrap edges; flood-fill count. **Explain Back:** khi cần visited? Vì sao commit late? Pattern chính/phụ của flood fill là gì?

### Template Contrast — `MAT-04` và `MAT-05`

| Dạng | State | Transition | Invariant | Dấu hiệu |
| --- | --- | --- | --- | --- |
| `MAT-04` | output matrix | mọi source map đúng một destination | processed sources đã đặt | xoay/transpose |
| `MAT-05` | current/frontier | candidate có thể bị reject | position/visited đúng prefix | command/lan vùng |

## Transfer Test B

Làm [M02-T02](03_Practice_Ladder.md#m02-t02--tem-kiểm-kho). Bối cảnh có mã sản phẩm gây nhiễu và yêu cầu mapping ngược.
