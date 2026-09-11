# PCCP FINAL RECALL — Stack / Queue / Monotonic Stack

> Stack state, queue simulation, batching, monotonic pop logic.

## Bài trong file

- Bài 4 — 크레인 인형뽑기 게임 (Trò gắp thú bằng cần cẩu)
- Bài 11 — 기능개발 (Phát triển chức năng)
- Bài 12 — Dấu ngoặc hợp lệ
- Bài 13 — Process / Tiến trình
- Bài 15 — 주식가격 (Giá cổ phiếu)
- Bài 16 — 큰 수 만들기 (Tạo số lớn nhất)
- Bài 17 — 다리를 지나는 트럭 (Xe tải qua cầu)

---
# Bài 4 — 크레인 인형뽑기 게임 (Trò gắp thú bằng cần cẩu)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/64061

## 1. Dịch đề tiếng Việt

Một trò chơi gắp thú có một bảng vuông `N x N`.

Mỗi ô:

- `0` = ô trống.
- `1..100` = một loại búp bê; cùng số nghĩa là cùng loại.

Các búp bê trong mỗi cột được xếp từ dưới lên, nên khi cần cẩu hoạt động ở một cột, nó sẽ lấy **con búp bê trên cùng còn lại** của cột đó.

Mảng `moves` chứa các vị trí cột mà cần cẩu sẽ hoạt động theo thứ tự.

Ví dụ:

```text
move = 3
```

nghĩa là cần cẩu hoạt động ở **cột số 3 theo cách đánh số 1-based của đề**.

Nếu cột đó không còn búp bê, không có gì xảy ra.

Mỗi búp bê được gắp sẽ được thả vào giỏ. Giỏ hoạt động như một chồng:

```text
bottom ... top
```

Nếu búp bê mới thả vào giống với búp bê đang ở trên cùng của giỏ, hai con sẽ nổ và biến mất.

Mỗi lần như vậy:

```text
answer += 2
```

Hãy trả về tổng số búp bê đã bị nổ sau khi xử lý toàn bộ `moves`.

### Giới hạn

```text
5 <= N <= 30
1 <= moves.length <= 1000
1 <= move <= N
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
board = grid N x N
moves = danh sách cột cần gắp
```

**Output**

```text
số búp bê đã biến mất
```

**Một câu chốt**

> Với mỗi `move`, tìm búp bê đầu tiên khác `0` từ trên xuống trong cột đó, lấy nó ra, rồi xử lý bằng Stack trong giỏ.

---

### STEP 2 — BOUND

```text
N <= 30
moves.length <= 1000
```

Nếu mỗi move scan tối đa `N` hàng:

```text
1000 × 30 = 30,000
```

rất nhỏ.

Vì vậy cách trực tiếp:

```text
for move
    for row từ trên xuống
```

hoàn toàn đủ.

Không cần tối ưu phức tạp hơn.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên nhất:

```text
for mỗi move:
    col = move - 1

    scan row = 0 → N-1

    gặp board[row][col] != 0:
        doll = board[row][col]
        board[row][col] = 0

        đưa doll vào basket
        break
```

Sau đó giỏ xử lý:

```text
if basket top == doll:
    pop
    answer += 2
else:
    push doll
```

Đây cũng chính là lời giải chuẩn.

---

### STEP 4 — BOTTLENECK

Bài này có hai chỗ dễ sai hơn là chậm:

**1. Phải lấy đúng con trên cùng của cột**

Ta phải scan:

```text
TOP
row 0
row 1
row 2
...
BOTTOM
```

và dừng ngay tại ô đầu tiên khác `0`.

**2. Sau khi lấy phải xoá khỏi board**

```js
board[row][col] = 0
```

Nếu quên, lần sau cần cẩu sẽ gắp lại cùng một con.

---

### STEP 5 — STATE

| State | Ý nghĩa |
|---|---|
| `basket` | các búp bê còn lại trong giỏ |
| `answer` | số búp bê đã nổ |
| `board` | trạng thái hiện tại sau các lần gắp |
| `col` | cột của move hiện tại |

Điểm quan trọng:

```text
basket[basket.length - 1]
```

chính là búp bê trên cùng của giỏ.

**State tối thiểu:**

```text
board + basket + answer
```

---

### STEP 6 — TRANSITION

Một `move` đi qua flow:

```text
MOVE
 ↓
convert 1-based → 0-based
 ↓
scan cột từ trên xuống
 ↓
find first non-zero doll
 ↓
remove khỏi board
 ↓
compare với basket top
 ↓
SAME?
 ├─ YES → pop + answer += 2
 └─ NO  → push
 ↓
NEXT MOVE
```

Code logic lõi:

```js
const col = move - 1

for (let row = 0; row < board.length; row++) {
  const doll = board[row][col]

  if (doll === 0) continue

  board[row][col] = 0

  if (basket.at(-1) === doll) {
    basket.pop()
    answer += 2
  } else {
    basket.push(doll)
  }

  break
}
```

`break` rất quan trọng: một move chỉ được gắp **một** con.

---

### STEP 7 — INVARIANT

Invariant của `basket`:

> Sau mỗi move, trong basket không tồn tại hai búp bê giống nhau nằm cạnh nhau ở top mà chưa được xử lý.

Vì mỗi khi con mới vào:

```text
new doll == top
```

thì cặp đó biến mất ngay.

Invariant của `board`:

> Mọi búp bê đã gắp đều đã được đổi thành `0`, nên board luôn phản ánh trạng thái còn lại thực tế.

---

### STEP 8 — PATTERN

**Pattern chính:**

```text
Grid Simulation + Stack
```

Dấu hiệu nhận diện:

- Có nhiều lệnh `moves`.
- Mỗi lệnh chọn một cột.
- Cần lấy phần tử đầu tiên còn tồn tại trong cột.
- Các phần tử được đưa vào một cấu trúc theo thứ tự.
- Chỉ cần so phần tử mới với phần tử gần nhất trước đó.
- Khi giống nhau, loại cặp gần nhất.

Đây chính là tín hiệu Stack:

> “Phần tử mới chỉ tương tác với phần tử cuối cùng chưa bị xoá.”

**Trigger sentence**

> “Gắp 1 con → nhìn top giỏ → giống thì pop, khác thì push.”

---

### STEP 9 — COMPLEXITY

Gọi:

```text
N = board.length
M = moves.length
```

Mỗi move scan tối đa `N` row:

```text
O(N)
```

Tổng:

```text
O(M × N)
```

Với:

```text
M <= 1000
N <= 30
```

hoàn toàn an toàn.

Space:

```text
O(N²)
```

worst case cho basket vì tối đa toàn bộ búp bê có thể được gắp mà không nổ.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ chuẩn:

```js
board = [
  [0,0,0,0,0],
  [0,0,1,0,3],
  [0,2,5,0,1],
  [4,2,4,4,2],
  [3,5,1,3,1]
]

moves = [1,5,3,5,1,2,1,4]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `1` | `basket=[]` | cột 0, lấy `4` | top khác → push | không | move tiếp | `[4]` |
| `5` | `[4]` | cột 4, lấy `3` | top khác → push | không | move tiếp | `[4,3]` |
| `3` | `[4,3]` | cột 2, lấy `1` | top khác → push | không | move tiếp | `[4,3,1]` |
| `5` | `[4,3,1]` | cột 4, lấy `1` | top=`1` → pop | `+2` | move tiếp | `[4,3]` |
| `1` | `[4,3]` | cột 0, lấy `3` | top=`3` → pop | `+2` | move tiếp | `[4]` |
| `2` | `[4]` | cột 1, lấy `2` | push | không | move tiếp | `[4,2]` |
| `1` | `[4,2]` | cột 0, cột rỗng | không làm gì | không | move tiếp | `[4,2]` |
| `4` | `[4,2]` | cột 3, lấy `4` | push | không | hết | `[4,2,4]` |

Kết quả:

```text
answer = 4
```

Điểm cần nhìn:

```text
UNIT       = một move
SEARCH     = scan cột từ trên xuống
PICK       = first non-zero
TRANSITION = zero board cell + stack push/pop
COMMIT     = answer += 2 khi pop pair
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Cần cẩu chọn một cột

```text
move = 3

col = 3 - 1 = 2
```

```text
      ↓ crane
col:  0 1 2 3 4
      . . . . .
      . . 1 . 3
      . 2 5 . 1
      4 2 4 4 2
      3 5 1 3 1
```

---

### Frame 2 — Scan từ trên xuống

```text
board[0][2] = 0 → skip
board[1][2] = 1 → FOUND
```

Đây là con trên cùng.

---

### Frame 3 — Gắp ra khỏi board

Trước:

```text
board[1][2] = 1
```

Sau:

```text
board[1][2] = 0
```

Con `1` đang trên cần cẩu.

---

### Frame 4 — Nhìn top giỏ

Giả sử:

```text
basket = [4, 3, 1]
                  ↑
                 top
```

Con mới:

```text
1
```

So:

```text
basket top === doll
1 === 1
```

---

### Frame 5 — Nổ cặp

```text
BEFORE
[4, 3, 1] + 1
        ↑   ↑
        same

POP

AFTER
[4, 3]

answer += 2
```

Nếu khác:

```text
basket.push(doll)
```

---

