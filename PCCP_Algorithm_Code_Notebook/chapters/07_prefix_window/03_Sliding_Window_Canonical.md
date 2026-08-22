# Sliding Window canonical — `SW-01..06`

[← Chương 07](../../07_Sliding_Window_Prefix_Sum.md) · [PF21](../../../docs/pccp-700-roadmap/pattern-families/PF21_SLIDING_WINDOW_TWO_POINTERS.md)

## `[SW-01]` — Fixed window: add incoming, remove outgoing

### Core — bản chất và brute force bottleneck

Brute force tính lại aggregate của từng đoạn dài `k`, tốn `O(nk)`. Hai cửa sổ liên tiếp chia sẻ `k-1` phần tử; pattern giữ aggregate cũ, thêm item mới bên phải và bỏ item hết hạn bên trái.

### Dấu hiệu nhận dạng

- Mọi đoạn xét có **đúng k phần tử**.
- Aggregate cập nhật rẻ khi một item vào/ra: sum, frequency, count.
- Nếu độ dài phải tự co giãn, chuyển SW-02/SW-03.

### State, invariant và transition

State: `right`, `width`, aggregate của window `[right-width+1..right]`. Invariant trước khi ghi answer: aggregate mô tả đúng window hiện tại có width `k`.

Transition khi `right` tăng: add `values[right]`; nếu window vượt `k`, remove `values[right-k]`; evaluate khi width bằng `k`.

### Template JavaScript

```js
function fixedWindowSums(values, width) {
  if (width <= 0 || width > values.length) return [];
  const output = [];
  let sum = 0;
  for (let right = 0; right < values.length; right++) {
    sum += values[right];
    if (right >= width) sum -= values[right - width];
    if (right >= width - 1) output.push(sum);
  }
  return output;
}
```

### Dry run

`[2,1,3,4]`, `k=3`: add 2,1,3 → emit 6; add 4 rồi remove 2 → emit 8. Không cộng lại `[1,3,4]`.

### Complexity

Mỗi item add một lần, remove tối đa một lần: `O(n)` time, `O(1)` auxiliary cho sum.

### Variant knobs và counterexample

- Frequency window cần update zero-count đúng lúc.
- Window max không remove được bằng một scalar; dùng monotonic deque.
- Counterexample remove sai index: với `right=3,k=3`, outgoing là index 0 (`right-k`), không phải 1.

### Transfer

OF052 dùng fixed frequency window. Mutation drill: trả start của window có average lớn nhất và giữ earliest khi tie.

## `[SW-02]` — Variable window dài nhất với predicate “at most”

### Core — bản chất và brute force bottleneck

Brute force enumerate mọi đoạn `O(n²)`. Khi add right làm window invalid, ta tăng left cho tới khi valid lại. Sau đó window hiện tại là đoạn dài nhất kết thúc tại right mà còn hợp lệ nếu predicate có tính co an toàn.

### Dấu hiệu nhận dạng

Các cụm “dài nhất”, “không quá k”, “không lặp”, contiguous và remove-left có thể sửa invalidity. Nếu cần ngắn nhất **đã valid**, dùng SW-03 vì thời điểm update answer khác.

### State, invariant và transition

State: `[left,right]` và validity state. Invariant sau vòng `while`: window valid; mọi start nhỏ hơn left đã bị chứng minh invalid cho right hiện tại. Transition là add right → while invalid remove left → maximize length.

### Template JavaScript

