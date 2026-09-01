# PCCP Representation & Parsing Toolbox — JavaScript

> Hộp công cụ chuyển đổi dữ liệu dành cho coding contest, đặc biệt là PCCP.  
> Mục tiêu: gặp input lạ không phải phát minh từ số 0, mà nhận ra **hình dạng dữ liệu → representation phù hợp → hàm chuyển đổi quen thuộc**.

---

## 0. Tài liệu này giải quyết vấn đề gì?

Một bài coding contest thường có ba lớp:

```text
RAW INPUT
→ PARSE / NORMALIZE / ENCODE
→ THUẬT TOÁN CHÍNH
→ FORMAT OUTPUT
```

Ví dụ:

```text
"03:40"
→ 220 giây
→ mô phỏng prev/next
→ "03:30"
```

Phần khó đôi khi không phải thuật toán chính mà là nhận ra representation phù hợp. Tài liệu này tập trung vào lớp chuyển đổi đó. Nó bổ sung cho tài liệu algorithm core; không thay thế BFS, greedy, binary search, stack, queue, sliding window hay DP.

PCCP chính thức có 4 câu trong 120 phút. Corpus công khai cho thấy parsing/normalization có thể xuất hiện trực tiếp ở câu implementation hoặc nằm bên trong bài lớn hơn: thời gian `MM:SS`, ngày theo lịch riêng, command, biểu thức, hệ cơ số, tọa độ và state mở rộng.

---

## 1. Công thức quyết định representation

Đừng hỏi trước: “Đây là thuật toán gì?”. Hỏi:

```text
1. Tao cần lặp lại thao tác nào?
2. Format hiện tại khiến thao tác đó khó ở đâu?
3. Representation nào biến thao tác đó thành phép đơn giản?
4. Sau khi xử lý có cần đổi ngược để output không?
5. Phép đổi có làm mất thông tin cần thiết không?
```

### Bảng chọn nhanh

| Nhu cầu | Representation thường dùng |
|---|---|
| Cộng, trừ, so sánh thời gian | Scalar `Number` |
| Tra cứu theo mã/tên | `Map<key, value>` |
| Kiểm tra đã xuất hiện/đã thăm | `Set<key>` |
| Đếm tần suất | `Map<value, count>` |
| Nhóm record theo loại | `Map<key, Array>` |
| Giữ nhiều field đi cùng nhau | Object hoặc tuple |
| FIFO | Array + `head` |
| LIFO | Array làm stack |
| Trạng thái nhiều chiều dùng trong Set | String key hoặc integer encoding |
| So sánh các đoạn chuỗi cố định | Chunk/run |
| Đếm hoạt động theo thời gian | Event list / interval |
| Cộng nhanh đoạn | Prefix sum |
| Cập nhật hàng loạt đoạn | Difference array |
| Graph từ danh sách cạnh | Adjacency list |
| Grid ký tự cần sửa | `string[] → char[][]` |

### Câu thần chú

```text
Operation quyết định representation.
```

---

## 2. Bảy hình dạng code sinh ra phần lớn converter

### 2.1 Split và destructure

```js
const [a, b] = raw.split(delimiter);
```

### 2.2 Split rồi đổi sang số

```js
const [a, b] = raw.split(delimiter).map(Number);
```

### 2.3 Đơn vị lớn → đơn vị nhỏ

```js
const scalar = major * unitsPerMajor + minor;
```

### 2.4 Scalar → đơn vị lớn + phần dư

```js
const major = Math.floor(scalar / unitsPerMajor);
const minor = scalar % unitsPerMajor;
```

### 2.5 Record list → Map

```js
const lookup = new Map();

for (const raw of records) {
  const [key, rawValue] = raw.split(" ");
  lookup.set(key, Number(rawValue));
}
```

### 2.6 State nhiều field → key

```js
const key = `${field1},${field2},${field3}`;
```

### 2.7 Scan theo chunk

```js
for (let start = 0; start < text.length; start += unit) {
  const chunk = text.slice(start, start + unit);
}
```

---

# Phần I — Tokenization và parsing record

## 3. Whitespace tokenization

Chỉ dùng khi contract nói mọi whitespace đều là separator.

```js
function whitespaceTokens(text) {
  const normalized = text.trim();
  return normalized === "" ? [] : normalized.split(/\s+/);
}
```

