# PCCP FINAL RECALL — DFS / Brute Force / Backtracking

> Primary representative problems for small-N search, permutation and backtracking.

## Bài trong file

- Bài 22 — 피로도 (Mệt mỏi / Dungeons)
- Bài 23 — 타겟 넘버 (Target Number)

---

---

# Bài 22 — 피로도 (Mệt mỏi / Dungeons)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/87946

**Pattern:** DFS / Backtracking / Permutation  
**Trigger:** `N cực nhỏ (<= 8) + thứ tự chọn ảnh hưởng kết quả + muốn maximize số phần tử có thể chọn`

---

## 1. Dịch đề tiếng Việt

Người chơi có một lượng **thể lực hiện tại `k`**.

Mỗi dungeon có:

```text
[minRequired, cost]
```

Trong đó:

- `minRequired`: thể lực tối thiểu phải có **trước khi vào**
- `cost`: thể lực bị trừ **sau khi hoàn thành**

Ví dụ:

```text
[80, 20]
```

nghĩa là:

- phải có ít nhất `80` thể lực mới được vào
- vào xong mất `20`

Mỗi dungeon chỉ được đi tối đa một lần.

Hãy tìm **số dungeon tối đa** có thể khám phá.

### Giới hạn quan trọng nhất

```text
1 <= dungeons.length <= 8
```

Đây chính là tín hiệu:

> **Thử các thứ tự bằng DFS / backtracking là hoàn toàn đủ nhanh.**

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

State hiện tại gồm:

```text
fatigue
visited
count
```

Tại mỗi bước, ta được chọn bất kỳ dungeon chưa dùng nào nếu:

```text
fatigue >= minRequired
```

Sau khi đi:

```text
nextFatigue = fatigue - cost
```

Mục tiêu:

```text
maximize count
```

---

### STEP 2 — BOUND

```text
N <= 8
```

Nếu thử mọi thứ tự:

```text
8! = 40,320
```

Rất nhỏ.

Recursion depth tối đa:

```text
8
```

→ JavaScript an toàn, không có nguy cơ stack overflow thực tế.

---

### STEP 3 — BRUTE FORCE

Brute force đúng chính là:

```text
thử mọi thứ tự dungeon
```

Nhưng ta không cần generate permutation trước.

Ta DFS trực tiếp:

```text
ở mỗi state
→ thử mọi dungeon chưa dùng và hiện tại đủ điều kiện
```

Nhánh nào không đi được thì bỏ.

---

### STEP 4 — BOTTLENECK

Không có greedy đơn giản nào đảm bảo đúng.

Ví dụ:

```text
dungeon A cần cao nhưng cost thấp
dungeon B cần thấp nhưng cost cao
```

Chọn sai thứ tự có thể làm mất cơ hội vào dungeon khác.

Do:

```text
order matters
N tiny
```

→ DFS / permutation.

---

### STEP 5 — STATE

```js
const visited = Array(dungeons.length).fill(false)
let answer = 0
```

DFS parameters:

```js
dfs(fatigue, count)
```

`visited` giữ dungeon nào đã đi.

---

### STEP 6 — TRANSITION

Trong DFS:

```js
for (let i = 0; i < dungeons.length; i++) {
```

Skip nếu đã đi:

```js
if (visited[i]) continue
```

Skip nếu không đủ thể lực tối thiểu:

```js
if (fatigue < dungeons[i][0]) continue
```

Nếu đi được:

```js
visited[i] = true

dfs(
  fatigue - dungeons[i][1],
  count + 1
)

visited[i] = false
```

Đây chính là backtracking:

```text
CHOOSE → EXPLORE → UNCHOOSE
```

---

### STEP 7 — INVARIANT

Khi gọi:

```js
dfs(fatigue, count)
```

thì:

- `fatigue` là thể lực còn lại sau đúng `count` dungeon đã đi
- `visited[i] === true` iff dungeon i đã nằm trong path hiện tại
- mọi dungeon trong path đều được đi trong một thứ tự hợp lệ

