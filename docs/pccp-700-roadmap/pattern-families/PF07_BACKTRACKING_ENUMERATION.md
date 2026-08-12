# PF07 — Choice tree, backtracking và enumeration

Nguồn: [OF020](../official-lessons/OF020.md), [OF022](../official-lessons/OF022.md), [OF024](../official-lessons/OF024.md), [OF036](../official-lessons/OF036.md).

## 1. Tín hiệu nhận dạng

Đề yêu cầu thử các chuỗi lựa chọn nhỏ: chọn dấu `+/-`, chọn thứ tự dungeon, tạo số từ các chữ số không dùng lại, hoặc enumerate từ theo preorder. Constraint nhỏ và mỗi bước có một tập choice rõ ràng.

Backtracking là DFS trên **cây state**, không phải “viết đệ quy vì chưa biết làm gì”.

## 2. Không dùng khi

- State khác nhau có cùng future nhưng bị duyệt lặp lớn: thêm memo/DP.
- Chỉ cần optimum và có exchange greedy được chứng minh.
- `n!`, `2^n` vượt bound dù prune thông thường.
- Thứ tự chọn không ảnh hưởng state: combination thay permutation.
- Có cycle trong state graph mà không có visited/bound.

## 3. Decision tree

```text
Mỗi vị trí chọn một trong k action?  → k-ary DFS
Chọn item không lặp và order quan trọng? → permutation + used[]
Order không quan trọng?              → combination + start index
Cần liệt kê prefix theo lexical DFS?  → preorder enumeration
Nhiều path tới cùng (index,state)?    → memoization / DP
Chỉ cần existence?                    → return sớm khi tìm thấy
```

## 4. Knobs tạo biến thể

- Chọn đúng `k`, tối đa `k`, hay độ dài bất kỳ.
- Reuse item được hay không.
- Duplicate input: dedupe theo index, theo value tại cùng depth, hoặc bằng Set output.
- Order có ý nghĩa không.
- Objective count, maximum, existence, hay enumerate output.
- Prune theo resource, optimistic upper bound, symmetry.
- Restore state mutable sau mỗi nhánh hay truyền immutable copy.

## 5. Invariant cốt lõi

Tại entry `dfs(depth,state)`, path hiện tại biểu diễn đúng các lựa chọn đã chốt ở `depth` bước; `used[i]` đúng khi item index `i` đang nằm trên path. Trước khi thử sibling tiếp theo, mọi mutation của choice trước phải được hoàn tác.

Backtracking skeleton là **choose → explore → unchoose**. Nếu truyền scalar/immutable state mới, bước unchoose có thể không cần; với array/Set dùng chung thì bắt buộc.

## 6. Code core đáng thuộc

```js
function permutations(values) {
  const result = [];
  const path = [];
  const used = Array(values.length).fill(false);

  function dfs() {
    if (path.length === values.length) {
      result.push([...path]);
      return;
    }
    for (let index = 0; index < values.length; index++) {
      if (used[index]) continue;
      used[index] = true;
      path.push(values[index]);
      dfs();
      path.pop();
      used[index] = false;
    }
  }
  dfs();
  return result;
}
```

```js
function countSignedSums(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return sum === target ? 1 : 0;
    return dfs(index + 1, sum + numbers[index]) +
      dfs(index + 1, sum - numbers[index]);
  }
  return dfs(0, 0);
}
```

## 7. Counterexamples bóc lỗi

- Duplicate digits `011`: used theo value sẽ cấm dùng hai index `1` khác nhau; used phải theo index, output có thể dedupe riêng.
- Push `path` trực tiếp vào result lưu cùng reference; phải copy `[...path]`.
- Quên restore energy/visited làm sibling kế thừa state bẩn.
- Combination `[1,2]` bị sinh cả `[1,2]` và `[2,1]` nếu loop luôn bắt đầu 0.
- Base case kiểm tra quá sớm có thể bỏ các prefix hợp lệ độ dài ngắn hơn.

## 8. Drills biến thể

### Drill A — permutation unique không dùng Set output

Sort input; tại cùng depth, bỏ `values[i]===values[i-1]` khi phần tử trước chưa dùng. Điều này loại sibling đối xứng trước khi sinh.

### Drill B — branch and bound

Tối đa hóa reward, tính optimistic reward còn lại. Nếu `current + optimistic <= best`, prune. Bound phải luôn không nhỏ hơn optimum thật của subtree; bound quá thấp làm mất đáp án.

### Drill C — memo hóa choice tree

Nếu future chỉ phụ thuộc `(index,sum)`, cache kết quả. Nhưng permutation phụ thuộc tập item đã dùng nên key phải gồm bitmask, không chỉ depth.

### Drill D — sinh combination

Thay `used[]` bằng tham số `start`; sau chọn index `i`, recurse từ `i+1`. Nếu cho reuse, recurse từ `i`.

## 9. Câu hỏi mở tư duy

- Node state tối thiểu quyết định toàn bộ future là gì?
- Choice order có tạo duplicate subtree không?
- Mutation nào cần undo?
- Complexity là `2^n`, `n!`, `P(n,k)` hay số state memoized?
- Prune có proof an toàn hay chỉ heuristic?

## 10. Checklist 15 giây

Viết trước code: **state, choices, base case, validity, mutation/restore, dedupe level, prune proof và upper bound complexity**.
