# Bộ template JavaScript tối thiểu cho PCCP

> Phiên bản nghiên cứu: 30/07/2026  
> Mục tiêu: viết được trong editor của Programmers, không dùng thư viện ngoài, không phụ thuộc autocomplete.

Tài liệu này không phải danh sách 22 đoạn code cần học thuộc ngay. Hãy học theo ba mức:

- **Phải viết không nhìn:** duyệt array, duyệt/tạo matrix, numeric sort, `Map`, `Set`, stack, queue bằng head index.
- **Phải hiểu và viết được sau vài lần luyện:** BFS, DFS, binary search, heap, backtracking, DP.
- **Chỉ cần nhận diện rồi mở lại khi ôn:** Dijkstra và các biến thể ít dùng.

Quy tắc học template: đọc một lần, đóng tài liệu, viết lại từ trang trắng, chạy ví dụ nhỏ, rồi ghi lỗi vào Error Log. Template chỉ được tính là “thuộc” khi viết lại đúng hai lần ở hai ngày khác nhau.

## 0. Các quy ước an toàn

### Chỉ mục và khoảng

- Array và matrix dùng chỉ mục từ `0`.
- Ưu tiên khoảng nửa mở `[left, right)`: có `right - left` phần tử.
- Với matrix, luôn tách `rows` và `cols`; không giả định ma trận vuông.
- Truy cập ô bằng `matrix[row][col]`, không phải `matrix[row, col]`.

```js
const rows = matrix.length;
const cols = matrix[0].length;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const value = matrix[row][col];
    }
}
```

### `Array(n).fill([])` dùng chung reference

`fill()` đặt chính xác cùng một object vào mọi ô. Vì vậy đoạn sau sai khi tạo matrix:

```js
const wrong = Array(3).fill([]);
wrong[0].push(7);
console.log(wrong); // [[7], [7], [7]]
```

Tạo từng hàng độc lập bằng `Array.from`:

```js
const rows = 3;
const cols = 4;
const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
```

### `sort()` vừa sort chuỗi mặc định, vừa mutate array

```js
const values = [1, 30, 4, 21];

values.sort();
console.log(values); // [1, 21, 30, 4] — sai nếu muốn sort số

values.sort((a, b) => a - b); // tăng dần
values.sort((a, b) => b - a); // giảm dần

const original = [3, 1, 2];
const sortedCopy = [...original].sort((a, b) => a - b);
```

### Object, `Map`, `Set`

| Cấu trúc | Dùng khi | Cú pháp nhớ |
|---|---|---|
| Object | Tập field cố định hoặc key chuỗi đơn giản | `obj[key] ?? 0` |
| `Map` | Key động, cần `size`, duyệt entry rõ ràng | `map.get(key) ?? 0` |
| `Set` | Chỉ cần biết một giá trị đã tồn tại chưa | `set.has(value)` |

Trong bài thi, dùng `Map` cho frequency counter giúp tránh các key đặc biệt của object và làm ý định rõ hơn.

### Shallow copy và deep copy vừa đủ

```js
const arrayCopy = [...array];       // đủ cho array chứa primitive
const rowCopy = row.slice();
const matrixCopy = matrix.map((row) => row.slice());
```

`[...matrix]` chỉ copy array ngoài; các hàng vẫn là cùng reference. Với object lồng sâu, chỉ clone đúng phần cần sửa thay vì mặc định dùng JSON. `JSON.parse(JSON.stringify(x))` làm mất `BigInt`, `Map`, `Set`, `undefined` và một số kiểu khác.

### `Number`, `BigInt` và bitwise

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

