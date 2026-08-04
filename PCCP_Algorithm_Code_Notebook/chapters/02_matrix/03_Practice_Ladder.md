# Chapter 02 — Practice Ladder

[← Index](../../02_Matrix.md) · [Lời giải](../../solutions/02_Matrix_Solutions.md)

## Tầng 1 — Nhận diện (12)

Ghi ID, shape, hướng duyệt, state và return.

### M02-R01 `[MAT-01]`
Tính tổng mọi ô âm.

### M02-R02 `[MAT-01]`
Trả số lượng số 0 theo từng cột của matrix chữ nhật.

### M02-R03 `[MAT-02]`
Trả max trên chéo phụ của matrix vuông.

### M02-R04 `[MAT-02]`
Đếm số ô thuộc union hai đường chéo có value chẵn.

### M02-R05 `[MAT-03]`
Liệt kê tọa độ 8-neighbor hợp lệ quanh corner.

### M02-R06 `[MAT-03]`
Đếm ô kề 4 hướng là tường.

### M02-R07 `[MAT-04]`
Transpose matrix 2×3.

### M02-R08 `[MAT-04]`
Phản chiếu mỗi row theo chiều ngang.

### M02-R09 `[MAT-05]`
Robot thực hiện command; bước invalid bị bỏ qua.

### M02-R10 `[MAT-05]`
Đếm kích thước vùng cùng màu chứa start.

### M02-R11 `[MAT-01]`
Tìm tọa độ value lớn nhất; hòa theo row rồi col nhỏ.

### M02-R12 `[MAT-04]`
Rotate counterclockwise matrix `rows×cols`.

## Tầng 2 — Điền khuyết (3)

### M02-F01 `[MAT-01]`
```js-fill
const rows = matrix.___;
const cols = rows === 0 ? ___ : matrix[0].___;
for (let row = 0; row < ___; row += 1) {
  for (let col = 0; col < ___; col += 1) total += matrix[___][___];
}
```

### M02-F02 `[MAT-03]`
```js-fill
const nextRow = row + ___;
const nextCol = col + ___;
const isInside = nextRow >= ___ && nextRow < rows
  && nextCol >= 0 && nextCol ___ cols;
if (!isInside) ___;
```

### M02-F03 `[MAT-04]`
```js-fill
const rotated = Array.from({ length: ___ }, () => Array(___));
rotated[___][___] = matrix[row][col];
```
Điền cho rotate clockwise của source `rows×cols`.

## Tầng 3 — Dựng logic (3)

### M02-L01 `[MAT-01]`
Trả index hàng có tổng lớn nhất; hòa lấy hàng cuối.

### M02-L02 `[MAT-03]`
Trả số neighbor 8 hướng nằm trong biên quanh `(r,c)` mà không đọc matrix value.

### M02-L03 `[MAT-05]`
Robot nhận command `[direction,steps]`; command chỉ commit nếu **toàn bộ** path không ra biên/đụng tường. Không code; mô tả transaction state.

## Tầng 4 — Pseudocode (3)

### M02-P01 `[MAT-02]`
Tính hiệu `mainDiagonalSum - antiDiagonalSum`; center thuộc cả hai sum.

### M02-P02 `[MAT-04]`
Viết shape và mapping cho rotate 90° counterclockwise.

### M02-P03 `[MAT-05]`
Flood fill iterative đếm vùng `1` chứa start; ghi lúc mark visited và lý do.

## Tầng 5 — Tự code (3)

### M02-C01 `[MAT-01]` — Cột ổn định nhất
Trả index cột có range `(max-min)` nhỏ nhất; hòa lấy cột nhỏ nhất. Matrix nonempty chữ nhật.

### M02-C02 `[MAT-03]` — Đỉnh cục bộ
Trả mọi tọa độ có value lớn hơn nghiêm ngặt tất cả neighbor 4 hướng; corner chỉ so neighbor tồn tại.

### M02-C03 `[MAT-04]` — Rotate và đánh dấu
Rotate clockwise rồi thay mọi ô âm trong output bằng 0; không mutate input.

## Tầng 6 — Biến thể (3)

### M02-V01 `[MAT-01 → MAT-02]`
Từ nested scan mọi ô sang chỉ union hai chéo. Chỉ ra traversal giảm từ `n²` xuống `n` và center condition.

### M02-V02 `[MAT-03 → MAT-05]`
Từ liệt kê neighbor thành flood fill. State nào thêm, transition nào lặp và vì sao cần visited?

### M02-V03 `[MAT-04]`
Từ rotate clockwise đổi counterclockwise; sửa output shape không, sửa mapping thế nào?

## Transfer Tests

### M02-T01 — Camera nhiệt
Matrix mỗi row là `[timestamp, ...temperatures]`; cột 0 là metadata. Trả index row có nhiều điểm nhiệt lớn hơn trung bình của **chính row đó** nhất; hòa lấy row cuối. Không tính timestamp vào average/count.

### M02-T02 — Tem kiểm kho
Grid tem `rows×cols`, mỗi ô là mã string. Sau khi rotate counterclockwise, trả tọa độ mới của mã target duy nhất mà không cần xây toàn output. Hãy suy ra inverse/direct mapping và nêu shape destination.

## Mini-test M02-M01 — 40 phút

1. **M02-M01.1:** Trả tổng border cells của matrix; `1×N`/`N×1` không đếm trùng.
2. **M02-M01.2:** Từ vị trí start, thực hiện commands; mỗi command gồm nhiều bước và dừng command ở bước invalid nhưng các bước hợp lệ trước đó vẫn giữ.
3. **M02-M01.3:** Transpose matrix rồi trả tổng từng row mới mà không bắt buộc materialize transpose.

