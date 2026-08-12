# PF19 — Binary search on answer

Nguồn: [OF043](../official-lessons/OF043.md), [OF044](../official-lessons/OF044.md).

## 1. Tín hiệu nhận dạng

Đề hỏi giá trị integer nhỏ/lớn nhất thỏa điều kiện; miền đáp án lớn nhưng có thể viết predicate `feasible(x)` đơn điệu. Không binary search input item—binary search **giá trị đáp án**.

Hai form phải tách rõ: first feasible (`false...false,true...`) và last feasible (`true...true,false...`).

## 2. Không dùng khi

- Predicate không monotone; feasible có thể true rồi false rồi true.
- Miền nhỏ đủ enumerate trực tiếp.
- Cần chính cấu hình tối ưu nhưng predicate không reconstruct được và đề đòi output cấu hình.
- Giá trị real cần precision/iteration policy chưa được định nghĩa.
- Bound high không chắc chứa đáp án.

## 3. Decision tree

```text
Tìm minimum x đạt capacity?       → first feasible
Tìm maximum x vẫn giữ constraint? → last feasible
Predicate đếm/greedy O(n)?        → tổng O(n log range)
Miền số vượt safe integer JS?      → BigInt end-to-end
Predicate không monotone?          → không binary-search
```

## 4. Knobs tạo biến thể

- First/last true.
- Inclusive `[low,high]` hay half-open `[low,high)`.
- Lower/upper bound chắc chắn.
- Predicate dùng count có thể early stop.
- Integer Number/BigInt.
- Greedy predicate direction: số removed `<=m`, capacity `>=target`.
- Answer exact hay tolerance real.

## 5. Invariant và proof

First feasible inclusive invariant: đáp án luôn nằm trong `[low,high]`; `high` phải feasible. Với `mid`, nếu feasible thì đáp án `<=mid`, gán `high=mid`; nếu false thì đáp án `>mid`, gán `low=mid+1`. Kết thúc `low===high` là first true.

Last feasible dùng upper-mid để tránh kẹt:

```text
mid = floor((low + high + 1) / 2)
true  → low = mid
false → high = mid - 1
```

Proof toàn bài gồm hai phần độc lập: predicate đúng với một candidate và predicate monotone theo candidate.

## 6. Code core đáng thuộc

```js
function firstFeasible(low, high, feasible) {
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (feasible(middle)) high = middle;
    else low = middle + 1;
  }
  return low;
}
```

```js
function lastFeasible(low, high, feasible) {
  while (low < high) {
    const middle = low + Math.floor((high - low + 1) / 2);
    if (feasible(middle)) low = middle;
    else high = middle - 1;
  }
  return low;
}
```

Với BigInt, mọi literal/arithmetic trong search và predicate phải cùng BigInt (`1n`, `2n`).

## 7. Counterexamples bóc lỗi

- Last feasible dùng lower-mid và `low=mid` có thể loop vô hạn khi `high=low+1`.
- OF043 high quá nhỏ không feasible làm invariant giả từ đầu.
- OF044 quên đoạn từ rock cuối tới destination khiến predicate nhận gap sai.
- Predicate remove stone khi `gap <= candidate` thay vì `< candidate` làm sai equality.
- Trộn Number với BigInt ném TypeError; chuyển Number lớn sang BigInt sau khi đã mất precision cũng không cứu được.
- Return `low` mà không kiểm existence khi miền có thể không có candidate feasible.

## 8. Drills biến thể

### Drill A — minimum capacity ship

Predicate scan weights theo order và đếm days cần khi capacity `x`; capacity tăng thì days không tăng. Low là max weight, high là tổng weight.

### Drill B — maximum minimum distance

Sort positions; greedy đặt item sớm nhất cách item trước ít nhất `d`; `canPlace(d)` từ true chuyển false khi d tăng. Dùng last feasible.

### Drill C — real-valued answer

Loop số iteration cố định hoặc tới `high-low<epsilon`; output/rounding theo contract. Không dùng `while(low<high)` với float.

### Drill D — reconstruct

Sau tìm optimal scalar, chạy predicate lần nữa và ghi decisions greedy. Search tìm value; reconstruction là phase riêng.

## 9. Câu hỏi mở tư duy

- Candidate answer là đại lượng gì?
- Viết chuỗi truth theo x tăng: F→T hay T→F?
- Low/high có chứng minh bao đáp án không?
- Predicate equality chính xác ra sao?
- Number có vượt `Number.MAX_SAFE_INTEGER` không?

## 10. Checklist 15 giây

Viết trước: **answer domain, monotone truth sequence, first/last template, safe bounds, predicate proof/complexity, equality và numeric type**.
