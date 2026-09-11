# PCCP FINAL RECALL — Hash / Sorting / Greedy

> Map/Set state, counting, prefix lookup, comparator, greedy + two pointers.

## Bài trong file

- Bài 2 — 달리기 경주 (Cuộc đua chạy)
- Bài 5 — 완주하지 못한 선수 (Vận động viên không hoàn thành)
- Bài 6 — 전화번호 목록 (Danh bạ điện thoại)
- Bài 7 — 의상 (Clothes)
- Bài 8 — 가장 큰 수 (Số lớn nhất)
- Bài 14 — 구명보트 (Xuồng cứu sinh)

---
# Bài 2 — 달리기 경주 (Cuộc đua chạy)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/178871

## 1. Dịch đề tiếng Việt

Ở một quốc gia nọ, hằng năm có tổ chức một cuộc đua chạy.

Trong lúc cuộc đua diễn ra, mỗi khi một vận động viên **vượt qua người đang chạy ngay phía trước mình**, bình luận viên sẽ gọi tên người vừa vượt.

Ví dụ, thứ tự hiện tại từ hạng 1 đến hạng 3 là:

```text
1. mumu
2. soe
3. poe
```

Nếu bình luận viên gọi:

```text
"soe"
```

thì điều đó có nghĩa là `soe`, đang đứng hạng 2, vừa vượt qua `mumu`, người đứng ngay phía trước.

Thứ tự mới sẽ trở thành:

```text
1. soe
2. mumu
3. poe
```

---

Cho:

- `players`: mảng tên các vận động viên theo **thứ tự xếp hạng hiện tại từ hạng 1 trở xuống**.
- `callings`: mảng tên những vận động viên được bình luận viên gọi theo đúng thứ tự thời gian.

Mỗi lần một cái tên xuất hiện trong `callings`, vận động viên đó sẽ **đổi chỗ với người đứng ngay phía trước mình**.

Hãy trả về thứ tự các vận động viên từ hạng 1 trở xuống sau khi toàn bộ cuộc đua kết thúc.

### Giới hạn

```text
5 <= players.length <= 50,000
2 <= callings.length <= 1,000,000
```

- `players[i]` là tên của vận động viên ở vị trí `i`.
- Tên chỉ gồm chữ cái thường.
- Không có tên trùng nhau trong `players`.
- Độ dài mỗi tên từ `3` đến `10`.
- Mọi phần tử trong `callings` đều là tên có trong `players`.
- Người đang đứng hạng 1 sẽ không bao giờ được gọi.

### Ví dụ

```text
players =
["mumu", "soe", "poe", "kai", "mine"]

callings =
["kai", "kai", "mine", "mine"]
```

Kết quả:

```text
["mumu", "kai", "mine", "soe", "poe"]
```

### Diễn biến

Ban đầu:

```text
mumu  soe  poe  kai  mine
 1     2    3    4     5
```

Gọi `"kai"` lần 1:

```text
mumu  soe  kai  poe  mine
 1     2    3    4     5
```

Gọi `"kai"` lần 2:

```text
mumu  kai  soe  poe  mine
 1     2    3    4     5
```

Gọi `"mine"` lần 1:

```text
mumu  kai  soe  mine  poe
 1     2    3    4     5
```

Gọi `"mine"` lần 2:

```text
mumu  kai  mine  soe  poe
 1     2     3    4    5
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
players  = thứ tự hiện tại
callings = chuỗi sự kiện vượt
```

Mỗi `calling` có nghĩa:

```text
runner được gọi
        ↑
đổi chỗ với runner ngay trước
```

**Output**

```text
players sau khi áp dụng toàn bộ callings
```

**Một câu chốt**

> Với mỗi tên được gọi, tìm vị trí hiện tại của người đó rồi swap với người ngay trước.

---

### STEP 2 — BOUND

```text
players.length  <= 50,000
callings.length <= 1,000,000
```

Đây là constraint cực kỳ quan trọng.

Nếu mỗi lần gọi ta dùng:

```js
players.indexOf(name)
```

thì mỗi lần mất:

```text
O(N)
```

và tổng:

```text
O(C × N)
```

Tệ nhất:

```text
1,000,000 × 50,000
= 50,000,000,000
```

Không ổn.

Ta cần gần:

```text
O(N + C)
```

Muốn vậy:

> Phải biết vị trí của mỗi runner trong O(1).

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```js
for (const name of callings) {
  const index = players.indexOf(name)

  swap(players[index], players[index - 1])
}
```

Logic đúng.

Nhưng:

```text
indexOf = O(N)
```

nên tổng:

```text
O(C × N)
```

Với `callings` tới 1 triệu → quá chậm.

---

### STEP 4 — BOTTLENECK

Bottleneck không phải là swap.

Swap chỉ:

```text
O(1)
```

Bottleneck là:

> "Tên này hiện đang đứng ở đâu?"

Nếu mỗi lần lại scan `players` để tìm:

```text
mumu
soe
poe
kai   ← mất thời gian đi tìm
mine
```

thì quá tốn.

Giải pháp:

```text
Map<name, index>
```

Ví dụ:

```text
mumu → 0
soe  → 1
poe  → 2
kai  → 3
mine → 4
```

Sau mỗi swap, cập nhật lại đúng 2 vị trí trong Map.

---

### STEP 5 — STATE

Ta cần giữ **hai representation đồng bộ**:

| State | Ý nghĩa |
|---|---|
| `players` | ai đang đứng ở từng vị trí |
| `position` | mỗi người hiện đang ở vị trí nào |

Ví dụ:

```text
players:
index:    0      1      2      3      4
        mumu    soe    poe    kai    mine
```

```text
position:
mumu → 0
soe  → 1
poe  → 2
kai  → 3
mine → 4
```

**State tối thiểu**

```text
array: index → name
map:   name  → index
```

Đây là hai chiều ngược nhau.

---

### STEP 6 — TRANSITION

Giả sử:

```text
called = "kai"
```

Map cho biết:

```text
position["kai"] = 3
```

Người ngay trước:

```text
players[2] = "poe"
```

Ta cần:

```text
BEFORE

index:  0      1      2      3      4
       mumu    soe    poe    kai    mine
                      ↑      ↑
                    front  called
```

Swap:

```text
AFTER

index:  0      1      2      3      4
       mumu    soe    kai    poe    mine
```

Sau đó update Map:

```text
kai → 2
poe → 3
```

Transition chính xác:

```text
idx = position[called]
frontIdx = idx - 1
frontName = players[frontIdx]

swap players[idx] và players[frontIdx]

position[called] = frontIdx
position[frontName] = idx
```

---

### STEP 7 — INVARIANT

Invariant quan trọng nhất:

> Sau mọi calling, `players[index]` và `position[name]` phải luôn phản ánh cùng một thứ tự.

Nói cách khác:

```text
position[players[i]] === i
```

luôn luôn đúng với mọi `i`.

Ví dụ sau swap:

```text
players[2] = "kai"
position["kai"] = 2
```

và:

```text
players[3] = "poe"
position["poe"] = 3
```

Nếu chỉ swap array mà quên update Map:

```text
players đúng
Map sai
```

→ calling tiếp theo lấy nhầm index → toàn bộ kết quả hỏng.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Array + Hash Map
```

Cụ thể hơn:

> "Dynamic positions / maintain inverse index"

Dấu hiệu nhận diện:

- Có một thứ tự đang thay đổi liên tục.
- Event chỉ thay đổi cục bộ.
- Cần biết nhanh vị trí hiện tại của một object.
- Tên / id là duy nhất.
- Số event rất lớn.
- `indexOf`, `findIndex` sẽ quá chậm.

**Trigger sentence**

> “Cần tìm vị trí hiện tại của tên rất nhiều lần → Map tên → index.”

Mental model:

```text
ARRAY = ai ở vị trí nào?
MAP   = người này ở vị trí nào?
```

Hai cấu trúc phải update cùng lúc.

---

### STEP 9 — COMPLEXITY

Khởi tạo Map:

```text
O(N)
```

Mỗi calling:

```text
lookup Map = O(1)
swap       = O(1)
update Map = O(1)
```

Có `C` callings:

```text
O(C)
```

Tổng:

```text
O(N + C)
```

Space:

```text
O(N)
```

cho Map.

Đây là độ phức tạp cần đạt với:

```text
C <= 1,000,000
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```text
players =
[mumu, soe, poe, kai, mine]

callings =
[kai, kai, mine, mine]
```

Ban đầu:

```text
position =
mumu→0
soe→1
poe→2
kai→3
mine→4
```