const exact = 9_007_199_254_740_993n;
const doubled = exact * 2n;
```

- Chỉ dùng `BigInt` khi phép tính có thể vượt `Number.MAX_SAFE_INTEGER` và đề thật sự cần số nguyên chính xác.
- Không trộn `Number` và `BigInt` trong phép cộng, trừ, nhân, chia.
- Không dùng toán tử bitwise để “tối ưu” số lớn: bitwise thường ép về số nguyên 32 bit.
- Không tự đổi kết quả thành chuỗi nếu hợp đồng output yêu cầu số; đọc kỹ kiểu trả về của đề.

### State và closure

Đặt state bên trong `solution` hoặc reset rõ ràng trước mỗi lần chạy. Tránh biến module-level giữ lại dữ liệu giữa các lần gọi thử.

```js
function solution(input) {
    const visited = new Set();
    let answer = 0;

    // Mọi state của lần chạy nằm trong hàm.
    return answer;
}
```

## 1. Duyệt array một chiều

**Mục đích:** đọc từng phần tử, tính tổng, đếm hoặc cập nhật kết quả.

**Khi dùng / dấu hiệu:** đề nói “với mỗi phần tử”, “đếm”, “tổng”, “giá trị lớn nhất”.

```js
function sumArray(values) {
    let sum = 0;

    for (let index = 0; index < values.length; index++) {
        sum += values[index];
    }

    return sum;
}
```

Ví dụ: `sumArray([2, 5, 1])` trả `8`.

**Complexity:** thời gian `O(N)`, bộ nhớ phụ `O(1)`.

**Lỗi thường gặp:** dùng `<= values.length`; dùng nhầm `index` thay cho `values[index]`; sửa input khi không cần.

**Checklist trước submit:**

- Vòng lặp là `index < values.length`?
- Array một phần tử có đúng?
- Tổng có thể vượt safe integer không?

## 2. Duyệt matrix

**Mục đích:** đọc từng ô theo hàng/cột và tránh lỗi ma trận không vuông.

**Khi dùng / dấu hiệu:** grid, bàn cờ, bản đồ, ảnh, số hàng và số cột.

```js
function sumMatrix(matrix) {
    let sum = 0;

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            sum += matrix[row][col];
        }
    }

    return sum;
}
```

Ví dụ: `sumMatrix([[1, 2, 3], [4, 5, 6]])` trả `21`.

**Complexity:** `O(R * C)` với matrix chữ nhật.

**Lỗi thường gặp:** vòng cột dùng `matrix.length`; viết `matrix[row, col]`; đổi `row` và `col`; giả định luôn có `matrix[0]` khi đề có thể cho matrix rỗng.

**Checklist trước submit:**

- Số cột lấy từ `matrix[row].length` hoặc `matrix[0].length` sau khi xác nhận không rỗng?
- Truy cập có đủ hai cặp `[]`?
- Đã thử matrix `1 x N`, `N x 1`, `2 x 3`?

## 3. Tạo matrix

**Mục đích:** tạo `visited`, `distance`, bảng DP hoặc kết quả.

**Khi dùng / dấu hiệu:** cần trạng thái riêng cho từng ô.

```js
function createMatrix(rows, cols, makeValue = () => 0) {
    return Array.from(
        { length: rows },
        (_, row) =>
            Array.from(
                { length: cols },
                (_, col) => makeValue(row, col),
            ),
    );
}
```

Ví dụ: `createMatrix(2, 3, () => false)` tạo hai hàng độc lập. Với object, dùng `createMatrix(2, 3, () => ({ visited: false }))` để mỗi ô có object riêng.

**Complexity:** thời gian và bộ nhớ `O(R * C)`.

**Lỗi thường gặp:** `Array(rows).fill(Array(cols).fill(0))`; đảo `rows`, `cols`; callback trả lại cùng một object đã tạo sẵn.

**Checklist trước submit:**

- Callback của `Array.from` có tạo array mới?
- `rows` và `cols` đúng thứ tự?
- `makeValue` có tạo giá trị/object độc lập cho từng ô không?

## 4. Clone array và matrix

**Mục đích:** thử một nhánh mà không làm hỏng input hoặc state của nhánh khác.

**Khi dùng / dấu hiệu:** backtracking, simulation thử nhiều phương án, cần giữ input gốc.

```js
function cloneArray(values) {
    return values.slice();
}

function cloneMatrix(matrix) {
    return matrix.map((row) => row.slice());
}
```

Ví dụ: sửa `copy[0][0]` không làm thay đổi `matrix[0][0]`.

**Complexity:** array `O(N)`; matrix `O(R * C)`.

**Lỗi thường gặp:** dùng `[...matrix]` rồi sửa một ô; clone toàn bộ trong mỗi bước DFS khiến quá chậm.

**Checklist trước submit:**

- Dữ liệu con là primitive hay object?
- Có thể dùng “đánh dấu rồi hoàn tác” thay vì clone mỗi nhánh không?
- Có mutate input ngoài ý muốn?

## 5. Numeric sort và comparator nhiều khóa

**Mục đích:** sắp số hoặc record theo thứ tự xác định.

**Khi dùng / dấu hiệu:** “nhỏ nhất trước”, “ưu tiên”, “nếu bằng nhau thì…”.

```js
function sortNumbersAscending(values) {
    return [...values].sort((a, b) => a - b);
}

