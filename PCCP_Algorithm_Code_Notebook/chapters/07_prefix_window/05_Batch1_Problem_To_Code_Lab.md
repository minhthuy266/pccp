# Batch 1 lab — Prefix Sum và Sliding Window: từ đề đến code

[← Chương 07](../../07_Sliding_Window_Prefix_Sum.md) · [Chuẩn](../../00_PROBLEM_TO_CODE_STANDARD.md) · [Tracker](../../PROBLEM_EXPLANATION_TRACKER.md)

File này là deep explanation canonical cho bốn **dạng** được yêu cầu trong Batch 1; nó mở rộng,
không thay thế hai canonical pattern [Prefix](02_Prefix_Canonical.md) và
[Sliding Window](03_Sliding_Window_Canonical.md). Mỗi ví dụ dưới đây là đề tự chứa của repo.

## B1-PREFIX — nhiều truy vấn tổng đoạn

### Contract, Bound và làm bằng tay

`rangeSums(values, queries)` trả tổng inclusive `[left,right]` cho từng query. `values` có số
âm/trùng; `n,q ≤ 100 000`. Cộng tay `[3,1,4,1]`, đoạn `[1,3]`: lấy tổng `0..3 = 9` trừ phần
trước `1`, tức `prefix[1]=3`, được 6. `O(nq)` không đạt; cần `O(n+q)`.

### Brute force → bottleneck → pattern

```text
for each [left,right]: sum=0; for index left..right: sum += values[index]; append sum
```

```js
function rangeSumsBruteForce(values, queries) {
  const answer = [];
  for (const query of queries) {
    const left = query[0];
    const right = query[1];
    let rangeSum = 0;
    for (let index = left; index <= right; index++) {
      rangeSum += values[index];
    }
    answer.push(rangeSum);
  }
  return answer;
}
```

Mỗi value trong các đoạn chồng lấn bị cộng lại tới `q` lần. Prefix sum giữ tổng quá khứ một
lần: `prefix[k]` là tổng **k phần tử đầu**, nên đáp án là `prefix[right+1]-prefix[left]`.
Không dùng sliding window: query có biên tùy ý, không phải các cửa sổ dịch tuần tự.

### State/init, transition và invariant

| State | Kiểu | Lưu gì | Tại sao | Init | Vì sao | Scope |
| --- | --- | --- | --- | --- | --- | --- |
| `prefix` | `number[]` | tổng k phần tử đầu | trả query O(1) | `Array(n+1).fill(0)` | prefix rỗng bằng 0 | toàn hàm |
| `answer` | `number[]` | tổng theo thứ tự query | output | `[]` | chưa trả query nào | toàn hàm |
| `index/query` | number/tuple | current | đọc một lượt | từ loop | reset từng lượt | iteration |

Transition build: `prefix[index+1] = prefix[index] + values[index]`. Transition query: đọc hai
biên rồi push hiệu. Sau khi build index `i`, `prefix[i+1]` đúng bằng tổng `values[0..i]`; phép
trừ bỏ đúng prefix trước `left`, không bỏ/đếm trùng phần tử nào.

```js
function rangeSums(values, queries) {
  const prefix = Array(values.length + 1).fill(0);
  for (let index = 0; index < values.length; index++) {
    const currentValue = values[index];
    prefix[index + 1] = prefix[index] + currentValue;
  }
  const answer = [];
  for (const query of queries) {
    const left = query[0];
    const right = query[1];
    const rangeSum = prefix[right + 1] - prefix[left];
    answer.push(rangeSum);
  }
  return answer;
}
```

### Blueprint, dry run, lỗi và recall

```text
OUTPUT: answer theo query; PREPARE: prefix dài n+1; GLOBAL STATE: prefix, answer
INIT: prefix[0]=0; MAIN LOOP: for build rồi for queries; CURRENT ITEM: value/query
PER-ITERATION STATE: rangeSum; CHECK: contract bảo đảm biên hợp lệ; BRANCH: không
UPDATE: prefix[i+1], answer.push; POINTER MOVEMENT: for tự tăng
STOP / RETURN: hết queries, return answer; CLEANUP: không
```