| Unit | State trước | Action (input / choice) | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `kai` | `[mumu,soe,poe,kai,mine]`, `kai→3` | lấy `idx=3`, trước là `poe` | swap index `3↔2`, update `kai→2`, `poe→3` | chưa, answer chính là `players` cuối | calling tiếp | `[mumu,soe,kai,poe,mine]` |
| `kai` | `[mumu,soe,kai,poe,mine]`, `kai→2` | lấy `idx=2`, trước là `soe` | swap `2↔1`, update `kai→1`, `soe→2` | chưa | calling tiếp | `[mumu,kai,soe,poe,mine]` |
| `mine` | `[mumu,kai,soe,poe,mine]`, `mine→4` | lấy `idx=4`, trước là `poe` | swap `4↔3`, update `mine→3`, `poe→4` | chưa | calling tiếp | `[mumu,kai,soe,mine,poe]` |
| `mine` | `[mumu,kai,soe,mine,poe]`, `mine→3` | lấy `idx=3`, trước là `soe` | swap `3↔2`, update `mine→2`, `soe→3` | cuối cùng return `players` | hết | `[mumu,kai,mine,soe,poe]` |

Điểm phải nhìn ra:

```text
UNIT       = một calling
STATE      = players + position
ACTION     = tìm idx O(1)
TRANSITION = swap với idx - 1
COMMIT     = update cả array và Map
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Hai tấm bản đồ song song

```text
ARRAY: vị trí → người

0      1      2      3      4
mumu   soe    poe    kai    mine
```

```text
MAP: người → vị trí

mumu → 0
soe  → 1
poe  → 2
kai  → 3
mine → 4
```

Hãy tưởng tượng:

```text
ARRAY = bảng xếp hạng
MAP   = GPS của từng runner
```

---

### Frame 2 — Bình luận viên gọi "kai"

```text
CALLING: kai
```

Không scan array.

Hỏi GPS:

```text
position.get("kai")
          ↓
          3
```

Ta biết ngay:

```text
kai đang ở index 3
```

---

### Frame 3 — Nhìn người ngay trước

```text
index:   0      1      2      3      4
        mumu    soe    poe    kai    mine
                       ↑      ↑
                     trước   kai
```

```text
idx = 3
frontIdx = 2
frontName = poe
```

---

### Frame 4 — Swap trên bảng xếp hạng

```text
BEFORE

mumu | soe | poe | kai | mine
             ↘   ↙

AFTER

mumu | soe | kai | poe | mine
```

---

### Frame 5 — GPS cũng phải đổi

Trước:

```text
poe → 2
kai → 3
```

Sau:

```text
kai → 2
poe → 3
```

Nếu không đổi Map:

```text
ARRAY: kai đang ở 2
MAP:   kai vẫn bảo đang ở 3   ❌
```

Calling tiếp theo sẽ sai.

---

### Frame 6 — Bộ phim đầy đủ

```text
CALL "kai"
     ↓
Map hỏi vị trí
     ↓
idx = 3
     ↓
front = players[2] = poe
     ↓
SWAP

poe  kai
 ↘  ↙
kai  poe

     ↓
UPDATE MAP

kai → 2
poe → 3
     ↓
NEXT CALLING
```

**Câu chuyện 1 dòng**

> “Nghe tên → hỏi GPS người đó đang ở đâu → đổi chỗ với người trước → cập nhật GPS cho cả hai.”

---

## 5. Code Skeleton Recall

```js
function solution(players, callings) {
  const position = new Map()

  for (let i = 0; i < players.length; i++) {
    position.set(players[i], i)
  }

  for (const called of callings) {
    const idx = position.get(called)
    const frontIdx = idx - 1
    const front = players[frontIdx]

    players[frontIdx] = called
    players[idx] = front

    position.set(called, frontIdx)
    position.set(front, idx)
  }

  return players
}
```

Có thể destructuring swap:

```js
[players[idx - 1], players[idx]] =
[players[idx], players[idx - 1]]
```

Nhưng trong phòng thi, bản explicit ở trên thường dễ kiểm soát Map hơn.

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Loop 1 lần để build Map, rồi loop từng `calling`.

```text
players → build position
callings → process events
```

---

**RESET WHEN**

> Không reset Map giữa các calling.

`position` phải giữ lại trạng thái mới nhất của cuộc đua.

---

**INVALIDATES WHAT**

> Sau swap, nếu không update **cả 2 người** trong Map thì invariant hỏng.

Phải update:

```text
called
front
```

Không chỉ `called`.

---

**COMMIT WHEN**

> Một calling chỉ hoàn tất khi **array và Map đều đã được cập nhật**.

```text
swap array
+
update 2 map entries
=
1 transition hoàn chỉnh
```

---## 7. Trap dễ chết

### Trap 1 — Dùng `indexOf`

```js
const idx = players.indexOf(called)
```

Logic đúng nhưng complexity:

```text
O(C × N)
```

với 1 triệu callings → timeout.

---

### Trap 2 — Chỉ update người được gọi

Sai:

```js
position.set(called, idx - 1)
```

nhưng quên:

```js
position.set(front, idx)
```

Map lập tức sai.

---

### Trap 3 — Update Map trước khi lưu người phía trước

Nếu overwrite array trước rồi mới đọc:

```js
players[idx - 1]
```

có thể mất tên runner cũ.

An toàn nhất:

```js
const front = players[idx - 1]
```

trước khi swap.

---

### Trap 4 — Nghĩ phải xử lý hạng 1 riêng

Đề đảm bảo:

```text
người đang hạng 1 không bị gọi
```

nên:

```text
idx >= 1
```

luôn đúng.

Không cần special case.

---

### Trap 5 — Map index 1-based

Không cần.

Giữ toàn bộ internal state theo JS index:

```text
0-based
```

sẽ đơn giản hơn.

---

## 8. Recall 20 giây

> **Nhận diện:** event rất nhiều + cần biết vị trí hiện tại của tên → `Map name→index`.

> **State:** `players` = index→name, `position` = name→index.

> **Transition:** lấy `idx`, lấy `front = players[idx-1]`, swap, update Map cho **cả hai**.

> **Invariant:** `position.get(players[i]) === i`.

> **Complexity:** `O(N + C)`.

> **Code shape:**

```js
for (const called of callings) {
  const idx = position.get(called)
  const front = players[idx - 1]

  players[idx - 1] = called
  players[idx] = front

  position.set(called, idx - 1)
  position.set(front, idx)
}
```

### Hình chốt cuối

```text
        CALL NAME
            ↓
      MAP: name → idx
            ↓
front = players[idx - 1]
            ↓
       SWAP ARRAY
            ↓
   UPDATE BOTH MAP ENTRIES
            ↓
          NEXT
```

[⬆ Quay lại Navigator](#-navigator--mobile-first)

---

---

# Bài 5 — 완주하지 못한 선수 (Vận động viên không hoàn thành)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42576

**Pattern:** Hash Map / Frequency Count / Multiset Difference  
**Trigger:** `hai danh sách gần giống nhau + có duplicate + thiếu đúng 1 phần tử`

## 1. Dịch đề tiếng Việt

Có rất nhiều vận động viên tham gia một cuộc thi marathon.

Ngoại trừ **một người duy nhất**, tất cả các vận động viên đều đã hoàn thành cuộc đua.

Cho:

- `participant`: mảng chứa tên **tất cả những người tham gia**.
- `completion`: mảng chứa tên **những người đã hoàn thành**.

Hãy trả về tên của vận động viên **không hoàn thành cuộc đua**.

### Giới hạn

- Số người tham gia: `1` đến `100,000`.
- `completion.length = participant.length - 1`.
- Mỗi tên dài từ `1` đến `20`, chỉ gồm chữ cái thường.
- **Có thể có nhiều vận động viên trùng tên.**

### Ví dụ 1

```js
participant = ["leo", "kiki", "eden"]
completion  = ["eden", "kiki"]
```

`leo` xuất hiện trong danh sách tham gia nhưng không xuất hiện trong danh sách hoàn thành.

Kết quả:

```text
"leo"
```

### Ví dụ 2

```js
participant = ["marina", "josipa", "nikola", "vinko", "filipa"]
completion  = ["josipa", "filipa", "marina", "nikola"]
```

Kết quả:

```text
"vinko"
```

### Ví dụ 3 — quan trọng nhất

```js
participant = ["mislav", "stanko", "mislav", "ana"]
completion  = ["stanko", "ana", "mislav"]
```

Trong `participant`:

```text
mislav = 2 người
```

Trong `completion`:

```text
mislav = 1 người
```

Vì vậy vẫn còn **một `mislav` chưa hoàn thành**.

Kết quả:

```text
"mislav"
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
participant = tất cả người tham gia
completion  = tất cả người hoàn thành
```

**Output**

```text
tên của đúng 1 người chưa hoàn thành
```

**Điều kiện bắt buộc**

```text
completion.length = participant.length - 1
```

và đặc biệt:

```text
CÓ THỂ TRÙNG TÊN
```

**Một câu chốt**

> Ta cần lấy **multiset participant - multiset completion**; phần tử còn dư chính là đáp án.

---

### STEP 2 — BOUND

```text
participant.length <= 100,000
```

Nếu dùng cách kiểu:

```js
completion.includes(name)
```

cho từng participant thì có thể thành:

```text
O(N²)
```

Tệ nhất khoảng:

```text
100,000 × 100,000
```

không ổn.

Ta nên hướng tới:

```text
O(N)
```

hoặc tối đa:

```text
O(N log N)
```

Với Map, lookup/update trung bình `O(1)` → tổng `O(N)`.

---

### STEP 3 — BRUTE FORCE

Cách nghĩ ngây thơ:

Với mỗi người trong `participant`:

```text
xem người đó có tồn tại trong completion không
```

Nhưng ngay lập tức gặp vấn đề duplicate.

Ví dụ:

```text
participant = [mislav, mislav]
completion  = [mislav]
```

Nếu chỉ hỏi:

```js
completion.includes("mislav")
```

thì cả hai lần đều trả `true`.

Ta không biết một `mislav` đã được “dùng” để match rồi.

Có thể xóa từng phần tử khỏi `completion`, nhưng search + splice nhiều lần sẽ chậm.

Vậy brute force cho ta thấy thứ cần nhớ thật sự không phải **có tồn tại không**, mà là:

> **Tên này còn bao nhiêu bản sao chưa được match?**

---

### STEP 4 — BOTTLENECK

Bottleneck là **duplicate accounting**.

Không thể chỉ lưu:

```text
name exists?
```

Ta phải lưu:

```text
name → count
```

Ví dụ:

```text
participant:

mislav → 2
stanko → 1
ana    → 1
```

Sau khi trừ `completion`:

```text
mislav → 1
stanko → 0
ana    → 0
```

Người còn count > 0 chính là người chưa finish.

Mental model:

```text
participant = nạp tiền +1
completion  = rút tiền  -1

ai còn số dư 1 → answer
```

---

### STEP 5 — STATE

Ta chỉ cần một state chính:

| State | Ý nghĩa |
|---|---|
| `count` | `Map<name, số lần còn dư>` |

Cách build:

```js
count.set(name, (count.get(name) ?? 0) + 1)
```

Sau đó với completion:

```js
count.set(name, count.get(name) - 1)
```

**State tối thiểu**

```text
Map name → frequency difference
```

Không cần:

```text
Set
visited
nested loop
sorting bắt buộc
```

---

### STEP 6 — TRANSITION

#### Phase 1 — participant vào Map

Mỗi participant:

```text
count[name] += 1
```

Ví dụ:

```text
mislav
→ 1

stanko
→ 1

mislav
→ 2

ana
→ 1
```

Map:

```text
mislav → 2
stanko → 1
ana    → 1
```

#### Phase 2 — completion trừ khỏi Map

Mỗi finisher:

```text
count[name] -= 1
```

```text
stanko → 0
ana    → 0
mislav → 1
```

Cuối cùng:

```text
mislav → 1
```

→ answer.

Transition code:

```js
for (const name of participant) {
  count.set(name, (count.get(name) ?? 0) + 1)
}

for (const name of completion) {
  count.set(name, count.get(name) - 1)
}
```

---

### STEP 7 — INVARIANT

Sau khi xử lý một phần dữ liệu:

> `count[name]` luôn bằng **số lần name đã xuất hiện trong participant đã xử lý − số lần name đã xuất hiện trong completion đã xử lý**.

Cuối toàn bộ quá trình:

```text
mọi người finish → count = 0
người thiếu duy nhất → count = 1
```

Ví dụ:

```text
mislav participant = 2
mislav completion  = 1

count[mislav] = 2 - 1 = 1
```

Đó là invariant giúp duplicate vẫn hoạt động chính xác.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Hash Map Frequency Count
```

Cụ thể hơn:

```text
Multiset Difference
```

Dấu hiệu nhận diện:

- Có hai collection gần giống nhau.
- Muốn tìm phần tử bị thiếu / dư.
- Có thể có duplicate.
- Cần giữ số lần xuất hiện.
- `N` lớn.

**Trigger sentence**

> “Hai danh sách lệch nhau về số lượng và có duplicate → Map frequency, một bên +1, bên kia -1.”

Phân biệt nhanh:

```text
chỉ quan tâm unique?      → Set
quan tâm số lần xuất hiện? → Map frequency
```

Bài này chắc chắn là vế 2.

---

### STEP 9 — COMPLEXITY

Gọi:

```text
N = participant.length
```

Build Map:

```text
O(N)
```

Trừ completion:

```text
O(N)
```

Tìm count còn lại:

```text
O(number of unique names) <= O(N)
```

Tổng:

```text
O(N)
```

Space:

```text
O(N)
```

cho Map trong trường hợp mọi tên đều khác nhau.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
participant = ["mislav", "stanko", "mislav", "ana"]
completion  = ["stanko", "ana", "mislav"]
```

### Phase participant

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `mislav` | `{}` | +1 | `mislav: 0→1` | chưa | participant tiếp | `{mislav:1}` |
| `stanko` | `{mislav:1}` | +1 | `stanko: 0→1` | chưa | tiếp | `{mislav:1, stanko:1}` |
| `mislav` | `mislav:1` | +1 | `mislav:1→2` | chưa | tiếp | `mislav:2` |
| `ana` | ... | +1 | `ana:0→1` | chưa | sang completion | `mislav:2, stanko:1, ana:1` |

### Phase completion

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `stanko` | `stanko:1` | -1 | `1→0` | chưa | tiếp | `stanko:0` |
| `ana` | `ana:1` | -1 | `1→0` | chưa | tiếp | `ana:0` |
| `mislav` | `mislav:2` | -1 | `2→1` | chưa | scan Map | `mislav:1` |

Cuối:

```text
mislav → 1
stanko → 0
ana    → 0
```

Answer:

```text
mislav
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Danh sách participant đi qua quầy đếm

```text
mislav  → +1
stanko  → +1
mislav  → +1
ana     → +1
```

Bảng:

```text
mislav : ██ 2
stanko : █  1
ana    : █  1
```

### Frame 2 — Completion đến lấy token đi

```text
stanko → -1
ana    → -1
mislav → -1
```

Bảng trở thành:

```text
mislav : █ 1
stanko :   0
ana    :   0
```

### Frame 3 — Một token còn lại

```text
         ┌───────────┐
mislav → │ 1 TOKEN   │ ← còn dư
         └───────────┘
```

Người có token còn dư chính là người chưa finish.

### Bộ phim đầy đủ

```text
PARTICIPANT
    ↓
name +1
    ↓
FREQUENCY MAP
    ↓
COMPLETION
    ↓
name -1
    ↓
SCAN MAP
    ↓
count > 0
    ↓
ANSWER
```

**Câu chuyện 1 dòng**

> “Mỗi người tham gia bỏ một vé vào hộp tên mình; mỗi người hoàn thành lấy một vé ra; hộp nào còn đúng một vé thì chủ hộp đó chưa hoàn thành.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(participant, completion) {
  const count = new Map()

  for (const name of participant) {
    count.set(name, (count.get(name) ?? 0) + 1)
  }

  for (const name of completion) {
    count.set(name, count.get(name) - 1)
  }

  for (const [name, value] of count) {
    if (value > 0) {
      return name
    }
  }
}
```

### Skeleton siêu ngắn

```js
const map = new Map()

for (const x of A) {
  map.set(x, (map.get(x) ?? 0) + 1)
}

for (const x of B) {
  map.set(x, map.get(x) - 1)
}

for (const [key, count] of map) {
  if (count > 0) return key
}
```

Đây là template tổng quát cho:

```text
A - B
```

khi có duplicate.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Ba loop tuần tự, **không nested**.

```text
participant → +1
completion  → -1
map         → tìm dư
```

### RESET WHEN

> Không reset Map giữa hai danh sách.

Map chính là ledger chung để participant và completion triệt tiêu nhau.

### INVALIDATES WHAT

> Dùng `Set` invalidate duplicate count.

Ví dụ:

```text
participant: mislav, mislav
completion : mislav
```

Set chỉ còn:

```text
{mislav}
```

không thể biết `2 - 1 = 1`.

### COMMIT WHEN

> Khi scan Map cuối cùng và gặp `count > 0`, có thể return ngay vì đề đảm bảo chỉ thiếu đúng một người.

```js
if (value > 0) return name
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng Set

Sai:

```js
const set = new Set(participant)
```

Vì duplicate bị gộp mất.

Bài này cần:

```text
frequency
```

không phải:

```text
existence
```

---

### Trap 2 — Dùng `includes` cho từng người

```js
participant.find(name => !completion.includes(name))
```

Sai cả về duplicate lẫn complexity.

`includes` không “consume” một occurrence.

---

### Trap 3 — Quên `?? 0`

Sai:

```js
count.set(name, count.get(name) + 1)
```

Nếu chưa có key:

```text
undefined + 1 = NaN
```

Đúng:

```js
count.set(name, (count.get(name) ?? 0) + 1)
```

---

### Trap 4 — Boolean hóa count

Không được nghĩ:

```text
name có hay không
```

Phải nghĩ:

```text
name còn bao nhiêu bản sao
```

Đặc biệt khi trùng tên.

---

### Trap 5 — Sorting cũng đúng nhưng không phải template Hash cần nhớ

Có thể:

```text
sort participant
sort completion
so từng index
```

Complexity:

```text
O(N log N)
```

và vẫn pass.

Nhưng nếu mục tiêu là recall pattern:

```text
duplicate + count difference
```

