# PCCP FINAL RECALL — Two Pointers / Sliding Window

> Fixed window frequency and variable window / positive target sum.

## Bài trong file

- Bài 9 — 할인 행사 (Sự kiện giảm giá)
- Bài 10 — 연속된 부분 수열의 합 (Tổng dãy con liên tiếp)

---
# Bài 9 — 할인 행사 (Sự kiện giảm giá)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/131127

**Pattern:** Fixed-size Sliding Window + Frequency Map  
**Trigger:** `10 ngày liên tiếp → mỗi start là một window cố định 10 → trượt cửa sổ`

---

## 1. Dịch đề tiếng Việt

XYZ Mart bán gói thành viên có thời hạn **10 ngày**.

Mỗi ngày, cửa hàng giảm giá đúng **một loại sản phẩm**, và trong ngày đó khách hàng chỉ được mua **một đơn vị** của sản phẩm đang giảm giá.

Jung-hyun muốn mua đúng những sản phẩm và số lượng mình cần trong **10 ngày liên tiếp** kể từ ngày đăng ký thành viên.

Cho:

```text
want
```

là danh sách sản phẩm Jung-hyun muốn mua,

```text
number
```

là số lượng tương ứng của từng sản phẩm,

và:

```text
discount
```

là sản phẩm được giảm giá ở từng ngày theo thứ tự thời gian.

Hãy đếm xem có bao nhiêu ngày có thể chọn làm ngày bắt đầu đăng ký sao cho trong đúng **10 ngày kể từ ngày đó**, toàn bộ sản phẩm giảm giá khớp đúng với danh sách và số lượng Jung-hyun muốn.

Nếu không có ngày nào hợp lệ, return:

```text
0
```

### Giới hạn

```text
1 <= want.length = number.length <= 10
1 <= number[i] <= 10
sum(number) = 10
10 <= discount.length <= 100,000
```

Do tổng `number` luôn bằng `10`, mỗi membership window luôn phải chứa đúng 10 item cần thiết.

### Ví dụ

```js
want = ["banana", "apple", "rice", "pork", "pot"]
number = [3, 2, 2, 2, 1]
```

Cần đúng:

```text
banana 3
apple  2
rice   2
pork   2
pot    1
```

Tổng:

```text
10
```

Nếu có 14 ngày discount thì các window 10 ngày có thể bắt đầu ở:

```text
day 1
day 2
day 3
day 4
day 5
```

Tức:

```text
14 - 10 + 1 = 5 windows
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
want[]
number[]
discount[]
```

**Output**

```text
số start index mà window 10 ngày có frequency đúng yêu cầu
```

**Điều kiện bắt buộc**

Một ngày bắt đầu hợp lệ nếu:

```text
discount[start ... start+9]
```

chứa đúng số lượng cần thiết của mọi sản phẩm.

Vì tổng nhu cầu là `10` và window cũng dài `10`, chỉ cần mọi sản phẩm wanted có count đúng thì toàn window là đúng.

**Một câu chốt**

> Đếm bao nhiêu window độ dài cố định `10` có bảng frequency trùng với bảng `want → number`.

---

### STEP 2 — BOUND

```text
discount.length <= 100,000
window size = 10
want.length <= 10
```

Brute force mỗi window 10 ngày thực ra vẫn:

```text
O(N × 10)
```

và có thể pass.

Nhưng pattern chuẩn cần nhận ra là:

```text
fixed sliding window
```

vì hai window liên tiếp share 9/10 phần tử.

Mục tiêu:

```text
O(N)
```

với update Map incremental.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên:

Với mỗi start:

```text
start = 0
start = 1
...
start = N - 10
```

ta build lại count của:

```text
discount[start ... start + 9]
```

rồi compare với want.

Pseudo:

```text
for every start:
    build count for 10 days
    if counts match:
        answer++
```

Complexity:

```text
O((N - 10 + 1) × 10)
```

Vì window size chỉ 10 nên cách này cũng hợp lệ.

Nhưng ta vẫn nên học sliding window vì đây là template tổng quát.

---

### STEP 4 — BOTTLENECK

Hai window liên tiếp:

```text
window 1:
[d0 d1 d2 d3 d4 d5 d6 d7 d8 d9]

window 2:
   [d1 d2 d3 d4 d5 d6 d7 d8 d9 d10]
```

Có tới 9 phần tử giống nhau.

Nếu build lại Map từ đầu, ta đang đếm lại 9 item cũ.

Chỉ có hai thay đổi:

```text
OUTGOING = d0
INCOMING = d10
```

Do đó:

```text
remove outgoing
add incoming
```

là đủ để biến frequency của window cũ thành window mới.

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `need` | Map sản phẩm → số lượng cần |
| `window` | Map sản phẩm → số lượng trong 10 ngày hiện tại |
| `answer` | số window hợp lệ |
| `start` / `right` | vị trí cửa sổ |

Window size cố định:

```text
10
```

Không cần `left` chạy bằng while như variable sliding window.

---

### STEP 6 — TRANSITION

### Phase 1 — Build need

```js
const need = new Map()

for (let i = 0; i < want.length; i++) {
  need.set(want[i], number[i])
}
```

### Phase 2 — Build first window

```text
discount[0 ... 9]
```

Mỗi item:

```js
window.set(item, (window.get(item) ?? 0) + 1)
```

Check window đầu.

### Phase 3 — Slide

Khi chuyển từ start `s` sang `s + 1`:

Outgoing:

```js
const out = discount[s]
```

giảm:

```js
window.set(out, window.get(out) - 1)
```

Nếu count về `0`, có thể delete để Map sạch:

```js
if (window.get(out) === 0) {
  window.delete(out)
}
```

Incoming:

```js
const incoming = discount[s + 10]
```

tăng:

```js
window.set(
  incoming,
  (window.get(incoming) ?? 0) + 1
)
```

Sau đó compare.

### Window count

Nếu:

```text
N = discount.length
K = 10
```

số start hợp lệ về mặt index:

```text
N - K + 1
```

start cuối:

```text
N - K
```

Do đó loop start có thể viết:

```js
for (let start = 0; start <= N - 10; start++)
```

hoặc:

```js
for (let start = 0; start < N - 10 + 1; start++)
```

Hai cách tương đương.

---

### STEP 7 — INVARIANT

Trước mỗi lần check:

> `window` luôn biểu diễn chính xác frequency của đúng 10 phần tử trong cửa sổ hiện tại.

Nếu window hiện tại là:

```text
[start ... start+9]
```

thì:

```text
window.get(x)
```

phải bằng số lần `x` xuất hiện trong chính đoạn đó.

Khi slide:

```text
remove discount[start]
add discount[start+10]
```

giữ invariant đúng cho window mới:

```text
[start+1 ... start+10]
```

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Fixed-size Sliding Window
+
Frequency Map
```

Dấu hiệu nhận diện:

- Đề nói **10 ngày liên tiếp**.
- Window length không đổi.
- Cần evaluate mọi đoạn liên tiếp cùng độ dài.
- Window tiếp theo bỏ 1 phần tử cũ và thêm 1 phần tử mới.
- Cần biết count/frequency bên trong window.

**Trigger sentence**

> “Đoạn liên tiếp độ dài cố định K → build window đầu → mỗi lần trượt remove outgoing + add incoming.”

Phân biệt:

```text
FIXED window:
không có while shrink

VARIABLE window:
expand right → while invalid thì shrink left
```

---

### STEP 9 — COMPLEXITY

Build `need`:

```text
O(W)
```

với `W <= 10`.

Build first window:

```text
O(10)
```

Slide qua `N` ngày:

```text
O(N)
```

Mỗi window compare tối đa `want.length <= 10` key:

```text
O(N × W)
```

với W ≤ 10 → thực tế tuyến tính.

Có thể ghi:

```text
O(N)
```

vì số loại wanted bị bound rất nhỏ.

Space:

```text
O(number of distinct products in one window + want)
```

tối đa rất nhỏ quanh window size.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
want   = ["banana", "apple", "rice", "pork", "pot"]
number = [3,2,2,2,1]

discount = [
  "chicken", "apple", "apple", "banana", "rice",
  "apple", "pork", "banana", "pork", "rice",
  "pot", "banana", "apple", "banana"
]
```

### Window 1 — index 0..9

Count:

```text
chicken 1
apple   3
banana  2
rice    2
pork    2
pot     0
```

Invalid.

### Slide sang window 2 — index 1..10

Remove:

```text
chicken
```

Add:

```text
pot
```

Count wanted:

```text
apple   3
banana  2
rice    2
pork    2
pot     1
```

Vẫn invalid vì apple/banana sai.

### Slide sang window 3 — index 2..11

Remove:

```text
apple
```

Add:

```text
banana
```

Count:

```text
banana 3
apple  2
rice   2
pork   2
pot    1
```

Valid → `answer++`.

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| window 0..9 | frequency đầu | compare | thiếu pot, banana thiếu | no | slide | answer=0 |
| → 1..10 | remove chicken, add pot | update Map | apple=3 banana=2 | no | slide | answer=0 |
| → 2..11 | remove apple, add banana | update Map | all counts match | `+1` | slide | answer=1 |

Các window tiếp theo:

```text
3..12 valid
4..13 valid
```

Final:

```text
answer = 3
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Một khung 10 ngày

```text
[d0 d1 d2 d3 d4 d5 d6 d7 d8 d9]
 └────────── 10 days ──────────┘
```

### Frame 2 — Khung trượt sang phải

```text
 d0 [d1 d2 d3 d4 d5 d6 d7 d8 d9 d10]
 ↑                                   ↑
 OUT                                 IN
