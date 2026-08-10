# 07 — Prefix Sum và Sliding Window: làm chủ bài đoạn liên tiếp

> Chương đang được viết lại theo chuẩn learner-first. Bắt đầu bằng nội dung, không học thuộc tên pattern.

## Bắt đầu ở đâu?

1. [Prefix Sum từ gốc](chapters/07_prefix_window/01_Prefix_Sum_From_Zero.md): khi cần hỏi nhanh tổng/đếm trên nhiều đoạn, hoặc biến bài “tổng đoạn” thành tra cứu quá khứ.
2. Sliding Window: sẽ học sau prefix; khi biên trái/phải phải di chuyển và state có thể thêm/bớt rẻ.

## Câu hỏi để không chọn nhầm

| Đề đang yêu cầu | Hướng nghĩ đầu tiên |
| --- | --- |
| Rất nhiều query tổng của đoạn `[left..right]` | Prefix sum |
| Nhiều update trên đoạn, cuối mới hỏi giá trị | Difference array + prefix |
| Đếm/tìm subarray có tổng target, số có thể âm | Prefix sum + Map |
| Cửa sổ có đúng K phần tử, thêm một bên và bỏ một bên | Fixed sliding window |
| Đoạn dài nhất/ngắn nhất thỏa điều kiện có tính co giãn | Variable sliding window |

Đừng gọi mọi subarray là sliding window. Prefix sum trả lời bằng **trừ hai lịch sử**; window duy trì **một đoạn đang mở**.

## Khi nào coi là học xong?

- [ ] Tự dựng được `prefix[i + 1] = prefix[i] + values[i]` và giải thích vì sao cần ô prefix 0.
- [ ] Không nhầm `[left..right]` với `[left..right)`.
- [ ] Nhìn target-sum và nói được Map đang lưu “prefix sum đã gặp bao nhiêu lần”.
- [ ] Phân biệt được update nhiều đoạn với query nhiều đoạn.
- [ ] Làm được P32 Sự kiện giảm giá sau khi học sliding window.
