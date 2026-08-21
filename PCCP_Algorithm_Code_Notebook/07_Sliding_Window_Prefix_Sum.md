# 07 — Prefix Sum và Sliding Window: làm chủ bài đoạn liên tiếp

> Batch 1 deep lab: [Prefix / fixed window / variable window với Map / subarray sum k](chapters/07_prefix_window/05_Batch1_Problem_To_Code_Lab.md).

> Chương đã có canonical theory, practice, solution và test. Bắt đầu bằng nội dung, không học thuộc tên pattern.

## Bắt đầu ở đâu?

1. [Prefix Sum từ gốc](chapters/07_prefix_window/01_Prefix_Sum_From_Zero.md): beginner guide.
2. [Prefix canonical PRE-01..05](chapters/07_prefix_window/02_Prefix_Canonical.md): state, invariant, template và variants.
3. [Sliding Window canonical SW-01..06](chapters/07_prefix_window/03_Sliding_Window_Canonical.md): fixed, variable, frequency, counting và decision contrast.
4. [Practice Ladder](chapters/07_prefix_window/04_Practice_Ladder.md), rồi mới mở [Solutions](solutions/07_Sliding_Window_Prefix_Sum_Solutions.md).

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

## Gate máy

```bash
node --test tests/notebook_ch07.test.js
npm run check:notebook-framework
```
