# Map/Set để tự giải đề lạ — lộ trình mastery trước khi làm bài thật

[← Chương Map/Set](../../03_Map_Set.md) · [Nhập môn cú pháp](00_Beginner_Guide.md) · [Bộ đề thật](04_Programmers_PCCP_Set.md)

## Đích của phần này

Sau khi học xong, nhìn một đề có “tên, mã, loại, lịch sử, trùng, số lần, vị trí”, bạn không đoán mò `new Map()` nữa. Bạn phải nói được:

```text
Key là ai/cái gì?
Mỗi key cần nhớ chính xác thông tin gì?
Mình cần đọc state cũ trước hay sau khi ghi current?
Khi nào phải xóa key có count bằng 0?
```

Nếu nói được bốn câu này, code Map/Set thường tự hiện ra. Nếu không, học thêm cú pháp không giúp gì.

## 1. Cây chọn cấu trúc: hỏi quá khứ một câu gì?

```text
Chỉ cần biết giá trị đã từng xuất hiện chưa?
└─ Set<value>

Cần một thông tin đi kèm mỗi key?
└─ Map<key, value>
   ├─ số lần → count
   ├─ vị trí → firstIndex hoặc latestIndex
   ├─ dữ liệu tra cứu cố định → lookup value
   ├─ danh sách cùng nhóm → array
   ├─ quan hệ không trùng → Set
   └─ trạng thái đang sống của một id → state object
```

Không dùng Map khi array đủ rõ hơn: ví dụ key chỉ là số từ 0 đến 100 thì `Array(101).fill(0)` diễn đạt frequency tốt hơn. Không dùng Set khi đề quan tâm **hai bản sao**; Set sẽ quên mất số lượng.

## 2. Sáu cách nghĩ phải làm được từ trang trắng

### A. Membership — “đã gặp chưa?”

**Dấu hiệu đề:** duplicate, unique, không được dùng lại, lần đầu xuất hiện.

`seen` luôn có nghĩa: “mọi value đã xuất hiện bên trái current”. Vì vậy check trước rồi mới add:

```js
function hasDuplicate(values) {
  const seen = new Set();

  for (const value of values) {
    if (seen.has(value)) return true;
    seen.add(value);
  }

  return false;
}
```

**Test phá lỗi:** `[4]` phải false; `[4, 4]` phải true. Nếu add trước check, `[4]` cũng thành true.

**Bài thật:** Ponketmon, Nối từ tiếng Anh, tuple, report trùng.

### B. Frequency — “đã có bao nhiêu bản sao?”

**Dấu hiệu đề:** cùng multiset, thiếu một người, count theo loại, nhiều item trùng tên.

```js
function buildFrequency(values) {
  const countByValue = new Map();

  for (const value of values) {
    const oldCount = countByValue.get(value) ?? 0;
    countByValue.set(value, oldCount + 1);
  }

  return countByValue;
}
```

Đọc từ trong ra ngoài: lấy count cũ → chưa có xem là 0 → cộng 1 → ghi lại. `?? 0` chứ không phải `|| 0` là thói quen rõ nghĩa: fallback chỉ khi không có key.

**Test phá lỗi:** `['an', 'an', 'binh']` phải lưu `an → 2`, không phải chỉ biết `an` tồn tại.

**Bài thật:** Người chưa hoàn thành, Trang phục, Chia bánh cuộn, Ghép tin tức.

### C. First index và latest index — chỉ khác một dòng nhưng là hai bài khác

| Câu hỏi | Map lưu | Quy tắc `set` |
| --- | --- | --- |
| Lần đầu `x` xuất hiện ở đâu? | `x → firstIndex` | chỉ set khi chưa có |
| Lần gần nhất trước current là ở đâu? | `x → latestIndex` | đọc cũ, rồi luôn set current |

```js
function minimumRepeatGap(values) {
  const latestIndexByValue = new Map();
  let bestGap = Infinity;

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];

    if (latestIndexByValue.has(value)) {
      bestGap = Math.min(bestGap, index - latestIndexByValue.get(value));
    }

    latestIndexByValue.set(value, index);
  }

  return bestGap === Infinity ? -1 : bestGap;
}
```

**Câu cần nói:** ở đầu vòng `index`, Map chỉ chứa vị trí **trước** index. Ta dùng vị trí cũ xong mới ghi index mới.

**Test phá lỗi:** `[1, 2, 1, 1]` có gap nhỏ nhất 1. Nếu không ghi đè latest, bạn dễ lấy sai gap 3.

### D. Complement — current đang chờ quá khứ nào?

Với Two Sum, khi đang ở `value`, không cần hỏi mọi value trước. Chỉ hỏi một value: `target - value`.

```js
function twoSumIndexes(values, target) {
  const indexByValue = new Map();

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    const needed = target - value;

    if (indexByValue.has(needed)) {
      return [indexByValue.get(needed), index];
    }

    indexByValue.set(value, index);
  }

  return null;
}
```

Check trước update ngăn một phần tử dùng hai lần với chính nó. `[3]`, target `6` phải `null`; `[3, 3]` mới là `[0, 1]`.

### E. Group và relation — một key có nhiều thứ thuộc về nó

