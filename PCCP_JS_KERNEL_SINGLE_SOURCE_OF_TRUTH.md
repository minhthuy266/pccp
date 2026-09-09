# PCCP JavaScript — Kernel Single Source of Truth

> Mục tiêu: một file duy nhất để **học lõi, recall nhanh và vá lỗi trước kỳ thi PCCP**.
>
> Đây không phải tuyển tập lời giải. Mỗi mục chỉ giữ: **tín hiệu → state/invariant → kernel → bẫy → complexity**.

---

## 0. Cách dùng file

### Khi học

1. Đọc **tín hiệu nhận diện**.
2. Che code, tự viết kernel từ trắng.
3. Nói thành lời `STATE`, `TRANSITION`, `INVARIANT`.
4. So lại code và ghi đúng một lỗi mình vừa mắc.
5. Ngày hôm sau viết lại kernel đó trong 3–5 phút.

### Khi đọc đề — quy trình canonical 9 bước

Giữ nguyên đúng hệ tư duy đã học; không rút gọn và không đổi tên:

```text
1. CONTRACT: đề cho gì, cần trả về gì, tie-break nào?
2. BOUND: N bao nhiêu, ngân sách complexity cho phép đến đâu?
3. BRUTE FORCE: cách giải thẳng và chắc chắn đúng là gì?
4. BOTTLENECK: bước nào khiến brute force quá chậm?
5. PATTERN: cấu trúc nào loại bỏ đúng bottleneck đó?
6. STATE: cần nhớ tối thiểu dữ liệu gì?
7. TRANSITION: một bước làm state thay đổi thế nào?
8. INVARIANT: điều gì luôn đúng sau mỗi bước?
9. COMPLEXITY: time/space cuối cùng có qua bound không?
```

Sau chín bước mới kiểm tra hidden cases:

## Hidden Test Checklist — kiểm tra trước khi Submit

### Hidden test là gì?

Các ví dụ xuất hiện trong đề thường chỉ giúp xác nhận rằng ta đã hiểu yêu cầu cơ bản. Khi bấm `Submit Code`, hệ thống sẽ chạy thêm nhiều test không được hiển thị.

Hidden test thường được thiết kế để kiểm tra ba nhóm vấn đề:

1. **Correctness:** thuật toán có đúng trong mọi trường hợp hay chỉ đúng với sample?
2. **Efficiency:** thuật toán có chạy được khi input đạt giới hạn tối đa không?
3. **Implementation:** code có lỗi biên, sai thứ tự xử lý, mutation hoặc sai format không?

Không phải bài nào cũng có đủ mọi loại hidden test dưới đây. Sau khi viết xong, chỉ cần chọn những câu liên quan tới bài đang làm và tự tạo test tương ứng.

---

### 1. Input nhỏ nhất hoặc chỉ một phần tử thì sao?

Trước tiên, kiểm tra constraint nhỏ nhất:

```text
N = 0, nếu đề cho phép rỗng
N = 1
Mảng có một phần tử
Chuỗi dài một ký tự
Grid 1 × 1
Graph có một node
Chỉ có một command
```

Các trường hợp này thường làm lộ lỗi:

- Truy cập phần tử không tồn tại.
- Khởi tạo từ `array[0]` khi mảng có thể rỗng.
- Vòng lặp không chạy nên đáp án không được cập nhật.
- Hai con trỏ gặp nhau nhưng code chỉ xử lý khi `left < right`.
- BFS có điểm bắt đầu đồng thời là đích.
- Heap chỉ còn một phần tử nhưng code vẫn cố lấy hai phần tử.

Ví dụ Lifeboats:

```js
while (left <= right) {
    if (left === right) {
        boats++;
        break;
    }

    // xử lý hai người
}
```

Nếu chỉ viết:

```js
while (left < right)
```

thì người cuối cùng khi `left === right` sẽ không được tính.

Các câu cần hỏi:

```text
Nếu chỉ có một phần tử, vòng lặp có chạy không?
Nếu start chính là destination, đáp án phải là 0 hay 1?
Có đang truy cập array[0] khi mảng có thể rỗng không?
Giá trị khởi tạo của answer đã đúng cho input nhỏ nhất chưa?
```

---

### 2. Input lớn nhất có gây TLE hoặc vượt bộ nhớ không?

Hidden test thường đẩy input tới sát giới hạn lớn nhất để phân biệt:

```text
Code đúng nhưng chậm
và
Code vừa đúng vừa đủ hiệu quả
```

Ví dụ:

```text
N ≤ 100       → O(N²) có thể chấp nhận được
N ≤ 100,000   → O(N²) gần như chắc chắn không được
Grid 500×500  → có 250,000 ô
```

Những nguyên nhân TLE phổ biến:

- Hai vòng lặp lồng nhau trên `N = 100,000`.
- Với mỗi phần tử lại tìm tuyến tính bằng `findIndex()`.
- Với mỗi cột lại BFS toàn bộ grid.
- Sort lại mảng trong mỗi vòng lặp.
- Simulation từng giây dù timestamp có thể lên tới hàng tỷ.
- Dùng `shift()` liên tục để lấy đầu queue.
- Không đánh dấu `visited` đúng lúc khiến một state bị enqueue nhiều lần.
- Dùng array thay cho Heap khi liên tục cần lấy phần tử nhỏ nhất.

Ví dụ lookup chậm:

```js
for (const value of values) {
    const index = anotherArray.findIndex(x => x === value);
}
```

Nếu hai mảng đều có `N` phần tử, complexity có thể thành:

```text
O(N²)
```

Có thể thay bằng:

```js
const indexByValue = new Map();

for (let i = 0; i < anotherArray.length; i++) {
    indexByValue.set(anotherArray[i], i);
}
```

Khi đó:

```text
Build Map: O(N)
Mỗi lookup trung bình: O(1)
Tổng: O(N)
```

Queue trong JavaScript nên dùng:

```js
const queue = [start];
let head = 0;

while (head < queue.length) {
    const current = queue[head++];
}
```

Không nên dùng lặp lại:

```js
queue.shift();
```

Các câu cần hỏi:

```text
Input lớn nhất có bao nhiêu phần tử?
Vòng lặp sâu nhất chạy bao nhiêu lần?
Có thao tác O(N) nằm trong một vòng lặp O(N) không?
Mỗi node, ô hoặc phần tử được xử lý tối đa bao nhiêu lần?
Có thể dùng Map, Set, Heap, Prefix Sum hoặc Two Pointers để tránh duyệt lại không?
```

---

### 3. Các dấu `<`, `<=`, `>`, `>=` đã đúng tại giá trị bằng biên chưa?

Rất nhiều code qua sample nhưng fail hidden test vì sai đúng một dấu bằng.

Các trường hợp cần kiểm tra:

```text
sum === limit
health === 0
time === eventTime
position === openingStart
position === openingEnd
distance === maximumDistance
count === requiredCount
```

Ví dụ thuyền cứu sinh:

```js
if (people[left] + people[right] <= limit) {
    left++;
}
```

Hai người có tổng cân nặng đúng bằng `limit` vẫn được đi chung. Nếu viết:

```js
people[left] + people[right] < limit
```

thì trường hợp đúng bằng giới hạn sẽ bị xử lý sai.

Ví dụ kiểm tra một vị trí nằm trong đoạn đóng:

```js
if (start <= position && position <= end) {
    // position nằm trong đoạn
}
```

Không được viết:

```js
start < position && position < end
```

nếu hai đầu đoạn cũng được tính.

Với mỗi điều kiện quan trọng, hãy tự tạo ba test:

```text
Nhỏ hơn biên đúng 1
Bằng chính xác biên
Lớn hơn biên đúng 1
```

Ví dụ:

```text
limit = 100

sum = 99
sum = 100
sum = 101
```

---

### 4. Index đầu/cuối, cửa sổ đầu/cuối và off-by-one đã đúng chưa?

Off-by-one là lỗi lệch đúng một đơn vị.

Các vị trí thường bị test:

```text
index = 0
index = n - 1
phần tử đầu tiên
phần tử cuối cùng
cửa sổ đầu tiên
cửa sổ cuối cùng
đoạn chỉ dài một phần tử
right + 1
```

#### Độ dài đoạn đóng `[left, right]`

Nếu cả hai đầu đều được tính:

```js
const length = right - left + 1;
```

Không phải:

```js
right - left;
```

#### Prefix Sum

Với quy ước:

```js
prefix[i] = tổng của numbers[0..i-1]
```

Tổng đoạn đóng `[left, right]` là:

```js
prefix[right + 1] - prefix[left];
```

#### Fixed Sliding Window

Số cửa sổ độ dài `k` trong mảng độ dài `n` là:

```text
n - k + 1
```

Điều kiện duyệt theo `left`:

```js
for (
    let left = 0;
    left + k <= values.length;
    left++
) {
    // cửa sổ [left, left + k - 1]
}
```

Dấu `<=` giúp xử lý cả cửa sổ cuối cùng.

#### Slice

```js
array.slice(start, end)
```

lấy từ `start` nhưng không lấy `end`.

Ví dụ lấy index từ `i` đến `j`, bao gồm cả `j`:

```js
array.slice(i, j + 1);
```

Các câu cần hỏi:

```text
Đoạn này là [left, right] hay [left, right)?
Độ dài có cần +1 không?
Loop có chạy tới phần tử cuối không?
Cửa sổ cuối cùng có được kiểm tra không?
slice() có loại bỏ end hay không?
```

---

### 5. Duplicate có ý nghĩa không?

Duplicate nghĩa là nhiều phần tử có cùng giá trị.

Ví dụ:

```text
Hai vận động viên cùng tên
Nhiều sản phẩm cùng mã
Nhiều bài hát cùng lượt nghe
Nhiều cạnh nối cùng hai node
Nhiều event xảy ra tại cùng tọa độ
```

Cần phân biệt:

```text
Set:
Chỉ lưu một giá trị đã xuất hiện hay chưa.

Map<key, count>:
Lưu chính xác giá trị xuất hiện bao nhiêu lần.
```

Ví dụ Marathon:

```js
participant = ["mislav", "stanko", "mislav"];
completion = ["stanko", "mislav"];
```

Nếu dùng:

```js
new Set(participant)
```

thì hai người tên `"mislav"` bị gộp thành một.

Phải dùng:

```js
const count = new Map();

for (const name of participant) {
    count.set(name, (count.get(name) ?? 0) + 1);
}

for (const name of completion) {
    count.set(name, count.get(name) - 1);
}
```

Duplicate cũng ảnh hưởng tới monotonic stack.

Hai comparator khác nhau:

```js
stackTop < current
stackTop <= current
```

sẽ xử lý các giá trị bằng nhau khác nhau. Phải dựa vào yêu cầu chính xác của đề.

Các câu cần hỏi:

```text
Hai item có thể có cùng key không?
Nếu có, ta cần biết tồn tại hay cần biết số lượng?
Khi count về 0 có cần xóa key khỏi Map không?
Hai giá trị bằng nhau có được pop khỏi monotonic stack không?
```

---

### 6. Nếu nhiều đáp án hòa nhau thì tie-break chính xác là gì?

Tie xảy ra khi nhiều đáp án có cùng giá trị chính.

Đề thường thêm một luật phụ:

```text
Điểm bằng nhau → index nhỏ hơn
Lượt nghe bằng nhau → id nhỏ hơn
Độ dài bằng nhau → vị trí bắt đầu sớm hơn
Priority bằng nhau → event đến trước được xử lý trước
Cost bằng nhau → chọn thứ tự từ điển nhỏ hơn
```

Comparator nhiều khóa:

```js
items.sort((a, b) => {
    if (a.score !== b.score) {
        return b.score - a.score;
    }

    if (a.time !== b.time) {
        return a.time - b.time;
    }

    return a.id - b.id;
});
```

Có thể viết ngắn:

```js
items.sort((a, b) =>
    b.score - a.score ||
    a.time - b.time ||
    a.id - b.id
);
```

Ví dụ tìm đoạn có tổng bằng target:

```text
Ưu tiên đoạn ngắn nhất
Nếu cùng độ dài, ưu tiên start nhỏ nhất
```

Nếu duyệt `right` từ trái sang phải và chỉ update khi đoạn mới ngắn hơn:

```js
if (
    best === null ||
    right - left < best[1] - best[0]
) {
    best = [left, right];
}
```

thì đoạn sớm hơn được giữ lại khi độ dài bằng nhau.

Các câu cần hỏi:

```text
Tiêu chí chính là gì?
Nếu tiêu chí chính bằng nhau thì so gì tiếp?
Cần tăng dần hay giảm dần ở từng khóa?
Khi bằng hoàn toàn, có cần giữ thứ tự ban đầu không?
```

---

### 7. Có trường hợp không tồn tại đáp án, không tới được đích hoặc graph rời rạc không?

Không được mặc định đề luôn có lời giải, trừ khi constraint nói rõ.

Các trường hợp phổ biến:

```text
Không tồn tại cặp có tổng target
Không có đoạn thỏa điều kiện
Không thể đạt threshold
BFS không tới được destination
Graph có nhiều component
Heap không còn đủ phần tử để tiếp tục
```

BFS thường khởi tạo:

```js
const distance = Array(n).fill(-1);
```

Nếu target vẫn là `-1`, nghĩa là không tới được:

```js
if (distance[target] === -1) {
    return -1;
}
```

Graph rời rạc:

```js
for (let node = 0; node < n; node++) {
    if (visited[node]) continue;

    dfs(node);
    componentCount++;
}
```

Nếu chỉ gọi:

```js
dfs(0);
```

thì chỉ duyệt component chứa node `0`.

Heap cần kiểm tra:

```js
while (heap.size >= 2) {
    const first = heap.pop();
    const second = heap.pop();
}
```

Các câu cần hỏi:

```text
Đề có cam kết luôn tồn tại đáp án không?
Nếu không có đáp án thì phải trả gì?
Graph có chắc chắn liên thông không?
Start hoặc destination có thể bị chặn không?
Có thể kết thúc mà vẫn chưa đạt mục tiêu không?
```

---

### 8. Nếu nhiều event xảy ra cùng thời điểm thì event nào được xử lý trước?

Đây là hidden test rất quan trọng trong các bài simulation PCCP.

Ví dụ:

```text
Khách rời quán đúng lúc khách mới đến
Đòn đánh xảy ra đúng lúc nhân vật chuẩn bị hồi máu
Process mới được gọi đúng lúc process cũ kết thúc
Hai robot cùng tới một tọa độ
Opening bắt đầu đúng tại vị trí hiện tại
```

Cùng một timestamp nhưng hai thứ tự xử lý khác nhau có thể tạo hai đáp án khác nhau:

```text
Departure → Arrival
```

khác với:

```text
Arrival → Departure
```

Nếu dùng event list, comparator phải có thứ tự phụ:

```js
events.sort((a, b) =>
    a.time - b.time ||
    a.typeOrder - b.typeOrder
);
```

Ví dụ:

```js
const DEPARTURE = 0;
const ARRIVAL = 1;
```

nghĩa là cùng thời điểm thì departure được xử lý trước.

Nhưng thứ tự này phải lấy từ đề, không được tự mặc định.

Trong timeline simulation, còn phải xác định:

```text
Từ currentTime đến eventTime:
update trạng thái liên tục trước
hay
xử lý event trước?
```

Các câu cần hỏi:

```text
Hai event có thể cùng timestamp không?
Nếu cùng thời điểm, đề mô tả event nào xảy ra trước?
State được cập nhật trước hay sau event?
Một event có reset counter/timeline của event khác không?
```

---

### 9. State hoặc visited đã chứa đủ mọi thông tin ảnh hưởng đến tương lai chưa?

State không chỉ là vị trí hiện tại. Nó phải chứa toàn bộ thông tin cần thiết để quyết định các bước tiếp theo.

Ví dụ một người ở cùng ô `(row, col)` nhưng có hai tình trạng:

```text
Chưa dùng quyền nhảy
Đã dùng quyền nhảy
```

Đây là hai state khác nhau:

```text
(row, col, used = 0)
(row, col, used = 1)
```

Nếu chỉ dùng:

```js
visited[row][col]
```

thì có thể loại bỏ nhầm một đường đi vẫn còn quyền đặc biệt.

Phải dùng:

```js
visited[row][col][used]
```

Ví dụ:

```js
const visited = Array.from(
    { length: rows },
    () => Array.from(
        { length: cols },
        () => Array(2).fill(false)
    )
);
```

Những thông tin thường phải đưa vào state:

```text
row, col
đã dùng skill hay chưa
số lần phá tường còn lại
hướng đang quay
phase hiện tại
key hoặc item đã lấy
bitmask của các item
giá trị resource còn lại
```

Nguyên tắc:

```text
Nếu hai trường hợp đứng cùng một vị trí
nhưng có tập lựa chọn tương lai khác nhau,
chúng phải là hai state khác nhau.
```

Các câu cần hỏi:

```text
Biết vị trí hiện tại đã đủ quyết định bước sau chưa?
Cùng một node nhưng resource khác nhau có tương đương không?
Visited cần một chiều, hai chiều hay thêm state phụ?
Có đang gộp nhầm hai trạng thái có tương lai khác nhau không?
```

---

### 10. Có vô tình mutate input, commit state dở dang hoặc quên undo không?

Có ba nhóm lỗi khác nhau.

#### 10.1 Mutation input ngoài ý muốn

Các hàm JavaScript thay đổi mảng gốc:

```js
array.sort();
array.reverse();
array.splice();
```

Nếu vẫn cần thứ tự ban đầu, hãy copy:

```js
const sorted = [...numbers].sort((a, b) => a - b);
```

#### 10.2 Shared reference khi tạo ma trận

Sai:

```js
const matrix = Array(rows).fill(Array(cols).fill(0));
```

Tất cả các hàng cùng trỏ tới một array. Sửa một ô có thể làm thay đổi nhiều hàng.

Đúng:

```js
const matrix = Array.from(
    { length: rows },
    () => Array(cols).fill(0)
);
```

#### 10.3 Commit state dở dang

Nếu một command phải hợp lệ toàn bộ mới được thực hiện, không được update vị trí thật sau từng bước.

Dùng:

```text
COPY → TRY → COMMIT
```

```js
let nextRow = row;
let nextCol = col;
let valid = true;

for (let step = 0; step < distance; step++) {
    nextRow += dr;
    nextCol += dc;

    if (!isValid(nextRow, nextCol)) {
        valid = false;
        break;
    }
}

if (valid) {
    row = nextRow;
    col = nextCol;
}
```

#### 10.4 Backtracking quên undo

```js
used[i] = true;
dfs(depth + 1);
used[i] = false;
```

Nếu mutate array hoặc object dùng chung, phải hoàn tác trước khi thử lựa chọn tiếp theo.

Các câu cần hỏi:

```text
sort/reverse/splice có làm thay đổi input cần dùng sau đó không?
Các hàng của ma trận có phải các array độc lập không?
Command lỗi giữa chừng có đang thay đổi state thật không?
Sau mỗi nhánh DFS, state đã được khôi phục chưa?
```

---

### 11. Tổng hoặc tích có vượt giới hạn số; có số âm, zero hoặc cần modulo không?

JavaScript dùng `Number`, biểu diễn chính xác số nguyên tới:

```js
Number.MAX_SAFE_INTEGER
// 9_007_199_254_740_991
```

Trước khi code, ước lượng giá trị lớn nhất:

```text
maxTotal ≈ N × maxValue
maxProduct ≈ value₁ × value₂ × ...
```

Nếu vượt giới hạn an toàn, có thể phải dùng:

```js
BigInt
```

Ví dụ:

```js
const value = 12345678901234567890n;
```

Không được trộn `Number` và `BigInt`:

```js
1n + 1 // TypeError
```

Phải viết:

```js
1n + 1n
```

#### Modulo

Nếu đề yêu cầu modulo:

```js
dp[next] = (dp[next] + dp[current]) % MOD;
```

Không nên đợi tới cuối nếu các giá trị trung gian có thể quá lớn.

#### Số âm phá giả định đơn điệu

Sliding window theo tổng thường dựa trên giả định số dương hoặc không âm:

```text
Thêm phần tử bên phải → tổng không giảm
Bỏ phần tử bên trái → tổng không tăng
```

Nếu có số âm, giả định này không còn đúng.

Ví dụ:

```text
[5, -10, 20]
```

Khi tổng quá lớn, tăng `left` chưa chắc làm tổng giảm theo cách mong muốn.

Lúc đó có thể phải dùng:

```text
Prefix Sum + Map
```

#### Zero

Zero có thể làm lộ lỗi:

```js
map.get(key) || defaultValue
```

Nếu value thật là `0`, toán tử `||` sẽ coi nó là falsy.

Dùng:

```js
map.get(key) ?? defaultValue
```

Các câu cần hỏi:

```text
Giá trị lớn nhất của tổng/tích là bao nhiêu?
Có vượt Number.MAX_SAFE_INTEGER không?
Đề có yêu cầu modulo không?
Input có số âm hoặc zero không?
Thuật toán có đang dựa vào tính đơn điệu của số dương không?
```

---

### 12. Kiểu dữ liệu, index, thứ tự và format output đã đúng chưa?

Code có thể đúng thuật toán nhưng vẫn bị chấm sai hoàn toàn nếu trả sai format.

Các lỗi phổ biến:

```text
Trả string thay vì number
Trả number thay vì array
Trả [col, row] thay vì [row, col]
Trả index 1-based thay vì 0-based
Trả cả object thay vì chỉ id
Không sort kết quả theo yêu cầu
Trả undefined khi không có đáp án
```

Ví dụ:

```js
return [row, col];
```

khác với:

```js
return [col, row];
```

Largest Number:

```text
Input:  [0, 0, 0]
Ghép:   "000"
Output: "0"
```

Cần normalize:

```js
return answer[0] === "0" ? "0" : answer;
```

Nếu đề cần mảng ID:

```js
answer.push(song.id);
```

không được push cả object:

```js
answer.push(song);
```

Các câu cần hỏi:

```text
Hàm phải return number, string hay array?
Index của đề là 0-based hay 1-based?
Tọa độ yêu cầu [row, col] hay [x, y]?
Kết quả có cần sort không?
Nếu không có đáp án phải trả gì?
Có trường hợp cần normalize output không?
```

---

## Thứ tự kiểm tra ưu tiên trong bài PCCP

Nếu không đủ thời gian kiểm tra tất cả, ưu tiên:

```text
1. BOUNDARY: điều kiện bằng biên và off-by-one.
2. DUPLICATE: có làm mất count không?
3. TIE-BREAK: nhiều đáp án bằng nhau chọn thế nào?
4. EVENT ORDER: cùng thời điểm xử lý ai trước?
5. STATE: visited đã đủ chiều chưa?
6. UNREACHABLE: không có đáp án trả gì?
7. COMPLEXITY: input tối đa có TLE không?
8. MUTATION: có sửa input/state ngoài ý muốn không?
9. NUMBER: overflow, số âm, zero, modulo.
10. OUTPUT: đúng kiểu, đúng index và đúng thứ tự chưa?
```

