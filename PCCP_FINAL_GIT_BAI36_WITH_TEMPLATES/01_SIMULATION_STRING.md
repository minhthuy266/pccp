# PCCP FINAL RECALL — Simulation / String / Parsing

> Array simulation, grid validation, date normalization, chunk/string parsing.

## Bài trong file

- Bài 1 — K번째수 (Số thứ K)
- Bài 3 — 공원 산책 (Đi dạo trong công viên)
- Bài 18 — 개인정보 수집 유효기간 (Thời hạn lưu trữ thông tin cá nhân)
- Bài 19 — 문자열 압축 (Nén chuỗi)

---
# Bài 1 — K번째수 (Số thứ K)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42748

## 1. Dịch đề tiếng Việt

Cho một mảng `array`.

Với mỗi lệnh `[i, j, k]`, ta thực hiện các bước sau:

1. Cắt các phần tử của `array` từ **vị trí thứ `i` đến vị trí thứ `j`**.
2. Sắp xếp đoạn vừa cắt theo thứ tự tăng dần.
3. Lấy **phần tử thứ `k`** trong mảng sau khi sắp xếp.

Ví dụ:

```text
array = [1, 5, 2, 6, 3, 7, 4]
i = 2
j = 5
k = 3
```

### Bước 1 — Cắt từ vị trí thứ 2 đến vị trí thứ 5

```text
[1, 5, 2, 6, 3, 7, 4]
    └─────────┘
      5 2 6 3
```

Ta được:

```text
[5, 2, 6, 3]
```

### Bước 2 — Sắp xếp tăng dần

```text
[2, 3, 5, 6]
```

### Bước 3 — Lấy số thứ 3

```text
[2, 3, 5, 6]
       ↑
       5
```

Kết quả là `5`.

---

Cho:

- mảng `array`
- mảng hai chiều `commands`, trong đó mỗi phần tử có dạng `[i, j, k]`

Hãy thực hiện thao tác trên với **tất cả các command** và trả về một mảng chứa các kết quả.

### Giới hạn

- Độ dài `array`: từ `1` đến `100`.
- Mỗi phần tử của `array`: từ `1` đến `100`.
- Độ dài `commands`: từ `1` đến `50`.
- Mỗi phần tử của `commands` luôn có đúng `3` số.

### Ví dụ

```text
array = [1, 5, 2, 6, 3, 7, 4]

commands = [
  [2, 5, 3],
  [4, 4, 1],
  [1, 7, 3]
]
```

Kết quả:

```text
[5, 6, 3]
```

Giải thích:

```text
[2, 5, 3]
array[2..5] = [5, 2, 6, 3]
sort          = [2, 3, 5, 6]
k = 3         → 5
```

```text
[4, 4, 1]
array[4..4] = [6]
sort          = [6]
k = 1         → 6
```

```text
[1, 7, 3]
array[1..7] = [1, 5, 2, 6, 3, 7, 4]
sort          = [1, 2, 3, 4, 5, 6, 7]
k = 3         → 3
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
array
commands = [
  [i, j, k],
  ...
]
```

Mỗi command yêu cầu:

```text
CUT i → j
SORT
PICK k
```

**Output**

Một mảng gồm kết quả của từng command theo đúng thứ tự.

Ví dụ:

```text
commands[0] → 5
commands[1] → 6
commands[2] → 3

answer = [5, 6, 3]
```

**Một câu chốt**

> Với mỗi `[i, j, k]`, cắt `array` từ vị trí `i` đến `j`, sort tăng dần, rồi lấy phần tử thứ `k`.

---

### STEP 2 — BOUND

```text
array.length <= 100
commands.length <= 50
```

Mỗi command chỉ xử lý tối đa `100` phần tử.

Nếu đoạn cắt dài `m`:

```text
slice  = O(m)
sort   = O(m log m)
pick   = O(1)
```

Tối đa:

```text
50 × 100 log 100
```

Rất nhỏ.

Vì vậy không cần tối ưu phức tạp.

> Constraint nhỏ → cứ `slice + sort + index`.

---

### STEP 3 — BRUTE FORCE

Cách nghĩ tự nhiên nhất chính là lời đề:

Với từng command:

```text
1. đọc i, j, k
2. cắt array từ i đến j
3. sort đoạn cắt
4. lấy số thứ k
5. push vào answer
```

Pseudo:

```text
for each command:
    subArray = cut(array, i, j)
    sort(subArray)
    answer.push(subArray[k])
```

Ý tưởng hoàn toàn đúng.

Vấn đề duy nhất cần xử lý cẩn thận là **index**.

---

### STEP 4 — BOTTLENECK

Ở bài này không có bottleneck về hiệu năng đáng kể.

Bottleneck thật sự là **index conversion**.

Đề dùng vị trí:

```text
1, 2, 3, 4, ...
```

JavaScript dùng index:

```text
0, 1, 2, 3, ...
```

Và:

```js
array.slice(start, end)
```

sẽ lấy:

```text
start <= index < end
```

tức là **không lấy `end`**.

Do đó:

```text
đề: từ i đến j
JS : slice(i - 1, j)
```

Không phải:

```js
slice(i, j)
```

và cũng không phải:

```js
slice(i - 1, j - 1)
```

---

### STEP 5 — STATE

Mỗi command độc lập với nhau.

Ta chỉ cần state rất nhỏ:

| State | Ý nghĩa |
|---|---|
| `answer` | kết quả cuối cùng |
| `i, j, k` | command hiện tại |
| `subArray` | đoạn array sau khi cắt và sort |

**State tối thiểu**

```text
answer
current command
temporary sliced array
```

Không cần nhớ kết quả command trước.

---

### STEP 6 — TRANSITION

Một command đi qua đúng 3 transition:

```text
ORIGINAL ARRAY
      ↓
     CUT
      ↓
SUB ARRAY
      ↓
     SORT
      ↓
SORTED SUB ARRAY
      ↓
    PICK K
      ↓
    ANSWER
```

