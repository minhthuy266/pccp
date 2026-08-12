# 12 — Backtracking và Dynamic Programming cơ bản

> Search liệt kê các quyết định; memo/DP gộp những bài toán con tương đương. Chương này dạy cách nhìn state để biết khi nào phải đổi engine.

1. [Canonical `BTD-01..08`](chapters/12_backtracking_dp/01_Backtracking_DP_Canonical.md)
2. [Practice Ladder](chapters/12_backtracking_dp/02_Practice_Ladder.md)
3. Sau khi tự làm mới mở [Solutions](solutions/12_Backtracking_DP_Basic_Solutions.md)
4. Chạy `node --test tests/notebook_ch12.test.js` để kiểm tra code mẫu.

## Thứ tự học bắt buộc

`BTD-01 → BTD-02 → BTD-03 → BTD-04 → BTD-05 → BTD-06 → BTD-07 → BTD-08`.

Đừng học thuộc từng hàm. Với mỗi bài, phải nói được: một lời gọi/ô `dp` có nghĩa gì; lựa chọn nào tạo transition; base case trả gì; vì sao thứ tự duyệt không đếm thiếu hoặc đếm trùng.

## Checklist tạm thành thạo

- [ ] Phân biệt combination, permutation và include/exclude trước khi code.
- [ ] Nói chính xác state và base case.
- [ ] Tự viết choose → explore → unchoose từ trang trắng.
- [ ] Chỉ dùng pruning khi chứng minh nhánh bị cắt không thể sinh đáp án.
- [ ] Nhận ra state lặp để thêm memo, rồi chuyển được sang bottom-up DP.
- [ ] Chọn đúng thứ tự vòng lặp cho 0/1 và unbounded transition.
- [ ] Tạo counterexample khi một scalar `dp[i]` làm mất thông tin tương lai.
- [ ] Giải thích được vì sao thuật toán không bỏ sót và không đếm trùng.