thì Map là template tổng quát hơn.

---

## 8. Recall 20 giây

> **Nhận diện:** hai list gần giống nhau + duplicate có thể xuất hiện + thiếu đúng một occurrence → `Map frequency`.

> **State:** `Map<name, count>`.

> **Transition:** participant `+1`, completion `-1`.

> **Invariant:** `count[name] = participant_seen(name) - completion_seen(name)`.

> **Answer:** cuối cùng key nào `count > 0`.

> **Trap lớn nhất:** **không dùng Set**, vì Set mất duplicate.

> **Complexity:** `O(N)` time, `O(N)` space.

### Code shape

```js
const count = new Map()

for (const name of participant) {
  count.set(name, (count.get(name) ?? 0) + 1)
}

for (const name of completion) {
  count.set(name, count.get(name) - 1)
}

for (const [name, value] of count) {
  if (value > 0) return name
}
```

### Hình chốt cuối

```text
PARTICIPANT
    ↓ +1
┌───────────────┐
│ name → count  │
└───────────────┘
    ↑ -1
COMPLETION

cuối cùng:

0  0  0  1
         ↑
       ANSWER
```

## 🧠 Một câu phải khắc vào đầu

> **“Có duplicate thì đừng hỏi ‘có hay không’; hãy hỏi ‘còn bao nhiêu’ — participant +1, completion -1.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)



---

---

# Bài 6 — 전화번호 목록 (Danh bạ điện thoại)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42577

**Pattern:** Hash Set + Prefix Enumeration  
**Trigger:** `N cực lớn, mỗi string ngắn → đưa full number vào Set, rồi kiểm tra mọi prefix ngắn hơn`

---

## 1. Dịch đề tiếng Việt

Ta muốn kiểm tra trong một danh bạ điện thoại xem có trường hợp **một số điện thoại là tiền tố (prefix) của một số điện thoại khác** hay không.

Ví dụ:

```text
119
97674223
1195524421
```

`119` là prefix của `1195524421`.

Nếu tồn tại ít nhất một cặp như vậy → return:

```text
false
```

Nếu không → return:

```text
true
```

### Giới hạn

```text
1 <= phone_book.length <= 1,000,000
1 <= phone_book[i].length <= 20
```

- Không có hai số giống hệt nhau.
- Số điện thoại được lưu dưới dạng string.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Cần phát hiện có tồn tại:

```text
a != b
```

sao cho:

```js
b.startsWith(a)
```

Chỉ cần tìm thấy một case là return `false`.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
L <= 20
```

Điểm quan trọng:

- `N` cực lớn
- nhưng mỗi số điện thoại rất ngắn

Không nên làm:

```text
O(N²)
```

Và với JavaScript, **sort 1,000,000 string rồi scan** có thể không phải lựa chọn an toàn nhất về thời gian/memory.

Ta tận dụng:

```text
L <= 20
```

---

### STEP 3 — BRUTE FORCE

Sai vì quá chậm:

```js
for (let i = 0; i < phone_book.length; i++) {
  for (let j = 0; j < phone_book.length; j++) {
    if (
      i !== j &&
      phone_book[j].startsWith(phone_book[i])
    ) {
      return false
    }
  }
}
```

Worst case:

```text
O(N² × L)
```

---

### STEP 4 — BOTTLENECK

Ta không cần so từng số với mọi số khác.

Nếu:

```text
phone = "1195524421"
```

thì các candidate có thể là prefix của nó chỉ là:

```text
"1"
"11"
"119"
"1195"
...
```

Tối đa chỉ:

```text
L - 1 <= 19
```

prefix.

Nếu toàn bộ số điện thoại đã nằm trong:

```js
Set
```

thì mỗi prefix chỉ cần hỏi:

```js
set.has(prefix)
```

---

### STEP 5 — STATE

```js
const phoneSet = new Set(phone_book)
```

Với mỗi số:

```js
phone
```

thử mọi prefix ngắn hơn chính nó.

---

### STEP 6 — TRANSITION

```js
for (const phone of phone_book) {
  for (let len = 1; len < phone.length; len++) {
    const prefix = phone.slice(0, len)

    if (phoneSet.has(prefix)) {
      return false
    }
  }
}
```

Scan xong không thấy:

```js
return true
```

---

### STEP 7 — INVARIANT

Với một `phone` đang xét:

> Ta đã kiểm tra toàn bộ prefix có độ dài nhỏ hơn vị trí hiện tại và chưa prefix nào tồn tại trong danh bạ.

Nếu có một số khác là prefix của `phone`, nó bắt buộc phải bằng một trong:

```text
phone.slice(0, 1)
phone.slice(0, 2)
...
phone.slice(0, phone.length - 1)
```

Nên cách check là đầy đủ.

---

### STEP 8 — PATTERN

**Pattern chính:** Hash Set + Prefix Enumeration.

Dấu hiệu:

- N rất lớn
- string ngắn
- cần membership lookup
- candidate relation có thể generate trực tiếp từ từng string

Trigger sentence:

> “N lớn nhưng string ngắn → generate tối đa L prefix rồi `Set.has()`.”

### So với sort

Sort + adjacent check là **đúng về logic**, nhưng với JavaScript và N rất lớn, bản Hash Set này an toàn hơn cho recall thi.

---

### STEP 9 — COMPLEXITY

Mỗi số dài tối đa 20.

Ta tạo tối đa 19 prefix.

Về số lần lookup:

```text
O(N × L)
```

Với `L <= 20`, gần tuyến tính theo N.

Lưu ý: tạo `slice()` có cost theo độ dài prefix, nên chặt hơn có thể xem là `O(N × L²)`, nhưng `L = 20` là hằng số rất nhỏ.

Space:

```text
O(N)
```

cho `Set`.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
phone_book = ["119", "97674223", "1195524421"]
```

Set:

```text
{
  "119",
  "97674223",
  "1195524421"
}
```

Xét:

```text
"1195524421"
```

| len | prefix | Set.has? | Action |
|---:|---|---|---|
| 1 | `"1"` | false | tiếp |
| 2 | `"11"` | false | tiếp |
| 3 | `"119"` | true | return false |

---

## 4. Bộ phim hình ảnh

Thay vì hỏi:

> `"119"` có phải prefix của một triệu số khác không?

Ta đảo góc nhìn.

Với mỗi số dài:

```text
1195524421
```

ta tự sinh ra:

```text
1
11
119
1195
...
```

rồi hỏi:

```text
prefix này có nằm trong danh bạ không?
```

**Câu chuyện 1 dòng**

> “Đừng đem một số đi so với cả thế giới; tự bóc từng prefix của nó rồi hỏi Set.”

---

## 5. Code Skeleton Recall

```js
function solution(phone_book) {
  const phoneSet = new Set(phone_book)

  for (const phone of phone_book) {
    for (let len = 1; len < phone.length; len++) {
      const prefix = phone.slice(0, len)

      if (phoneSet.has(prefix)) {
        return false
      }
    }
  }

  return true
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for each phone
    for prefix length 1 .. phone.length - 1
        check Set
```

### RESET WHEN

Mỗi `phone` bắt đầu lại:

```text
len = 1
```

Không có state phức tạp.

### INVALIDATES WHAT

Ngay khi:

```js
phoneSet.has(prefix)
```

→ tìm được prefix conflict → return `false`.

### COMMIT WHEN

Scan hết tất cả số mà không conflict:

```js
return true
```

---

## 7. Trap dễ chết

### Trap 1 — Check full string luôn

Nếu loop:

```js
len <= phone.length
```

thì `phoneSet.has(phone)` luôn true vì chính nó có trong Set.

Phải:

```js
len < phone.length
```

---

### Trap 2 — Dùng `includes`

Sai ý nghĩa.

Ta cần:

```text
prefix
```

không phải substring bất kỳ.

---

### Trap 3 — Nested pair comparison

```text
O(N²)
```

chết với N lớn.

---

### Trap 4 — Dùng Number thay string

Số điện thoại là string; convert sang number có thể làm mất leading zero và không cần thiết.

---

### Trap 5 — Nhớ nhầm bản sort là lựa chọn mặc định

Sort + adjacent vẫn đúng về mặt thuật toán, nhưng trong file recall JS cuối cùng:

> **ưu tiên Hash Set + Prefix Enumeration**

vì constraint:

```text
N <= 1,000,000
L <= 20
```

---

## 8. Recall 20 giây

> **Nhận diện:** N cực lớn nhưng mỗi string ngắn, hỏi prefix membership.

> **State:** `Set(phone_book)`.

> **Transition:** với mỗi phone, thử `slice(0, len)` cho `len = 1..length-1`.

> **Invalidation:** `set.has(prefix)` → `false`.

> **Commit:** hết tất cả → `true`.

> **Complexity:** khoảng `O(N × L)` lookup; `L <= 20`.

### Code shape

```js
const set = new Set(phone_book)

for (const phone of phone_book) {
  for (let len = 1; len < phone.length; len++) {
    if (set.has(phone.slice(0, len))) {
      return false
    }
  }
}

return true
```

## 🧠 Một câu phải khắc vào đầu