Cụ thể:

```text
[i, j, k]
    ↓
slice(i - 1, j)
    ↓
sort((a, b) => a - b)
    ↓
[k - 1]
    ↓
push vào answer
```

Hai lần đổi index:

```text
i → i - 1
k → k - 1
```

Nhưng:

```text
j giữ nguyên
```

vì `slice` loại trừ end.

Đây là điểm quan trọng nhất của bài.

---

### STEP 7 — INVARIANT

Sau khi xử lý xong command thứ `x`:

> `answer[x]` luôn là phần tử thứ `k` của đoạn `array[i..j]` sau khi đoạn đó được sort tăng dần.

Và mỗi command:

> Không được làm thay đổi `array` gốc.

`slice()` tạo mảng mới, nên sort mảng con không ảnh hưởng `array`.

Invariant hình dung:

```text
array gốc
    │
    ├── command 1 → copy → sort
    ├── command 2 → copy → sort
    └── command 3 → copy → sort

array gốc KHÔNG ĐỔI
```

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Array transformation / Simulation
```

Hay nhận diện đơn giản hơn:

> “Mỗi query / command độc lập → làm đúng tuần tự thao tác đề mô tả.”

Dấu hiệu:

- Có nhiều `commands`.
- Mỗi command độc lập.
- Mỗi command yêu cầu transform một đoạn array.
- Constraint nhỏ.
- Không có dependency giữa các query.

**Trigger sentence**

> “Mỗi `[i, j, k]` đều độc lập → loop commands → slice → sort → pick.”

Code shape phải bật ra ngay:

```js
commands.map(([i, j, k]) => {
  return array
    .slice(i - 1, j)
    .sort((a, b) => a - b)[k - 1]
})
```

---

### STEP 9 — COMPLEXITY

Gọi:

```text
C = số commands
N = array.length
```

Mỗi command có thể sort tối đa `N` phần tử:

```text
O(N log N)
```

Tổng:

```text
O(C × N log N)
```

Với constraint:

```text
C <= 50
N <= 100
```

hoàn toàn an toàn.

Space:

```text
O(N)
```

cho mảng tạm được tạo bởi `slice`.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Dữ liệu:

```text
array = [1, 5, 2, 6, 3, 7, 4]

commands = [
  [2, 5, 3],
  [4, 4, 1],
  [1, 7, 3]
]
```

| Unit | State trước | Action (input / choice) | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `[2,5,3]` | `answer=[]` | cắt vị trí 2→5 | `slice(1,5)` → `[5,2,6,3]` → sort → `[2,3,5,6]` | lấy `[k-1]=[2]` → `5` | command tiếp | `answer=[5]` |
| `[4,4,1]` | `answer=[5]` | cắt vị trí 4→4 | `slice(3,4)` → `[6]` → sort → `[6]` | lấy `[0]` → `6` | command tiếp | `answer=[5,6]` |
| `[1,7,3]` | `answer=[5,6]` | cắt vị trí 1→7 | `slice(0,7)` → toàn bộ array → sort → `[1,2,3,4,5,6,7]` | lấy `[2]` → `3` | hết | `answer=[5,6,3]` |

Điểm cần nhìn:

```text
Unit       = một command
Transition = slice → sort
Commit     = sorted[k - 1]
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Command đi vào

```text
COMMAND
[2, 5, 3]

 i  j  k
 │  │  │
 │  │  └── lấy số thứ 3
 │  └───── đến vị trí 5
 └──────── từ vị trí 2
```

---

### Frame 2 — Đặt số thứ tự theo kiểu đề

```text
Vị trí:    1   2   3   4   5   6   7
            ↓   ↓   ↓   ↓   ↓   ↓   ↓
array =    [1,  5,  2,  6,  3,  7,  4]
                └────────────┘
                     CUT
```

Ta muốn:

```text
[5, 2, 6, 3]
```

---

### Frame 3 — Đổi sang index JavaScript

```text
Vị trí đề:  1   2   3   4   5   6   7
JS index:   0   1   2   3   4   5   6

array =    [1,  5,  2,  6,  3,  7,  4]
                ↑               ↑
             start=1          end=5
```

Do `slice` không lấy end:

```js
array.slice(1, 5)
```

cho:

```text
index:
1 2 3 4

[5,2,6,3]
```

### Hình phải nhớ

```text
DE BAI:  i -------- j
JS:    i-1 -------- j
       ^             ^
     INCLUDED      EXCLUDED
```

---

### Frame 4 — Sort

```text
CUT

[5, 2, 6, 3]

       ↓ sort

[2, 3, 5, 6]
```

---

### Frame 5 — Chọn số thứ K

Đề nói:

```text
k = 3
```

Nhưng JS index:

```text
k - 1 = 2
```

```text
Vị trí:    1   2   3   4
JS index:  0   1   2   3

           [2,  3,  5,  6]
                    ↑
                  answer
```

```text
answer = 5
```

---

### Frame 6 — Bộ phim hoàn chỉnh

```text
[2, 5, 3]
     │
     ▼
array.slice(2 - 1, 5)

[5, 2, 6, 3]
     │
     ▼
sort

[2, 3, 5, 6]
     │
     ▼[k - 1] = [2]

5
     │
     ▼
answer.push(5)
```

**Câu chuyện 1 dòng**

> “Command vào → `i-1` để mở cửa trái → `j` giữ nguyên vì slice tự chặn bên phải → sort → `k-1` để lấy đúng số thứ K.”

---

## 5. Code Skeleton Recall

### Cách viết dễ nhớ nhất

```js
function solution(array, commands) {
  const answer = []

  for (const [i, j, k] of commands) {
    const sorted = array
      .slice(i - 1, j)
      .sort((a, b) => a - b)

    answer.push(sorted[k - 1])
  }

  return answer
}
```