function sortJobs(jobs) {
    return [...jobs].sort((a, b) => {
        const [priorityA, timeA] = a;
        const [priorityB, timeB] = b;

        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }

        return timeA - timeB;
    });
}
```

Ví dụ: `sortNumbersAscending([10, 2, 1])` trả `[1, 2, 10]`.

**Complexity:** thường dùng như `O(N log N)` trong phân tích bài; `sort()` mutate array nhận.

**Lỗi thường gặp:** quên comparator số; comparator trả boolean; quên tie-break; vô tình đổi input.

**Checklist trước submit:**

- Sort số đã có `(a, b) => a - b`?
- Tie-break đúng theo đề?
- Có cần copy trước sort?

## 6. Frequency counter bằng `Map`

**Mục đích:** đếm số lần xuất hiện.

**Khi dùng / dấu hiệu:** “tần suất”, “bao nhiêu lần”, “phần tử thiếu”, “gom nhóm theo key”.

```js
function buildFrequency(values) {
    const frequency = new Map();

    for (const value of values) {
        frequency.set(value, (frequency.get(value) ?? 0) + 1);
    }

    return frequency;
}
```

Ví dụ: với `["a", "b", "a"]`, `frequency.get("a")` là `2`.

**Complexity:** trung bình `O(N)` thời gian, `O(K)` bộ nhớ với `K` key khác nhau.

**Lỗi thường gặp:** `map[key]`; quên `?? 0`; giảm count xuống âm; key tuple dùng array mới nên không cùng identity.

**Checklist trước submit:**

- Mọi key chưa có được xử lý bằng `?? 0`?
- Key tọa độ đã encode ổn định như `` `${row},${col}` ``?
- Khi count về `0`, có cần xóa key không?

## 7. Membership bằng `Set`

**Mục đích:** kiểm tra đã gặp, loại trùng hoặc quản lý `visited`.

**Khi dùng / dấu hiệu:** “duy nhất”, “đã xuất hiện”, “có tồn tại”.

```js
function countUnique(values) {
    const seen = new Set();

    for (const value of values) {
        seen.add(value);
    }

    return seen.size;
}
```

Ví dụ: `countUnique([2, 2, 3])` trả `2`.

**Complexity:** trung bình `O(N)` thời gian, `O(K)` bộ nhớ.

**Lỗi thường gặp:** dùng `.includes()` trên array trong vòng lặp lớn; object/array so sánh theo reference; quên xóa state khi backtrack.

**Checklist trước submit:**

- Dùng `set.has(value)`, không phải `value in set`?
- Giá trị phức tạp đã encode ổn định?
- `visited` là toàn cục cho cả bài hay theo từng đường đi?

## 8. Stack

**Mục đích:** LIFO — phần vào sau ra trước.

**Khi dùng / dấu hiệu:** ngoặc, undo, đường đi hiện tại, “phần tử gần nhất bên trái/phải”.

```js
function isValidParentheses(text) {
    const stack = [];

    for (const char of text) {
        if (char === "(") {
            stack.push(char);
        } else {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0;
}
```

Ví dụ: `"(()())"` trả `true`; `"())"` trả `false`.

**Complexity:** `O(N)` thời gian, `O(N)` bộ nhớ xấu nhất.

**Lỗi thường gặp:** `pop()` khi stack rỗng; quên kiểm tra stack cuối; dùng queue thay vì stack.

**Checklist trước submit:**

- Trước `pop()` đã kiểm tra rỗng?
- Sau vòng lặp stack phải ở trạng thái nào?
- Stack chứa value hay index?

## 9. Queue bằng head index

**Mục đích:** FIFO — phần vào trước ra trước, không gọi `shift()` lặp lại trên queue lớn.

**Khi dùng / dấu hiệu:** BFS, event theo thứ tự, hàng chờ.

```js
function processQueue(initialValues) {
    const queue = [...initialValues];
    let head = 0;

    while (head < queue.length) {
        const current = queue[head];
        head += 1;

        // Xử lý current.
    }
}
```

Ví dụ: queue `[10, 20, 30]` được đọc đúng thứ tự.

**Complexity:** mỗi phần tử enqueue/dequeue một lần, tổng `O(N)`.

**Lỗi thường gặp:** dùng `shift()` liên tục; điều kiện `head <= queue.length`; quên tăng `head`; nhầm `queue.length` với số phần tử chưa xử lý.

**Checklist trước submit:**

- Điều kiện là `head < queue.length`?
- Có tăng `head` đúng một lần?
- Có enqueue vô hạn do thiếu `visited`?

## 10. BFS trên grid

**Mục đích:** tìm khoảng cách ngắn nhất trên graph/grid không trọng số hoặc duyệt theo lớp.

**Khi dùng / dấu hiệu:** “ít bước nhất”, mỗi bước có chi phí như nhau, di chuyển bốn hướng.

```js
function shortestPath(grid, startRow, startCol, endRow, endCol) {
    if (grid.length === 0 || grid[0].length === 0) {
        return -1;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const isInside = (row, col) =>
        row >= 0 && row < rows && col >= 0 && col < cols;

    if (
        !isInside(startRow, startCol) ||
        !isInside(endRow, endCol) ||
        grid[startRow][startCol] === 0 ||
        grid[endRow][endCol] === 0
    ) {
        return -1;
    }

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    const distance = Array.from(
        { length: rows },
        () => Array(cols).fill(-1),
    );

    const queue = [[startRow, startCol]];
    let head = 0;
    distance[startRow][startCol] = 0;

    while (head < queue.length) {
        const [row, col] = queue[head];
        head += 1;

        if (row === endRow && col === endCol) {
            return distance[row][col];
        }

        for (const [deltaRow, deltaCol] of directions) {
            const nextRow = row + deltaRow;
            const nextCol = col + deltaCol;

            if (!isInside(nextRow, nextCol)) {
                continue;
            }
            if (grid[nextRow][nextCol] === 0) {
                continue;
            }
            if (distance[nextRow][nextCol] !== -1) {
                continue;
            }

            // Đánh dấu khi enqueue để không đưa cùng ô vào nhiều lần.
            distance[nextRow][nextCol] = distance[row][col] + 1;
            queue.push([nextRow, nextCol]);
        }
    }

    return -1;
}
```

Ví dụ: grid toàn `1` kích thước `2 x 2`, từ `(0,0)` đến `(1,1)` có khoảng cách `2`.

**Complexity:** `O(R * C)` thời gian và bộ nhớ.

**Lỗi thường gặp:** đánh dấu khi dequeue; kiểm tra ô trước khi kiểm tra boundary; dùng `shift()`; coi `0`/`1` ngược với đề; sai khi start bằng end.

**Checklist trước submit:**

- Grid có rỗng không; start/end có ở trong grid và là ô đi được không?
- Start đã được đánh dấu trước vòng lặp?
- Boundary dùng đúng `rows`, `cols`?
- Mỗi cạnh có cùng chi phí không? Nếu không, BFS thường không đủ.
- Không có đường đi trả đúng sentinel?

## 11. DFS iterative

**Mục đích:** duyệt thành phần liên thông mà không phụ thuộc độ sâu recursion.

**Khi dùng / dấu hiệu:** “vùng liên thông”, “đếm đảo”, chỉ cần duyệt hết chứ không cần đường ngắn nhất.

```js
function componentSize(grid, startRow, startCol, visited) {
    if (grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const isInside = (row, col) =>
        row >= 0 && row < rows && col >= 0 && col < cols;

    if (
        !isInside(startRow, startCol) ||
        grid[startRow][startCol] === 0 ||
        visited[startRow][startCol]
    ) {
        return 0;
    }

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    const stack = [[startRow, startCol]];
    visited[startRow][startCol] = true;
    let size = 0;

    while (stack.length > 0) {
        const [row, col] = stack.pop();
        size += 1;

        for (const [deltaRow, deltaCol] of directions) {
            const nextRow = row + deltaRow;
            const nextCol = col + deltaCol;

            if (
                nextRow < 0 ||
                nextRow >= rows ||
                nextCol < 0 ||
                nextCol >= cols
            ) {
                continue;
            }
            if (grid[nextRow][nextCol] === 0) {
                continue;
            }
            if (visited[nextRow][nextCol]) {
                continue;
            }

            visited[nextRow][nextCol] = true;
            stack.push([nextRow, nextCol]);
        }
    }

    return size;
}
```

Ví dụ: một block `[[1, 1], [0, 1]]` có size `3`.

**Complexity:** `O(R * C)` cho toàn bộ grid.

**Lỗi thường gặp:** recursion quá sâu dẫn đến lỗi call stack; quên `visited`; dùng một `visited` cho state cần phân biệt đường đi.

**Checklist trước submit:**

- Start có ở trong grid, đi được và chưa visited?
- Input có thể tạo đường đi dài hàng chục nghìn node? Nếu có, ưu tiên iterative.
- Đánh dấu trước khi push?
- Có cần reset `visited` giữa các lần thử độc lập?

## 12. Binary search tìm giá trị chính xác

**Mục đích:** tìm target trong array đã sort.

**Khi dùng / dấu hiệu:** dữ liệu đã sort và cần membership/index nhanh.

```js
function binarySearch(sortedValues, target) {
    let left = 0;
    let right = sortedValues.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        const value = sortedValues[middle];

        if (value === target) {
            return middle;
        }

        if (value < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}
```

Ví dụ: `binarySearch([1, 3, 7, 9], 7)` trả `2`.

**Complexity:** `O(log N)` thời gian, `O(1)` bộ nhớ.

**Lỗi thường gặp:** input chưa sort; không có `+1/-1` nên lặp vô hạn; điều kiện `<` và `<=` lệch.

**Checklist trước submit:**

- Search trên array đã sort đúng comparator?
- Mỗi vòng thu hẹp ít nhất một phần tử?
- Target ở đầu/cuối hoặc không tồn tại có đúng?

## 13. Lower bound và “giá trị nhỏ nhất thỏa điều kiện”

### Lower bound trong array

**Mục đích:** index đầu tiên có giá trị `>= target`.

```js
function lowerBound(sortedValues, target) {
    let left = 0;
    let right = sortedValues.length;

    while (left < right) {
        const middle = Math.floor((left + right) / 2);

        if (sortedValues[middle] >= target) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }

    return left;
}
```

Ví dụ: `lowerBound([1, 2, 2, 5], 2)` trả `1`; target lớn hơn mọi phần tử trả `length`.

### Binary search on answer

**Mục đích:** tìm số nhỏ nhất làm predicate đơn điệu chuyển từ `false` sang `true`.

```js
function firstTrue(low, high, isEnough) {
    let answer = high + 1;
    let left = low;
    let right = high;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);

        if (isEnough(middle)) {
            answer = middle;
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return answer;
}
```

Ví dụ: `firstTrue(1, 100, (x) => x * x >= 30)` trả `6`.

Nếu không có giá trị nào trong `[low, high]` thỏa, hàm trả sentinel `high + 1`; caller phải xử lý trường hợp này.

**Complexity:** `O(log(range) * cost(predicate))`.

**Lỗi thường gặp:** predicate không đơn điệu; chọn biên không chứa đáp án; overflow/precision trong predicate; trả `left/right` không nhất quán.

**Checklist trước submit:**

- Viết ra câu: “khi `x` tăng, predicate chỉ đổi một chiều”?
- Nếu `high` không thỏa, caller đã xử lý sentinel `high + 1`?
- Test đáp án đúng tại `low`, `high`, và ngay hai bên ranh giới?

## 14. Min-heap / Priority Queue

**Mục đích:** liên tục lấy phần tử ưu tiên nhất trong `O(log N)`.

**Khi dùng / dấu hiệu:** cần nhỏ nhất/lớn nhất lặp lại, scheduler, Dijkstra, gộp hai phần tử nhỏ nhất.

Quy ước: `compare(a, b) < 0` nghĩa là `a` có ưu tiên cao hơn `b`.

```js
class PriorityQueue {
    constructor(compare = (a, b) => a - b) {
        this.heap = [];
        this.compare = compare;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    peek() {
        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) {
            return undefined;
        }

        const top = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.siftDown(0);
        }

        return top;
    }

    siftUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (this.compare(this.heap[parent], this.heap[index]) <= 0) {
                break;
            }

            [this.heap[parent], this.heap[index]] = [
                this.heap[index],
                this.heap[parent],
            ];
            index = parent;
        }
    }

    siftDown(index) {
        const length = this.heap.length;

        while (true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let best = index;

            if (
                left < length &&
                this.compare(this.heap[left], this.heap[best]) < 0
            ) {
                best = left;
            }

            if (
                right < length &&
                this.compare(this.heap[right], this.heap[best]) < 0
            ) {
                best = right;
            }

            if (best === index) {
                break;
            }

            [this.heap[index], this.heap[best]] = [
                this.heap[best],
                this.heap[index],
            ];
            index = best;
        }
    }
}
```

Ví dụ min-heap:

```js
const queue = new PriorityQueue((a, b) => a - b);
queue.push(5);
queue.push(2);
queue.push(8);
console.log(queue.pop()); // 2
```

Ví dụ nhiều khóa: ưu tiên score nhỏ, rồi time nhỏ.

```js
const jobs = new PriorityQueue((a, b) => {
    if (a.score !== b.score) {
        return a.score - b.score;
    }
    return a.time - b.time;
});
```

**Complexity:** `peek O(1)`, `push O(log N)`, `pop O(log N)`, bộ nhớ `O(N)`.

**Lỗi thường gặp:** đảo comparator; quên tie-break; sau `pop()` không đưa `last` về root; child index sai; gọi `peek()` khi rỗng.

**Checklist trước submit:**

- Ba thao tác `push 5,2,8` rồi `pop` có ra `2`?
- Hai phần tử bằng khóa chính có đúng tie-break?
- Max-heap đã dùng comparator đảo dấu?
- Có cần lưu thêm id để thứ tự hoàn toàn xác định?

## 15. Prefix sum một chiều

**Mục đích:** trả lời nhiều truy vấn tổng đoạn nhanh.

**Khi dùng / dấu hiệu:** nhiều câu hỏi tổng từ `left` đến `right`; cần tính tổng đoạn liên tiếp lặp lại.

```js
function buildPrefixSum(values) {
    const prefix = Array(values.length + 1).fill(0);

    for (let index = 0; index < values.length; index++) {
        prefix[index + 1] = prefix[index] + values[index];
    }

    return prefix;
}

function rangeSum(prefix, left, rightExclusive) {
    return prefix[rightExclusive] - prefix[left];
}
```

Ví dụ: với `[3, 1, 4, 2]`, tổng đoạn index `1..2` là `rangeSum(prefix, 1, 3) = 5`.

**Complexity:** build `O(N)`; mỗi query `O(1)`; bộ nhớ `O(N)`.

**Lỗi thường gặp:** nhầm inclusive/exclusive; prefix thiếu ô `0`; query `[l, r]` nhưng dùng sai `r + 1`.

**Checklist trước submit:**

- Đã ghi rõ query là `[left, right)` hay `[left, right]`?
- Prefix có length `N + 1`?
- Tổng có thể vượt safe integer?

## 16. Two pointers trên array đã sort

**Mục đích:** di chuyển hai đầu để tìm cặp hoặc tối ưu ghép.

**Khi dùng / dấu hiệu:** array đã sort, ghép nhẹ-nặng, tìm cặp, hai đầu.

```js
function hasPairWithSum(values, target) {
    const sorted = [...values].sort((a, b) => a - b);
    let left = 0;
    let right = sorted.length - 1;

    while (left < right) {
        const sum = sorted[left] + sorted[right];

        if (sum === target) {
            return true;
        }

        if (sum < target) {
            left += 1;
        } else {
            right -= 1;
        }
    }

    return false;
}
```

Ví dụ: `[1, 4, 2, 8]`, target `6` trả `true`.

**Complexity:** `O(N log N)` vì sort; scan `O(N)`.

**Lỗi thường gặp:** chạy khi chưa sort; cho phép dùng cùng một index; di chuyển sai con trỏ; bỏ qua duplicate không đúng yêu cầu.

**Checklist trước submit:**

- Invariant giải thích được vì sao tăng `left` hoặc giảm `right`?
- Điều kiện dừng là `left < right`?
- Có được mutate/sort input không?

## 17. Sliding window cố định

**Mục đích:** tính nhanh trên mọi đoạn liên tiếp có độ dài `windowSize`.

**Khi dùng / dấu hiệu:** “đoạn liên tiếp”, độ dài cố định, max/min/count cho từng cửa sổ.

```js
function maxWindowSum(values, windowSize) {
    if (
        !Number.isInteger(windowSize) ||
        windowSize < 1 ||
        windowSize > values.length
    ) {
        return null;
    }

    let windowSum = 0;
    for (let index = 0; index < windowSize; index++) {
        windowSum += values[index];
    }

    let best = windowSum;

    for (let right = windowSize; right < values.length; right++) {
        const left = right - windowSize;
        windowSum += values[right];
        windowSum -= values[left];
        best = Math.max(best, windowSum);
    }

    return best;
}
```

Ví dụ: `[2, 1, 5, 1, 3]`, size `3` trả `9`.

**Complexity:** `O(N)` thời gian, `O(1)` bộ nhớ.

**Lỗi thường gặp:** bỏ cửa sổ đầu/cuối; trừ sai index; dùng window co giãn khi số âm phá tính đơn điệu.

**Checklist trước submit:**

- Cửa sổ đầu đã được tính?
- Khi thêm index `right`, đã bỏ đúng `right - windowSize`?
- Đề là size cố định hay điều kiện co giãn?

## 18. Backtracking: chọn mỗi vị trí một phần tử

**Mục đích:** thử tất cả lựa chọn khi input nhỏ, có hoàn tác state.

**Khi dùng / dấu hiệu:** `N` nhỏ, permutation/assignment, “mỗi người tối đa một việc”.

```js
function maxAssignmentScore(ability) {
    const studentCount = ability.length;
    if (studentCount === 0) {
        return 0;
    }

    const eventCount = ability[0].length;
    if (eventCount === 0) {
        return 0;
    }
    if (studentCount < eventCount) {
        return null;
    }

    const used = Array(studentCount).fill(false);
    let best = -Infinity;

    function choose(eventIndex, score) {
        if (eventIndex === eventCount) {
            best = Math.max(best, score);
            return;
        }

        for (let student = 0; student < studentCount; student++) {
            if (used[student]) {
                continue;
            }

            used[student] = true;
            choose(eventIndex + 1, score + ability[student][eventIndex]);
            used[student] = false;
        }
    }

    choose(0, 0);
    return best;
}
```

Ví dụ: hai học sinh, hai môn sẽ thử hai cách gán.

Hàm cho phép điểm âm; trả `null` nếu số học sinh ít hơn số môn nên không thể gán mỗi môn cho một người khác nhau.

**Complexity:** xấu nhất gần `O(P(N, M))`; chỉ dùng khi constraints cho phép.

**Lỗi thường gặp:** quên hoàn tác; base case sai; copy state quá nhiều; không prune dù có bound rõ.

**Checklist trước submit:**

- Đã ước lượng số lá tối đa?
- Mỗi thay đổi state có dòng hoàn tác đối xứng?
- Base case cập nhật answer rồi `return`?
- Có duplicate choice cần bỏ qua không?

## 19. DP một chiều

**Mục đích:** lưu kết quả của trạng thái lặp lại theo một trục.

**Khi dùng / dấu hiệu:** tối ưu/số cách, trạng thái `i` phụ thuộc vài trạng thái trước, brute force lặp lại.

Mô hình ví dụ: có thể bắt đầu tại bậc `0` hoặc `1`, trả `cost[i]` khi đặt chân lên bậc `i`, đi 1 hoặc 2 bậc, và đích là vị trí ngay sau phần tử cuối. `dp[i]` là chi phí nhỏ nhất để đặt chân lên bậc `i`.

```js
function minCost(cost) {
    const length = cost.length;

    if (length === 0) {
        return 0;
    }
    if (length === 1) {
        return 0;
    }

    const dp = Array(length).fill(0);
    dp[0] = cost[0];
    dp[1] = cost[1];

    for (let index = 2; index < length; index++) {
        dp[index] =
            cost[index] + Math.min(dp[index - 1], dp[index - 2]);
    }

    return Math.min(dp[length - 1], dp[length - 2]);
}
```

Ví dụ: `cost = [10, 15, 20]` cho kết quả `15` trong mô hình bước 1 hoặc 2 bậc.

**Complexity:** `O(N)` thời gian, `O(N)` bộ nhớ; có thể nén còn `O(1)` sau khi đã đúng.

**Lỗi thường gặp:** không định nghĩa `dp[i]` bằng câu rõ ràng; base case thiếu; transition dùng state chưa tính; trả sai ô.

**Checklist trước submit:**

- Viết được: “`dp[i]` nghĩa là…”?
- Base case phủ `N = 0, 1, 2` theo constraints?
- Thứ tự vòng lặp bảo đảm dependency đã có?
- Output là `dp[n]`, max/min vài ô, hay tổng?

## 20. DP hai chiều cơ bản

**Mục đích:** trạng thái phụ thuộc hai chỉ số, thường là grid hoặc hai chuỗi.

**Khi dùng / dấu hiệu:** số cách/chi phí đến ô `(row, col)`; lựa chọn theo hai chiều.

```js
function minPathSum(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const dp = Array.from(
        { length: rows },
        () => Array(cols).fill(Infinity),
    );

    dp[0][0] = grid[0][0];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (row > 0) {
                dp[row][col] = Math.min(
                    dp[row][col],
                    dp[row - 1][col] + grid[row][col],
                );
            }
            if (col > 0) {
                dp[row][col] = Math.min(
                    dp[row][col],
                    dp[row][col - 1] + grid[row][col],
                );
            }
        }
    }

    return dp[rows - 1][cols - 1];
}
```

Ví dụ: `[[1, 2], [3, 4]]` trả `7`.

**Complexity:** `O(R * C)` thời gian và bộ nhớ.

**Lỗi thường gặp:** matrix dùng chung reference; base row/col sai; transition cho phép hướng đề không cho; `Infinity + value` che lỗi initialization.

**Checklist trước submit:**

- `dp` có các hàng độc lập?
- Start và boundary được xử lý?
- Hướng chuyển khớp đúng đề?

## 21. Graph adjacency list

**Mục đích:** lưu graph thưa để DFS/BFS.

**Khi dùng / dấu hiệu:** danh sách cạnh, node/đỉnh và edge/cạnh.

```js
function buildUndirectedGraph(nodeCount, edges) {
    const graph = Array.from(
        { length: nodeCount },
        () => [],
    );

    for (const [from, to] of edges) {
        graph[from].push(to);
        graph[to].push(from);
    }

    return graph;
}
```

Ví dụ: cạnh `[[0, 1], [1, 2]]` tạo adjacency tương ứng.

**Complexity:** build `O(V + E)` thời gian và bộ nhớ.

**Lỗi thường gặp:** đề đánh số từ `1` nhưng array từ `0`; graph vô hướng chỉ thêm một chiều; dùng chung array do `fill([])`.

**Checklist trước submit:**

- Directed hay undirected?
- Node là `0..V-1` hay `1..V`?
- Có multi-edge/self-loop cần xử lý?

## 22. Dijkstra cơ bản

**Mục đích:** đường đi ngắn nhất khi trọng số cạnh không âm.

**Khi dùng / dấu hiệu:** graph có cost khác nhau; “chi phí nhỏ nhất”; mọi trọng số `>= 0`.

```js
function dijkstra(nodeCount, graph, start) {
    const distance = Array(nodeCount).fill(Infinity);
    const queue = new PriorityQueue((a, b) => a[0] - b[0]);

    distance[start] = 0;
    queue.push([0, start]);

    while (!queue.isEmpty()) {
        const [currentDistance, node] = queue.pop();

        if (currentDistance !== distance[node]) {
            continue;
        }

        for (const [next, weight] of graph[node]) {
            const candidate = currentDistance + weight;

            if (candidate >= distance[next]) {
                continue;
            }

            distance[next] = candidate;
            queue.push([candidate, next]);
        }
    }

    return distance;
}
```

Graph có dạng `graph[node] = [[next, weight], ...]`.

Ví dụ:

```js
const graph = [
    [[1, 4], [2, 1]],
    [[2, 2]],
    [[1, 1]],
];