### Frame 6 — Bộ phim hoàn chỉnh

```text
MOVE
 ↓
COL = move - 1
 ↓
SCAN TOP → BOTTOM
 ↓
FIRST NON-ZERO?
 ├─ NONE → NEXT MOVE
 ↓
DOLL
 ↓
board[row][col] = 0
 ↓
COMPARE WITH STACK TOP
 ↓
SAME?
 ├─ YES → POP + answer += 2
 └─ NO  → PUSH
 ↓
BREAK
 ↓
NEXT MOVE
```

**Câu chuyện 1 dòng**

> “Cần cẩu xuống cột, gắp con đầu tiên gặp được, xoá nó khỏi board, rồi đưa tới cửa giỏ: giống top thì hai con nổ, khác thì chồng lên.”

---

## 5. Code Skeleton Recall

```js
function solution(board, moves) {
  const basket = []
  let answer = 0

  for (const move of moves) {
    const col = move - 1

    for (let row = 0; row < board.length; row++) {
      const doll = board[row][col]

      if (doll === 0) continue

      board[row][col] = 0

      if (basket.length > 0 && basket.at(-1) === doll) {
        basket.pop()
        answer += 2
      } else {
        basket.push(doll)
      }

      break
    }
  }

  return answer
}
```

### Skeleton siêu ngắn

```js
for (const move of moves) {
  const col = move - 1

  for (let row = 0; row < N; row++) {
    if (board[row][col] === 0) continue

    const doll = board[row][col]
    board[row][col] = 0

    if (stack.at(-1) === doll) {
      stack.pop()
      answer += 2
    } else {
      stack.push(doll)
    }

    break
  }
}
```

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Outer = từng `move`; inner = scan từng `row` trong cột đó.

```text
moves
  ↓
columns
  ↓
rows top → bottom
```

**RESET WHEN**

> Không reset `basket` hay `answer`; chúng sống xuyên suốt toàn bộ game.

Chỉ `col` và scan `row` thay đổi theo move.

**INVALIDATES WHAT**

> Gặp `0` không invalidate move — chỉ `continue` xuống dưới.

Nếu scan hết cột mà không thấy búp bê:

```text
move này làm nothing
```

**COMMIT WHEN**

> Ngay khi gặp first non-zero: lấy đúng một con, xử lý stack, rồi `break`.

Một move không bao giờ gắp hai con.

---

## 7. Trap dễ chết

### Trap 1 — Quên `move - 1`

Đề đánh số cột:

```text
1..N
```

JS index:

```text
0..N-1
```

Do đó:

```js
const col = move - 1
```

---

### Trap 2 — Scan từ dưới lên

Sai vì cần lấy con **trên cùng**.

Phải:

```js
for (let row = 0; row < N; row++)
```

không phải từ `N - 1` về `0`.

---

### Trap 3 — Gặp 0 thì break

Sai:

```js
if (board[row][col] === 0) break
```

`0` chỉ là khoảng trống phía trên; có thể còn búp bê ở dưới.

Đúng:

```js
if (board[row][col] === 0) continue
```

---

### Trap 4 — Quên xoá khỏi board

Sau khi lấy:

```js
board[row][col] = 0
```

Nếu quên, lần move sau sẽ lấy lại cùng búp bê.

---

### Trap 5 — Quên `break` sau khi gắp

Nếu không break, inner loop sẽ tiếp tục xuống dưới và có thể gắp nhiều con trong cùng một move.

Đúng:

```text
pick one
process one
break
```

---

### Trap 6 — Push rồi mới kiểm tra pair

Có thể làm được nhưng dễ rối.

Dễ nhớ nhất:

```text
new doll đến cửa basket
↓
compare current top
↓
same → pop
else → push
```

---

### Trap 7 — `answer++`

Mỗi lần nổ là **2 con biến mất**.

Sai:

```js
answer++
```

Đúng:

```js
answer += 2
```

---

### Trap 8 — Nghĩ Stack vì board là stack từng cột rồi build N stack

Có thể preprocess mỗi cột thành stack, nhưng constraint nhỏ nên không cần.

Bản scan trực tiếp:

```text
O(moves × N)
```

đã đủ đơn giản và an toàn.

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi move chọn cột + lấy item đầu tiên còn lại + item mới chỉ so với phần tử cuối giỏ → `Grid scan + Stack`.

> **State:** `board`, `basket`, `answer`.

> **Search:** `col = move - 1`, scan row từ `0` xuống dưới, skip `0`, lấy first non-zero.

> **Transition:** lấy `doll` → `board[row][col] = 0` → compare với `basket.at(-1)`.

> **Same top:** `pop()` + `answer += 2`.

> **Different:** `push(doll)`.

> **Invariant:** basket không giữ cặp giống nhau ở top sau khi xử lý xong một move.

> **Complexity:** `O(moves.length × N)`.

### Code shape

```js
for (const move of moves) {
  const col = move - 1

  for (let row = 0; row < board.length; row++) {
    const doll = board[row][col]
    if (doll === 0) continue

    board[row][col] = 0

    if (basket.at(-1) === doll) {
      basket.pop()
      answer += 2
    } else {
      basket.push(doll)
    }

    break
  }
}
```

### Hình chốt cuối

```text
       MOVE
         ↓
    col = move-1
         ↓
SCAN TOP → BOTTOM
         ↓
 FIRST NON-ZERO
         ↓
    REMOVE BOARD
         ↓
   LOOK STACK TOP
      ↙       ↘
   SAME      DIFFERENT
    ↓            ↓
   POP          PUSH
 answer += 2
         ↓
       BREAK
         ↓
     NEXT MOVE
```

## 🧠 Một câu phải khắc vào đầu

> **“Move chọn cột → scan từ trên xuống lấy đúng một con → xoá khỏi board → nhìn top giỏ → giống pop +2, khác push → break.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)

---

---

# Bài 11 — 기능개발 (Phát triển chức năng)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42586

**Pattern:** Queue / Sequential Batching  
**Trigger:** `task sau xong sớm vẫn phải chờ task trước → tính ngày xong → gom batch theo thứ tự`

---

## 1. Dịch đề tiếng Việt

Team Programmers đang phát triển nhiều chức năng.

Mỗi chức năng chỉ có thể được đưa lên service khi tiến độ đạt:

```text
100%
```

Mỗi chức năng có tốc độ phát triển khác nhau, vì vậy có thể xảy ra trường hợp:

```text
task phía sau hoàn thành trước task phía trước
```

Tuy nhiên, task phía sau **không được deploy trước**.

Nếu task phía sau đã hoàn thành nhưng task phía trước chưa hoàn thành, task phía sau phải **chờ**, và sẽ được deploy cùng lúc khi task phía trước được deploy.

Cho:

```text
progresses
```

là tiến độ hiện tại của các task theo đúng thứ tự cần deploy,

và:

```text
speeds
```

là tốc độ phát triển mỗi ngày của từng task.

Hãy return một array cho biết:

```text
mỗi lần deploy có bao nhiêu task được deploy cùng nhau
```

### Giới hạn

```text
progresses.length <= 100
progresses[i] < 100
speeds[i] <= 100
```

Deploy chỉ diễn ra **một lần vào cuối mỗi ngày**.

Ví dụ:

```text
progress = 95
speed = 4
```

Sau 1 ngày:

```text
99
```

chưa đủ.

Sau 2 ngày:

```text
103
```

→ deploy được sau:

```text
2 ngày
```

### Ví dụ 1

```js
progresses = [93,30,55]
speeds     = [1,30,5]
```

Ngày hoàn thành riêng lẻ:

```text
7,3,9
```

Task 2 xong ngày 3 nhưng phải chờ task 1 đến ngày 7.

Do đó:

```text
day 7 → 2 tasks
day 9 → 1 task
```

Kết quả:

```js
[2,1]
```

### Ví dụ 2

```js
progresses = [95,90,99,99,80,99]
speeds     = [1,1,1,1,1,1]
```

Ngày hoàn thành:

```text
[5,10,1,1,20,1]
```

Deploy:

```text
day 5  → 1
day 10 → 3
day 20 → 2
```

Kết quả:

```js
[1,3,2]
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
progresses[i]
speeds[i]
```

**Output**

```text
array số lượng task trong từng batch deploy
```

Quan trọng:

```text
thứ tự task không thay đổi
```

Task sau không được vượt mặt task trước.

**Một câu chốt**

> Tính ngày hoàn thành của từng task, rồi duyệt từ trái sang phải và gom những task có thể chờ để đi cùng batch của task đầu tiên chưa deploy.

---

### STEP 2 — BOUND

```text
N <= 100
```

Rất nhỏ.

Ta có thể simulate từng ngày, nhưng không cần.

Thay vì:

```text
mỗi ngày tăng progress
```

ta tính thẳng:

```text
daysNeeded
```

cho từng task.

Công thức:

```js
Math.ceil((100 - progress) / speed)
```

Sau đó chỉ cần một pass.

Target:

```text
O(N)
```

---

### STEP 3 — BRUTE FORCE

Cách mô phỏng:

```text
day++
progress[i] += speed[i]
...
```

Mỗi ngày check task đầu queue đã >= 100 chưa.

Logic đúng.

Nhưng dài, dễ bug, và không cần thiết.