```

### Frame 3 — Không rebuild

```text
WINDOW MAP OLD
   ↓
- outgoing
+ incoming
   ↓
WINDOW MAP NEW
```

### Frame 4 — Compare với shopping list

```text
NEED
banana 3
apple  2
rice   2
pork   2
pot    1

        VS

WINDOW
banana 3
apple  2
rice   2
pork   2
pot    1
```

Match:

```text
answer++
```

### Câu chuyện 1 dòng

> “Một khung 10 ngày trượt trên lịch; mỗi bước chỉ đá ngày cũ ra, kéo ngày mới vào, rồi đối chiếu bảng số lượng.”

---

## 5. Code Skeleton Recall

### Bản sliding window nên nhớ

```js
function solution(want, number, discount) {
  const need = new Map()

  for (let i = 0; i < want.length; i++) {
    need.set(want[i], number[i])
  }

  const window = new Map()

  const add = (item) => {
    window.set(item, (window.get(item) ?? 0) + 1)
  }

  const remove = (item) => {
    const next = window.get(item) - 1

    if (next === 0) {
      window.delete(item)
    } else {
      window.set(item, next)
    }
  }

  const isValid = () => {
    for (const [item, count] of need) {
      if ((window.get(item) ?? 0) !== count) {
        return false
      }
    }
    return true
  }

  for (let i = 0; i < 10; i++) {
    add(discount[i])
  }

  let answer = isValid() ? 1 : 0

  for (let right = 10; right < discount.length; right++) {
    remove(discount[right - 10])
    add(discount[right])

    if (isValid()) {
      answer++
    }
  }

  return answer
}
```

### Skeleton siêu ngắn

```js
build need

build first 10-day window

check()

for (let right = 10; right < discount.length; right++) {
  remove(discount[right - 10])
  add(discount[right])

  if (check()) answer++
}

return answer
```

### Bản brute force ngắn cũng pass

Vì window chỉ 10:

```js
function solution(want, number, discount) {
  let answer = 0

  for (let start = 0; start <= discount.length - 10; start++) {
    const count = new Map()

    for (let i = start; i < start + 10; i++) {
      count.set(
        discount[i],
        (count.get(discount[i]) ?? 0) + 1
      )
    }

    let valid = true

    for (let i = 0; i < want.length; i++) {
      if ((count.get(want[i]) ?? 0) !== number[i]) {
        valid = false
        break
      }
    }

    if (valid) answer++
  }

  return answer
}
```

Bản này dễ viết nhưng không phải template tốt nhất để học sliding window.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Fixed window có 3 phase:

```text
1. build need
2. build first window
3. slide right
```

Trong slide:

```text
REMOVE ONE
ADD ONE
CHECK
```

Không có `while`.

---

### RESET WHEN

> Không reset `window` mỗi lần trượt.

Đó chính là mục đích của sliding window.

Chỉ update 2 item:

```text
outgoing--
incoming++
```

---

### INVALIDATES WHAT

> Window invalid nếu chỉ cần một wanted item có count khác requirement.

```js
(window.get(item) ?? 0) !== needCount
```

---

### COMMIT WHEN

> Sau khi window đã đủ đúng 10 item và Map phản ánh đúng window hiện tại, mới `answer++`.

Thứ tự:

```text
REMOVE
ADD
CHECK
COMMIT
```

---

## 7. Trap dễ chết

### Trap 1 — Off-by-one số window

Nếu:

```text
N = 14
K = 10
```

số window:

```text
14 - 10 + 1 = 5
```

Start:

```text
0,1,2,3,4
```

Do đó:

```js
start <= discount.length - 10
```

ĐÚNG.

Hoặc:

```js
start < discount.length - 10 + 1
```

ĐÚNG.

Sai:

```js
start < discount.length - 10
```

vì mất window cuối.

---

### Trap 2 — Dùng `<` thay vì `<=` ở brute-force start

Sai:

```js
for (let start = 0; start < discount.length - 10; start++)
```

Với `N=14` chỉ chạy:

```text
0,1,2,3
```

mất `start=4`.

---

### Trap 3 — Sliding window remove sai index

Khi `right` là phần tử incoming:

```js
right = 10
```

window mới phải bỏ:

```text
index 0
```

Công thức:

```js
discount[right - 10]
```

Không phải:

```js
discount[right - 9]
```

---

### Trap 4 — Add incoming trước nhưng quên remove outgoing

Window sẽ thành 11 item.

Fixed window invariant phải luôn:

```text
size theo số phần tử = 10
```

---

### Trap 5 — Chỉ check `map.size`

Sai.

Ví dụ:

```text
need:
apple 2
banana 8
```

window:

```text
apple 5
banana 5
```

Map size đều 2 nhưng counts sai.

Phải compare value.

---

### Trap 6 — Check `>=` thay vì `===`

Vì tổng need = 10 và window = 10, requirement là **đúng số lượng**.

Dùng:

```js
actual === required
```

---

### Trap 7 — Reset Map mỗi window khi đang viết sliding window

Nếu reset Map rồi count lại 10 item:

```text
logic vẫn có thể đúng
```

nhưng mày đã biến nó về brute force.

Nếu đã chọn sliding window thì nhớ:

```text
OLD WINDOW
- OUT
+ IN
= NEW WINDOW
```

---

## 8. Recall 20 giây

> **Nhận diện:** mọi đoạn **10 ngày liên tiếp**, cần đếm frequency → fixed sliding window.

> **State:** `need`, `window`, `answer`.

> **First window:** add `discount[0..9]`.

> **Slide:** `remove(discount[right - 10])`, `add(discount[right])`.

> **Check:** mọi `want[i]` phải có `window count === number[i]`.

> **Off-by-one:** số window = `N - 10 + 1`; start cuối = `N - 10`.

> **Complexity:** `O(N)` nếu xem want size ≤ 10 là constant.

### Code shape

```js
for (let i = 0; i < 10; i++) {
  add(discount[i])
}

