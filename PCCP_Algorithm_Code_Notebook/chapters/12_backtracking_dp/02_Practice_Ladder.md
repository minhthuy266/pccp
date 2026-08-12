# Practice Ladder — Chapter 12

[← Chapter](../../12_Backtracking_DP_Basic.md) · [Solutions](../../solutions/12_Backtracking_DP_Basic_Solutions.md)

Trước mỗi bài, bắt buộc ghi bốn dòng: `signal`, `state sentence`, `transition`, `invariant`. Không mở solution trước một nỗ lực thật.

## Recognition

### P12-R01 — `BTD-01`
Chọn 4 người từ 12 người, thứ tự không quan trọng: state nào chống sinh trùng?
### P12-R02 — `BTD-02`
Xếp thứ tự ba thẻ `[1,1,2]`: vì sao cần vừa `used[]` vừa dedupe cùng tầng?
### P12-R03 — `BTD-03`
Mỗi item lấy hoặc bỏ để đạt target: vẽ hai transition.
### P12-R04 — `BTD-03`
Input có số âm: prune `sum > target` có hợp lệ không?
### P12-R05 — `BTD-04`
Ba tầng cố định, mỗi tầng 1..6: loops hay recursion? Nêu tradeoff.
### P12-R06 — `BTD-04`
Mỗi trong n item lấy/bỏ, cần duyệt tất cả subset: encoding bitmask là gì?
### P12-R07 — `BTD-05`
Hai path tới cùng `(index, remaining)`: dấu hiệu chuyển sang memo là gì?
### P12-R08 — `BTD-06`
0/1 subset sum và unbounded coin khác loop order ở đâu?
### P12-R09 — `BTD-06`
Count/min/max DP khác nhau ở identity và combine thế nào?
### P12-R10 — `BTD-07`
Grid chỉ đi phải/xuống và grid đi bốn hướng nên dùng engine nào?
### P12-R11 — `BTD-07`
Vì sao TSP cần `dp[mask][last]`, không chỉ `dp[mask]`?
### P12-R12 — `BTD-08`
Weighted intervals làm hỏng greedy earliest-finish ra sao?

## Fill

### P12-F01 — `BTD-01/02`
Điền ba thao tác choose → explore → unchoose và state chống dùng lại.
### P12-F02 — `BTD-05`
Điền thứ tự base → memo lookup → transitions → memo set → return.
### P12-F03 — `BTD-06`
Điền hướng loop cho 0/1 và unbounded; giải thích bằng predecessor cũ/mới.

## Logic

### P12-L01 — `BTD-01/02`
Trace `[1,1,2]`: liệt kê unique combinations size 2 và unique permutations.
### P12-L02 — `BTD-03`
Thiết kế suffix bound cho subset target với số không âm và chứng minh hai prune.
### P12-L03 — `BTD-07/08`
Tạo counterexample cho việc gộp hai state có cùng mask nhưng khác endpoint.

## Pseudocode

### P12-P01 — `BTD-01/02`
Viết pseudocode combination và unique permutation, chỉ rõ khác biệt `start/used`.
### P12-P02 — `BTD-03/05`
Viết include/exclude trước, sau đó thêm memo theo full state.
### P12-P03 — `BTD-06/07`
Viết state/base/transition/order cho 0/1 sum và grid path.

## Code

### P12-C01 — `BTD-01/02`
Code `combinations` và `uniquePermutations`; test clone, duplicate và `k=0`.
### P12-C02 — `BTD-03/05/06`
Code subset search, min-coin memo và 0/1 DP; test số âm/prune và loop order.
### P12-C03 — `BTD-07/08`
Code grid paths và engine decision; test blocked source, one-cell grid và scalar-state warning.

## Variants

### P12-V01 — `BTD-01/03`
Đổi combination từ mỗi item dùng một lần sang được dùng lặp; xác định transition và điều kiện dừng để không recursion vô hạn.
### P12-V02 — `BTD-06/07/08`
Đổi 0/1 boolean DP thành count-unbounded và interval DP; ghi rõ identity, combine, order và complexity.

## Mini-test

### P12-M01 — Mixed
Trong 60 phút: (1) sinh đội không trùng, (2) target sum n nhỏ có pruning, (3) target lớn có repeated state, (4) đường đi grid có obstacle. Không gắn tên pattern trong bài làm. Rubric: recognition 2, full state 2, transition/order 2, invariant/proof 2, revealing tests 1, complexity 1.
