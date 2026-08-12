# 05 — Sorting: tạo trật tự để lộ cấu trúc

> Trạng thái: **5/5 FRAMEWORK-FULL** — `SORT-01..05` đã qua [QA](chapters/05_sorting/QA.md).

## Điều hướng

1. [Comparator, decoration và mutation](chapters/05_sorting/01_Comparators.md): `SORT-01..03`.
2. [Sort-then-scan và compression](chapters/05_sorting/02_Scan_Compression.md): `SORT-04..05`.
3. [Practice Ladder](chapters/05_sorting/03_Practice_Ladder.md).
4. [Lời giải](solutions/05_Sorting_Solutions.md).
5. [QA](chapters/05_sorting/QA.md).

## Quy tắc JavaScript

```js
const ascending = [...values].sort((first, second) => first - second);
const descending = [...values].sort((first, second) => second - first);
```

`sort()` mặc định so chuỗi và mutate array. Comparator trả số âm nếu phần tử thứ nhất phải đứng trước, số dương nếu đứng sau, 0 nếu đồng hạng theo comparator. Clone khi contract không cho mutate.

## Bản đồ chọn dạng

| Contract | ID | Skeleton |
| --- | --- | --- |
| Sắp số tăng/giảm | `SORT-01` | clone → numeric comparator |
| Object/tuple nhiều tiêu chí | `SORT-02` | first differing criterion |
| Cần index/source metadata sau sort | `SORT-03` | decorate → sort → use metadata |
| Sort để hàng xóm/interval trở nên dễ quét | `SORT-04` | sort → one-pass invariant |
| Giá trị thưa cần rank | `SORT-05` | sorted unique → rank Map → transform |

## Mastery Gate

Qua khi 4/5 ID đạt mức 3, 3/5 đạt mức 4, hai Transfer/Mixed Test liên tiếp đạt rubric; tự tạo test `[2,10]`, duplicate/tie, empty, negative, input mutation và preserved index. Sai comparator quay lại đọc “a đứng trước b”; sai tie viết tiêu chí bằng lời; mất index quay lại decoration.