```js
whitespaceTokens("  MOVE   12 ");
// ["MOVE", "12"]
```

### Bẫy

```js
"".trim().split(/\s+/);
// [""] chứ không phải []
```

Không normalize whitespace nếu space là một phần của dữ liệu.

---

## 4. Record hai field

```js
function parsePrivacy(raw) {
  const [date, termType] = raw.split(" ");
  return { date, termType };
}
```

```js
parsePrivacy("2022.05.19 A");
// { date: "2022.05.19", termType: "A" }
```

Nếu field thứ hai là số:

```js
function parseTerm(raw) {
  const [type, rawMonths] = raw.split(" ");
  return { type, months: Number(rawMonths) };
}
```

### Bẫy index

```js
for (let i = 0; i < records.length; i++) {
  const [a, b] = records[i].split(" ");
}
```

Không dùng `i <= records.length`. Optional chaining không sửa được index vượt biên; nó chỉ biến lỗi thành `undefined` âm thầm.

---

## 5. Delimiter cố định

```js
function parseNumbers(raw, delimiter) {
  return raw.split(delimiter).map(Number);
}
```

```js
parseNumbers("2022.05.19", "."); // [2022, 5, 19]
parseNumbers("03:40", ":");      // [3, 40]
parseNumbers("2,3", ",");        // [2, 3]
```

### Chọn đúng delimiter

| Input | Delimiter |
|---|---|
| `"A 6"` | `" "` |
| `"2022.05.19"` | `"."` |
| `"03:40"` | `":"` |
| `"2,3"` | `","` |
| `"A=12"` | `"="` |
| `"10-20"` | `"-"` nếu không có số âm |

---

## 6. Key-value token

```js
function parseKeyValue(raw, delimiter = "=") {
  const separator = raw.indexOf(delimiter);
  if (separator === -1) return null;

  return {
    key: raw.slice(0, separator),
    value: raw.slice(separator + delimiter.length)
  };
}
```

```js
parseKeyValue("A=12");
// { key: "A", value: "12" }
```

Dùng `indexOf + slice` khi value cũng có thể chứa delimiter và chỉ muốn tách lần đầu.

---

## 7. Command → event type + payload

```js
function parseCommand(raw) {
  const [type, rawAmount] = raw.split(" ");
  return {
    type,
    amount: rawAmount === undefined ? null : Number(rawAmount)
  };
}
```

```js
parseCommand("MOVE 3"); // { type: "MOVE", amount: 3 }
parseCommand("LEFT");   // { type: "LEFT", amount: null }
```

Xử lý:

```js
for (const raw of commands) {
  const event = parseCommand(raw);

  if (event.type === "MOVE") position += event.amount;
  else if (event.type === "BACK") position -= event.amount;
}
```

---

## 8. Biểu thức có khoảng trắng

```js
function parseExpression(raw) {
  const [left, operator, right, equalSign, result] = raw.split(" ");

  return {
    left,
    operator,
    right,
    result,
    hasValidEqualToken: equalSign === "="
  };
}
```

```js
parseExpression("14 + 3 = 17");
```

Giữ toán hạng ở dạng string nếu còn phải thử nhiều hệ cơ số; không vội `Number()`.

---

## 9. Parse cạnh graph

```js
function parseWeightedEdge(raw) {
  const [from, to, rawWeight] = raw.split(" ");
  return { from, to, weight: Number(rawWeight) };
}
```

```js
parseWeightedEdge("A B 5");
// { from: "A", to: "B", weight: 5 }
```

---

# Phần II — Scalar normalization

## 10. Ngày theo lịch mỗi tháng 28 ngày

```js
function dateToDays28(raw) {
  const [year, month, day] = raw.split(".").map(Number);
  return year * 12 * 28 + month * 28 + day;
}
```

```js
const collected = dateToDays28("2019.11.15");
const destroyDay = collected + 3 * 28;
```

Hết hạn nếu contract nói phải hủy từ ngày kết thúc:

```js
const expired = todayDay >= destroyDay;
```

### Bẫy

- Không dùng `Date` nếu đề định nghĩa lịch riêng.
- Xác định rõ ngày bằng boundary còn hợp lệ hay đã hết hạn.
- Parse `today` một lần, không parse lại trong mỗi vòng.

