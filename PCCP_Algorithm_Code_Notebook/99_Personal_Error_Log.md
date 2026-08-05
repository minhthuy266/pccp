# 99 — Personal Error Log

| Ngày | Bài | Coverage ID dự đoán → đúng | Mastery 0–4 | Lỗi nhận diện | Lỗi state | Lỗi transition | Lỗi code | Test làm sai | Quy tắc rút ra | Ngày ôn lại |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |  |

## Mã phân loại

- `READ`: hiểu sai contract hoặc output.
- `PATTERN`: chọn sai pattern/bỏ qua bottleneck.
- `STATE-MISSING`: state không đủ cho tương lai.
- `KEY-VALUE`: không nói rõ key/value.
- `ORDER`: check sau update làm mất dữ liệu cũ, hoặc ngược lại.
- `LOOP`: sai điểm bắt đầu/kết thúc, `break`, off-by-one.
- `EDGE`: quên empty, duplicate, tie, zero, no-answer.
- `JS`: đúng ý tưởng nhưng sai API/cú pháp/mutation/reference.
- `RECALL`: nhìn lời giải hiểu nhưng không dựng lại được.

Mỗi lỗi phải có một **revealing test** nhỏ và một quy tắc có thể hành động. “Cẩn thận hơn” không phải quy tắc; “với first index, chỉ `set` khi `!map.has(key)`” là quy tắc.

Sau khi sửa, ghi ID đúng từ Coverage Matrix. Ví dụ: dự đoán `MAP-04` nhưng đề cần lần gần nhất thì ghi `MAP-04 → MAP-05`.