---

### STEP 8 — PATTERN

**Pattern:** DFS / Backtracking / Permutation search.

Dấu hiệu:

- N cực nhỏ: thường `<= 8`, `<= 10`
- thứ tự chọn ảnh hưởng kết quả
- mỗi item dùng tối đa một lần
- hỏi max/min qua mọi sequence
- không có greedy obvious

Trigger sentence:

> **“N <= 8 + order matters + each used once → DFS/backtracking permutation.”**

---

### STEP 9 — COMPLEXITY

Worst case mọi dungeon đều đi được:

```text
O(N!)
```

với:

```text
N <= 8
```

→ tối đa khoảng `40,320` full permutations.

Thực tế DFS có thêm các partial paths, vẫn rất nhỏ.

Space:

```text
O(N)
```

cho recursion + visited.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
k = 80
dungeons = [
  [80,20],
  [50,40],
  [30,10]
]
```

Một nhánh:

| State trước | Choice | Check | Transition | Count | Backtrack |
|---|---|---|---|---:|---|
| fatigue=80 | dungeon 0 | `80>=80` | fatigue=60 | 1 | sau recursion |
| fatigue=60 | dungeon 2 | `60>=30` | fatigue=50 | 2 | sau recursion |
| fatigue=50 | dungeon 1 | `50>=50` | fatigue=10 | 3 | sau recursion |

→ `answer = 3`

Nhánh khác:

```text
0 → 1
```

sau đó fatigue = 20, không vào được dungeon 2.

Nhưng DFS không kết luận sớm từ nhánh xấu đó; nó backtrack và thử nhánh khác.

---

## 4. Bộ phim hình ảnh

Tưởng tượng đứng trước nhiều cánh cửa dungeon.

Tại mỗi state:

```text
fatigue hiện tại
↓
nhìn toàn bộ dungeon chưa đi
↓
dungeon nào đủ minRequired?
↓
chọn 1 cái
↓
visited = true
fatigue -= cost
↓
đi sâu tiếp
↓
quay lại
visited = false
```

**Câu chuyện 1 dòng**

> “Thử một dungeon → đi sâu → quay về trả lại visited → thử dungeon khác.”

---

## 5. Code Skeleton Recall

```js
function solution(k, dungeons) {
  const visited =
    Array(dungeons.length).fill(false)

  let answer = 0

  function dfs(fatigue, count) {
    answer = Math.max(answer, count)

    for (let i = 0; i < dungeons.length; i++) {
      if (visited[i]) continue

      const [required, cost] = dungeons[i]

      if (fatigue < required) continue

      visited[i] = true

      dfs(
        fatigue - cost,
        count + 1
      )

      visited[i] = false
    }
  }

  dfs(k, 0)

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
dfs(state)
    for every candidate
        if usable
            choose
            dfs(nextState)
            unchoose
```

### RESET WHEN

Sau khi recursion quay về:

```js
visited[i] = false
```

Đây là dòng **không được quên**.

### INVALIDATES WHAT

Candidate không hợp lệ nếu:

```js
visited[i]
```

hoặc:

```js
fatigue < required
```

### COMMIT WHEN

Mỗi state đều có thể là đáp án tốt nhất hiện tại:

```js
answer = Math.max(answer, count)
```

Không cần chờ tới leaf mới update.

---

## 7. Trap dễ chết

### Trap 1 — Greedy sort theo required hoặc cost

Không đảm bảo đúng.

Bài này cố tình có:

```text
order matters
N <= 8
```

→ brute-force thứ tự.

### Trap 2 — Trừ `required`

Sai.

`required` chỉ là điều kiện vào.

Sau khi đi phải trừ:

```js
cost
```

### Trap 3 — Quên backtrack

Sai:

```js
visited[i] = true
dfs(...)
```

mà không trả lại false.

Đúng:

```js
visited[i] = true
dfs(...)
visited[i] = false
```

### Trap 4 — Dùng `fatigue > required`

Nếu bằng đúng required vẫn được vào.

Phải:

```js
fatigue >= required
```

### Trap 5 — Generate toàn bộ permutation rồi mới check

Có thể đúng nhưng thừa code và memory.

DFS trực tiếp chỉ mở các nhánh hợp lệ sẽ sạch hơn.

### Trap 6 — Lo recursion của JS

Bài này recursion depth tối đa 8.

An toàn.

---

## 8. Recall 20 giây

> **Nhận diện:** `N <= 8`, order matters, each used once, maximize count → DFS/backtracking.

> **State:** `fatigue`, `count`, `visited`.

> **Candidate:** chưa visited và `fatigue >= required`.

> **Transition:** `dfs(fatigue - cost, count + 1)`.

> **Backtrack:** `visited[i] = false`.

> **Commit:** `answer = max(answer, count)`.

> **Complexity:** O(N!), N<=8.

### Code shape

```js
function dfs(fatigue, count) {
  answer = Math.max(answer, count)

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue

    const [required, cost] = dungeons[i]
    if (fatigue < required) continue

    visited[i] = true
    dfs(fatigue - cost, count + 1)
    visited[i] = false
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“N <= 8 + thứ tự ảnh hưởng → DFS; mỗi lựa chọn là CHOOSE → EXPLORE → UNCHOOSE.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 23 — 타겟 넘버 (Target Number)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43165

**Pattern:** DFS / Binary Choice Tree / Exhaustive Search  
**Trigger:** `mỗi phần tử có đúng 2 lựa chọn (+ hoặc -) + n <= 20 + hỏi số cách`

---

## 1. Dịch đề tiếng Việt

Có một mảng số nguyên không âm `numbers`.

Ta phải giữ nguyên thứ tự các số, và trước mỗi số chọn một trong hai dấu:

```text
+
-
```

sao cho tổng cuối cùng bằng `target`.

Ví dụ:

```text
numbers = [1,1,1,1,1]
target = 3
```

có 5 cách.

Mục tiêu:

> return số cách gán dấu `+/-` để tạo ra `target`.

### Giới hạn quan trọng

```text
2 <= numbers.length <= 20
```

Mỗi index có 2 lựa chọn:

```text
2^20 = 1,048,576
```

→ DFS brute force hoàn toàn chạy được.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Tại index `i`:

```text
sum + numbers[i]
sum - numbers[i]
```

Khi:

```js
index === numbers.length
```

nếu:

```js
sum === target
```

thì tìm được 1 cách.

---

### STEP 2 — BOUND

```text
N <= 20
```

State tree tối đa khoảng:

```text
2^(N+1)
```

xấp xỉ 2 triệu node.

Recursion depth tối đa:

```text
20
```

→ JavaScript an toàn.

---

### STEP 3 — BRUTE FORCE

Brute force đúng:

```text
với mỗi số
    thử +
    thử -
```

Đây là binary decision tree.

Không cần permutation vì thứ tự numbers không đổi.

---

### STEP 4 — BOTTLENECK

Điểm dễ nhầm:

> Không chọn “dùng hay không dùng” số.

Mọi số đều phải dùng đúng một lần.

Ta chỉ chọn dấu:

```text
+ hoặc -
```

---

### STEP 5 — STATE

DFS state:

```js
dfs(index, sum)
```

Trong đó:

- `index`: đang xử lý tới số nào
- `sum`: tổng tạm thời

Global/local result:

```js
let count = 0
```

---

### STEP 6 — TRANSITION

Từ state:

```js
dfs(index, sum)
```

branch 1:

```js
dfs(index + 1, sum + numbers[index])
```

branch 2:

```js
dfs(index + 1, sum - numbers[index])
```

---

### STEP 7 — INVARIANT

Khi gọi:

```js
dfs(index, sum)
```

thì:

> `sum` là tổng tạo ra sau khi đã gán dấu cho đúng `index` phần tử đầu tiên.

Các phần tử từ `index` trở đi chưa được xử lý.

---

### STEP 8 — PATTERN

**Pattern:** DFS / Binary Choice Tree.

Dấu hiệu:

- mỗi bước có số lựa chọn cố định rất nhỏ
- phải thử mọi combination quyết định
- N đủ nhỏ để `2^N`
- hỏi **count number of ways**

Trigger sentence:

> **“Mỗi phần tử có 2 choice, n<=20 → DFS nhị phân.”**

---

### STEP 9 — COMPLEXITY

Time:

```text
O(2^N)
```

Space:

```text
O(N)
```

do recursion depth.

Với N=20: an toàn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ nhỏ:

```js
numbers = [1, 2]
target = 1
```

Cây:

```text
dfs(0,0)
├─ +1 → dfs(1,1)
│  ├─ +2 → dfs(2,3)  ❌
│  └─ -2 → dfs(2,-1) ❌
└─ -1 → dfs(1,-1)
   ├─ +2 → dfs(2,1)  ✅ count++
   └─ -2 → dfs(2,-3) ❌
```

Kết quả:

```text
1
```

---

## 4. Bộ phim hình ảnh

Mỗi số tạo ra một ngã rẽ:

```text
          sum
         /   \
      +x       -x
      /         \
   next         next
```

Đi tới hết dãy:

```text
index === n
```

mới check:

```text
sum === target ?
```

---

## 5. Code Skeleton Recall

```js
function solution(numbers, target) {
  let count = 0

  function dfs(index, sum) {
    if (index === numbers.length) {
      if (sum === target) {
        count++
      }
      return
    }

    dfs(
      index + 1,
      sum + numbers[index]
    )

    dfs(
      index + 1,
      sum - numbers[index]
    )
  }

  dfs(0, 0)

  return count
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

Bài này không cần `for`.

```text
dfs(index, sum)
    branch +
    branch -
```

### RESET WHEN

Không cần `visited`.

Vì index luôn tăng và mỗi số được dùng đúng một lần theo thứ tự.

### INVALIDATES WHAT

Không có branch invalid sớm trong bản cơ bản.

Cứ đi tới:

```text
index === n
```

rồi check.

### COMMIT WHEN

Chỉ commit khi:

```js
index === numbers.length &&
sum === target
```

→ `count++`

---

## 7. Trap dễ chết

### Trap 1 — Quên base case `return`

Sau khi index == n phải return ngay.

---

### Trap 2 — Dùng `visited`

Không cần.

Khác bài Dungeons:

- Dungeons: chọn **thứ tự** dungeon → cần visited
- Target Number: thứ tự cố định → chỉ tăng index

---

### Trap 3 — Check target quá sớm

Không được thấy:

```text
sum === target
```

ở giữa chừng rồi count.

Vẫn còn số chưa dùng.

Phải check khi:

```text
index === n
```

---

### Trap 4 — Chỉ đi một branch

Mỗi số bắt buộc phải thử đủ:

```text
+
-
```

---

### Trap 5 — Nghĩ 2^20 quá lớn

```text
2^20 ≈ 1 triệu
```

là ổn.

Không cần DP cho constraint này.

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi số có 2 lựa chọn +/-; n<=20; đếm số cách → DFS binary tree.

> **State:** `index`, `sum`.

> **Transition:** `+numbers[index]` và `-numbers[index]`.

> **Base:** `index === n`.

> **Commit:** `sum === target` → count++.

> **Không cần visited.**

> **Complexity:** O(2^N).

### Code shape

```js
function dfs(index, sum) {
  if (index === n) {
    if (sum === target) count++
    return
  }

  dfs(index + 1, sum + numbers[index])
  dfs(index + 1, sum - numbers[index])
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Thứ tự cố định, mỗi index chỉ rẽ 2 nhánh +/−; tới cuối dãy mới check target.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)
