# Backtracking và DP canonical — `BTD-01..08`

[← Chương 12](../../12_Backtracking_DP_Basic.md) · [PF07](../../../docs/pccp-700-roadmap/pattern-families/PF07_BACKTRACKING_ENUMERATION.md) · [PF08](../../../docs/pccp-700-roadmap/pattern-families/PF08_BOUNDED_CASE_ANALYSIS.md) · [PF11](../../../docs/pccp-700-roadmap/pattern-families/PF11_LOCAL_STATE_DP.md) · [PF12](../../../docs/pccp-700-roadmap/pattern-families/PF12_SET_INTERVAL_DP.md)

## Bản đồ quyết định trước khi viết code

| Câu hỏi | Engine gần nhất |
| --- | --- |
| Phải sinh ra từng cấu hình; số lựa chọn nhỏ? | Backtracking |
| Mỗi phần tử có hai nhánh lấy/bỏ? | Include/exclude search |
| Nhiều nhánh quay về cùng một state và chỉ cần answer? | Memoization |
| Dependency acyclic và biết thứ tự tính? | Bottom-up DP |
| Chỉ cần một quyết định cục bộ, có exchange proof? | Greedy, không phải DP |

## `[BTD-01]` — Combination: choose/explore/unchoose

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

Sinh mọi cách chọn đúng `k` phần tử từ `n`, **không xét thứ tự**. Nếu dùng `k` vòng lặp thì chỉ giải được khi `k` cố định; nếu sinh mọi permutation rồi khử trùng sẽ làm tới `nPk` thay vì `nCk`. Tín hiệu là “chọn nhóm/tập”, `[1,2]` và `[2,1]` cùng một đáp án. Counter-signal: thứ tự tạo kết quả khác nhau thì sang `BTD-02`.

### State sentence, transition và invariant

`path` là các phần tử đã chọn; `start` là index nhỏ nhất còn được phép chọn. Tại mỗi candidate `i`: choose bằng `path.push(values[i])`, explore với `i+1`, rồi unchoose bằng `path.pop()`.

Invariant: index trong `path` tăng nghiêm ngặt. Vì vậy mỗi tập kích thước `k` có đúng một đường sinh theo thứ tự index tăng; không bỏ sót vì mọi candidate hợp lệ từ `start` đều được thử.

### Template JavaScript — `TEMPLATE`

```js
function combinations(values, k) {
  const result = [], path = [];
  function dfs(start) {
    if (path.length === k) { result.push([...path]); return; }
    const need = k - path.length;
    for (let i = start; i <= values.length - need; i++) {
      path.push(values[i]);
      dfs(i + 1);
      path.pop();
    }
  }
  dfs(0);
  return result;
}
```

### Dry run, complexity, variant knobs và transfer

Với `[1,2,3], k=2`: chọn 1 → sinh `[1,2]`, `[1,3]`; undo 1 → chọn 2 → `[2,3]`. Không bao giờ sinh `[2,1]`. Có `C(n,k)` output, mỗi bản sao dài `k`: time `O(C(n,k)·k)`, stack `O(k)` ngoài output.

Biến thể chọn lặp lại dùng `dfs(i)`, không phải `i+1`; chọn tối đa `k` đổi base. Counterexample: quên clone `path` khiến mọi output cùng tham chiếu. Transfer: bài chọn đội/nhóm từ tập nhỏ.

### Recall Card / Blank Page / Explain Back

- Recall: “order không quan trọng → `start`; chọn xong đi `i+1`”.
- Blank page: viết đủ `state → base → loop candidate → choose/explore/unchoose`.
- Explain back: chứng minh “index tăng” vừa chống trùng vừa không bỏ sót.

## `[BTD-02]` — Permutation và chống trùng cùng tầng

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

Sinh mọi thứ tự dùng mỗi item một lần. `start` không đủ vì candidate chưa dùng có thể nằm ở bất kỳ index; cần `used[i]`. Với input có duplicate, sinh theo index tạo output trùng, rồi `Set(JSON.stringify(...))` tốn output trung gian không cần thiết.

### State sentence, transition và invariant

`path` là prefix thứ tự; `used[i]` cho biết item index `i` đã nằm trong prefix. Invariant: mỗi index xuất hiện tối đa một lần. Sau khi sort, tại **cùng một tầng**, bỏ `values[i]===values[i-1] && !used[i-1]`: bản sao trước phải đại diện cho lựa chọn đầu tiên ở tầng đó.

### Template JavaScript — `TEMPLATE`

```js
function uniquePermutations(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const used = Array(sorted.length).fill(false), path = [], result = [];
  function dfs() {
    if (path.length === sorted.length) { result.push([...path]); return; }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
      used[i] = true; path.push(sorted[i]);
      dfs();
      path.pop(); used[i] = false;
    }
  }
  dfs();
  return result;
}
```

