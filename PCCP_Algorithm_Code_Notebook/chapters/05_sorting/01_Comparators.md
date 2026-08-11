# Comparator và decoration — `SORT-01..03`

[← Index](../../05_Sorting.md) · [Tiếp →](02_Scan_Compression.md)

## Dạng 1 `[SORT-01]` — Numeric sort tăng/giảm và mutation

### A. Bản chất

Sort thay thứ tự để các value có quan hệ toàn cục. JavaScript mặc định chuyển value thành string, nên `[2,10]` thành `[10,2]`. Clone nếu input order còn cần hoặc đề không cho mutate. Không sort nếu chỉ cần min/max một phần tử: scan O(n) tốt hơn O(n log n).

### B. Mental model

Comparator là người xếp hàng chỉ trả lời “a đứng trước hay sau b”; numeric order không tự xuất hiện nếu không nói luật.

### C. Template tư duy

```text
Có được mutate input không?
Ascending: a-b. Descending: b-a.
Sau sort cần value, index hay scan gì?
Complexity O(n log n) có phù hợp bounds?
Invariant sau sort: array theo order comparator.
```

### D. Template code

```js
const sorted = [...values];
sorted.sort((firstValue, secondValue) => firstValue - secondValue);
```

### E. Bài mẫu — Khoảng cách nhỏ nhất giữa hai số

1. **Đề:** ít nhất hai số; trả min absolute difference. 2. `[8,1,5,3]→2`. 3. Sau sort `[1,3,5,8]`, cặp gần nhất phải kề. 4. Mọi cặp O(n²). 5. So cặp lặp. 6. Sort tạo order; nếu có số giữa a,b thì một gap con không lớn hơn b-a. 7. State sorted + bestGap. 8. scan adjacent, minimize. 9. best là min adjacent prefix; mọi nonadjacent không tốt hơn một adjacent bên trong. 10. clone/sort/scan from1. 11. **Code:**

```js
function minimumDifference(values) {
  const sorted = [...values].sort((a, b) => a - b);
  let bestDifference = Infinity;
  for (let index = 1; index < sorted.length; index += 1) {
    const difference = sorted[index] - sorted[index - 1];
    bestDifference = Math.min(bestDifference, difference);
  }
  return bestDifference;
}
```

12. Clone bảo vệ input; loop từ1 để có previous; subtraction không cần abs sau ascending. Bỏ comparator sai `[2,10]`.  
13. **Dry run:**

| Bước | Pair/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| sort | — | `[8,1,5,3]` | numeric asc | sort | `[1,3,5,8]` |
| 1 | 1,3 | ∞ | gap2 | min | 2 |
| 2 | 3,5 | 2 | gap2 | keep | 2 |
| 3 | 5,8 | 2 | gap3 | keep | 2 |

14. `O(n log n)` time, `O(n)` clone. 15. default sort; mutate input; input<2 unspecified; use abs hides wrong sort. 16. Biến thể max adjacent gap: same scan, `Math.max`, but not max difference of any pair (that is max-min).

**Recall Card `[SORT-01]`:** clone? comparator? post-sort invariant? **Blank Page:** `[2,10,-1]`. **Mutation:** descending; BigInt comparator cannot subtract to Number; kth. **Explain Back:** why adjacent enough? When scan beats sort? Why default wrong?

## Dạng 2 `[SORT-02]` — Comparator nhiều tiêu chí và tie

### A. Bản chất

So tiêu chí theo thứ tự ưu tiên; chỉ khi tiêu chí trước hòa mới xét tiêu chí sau. Comparator cần nhất quán: cùng cặp không được lúc trước/lúc sau tùy trạng thái ngoài.

### B. Mental model

Xếp hồ sơ: ưu tiên điểm, rồi penalty, rồi id; tiêu chí sau không được lấn tiêu chí trước.

### C. Template tư duy

```text
Viết order bằng lời: key1 asc/desc, key2..., final tie.
Comparator: nếu key1 khác return; ...; cuối return 0 hoặc final criterion.
Không dùng boolean comparator.
Invariant: sorted lexicographically theo tuple tiêu chí đã chuẩn hóa.
```

### D. Template code

```js
records.sort((a, b) => {
  if (a.score !== b.score) return b.score - a.score;
  if (a.penalty !== b.penalty) return a.penalty - b.penalty;
  return a.id.localeCompare(b.id);
});
```

### E. Bài mẫu — Bảng xếp hạng