> **“N lớn, string ngắn: cho full number vào Set, rồi bóc từng prefix ngắn hơn để hỏi `has()`.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)

---

---

# Bài 7 — 의상 (Clothes)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42578

**Pattern:** Hash Map / Counting / Product Rule  
**Trigger:** `mỗi loại chọn tối đa 1 món → mỗi loại có count + 1 lựa chọn → nhân → trừ 1`

---

## 1. Dịch đề tiếng Việt

Conny thích mỗi ngày mặc một cách phối đồ khác nhau.

Ví dụ, Conny có các loại đồ như sau:

| Loại | Trang phục |
|---|---|
| Mặt | kính tròn, kính râm đen |
| Áo | áo phông xanh |
| Quần | quần jeans |
| Áo khoác | áo khoác dài |

Nếu hôm nay Conny mặc:

```text
kính tròn
+
áo khoác dài
+
áo phông xanh
```

thì ngày hôm sau chỉ cần thay đổi ít nhất một chi tiết, ví dụ:

- mặc thêm quần jeans
- hoặc đổi kính tròn thành kính râm đen
- hoặc thay đổi một món khác

thì được tính là một cách phối đồ khác.

### Quy tắc

- Với mỗi loại trang phục, Conny chỉ được mặc **tối đa 1 món** thuộc loại đó.
- Có thể có nhiều loại cùng được mặc trong một outfit.
- Hai outfit được coi là khác nhau nếu có ít nhất một món khác nhau hoặc một outfit có thêm/bớt một loại đồ.
- Mỗi ngày Conny phải mặc **ít nhất một món**.

Cho mảng hai chiều:

```text
clothes
```

trong đó mỗi phần tử có dạng:

```text
[tên_trang_phục, loại_trang_phục]
```

Hãy return số cách phối đồ khác nhau có thể tạo ra.

### Giới hạn

- `1 <= clothes.length <= 30`
- Không có hai món có cùng tên.
- Mỗi phần tử là string.
- Mỗi chuỗi dài từ `1` đến `20`.

### Ví dụ 1

```js
clothes = [
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear"]
]
```

Có:

```text
headgear: 2 món
eyewear : 1 món
```

Các outfit hợp lệ:

```text
1. yellow_hat
2. green_turban
3. blue_sunglasses
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses
```

Kết quả:

```text
5
```

### Ví dụ 2

```js
[
  ["crow_mask", "face"],
  ["blue_sunglasses", "face"],
  ["smoky_makeup", "face"]
]
```

Chỉ có một loại `face`, và có 3 món.

Mỗi outfit chỉ được chọn tối đa 1 món thuộc `face`.

Kết quả:

```text
3
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
clothes = [
  [name, type],
  ...
]
```

**Output**

```text
số outfit khác nhau
```

**Điều kiện bắt buộc**

Với mỗi `type`:

```text
chọn 0 món
hoặc
chọn đúng 1 món
```

Không được chọn 2 món cùng loại.

Toàn bộ outfit không được là:

```text
không mặc gì
```

**Một câu chốt**

> Đếm số món của từng loại, rồi với mỗi loại tính số lựa chọn là `count + 1` (chọn một món hoặc không chọn loại đó), nhân tất cả, cuối cùng trừ 1 trường hợp không mặc gì.

---

### STEP 2 — BOUND

```text
clothes.length <= 30
```

Rất nhỏ.

Performance không phải vấn đề.

Vấn đề thật sự là nhận ra **quy tắc đếm**.

Ta có thể brute force subset với tối đa 30 món:

```text
2^30
```

là quá lớn nếu enumerate thật.

Nhưng bài có structure theo **category**, cho phép rút gọn bằng product rule.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
liệt kê mọi subset quần áo
↓
lọc những subset:
- không rỗng
- không có 2 món cùng loại
↓
đếm
```

Nếu có `N` món:

```text
2^N
```

subset.

Với `N = 30`:

```text
2^30 ≈ 1 tỷ
```

không cần thiết.

---

### STEP 4 — BOTTLENECK

Ta đang nghĩ theo từng món riêng lẻ, trong khi rule lại phụ thuộc vào **loại**.

Ví dụ:

```text
headgear: 2 món
eyewear : 1 món
```

Với `headgear`, các lựa chọn thực tế là:

```text
1. không mặc headgear
2. yellow_hat
3. green_turban
```

Tức:

```text
2 + 1 = 3 lựa chọn
```

Với `eyewear`:

```text
1. không mặc eyewear
2. blue_sunglasses
```

Tức:

```text
1 + 1 = 2 lựa chọn
```

Hai category độc lập với nhau.

Do đó:

```text
3 × 2 = 6
```

Nhưng một trong 6 là:

```text
không headgear
+
không eyewear
=
không mặc gì
```

không hợp lệ.

Vậy:

```text
6 - 1 = 5
```

---

### STEP 5 — STATE

Ta chỉ cần một Map:

```text
type → số món thuộc type đó
```

Ví dụ:

```text
headgear → 2
eyewear  → 1
```

và:

```text
answer
```

để nhân dần.

| State | Ý nghĩa |
|---|---|
| `countByType` | số món của mỗi loại |
| `answer` | tích số lựa chọn đã xử lý |

**State tối thiểu**

```text
frequency by category
+
running product
```

---

### STEP 6 — TRANSITION

### Phase 1 — Đếm theo loại

Với mỗi:

```js
[name, type]
```

ta chỉ quan tâm `type`:

```js
countByType.set(
  type,
  (countByType.get(type) ?? 0) + 1
)
```

### Phase 2 — Nhân số lựa chọn

Khởi tạo:

```js
let answer = 1
```

Với mỗi category có `count` món:

```js
answer *= (count + 1)
```

Tại sao `+1`?

Vì:

```text
count cách chọn 1 món
+
1 cách không chọn món nào của type này
```

Cuối cùng:

```js
return answer - 1
```

Trừ:

```text
không chọn gì ở tất cả category
```

---

### STEP 7 — INVARIANT

Sau khi xử lý `k` category:

> `answer` luôn bằng số cách chọn hợp lệ từ `k` category đó nếu **cho phép** trường hợp không mặc gì.

Ví dụ sau `headgear`:

```text
answer = 3
```

Sau thêm `eyewear`:

```text
answer = 3 × 2 = 6
```

Đến cuối mới remove đúng một invalid case:

```text
all-none
```

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Group by category
+
Multiplication Principle
```

Dấu hiệu nhận diện:

- Item được chia thành nhiều loại/category.
- Mỗi category chọn tối đa 1.
- Có thể chọn đồng thời từ nhiều category.
- Các category độc lập.
- Hỏi số cách kết hợp.
- Có rule “ít nhất một món”.

**Trigger sentence**

> “Mỗi loại chọn 0 hoặc 1 món → loại có `count` món thì có `count + 1` lựa chọn → nhân tất cả → trừ 1.”

Mental model:

```text
CATEGORY A: [a1, a2]
choices = NONE, a1, a2
          = 3

CATEGORY B: [b1]
choices = NONE, b1
          = 2

TOTAL = 3 × 2 = 6
REMOVE NONE+NONE
= 5
```

---

### STEP 9 — COMPLEXITY

Đếm quần áo:

```text
O(N)
```

Duyệt các category:

```text
O(K)
```

với:

```text
K <= N
```

Tổng:

```text
O(N)
```

Space:

```text
O(K)
```

cho Map.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
[
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear"]
]
```

### Sau phase đếm

```text
headgear → 2
eyewear  → 1
```

### Phase nhân

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `headgear=2` | `answer=1` | có `2+1=3` lựa chọn | `1 × 3` | yes | category tiếp | `3` |
| `eyewear=1` | `answer=3` | có `1+1=2` lựa chọn | `3 × 2` | yes | hết | `6` |
| remove all-none | `6` | trừ outfit không mặc gì | `6 - 1` | final | — | `5` |

Kết quả:

```text
5
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Gom đồ vào từng tủ

```text
HEADGEAR
├─ yellow_hat
└─ green_turban

EYEWEAR
└─ blue_sunglasses
```

### Frame 2 — Mỗi tủ có thêm nút NONE

```text
HEADGEAR
├─ NONE
├─ yellow_hat
└─ green_turban

= 3 choices
```

```text
EYEWEAR
├─ NONE
└─ blue_sunglasses

= 2 choices
```

### Frame 3 — Ghép lựa chọn giữa các tủ

```text
3 × 2 = 6
```

### Frame 4 — Có một combo xấu

```text
HEADGEAR = NONE
EYEWEAR  = NONE
```

Đây là:

```text
không mặc gì
```

invalid.

### Frame 5 — Trừ đúng 1

```text
6 - 1 = 5
```

**Câu chuyện 1 dòng**

> “Mỗi loại là một tủ: chọn một món trong tủ hoặc đóng tủ không lấy gì; nhân số lựa chọn của các tủ rồi bỏ đúng combo tất cả tủ đều đóng.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(clothes) {
  const countByType = new Map()

  for (const [name, type] of clothes) {
    countByType.set(
      type,
      (countByType.get(type) ?? 0) + 1
    )
  }

  let answer = 1

  for (const count of countByType.values()) {
    answer *= (count + 1)
  }

  return answer - 1
}
```

### Skeleton siêu ngắn

```js
const map = new Map()