```js
function longestAtMostKDistinct(values, limit) {
  const frequency = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < values.length; right++) {
    const incoming = values[right];
    frequency.set(incoming, (frequency.get(incoming) ?? 0) + 1);
    while (frequency.size > limit) {
      const outgoing = values[left++];
      const count = frequency.get(outgoing) - 1;
      if (count === 0) frequency.delete(outgoing);
      else frequency.set(outgoing, count);
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

### Dry run

`[a,b,a,c]`, `k=2`: tới `c`, Map có ba loại; remove `a` vẫn ba loại, remove `b` còn `{a,c}`; window `[a,c]` length 2.

### Complexity

Right tăng `n` lần, left tăng tối đa `n` lần: `O(n)` expected time, `O(k)`/`O(distinct)` space.

### Variant knobs và counterexample

- “Không lặp” có thể shrink tới khi count incoming bằng 1.
- `limit=0` cần cho phép window rỗng; tránh đọc outgoing quá bound.
- Không delete zero-count key khiến `Map.size` giữ loại không còn trong window.

### Transfer

Mutation drill: longest substring không lặp. Contrast SW-05: SW-02 chỉ lấy maximum; SW-05 cộng số đoạn hợp lệ kết thúc ở mỗi right.

## `[SW-03]` — Variable window ngắn nhất khi predicate đã valid

### Core — bản chất và brute force bottleneck

Với số dương hoặc coverage monotone, expand right cho tới valid; khi valid, ghi candidate rồi shrink liên tục để tìm đoạn ngắn nhất với cùng right. Brute force mọi start/end là `O(n²)`.

### Dấu hiệu nhận dạng

“Đoạn ngắn nhất có tổng ít nhất target” trên số dương hoặc “đoạn ngắn nhất cover requirement”. Nếu tổng có số âm, shrink theo sum không còn đơn điệu; dùng prefix/deque/Map tùy contract.

### State, invariant và transition

State `[left,right]`, window aggregate và `best`. Invariant trước mỗi shrink: window valid nên là candidate; sau remove-left có thể vẫn valid và phải evaluate tiếp. Transition add → while valid: update minimum → remove.

### Template JavaScript

```js
function minimumLengthAtLeast(values, target) {
  let left = 0;
  let sum = 0;
  let best = Infinity;
  for (let right = 0; right < values.length; right++) {
    sum += values[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= values[left++];
    }
  }
  return best === Infinity ? 0 : best;
}
```

### Dry run

`[2,3,1,2]`, target 5: right 1 tạo sum 5, best 2 rồi remove 2; tới right 3 sum 6, best vẫn 2, shrink tiếp tới invalid.

### Complexity

Mỗi biên tiến một chiều: `O(n)` time, `O(1)` space cho sum.

### Variant knobs và counterexample

- Shortest cover dùng frequency thay sum nhưng lifecycle giống nhau.
- Counterexample số âm: `[3,-2,3]`, target 4; rule thấy sum 3 rồi cứ expand vẫn tìm được ở đây, nhưng các cấu hình khác chứng minh shrink-by-sign không an toàn nói chung.
- Update best **trước** remove; nếu update sau khi invalid sẽ mất candidate cuối.

### Transfer

OF053 là positive exact-sum shortest/earliest; OF058 là minimum cover. Mutation drill: trả `[left,right]` với tie earliest thay vì chỉ length.

## `[SW-04]` — Frequency Map và distinct/requirement state

### Core — bản chất và brute force bottleneck

Window thường không thể validate chỉ bằng sum. Brute force đếm lại mọi loại trong đoạn; Map count hỗ trợ add/remove `O(1)` expected, còn scalar `distinct`/`satisfied` giúp check validity `O(1)`.

### Dấu hiệu nhận dạng

Đề nói “k loại”, “không trùng”, “đủ mọi sản phẩm”, hoặc required multiplicity. Nếu chỉ membership toàn input không có moving boundary, Set/Map PF01 đủ.

### State, invariant và transition

Invariant: `frequency[x]` bằng multiplicity của x trong `[left,right]`. `distinct` bằng số key có count dương; `satisfied` bằng số requirement vừa đạt threshold.

Transition zero↔positive là điểm quyết định: add từ 0 lên 1 tăng distinct; remove từ 1 xuống 0 giảm distinct và nên delete key.

### Template JavaScript

```js
function addFrequency(frequency, key) {
  const next = (frequency.get(key) ?? 0) + 1;
  frequency.set(key, next);
  return next;
}

