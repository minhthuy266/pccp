# PCCP 700+ — Giáo trình tư duy từ đề đến code JavaScript

Tài liệu này không phải lịch học. Luôn đi từ [`README.md`](../../README.md) đến **[`PCCP_700_MASTER_NAVIGATOR.md`](../../PCCP_700_MASTER_NAVIGATOR.md)**, rồi chỉ đọc mục được Navigator chỉ định; kết quả thực tế được ghi trong [`TRACKER_PCCP_REBUILD_2026.csv`](../../TRACKER_PCCP_REBUILD_2026.csv). Plan chỉ giải thích thiết kế, không quyết định buổi học.

Tài liệu này không cố nhồi thêm template. Mục tiêu là biến một đề chưa gặp thành một chuỗi quyết định có thể lặp lại:

```text
Contract → Bound → Brute force → Bottleneck → State
→ Invariant → Transition → Complexity → Code → Test
```

Mỗi chương gồm một ví dụ tự chứa, luồng suy luận, code mẫu và gate. Không đọc liên tục 12 chương và không mặc định một chương mỗi ngày. Chỉ đọc mục được Master Navigator chỉ định; một chương có thể kéo dài nhiều ngày. Sau đó đóng tài liệu và làm bài luyện của ngày đó.

## Hợp đồng nguồn và code

