# Chương 01 — Bài luyện từ nhận diện đến tự code

[← Index](../../01_Array_String_Loop.md) · [Lời giải](../../solutions/01_Array_String_Loop_Solutions.md)

## Cách dùng trang này

Đây không phải danh sách phải cày hết trong một lần. Mỗi buổi chỉ nên làm một nhóm nhỏ:

1. chọn 4 bài nhận diện ở Tầng 1;
2. làm 1 bài điền khuyết ở Tầng 2;
3. chọn 1 bài từ Tầng 3 hoặc 4 để viết cách nghĩ;
4. cuối cùng mới tự code 1 bài ở Tầng 5.

Nếu bí, quay lại đúng dạng trong phần lý thuyết và chỉ đọc đến mục **Cách nhận ra dạng này**. Chưa mở full solution. Mục tiêu là tự tìm ra biến cần lưu, không phải hoàn thành thật nhiều câu.

### Mẫu trả lời cho bài nhận diện

Ví dụ đề: “Tính tổng các số âm trong mảng.”

```text
Đề trả về: một tổng
Duyệt: từng value từ trái sang phải
Cần lưu: total = tổng các số âm đã gặp
Cập nhật: nếu value < 0 thì total += value
Khởi tạo: total = 0
Return: total
Dạng dự đoán: ARR-01
```

Nếu chưa đoán được mã `ARR-*` nhưng sáu dòng đầu đúng, cách nghĩ của bạn vẫn đúng. Mã chỉ dùng để tìm lại bài lý thuyết tương ứng.

### Quy tắc xem lời giải

Trước khi mở lời giải, hãy ghi lại ít nhất ba thứ:

- biến bạn đã chọn;
- dòng hoặc test đang làm bạn bí;
- kết quả bạn nghĩ mảng rỗng hoặc một phần tử phải trả.

Sau khi xem, đóng lời giải và viết lại từ đầu. “Đọc thấy hiểu” chưa được tính là đã làm được.

## Tầng 1 — Nhận diện (12)

Chưa code. Với mỗi bài, ghi: **đề trả về gì → duyệt thế nào → cần lưu biến gì → cập nhật khi nào → return gì**. Coverage ID là phần cuối cùng.

### A01-R01 `[ARR-01]`
Tính tổng `value²` của mọi số.

### A01-R02 `[ARR-02]`
Trả index số nhỏ nhất; hòa lấy index lớn nhất.

### A01-R03 `[ARR-03]`
Đếm ký tự chữ số trong chuỗi.

### A01-R04 `[ARR-04]`
Kiểm tra có ít nhất một số âm hay không.

### A01-R05 `[ARR-04]`
Kiểm tra mọi hàng trong array string đều khác rỗng.

### A01-R06 `[ARR-05]`
Trả array bình phương của các số lẻ, giữ order.

### A01-R07 `[ARR-06]`
Với mỗi index, trả tổng mọi phần tử nằm nghiêm ngặt bên phải.

### A01-R08 `[ARR-07]`
Tìm độ dài run ký tự giống nhau dài nhất.

### A01-R09 `[ARR-02]`
Chọn object có priority cao nhất; hòa lấy createdAt nhỏ nhất.

### A01-R10 `[ARR-07]`
Nén chuỗi thành các cặp `[character,count]` theo run.

### A01-R11 `[ARR-05]`
Chuẩn hóa word bằng lowercase và bỏ kết quả rỗng.

### A01-R12 `[ARR-06]`
Trả vị trí số dương gần cuối nhất; không có trả -1.

## Tầng 2 — Điền khuyết (3)

### A01-F01 `[ARR-02]`

```js-fill
function lastIndexOfMinimum(values) {
  let bestValue = values[0];
  let bestIndex = ___;
  for (let index = ___; index < values.length; index += 1) {
    if (values[index] ___ bestValue) {
      bestValue = values[index];
      bestIndex = index;
    }
  }
  return ___;
}
```

### A01-F02 `[ARR-04]`

```js-fill
function containsZero(values) {
  for (const value of values) {
    if (___) return ___;
  }
  return ___;
}
```

### A01-F03 `[ARR-07]`

