# 03 Map/Set — Practice Ladder

[← Index](../../03_Map_Set.md) · [Lời giải (chỉ mở sau khi làm)](../../solutions/03_Map_Set_Solutions.md)

## Tầng 1 — Nhận diện (12 bài)

Với mỗi bài, chỉ ghi: `Pattern`, `Key`, `Value/state`, `vì sao không cần/không đủ Set`.

### M03-R01 `[MAP-01]`

Cho danh sách mã vé; trả `true` ngay khi gặp mã đã xuất hiện trước đó.

### M03-R02 `[MAP-02]`

Trả danh sách email duy nhất, giữ đúng thứ tự xuất hiện đầu tiên.

### M03-R03 `[MAP-03]`

Đếm số lần mỗi món hàng xuất hiện trong giỏ.

### M03-R04 `[MAP-04]`

Với mỗi tên, lưu vị trí đầu tiên trong log.

### M03-R05 `[MAP-05]`

Trong stream, tại mỗi vị trí cần biết lần gần nhất cùng giá trị nằm ở đâu.

### M03-R06 `[MAP-06]`

Tìm khoảng cách nhỏ nhất giữa hai lần xuất hiện của cùng số.

### M03-R07 `[MAP-07]`

Tìm hai index khác nhau có tổng bằng `target` trong một lượt quét.

### M03-R08 `[MAP-08]`

Kiểm tra hai chuỗi có cùng bảng tần suất ký tự hay không.

### M03-R09 `[MAP-09]`

Gom các từ theo chữ cái đầu, giữ toàn bộ từ trong mỗi nhóm.

### M03-R10 `[MAP-10]`

Từ các cặp `[user, course]`, lưu mỗi user đã học những course khác nhau nào.

### M03-R11 `[MAP-11]`

Tìm sản phẩm có số lượt mua lớn nhất; hòa thì lấy tên từ điển nhỏ hơn.

### M03-R12 `[MAP-12]`

Xử lý event `[time, id, delta]` và trả số dư cuối của từng `id`.

## Tầng 2 — Điền khuyết (3 bài)

### M03-F01 `[MAP-03]` — Frequency

Điền bốn chỗ trống.

```js
function frequencies(values) {
  const countByValue = new Map();

  for (const value of values) {
    const oldCount = countByValue.get(value) ?? ___;
    countByValue.___(value, oldCount + ___);
  }

  return ___;
}
```

### M03-F02 `[MAP-04]` — First index

```js
function firstPositions(values) {
  const firstIndexByValue = new Map();

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (___) {
      firstIndexByValue.set(___, ___);
    }
  }

  return firstIndexByValue;
}
```

### M03-F03 `[MAP-07]` — Two Sum không dùng lại một phần tử

```js
function twoSum(values, target) {
  const indexByValue = new Map();

  for (let index = 0; index < values.length; index += 1) {
    const currentValue = values[index];
    const neededValue = ___;

    if (___) {
      return [___, index];
    }

    ___;
  }

  return [-1, -1];
}
```

## Tầng 3 — Dựng logic, không code (3 bài)

Điền đúng năm ô `Duyệt qua / State / Kiểm tra / Cập nhật / Return` và thêm một câu invariant.

### M03-L01 `[MAP-03]` — Ký tự không lặp đầu tiên

Cho chuỗi `s`, trả index của ký tự xuất hiện đúng một lần và nằm sớm nhất; không có trả `-1`.

### M03-L02 `[MAP-05]` — Khoảng cách gần nhất về bên trái

Với mỗi `values[i]`, trả `-1` nếu chưa thấy giá trị đó; nếu đã thấy, trả `i - latestIndex`.

### M03-L03 `[MAP-09]` — Nhóm giao dịch

Cho `[category, amount]`, trả Map từ category tới array các amount theo thứ tự đầu vào.

## Tầng 4 — Viết pseudocode (3 bài)

### M03-P01 `[MAP-01]` — Thiếu số trong miền

Mảng chứa các số khác nhau trong `0..n`, thiếu đúng một số. Gợi ý: Set là cách trực tiếp; hãy viết cả cách dùng tổng và điều kiện an toàn số.

### M03-P02 `[MAP-10]` — Quan hệ hai chiều

Từ các cặp bạn bè `[a, b]`, dựng `Map<person, Set<friend>>`. Quan hệ là hai chiều, cặp trùng không được tạo trùng.

### M03-P03 `[MAP-11, MAP-14]` — Điểm cao nhất theo đội

Event `[team, delta]` cộng dồn điểm. Trả team cao điểm nhất; hòa lấy team xuất hiện đầu tiên. Viết rõ lúc nào lưu `firstOrder`.

## Tầng 5 — Tự code, không báo pattern (3 bài)

### M03-C01 `[MAP-08]` — Tần suất cân bằng