if (isValid()) answer++

for (let right = 10; right < discount.length; right++) {
  remove(discount[right - 10])
  add(discount[right])

  if (isValid()) answer++
}
```

### Hình chốt cuối

```text
[ 10 ITEMS ]
      ↓
    CHECK
      ↓
slide right

OUT ← [ 9 OLD + 1 NEW ] ← IN
      ↓
    CHECK
      ↓
   answer++
```

## 🧠 Một câu phải khắc vào đầu

> **“Fixed window: không đếm lại; đá thằng cũ ra, kéo thằng mới vào, rồi check.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 10 — 연속된 부분 수열의 합 (Tổng dãy con liên tiếp)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/178870

**Pattern:** Two Pointers / Variable Sliding Window  
**Trigger:** `mảng số dương + contiguous sum = k → right tăng sum, left giảm sum`

---

## 1. Dịch đề tiếng Việt

Cho một dãy số đã được sắp xếp **không giảm**.

Ta cần tìm một **đoạn con liên tiếp** thỏa các điều kiện:

1. Đoạn con phải bao gồm hai index nào đó và **toàn bộ phần tử nằm giữa chúng**.
2. Tổng các phần tử trong đoạn bằng `k`.
3. Nếu có nhiều đoạn có tổng bằng `k`, chọn đoạn **ngắn nhất**.
4. Nếu vẫn có nhiều đoạn cùng độ dài ngắn nhất, chọn đoạn xuất hiện **sớm hơn**, tức có start index nhỏ hơn.

Cho:

```text
sequence
```

và:

```text
k
```

hãy return:

```text
[startIndex, endIndex]
```

của đoạn thỏa điều kiện.

Index bắt đầu từ `0`.

### Giới hạn

```text
5 <= sequence.length <= 1,000,000
1 <= sequence[i] <= 1,000
5 <= k <= 1,000,000,000
```

Quan trọng:

```text
sequence[i] > 0
```

Tức tất cả phần tử đều **dương**.

Đề đảm bảo luôn tồn tại ít nhất một đoạn có tổng bằng `k`.

### Ví dụ 1

```js
sequence = [1,2,3,4,5]
k = 7
```

Đoạn:

```text
[3,4]
```

ở index:

```text
[2,3]
```

là đáp án.

### Ví dụ 2

```js
sequence = [1,1,1,2,3,4,5]
k = 5
```

Có:

```text
[1,1,1,2]  length 4
[2,3]      length 2
[5]        length 1
```

→ chọn:

```text
[6,6]
```

### Ví dụ 3

```js
sequence = [2,2,2,2,2]
k = 6
```

Có ba đoạn độ dài 3:

```text
[0,2]
[1,3]
[2,4]
```

→ chọn start nhỏ nhất:

```text
[0,2]
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
sequence[]
k
```

**Output**

```text
[start, end]
```

sao cho:

```text
sum(sequence[start..end]) === k
```

Ưu tiên:

```text
1. length nhỏ nhất
2. nếu tie → start nhỏ nhất
```

**Một câu chốt**

> Tìm window liên tiếp tổng bằng `k`, rồi trong các window hợp lệ chọn `(length, start)` nhỏ nhất.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
```

Nested loop:

```text
O(N²)
```

không thể.

Ta cần:

```text
O(N)
```

hoặc:

```text
O(N log N)
```

Điểm vàng của đề:

```text
sequence[i] >= 1
```

Tất cả đều dương.

Do đó:

```text
right++ → sum chỉ tăng
left++  → sum chỉ giảm
```

Đây chính là điều kiện để two pointers/sliding window chạy đúng.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
for start:
    sum = 0
    for end = start..N-1:
        sum += sequence[end]

        if sum == k:
            commit candidate
        if sum > k:
            break
