# QA — Mixed Pattern Tests

[Đề](../../90_Mixed_Pattern_Tests.md) · [Solutions](../../solutions/90_Mixed_Pattern_Tests_Solutions.md) · [Module](../../../solutions/notebook/ch90_mixed.js) · [Tracker](../../MIXED_TEST_TRACKER.csv)

## Coverage

- Tám đề synthetic không lộ pattern trong title/body trước phần solution.
- Mỗi đề có contract, sample, constraints hoặc edge-condition và rubric chung sáu trục.
- Solutions tách riêng, map về canonical IDs và giải thích signal/state/transition/invariant/complexity.
- Bốn gate dùng 16 bài official public trong `OF001..OF061`; không dùng hoặc mở nội dung `OF062..OF069` đang khóa.
- Các contrast bắt buộc xuất hiện: window/prefix Map, BFS/Dijkstra, shortest/MST, greedy/DP và traversal/Euler.

## Behavioral gates

- MX01 tie/mutation.
- MX02 negative values và zero target.
- MX03 BigInt/first feasible.
- MX04 stale/negative weight.
- MX05 disconnected MST.
- MX06 closed endpoint/input mutation.
- MX07 greedy counterexample/empty.
- MX08 parallel edge/impossible trail.

Chạy `node --test tests/notebook_ch90.test.js`. Full gate chạy `npm test`, framework audit và link/syntax audit.
