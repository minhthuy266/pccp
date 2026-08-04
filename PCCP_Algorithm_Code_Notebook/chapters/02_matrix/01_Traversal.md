# Matrix traversal — `MAT-01..03`

[← Index](../../02_Matrix.md) · [Tiếp →](02_Transform_Movement.md)

## Dạng 1 `[MAT-01]` — Duyệt toàn bộ, theo hàng/cột và tổng

### A. Bản chất

Matrix là array các row; nested loop phải theo shape thật. State có thể là một total chung, accumulator reset theo row, hoặc array totals theo column. Dấu hiệu: mọi ô, tổng/hạng mục theo hàng/cột. Không áp dụng trực tiếp nếu rows có độ dài khác nhau mà đề không đảm bảo rectangular.

### B. Mental model

Quét bảng tính: vòng ngoài chọn hàng, vòng trong đi qua từng cột của chính hàng đó.

### C. Template tư duy

```text
Duyệt: row 0..rows-1, col 0..cols-1.
State: total chung / rowTotal reset mỗi row / columnTotals[col].
Current: matrix[row][col].
Transition: cập nhật accumulator đúng scope.
Invariant vòng trong: state đã gồm các ô trước current trong row.
Invariant vòng ngoài: các row trước đã hoàn tất.
Return: scalar hoặc arrays theo contract.
```

### D. Template code

```js
const rows = matrix.length;
const cols = rows === 0 ? 0 : matrix[0].length;
for (let row = 0; row < rows; row += 1) {
  for (let col = 0; col < cols; col += 1) {
    use(matrix[row][col], row, col);
  }
}
```

### E. Bài mẫu — Tổng từng hàng và từng cột

1. **Đề:** matrix chữ nhật; trả `{rowSums,columnSums}`; empty trả hai array rỗng.  
2. **I/O:** `[[1,2,3],[4,5,6]] → rowSums [6,15], columnSums [5,7,9]`.  
3. **Kể lại:** mỗi ô đóng góp cho đúng một hàng và một cột.  
4. **Brute force:** một pass riêng cho từng row và từng col; vẫn O(rc) nhưng đọc mỗi ô hai lần.  
5. **Bottleneck:** không đáng kể; nguy cơ là nhầm shape/reset.  
6. **Vì sao hợp:** một nested scan cập nhật hai accumulator.  
7. **State:** `rowSums[row]`, `columnSums[col]`.  
8. **Transition:** cộng current vào cả hai.  
9. **Invariant:** sau current, hai arrays phản ánh mọi ô đã quét.  
10. **Pseudocode:** empty; cols; init arrays; nested scan; add two; return.  
11. **Full code:**

```js
function sumRowsAndColumns(matrix) {
  const rows = matrix.length;
  if (rows === 0) return { rowSums: [], columnSums: [] };
  const cols = matrix[0].length;
  const rowSums = Array(rows).fill(0);
  const columnSums = Array(cols).fill(0);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const value = matrix[row][col];
      rowSums[row] += value;
      columnSums[col] += value;
    }
  }
  return { rowSums, columnSums };
}
```

12. Empty check phải trước `matrix[0]`. `columnSums` dài cols, không rows. Hai updates dùng cùng current; bỏ một update khiến một half output sai.  
13. **Dry run:**

| Bước | Ô hiện tại | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | (0,0)=1 | rows `[0,0]`, cols `[0,0,0]` | — | cộng row0/col0 | `[1,0]`, `[1,0,0]` |
| 1 | (0,1)=2 | ... | — | cộng row0/col1 | `[3,0]`, `[1,2,0]` |
| 2 | (0,2)=3 | ... | — | cộng row0/col2 | `[6,0]`, `[1,2,3]` |
| 3 | (1,0)=4 | ... | — | cộng row1/col0 | `[6,4]`, `[5,2,3]` |
| 5 | (1,2)=6 | ... | — | cộng row1/col2 | `[6,15]`, `[5,7,9]` |