Ta biết chính xác ngày hoàn thành riêng lẻ nên có thể tính thẳng.

---

### STEP 4 — BOTTLENECK

Điểm khó không phải tính ngày.

Điểm khó là:

> Task sau dù xong sớm vẫn bị chặn bởi task trước.

Ví dụ:

```text
days = [7,3,9]
```

Nếu chỉ group theo ngày bằng nhau thì sai:

```text
7
3
9
```

Task ngày 3 vẫn phải đi cùng batch ngày 7.

Mental transformation:

```text
[7,3,9]
 ↓
batch 1 release day = 7
3 <= 7 → join
9 > 7  → new batch
```

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `releaseDay` | ngày deploy của batch hiện tại |
| `count` | số task trong batch hiện tại |
| `answer` | kích thước các batch |

Có thể precompute:

```text
days[]
```

hoặc tính trực tiếp trong loop.

Bản dễ recall nhất:

```text
days[]
releaseDay
count
answer
```

---

### STEP 6 — TRANSITION

Đầu tiên tính:

```js
days[i] = Math.ceil(
  (100 - progresses[i]) / speeds[i]
)
```

Khởi tạo batch bằng task đầu:

```js
let releaseDay = days[0]
let count = 1
```

Với mỗi task sau:

### Case 1

```text
days[i] <= releaseDay
```

Task này xong trước hoặc đúng ngày batch hiện tại deploy.

Nó phải chờ task trước nên:

```js
count++
```

`releaseDay` **không đổi**.

### Case 2

```text
days[i] > releaseDay
```

Task này chưa xong vào ngày batch hiện tại deploy.

Vậy batch cũ kết thúc:

```js
answer.push(count)
```

Mở batch mới:

```js
releaseDay = days[i]
count = 1
```

Sau loop nhớ:

```js
answer.push(count)
```

cho batch cuối.

---

### STEP 7 — INVARIANT

Trong khi duyệt:

> `releaseDay` là ngày deploy của toàn bộ batch hiện tại.

Và:

> mọi task đã gom vào batch hiện tại đều có `days[i] <= releaseDay`.

Khi gặp:

```text
days[i] > releaseDay
```

task đó không thể đi cùng batch hiện tại.

Nó bắt buộc trở thành leader của batch mới.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Sequential batching / Queue order constraint
```

Có thể nhìn như queue vì:

```text
chỉ task ở đầu hàng mới quyết định khi nào nhóm được release
```

Dấu hiệu nhận diện:

- Các task có thứ tự cố định.
- Task sau có thể hoàn thành trước.
- Nhưng không được vượt task trước.
- Hỏi số lượng được xử lý/deploy theo từng batch.

**Trigger sentence**

> “Task sau không được vượt mặt → task đầu chưa release đóng vai trò gate → gom những task hoàn thành không muộn hơn gate.”

Mental model:

```text
days:
7 3 9
↑
gate = 7

3 <= 7 → WAIT & JOIN
9 > 7  → NEW GATE
```

---

### STEP 9 — COMPLEXITY

Tính `days`:

```text
O(N)
```

Duyệt group:

```text
O(N)
```

Tổng:

```text
O(N)
```

Space:

```text
O(N)
```

nếu tạo `days`.

Có thể giảm xuống:

```text
O(1)
```

ngoài output nếu tính days trực tiếp.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
progresses = [93,30,55]
speeds     = [1,30,5]
```

Tính:

```text
days = [7,3,9]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| task 0 | none | day=7 | mở batch | no | task 1 | releaseDay=7,count=1 |
| task 1 | day=7,count=1 | day=3 | `3 <= 7` | no | task 2 | count=2 |
| task 2 | day=7,count=2 | day=9 | `9 > 7` | push `2` | new batch | releaseDay=9,count=1 |
| end | day=9,count=1 | hết task | push batch cuối | push `1` | done | `[2,1]` |

---

### Dry run ví dụ 2

```text
days = [5,10,1,1,20,1]
```

Flow:

```text
releaseDay = 5
count = 1

10 > 5
→ push 1
→ releaseDay = 10
→ count = 1

1 <= 10 → count = 2
1 <= 10 → count = 3

20 > 10
→ push 3
→ releaseDay = 20
→ count = 1

1 <= 20
→ count = 2

end → push 2
```

Result:

```text
[1,3,2]
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Mỗi task có một tấm thẻ ngày hoàn thành

```text
Task A  Task B  Task C
  7       3       9
```

### Frame 2 — Task A đứng đầu hàng

```text
[A:7] [B:3] [C:9]
  ↑
 GATE
```

Dù B xong ngày 3:

```text
B không được vượt A
```

### Frame 3 — B phải chờ

```text
[A:7] [B:3]
   └───────┘
   deploy cùng day 7
```

### Frame 4 — C không kịp day 7

```text
C:9 > gate:7
```

→ batch mới.

### Bộ phim đầy đủ

```text
CALCULATE DAYS
      ↓
[7,3,9]
      ↓
gate = 7
      ↓
3 <= 7 → JOIN
      ↓
9 > 7 → CLOSE BATCH
      ↓
gate = 9
      ↓
END → CLOSE LAST
```

**Câu chuyện 1 dòng**

> “Người đầu hàng quyết định ngày xe chạy; ai phía sau xong trước ngày xe chạy thì lên cùng xe, ai chưa xong thì phải đợi chuyến sau.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(progresses, speeds) {
  const days = progresses.map((progress, i) =>
    Math.ceil((100 - progress) / speeds[i])
  )

  const answer = []

  let releaseDay = days[0]
  let count = 1

  for (let i = 1; i < days.length; i++) {
    if (days[i] <= releaseDay) {
      count++
    } else {
      answer.push(count)

      releaseDay = days[i]
      count = 1
    }
  }

  answer.push(count)

  return answer
}
```

### Skeleton siêu ngắn

```js
const days = ...

let releaseDay = days[0]
let count = 1

for (let i = 1; i < days.length; i++) {
  if (days[i] <= releaseDay) {
    count++
  } else {
    answer.push(count)
    releaseDay = days[i]
    count = 1
  }
}

answer.push(count)
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Hai phase tuần tự:

```text
1. calculate days
2. scan days to batch
```

Không nested loop.

---

### RESET WHEN

> `count = 1` chỉ reset khi bắt đầu batch mới.

```js
if (days[i] > releaseDay) {
  answer.push(count)
  releaseDay = days[i]
  count = 1
}
```

---

### INVALIDATES WHAT

> Task mới invalidate batch hiện tại khi:

```text
days[i] > releaseDay
```

Nếu:

```text
days[i] <= releaseDay
```

nó vẫn join batch.

---

### COMMIT WHEN

> Khi gặp task cần muộn hơn `releaseDay`, commit batch cũ.

Và cực kỳ quan trọng:

> Sau loop phải commit **batch cuối cùng**.

```js
answer.push(count)
```

---

## 7. Trap dễ chết

### Trap 1 — Quên `Math.ceil`

Sai:

```js
(100 - progress) / speed
```

Ví dụ:

```text
95, speed 4
```

ra:

```text
1.25
```

nhưng cần:

```text
2 ngày
```

Đúng:

```js
Math.ceil((100 - progress) / speed)
```

---

### Trap 2 — So với task trước thay vì releaseDay của batch

Ví dụ:

```text
days = [10,1,9]
```

Nếu chỉ so:

```text
9 > 1
```

mày có thể tưởng phải tách batch.

Nhưng thực tế:

```text
1 <= 10
9 <= 10
```

cả 3 đều deploy ngày 10.

Phải compare với:

```text
releaseDay = 10
```

không phải `days[i - 1]`.

---

### Trap 3 — Update releaseDay khi task sau xong sớm

Sai:

```js
if (days[i] <= releaseDay) {
  releaseDay = days[i]
}
```

Không.

Leader của batch vẫn quyết định ngày deploy.

Ví dụ:

```text
7,3
```

batch vẫn deploy ngày:

```text
7
```

không phải 3.

---

### Trap 4 — Quên push batch cuối

Loop chỉ push khi gặp new batch.

Batch cuối không có task phía sau để trigger push.

Phải:

```js
answer.push(count)
```

sau loop.

---

### Trap 5 — Dùng queue với `shift()` không cần thiết

Bài có thể giải bằng queue, nhưng không cần mutate queue.

Một single pass trên `days` đơn giản hơn.

Pattern là queue/order constraint, không có nghĩa bắt buộc phải dùng `shift()`.

---

### Trap 6 — Group những task có cùng exact day

Sai tư duy:

```text
chỉ cùng ngày mới chung batch
```

Ví dụ:

```text
[7,3]
```

vẫn chung batch vì task 3 ngày phải chờ task 7 ngày.

Điều kiện là:

```text
days[i] <= releaseDay
```

không phải:

```text
days[i] === releaseDay
```

---

## 8. Recall 20 giây

> **Nhận diện:** task có thứ tự; task sau xong sớm vẫn không được vượt task trước → sequential batching / queue gate.

> **Step 1:** `days = ceil((100-progress)/speed)`.

> **State:** `releaseDay`, `count`, `answer`.

> **Join batch:** `days[i] <= releaseDay` → `count++`.

> **New batch:** `days[i] > releaseDay` → push count, `releaseDay = days[i]`, `count = 1`.

