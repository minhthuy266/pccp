# PCCP 700+ — Giáo trình tư duy từ đề đến code JavaScript

Tài liệu này không phải lịch học. Luôn đi từ [`README.md`](../../README.md) đến [`PLAN_PCCP_700_REBUILD_2026-09-05.md`](../../PLAN_PCCP_700_REBUILD_2026-09-05.md), rồi chỉ đọc mục được chỉ định; kết quả thực tế được ghi trong [`TRACKER_PCCP_REBUILD_2026.csv`](../../TRACKER_PCCP_REBUILD_2026.csv).

Tài liệu này không cố nhồi thêm template. Mục tiêu là biến một đề chưa gặp thành một chuỗi quyết định có thể lặp lại:

```text
Contract → Bound → Brute force → Bottleneck → State
→ Invariant → Transition → Complexity → Code → Test
```

Mỗi chương gồm một ví dụ tự chứa, luồng suy luận, code mẫu và gate. Không đọc liên tục 12 chương và không mặc định một chương mỗi ngày. Chỉ đọc mục được plan chính chỉ định; một chương có thể kéo dài nhiều ngày. Sau đó đóng tài liệu và làm bài luyện của ngày đó.

---

# Chương 0 — Hệ điều hành giải bài

## 0.1 Bảy dòng phải viết trước khi code

```text
Contract:
Bound:
Brute force:
Bottleneck:
State:
Invariant:
Complexity:
```

Không cần viết văn. Mỗi dòng một câu là đủ. Ví dụ:

```text
Contract: trả index điểm lớn nhất; hòa lấy index nhỏ nhất.
Bound: n <= 100000, cần O(n) hoặc O(n log n).
Brute force: với mỗi index, kiểm tra có điểm nào lớn hơn.
Bottleneck: kiểm tra lại toàn mảng cho từng index => O(n²).
State: bestValue, bestIndex.
Invariant: sau khi xử lý [0..i], state là đáp án đúng của đoạn đó.
Complexity: O(n) time, O(1) space.
```

## 0.2 Bound quyết định thuật toán

| `n` gần đúng | Mức thường còn an toàn | Nghĩ tới |
|---:|---:|---|
| `<= 20` | `O(2^n)`, đôi khi `O(n!)` | backtracking, bitmask |
| `<= 500` | `O(n²)` | nested loop, DP 2D |
| `<= 100000` | `O(n log n)` | sort, heap, binary search |
| `<= 1000000` | `O(n)` | scan, hash, two pointers |

Đây là heuristic, không phải luật tuyệt đối. Chi phí mỗi vòng, số test và giới hạn ngôn ngữ vẫn quan trọng.

## 0.3 Brute force không phải câu trả lời ngu

Brute force giúp xác định:

1. điều kiện đúng chính xác;
2. phần công việc đang bị lặp;
3. thông tin nào cần lưu để bỏ lặp.

Nâng cấp thuật toán thường là: **đừng tính lại thứ có thể nhớ** hoặc **đừng thử trạng thái chắc chắn không cần**.

## 0.4 Cách tìm invariant

Hỏi: “Sau khi xử lý xong phần tử/thời điểm/trạng thái hiện tại, điều gì chắc chắn đúng?”

- scan max: `best` đúng cho prefix đã đọc;
- sliding window: cửa sổ hiện tại luôn thỏa điều kiện;
- BFS: khi lấy node khỏi queue lần đầu, khoảng cách của nó là ngắn nhất;
- binary search: đáp án luôn còn nằm trong đoạn tìm kiếm;
- DP: `dp[i]` đã chứa lời giải của bài toán con được định nghĩa.

Invariant là cầu nối giữa ý tưởng và code. Nếu không nói được invariant, code thường là thử-và-sai.

## 0.5 Gate chương

Lấy ba đề bất kỳ, chưa code. Trong 60 giây/đề, chỉ viết Contract, Bound và brute force. Qua khi không bỏ sót tie-break, vô nghiệm hoặc constraint chính.

---

# Chương 1 — Scan array và matrix: học cách tạo state

## 1.1 Ví dụ: index lớn nhất, hòa lấy index nhỏ nhất

Input `scores = [7, 9, 9, 4]`, output `1`.

### Suy luận