```js-fill
function longestEqualRun(values) {
  if (values.length === 0) return ___;
  let currentLength = ___;
  let bestLength = 1;
  for (let index = 1; index < values.length; index += 1) {
    if (values[index] === values[index - 1]) currentLength += 1;
    else currentLength = ___;
    bestLength = Math.max(___, ___);
  }
  return bestLength;
}
```

## Tầng 3 — Dựng logic, không code (3)

Điền `Duyệt / State / Check / Update / Invariant / Return`.

### A01-L01 `[ARR-01]`
Tính checksum `Σ(value * (index % 3 + 1))`.

### A01-L02 `[ARR-05]`
Từ array string, trả `{originalIndex, length}` cho string có length≥3.

### A01-L03 `[ARR-06]`
Với mỗi index, trả số lượng số 0 ở suffix nghiêm ngặt bên phải.

## Tầng 4 — Pseudocode (3)

### A01-P01 `[ARR-02]`
Chọn vận động viên có score cao nhất; hòa score lấy penalty nhỏ nhất; vẫn hòa lấy input index nhỏ nhất.

### A01-P02 `[ARR-04]`
Kiểm tra array tăng không giảm. Nêu loop start và revealing test cho off-by-one.

### A01-P03 `[ARR-07]`
Run-length encode string thành `character + count`, ví dụ `aaabb → a3b2`. Nêu cách chốt run cuối.

## Tầng 5 — Tự code, không báo pattern (3)

### A01-C01 `[ARR-01, ARR-03]` — Điểm phạt
Cho `answers` boolean và `penalties`; tổng penalty của các index có answer false. Trả `{wrongCount,totalPenalty}`.

### A01-C02 `[ARR-02]` — Giao hàng ưu tiên
Mỗi order là `{id, priority, distance}`. Trả `id` có priority lớn nhất; hòa lấy distance nhỏ nhất; vẫn hòa lấy order xuất hiện sớm nhất. Empty trả `null`.

### A01-C03 `[ARR-07]` — Đoạn ổn định
Cho nhiệt độ; trả `[start,end]` của run dài nhất mà chênh lệch tuyệt đối giữa hai phần tử kề ≤1. Hòa lấy run bắt đầu sớm hơn; empty trả `[-1,-1]`.

## Tầng 6 — Biến thể (3)

### A01-V01 `[ARR-02]`
Đổi C02 thành hòa cuối cùng lấy order xuất hiện **muộn nhất**. Chỉ ra condition đổi ở đâu.

### A01-V02 `[ARR-06]`
Từ max nghiêm ngặt bên phải đổi thành max từ current tới cuối. Chỉ đổi thứ tự update/output và invariant.

### A01-V03 `[ARR-07 → ARR-05]`
Từ chỉ trả run dài nhất đổi thành trả mọi run `[value,start,length]`. State best nào bị bỏ, state output nào được thêm và flush cuối ra sao?

## Transfer Tests

### A01-T01 — Trạm pin

Log `[timestamp, stationId, charge]`; timestamp tăng nhưng không cần duration. Trả station có tổng charge dương lớn nhất; hòa lấy station xuất hiện đầu tiên. Chỉ có tối đa 5 station nên không bắt buộc Map: hãy dùng array state từ danh sách station đã biết và giải thích vì sao đây là combination chứ không tạo Coverage ID mới.

### A01-T02 — Chuỗi tín hiệu

Input là array `{device, level}`. Trả object `{start,end,length}` của đoạn liên tiếp dài nhất mà level **luân phiên chẵn/lẻ**; `device` không ảnh hưởng điều kiện. Hòa lấy đoạn kết thúc muộn hơn. Không dùng tên `currentLength` hoặc `bestLength`.

## Mini-test A01-M01 — 35 phút

1. **A01-M01.1:** Trả index cuối cùng đạt tổng chữ số lớn nhất trong array số nguyên không âm.
2. **A01-M01.2:** Từ string, tạo array ký tự uppercase cho các ký tự alphabet, bỏ digit/ký hiệu.
3. **A01-M01.3:** Trả độ dài suffix liên tiếp cuối cùng gồm số dương; empty hoặc phần tử cuối không dương trả 0.

Không ghi sẵn pattern. Sau bài, ghi Coverage ID dự đoán→đúng và mastery level.
