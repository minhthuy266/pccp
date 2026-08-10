# Tạo kết quả, nhìn về bên phải và xử lý đoạn liên tiếp — `ARR-05..07`

[← Phần 1: quét mảng](01_Scan.md) · [Bài luyện theo tầng →](03_Practice_Ladder.md)

Phần 1 chỉ trả về một số, một ứng viên hoặc `true/false`. Phần này xử lý ba tình huống mới:

1. kết quả là một mảng mới;
2. đáp án tại vị trí hiện tại phụ thuộc vào những gì nằm bên phải;
3. đề hỏi về một đoạn các phần tử đứng liền nhau.

Mỗi tình huống buộc ta thay đổi cách duyệt hoặc thông tin cần lưu.

---

## 5. Lọc, biến đổi và tạo mảng kết quả `[ARR-05]`

### Bài toán mở đầu

Cho mảng số. Chỉ giữ số lẻ và bình phương chúng.

```text
[2, 3, 5, 6] → [9, 25]
```

Ta cần một mảng `result`, ban đầu rỗng. Với mỗi số:

1. kiểm tra có phải số lẻ không;
2. nếu không phải, bỏ qua;
3. nếu đúng, bình phương rồi thêm vào `result`.

```js
function squareOddNumbers(values) {
  const result = [];

  for (const value of values) {
    if (value % 2 === 0) {
      continue;
    }

    result.push(value * value);
  }

  return result;
}
```

Sau mỗi vòng, `result` chứa đúng kết quả của phần mảng đã đọc và vẫn giữ nguyên thứ tự ban đầu.

### Một phần tử đầu vào tạo ra bao nhiêu phần tử đầu ra?

Đây là cách dễ nhất để nhìn dạng bài:

| Tình huống | Số phần tử được thêm |
| --- | ---: |
| Phần tử bị lọc bỏ | 0 |
| Phần tử được giữ hoặc biến đổi | 1 |
| Một phần tử được tách thành nhiều phần | nhiều hơn 1 |

Ví dụ chuẩn hóa điểm hợp lệ:

- bỏ điểm ngoài khoảng `0..100`;
- điểm hợp lệ được đổi thành `{ index, grade }`;
- `grade` là `A` nếu từ 90, `B` nếu từ 80, còn lại là `C`.

```js
function normalizeValidScores(scores) {
  const result = [];

  for (let index = 0; index < scores.length; index += 1) {
    const score = scores[index];

    // Lọc trước: điểm không hợp lệ không được tạo output.
    if (score < 0 || score > 100) {
      continue;
    }

    let grade;
    if (score >= 90) {
      grade = "A";
    } else if (score >= 80) {
      grade = "B";
    } else {
      grade = "C";
    }

    result.push({ index, grade });
  }

  return result;
}
```

Chạy tay với `[95, -1, 82, 70, 120]`:

| `index` | Điểm | Hợp lệ? | Phần tử được thêm | `result` sau bước này |
| ---: | ---: | --- | --- | --- |
| 0 | 95 | có | `{index: 0, grade: "A"}` | `[A0]` |
| 1 | -1 | không | không có | `[A0]` |
| 2 | 82 | có | `{index: 2, grade: "B"}` | `[A0, B2]` |
| 3 | 70 | có | `{index: 3, grade: "C"}` | `[A0, B2, C3]` |
| 4 | 120 | không | không có | `[A0, B2, C3]` |

Ta dùng vòng lặp theo `index` vì output cần vị trí gốc. Nếu gọi `filter()` trước rồi mới `map()`, index trong bước `map()` là index của mảng đã lọc, không còn là index ban đầu.

### Thứ tự kiểm tra quan trọng

Trong ví dụ trên:

- phải kiểm tra hợp lệ trước khi xếp hạng, nếu không `120` có thể bị xếp hạng A;
- phải kiểm tra `score >= 90` trước `score >= 80`, vì điểm `95` thỏa cả hai điều kiện.

Đây không phải mẹo JavaScript. Nó đến từ quan hệ giữa các điều kiện.

### Cách nhận ra dạng này

Đề yêu cầu “trả danh sách”, “lọc ra”, “biến đổi mỗi phần tử”, “chuẩn hóa”, “giữ nguyên thứ tự”. Biến chính thường là `result`.

Khung cần nhớ:

```js
const result = [];

for (const value of values) {
  if (valueKhongHopLe) {
    continue;
  }

  const newValue = bienDoi(value);
  result.push(newValue);
}

return result;
```

Các tên `valueKhongHopLe` và `bienDoi` chỉ đại diện cho logic của đề, không phải cú pháp có sẵn.

