# Practice Ladder — Chapter 07

[← Chương 07](../../07_Sliding_Window_Prefix_Sum.md) · Chỉ mở [solutions](../../solutions/07_Sliding_Window_Prefix_Sum_Solutions.md) sau khi đã ghi state/invariant.

## Tầng R — nhận dạng, chưa code

### P07-R01 — `PRE-01`

Một array không đổi, cần trả 100.000 tổng prefix `0..r`. Chọn state và nêu phần việc brute force bị loại.

### P07-R02 — `PRE-02`

Cho 50.000 query tổng đoạn đóng `[l..r]`. Viết đúng hai index prefix cần trừ.

### P07-R03 — `PRE-03`

Query hỏi số ký tự số trong nhiều substring. Prefix đang cộng đại lượng gì?

### P07-R04 — `PRE-04`

Matrix tĩnh có nhiều rectangle sum query. Vì sao phải cộng lại overlap sau khi trừ top và left?

### P07-R05 — `PRE-05`

Nhiều range add, cuối cùng mới in array. Phân vai prefix và difference boundary.

### P07-R06 — `PRE-05`

Đếm subarray tổng 0 trong array có số âm. Vì sao Set prefix không đủ?

### P07-R07 — `SW-01`

Tìm doanh thu lớn nhất của mọi block đúng 7 ngày. Window fixed hay variable? Item nào ra khi right tăng?

### P07-R08 — `SW-02`

Longest substring có tối đa hai loại ký tự. Answer update khi window valid hay invalid?

### P07-R09 — `SW-03`

Shortest positive subarray có tổng ít nhất target. Vì sao phải shrink trong `while`, không phải `if`?

### P07-R10 — `SW-04`

Window cần chứa ít nhất hai A và một B. State scalar nào giúp không scan lại toàn Map mỗi bước?

### P07-R11 — `SW-05`

Sau shrink, window `[left..right]` có at most K distinct. Có bao nhiêu subarray hợp lệ kết thúc tại right?

### P07-R12 — `SW-06`

Ba đề: nhiều range query; exact sum có số âm; pair sum trên sorted array. Gán lần lượt Prefix, Prefix+Map, Two Pointers và giải thích counter-signal của Sliding Window.

## Tầng F — điền khuyết transition

### P07-F01 — `PRE-01/PRE-02`

Điền `A/B/C`:

```js
prefix[i + 1] = A + values[i];
const answer = prefix[B] - prefix[C]; // đoạn đóng [left..right]
```

### P07-F02 — `SW-01`

Điền outgoing index và điều kiện emit:

```js
sum += values[right];
if (right >= width) sum -= values[___];
if (right >= ___) output.push(sum);
```

### P07-F03 — `SW-04`

Điền transition remove để `Map.size` đúng sau khi count về zero.

## Tầng L — dựng logic/state

### P07-L01 — `PRE-05`

Với `[1,-1,1]`, target 0, lập bảng `value | prefix | needed | answer | frequency` và giải thích check-before-update.

### P07-L02 — `SW-02/SW-04`

Thiết kế state cho longest substring không lặp. Nói chính xác điều kiện shrink và invariant sau shrink.

### P07-L03 — `SW-03`

Thiết kế state trả shortest range, tie lấy start sớm nhất. Chỉ rõ điều kiện update best dùng `<` hay `<=`.

## Tầng P — pseudocode

### P07-P01 — `PRE-04`

Viết pseudocode build prefix 2D và rectangle query inclusive, không nhìn template.

### P07-P02 — `SW-05`

Viết pseudocode `countExactlyKDistinct` bằng hai lần at-most; giải thích vì sao hai tập window lồng nhau.

### P07-P03 — `PRE-05`

Viết pseudocode four-corner difference 2D cho rectangle update và hai pass reconstruction.

## Tầng C — code từ trang trắng

### P07-C01 — `PRE-01..03`

Viết `buildPrefixSums`, `rangeSum` và `buildCountPrefix`; test đoạn một phần tử và đoạn bắt đầu 0.

### P07-C02 — `SW-01/SW-04`

Cho `required` và một stream, đếm số fixed window width K chứa đủ multiplicity. Không dùng `slice` trong loop.

### P07-C03 — `SW-02/SW-03`

Viết hai hàm: longest at-most K distinct và shortest positive sum at least target. Sau code, ghi một câu invariant cho mỗi hàm.

## Tầng V — mutation/transfer

### P07-V01 — `SW-03 → PRE-05`

Thêm số âm vào bài shortest/exact sum. Tạo counterexample cho window, rồi thay engine bằng prefix Map nếu objective là đếm exact target.

### P07-V02 — `SW-01 → monotonic deque`

Đổi aggregate từ sum sang maximum của từng fixed window. Giải thích vì sao `max -= outgoing` vô nghĩa và thiết kế deque index giảm dần.

## Tầng M — mini-test không lộ pattern

### P07-M01 — Mixed

Trong 35 phút, giải ba yêu cầu mà không mở tên chương:

1. Đếm số đoạn tổng target trên array có số âm.
2. Tìm đoạn ngắn nhất chứa mọi category, trả index 1-based và tie earliest.
3. Áp dụng 100.000 rectangle damage/heal rồi đếm cell cuối cùng dương.

Nộp cùng: pattern dự đoán, state sentence, invariant, complexity và một revealing test cho từng yêu cầu.