---

## 11. `MM:SS` ↔ tổng số giây

```js
function mmssToSeconds(raw) {
  const [minute, second] = raw.split(":").map(Number);
  return minute * 60 + second;
}

function secondsToMMSS(totalSeconds) {
  const minute = Math.floor(totalSeconds / 60);
  const second = totalSeconds % 60;

  return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}
```

Round-trip test:

```js
secondsToMMSS(mmssToSeconds("03:40")) === "03:40";
```

---

## 12. `HH:MM:SS` ↔ tổng số giây

```js
function hhmmssToSeconds(raw) {
  const [hour, minute, second] = raw.split(":").map(Number);
  return hour * 3600 + minute * 60 + second;
}

function secondsToHHMMSS(totalSeconds) {
  const hour = Math.floor(totalSeconds / 3600);
  const remaining = totalSeconds % 3600;
  const minute = Math.floor(remaining / 60);
  const second = remaining % 60;

  return [hour, minute, second]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}
```

---

## 13. Đơn vị hỗn hợp tổng quát

Ví dụ giờ/phút, phút/giây, row/column đều dùng cùng cấu trúc:

```js
function encodePair(major, minor, unitsPerMajor) {
  return major * unitsPerMajor + minor;
}

function decodePair(value, unitsPerMajor) {
  return [
    Math.floor(value / unitsPerMajor),
    value % unitsPerMajor
  ];
}
```

---

## 14. Clamp vào giới hạn

```js
function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(value, maximum));
}
```

Ví dụ video:

```js
position = clamp(position + 10, 0, videoLength);
```

---

## 15. Phiên bản phần mềm

```js
function parseVersion(raw) {
  return raw.split(".").map(Number);
}

function compareVersions(aRaw, bRaw) {
  const a = parseVersion(aRaw);
  const b = parseVersion(bRaw);
  const length = Math.max(a.length, b.length);

  for (let i = 0; i < length; i++) {
    const left = a[i] ?? 0;
    const right = b[i] ?? 0;

    if (left !== right) return left - right;
  }

  return 0;
}
```

Không so sánh version như string khi `"2.10"` và `"2.9"` cần so theo số.

---

# Phần III — Tọa độ, grid và state key

## 16. Parse tọa độ

```js
function parseCoordinate(raw) {
  const [row, column] = raw.split(",").map(Number);
  return { row, column };
}
```

---

## 17. Tọa độ → string key

```js
function coordinateKey(row, column) {
  return `${row},${column}`;
}
```

```js
const visited = new Set();
visited.add(coordinateKey(2, 3));
```

Array không phù hợp làm value để so nội dung trực tiếp:

```js
[1, 2] === [1, 2]; // false
```

---

## 18. State mở rộng → key

```js
function stateKey(row, column, usedAbility) {
  return `${row},${column},${usedAbility ? 1 : 0}`;
}
```

Dùng cho BFS có quyền đặc biệt, hướng, số chìa khóa hoặc lượt hiện tại:

```js
function generalStateKey(...fields) {
  return fields.join(",");
}
```

Chỉ dùng delimiter an toàn, không xuất hiện mơ hồ trong field.

---

## 19. Tọa độ 2D ↔ index 1D

```js
function encodePosition(row, column, columnCount) {
  return row * columnCount + column;
}

function decodePosition(index, columnCount) {
  return [
    Math.floor(index / columnCount),
    index % columnCount
  ];
}
```

Round-trip:

```js
decodePosition(encodePosition(2, 3, 5), 5);
// [2, 3]
```

---

## 20. String grid → char matrix

```js
function toCharacterGrid(rows) {
  return rows.map((row) => [...row]);
}
```

Nếu chỉ đọc, giữ `string[]` để tiết kiệm bước chuyển. Nếu cần sửa từng ô, dùng `char[][]`.

---

## 21. Hướng → vector

```js
const DIRECTIONS = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1]
};
```

Hoặc dùng index hướng để quay:

```js
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

direction = (direction + 1) % 4;     // quay phải
direction = (direction + 3) % 4;     // quay trái
```

---

# Phần IV — Map, Set và cấu trúc tra cứu

## 22. Lookup Map