function removeFrequency(frequency, key) {
  const next = frequency.get(key) - 1;
  if (next === 0) frequency.delete(key);
  else frequency.set(key, next);
  return next;
}
```

### Dry run

Window `[A,A,B]` có Map `{A:2,B:1}`, distinct 2. Remove A đầu cho `{A:1,B:1}`: distinct không đổi. Remove A lần nữa làm count 0: delete A, distinct giảm còn 1.

### Complexity

Kết hợp variable window: `O(n)` expected time; space `O(numberOfKeysInWindow)`.

### Variant knobs và counterexample

- Required counts: satisfied tăng khi `count===need`, giảm khi từ need xuống need-1.
- Exact k khác at-most k; có thể dùng `atMost(k)-atMost(k-1)`.
- Counterexample dùng Set: `[A,A]` remove một A sẽ xóa A dù window vẫn còn A.

### Transfer

OF052 dùng requirement count trong fixed window; OF058 dùng distinct coverage trong variable window. Đây là COMBINATION: SW quản lý biên, MAP-03 quản multiplicity.

### Gold standard — Dry run → Code reconstruction: đoạn dài nhất có nhiều nhất `k` loại

**Bài toán cụ thể.** Cho mảng loại sản phẩm, tìm độ dài đoạn liên tiếp dài nhất chứa nhiều nhất `k` loại khác nhau.

```text
items = ["A", "B", "A", "C", "B"], k = 2
answer = 3, từ window ["A", "B", "A"]
```

#### 1. Dry run chi tiết

`frequency` chỉ mô tả window hiện tại `[left..right]`, không mô tả toàn prefix.

| Lượt / current | State trước | Điều kiện chính xác | Hành động | State sau | Answer đổi |
| --- | --- | --- | --- | --- | --- |
| `right=0`, `A` vào | `left=0`, `{}`, `best=0` | sau add: `distinct=1`; `1 > 2` false | set `A→1`; không co; tính length `1` | `[0..0]`, `{A:1}` | `best=max(0,1)=1` |
| `right=1`, `B` vào | `left=0`, `{A:1}`, `best=1` | sau add: `2 > 2` false | set `B→1`; không co | `[0..1]`, `{A:1,B:1}` | `best=2` |
| `right=2`, `A` vào | `left=0`, `{A:1,B:1}`, `best=2` | add làm `A:2`; `2 > 2` false | tăng count A; không co | `[0..2]`, `{A:2,B:1}` | `best=3` |
| `right=3`, `C` vào | `left=0`, `{A:2,B:1}`, `best=3` | add C: `distinct=3`; `3 > 2` true | `C→1`; bắt đầu co | tạm `[0..3]`, `{A:2,B:1,C:1}` | chưa cập nhật vì invalid |
| vẫn `right=3` | `left=0`, `{A:2,B:1,C:1}` | `3 > 2` true | remove `items[0]=A`: `A 2→1`; `left 0→1` | `[1..3]`, `{A:1,B:1,C:1}` | chưa đổi; vẫn invalid |
| vẫn `right=3` | `left=1`, `{A:1,B:1,C:1}` | `3 > 2` true | remove B: `1→0`, delete B; `distinct 3→2`; `left 1→2` | `[2..3]`, `{A:1,C:1}` | sau co, length 2; `best` vẫn 3 |
| `right=4`, `B` vào | `left=2`, `{A:1,C:1}`, `best=3` | add B: `3 > 2` true | `B→1`; bắt đầu co | tạm `[2..4]`, `{A:1,C:1,B:1}` | chưa cập nhật |
| vẫn `right=4` | `left=2`, `{A:1,C:1,B:1}` | `3 > 2` true | remove A: `1→0`, delete; `left 2→3` | `[3..4]`, `{C:1,B:1}` | length 2; `best` vẫn 3 |

#### 2. Câu hành động bằng tiếng Việt

> Item hiện tại đi vào bên phải → tăng đúng count của nó trong Map → kiểm tra số key còn count dương → nếu quá `k`, liên tục cho item bên trái đi ra, giảm/xóa count rồi tăng `left` → khi window hợp lệ, cập nhật độ dài tốt nhất → `right` sang item kế tiếp.

#### 3. Suy ra state

| Thông tin cần sống sang lượt sau | Biến | Giá trị đầu và lý do |
| --- | --- | --- |
| Biên trái của đoạn đang mở | `left` | `0`, vì current đầu tiên mở window tại index 0 |
| Multiplicity từng loại trong đúng window | `frequency` | `new Map()`, vì window trước lần đọc đầu là rỗng |
| Số loại hiện diện | `frequency.size` | Không cần scalar riêng: xóa key khi count về 0 để `size` luôn đúng |
| Độ dài hợp lệ lớn nhất đã thấy | `best` | `0`, đáp án đúng cho input rỗng và phần tử trung hòa của `Math.max` |
| Biên phải/current | `right`, `items[right]` | `right` do `for` tạo từ 0; current chỉ cần trong iteration |

Invariant sau shrink: Map bằng chính xác multiplicity của `items[left..right]`, `frequency.size <= k`, và `best` là max của mọi window hợp lệ đã hoàn tất tới `right`.

#### 4. Suy ra loop

- Mỗi item lần lượt vào biên phải đúng một lần: dùng `for` trên `right`.
- Khi invalid, việc bỏ **từng** item trái lặp có điều kiện: dùng `while (frequency.size > k)`.
- `if` không đủ. Với `items=["A","A","B"]`, `k=1`, tại `right=2` bỏ A ở index 0 vẫn để `{A:1,B:1}`; cần bỏ tiếp A ở index 1 mới valid.

#### 5. Ánh xạ logic Việt → code

| Logic riêng của bài | Code |
| --- | --- |
| Window ban đầu bắt đầu ở đầu mảng | `let left = 0;` |
| Chưa có loại nào | `const frequency = new Map();` |
| Chưa có đoạn hợp lệ không rỗng | `let best = 0;` |
| Item hiện tại vào | `frequency.set(current, (frequency.get(current) ?? 0) + 1);` |
| Quá `k` loại | `frequency.size > k` |
| Item trái ra | `const outgoing = items[left];` |
| Giảm multiplicity của item ra | `const nextCount = frequency.get(outgoing) - 1;` |
| Không còn item loại đó trong window | `if (nextCount === 0) frequency.delete(outgoing);` |
| Sau khi bỏ item trái, biên dịch sang phải | `left += 1;` |
| Chỉ đo window đã valid | `best = Math.max(best, right - left + 1);` |

#### 6. Dựng code tăng dần

**Function shell**

```js
function longestAtMostKTypes(items, k) {
}
```

**State + initialization**

```js
let left = 0;
const frequency = new Map();
let best = 0;
```

**Main loop + current item**

```js
for (let right = 0; right < items.length; right += 1) {
  const current = items[right];
}
```

**Current enters**

```js
frequency.set(current, (frequency.get(current) ?? 0) + 1);
```

**Condition + transition**

```js
while (frequency.size > k) {
  const outgoing = items[left];
  const nextCount = frequency.get(outgoing) - 1;
  if (nextCount === 0) frequency.delete(outgoing);
  else frequency.set(outgoing, nextCount);
  left += 1;
}
```

**Answer update** đặt sau shrink: `best = Math.max(best, right - left + 1);`. **Cleanup:** không có; Map không phải output và window cuối không có pending state cần resolve. **Return:** sau `for`, `return best;`.

#### 7. Block scope và điều gì vỡ khi di chuyển

| Block | Vị trí đúng | Nếu di chuyển |
| --- | --- | --- |
| `left`, Map, `best` | Trước `for` | Khai báo trong loop làm mỗi window quên lịch sử, không còn sliding window |
| Add current | Trong `for`, trước check | Check trước add không xét item vừa vào; answer có thể chứa loại thứ `k+1` |
| Shrink `while` | Sau add, trong iteration | Đưa ra ngoài `for` cho phép các window invalid được đo trong traversal |
| Remove count + `left += 1` | Cùng thân `while` | Tăng `left` mà không giảm Map làm Map lệch đoạn; giảm Map mà không tăng `left` có thể loop vô hạn |
| Delete chỉ khi `nextCount===0` | Trong nhánh remove | Delete sớm làm Map quên duplicate vẫn còn trong window |
| Update `best` | Sau `while`, vẫn trong `for` | Đặt trước shrink có thể ghi độ dài của window quá `k` loại |
| Return | Sau `for` | Return trong iteration chỉ trả kết quả của prefix đầu |

#### 8. Code hoàn chỉnh và mọi lần answer được gán

```js
function longestAtMostKTypes(items, k) {
  let left = 0;
  const frequency = new Map();
  let best = 0;

  for (let right = 0; right < items.length; right += 1) {
    const current = items[right];
    frequency.set(current, (frequency.get(current) ?? 0) + 1);

    while (frequency.size > k) {
      const outgoing = items[left];
      const nextCount = frequency.get(outgoing) - 1;
      if (nextCount === 0) frequency.delete(outgoing);
      else frequency.set(outgoing, nextCount);
      left += 1;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

| Lúc gán `best` | Window đã valid | Phép gán | Kết quả |
| --- | --- | --- | --- |
| initialization | rỗng | `best=0` | 0 |
| cuối `right=0` | `[A]` | `max(0,1)` | 1 |
| cuối `right=1` | `[A,B]` | `max(1,2)` | 2 |
| cuối `right=2` | `[A,B,A]` | `max(2,3)` | 3 |
| cuối `right=3` sau hai shrink | `[A,C]` | `max(3,2)` | 3 |
| cuối `right=4` sau một shrink | `[C,B]` | `max(3,2)` | 3 |

#### 9. Ba implementation sai thực tế

| Sai | Failing input | State sai đầu tiên | Nguyên nhân | Block đúng |
| --- | --- | --- | --- | --- |
| Shrink bằng `if` | `[A,A,B]`, `k=1` | `right=2`, sau remove index 0 Map vẫn `{A:1,B:1}` nhưng code dừng | Một lần bỏ không bảo đảm loại biến mất | `while (frequency.size > k) { remove; left += 1; }` |
| Luôn `frequency.delete(outgoing)` | `[A,A,B]`, `k=1` | `right=2`, remove A ở index 0 xóa key dù A index 1 còn trong window | Set-like removal làm mất multiplicity | Tính `nextCount`; chỉ delete khi bằng 0, ngược lại set count mới |
| Update `best` trước shrink | `[A,B,C]`, `k=2` | `right=2`, ghi `best=3` cho `{A,B,C}` invalid | Đo answer trước khi phục hồi invariant | Đưa `best = Math.max(...)` xuống sau `while` |
| Quên `left += 1` | `[A,B]`, `k=1` | `right=1`, lần shrink thứ hai đọc lại A với count không tồn tại | Biên không khớp Map; loop không tiến | Đặt `left += 1` cuối mỗi lượt remove |

#### 10. Ba bài reconstruction

1. **Từ bảng mapping:** dựng function chỉ từ mục 5; đánh dấu dòng nào thay đổi biên và dòng nào thay đổi representation của window.
2. **Từ hành động Việt:** che mọi code, đọc câu mục 2 và dựng đúng thứ tự add → check/shrink → answer → `right` tiến.
3. **Từ đề bài:** chỉ dùng câu “đoạn liên tiếp dài nhất có nhiều nhất `k` loại”. Tự chọn state, giải thích vì sao Set sai với duplicate, rồi test `[A,A,B]`, `k=1`.

## `[SW-05]` — Đếm số window hợp lệ

### Core — bản chất và brute force bottleneck

Sau khi shrink để window `[left,right]` valid theo điều kiện “at most”, **mọi** đoạn kết thúc ở right và bắt đầu từ `left..right` cũng valid. Thay enumerate chúng, cộng `right-left+1`.

### Dấu hiệu nhận dạng

Đề hỏi số subarray/substring thỏa at-most constraint. Với “exactly k”, thường tính hiệu hai hàm at-most. Nếu predicate không hereditary khi shrink, công thức này sai.

### State, invariant và transition

Invariant sau shrink: `[left,right]` valid và left là boundary nhỏ nhất còn giữ validity theo loop. Có `right-left+1` start hợp lệ cho endpoint right. Transition add → shrink invalid → cộng count.

### Template JavaScript

```js
function countAtMostKDistinct(values, limit) {
  if (limit < 0) return 0;
  const frequency = new Map();
  let left = 0;
  let answer = 0;
  for (let right = 0; right < values.length; right++) {
    addFrequency(frequency, values[right]);
    while (frequency.size > limit) removeFrequency(frequency, values[left++]);
    answer += right - left + 1;
  }
  return answer;
}
```

### Dry run

`[A,B]`, at most 2: right 0 đóng góp 1 (`[A]`); right 1 đóng góp 2 (`[B]`,`[A,B]`), tổng 3.

### Complexity

Một lần gọi `O(n)` expected. Exactly k gọi hai lần vẫn `O(n)`; Map space `O(k)`/distinct.

### Variant knobs và counterexample

- Exactly k: `atMost(k)-atMost(k-1)`.
- Answer có thể tới `n(n+1)/2`; kiểm numeric range.
- Counterexample chỉ `answer++` mỗi right sẽ bỏ nhiều start hợp lệ.
- Điều kiện “sum exactly target” không hereditary, không dùng công thức at-most trực tiếp khi có số âm.

### Transfer

Mutation drill: count substring có đúng k distinct. Explain-back vì sao hiệu hai tập lồng nhau cho exactly k.

## `[SW-06]` — Chọn đúng giữa window, two pointers và prefix

### Core — decision pattern, không tạo skeleton giả

Brute force chung là enumerate mọi subarray, nhưng ba công cụ loại bỏ bottleneck bằng proof khác nhau. `SW-06` là COMBINATION/contrast: nhiệm vụ là chọn engine đúng, không học thêm một đoạn code.

### Dấu hiệu nhận dạng và counter-signal

```text
Fixed k, state add/remove được       → SW-01
Variable contiguous + shrink monotone→ SW-02/03
Nhiều range query tĩnh              → PRE-01/02
Exact subarray sum có số âm         → PRE-05 prefix Map
Pair trên sorted array              → TP-01/05
Window max/min                      → monotonic deque
```

### State, invariant và transition

- Window state mô tả **một đoạn đang mở** và mutate khi biên chạy.
- Prefix state mô tả **mọi lịch sử từ đầu**; query lấy hai snapshot.
- Inward two pointers loại một phía của search space theo sorted monotonic rule.

Invariant phải được chọn trước template; thay engine mà giữ nguyên lời proof là dấu hiệu học vẹt.

### Template decision code

```js
function chooseRangeEngine({ fixedWidth, manyStaticQueries, hasNegative, exactSum }) {
  if (manyStaticQueries) return "PREFIX";
  if (exactSum && hasNegative) return "PREFIX_MAP";
  if (fixedWidth) return "FIXED_WINDOW";
  return "PROVE_MONOTONE_BEFORE_VARIABLE_WINDOW";
}
```

### Dry run quyết định

“Đếm đoạn tổng 0 trong `[1,-1,1]`” có số âm và exact sum ⇒ prefix Map. “Đoạn ngắn nhất tổng ≥7 trên số dương” ⇒ variable window. “100000 query sum” ⇒ prefix array.

### Complexity

Các lựa chọn tốt thường `O(n)` build/scan; prefix query `O(1)`. Nhưng complexity không thay proof: `O(n)` sai vẫn là sai.

### Variant knobs và counterexample

- Nonnegative có zero: pointer vẫn không lùi nhưng tie/empty cần rõ.
- Negative phá sum monotonicity.
- Static vs online update đổi prefix sang Fenwick/segment tree.
- Counterexample gọi mọi bài hai pointer là window sẽ không nói được add/remove state.

### Transfer

Lấy ba bài OF052, OF053, OF060, che tên pattern và viết decision trace. Blank Page Test: trong 60 giây nêu state/invariant khác nhau của prefix, fixed window và variable window.