```

Vì số dương, có thể break khi sum > k.

Nhưng worst case vẫn:

```text
O(N²)
```

với `N = 1,000,000` → không ổn.

---

### STEP 4 — BOTTLENECK

Khi start tăng từ:

```text
left
```

sang:

```text
left + 1
```

ta không cần cộng lại toàn bộ đoạn.

Chỉ cần:

```text
sum -= sequence[left]
```

Tương tự khi right tăng:

```text
sum += sequence[right]
```

Tức window hiện tại có thể được maintain incremental.

### Vì sao positivity quan trọng?

Nếu:

```text
sum > k
```

thì thêm phần tử bên phải chỉ làm sum **lớn hơn nữa**.

Cách duy nhất để cứu window là:

```text
left++
```

và trừ phần tử bên trái.

Nếu có số âm, logic này có thể sai.

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `left` | start của window |
| `right` | end hiện tại |
| `sum` | tổng `sequence[left..right]` |
| `bestStart` | start tốt nhất hiện tại |
| `bestEnd` | end tốt nhất hiện tại |
| `bestLength` | độ dài ngắn nhất |

**State tối thiểu**

```text
left
sum
best answer
```

`right` có thể lấy từ loop.

---

### STEP 6 — TRANSITION

Pattern:

```js
let left = 0
let sum = 0

for (let right = 0; right < sequence.length; right++) {
  sum += sequence[right]

  while (sum > k) {
    sum -= sequence[left]
    left++
  }

  if (sum === k) {
    // candidate [left, right]
  }
}
```

### Vì sao `while`, không phải `if`?

Một lần bỏ bên trái có thể vẫn:

```text
sum > k
```

Ví dụ:

```text
window = [1,1,10]
k = 5
sum = 12
```

Bỏ một `1`:

```text
sum = 11
```

vẫn > 5.

Phải tiếp tục shrink.

### Candidate

Khi:

```text
sum === k
```

candidate là:

```text
[left, right]
```

length:

```js
const length = right - left + 1
```

Update nếu:

```text
length < bestLength
```

Nếu cùng length, ta cần start nhỏ hơn.

Nhưng vì `right` đang tăng từ trái sang phải, candidate cùng length thường sẽ xuất hiện theo start tăng dần.

Dù vậy code rõ nhất vẫn nên viết tie-break tường minh:

```js
if (
  length < bestLength ||
  (length === bestLength && left < bestStart)
) {
  bestStart = left
  bestEnd = right
  bestLength = length
}
```

---

### STEP 7 — INVARIANT

Sau vòng:

```js
while (sum > k)
```

ta luôn có:

```text
sum <= k
```

và `sum` chính xác bằng:

```text
sequence[left] + ... + sequence[right]
```

Do tất cả phần tử dương:

- nếu `sum < k` → chỉ có thể mở rộng right để tăng sum
- nếu `sum > k` → chỉ có thể tăng left để giảm sum
- nếu `sum == k` → candidate hợp lệ

Đây là invariant làm two pointers hoạt động.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Positive contiguous sum
→ Variable Sliding Window / Two Pointers
```

Dấu hiệu nhận diện:

- Subarray / đoạn con **liên tiếp**
- Tất cả numbers dương
- Hỏi sum bằng / ít nhất / nhiều nhất một threshold
- N rất lớn
- Expand right làm metric tăng
- Shrink left làm metric giảm

**Trigger sentence**

> “Contiguous + positive + target sum → right add, sum>k thì while shrink left.”

Phân biệt với fixed window bài 9:

```text
Bài 9:
window length luôn = 10

Bài 10:
window length thay đổi theo sum
```

---

### STEP 9 — COMPLEXITY

`right` đi từ:

```text
0 → N-1
```

mỗi index đúng một lần.

`left` cũng chỉ tăng:

```text
0 → N-1
```

không bao giờ lùi.

Tổng số movement:

```text
<= 2N
```

Do đó:

```text
Time = O(N)
```

Space:

```text
O(1)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
sequence = [1,2,3,4,5]
k = 7
```

Ban đầu:

```text
left = 0
sum = 0
best = none
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `right=0, +1` | `left=0,sum=0` | add 1 | sum=1 | no | expand | `[0..0]` |
| `right=1, +2` | sum=1 | add 2 | sum=3 | no | expand | `[0..1]` |
| `right=2, +3` | sum=3 | add 3 | sum=6 | no | expand | `[0..2]` |
| `right=3, +4` | sum=6 | add 4 | sum=10 | no | shrink | — |
| shrink left | `left=0,sum=10` | remove 1 | sum=9,left=1 | no | still >7 | — |
| shrink left | `left=1,sum=9` | remove 2 | sum=7,left=2 | candidate | `[2,3]` | best len=2 |
| `right=4,+5` | `left=2,sum=7` | add 5 | sum=12 | no | shrink | — |
| shrink | sum=12 | remove 3 | sum=9,left=3 | no | shrink | — |
| shrink | sum=9 | remove 4 | sum=5,left=4 | no | end | — |

Final:

```text
[2,3]
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Hai tay kẹp một window