### Bản `map`

```js
function solution(array, commands) {
  return commands.map(([i, j, k]) => {
    return array
      .slice(i - 1, j)
      .sort((a, b) => a - b)[k - 1]
  })
}
```

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Loop ngoài duy nhất: mỗi lần xử lý **1 command**.

```text
commands
   ↓
[i,j,k]
```

---

**RESET WHEN**

> `subArray` reset / tạo mới ở **mỗi command**.

Không reuse mảng đã sort của command trước.

---

**INVALIDATES WHAT**

> Sai index sẽ invalidate toàn bộ kết quả.

Đặc biệt:

```text
i phải -1
k phải -1
j KHÔNG -1
```

---

**COMMIT WHEN**

> Chỉ push answer **sau khi đoạn đã được sort xong**.

```text
CUT
 ↓
SORT
 ↓
PICK
 ↓
COMMIT
```

---

## 7. Trap dễ chết

### Trap 1 — Quên đổi `i` từ 1-based sang 0-based

Sai:

```js
array.slice(i, j)
```

Đúng:

```js
array.slice(i - 1, j)
```

---

### Trap 2 — Trừ cả `j`

Sai:

```js
array.slice(i - 1, j - 1)
```

Vì `slice` vốn đã không lấy end.

Đúng:

```js
array.slice(i - 1, j)
```

---

### Trap 3 — Quên `k - 1`

Đề nói:

```text
số thứ 3
```

JS phải lấy:

```js
sorted[2]
```

Không phải:

```js
sorted[3]
```

---

### Trap 4 — Sort number nhưng quên comparator

Sai nguy hiểm:

```js
arr.sort()
```

JavaScript mặc định sort theo chuỗi.

Ví dụ:

```text
[2, 10, 3]
```

có thể thành:

```text
[10, 2, 3]
```

Đúng:

```js
arr.sort((a, b) => a - b)
```

---

### Trap 5 — Dùng `splice` làm thay đổi array gốc

`splice()` mutate array.

Không cần dùng.

Ở đây:

```js
slice()
```

an toàn hơn vì tạo mảng mới.

---

## 8. Recall 20 giây

> **Nhận diện:** nhiều command độc lập, mỗi command bảo cắt → sort → lấy.

> **State:** `answer`, `[i,j,k]`, mảng con tạm.

> **Transition:** `slice(i-1,j) → sort → [k-1]`.

> **Invariant:** mỗi `answer[x]` là số thứ `k` của đoạn tương ứng sau sort; array gốc không đổi.

> **Code shape:**

```js
commands.map(([i,j,k]) =>
  array
    .slice(i - 1, j)
    .sort((a,b) => a-b)[k - 1]
)
```

### Hình chốt cuối

```text
[i, j, k]

      CUT
 i-1 ───── j
      ↓
    SORT
      ↓
   PICK k-1
      ↓
   ANSWER
```
---

---

# Bài 3 — 공원 산책 (Đi dạo trong công viên)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/172928

**Pattern:** Grid Simulation / Command Validation  
**Trigger:** `route → thử từng bước → có 1 bước invalid thì huỷ cả route`

## 1. Dịch đề tiếng Việt

Trong một công viên hình chữ nhật dạng lưới:

- `O`: ô có thể đi qua.
- `X`: chướng ngại vật.
- `S`: vị trí bắt đầu của chó robot.

Robot thực hiện các lệnh trong `routes` theo thứ tự. Mỗi lệnh có dạng `"hướng khoảng_cách"`, ví dụ `"E 5"` nghĩa là muốn đi 5 ô về phía Đông.

Trước khi thực hiện một lệnh, phải kiểm tra **toàn bộ đường đi**:

1. Có bước nào ra ngoài công viên không?
2. Có bước nào đi qua `X` không?

Nếu chỉ cần **một bước** vi phạm, bỏ **toàn bộ lệnh hiện tại** và chuyển sang lệnh tiếp theo.

Nếu công viên có chiều cao `H`, chiều rộng `W`:

```text
trên-trái   = (0, 0)
dưới-phải   = (H - 1, W - 1)
```

Tọa độ trả về theo thứ tự:

```text
[row, col]
= [vertical, horizontal]
```

Hướng di chuyển:

```text
N → row - 1
S → row + 1
W → col - 1
E → col + 1
```

### Giới hạn

```text
3 <= H <= 50
3 <= W <= 50
1 <= routes.length <= 50
1 <= distance <= 9
```

Chỉ có đúng một `S`.

### Ví dụ trọng tâm

```js
park = [
  "SOO",
  "OXX",
  "OOO"
]

routes = ["E 2", "S 2", "W 1"]
```

- `E 2`: `[0,0] → [0,1] → [0,2]`, hợp lệ → commit `[0,2]`.
- `S 2`: bước đầu tới `[1,2] = X` → huỷ **cả lệnh**, vẫn ở `[0,2]`.
- `W 1`: `[0,2] → [0,1]` → commit.

Kết quả:

```text
[0,1]
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
park   = grid
routes = danh sách command
```

Một route như `"E 2"` gồm:

```text
direction = E
distance  = 2
```

**Output**

```text
[row cuối, col cuối]
```

**Điều kiện bắt buộc**

Một route chỉ được thực hiện nếu **mọi bước** đều:

```text
inside grid
AND
không phải X
```

**Một câu chốt**

> Với mỗi route, copy vị trí hiện tại sang tọa độ tạm, thử đi từng bước; chỉ khi **toàn bộ route hợp lệ** mới commit vào vị trí thật.

---

### STEP 2 — BOUND

```text
H, W <= 50
routes <= 50
distance <= 9
```

Tối đa chỉ khoảng:

```text
50 × 9 = 450 bước di chuyển
```

Cực nhỏ.

Không cần BFS/DFS, vì đề **đã cho sẵn đường đi**. Chỉ cần simulation.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên nhất chính là lời giải chuẩn:

```text
1. tìm S
2. for từng route
3. parse hướng + số bước
4. copy current → temp
5. đi temp từng bước
6. mỗi bước check bounds + X
7. có lỗi → huỷ route
8. không lỗi → current = temp
```

Pseudo:

```text
find start

for route:
    parse op, distance
    temp = current
    valid = true

    repeat distance times:
        temp += direction
        if outside or X:
            valid = false
            break

    if valid:
        current = temp
```

---

### STEP 4 — BOTTLENECK

Không có bottleneck hiệu năng. Bottleneck là **rollback logic**.

Sai dễ gặp:

```text
update row/col thật ngay từng bước
```

Nếu command đi được 2 bước nhưng bước 3 gặp `X`, đề yêu cầu robot **quay về vị trí trước command**. Vì vậy phải tách:

```text
CURRENT = vị trí thật
TEMP    = vị trí thử
```

Mental model:

```text
CURRENT
   │ copy
   ▼
 TEMP ── thử đi từng bước
   │
   ├─ có lỗi → discard TEMP
   │
   └─ all pass → CURRENT = TEMP
```

---

### STEP 5 — STATE

| State | Ý nghĩa |
|---|---|
| `row`, `col` | vị trí thật hiện tại |
| `nextRow`, `nextCol` | vị trí tạm để thử route |
| `valid` | route hiện tại có hợp lệ không |
| `directions` | vector N/S/W/E |

Direction map:

```js
const directions = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
}
```

**State tối thiểu**

```text
current position
+ temporary position
+ valid flag
```

---

### STEP 6 — TRANSITION

Ví dụ route:

```text
"E 2"
```

Parse:

```js
const [op, distanceText] = route.split(" ")
const distance = Number(distanceText)
const [dr, dc] = directions[op]
```

Transition:

```text
copy row,col → nextRow,nextCol

for mỗi step:
    nextRow += dr
    nextCol += dc

    if out of bounds:
        invalid
        break

    if park[nextRow][nextCol] === "X":
        invalid
        break

if valid:
    row = nextRow
    col = nextCol
```

Bounds hợp lệ:

```text
0 <= row < H
0 <= col < W
```

Invalid nếu:

```js
nextRow < 0 ||
nextRow >= H ||
nextCol < 0 ||
nextCol >= W
```

---

### STEP 7 — INVARIANT

Invariant quan trọng nhất:

> `row, col` luôn là vị trí sau command **hợp lệ hoàn chỉnh gần nhất**.

Trong lúc đang test route:

```text
row,col KHÔNG ĐỔI
```

Chỉ `nextRow,nextCol` được mutate.

Do đó nếu route fail, chỉ cần bỏ temp; state thật vẫn đúng.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Grid Simulation
+
TRY → VALIDATE → COMMIT
```

Dấu hiệu nhận diện:

- grid nhỏ;
- có vị trí hiện tại;
- có danh sách command;
- mỗi command gồm nhiều bước;
- chỉ cần một bước fail thì huỷ cả command;
- không cần tự tìm đường tối ưu.

**Trigger sentence**

> “Command nhiều bước, all-or-nothing → copy state → thử từng bước → all valid mới commit.”

Phân biệt cực quan trọng:

```text
ĐỀ CHO COMMAND → SIMULATION
ĐỀ BẢO TỰ TÌM PATH → BFS/DFS
```

---

### STEP 9 — COMPLEXITY

Gọi:

```text
H = số hàng
W = số cột
R = số routes
D = distance tối đa
```

Tìm `S`:

```text
O(H × W)
```

Xử lý routes:

```text
O(R × D)
```

Tổng:

```text
O(H × W + R × D)
```

Space phụ:

```text
O(1)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
park = [
  "SOO",
  "OXX",
  "OOO"
]

routes = ["E 2", "S 2", "W 1"]
```

Start:

```text
row = 0
col = 0
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `E 2` | `[0,0]` | copy temp | `[0,1]` OK → `[0,2]` OK | YES, commit | route tiếp | `[0,2]` |
| `S 2` | `[0,2]` | copy temp | bước 1 → `[1,2] = X` | NO, discard | route tiếp | `[0,2]` |
| `W 1` | `[0,2]` | copy temp | `[0,1]` OK | YES, commit | hết | `[0,1]` |

Điểm phải nhìn ra:

```text
UNIT       = một route
STATE      = current + temp + valid
TRANSITION = temp đi từng bước
INVALIDATE = outside hoặc X
COMMIT     = chỉ khi ALL steps pass
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Vị trí thật

```text
REAL = [0,0]
```

### Frame 2 — Route đi vào

```text
"E 2"
  ↓
E = [0,+1]
distance = 2
```

### Frame 3 — Copy

```text
REAL [0,0]
   │ copy
   ▼
TEMP [0,0]
```

REAL đứng yên; TEMP đi thử.

### Frame 4 — TEMP đi từng bước

```text
[0,0]
   ↓ E
[0,1]  OK
   ↓ E
[0,2]  OK
```

Mỗi ô mới đều check:

```text
BOUND?
X?
```

### Frame 5 — Commit

```text
TEMP = [0,2]
all valid
   ↓
REAL = [0,2]
```

### Frame 6 — Route lỗi

```text
S 2

REAL = [0,2]
TEMP = [0,2]

