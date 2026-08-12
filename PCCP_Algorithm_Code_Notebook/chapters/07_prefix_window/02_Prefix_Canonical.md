# Prefix Sum canonical — `PRE-01..05`

[← Chương 07](../../07_Sliding_Window_Prefix_Sum.md) · [Beginner guide](01_Prefix_Sum_From_Zero.md) · [PF23](../../../docs/pccp-700-roadmap/pattern-families/PF23_DIFFERENCE_PREFIX.md)

## `[PRE-01]` — Prefix 1D: lưu lịch sử tích lũy

### Core — bản chất và bottleneck

Brute force trả mỗi query bằng cách cộng lại đoạn, tốn `O(length)` cho một query và lặp lại cùng phép cộng. Pattern loại bỏ phần việc lặp bằng một mảng lịch sử: `prefix[k]` là tổng **k phần tử đầu tiên**.

### Dấu hiệu nhận dạng và counter-signal

- Nhiều câu hỏi tổng trên cùng một array gần như không đổi.
- Query theo đoạn liên tiếp; phép gộp có phép đảo phù hợp.
- Không chọn prefix tĩnh nếu update/query xen kẽ liên tục; một update làm stale mọi prefix phía sau.

### State, invariant và transition

State là `prefix` dài `n+1`. Invariant: sau iteration `index`, `prefix[index+1]` bằng tổng `values[0..index]`. Base `prefix[0]=0` là tổng prefix rỗng.

Transition:

```text
prefix[index + 1] = prefix[index] + values[index]
```

Thứ tự tính trái→phải bảo đảm predecessor đã đúng.

### Template JavaScript

```js
function buildPrefixSums(values) {
  const prefix = Array(values.length + 1).fill(0);
  for (let index = 0; index < values.length; index++) {
    prefix[index + 1] = prefix[index] + values[index];
  }
  return prefix;
}
```

### Dry run

`[3,1,4]` tạo lần lượt `[0] → [0,3] → [0,3,4] → [0,3,4,8]`. Ô index trong prefix biểu diễn **count**, không phải index cuối của values.

### Complexity

Build `O(n)` time, `O(n)` space. Mỗi input được gộp đúng một lần.

### Variant knobs và lỗi

- Tổng có thể đổi thành XOR/product nếu phép query có inverse phù hợp.
- Numeric range lớn có thể cần BigInt đồng nhất.
- Không khởi tạo prefix bằng `values[0]`; cách đó tạo nhánh đặc biệt cho đoạn bắt đầu 0.

### Transfer

Mutation drill: đổi `values` thành stream boolean `isEven`; khi đó prefix lưu count. Qua `PRE-02` để học phép trừ hai snapshot và `PRE-04` cho hai chiều.

## `[PRE-02]` — Range query bằng hiệu hai prefix

### Core — bản chất và brute force

Brute force cộng `values[left..right]` mỗi query. Prefix đã biết tổng trước `left` và tổng tới `right`; trừ phần trước đoạn khỏi phần tới cuối đoạn.

### Dấu hiệu nhận dạng

Nhiều query đóng `[left..right]` trên dữ liệu tĩnh. Nếu chỉ một query, scan trực tiếp có thể đơn giản hơn; nếu cần update online, prefix tĩnh không đủ.

### State, invariant và transition

State kế thừa `prefix[k]=sum(values[0..k))`. Invariant algebra:

```text
sum([left..right]) = sum([0..right]) - sum([0..left-1])
                   = prefix[right+1] - prefix[left]
```

Query không mutate state; transition chỉ là projection từ hai snapshot.

### Template JavaScript

```js
function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}
```

### Dry run

Với prefix `[0,3,4,8,9]`, query `[1..3]` là `prefix[4]-prefix[1]=9-3=6`. Query `[0..0]` là `prefix[1]-prefix[0]`, không cần nhánh riêng.

### Complexity

Sau build `O(n)`, mỗi query `O(1)` time; space vẫn `O(n)`.

### Variant knobs và counterexample