for (const [, type] of clothes) {
  map.set(type, (map.get(type) ?? 0) + 1)
}

let answer = 1

for (const count of map.values()) {
  answer *= count + 1
}

return answer - 1
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Hai loop tuần tự.

```text
clothes → build frequency Map
map.values() → multiply choices
```

Không nested.

### RESET WHEN

> Không reset Map.

Mỗi item chỉ cộng vào category của nó.

`answer` bắt đầu từ:

```text
1
```

không phải `0`.

### INVALIDATES WHAT

> Quên `+1` sẽ bỏ mất lựa chọn “không mặc loại này”.

> Quên `-1` cuối cùng sẽ tính cả outfit “không mặc gì”.

### COMMIT WHEN

> Mỗi category được commit vào answer bằng phép nhân:

```js
answer *= count + 1
```

Sau khi xử lý hết:

```js
return answer - 1
```

---

## 7. Trap dễ chết

### Trap 1 — `answer = 0`

Sai:

```js
let answer = 0
answer *= ...
```

vì:

```text
0 × anything = 0
```

Đúng:

```js
let answer = 1
```

### Trap 2 — Quên `+1`

Nếu category có 2 món:

```text
a
b
```

không phải chỉ có 2 choices.

Có:

```text
NONE
a
b
```

→ `3`.

### Trap 3 — Quên `-1`

Product đã tính:

```text
NONE ở mọi category
```

Phải trừ đúng 1.

### Trap 4 — Cộng thay vì nhân

Sai:

```text
(countA + 1) + (countB + 1)
```

Vì lựa chọn giữa category là độc lập và kết hợp với nhau.

Phải:

```text
(countA + 1) × (countB + 1)
```

### Trap 5 — Đếm theo tên thay vì type

Tên item là unique nên không giúp group.

Key phải là:

```text
type
```

không phải:

```text
name
```

### Trap 6 — Nghĩ phải enumerate outfit

Không cần.

Bài là counting formula, không phải generate combination.

---

## 8. Recall 20 giây

> **Nhận diện:** item chia theo category + mỗi category chọn tối đa 1 + hỏi số cách phối.

> **State:** `Map<type, count>`.

> **Transition:** mỗi item → `count[type]++`.

> **Formula:** mỗi type có `count + 1` choices.

> **Combine:** nhân tất cả choices.

> **Remove invalid:** `-1` cho trường hợp không mặc gì.

> **Complexity:** `O(N)`.

### Code shape

```js
const map = new Map()

for (const [, type] of clothes) {
  map.set(type, (map.get(type) ?? 0) + 1)
}

let answer = 1

for (const count of map.values()) {
  answer *= count + 1
}

return answer - 1
```

### Hình chốt cuối

```text
TYPE A: count = a
choices = a + 1

TYPE B: count = b
choices = b + 1

TYPE C: count = c
choices = c + 1

TOTAL
=
(a+1)(b+1)(c+1)

↓
remove ALL NONE

ANSWER
=
TOTAL - 1
```

## 🧠 Một câu phải khắc vào đầu

> **“Mỗi loại: mặc một món hoặc không mặc → `count + 1`; các loại độc lập nên nhân; không được naked nên trừ 1.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 8 — 가장 큰 수 (Số lớn nhất)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42746

**Pattern:** Sorting / Custom Comparator  
**Trigger:** `ghép các số thành số lớn nhất → với a,b so a+b và b+a`

---

## 1. Dịch đề tiếng Việt

Cho một mảng gồm các số nguyên `0` hoặc số nguyên dương.

Hãy sắp xếp lại thứ tự các số rồi **nối chúng lại với nhau** để tạo ra số lớn nhất có thể.

Ví dụ:

```js
numbers = [6, 10, 2]
```

Ta có thể tạo ra:

```text
6102
6210
1062
1026
2610
2106
```

Trong đó số lớn nhất là:

```text
6210
```

Cho mảng:

```text
numbers
```

hãy sắp xếp lại thứ tự các phần tử để tạo ra số lớn nhất có thể và return kết quả dưới dạng **string**.

### Giới hạn

```text
1 <= numbers.length <= 100,000
0 <= numbers[i] <= 1,000
```

Kết quả có thể rất lớn nên phải return string.

### Ví dụ

```js
[6, 10, 2]
```

→

```text
"6210"
```

```js
[3, 30, 34, 5, 9]
```

→

```text
"9534330"
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
numbers = array<number>
```

**Output**

```text
string biểu diễn số lớn nhất sau khi reorder + concatenate
```

**Điều kiện bắt buộc**

Ta được phép:

```text
reorder
```

nhưng không được thay đổi chữ số bên trong từng number.

Ví dụ:

```text
34
```

phải giữ nguyên `"34"`.

**Một câu chốt**

> Ta cần tìm thứ tự giữa mọi cặp số sao cho khi ghép liên tiếp, kết quả toàn cục là lớn nhất.

---

### STEP 2 — BOUND

```text
N <= 100,000
```

Không thể thử mọi permutation:

```text
N!
```

Phải sort với một comparator đặc biệt.

Target complexity:

```text
O(N log N)
```

### Vì sao phải đổi sang string?

Bài toán không quan tâm giá trị riêng của từng số.

Nó quan tâm:

```text
cách ghép chuỗi
```

Ví dụ:

```text
3 và 30
```

không thể quyết định bằng:

```text
3 > 30
```

Ta phải nhìn:

```text
330
303
```

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
generate mọi permutation
↓
join từng permutation
↓
lấy max
```

Nếu có `N` số:

```text
N!
```

Với:

```text
N = 100,000
```

hoàn toàn không thể.

---

### STEP 4 — BOTTLENECK

Bottleneck là:

> Với hai số `a` và `b`, số nào phải đứng trước?

Không thể sort giảm dần theo numeric value.

Ví dụ:

```text
3
30
```

Numeric descending sẽ cho:

```text
30, 3
```

→

```text
303
```

Nhưng:

```text
3, 30
```

→

```text
330
```

lớn hơn.

### Quy tắc đúng

Với:

```text
a
b
```

so:

```text
a + b
```

với:

```text
b + a
```

Nếu:

```text
a+b > b+a
```

thì:

```text
a đứng trước b
```

Ngược lại:

```text
b đứng trước a
```

Ví dụ:

```text
a = "3"
b = "30"
```

Ta có:

```text
a+b = "330"
b+a = "303"
```

Vì:

```text
330 > 303
```

nên:

```text
3 đứng trước 30
```

---

### STEP 5 — STATE

Ta không cần nhiều state.

Chỉ cần:

| State | Ý nghĩa |
|---|---|
| `strings` | numbers sau khi convert sang string |
| comparator | quyết định thứ tự hai string |
| `result` | string sau join |

State quan trọng nhất nằm **bên trong comparator**:

```text
a+b
b+a
```

---

### STEP 6 — TRANSITION

### Phase 1 — Convert

```js
numbers.map(String)
```

Ví dụ:

```text
[3, 30, 34]
```

→

```text
["3", "30", "34"]
```

### Phase 2 — Sort

Comparator:

```js
(a, b) => (b + a).localeCompare(a + b)
```

Mental meaning:

```text
Nếu b+a lớn hơn a+b
→ b phải đi trước a
```

Ví dụ:

```text
a = "3"
b = "30"

b+a = "303"
a+b = "330"
```

Comparator đưa `"3"` trước `"30"`.

### Phase 3 — Join

```js
.join("")
```

### Phase 4 — Fix all-zero case

Ví dụ:

```js
[0, 0, 0]
```

Sau join:

```text
"000"
```

Nhưng answer chuẩn phải là:

```text
"0"
```

Do sort đã đưa số lớn nhất lên đầu, nếu:

```js
result[0] === "0"
```

thì toàn bộ các số đều là `0`.

Return:

```js
"0"
```

---

### STEP 7 — INVARIANT

Sau sort:

> Với mọi cặp liền kề `a,b`, đặt `a` trước `b` không làm kết quả nhỏ hơn đặt `b` trước `a`.

Tức là:

```text
a + b >= b + a
```

theo thứ tự comparator đã chọn.

### Local decision → global answer

Nếu một cặp đang đứng:

```text
b, a
```

nhưng:

```text
a+b > b+a
```

thì đổi thành:

```text
a, b
```

sẽ làm toàn bộ số lớn hơn.

Vì vậy comparator pairwise này là đủ để sort toàn cục.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Custom Comparator by concatenation
```

Dấu hiệu nhận diện:

- Cho nhiều số/string.
- Được reorder.
- Kết quả tạo bằng cách concatenate.
- Hỏi lớn nhất / nhỏ nhất.
- Numeric sort không phản ánh contribution sau ghép.

**Trigger sentence**

> “Ghép số để max → với mỗi `a,b`, hỏi `ab` hay `ba` lớn hơn.”

Code shape phải bật ra:

```js
.map(String)
.sort((a, b) => (b + a).localeCompare(a + b))
.join("")
```

---

### STEP 9 — COMPLEXITY

Convert:

```text
O(N)
```

Sort:

```text
O(N log N)
```

Mỗi comparator ghép string có độ dài rất nhỏ vì:

```text
numbers[i] <= 1000
```

Join:

```text
O(total digits)
```

Tổng:

```text
O(N log N)
```

Space:

```text
O(N)
```

cho array string / sort runtime.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
numbers = [3, 30, 34, 5, 9]
```

Convert:

```text
["3", "30", "34", "5", "9"]
```

Một vài comparison quan trọng:

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `"3"` vs `"30"` | chưa rõ order | so `"330"` và `"303"` | `"3"` trước `"30"` | chưa | comparator khác | `3 > 30` |
| `"34"` vs `"3"` | chưa rõ order | so `"343"` và `"334"` | `"34"` trước `"3"` | chưa | tiếp | `34 > 3` |
| `"5"` vs `"34"` | chưa rõ order | so `"534"` và `"345"` | `"5"` trước `"34"` | chưa | tiếp | `5 > 34` |
| `"9"` vs `"5"` | chưa rõ order | so `"95"` và `"59"` | `"9"` trước `"5"` | chưa | sort xong | `9 > 5` |

Sorted:

```text
["9", "5", "34", "3", "30"]
```

Join:

```text
"9534330"
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Hai tấm thẻ số

```text
[ 3 ]    [ 30 ]
```

Không hỏi:

```text
3 lớn hơn 30 không?
```

Mà thử ghép theo hai hướng.

### Frame 2 — Ghép A trước B

```text
3 + 30
↓
330
```

### Frame 3 — Ghép B trước A

```text
30 + 3
↓
303
```

### Frame 4 — Chọn hướng thắng

```text
330 > 303
```

nên:

```text
[3][30]
```

### Frame 5 — Comparator làm việc với mọi cặp

```text
9
5
34
3
30
```

### Frame 6 — Join

```text
9 | 5 | 34 | 3 | 30
↓
9534330
```

**Câu chuyện 1 dòng**

> “Mỗi khi hai thẻ tranh nhau vị trí, ghép thử theo cả hai hướng; hướng nào tạo số lớn hơn thì thẻ ở đầu hướng đó được đứng trước.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(numbers) {
  const result = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join("")

  return result[0] === "0" ? "0" : result
}
```

### Bản comparator viết rõ

```js
function solution(numbers) {
  const arr = numbers.map(String)

  arr.sort((a, b) => {
    const ab = a + b
    const ba = b + a

    return ba.localeCompare(ab)
  })

  const result = arr.join("")

  if (result[0] === "0") {
    return "0"
  }

  return result
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Không tự viết nested loop.

Shape:

```text
map String
↓
sort comparator
↓
join
↓
zero fix
```

### RESET WHEN

> Không có state phải reset.

Comparator phải luôn tính từ chính:

```text
a
b
```

của lần compare hiện tại.

### INVALIDATES WHAT

> Sort numeric hoặc lexicographic trực tiếp đều có thể sai.

Phải compare:

```text
a+b
vs
b+a
```

### COMMIT WHEN

> Sau khi sort xong mới join.

Sau join nhớ normalize all-zero case:

```js
result[0] === "0" ? "0" : result
```

---

## 7. Trap dễ chết

### Trap 1 — Sort numeric descending

Sai:

```js
numbers.sort((a, b) => b - a)
```

Ví dụ:

```text
[3, 30]
```

sẽ cho:

```text
30,3 → "303"
```

nhưng đúng:

```text
3,30 → "330"
```

---

### Trap 2 — Sort string mặc định

Sai:

```js
numbers.map(String).sort().reverse()
```

Lexicographic riêng lẻ không đủ.

Ta cần lexicographic trên:

```text
a+b
b+a
```

---

### Trap 3 — Comparator bị đảo chiều

Muốn **largest number**, code dễ nhớ:

```js
(b + a).localeCompare(a + b)
```

Nếu viết:

```js
(a + b).localeCompare(b + a)
```

thì order sẽ bị đảo.

### Cách tự kiểm tra trong 5 giây

Dùng:

```text
3 và 30
```

Expected:

```text
3 phải đứng trước 30
```

Nếu comparator của mày cho `30` trước `3` → đảo rồi.

---

### Trap 4 — Convert concatenation thành Number

Không cần:

```js
Number(a + b)
```

Giá trị kết quả cuối có thể rất lớn.

So string là đủ vì `a+b` và `b+a` có **cùng độ dài**.

---

### Trap 5 — All zeros

Input:

```js
[0, 0]
```

Join bình thường:

```text
"00"
```

Expected:

```text
"0"
```

Fix:

```js
return result[0] === "0" ? "0" : result
```

---

### Trap 6 — Nghĩ comparator phải so chữ số đầu tiên

Ví dụ:

```text
3
34
```

Cùng bắt đầu bằng `3`, nên first digit không quyết định đủ.

Phải so:

```text
334
343
```

Do:

```text
343 > 334
```

nên:

```text
34 trước 3
```

---

## 8. Recall 20 giây

> **Nhận diện:** reorder numbers rồi concatenate để tạo số lớn nhất → custom comparator.

> **State comparator:** với `a,b`, tạo `ab = a+b`, `ba = b+a`.

> **Transition:** nếu `ba` nên lớn hơn thì `b` đứng trước `a`.

> **Comparator JS:** `(b+a).localeCompare(a+b)`.

> **Commit:** sort xong → join.

> **Edge case:** nếu ký tự đầu result là `"0"` → return `"0"`.

> **Complexity:** `O(N log N)`.

### Code shape

```js
const result = numbers
  .map(String)
  .sort((a, b) => (b + a).localeCompare(a + b))
  .join("")

return result[0] === "0" ? "0" : result
```

### Hình chốt cuối

```text
a      b
 \    /
  \  /
   \/ 
 compare

a+b    b+a
 |       |
 └── MAX ┘
     ↓
winner đứng trước

SORT ALL
↓
JOIN
↓
ALL ZERO?
↓
ANSWER
```

## 🧠 Một câu phải khắc vào đầu

> **“Không hỏi a hay b lớn hơn; hỏi ghép `ab` hay `ba` lớn hơn.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 14 — 구명보트 (Xuồng cứu sinh)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42885

**Pattern:** Greedy + Two Pointers  
**Trigger:** `mỗi thuyền tối đa 2 người + giới hạn cân nặng → sort → xử lý người nặng nhất trước`

---

## 1. Dịch đề tiếng Việt

Ta cần cứu tất cả những người bị mắc kẹt trên đảo bằng xuồng cứu sinh.

Mỗi xuồng:

- chở tối đa **2 người**
- tổng cân nặng của những người trên xuồng không được vượt quá `limit`

Ví dụ:

```js
people = [70, 50, 80, 50]
limit = 100
```

Hai người `50 + 50` có thể đi cùng nhau.

Nhưng:

```text
70 + 80 = 150
```

vượt quá giới hạn nên không thể đi chung.

Mục tiêu là:

> dùng **ít xuồng nhất có thể** để cứu toàn bộ mọi người.

Cho:

```text
people
```

là cân nặng của mỗi người,

và:

```text
limit
```

là giới hạn cân nặng của một xuồng.

Hãy return số xuồng ít nhất cần dùng.

### Giới hạn

```text
1 <= people.length <= 50,000
40 <= people[i] <= 240
40 <= limit <= 240
```

Đề đảm bảo:

```text
max(people) <= limit
```

nên luôn có thể cứu tất cả mọi người.

### Ví dụ 1

```js
people = [70,50,80,50]
limit = 100
```

Kết quả:

```text
3
```

Một cách tối ưu:

```text
50 + 50
70
80
```

### Ví dụ 2

```js
people = [70,80,50]
limit = 100
```

Không ai ghép được với ai:

```text
70 + 50 = 120
80 + 50 = 130
```

→ mỗi người một xuồng.

Kết quả:

```text
3
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
people[]
limit
```

**Output**

```text
minimum number of boats
```

Mỗi boat:

```text
1 hoặc 2 người
```

và:

```text
sum weights <= limit
```

**Một câu chốt**

> Mỗi lượt chắc chắn phải đưa người nặng nhất còn lại đi; nếu họ còn ghép được với người nhẹ nhất thì ghép, nếu nhẹ nhất cũng không ghép được thì người nặng nhất buộc phải đi một mình.

---

### STEP 2 — BOUND

```text
N <= 50,000
```

Không thể thử mọi cách pairing:

```text
O(N²)
```

hoặc backtracking.

Ta cần:

```text
O(N log N)
```

do sort,

sau đó:

```text
O(N)
```

two pointers.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
chọn người A
thử ghép với mọi người B
chọn pairing tốt nhất
```

Hoặc generate matching.

Nhưng số cách pair tăng rất nhanh.

Không cần thiết.

Bài có greedy structure rất rõ vì mỗi boat tối đa 2 người.

---

### STEP 4 — BOTTLENECK

Ta phải quyết định:

> người nặng nhất nên đi với ai?

Giả sử array đã sort:

```text
lightest ........ heaviest
```

Người nặng nhất:

```text
people[right]
```

chắc chắn phải đi trong một boat nào đó.

Có hai khả năng:

```text
1. đi một mình
2. đi với đúng 1 người khác
```

Nếu ngay cả người nhẹ nhất:

```text
people[left]
```

mà:

```text
people[left] + people[right] > limit
```

thì không có ai khác ghép được với heaviest.

Vì tất cả người khác đều nặng hơn hoặc bằng `people[left]`.

Do đó:

```text
heaviest buộc phải đi một mình
```

Ngược lại, nếu:

```text
lightest + heaviest <= limit
```

thì ghép lightest với heaviest là an toàn và tối ưu.

Vì người nặng nhất đã phải dùng một boat rồi; nếu có thể tận dụng chỗ trống để mang thêm người nhẹ nhất thì ta giảm được một người chưa cứu mà không tăng boat.

---

### STEP 5 — STATE

Sau sort cần:

| State | Ý nghĩa |
|---|---|
| `left` | người nhẹ nhất chưa cứu |
| `right` | người nặng nhất chưa cứu |
| `boats` | số xuồng đã dùng |

Khởi tạo:

```js
let left = 0
let right = people.length - 1
let boats = 0
```

---

### STEP 6 — TRANSITION

Mỗi vòng:

```text
heaviest = people[right]
lightest = people[left]
```

### Nếu ghép được

```js
if (people[left] + people[right] <= limit) {
  left++
}
```

Người nhẹ nhất đã được cứu cùng người nặng nhất.

### Dù ghép được hay không

Người nặng nhất luôn đi chuyến này:

```js
right--
boats++
```

Đây là chỗ phải nhớ cực rõ:

> `right--` và `boats++` xảy ra **mọi vòng**.

Loop:

```js
while (left <= right)
```

---

### STEP 7 — INVARIANT

Trước mỗi vòng:

> Mọi người ngoài đoạn `[left, right]` đã được xếp xuồng tối ưu.

Và:

> `people[right]` là người nặng nhất chưa cứu, nên chắc chắn phải được xử lý ngay trong vòng hiện tại.

Nếu:

```text
people[left] + people[right] > limit
```

thì heaviest không thể ghép với bất kỳ ai.

Nếu:

```text
<= limit
```

thì lightest + heaviest là một pairing hợp lệ và không làm hỏng phương án tối ưu.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Greedy + Two Pointers after sorting
```

Dấu hiệu nhận diện:

- Pair tối đa 2 người.
- Có capacity / weight limit.
- Muốn minimize số pair/container/boat.
- Có thể sort.
- Quyết định dựa trên cực trị nhẹ nhất / nặng nhất.

**Trigger sentence**

> “Nặng nhất chắc chắn phải đi; thử nhét nhẹ nhất cùng họ.”

Code movie:

```text
SORT
↓
L = lightest
R = heaviest
↓
L + R <= limit ?
├─ YES → L++
└─ NO  → L giữ nguyên
↓
R--
boats++
```

---

### STEP 9 — COMPLEXITY

Sort:

```text
O(N log N)
```

Two pointers:

```text
O(N)
```

Tổng:

```text
O(N log N)
```

Space:

```text
O(1) ~ O(N)
```

tuỳ implementation sort của JS.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
people = [70,50,80,50]
limit = 100
```

Sort:

```text
[50,50,70,80]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| 80 | L=50,R=80 | `50+80=130>100` | 80 đi một mình | boats=1 | R-- | L=0,R=2 |
| 70 | L=50,R=70 | `50+70=120>100` | 70 đi một mình | boats=2 | R-- | L=0,R=1 |
| 50 | L=50,R=50 | `50+50=100` | ghép hai người | boats=3 | L++,R-- | done |

Kết quả:

```text
3
```

---

### Dry run case không ghép được

```js
people = [50,70,80]
limit = 100
```

Sort:

```text
50 70 80
```

- `50+80 > 100` → 80 đi một mình
- `50+70 > 100` → 70 đi một mình
- còn 50 → đi một mình

→ 3 boats.

---

## 4. Bộ phim hình ảnh

### Frame 1 — Xếp hàng theo cân nặng

```text
50   50   70   80
↑              ↑
L              R
```

### Frame 2 — Người nặng nhất bước lên xuồng

```text
80
```

Hỏi:

> Có thể kéo người nhẹ nhất lên cùng không?

```text
50 + 80 > 100
```

Không.

→ 80 đi một mình.

### Frame 3

Còn:

```text
50 50 70
↑     ↑
L     R
```

`50 + 70 > 100`

→ 70 đi một mình.

### Frame 4

Còn:

```text
50 50
↑  ↑
L  R
```

`50 + 50 = 100`

→ cùng một boat.

**Câu chuyện 1 dòng**

> “Mỗi chuyến chắc chắn chở thằng nặng nhất; còn chỗ thì nhét thằng nhẹ nhất vào cùng.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(people, limit) {
  people.sort((a, b) => a - b)

  let left = 0
  let right = people.length - 1
  let boats = 0

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++
    }

    right--
    boats++
  }

  return boats
}
```

### Skeleton siêu ngắn

```js
sort ascending