> **Final:** nhớ `answer.push(count)` sau loop.

> **Complexity:** `O(N)`.

### Code shape

```js
const days = progresses.map((p, i) =>
  Math.ceil((100 - p) / speeds[i])
)

let releaseDay = days[0]
let count = 1

for (let i = 1; i < days.length; i++) {
  if (days[i] <= releaseDay) {
    count++
  } else {
    answer.push(count)
    releaseDay = days[i]
    count = 1
  }
}

answer.push(count)
```

### Hình chốt cuối

```text
DAYS
7 3 9
↑
GATE

3 <= 7
→ JOIN

9 > 7
→ COMMIT 2
→ NEW GATE = 9

END
→ COMMIT 1
```

## 🧠 Một câu phải khắc vào đầu

> **“Task đầu là cái cổng: task sau xong trước hoặc bằng ngày cổng thì chờ đi cùng; muộn hơn cổng thì mở batch mới.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 12 — Dấu ngoặc hợp lệ

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/12909

**Pattern:** Stack / Balance Counter  
**Trigger:** `chỉ có ( và ) → balance; prefix không được âm; cuối cùng phải về 0`

---

## 1. Dịch đề tiếng Việt

Một chuỗi dấu ngoặc được gọi là **đúng / hợp lệ** nếu:

- mỗi dấu mở:

```text
(
```

đều được đóng bởi một dấu:

```text
)
```

đúng thứ tự.

Ví dụ:

```text
()()
```

và:

```text
(())()
```

là hợp lệ.

Nhưng:

```text
)()(
```

hoặc:

```text
(()(
```

là không hợp lệ.

Cho chuỗi:

```text
s
```

chỉ gồm:

```text
(
)
```

Hãy return:

```text
true
```

nếu chuỗi dấu ngoặc hợp lệ,

ngược lại return:

```text
false
```

### Giới hạn

```text
1 <= s.length < 100,000
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
string s chỉ chứa '(' và ')'
```

**Output**

```text
true / false
```

Một chuỗi hợp lệ phải thỏa cả hai điều kiện:

```text
1. Trong mọi prefix:
   số ')' không bao giờ nhiều hơn số '('.

2. Sau khi đọc hết:
   tổng '(' phải bằng tổng ')'.
```

**Một câu chốt**

> Mỗi `(` tạo một khoản nợ đóng ngoặc; mỗi `)` trả một khoản nợ. Không được trả khi chưa có nợ, và cuối cùng nợ phải bằng 0.

---

### STEP 2 — BOUND

```text
length < 100,000
```

Chỉ cần duyệt một lần:

```text
O(N)
```

Không cần nested loop.

---

### STEP 3 — BRUTE FORCE

Có thể dùng stack thật:

```js
const stack = []

for (const ch of s) {
  if (ch === "(") {
    stack.push(ch)
  } else {
    if (stack.length === 0) {
      return false
    }

    stack.pop()
  }
}

return stack.length === 0
```

Cách này hoàn toàn đúng.

Nhưng vì chỉ có **một loại dấu ngoặc**, ta không cần lưu từng `"("`.

Ta chỉ cần lưu:

```text
stack.length
```

tức là một biến `balance`.

---

### STEP 4 — BOTTLENECK

Stack thật đang lưu:

```text
(
(
(
```

nhưng nội dung các phần tử đều giống nhau.

Thông tin duy nhất ta cần là:

```text
có bao nhiêu '(' chưa được đóng?
```

Do đó:

```text
stack.length
```

có thể nén thành:

```text
balance
```

---

### STEP 5 — STATE

Ta cần đúng một state:

```js
let balance = 0
```

Ý nghĩa:

> `balance` = số dấu `(` đã gặp nhưng chưa được ghép với `)`.

Invariant mong muốn:

```text
balance >= 0
```

ở mọi thời điểm.

---

### STEP 6 — TRANSITION

Mỗi ký tự:

### Nếu là `(`

```js
balance++
```

### Nếu là `)`

```js
balance--
```

Ngay sau đó:

```js
if (balance < 0) {
  return false
}
```

Vì balance âm nghĩa là:

```text
đang có ')' không có '(' phía trước để ghép.
```

Sau loop:

```js
return balance === 0
```

---

### STEP 7 — INVARIANT

Sau khi đọc bất kỳ prefix nào:

```text
balance
=
#opening parentheses
-
#closing parentheses
```

Một chuỗi hợp lệ bắt buộc:

```text
balance >= 0
```

cho mọi prefix.

Ví dụ:

```text
")("
```

ngay ký tự đầu:

```text
balance = -1
```

→ false ngay.

Cuối cùng còn cần:

```text
balance === 0
```

Ví dụ:

```text
"(()"
```

không bao giờ âm,

nhưng cuối:

```text
balance = 1
```

→ vẫn false.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Stack validation
```

Nhưng vì chỉ có một loại bracket:

```text
Stack → compress thành counter
```

Dấu hiệu nhận diện:

- Dấu mở / đóng.
- Cần đúng thứ tự.
- Closing phải match opening trước đó.
- Chỉ có `(` và `)`.

**Trigger sentence**

> “Một loại ngoặc thôi → không cần stack thật; balance là đủ.”

Phân biệt:

```text
chỉ ()       → counter đủ
(), [], {}   → cần stack thật để nhớ loại ngoặc
```

---

### STEP 9 — COMPLEXITY

Duyệt string một lần:

```text
O(N)
```

Space:

```text
O(1)
```

với counter.

Nếu dùng stack thật:

```text
O(N)
```

space worst case.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

### Ví dụ hợp lệ

```text
s = "(())()"
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `(` | balance=0 | open | `+1` | no | tiếp | 1 |
| `(` | 1 | open | `+1` | no | tiếp | 2 |
| `)` | 2 | close | `-1` | no | tiếp | 1 |
| `)` | 1 | close | `-1` | no | tiếp | 0 |
| `(` | 0 | open | `+1` | no | tiếp | 1 |
| `)` | 1 | close | `-1` | no | end | 0 |

Final:

```text
balance = 0
```

→ `true`.

### Ví dụ fail sớm

```text
s = ")()("
```

Ký tự đầu:

```text
balance = -1
```

→ return `false` ngay.

### Ví dụ fail cuối

```text
s = "(()("
```

Không prefix nào âm,

nhưng cuối:

```text
balance = 2
```

→ false.

---

## 4. Bộ phim hình ảnh

### Frame 1 — `(` bỏ một viên gạch vào kho

```text
(
↓
balance = 1
```

### Frame 2 — thêm `(`

```text
((
↓
balance = 2
```

### Frame 3 — `)` lấy một viên ra

```text
(()
↓
balance = 1
```

### Frame 4 — Nếu lấy khi kho đang rỗng

```text
balance = 0
 gặp ')'
↓
balance = -1
```

Không có opening để ghép.

→ false ngay.

### Frame 5 — Cuối chuỗi

Nếu:

```text
balance = 0
```

→ mọi opening đã được đóng.

Nếu:

```text
balance > 0
```

→ còn opening chưa được đóng.

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(s) {
  let balance = 0

  for (const ch of s) {
    if (ch === "(") {
      balance++
    } else {
      balance--
    }

    if (balance < 0) {
      return false
    }
  }

  return balance === 0
}
```

### Bản stack thật

```js
function solution(s) {
  const stack = []

  for (const ch of s) {
    if (ch === "(") {
      stack.push(ch)
    } else {
      if (stack.length === 0) {
        return false
      }

      stack.pop()
    }
  }

  return stack.length === 0
}
```

Trong bài này, counter ngắn hơn và sạch hơn.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Một loop duyệt từng ký tự.

```text
for char
    update balance
    check negative
```

---

### RESET WHEN

> Không reset balance.

Nó đại diện cho toàn bộ prefix đã đọc.

---

### INVALIDATES WHAT

> `balance < 0` invalidate ngay lập tức.

Không cần đọc tiếp.

Vì không ký tự tương lai nào có thể làm dấu `)` vừa rồi có opening nằm **trước nó**.

---

### COMMIT WHEN

> Chỉ return `true` sau khi đọc hết chuỗi và:

```text
balance === 0
```

Không phải chỉ vì chưa từng âm.

---

## 7. Trap dễ chết

### Trap 1 — Chỉ check cuối cùng `balance === 0`

Sai.

Ví dụ:

```text
")("
```

Cuối:

```text
balance = 0
```

nhưng rõ ràng invalid.

Phải check:

```js
if (balance < 0) return false
```

trong loop.

---

### Trap 2 — Chỉ check không âm, quên cuối phải bằng 0

Ví dụ:

```text
"((("
```

balance không bao giờ âm.

Nhưng cuối:

```text
3
```

→ false.

---

### Trap 3 — Pop stack không check empty

Nếu dùng stack:

Sai:

```js
stack.pop()
```

cho mọi `)`.

`pop()` trên empty không crash trong JS, nhưng logic sẽ bị nuốt mất lỗi.

Phải:

```js
if (stack.length === 0) return false
```

trước khi pop.

---

### Trap 4 — Nghĩ số lượng `(` và `)` bằng nhau là đủ

Sai.

```text
")("
```

có:

```text
1 open
1 close
```

nhưng thứ tự sai.

Bài là:

```text
prefix validity + total equality
```

---

### Trap 5 — Dùng stack quá nặng cho một loại ngoặc

Không sai, nhưng unnecessary.

Với chỉ:

```text
(
)
```

balance counter là đủ.

---

## 8. Recall 20 giây

> **Nhận diện:** validate `()` → Stack; chỉ một loại ngoặc → nén stack thành balance counter.

> **State:** `balance = số '(' chưa được đóng`.

> **Transition:** `(` → `+1`, `)` → `-1`.

> **Invalid:** `balance < 0` ở bất kỳ prefix nào → false ngay.

> **Final:** `balance === 0`.

> **Complexity:** `O(N)` time, `O(1)` space.

### Code shape

```js
let balance = 0

