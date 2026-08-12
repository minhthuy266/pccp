# 09 — Binary Search

> Chương đã có canonical theory, practice, solution và behavioral tests. Không bắt đầu bằng binary search on answer; học boundary search trước.

## Bắt đầu ở đâu

1. [Canonical `BS-01..05`](chapters/09_binary_search/01_Binary_Search_Canonical.md): exact, lower/upper, first/last true, answer space và numeric safety.
2. [Practice Ladder](chapters/09_binary_search/02_Practice_Ladder.md): viết truth sequence và invariant trước code.
3. Chỉ sau nỗ lực mới mở [Solutions](solutions/09_Binary_Search_Solutions.md).
4. Case study official: OF043 và OF044 trong Master Navigator.

## Ba câu bắt buộc trước mọi binary search

```text
Truth sequence khi candidate tăng là F→T hay T→F?
Low/high đang biết điều gì và có thật sự bao đáp án không?
Mỗi transition có làm miền nhỏ đi strict không?
```

## Checklist tạm thành thạo

- [ ] Nhận diện đúng ít nhất 80% bài cơ bản.
- [ ] Tự nói được state và transition.
- [ ] Viết template từ trang trắng.
- [ ] Làm đúng 3 bài cơ bản liên tiếp.
- [ ] Làm được ít nhất 2 bài biến thể.
- [ ] Sau 3 ngày vẫn tự viết lại được.
- [ ] Giải thích được vì sao thuật toán không bỏ sót đáp án.

## Gate máy

```bash
node --test tests/notebook_ch09.test.js
npm run check:notebook-framework
```
