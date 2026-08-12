# Practice Ladder — Chapter 09 Binary Search

[← Chương 09](../../09_Binary_Search.md) · Chỉ mở [solutions](../../solutions/09_Binary_Search_Solutions.md) sau khi viết truth sequence và interval invariant.

## Tầng R — nhận dạng

### P09-R01 — `BS-01`

Một query tìm target trong sorted array. Vì sao exact binary search có lợi, và return nào khi không có?

### P09-R02 — `BS-01`

Array chưa sort và chỉ có một query. So sánh scan `O(n)` với sort rồi search.

### P09-R03 — `BS-02`

Tìm insertion index đầu tiên giữ array sorted. Viết predicate F→T.

### P09-R04 — `BS-02`

Array có duplicate target. Vì sao không return khi equal nếu cần occurrence đầu?

### P09-R05 — `BS-03`

Đếm số target bằng hai boundary nào?

### P09-R06 — `BS-03`

Tìm integer lớn nhất thỏa predicate T→F. Chọn lower-mid hay upper-mid?

### P09-R07 — `BS-04`

Minimum capacity để giao hết hàng trong D ngày. Candidate answer và monotonic predicate là gì?

### P09-R08 — `BS-04`

Maximum minimum distance khi đặt C router. Truth sequence theo distance tăng là gì?

### P09-R09 — `BS-05`

Tổng count có thể vượt safe integer. Khi nào phải chuyển toàn pipeline sang BigInt?

### P09-R10 — `BS-05`

Đề tìm real answer sai số `1e-6`. Vì sao loop integer `while(low<high)` không phù hợp?

## Tầng F — điền template

### P09-F01 — `BS-01`

Điền transition inclusive để mọi nhánh loại cả middle.

### P09-F02 — `BS-02`

Điền lower bound half-open: true cập nhật gì, false cập nhật gì?

### P09-F03 — `BS-03`

Điền midpoint cho last true để miền `[0,1]` không kẹt.

## Tầng L — state và proof

### P09-L01 — `BS-02`

Dry-run lower bound 3 trên `[1,3,3,7]`; ghi `[low,high)` sau từng bước.

### P09-L02 — `BS-04`

Thiết kế predicate cho minimum processing time; chứng minh monotone và high feasible.

### P09-L03 — `BS-04/BS-05`

Thiết kế predicate cho maximum minimum rock distance. Chỉ rõ equality `gap < candidate` hay `<=`.

## Tầng P — pseudocode

### P09-P01 — `BS-01..03`

Viết pseudocode exact, lower bound và upper bound cạnh nhau; khoanh các dòng khác nhau.

### P09-P02 — `BS-04`

Viết first feasible generic và statement invariant trước loop.

### P09-P03 — `BS-05`

Viết BigInt first true và quy tắc early-stop predicate count.

## Tầng C — code từ trang trắng

### P09-C01 — `BS-01..03`

Code exact/lower/upper; test empty, all duplicate, target trước đầu và sau cuối.

### P09-C02 — `BS-04`

Code minimum processing time với BigInt; sample `n=6,times=[7,10]` phải ra 28.

### P09-C03 — `BS-04/BS-05`

Code maximum minimum distance; test không có rock và rock sát destination.

## Tầng V — mutation

### P09-V01 — `BS-02 ↔ BS-03`

Từ lower bound đổi thành upper bound và last `<=target`. Giải thích output n/-1 trước khi truy cập.

### P09-V02 — `BS-04`

Sau khi tìm optimal scalar, reconstruct một cấu hình greedy đạt scalar đó. Tách rõ search phase và reconstruction phase.

## Tầng M — mini-test

### P09-M01 — Mixed boundary test

Trong 40 phút:

1. Đếm phần tử thuộc value range `[a,b]` trong sorted array.
2. Tìm minimum integer speed hoàn thành workload trước deadline.
3. Tìm maximum spacing khi được bỏ tối đa m điểm.

Nộp truth sequence, bounds proof, template first/last, code và ba revealing tests: answer=low, answer=high, duplicate/equality.