TEMP ↓
[1,2] = X
```

```text
INVALID
→ discard TEMP
→ REAL vẫn [0,2]
```

**Câu chuyện 1 dòng**

> “Cho bản sao đi thử trước; đi hết đường an toàn thì robot thật mới đi theo, gặp biên hoặc X thì xé cả lệnh.”

---

## 5. Code Skeleton Recall

```js
function solution(park, routes) {
  const H = park.length
  const W = park[0].length

  let row = 0
  let col = 0

  // 1. Find start
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (park[r][c] === "S") {
        row = r
        col = c
      }
    }
  }

  // 2. Direction map
  const directions = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
  }

  // 3. Process commands
  for (const route of routes) {
    const [op, distanceText] = route.split(" ")
    const distance = Number(distanceText)
    const [dr, dc] = directions[op]

    let nextRow = row
    let nextCol = col
    let valid = true

    // 4. Try every step
    for (let step = 0; step < distance; step++) {
      nextRow += dr
      nextCol += dc

      const outOfBounds =
        nextRow < 0 ||
        nextRow >= H ||
        nextCol < 0 ||
        nextCol >= W

      if (outOfBounds) {
        valid = false
        break
      }

      if (park[nextRow][nextCol] === "X") {
        valid = false
        break
      }
    }

    // 5. Commit only if whole route passed
    if (valid) {
      row = nextRow
      col = nextCol
    }
  }

  return [row, col]
}
```

### Skeleton siêu ngắn

```js
for (const route of routes) {
  parse route

  let nr = row
  let nc = col
  let valid = true

  for (let i = 0; i < distance; i++) {
    nr += dr
    nc += dc

    if (outside || park[nr][nc] === "X") {
      valid = false
      break
    }
  }

  if (valid) {
    row = nr
    col = nc
  }
}
```

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Loop ngoài = từng route. Loop trong = từng step của route.

```text
find S

for route:
    for step:
        validate
```

**RESET WHEN**

> Reset temp + `valid` ở đầu **mỗi route**.

```js
let nextRow = row
let nextCol = col
let valid = true
```

**INVALIDATES WHAT**

> Một step `out of bounds` hoặc `X` → invalidate **toàn bộ route**.

```js
valid = false
break
```

**COMMIT WHEN**

> Chỉ commit sau khi **toàn bộ distance bước đều pass**.

```js
if (valid) {
  row = nextRow
  col = nextCol
}
```

Câu chốt:

```text
TRY FIRST
COMMIT LAST
```

---

## 7. Trap dễ chết

### Trap 1 — Update vị trí thật từng bước

Sai:

```js
row += dr
col += dc
```

ngay trong loop thử route.

Nếu step sau fail thì không rollback được.

Đúng: mutate `nextRow,nextCol`, cuối route mới commit.

---

### Trap 2 — Chỉ check ô đích

Sai:

```js
const nr = row + dr * distance
const nc = col + dc * distance
```

rồi chỉ check destination.

Giữa đường có thể có `X`.

> Phải **CHECK EVERY STEP**.

---

### Trap 3 — Đảo row / col

Nhớ:

```text
park[row][col]
return [row, col]
```

```text
N = [-1, 0]
S = [+1, 0]
W = [0, -1]
E = [0, +1]
```

---

### Trap 4 — Bounds dùng `>` thay vì `>=`

Nếu `H = 3`, row hợp lệ chỉ là:

```text
0,1,2
```

Nên:

```js
nextRow >= H
nextCol >= W
```

là out.

---

### Trap 5 — Đọc grid trước khi chắc chắn còn trong bounds

Ưu tiên:

```text
check bounds
↓
check X
```

để logic rõ và an toàn.

---

### Trap 6 — Quên `Number(distance)`

`split(" ")` trả string.

```js
const distance = Number(distanceText)
```

Viết rõ, đừng dựa vào coercion.

---

### Trap 7 — Thấy grid là nghĩ BFS

Không.

```text
Có route cho sẵn → Simulation
Tự tìm đường → BFS/DFS
```

---

## 8. Recall 20 giây

> **Nhận diện:** Grid + command nhiều bước + 1 bước sai huỷ cả command → Simulation / TRY-VALIDATE-COMMIT.

> **State:** `row,col` thật + `nextRow,nextCol` tạm + `valid`.

> **Direction:** `N[-1,0] S[1,0] W[0,-1] E[0,1]`.

> **Transition:** copy current → temp → đi từng step → mỗi step check bounds + `X`.

> **Invalidation:** một step out hoặc `X` → `valid=false`, break, current giữ nguyên.

> **Invariant:** `row,col` không bao giờ chứa movement chưa validate xong.

> **Commit:**

```js
if (valid) {
  row = nextRow
  col = nextCol
}
```

> **Complexity:** `O(H×W + routes×distance)`.

### Code shape

```js
for (const route of routes) {
  const [op, n] = route.split(" ")
  const [dr, dc] = directions[op]

  let nr = row
  let nc = col
  let valid = true

  for (let i = 0; i < Number(n); i++) {
    nr += dr
    nc += dc

    if (
      nr < 0 || nr >= H ||
      nc < 0 || nc >= W ||
      park[nr][nc] === "X"
    ) {
      valid = false
      break
    }
  }

  if (valid) {
    row = nr
    col = nc
  }
}
```

### Hình chốt cuối

```text
             ROUTE
               ↓
       COPY REAL → TEMP
               ↓
        WALK ONE STEP
               ↓
      OUTSIDE or X ?
         ↙       ↘
       YES       NO
        ↓         ↓
     CANCEL    more steps?
                  ↓
              all passed
                  ↓
                COMMIT
