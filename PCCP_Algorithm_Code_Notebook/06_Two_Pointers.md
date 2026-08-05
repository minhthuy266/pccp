# 06 — Two Pointers

> Trạng thái: **Hoàn thiện v1**; bằng chứng kiểm tra tại [QA.md](chapters/06_two_pointers/QA.md).

## Mục tiêu

Two Pointers giảm số cặp phải xét bằng một quy tắc loại trừ có chứng minh. Sau chương này, bạn phải nói được **vì sao pointer vừa dịch không thể thuộc một đáp án tốt hơn**, không chỉ nhớ `left++` hay `right--`.

## Bản đồ chọn dạng

| Tín hiệu | State tối thiểu | Dạng |
| --- | --- | --- |
| Hai biên của dữ liệu có order; mỗi so sánh loại được một phía | `left,right` | [TP-01](chapters/06_two_pointers/01_Inward_Compact.md#dạng-1-tp-01--hai-đầu-đi-vào) |
| Đọc mỗi phần tử, ghi kết quả hợp lệ ngay trên input | `read,write` | [TP-02](chapters/06_two_pointers/01_Inward_Compact.md#dạng-2-tp-02--fastslow-compact-in-place) |
| Sorted array; mỗi value chỉ giữ một lần | `read,write,last` | [TP-03](chapters/06_two_pointers/01_Inward_Compact.md#dạng-3-tp-03--loại-duplicate-trên-sorted-array) |
| Hai dãy đã sort; cần merge/giao | `i,j,output` | [TP-04](chapters/06_two_pointers/02_Merge_Pair_Partition.md#dạng-4-tp-04--merge-hoặc-giao-hai-dãy-sort) |
| Pair/three sum trên sorted array | `fixed,left,right,sum` | [TP-05](chapters/06_two_pointers/02_Merge_Pair_Partition.md#dạng-5-tp-05--pair-sum-và-three-sum) |
| Chia array theo predicate/pivot, order nội bộ không bắt buộc | `left,right` | [TP-06](chapters/06_two_pointers/02_Merge_Pair_Partition.md#dạng-6-tp-06--partition-cơ-bản) |

## JavaScript notes

- `sort((a,b)=>a-b)` mutate input; clone trước nếu contract cấm mutation.
- Compact/partition **cố ý mutate**; return length/boundary phải được ghi rõ.
- Dùng `while (left < right)` cho cặp hai vị trí khác nhau; palindrome thường dùng `left < right`; merge dùng `i < a.length && j < b.length` rồi xử lý tail.
- Duplicate skip chỉ hợp lệ khi dữ liệu đã sort hoặc nhóm tương đương đã kề nhau.

## Lộ trình

1. [Hai đầu, compact, duplicate](chapters/06_two_pointers/01_Inward_Compact.md)
2. [Merge, pair/three sum, partition](chapters/06_two_pointers/02_Merge_Pair_Partition.md)
3. [Practice Ladder](chapters/06_two_pointers/03_Practice_Ladder.md)
4. [Lời giải](solutions/06_Two_Pointers_Solutions.md) — chỉ mở sau khi đã ghi nỗ lực.
5. [QA và coverage lock](chapters/06_two_pointers/QA.md)

## Mastery Gate

- [ ] Nhận diện đúng ít nhất 10/12 bài Tầng 1 mà không nhìn tên ID.
- [ ] Viết từ trắng `pairSum`, `compact`, `uniqueSorted`, `intersection`, `threeSum`, `partition`.
- [ ] Với mỗi pointer move, nói được tập ứng viên nào vừa bị loại và vì sao an toàn.
- [ ] Phân biệt mutation contract của compact/partition với clone-and-sort.
- [ ] Làm đúng ba bài code và hai Transfer Tests; syntax + behavioral tests đạt.
- [ ] Sau ba ngày tự dựng lại ít nhất bốn trong sáu template.