### Có nên dùng `map()` và `filter()`?

Có, khi cách đó làm code rõ hơn:

```js
const squaredOdds = values
  .filter((value) => value % 2 !== 0)
  .map((value) => value * value);
```

Trong lúc học thuật toán, vòng lặp đầy đủ thường dễ chạy tay hơn. Trong lúc thi, chọn cách giúp bạn kiểm soát index, thứ tự và trường hợp biên tốt nhất.

### Lỗi hay gặp

- `push` trước khi kiểm tra điều kiện lọc.
- Làm mất index gốc sau khi lọc.
- Sửa trực tiếp input dù đề không yêu cầu.
- Tạo `result` bên trong vòng lặp khiến các phần tử trước bị mất.
- Dùng `.fill([])` để tạo mảng hai chiều; các hàng sẽ cùng trỏ tới một array.

### Tự kiểm tra

Viết hàm nhận mảng chuỗi, `trim()` từng chuỗi, bỏ chuỗi rỗng và trả các chuỗi còn lại ở dạng chữ thường.

```text
["  An ", "   ", "BÌNH"] → ["an", "bình"]
```

---

## 6. Đổi hướng duyệt khi câu hỏi nhìn về bên phải `[ARR-06]`

### Bài toán mở đầu

Với mỗi vị trí, trả số lớn nhất nằm **nghiêm ngặt bên phải**. Vị trí cuối không có phần tử bên phải nên trả `null`.

```text
[3, 1, 5, 2] → [5, 5, 2, null]
```

Cách trực tiếp là, tại mỗi vị trí, quét toàn bộ phần bên phải để tìm max. Nhưng nhiều phần bị quét lặp lại, khiến thời gian thành `O(n²)`.

### Vì sao nên đi từ phải sang trái?

Nếu bắt đầu ở cuối mảng, ta có thể giữ `maximumOnRight`: số lớn nhất trong phần đã đi qua. Khi đứng tại một vị trí, phần “đã đi qua” chính là phần nằm bên phải nó.

Có một chi tiết quyết định đáp án:

> Ghi kết quả trước, rồi mới đưa phần tử hiện tại vào max bên phải.

```js
function maximumStrictlyToRight(values) {
  const result = Array(values.length);
  let maximumOnRight = null;

  for (let index = values.length - 1; index >= 0; index -= 1) {
    // maximumOnRight chưa chứa values[index], nên đây là max nghiêm ngặt bên phải.
    result[index] = maximumOnRight;

    const currentValue = values[index];
    if (maximumOnRight === null || currentValue > maximumOnRight) {
      maximumOnRight = currentValue;
    }
  }

  return result;
}
```

Chạy tay:

| `index` | Giá trị | Max bên phải trước bước này | Ghi vào `result[index]` | Max sau khi thêm current |
| ---: | ---: | ---: | ---: | ---: |
| 3 | 2 | `null` | `null` | 2 |
| 2 | 5 | 2 | 2 | 5 |
| 1 | 1 | 5 | 5 | 5 |
| 0 | 3 | 5 | 5 | 5 |

### “Nghiêm ngặt bên phải” và “từ current đến cuối” khác nhau ở đâu?

Nếu đề hỏi max từ vị trí hiện tại đến cuối, current phải được tính vào đáp án. Chỉ cần đổi thứ tự:

```js
function maximumFromCurrentToEnd(values) {
  const result = Array(values.length);
  let suffixMaximum = null;

  for (let index = values.length - 1; index >= 0; index -= 1) {
    const currentValue = values[index];

    if (suffixMaximum === null || currentValue > suffixMaximum) {
      suffixMaximum = currentValue;
    }

    result[index] = suffixMaximum;
  }

  return result;
}
```

- ghi rồi cập nhật → không gồm current;
- cập nhật rồi ghi → có gồm current.

### Ví dụ dễ hơn: tổng suffix

Tính tổng từ mỗi vị trí đến cuối:

```text
[3, 1, 2] → [6, 3, 2]
```

```js
function suffixSums(values) {
  const result = Array(values.length);
  let sum = 0;

  for (let index = values.length - 1; index >= 0; index -= 1) {
    sum += values[index];
    result[index] = sum;
  }

  return result;
}
```

### Cách nhận ra dạng này

Đề hỏi thông tin “bên phải”, “sau vị trí hiện tại”, “suffix”, “phần tử gần cuối thỏa điều kiện”. Hướng duyệt phải đi từ phía đã có thông tin mà current cần.

Khung cần nhớ:

```js
const result = Array(values.length);
let informationOnRight = giaTriBanDau;

for (let index = values.length - 1; index >= 0; index -= 1) {
  result[index] = taoDapAn(informationOnRight);
  informationOnRight = capNhat(informationOnRight, values[index]);
}

return result;
```

### Lỗi hay gặp

- Viết `index > 0`, khiến vị trí `0` không bao giờ được xử lý; phải là `index >= 0`.
- Cập nhật trước khi ghi trong bài “nghiêm ngặt bên phải”.
- Dùng `push()` khi đi ngược, làm thứ tự output bị đảo.
- Chọn giá trị ban đầu như `0` dù dữ liệu có thể toàn số âm.
- Duyệt ngược chỉ vì đề có chữ “cuối cùng”; hướng duyệt phải do thông tin phụ thuộc quyết định.

### Tự kiểm tra

Viết hàm trả số lượng số `0` nằm nghiêm ngặt bên phải mỗi vị trí:

```text
[0, 4, 0, 0] → [2, 2, 1, 0]
```

Tự hỏi: ghi `countZeroOnRight` trước hay tăng nó trước?

---

## 7. Đo một đoạn các phần tử đứng liền nhau `[ARR-07]`

### “Đếm phần tử” khác “độ dài đoạn liên tiếp”

Với `[1, 2, -1, 3, 4]`:

- có bốn số dương;
- nhưng đoạn số dương liên tiếp dài nhất chỉ dài `2`.

Bài đếm thông thường chỉ cần `count`. Bài đoạn liên tiếp cần biết:

- đoạn đang chạy dài bao nhiêu;
- đoạn tốt nhất từng thấy dài bao nhiêu.

### Bài toán mở đầu

Tìm độ dài đoạn tăng nghiêm ngặt dài nhất.

```text
[1, 2, 3, 2, 4] → 3
```

Đoạn `[1, 2, 3]` dài 3. Khi gặp `2` sau `3`, đoạn cũ bị đứt và một đoạn mới bắt đầu từ chính số `2` đó.

```js
function longestStrictlyIncreasingRun(values) {
  if (values.length === 0) return 0;

  let currentLength = 1;
  let bestLength = 1;

  for (let index = 1; index < values.length; index += 1) {
    if (values[index] > values[index - 1]) {
      currentLength += 1;
    } else {
      currentLength = 1;
    }

    bestLength = Math.max(bestLength, currentLength);
  }

  return bestLength;
}
```

### Vì sao các biến bắt đầu bằng `1`?

Với mảng không rỗng, một phần tử tự nó đã tạo thành đoạn dài 1. Khi đoạn tăng bị đứt, phần tử hiện tại cũng bắt đầu đoạn mới dài 1, nên ta reset về `1`, không phải `0`.

Vòng lặp bắt đầu tại index `1` vì mỗi bước so current với `values[index - 1]`.

Chạy tay:

| `index` | Cặp đang so | Tiếp tục đoạn cũ? | `currentLength` | `bestLength` |
| ---: | --- | --- | ---: | ---: |
| khởi tạo | chỉ có `[1]` | — | 1 | 1 |
| 1 | `1 → 2` | có | 2 | 2 |
| 2 | `2 → 3` | có | 3 | 3 |
| 3 | `3 → 2` | không | 1 | 3 |
| 4 | `2 → 4` | có | 2 | 3 |

Sau khi xử lý index `i`:

- `currentLength` là độ dài đoạn tăng kết thúc đúng tại `i`;
- `bestLength` là đoạn dài nhất trong phần mảng từ đầu đến `i`.

Đó là hai câu quan trọng hơn việc thuộc tên `ARR-07`.

### Khi cần trả vị trí đoạn

Nếu đề yêu cầu `[start, end]`, ta phải lưu thêm vị trí bắt đầu của đoạn hiện tại và đoạn tốt nhất.

```js
function longestPositiveRun(values) {
  let currentStart = -1;
  let bestStart = -1;
  let bestEnd = -1;

  for (let index = 0; index < values.length; index += 1) {
    if (values[index] <= 0) {
      currentStart = -1;
      continue;
    }

    if (currentStart === -1) {
      currentStart = index;
    }

    const currentLength = index - currentStart + 1;
    const bestLength = bestStart === -1 ? 0 : bestEnd - bestStart + 1;

    if (currentLength > bestLength) {
      bestStart = currentStart;
      bestEnd = index;
    }
  }

  return [bestStart, bestEnd];
}
```

Dùng `>` giúp giữ đoạn xuất hiện sớm hơn khi hai đoạn dài bằng nhau. Nếu đề muốn đoạn muộn hơn, luật cập nhật phải đổi.