```

## 🧠 Một câu phải khắc vào đầu

> **“Route là transaction: COPY → TRY → ALL PASS mới COMMIT.”**

[⬆ Quay lại Navigator](#-navigator--mobile-first)



---

---

# Bài 18 — 개인정보 수집 유효기간 (Thời hạn lưu trữ thông tin cá nhân)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/150370

**Pattern:** Date Parsing + Hash Map + Normalization  
**Trigger:** `mọi tháng = 28 ngày → đổi ngày thành một số duy nhất rồi so sánh`

---

## 1. Dịch đề tiếng Việt

Có nhiều thông tin cá nhân được thu thập theo các loại điều khoản khác nhau. Mỗi loại điều khoản có thời hạn lưu trữ tính theo tháng.

Nếu thông tin đã **hết hạn trước hôm nay**, nó phải bị hủy.

Ví dụ, điều khoản A có thời hạn 12 tháng. Thông tin được thu thập ngày:

```text
2021.01.05
```

thì được lưu đến hết:

```text
2022.01.04
```

và từ:

```text
2022.01.05
```

phải hủy.

Đề cho một giả định cực quan trọng:

> **Mọi tháng đều có đúng 28 ngày.**

Cho:

- `today`: ngày hôm nay
- `terms`: loại điều khoản và số tháng hiệu lực
- `privacies`: ngày thu thập + loại điều khoản

Hãy return các số thứ tự của thông tin phải hủy, theo thứ tự tăng dần.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với mỗi privacy:

```text
expiryStart = collectedDate + termMonths
```

Nếu:

```text
today >= expiryStart
```

thì đã đến ngày phải hủy.

**Một câu chốt**

> Không tính “ngày cuối còn được giữ”; tính thẳng **ngày bắt đầu hết hạn** rồi so `today >= expiry`.

---

### STEP 2 — BOUND

```text
terms <= 20
privacies <= 100
```

Rất nhỏ.

Vấn đề không phải performance mà là **date arithmetic không được sai**.

---

### STEP 3 — BRUTE FORCE

Có thể cộng tháng thủ công:

- tăng month
- carry year
- trừ 1 ngày để tìm ngày cuối

Nhưng cực dễ lỗi.

Đề đã cố tình cho:

```text
mọi tháng = 28 ngày
```

để tránh lịch thật.

---

### STEP 4 — BOTTLENECK

Hãy biến:

```text
YYYY.MM.DD
```

thành một số ngày tuyệt đối:

```js
totalDays = year * 12 * 28 + month * 28 + day
```

Hoặc dùng `(month - 1)` cũng được miễn nhất quán.

Khi đó:

```text
+ X tháng
```

chỉ là:

```text
+ X * 28
```

Không còn xử lý year/month/day riêng.

---

### STEP 5 — STATE

Cần:

```js
termsMap
todayDays
answer
```

`termsMap`:

```text
A -> 6
B -> 12
C -> 3
```

---

### STEP 6 — TRANSITION

Parse terms:

```js
const termMap = new Map()

for (const term of terms) {
  const [type, months] = term.split(" ")
  termMap.set(type, Number(months))
}
```

Helper:

```js
const toDays = (date) => {
  const [y, m, d] = date.split(".").map(Number)
  return y * 12 * 28 + m * 28 + d
}
```

Với mỗi privacy:

```js
const [date, type] = privacy.split(" ")
const expiry = toDays(date) + termMap.get(type) * 28
```

Nếu:

```js
todayDays >= expiry
```

→ push index + 1.

---

### STEP 7 — INVARIANT

Với mọi ngày:

```text
date A < date B
```

thì:

```text
toDays(A) < toDays(B)
```

Do mọi tháng đều cùng 28 ngày, phép ánh xạ bảo toàn thứ tự thời gian.

---

### STEP 8 — PATTERN

**Pattern:** Parsing + normalization.

Dấu hiệu:

- input là string có format cố định
- cần compare / arithmetic nhiều lần
- có quy tắc đơn giản hóa domain
- tốt nhất convert representation trước

Mental model:

```text
DATE STRING
   ↓
TOTAL DAYS
   ↓
+ termMonths * 28
   ↓
COMPARE WITH TODAY
```

---

### STEP 9 — COMPLEXITY

```text
O(T + P)
```

với `T = terms.length`, `P = privacies.length`.

Space:

```text
O(T)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
today = "2022.05.19"
terms = ["A 6", "B 12", "C 3"]
privacy = "2022.02.19 C"
```

```text
collected = toDays(2022.02.19)
expiry = collected + 3*28
```

Vì 3 tháng sau là:

```text
2022.05.19
```

Và rule là:

```text
today >= expiry
```

nên privacy này **phải hủy hôm nay**.

Đó chính là lý do ví dụ #3 bị hủy.

---

## 4. Bộ phim hình ảnh

Đừng tưởng tượng lịch.

Hãy tưởng tượng mọi ngày nằm trên một **number line**.

```text
2022.02.19
    ↓
  TOTAL DAYS
    ↓
+ 3 * 28
    ↓
EXPIRY DAY = 2022.05.19
    ↓
TODAY >= EXPIRY ?
    ↓ YES