Cho hai array chuỗi `required` và `provided`. Trả `true` nếu mỗi chuỗi xuất hiện số lần bằng nhau ở hai array. Ví dụ `['a','a','b']` và `['b','a','a']` → `true`.

### M03-C02 `[MAP-06]` — Khoảng cách lặp nhỏ nhất

Cho array số. Trả khoảng cách index nhỏ nhất giữa hai phần tử bằng nhau; không có cặp trả `-1`. Ví dụ `[5, 1, 5, 5]` → `1`.

### M03-C03 `[MAP-12]` — Bảng điểm sống

Event có dạng `[name, delta]`. Điểm bắt đầu 0. Nếu sau update điểm bằng 0, xóa người đó khỏi bảng. Trả array `[name, score]` còn lại theo thứ tự key lần đầu được thêm ở **lần tồn tại hiện tại**.

## Tầng 6 — Biến thể (3 bài)

### M03-V01 `[MAP-04 → MAP-05]` — First thành latest

Từ bài lưu index đầu tiên, đổi yêu cầu thành index gần nhất. Chỉ ra chính xác state, condition và transition nào đổi; sau đó code.

### M03-V02 `[MAP-03 + MAP-11]` — Count thành argmax

Từ frequency Map, trả `{ value, count }` có count lớn nhất; hòa lấy value xuất hiện đầu tiên. Nêu state bổ sung để tie-break không phụ thuộc may rủi.

### M03-V03 `[MAP-09 → MAP-10]` — Group thành unique group

Từ `key → array`, đổi thành mỗi group chỉ giữ item khác nhau nhưng output vẫn theo thứ tự lần đầu. Chọn `Map<key, Set>` hay cần thêm array? Giải thích representation.

### M03-V04 `[MAP-03 → MAP-13]` — Frequency toàn cục thành frequency cửa sổ

Từ Map đếm cả array, đổi thành trả số loại khác nhau trong mọi đoạn liên tiếp dài `k`. Chỉ ra state nào phải loại bỏ khi `left` đi qua, điều kiện nào tạo output và vì sao key count 0 phải bị xóa.

## Transfer Tests

### M03-T01 — Thẻ ra vào

Một tòa nhà nhận log `[time, cardId, action]`, trong đó action là `IN` hoặc `OUT`. Trả `{ invalidIndex, peopleInside }`: `invalidIndex` là event đầu tiên không hợp lệ (IN khi thẻ đang ở trong hoặc OUT khi thẻ đang ở ngoài), hoặc `-1`; `peopleInside` là số người ngay trước event lỗi, hoặc sau toàn bộ log nếu không lỗi.

Chi tiết gây nhiễu: `time` tăng dần nhưng không cần tính khoảng cách thời gian. Không cho sẵn pattern hay phiếu state/check/update.

### M03-T02 — Cảm biến kho

Log có dạng `[sensorId, product, temperature]`. Với mỗi product, chỉ lần đọc **mới nhất của từng sensor** được tính. Trả product có nhiệt độ trung bình lớn nhất; hòa lấy product xuất hiện đầu tiên trong log. Một sensor có thể chuyển sang đo product khác.

Chi tiết gây nhiễu: số lần event không phải số mẫu đang có hiệu lực. Hãy chỉ ra dạng gần nhất, phần template giữ lại và phần state bắt buộc sửa.

### M03-T03 — Cảnh báo thiết bị

Cho stream `[timestamp, deviceId, errorCode]` và `k`. Với mỗi đoạn đúng `k` event liên tiếp, trả số device có ít nhất **hai errorCode khác nhau** trong đoạn. `timestamp` tăng dần nhưng khoảng cách thời gian không ảnh hưởng kết quả.

Không dùng lại tên biến từ bài frequency-window mẫu. Hãy phân vai pattern chịu trách nhiệm duyệt và pattern chịu trách nhiệm state; return đã đổi từ số key toàn cửa sổ thành số device thỏa điều kiện nested.

## Mini-test M03-M01 `[MAP-06, MAP-10..14]` — 35 phút, không báo pattern

Không mở phần lý thuyết hoặc solutions.

1. **M03-M01.1:** Cho log `[time, user, page]`. Với mỗi user, đếm số page **khác nhau** đã truy cập và trả user có số lớn nhất; hòa lấy user xuất hiện sớm hơn trong log.
2. **M03-M01.2:** Cho array, tìm cặp index `i < j` có cùng value và khoảng cách nhỏ nhất. Nếu nhiều cặp cùng khoảng cách, lấy cặp có `j` nhỏ hơn.
3. **M03-M01.3:** Cho `inventory` ban đầu `[item, count]` và event `[item, delta]`; không cho phép count âm. Trả index event đầu tiên không hợp lệ, hoặc `-1`.

Chấm 10 điểm theo rubric trong `00_Learning_System.md`; phải ghi ít nhất một invariant và ba revealing tests.