### Dry run, complexity, variant knobs và transfer

`[1,1,2]` sinh `112,121,211`. Ở root, index 1 bị skip vì index 0 cùng value chưa dùng; nhưng sâu dưới nhánh đã dùng index 0, index 1 vẫn hợp lệ. Worst case không duplicate: `O(n!·n)` time/output copy, `O(n)` recursion state.

Biến thể permutation dài `k` đổi base; next permutation là engine khác. Counterexample dùng điều kiện `values[i]===values[i-1]` vô điều kiện sẽ loại cả permutation hợp lệ. Transfer OF020, OF022.

### Recall Card / Blank Page / Explain Back

- Recall: “order quan trọng → `used[]`; duplicate skip chỉ trong cùng tầng”.
- Blank page: tự dựng điều kiện skip duplicate và giải thích `!used[i-1]`.
- Explain back: phân biệt duplicate value với cùng index.

## `[BTD-03]` — Include/exclude và pruning có chứng minh

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

Mỗi item có hai quyết định lấy/bỏ, thường để đạt target/tối ưu score. Brute force có `2^n` leaf; backtracking không tự làm complexity tốt hơn, nó chỉ biểu diễn cây rõ ràng và cho phép cắt nhánh an toàn.

### State sentence, transition và invariant

State `(index, currentSum, path)`: đã quyết định xong `[0,index)`. Transition exclude sang `index+1`; include cộng item rồi sang `index+1`. Với mọi số không âm, có thể prune `currentSum > target`; nếu còn biết suffix sum, prune khi `currentSum + suffix[index] < target`.

Invariant: mỗi leaf tương ứng đúng một bit vector lấy/bỏ. Pruning chỉ đúng nếu điều kiện chứng minh mọi completion của state đều thất bại.

### Template JavaScript — `TEMPLATE`

```js
function subsetSumExists(values, target) {
  const suffix = Array(values.length + 1).fill(0);
  for (let i = values.length - 1; i >= 0; i--) suffix[i] = suffix[i + 1] + values[i];
  function dfs(index, sum) {
    if (sum === target) return true;
    if (index === values.length || sum > target || sum + suffix[index] < target) return false;
    return dfs(index + 1, sum + values[index]) || dfs(index + 1, sum);
  }
  return dfs(0, 0);
}
```

### Dry run, complexity, variant knobs và transfer

`[3,5,6], target=8`: take 3 → take 5 → true; short-circuit phần còn lại. Worst case `O(2^n)`, stack `O(n)`; pruning chỉ giảm state thực tế, không đổi worst-case nếu bound yếu.

Nếu có số âm, prune `sum>target` sai: `sum=10` vẫn có thể cộng `-4` để đạt 6. Branch-and-bound tối ưu cần upper/lower bound admissible. Transfer OF036. Counterexample “prune vì hiện tại chưa tốt hơn best” khi future còn reward.

### Recall Card / Blank Page / Explain Back

- Recall: “mỗi item một bit; prune là một định lý nhỏ, không phải mẹo”.
- Blank page: ghi trước miền giá trị nào làm bound đúng.
- Explain back: chỉ ra leaf ↔ subset và lý do nhánh bị cắt vô nghiệm.

## `[BTD-04]` — Explicit loops, bitmask hay backtracking?

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

“Vét cạn” là chiến lược; loops, bitmask và recursion là ba cách enumerate. Dùng recursion cho số tầng cố định rất nhỏ có thể che mất logic; ngược lại viết nhiều nested loops khi depth phụ thuộc input là không mở rộng được.

### State sentence, transition và invariant

- Loops: biến loop chính là decision ở từng tầng cố định.
- Bitmask: bit `i` là lấy/bỏ item `i`; mask duyệt `0..2^n-1`.
- Backtracking: `path/state` là prefix quyết định, phù hợp constraint và pruning theo prefix.

Invariant chung: mỗi cấu hình hợp lệ có một encoding duy nhất. Transition phải duyệt đủ miền candidate và validate đúng thời điểm.

### Template JavaScript — `VARIANT`

```js
function subsetSumsByMask(values) {
  const sums = [];
  for (let mask = 0; mask < 2 ** values.length; mask++) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) if (mask & (2 ** i)) sum += values[i];
    sums.push(sum);
  }
  return sums;
}
```

### Dry run, complexity, variant knobs và transfer

Hai item có masks `00,01,10,11`, mỗi subset đúng một lần. Template trên `O(n·2^n)` time, `O(1)` working space ngoài output. Bitwise JS (`1 << n`) chỉ signed 32-bit; `2 ** n` tránh wrap nhưng exponential vẫn giới hạn n nhỏ.