`[3,1,4]`: prefix `0→[0,3]→[0,3,4]→[0,3,4,8]`; `[0,0]→3`, `[1,2]→8-3=5`.
Complexity `O(n+q)`, space `O(n+q output)`. Sai `prefix[right]` lộ bởi `[5],[[0,0]]`;
init array dài `n` lộ ở query chạm cuối; dùng `slice().reduce()` vẫn `O(nq)`.

```text
Recall 1: lưu tổng k phần tử đầu → right+1 trừ left.
Recall 2: STATE prefix/answer; LOOP build/query; UPDATE assign/push; RETURN answer.
Recall 3: prefix[i+1] = ____ + ____; rangeSum = prefix[____] - prefix[____].
```

## B1-FIXED-WINDOW — tổng mọi cửa sổ dài k

### Contract → brute force → bottleneck → pattern

`fixedWindowSums(values,k)` trả tổng mọi đoạn liên tiếp dài đúng `k`; `1≤k≤n≤100 000`.
Làm tay `[2,1,3,4], k=3`: cộng `2+1+3=6`; cửa sổ sau bỏ 2, thêm 4 → 8. Brute force
hai loop cộng lại `k-1` phần tử chung, `O(nk)`:

```js
function fixedWindowSumsBruteForce(values, windowSize) {
  const answer = [];
  for (let left = 0; left + windowSize <= values.length; left++) {
    let windowSum = 0;
    for (let offset = 0; offset < windowSize; offset++) {
      windowSum += values[left + offset];
    }
    answer.push(windowSum);
  }
  return answer;
}
```

Fixed sliding window giữ sum phần giao, add entering và remove leaving. Không dùng cho maximum
bằng phép `max -= leaving`: maximum không có phép nghịch đảo; khi đó cần deque.

| State | Kiểu | Lưu gì | Cần vì | Init | Vì sao | Scope |
| --- | --- | --- | --- | --- | --- | --- |
| `windowSum` | number | tổng window hiện tại | tái dùng overlap | `0` | chưa add gì | toàn loop |
| `answer` | array | các tổng đủ k | output | `[]` | chưa có window | toàn hàm |
| `right` | number | biên phải | mỗi item vào một lần | `0` từ for | quét index | loop |

```js
function fixedWindowSums(values, windowSize) {
  const answer = [];
  let windowSum = 0;
  for (let right = 0; right < values.length; right++) {
    const enteringValue = values[right];
    windowSum += enteringValue;
    if (right >= windowSize) {
      const leavingIndex = right - windowSize;
      const leavingValue = values[leavingIndex];
      windowSum -= leavingValue;
    }
    if (right >= windowSize - 1) {
      answer.push(windowSum);
    }
  }
  return answer;
}
```

Sau remove ở mỗi `right`, invariant: `windowSum` là tổng đoạn
`max(0,right-k+1)..right`. Mỗi item vào một lần, ra tối đa một lần: `O(n)`, space ngoài output
`O(1)`. Với `[2,1,3,4],k=3`: sums state `2,3,6(push),10-2=8(push)`.

```text
OUTPUT: list sums; PREPARE: validate 1<=k<=n; GLOBAL STATE: sum, answer
INIT: 0, []; MAIN LOOP: for each right; CURRENT ITEM: enteringValue
PER-ITERATION STATE: leavingIndex/value; CHECK: right>=k, right>=k-1
BRANCH: remove nếu quá k; UPDATE: add/remove/push; POINTER: for tăng right
STOP / RETURN: hết array; CLEANUP: không
```

Sai remove `right-k+1` lộ `[1,2,3],k=2`; push trước remove lộ window thứ hai; init sum bằng
`values[0]` rồi vẫn quét từ 0 lộ double count; dùng `shift()` không cần thiết. Recall blank:
`sum += ____; if (right >= k) sum -= values[____]; if (right >= ____) answer.push(sum)`.

