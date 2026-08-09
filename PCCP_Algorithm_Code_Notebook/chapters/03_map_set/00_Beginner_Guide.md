# Map/Set nhập môn — Bộ nhớ cho vòng lặp

[← Index](../../03_Map_Set.md) · [Tiếp: phần lõi →](01_Core.md)

Trang này dành cho lần đầu học `Map` và `Set`. Chưa cần nhớ thuật ngữ khó. Chỉ cần hiểu một ý:

> Khi vòng lặp đi từ trái sang phải, Map/Set giúp ta nhớ những gì đã gặp để không phải quay lại tìm từ đầu.

## 1. Vì sao cần Map và Set?

Giả sử cần kiểm tra mảng có số trùng không:

```js
const numbers = [4, 2, 7, 2];
```

Cách chậm là lấy từng số rồi quét lại các số phía trước. Mảng càng dài, số lần kiểm tra càng nhiều.

Cách tốt hơn:

1. Đi từ trái sang phải.
2. Ghi lại những số đã gặp.
3. Trước khi ghi số hiện tại, hỏi: “Số này đã có trong bộ nhớ chưa?”

`Set` chính là bộ nhớ phù hợp cho câu hỏi **đã có hay chưa**.

Nếu cần nhớ thêm thông tin, ví dụ số `2` xuất hiện bao nhiêu lần, ta dùng `Map`.

## 2. Set — Chỉ quan tâm giá trị có tồn tại hay không

Hãy tưởng tượng `Set` là danh sách khách đã check-in:

- Một người chỉ có tên một lần trong danh sách.
- Thêm lại cùng một tên không tạo bản sao mới.
- Ta có thể hỏi rất nhanh một tên đã check-in chưa.

### Cú pháp cơ bản

```js
const seen = new Set();

seen.add(10);       // thêm 10
seen.add(20);       // thêm 20
seen.add(10);       // 10 đã có nên Set không thêm bản sao

console.log(seen.has(10)); // true
console.log(seen.has(30)); // false
console.log(seen.size);    // 2

seen.delete(10);           // xóa 10
console.log(seen.has(10)); // false
```

Các thao tác cần nhớ:

| Cú pháp | Ý nghĩa |
| --- | --- |
| `new Set()` | Tạo Set rỗng |
| `set.add(value)` | Thêm một giá trị |
| `set.has(value)` | Kiểm tra giá trị có tồn tại |
| `set.delete(value)` | Xóa một giá trị |
| `set.size` | Số giá trị khác nhau |

Chú ý: `size` là thuộc tính, không có dấu ngoặc. Viết `set.size`, không viết `set.size()`.

### Ví dụ 1 — Kiểm tra phần tử trùng

```js
function hasDuplicate(values) {
  // Bước 1: Set chỉ chứa các giá trị nằm bên trái vị trí hiện tại.
  const seen = new Set();

  // Bước 2: Đọc từng giá trị từ trái sang phải.
  for (const value of values) {
    // Bước 3: Nếu đã thấy value, đây là lần xuất hiện thứ hai.
    if (seen.has(value)) {
      return true;
    }

    // Bước 4: Chưa thấy thì ghi value vào bộ nhớ.
    seen.add(value);
  }

  // Đi hết mảng mà không gặp lại giá trị nào.
  return false;
}
```

Dry run với `[4, 2, 4]`:

| `value` hiện tại | `seen` trước khi check | Kết quả check | Hành động |
| --- | --- | --- | --- |
| `4` | `{}` | chưa có | thêm `4` |
| `2` | `{4}` | chưa có | thêm `2` |
| `4` | `{4, 2}` | đã có | trả về `true` |

Thứ tự **check trước, add sau** rất quan trọng. Nếu add trước rồi check, mọi phần tử đều tìm thấy chính nó.

### Ví dụ 2 — Bỏ phần tử trùng, giữ thứ tự ban đầu

