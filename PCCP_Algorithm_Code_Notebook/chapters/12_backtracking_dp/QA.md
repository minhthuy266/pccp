# QA — Chapter 12

Coverage: `BTD-01`, `BTD-02`, `BTD-03`, `BTD-04`, `BTD-05`, `BTD-06`, `BTD-07`, `BTD-08`.

[Canonical](01_Backtracking_DP_Canonical.md) · [Practice](02_Practice_Ladder.md) · [Solutions](../../solutions/12_Backtracking_DP_Basic_Solutions.md) · [Module](../../../solutions/notebook/ch12_backtracking_dp.js)

Official anchors: OF020–OF022, OF024, OF026, OF031–OF036. Pattern families: PF07, PF08, PF11, PF12; `BTD-08` contrast thêm PF09.

Behavioral gates:

- Combination clone output, `k=0` và không sinh order trùng.
- Permutation duplicate chỉ skip cùng tầng.
- Pruning từ chối precondition sai khi có số âm.
- Bitmask sinh đúng `2^n` subsets.
- Memo phân biệt impossible với answer 0 và cache đúng full state.
- 0/1 DP không tái sử dụng item; unbounded variant được phép tái sử dụng.
- Grid DP xử lý source/destination blocked và one-cell grid.
- Engine contrast có scalar-state counterexample trong canonical/solution.

Chạy `node --test tests/notebook_ch12.test.js`, `npm run check:notebook-framework` và `npm run check:notebook-integration`. Chỉ công nhận hoàn thành khi 8/8 ID hiện `FRAMEWORK-FULL` và toàn bộ behavioral gates pass.
