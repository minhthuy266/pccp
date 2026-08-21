# Batch 1 supplement — dựng lại sáu bài public từ state

[← Bộ bài canonical](04_Programmers_PCCP_Set.md) · [Full official lessons](../../../docs/pccp-700-roadmap/official-lessons/) · [Chuẩn](../../00_PROBLEM_TO_CODE_STANDARD.md)

Supplement này điền các cầu nối còn thiếu trong official lesson; contract, bound, brute-force
code, optimized code, invariant, complexity và source vẫn canonical tại link từng bài. Đọc
official lesson trước, rồi đóng code và dùng phần này để recall.

## OF008 — Dấu ngoặc đúng

[Phân tích và code canonical](../../../docs/pccp-700-roadmap/official-lessons/OF008.md).
Làm tay `(()())`: ghi số dấu mở đang chờ `1,2,1,2,1,0`; gặp `)` khi số đang 0 thì sai ngay.
Brute replace `()` tạo lại chuỗi nhiều vòng; counter giữ đúng thông tin cần qua lượt sau.

| State | Kiểu | Lưu gì | Init/lý do | Scope |
| --- | --- | --- | --- | --- |
| `balance` | number | opening chưa ghép | `0`, prefix rỗng | xuyên loop |
| `character` | string | ký tự hiện tại | lấy từ `for...of` | iteration |

```text
OUTPUT boolean; PREPARE không; STATE balance; INIT 0; LOOP for từng character
CURRENT character; CHECK open hay close, rồi balance<0; BRANCH fail fast
UPDATE +1/-1; POINTER for; STOP false khi âm; CLEANUP check opening dư; RETURN balance===0
```

Dry run `)(` dừng ngay ở -1; `(()` kết thúc 1 nên false; `()` kết thúc 0. Sai chỉ so tổng lộ
`)(`; pop stack rỗng lộ `)`; return true ngay sau loop không check dư lộ `(`; replace loop là
lỗi performance. Stack thật dễ mở rộng nhiều loại nhưng dùng `O(n)` space; counter chỉ đúng
khi có một loại.

```text
Recall 1: prefix không âm, cuối bằng 0.
Recall 2: STATE balance; LOOP chars; CHECK âm; UPDATE ±1; RETURN zero.
Recall 3: balance += character === "(" ? ____ : ____; if (____) return false.
```

## OF007 — Phát triển tính năng

[Phân tích và code canonical](../../../docs/pccp-700-roadmap/official-lessons/OF007.md).
Làm tay: đổi mỗi feature thành ngày xong; feature đầu mở mốc release, gom liên tiếp feature
sau có ngày `<=` mốc. Brute simulation tăng mọi progress mỗi ngày; phép chia trần bỏ update lặp.

| State | Kiểu | Lưu gì | Init/lý do | Scope |
| --- | --- | --- | --- | --- |
| `finishDays` | array | ngày xong từng feature | tính một lần | toàn hàm |
| `head` | number | feature chưa release đầu tiên | 0 | xuyên while |
| `releaseDay`,`batchSize` | number | mốc/kích thước batch hiện tại | day tại head/0 | mỗi outer loop |
| `answer` | array | size từng batch | `[]` | output |

```text
OUTPUT batch sizes; PREPARE finishDays; STATE answer,head; INIT [],0
MAIN LOOP while head<n; CURRENT releaseDay=finishDays[head]; PER-ITERATION batchSize=0
CHECK finishDays[head]<=releaseDay; BRANCH nested while; UPDATE head++,batchSize++
POINTER head; STOP inner khi muộn hơn, outer khi hết; CLEANUP push batch; RETURN answer
```

`[7,3,9]`: mốc 7 làm inner while hai lần, push 2; mốc 9 push 1. `<` thay `<=` lộ `[3,3]`;
`floor` lộ progress 99 speed 2; khai báo size ngoài loop lộ nhiều batch; sort phá queue order.
`shift()` dễ đọc nhưng dịch mảng `O(n)`; head pointer giữ `O(n)` tổng.

```text
Recall: finish day → head mở mốc → consume prefix <= mốc → push size.
Blank: while (head < days.length && days[head] ____ releaseDay) { ____; ____; }
```