Cách ngắn nhất:

```js
function removeDuplicate(values) {
  return [...new Set(values)];
}
```

Ví dụ:

```js
removeDuplicate([3, 1, 3, 2, 1]); // [3, 1, 2]
```

`new Set(values)` loại các bản sao. Dấu `...` lấy từng giá trị trong Set để tạo lại array.

Khi cần thêm điều kiện, nên viết vòng lặp đầy đủ:

```js
function removeDuplicateManually(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    result.push(value);
  }

  return result;
}
```

`seen` dùng để kiểm tra. `result` dùng để giữ đáp án. Hai biến có hai nhiệm vụ khác nhau.

## 3. Map — Mỗi key đi kèm một thông tin

Hãy tưởng tượng `Map` là một cuốn từ điển:

- `key` là từ cần tra.
- `value` là phần giải thích của từ đó.

Trong bài thuật toán:

- key có thể là một số, ký tự, tên hoặc mã người dùng;
- value có thể là số lần xuất hiện, index, điểm số hoặc một object trạng thái.

### Cú pháp cơ bản

```js
const scoreByName = new Map();

scoreByName.set("An", 8);
scoreByName.set("Bình", 10);

console.log(scoreByName.get("An"));  // 8
console.log(scoreByName.has("An"));  // true
console.log(scoreByName.has("Chi")); // false

scoreByName.set("An", 9);            // cùng key: cập nhật value
scoreByName.delete("Bình");
console.log(scoreByName.size);        // 1
```

Các thao tác cần nhớ:

| Cú pháp | Ý nghĩa |
| --- | --- |
| `new Map()` | Tạo Map rỗng |
| `map.set(key, value)` | Tạo mới hoặc cập nhật một cặp key–value |
| `map.get(key)` | Lấy value của key |
| `map.has(key)` | Kiểm tra key có tồn tại |
| `map.delete(key)` | Xóa key và value của nó |
| `map.size` | Số key trong Map |

### Ví dụ 3 — Đếm số lần xuất hiện

```js
function countFrequency(values) {
  // Map này có ý nghĩa: value -> số lần value đã xuất hiện.
  const countByValue = new Map();

  for (const value of values) {
    // Key chưa có thì get trả undefined; ta xem count cũ là 0.
    const oldCount = countByValue.get(value) ?? 0;

    // Ghi count mới đè lên count cũ.
    countByValue.set(value, oldCount + 1);
  }

  return countByValue;
}
```

Dry run với `[2, 1, 2]`:

| `value` | `oldCount` | Map sau khi `set` |
| --- | --- | --- |
| `2` | `0` | `{2 → 1}` |
| `1` | `0` | `{2 → 1, 1 → 1}` |
| `2` | `1` | `{2 → 2, 1 → 1}` |

Câu lệnh quan trọng nhất của frequency Map:

```js
countByValue.set(value, (countByValue.get(value) ?? 0) + 1);
```

Đọc từ trong ra ngoài:

1. `get(value)` lấy số đếm cũ.
2. `?? 0` dùng `0` nếu key chưa tồn tại.
3. `+ 1` tạo số đếm mới.
4. `set(value, ...)` ghi kết quả lại vào Map.

### Ví dụ 4 — Nhớ index đầu tiên

```js
function findFirstIndexes(values) {
  // Ý nghĩa: value -> index đầu tiên của value.
  const firstIndexByValue = new Map();

  for (let index = 0; index < values.length; index++) {
    const value = values[index];

    // Chỉ ghi lần đầu. Các lần sau tuyệt đối không ghi đè.
    if (!firstIndexByValue.has(value)) {
      firstIndexByValue.set(value, index);
    }
  }

  return firstIndexByValue;
}
```

Nếu cần index **gần nhất**, bỏ `if` và luôn gọi `set`. Vì vậy trước khi dùng Map, phải nói rõ value đang lưu có ý nghĩa gì.