- Contract có hai tầng: giá trị lớn nhất, rồi index nhỏ nhất.
- Vì duyệt trái sang phải, người thắng cũ tự động có index nhỏ hơn.
- Chỉ cập nhật khi gặp giá trị **lớn hơn**, không cập nhật khi bằng.

State tối thiểu:

- `bestIndex`: vị trí thắng hiện tại;
- giá trị thắng lấy bằng `scores[bestIndex]`, không nhất thiết lưu thêm biến.

Invariant: sau khi xử lý đến `i`, `bestIndex` là đáp án đúng của `scores[0..i]`.

```js
function indexOfBest(scores) {
  let bestIndex = 0;

  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[bestIndex]) {
      bestIndex = i;
    }
  }

  return bestIndex;
}
```

Nếu đề đổi thành “hòa lấy index lớn nhất”, transition đổi thành `>=`. Tie-break thường nằm đúng ở dấu `<`, `<=`, `>` hoặc `>=`.

## 1.2 Matrix: luôn tách hàng và cột

```js
function sumMatrix(matrix) {
  let total = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      total += matrix[row][col];
    }
  }

  return total;
}
```

Invariant của vòng trong: trước khi xử lý `matrix[row][col]`, `total` là tổng của mọi ô đứng trước ô đó theo thứ tự duyệt.

## 1.3 Lỗi phải tự bắt

- `arr[row, col]` dùng toán tử comma, không truy cập matrix;
- dùng `matrix.length` cho số cột của matrix chữ nhật;
- khởi tạo `best = 0` khi dữ liệu có thể toàn số âm;
- cập nhật khi bằng dù đề yêu cầu giữ index nhỏ nhất;
- đọc output là giá trị nhưng lại trả index, hoặc ngược lại.

## 1.4 Drill trang trắng

Viết ba hàm không nhìn: min + index tie-break, đếm số âm từng hàng, tổng hai đường chéo. Mỗi hàm phải nói invariant trước khi chạy.

---

# Chương 2 — `Map` và `Set`: nhớ đúng loại thông tin

## 2.1 Chọn cấu trúc bằng câu hỏi

- Chỉ cần biết “đã xuất hiện chưa?” → `Set`.
- Cần biết “xuất hiện bao nhiêu lần?” → `Map<value, count>`.
- Cần tra cứu thuộc tính theo khóa → `Map<key, data>`.
- Chỉ duyệt một lần và không cần tra cứu → có thể không cần hash.

## 2.2 Ví dụ: hai số có tổng bằng target

Brute force thử mọi cặp: `O(n²)`. Bottleneck là với mỗi số, lại tìm phần bù trong phần còn lại.

Ta nhớ các số đã đi qua bằng `Map<value, index>`.

State: `seen` chứa đúng các phần tử ở bên trái `i`.

Invariant: trước mỗi vòng, nếu phần bù đã xuất hiện trước đó thì `seen` tìm được nó trong thời gian trung bình `O(1)`.

```js
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (seen.has(need)) {
      return [seen.get(need), i];
    }

    seen.set(nums[i], i);
  }

  return [-1, -1];
}
```

Thứ tự `check` trước `set` ngăn một phần tử tự ghép với chính nó.

## 2.3 Frequency Map

```js
function countFrequency(items) {
  const counts = new Map();

  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  return counts;
}
```

Dùng `?? 0` diễn tả đúng ý “chưa có key”. `|| 0` thường vẫn chạy với count, nhưng dễ tạo thói quen sai khi giá trị hợp lệ có thể là `0`, `false` hoặc chuỗi rỗng.

## 2.4 Lỗi phải tự bắt

- dùng `Set` khi duplicate có ý nghĩa;
- dùng object key cho dữ liệu phức tạp mà không hiểu việc ép thành string;
- nhầm `map.get(key)` với `map[key]`;
- vừa duyệt `Map` vừa thay đổi cấu trúc theo cách khó kiểm soát;
- không xác định key đại diện cho cái gì.

## 2.5 Gate chương

Tự phân loại 15 đề ngắn thành `Set`, `Map count`, `Map lookup` hoặc `không cần hash`; sau đó code hai bài mới mà không tra API.

---

# Chương 3 — Sort, comparator và two pointers

## 3.1 Sort là đổi thứ tự để tạo cấu trúc

Sort không chỉ để “xếp đẹp”. Nó có thể làm cho:

- phần tử cần so sánh nằm cạnh nhau;
- quyết định greedy trở nên rõ ràng;
- two pointers di chuyển đơn điệu;
- binary search khả dụng.