```text
L
↓
[1 2 3]
    ↑
    R

sum = 6
```

`sum < 7`

→ kéo tay phải sang phải.

### Frame 2 — Sum quá lớn

```text
L
↓
[1 2 3 4]
      ↑
      R

sum = 10
```

`10 > 7`

→ không kéo right nữa.

Phải đẩy left.

### Frame 3 — Shrink

```text
remove 1
sum = 9

remove 2
sum = 7
```

Window:

```text
[3 4]
```

### Frame 4 — Hit target

```text
sum == k
```

→ đo length:

```text
2
```

→ compare best.

### Câu chuyện 1 dòng

> “Tay phải bỏ thêm đồ vào làm tổng tăng; nếu nặng quá thì tay trái vứt đồ ra cho tới khi không quá k; đúng k thì chụp lại cửa sổ.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(sequence, k) {
  let left = 0
  let sum = 0

  let bestStart = 0
  let bestEnd = sequence.length - 1
  let bestLength = Infinity

  for (let right = 0; right < sequence.length; right++) {
    sum += sequence[right]

    while (sum > k) {
      sum -= sequence[left]
      left++
    }

    if (sum === k) {
      const length = right - left + 1

      if (
        length < bestLength ||
        (length === bestLength && left < bestStart)
      ) {
        bestLength = length
        bestStart = left
        bestEnd = right
      }
    }
  }

  return [bestStart, bestEnd]
}
```

### Skeleton siêu ngắn

```js
let left = 0
let sum = 0

