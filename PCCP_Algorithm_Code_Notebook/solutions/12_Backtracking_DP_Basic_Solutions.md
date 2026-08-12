# Lời giải — 12 — Backtracking và DP cơ bản

[← Practice](../chapters/12_backtracking_dp/02_Practice_Ladder.md) · [Module chạy được](../../solutions/notebook/ch12_backtracking_dp.js)

## Recognition

### P12-R01 — `BTD-01`
Signal: chọn nhóm, order không quan trọng. State `path,start`; chỉ chọn index từ `start`, recurse `i+1`. Invariant index tăng nên mỗi tập đúng một lần. Complexity output-bound `O(C(12,4)·4)`.

### P12-R02 — `BTD-02`
`used[i]` cấm dùng lại cùng index; sort + skip duplicate cùng tầng cấm hai bản sao cùng value đại diện cùng choice. Không skip vô điều kiện vì hai số 1 vẫn có thể cùng xuất hiện ở hai vị trí khác nhau trong một permutation.

### P12-R03 — `BTD-03`
State `(index,sum)`, transition `dfs(index+1,sum)` và `dfs(index+1,sum+value[index])`. Mỗi leaf là một vector bit lấy/bỏ duy nhất.

### P12-R04 — `BTD-03`
Không. Với target 6, state sum 10 còn item `-4` vẫn đạt 6. Chỉ prune vượt target khi mọi phần tử còn lại không âm.

### P12-R05 — `BTD-04`
Ba loops rõ và ít overhead khi đúng ba tầng cố định. Recursion hợp khi số tầng/constraint phụ thuộc input hoặc cần shared pruning. Cả hai vẫn duyệt `6³` cấu hình.

### P12-R06 — `BTD-04`
Mask từ `0` đến `2^n-1`; bit i bằng 1 iff lấy item i. Encoding là một-một với subset nên không thiếu/trùng.

### P12-R07 — `BTD-05`
Nếu future choices và answer từ hai node chỉ phụ thuộc cùng `(index,remaining)`, hai subtree tương đương. Cache answer theo cả hai chiều; chỉ cache `remaining` khi index không ảnh hưởng candidates.

### P12-R08 — `BTD-06`
0/1 duyệt sum giảm để `dp[sum-value]` thuộc prefix trước. Unbounded duyệt tăng để state vừa tạo bởi cùng item được dùng tiếp.

### P12-R09 — `BTD-06`
Count: identity 0, base 1, combine `+`. Min: identity `Infinity`, base 0, combine `min(candidate+cost)`. Max: `-Infinity`/unreachable sentinel, combine `max`.

### P12-R10 — `BTD-07`
Phải/xuống tạo DAG theo row-major nên grid DP. Bốn hướng tạo cycle; dùng BFS cho shortest unweighted hoặc graph traversal, trừ khi state khác tạo một DAG rõ ràng.

### P12-R11 — `BTD-07`
Cùng mask nhưng endpoint khác có tập cạnh đi tiếp và chi phí khác. State đúng là `(mask,last)`; bỏ `last` gộp hai future không tương đương.

### P12-R12 — `BTD-08`
Earliest finish tối ưu số lượng interval không trọng số, nhưng có thể chọn interval reward 1 và chặn interval reward 100. Weighted objective cần state kiểu prefix/previous-compatible và DP.

## Fill

### P12-F01 — `BTD-01/02`
Combination: `path.push(v) → dfs(i+1) → path.pop()`. Permutation thêm `used[i]=true` trước explore và trả `false` sau undo; combination dùng `start`, permutation scan toàn bộ index.

### P12-F02 — `BTD-05`
Base invalid/terminal trước; nếu memo có key thì return; tính mọi transition; `memo.set(key,answer)`; return. Không cache result phụ thuộc mutable path ngoài key.

### P12-F03 — `BTD-06`
0/1: `for (sum=target; sum>=value; sum--)`. Unbounded: `for (sum=value; sum<=target; sum++)`. Hướng quyết định có đọc state vừa update trong cùng item hay không.

## Logic

### P12-L01 — `BTD-01/02`
Unique combinations size 2 của các vị trí/value: `[1,1]`, `[1,2]`. Unique permutations dùng toàn bộ: `[1,1,2]`, `[1,2,1]`, `[2,1,1]`. Combination dùng index tăng; permutation dùng `used` và same-level dedupe.

### P12-L02 — `BTD-03`
Tính `suffix[i]=sum(values[i..])`. Với số không âm: `sum>target` chỉ tăng thêm nên vô nghiệm; `sum+suffix[i]<target` là lấy hết vẫn thiếu nên vô nghiệm. Hai proof mất hiệu lực nếu có số âm.

### P12-L03 — `BTD-07/08`
Ba node A,B,C với cost A→C=100, B→C=1. Hai state đã thăm `{A,B}` nhưng endpoint A/B có cost bước tiếp khác nhau; `dp[mask]` không biết dùng cạnh nào. Phải giữ `last`.

## Pseudocode

### P12-P01 — `BTD-01/02`
Combination: base size k; loop từ start; choose, recurse i+1, undo. Permutation: base size n; loop 0..n-1; skip used/same-level duplicate; mark, choose, recurse, undo, unmark.

### P12-P02 — `BTD-03/05`
Định nghĩa `solve(index,remain)`; base remain=0/đã hết item; lookup key; answer = combine(exclude, include); cache rồi return. Memo key phải gồm mọi resource ảnh hưởng future.

### P12-P03 — `BTD-06/07`
0/1 sum: `dp[0]=true`, item ngoài, sum giảm trong. Grid: source 1; row-major; obstacle 0; cell nhận trên + trái. Cả hai order đều đảm bảo predecessor đã hoàn chỉnh.

## Code

### P12-C01 — `BTD-01/02`
Xem `combinations`, `uniquePermutations` trong module. Revealing tests: `combinations([1,2],0)=[[]]`; sửa một output không được làm output khác đổi; `[1,1,2]` chỉ có ba permutation.

### P12-C02 — `BTD-03/05/06`
Xem `subsetSumExistsNonNegative`, `minCoinsMemo`, `canMakeSum01`. Search từ chối số âm vì bound của template cần non-negative; 0/1 test `[2],4=false` bắt loop đi sai hướng.

### P12-C03 — `BTD-07/08`
Xem `countGridPaths`, `chooseSearchEngine`. Source blocked trả 0, grid một ô mở trả 1. Engine helper chỉ là checklist quyết định; proof/state analysis vẫn bắt buộc.

## Variants

### P12-V01 — `BTD-01/03`
Cho phép reuse: sau khi choose candidate i, recurse `dfs(i,...)`; candidate phải làm resource tiến gần base (ví dụ số dương làm remain giảm) để kết thúc. Nếu có 0 hoặc số âm, cần depth/count bound hoặc state-cycle protection.

### P12-V02 — `BTD-06/07/08`
Count unbounded: `ways[0]=1`, coin ngoài, sum tăng, `ways[s]+=ways[s-coin]`. Interval DP: state `[left][right]`, length tăng, thử split/choice bên trong; thường `O(n³)`. Không dùng cùng một loop order cho hai contract.

## Mini-test

### P12-M01 — Mixed
(1) Combination `BTD-01`; (2) bounded include/exclude `BTD-03`; (3) repeated state `BTD-05/06`; (4) acyclic grid `BTD-07`. Chấm 10: recognition 2, full state 2, transition/order 2, invariant/proof 2, test 1, complexity 1. Mất toàn bộ điểm proof nếu prune không ghi miền điều kiện.