---

## Bản kiểm tra 30 giây trước khi Submit

```text
[ ] Input nhỏ nhất chạy đúng.
[ ] Input lớn nhất không TLE.
[ ] Dấu bằng tại boundary đúng.
[ ] Không bỏ phần tử/cửa sổ cuối.
[ ] Duplicate không bị mất.
[ ] Tie-break đúng.
[ ] Không có đáp án đã được xử lý.
[ ] Event cùng thời điểm đúng thứ tự.
[ ] State và visited đủ thông tin.
[ ] Không mutate/commit/undo sai.
[ ] Không overflow hoặc sai modulo.
[ ] Output đúng kiểu và đúng format.
```

`PATTERN` thay cho chữ `SIGNAL` ở bản cũ. Signal chỉ là manh mối để chọn pattern, không phải một bước phân tích độc lập.

### Luật khi bí

```text
10–15 phút không tạo thêm state/transition hữu ích
→ chuyển bài hoặc xem đúng kernel
→ đóng tài liệu
→ tự code lại
```

---

# PHẦN I — RECALL 10 PHÚT

## 1. Bản đồ chọn thuật toán

| Tín hiệu trong đề | Nghĩ ngay đến |
|---|---|
| Mô phỏng command/event theo thứ tự | Simulation/state machine |
| Command sai một bước thì hủy toàn bộ | `COPY → TRY → COMMIT` |
| Đã xuất hiện chưa, bao nhiêu loại | `Set` |
| Bao nhiêu lần, hai multiset lệch gì | `Map<key,count>` |
| Key cần lấy index/value ngay | `Map<key,value>` |
| Gom item theo category | `Map<key,item[]>` |
| Khoảng liên tiếp, hai con trỏ không cần lùi | Sliding window/two pointers |
| Tổng đoạn `[l..r]` hỏi nhiều lần | Prefix sum |
| Ghép nhẹ nhất với nặng nhất | Sort + two pointers + greedy |
| Luôn lấy nhỏ nhất/lớn nhất hiện tại | Heap/priority queue |
| Cặp ngoặc, undo, phần tử chưa được giải quyết | Stack |
| Xử lý theo thứ tự vào trước | Queue bằng `head` |
| Next greater/smaller | Monotonic stack |
| Thử mọi lựa chọn, có chọn rồi hoàn tác | DFS/backtracking |
| Đường ngắn nhất khi mỗi cạnh cost bằng nhau | BFS |
| Đường ngắn nhất với trọng số không âm | Dijkstra |
| Đếm vùng liên thông | DFS/BFS components |
| Giá trị nhỏ nhất/lớn nhất thỏa điều kiện đơn điệu | Binary search on answer |
| Bài toán con lặp lại, cần tối ưu/đếm cách | DP |
| Nhiều cập nhật hình chữ nhật, hỏi kết quả cuối | 2D difference/prefix |
| Chọn cạnh rẻ nhất mà không tạo chu trình | Kruskal + Union-Find |

## 2. Các invariant phải bật ra ngay

```text
Simulation: state sau vòng lặp là trạng thái thật sau event hiện tại.
Map count: map[key] là số lượng đã xử lý của key.
Two pointers: vùng đã loại không thể chứa đáp án tốt hơn.
Window: sau while, cửa sổ hiện tại hợp lệ.
Stack: stack chỉ chứa phần tử chưa được giải quyết.
Queue BFS: mỗi state được enqueue hợp lệ và không enqueue lại vô ích.
Heap: root luôn là phần tử ưu tiên cao nhất theo comparator.
Backtracking: trước khi sang choice tiếp theo, state được hoàn tác nguyên trạng.
Binary search: đáp án luôn còn nằm trong miền tìm kiếm.
DP: khi tính state hiện tại, mọi state phụ thuộc đã có đáp án đúng.
```

## 3. Những lỗi JavaScript phải nhớ

```js
numbers.sort((a, b) => a - b);              // Không dùng sort() cho số
const copy = [...arr];                       // Tránh mutate input khi không chủ ý
map.set(key, (map.get(key) ?? 0) + 1);      // Không dùng || nếu 0 là value hợp lệ
const key = `${row},${col}`;                 // Key tọa độ
const queue = [start]; let head = 0;         // Tránh shift() lặp
const mid = Math.floor((left + right) / 2);
const big = 0n;                              // Khi Number vượt giới hạn an toàn
```

Giới hạn an toàn của `Number`:

```js
Number.MAX_SAFE_INTEGER // 9_007_199_254_740_991
```

---

# PHẦN II — KERNEL CHUẨN

## 4. Implementation và Simulation

### 4.1 State machine tuần tự

**Tín hiệu:** command/event phải xử lý đúng thứ tự.

```js
function simulate(commands) {
    let state = createInitialState();

    for (const command of commands) {
        state = applyCommand(state, command);
    }

    return makeAnswer(state);
}
```

**Invariant:** sau command thứ `i`, `state` mô tả chính xác thế giới sau `i` command.

**Bẫy:** update sai thứ tự; cùng thời điểm nhưng không xác định event nào trước; quên normalize sau thay đổi.

### 4.2 `COPY → TRY → COMMIT`

**Tín hiệu:** một command gồm nhiều bước; chỉ cần một bước sai thì hủy toàn bộ command.

```js
for (const [direction, distance] of routes) {
    let nextRow = row;
    let nextCol = col;
    let valid = true;

    for (let step = 0; step < distance; step++) {
        nextRow += dr[direction];
        nextCol += dc[direction];

        if (!inBounds(nextRow, nextCol) || board[nextRow][nextCol] === "X") {
            valid = false;
            break;
        }
    }

    if (valid) {
        row = nextRow;
        col = nextCol;
    }
}
```

**Invariant:** `row,col` chỉ chứa vị trí đã commit; biến `next*` là trạng thái thử.

### 4.3 Clamp và normalize

```js
value = Math.max(minValue, Math.min(maxValue, value));

function normalize(position, openingStart, openingEnd) {
    if (openingStart <= position && position <= openingEnd) {
        return openingEnd;
    }
    return position;
}
```

**Bẫy:** đề có thể yêu cầu normalize cả trước và sau command.

### 4.4 Timeline: nhảy đến event thay vì chạy từng giây

```js
events.sort((a, b) => a.time - b.time || a.typeOrder - b.typeOrder);

let currentTime = 0;
for (const event of events) {
    const elapsed = event.time - currentTime;
    advanceState(elapsed);
    processEvent(event);
    currentTime = event.time;
}
```

**Tín hiệu:** thời gian rất lớn nhưng số event nhỏ.

**Bẫy:** event cùng thời điểm; arrival/departure order; state phải update ngay sau event.

### 4.5 Duyệt ma trận

```js
for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
        const value = board[row][col];
    }
}

function inBounds(row, col, rows, cols) {
    return 0 <= row && row < rows && 0 <= col && col < cols;
}
```

**Bẫy:** nhầm `rows = board.length`, `cols = board[0].length`; nhầm `board[row][col]`.

---

## 5. String và Parsing

### 5.1 Tokenize có contract rõ

```js
const [date, type] = line.split(" ");
const [year, month, day] = date.split(".").map(Number);
```

### 5.2 Quy đổi ngày/thời gian về một trục số

```js
function toMinutes(hhmm) {
    const [hour, minute] = hhmm.split(":").map(Number);
    return hour * 60 + minute;
}

function toFixedCalendarDays(date) {
    const [year, month, day] = date.split(".").map(Number);
    return year * 12 * 28 + month * 28 + day;
}
```