### Khi cần tạo mọi đoạn: nhớ chốt đoạn cuối

Nén `"aaabb"` thành `[["a", 3], ["b", 2]]`:

```js
function runLengthEncode(text) {
  if (text.length === 0) return [];

  const runs = [];
  let currentCharacter = text[0];
  let currentCount = 1;

  for (let index = 1; index < text.length; index += 1) {
    if (text[index] === currentCharacter) {
      currentCount += 1;
    } else {
      runs.push([currentCharacter, currentCount]);
      currentCharacter = text[index];
      currentCount = 1;
    }
  }

  // Không còn ký tự khác để kích hoạt nhánh else,
  // nên đoạn đang mở cuối cùng phải được chốt tại đây.
  runs.push([currentCharacter, currentCount]);

  return runs;
}
```

Có hai kiểu xử lý đoạn:

- chỉ cần độ dài tốt nhất: cập nhật `best` sau mỗi bước, thường không cần chốt riêng;
- cần lưu từng đoạn hoàn chỉnh: chốt khi đoạn bị đứt và chốt thêm một lần sau vòng lặp.

### Cách nhận ra dạng này

Đề có các từ “liên tiếp”, “đứng liền nhau”, “đoạn dài nhất”, “run”, “chuỗi ngày liên tục”. Điều kiện thường so current với phần tử trước hoặc hỏi current có tiếp tục đoạn đang mở không.

Khung đo độ dài:

```js
if (values.length === 0) return 0;

let currentLength = 1;
let bestLength = 1;

for (let index = 1; index < values.length; index += 1) {
  if (currentTiepTucDoanCu) {
    currentLength += 1;
  } else {
    currentLength = 1;
  }

  bestLength = Math.max(bestLength, currentLength);
}

return bestLength;
```

### Lỗi hay gặp

- Reset độ dài về `0` dù current đã tạo đoạn mới dài `1`.
- Bắt đầu vòng lặp từ `0` rồi đọc `values[-1]`.
- Dùng `>=` trong bài yêu cầu tăng nghiêm ngặt.
- Chỉ đếm tổng phần tử hợp lệ, không reset khi đoạn bị đứt.
- Quên chốt đoạn cuối khi đang tạo danh sách các đoạn.
- Cập nhật đoạn tốt nhất khi dài hơn hoặc bằng, vô tình đổi luật hòa từ sớm sang muộn.

### Tự kiểm tra

Viết hai hàm:

1. độ dài đoạn ký tự giống nhau dài nhất: `"abbbaa" → 3`;
2. `[start, end]` của đoạn số chẵn liên tiếp dài nhất, hòa lấy đoạn xuất hiện sớm hơn.

---

## So sánh ba dạng trong phần này

| Đề hỏi | Điều quyết định cách làm | Biến chính |
| --- | --- | --- |
| Tạo danh sách mới | Mỗi current tạo 0, 1 hay nhiều output | `result` |
| Thông tin nằm bên phải | Đổi hướng để dữ liệu cần thiết được xử lý trước | `suffixSum`, `maximumOnRight` |
| Đoạn liên tiếp | Current tiếp tục hay làm đứt đoạn đang mở | `currentLength`, `bestLength` |

## Bài kiểm tra chuyển giao

Cho mảng tín hiệu:

```js
[
  { device: "A", level: 2 },
  { device: "B", level: 5 },
  { device: "A", level: 8 },
  { device: "C", level: 4 },
  { device: "B", level: 7 }
]
```

Trả `{start, end, length}` của đoạn dài nhất mà tính chẵn/lẻ của `level` luân phiên. Trường `device` không ảnh hưởng điều kiện. Nếu nhiều đoạn dài bằng nhau, lấy đoạn kết thúc muộn hơn.

<details>
<summary>Gợi ý 1 — Điều kiện tiếp tục đoạn</summary>

Hai level kề nhau phải có parity khác nhau. Có thể so `level % 2`.

</details>

<details>
<summary>Gợi ý 2 — Luật hòa</summary>

Khi đoạn hiện tại dài bằng đoạn tốt nhất, đề muốn đoạn hiện tại đến sau thắng. Vì vậy điều kiện cập nhật best có chứa trường hợp bằng nhau.

</details>

Sau khi làm xong, đối chiếu với [A01-T02 trong Practice Ladder](03_Practice_Ladder.md#a01-t02--chuỗi-tín-hiệu). Nếu code đúng nhưng không giải thích được ý nghĩa từng biến, hãy chạy tay bằng bảng trước khi xem lời giải.
