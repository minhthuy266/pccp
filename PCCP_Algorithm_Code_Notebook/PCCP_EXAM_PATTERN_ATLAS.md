# Bản đồ pattern PCCP: đọc đề thật và biết bắt đầu từ đâu

[← README](README.md) · [Danh mục đề công khai](PCCP_PUBLIC_PROBLEM_CATALOG.md)

Đây là trang học để **chọn cách nghĩ**, không phải bảng thuật ngữ. Khi gặp đề mới, không hỏi “đây là bài Map hay BFS?”. Hỏi lần lượt:

```text
Đề bắt mình trả về gì?
Thông tin nào của quá khứ/tình trạng hiện tại còn cần ở bước sau?
Mình có được duyệt một lần, phải đổi hướng, hay phải thử nhiều khả năng?
Có quy luật đơn điệu để bỏ đi một nửa/cắt nhánh không?
Đề đang ghép một pattern điều khiển với một cấu trúc dữ liệu phụ không?
```

## 1. Cách đề PCCP thường đánh lừa người học

Đề kể bằng ngữ cảnh: máu, người chơi, xe, kho, lịch, mê cung. Nhưng code thường chỉ cần một trong các kiểu state dưới đây.

| Câu chuyện trong đề | Câu hỏi phải chuyển thành | Pattern thường là |
| --- | --- | --- |
| “Mỗi giây/lệnh xảy ra chuyện gì?” | Sau event này, hệ thống còn phải nhớ gì? | Simulation |
| “Đã từng có/chưa, bao nhiêu lần?” | Cần trả lời nhanh về phần đã đi qua? | Set/Map |
| “Lớn nhất/nhỏ nhất, hòa thì…” | Ai đang là ứng viên tốt nhất? | Scan/comparator |
| “Đoạn liên tiếp / đúng K ngày” | Biên trái-phải thay đổi thế nào? | Window/two pointers/prefix |
| “Kề nhau/đi tới đâu được?” | State nào là node, cạnh nào là move? | BFS/DFS |
| “Tối thiểu X sao cho làm được” | `có làm được(X)` có đúng kiểu false rồi true không? | Binary search đáp án |
| “Chọn nhiều nhất/tốn ít nhất” | Một lựa chọn cục bộ có thể chứng minh an toàn không? | Greedy/heap |
| “Thử mọi cách/chọn vài phần tử” | Mỗi bước có các nhánh lựa chọn nào? | Backtracking/DP |

Không có một câu thần chú để nhận diện 100%. Cách chắc nhất là mô tả bằng lời **một bước của thuật toán** trước khi code.

---

## 2. Simulation — biến câu chuyện thành luật chạy từng bước

### Khi nào chọn?

Đề cho trạng thái ban đầu và một chuỗi command, event hoặc thời điểm. Kết quả phụ thuộc vào **thứ tự** luật xảy ra. Dấu hiệu: hồi máu, phát video, robot, xe, collision, lịch làm việc, game.

### Câu hỏi gốc

> Sau khi xử lý xong một event/giây, có những thông tin nào bắt buộc phải giữ để xử lý event kế?

Ví dụ Băng bó (`P01`): chỉ cần máu hiện tại, số giây hồi liên tiếp, đòn đánh kế tiếp. Không cần lưu toàn bộ lịch sử máu.

### Bộ xương tư duy

```text
state = trạng thái hệ thống lúc đầu
for mỗi event theo đúng thứ tự:
    đọc state cũ
    kiểm tra rule nào được ưu tiên trước
    tạo/cập nhật state mới
    nếu vi phạm điều kiện dừng: return
return state cuối
```

### Bẫy đi thi

- Hồi trước hay bị đánh trước? Đọc đề và viết rule order bằng tiếng Việt.
- Có clamp max/min sau từng bước không, hay chỉ cuối cùng?
- Hai event cùng thời điểm nhìn snapshot cũ hay event trước được phép ảnh hưởng event sau?
- Có thể nhảy qua thời gian trống hay constraint buộc mô phỏng từng giây?

### Đề PCCP gắn với pattern

`P01` Băng bó, `P03` Đồng hồ analog, `P05` Trình phát video, `P07` Tìm nguy cơ va chạm, `P17` Hạn lưu trữ dữ liệu cá nhân, `P18` Dạo công viên.