## B1-VARIABLE-MAP — đoạn ngắn nhất chứa mọi loại

### Contract, bound, hand và brute force

Trả `[start,end]` 0-based của đoạn ngắn nhất chứa mọi loại có trong `values`; hòa chọn start
nhỏ hơn. `n≤100 000`, duplicate tùy ý. Với `A,B,A,C,B`, mở phải tới C, rồi bỏ A đầu nhưng
không bỏ B nếu làm thiếu; candidate `[1,3]`, sau đó `[2,4]`, hòa nên giữ `[1,3]`.

Brute force thử mọi start/end, dựng Set từng đoạn và so đủ loại; full baseline `O(n³)`:

```js
function shortestCoverBruteForce(values) {
  const requiredKinds = new Set(values).size;
  let best = [0, values.length - 1];
  for (let left = 0; left < values.length; left++) {
    for (let right = left; right < values.length; right++) {
      const kinds = new Set();
      for (let index = left; index <= right; index++) kinds.add(values[index]);
      if (kinds.size === requiredKinds && right - left < best[1] - best[0]) {
        best = [left, right];
      }
    }
  }
  return best;
}
```

Bottleneck là đếm lại phần overlap. Variable window + Map giữ count; `while` vì một current
có thể cho phép bỏ nhiều left. Không dùng khi predicate mất tính đơn điệu, ví dụ exact sum có
số âm.

| State | Kiểu | Lưu gì | Init/lý do | Scope |
| --- | --- | --- | --- | --- |
| `requiredKinds` | number | số loại toàn input | `new Set(values).size` | toàn hàm |
| `windowCount` | Map | count trong `[left..right]` | empty | xuyên loop |
| `left` | number | biên trái sống | 0 | xuyên loop |
| `bestLeft/bestRight` | number | output tốt nhất | full range | xuyên loop |

```js
function shortestCover(values) {
  if (values.length === 0) return [];
  const requiredKinds = new Set(values).size;
  const windowCount = new Map();
  let left = 0;
  let bestLeft = 0;
  let bestRight = values.length - 1;
  for (let right = 0; right < values.length; right++) {
    const entering = values[right];
    windowCount.set(entering, (windowCount.get(entering) ?? 0) + 1);
    while (windowCount.size === requiredKinds) {
      if (right - left < bestRight - bestLeft) {
        bestLeft = left;
        bestRight = right;
      }
      const leaving = values[left];
      const remainingCount = windowCount.get(leaving) - 1;
      if (remainingCount === 0) windowCount.delete(leaving);
      else windowCount.set(leaving, remainingCount);
      left++;
    }
  }
  return [bestLeft, bestRight];
}
```

Đầu mỗi lần check, Map đúng bằng window; sau `while`, window thiếu ít nhất một loại và mọi
valid window kết thúc ở right đã được xét. Right/left chỉ tiến, mỗi item add/remove một lần:
`O(n)`, Map `O(k)`. Tie dùng `<`, không `<=`. Empty trả `[]`; `[A,A,A]` làm while chạy mỗi
lượt; `A,B,A,C` tại C làm while chạy hai lần. Quên delete count 0 lộ `[A,B]`; update best sau
remove bỏ candidate; dùng `if` bỏ window ngắn hơn.

```text
OUTPUT: best pair; PREPARE: requiredKinds; STATE: Map,left,best; INIT: empty,0,full
LOOP: for right; CURRENT: entering; CHECK: Map.size===requiredKinds
BRANCH: while valid; UPDATE: best rồi decrement/delete leaving; POINTER: left++
STOP: hết right; CLEANUP: không; RETURN: best
Recall blank: while (____ === ____) { update best; decrement ____; if zero ____; ____++; }
```

## B1-SUBARRAY-K — đếm đoạn liên tiếp tổng bằng k

### Contract → lựa chọn engine