for (const ch of s) {
  balance += ch === "(" ? 1 : -1

  if (balance < 0) {
    return false
  }
}

return balance === 0
```

### Hình chốt cuối

```text
(
↓
+1

)
↓
-1

ANY PREFIX
balance < 0
→ FALSE

END
balance == 0
→ TRUE
```

## 🧠 Một câu phải khắc vào đầu

> **“Ngoặc đúng = không prefix nào bị âm, và cuối cùng balance phải về 0.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 13 — Process / Tiến trình

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42587

**Pattern:** Queue + Priority Simulation  
**Trigger:** `pop đầu queue → nếu còn process priority cao hơn thì đưa lại cuối → nếu không thì execute`

---

## 1. Dịch đề tiếng Việt

Hệ điều hành quản lý các process theo các quy tắc:

```text
1. Lấy process ở đầu queue ra.
2. Nếu trong queue vẫn còn process có priority cao hơn:
   → đưa process vừa lấy ra về cuối queue.
3. Nếu không còn process nào có priority cao hơn:
   → execute process đó.
   → process đã execute thì kết thúc, không quay lại queue.
```

Ví dụ:

```text
Process:   A B C D
Priority:  2 1 3 2
```

Thứ tự execute:

```text
C → D → A → B
```

Cho:

```text
priorities
```

là priority của các process theo thứ tự ban đầu trong queue,

và:

```text
location
```

là vị trí ban đầu của process mà ta muốn theo dõi.

Hãy return:

```text
process đó được execute thứ mấy
```

### Giới hạn

```text
1 <= priorities.length <= 100
1 <= priorities[i] <= 9
0 <= location < priorities.length
```

Priority càng lớn → ưu tiên càng cao.

### Ví dụ 1

```js
priorities = [2,1,3,2]
location = 2
```

Process tại `location=2` là C, priority 3.

C được execute đầu tiên.

Kết quả:

```text
1
```

### Ví dụ 2

```js
priorities = [1,1,9,1,1,1]
location = 0
```

Thứ tự:

```text
C → D → E → F → A → B
```

A được execute thứ:

```text
5
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
priorities[]
location
```

**Output**

```text
thứ tự execute của process có original index = location
```

Ta phải giữ đồng thời:

```text
priority
original index
```

Vì nhiều process có thể cùng priority.

**Một câu chốt**

> Mô phỏng queue đúng luật, và khi một process thực sự execute thì tăng `order`; nếu original index của nó bằng `location` thì return `order`.

---

### STEP 2 — BOUND

```text
N <= 100
priority <= 9
```

Rất nhỏ.

Ta có thể mô phỏng trực tiếp.

Mỗi lần pop một process rồi scan queue xem có priority cao hơn hay không:

```text
O(N)
```

Lặp tối đa cỡ:

```text
O(N²)
```

với N=100 → hoàn toàn ổn.

Không cần heap.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên nhất cũng chính là simulation:

```text
queue = all processes

while queue not empty:
    current = pop front

    if exists process with higher priority:
        push current back
    else:
        execute
        order++
```

Đây không phải brute force xấu.

N nhỏ nên simulation là pattern đúng.

---

### STEP 4 — BOTTLENECK

Điểm dễ sai nhất:

> Nếu chỉ giữ priority, ta sẽ mất identity của process cần theo dõi.

Ví dụ:

```text
priorities = [1,1,1]
location = 1
```

Ba process cùng priority.

Không thể chỉ nhìn value `1` để biết process nào là target.

Do đó queue item phải là:

```js
{
  priority,
  index
}
```

hoặc:

```js
[priority, index]
```

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `queue` | các process đang chờ |
| `current` | process vừa lấy khỏi đầu |
| `order` | đã execute bao nhiêu process |
| `location` | original index cần tìm |

Queue item:

```js
{
  priority,
  index
}
```

---

### STEP 6 — TRANSITION

Lấy process đầu:

```js
const current = queue.shift()
```

Check:

```js
const hasHigher = queue.some(
  process => process.priority > current.priority
)
```

### Case 1 — có higher priority

```js
queue.push(current)
```

Không tăng `order`.

### Case 2 — không có higher priority

Process được execute:

```js
order++
```

Nếu:

```js
current.index === location
```

thì:

```js
return order
```

---

### STEP 7 — INVARIANT

Trong queue:

> Thứ tự của các process chưa execute luôn đúng theo quy tắc FIFO sau các lần requeue.

Và:

> `order` chỉ tăng khi process thực sự execute.

Không tăng order khi:

```text
pop → phát hiện priority cao hơn → push lại
```

Đây là invariant cực quan trọng.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Queue simulation with priority condition
```

Dấu hiệu nhận diện:

- Có queue ban đầu.
- Pop đầu.
- Có thể đưa phần tử lại cuối.
- Chỉ process có điều kiện priority mới được xử lý.
- Cần theo dõi identity ban đầu.

**Trigger sentence**

> “Pop đầu; nếu còn thằng priority cao hơn thì quay lại cuối; không thì execute.”

Mental movie:

```text
FRONT
  ↓
POP
  ↓
HIGHER EXISTS?
├─ YES → PUSH BACK
└─ NO  → EXECUTE → order++
```

---

### STEP 9 — COMPLEXITY

N <= 100.

Mỗi vòng:

```text
shift + some
```

có thể O(N).

Worst case:

```text
O(N²)
```

Space:

```text
O(N)
```

cho queue.

Với constraint này hoàn toàn ổn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
priorities = [2,1,3,2]
location = 2
```

Queue ban đầu:

```text
A2 B1 C3 D2
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| A2 | `A2 B1 C3 D2` | pop A2 | còn C3 > 2 | no | push back | `B1 C3 D2 A2` |
| B1 | `B1 C3 D2 A2` | pop B1 | còn C3 > 1 | no | push back | `C3 D2 A2 B1` |
| C3 | `C3 D2 A2 B1` | pop C3 | không ai > 3 | order=1 | target? yes | return 1 |

---

### Dry run ví dụ 2

```js
priorities = [1,1,9,1,1,1]
location = 0
```

Identity:

```text
A1 B1 C9 D1 E1 F1
```

Sau rotation:

```text
C9
```

execute đầu tiên.

Queue còn:

```text
D1 E1 F1 A1 B1
```

Tất cả cùng priority 1 nên execute theo FIFO:

```text
D → E → F → A → B
```

A là order:

```text
5
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Queue

```text
[A2] [B1] [C3] [D2]
 ↑