JavaScript bắt buộc nhớ:

```js
const ascending = [...numbers].sort((a, b) => a - b);
```

`sort()` mutate array. Clone nếu thứ tự gốc còn cần.

## 3.2 Comparator nhiều khóa

Yêu cầu: điểm giảm dần, hòa thì index tăng dần.

```js
records.sort((a, b) => {
  if (a.score !== b.score) return b.score - a.score;
  return a.index - b.index;
});
```

Comparator trả số âm khi `a` phải đứng trước `b`, số dương khi đứng sau.

## 3.3 Two pointers trên array đã sort

Ví dụ tìm một cặp có tổng `target`.

```js
function findPair(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;

  while (left < right) {
    const sum = sorted[left] + sorted[right];

    if (sum === target) return [sorted[left], sorted[right]];
    if (sum < target) left++;
    else right--;
  }

  return null;
}
```

Invariant: mọi cặp đã loại khỏi vùng `[left, right]` đều không thể là đáp án. Nếu tổng quá nhỏ, giữ số nhỏ nhất hiện tại và giảm `right` chỉ làm tổng nhỏ hơn, nên phải tăng `left`.

## 3.4 Khi two pointers không đúng

- array chưa sort mà việc sort làm mất thông tin cần thiết;
- có số âm và ta dùng logic cửa sổ chỉ đúng với số dương;
- cần liệt kê mọi cặp với duplicate nhưng không xử lý block duplicate;
- transition của pointer không có tính đơn điệu.

## 3.5 Gate chương

Giải thích bằng lời vì sao mỗi pointer được di chuyển. Nếu câu trả lời chỉ là “vì template viết thế”, chưa qua.

---

# Chương 4 — Prefix sum và sliding window

## 4.1 Prefix sum: trả lời lại cùng loại câu hỏi

Brute force tính lại tổng đoạn cho từng query: `O(q*n)`. Ta trả trước chi phí `O(n)` để mỗi query còn `O(1)`.

```js
function buildPrefix(nums) {
  const prefix = Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}
```

Invariant: `prefix[i]` là tổng đúng `i` phần tử đầu, không phải tổng đến index `i`.

## 4.2 Cửa sổ cố định

```js
function maxWindowSum(nums, k) {
  if (k > nums.length) return null;

  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];

  let best = sum;

  for (let right = k; right < nums.length; right++) {
    sum += nums[right];
    sum -= nums[right - k];
    best = Math.max(best, sum);
  }

  return best;
}
```

Bottleneck được bỏ là cộng lại `k` phần tử cho mỗi cửa sổ.

## 4.3 Cửa sổ co giãn

Ví dụ: độ dài nhỏ nhất của đoạn liên tiếp có tổng `>= target`, với mọi số **dương**.

```js
function minLengthAtLeast(nums, target) {
  let left = 0;
  let sum = 0;
  let best = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return best === Infinity ? 0 : best;
}
```

Invariant: sau vòng `while`, cửa sổ `[left..right]` không còn đạt target; mọi cửa sổ đạt target kết thúc ở `right` đã được xét để tìm đoạn ngắn nhất.

Điều kiện số dương tạo tính đơn điệu. Có số âm, bỏ phần tử trái có thể làm tổng tăng; template này không còn được chứng minh.

## 4.4 Gate chương

Trước mỗi bài, nói rõ cửa sổ đại diện cho gì, khi nào mở rộng, khi nào thu nhỏ, và vì sao pointer không cần lùi.

---

# Chương 5 — Stack, queue, deque và monotonic stack

## 5.1 Chọn bằng thứ tự lấy ra

| Cần lấy gì tiếp theo? | Cấu trúc |
|---|---|
| Phần tử vào sau nhất | stack |
| Phần tử vào trước nhất | queue |
| Cả đầu và cuối | deque |
| Phần tử tốt nhất theo priority | heap |

Stack và queue không phải “dạng bài”; chúng mô tả thứ tự xử lý state.

## 5.2 Stack: ghép dấu ngoặc

```js
function isValidParentheses(text) {
  const stack = [];

  for (const ch of text) {
    if (ch === "(") {
      stack.push(ch);
    } else {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}
```

Invariant: stack chứa đúng các dấu mở chưa được ghép trong prefix đã đọc.

## 5.3 Queue trong JavaScript

