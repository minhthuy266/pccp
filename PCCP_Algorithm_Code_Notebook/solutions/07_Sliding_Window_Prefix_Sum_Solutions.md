# Lời giải — 07 — Prefix Sum và Sliding Window

[← Practice Ladder](../chapters/07_prefix_window/04_Practice_Ladder.md) · Code chạy được: [ch07_prefix_window.js](../../solutions/notebook/ch07_prefix_window.js)

## Tầng R — đáp án nhận dạng

### P07-R01 — `PRE-01`

State `prefix[k]=sum k phần tử đầu`; brute force cộng lại cùng prefix cho mỗi query. Build một lần `O(n)`, mỗi query prefix `O(1)`.

### P07-R02 — `PRE-02`

Đoạn đóng `[l..r]` là `prefix[r+1]-prefix[l]`. `r+1` chứa phần tử tại r; `l` loại đúng phần trước l.

### P07-R03 — `PRE-03`

Cộng indicator `isDigit ? 1 : 0`; state là count digit trong k ký tự đầu, không phải tổng code point.

### P07-R04 — `PRE-04`

Khi lấy whole prefix rồi trừ vùng phía trên và phía trái, rectangle trên-trái bị trừ hai lần; phải cộng lại đúng một lần theo inclusion–exclusion.

### P07-R05 — `PRE-05`

Difference marks delta bắt đầu tại left và kết thúc sau right. Prefix reconstruction lan tổng delta đang có hiệu lực tới từng index.

### P07-R06 — `PRE-05`

Set chỉ biết prefix có tồn tại; nhiều occurrence cùng prefix tạo nhiều start khác nhau. Cần `Map<prefix,count>`.

### P07-R07 — `SW-01`

Fixed width 7. Khi right mới vào, outgoing là `right-7`; aggregate luôn mô tả đúng bảy ngày trước khi evaluate.

### P07-R08 — `SW-02`

Add, shrink trong lúc invalid, rồi update longest khi window đã valid. Update lúc invalid sẽ ghi candidate trái contract.

### P07-R09 — `SW-03`

Một lần remove có thể vẫn valid; `while` thử mọi left khả dụng cho cùng right và mới tìm được minimum.

### P07-R10 — `SW-04`

Giữ `satisfiedKeys`: tăng khi count vừa bằng need; giảm khi removal làm count từ need xuống need-1. Valid khi satisfied bằng số required keys.

### P07-R11 — `SW-05`

Có `right-left+1` đoạn: mọi start từ left tới right. Tất cả là suffix của window valid nên vẫn thỏa điều kiện at-most.

### P07-R12 — `SW-06`

Lần lượt Prefix, Prefix+Map, inward Two Pointers. Window không cần cho arbitrary static query; số âm phá sum monotonicity; sorted pair loại search space theo hai cực chứ không duy trì đoạn aggregate.

## Tầng F — điền khuyết

### P07-F01 — `PRE-01/PRE-02`

`A=prefix[i]`, `B=right+1`, `C=left`.

```js
prefix[i + 1] = prefix[i] + values[i];
const answer = prefix[right + 1] - prefix[left];
```

### P07-F02 — `SW-01`

Outgoing `right-width`; emit từ `right>=width-1`.

```js
if (right >= width) sum -= values[right - width];
if (right >= width - 1) output.push(sum);
```

### P07-F03 — `SW-04`

```js
const next = frequency.get(outgoing) - 1;
if (next === 0) frequency.delete(outgoing);
else frequency.set(outgoing, next);
```

## Tầng L — state và trace

### P07-L01 — `PRE-05`

Khởi tạo Map `{0:1}`.

| value | prefix | needed | cộng answer | Map sau update |
|---:|---:|---:|---:|---|
| 1 | 1 | 1 | 0 | `{0:1,1:1}` |
| -1 | 0 | 0 | 1 | `{0:2,1:1}` |
| 1 | 1 | 1 | 1 | `{0:2,1:2}` |

Check trước update để current boundary không tự ghép với chính nó thành empty segment khi target 0.

### P07-L02 — `SW-02/SW-04`

State `[left,right]`, Map char→count. Add incoming; while incoming count >1, remove left. Sau shrink, mọi char count ≤1 và left là boundary đầu tiên còn tạo window valid cho right.

### P07-L03 — `SW-03`

State best `{length,start,end}`. Update khi `length<best.length`; khi bằng chỉ update nếu `left<best.start`. Dùng `<=` không kèm tie sẽ vô tình lấy đoạn xuất hiện muộn.

## Tầng P — pseudocode

### P07-P01 — `PRE-04`

```text
prefix padded zeros
for each cell:
  prefix[r+1][c+1] = cell + top + left - overlap
query = whole - above - left + overlap
```

### P07-P02 — `SW-05`

```text
atMost(k): add right; shrink while distinct>k; answer += right-left+1
exactly(k) = atMost(k) - atMost(k-1)
```

Mọi window exactly k thuộc tập at-most k nhưng không thuộc at-most k-1.

### P07-P03 — `PRE-05`

```text
for rectangle inclusive:
  +d at top-left; -d after right; -d below; +d below-right
prefix every row
prefix every column
```

Padding thêm một row/column giữ mọi marker `end+1` trong matrix.

## Tầng C — code từ trắng

### P07-C01 — `PRE-01..03`

Implementation: `buildPrefixSums`, `rangeSum`, `buildCountPrefix` trong [module Chapter 07](../../solutions/notebook/ch07_prefix_window.js). Revealing tests là `[5]` query `[0..0]` và predicate có cả true/false.

### P07-C02 — `SW-01/SW-04`

Giữ Map count của fixed window và `satisfied`. Add incoming trước; khi width vượt K remove outgoing; chỉ evaluate khi đủ K. Không `slice`/recount requirement trong mỗi iteration.

### P07-C03 — `SW-02/SW-03`

Implementation: `longestAtMostKDistinct` và `minimumLengthAtLeast` trong module. Invariant lần lượt là “sau shrink window có ≤K loại” và “trước mỗi removal trong while, window là candidate valid”.

## Tầng V — transfer

### P07-V01 — `SW-03 → PRE-05`

Số âm làm add-right/remove-left không quyết định hướng thay đổi sum. Với objective count exact target, dùng `countTargetSubarrays`; invariant dựa đẳng thức prefix, không dựa monotonicity.

### P07-V02 — `SW-01 → monotonic deque`

Deque lưu index có value giảm dần. Pop back khi incoming lớn hơn/equal; pop front khi index hết hạn; front là max. Outgoing không thể bị “trừ khỏi max” vì ta không biết maximum kế tiếp bằng scalar.

## Tầng M — rubric

### P07-M01 — Mixed

1. Prefix frequency Map (`PRE-05`).
2. Variable minimum cover + frequency (`SW-03/SW-04`).
3. Difference 2D + reconstruction (`PRE-05`, neo OF060).

Mỗi phần 10 điểm: nhận dạng 2, state 2, invariant 2, code 2, revealing test 1, complexity 1. Trừ toàn bộ điểm invariant nếu chỉ nêu “window luôn đúng” mà không nói đúng về gì và ở thời điểm nào.