## OF009 — Process

[Phân tích và code canonical](../../../docs/pccp-700-roadmap/official-lessons/OF009.md).
Làm tay viết thẻ `(priority,originalIndex)`: lấy đầu; nếu nhỏ hơn priority cao nhất đang còn
thì đặt cuối, ngược lại loại và tăng thứ tự. Brute `.some()` quét queue sau mỗi dequeue và
`shift()`; frequency giữ câu trả lời “còn priority cao hơn không?” mà không quét lại.

| State | Kiểu | Lưu gì | Init/lý do | Scope |
| --- | --- | --- | --- | --- |
| `queue`,`head` | object[]/number | FIFO hiện tại/đầu logic | mapped items/0 | xuyên loop |
| `counts`,`highest` | array/number | frequency và max còn sống | đếm input | xuyên loop |
| `executed` | number | số process đã chạy | 0 | output progress |
| `currentProcess` | object | process vừa dequeue | `queue[head]`, rồi `head++` | iteration |

```text
OUTPUT execution order; PREPARE queue+counts; STATE head,highest,executed; INIT 0,max,0
LOOP while head<queue.length; CURRENT read then head++; CHECK priority<highest
BRANCH re-enqueue/execute; UPDATE push hoặc count--,executed++,lower max
POINTER head; STOP return khi executed target; CLEANUP none; fallback -1
```

`[2,1,3,2]`, target 2: hai item đầu re-enqueue; `(3,2)` execute và return 1. Kiểm target
trước branch lộ case này; giảm count khi re-enqueue làm max sai; bỏ original index lộ duplicate;
`head++` gộp trong biểu thức che transition. `shift()` gần đề hơn nhưng tốn dịch; head cần nhớ
đoạn `[0,head)` đã xử lý.

```text
Recall: dequeue → compare max → requeue OR execute → update max → target?
Blank: const current = queue[____]; ____++; if (current.priority < ____) queue.push(____).
```

## OF011 — Giá cổ phiếu

[Phân tích và code canonical](../../../docs/pccp-700-roadmap/official-lessons/OF011.md).
Làm tay với `[5,4,3]`: giá 4 giải quyết index 0; giá 3 giải quyết index 1. Một current có thể
giải quyết nhiều index chờ nên dùng `while` trong `for`. Brute quét suffix cho từng index
`O(n²)`; bottleneck là cùng suffix bị đọc lại.

| State | Kiểu | Lưu gì | Init/lý do | Scope |
| --- | --- | --- | --- | --- |
| `answer` | number[] | duration, mặc định tới cuối | `n-1-i` | output |
| `unresolved` | index[] | index chưa gặp strict drop | `[]` | xuyên loop |
| `currentIndex` | number | thời điểm hiện tại | for 0 | loop |

```text
OUTPUT duration array; PREPARE defaults; STATE unresolved; INIT []
LOOP for currentIndex; CURRENT currentPrice; CHECK top price > currentPrice
BRANCH while; UPDATE pop previous, answer[previous]=current-previous, rồi push current
POINTER for; STOP while khi stack rỗng/top<=current; CLEANUP defaults đã đúng; RETURN answer
```

`[5,5,4]`: tại 4, while pop hai lần; dấu `>=` sai vì giá bằng chưa giảm. Stack rỗng ở index 0;
phần tử cuối default 0. Dùng value thay index không tính duration; chỉ `if` lộ `[5,4,3]`;
quên cleanup/default lộ dãy tăng. Mỗi index push một, pop tối đa một nên nested loop vẫn `O(n)`.

```text
Recall: unresolved indices; strict lower resolves; defaults cover survivors.
Blank: while (stack.length > 0 && prices[stack.at(-1)] ____ prices[current]) { ... }
```

## OF028 — Xuồng cứu sinh