## 4. Chọn Set hay Map?

Hãy hỏi: “Sau này mình cần lấy lại thông tin gì?”

| Câu hỏi cần trả lời | Cấu trúc nên dùng |
| --- | --- |
| Đã gặp `x` chưa? | `Set` |
| Có giá trị trùng không? | `Set` |
| Có bao nhiêu giá trị khác nhau? | `Set.size` |
| `x` xuất hiện bao nhiêu lần? | `Map<value, count>` |
| `x` xuất hiện đầu tiên ở index nào? | `Map<value, firstIndex>` |
| `x` xuất hiện gần nhất ở index nào? | `Map<value, latestIndex>` |
| Với `id` này, trạng thái hiện tại là gì? | `Map<id, state>` |

Mẹo nhớ:

```text
Set = chỉ nhớ key.
Map = nhớ key và một value đi kèm.
```

## 5. Ví dụ quan trọng — Two Sum dùng Map

Đề: tìm hai index có tổng bằng `target`.

```js
function twoSum(numbers, target) {
  // Ý nghĩa: số đã gặp -> index của số đó.
  const indexByNumber = new Map();

  for (let index = 0; index < numbers.length; index++) {
    const current = numbers[index];
    const needed = target - current;

    // Hỏi quá khứ trước: needed đã nằm bên trái chưa?
    if (indexByNumber.has(needed)) {
      return [indexByNumber.get(needed), index];
    }

    // Chưa tìm được cặp thì ghi current cho các vòng sau dùng.
    indexByNumber.set(current, index);
  }

  return [];
}
```

Với `numbers = [2, 5, 6, 8]`, `target = 7`:

| `index` | `current` | `needed` | Map trước check | Kết quả |
| --- | --- | --- | --- | --- |
| `0` | `2` | `5` | `{}` | chưa có, lưu `2 → 0` |
| `1` | `5` | `2` | `{2 → 0}` | có `2`, trả `[0, 1]` |

Vì sao check trước `set`? Với `[3]`, target `6`, ta không được dùng phần tử index `0` hai lần.

## 6. Ví dụ quan trọng — Tiền tố số điện thoại dùng Set

Đề: trả về `false` nếu một số điện thoại là tiền tố của số khác.

```js
function hasNoPhonePrefix(phoneBook) {
  // Bước 1: Lưu nguyên các số để kiểm tra tồn tại nhanh.
  const phoneSet = new Set(phoneBook);

  // Bước 2: Xét từng số điện thoại.
  for (const phone of phoneBook) {
    // Chỉ tạo prefix ngắn hơn phone, nên i < phone.length.
    for (let i = 1; i < phone.length; i++) {
      const prefix = phone.slice(0, i);

      // Bước 3: Nếu prefix cũng là một số hoàn chỉnh, dữ liệu không hợp lệ.
      if (phoneSet.has(prefix)) {
        return false;
      }
    }
  }

  return true;
}
```

Với `"1195524421"`, các prefix được thử lần lượt là:

```text
"1", "11", "119", "1195", ...
```

Khi gặp `"119"`, Set cho biết đây cũng là một số trong danh bạ, nên trả về `false` ngay.

## 7. Duyệt Map và Set

```js
const colors = new Set(["red", "blue"]);

for (const color of colors) {
  console.log(color);
}

const scoreByName = new Map([
  ["An", 8],
  ["Bình", 10],
]);

for (const [name, score] of scoreByName) {
  console.log(name, score);
}
```

Có thể đổi Map thành array các cặp:

```js
const entries = [...scoreByName];
// [["An", 8], ["Bình", 10]]
```

## 8. Những lỗi người mới thường gặp

### Lỗi 1 — Dùng cú pháp của Object cho Map

```js
const counts = new Map();

counts["a"] = 1;       // Sai cách dùng Map
counts.set("a", 1);    // Đúng
counts.get("a");       // 1
```