Variant meet-in-the-middle chia đôi để giảm từ `2^n` xuống khoảng `2^(n/2)` khi có sort/search; backtracking hợp hơn nếu pruning mạnh. Transfer OF021, OF024, OF026. Counterexample dùng permutation cho bài chỉ cần subset gây thừa factorial.

### Recall Card / Blank Page / Explain Back

- Recall: “fixed depth → loops; binary independent → mask; variable constraints → backtracking”.
- Blank page: viết encoding một-một giữa cấu hình và representation.
- Explain back: complexity phải tính cả số cấu hình lẫn cost kiểm tra mỗi cấu hình.

## `[BTD-05]` — Memoization: cache answer theo full state

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

Cây recursion có nhiều đường đi quay về cùng bài toán con. Tín hiệu là cùng bộ tham số state xuất hiện lại và từ đó trở đi có cùng tập lựa chọn/kết quả. Memo biến exponential recursion thành số state phân biệt × số transition mỗi state.

### State sentence, transition và invariant

Ví dụ coin change: `solve(remain)` là số coin ít nhất để tạo đúng `remain`; base `solve(0)=0`, âm là vô nghiệm. Invariant memo: nếu có key, value là answer hoàn chỉnh của đúng state đó, không phụ thuộc path đã đi. Chỉ cache bằng `remain` nếu future thực sự chỉ phụ thuộc remain.

### Template JavaScript — `TEMPLATE`

```js
function minCoinsMemo(coins, amount) {
  const memo = new Map([[0, 0]]);
  function solve(remain) {
    if (remain < 0) return Infinity;
    if (memo.has(remain)) return memo.get(remain);
    let best = Infinity;
    for (const coin of coins) best = Math.min(best, solve(remain - coin) + 1);
    memo.set(remain, best);
    return best;
  }
  const answer = solve(amount);
  return Number.isFinite(answer) ? answer : -1;
}
```

### Dry run, complexity, variant knobs và transfer

Coins `[1,3,4]`, amount 6: states 2,3… được yêu cầu từ nhiều nhánh nhưng tính một lần; answer `3+3=2`. Có `amount+1` state, mỗi state thử `m` coins: `O(amount·m)` time, `O(amount)` memo/stack.

Grid có obstacle/key cần key `(r,c,keyMask)`, không chỉ `(r,c)`. Cycle state cần visiting marker hoặc iterative DP; memo không tự xử lý cycle. Transfer từ `PF07` sang `PF11`. Counterexample memo theo `index` khi remaining capacity khác nhau.

### Recall Card / Blank Page / Explain Back

- Recall: “key phải chứa mọi thứ làm future khác đi”.
- Blank page: viết nghĩa hàm, base, recurrence rồi mới viết `memo.has`.
- Explain back: hai path nào được phép gộp và vì sao.

## `[BTD-06]` — DP 1D: state, base, recurrence và loop order

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

DP bottom-up tính mỗi state một lần theo dependency đã biết. `dp[x]` không có nghĩa mặc định: phải viết thành câu, ví dụ “số cách tạo tổng đúng x” hoặc “chi phí nhỏ nhất để đạt x”. Cùng transition nhưng identity và combine khác nhau cho count/min/max.

### State sentence, transition và invariant

Ví dụ 0/1 subset sum: `dp[s]` là có thể tạo tổng `s` bằng các item đã xử lý. Base `dp[0]=true`. Với item `value`, update giảm dần để predecessor `dp[s-value]` vẫn thuộc prefix cũ.

Invariant sau khi xử lý `i` item: `dp[s]` đúng iff có subset của đúng prefix đó tạo sum `s`.

### Template JavaScript — `TEMPLATE`

```js
function canMakeSum01(values, target) {
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const value of values) {
    for (let sum = target; sum >= value; sum--) {
      dp[sum] = dp[sum] || dp[sum - value];
    }
  }
  return dp[target];
}
```

### Dry run, complexity, variant knobs và transfer

`values=[2], target=4`: duyệt giảm chỉ set `dp[2]`, không được tự dùng item 2 lần để set `dp[4]`. Time `O(n·target)`, space `O(target)`.

Unbounded coin cho phép dùng lại nên sum duyệt tăng. Count dùng base 1 và cộng; min dùng `Infinity` và `Math.min`; max unreachable cần sentinel. Transfer OF031, OF032, OF035. Counterexample duyệt tăng trong 0/1 biến một item thành vô hạn bản sao.

### Recall Card / Blank Page / Explain Back

- Recall: “0/1 giảm; unbounded tăng; vì predecessor cũ hay mới”.
- Blank page: viết câu nghĩa `dp`, identity, predecessor, order.
- Explain back: chứng minh invariant theo số item đã xử lý.

## `[BTD-07]` — DP 2D, grid, interval và Set-DP

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

