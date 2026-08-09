# Bộ 29 bài Map/Set trên Programmers phục vụ PCCP

[← Index](../../03_Map_Set.md) · [Lời giải đầy đủ →](../../solutions/03_Map_Set_Programmers_Solutions.md)

> Cập nhật ngày 09/08/2026. Đây là bản **diễn giải tiếng Việt tự chứa**, không phải bản sao hay bản dịch nguyên văn đề có bản quyền. Mỗi bài đều dẫn tới trang Programmers chính thức để đối chiếu. Hãy tự làm trước khi mở lời giải.

## Phạm vi và cách dùng

Bộ này gồm 29 bài:

- `PK-H01..05`: toàn bộ 5 bài trong [Programmers Algorithm Practice Kit — Hash](https://school.programmers.co.kr/learn/courses/30/parts/12077).
- `PK-M01..15`: các bài công khai có Map/Set là pattern chính hoặc pattern kết hợp rất sát PCCP.
- `PCCP-MS01..03`: đề PCCP đã công khai mà Map/Set giữ state quan trọng.
- `PK-X01..06`: sáu bài nằm trong Kit khác nhưng audit cho thấy Map/Set vẫn là state cốt lõi.

Khóa luyện PCCP chính thức còn có bài thực hành và hai mock trả phí/khóa. Notebook không sao chép nội dung chưa được công khai đó. “Mọi bài” ở đây nghĩa là toàn bộ Hash Kit và toàn bộ nhóm công khai đã được audit cho notebook theo mức liên quan tới PCCP; không có nghĩa mọi bài trên Programmers mà một lời giải bất kỳ có thể tình cờ dùng Map.

### Thứ tự học đề nghị

```text
Set cơ bản: PK-H02 → PK-M06 → PK-M07
Frequency: PK-H01 → PK-H04 → PK-M03 → PK-M04
Lookup/index: PK-M01 → PK-M02 → PK-M08
Map + sort/group: PK-H05 → PK-M09 → PK-M10
Map + window/combinatorics: PK-M05 → PK-M11 → PK-M12 → PK-M13
PCCP public: PCCP-MS01 → PCCP-MS02 → PCCP-MS03
Cross-Kit: PK-X01 → PK-X02 → PK-X03 → PK-X04 → PK-X05 → PK-X06
```

---

## A. Toàn bộ Hash Kit chính thức

### PK-H01 — Người chạy chưa về đích · Level 1 · `Map<name,count>`

Nguồn: [Programmers 42576](https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=javascript)

**Đề tự chứa:** Có mảng `participant` chứa tên mọi người tham gia chạy và mảng `completion` chứa tên những người đã hoàn thành. Chỉ thiếu đúng một lượt xuất hiện trong `completion`. Tên có thể trùng nhau. Trả về tên người chưa hoàn thành.

**Contract:** `solution(participant, completion) -> string`.

**Ràng buộc cần nhớ:** `completion.length = participant.length - 1`; số người có thể tới `100,000`; tên là chuỗi chữ thường và có thể trùng.

**Ví dụ riêng:** `participant = ["an", "binh", "an"]`, `completion = ["an", "binh"]` → `"an"`.

**Điểm Map/Set:** Set sai vì hai người có thể cùng tên; phải giữ multiplicity bằng frequency Map.

### PK-H02 — Chọn Ponketmon · Level 1 · `Set`

Nguồn: [Programmers 1845](https://school.programmers.co.kr/learn/courses/30/lessons/1845?language=javascript)

**Đề tự chứa:** `nums` chứa mã loài của `N` cá thể, với `N` chẵn. Bạn được chọn đúng `N / 2` cá thể. Hãy trả về số loài khác nhau lớn nhất có thể lấy.

**Contract:** `solution(nums) -> number`.

**Ràng buộc:** `1 <= N <= 10,000`, `N` chẵn; mã loài là số nguyên dương.

**Ví dụ riêng:** `[1, 1, 2, 3, 3, 3]` → chọn 3 cá thể, tối đa `3` loài.

**Điểm Set:** đáp án là `min(số loại khác nhau, N / 2)`.

### PK-H03 — Danh bạ điện thoại · Level 2 · `Set` hoặc sort

Nguồn: [Programmers 42577](https://school.programmers.co.kr/learn/courses/30/lessons/42577?language=javascript)

**Đề tự chứa:** Cho các số điện thoại khác nhau. Trả về `false` nếu tồn tại một số là tiền tố của số khác; nếu không trả về `true`.

**Contract:** `solution(phoneBook) -> boolean`.

**Ràng buộc:** danh bạ có thể rất lớn; mỗi số dài tối đa 20 ký tự; số không bắt đầu bằng `0`; không có hai số giống hệt nhau.

**Ví dụ riêng:** `["12", "567", "1235"]` → `false` vì `"12"` là tiền tố của `"1235"`.

**Điểm Map/Set:** lưu toàn bộ số trong Set rồi sinh các tiền tố ngắn hơn; cách sort rồi so hàng xóm cũng đúng.

### PK-H04 — Phối trang phục · Level 2 · frequency Map + quy tắc nhân

Nguồn: [Programmers 42578](https://school.programmers.co.kr/learn/courses/30/lessons/42578?language=javascript)

**Đề tự chứa:** Mỗi món đồ có `[tên, loại]`. Mỗi ngày được chọn nhiều nhất một món của mỗi loại và phải mặc ít nhất một món. Trả số cách phối khác nhau.

**Contract:** `solution(clothes) -> number`.

**Ràng buộc:** có từ 1 đến 30 món; tên món không trùng; tên và loại là chuỗi ngắn.

**Ví dụ riêng:** 2 áo và 1 quần → `(2 + 1) * (1 + 1) - 1 = 5` cách.

**Điểm Map:** Map đếm số món theo loại. `+1` là lựa chọn không mặc loại đó; `-1` loại trường hợp không mặc gì.

### PK-H05 — Album hay nhất · Level 3 · hai Map + sort

Nguồn: [Programmers 42579](https://school.programmers.co.kr/learn/courses/30/lessons/42579?language=javascript)

**Đề tự chứa:** Bài hát `i` có thể loại `genres[i]` và lượt nghe `plays[i]`. Sắp thể loại theo tổng lượt nghe giảm dần. Trong mỗi thể loại, lấy tối đa hai bài: lượt nghe giảm dần, nếu hòa thì index nhỏ hơn trước. Trả mảng index.

**Contract:** `solution(genres, plays) -> number[]`.

**Ràng buộc:** hai mảng cùng độ dài, tối đa khoảng `10,000` bài; mỗi bài có index duy nhất.

**Ví dụ riêng:** genres `["pop","rock","pop"]`, plays `[30,50,40]` → thể loại pop trước với index `[2,0]`, rồi rock `[1]`; kết quả `[2,0,1]`.

**Điểm Map:** một Map giữ tổng theo thể loại, một Map gom các bài theo thể loại.

---

## B. Bài công khai sát PCCP

### PK-M01 — Cuộc đua chạy · Level 1 · `Map<name,index>`

Nguồn: [Programmers 178871](https://school.programmers.co.kr/learn/courses/30/lessons/178871?language=javascript)

**Đề tự chứa:** `players` là thứ tự hiện tại. Mỗi tên trong `callings` vừa vượt người đứng ngay trước. Sau mọi lần gọi, trả thứ tự cuối.

**Contract:** `solution(players, callings) -> string[]`.

**Ràng buộc:** tên vận động viên là duy nhất; số lượt gọi có thể rất lớn nên không được gọi `indexOf` mỗi lần.

**Ví dụ riêng:** `players=["a","b","c","d"]`, `callings=["c","c"]` → `["c","a","b","d"]`.

**Pattern:** array giữ thứ tự, Map giữ vị trí; mỗi lần swap phải cập nhật cả hai index.

### PK-M02 — Điểm kỷ niệm · Level 1 · lookup Map

Nguồn: [Programmers 176963](https://school.programmers.co.kr/learn/courses/30/lessons/176963?language=javascript)

**Đề tự chứa:** `name[i]` có điểm nhớ `yearning[i]`. Với mỗi ảnh là danh sách tên, cộng điểm của những người có trong bảng; tên lạ được 0. Trả điểm từng ảnh.

**Contract:** `solution(name, yearning, photo) -> number[]`.

**Ví dụ riêng:** `name=["an","binh"]`, điểm `[5,7]`, ảnh `[["an","chi"],["binh","an"]]` → `[5,12]`.

**Pattern:** dựng `Map<name,score>` một lần, sau đó lookup cho mọi ảnh.

### PK-M03 — Chọn quýt · Level 2 · frequency Map + greedy

Nguồn: [Programmers 138476](https://school.programmers.co.kr/learn/courses/30/lessons/138476?language=javascript)

**Đề tự chứa:** Mỗi phần tử `tangerine` là kích thước một quả. Cần chọn đúng `k` quả sao cho số loại kích thước khác nhau là ít nhất. Trả số loại tối thiểu.

**Contract:** `solution(k, tangerine) -> number`.

**Ví dụ riêng:** `k=4`, sizes `[1,1,1,2,2,3]` → lấy 3 quả size 1 và 1 quả size 2, đáp án `2`.

**Pattern:** đếm tần suất, sort các count giảm dần, lấy nhóm lớn trước.

### PK-M04 — Chia bánh cuộn · Level 2 · Set + frequency Map

Nguồn: [Programmers 132265](https://school.programmers.co.kr/learn/courses/30/lessons/132265?language=javascript)

**Đề tự chứa:** `topping` mô tả loại topping theo thứ tự trên bánh. Cắt giữa hai vị trí. Một nhát cắt công bằng khi hai phần có cùng số **loại** topping khác nhau. Đếm số vị trí cắt công bằng.

**Contract:** `solution(topping) -> number`.

**Ví dụ riêng:** `[1,2,1,3,2]` có thể di chuyển từng topping từ phải sang trái và so `leftSet.size` với `rightCount.size`.

**Pattern:** Set bên trái; frequency Map bên phải để biết khi nào một loại biến mất hoàn toàn.

### PK-M05 — Sự kiện giảm giá · Level 2 · sliding window + Map

Nguồn: [Programmers 131127](https://school.programmers.co.kr/learn/courses/30/lessons/131127?language=javascript)

**Đề tự chứa:** `want[i]` cần đúng `number[i]` sản phẩm. `discount[d]` là sản phẩm giảm giá ngày `d`, mỗi ngày mua được một món. Đếm số ngày bắt đầu mà cửa sổ 10 ngày tiếp theo đáp ứng chính xác toàn bộ nhu cầu.

**Contract:** `solution(want, number, discount) -> number`.

**Ràng buộc:** tổng số lượng cần mua là 10; danh sách giảm giá dài ít nhất 10.

**Pattern:** Map tần suất của cửa sổ cố định 10 ngày; add ngày mới và remove ngày cũ đối xứng.

### PK-M06 — Nối từ tiếng Anh · Level 2 · Set membership

Nguồn: [Programmers 12981](https://school.programmers.co.kr/learn/courses/30/lessons/12981?language=javascript)

**Đề tự chứa:** `n` người lần lượt nói các từ trong `words`. Một lượt sai nếu từ đã xuất hiện hoặc chữ đầu không bằng chữ cuối từ trước. Trả `[số người, lượt của người đó]` tại lỗi đầu tiên; không lỗi trả `[0,0]`.

**Contract:** `solution(n, words) -> [number, number]`; người và lượt đều đánh số từ 1.

**Ví dụ riêng:** `n=3`, words `["tank","kick","know","wheel","land","dream","mother","robot","tank"]` → người 3, lượt 3 vì `tank` lặp.

**Pattern:** Set giữ từ đã nói; index đổi thành người `index % n + 1` và lượt `Math.floor(index / n) + 1`.

### PK-M07 — Tuple · Level 2 · Set + parsing

Nguồn: [Programmers 64065](https://school.programmers.co.kr/learn/courses/30/lessons/64065?language=javascript)

**Đề tự chứa:** Chuỗi `s` biểu diễn một tập các tập con của cùng một tuple, nhưng thứ tự tập con bị xáo trộn. Khôi phục tuple. Mỗi tập dài hơn bổ sung đúng một phần tử mới.

**Contract:** `solution(s) -> number[]`.

**Ví dụ riêng:** `"{{2},{2,1},{2,1,3}}"` → `[2,1,3]`.

**Pattern:** parse các tập, sort theo độ dài, dùng Set để lấy phần tử chưa gặp.

### PK-M08 — Phòng chat mở · Level 2 · latest-value Map

Nguồn: [Programmers 42888](https://school.programmers.co.kr/learn/courses/30/lessons/42888?language=javascript)

**Đề tự chứa:** Record gồm `Enter uid nickname`, `Leave uid`, `Change uid nickname`. Sau cùng, mọi tin nhắn Enter/Leave phải dùng nickname mới nhất của uid. Trả danh sách câu thông báo theo thứ tự event.

**Contract:** `solution(record) -> string[]`; record được xử lý đúng thứ tự thời gian.

**Ví dụ riêng:** `Enter u1 An`, `Change u1 Binh`, `Leave u1` → hai thông báo đều dùng `Binh`.

**Pattern:** lượt một cập nhật `Map<uid,latestNickname>` và lưu event cần in; lượt hai render.

### PK-M09 — Nhận kết quả báo cáo · Level 1 · `Map<id,Set<reporter>>`

Nguồn: [Programmers 92334](https://school.programmers.co.kr/learn/courses/30/lessons/92334?language=javascript)

**Đề tự chứa:** Mỗi chuỗi `"a b"` nghĩa là `a` báo cáo `b`. Một người chỉ được tính một lần cho cùng đối tượng dù báo nhiều lần. Người bị ít nhất `k` người khác nhau báo sẽ bị khóa; mỗi người nhận một email cho mỗi người mình báo mà bị khóa. Trả số email theo thứ tự `idList`.

**Contract:** `solution(idList, report, k) -> number[]`; `idList` không có id trùng.

**Pattern:** Map từ người bị báo tới Set người báo; Map index giúp ghi đáp án đúng vị trí.

### PK-M10 — Tính phí đỗ xe · Level 2 · nhiều Map

Nguồn: [Programmers 92341](https://school.programmers.co.kr/learn/courses/30/lessons/92341?language=javascript)

**Đề tự chứa:** `fees=[baseTime,baseFee,unitTime,unitFee]`. Mỗi record có giờ, biển số, `IN/OUT`. Xe chưa OUT đến cuối ngày được coi là OUT lúc `23:59`. Cộng tổng phút mỗi xe, tính phí, trả phí theo biển số tăng dần.

**Contract:** `solution(fees, records) -> number[]`; record đã xếp tăng theo thời gian.

**Pattern:** Map thời điểm vào và Map tổng phút; sau scan xử lý các xe còn trong bãi.

### PK-M11 — Mua đá quý · Level 3 · variable window + Map

Nguồn: [Programmers 67258](https://school.programmers.co.kr/learn/courses/30/lessons/67258?language=javascript)

**Đề tự chứa:** Tìm đoạn liên tiếp ngắn nhất chứa mọi loại đá quý xuất hiện trong `gems`. Nếu nhiều đoạn cùng độ dài, chọn đoạn bắt đầu sớm hơn. Trả vị trí 1-based `[start,end]`.

**Contract:** `solution(gems) -> [number, number]`; mảng có thể dài tới `100,000` nên cần cửa sổ tuyến tính.

**Pattern:** Set toàn cục đếm số loại; Map tần suất cửa sổ; co trái khi cửa sổ đã đủ loại.

### PK-M12 — Khóa ứng viên · Level 2 · Set uniqueness + bitmask

Nguồn: [Programmers 42890](https://school.programmers.co.kr/learn/courses/30/lessons/42890?language=javascript)

**Đề tự chứa:** `relation` là bảng chuỗi. Một tập cột là khóa ứng viên khi kết hợp các giá trị của nó phân biệt mọi hàng (duy nhất) và không chứa một tập cột nhỏ hơn cũng đã là khóa (tối thiểu). Trả số khóa.

**Contract:** `solution(relation) -> number`; mọi hàng có cùng số cột và bản thân các hàng không trùng hoàn toàn.

**Ràng buộc:** số cột nhỏ, phù hợp duyệt mọi bitmask.

**Pattern:** Set kiểm tra tuple chiếu có duy nhất; danh sách mask đã chọn kiểm tra minimality.

### PK-M13 — Người dùng bị cấm · Level 3 · Set trạng thái tổ hợp

Nguồn: [Programmers 64064](https://school.programmers.co.kr/learn/courses/30/lessons/64064?language=javascript)

**Đề tự chứa:** Mỗi pattern cấm dùng `*` thay đúng một ký tự. Gán mỗi pattern cho một user khác nhau phù hợp. Hai cách chỉ khác thứ tự gán nhưng chọn cùng tập user được xem là một. Trả số tập khác nhau.

**Contract:** `solution(userId, bannedId) -> number`.

**Ràng buộc:** tối đa 8 user và 8 pattern, phù hợp DFS/backtracking.

**Pattern:** Set `used` trong DFS và Set chữ ký tập user ở lá.

### PK-M14 — Ghép tin tức · Level 2 · multiset Map

Nguồn: [Programmers 17677](https://school.programmers.co.kr/learn/courses/30/lessons/17677?language=javascript)

**Đề tự chứa:** Từ mỗi chuỗi, lấy mọi cặp 2 ký tự liên tiếp chỉ gồm chữ cái, không phân biệt hoa thường. Xem danh sách cặp là multiset. Tính Jaccard = kích thước giao / kích thước hợp; hai multiset rỗng cho 1. Trả `floor(Jaccard * 65536)`.

**Contract:** `solution(str1, str2) -> number`; mỗi chuỗi dài từ 2 đến 1,000.

**Pattern:** frequency Map; giao cộng `min(countA,countB)`, hợp cộng `max(...)`.

### PK-M15 — Hạn dữ liệu cá nhân · Level 1 · lookup Map

Nguồn: [Programmers 150370](https://school.programmers.co.kr/learn/courses/30/lessons/150370?language=javascript)

**Đề tự chứa:** Mọi tháng được quy ước 28 ngày. `terms` cho số tháng hiệu lực theo loại điều khoản. Mỗi privacy có ngày bắt đầu và loại. Tại ngày `today`, trả index 1-based của các privacy đã hết hạn.

**Contract:** `solution(today, terms, privacies) -> number[]`, giữ thứ tự index tăng dần.

**Pattern:** Map loại → số tháng; đổi ngày thành một số nguyên để so sánh.

---

## C. Đề PCCP công khai có Map/Set quan trọng

### PCCP-MS01 — Tìm nguy cơ va chạm · PCCP public · composite-key Map

Nguồn: [Programmers 340211](https://school.programmers.co.kr/learn/courses/30/lessons/340211?language=javascript)

**Đề tự chứa:** Các điểm được đánh số và có tọa độ. Mỗi robot đi qua một chuỗi điểm. Mỗi giây robot đi một ô; ưu tiên thay đổi hàng trước, rồi mới thay đổi cột. Tại cùng một thời điểm và tọa độ, nếu có ít nhất hai robot thì tính một nguy cơ va chạm. Đếm tổng số cặp `(thời gian, tọa độ)` nguy hiểm.

**Contract:** `solution(points, routes) -> number`; point id trong route là 1-based.

**Pattern:** mô phỏng đường đi; Map với key `time|row|col`; count chuyển từ 1 lên 2 thì tăng đáp án đúng một lần.

### PCCP-MS02 — Khai thác dầu · PCCP public · BFS + Set cột

Nguồn: [Programmers 250136](https://school.programmers.co.kr/learn/courses/30/lessons/250136?language=javascript)

**Đề tự chứa:** `land` là lưới `0/1`; các ô dầu `1` nối bốn hướng tạo thành một mỏ. Chọn đúng một cột để khoan thẳng. Lượng dầu thu được là tổng kích thước các mỏ chạm cột đó, mỗi mỏ chỉ tính một lần. Trả lượng lớn nhất.

**Contract:** `solution(land) -> number`.

**Ràng buộc:** lưới có thể tới `500 x 500`, nên không BFS lại cho từng cột.

**Pattern:** BFS mỗi component đúng một lần; Set ghi các cột component chạm; cộng kích thước component vào từng cột đó.

### PCCP-MS03 — Khôi phục biểu thức · PCCP public · Set ứng viên

Nguồn: [Programmers 340210](https://school.programmers.co.kr/learn/courses/30/lessons/340210?language=javascript)

**Đề tự chứa:** Các biểu thức cộng/trừ được viết trong cùng một hệ cơ số chưa biết từ 2 đến 9. Một số biểu thức có kết quả đã biết, số khác có `X`. Tìm mọi cơ số phù hợp với dữ kiện. Với mỗi `X`, nếu mọi cơ số ứng viên cho cùng một chuỗi kết quả thì điền kết quả đó; nếu không xác định duy nhất thì điền `?`.

**Contract:** `solution(expressions) -> string[]`, chỉ trả các biểu thức từng có kết quả `X` và giữ nguyên thứ tự của chúng.

**Pattern:** Set/array ứng viên cơ số; lọc bằng biểu thức đã biết; gom các kết quả có thể của từng `X` vào Set.

---

## D. Hash/Set nằm ẩn trong các Practice Kit khác

### PK-X01 — Tìm số nguyên tố · Exhaustive Search Kit · Set kết quả

Nguồn: [Programmers 42839](https://school.programmers.co.kr/learn/courses/30/lessons/42839?language=javascript)

**Đề tự chứa:** `numbers` là chuỗi chữ số. Có thể chọn một hoặc nhiều chữ số, đổi thứ tự và ghép thành số. Đếm bao nhiêu số nguyên tố khác nhau có thể tạo được. Mỗi vị trí chữ số chỉ dùng tối đa một lần trong một số.

**Contract:** `solution(numbers) -> number`; chuỗi dài từ 1 đến 7.

**Ví dụ riêng:** `"17"` tạo được các số nguyên tố `7`, `17`, `71`, nên trả `3`.

**Điểm Set:** nhiều permutation có thể tạo cùng một số, nhất là khi có chữ số trùng hoặc số 0 đầu; Set loại đáp án trùng.

### PK-X02 — Áo thể dục · Greedy Kit · hai Set

Nguồn: [Programmers 42862](https://school.programmers.co.kr/learn/courses/30/lessons/42862?language=javascript)

**Đề tự chứa:** Có `n` học sinh. Học sinh trong `lost` mất áo; học sinh trong `reserve` có một áo dự phòng. Một người có thể vừa mất áo vừa có áo dự phòng, khi đó chỉ còn đủ áo cho mình. Mỗi áo dư chỉ cho người có số thứ tự liền trước hoặc liền sau. Trả số học sinh tối đa có áo.

**Contract:** `solution(n, lost, reserve) -> number`.

**Điểm Set:** cần loại giao giữa lost/reserve trước, sau đó membership và delete người đã được cho mượn.

### PK-X03 — Biểu diễn bằng N · Dynamic Programming Kit · mảng các Set

Nguồn: [Programmers 42895](https://school.programmers.co.kr/learn/courses/30/lessons/42895?language=javascript)

**Đề tự chứa:** Dùng đúng chữ số `N` từ 1 đến 8 lần, phép nối chữ số và các phép `+ - * /` với ngoặc tùy ý để tạo `number`. Phép chia lấy phần nguyên. Trả số lần dùng `N` ít nhất; không tạo được trong 8 lần trả `-1`.

**Contract:** `solution(N, number) -> number`.

**Điểm Set:** `dp[count]` chứa mọi giá trị khác nhau tạo được bằng đúng `count` chữ số N; Set loại hàng loạt biểu thức cho cùng kết quả.

### PK-X04 — Hành trình du lịch · DFS/BFS Kit · adjacency Map

Nguồn: [Programmers 43164](https://school.programmers.co.kr/learn/courses/30/lessons/43164?language=javascript)

**Đề tự chứa:** Mỗi vé `[from,to]` dùng đúng một lần. Hành trình bắt đầu tại `ICN`. Luôn tồn tại ít nhất một hành trình dùng hết vé. Nếu có nhiều đáp án, trả hành trình có thứ tự từ điển nhỏ nhất.

**Contract:** `solution(tickets) -> string[]`.

**Điểm Map:** `Map<airport,destinations[]>` gom cạnh theo sân bay xuất phát; thuật toán Hierholzer lấy cạnh và dựng Euler path.

### PK-X05 — Ghép mảnh puzzle · DFS/BFS Kit · Map chữ ký hình

Nguồn: [Programmers 84021](https://school.programmers.co.kr/learn/courses/30/lessons/84021?language=javascript)

**Đề tự chứa:** `gameBoard` có các vùng trống `0`; `table` có các mảnh `1`. Mỗi component nối bốn hướng là một lỗ hoặc mảnh. Có thể xoay mảnh theo bội số 90 độ, không lật, và mỗi mảnh dùng tối đa một lần. Lấp đúng hình, không được thừa ô; trả tổng số ô được lấp lớn nhất.

**Contract:** `solution(gameBoard, table) -> number`; hai bảng vuông cùng kích thước.

**Điểm Map:** chuẩn hóa bốn phép xoay thành một canonical signature; Map đếm số mảnh theo signature rồi ghép với lỗ.

### PK-X06 — Đếm số phòng · Graph Kit · Set đỉnh/cạnh

Nguồn: [Programmers 49190](https://school.programmers.co.kr/learn/courses/30/lessons/49190?language=javascript)

**Đề tự chứa:** Bắt đầu tại gốc tọa độ và đi theo tám hướng trong `arrows`. Đường vẽ tạo các phòng kín; trả số phòng. Hai đường chéo có thể cắt nhau giữa ô và tạo thêm đỉnh.

**Contract:** `solution(arrows) -> number`.

**Điểm Set:** Set đỉnh đã thấy và Set cạnh vô hướng đã đi. Đi mỗi lệnh thành hai bước nửa để biến giao điểm đường chéo thành một đỉnh nguyên.

---

## Checklist trước khi mở lời giải

Với mỗi bài, hãy viết ra giấy:

```text
Coverage ID / pattern:
Key của Map hoặc phần tử của Set:
Value của Map có ý nghĩa gì:
Invariant sau mỗi vòng:
Check trước update hay sau update:
Complexity mục tiêu:
3 edge case tự nghĩ:
```

Sau đó mới mở [lời giải JavaScript có giải thích từng bước](../../solutions/03_Map_Set_Programmers_Solutions.md).