- Nếu API dùng half-open `[left,right)`, công thức thành `prefix[right]-prefix[left]`.
- Counterexample off-by-one: `[5]`, query `[0..0]` phải trả 5; `prefix[right]-prefix[left]` trả 0.
- Validate boundary nếu contract không bảo đảm input hợp lệ.

### Transfer

Mutation drill: trả average bằng `rangeSum/(right-left+1)`. Contrast với SW-01: prefix trả query tùy ý; window scan mọi đoạn cùng width theo thứ tự.

## `[PRE-03]` — Prefix count và nhiều thuộc tính

### Core — bản chất và bottleneck

Không chỉ số gốc mới cộng được. Brute force kiểm predicate trên từng phần tử của từng query; ta chuyển mỗi item thành indicator 0/1 và prefix hóa indicator.

### Dấu hiệu nhận dạng

Query hỏi “trong đoạn có bao nhiêu item loại X/chẵn/âm”. Số loại nhỏ và cố định phù hợp nhiều prefix arrays; loại nhiều/dynamic có thể cần cấu trúc khác.

### State, invariant và transition

State `countPrefix[k]` là số item thỏa predicate trong `k` phần tử đầu. Invariant được giữ bởi transition cộng indicator:

```text
countPrefix[i+1] = countPrefix[i] + (predicate(values[i]) ? 1 : 0)
```

### Template JavaScript

```js
function buildCountPrefix(values, predicate) {
  const prefix = Array(values.length + 1).fill(0);
  for (let index = 0; index < values.length; index++) {
    prefix[index + 1] = prefix[index] + (predicate(values[index]) ? 1 : 0);
  }
  return prefix;
}
```

### Dry run

`[2,3,4]`, predicate even tạo `[0,1,1,2]`; count even `[1..2] = 2-1 = 1`.

### Complexity

Một predicate: `O(n)` build, `O(1)` query, `O(n)` space. `c` thuộc tính độc lập tốn `O(cn)` build/space.

### Variant knobs và counterexample

- Nhiều category: `prefixByKind[kind][i]` hoặc array prefix cho từng kind.
- Weighted predicate trả contribution thay 0/1.
- Counterexample: dùng global frequency Map không trả được count **trong range**.

### Transfer

Mutation drill: prefix vowel counts cho string và trả vector count trong substring. Contrast SW-04: prefix phù hợp query tĩnh; frequency window phù hợp biên chạy online.

## `[PRE-04]` — Prefix 2D và rectangle query

### Core — bản chất và brute force

Brute force rectangle query quét mọi cell. Prefix 2D lưu tổng rectangle từ `(0,0)` tới trước `(row,column)`, rồi dùng inclusion–exclusion bốn vùng.

### Dấu hiệu nhận dạng

Nhiều rectangle sum/count query trên matrix tĩnh. Nếu có nhiều rectangle **update** rồi mới đọc kết quả, dùng difference 2D ở PRE-05/PF23.

### State, invariant và transition

`prefix[r+1][c+1]` là tổng matrix rows `[0..r]`, columns `[0..c]`. Transition:

```text
top + left - overlap + current
```

Invariant: sau row-major processing, mọi rectangle prefix kết thúc tại cell đã xử lý đều đúng.

### Template JavaScript

```js
function buildPrefix2D(matrix) {
  const rows = matrix.length;
  const columns = matrix[0]?.length ?? 0;
  const prefix = Array.from({ length: rows + 1 }, () => Array(columns + 1).fill(0));
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      prefix[row + 1][column + 1] = matrix[row][column]
        + prefix[row][column + 1]
        + prefix[row + 1][column]
        - prefix[row][column];
    }
  }
  return prefix;
}
```

```js
function rectangleSum(prefix, row1, column1, row2, column2) {
  return prefix[row2 + 1][column2 + 1]
    - prefix[row1][column2 + 1]
    - prefix[row2 + 1][column1]
    + prefix[row1][column1];
}
```

### Dry run