```js
function buildTermMap(terms) {
  const map = new Map();

  for (const raw of terms) {
    const [type, rawMonths] = raw.split(" ");
    map.set(type, Number(rawMonths));
  }

  return map;
}
```

Dấu hiệu: nhiều record `key → value`, cần lấy lại theo key nhiều lần.

---

## 23. Frequency Map

```js
function buildFrequency(values) {
  const count = new Map();

  for (const value of values) {
    count.set(value, (count.get(value) ?? 0) + 1);
  }

  return count;
}
```

Giảm tần suất:

```js
function decrementCount(count, value) {
  const remaining = count.get(value) - 1;

  if (remaining === 0) count.delete(value);
  else count.set(value, remaining);
}
```

Phải `delete` nếu `Map.size` đại diện cho số loại hiện có.

---

## 24. Group by

```js
function groupBy(records, getKey) {
  const groups = new Map();

  for (const record of records) {
    const key = getKey(record);

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }

  return groups;
}
```

```js
const byType = groupBy(items, (item) => item.type);
```

---

## 25. Value → index Map

```js
function buildIndexMap(values) {
  const indexMap = new Map();

  for (let i = 0; i < values.length; i++) {
    if (!indexMap.has(values[i])) {
      indexMap.set(values[i], i);
    }
  }

  return indexMap;
}
```

Nếu có duplicate, xác định cần index đầu, index cuối hay tất cả index.

---

## 26. Unique Set

```js
function uniqueValues(values) {
  return [...new Set(values)];
}
```

Giữ thứ tự xuất hiện đầu tiên trong JavaScript.

---

## 27. Adjacency list

```js
function buildUndirectedGraph(nodeCount, edges) {
  const graph = Array.from({ length: nodeCount }, () => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}
```

Directed graph chỉ thêm một chiều:

```js
graph[from].push(to);
```

Weighted graph:

```js
graph[from].push({ to, weight });
```

---

## 28. Indegree

```js
function buildDirectedGraph(nodeCount, edges) {
  const graph = Array.from({ length: nodeCount }, () => []);
  const indegree = Array(nodeCount).fill(0);

  for (const [from, to] of edges) {
    graph[from].push(to);
    indegree[to]++;
  }

  return { graph, indegree };
}
```

Dùng cho dependency/topological order.

---

# Phần V — Chuỗi, chunk, run và rotation

## 29. Chunk cố định

```js
function splitChunks(text, unit) {
  const chunks = [];

  for (let start = 0; start < text.length; start += unit) {
    chunks.push(text.slice(start, start + unit));
  }

  return chunks;
}
```

`slice` cuối tự giữ phần dư ngắn hơn `unit`.

---

## 30. Run-length grouping

```js
function buildRuns(values) {
  if (values.length === 0) return [];

  const runs = [];
  let previous = values[0];
  let count = 1;

  for (let i = 1; i < values.length; i++) {
    const current = values[i];

    if (current === previous) {
      count++;
      continue;
    }

    runs.push([previous, count]);
    previous = current;
    count = 1;
  }

  runs.push([previous, count]);
  return runs;
}
```

Core:

```text
SAME → extend run
DIFFERENT → flush run cũ, mở run mới
AFTER LOOP → flush run cuối
```

---

## 31. Nén run

```js
function encodeRuns(runs) {
  const pieces = [];

  for (const [value, count] of runs) {
    if (count > 1) pieces.push(String(count));
    pieces.push(value);
  }

  return pieces.join("");
}
```

Gom mảnh vào array rồi `join("")` khi chuỗi dài.

---

## 32. Rotation không dùng `shift()` lặp lại

```js
function rotateLeft(text, offset) {
  const n = text.length;
  if (n === 0) return "";

  const normalized = ((offset % n) + n) % n;
  return text.slice(normalized) + text.slice(0, normalized);
}
```

Khi cần duyệt mọi rotation, dùng `text + text`:

```js
const doubled = text + text;

for (let offset = 0; offset < text.length; offset++) {
  const rotation = doubled.slice(offset, offset + text.length);
}
```

---

## 33. Prefix và suffix

```js
word.startsWith(prefix);
word.endsWith(suffix);
```

Không dùng `includes` khi contract yêu cầu đúng prefix/suffix.

```js
word.slice(0, prefix.length) === prefix;
word.slice(-suffix.length) === suffix;
```