1. **Đề:** score giảm, penalty tăng, name từ điển tăng; không mutate input; trả names. 2. A(90,5),B(90,3),C(80,1)→B,A,C. 3. comparator ba cấp. 4. Tự chèn mỗi record O(n²). 5. insertion scan. 6. built-in sort + comparator. 7. cloned records. 8. first nonzero criterion. 9. array đúng tuple `(-score,penalty,name)`. 10. clone/sort/map names. 11. **Code:**

```js
function rankNames(records) {
  const sorted = [...records].sort((first, second) => {
    if (first.score !== second.score) return second.score - first.score;
    if (first.penalty !== second.penalty) return first.penalty - second.penalty;
    return first.name.localeCompare(second.name);
  });
  return sorted.map((record) => record.name);
}
```

12. Return ngay tiêu chí khác đầu tiên; không cộng các comparator vì tiêu chí sau có thể đảo priority. localeCompare phù hợp string order contract.  
13. **Dry run:**

| Bước | So cặp | State trước | Condition | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| B vs A | score tie | — | penalty3<5 | B trước A | B,A |
| C vs A | score80<90 | — | score criterion | A trước C | B,A,C |

14. `O(n log n)` time, O(n) clone/output. 15. boolean comparator; wrong asc/desc sign; tiêu chí name chạy trước score; mutate records order. 16. Biến thể final tie input order: decorate index hoặc rely on stable sort only if environment guarantee; explicit index clearer.

**Recall Card `[SORT-02]`:** criteria order → first difference → sign. **Blank Page:** three-key tuple. **Mutation:** null last; case-insensitive; custom category rank. **Explain Back:** why no boolean? Why not add differences? When return0 safe?

## Dạng 3 `[SORT-03]` — Giữ index gốc bằng decoration

### A. Bản chất

Sort value làm vị trí thay đổi. Nếu output cần index/tie input order, gắn metadata trước sort. Đây là decorate→sort→undecorate; không dùng `indexOf` sau sort vì duplicate đều trả index đầu.

### B. Mental model

Mỗi món đồ đeo thẻ số ghế trước khi đổi hàng; sau xếp vẫn truy về chỗ cũ.

### C. Template tư duy

```text
Decorated item chứa value + originalIndex + metadata cần.
Comparator dùng value và tie explicit index.
Sau sort, output lấy metadata, không tìm lại bằng value.
Invariant: mỗi decorated item đại diện đúng một input occurrence.
```

### D. Template code

```js
const decorated = values.map((value, originalIndex) => ({ value, originalIndex }));
decorated.sort((a, b) => a.value - b.value || a.originalIndex - b.originalIndex);
```

### E. Bài mẫu — Index theo thứ tự value tăng, hòa index giảm

1. **Đề:** trả original indices sorted by value asc; equal value later index first. 2. `[5,2,5,2]→[3,1,2,0]`. 3. mỗi occurrence giữ thẻ index. 4. sort values rồi indexOf sai duplicate. 5. reverse lookup ambiguous. 6. decoration. 7. array `{value,index}`. 8. comparator value asc, index desc. 9. sorted decorated đúng tuple `(value,-index)`. 10. decorate/sort/map index. 11. **Code:**

```js
function sortedOriginalIndices(values) {
  return values
    .map((value, originalIndex) => ({ value, originalIndex }))
    .sort((a, b) => {
      if (a.value !== b.value) return a.value - b.value;
      return b.originalIndex - a.originalIndex;
    })
    .map((item) => item.originalIndex);
}
```

12. Duplicate occurrences remain distinct objects. Index comparator descending implements later first. Chaining operates on new array from map, so input not mutate.  
13. **Dry run:** decorated `(5,0),(2,1),(5,2),(2,3)`→2-group index3,1;5-group2,0→`[3,1,2,0]`.  
14. `O(n log n)`/`O(n)`. 15. indexOf duplicates; sort input before decorate; tie sign; lose metadata in intermediate map. 16. Biến thể return ranks per original index: after sort, write rank into output[item.originalIndex].

**Recall Card `[SORT-03]`:** decorate before reorder; occurrence identity ≠ value. **Blank Page:** duplicate index test. **Mutation:** preserve two metadata fields; restore original order; rank. **Explain Back:** why indexOf fails? Why map before sort protects input? When stable sort enough but explicit index preferable?

## Transfer Test A

Làm [S05-T01](03_Practice_Ladder.md#s05-t01--hồ-sơ-giao-hàng-sort-02sort-03).
