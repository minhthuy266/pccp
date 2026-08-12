# QA — Chapter 09 Binary Search

## Coverage IDs

`BS-01`, `BS-02`, `BS-03`, `BS-04`, `BS-05`.

## Evidence

- Canonical: [01_Binary_Search_Canonical.md](01_Binary_Search_Canonical.md).
- Practice: [02_Practice_Ladder.md](02_Practice_Ladder.md).
- Solutions: [09_Binary_Search_Solutions.md](../../solutions/09_Binary_Search_Solutions.md).
- Module: [ch09_binary_search.js](../../../solutions/notebook/ch09_binary_search.js).
- Official anchors: OF043 và OF044 qua [crosswalk](../../NOTEBOOK_PATTERN_OFFICIAL_CROSSWALK.csv).

## Behavioral gates

- Exact not-found/empty.
- Lower/upper bound trên duplicate và insertion position n.
- Last true trên miền hai candidate.
- First feasible answer tại low/high.
- BigInt boundary vượt safe integer.
- Predicate OF043 early stop và OF044 kiểm destination/equality.

Chạy `node --test tests/notebook_ch09.test.js`, `npm run check:notebook-framework` và audit integration. Chỉ đánh dấu FULL khi cả năm ID đạt `FRAMEWORK-FULL`.