L = 0
R = n - 1

while (L <= R) {
  if (people[L] + people[R] <= limit) {
    L++
  }

  R--
  boats++
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Một `while (left <= right)`.

Mỗi vòng xử lý chắc chắn người nặng nhất.

---

### RESET WHEN

> Không reset pointer.

```text
left chỉ tăng
right chỉ giảm
```

Không pointer nào quay lại.

---

### INVALIDATES WHAT

> Nếu:

```text
lightest + heaviest > limit
```

thì heaviest **không thể ghép với bất kỳ ai**.

Không cần thử người thứ hai, thứ ba...

Heaviest đi một mình.

---

### COMMIT WHEN

> Mỗi vòng chắc chắn dùng đúng một boat:

```js
boats++
right--
```

Nếu ghép được thêm lightest:

```js
left++
```

---

## 7. Trap dễ chết

### Trap 1 — Quên sort

Two pointers chỉ có ý nghĩa khi:

```text
left = nhẹ nhất
right = nặng nhất
```

Phải:

```js
people.sort((a, b) => a - b)
```

---

### Trap 2 — Khi không ghép được lại quên `right--`

Đây là lỗi mày từng gặp.

Sai:

```js
if (people[left] + people[right] <= limit) {
  left++
  right--
  boats++
}
```

Nếu không ghép được thì loop không tiến.

Đúng:

```js
if (sum <= limit) {
  left++
}

right--
boats++
```

`right--` và `boats++` nằm **ngoài if**.

---

### Trap 3 — Chỉ `boats++` khi ghép được

Sai.

Dù người nặng nhất đi một mình thì vẫn dùng một boat.

Mỗi vòng:

```js
boats++
```

---

### Trap 4 — Ghép hai người nhẹ nhất trước

Có thể làm lãng phí cơ hội ghép heaviest với lightest.

Greedy đúng là:

```text
fix heaviest first
```

rồi thử lightest.

---

### Trap 5 — Điều kiện loop dùng `<`

Sai:

```js
while (left < right)
```

sẽ bỏ sót trường hợp còn đúng một người:

```text
left === right
```

Đúng:

```js
while (left <= right)
```

---

### Trap 6 — Khi chỉ còn 1 người vẫn check `people[left] + people[right]`

Nếu `left === right`, biểu thức sẽ thành:

```text
2 * people[left]
```

Điều đó có thể khiến `left` không tăng, nhưng không sao vì `right--` vẫn kết thúc loop và `boats++` đúng một lần.

Nếu muốn explicit hơn có thể check:

```js
if (
  left < right &&
  people[left] + people[right] <= limit
) {
  left++
}
```

Nhưng bản ngắn ở trên vẫn trả đúng số boat.

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi boat tối đa 2 người + weight limit + minimize boats → sort + greedy two pointers.

> **State:** `left`, `right`, `boats`.

> **Heaviest luôn đi:** mỗi vòng `right--`, `boats++`.

> **Pair:** nếu `people[left] + people[right] <= limit` → `left++`.

> **Nếu không pair:** left giữ nguyên; heaviest đi một mình.

> **Complexity:** `O(N log N)` vì sort.

### Code shape

```js
people.sort((a, b) => a - b)

let left = 0
let right = people.length - 1
let boats = 0

while (left <= right) {
  if (people[left] + people[right] <= limit) {
    left++
  }

  right--
  boats++
}

return boats
```

### Hình chốt cuối

```text
LIGHTEST                     HEAVIEST
   L --------------------------- R
                 ↓
            ONE BOAT NOW
                 ↓
         L + R <= limit ?
          /             \
       YES               NO
       L++              L stays
          \             /
             R--
           boats++
```

## 🧠 Một câu phải khắc vào đầu

> **“Nặng nhất luôn phải đi chuyến này; nhẹ nhất ghép được thì cho đi cùng, không thì để lại.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---