14. `O(rows*cols)` time, `O(rows+cols)` output. 15. cols=rows; đọc matrix[0] khi empty; reset column sum theo row; shared reference nếu output 2D. 16. Biến thể trả max từng row: reset best tại đầu mỗi row, không dùng column state.

**Recall Card `[MAT-01]`:** shape thật; accumulator scope; mỗi ô đóng góp đúng nơi. **Blank Page:** sums cho 2×3. **Mutation:** row max; count negatives per col; ragged rows. **Explain Back:** vì sao empty check trước cols? row/col state khác lifetime ra sao? Invariant lồng nhau là gì?

## Dạng 2 `[MAT-02]` — Hai đường chéo

### A. Bản chất

Với matrix vuông `n×n`, chéo chính có `(i,i)`, chéo phụ có `(i,n-1-i)`. Chỉ cần một loop. Nếu đề hỏi tổng union của hai chéo, ô giữa khi n lẻ trùng nhau và chỉ được tính một lần.

### B. Mental model

Hai đường đi từ hai góc trên xuống: một cột tăng cùng row, một cột giảm đối xứng.

### C. Template tư duy

```text
Duyệt i=0..n-1.
Main cell: [i][i]. Anti cell: [i][n-1-i].
State: mainSum, antiSum hoặc unionSum.
Condition: i === n-1-i nếu cần tránh center duplicate.
Invariant: sums đúng cho rows 0..i đã xét.
```

### D. Template code

```js
for (let index = 0; index < size; index += 1) {
  mainSum += matrix[index][index];
  antiSum += matrix[index][size - 1 - index];
}
```

### E. Bài mẫu — Tổng hợp của hai đường chéo không đếm trùng

1. **Đề:** matrix vuông; tổng mọi ô nằm trên ít nhất một đường chéo.  
2. **I/O:** `[[1,2,3],[4,5,6],[7,8,9]] → 25`.  
3. **Kể lại:** main 1+5+9, anti 3+5+7; số 5 chỉ một lần.  
4. **Brute:** nested scan, check `r===c || r+c===n-1`.  
5. **Bottleneck:** đọc n² ô dù chỉ 2n-1 ô liên quan.  
6. **Vì sao hợp:** tọa độ đường chéo tính trực tiếp.  
7. **State:** `diagonalSum`.  
8. **Transition:** luôn cộng main; nếu anti col khác main col thì cộng anti.  
9. **Invariant:** sum là union diagonal của rows đã xử lý.  
10. **Pseudocode:** sum0; loop i; add main; antiCol; nếu khác i add anti.  
11. **Full code:**

```js
function sumDiagonalUnion(matrix) {
  const size = matrix.length;
  let diagonalSum = 0;
  for (let index = 0; index < size; index += 1) {
    diagonalSum += matrix[index][index];
    const antiColumn = size - 1 - index;
    if (antiColumn !== index) {
      diagonalSum += matrix[index][antiColumn];
    }
  }
  return diagonalSum;
}
```

12. `antiColumn !== index` chính xác cho center; check theo value sẽ sai nếu hai ô khác nhau có cùng number. Input phải vuông; rectangular không có định nghĩa hai chéo này mặc định.  
13. **Dry run:**

| Bước | Ô/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | main1, anti3 | 0 | col2≠0 | +1+3 | 4 |
| 1 | main5, anti5 | 4 | col1=1 | +5 một lần | 9 |
| 2 | main9, anti7 | 9 | col0≠2 | +9+7 | 25 |

14. `O(n)` time, `O(1)` space. 15. center twice; anti formula `n-i`; compare values; assume square silently. 16. Biến thể trả hai sums riêng: luôn cộng cả hai, center có quyền thuộc cả hai kết quả.

**Recall Card `[MAT-02]`:** main col=i; anti col=n-1-i; union cần center condition. **Blank Page:** trace n=1 và n=2. **Mutation:** product diagonals; replace diagonal; X border. **Explain Back:** vì sao O(n)? Khi center tồn tại? Hai sums riêng có đếm center hai lần “sai” không?

