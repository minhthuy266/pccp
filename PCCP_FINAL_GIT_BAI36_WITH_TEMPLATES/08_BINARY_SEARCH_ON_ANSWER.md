# PCCP FINAL RECALL — Binary Search / Binary Search on Answer

> Representative cho first/last feasible, monotonic predicate và integer bounds.

## Bài trong file

- Bài 26 — 입국심사 (Kiểm tra nhập cảnh)

---

---

# Bài 26 — 입국심사 (Kiểm tra nhập cảnh)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43238

**Pattern:** Binary Search on Answer  
**Trigger:** `tìm thời gian nhỏ nhất thỏa điều kiện + nếu time X đủ thì mọi time lớn hơn cũng đủ`

---

## 1. Dịch đề tiếng Việt

Có `n` người đang chờ nhập cảnh.

Mỗi nhân viên kiểm tra có tốc độ khác nhau:

```text
times[i] = số phút để nhân viên i xử lý 1 người
```

Mỗi quầy chỉ xử lý một người tại một thời điểm.

Mục tiêu:

> tìm **thời gian nhỏ nhất** để xử lý xong ít nhất `n` người.

### Giới hạn

```text
1 <= n <= 1,000,000,000
1 <= times[i] <= 1,000,000,000
1 <= times.length <= 100,000
```

Đáp án có thể lên tới:

```text
1e9 * 1e9 = 1e18
```

→ JavaScript `Number` không còn integer-safe.

**Bản recall thi thật dùng BigInt.**

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta không mô phỏng từng người.

Thay vào đó hỏi:

> Nếu cho tổng cộng `T` phút, các quầy có thể xử lý được bao nhiêu người?

Một quầy mất `time` phút/người thì trong `T` phút xử lý được:

```text
floor(T / time)
```

Tổng:

```text
sum floor(T / times[i])
```

Nếu tổng >= n:

```text
T là feasible
```

---

### STEP 2 — BOUND

Ta cần search trên đáp án thời gian.

Lower bound:

```text
1
```

Upper bound an toàn:

```text
max(times) * n
```

vì kể cả chỉ dùng quầy chậm nhất, cuối cùng vẫn xử lý xong.

Nhưng để upper bound chặt hơn có thể dùng:

```text
min(times) * n
```

vì chỉ cần quầy nhanh nhất làm hết cũng đủ.

Ta dùng:

```js
right = minTime * n
```

---

### STEP 3 — BRUTE FORCE

Sai:

```text
thử T = 1,2,3,4,...
```

vì answer có thể tới `1e18`.

Sai khác:

- mô phỏng từng người
- priority queue từng lần quầy rảnh

`n` tới 1e9 → không thể.

---

### STEP 4 — BOTTLENECK

Search space thời gian cực lớn.

Nhưng predicate:

```text
canProcess(T) = tổng số người xử lý được trong T phút >= n ?
```

có tính đơn điệu:

```text
false false false ... true true true
```

Một khi `T` đủ thì mọi thời gian lớn hơn cũng đủ.

→ Binary Search on Answer.

---

### STEP 5 — STATE

```js
let left
let right
let answer
```

Mỗi vòng:

```js
mid
processed
```

Tất cả dùng:

```js
BigInt
```

---

### STEP 6 — TRANSITION

Mid:

```js
const mid = (left + right) / 2n
```

Count:

```js
let processed = 0n

for (const time of bigTimes) {
  processed += mid / time

  if (processed >= people) {
    break
  }
}
```

Nếu feasible:

```js
answer = mid
right = mid - 1n
```

Vì ta cần **minimum feasible**.

Nếu chưa đủ:

```js
left = mid + 1n
```

---

### STEP 7 — INVARIANT

Binary search luôn duy trì:

```text
đáp án thật nằm trong [left, right] hoặc đã được lưu trong answer
```

Khi `mid` feasible:

> `mid` có thể là đáp án, nhưng còn phải tìm xem có thời gian nhỏ hơn cũng feasible không.

→ đi trái.

Khi `mid` infeasible:

> mọi thời gian <= mid cũng infeasible.

→ đi phải.

---

### STEP 8 — PATTERN

**Pattern:** Binary Search on Answer / First Feasible.

Dấu hiệu:

- hỏi min/max một giá trị
- answer space có thứ tự
- viết được `feasible(x)`
- feasible là monotonic

Trigger sentence:

> **“Min thời gian + kiểm được trong T làm đủ chưa + đủ rồi thì T lớn hơn cũng đủ → Binary Search on Answer.”**

---

### STEP 9 — COMPLEXITY