Chỉ dùng lịch `12 tháng × 28 ngày` khi **đề định nghĩa như vậy**.

### 5.3 Run/chunk compression

```js
function compressedLength(s, size) {
    let result = "";
    let previous = s.slice(0, size);
    let count = 1;

    for (let i = size; i < s.length; i += size) {
        const current = s.slice(i, i + size);
        if (current === previous) {
            count++;
        } else {
            result += (count > 1 ? count : "") + previous;
            previous = current;
            count = 1;
        }
    }

    result += (count > 1 ? count : "") + previous;
    return result.length;
}
```

**Bẫy:** phần dư cuối; flush run cuối; `size > s.length / 2` không cần thử trừ chuỗi đơn.

---

## 6. Map và Set

### 6.1 Membership/uniqueness — `Set`

```js
const seen = new Set();

for (const value of values) {
    if (seen.has(value)) {
        // đã gặp
    }
    seen.add(value);
}

const distinctCount = seen.size;
```

**Dùng khi:** chỉ cần có/không hoặc số loại; duplicate không cần giữ số lượng.

### 6.2 Frequency/delta — `Map<key,count>`

```js
const count = new Map();

for (const key of items) {
    count.set(key, (count.get(key) ?? 0) + 1);
}

for (const key of removedItems) {
    count.set(key, count.get(key) - 1);
}
```

**Invariant:** `count[key]` là số lượng còn dư của key sau phần đã duyệt.

**Bẫy:** `Set` làm mất multiplicity.

### 6.3 Direct lookup — `Map<key,value/index>`

```js
const indexByValue = new Map();

for (let i = 0; i < numbers.length; i++) {
    const needed = target - numbers[i];
    if (indexByValue.has(needed)) {
        return [indexByValue.get(needed), i];
    }
    indexByValue.set(numbers[i], i);
}
```

**Bẫy:** lookup trước rồi mới insert để không dùng cùng một phần tử hai lần.

### 6.4 Grouping — `Map<key,array>`

```js
const itemsByGroup = new Map();

for (const item of items) {
    const key = getGroup(item);
    if (!itemsByGroup.has(key)) itemsByGroup.set(key, []);
    itemsByGroup.get(key).push(item);
}
```

### 6.5 Group metadata trong một Map

```js
const groups = new Map();

for (const item of items) {
    const key = item.group;
    if (!groups.has(key)) groups.set(key, { total: 0, items: [] });

    const group = groups.get(key);
    group.total += item.score;
    group.items.push(item);
}
```

### 6.6 Group choices/combinatorics

Nếu mỗi nhóm có `count` món, mỗi nhóm có `count + 1` lựa chọn gồm cả “không chọn”.

```js
let answer = 1;
for (const count of countByGroup.values()) {
    answer *= count + 1;
}
answer -= 1; // bỏ trường hợp không chọn gì
```

### 6.7 Đồng bộ array và index Map

```js
const position = new Map(players.map((name, index) => [name, index]));

function swap(i, j) {
    [players[i], players[j]] = [players[j], players[i]];
    position.set(players[i], i);
    position.set(players[j], j);
}
```

**Invariant:** `position.get(players[i]) === i` sau mọi swap.

### 6.8 Prefix string — sort rồi kiểm tra cặp kề nhau

```js
phoneBook.sort();

for (let i = 0; i + 1 < phoneBook.length; i++) {
    if (phoneBook[i + 1].startsWith(phoneBook[i])) return false;
}

return true;
```

**Lý do:** sau lexicographic sort, nếu một chuỗi là prefix của chuỗi khác thì sẽ có một cặp vi phạm nằm kề nhau.

---

## 7. Sorting và Comparator

### 7.1 Sort số

```js
numbers.sort((a, b) => a - b); // tăng dần
numbers.sort((a, b) => b - a); // giảm dần
```

### 7.2 Comparator nhiều khóa

```js
items.sort((a, b) => {
    if (a.primary !== b.primary) return b.primary - a.primary;
    if (a.secondary !== b.secondary) return a.secondary - b.secondary;
    return a.id - b.id;
});
```

`return < 0` nghĩa là `a` đứng trước `b`.

### 7.3 Largest Number

```js
const answer = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join("");

return answer[0] === "0" ? "0" : answer;
```

**Invariant:** đặt `a,b` cạnh nhau theo thứ tự tạo chuỗi ghép lớn hơn.

### 7.4 Sort interval

```js
intervals.sort((a, b) => a[1] - b[1]); // theo điểm kết thúc tăng dần
```

Thường dùng trong greedy chọn điểm/chặn nhiều interval nhất.

**Bẫy chung:** sort mutate array; comparator thiếu tie-break; so chuỗi thay vì số.

---

## 8. Prefix Sum và Difference Array

### 8.1 Prefix sum 1D

```js
const prefix = Array(numbers.length + 1).fill(0);

for (let i = 0; i < numbers.length; i++) {
    prefix[i + 1] = prefix[i] + numbers[i];
}

function rangeSum(left, right) {
    return prefix[right + 1] - prefix[left];
}
```

**Invariant:** `prefix[i]` là tổng `numbers[0..i-1]`.

### 8.2 Prefix count

```js
const prefix = Array(s.length + 1).fill(0);
for (let i = 0; i < s.length; i++) {
    prefix[i + 1] = prefix[i] + (s[i] === targetChar ? 1 : 0);
}
```

### 8.3 Difference array 1D

```js
const diff = Array(n + 1).fill(0);

for (const [left, right, delta] of updates) {
    diff[left] += delta;
    if (right + 1 < diff.length) diff[right + 1] -= delta;
}

for (let i = 1; i < n; i++) diff[i] += diff[i - 1];
```

### 8.4 Difference array 2D

```js
const diff = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));

function addRectangle(r1, c1, r2, c2, delta) {
    diff[r1][c1] += delta;
    diff[r1][c2 + 1] -= delta;
    diff[r2 + 1][c1] -= delta;
    diff[r2 + 1][c2 + 1] += delta;
}

for (let r = 0; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) diff[r][c] += diff[r][c - 1];
}
for (let c = 0; c <= cols; c++) {
    for (let r = 1; r <= rows; r++) diff[r][c] += diff[r - 1][c];
}
```

**Bẫy:** cấp mảng thêm một hàng/cột để ghi dấu kết thúc an toàn.

---

## 9. Two Pointers và Sliding Window

### 9.1 Hai đầu sau sort

```js
numbers.sort((a, b) => a - b);
let left = 0;
let right = numbers.length - 1;

while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
        // found
        break;
    }
    if (sum < target) left++;
    else right--;
}
```

**Invariant:** vùng ngoài `[left,right]` đã được chứng minh không cần xét lại.

### 9.2 Greedy ghép nhẹ nhất–nặng nhất

```js
people.sort((a, b) => a - b);
let left = 0;
let right = people.length - 1;
let boats = 0;

while (left <= right) {
    if (left === right) {
        boats++;
        break;
    }

    if (people[left] + people[right] <= limit) left++;
    right--;
    boats++;
}
```

**Proof:** người nặng nhất phải đi chuyến này; nếu nhẹ nhất không ghép được thì không ai ghép được với họ.

### 9.3 Fixed window

```js
let windowSum = 0;
for (let i = 0; i < k; i++) windowSum += numbers[i];

let best = windowSum;
for (let right = k; right < numbers.length; right++) {
    windowSum += numbers[right];
    windowSum -= numbers[right - k];
    best = Math.max(best, windowSum);
}
```

### 9.4 Variable window — at most `k` distinct