Matrix `[[1,2],[3,4]]` có prefix padded `[[0,0,0],[0,1,3],[0,4,10]]`. Query cột 1 từ row 0..1: `10-4-0+0=6`.

### Complexity

Build `O(rows·columns)`, query `O(1)`, space `O(rows·columns)`.

### Variant knobs và counterexample

- Rectangle input inclusive/exclusive quyết định `+1`.
- Prefix count cell thỏa predicate dùng indicator.
- Counterexample: quên cộng lại overlap làm vùng trên-trái bị trừ hai lần.
- `Array(rows).fill(Array(columns).fill(0))` dùng chung row reference và làm hỏng matrix.

### Transfer

Mutation drill: count obstacles trong rectangle. Bài official OF060 dùng hướng ngược: four-corner difference rồi prefix reconstruct.

## `[PRE-05]` — Prefix kết hợp: difference array và prefix-history Map

### Core — hai bottleneck, hai helper pattern

Đây là `COMBINATION`, không có một skeleton giả cho hai bài khác nhau:

- Nhiều range update offline: difference ghi nơi hiệu lực **bắt đầu/kết thúc**, prefix khôi phục.
- Đếm subarray exact target có số âm: prefix-history Map lưu các tổng quá khứ cần tra.

Brute force lần lượt là sửa mọi cell của từng update hoặc enumerate mọi subarray `O(n²)`.

### Dấu hiệu nhận dạng và phân vai

```text
Pattern chính: Prefix transformation
Pattern phụ: Map frequency hoặc boundary marking
Pattern chịu trách nhiệm duyệt: một pass updates/input
Pattern chịu trách nhiệm lưu state: diff boundaries hoặc Map<prefix,count>
```

Nếu update/query online xen kẽ, difference offline không đủ. Nếu array toàn dương và chỉ tìm một đoạn, sliding window có thể phù hợp hơn prefix Map.

### State, invariant và transition

Difference invariant: prefix của `diff` tại index `i` bằng tổng mọi delta có range chứa `i`.

Prefix-history invariant: trước khi xử lý current value, Map đếm đúng mọi prefix **trước current boundary**. Vì thế phải check `currentPrefix-target` trước khi add current prefix.

### Template JavaScript

```js
function applyRangeAdds(length, updates) {
  const diff = Array(length + 1).fill(0);
  for (const [left, right, delta] of updates) {
    diff[left] += delta;
    diff[right + 1] -= delta;
  }
  const result = Array(length);
  let running = 0;
  for (let index = 0; index < length; index++) {
    running += diff[index];
    result[index] = running;
  }
  return result;
}
```

```js
function countTargetSubarrays(values, target) {
  const frequency = new Map([[0, 1]]);
  let prefix = 0;
  let answer = 0;
  for (const value of values) {
    prefix += value;
    answer += frequency.get(prefix - target) ?? 0;
    frequency.set(prefix, (frequency.get(prefix) ?? 0) + 1);
  }
  return answer;
}
```

### Dry run

Difference: update `[1..3]+=5` ghi `diff[1]+=5`, `diff[4]-=5`; running delta chỉ có hiệu lực tại 1,2,3.

Prefix Map: `[1,-1,1]`, target 0. Prefix lần lượt 1,0,1; các needed prefix tìm được 0,1,0 với frequency tích lũy, tạo hai đoạn tổng 0.

### Complexity

Range updates `O(n+q)` time, `O(n)` space. Prefix Map `O(n)` expected time và `O(n)` space.

### Variant knobs và counterexample

- Difference 2D dùng four corners và prefix hai axes như OF060.
- Prefix Map cần count, không phải Set: cùng prefix xuất hiện nhiều lần tạo nhiều subarray.
- `target=0` bóc lỗi update Map trước check bằng cách đếm empty segment giả.
- Rectangle inclusive cần padded row/column để đánh dấu `end+1`.

### Transfer

Làm OF060 cho difference 2D; mutation drill range add 1D; rồi đếm exact target trên array có số âm để chứng minh vì sao SW-03 không dùng được.