Mỗi predicate scan tối đa:

```text
M = times.length <= 100,000
```

Số vòng binary search:

```text
O(log answer)
```

Với answer <= 1e18:

```text
~60 vòng
```

Total:

```text
O(M log answer)
```

Khoảng:

```text
100,000 * 60 = 6,000,000
```

rất ổn.

Space:

```text
O(M)
```

nếu convert times sang BigInt.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
n = 6
times = [7, 10]
```

Ta hỏi:

```text
T = 28
```

Số người xử lý được:

```text
28 / 7 = 4
28 / 10 = 2
total = 6
```

→ feasible.

Còn:

```text
T = 27
```

```text
27 / 7 = 3
27 / 10 = 2
total = 5
```

→ infeasible.

Vậy answer:

```text
28
```

---

## 4. Bộ phim hình ảnh

Đừng tưởng tượng từng người xếp hàng.

Hãy tưởng tượng thanh thời gian:

```text
0 ------------------------------ T
```

Rồi mỗi quầy tự hỏi:

```text
trong T phút tao xử lý được bao nhiêu người?
```

Ví dụ quầy 7 phút:

```text
floor(T / 7)
```

Cộng tất cả lại.

Nếu đủ `n` người:

```text
T có thể
```

→ thử giảm T.

Nếu chưa đủ:

```text
T quá nhỏ
```

→ tăng T.

---

## 5. Code Skeleton Recall — BigInt safe

```js
function solution(n, times) {
  const people = BigInt(n)

  const bigTimes =
    times.map(BigInt)

  let minTime = bigTimes[0]

  for (const time of bigTimes) {
    if (time < minTime) {
      minTime = time
    }
  }

  let left = 1n
  let right = minTime * people
  let answer = right

  while (left <= right) {
    const mid =
      (left + right) / 2n

    let processed = 0n

    for (const time of bigTimes) {
      processed += mid / time

      if (processed >= people) {
        break
      }
    }

    if (processed >= people) {
      answer = mid
      right = mid - 1n
    } else {
      left = mid + 1n
    }
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while left <= right
    mid
    scan all inspectors → processed
    feasible?
        save answer + go left
    else
        go right
```

### RESET WHEN

Mỗi mid mới:

```js
processed = 0n
```

### INVALIDATES WHAT

Nếu:

```js
processed >= people
```

thì predicate đã xác định là true.

Có thể `break` sớm để tránh cộng thừa và tiết kiệm thời gian.

### COMMIT WHEN

Khi feasible:

```js
answer = mid
right = mid - 1n
```

Vì đây là:

```text
FIRST / MINIMUM FEASIBLE
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng Number

Nguy hiểm.

Worst case answer:

```text
1e18
```

Trong khi:

```text
Number.MAX_SAFE_INTEGER ≈ 9e15
```

→ mất chính xác integer.

**Dùng BigInt.**

---

### Trap 2 — Mix Number với BigInt

Sai:

```js
1n + 1
```

sẽ throw.

Phải đồng bộ:

```js
1n
2n
BigInt(n)
BigInt(time)
```

---

### Trap 3 — Binary search sai hướng

Ta tìm **minimum feasible**.

Nếu feasible:

```js
right = mid - 1n
```

không phải đi phải.

---

### Trap 4 — Predicate sai

Đúng:

```js
processed += mid / time
```

BigInt division tự floor.

Không phải:

```text
time / mid
```

---

### Trap 5 — Mô phỏng từng người bằng heap

`n` tới 1e9.

Không được.

---

### Trap 6 — Upper bound quá nhỏ

Phải chắc chắn upper bound feasible.

Safe:

```js
minTime * people
```

vì quầy nhanh nhất một mình cũng xử lý được n người trong thời gian đó.

---

## 8. Recall 20 giây

> **Nhận diện:** minimum time + `feasible(T)` monotonic → Binary Search on Answer.

> **Predicate:** `sum(T / time[i]) >= n`.

> **Search:** first feasible.

> **Feasible:** save mid, go left.

> **Infeasible:** go right.

> **JS:** dùng BigInt vì answer có thể tới 1e18.

> **Complexity:** O(M log answer).

### Code shape

```js
let left = 1n
let right = minTime * people
let answer = right

while (left <= right) {
  const mid = (left + right) / 2n

  let done = 0n

  for (const t of times) {
    done += mid / t
    if (done >= people) break
  }

  if (done >= people) {
    answer = mid
    right = mid - 1n
  } else {
    left = mid + 1n
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Min answer + monotonic predicate → first feasible; JS gặp 1e18 thì BigInt.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)