for (let right = 0; right < arr.length; right++) {
  sum += arr[right]

  while (sum > k) {
    sum -= arr[left]
    left++
  }

  if (sum === k) {
    commit(left, right)
  }
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Loop ngoài = `right`.

> Loop trong = `while sum > k` để shrink `left`.

Shape:

```text
for right
    add

    while invalid
        remove left

    if target
        commit
```

---

### RESET WHEN

> Không reset `sum` khi right tăng.

Đó là sliding window.

`left` cũng không reset về `0`.

Cả hai pointer chỉ đi về phía trước.

---

### INVALIDATES WHAT

> `sum > k` invalidates window hiện tại.

Vì numbers dương nên phải shrink:

```js
while (sum > k) {
  sum -= sequence[left]
  left++
}
```

Không phải reset cả window.

---

### COMMIT WHEN

> Chỉ commit khi:

```js
sum === k
```

và candidate tốt hơn best theo thứ tự:

```text
1. length nhỏ hơn
2. nếu bằng → start nhỏ hơn
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng `if (sum > k)` thay vì `while`

Sai:

```js
if (sum > k) {
  sum -= sequence[left]
  left++
}
```

Một lần shrink có thể vẫn > k.

Đúng:

```js
while (sum > k) {
  ...
}
```

---

### Trap 2 — Update candidate trước khi shrink

Sai thứ tự:

```text
ADD
CHECK == k
SHRINK
```

Nếu sum đang > k, có thể shrink xong mới thành k.

Đúng:

```text
ADD
WHILE sum > k SHRINK
IF sum == k COMMIT
```

---

### Trap 3 — Quên `+1` trong length

Sai:

```js
right - left
```

Đúng:

```js
right - left + 1
```

---

### Trap 4 — Chỉ update khi tìm thấy sum=k lần đầu

Đề không hỏi first match.

Đề hỏi:

```text
shortest
then earliest
```

Phải tiếp tục scan toàn bộ.

---

### Trap 5 — Tie-break sai

Candidate A:

```text
[0,2]
length 3
```

Candidate B:

```text
[1,3]
length 3
```

Phải chọn:

```text
[0,2]
```

start nhỏ hơn.

---

### Trap 6 — Dùng variable window khi có số âm

Template này phụ thuộc vào:

```text
sequence[i] > 0
```

Nếu có âm:

```text
right++ có thể làm sum giảm
left++ có thể làm sum tăng
```

two pointers này mất monotonicity.

---

### Trap 7 — Nghĩ sorted là lý do chính

Dãy đúng là nondecreasing, nhưng two pointers ở đây chủ yếu dựa vào:

```text
mọi phần tử đều dương
```

Không cần sorted mới maintain được positive-window sum.

Đây là nuance quan trọng.

---

## 8. Recall 20 giây

> **Nhận diện:** contiguous sum = k + tất cả số dương + N rất lớn → two pointers.

> **State:** `left`, `right`, `sum`, best `[start,end]`.

> **Expand:** mỗi right → `sum += sequence[right]`.

> **Restore validity:** `while (sum > k) { sum -= sequence[left]; left++; }`.

> **Commit:** `sum === k`.

> **Ranking:** length ngắn hơn trước; tie → start nhỏ hơn.

> **Complexity:** `O(N)` vì left/right mỗi pointer chỉ tiến một chiều.

### Code shape

```js
let left = 0
let sum = 0

for (let right = 0; right < sequence.length; right++) {
  sum += sequence[right]

  while (sum > k) {
    sum -= sequence[left]
    left++
  }

  if (sum === k) {
    const len = right - left + 1

    if (
      len < bestLen ||
      (len === bestLen && left < bestStart)
    ) {
      bestLen = len
      bestStart = left
      bestEnd = right
    }
  }
}
```

### Hình chốt cuối

```text
RIGHT →
ADD
 ↓
sum > k ?
 YES
 ↓
LEFT → REMOVE
 ↺ until <= k

sum == k ?
 YES
 ↓
COMPARE
(length, start)
 ↓
COMMIT BEST
```

## 🧠 Một câu phải khắc vào đầu

> **“Số dương nên right chỉ làm tổng tăng, left chỉ làm tổng giảm: add → while quá k thì shrink → đúng k thì xét best.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

---

# Bài 35 — 두 큐 합 같게 만들기 (Làm tổng hai queue bằng nhau)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/118667

**Pattern:** Two Pointers / Queue Simulation / Circular Window  
**Trigger:** `hai queue + chỉ được pop front rồi push sang queue kia + cần cân bằng tổng`

---

## 1. Dịch đề tiếng Việt

Có hai queue cùng độ dài.

Một operation:

```text
chọn một queue
→ pop phần tử đầu
→ push phần tử đó vào cuối queue kia
```

Ta cần:

> số operation nhỏ nhất để tổng hai queue bằng nhau.

Nếu không thể:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Gọi:

```text
sum1 = tổng queue1
sum2 = tổng queue2
```

Nếu hai queue bằng tổng thì mỗi queue phải có:

```text
target = (sum1 + sum2) / 2
```

Nếu total lẻ:

```text
không thể
```

→ return `-1`.

---

### STEP 2 — BOUND + JS NUMERIC SAFETY

```text
length mỗi queue <= 300,000
value <= 1e9
```

Tổng tối đa:

```text
600,000 * 1e9 = 6e14
```

Trong khi:

```text
Number.MAX_SAFE_INTEGER ≈ 9e15
```

→ **JavaScript Number an toàn** cho toàn bộ phép cộng/trừ ở bài này.

Không cần BigInt.

---

### STEP 3 — BRUTE FORCE

Không được dùng:

```js
queue.shift()
```

lặp hàng trăm nghìn lần vì reindex array có thể rất tốn.

Cũng không cần thử mọi chuỗi move.

Do tất cả phần tử đều dương, mỗi bước điều chỉnh tổng bị ép theo một hướng.

---

### STEP 4 — BOTTLENECK

Nếu:

```text
sum1 > target
```

thì queue1 đang quá nặng.

Muốn giảm sum1, operation hợp lý duy nhất là:

```text
pop front queue1 → queue2
```

Nếu:

```text
sum1 < target
```

thì phải lấy front queue2 sang queue1.

Vì mọi value > 0 nên đây chính là greedy/two-pointer deterministic.

---

### STEP 5 — STATE

Ghép thứ tự ban đầu:

```js
const arr = [...queue1, ...queue2]
```

Xem queue1 hiện tại như một đoạn liên tiếp trên vòng tròn `arr`.

Ban đầu:

```text
left = 0
right = queue1.length
```

Window:

```text
arr[left ... right-1]
```

chính là queue1.

`right` và `left` chỉ tăng; đọc phần tử bằng:

```js
arr[index % arr.length]
```

---

### STEP 6 — TRANSITION

Nếu queue1 quá nặng:

```js
sum1 -= arr[left % totalLength]
left++
```

Tương đương:

```text
queue1 pop front → queue2 push back
```

Nếu queue1 quá nhẹ:

```js
sum1 += arr[right % totalLength]
right++
```

Tương đương:

```text
queue2 pop front → queue1 push back
```

Mỗi lần pointer tăng = 1 operation.

---

### STEP 7 — INVARIANT

Ở mọi thời điểm:

> đoạn circular `[left, right)` biểu diễn chính xác các phần tử hiện đang nằm trong queue1 theo đúng thứ tự.

Và:

```text
sum1 = tổng của đoạn đó
```

Do chỉ move front sang back nên global cyclic order của các phần tử không thay đổi.

---

### STEP 8 — PATTERN

**Pattern:** Two pointers trên circular sequence.

Dấu hiệu:

- queue operation chỉ move front → back queue kia
- values dương
- mục tiêu là điều chỉnh một tổng tới target
- nếu sum quá lớn thì bắt buộc shrink trái
- nếu sum quá nhỏ thì bắt buộc expand phải

Trigger sentence:

> **“Queue front-to-back + positive values + target sum → biến queue thành circular window rồi two pointers.”**

---

### STEP 9 — COMPLEXITY

Mỗi operation chỉ tăng một pointer.

Ta chỉ cần duyệt hữu hạn số state; dùng bound bảo thủ:

```text
4 * n operations
```

Nếu sau một vòng đầy đủ của cả hai pointer mà không đạt target thì trạng thái bắt đầu lặp theo chu kỳ và không có lời giải mới.

Time:

```text
O(n)
```

Space:

```text
O(n)
```

cho mảng ghép.

---

## 3. Dry Run

```js
queue1 = [3,2,7,2]
queue2 = [4,6,5,1]
```

```text
sum1 = 14
sum2 = 16
target = 15
```

### Step 1

```text
14 < 15
```

Lấy front queue2 = `4` sang queue1:

```text
sum1 = 18
operations = 1
```

### Step 2

```text
18 > 15
```

Lấy front queue1 = `3` sang queue2:

```text
sum1 = 15
operations = 2
```

Answer:

```text
2
```

---

## 4. Bộ phim hình ảnh

Đừng tưởng tượng hai array bị `shift/push` liên tục.

Hãy tưởng tượng một vòng tròn:

```text
3 2 7 2 | 4 6 5 1 | 3 2 7 2 | ...
^         ^
left      right
```

Queue1 chính là đoạn nằm giữa hai pointer.

Nếu tổng quá lớn:

```text
left →
```

Nếu tổng quá nhỏ:

```text
right →
```

---

## 5. Code Skeleton Recall — JS safe

```js
function solution(queue1, queue2) {
  const n = queue1.length

  let sum1 = 0
  let sum2 = 0

  for (const value of queue1) {
    sum1 += value
  }

  for (const value of queue2) {
    sum2 += value
  }

  const total = sum1 + sum2

  if (total % 2 !== 0) {
    return -1
  }

  const target = total / 2

  if (sum1 === target) {
    return 0
  }

  const arr = queue1.concat(queue2)
  const length = arr.length

  let left = 0
  let right = n
  let operations = 0

  const limit = 4 * n

  while (operations < limit) {
    if (sum1 === target) {
      return operations
    }

    if (sum1 > target) {
      sum1 -= arr[left % length]
      left++
    } else {
      sum1 += arr[right % length]
      right++
    }

    operations++
  }

  return sum1 === target
    ? operations
    : -1
}
```

---

## 6. Vì sao greedy này cho minimum operations?

Tại một state:

### Nếu `sum1 > target`

Muốn giảm tổng queue1 thì chỉ có một loại operation hữu ích:

```text
pop front queue1
```

Move từ queue2 sang queue1 chỉ làm sum1 tăng thêm vì value dương.

### Nếu `sum1 < target`

Muốn tăng sum1 thì chỉ có:

```text
pop front queue2 → queue1
```

Move ngược lại chỉ làm sum1 nhỏ hơn.

Nên mỗi bước gần như bị ép; không có nhánh lựa chọn để brute-force.

---

## 7. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
calculate sums
target = total/2

while under bound
    sum == target? return ops
    sum > target? move left
    sum < target? move right
```

### RESET WHEN

Không reset pointer.

`left` và `right` chỉ tăng.

### INVALIDATES WHAT

Ngay đầu:

```text
total odd → impossible
```

Sau khi vượt đủ state bound mà vẫn chưa hit target:

```text
-1
```

### COMMIT WHEN

Mỗi pointer move:

```text
operations++
```

Khi:

```js
sum1 === target
```

return ngay.

---

## 8. Trap dễ chết

### Trap 1 — `shift()`

N tới 300,000.

Không dùng queue shift liên tục.

---

### Trap 2 — Chỉ check `sum1 === sum2`

Có thể, nhưng recall tốt hơn là tính một target cố định:

```js
target = total / 2
```

---

### Trap 3 — Total lẻ

Nếu total odd:

```text
không thể chia đôi
```

return `-1`.

---

### Trap 4 — Dùng BigInt vô ích

Bài này max sum chỉ khoảng:

```text
6e14
```

vẫn integer-safe trong JS Number.

---

### Trap 5 — Không có termination bound

Case impossible có thể loop vòng tròn mãi.

Phải có giới hạn số pointer moves.

---

## 9. Recall 20 giây

> **Nhận diện:** move front giữa 2 queue + positive values + equal sum → circular two pointers.

> **Target:** `(sum1+sum2)/2`.

> **Odd total:** -1.

> **sum1 > target:** pop q1 → `left++`.

> **sum1 < target:** pop q2 → `right++`.

> **Không shift():** dùng pointer + modulo.

> **JS Number:** safe vì max sum ≈ 6e14.

> **Complexity:** O(n).

### Code shape

```js
while (ops < 4 * n) {
  if (sum1 === target) return ops

  if (sum1 > target) {
    sum1 -= arr[left % len]
    left++
  } else {
    sum1 += arr[right % len]
    right++
  }

  ops++
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Hai queue này thực chất là một circular window: sum lớn thì left++, sum nhỏ thì right++.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)
