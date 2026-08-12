# 02 — Matrix: tọa độ, biên và phép biến đổi

> Trạng thái: `MAT-01..05` đạt `FRAMEWORK-FULL` và đã qua QA.

## Điều hướng

1. [Traversal, đường chéo và láng giềng](chapters/02_matrix/01_Traversal.md): `MAT-01..03`.
2. [Biến đổi và bridge sang simulation/graph](chapters/02_matrix/02_Transform_Movement.md): `MAT-04..05`.
3. [Practice Ladder](chapters/02_matrix/03_Practice_Ladder.md).
4. [Lời giải](solutions/02_Matrix_Solutions.md).
5. [QA](chapters/02_matrix/QA.md).

## Quy ước bắt buộc

```text
rows = matrix.length
cols = rows === 0 ? 0 : matrix[0].length
matrix[row][col]
0 <= row < rows
0 <= col < cols
```

Không lấy `cols = matrix.length` trừ khi đã chứng minh ma trận vuông. Với matrix output, tránh `Array(rows).fill(Array(cols).fill(0))` vì mọi hàng dùng chung reference.

## Bản đồ chọn dạng

| Contract | ID | State/chuyển đổi |
| --- | --- | --- |
| Xử lý mọi ô, tổng theo hàng/cột | `MAT-01` | nested loop + accumulators |
| Chỉ hai đường chéo của ma trận vuông | `MAT-02` | một index, hai công thức cột |
| Xét ô kề | `MAT-03` | directions + bounds trước read |
| Tạo matrix xoay/transpose/reflect | `MAT-04` | ánh xạ `(r,c)→(nr,nc)` |
| Command di chuyển hoặc lan vùng | `MAT-05` | vị trí/visited + transition hợp lệ |

## Template Contrast

| Dạng | Duyệt | State | Condition | Return |
| --- | --- | --- | --- | --- |
| `MAT-01` | mọi `(r,c)` | scalar/row/col totals | theo value | aggregate |
| `MAT-02` | `i=0..n-1` | diagonal totals | center duplicate? | 1–2 values |
| `MAT-03` | mỗi direction quanh một cell | neighbor coordinate | bounds trước access | count/list/transition |
| `MAT-04` | mọi source cell | output matrix | shape/formula | new matrix |
| `MAT-05` | command/frontier | current position hoặc visited | bounds + obstacle + visited | final state/region |

## Checklist tạm thành thạo

- [ ] Không nhầm rows/cols trên matrix `2×3`.
- [ ] Tự nói state và transition cho `MAT-01..05`.
- [ ] Viết bounds check bốn hướng từ trắng.
- [ ] Chứng minh công thức transpose/rotate bằng một tọa độ.
- [ ] Làm đúng 3 bài cơ bản và 2 biến thể.
- [ ] Sau 3 ngày vẫn code lại được.
- [ ] Phân biệt movement simulation và flood fill traversal.

## Mastery Gate

Qua khi 4/5 ID đạt mức 3, 3/5 đạt mức 4, hai Transfer/Mixed Test liên tiếp đạt rubric và các revealing test `[]`, `1×1`, `1×N`, `N×1`, `2×3` đều đúng. Sai shape quay lại `MAT-01/04`; sai neighbor quay lại `MAT-03`; quên visited/commit quay lại `MAT-05`.