console.log(dijkstra(3, graph, 0)); // [0, 2, 1]
```

**Complexity:** tổng quát `O((V + E) log E)` với heap không decrease-key và stale entries; với graph đơn thông thường có thể viết gọn `O((V + E) log V)`.

**Lỗi thường gặp:** có cạnh âm; quên bỏ entry cũ trong heap; đảo `[distance, node]`; adjacency thiếu trọng số; dùng BFS cho cost khác nhau.

**Checklist trước submit:**

- Tất cả weight không âm?
- Có dòng bỏ stale entry?
- Node không tới được giữ `Infinity` và được chuyển sang output đúng?
- Tổng distance có vượt safe integer không?

## 23. Deque hai đầu không dùng `shift()`

### Dấu hiệu

Cần thêm/xóa ở cả đầu và cuối, ví dụ 0-1 BFS, cửa sổ đơn điệu hoặc simulation hai đầu.

```js
function createDeque() {
    const data = Object.create(null);
    let front = 0;
    let back = 0; // phần tử hợp lệ nằm trong [front, back)

    return {
        get size() {
            return back - front;
        },

        isEmpty() {
            return front === back;
        },

        pushFront(value) {
            front--;
            data[front] = value;
        },

        pushBack(value) {
            data[back] = value;
            back++;
        },

        popFront() {
            if (front === back) return undefined;
            const value = data[front];
            delete data[front];
            front++;
            return value;
        },

        popBack() {
            if (front === back) return undefined;
            back--;
            const value = data[back];
            delete data[back];
            return value;
        },

        peekFront() {
            return front === back ? undefined : data[front];
        },

        peekBack() {
            return front === back ? undefined : data[back - 1];
        },
    };
}
```

**Complexity:** trung bình `O(1)` cho mọi thao tác, `O(n)` bộ nhớ.

**Lỗi thường gặp:** pop khi rỗng; nhầm `back` là index phần tử cuối thay vì vị trí sau cuối; dùng `shift()` trong vòng lặp lớn.

## 24. Sliding window co giãn

### Dấu hiệu

Đoạn liên tiếp, hai pointer chỉ tiến, và điều kiện thay đổi đơn điệu khi mở rộng/thu nhỏ. Template dưới đây yêu cầu mọi phần tử không âm.

```js
function minLengthWithSumAtLeast(nums, target) {
    let left = 0;
    let sum = 0;
    let best = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {
            best = Math.min(best, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return best === Infinity ? 0 : best;
}
```

**Invariant:** sau vòng `while`, cửa sổ hiện tại chưa đủ target; mọi cửa sổ đủ target kết thúc tại `right` đã được xét.

**Complexity:** `O(n)` vì mỗi phần tử vào và ra cửa sổ tối đa một lần.

**Không dùng khi:** có số âm mà proof dựa trên tổng tăng/giảm đơn điệu.

## 25. BFS với state nhiều chiều

### Dấu hiệu

Cùng một vị trí nhưng còn quyền/tài nguyên khác nhau sẽ dẫn tới tương lai khác nhau, ví dụ đã dùng kỹ năng đặc biệt hay chưa.

```js
function shortestPathWithOneBreak(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const distance = Array.from(
        { length: rows },
        () => Array.from({ length: cols }, () => [-1, -1]),
    );
    const queue = [[0, 0, 0]]; // row, col, usedBreak: 0 | 1
    let head = 0;

    distance[0][0][0] = 0;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (head < queue.length) {
        const [row, col, usedBreak] = queue[head++];

        for (const [dr, dc] of directions) {
            const nextRow = row + dr;
            const nextCol = col + dc;

            if (nextRow < 0 || nextRow >= rows) continue;
            if (nextCol < 0 || nextCol >= cols) continue;

            const isWall = grid[nextRow][nextCol] === 1;
            const nextUsedBreak = usedBreak + (isWall ? 1 : 0);

            if (nextUsedBreak > 1) continue;
            if (distance[nextRow][nextCol][nextUsedBreak] !== -1) continue;

            distance[nextRow][nextCol][nextUsedBreak] =
                distance[row][col][usedBreak] + 1;
            queue.push([nextRow, nextCol, nextUsedBreak]);
        }
    }

    const candidates = distance[rows - 1][cols - 1].filter(value => value !== -1);
    return candidates.length === 0 ? -1 : Math.min(...candidates);
}
```

**Invariant:** một state là `(row, col, usedBreak)`, không chỉ là ô. Mỗi state được enqueue tối đa một lần.

**Lỗi thường gặp:** `visited[row][col]` làm mất đường đi tới cùng ô nhưng chưa dùng kỹ năng; mark visited lúc dequeue; quên state đích có thể hợp lệ ở nhiều lớp.

## 26. Tree traversal thực chiến

### Dấu hiệu

Input là `n - 1` cạnh của một cây; cần depth, parent, subtree hoặc thứ tự duyệt.

```js
function buildTreeInfo(n, edges, root = 0) {
    const graph = Array.from({ length: n }, () => []);

    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const parent = Array(n).fill(-1);
    const depth = Array(n).fill(-1);
    const order = [];
    const queue = [root];
    let head = 0;

    parent[root] = root;
    depth[root] = 0;

    while (head < queue.length) {
        const node = queue[head++];
        order.push(node);

        for (const next of graph[node]) {
            if (depth[next] !== -1) continue;
            parent[next] = node;
            depth[next] = depth[node] + 1;
            queue.push(next);
        }
    }

    return { graph, parent, depth, order };
}
```

Muốn tính subtree bottom-up, duyệt `order` từ cuối về đầu và cộng vào `parent[node]`.

**Complexity:** `O(V + E)` time, `O(V + E)` space.

## 27. Simulation theo event

### Dấu hiệu

State chỉ đổi ở thời điểm có event. Timeline lớn nên không được lặp từng giây.

```js
function simulateSingleServer(requests) {
    const sorted = [...requests].sort((a, b) => a.arrival - b.arrival);
    const completionTimes = [];
    let currentTime = 0;

    for (const request of sorted) {
        currentTime = Math.max(currentTime, request.arrival);
        currentTime += request.duration;
        completionTimes.push(currentTime);
    }

    return completionTimes;
}
```

Với nhiều event cạnh tranh, thường là `sort arrivals + heap available jobs + clock`. Khi heap rỗng, nhảy `clock` tới arrival tiếp theo.

**Checklist:** state ban đầu; event cùng thời điểm; inclusive/exclusive; event cuối; idle gap; stop condition.

## 28. Monotonic stack

### Dấu hiệu

Tìm phần tử lớn/nhỏ hơn gần nhất, khoảng thời gian đến khi điều kiện bị phá, hoặc cần loại phần tử không còn cơ hội làm đáp án.

```js
function nextSmallerIndex(nums) {
    const answer = Array(nums.length).fill(-1);
    const stack = []; // index, giá trị tăng dần từ đáy lên đỉnh

    for (let i = 0; i < nums.length; i++) {
        while (
            stack.length > 0 &&
            nums[stack[stack.length - 1]] > nums[i]
        ) {
            const index = stack.pop();
            answer[index] = i;
        }

        stack.push(i);
    }

    return answer;
}
```

**Complexity:** `O(n)` vì mỗi index push một lần và pop tối đa một lần.

**Lỗi thường gặp:** lưu value khi cần index; dùng `>=` thay `>` làm sai duplicate; quên xử lý các index còn lại theo sentinel của đề.

## 29. Checklist viết code từ ý tưởng

Trước khi chạm bàn phím, viết năm dòng:

1. `N tối đa = ...`
2. `Complexity cho phép = ...`
3. `State / invariant = ...`
4. `Output và sentinel khi không có đáp án = ...`
5. `Ba edge case = ...`

Sau khi code:

- Chạy ví dụ nhỏ bằng tay.
- Chạy case một phần tử và boundary.
- Kiểm tra array/matrix có bị mutate.
- Kiểm tra mọi vòng lặp `<`/`<=`.
- Kiểm tra `return` đúng kiểu.
- Xóa `console.log`.

## Nguồn kỹ thuật

Các cảnh báo về `fill`, `sort`, `shift`, `Map`, `Set`, safe integer, `BigInt` và recursion được đối chiếu với MDN; danh sách URL và phạm vi sử dụng nằm trong [sources.md](sources.md).