Không dùng `shift()` lặp lại trên queue lớn. Giữ head index:

```js
const queue = [start];
let head = 0;

while (head < queue.length) {
  const current = queue[head++];
  // queue.push(next)
}
```

Queue chỉ cần thêm cuối/lấy đầu. Deque cần cả bốn thao tác; dùng ring buffer hoặc class deque trong bộ template.

## 5.4 Monotonic stack: bỏ phần tử không còn cơ hội

Ví dụ: với mỗi vị trí, tìm index phần tử lớn hơn đầu tiên bên phải.

Brute force nhìn sang phải cho từng index: `O(n²)`. Stack lưu các index chưa tìm được đáp án và giữ giá trị giảm dần.

```js
function nextGreaterIndex(nums) {
  const answer = Array(nums.length).fill(-1);
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    while (
      stack.length > 0 &&
      nums[stack[stack.length - 1]] < nums[i]
    ) {
      const index = stack.pop();
      answer[index] = i;
    }

    stack.push(i);
  }

  return answer;
}
```

Mỗi index push một lần, pop tối đa một lần → `O(n)`, dù có vòng `while` lồng trong `for`.

Invariant: các index trong stack chưa có phần tử lớn hơn bên phải, và giá trị của chúng giảm dần từ đáy lên đỉnh.

## 5.5 Gate chương

Với mỗi đề, trả lời “thứ tự nào quyết định phần tử được xử lý tiếp?” trước khi chọn cấu trúc. Code queue-head và monotonic stack từ trắng.

---

# Chương 6 — Simulation và event: biến câu chuyện thành state machine

## 6.1 Bốn thành phần

1. **State:** hệ thống đang ở đâu?
2. **Event:** điều gì xảy ra tiếp theo?
3. **Transition:** event thay state thế nào?
4. **Stop:** khi nào mô phỏng kết thúc?

Không code theo từng câu văn của đề. Chuẩn hóa đề thành bốn thành phần này trước.

## 6.2 Ví dụ: quầy xử lý một yêu cầu tại một thời điểm

Mỗi request là `[arrival, duration]`. Yêu cầu đến theo thứ tự. Trả thời điểm hoàn thành của từng request.

State tối thiểu là `finishTime` của request trước. Với request mới:

- nếu quầy bận, bắt đầu tại `finishTime`;
- nếu quầy rảnh, bắt đầu tại `arrival`.

Transition:

```text
start = max(finishTime, arrival)
finishTime = start + duration
```

```js
function completionTimes(requests) {
  const result = [];
  let finishTime = 0;

  for (const [arrival, duration] of requests) {
    const start = Math.max(finishTime, arrival);
    finishTime = start + duration;
    result.push(finishTime);
  }

  return result;
}
```

## 6.3 Nhảy event thay vì chạy từng giây

Nếu thời gian có thể tới `10^9`, vòng lặp mỗi giây có thể timeout. Hỏi: “Trong khoảng không có event, state có thay đổi gì đáng quan tâm không?” Nếu không, nhảy thẳng tới event tiếp theo.

Các event thường gặp:

- một job đến;
- một job hoàn thành;
- một vật rời queue/cầu;
- cooldown kết thúc;
- hai đối tượng tới cùng vị trí/thời điểm.

## 6.4 Tie ở cùng thời điểm

Phải chốt thứ tự rõ ràng: `exit` trước `enter`, hay ngược lại? Không suy đoán từ code. Tạo test nhỏ có hai event cùng lúc và đối chiếu contract.

## 6.5 Checklist simulation

- state ban đầu đã qua rule đặc biệt chưa?
- có xử lý event ở `t = 0` và event cuối không?
- khoảng là inclusive hay exclusive?
- có thể nhảy tới event tiếp theo không?
- transition có commit từng phần trước khi biết hợp lệ không?
- nhiều event cùng thời điểm được xử lý theo thứ tự nào?

## 6.6 Gate chương

Từ một đề simulation, viết bảng `state/event/transition/stop` và trace bằng tay ba bước trước khi code.

---

# Chương 7 — Brute force và backtracking: duyệt cây quyết định

## 7.1 Khi nào được phép thử hết?

Tính search space trước:

- chọn/không chọn `n` phần tử → tối đa `2^n`;
- sắp xếp `n` phần tử → `n!`;
- mỗi bước có `b` lựa chọn, sâu `d` → `b^d`.