```js
const count = new Map();
let left = 0;
let best = 0;

for (let right = 0; right < values.length; right++) {
    const value = values[right];
    count.set(value, (count.get(value) ?? 0) + 1);

    while (count.size > k) {
        const removed = values[left++];
        count.set(removed, count.get(removed) - 1);
        if (count.get(removed) === 0) count.delete(removed);
    }

    best = Math.max(best, right - left + 1);
}
```

**Invariant sau `while`:** `[left,right]` hợp lệ; `left` đã tiến đủ để phục hồi điều kiện.

### 9.5 Fixed window + frequency Map

```js
const windowCount = new Map();

function add(key) {
    windowCount.set(key, (windowCount.get(key) ?? 0) + 1);
}

function remove(key) {
    const next = windowCount.get(key) - 1;
    if (next === 0) windowCount.delete(key);
    else windowCount.set(key, next);
}

for (let i = 0; i < windowSize; i++) add(values[i]);

for (let left = 0; left + windowSize <= values.length; left++) {
    checkCurrentWindow(windowCount);

    const nextRight = left + windowSize;
    if (nextRight < values.length) {
        remove(values[left]);
        add(values[nextRight]);
    }
}
```

**Bẫy:** kiểm tra đúng cả cửa sổ cuối; count về 0 phải xóa nếu dùng `map.size`.

### 9.6 Positive sum window

Chỉ dùng logic co cửa sổ theo tổng khi các số không âm/dương làm tổng đơn điệu.

```js
let left = 0;
let sum = 0;
let best = null;

for (let right = 0; right < sequence.length; right++) {
    sum += sequence[right];

    while (sum > target && left <= right) {
        sum -= sequence[left++];
    }

    if (sum === target) {
        if (best === null || right - left < best[1] - best[0]) {
            best = [left, right];
        }
    }
}
```

**Bẫy:** số âm phá tính đơn điệu; quên `Map.delete` khi count về 0; off-by-one độ dài.

---

## 10. Stack, Queue, Deque

### 10.1 Stack

```js
const stack = [];
stack.push(value);
const top = stack[stack.length - 1];
const removed = stack.pop();
```

### 10.2 Valid parentheses

```js
let balance = 0;

for (const char of s) {
    if (char === "(") balance++;
    else balance--;

    if (balance < 0) return false;
}

return balance === 0;
```

Với nhiều loại ngoặc, dùng stack và Map cặp ngoặc.

### 10.3 Queue bằng head

```js
const queue = [];
let head = 0;

queue.push(start);

while (head < queue.length) {
    const current = queue[head++];
    // process current
}
```

**Bẫy:** không dùng `shift()` lặp trên input lớn.

### 10.4 Deque bằng object + hai chỉ số

```js
class Deque {
    constructor() {
        this.data = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }

    get size() {
        return this.backIndex - this.frontIndex;
    }

    pushBack(value) {
        this.data[this.backIndex++] = value;
    }

    pushFront(value) {
        this.data[--this.frontIndex] = value;
    }

    popFront() {
        if (this.size === 0) return undefined;
        const value = this.data[this.frontIndex];
        delete this.data[this.frontIndex++];
        return value;
    }

    popBack() {
        if (this.size === 0) return undefined;
        const index = --this.backIndex;
        const value = this.data[index];
        delete this.data[index];
        return value;
    }

    front() {
        return this.data[this.frontIndex];
    }

    back() {
        return this.data[this.backIndex - 1];
    }
}
```

### 10.5 Batch liên tiếp

```js
const batches = [];
let releaseDay = finishDays[0];
let count = 1;

for (let i = 1; i < finishDays.length; i++) {
    if (finishDays[i] <= releaseDay) {
        count++;
    } else {
        batches.push(count);
        releaseDay = finishDays[i];
        count = 1;
    }
}

batches.push(count);
```

**Invariant:** batch hiện tại bị khóa bởi ngày hoàn thành của phần tử đầu batch.

### 10.6 Monotonic stack — next greater

```js
const answer = Array(numbers.length).fill(-1);
const stack = []; // index chưa có next greater

for (let i = 0; i < numbers.length; i++) {
    while (stack.length && numbers[stack[stack.length - 1]] < numbers[i]) {
        answer[stack.pop()] = numbers[i];
    }
    stack.push(i);
}
```

**Invariant:** stack chứa index chưa giải quyết; giá trị trên stack đơn điệu giảm không nghiêm ngặt.

**Complexity:** mỗi index push/pop tối đa một lần → `O(N)`.

---

## 11. Heap/Priority Queue

### 11.1 MinHeap chuẩn JavaScript

```js
class MinHeap {
    constructor(compare = (a, b) => a - b) {
        this.heap = [];
        this.compare = compare;
    }

    get size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown(0);
        return root;
    }

    _bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[parent], this.heap[index]) <= 0) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    _bubbleDown(index) {
        const n = this.heap.length;

        while (true) {
            let best = index;
            const left = index * 2 + 1;
            const right = index * 2 + 2;

            if (left < n && this.compare(this.heap[left], this.heap[best]) < 0) best = left;
            if (right < n && this.compare(this.heap[right], this.heap[best]) < 0) best = right;
            if (best === index) break;

            [this.heap[index], this.heap[best]] = [this.heap[best], this.heap[index]];
            index = best;
        }
    }
}
```

### 11.2 Heap với object và tie-break

```js
const pq = new MinHeap((a, b) =>
    a.priority - b.priority ||
    a.calledAt - b.calledAt ||
    a.id - b.id
);
```

### 11.3 Lặp lấy hai phần tử nhỏ nhất

```js
while (pq.size >= 2 && operations-- > 0) {
    const a = pq.pop();
    const b = pq.pop();
    const merged = a + b;
    pq.push(merged);
    pq.push(merged); // chỉ khi đề nói cả hai cùng nhận giá trị mới
}
```

**Bẫy:** đọc chính xác đề push lại một hay hai phần tử; comparator object; empty heap; priority bằng nhau.

**Complexity:** `push/pop = O(log N)`, `peek = O(1)`.

---

## 12. Brute Force, Recursion, Backtracking

### 12.1 Khi nào brute force hợp lệ

Tính số trạng thái trước:

```text
2^N: chọn/không chọn
N!: thử mọi thứ tự
N^K: mỗi bước có N lựa chọn, sâu K
```

Chỉ dùng khi bound chịu được.

### 12.2 DFS nhị phân

```js
let answer = 0;

function dfs(index, value) {
    if (index === numbers.length) {
        if (value === target) answer++;
        return;
    }

    dfs(index + 1, value + numbers[index]);
    dfs(index + 1, value - numbers[index]);
}
```

### 12.3 Permutation/backtracking

```js
const used = Array(items.length).fill(false);
let best = -Infinity;

function dfs(depth, score) {
    if (depth === targetDepth) {
        best = Math.max(best, score);
        return;
    }

    for (let i = 0; i < items.length; i++) {
        if (used[i]) continue;

        used[i] = true;                    // choose
        dfs(depth + 1, score + gain(i));   // recurse
        used[i] = false;                   // undo
    }
}
```

### 12.4 Pruning

```js
if (currentScore + maximumPossibleRemaining <= best) return;
if (!canContinue(state)) return;
```

**Invariant:** trước mỗi vòng `for`, `used/state` đúng với đường đi từ root đến node hiện tại.

**Bẫy:** quên undo; base case sai độ sâu; mutate object dùng chung; không kiểm bound trước khi chọn.

---

## 13. Binary Search

### 13.1 Tìm exact value

```js
let left = 0;
let right = numbers.length - 1;

while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (numbers[mid] === target) return mid;
    if (numbers[mid] < target) left = mid + 1;
    else right = mid - 1;
}

return -1;
```

### 13.2 Lower bound — vị trí đầu tiên `>= target`