---

## 34. Ký tự ↔ mã chữ cái

```js
function lowercaseIndex(character) {
  return character.charCodeAt(0) - "a".charCodeAt(0);
}

function lowercaseFromIndex(index) {
  return String.fromCharCode("a".charCodeAt(0) + index);
}
```

Chỉ dùng khi contract giới hạn ASCII chữ cái. Với Unicode tổng quát, không giả định một ký tự luôn là một code unit đơn giản.

---

## 35. Extract digits hoặc numbers

Từng chữ số:

```js
const digits = [...text]
  .filter((character) => /\d/.test(character))
  .map(Number);
```

Các nhóm số liên tiếp:

```js
function extractIntegers(text) {
  return (text.match(/-?\d+/g) ?? []).map(Number);
}
```

Chỉ dùng regex phù hợp contract; đừng để dấu `-` của delimiter bị hiểu nhầm thành số âm.

---

# Phần VI — Hệ cơ số, Number và BigInt

## 36. Hệ cơ số nhỏ

```js
function parseInBase(raw, base) {
  return Number.parseInt(raw, base);
}

function formatInBase(value, base) {
  return value.toString(base);
}
```

```js
parseInBase("1011", 2); // 11
formatInBase(11, 2);    // "1011"
```

Validate digit nếu toàn token phải hợp lệ; `parseInt` có thể dừng giữa token.

---

## 37. Validate chữ số theo base

```js
const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

function digitValue(character) {
  return DIGITS.indexOf(character.toLowerCase());
}

function isValidInBase(raw, base) {
  if (raw.length === 0) return false;

  for (const character of raw) {
    const digit = digitValue(character);
    if (digit < 0 || digit >= base) return false;
  }

  return true;
}
```

---

## 38. Parse số rất lớn bằng BigInt

```js
function parseBigIntInBase(raw, base) {
  let value = 0n;
  const bigBase = BigInt(base);

  for (const character of raw.toLowerCase()) {
    const digit = digitValue(character);
    if (digit < 0 || digit >= base) {
      throw new Error("Invalid digit");
    }

    value = value * bigBase + BigInt(digit);
  }

  return value;
}
```

Không trộn `BigInt` và `Number` trong cùng phép toán:

```js
1n + 1; // TypeError
1n + 1n;
```

Kiểm tra `Number.isSafeInteger(value)` nếu bounds có thể vượt `2^53 - 1`.

---

# Phần VII — Prefix, difference và matrix normalization

## 39. Prefix sum 1D

```js
function buildPrefix(nums) {
  const prefix = Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}
```

`prefix[i]` là tổng đúng `i` phần tử đầu.

---

## 40. Difference array 1D

```js
function applyRangeUpdates(length, updates) {
  const difference = Array(length + 1).fill(0);

  for (const [left, right, delta] of updates) {
    difference[left] += delta;
    difference[right + 1] -= delta;
  }

  const result = Array(length).fill(0);
  let current = 0;

  for (let i = 0; i < length; i++) {
    current += difference[i];
    result[i] = current;
  }

  return result;
}
```

Biến nhiều update đoạn thành hai event biên.

---

## 41. Flatten matrix

```js
function flattenMatrix(matrix) {
  return matrix.flat();
}
```

Tránh `flat()` nếu matrix rất lớn và chỉ cần scan; nested loop không tạo thêm mảng.

---

## 42. Prefix sum 2D

```js
function buildPrefix2D(matrix) {
  const rows = matrix.length;
  const columns = matrix[0]?.length ?? 0;
  const prefix = Array.from(
    { length: rows + 1 },
    () => Array(columns + 1).fill(0)
  );

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      prefix[row + 1][column + 1] =
        matrix[row][column] +
        prefix[row][column + 1] +
        prefix[row + 1][column] -
        prefix[row][column];
    }
  }

  return prefix;
}
```

---

# Phần VIII — Interval và event conversion

## 43. Parse interval

```js
function parseInterval(raw) {
  const [start, end] = raw.split("-").map(Number);
  return { start, end };
}
```

Không dùng template này nếu input cho phép số âm; delimiter `-` sẽ mơ hồ.

---

## 44. Interval overlap

Với khoảng đóng `[start, end]`:

```js
function closedIntervalsOverlap(a, b) {
  return a.start <= b.end && b.start <= a.end;
}
```

Với khoảng nửa mở `[start, end)`:

```js
function halfOpenIntervalsOverlap(a, b) {
  return a.start < b.end && b.start < a.end;
}
```

Boundary thay đổi công thức.

---

## 45. Interval → events

```js
function intervalsToEvents(intervals) {
  const events = [];

  for (const { start, end } of intervals) {
    events.push({ time: start, delta: 1, type: "ENTER" });
    events.push({ time: end, delta: -1, type: "EXIT" });
  }

  return events;
}
```

Tie rule phải theo contract.

EXIT trước ENTER nếu tài nguyên được giải phóng và dùng lại ngay:

```js
events.sort((a, b) => {
  if (a.time !== b.time) return a.time - b.time;
  return a.delta - b.delta; // -1 trước +1
});
```

ENTER trước EXIT nếu cùng thời điểm vẫn tính đồng thời:

```js
return b.delta - a.delta;
```

---

## 46. Merge intervals

```js
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort(
    (a, b) => a[0] - b[0] || a[1] - b[1]
  );

  const merged = [sorted[0].slice()];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}
```

Nếu khoảng nửa mở hoặc chỉ merge khi giao thật sự, kiểm tra contract tại dấu `<=`.

---

# Phần IX — Queue, stack và active-state representation

## 47. Queue-head

```js
const queue = [];
let head = 0;

queue.push(item);       // enqueue
queue[head];            // peek
head++;                 // dequeue logic
head < queue.length;    // còn phần tử
queue.length - head;    // số phần tử còn hiệu lực
```

Khi dùng head, không kiểm tra `queue.length > 0` để biết còn item chưa xử lý.

---

## 48. Queue item nhiều field

```js
queue.push({
  row,
  column,
  distance,
  usedAbility
});
```

Chỉ lưu field cần cho transition tương lai.

---

## 49. Active job với finish time

```js
active.push({
  id,
  resource,
  finishTime: currentTime + duration
});
```

Core simulation:

```text
TIME/EVENT
→ FINISH đối tượng cũ
→ START đối tượng mới
```

Thứ tự FINISH/START không phải luật cố định; lấy từ contract và ví dụ.

---

## 50. Stack lưu index hay value?

Lưu index khi đáp án cần:

- khoảng cách;
- vị trí;
- cập nhật `answer[index]`;
- truy cập lại value gốc.

```js
stack.push(index);
const value = values[stack.at(-1)];
```

Lưu value khi chỉ cần bản thân value.

---

# Phần X — Sorting và comparator như một phép normalize order

## 51. Sort số

```js
numbers.sort((a, b) => a - b); // tăng
numbers.sort((a, b) => b - a); // giảm
```

Không bỏ comparator khi sort số.

---

## 52. Comparator nhiều khóa

```js
records.sort((a, b) => {
  if (a.score !== b.score) return b.score - a.score;
  return a.index - b.index;
});
```

Viết theo thứ tự ưu tiên khóa.

---

## 53. Sắp xếp để tạo số ghép lớn nhất

```js
const ordered = numbers
  .map(String)
  .sort((a, b) => (b + a).localeCompare(a + b));
```

Representation đổi từ number sang string vì phép so sánh cần xét concatenation.

---

## 54. Coordinate sort

```js
points.sort((a, b) => {
  if (a.row !== b.row) return a.row - b.row;
  return a.column - b.column;
});
```

---

# Phần XI — Output formatting

## 55. Padding

```js
String(7).padStart(2, "0"); // "07"
String(7).padStart(3, "0"); // "007"
```

---

## 56. Ghép token

```js
tokens.join(" ");
fields.join(":");
pieces.join("");
```

Gom nhiều mảnh vào array rồi `join` khi output dài.

---

## 57. Format coordinate/state

```js
function formatCoordinate(row, column) {
  return `(${row},${column})`;
}
```

Output contract quyết định dấu ngoặc, delimiter và padding.

---

## 58. BigInt output

```js
const answer = bigValue.toString();
```

Không trả BigInt kèm hậu tố `n` trong string output.

---

# Phần XII — Boundary, validation và lỗi hidden test

## 59. `<`, `<=`, `>`, `>=`

Trước khi code, trả lời:

```text
Nếu bằng đúng boundary thì còn hợp lệ không?
```

| Contract | Điều kiện thường gặp |
|---|---|
| Không vượt quá limit | `value <= limit` |
| Phải nhỏ hơn limit | `value < limit` |
| Hết hạn từ ngày X | `today >= X` |
| Chỉ hết hạn sau ngày X | `today > X` |
| Trong đoạn đóng | `start <= x && x <= end` |
| Trong đoạn nửa mở | `start <= x && x < end` |

---

## 60. Index và số thứ tự

```text
Array index: 0..length-1
Problem number: có thể 1..n
```

```js
answer.push(i + 1);
```

Không bắt loop từ 1 chỉ vì output đánh số từ 1.

---

## 61. `undefined` và optional chaining

Optional chaining phù hợp khi absence là một trạng thái hợp lệ:

```js
const top = stack.at(-1);
```

Không dùng để che invariant bị phá:

```js
records?.[i]?.split(" ");
```

Nếu loop đảm bảo `i < records.length`, hãy truy cập trực tiếp để lỗi logic lộ ra.

---

## 62. `NaN`

```js
Number(undefined); // NaN
5 + undefined;     // NaN
```

Debug:

```js
Number.isNaN(value);
```

Khi state thành `NaN`, điều kiện so sánh thường luôn false và có thể khiến loop không tiến triển.

---

## 63. Number hay string?

```js
"10" < "2"; // true theo thứ tự chuỗi
10 < 2;      // false
```

Đổi số ngay sau parse nếu không cần giữ leading zero hoặc thử hệ cơ số.

---

## 64. `Number` và `parseInt`

```js
Number("12x");               // NaN
Number.parseInt("12x", 10);  // 12
```

Nếu toàn token phải hợp lệ, ưu tiên validate toàn token rồi `Number()`.

---

## 65. Loop progress audit

Nếu timeout, hỏi:

```text
1. While dựa vào state nào để dừng?
2. State đó thay đổi ở dòng nào?
3. Có trường hợp không event nào thay đổi state không?
4. Head có tăng không?
5. Có NaN/undefined làm condition luôn false không?
6. Boundary < hay <= có chặn tiến triển không?
```

---

# Phần XIII — PCCP mutation map

## 66. Cách đề có thể biến một converter quen thuộc

| Core | Biến thể có thể gặp | State/code phải đổi |
|---|---|---|
| `MM:SS → seconds` | `HH:MM:SS` | Thêm field hour |
| Date scalar | Lịch riêng | Thay units-per-month/year |
| Coordinate key | Có hướng/kỹ năng | Thêm field vào key |
| Lookup Map | Một key có nhiều value | `Map<key, Array>` |
| Frequency Map | Cửa sổ động | Increment khi vào, decrement/delete khi ra |
| Command parse | Payload nhiều field | Parse thêm token/object |
| Interval events | Tie rule đổi | Comparator event đổi |
| Chunk | `unit` thay đổi | Loop ngoài thử unit |
| Run | Phần dư cuối | `slice` + flush cuối |
| Base conversion | Giá trị quá lớn | BigInt digit-by-digit |
| Queue | Không xóa mảng | Dùng `head < length` |
| State simulation | Event đồng thời | Tính next state rồi commit cùng lúc |

---

## 67. Những representation xuất hiện rõ trong corpus PCCP công khai

| Hình dạng | Dạng chuyển đổi |
|---|---|
| Video player | `MM:SS ↔ seconds`, clamp, interval boundary |
| Restore expressions | Tokenize expression, enumerate base, convert number ↔ digits |
| Privacy expiration | Custom date → scalar, term list → Map |
| Robot commands | Command character/string → transition |
| Scheduling | Arrival/job record → active event/priority state |
| Grid + one-use ability | `(row, column, used)` → expanded BFS state/key |
| Collision risk | Route/time → position events → frequency Map |
| String/group problems | Character/chunk → run/frequency/Set |

Đây là bằng chứng cho hướng học representation, không phải cam kết kỳ thi tương lai sẽ lặp đúng các format này.

---

# Phần XIV — 30 micro-drill phải luyện

## Mức A — Viết được không nhìn

