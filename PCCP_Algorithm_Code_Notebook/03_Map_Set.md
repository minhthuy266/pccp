# 03 — Map và Set: nhớ đúng thông tin của quá khứ

> Trạng thái: `MAP-01..14` hoàn thiện v1. Học theo thứ tự; không mở thư mục `solutions/` trước khi đã tự làm.

## Điều hướng

1. [Phần lõi](chapters/03_map_set/01_Core.md): `MAP-01..06` — membership, deduplicate, frequency, first index, latest index, khoảng cách.
2. [Phần kết hợp](chapters/03_map_set/02_Combinations.md): `MAP-07..14` — complement, compare frequency, group/relation, argmax, simulation, window frequency và nhiều Map.
3. [Practice Ladder](chapters/03_map_set/03_Practice_Ladder.md): 12 nhận diện, 3 điền khuyết, 3 dựng logic, 3 pseudocode, 3 tự code, 4 biến thể, 3 Transfer Test và 1 mini-test.
4. Chỉ sau khi làm: [lời giải](solutions/03_Map_Set_Solutions.md).
5. [Báo cáo tự kiểm chương](chapters/03_map_set/QA.md).
6. [Coverage Matrix](PATTERN_COVERAGE_MATRIX.md) và [Template Contrasts](TEMPLATE_CONTRASTS.md).

## Bản đồ chọn cấu trúc

| Câu hỏi tương lai cần hỏi quá khứ | State phù hợp |
| --- | --- |
| “Đã thấy `x` chưa?” | `Set<value>` |
| “`x` xuất hiện bao nhiêu lần?” | `Map<value, count>` |
| “`x` xuất hiện đầu tiên ở đâu?” | `Map<value, firstIndex>`; không ghi đè |
| “Lần gần nhất của `x` ở đâu?” | `Map<value, latestIndex>`; luôn cập nhật |
| “Các phần tử thuộc nhóm `k` là gì?” | `Map<key, array>` |
| “`a` liên hệ với những ai?” | `Map<key, Set>` |
| “State hiện tại của thực thể `id`?” | `Map<id, stateObject>` |
| “Trong đoạn hiện tại, mỗi value có bao nhiêu bản sao?” | `Map<value,count>` với add/remove đối xứng (`MAP-13`) |
| “Cần tra cùng dữ liệu theo hai loại câu hỏi?” | Nhiều Map có invariant liên kết (`MAP-14`) |

Map/Set không phải đáp án tự động cho mọi bài tra cứu. Nếu miền key là các số nguyên nhỏ, liên tiếp và đã biết giới hạn, array có thể rõ và nhanh hơn. Nếu cần thứ tự tăng dần theo key, Map không tự sort; phải sort key hoặc chọn cấu trúc khác. Nếu chỉ có vài phần tử, brute force có thể đủ và dễ chứng minh hơn.

## JavaScript phải thuộc

```js
const seen = new Set();
seen.add(value);
seen.has(value);
seen.delete(value);
seen.size;

const infoByKey = new Map();
infoByKey.set(key, value);
infoByKey.has(key);
infoByKey.get(key);       // undefined nếu key không tồn tại
infoByKey.delete(key);
infoByKey.size;
```

### `has()` và `get()` không thay thế nhau

```js
const scoreByName = new Map();
scoreByName.set("An", 0);

scoreByName.get("An");  // 0: value hợp lệ nhưng falsy
scoreByName.get("Bình"); // undefined: chưa có key
```

Khi câu hỏi là **key tồn tại hay chưa**, dùng `map.has(key)`. `if (map.get(key))` sai khi value hợp lệ là `0`, `false`, `""` hoặc `undefined`. Với frequency, `(map.get(key) ?? 0) + 1` hợp lệ vì ta chủ động quy ước value là số đếm, không phải `undefined`.

### Object/array là key theo reference

Hai array có cùng nội dung vẫn là hai key khác nhau. Khi cần key cấu trúc, chuẩn hóa thành chuỗi không mơ hồ hoặc dùng các tầng Map lồng nhau.

```js
new Set([[1, 2], [1, 2]]).size; // 2
```

## Template tư duy chung

```text
Duyệt qua cái gì?
Key đại diện cho thực thể/thuộc tính nào?
Value lưu đúng một thông tin gì về key?
Tương lai cần lấy thông tin cũ nào?
Check phải diễn ra trước hay sau update?
Update tạo mới, cộng dồn, chỉ ghi lần đầu hay luôn ghi đè?
Invariant tại đầu/cuối mỗi vòng là gì?
Return lấy trực tiếp từ Map/Set hay cần quét thêm?
```

## Template code khung (không phải lời giải một bài cụ thể)

```js
function scanWithMap(items) {
  const stateByKey = new Map();

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const key = getKey(item);

    // 1. Đọc state cũ nếu quyết định hiện tại phụ thuộc quá khứ.
    const oldState = stateByKey.get(key);

    // 2. Check trước update nếu cần tránh dùng chính item hiện tại.
    if (isAnswer(oldState, item, index)) {
      return buildAnswer(oldState, item, index);
    }

    // 3. Commit state mới theo đúng nghĩa đã định nghĩa.
    const newState = transition(oldState, item, index);
    stateByKey.set(key, newState);
  }

  return noAnswerValue;
}
```

Đây là code khung vì `getKey`, `isAnswer`, `transition`, `buildAnswer` thay đổi theo contract; bộ xương scan → read old → check → update vẫn tái sử dụng.

## Checklist tạm thành thạo

- [ ] Nhận diện đúng ít nhất 80% bài cơ bản.
- [ ] Tự nói được state và transition.
- [ ] Viết template frequency, first/latest index và complement từ trang trắng.
- [ ] Làm đúng 3 bài cơ bản liên tiếp.
- [ ] Làm được ít nhất 2 bài biến thể.
- [ ] Sau 3 ngày vẫn tự viết lại được.
- [ ] Giải thích được vì sao check-before-update không dùng lại cùng phần tử.

Nếu sai membership/frequency: quay lại Tầng 1–2. Nếu lẫn first/latest: làm Mutation M03-V01. Nếu Map đúng nhưng transition sai: Tầng 3–4. Nếu chỉ làm được bài giống mẫu: Tầng 6 và mini-test.

## Mastery Gate theo Coverage ID

Ghi mức `0..4` cho từng `MAP-01..14` trong Error Log/Review Schedule. Chương chỉ tạm thành thạo khi ít nhất 12/14 ID đạt mức 3, ít nhất 9/14 đạt mức 4, vượt hai Transfer/Mixed Test liên tiếp, không nhìn full code và giải thích được invariant.

Nếu chưa qua: sai ID → quay lại nhận diện; state mơ hồ → phiếu trang trắng; check/update sai → dry run; logic đúng code sai → điền khuyết; hidden test sai → edge-case mutation.