### Lỗi 2 — Dùng `get` để kiểm tra key tồn tại

```js
const scores = new Map();
scores.set("An", 0);

if (scores.get("An")) {
  // Không chạy vì 0 là falsy, dù key "An" có tồn tại.
}

if (scores.has("An")) {
  // Đúng khi câu hỏi là key có tồn tại hay không.
}
```

### Lỗi 3 — Nhầm `length` với `size`

```js
const seen = new Set([1, 2]);

seen.length; // undefined
seen.size;   // 2
```

### Lỗi 4 — Array và object được so sánh theo reference

```js
const first = [1, 2];
const second = [1, 2];

const set = new Set([first]);

set.has(first);  // true
set.has(second); // false
```

`first` và `second` nhìn giống nhau nhưng là hai array được tạo ở hai vùng nhớ khác nhau.

### Lỗi 5 — Không nói rõ ý nghĩa của Map

Tên `map` quá chung chung:

```js
const map = new Map();
```

Tên thể hiện đúng quan hệ sẽ dễ đọc hơn:

```js
const countByValue = new Map();
const firstIndexByValue = new Map();
const scoreByName = new Map();
```

Đọc tên biến là biết ngay key và value đang đại diện cho gì.

## 9. Độ phức tạp theo cách dễ nhớ

Trung bình, `add`, `has`, `set`, `get` và `delete` mất `O(1)` cho mỗi lần gọi.

Vì vậy:

```text
Duyệt n phần tử × mỗi phần tử tra Map/Set O(1) = tổng O(n).
```

Ta thường đổi thêm bộ nhớ `O(n)` để tránh vòng lặp lồng nhau `O(n²)`.

Không cần chọn Map/Set chỉ vì nó “xịn hơn”. Nếu key chỉ là các số nguyên nhỏ từ `0` đến `100`, một array đếm đôi khi đơn giản hơn.

## 10. Khung suy nghĩ trước khi code

Trước mỗi bài, tự trả lời năm câu:

```text
1. Mình đang duyệt cái gì?
2. Tương lai cần hỏi lại thông tin nào của quá khứ?
3. Chỉ cần biết tồn tại, hay cần một value đi kèm?
4. Nếu dùng Map: key là gì, value là gì?
5. Phải check trước update hay update trước check?
```

Ví dụ Two Sum:

```text
Duyệt: từng số và index.
Cần hỏi quá khứ: số bù đã xuất hiện chưa?
Cần value đi kèm: cần index của số bù.
Map: number -> index.
Thứ tự: check trước set để không dùng cùng index hai lần.
```

## 11. Bài tự luyện theo thứ tự

Không nhìn lời giải khi chưa dry run bằng tay.

1. Viết `hasDuplicate(values)` bằng Set.
2. Viết `countDistinct(values)` trả về số giá trị khác nhau.
3. Viết `countFrequency(values)` trả về Map tần suất.
4. Viết `firstRepeatedValue(values)` trả giá trị đầu tiên gặp lại.
5. Viết `firstIndexByValue(values)` và giải thích vì sao không được ghi đè.
6. Viết lại `twoSum(numbers, target)` từ trang trắng.
7. Viết lại bài tiền tố số điện thoại và dry run với `["12", "123", "567"]`.

## 12. Checklist trước khi sang phần lõi

- [ ] Phân biệt được Set và Map bằng một câu.
- [ ] Nhớ `add/has` của Set và `set/get/has` của Map.
- [ ] Viết được frequency Map không nhìn mẫu.
- [ ] Giải thích được vì sao `has()` khác `get()`.
- [ ] Giải thích được check-before-update trong Two Sum.
- [ ] Dry run được Map/Set bằng bảng state trước và state sau.
- [ ] Biết `size`, không dùng nhầm `length`.

Khi làm được các mục trên, chuyển sang [Map/Set phần lõi](01_Core.md) để học lần lượt `MAP-01..06`.