```js
whitespaceTokens("  A   12 ");
parsePrivacy("2022.05.19 A");
parseTerm("A 6");
dateToDays28("2022.05.19");
mmssToSeconds("03:40");
secondsToMMSS(220);
hhmmssToSeconds("01:02:03");
parseCoordinate("2,3");
coordinateKey(2, 3);
stateKey(2, 3, true);
encodePosition(2, 3, 5);
decodePosition(13, 5);
parseCommand("MOVE 3");
buildTermMap(["A 6", "B 12"]);
buildFrequency(["A", "B", "A"]);
splitChunks("abcabcx", 3);
buildRuns(["a", "a", "b"]);
```

## Mức B — Nhận ra và sửa từ core

```js
parseExpression("14 + 3 = 17");
parseWeightedEdge("A B 5");
buildUndirectedGraph(4, edges);
buildDirectedGraph(4, edges);
intervalsToEvents(intervals);
mergeIntervals(intervals);
buildPrefix(nums);
applyRangeUpdates(length, updates);
rotateLeft("abcd", 2);
parseInBase("1011", 2);
parseBigIntInBase(raw, base);
```

---

## 68. Recall schedule ngắn

```text
D0: nhìn tài liệu và viết
D1: viết lại 10 hàm không nhìn
D3: viết 20 hàm hoặc skeleton
D7: làm 3 bài ghép converter + algorithm
```

Không đọc lại thụ động. Khi quên, chỉ mở đúng skeleton nhỏ nhất rồi đóng lại.

---

## 69. Gate trước khi coi như thành thục

Với một input lạ, phải nói được:

```text
Grammar:
Delimiter:
Field và type:
Representation đích:
Parse function:
Có cần encode/key không:
Algorithm cần thao tác gì:
Boundary:
Có cần format ngược không:
Complexity:
```

Và trả lời được:

1. Vì sao representation mới dễ hơn raw input?
2. Có mất thông tin cần thiết không?
3. Round-trip có cần thiết không?
4. Parse một lần hay đang parse lặp trong loop?
5. Bounds có yêu cầu Map/Set/preprocess không?
6. Tie rule và final cleanup là gì?

---

# Phần XV — Cheat sheet một trang

```js
// Split + number
const [a, b] = raw.split(delimiter).map(Number);

// Scalar
const scalar = major * unitsPerMajor + minor;
const major = Math.floor(scalar / unitsPerMajor);
const minor = scalar % unitsPerMajor;

// State key
const key = fields.join(",");

// Map lookup
const map = new Map();
map.set(key, value);
map.get(key);

// Frequency
count.set(value, (count.get(value) ?? 0) + 1);

// Set
seen.add(key);
seen.has(key);

// Queue-head
queue.push(item);
queue[head];
head++;
head < queue.length;
queue.length - head;

// Chunk
for (let start = 0; start < text.length; start += unit) {
  const chunk = text.slice(start, start + unit);
}

// Prefix
prefix[i + 1] = prefix[i] + nums[i];
const sum = prefix[right + 1] - prefix[left];

// Clamp
value = Math.max(minimum, Math.min(value, maximum));

// Format
String(value).padStart(2, "0");
pieces.join("");

// Base
Number.parseInt(raw, base);
value.toString(base);
```

---

# Nguồn chính thức và phạm vi nghiên cứu

- [PCCP — thời lượng, số câu và ngôn ngữ](https://certi.programmers.co.kr/about/pccp?tab=range)
- [PCCP mock exam 1](https://school.programmers.co.kr/learn/courses/15008)
- [PCCP mock exam 2](https://school.programmers.co.kr/learn/courses/15009)
- [PCCP — Video Player](https://school.programmers.co.kr/learn/courses/30/lessons/340213)
- [PCCP — Restore Expressions](https://school.programmers.co.kr/learn/courses/30/lessons/340210)
- [Programmers — Privacy Expiration](https://school.programmers.co.kr/learn/courses/30/lessons/150370)
- [MDN — Numbers and strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings)
- [MDN — String.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN — Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

Tài liệu ưu tiên patterns có thể transfer từ đề chính thức và coding contest phổ biến. Không có danh sách nào bảo đảm bao phủ mọi đề tương lai; mục tiêu là bao phủ các **họ representation** để format mới thường chỉ còn là thay delimiter, field, đơn vị, boundary hoặc output.