Một scalar index không đủ khi future còn phụ thuộc chiều thứ hai: hai prefix, row/column, hai endpoint hoặc một tập đã dùng. Brute force tái tính rectangle/interval/subset; DP giữ full state cần thiết.

### State sentence, transition và invariant

Grid: `dp[r][c]` là số đường tới cell `(r,c)` qua cell mở, chỉ đi xuống/phải. Base source là 1; obstacle là 0; transition từ trên + trái. Invariant theo row-major: khi tính `(r,c)`, mọi predecessor đã hoàn chỉnh.

Interval DP dùng length tăng dần vì `[l,r]` phụ thuộc interval ngắn hơn. Set-DP dùng `dp[mask][last]`; mask là tập đã dùng, last là điểm kết thúc — bỏ `last` có thể mất transition future.

### Template JavaScript — `TEMPLATE`

```js
function countGridPaths(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  if (grid[0][0] !== 1) dp[0][0] = 1;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if (grid[r][c] === 1 || (r === 0 && c === 0)) continue;
    dp[r][c] = (r > 0 ? dp[r - 1][c] : 0) + (c > 0 ? dp[r][c - 1] : 0);
  }
  return dp[rows - 1][cols - 1];
}
```

### Dry run, complexity, variant knobs và transfer

Grid `[[0,0],[0,0]]`: source 1; top-right 1; bottom-left 1; bottom-right 2. `O(RC)` time/space, có thể nén `O(C)` nếu transition chỉ cần row trước/current.

Nếu được đi bốn hướng thì dependency có cycle: đây thường là BFS/graph, không phải grid DP row-major. Interval DP thường `O(n³)`; Set-DP thường `O(2^n·n²)`. Transfer OF033, OF034. Counterexample chỉ giữ `dp[mask]` trong TSP: cùng tập nhưng `last` khác có future cost khác.

### Recall Card / Blank Page / Explain Back

- Recall: “thêm một chiều khi hai state cùng scalar có future khác”.
- Blank page: vẽ dependency arrows rồi chọn traversal order.
- Explain back: đưa cặp state bị gộp sai nếu bỏ chiều thứ hai.

## `[BTD-08]` — Contrast Search → Memo → DP → Greedy

### Core problem, dấu hiệu nhận dạng và brute force bottleneck

Đây là pattern chọn engine, không phải một thuật toán riêng. Search cần enumerate configuration; memo/DP cần optimal substructure và state lặp; greedy cần local choice có proof. Đừng thấy “tối ưu” là tự động dùng DP, hoặc thấy n nhỏ là tự động backtracking.

### State sentence, transition và invariant

Quy trình: (1) viết decision tree; (2) viết full state quyết định future; (3) đếm số state phân biệt; (4) phát hiện overlap; (5) kiểm tra dependency order; (6) chỉ chọn greedy nếu có exchange/cut proof.

Invariant phụ thuộc engine: search giữ prefix hợp lệ; memo cache đúng answer theo full state; DP chỉ đọc predecessor đã hoàn chỉnh; greedy giữ tồn tại một optimum mở rộng choice đã commit.

### Template decision — `TEMPLATE`

```js
function chooseSearchEngine({ mustEnumerate, repeatedState, acyclicOrder, exchangeProof }) {
  if (exchangeProof) return "GREEDY";
  if (mustEnumerate && !repeatedState) return "BACKTRACKING";
  if (repeatedState && acyclicOrder) return "BOTTOM_UP_DP";
  if (repeatedState) return "MEMOIZATION";
  return "BRUTE_FORCE_OR_REMODEL";
}
```

### Dry run, complexity, variant knobs và transfer

Subset target: raw tree có khoảng `2^n` nodes. Nếu state chỉ `(index,sum)` và sum bị chặn `0..T`, memo/DP giảm còn `O(nT)` state. Nhưng nếu phải xuất mọi subset, không thể gộp state vì output paths khác nhau vẫn phải sinh.

Scalar counterexample: chọn đường bay với cùng số thành phố đã thăm nhưng endpoint A/B khác nhau; future edge cost khác, nên cần `dp[mask][last]`. Weighted interval scheduling phá greedy earliest-finish và cần DP. Transfer PF07/PF08/PF11/PF12; contrast PF09 greedy.

### Recall Card / Blank Page / Explain Back

- Recall: “full state → overlap → dependency → proof”.
- Blank page: ghi state count trước complexity, tạo một cặp state để test có gộp được không.
- Explain back: vì sao một scalar DP không đủ và property nào mới cho phép greedy.

## Blank Page Test toàn chương

Không nhìn tài liệu, trong 45 phút hãy viết: combination, unique permutation, include/exclude có một prune hợp lệ, memo min-coin, 0/1 DP và grid DP. Với mỗi hàm, ghi một câu state, một invariant, complexity và một test có khả năng bắt lỗi loop order/dedupe/base case.