## Dạng 3 `[MAT-03]` — Láng giềng 4/8 hướng và kiểm tra biên

### A. Bản chất

Tách direction khỏi logic giúp không lặp bốn block dễ lệch. Luôn tạo `(nextRow,nextCol)`, kiểm bounds, rồi mới đọc matrix. Bốn hướng cho cạnh chung; tám hướng thêm đường chéo.

### B. Mental model

Từ một ô, thử từng bước trong danh sách hợp lệ; bước ra ngoài bản đồ bị chặn trước khi đặt chân.

### C. Template tư duy

```text
State hiện tại: row,col.
Directions: cặp delta.
Transition candidate: next = current + delta.
Condition order: bounds → obstacle/value → visited.
Invariant: mọi neighbor đưa vào output/frontier là tọa độ tồn tại và hợp lệ.
```

### D. Template code

```js
for (const [rowDelta, colDelta] of directions) {
  const nextRow = row + rowDelta;
  const nextCol = col + colDelta;
  const isInside = nextRow >= 0 && nextRow < rows
    && nextCol >= 0 && nextCol < cols;
  if (!isInside) continue;
  use(matrix[nextRow][nextCol]);
}
```

### E. Bài mẫu — Đếm láng giềng 4 hướng có giá trị lớn hơn

1. **Đề:** cho matrix và `(row,col)` hợp lệ; đếm neighbor up/down/left/right lớn hơn current.  
2. **I/O:** `[[1,5,2],[4,3,7]], (1,1) → 3` (5, 4 và 7).  
3. **Kể lại:** thử bốn vị trí, bỏ vị trí ngoài, so value.  
4. **Brute:** viết bốn if riêng.  
5. **Bottleneck:** không phải complexity; duplication gây sai bounds/hướng.  
6. **Vì sao hợp:** direction array thống nhất transition.  
7. **State:** count, currentValue, rows/cols.  
8. **Transition:** candidate inside và value lớn hơn→count++.  
9. **Invariant:** count đúng cho directions đã xét.  
10. **Pseudocode:** shape/current; directions; for delta; next; inside; compare; count.  
11. **Full code:**

```js
function countGreaterFourNeighbors(matrix, row, col) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const currentValue = matrix[row][col];
  let count = 0;

  for (const [rowDelta, colDelta] of directions) {
    const nextRow = row + rowDelta;
    const nextCol = col + colDelta;
    const isInside = nextRow >= 0 && nextRow < rows
      && nextCol >= 0 && nextCol < cols;
    if (!isInside) continue;
    if (matrix[nextRow][nextCol] > currentValue) count += 1;
  }
  return count;
}
```

12. Bounds trước access ngăn `matrix[-1]` undefined rồi lỗi. cols đến từ row length. Directions không gồm `[0,0]`, nên không tự so current.  
13. **Dry run:**

| Bước | Direction/next | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | up→(0,1)=5 | count0 | inside,5>3 | +1 | 1 |
| 1 | down→(2,1) | 1 | outside | skip | 1 |
| 2 | left→(1,0)=4 | 1 | inside,4>3 | +1 | 2 |
| 3 | right→(1,2)=7 | 2 | inside,7>3 | +1 | 3 |

14. `O(1)` vì 4 directions, `O(1)` space. 15. đọc trước bounds; nhầm row/col; vô tình gồm self; dùng `<= rows`. 16. Biến thể 8 hướng: thêm bốn diagonal delta; skeleton không đổi.

**Recall Card `[MAT-03]`:** delta → next → bounds → content; không đảo order. **Blank Page:** viết 8 directions và test corner. **Mutation:** count equal; return coordinates; wrap-around grid. **Explain Back:** vì sao bounds trước read? 4/8 khác data nào? Khi visited được check ở đâu?

## Transfer Test A — Sau `MAT-01..03`

Làm [M02-T01](03_Practice_Ladder.md#m02-t01--camera-nhiệt). Một cột timestamp gây nhiễu và output không phải tổng đơn.