Nếu group cho phép phần tử trùng và thứ tự quan trọng, lưu array. Nếu quan hệ phải unique, lưu Set.

```js
function groupWordsByFirstLetter(words) {
  const wordsByInitial = new Map();

  for (const word of words) {
    const initial = word[0];
    if (!wordsByInitial.has(initial)) wordsByInitial.set(initial, []);
    wordsByInitial.get(initial).push(word);
  }

  return wordsByInitial;
}
```

**Bẫy lớn:** không viết `new Map().set(key, [])` rồi tưởng mọi key có array riêng. Phải tạo đúng lúc key xuất hiện. Với `Map<key, Set>`, `add` trùng không tạo quan hệ mới; đó là đúng khi đề cấm báo cáo/edge duplicate.

### F. Nhiều state cùng lúc — Map là trợ lý, không phải pattern chính

Cuộc đua chạy cần:

- array: ai đứng ở từng vị trí;
- Map: mỗi người đang ở vị trí nào.

Khi hai người đổi chỗ, **cả hai nguồn state phải update cùng transition**. Invariant là: `positionByName.get(players[i]) === i` với mọi i.

Nếu code chỉ đổi array hoặc chỉ đổi Map, vài sample đầu có thể đúng nhưng state đã hỏng cho calling sau.

## 3. Những bẫy JavaScript phải hiểu, không học thuộc

| Tình huống | Quy tắc an toàn |
| --- | --- |
| Cần biết key tồn tại | `map.has(key)`, không `if (map.get(key))` |
| Cần lấy count mặc định | `map.get(key) ?? 0` |
| Map có value 0/false/empty string | key vẫn tồn tại; `has` mới trả lời đúng câu hỏi |
| Object/array làm key | so sánh theo reference; hai `[]` giống nội dung vẫn khác key |
| Cần key cấu trúc như `(row,col)` | tạo canonical key, ví dụ ```${row},${col}```; phải chắc delimiter không mơ hồ |
| Count trong window giảm về 0 | `delete` key nếu logic cần `map.size` là số loại hiện diện |

`Map` giữ insertion order, cho phép mọi kiểu key, và đặc tả yêu cầu truy cập trung bình dưới tuyến tính; tuy vậy trong bài thi cứ coi `get/set/has/delete` là gần `O(1)` và vẫn nhìn constraint. Xem [MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) khi cần tra API chính xác.

## 4. Lộ trình đề thật: làm ít nhưng phải hiểu sâu

Làm theo thứ tự này. Không chuyển bài chỉ vì AC; phải trả lời “Map/Set của bài này đang lưu câu gì về quá khứ?”

1. **Người chưa hoàn thành** — frequency, duplicate name.
2. **Ponketmon** — Set và giới hạn chọn.
3. **Danh bạ điện thoại** — Set/sort, prefix không phải equality.
4. **Cuộc đua chạy** — array + Map đồng bộ state.
5. **Chia bánh cuộn** — frequency giảm về 0 và `Map.size`.
6. **Nhận kết quả báo cáo** — `Map<id, Set<reporter>>`.
7. **Tìm nguy cơ va chạm** — composite key `time,row,col`.
8. **Khai thác dầu** — BFS là chủ, Set cột chỉ là state phụ.

Đề và lời giải riêng đã có tại [bộ 29 bài](04_Programmers_PCCP_Set.md) và [solutions](../../solutions/03_Map_Set_Programmers_Solutions.md). Không mở solution trước khi ghi state và test tự tạo.

## 5. Bài kiểm tra mastery Map/Set

Không nhìn tài liệu, làm ba việc:

1. Viết `twoSumIndexes` và test `[3] / 6`, `[3,3] / 6`, `[1,5,1] / 2`.
2. Cho logs `[userId, roomId]`, trả số room khác nhau mỗi user từng vào. Viết một câu định nghĩa Map của bạn trước code.
3. Cho mảng event `{id, delta}`, bỏ event làm balance của id âm; trả balance cuối từng id. Nói rõ check xảy ra trước hay sau commit.

Nếu không làm được một bài, quay đúng concept A–F phía trên, không đọc lại cả chương.

## Nguồn research và cách dùng

- [Programmers Hash Kit](https://school.programmers.co.kr/learn/courses/30/parts/12077) hiện liệt kê năm bài lõi: frequency, Set selection, prefix, combinatorics và group/rank. Chúng là lý do lesson này bắt đầu từ sáu cách nghĩ A–F, không bắt đầu từ danh sách API.
- [Programmers Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit) xếp Hash vào nhóm xuất hiện cao; dùng Kit để kiểm tra transfer sau khi hiểu state, không dùng nó thay cho giải thích.
- [PCCP preparation course](https://school.programmers.co.kr/learn/courses/14760/14760-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-pccp-%ED%95%A9%EA%B2%A9-%EB%8C%80%EB%B9%84-%EC%8B%A4%EC%A0%84-%EB%AA%A8%EC%9D%98%EA%B3%A0%EC%82%AC-%ED%95%B4%EC%84%A4-%EA%B0%95%EC%9D%98python%ED%8E%B8) có module Hashing riêng; notebook dùng JavaScript và tự viết lời giải, không sao chép nội dung khóa học.
- API JavaScript được đối chiếu với [MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) và [MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).