Nếu bound nhỏ, brute force có thể là thuật toán đúng và tốt nhất.

## 7.2 Ví dụ: chọn mỗi số hoặc cộng hoặc trừ

Contract: dùng mọi số đúng một lần; đếm số cách đạt target.

State: `(index, sum)`. Choice: cộng hoặc trừ số tại `index`. Base case: đã dùng hết số.

```js
function countTargetWays(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) {
      return sum === target ? 1 : 0;
    }

    const plus = dfs(index + 1, sum + numbers[index]);
    const minus = dfs(index + 1, sum - numbers[index]);
    return plus + minus;
  }

  return dfs(0, 0);
}
```

Invariant: `sum` là kết quả của đúng `index` quyết định đầu tiên.

## 7.3 Choose → explore → unchoose

Khi dùng shared state như `visited`, luôn nhìn thấy bộ ba:

```js
visited[i] = true;   // choose
dfs(nextState);      // explore
visited[i] = false;  // unchoose
```

Nếu return sớm, phải bảo đảm state vẫn được restore hoặc thiết kế state bất biến bằng cách tạo bản mới khi kích thước nhỏ.

## 7.4 Pruning phải có chứng minh

Chỉ cắt nhánh khi có thể nói: “Mọi completion từ state này đều không thể tốt hơn đáp án hiện tại” hoặc “state đã vi phạm điều kiện không thể sửa”. Cắt vì “trông có vẻ không tốt” dễ mất đáp án.

## 7.5 Gate chương

Trước code, viết `state`, `choices`, `base case`, `restore`, `search-space`. Qua khi code được permutation/backtracking không quên restore.

---

# Chương 8 — Greedy: lựa chọn cục bộ cần bằng chứng

## 8.1 Greedy không phải “chọn cái lớn nhất”

Greedy đúng khi lựa chọn hiện tại có thể chứng minh không làm mất nghiệm tối ưu. Hai kiểu chứng minh thực dụng:

- **exchange argument:** mọi nghiệm tối ưu khác có thể đổi lựa chọn đầu thành lựa chọn greedy mà không tệ hơn;
- **staying ahead:** sau mỗi bước, nghiệm greedy không kém bất kỳ chiến lược nào ở đại lượng quan trọng.

## 8.2 Ví dụ: ghép tối đa hai người vào một thuyền

Sau khi sort cân nặng:

- người nặng nhất còn lại chắc chắn phải lên một thuyền;
- nếu họ ghép được với người nhẹ nhất, ghép như vậy không làm mất cơ hội của ai;
- nếu không ghép được với nhẹ nhất, họ không thể ghép với người nào khác.

```js
function minBoats(weights, limit) {
  const sorted = [...weights].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;
  let boats = 0;

  while (left <= right) {
    if (left === right) {
      boats++;
      break;
    }

    if (sorted[left] + sorted[right] <= limit) {
      left++;
    }

    right--;
    boats++;
  }

  return boats;
}
```

## 8.3 Quy trình kiểm tra greedy

1. Viết lựa chọn cục bộ bằng một câu.
2. Tạo input nhỏ và liệt kê mọi cách.
3. Cố tìm counterexample.
4. Viết exchange argument hoặc invariant.
5. Nếu không chứng minh được, cân nhắc DP/backtracking/sort + cấu trúc khác.

## 8.4 Gate chương

Không được ghi “greedy vì chọn tốt nhất trước”. Phải nói rõ vì sao lựa chọn đó không phá nghiệm tối ưu tương lai.

---

# Chương 9 — Binary search on answer

## 9.1 Dấu hiệu nhận diện

Đề hỏi giá trị nhỏ nhất/lớn nhất thỏa điều kiện, miền đáp án có thứ tự và ta viết được predicate:

```text
feasible(x) = có thể hoàn thành nếu cho phép giá trị x không?
```

Predicate phải đơn điệu: một khi đúng thì mọi giá trị lớn hơn đều đúng, hoặc ngược lại.

## 9.2 Ví dụ: thời gian nhỏ nhất để xử lý đủ `jobs`

Mỗi máy mất `times[i]` cho một job. Trong `time`, máy đó làm được `Math.floor(time / times[i])` job.