`countSubarraysWithSum(values,target)` đếm mọi đoạn liên tiếp không rỗng tổng đúng target.
`n≤100 000`, có số âm, zero và duplicate prefix. `[1,-1,1]`, target 1 có ba đoạn. Two pointers
không an toàn vì thêm số âm có thể làm sum giảm; dùng prefix-history Map.

Brute force cố định left, cộng dần right (không cần loop thứ ba), đúng `O(n²)`:

```js
function countSubarraysWithSumBruteForce(values, target) {
  let answer = 0;
  for (let left = 0; left < values.length; left++) {
    let rangeSum = 0;
    for (let right = left; right < values.length; right++) {
      rangeSum += values[right];
      if (rangeSum === target) answer++;
    }
  }
  return answer;
}
```

Các left khác nhau tính lại suffix. Nếu current prefix là `S`, đoạn có tổng target bắt đầu sau
mọi prefix cũ `S-target`; Map phải lưu **frequency**, Set sẽ làm mất duplicate.

| State | Kiểu | Lưu gì | Init | Vì sao | Scope |
| --- | --- | --- | --- | --- | --- |
| `prefixSum` | number | tổng tới current | 0 | prefix rỗng | xuyên loop |
| `prefixFrequency` | Map | số lần mỗi prefix cũ | `{0:1}` | đếm đoạn bắt đầu index 0 | xuyên loop |
| `answer` | number | số đoạn đã chốt | 0 | chưa thấy đoạn | output |

```js
function countSubarraysWithSum(values, target) {
  const prefixFrequency = new Map();
  prefixFrequency.set(0, 1);
  let prefixSum = 0;
  let answer = 0;
  for (const currentValue of values) {
    prefixSum += currentValue;
    const requiredPreviousPrefix = prefixSum - target;
    const matchingStarts = prefixFrequency.get(requiredPreviousPrefix) ?? 0;
    answer += matchingStarts;
    const previousFrequency = prefixFrequency.get(prefixSum) ?? 0;
    prefixFrequency.set(prefixSum, previousFrequency + 1);
  }
  return answer;
}
```

Quan trọng: query **trước** insert current để không đếm đoạn rỗng khi target 0. Trước current,
Map chứa đúng prefix kết thúc trước current; mỗi occurrence tạo một start khác. Mỗi item một
lượt, Map tối đa `n+1`: `O(n)` expected time/space.

`[1,-1,1], target=1`: prefix 1 tìm 0→+1; prefix 0 tìm -1→0 rồi freq(0)=2; prefix 1 tìm
0→+2, answer 3. Init Map rỗng lộ `[1],1`; Set lộ `[0,0],0`; insert trước query lộ
`[1],0`; sliding window lộ input có âm.

```text
OUTPUT: count; PREPARE: Map prefix; GLOBAL STATE: Map,sum,answer; INIT: {0:1},0,0
MAIN LOOP: for each value; CURRENT ITEM: currentValue; PER-ITERATION: required,matching
CHECK: lookup sum-target; BRANCH: không; UPDATE: answer rồi frequency current sum
POINTER: for; STOP / RETURN: return answer; CLEANUP: không
Recall blank: prefix += ____; answer += freq.get(____) ?? 0; freq.set(prefix, ____ + 1).
```

## Template phòng thi chung

```text
OUT: scalar/list/pair theo contract
LIMIT: n,q tới 1e5 → tránh enumerate mọi đoạn
HAND: overlap nào được dùng lại?
BRUTE: cố định biên và quét phần còn lại
SLOW: cùng phần overlap bị cộng/đếm lại
PATTERN: prefix nếu query/history; window nếu biên dịch đơn điệu
STATE + INIT: prefix[0]=0 hoặc Map(0→1); window count empty; pointers 0
LOOP + INVARIANT: for right; while chỉ khi một right loại được nhiều left
UPDATE + STOP: query trước insert; add/remove đối xứng; return theo contract

PREPARE → STATE → LOOP → CURRENT → CHECK → UPDATE → CLEANUP → RETURN
```

