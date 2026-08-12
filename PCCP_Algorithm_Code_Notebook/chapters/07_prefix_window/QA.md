# QA — Chapter 07 Prefix Sum và Sliding Window

## Coverage IDs

`PRE-01`, `PRE-02`, `PRE-03`, `PRE-04`, `PRE-05`, `SW-01`, `SW-02`, `SW-03`, `SW-04`, `SW-05`, `SW-06`.

## Evidence

- Canonical prefix: [02_Prefix_Canonical.md](02_Prefix_Canonical.md).
- Canonical window: [03_Sliding_Window_Canonical.md](03_Sliding_Window_Canonical.md).
- Practice: [04_Practice_Ladder.md](04_Practice_Ladder.md).
- Solutions: [Chapter 07 solutions](../../solutions/07_Sliding_Window_Prefix_Sum_Solutions.md).
- Executable module: [ch07_prefix_window.js](../../../solutions/notebook/ch07_prefix_window.js).
- Official anchors: OF052, OF053, OF058, OF060 qua [crosswalk](../../NOTEBOOK_PATTERN_OFFICIAL_CROSSWALK.csv).

## Behavioral tests bắt buộc

- Prefix padded và range bắt đầu tại index 0.
- Prefix predicate và rectangle inclusion–exclusion.
- Difference update chạm biên phải.
- Prefix Map giữ duplicate prefix và `target=0`.
- Fixed window outgoing index.
- Variable window xóa zero-count key.
- Shortest window update trước shrink.
- Exactly K bằng hiệu hai at-most.
- Decision contrast bắt exact sum có số âm về Prefix+Map.

Chạy `node --test tests/notebook_ch07.test.js`, sau đó `npm run check:notebook-framework`. Không đánh dấu FULL nếu một code fence, link nội bộ, Practice ID hoặc behavioral test lỗi.