Phạm vi của handbook chỉ lấy từ [trang PCCP](https://certi.programmers.co.kr/about/pccp), [brochure chính thức](https://business.programmers.co.kr/static/business/certification_intro.pdf), [khóa luyện PCCP của Programmers](https://school.programmers.co.kr/learn/courses/14760) và [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit). Mỗi bài `OFxxx` trỏ tới một lesson chính thức trong [`PCCP_OFFICIAL_PRACTICE_BANK.csv`](../../PCCP_OFFICIAL_PRACTICE_BANK.csv).

Programmers hỗ trợ contract, constraint, sample và Level của từng lesson. Phần phân tích, invariant, proof và JavaScript trong handbook là implementation giáo dục do repo viết từ các dữ kiện đó; không tự nhận là editorial/lời giải chính thức. Code companion chạy được nằm ở [`docs/JS_TEMPLATES_PCCP.js`](../JS_TEMPLATES_PCCP.js) và được kiểm tra bằng `npm test`.

Một mục chỉ đáng học khi trả lời đủ:

```text
Khi nào dùng? Khi nào không dùng?
Brute force là gì? Bottleneck ở đâu?
State giữ đúng thông tin nào?
Invariant nào phải đúng sau mỗi transition?
Vì sao transition không bỏ sót/đếm trùng?
Complexity có chịu được constraint không?
Test nào phá cách code sai phổ biến?
```

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

## 0.6 Chế độ editor thi thật

Gate/mock phải code trong editor không autocomplete, không external IDE, không search và không mở template. API quên giữa buổi được ghi vào Error Log; chỉ tra sau timer rồi recode từ trắng. Đến ngày được Navigator giao từng cluster, phải viết được numeric sort, `Map`/`Set`, queue-head, heap và BFS skeleton mà không nhìn. Mục tiêu là loại lỗi syntax/API vốn bị môi trường thi khuếch đại, không phải thuộc mọi hàm JavaScript.

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

## Lab H — String và parsing contract-first

Parsing không phải thao tác phụ. Nó là transition từ **biểu diễn đầu vào** sang **state có nghĩa**. Trước khi code, viết một dòng grammar, ví dụ:

```text
privacy := YYYY.MM.DD + một whitespace + termCode
chunk run := các chunk độ dài unit giống nhau liên tiếp + phần dư cuối
rotation := n ký tự bắt đầu tại offset trong chuỗi s+s
```

### Tokenization và whitespace

Chỉ chuẩn hóa whitespace khi contract nói mọi khoảng trắng đều là separator. Nếu space nằm trong dữ liệu, `trim()` hoặc `/\s+/` có thể làm đổi nghĩa input.

```js
function whitespaceTokens(text) {
  const normalized = text.trim();
  return normalized === "" ? [] : normalized.split(/\s+/);
}

function parseDateToken(date) {
  const fields = date.split(".");
  if (fields.length !== 3 || fields.some((field) => !/^\d+$/.test(field))) {
    throw new Error("Invalid YYYY.MM.DD token");
  }
  return fields.map(Number);
}
```

Checklist tokenization:

- input có thể rỗng không? `"".trim().split(/\s+/)` cho `['']`, nên phải chặn riêng;
- delimiter là whitespace bất kỳ hay đúng một ký tự như `.`, `,`, `-`?
- token có cần giữ leading zero hoặc chữ hoa/thường không?
- `Number("12x")` là `NaN`, còn `parseInt("12x", 10)` âm thầm trả `12`; nếu toàn token phải hợp lệ, validate toàn token;
- parse đúng một lần rồi giữ state đã chuẩn hóa, không `split` lại trong mỗi vòng lặp.

### Prefix, suffix và biên substring

- prefix dùng `word.startsWith(prefix)` hoặc `word.slice(0, prefix.length) === prefix`, không dùng `includes`;
- suffix dùng `word.endsWith(suffix)` hoặc `word.slice(-suffix.length) === suffix`;
- `slice(start, end)` là half-open `[start,end)`, nên chunk thứ `k` độ dài `unit` là `slice(k*unit, (k+1)*unit)`;
- sau khi sort string để tìm quan hệ prefix, chỉ được so cặp kề nhau nếu đã chứng minh mọi cặp prefix sẽ trở thành kề nhau.

### Chunk/run parsing

Với một `unit` cố định, state tối thiểu là `previousChunk`, `runCount` và kết quả đã chốt. Mỗi lần chunk đổi, flush run cũ; sau loop phải flush lần cuối. `slice` cuối tự giữ phần dư ngắn hơn `unit`.

```js
function chunkRuns(text, unit) {
  if (!Number.isInteger(unit) || unit <= 0) {
    throw new Error("unit must be a positive integer");
  }
  if (text.length === 0) return [];

  const runs = [];
  let previousChunk = text.slice(0, unit);
  let runCount = 1;

  for (let start = unit; start < text.length; start += unit) {
    const chunk = text.slice(start, start + unit);
    if (chunk === previousChunk) {
      runCount++;
      continue;
    }
    runs.push([previousChunk, runCount]);
    previousChunk = chunk;
    runCount = 1;
  }

  runs.push([previousChunk, runCount]);
  return runs;
}
```

Invariant: `runs` chứa đúng mọi run đã đóng; `previousChunk/runCount` mô tả đúng run đang mở. Đây là lõi của [SR002 — Nén chuỗi](official-lessons/SR002.md). Với rotation, không `shift()` chuỗi lặp lại; duyệt `offset` trên `s+s`, còn matching nằm ở stack riêng như [SR003 — Xoay dấu ngoặc](official-lessons/SR003.md).

### Base conversion, số lớn và chuỗi dài

Với số nhỏ đã validate, dùng `Number.parseInt(token, base)` và `value.toString(base)`. Nếu token có thể vượt `Number.MAX_SAFE_INTEGER`, parse từng digit bằng `BigInt`; không đổi qua `Number` ở giữa.

```js
function parseBigIntInBase(raw, base) {
  if (!Number.isInteger(base) || base < 2 || base > 36) {
    throw new Error("base must be in [2,36]");
  }
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  const token = raw.toLowerCase();
  if (token.length === 0) throw new Error("empty digit sequence");

  let value = 0n;
  for (const character of token) {
    const digit = digits.indexOf(character);
    if (digit < 0 || digit >= base) throw new Error("invalid digit");
    value = value * BigInt(base) + BigInt(digit);
  }
  return value;
}
```

Đổi ngược bằng `value.toString(base)`. Không trộn `BigInt` và `Number` trong cùng phép toán. Với chuỗi dài, ưu tiên một lượt scan `O(n)`, queue-head thay cho `shift()`, và gom nhiều mảnh vào array rồi `join("")` thay vì tạo lại chuỗi lớn trong nested loop.

[OF048 — Hạn lưu trữ dữ liệu cá nhân](official-lessons/OF048.md) là mẫu “parse → normalize → compare”: tách token ngày/điều khoản, đổi lịch 28 ngày thành scalar rồi mới mô phỏng boundary. Không dùng `Date` nếu đề định nghĩa lịch riêng.

## 6.6 Gate chương

Từ một đề simulation, viết bảng `state/event/transition/stop` và trace bằng tay ba bước. Từ một đề string, viết grammar, delimiter, state của scan, boundary cuối và complexity trước khi code.

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
  const target = BigInt(jobs);
  const durations = times.map(BigInt);
  let low = 0n;
  let high = durations.reduce(
    (minimum, value) => value < minimum ? value : minimum,
  ) * target;

  while (low < high) {
    const mid = low + (high - low) / 2n;
    let completed = 0n;

    for (const machineTime of durations) {
      completed += mid / machineTime;
      if (completed >= target) break;
    }

    if (completed >= target) high = mid;
    else low = mid + 1n;
  }

  return low;
}
```

Invariant: đáp án nhỏ nhất luôn nằm trong đoạn đóng `[low, high]`. Khi `mid` khả thi, không vứt `mid` vì chính nó có thể là đáp án; đặt `high = mid`. Dùng máy nhanh nhất để tạo `high` chặt hơn và không dùng `Math.max(...times)`. Core arithmetic là `BigInt`; chỉ đổi kiểu ở adapter cuối nếu output contract bắt buộc và đã chứng minh giá trị an toàn.

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

Làm đủ sáu drill cụ thể trong Lab C. Với mỗi drill chỉ viết `Contract`, `low/high`, predicate, dạng đơn điệu, first/last true và hướng cập nhật; chưa code toàn bài. Qua khi tự chọn đúng upper/lower midpoint và không lẫn first true với last true.

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

### Ba drill thiết kế state cho D14

Chưa code traversal. Với mỗi drill, viết đúng năm dòng: `node/state`, `transition`, `visited key`, `search order`, `stop`. Sau đó đối chiếu đáp án thiết kế dưới đây.

#### Drill 1 — Mê cung được phá tối đa một tường

Từ góc trái tới góc phải, mỗi bước đi bốn hướng có cost 1. Ô `0` đi được, ô `1` là tường; được phá tối đa một tường.

- **State:** `(row, col, usedBreak)`, trong đó `usedBreak` là `0/1`.
- **Transition:** sang ô trống giữ nguyên cờ; sang tường chỉ khi `usedBreak === 0`, state mới có cờ `1`.
- **Visited key:** `visited[row][col][usedBreak]`; không được chỉ lưu `(row,col)`.
- **Search:** BFS vì mọi action có cost 1; mark khi enqueue.
- **Stop:** lần đầu dequeue bất kỳ state nào ở đích là số bước nhỏ nhất; queue hết thì unreachable.

Counterexample cho visited 2D: tới cùng ô bằng đường ngắn đã dùng quyền phá tường có thể kém một đường dài hơn chưa dùng quyền, vì phần còn lại còn một tường bắt buộc.

#### Drill 2 — Robot có hướng quay

Robot đứng ở `(row,col)` và quay mặt theo một trong bốn hướng. Một action hoặc quay trái/phải 90 độ, hoặc tiến một ô nếu không bị chặn; mỗi action cost 1. Đích yêu cầu cả vị trí lẫn hướng.

- **State:** `(row, col, direction)`, với `direction ∈ {0,1,2,3}`.
- **Transition:** `(row,col,(direction+3)%4)`, `(row,col,(direction+1)%4)`, hoặc ô phía trước cùng `direction`.
- **Visited key:** `visited[row][col][direction]`.
- **Search:** BFS; cạnh là **action**, không phải chỉ là di chuyển sang ô kế.
- **Stop:** lần đầu dequeue đúng `(targetRow,targetCol,targetDirection)`.

Cùng một ô nhưng quay khác hướng có tập action tương lai và số bước còn lại khác nhau, nên direction là một chiều của state chứ không phải metadata bỏ được.

#### Drill 3 — Chuyển đổi từ trên graph ẩn

Mỗi bước đổi đúng một ký tự và từ mới phải nằm trong dictionary. Tìm số bước ít nhất từ `begin` tới `target`.

- **State:** chính string hiện tại, hoặc index của nó trong danh sách từ.
- **Transition:** mọi từ chưa thăm có đúng một vị trí ký tự khác state hiện tại; adjacency được sinh khi cần, không nhất thiết dựng matrix trước.
- **Visited key:** string/index; mark khi enqueue để không sinh lại cùng từ qua nhiều parent.
- **Search:** BFS vì mỗi lần đổi một ký tự có cost 1.
- **Stop:** dequeue `target`; nếu target không thuộc miền state hoặc queue cạn thì trả unreachable theo contract.

Đây là **implicit graph**: đề không đưa edge, nhưng rule “khác đúng một ký tự” chính là edge. [OF039 — Chuyển đổi từ](official-lessons/OF039.md) là bài nối kiến thức; trọng tâm trước code là định nghĩa node và neighbor, không phải nhìn thấy từ khóa “graph”.

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

## 10.6 Dijkstra cho cạnh có trọng số không âm

Chọn engine từ weight, không từ việc đề có chữ “đường đi”:

| Loại cạnh | Engine ưu tiên |
|---|---|
| mọi cạnh cùng cost | BFS |
| weight chỉ `0/1` | 0-1 BFS hoặc Dijkstra |
| weight không âm và không đồng nhất | Dijkstra + min-heap |
| có weight âm | không dùng Dijkstra; xét Bellman–Ford hoặc DAG shortest path |

Counterexample phá BFS: cạnh `A→B` cost 10, `A→C` cost 1, `C→B` cost 1. Ít cạnh nhất tới `B` có cost 10, nhưng shortest weighted path có cost 2.

Dijkstra giữ:

- `distance[node]`: cost tốt nhất đã biết, ban đầu `Infinity`, source bằng `0`;
- min-heap chứa candidate `[distance,node]`;
- relaxation: từ `(node,next,weight)`, thử `candidate = currentDistance + weight`;
- lazy deletion: một node có thể có nhiều record trong heap; record không còn bằng `distance[node]` là stale và bị bỏ.

Min-heap JavaScript tối thiểu dùng thống nhất API getter `.size`:

```js
class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }

  get size() {
    return this.data.length;
  }

  push(value) {
    this.data.push(value);
    let index = this.data.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.data[parent], this.data[index]) <= 0) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  pop() {
    if (this.data.length === 0) return undefined;
    const root = this.data[0];
    const last = this.data.pop();
    if (this.data.length === 0) return root;

    this.data[0] = last;
    let index = 0;

    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let best = index;

      if (
        left < this.data.length &&
        this.compare(this.data[left], this.data[best]) < 0
      ) {
        best = left;
      }
      if (
        right < this.data.length &&
        this.compare(this.data[right], this.data[best]) < 0
      ) {
        best = right;
      }
      if (best === index) break;

      [this.data[index], this.data[best]] = [this.data[best], this.data[index]];
      index = best;
    }

    return root;
  }
}
```

Core Dijkstra nhận adjacency list; mỗi `adjacency[node]` chứa `[next,weight]`:

```js
function dijkstra(adjacency, source) {
  const distance = Array(adjacency.length).fill(Infinity);
  const heap = new MinHeap(
    ([distanceA, nodeA], [distanceB, nodeB]) =>
      distanceA - distanceB || nodeA - nodeB,
  );

  distance[source] = 0;
  heap.push([0, source]);

  while (heap.size > 0) {
    const [currentDistance, node] = heap.pop();
    if (currentDistance !== distance[node]) continue;

    for (const [next, weight] of adjacency[node]) {
      if (weight < 0) throw new Error("Dijkstra requires nonnegative weights");
      const candidate = currentDistance + weight;
      if (candidate >= distance[next]) continue;

      distance[next] = candidate;
      heap.push([candidate, next]);
    }
  }

  return distance;
}
```

Invariant: khi pop một record không stale có distance nhỏ nhất trong heap, distance đó là shortest path đã final. Nếu tồn tại đường rẻ hơn đi qua một state chưa xử lý, prefix đầu tiên chưa xử lý của đường ấy phải có cost không lớn hơn đáp án giả định; vì mọi weight không âm, heap đã phải pop prefix đó trước — mâu thuẫn.

Không mark visited lúc push như BFS: một đường tốt hơn có thể tới sau. Graph vô hướng phải add cả hai chiều; parallel edge vẫn đúng; node unreachable giữ `Infinity`. Với lazy heap, complexity `O((V+E) log E)` time và `O(V+E)` space. [OF059 — Giao hàng](official-lessons/OF059.md) là transfer weighted; [OF045 — Node xa nhất](official-lessons/OF045.md) có cạnh đồng cost nên BFS đơn giản hơn.

## 10.7 Gate chương

Trước code, viết một câu hoàn chỉnh: “Mỗi node/state là ..., cạnh/transition là ..., visited/distance lưu ..., traversal dừng khi ...”. Phải giải thích được vì sao BFS hoặc Dijkstra phù hợp với weight của cạnh.

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

# Lab implementation trọng tâm — từ invariant tới code chạy được

Các lab dưới đây không thay bài official. Chúng cô lập đúng “engine” phải tự viết trước khi áp dụng vào lesson `OFxxx`. Mỗi code block có bản executable tương ứng trong [`docs/JS_TEMPLATES_PCCP.js`](../JS_TEMPLATES_PCCP.js).

## Lab 0 — Implementation, mutation và event order

**Bài official:** `OF051 — Game gắp thú`; nối matrix + stack + simulation. Đây là bài đã học nên lab không làm lộ reserved mock.

Contract rút gọn từ lesson official: mỗi `move` chọn một cột; lấy con thú khác 0 đầu tiên từ trên xuống; ô đó trở thành 0. Nếu thú mới bằng top của basket, bỏ top và cộng 2; nếu không thì push. Trả tổng số thú bị loại.

Đừng code ngay. Tách một event thành đúng thứ tự:

```text
1. Đổi cột 1-based của đề thành 0-based.
2. Tìm hàng đầu tiên có doll != 0.
3. Lưu doll trước khi mutate board.
4. Gán ô board thành 0.
5. So doll với basket top.
6. Pop + cộng 2, hoặc push.
7. Break: một move chỉ lấy tối đa một doll.
```

State:

- `board`: trạng thái máy sau các lần gắp trước;
- `basket`: đúng các doll chưa bị triệt tiêu, theo thứ tự vào;
- `removed`: tổng doll đã biến mất;
- vòng `row`: tìm doll đầu tiên của đúng một cột.

Invariant sau mỗi `move`: board đã xóa đúng doll được lấy trong move đó; basket là kết quả rút gọn đúng của toàn bộ doll đã lấy; `removed` bằng hai lần số cặp đã pop.

```js
function craneGame(board, moves) {
  const basket = [];
  let removed = 0;

  for (const move of moves) {
    const col = move - 1;

    for (let row = 0; row < board.length; row++) {
      if (board[row][col] === 0) continue;

      const doll = board[row][col];
      board[row][col] = 0;

      const top = basket[basket.length - 1];

      if (top === doll) {
        basket.pop();
        removed += 2;
      } else {
        basket.push(doll);
      }

      break;
    }
  }

  return removed;
}
```

Dòng nguy hiểm nhất là:

```js
board[row][col] = 0;
```

`=` thay đổi state. `board[row][col] === 0` chỉ tạo boolean rồi vứt đi; doll vẫn nằm trên board và lần gắp sau có thể lấy lại. Đây không phải lỗi “stack”, mà là lỗi transition không commit.

Dry run tối thiểu với một cột `[[1],[1]]`, moves `[1,1,1]`:

| Move | Board trước | Doll | Basket trước → sau | Removed |
|---:|---|---:|---|---:|
| 1 | `[1,1]` | 1 | `[] → [1]` | 0 |
| 2 | `[0,1]` | 1 | `[1] → []` | 2 |
| 3 | `[0,0]` | không có | `[] → []` | 2 |

Nếu dùng `=== 0`, board trước move 2 vẫn là `[1,1]`; chương trình vẫn có thể trả 2 trên test ngắn nhưng state đã sai và các move sau sẽ sai tiếp. Vì vậy test phải kiểm cả kết quả lẫn mutation hoặc dùng chuỗi move đủ dài để lỗi lộ ra.

Complexity worst case `O(m*r)` với `m = moves.length`, `r = số hàng`; basket tối đa `O(m)`. Có thể preprocess từng cột bằng pointer, nhưng chỉ cần khi constraint chứng minh scan lại không đủ.

## Lab A — Variable sliding window + frequency Map

**Bài official để transfer:** `OF058 — Mua đá quý`; nền cố định ở `OF052`, positive two-pointers ở `OF053`.

Contract cô lập: tìm độ dài lớn nhất của đoạn liên tiếp chứa không quá `k` giá trị khác nhau.

Brute force mở mọi `[left, right]`, đếm lại số loại: ít nhất `O(n²)`. Bottleneck là cửa sổ kề nhau chỉ khác một phần tử vào và có thể vài phần tử ra, nhưng brute force xây lại toàn bộ count.

State:

- `left`: biên trái của cửa sổ hiện tại;
- `right`: biên phải đang được thêm;
- `count`: multiplicity của đúng các giá trị trong `[left, right]`;
- `best`: độ dài hợp lệ lớn nhất đã thấy.

Invariant sau vòng `while`: `[left, right]` có nhiều nhất `k` loại, và `left` là biên nhỏ nhất còn lại sau khi loại đủ phần tử khiến cửa sổ hợp lệ.

```js
function longestWindowAtMostKDistinct(values, k) {
  if (k < 0) return 0;

  const count = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < values.length; right++) {
    const entering = values[right];
    count.set(entering, (count.get(entering) ?? 0) + 1);

    while (count.size > k) {
      const leaving = values[left++];
      const remaining = count.get(leaving) - 1;

      if (remaining === 0) count.delete(leaving);
      else count.set(leaving, remaining);
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

Vì sao phải `delete` key có count bằng 0? `Map.size` phải bằng số loại **đang có trong cửa sổ**, không phải số loại từng xuất hiện. Nếu chỉ set về 0, vòng `while` có thể co mãi hoặc trả sai.

Mỗi index vào cửa sổ một lần và rời nhiều nhất một lần: `O(n)` time, `O(d)` space với `d` là số loại trong cửa sổ. Template này không tự động áp dụng cho mọi điều kiện; phải chứng minh rằng mở phải rồi co trái có tính đơn điệu phù hợp.

Dry run với `[1,2,1,3]`, `k=2`:

| `right` | thêm | cửa sổ trước co | thao tác co | cửa sổ hợp lệ | `best` |
|---:|---:|---|---|---|---:|
| 0 | 1 | `[1]` | — | `[1]` | 1 |
| 1 | 2 | `[1,2]` | — | `[1,2]` | 2 |
| 2 | 1 | `[1,2,1]` | — | `[1,2,1]` | 3 |
| 3 | 3 | `[1,2,1,3]` | bỏ `1`, rồi `2` | `[1,3]` | 3 |

## Lab B — Monotonic stack: mỗi index chỉ được giải quyết một lần

**Bài official:** `OF011 — Giá cổ phiếu`, `OF027 — Tạo số lớn`, `OF061 — Số lớn hơn phía sau`.

Contract cô lập: với mỗi vị trí, trả giá trị lớn hơn **strictly** đầu tiên bên phải, không có thì `-1`.

Brute force quét phần đuôi cho từng index: `O(n²)`. Stack không lưu “các số lớn”; nó lưu index **chưa có đáp án**. Khi `values[index]` lớn hơn top, current chính là phần tử lớn hơn đầu tiên của top vì mọi vị trí giữa đã được duyệt mà không giải quyết top.

```js
function nextGreaterValues(values) {
  const answer = Array(values.length).fill(-1);
  const unresolved = [];

  for (let index = 0; index < values.length; index++) {
    while (
      unresolved.length > 0 &&
      values[unresolved[unresolved.length - 1]] < values[index]
    ) {
      answer[unresolved.pop()] = values[index];
    }

    unresolved.push(index);
  }

  return answer;
}
```

Invariant: giá trị tại các index trong stack giảm không nghiêm ngặt từ đáy lên đỉnh; mọi index trong đó chưa gặp giá trị strictly greater ở phần prefix đã đọc.

Dấu `<` là contract. Đổi thành `<=` nghĩa là “greater-or-equal”, làm duplicate bị pop và thay đổi bài toán. Mỗi index push một lần, pop nhiều nhất một lần nên tổng vòng `while` là `O(n)`, space `O(n)`.

Test phá code sai:

- `[2,2]` phải ra `[-1,-1]`, bắt lỗi dùng `<=`;
- `[3,2,1]` giữ cả ba tới cuối;
- `[2,1,2,4]` cần một current giải quyết nhiều index.

## Lab C — Binary search on answer: tìm first feasible

**Bài official:** `OF043 — Kiểm tra nhập cảnh`; stretch `OF044`. Bài past set chỉ mở đúng ngày được khóa trong Navigator.

Contract cô lập: tìm thời gian nhỏ nhất để các máy xử lý đủ `jobs` công việc. Trong thời gian `t`, máy mất `machineTime` xử lý được `floor(t / machineTime)` việc.

Predicate `can(t)` đơn điệu: nếu đủ việc ở `t`, mọi thời gian lớn hơn cũng đủ. Miền có dạng `false ... false, true ... true`, nên tìm `first true`.

Bound của `OF043` có thể vượt `Number.MAX_SAFE_INTEGER`, nên core arithmetic dùng `BigInt`:

```js
function minimumProcessingTimeBigInt(jobs, times) {
  const target = BigInt(jobs);
  const durations = times.map(BigInt);
  let low = 0n;
  let high = durations.reduce(
    (minimum, value) => value < minimum ? value : minimum,
  ) * target;

  while (low < high) {
    const mid = low + (high - low) / 2n;
    let completed = 0n;

    for (const machineTime of durations) {
      completed += mid / machineTime;
      if (completed >= target) break;
    }

    if (completed >= target) high = mid;
    else low = mid + 1n;
  }

  return low;
}
```

Proof của boundary:

- `high` khả thi vì riêng máy nhanh nhất cũng có thể làm `jobs` việc trong khoảng đó;
- nếu `mid` khả thi, đáp án thuộc `[low, mid]`, không được bỏ `mid`;
- nếu không khả thi, toàn bộ `[low, mid]` bị loại;
- interval giảm nghiêm ngặt nên loop kết thúc tại first feasible.

Complexity `O(m log H)` với `m = times.length`, `H = min(times) * jobs`; space `O(m)` vì mảng `BigInt`. Không dùng `>> 1` vì JavaScript ép bitwise về signed 32-bit; không trộn `BigInt` và `Number`. Chỉ đổi kết quả theo output contract ở adapter cuối, không đổi qua `Number` giữa binary search.

### Sáu drill predicate bắt buộc

Mỗi drill dưới đây là một contract độc lập, không phải bài past set. Che phần “Đáp án thiết kế”, tự viết đủ năm dòng rồi mới đối chiếu:

```text
Contract:
Bounds low/high:
Predicate:
Monotonic direction + first/last true:
Update khi predicate đúng/sai:
```

#### Drill 1 — Sức chứa nhỏ nhất để giao hàng đúng hạn

`weights` không rỗng, gồm các khối lượng dương theo đúng thứ tự phải giao; `days >= 1`. Mỗi ngày chở một đoạn liên tiếp tiếp theo, không đổi thứ tự. Tìm sức chứa nguyên nhỏ nhất để giao hết trong không quá `days` ngày.

**Đáp án thiết kế:**

- **Contract:** minimize capacity, giữ nguyên thứ tự, mỗi kiện đi nguyên khối.
- **Bounds:** `low = max(weights)`, `high = sum(weights)`; high chắc chắn giao trong một ngày.
- **Predicate:** `can(capacity) :=` greedy scan cần không quá `days` đoạn/ngày, mỗi đoạn có tổng `<= capacity`.
- **Direction:** capacity tăng thì không thể cần nhiều ngày hơn: `false ... true`, tìm **first true**.
- **Update:** lower midpoint; true → `high = mid`, false → `low = mid + 1`.

#### Drill 2 — Tốc độ nhỏ nhất để xử lý các pile

Có một mảng pile dương không rỗng; trong một giờ chỉ xử lý một pile và xử lý tối đa `speed` đơn vị của pile đó. Biết `hours >= piles.length`. Tìm speed nguyên dương nhỏ nhất để hoàn tất trong `hours` giờ.

**Đáp án thiết kế:**

- **Contract:** minimize speed; một pile cần `ceil(pile/speed)` giờ.
- **Bounds:** `low = 1`, `high = max(piles)`; high xử lý mỗi pile trong một giờ.
- **Predicate:** `can(speed) := sum(ceil(pile/speed)) <= hours`, cutoff khi tổng vượt `hours`.
- **Direction:** speed tăng thì số giờ không tăng: `false ... true`, **first true**.
- **Update:** lower midpoint; true → `high = mid`, false → `low = mid + 1`.

#### Drill 3 — Chia mảng để minimize tổng đoạn lớn nhất

Chia array số dương không rỗng thành không quá `groups` đoạn liên tiếp, không đổi thứ tự, với `1 <= groups <= values.length`. Tìm giá trị nhỏ nhất có thể của tổng đoạn lớn nhất.

**Đáp án thiết kế:**

- **Contract:** minimize maximum segment sum; mọi phần tử thuộc đúng một đoạn liên tiếp.
- **Bounds:** `low = max(values)`, `high = sum(values)`.
- **Predicate:** `can(limit) :=` greedy tạo đoạn mới ngay trước khi tổng vượt `limit`, và số đoạn cần `<= groups`.
- **Direction:** limit lớn hơn không làm số đoạn cần tăng: `false ... true`, **first true**.
- **Update:** lower midpoint; true → `high = mid`, false → `low = mid + 1`.

Predicate greedy đúng vì với một `limit` cố định và số dương, kéo mỗi đoạn dài nhất có thể không làm tăng cơ hội dùng ít đoạn hơn của bất kỳ cách cắt sớm nào.

#### Drill 4 — Khoảng cách nhỏ nhất lớn nhất giữa các trạm

Cho ít nhất hai tọa độ nguyên phân biệt trên một đường thẳng; chọn đúng `stations` vị trí, với `2 <= stations <= coordinates.length`. Tối đa hóa khoảng cách nhỏ nhất giữa hai trạm được chọn.

**Đáp án thiết kế:**

- **Contract:** maximize minimum adjacent gap sau khi chọn đủ `stations`.
- **Bounds:** sort tọa độ; `low = 0`, `high = last - first`.
- **Predicate:** `can(gap) :=` greedy đặt trạm đầu ở vị trí nhỏ nhất, rồi luôn chọn vị trí sớm nhất cách trạm trước ít nhất `gap`; đặt được `>= stations`.
- **Direction:** gap tăng làm điều kiện khó hơn: `true ... false`, tìm **last true**.
- **Update:** dùng upper midpoint `mid = low + ceil((high-low)/2)`; true → `low = mid`, false → `high = mid - 1`.

#### Drill 5 — Độ dài đoạn cắt đồng đều lớn nhất

Cho một mảng không rỗng các thanh có độ dài nguyên dương và cần ít nhất `pieces` đoạn bằng nhau; input bảo đảm độ dài 1 là khả thi. Tìm độ dài nguyên lớn nhất của mỗi đoạn.

**Đáp án thiết kế:**

- **Contract:** maximize positive piece length; phần dư của mỗi thanh được bỏ.
- **Bounds:** `low = 1`, `high = max(lengths)`.
- **Predicate:** `can(length) := sum(floor(rod/length)) >= pieces`, cutoff khi đã đủ.
- **Direction:** length tăng thì số mảnh không tăng: `true ... false`, **last true**.
- **Update:** upper midpoint; true → `low = mid`, false → `high = mid - 1`.

#### Drill 6 — Trần ngân sách lớn nhất

Mỗi địa phương trong mảng không rỗng yêu cầu một ngân sách nguyên dương; `budget >= 0`. Chọn một cap nguyên không âm; nơi xin ít hơn cap nhận đủ, nơi xin nhiều hơn chỉ nhận cap. Tìm cap lớn nhất sao cho tổng cấp không vượt `budget`.

**Đáp án thiết kế:**

- **Contract:** maximize cap với allocation `sum(min(request,cap)) <= budget`.
- **Bounds:** `low = 0`, `high = max(requests)`; nếu cấp đủ toàn bộ vẫn trong budget thì high chính là đáp án.
- **Predicate:** `can(cap) := sum(min(request,cap)) <= budget`, cutoff khi tổng đã vượt budget.
- **Direction:** cap tăng làm tổng cấp không giảm: `true ... false`, **last true**.
- **Update:** upper midpoint; true → `low = mid`, false → `high = mid - 1`.

Gate sáu drill: với mỗi predicate phải đưa được một cặp `x < y` để giải thích chiều đơn điệu; xác nhận endpoint cần thiết là khả thi; và dùng test boundary nơi `mid` nằm đúng tại first/last true. Predicate chỉ trả boolean, không mutate input hay phụ thuộc state từ lần gọi trước.

## Lab D — Multi-source BFS

**Bài official để nối kiến thức:** `OF038`, `OF045`, `OF055`; transfer shortest weighted là `OF059` và phải dùng Dijkstra, không dùng lab này.

Khi nhiều nguồn cùng bắt đầu tại thời điểm/khoảng cách 0, không chạy BFS riêng từng nguồn. Seed tất cả nguồn vào cùng queue; các layer tự biểu diễn khoảng cách tới nguồn gần nhất.

```js
function multiSourceBfs(rows, cols, sources, isPassable = () => true) {
  const distance = Array.from(
    { length: rows },
    () => Array(cols).fill(-1),
  );
  const queue = [];
  let head = 0;

  for (const [row, col] of sources) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) continue;
    if (!isPassable(row, col) || distance[row][col] !== -1) continue;
    distance[row][col] = 0;
    queue.push([row, col]);
  }

  const directions = [[-1,0], [1,0], [0,-1], [0,1]];

  while (head < queue.length) {
    const [row, col] = queue[head++];

    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (nextRow < 0 || nextRow >= rows) continue;
      if (nextCol < 0 || nextCol >= cols) continue;
      if (!isPassable(nextRow, nextCol)) continue;
      if (distance[nextRow][nextCol] !== -1) continue;

      distance[nextRow][nextCol] = distance[row][col] + 1;
      queue.push([nextRow, nextCol]);
    }
  }

  return distance;
}
```

Invariant: khi một ô được enqueue lần đầu, `distance` của nó đã là khoảng cách ngắn nhất từ bất kỳ source nào. Mark lúc enqueue để không có hai parent cùng đưa một state vào queue. Complexity `O(rows*cols)`, vì mỗi ô hợp lệ vào queue tối đa một lần.

BFS chỉ đúng cho cạnh đồng cost. Có weight khác nhau → Dijkstra; có thêm quyền phá tường/chìa khóa → state và `visited` phải thêm chiều.

## Lab E — Greedy interval bằng earliest finish

**Bài official:** `OF057 — Hệ thống đánh chặn`; transfer `OF030 — Camera kiểm soát`.

Contract cô lập: chọn nhiều interval half-open `[start,end)` không chồng nhau nhất.

Greedy chọn interval kết thúc sớm nhất. Exchange argument: trong một nghiệm tối ưu, thay interval đầu bằng interval có end sớm nhất không làm giảm khoảng trống còn lại cho các interval sau; do đó luôn tồn tại nghiệm tối ưu bắt đầu bằng lựa chọn greedy.

```js
function maximumNonOverlappingIntervals(intervals) {
  const sorted = [...intervals].sort(
    ([startA, endA], [startB, endB]) =>
      endA - endB || startA - startB,
  );
  let selected = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of sorted) {
    if (start < lastEnd) continue;
    selected++;
    lastEnd = end;
  }

  return selected;
}
```

Với interval half-open, `start === lastEnd` là không overlap. Nếu đề dùng đoạn đóng hoặc định nghĩa va chạm khác, dấu so sánh phải đổi theo contract. Complexity `O(n log n)` do sort, scan `O(n)`, space phụ thuộc implementation sort/copy.

## Lab F — Difference array 2D

**Bài official transfer:** `OF060 — Tòa nhà không bị phá`.

Khi có nhiều update cộng `delta` lên toàn rectangle, cập nhật từng ô tốn `O(q*rows*cols)`. Difference 2D đánh dấu bốn góc trong `O(1)` rồi prefix hai chiều một lần.

Với rectangle inclusive `(r1,c1)..(r2,c2)`:

```text
diff[r1][c1]         += delta
diff[r1][c2 + 1]     -= delta
diff[r2 + 1][c1]     -= delta
diff[r2 + 1][c2 + 1] += delta
```

Hai dấu cộng và hai dấu trừ tạo hiệu ứng bắt đầu ở góc trên-trái, dừng sau biên phải/dưới, và bù lại phần bị trừ hai lần ở góc chéo.

```js
function applyRectangleUpdates(rows, cols, updates) {
  const diff = Array.from(
    { length: rows + 1 },
    () => Array(cols + 1).fill(0),
  );

  for (const [r1, c1, r2, c2, delta] of updates) {
    diff[r1][c1] += delta;
    diff[r1][c2 + 1] -= delta;
    diff[r2 + 1][c1] -= delta;
    diff[r2 + 1][c2 + 1] += delta;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      diff[row][col] += diff[row][col - 1];
    }
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 1; row < rows; row++) {
      diff[row][col] += diff[row - 1][col];
    }
  }

  return diff.slice(0, rows).map((line) => line.slice(0, cols));
}
```

Complexity `O(q + rows*cols)` time, `O(rows*cols)` space. Hai chiều `+1` là sentinel để update chạm biên không cần `if`. Test bắt buộc: rectangle một ô, toàn grid, chạm hàng/cột cuối, delta âm và các rectangle overlap.

## Lab G — Grid DP và thứ tự iteration

**Bài official:** `OF032 — Tam giác số nguyên`, `OF033 — Đường đến trường`.

Contract cô lập: đếm số đường từ góc trên-trái tới góc dưới-phải, chỉ đi phải/xuống; `1` đi được, `0` bị chặn.

State 2D là `ways[row][col]`. Có thể nén còn `dp[col]`:

- trước update, `dp[col]` là số cách từ ô phía trên;
- `dp[col - 1]` đã update ở vòng hiện tại, là số cách từ ô bên trái;
- ô block phải reset `dp[col] = 0`, nếu không đường từ hàng trước “đi xuyên” vật cản.

```js
function countGridPaths(grid, modulo = 1_000_000_007) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dp = Array(cols).fill(0);
  dp[0] = grid[0][0] === 1 ? 1 : 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 0) {
        dp[col] = 0;
        continue;
      }

      if (col > 0) {
        dp[col] = (dp[col] + dp[col - 1]) % modulo;
      }
    }
  }

  return dp[cols - 1];
}
```

Invariant sau khi xử lý `(row,col)`: `dp[col]` là số đường hợp lệ tới đúng ô đó; các cột bên trái thuộc hàng hiện tại, các cột bên phải vẫn thuộc hàng trước. Vì dependency chỉ từ trên/trái, thứ tự row-major là đúng. Complexity `O(rows*cols)` time, `O(cols)` space.

DP không bắt đầu bằng “tạo mảng”. Nó bắt đầu bằng nghĩa của state, transition, base và dependency order. Nếu không nói được bốn dòng này, chưa được code.

## Ma trận transfer bắt buộc

| Engine | CORE phải làm | TRANSFER chỉ mở sau core | Sai thì quay lại |
|---|---|---|---|
| Hash/sort | `OF001, OF003, OF004, OF016` | `OF005, OF017` | Chương 2–3 |
| Window/two pointers | `OF028, OF052, OF053` | `OF058` | Chương 3–4 + Lab A |
| Stack/queue/heap | `OF007–OF013, OF027` | `OF054, OF061` | Chương 5 + Lab B |
| Backtracking/greedy | `OF022, OF028, OF036, OF057` | `OF020, OF030` | Chương 7–8 + Lab E |
| Binary search | `OF043` | `OF044` chỉ khi core đã chắc | Chương 9 + Lab C |
| BFS/graph/tree | `OF023, OF037–OF039, OF045, OF055` | `OF056, OF059` | Chương 10 + Lab D |
| DP | `OF032, OF033` | `OF031` | Chương 11 + Lab G |
| Prefix 2D | không bắt buộc trước foundation gate | `OF060` | Lab F |

`OF062–OF069` không xuất hiện trong lab vì là `RESERVED_MOCK`; cấm mở trước timer.

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