[Phân tích và code canonical](../../../docs/pccp-700-roadmap/official-lessons/OF028.md).
Làm tay sort `[40,50,60,90]`, limit 100: người 90 chắc chắn đi; không ghép 40. Người 60 ghép
40; người 50 đi. Brute backtrack mọi matching; bottleneck là thử nhiều partner tương đương.
Greedy đúng vì người nặng nhất phải lên xuồng; nếu người nhẹ nhất không ghép được thì không ai
ghép được, nếu ghép được thì dùng người nhẹ nhất giữ người nặng hơn cho tương lai.

| State | Kiểu | Lưu gì | Init/lý do | Scope |
| --- | --- | --- | --- | --- |
| `sortedPeople` | number[] | cân nặng tăng | clone+sort numeric | toàn hàm |
| `left`,`right` | number | người nhẹ/nặng chưa xếp | `0,n-1` | xuyên while |
| `boats` | number | xuồng đã chốt | 0 | output |

```text
OUTPUT boats; PREPARE clone numeric sort; STATE left,right,boats; INIT 0,n-1,0
LOOP while left<=right; CURRENT heaviest; CHECK left===right, rồi light+heavy<=limit
BRANCH pair thì left++; UPDATE boats++; POINTER luôn right--; STOP hết interval
CLEANUP none; RETURN boats
```

Dry run trên có decisions solo/pair/solo; `[50,50]`, limit100 phân biệt `<=` với `<`; một người
phân biệt `left<=right`. Sai default lexicographic sort lộ `[100,20,3]`; mutate input nếu sort
trực tiếp; tăng cả hai pointer khi không pair bỏ người; đếm pair thay vì boat sai singleton.
Sort `O(n log n)`, scan `O(n)`, pointers không lùi.

```text
Recall: sort → heaviest bắt buộc → ghép lightest nếu được → một boat.
Blank: if (sorted[left] + sorted[right] ____ limit) ____++; ____--; boats++.
```

## OF052 — Discount event 10 ngày

[Phân tích và code canonical](../../../docs/pccp-700-roadmap/official-lessons/OF052.md).
Làm tay đếm 10 ngày đầu; dịch một ngày thì gạch sản phẩm rời và thêm sản phẩm vào. Brute dựng
Map mới cho mỗi start là `O(10n)` (đủ nhanh vì 10 cố định), nhưng window làm rõ lifecycle và
tổng quát hóa. State/init chi tiết đã ở official lesson; `change` phải bỏ matched cũ → mutate
count → cộng matched mới.

```text
OUTPUT valid starts; PREPARE need Map; STATE windowCount,matched,answer; INIT empty,0,0
LOOP for right; CURRENT entering; CHECK needed key; BRANCH change helper
UPDATE add entering, remove discount[right-10], rồi check full+matched
POINTER for right; STOP hết discount; CLEANUP none; RETURN answer
```

Tại `right=9` cửa sổ đầu đủ; `right=10` phải remove index 0, không phải 1. Một count đi
`1→2 target→3→2` làm matched `0→1→0→1`; item vào và ra giống nhau triệt tiêu đúng. Check trước
remove lộ cửa sổ 11 item; dùng `>= target` lộ required kind thừa; quên delete không ảnh hưởng
official helper vì chỉ lưu need nhưng sẽ làm sai nếu check `Map.size`; dựng Map bằng object
equality sai. Mỗi discount add một, remove tối đa một: `O(n)` expected, Map `O(k)`.

```text
Recall: add → nếu quá 10 remove → nếu đủ 10 check exact kinds.
Blank: if (before === target) matched____; count=before+delta; if (count===target) matched____.
```

## Template phòng thi 30 phút

```text
OUT: boolean / batches / order / durations / boats / valid starts
LIMIT: chọn O(n), O(n log n) khi cần sort
HAND: viết state thay đổi trên một ví dụ 3–5 phần tử
BRUTE: mô phỏng đúng đề trước
SLOW: replace/scan suffix/scan queue/backtrack/recount overlap
PATTERN: counter / batch queue / queue metadata / monotonic stack / greedy / fixed window
STATE + INIT: theo bảng từng bài
LOOP + INVARIANT: chọn for theo index, while theo pending condition
UPDATE + STOP: tách read, check, update, pointer, return

PREPARE → STATE → LOOP → CURRENT → CHECK → UPDATE → CLEANUP → RETURN
```