front
```

### Frame 2 — Pop A2

```text
A2
```

Nhìn phần còn lại:

```text
B1 C3 D2
```

Có:

```text
C3 > A2
```

→ A quay lại cuối.

```text
[B1] [C3] [D2] [A2]
```

### Frame 3 — Pop B1

Có C3 > B1.

→ B lại cuối.

```text
[C3] [D2] [A2] [B1]
```

### Frame 4 — Pop C3

Không ai priority > 3.

→ execute.

```text
order = 1
```

Nếu C là target:

```text
return 1
```

### Câu chuyện 1 dòng

> “Người đầu hàng bước ra hỏi còn ai VIP hơn không; có thì quay lại cuối hàng, không thì được phục vụ.”

---

## 5. Code Skeleton Recall

### Bản dễ hiểu

```js
function solution(priorities, location) {
  const queue = priorities.map((priority, index) => ({
    priority,
    index,
  }))

  let order = 0

  while (queue.length > 0) {
    const current = queue.shift()

    const hasHigher = queue.some(
      process => process.priority > current.priority
    )

    if (hasHigher) {
      queue.push(current)
      continue
    }

    order++

    if (current.index === location) {
      return order
    }
  }
}
```

### Bản array tuple

```js
function solution(priorities, location) {
  const queue = priorities.map((priority, index) => [
    priority,
    index,
  ])

  let order = 0

  while (queue.length > 0) {
    const [priority, index] = queue.shift()

    if (queue.some(([p]) => p > priority)) {
      queue.push([priority, index])
      continue
    }

    order++

    if (index === location) {
      return order
    }
  }
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Outer loop:

```text
while queue not empty
```

Bên trong:

```text
pop
→ scan higher priority
→ requeue OR execute
```

---

### RESET WHEN

> `current` reset mỗi vòng bằng process mới pop.

`order` không reset.

Queue liên tục mutate theo simulation.

---

### INVALIDATES WHAT

> Nếu tồn tại process với:

```text
priority > current.priority
```

thì current **không được execute**.

Phải:

```js
queue.push(current)
```

---

### COMMIT WHEN

> Chỉ commit execute khi **không có higher priority**.

Lúc đó mới:

```js
order++
```

và check target.

---

## 7. Trap dễ chết

### Trap 1 — Sort priorities rồi mất thứ tự queue

Sai:

```js
priorities.sort((a,b) => b-a)
```

Vì khi priority bằng nhau, order FIFO ban đầu sau các vòng requeue vẫn quan trọng.

Bài là simulation queue, không chỉ là sort.

---

### Trap 2 — Không giữ original index

Nếu chỉ queue priority:

```js
[1,1,9,1]
```

không biết `location=0` đang ở đâu sau rotation.

Phải giữ:

```text
priority + original index
```

---

### Trap 3 — Tăng order khi requeue

Sai:

```text
pop → hasHigher → order++
```

Không.

`order` chỉ tăng khi process thật sự execute.

---

### Trap 4 — Dùng `>=` thay vì `>`

Rule là:

> nếu có process **priority cao hơn**

Priority bằng nhau không chặn nhau.

Đúng:

```js
p > current.priority
```

Sai:

```js
p >= current.priority
```

---

### Trap 5 — Quên `continue` sau push back

Nếu viết:

```js
if (hasHigher) {
  queue.push(current)
}
order++
```

thì current vừa requeue lại vừa bị tính execute.

Phải:

```js
continue
```

hoặc dùng `else`.

---

### Trap 6 — `shift()` O(N) nhưng hoảng quá sớm

Đúng, JS `shift()` tốn O(N).

Nhưng:

```text
N <= 100
```

nên cực kỳ an toàn.

Không cần over-engineer queue head pointer cho bài này.

---

## 8. Recall 20 giây

> **Nhận diện:** queue + pop đầu + có thể push lại cuối + priority quyết định execute.

> **Queue item:** `{priority, originalIndex}`.

> **Transition:** pop current → `some(p > current.priority)`.

> **Nếu có higher:** push current lại cuối.

> **Nếu không:** `order++`.

> **Target:** nếu `current.index === location` sau khi execute → return order.

> **Complexity:** `O(N²)` worst case nhưng N≤100.

### Code shape

```js
const queue = priorities.map((priority, index) => ({
  priority,
  index,
}))

let order = 0

while (queue.length) {
  const current = queue.shift()

  if (
    queue.some(p => p.priority > current.priority)
  ) {
    queue.push(current)
    continue
  }

  order++

  if (current.index === location) {
    return order
  }
}
```

### Hình chốt cuối

```text
POP FRONT
   ↓
HIGHER PRIORITY EXISTS?
   ├─ YES → PUSH BACK
   │
   └─ NO  → EXECUTE
              ↓
           order++
              ↓
           TARGET?
              ↓
           RETURN
```

## 🧠 Một câu phải khắc vào đầu

> **“Pop đầu — còn thằng ưu tiên cao hơn thì quay lại cuối; không còn thì execute và mới tăng order.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 15 — 주식가격 (Giá cổ phiếu)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42584

**Pattern:** Monotonic Stack  
**Trigger:** `với mỗi index, hỏi bao lâu nữa mới gặp phần tử nhỏ hơn đầu tiên`

---

## 1. Dịch đề tiếng Việt

Cho mảng `prices` ghi lại giá cổ phiếu theo từng giây.

Với mỗi thời điểm `i`, hãy tính số giây cho tới khi giá **lần đầu tiên thấp hơn** giá tại `i`.

Nếu từ `i` đến hết mảng không bao giờ có giá thấp hơn `prices[i]`, thì:

```text
answer[i] = lastIndex - i
```

Ví dụ:

```js
prices = [1, 2, 3, 2, 3]
```

Kết quả:

```js
[4, 3, 1, 1, 0]
```

- index 0, giá 1: không bao giờ giảm dưới 1 → 4 giây
- index 1, giá 2: không bao giờ giảm dưới 2 → 3 giây
- index 2, giá 3: sau 1 giây gặp 2 → 1 giây
- index 3, giá 2: tới hết không thấp hơn 2 → 1 giây
- index cuối → 0 giây

### Giới hạn

```text
1 <= prices[i] <= 10,000
2 <= prices.length <= 100,000
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với mỗi `i`, tìm index đầu tiên `j > i` sao cho:

```text
prices[j] < prices[i]
```

Nếu có:

```text
answer[i] = j - i
```

Nếu không có:

```text
answer[i] = n - 1 - i
```

**Một câu chốt**

> Mỗi index đứng chờ cho tới khi gặp giá nhỏ hơn đầu tiên ở bên phải.

---

### STEP 2 — BOUND

```text
N <= 100,000
```

Nested scan cho từng index có thể thành:

```text
O(N²)
```

Ta cần:

```text
O(N)
```

---

### STEP 3 — BRUTE FORCE

```js
for (let i = 0; i < prices.length; i++) {
  for (let j = i + 1; j < prices.length; j++) {
    if (prices[j] < prices[i]) {
      answer[i] = j - i
      break
    }
  }
}
```

Logic đúng, nhưng mảng tăng dần sẽ rất chậm.

---

### STEP 4 — BOTTLENECK

Current price có thể giải quyết nhiều index trước đó.

Ta chỉ cần giữ những index:

```text
chưa gặp giá thấp hơn đầu tiên
```

→ dùng stack.

---

### STEP 5 — STATE

```js
const stack = []
const answer = Array(prices.length).fill(0)
```

Stack lưu **index**, không phải value.

Ý nghĩa:

> Mỗi index trong stack vẫn đang unresolved: chưa gặp giá thấp hơn ở phần đã scan.

---

### STEP 6 — TRANSITION

Duyệt `i` từ trái sang phải.

Nếu current price nhỏ hơn giá của top stack:

```js
prices[i] < prices[stack.at(-1)]
```

thì current chính là lần giảm đầu tiên của top.

```js
while (
  stack.length > 0 &&
  prices[i] < prices[stack.at(-1)]
) {
  const idx = stack.pop()
  answer[idx] = i - idx
}
```

Sau đó:

```js
stack.push(i)
```

---

### STEP 7 — INVARIANT

Mọi index còn trong stack đều chưa gặp một giá nhỏ hơn ở bên phải đã duyệt.

Khi current làm:

```text
prices[i] < prices[top]
```

thì `i` chính là lần giảm đầu tiên của top, vì nếu từng có lần giảm trước đó thì top đã bị pop rồi.

---

### STEP 8 — PATTERN

**Pattern:** Monotonic Stack / Next Event.

Dấu hiệu:

- “với mỗi phần tử”
- hỏi “bao lâu nữa / index đầu tiên bên phải”
- gặp phần tử nhỏ hơn / lớn hơn đầu tiên
- cần tránh scan lại tương lai

Rất gần với **Next Greater Element**:

```text
NGE: current > arr[top]
Stock drop: current < prices[top]
```

Chỉ đổi relation.

---

### STEP 9 — COMPLEXITY

Mỗi index:

```text
push 1 lần
pop tối đa 1 lần
```

Nên:

```text
Time O(N)
Space O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
prices = [1,2,3,2,3]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| i=0,p=1 | `[]` | no top | push 0 | no | next | `[0]` |
| i=1,p=2 | `[0]` | `2<1` false | push 1 | no | next | `[0,1]` |
| i=2,p=3 | `[0,1]` | `3<2` false | push 2 | no | next | `[0,1,2]` |
| i=3,p=2 | `[0,1,2]` | `2<3` true | pop 2 | `answer[2]=1` | recheck | `[0,1]` |
| i=3,p=2 | `[0,1]` | `2<2` false | push 3 | no | next | `[0,1,3]` |
| i=4,p=3 | `[0,1,3]` | `3<2` false | push 4 | no | end | `[0,1,3,4]` |

Còn stack:

```text
0,1,3,4
```

→ không giảm tới hết.

```text
answer[0]=4
answer[1]=3
answer[3]=1
answer[4]=0
```

Final:

```js
[4,3,1,1,0]
```

---

## 4. Bộ phim hình ảnh

Mỗi index bật một chiếc đồng hồ:

```text
0: price 1 → waiting
1: price 2 → waiting
2: price 3 → waiting
```

Stack:

```text
[0,1,2]
```

Tới index 3, price 2:

```text
2 < 3
```

→ đồng hồ index 2 dừng:

```text
3 - 2 = 1
```

Pop 2.

Top mới là index 1, giá 2:

```text
2 < 2
```

false → không giảm.

Rồi push index 3.

**Câu chuyện 1 dòng**

> Stack là danh sách những index vẫn đang chờ ngày giá rơi; current thấp hơn ai thì kết thúc đồng hồ của người đó.

---

## 5. Code Skeleton Recall

```js
function solution(prices) {
  const n = prices.length
  const answer = Array(n).fill(0)
  const stack = []

  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      prices[i] < prices[stack.at(-1)]
    ) {
      const idx = stack.pop()
      answer[idx] = i - idx
    }

    stack.push(i)
  }

  while (stack.length > 0) {
    const idx = stack.pop()
    answer[idx] = n - 1 - idx
  }

  return answer
}
```

### Skeleton siêu ngắn

```js
for (let i = 0; i < n; i++) {
  while (
    stack.length &&
    arr[i] < arr[stack.at(-1)]
  ) {
    const idx = stack.pop()
    answer[idx] = i - idx
  }

  stack.push(i)
}

while (stack.length) {
  const idx = stack.pop()
  answer[idx] = n - 1 - idx
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for current index
    while current resolves stack top
        pop
        commit
    push current
```

### RESET WHEN

> Không reset stack. Stack mang unresolved state từ quá khứ sang hiện tại.

### INVALIDATES WHAT

```text
currentPrice < price[top]
```

→ top vừa gặp lần giảm đầu tiên → pop.

### COMMIT WHEN

Trong loop:

```js
answer[idx] = i - idx
```

Sau loop:

```js
answer[idx] = n - 1 - idx
```

cho index không bao giờ gặp giảm.

---

## 7. Trap dễ chết

### Trap 1 — `<=` thay vì `<`

Giá bằng nhau không phải giảm.

Đúng:

```js
prices[i] < prices[top]
```

### Trap 2 — Stack lưu value

Cần tính:

```text
i - idx
```

nên phải lưu **index**.

### Trap 3 — `if` thay vì `while`

Current có thể resolve nhiều index → phải `while`.

### Trap 4 — Quên xử lý stack còn lại

Ai còn stack thì sống tới cuối:

```js
n - 1 - idx
```

### Trap 5 — Nhầm dấu với Next Greater Element

```text
NGE → current > top
Stock drop → current < top
```

### Trap 6 — Nghĩ giảm ngay thì answer = 0

Sai.

Nếu giảm ở giây kế tiếp:

```text
answer = 1
```

vì khoảng thời gian là:

```text
j - i
```

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi index hỏi “bao lâu nữa gặp giá thấp hơn đầu tiên?” → monotonic stack.

> **Stack:** index chưa gặp giảm.

> **Pop condition:** `prices[i] < prices[top]`.

> **Commit:** `answer[idx] = i - idx`.

> **Equal không pop.**

> **Sau loop:** `answer[idx] = n - 1 - idx`.

> **Complexity:** O(N).

### Code shape

```js
for (let i = 0; i < n; i++) {
  while (
    stack.length &&
    prices[i] < prices[stack.at(-1)]
  ) {
    const idx = stack.pop()
    answer[idx] = i - idx
  }

  stack.push(i)
}

while (stack.length) {
  const idx = stack.pop()
  answer[idx] = n - 1 - idx
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Stack giữ index chưa thấy giá giảm; current thấp hơn top thì pop và chốt thời gian, ai còn lại thì sống tới hết mảng.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 16 — 큰 수 만들기 (Tạo số lớn nhất)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42883

**Pattern:** Greedy + Monotonic Stack  
**Trigger:** `xóa đúng k chữ số nhưng giữ nguyên thứ tự → muốn chữ số lớn hơn đứng càng sớm càng tốt`

---

## 1. Dịch đề tiếng Việt

Cho một số rất dài dưới dạng chuỗi `number`.

Ta phải **xóa đúng `k` chữ số** nhưng giữ nguyên thứ tự tương đối của các chữ số còn lại, sao cho số tạo thành là **lớn nhất có thể**.

Ví dụ:

```text
number = "1924"
k = 2
```

Có thể tạo:

```text
19, 12, 14, 92, 94, 24
```

Lớn nhất là:

```text
94
```

### Giới hạn

```text
2 <= number.length <= 1,000,000
1 <= k < number.length
```

N rất lớn → không được brute-force tổ hợp.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Input:

```text
number: string
k: số chữ số phải xóa
```

Output:

```text
string lớn nhất có thể sau khi xóa đúng k chữ số
```

Không được đổi thứ tự các chữ số còn lại.

**Một câu chốt**

> Muốn số lớn nhất thì ưu tiên làm cho các chữ số ở bên trái càng lớn càng tốt.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
```

Không thể generate combinations.

Cần gần:

```text
O(N)
```

---

### STEP 3 — BRUTE FORCE

Brute force là chọn `N-k` vị trí trong N vị trí.

Số khả năng:

```text
C(N, N-k)
```

không thể chạy.

---

### STEP 4 — BOTTLENECK

Nếu đang có:

```text
1 9
```

thì giữ `1` trước `9` là tệ hơn việc xóa `1` để `9` đứng sớm hơn.

Greedy rule:

> Nếu digit hiện tại lớn hơn digit cuối đã giữ, và vẫn còn quyền xóa, hãy xóa digit nhỏ hơn ở cuối.

Vì vị trí bên trái có trọng số lớn hơn rất nhiều so với vị trí bên phải.

---

### STEP 5 — STATE

```js
const stack = []
let remove = k
```

Stack giữ các digit đã chọn cho prefix tốt nhất hiện tại.

---

### STEP 6 — TRANSITION

Với mỗi digit:

```js
for (const digit of number) {
```

Trong khi:

```text
còn quyền xóa
AND stack không rỗng
AND current digit > stack top
```

thì:

```js
stack.pop()
remove--
```

Sau đó:

```js
stack.push(digit)
```

Code lõi:

```js
while (
  remove > 0 &&
  stack.length > 0 &&
  stack.at(-1) < digit
) {
  stack.pop()
  remove--
}
```

---

### STEP 7 — INVARIANT

Sau khi xử lý một prefix của `number`:

> `stack` là lựa chọn tốt nhất theo greedy cho prefix đó với số lần xóa đã dùng.

Quan trọng nhất:

```text
stack có xu hướng không tăng từ trái sang phải
```

sau khi đã pop những digit nhỏ hơn current trong phạm vi budget xóa.

---

### STEP 8 — PATTERN

**Pattern:** Greedy + Monotonic Stack

Dấu hiệu:

- xóa `k` phần tử
- vẫn giữ thứ tự tương đối
- muốn lexicographically / numerically lớn nhất
- current tốt hơn có thể “đá” một số phần tử trước đó ra
- mỗi phần tử push/pop tối đa 1 lần

Trigger sentence:

> “Xóa k để maximize sequence → current lớn hơn top thì pop trong khi còn budget.”

---

### STEP 9 — COMPLEXITY

Mỗi digit:

```text
push 1 lần
pop tối đa 1 lần
```

Time:

```text
O(N)
```

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```text
number = "1924"
k = 2
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `1` | stack=[] remove=2 | push | `[1]` | no | next | `[1]` |
| `9` | `[1]`,2 | `9>1` | pop 1, remove=1 | no | recheck | `[]` |
| `9` | `[]`,1 | push 9 | `[9]` | no | next | `[9]` |
| `2` | `[9]`,1 | `2>9` false | push 2 | no | next | `[9,2]` |
| `4` | `[9,2]`,1 | `4>2` | pop 2, remove=0 | no | push | `[9,4]` |

Final:

```text
"94"
```

---

### Dry run quan trọng: số giảm dần

```text
number = "98765"
k = 2
```

Không digit nào lớn hơn top trước đó.

Sau scan:

```text
stack = 98765
remove = 2
```

Phải xóa tiếp từ cuối:

```text
987
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng stack là dãy chữ số mày đang xây từ trái sang phải.

```text
1
```

Tới `9`:

```text
1 [9]
```

`9` lớn hơn `1`.

Nếu còn quyền xóa:

```text
đá 1 ra
```

để `9` chiếm vị trí sớm hơn:

```text
9
```

Tới `4`, top là `2`:

```text
9 2 [4]
```

`4 > 2` → pop `2`.

Kết quả:

```text
94
```

**Câu chuyện 1 dòng**

> “Digit mới mạnh hơn top thì dùng quyền xóa để đá top yếu hơn ra, cho digit mạnh đứng sớm hơn.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(number, k) {
  const stack = []
  let remove = k

  for (const digit of number) {
    while (
      remove > 0 &&
      stack.length > 0 &&
      stack.at(-1) < digit
    ) {
      stack.pop()
      remove--
    }

    stack.push(digit)
  }

  if (remove > 0) {
    stack.splice(stack.length - remove, remove)
  }

  return stack.join("")
}
```

### Bản tránh `splice`

```js
function solution(number, k) {
  const stack = []
  let remove = k

  for (const digit of number) {
    while (
      remove > 0 &&
      stack.length > 0 &&
      stack.at(-1) < digit
    ) {
      stack.pop()
      remove--
    }

    stack.push(digit)
  }

  return stack.slice(0, stack.length - remove).join("")
}
```

Nếu `remove === 0`, `slice(0, stack.length)` vẫn đúng.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for digit
    while còn quyền xóa AND top < digit
        pop
        k--
    push digit
```

### RESET WHEN

> Không reset stack.

`k/remove` chỉ giảm, không tăng lại.

### INVALIDATES WHAT

```text
top < current
```

và còn budget xóa

→ top là lựa chọn tệ hơn cho vị trí bên trái → pop.

### COMMIT WHEN

Mỗi current cuối cùng đều được:

```js
stack.push(digit)
```

Sau scan, nếu còn `remove` thì commit final bằng cách cắt đúng `remove` digit ở **cuối**.

---

## 7. Trap dễ chết

### Trap 1 — Dùng `if` thay vì `while`

Ví dụ:

```text
number = 1299
```

Một `9` có thể cần pop nhiều digit trước nó.

Phải `while`.

### Trap 2 — Quên điều kiện còn `k`

Không được xóa quá số lượng yêu cầu.

```js
remove > 0
```

phải nằm trong while.

### Trap 3 — Dùng `<=` thay vì `<`

Digit bằng nhau không cần pop.

Đúng:

```js
stack.at(-1) < digit
```

### Trap 4 — Quên case còn k sau scan

Ví dụ:

```text
98765, k=2
```

Không pop lần nào trong loop.

Phải xóa từ cuối:

```text
987
```

### Trap 5 — Sort digit

Không được sort vì phải giữ thứ tự tương đối ban đầu.

### Trap 6 — Convert sang Number

`number.length` có thể tới 1,000,000.

Phải xử lý hoàn toàn bằng string/array.

---

## 8. Recall 20 giây

> **Nhận diện:** xóa đúng k phần tử, giữ nguyên thứ tự, maximize số → greedy monotonic stack.

> **State:** `stack`, `remove`.

> **Pop condition:** `remove > 0 && stack.top < current`.

> **Action:** pop + `remove--`, rồi push current.

> **Sau loop:** còn remove → cắt từ cuối.

> **Complexity:** O(N).

### Code shape

```js
const stack = []
let remove = k

for (const digit of number) {
  while (
    remove > 0 &&
    stack.length &&
    stack.at(-1) < digit
  ) {
    stack.pop()
    remove--
  }

  stack.push(digit)
}

return stack
  .slice(0, stack.length - remove)
  .join("")
```

## 🧠 Một câu phải khắc vào đầu

> **“Current lớn hơn top và còn quyền xóa thì pop top; nếu cuối cùng vẫn còn k thì cắt đuôi.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 17 — 다리를 지나는 트럭 (Xe tải qua cầu)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42583

**Pattern:** Queue / Time Simulation  
**Trigger:** `nhiều đối tượng đi qua tài nguyên theo thứ tự + giới hạn capacity + mất cố định T giây để rời`

---

## 1. Dịch đề tiếng Việt

Có nhiều xe tải phải đi qua một cây cầu một làn theo đúng thứ tự.

Cầu có hai giới hạn:

- tối đa `bridge_length` xe cùng ở trên cầu
- tổng trọng lượng xe trên cầu không được vượt quá `weight`

Một xe mất đúng:

```text
bridge_length giây
```

tính từ lúc lên cầu đến lúc rời cầu.

Cho:

```text
bridge_length
weight
truck_weights
```

Hãy trả về **thời gian tối thiểu** để tất cả xe đi qua cầu.

Ví dụ:

```js
bridge_length = 2
weight = 10
truck_weights = [7,4,5,6]
```

Kết quả:

```text
8
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta cần mô phỏng đúng thứ tự xe.

Mỗi xe khi vào cầu sẽ có một thời điểm rời:

```text
exitTime = enterTime + bridge_length
```

### STEP 2 — BOUND

```text
bridge_length <= 10,000
truck count <= 10,000
```

Time simulation theo từng giây là đủ.

### STEP 3 — BRUTE FORCE

Có thể mô phỏng cầu bằng array độ dài `bridge_length`, mỗi giây shift một slot.

Đúng nhưng dễ tốn thao tác nếu dùng `shift()` liên tục.

### STEP 4 — BOTTLENECK

Điểm khó:

> Mỗi giây phải xử lý **xe rời cầu trước**, rồi mới xét xe mới có được vào không.

Nếu làm ngược thứ tự có thể sai capacity/weight.

### STEP 5 — STATE

```js
time
nextTruck
currentWeight
bridgeQueue
```

`bridgeQueue` lưu:

```js
{ weight, exitTime }
```

### STEP 6 — TRANSITION

Mỗi vòng:

1. tăng `time`
2. nếu xe đầu cầu có `exitTime === time` → rời cầu, trừ weight
3. nếu còn xe chờ và thêm xe đó không vượt `weight` → cho vào cầu
4. lưu `exitTime = time + bridge_length`

### STEP 7 — INVARIANT

> `currentWeight` luôn bằng tổng weight của tất cả xe hiện còn trên cầu.

Và queue cầu luôn theo thứ tự rời tăng dần.

### STEP 8 — PATTERN

**Queue simulation with timestamps**

Dấu hiệu:

- vào theo thứ tự
- tài nguyên có capacity
- item ở lại trong hệ thống đúng T đơn vị thời gian
- hỏi tổng thời gian hoàn tất

### STEP 9 — COMPLEXITY

Mỗi truck:

```text
enqueue 1 lần
dequeue 1 lần
```

Nếu dùng head pointer:

```text
O(N + total time simulation)
```

Với constraint này chạy ổn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
bridge_length = 2
weight = 10
trucks = [7,4,5,6]
```

| Time | Trước tick | Xe rời | Xe mới vào | currentWeight | Bridge sau |
|---:|---|---|---|---:|---|
| 1 | [] | none | 7 | 7 | `[7 exit@3]` |
| 2 | [7] | none | 4 không vào | 7 | `[7]` |
| 3 | [7] | 7 rời | 4 vào | 4 | `[4 exit@5]` |
| 4 | [4] | none | 5 vào | 9 | `[4,5]` |
| 5 | [4,5] | 4 rời | 6 không vào | 5 | `[5]` |
| 6 | [5] | 5 rời | 6 vào | 6 | `[6 exit@8]` |
| 7 | [6] | none | none | 6 | `[6]` |
| 8 | [6] | 6 rời | done | 0 | `[]` |

→ answer = `8`

---

## 4. Bộ phim hình ảnh

```text
TIME TICK
   ↓
TRUCK EXIT?
   ↓
REMOVE WEIGHT
   ↓
NEXT TRUCK FITS?
   ├─ YES → ENTER, set exitTime
   └─ NO  → WAIT
   ↓
NEXT SECOND
```

**Câu chuyện 1 dòng**

> “Mỗi giây dọn xe đã đến giờ xuống trước, rồi mới thử nhét xe tiếp theo lên cầu.”

---

## 5. Code Skeleton Recall

```js
function solution(bridge_length, weight, truck_weights) {
  const bridge = []
  let head = 0
  let time = 0
  let nextTruck = 0
  let currentWeight = 0

  while (
    nextTruck < truck_weights.length ||
    head < bridge.length
  ) {
    time++

    if (
      head < bridge.length &&
      bridge[head].exitTime === time
    ) {
      currentWeight -= bridge[head].weight
      head++
    }

    if (
      nextTruck < truck_weights.length &&
      currentWeight + truck_weights[nextTruck] <= weight
    ) {
      const truckWeight = truck_weights[nextTruck]

      bridge.push({
        weight: truckWeight,
        exitTime: time + bridge_length,
      })

      currentWeight += truckWeight
      nextTruck++
    }
  }

  return time
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while còn truck chờ OR còn truck trên cầu
    time++
    EXIT
    ENTER
```

### RESET WHEN

> Không reset `currentWeight`.

Nó chỉ cộng khi xe vào, trừ khi xe rời.

### INVALIDATES WHAT

Xe mới không được vào nếu:

```js
currentWeight + nextWeight > weight
```

### COMMIT WHEN

Xe rời khi:

```js
exitTime === time
```

Xe vào thì ngay lập tức:

```js
exitTime = time + bridge_length
```

---

## 7. Trap dễ chết

### Trap 1 — Cho xe vào trước khi xử lý xe rời

Sai thứ tự.

Đúng:

```text
EXIT trước → ENTER sau
```

### Trap 2 — Quên cập nhật `currentWeight`

Xe vào:

```js
currentWeight += truckWeight
```

Xe rời:

```js
currentWeight -= truckWeight
```

### Trap 3 — Nhầm thời gian rời

Nếu vào ở `time`:

```text
exitTime = time + bridge_length
```

### Trap 4 — Dùng `shift()` liên tục

Với JS nên dùng `head` pointer nếu muốn an toàn hiệu năng.

### Trap 5 — Chỉ loop tới khi hết truck chờ

Sai, vì truck cuối vẫn cần thời gian để rời cầu.

Phải loop đến khi:

```text
không còn truck chờ
AND
không còn truck trên cầu
```

### Trap 6 — Quên thứ tự xe là cố định

Không được chọn xe nhẹ hơn ở sau để nhét trước.

---

## 8. Recall 20 giây

> **Nhận diện:** queue + capacity + mỗi item ở hệ thống đúng T giây → time simulation.

> **State:** `time`, `nextTruck`, `currentWeight`, `bridgeQueue`.

> **Mỗi tick:** `time++ → EXIT → ENTER`.

> **Xe vào:** set `exitTime = time + bridge_length`.

> **Xe rời:** trừ `currentWeight`.

> **Stop:** hết truck chờ và bridge rỗng.

### Code shape

```js
while (
  nextTruck < trucks.length ||
  head < bridge.length
) {
  time++

  if (
    head < bridge.length &&
    bridge[head].exitTime === time
  ) {
    currentWeight -= bridge[head].weight
    head++
  }

  if (
    nextTruck < trucks.length &&
    currentWeight + trucks[nextTruck] <= weight
  ) {
    bridge.push({
      weight: trucks[nextTruck],
      exitTime: time + bridge_length,
    })

    currentWeight += trucks[nextTruck]
    nextTruck++
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Mỗi giây: xe đến giờ thì xuống trước, rồi mới check xe kế tiếp có đủ tải để lên không.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---