```js
let left = 0;
let right = numbers.length;

while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (numbers[mid] >= target) right = mid;
    else left = mid + 1;
}

return left;
```

### 13.3 Binary search on answer — tìm nhỏ nhất thỏa

```js
let left = minimumPossible;
let right = maximumPossible;

while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (feasible(mid)) right = mid;
    else left = mid + 1;
}

return left;
```

### 13.4 Tìm lớn nhất thỏa

```js
let left = minimumPossible;
let right = maximumPossible;

while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);

    if (feasible(mid)) left = mid;
    else right = mid - 1;
}

return left;
```

**Điều kiện bắt buộc:** `feasible(x)` phải đơn điệu.

**Bẫy:** sai miền đáp án; dùng mid không lệch phải khi tìm max gây vòng lặp vô hạn; predicate quá chậm.

---

## 14. DFS, BFS và Graph

### 14.1 Adjacency list

```js
const graph = Array.from({ length: n }, () => []);

for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a); // bỏ dòng này nếu directed
}
```

### 14.2 DFS graph

```js
const visited = Array(n).fill(false);

function dfs(node) {
    visited[node] = true;

    for (const next of graph[node]) {
        if (!visited[next]) dfs(next);
    }
}
```

### 14.3 Connected components

```js
let components = 0;

for (let node = 0; node < n; node++) {
    if (visited[node]) continue;
    dfs(node);
    components++;
}
```

### 14.4 BFS graph

```js
const distance = Array(n).fill(-1);
const queue = [start];
let head = 0;
distance[start] = 0;

while (head < queue.length) {
    const current = queue[head++];

    for (const next of graph[current]) {
        if (distance[next] !== -1) continue;
        distance[next] = distance[current] + 1;
        queue.push(next);
    }
}
```

### 14.5 BFS grid

```js
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
const distance = Array.from({ length: rows }, () => Array(cols).fill(-1));
const queue = [[startRow, startCol]];
let head = 0;
distance[startRow][startCol] = 0;

while (head < queue.length) {
    const [row, col] = queue[head++];

    for (let d = 0; d < 4; d++) {
        const nextRow = row + dr[d];
        const nextCol = col + dc[d];

        if (!inBounds(nextRow, nextCol, rows, cols)) continue;
        if (board[nextRow][nextCol] === "X") continue;
        if (distance[nextRow][nextCol] !== -1) continue;

        distance[nextRow][nextCol] = distance[row][col] + 1;
        queue.push([nextRow, nextCol]);
    }
}
```

**Luật:** mark visited/distance **lúc enqueue**, không đợi dequeue.

### 14.6 Multi-source BFS

```js
const queue = [];
let head = 0;

for (const source of sources) {
    distance[source] = 0;
    queue.push(source);
}

while (head < queue.length) {
    const current = queue[head++];

    for (const next of graph[current]) {
        if (distance[next] !== -1) continue;
        distance[next] = distance[current] + 1;
        queue.push(next);
    }
}
```

**Tư duy:** tưởng tượng một super-source nối tới mọi source bằng cạnh cost 0.

### 14.7 Multi-phase BFS

```js
const first = bfs(start, lever);
if (first === -1) return -1;

const second = bfs(lever, exit);
if (second === -1) return -1;

return first + second;
```

Mỗi phase dùng visited/distance riêng nếu việc đến phase mới thay đổi luật/state.

### 14.8 BFS với state phụ

```js
const visited = Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => Array(2).fill(false))
);

const queue = [[startRow, startCol, 0, 0]]; // row, col, used, distance
let head = 0;
visited[startRow][startCol][0] = true;

while (head < queue.length) {
    const [row, col, used, dist] = queue[head++];

    for (const next of transitions(row, col, used)) {
        const [nr, nc, nextUsed] = next;
        if (visited[nr][nc][nextUsed]) continue;
        visited[nr][nc][nextUsed] = true;
        queue.push([nr, nc, nextUsed, dist + 1]);
    }
}
```

**Tư duy:** nếu tương lai từ cùng một vị trí khác nhau vì đã/ chưa dùng quyền, đó là hai state khác nhau.

**Complexity DFS/BFS:** `O(V + E)`; grid `O(rows × cols × số trạng thái phụ)`.

### 14.9 Floyd–Warshall cho reachability/all-pairs nhỏ

```js
const reachable = Array.from({ length: n }, () => Array(n).fill(false));

for (const [from, to] of edges) reachable[from][to] = true;

for (let via = 0; via < n; via++) {
    for (let from = 0; from < n; from++) {
        for (let to = 0; to < n; to++) {
            reachable[from][to] ||= reachable[from][via] && reachable[via][to];
        }
    }
}
```

**Dùng khi:** cần quan hệ đến được giữa nhiều cặp và `N³` chịu được.

---

## 15. Dijkstra

**Tín hiệu:** shortest path, trọng số cạnh không âm và không đồng đều.

```js
function dijkstra(graph, start) {
    const distance = Array(graph.length).fill(Infinity);
    const pq = new MinHeap((a, b) => a.dist - b.dist);

    distance[start] = 0;
    pq.push({ node: start, dist: 0 });

    while (pq.size) {
        const { node, dist } = pq.pop();
        if (dist !== distance[node]) continue; // stale entry

        for (const { to, cost } of graph[node]) {
            const nextDist = dist + cost;
            if (nextDist >= distance[to]) continue;

            distance[to] = nextDist;
            pq.push({ node: to, dist: nextDist });
        }
    }

    return distance;
}
```

**Invariant:** khi pop entry không stale nhỏ nhất, đó là khoảng cách tốt nhất hiện biết; relaxation chỉ cải thiện distance.

**Bẫy:** cạnh âm; quên stale check; adjacency list sai chiều; multiple edges.

**Complexity:** `O((V + E) log V)` với heap.

---

## 16. Tree, Union-Find và MST

### 16.1 Tree traversal với parent

```js
function dfs(node, parent) {
    for (const next of tree[node]) {
        if (next === parent) continue;
        dfs(next, node);
    }
}
```

### 16.2 Parent propagation

```js
let current = start;

while (current !== -1 && amount > 0) {
    const passedUp = Math.floor(amount * rate);
    const kept = amount - passedUp;
    profit[current] += kept;

    current = parent[current];
    amount = passedUp;
}
```

**Bẫy:** điều kiện dừng ở root; rounding phải đúng đề; amount về 0 thì dừng sớm.

### 16.3 Union-Find

```js
const parent = Array.from({ length: n }, (_, i) => i);
const rank = Array(n).fill(0);

function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
}

function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);
    if (rootA === rootB) return false;

    if (rank[rootA] < rank[rootB]) [rootA, rootB] = [rootB, rootA];
    parent[rootB] = rootA;
    if (rank[rootA] === rank[rootB]) rank[rootA]++;
    return true;
}
```

### 16.4 Kruskal MST

```js
edges.sort((a, b) => a.cost - b.cost);

let total = 0;
let selected = 0;

for (const edge of edges) {
    if (!union(edge.from, edge.to)) continue;
    total += edge.cost;
    selected++;
    if (selected === n - 1) break;
}
```

**Invariant:** các cạnh đã chọn không tạo chu trình và có thể mở rộng thành một MST.

**Bẫy:** graph không liên thông; index 0/1; directed graph không dùng MST.

---

## 17. Greedy

### 17.1 Checklist chứng minh greedy

```text
1. Quyết định cục bộ là gì?
2. Vì sao quyết định khác không thể tốt hơn?
3. Sau quyết định, phần còn lại có cùng cấu trúc bài toán không?
4. Có phản ví dụ nhỏ nào phá chiến lược không?
```

### 17.2 Interval greedy