```js
function minimumProcessingTime(jobs, times) {
  let low = 0;
  let high = Math.max(...times) * jobs;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    let completed = 0;

    for (const machineTime of times) {
      completed += Math.floor(mid / machineTime);
      if (completed >= jobs) break;
    }

    if (completed >= jobs) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}
```

Invariant: đáp án nhỏ nhất luôn nằm trong đoạn đóng `[low, high]`. Khi `mid` khả thi, không vứt `mid` vì chính nó có thể là đáp án; đặt `high = mid`.

## 9.3 Bốn thứ phải chứng minh

1. **Answer space:** `low` và `high` chắc chắn bao phủ đáp án.
2. **Predicate:** kiểm tra một giá trị có đúng không.
3. **Monotonicity:** vì sao `feasible(x)` đúng thì phía nào cũng đúng.
4. **Boundary:** đang tìm first true hay last true.

## 9.4 JavaScript safety

- không dùng bitwise midpoint như `(low + high) >> 1` cho số lớn vì bị ép về signed 32-bit;
- kiểm tra miền có vượt `Number.MAX_SAFE_INTEGER` không;
- cutoff sớm trong predicate khi tổng đã đủ để tránh cộng không cần thiết.

## 9.5 Gate chương

Làm sáu drill chỉ viết `low`, `high`, predicate và hướng cập nhật, chưa code toàn bài. Qua khi không lẫn first true với last true.

---

# Chương 10 — DFS, BFS, graph, tree và state nhiều chiều

## 10.1 Mọi bài traversal đều bắt đầu bằng state

Node không nhất thiết chỉ là `position`.

- grid thường: `(row, col)`;
- có chìa khóa: `(row, col, hasKey)`;
- được phá tường một lần: `(row, col, usedBreak)`;
- word transformation: `currentWord`;
- tree: `node` cùng thông tin parent/depth nếu cần.

`visited` phải chứa đủ chiều để phân biệt các state có tương lai khác nhau.

## 10.2 BFS khi mọi cạnh có cùng cost

```js
function shortestPath(grid, startRow, startCol) {
  const rows = grid.length;
  const cols = grid[0].length;
  const distance = Array.from(
    { length: rows },
    () => Array(cols).fill(-1)
  );
  const queue = [[startRow, startCol]];
  let head = 0;

  distance[startRow][startCol] = 0;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (head < queue.length) {
    const [row, col] = queue[head++];

    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (nextRow < 0 || nextRow >= rows) continue;
      if (nextCol < 0 || nextCol >= cols) continue;
      if (grid[nextRow][nextCol] === 0) continue;
      if (distance[nextRow][nextCol] !== -1) continue;

      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }

  return distance;
}
```

Mark visited khi **enqueue**, không phải khi dequeue, để một state không bị đưa vào queue nhiều lần.

## 10.3 DFS cho connected components

Vòng ngoài tìm node chưa thăm; mỗi lần bắt đầu DFS/BFS mới là một component mới. Invariant: sau một traversal, toàn bộ component chứa start đã được đánh dấu.

## 10.4 State BFS ba chiều

Với cờ boolean, có thể dùng:

```js
const visited = Array.from(
  { length: rows },
  () => Array.from({ length: cols }, () => [false, false])
);

visited[row][col][usedSpecial ? 1 : 0] = true;
```

Đừng gộp `(row, col, false)` và `(row, col, true)`: cùng vị trí nhưng quyền hành động trong tương lai khác nhau.

## 10.5 Tree traversal

Tree là graph liên thông không chu trình. Với cạnh hai chiều, truyền `parent` hoặc dùng `visited` để không quay lại cha.

```js
function treeDepths(graph, root) {
  const depth = Array(graph.length).fill(-1);
  const queue = [root];
  let head = 0;
  depth[root] = 0;

  while (head < queue.length) {
    const node = queue[head++];

    for (const next of graph[node]) {
      if (depth[next] !== -1) continue;
      depth[next] = depth[node] + 1;
      queue.push(next);
    }
  }

  return depth;
}
```

## 10.6 Gate chương

Trước code, viết một câu hoàn chỉnh: “Mỗi node/state là ..., cạnh/transition là ..., visited lưu ..., BFS/DFS dừng khi ...”.

---

# Chương 11 — Heap, DP và tích hợp trong bài tổng hợp

## 11.1 Heap: luôn lấy phần tử tốt nhất hiện tại

Heap phù hợp khi dữ liệu thay đổi liên tục và cần lặp lại thao tác:

- thêm phần tử;
- lấy min/max theo comparator;
- không cần toàn bộ dữ liệu được sort hoàn chỉnh.

Ví dụ: lặp `k` lần, lấy hai số nhỏ nhất, cộng chúng và đưa tổng trở lại. Sort lại sau mỗi vòng có thể thành `O(k*n log n)`; min-heap còn `O((n+k) log n)`.

```js
// Giả sử MinHeap có push(), pop(), size, peek().
function combineSmallest(values, k, MinHeap) {
  const heap = new MinHeap((a, b) => a - b);
  for (const value of values) heap.push(value);

  let cost = 0;

  for (let step = 0; step < k; step++) {
    if (heap.size < 2) return -1;
    const first = heap.pop();
    const second = heap.pop();
    const combined = first + second;
    cost += combined;
    heap.push(combined);
  }

  return cost;
}
```

Comparator phải đại diện đúng priority và tie-break, không chỉ giá trị chính.

## 11.2 DP: lưu lời giải bài toán con

DP cần bốn dòng trước code:

```text
State: dp[i] nghĩa là gì?
Transition: dp[i] lấy từ state nào?
Base: state nhỏ nhất đã biết?
Order: tính theo thứ tự nào để dependency có sẵn?
```

Ví dụ: số cách đi `n` bước nếu mỗi lần đi 1 hoặc 2 bước.

```js
function countWays(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;

  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

Invariant: trước khi tính `dp[i]`, mọi state mà transition cần đã đúng.

## 11.3 Phân biệt DP, greedy và search

- Có nhiều đường tới cùng state và bài toán con lặp lại → nghĩ DP/memoization.
- Cần số bước ngắn nhất trên graph cạnh đồng cost → BFS.
- Cần minimum priority đang thay đổi → heap.
- Có lựa chọn cục bộ chứng minh được an toàn → greedy.
- Bound nhỏ và cần duyệt tổ hợp → backtracking.

## 11.4 Bài tổng hợp: tách lớp, không tìm một “pattern duy nhất”

Một bài có thể là:

```text
sort event theo thời gian
→ nạp event đã tới vào heap
→ pop job priority cao nhất
→ cập nhật clock simulation
```

Phân tích theo lớp:

1. dữ liệu vào cần sắp xếp theo chiều nào?
2. state nào đã “available” nhưng chưa xử lý?
3. cấu trúc nào chọn state tiếp theo?
4. clock/answer chuyển thế nào?

Không cần gắn một nhãn duy nhất cho toàn bài.

## 11.5 Gate cuối giáo trình

Chọn một bài mới thuộc Q2/Q3 và hoàn thành phiếu sau trước khi code:

```text
Contract:
Bound → complexity budget:
Brute force:
Bottleneck:
State:
Invariant:
Transition:
Data structure:
Complexity:
3 edge cases:
Cutoff time:
```

Qua khi:

- hướng đúng trong 10–15 phút;
- code AC trong 35–45 phút;
- tự nêu được counterexample cho ít nhất một cách sai;
- ở lần ôn kế tiếp code lại không nhìn.

---

# Phụ lục — Cách luyện để hình thành tư duy

## Một phiên 90 phút

| Phút | Việc |
|---:|---|
| 0–10 | Viết lại một template và invariant từ trí nhớ |
| 10–50 | Một bài mới, có cutoff |
| 50–65 | Review theo 11 dòng, tạo counterexample |
| 65–85 | Đóng lời giải, re-code từ trắng |
| 85–90 | Ghi root cause và ngày D+1/D+7 |

## Thang gợi ý

1. chỉ hỏi lại Contract/Bound;
2. chỉ tên pattern;
3. nêu invariant hoặc state;
4. pseudocode;
5. code hoàn chỉnh.

Đã dùng mức 3–5 thì bài chưa được tính là tự giải. Phải re-code từ trắng và làm lại một biến thể.

## Năm câu tự hỏi khi mắc kẹt

1. Tôi đang tính lại thứ gì?
2. Tôi có thể nhớ nó bằng state/hash/prefix không?
3. Có thứ tự đơn điệu nào sau khi sort không?
4. Đây có phải graph của các state không?
5. Bound có cho phép thử hết không?

Mục tiêu cuối không phải nhớ 30 template. Mục tiêu là nhìn đề mới và tự dựng được state, invariant và transition phù hợp.