DESTROY
```

---

## 5. Code Skeleton Recall

```js
function solution(today, terms, privacies) {
  const toDays = (date) => {
    const [year, month, day] = date.split(".").map(Number)
    return year * 12 * 28 + month * 28 + day
  }

  const termMap = new Map()

  for (const term of terms) {
    const [type, months] = term.split(" ")
    termMap.set(type, Number(months))
  }

  const todayDays = toDays(today)
  const answer = []

  for (let i = 0; i < privacies.length; i++) {
    const [date, type] = privacies[i].split(" ")

    const expiry =
      toDays(date) +
      termMap.get(type) * 28

    if (todayDays >= expiry) {
      answer.push(i + 1)
    }
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
1 loop build termMap
1 loop scan privacies
```

### RESET WHEN

Không có state phức tạp để reset.

Mỗi privacy parse độc lập.

### INVALIDATES WHAT

Privacy hết hạn khi:

```js
todayDays >= expiry
```

### COMMIT WHEN

Ngay khi privacy hết hạn:

```js
answer.push(i + 1)
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng `>` thay vì `>=`

Nếu hôm nay đúng bằng ngày bắt đầu hết hạn:

```text
phải hủy ngay hôm nay
```

Đúng:

```js
todayDays >= expiry
```

---

### Trap 2 — Trừ 1 ngày rồi lại so sai

Có 2 cách:

**Cách A — nên nhớ:**

```text
expiryStart = collected + months*28
today >= expiryStart → destroy
```

**Cách B:**

```text
lastValid = collected + months*28 - 1
today > lastValid → destroy
```

Hai cách tương đương.

Nhưng đừng trộn chúng.

---

### Trap 3 — Dùng Date của JavaScript

Không nên.

Đề dùng lịch giả:

```text
mọi tháng 28 ngày
```

JS `Date` dùng lịch thật → vừa thừa vừa dễ sai.

---

### Trap 4 — Quên `Number()`

`split()` trả string.

```js
Number(months)
```

và:

```js
.map(Number)
```

---

### Trap 5 — Index output bắt đầu từ 1

Privacy `i` phải push:

```js
i + 1
```

---

## 8. Recall 20 giây

> **Nhận diện:** date string + mọi tháng 28 ngày → normalize thành total days.

> **Map:** `type → months`.

> **Date:** `year * 12 * 28 + month * 28 + day`.

> **Expiry:** `collectedDays + months * 28`.

> **Destroy:** `todayDays >= expiry`.

> **Output:** `i + 1`.

### Code shape

```js
const toDays = (date) => {
  const [y, m, d] = date.split(".").map(Number)
  return y * 12 * 28 + m * 28 + d
}

const termMap = new Map()

for (const term of terms) {
  const [type, months] = term.split(" ")
  termMap.set(type, Number(months))
}

for (let i = 0; i < privacies.length; i++) {
  const [date, type] = privacies[i].split(" ")

  const expiry =
    toDays(date) +
    termMap.get(type) * 28

  if (todayDays >= expiry) {
    answer.push(i + 1)
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Lịch giả 28 ngày/tháng → đừng cộng tháng thủ công; đổi tất cả thành totalDays rồi so `today >= collected + term*28`.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 19 — 문자열 압축 (Nén chuỗi)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/60057

**Pattern:** Brute Force over Chunk Size + String Parsing / Simulation  
**Trigger:** `n nhỏ + thử mọi độ dài block + chỉ nén các block giống nhau liên tiếp`

---

## 1. Dịch đề tiếng Việt

Ta muốn nén một chuỗi bằng cách gom các đoạn giống nhau **liên tiếp**.

Ví dụ:

```text
aabbaccc
```

nếu cắt theo đơn vị 1 ký tự:

```text
aa bb a ccc
```

sẽ nén thành:

```text
2a2ba3c
```

Nếu một block chỉ xuất hiện 1 lần thì **không ghi số 1**.

Điểm đặc biệt của bài:

> Không nhất thiết phải cắt theo 1 ký tự.

Ta được chọn một `unit >= 1`, rồi cắt chuỗi từ **đầu chuỗi** thành các block có độ dài `unit`.

Ví dụ:

```text
ababcdcdababcdcd
```

Nếu `unit = 8`:

```text
ababcdcd | ababcdcd
```

→

```text
2ababcdcd
```

là ngắn nhất.

Nếu phần cuối không đủ `unit` ký tự thì giữ nguyên phần dư.

Mục tiêu:

> thử mọi `unit` hợp lệ và return độ dài compressed nhỏ nhất.

### Giới hạn

```text
1 <= s.length <= 1000
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với một `unit` cố định:

1. chia chuỗi từ trái sang phải thành các block độ dài `unit`
2. chỉ các block **kề nhau giống hệt nhau** mới được gộp
3. nếu repeat count > 1:
   ```text
   length contribution = số chữ số của count + unit
   ```
4. nếu count = 1:
   ```text
   length contribution = block.length
   ```
5. phần dư cuối cứ cộng nguyên trạng

Sau đó lấy min qua mọi `unit`.

---

### STEP 2 — BOUND

```text
n <= 1000
```

Ta có thể thử:

```text
unit = 1 ... floor(n / 2)
```

Vì nếu:

```text
unit > n/2
```

thì không thể có hai full block cùng độ dài để repeat.

Trường hợp `n = 1`:

```text
answer = 1
```

---

### STEP 3 — BRUTE FORCE

Đây chính là brute force đúng:

```text
for every possible unit
    simulate compression
```

Không cần “tối ưu” bằng sliding window hay KMP.

Vì constraint nhỏ.

---

### STEP 4 — BOTTLENECK

Điểm khó không phải chọn unit.

Điểm dễ bug là:

> Khi block hiện tại khác block trước, phải commit group cũ **trước**, rồi reset state cho block mới.

Ta cần nhớ flow:

```text
prev block
count

next block
    same?
      count++
    different?
      commit prev
      prev = next
      count = 1
```

Sau loop:

```text
commit group cuối
```

---

### STEP 5 — STATE

Với mỗi `unit`:

```js
let prev = s.slice(0, unit)
let count = 1
let compressedLength = 0
```

Hoặc build string thật, nhưng chỉ cần độ dài thì tính length trực tiếp sẽ gọn hơn.

State:

- `prev`: block đang gom
- `count`: số lần liên tiếp của `prev`
- `compressedLength`: length đã commit

---

### STEP 6 — TRANSITION

Scan các block tiếp theo:

```js
for (let i = unit; i < s.length; i += unit) {
  const current = s.slice(i, i + unit)

  if (current === prev) {
    count++
  } else {
    compressedLength +=
      (count > 1 ? String(count).length : 0) +
      prev.length

    prev = current
    count = 1
  }
}
```

Sau loop phải commit group cuối:

```js
compressedLength +=
  (count > 1 ? String(count).length : 0) +
  prev.length
```

---

### STEP 7 — INVARIANT

Trong lúc scan một `unit`:

> `prev` là block của group hiện tại chưa commit.

> `count` là số block `prev` liên tiếp đã thấy.

> `compressedLength` chỉ chứa các group đã đóng trước đó.

---

### STEP 8 — PATTERN

**Pattern:** Brute Force on parameter + Run-Length Encoding over chunks.

Dấu hiệu:

- hỏi giá trị tốt nhất qua mọi “đơn vị cắt”
- parameter range nhỏ
- với mỗi parameter, mô phỏng tuyến tính
- cần gom các run liên tiếp giống nhau

Trigger sentence:

> “n nhỏ, unit là parameter hữu hạn → thử hết unit; bên trong chỉ RLE các chunk kề nhau.”

---

### STEP 9 — COMPLEXITY

Có khoảng:

```text
n/2
```

giá trị `unit`.

Mỗi unit scan toàn chuỗi.

Worst case:

```text
O(N²)
```

Với:

```text
N <= 1000
```

hoàn toàn ổn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```text
s = "aabbaccc"
unit = 1
```

Chunks:

```text
a a b b a c c c
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| a | prev=a,count=1 | same | count=2 | no | b | a,2 |
| b | a,2 | different | commit `2a` | +2 | reset | b,1 |
| b | b,1 | same | count=2 | no | a | b,2 |
| a | b,2 | different | commit `2b` | +2 | reset | a,1 |
| c | a,1 | different | commit `a` | +1 | reset | c,1 |
| c | c,1 | same | count=2 | no | c | c,2 |
| c | c,2 | same | count=3 | no | end | c,3 |
| end | c,3 | commit | `3c` | +2 | done | total=7 |

---

### Dry run unit = 3

```text
s = "abcabcdede"
```

Chunks:

```text
abc | abc | ded | e
```

- `abc == abc` → count 2
- `ded != abc` → commit `2abc`
- `e != ded` → commit `ded`
- end → commit `e`

Compressed:

```text
2abcdede
```

Length:

```text
8
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng chọn một cái khuôn cắt:

```text
unit = 3
```

Sau đó máy chạy từ trái sang phải:

```text
[abc] [abc] [ded] [e]
```

Hai block đầu giống nhau:

```text
2abc
```

Gặp `ded` khác:

```text
commit 2abc
reset prev = ded
```

Cuối còn:

```text
e
```

thì gắn nguyên trạng.

**Câu chuyện 1 dòng**

> “Chọn một khuôn cắt, chạy từ trái sang phải, đếm run của các block giống nhau liên tiếp, commit khi block đổi.”

---

## 5. Code Skeleton Recall

```js
function solution(s) {
  const n = s.length

  if (n === 1) return 1

  let answer = n

  for (let unit = 1; unit <= Math.floor(n / 2); unit++) {
    let prev = s.slice(0, unit)
    let count = 1
    let compressedLength = 0

    for (let i = unit; i < n; i += unit) {
      const current = s.slice(i, i + unit)

      if (current === prev) {
        count++
      } else {
        compressedLength +=
          (count > 1 ? String(count).length : 0) +
          prev.length

        prev = current
        count = 1
      }
    }

    compressedLength +=
      (count > 1 ? String(count).length : 0) +
      prev.length

    answer = Math.min(answer, compressedLength)
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for unit
    init prev/count
    for i += unit
        compare current vs prev
        same → count++
        different → commit + reset
    commit last group
    min answer
```

### RESET WHEN

Khi:

```text
current !== prev
```

thì:

```js
prev = current
count = 1
```

### INVALIDATES WHAT

Không có “invalid window”.

Điểm đổi state là:

```text
block khác prev
```

→ group hiện tại kết thúc.

### COMMIT WHEN

Có 2 nơi:

1. Khi block đổi
2. Sau inner loop để commit group cuối

---

## 7. Trap dễ chết

### Trap 1 — Quên group cuối

Inner loop chỉ commit khi gặp block khác.

Group cuối phải commit sau loop.

---

### Trap 2 — Quên phần dư cuối

Ví dụ:

```text
abcabcdede
unit = 3
```

cuối có:

```text
e
```

`s.slice(i, i + unit)` vẫn lấy được block ngắn hơn, nên nếu code theo skeleton trên thì phần dư tự được tính.

---

### Trap 3 — Ghi `1` khi count = 1

Sai.

Chỉ count > 1 mới thêm số.

```js
count > 1 ? String(count).length : 0
```

---

### Trap 4 — Chỉ cộng 1 ký tự cho count

Nếu:

```text
count = 12
```

thì prefix `"12"` có length 2.

Phải:

```js
String(count).length
```

---

### Trap 5 — Cho phép cắt lệch từ giữa

Không được.

Luôn cắt từ đầu:

```text
0, unit, 2*unit, ...
```

Ví dụ #5 nhấn mạnh điều này.

---

### Trap 6 — Thử unit tới n cũng không sai logic, nhưng thừa

Chỉ cần:

```js
unit <= Math.floor(n / 2)
```

vì unit lớn hơn không thể tạo repeat từ 2 block.

---

## 8. Recall 20 giây

> **Nhận diện:** thử mọi chunk size + compress consecutive equal chunks → brute force parameter + RLE.

> **Outer:** `unit = 1..floor(n/2)`.

> **State:** `prev`, `count`, `compressedLength`.

> **Same:** `count++`.

> **Different:** commit group cũ → `prev=current`, `count=1`.

> **Sau inner loop:** commit group cuối.

> **Count prefix:** chỉ nếu `count > 1`, length là `String(count).length`.

> **Complexity:** O(N²), N≤1000 nên ổn.

### Code shape

```js
for (let unit = 1; unit <= n / 2; unit++) {
  let prev = s.slice(0, unit)
  let count = 1
  let len = 0

  for (let i = unit; i < n; i += unit) {
    const cur = s.slice(i, i + unit)

    if (cur === prev) {
      count++
    } else {
      len +=
        (count > 1 ? String(count).length : 0) +
        prev.length

      prev = cur
      count = 1
    }
  }

  len +=
    (count > 1 ? String(count).length : 0) +
    prev.length

  answer = Math.min(answer, len)
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Thử từng unit; cùng block thì count++, khác block thì commit group cũ và reset; cuối loop nhớ commit lần cuối.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---