Đọc sâu: [Simulation P01 — Băng bó](chapters/04_simulation/04_PCCP_Public_Problems.md#p01--băng-bó).

---

## 3. Scan, Map và Set — nhớ vừa đủ về phần đã đi qua

### 3.1 Quét một lượt: tổng, đếm, người thắng

Nếu mỗi phần tử tự đóng góp vào đáp án, đi một lượt là đủ.

| Đề hỏi | Biến cần giữ | Khi đọc `current` |
| --- | --- | --- |
| Tổng điểm/chi phí | `total` | cộng đóng góp của current |
| Có bao nhiêu item đúng? | `count` | điều kiện đúng thì tăng 1 |
| Item tốt nhất? | `best` | thay khi current tốt hơn theo cả luật hòa |
| Có tồn tại/tất cả? | thường không cần biến | gặp bằng chứng thì return sớm |

Với max/min, điều kiện hòa là một phần của đề. `>` giữ lần đầu, `>=` giữ lần cuối. Đây là kiểu lỗi hidden test rất thường gặp.

### 3.2 Set: chỉ cần biết “đã có chưa?”

> Ở bước tiếp theo, mình chỉ cần hỏi quá khứ một câu yes/no hay cần biết thêm số lần/vị trí?

Nếu chỉ cần yes/no, dùng `Set`.

```js
const seen = new Set();
for (const value of values) {
  if (seen.has(value)) return true;
  seen.add(value);
}
```

Check trước rồi add sau: nếu add trước, current sẽ “trùng” với chính nó.

### 3.3 Map: cần gắn thông tin với một key

| Câu hỏi về quá khứ | Map phải lưu |
| --- | --- |
| Giá trị này đã xuất hiện mấy lần? | `value → count` |
| Lần đầu nó ở đâu? | `value → firstIndex` |
| Lần gần nhất nó ở đâu? | `value → latestIndex` |
| Người chơi này đang đứng thứ mấy? | `name → index` |
| Thực thể này đang ở trạng thái nào? | `id → state` |

Trước khi viết `.set`, phải nói trọn một câu: “Map này lưu `key → ý nghĩa gì`.” Nếu không nói được câu đó, Map rất dễ bị update sai.

### Đề PCCP gắn với pattern

`P17` Hạn lưu trữ dữ liệu cá nhân, `P20` Cuộc đua chạy, `P21` Người chưa hoàn thành, `P22` Ponketmon, `P23` Danh bạ điện thoại, `P24` Trang phục.

Học nền trước: [Array/String/Loop](01_Array_String_Loop.md) và [Map/Set](03_Map_Set.md).

---

## 4. Sorting và Greedy — sắp để biến lựa chọn khó thành dễ nhìn

### Sorting không tự giải bài

Sort hữu ích khi sau khi sắp xếp, thứ cần so chỉ nằm ở hàng xóm hoặc có một thứ tự ưu tiên rõ ràng.

```js
const sorted = [...values].sort((a, b) => a - b);
```

Không dùng `sort()` không comparator cho số: JavaScript sẽ so chữ, làm `10` đứng trước `2`.

### Greedy cần một lý do an toàn

“Chọn phần tốt nhất hiện tại” chỉ đúng nếu chọn đó không làm mất đáp án tối ưu. Với interval, chọn interval kết thúc sớm nhất thường an toàn vì nó chừa nhiều chỗ nhất cho các interval sau.

Trước khi tin greedy, hãy thử phản ví dụ nhỏ:

```text
Nếu mình chọn item này trước, có thể chặn một lựa chọn tốt hơn về sau không?
```

Nếu không tự chứng minh/giải thích được, thử backtracking trên input nhỏ hoặc nghĩ đến DP.

### Heap khác greedy ở đâu?

- Greedy: quy tắc chọn đã cố định, thường sort một lần rồi scan.
- Heap: các ứng viên mới liên tục xuất hiện; luôn cần lấy min/max hiện tại nhanh.

### Đề PCCP gắn với pattern

`P25` Số thứ K, `P28` Cay hơn, `P29` Xuồng cứu sinh, `P34` Số lớn nhất, `P38` Hệ thống đánh chặn, `P45` Bộ điều khiển đĩa.

Học nền: [Sorting](05_Sorting.md) → Heap/Greedy (sẽ được mở rộng theo catalog).

---

## 5. Two pointers, Sliding Window và Prefix Sum — ba cách xử lý đoạn liên tiếp

Ba pattern này rất dễ bị học thuộc lẫn nhau. Chọn theo câu hỏi sau.

| Tình huống | Chọn | Lý do |
| --- | --- | --- |
| Hai đầu của mảng đã sort/palindrome | two pointers từ hai đầu | một quyết định loại chắc một phía |
| Một đoạn liên tiếp, thêm/bớt một đầu vẫn update được | sliding window | biên trái/phải chạy, state cập nhật rẻ |
| Rất nhiều query tổng đoạn hoặc cần hiệu hai prefix | prefix sum | tổng đoạn = hiệu hai tổng tích lũy |

### Sliding window: không phải mọi mảng con đều dùng được

Window biến đổi theo quy tắc:

```text
thêm right vào state
trong khi cửa sổ không hợp lệ: bỏ left khỏi state, left++
khi hợp lệ: ghi nhận đáp án
```

Muốn code đúng, phải nói rõ:

> State hiện tại mô tả đúng đoạn nào: `[left..right]` hay `[left..right)`?

Với `P32` Sự kiện giảm giá, window luôn dài đúng 10 ngày. Khi sang cửa sổ tiếp theo, một item rời đi và một item đi vào; frequency Map phải update cả hai. Map là state phụ, window mới là thứ điều khiển `left/right`.

### Prefix sum: chỉ là “lịch sử đã cộng”

`prefix[i]` nên được định nghĩa là tổng **i phần tử đầu**. Khi đó đoạn `[left..right]` là:

```js
prefix[right + 1] - prefix[left]
```

Định nghĩa này giúp đoạn bắt đầu ở index 0 tự nhiên, không cần if đặc biệt.

### Đề PCCP gắn với pattern

`P29` Xuồng cứu sinh, `P32` Sự kiện giảm giá, `P33` Tổng dãy con liên tiếp.

---

## 6. Stack và Queue — thứ tự lấy ra quan trọng hơn tên cấu trúc

### Stack: phần vào sau xử lý trước

Nếu current cần đối chiếu với item chưa xử lý gần nhất ở bên trái, hoặc cần “quay lại”, nghĩ Stack.

- Dấu ngoặc: mở ngoặc gần nhất phải đóng trước.
- Số lớn hơn phía sau: các index chưa tìm được đáp án nằm trên stack.
- Tạo số lớn: khi current lớn hơn, bỏ các chữ số nhỏ đứng gần nó nếu còn quyền xóa.

### Queue: phần vào trước xử lý trước

Nếu event/node đến trước phải được xử lý trước, dùng queue. Trong JavaScript, không gọi `shift()` liên tục với input lớn; dùng `head` index.

```js
const queue = [start];
let head = 0;
while (head < queue.length) {
  const current = queue[head++];
  // xử lý current
}
```

### Đề PCCP gắn với pattern

`P19` Game gắp thú bằng cần cẩu, `P26` Phát triển tính năng, `P27` Tiến trình, `P35` Xe tải qua cầu, `P36` Giá cổ phiếu, `P37` Tạo số lớn.

Học nền: [Stack/Queue](08_Stack_Queue.md).

---

## 7. Binary Search — tìm ranh giới, không chỉ tìm một số

### Dấu hiệu thật

Đề hỏi “giá trị nhỏ nhất/lớn nhất sao cho vẫn làm được”, và nếu làm được ở `x` thì thường mọi `x` lớn hơn (hoặc nhỏ hơn) cũng làm được.

Ví dụ kiểm tra nhập cảnh (`P47`): với thời gian `T`, ta có thể tính có bao nhiêu người xử lý được. `T` càng lớn, khả năng xử lý đủ `n` người không thể giảm. Đây là predicate đơn điệu.

### Câu hỏi phải trả lời trước code

```text
isPossible(x) nghĩa chính xác là gì?
Với x tăng lên, nó đổi từ false sang true hay true sang false?
Mình đang tìm first true hay last true?
```

Nếu không trả lời ba câu này, binary search rất dễ infinite loop hoặc lệch 1.

### Đề PCCP gắn với pattern

`P06` Thử thách game xếp hình, `P47` Kiểm tra nhập cảnh.

---

## 8. BFS/DFS — state là “vị trí có thể đứng”, không chỉ là ô grid

### BFS khi đề hỏi ít bước nhất trên cạnh cùng giá

BFS đi theo lớp: tất cả state cách start 1 bước được xử lý trước state cách 2 bước. Vì vậy lần đầu vào một node là đường ngắn nhất trong graph không trọng số.

```text
enqueue start, đánh visited ngay khi enqueue
lấy state đầu queue
với mỗi move hợp lệ chưa visited:
    đánh visited
    enqueue với distance + 1
```

Đánh visited lúc enqueue, không phải lúc dequeue, để một node không bị đưa vào queue nhiều lần.

### DFS khi cần đi hết một component hoặc thử nhánh sâu

DFS hợp để đếm vùng liên thông, enumerate, hoặc đi sâu trong một nhánh. Nó không tự đảm bảo đường ngắn nhất như BFS.

### State có thể lớn hơn tọa độ

Trong Thoát mê cung (`P41`), state cần vị trí **và** đã đi qua lever hay chưa. Cùng một ô nhưng hai trạng thái đó không giống nhau. Khi state có thêm tài nguyên/chìa khóa/lượt phá tường, `visited` cũng phải có thêm chiều đó.

### Đề PCCP gắn với pattern

`P02` Khai thác dầu, `P31` Đường ngắn nhất trên bản đồ game, `P40` Mạng lưới, `P41` Thoát mê cung, `P46` Chuyển đổi từ, `P48` Node xa nhất.

---

## 9. Backtracking và DP — khi một lựa chọn tạo nhiều tương lai

### Backtracking: thử, đi sâu, trả lại state

Chọn khi input đủ nhỏ để thử nhánh, hoặc đề yêu cầu tìm mọi cách/tối đa số lựa chọn thỏa luật.

```text
choose một lựa chọn hợp lệ
đánh dấu state
recurse sang lựa chọn tiếp
undo đúng thứ đã đánh dấu
```

`undo` không phải chi tiết phụ: quên nó khiến nhánh sau mang state của nhánh trước.

### DP: các nhánh khác nhau gặp lại cùng bài toán con

Nếu từ nhiều cách đi khác nhau đều hỏi lại “từ index i với trạng thái s thì tốt nhất là gì?”, hãy lưu đáp án của state đó. DP cần nói rõ bốn thứ bằng lời:

```text
dp[state] trả lời câu gì?
base case là gì?
dp[state] lấy từ state trước nào?
tính theo thứ tự nào để state trước đã có sẵn?
```

### Đề PCCP gắn với pattern

`P04` Di chuyển xe kéo, `P08` Khôi phục biểu thức, `P30` Số mục tiêu, `P39` Độ mệt mỏi, `P42` Biến đổi số, `P43` Tam giác số nguyên, `P44` Đường đến trường.

---

## 10. Đề thật thường là pattern kết hợp

Đừng hoảng khi code dùng hai cấu trúc. Hãy phân vai:

| Đề | Pattern điều khiển chính | State/phụ tá |
| --- | --- | --- |
| P02 Khai thác dầu | BFS duyệt một component | Set cột component đã chạm, tổng từng cột |
| P07 Tìm nguy cơ va chạm | simulation theo time | Map đếm số robot tại `time-position` |
| P20 Cuộc đua chạy | simulation theo từng calling | array thứ tự + Map tên→index |
| P32 Sự kiện giảm giá | fixed window | Map tần suất 10 ngày |
| P45 Bộ điều khiển đĩa | simulation theo time | min-heap các job đã đến |

Câu bắt buộc trước khi code bài kết hợp:

```text
Ai quyết định vòng lặp/chuyển biên?
Map/Set/heap/queue đang giúp lưu điều gì?
Invariant nào nối các phần state với nhau?
```

## 11. Lộ trình ôn để đi thi thật

1. Học một pattern bằng lesson nhỏ; tự viết skeleton không nhìn.
2. Làm ngay 2 đề thật cùng pattern, một đề cơ bản rồi một đề có bẫy.
3. Sau mỗi đề, ghi một dòng: “điểm nào trong đề khiến mình chọn pattern này?”.
4. Hai ngày sau, làm đề trộn không ghi tên pattern.
5. Mỗi tuần làm mock 4 câu/120 phút, rồi post-mortem cả câu AC: state nào chọn đúng, test nào lẽ ra phải tự tạo.

Nếu không giải thích được state và rule order, câu AC đó chưa phải câu đã học xong.