```js
intervals.sort((a, b) => a.end - b.end);

let count = 0;
let lastPoint = -Infinity;

for (const { start, end } of intervals) {
    if (lastPoint < start) {
        lastPoint = end;
        count++;
    }
}
```

Biên `<=` hay `<` phụ thuộc interval đóng/mở trong đề.

### 17.3 Monotonic greedy bằng stack

```js
const stack = [];
let remove = k;

for (const digit of number) {
    while (remove > 0 && stack.length && stack[stack.length - 1] < digit) {
        stack.pop();
        remove--;
    }
    stack.push(digit);
}

if (remove > 0) stack.splice(stack.length - remove, remove);
return stack.join("");
```

**Invariant:** prefix trong stack là tốt nhất có thể sau khi dùng số lượt xóa hiện tại.

**Cảnh báo:** không gọi một lời giải là greedy chỉ vì nó “chọn cái có vẻ tốt nhất”; cần exchange/proof hoặc invariant.

---

## 18. Dynamic Programming

### 18.1 Công thức thiết kế DP

```text
STATE: dp[...] đại diện chính xác cho gì?
TRANSITION: state này đến từ state nào?
BASE: bài toán nhỏ nhất có đáp án gì?
ORDER: phải tính theo thứ tự nào để dependency có trước?
ANSWER: nằm ở dp nào?
```

### 18.2 1D DP

```js
const dp = Array(n + 1).fill(0);
dp[0] = baseValue;

for (let i = 1; i <= n; i++) {
    dp[i] = transition(dp, i);
}
```

### 18.3 Integer triangle

```js
const dp = triangle.map(row => [...row]);

for (let row = 1; row < dp.length; row++) {
    for (let col = 0; col < dp[row].length; col++) {
        const fromLeft = col > 0 ? dp[row - 1][col - 1] : -Infinity;
        const fromRight = col < dp[row - 1].length ? dp[row - 1][col] : -Infinity;
        dp[row][col] += Math.max(fromLeft, fromRight);
    }
}

return Math.max(...dp[dp.length - 1]);
```

### 18.4 Grid path count

```js
const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
dp[0][0] = 1;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        if (blocked[row][col]) {
            dp[row][col] = 0;
            continue;
        }
        if (row > 0) dp[row][col] += dp[row - 1][col];
        if (col > 0) dp[row][col] += dp[row][col - 1];
        dp[row][col] %= MOD;
    }
}
```

**Bẫy:** obstacle tại start; hai mép; modulo sau phép cộng; iteration order; nhầm DFS memo với BFS.

---

# PHẦN III — CHỌN ĐÚNG BIẾN THỂ

## 19. BFS hay Dijkstra hay DP?

| Bài | Chọn |
|---|---|
| Mỗi bước cost bằng nhau, cần ít bước nhất | BFS |
| Cạnh có cost không âm khác nhau | Dijkstra |
| Đồ thị DAG/thứ tự phụ thuộc rõ, tối ưu/đếm cách | DP |
| Chỉ cần đi hết/đếm component | DFS hoặc BFS |

## 20. Set hay Map?

| Cần lưu | Chọn |
|---|---|
| Có/không | Set |
| Số lần | Map count |
| Index/value gần nhất | Map lookup |
| Danh sách theo nhóm | Map array |
| Tổng + list + metadata | Map object |

## 21. Two pointers hay Prefix sum?

| Tình huống | Chọn |
|---|---|
| Một lần tìm cửa sổ, pointer có thể tiến đơn điệu | Two pointers/window |
| Nhiều query tổng đoạn tĩnh | Prefix sum |
| Có số âm và cần đếm subarray sum = K | Prefix sum + frequency Map |

Kernel prefix sum + Map:

```js
const frequency = new Map([[0, 1]]);
let prefix = 0;
let answer = 0;

for (const value of numbers) {
    prefix += value;
    answer += frequency.get(prefix - target) ?? 0;
    frequency.set(prefix, (frequency.get(prefix) ?? 0) + 1);
}
```

**Invariant:** Map chứa tần suất prefix sum của mọi vị trí trước vị trí hiện tại.

## 22. Simulation từng giây hay event jump?

```text
maxTime nhỏ → từng giây thường an toàn.
maxTime rất lớn, event ít → nhảy event.
luôn xác định thứ tự event cùng timestamp.
```

---

# PHẦN IV — HIDDEN TEST VÀ PHÒNG THI

## 23. Checklist hidden test

```text
[ ] empty hoặc không có đáp án
[ ] một phần tử / 1×1
[ ] tất cả giống nhau
[ ] duplicate có ý nghĩa
[ ] tie-break
[ ] đúng tại boundary
[ ] command bị hủy ở bước cuối
[ ] unreachable
[ ] disconnected graph
[ ] zero và giá trị âm
[ ] Number overflow / cần BigInt
[ ] sort làm mutate input
[ ] queue dùng shift() gây chậm
[ ] visited đánh dấu quá muộn
[ ] stale heap entry
[ ] off-by-one ở window/prefix
```

## 24. Complexity recall

| Kernel | Time |
|---|---:|
| Map/Set trung bình | `O(1)` mỗi thao tác |
| Sort | `O(N log N)` |
| Two pointers/window | `O(N)` sau sort hoặc trên mảng gốc |
| Prefix build/query | `O(N)` / `O(1)` |
| Stack/queue scan | `O(N)` |
| Heap push/pop | `O(log N)` |
| DFS/BFS graph | `O(V + E)` |
| Dijkstra heap | `O((V + E) log V)` |
| Binary search | `O(log R × cost(feasible))` |
| Kruskal | `O(E log E)` |
| Backtracking | phụ thuộc số trạng thái, thường mũ/giai thừa |

## 25. Protocol 120 phút

```text
0–5: scan 4 bài; ghi bound + pattern + confidence.
5–25: khóa bài dễ nhất.
25–55: bài xác suất AC cao thứ hai.
55–90: bài phù hợp tiếp theo.
90–102: hoàn thiện lời giải gần đúng nhất.
102–116: audit hidden case và complexity.
116–120: chạy sample và kiểm Submit Code cả 4 bài.
```

Nếu 10–12 phút không tạo thêm hướng/state/code hữu ích: chuyển bài.

## 26. Final recall — đọc ngay trước khi thi

```text
1. Đọc bound trước khi chọn thuật toán.
2. Viết STATE và INVARIANT trước vòng lặp.
3. Duplicate có ý nghĩa → Map count, không dùng Set.
4. Command có thể hủy → COPY → TRY → COMMIT.
5. Queue dùng head, BFS mark lúc enqueue.
6. Sort số luôn có comparator.
7. Window chỉ chạy khi pointer tiến đơn điệu.
8. Heap khi cần lấy best hiện tại lặp lại.
9. Backtracking luôn CHOOSE → RECURSE → UNDO.
10. BFS state phải chứa mọi thông tin ảnh hưởng tương lai.
11. Binary search on answer cần predicate đơn điệu.
12. DP phải viết state/transition/base/order.
13. Test singleton, duplicate, tie, boundary, unreachable.
14. Đừng sa lầy một bài quá 10–12 phút không tiến triển.
15. Bấm Submit Code từng bài.
```

---

## 27. Definition of done cho một kernel

Một kernel chỉ được coi là “thuộc” khi:

```text
[ ] Nhìn tín hiệu và gọi đúng tên pattern trong 30 giây.
[ ] Viết được code từ trắng trong 3–7 phút.
[ ] Nói được invariant bằng một câu.
[ ] Nêu được complexity.
[ ] Nêu được ít nhất hai hidden case.
[ ] Áp dụng được vào một đề khác tên.
```

Không cần thuộc full lời giải của mọi bài. Cần thuộc **quyết định thiết kế + kernel + invariant**.
