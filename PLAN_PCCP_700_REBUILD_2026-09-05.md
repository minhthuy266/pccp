# PCCP 700+ — Rebuild từ nền gần như số 0

> Lịch từ **30/07/2026 đến 04/09/2026**; 05/09 là ngày mục tiêu/thi.  
> Đây là bản phù hợp với trạng thái: đã từng biết code nhưng lâu không làm thuật toán, quên gần hết.

## 0. Kết luận thẳng

**700+ trong 37 ngày là mục tiêu căng nhưng còn khả thi**, với ba điều kiện:

1. học tập trung tối thiểu **3 giờ/ngày**; tốt nhất trung bình **3,5–4 giờ/ngày**;
2. 70–80% thời gian là tự code, debug, làm lại từ trang trắng — không phải xem video;
3. qua các gate bên dưới. Nếu trượt gate thì chuyển ngay sang nhánh Rescue, không cố “học cho đủ giáo trình”.

Khối lượng hợp lý là **125–140 giờ tập trung**. Mức sàn khoảng **105–115 giờ**. Nếu chỉ có dưới 2 giờ/ngày thì, trừ khi nền quay lại rất nhanh trong tuần đầu, 700+ không còn là dự báo thực tế.

PCCP chính thức có **4 bài code/120 phút/1.000 điểm**. Mốc 600–749 là Lv.3 và 750–899 là Lv.4, nên mục tiêu luyện phải là vùng **750–800**, không phải vừa chạm 700. Programmers không công khai trọng số cố định từng câu; không được suy ra “3 AC = 750”.

Nguồn: [giới thiệu PCCP](https://certi.programmers.co.kr/about/pccp), [đề mẫu chính thức](https://certi.programmers.co.kr/about/sample), [brochure chứng chỉ](https://business.programmers.co.kr/static/business/certification_intro.pdf).

### Lưu ý về ngày 05/09

Tại ngày research 30/07/2026, [lịch thi công khai](https://certi.programmers.co.kr/tryouts) hiển thị 23/08 và 20/09, không có ca công khai 05/09. Plan này coi 05/09 là deadline riêng/ca do tổ chức cấp. Nếu mày thi ca công khai 23/08 thì phải dùng lịch tăng tốc riêng, không thể áp nguyên 37 ngày này.

## 1. Chốt ngôn ngữ trong ngày đầu

- Dùng ngôn ngữ mày từng code nhanh nhất.
- Nếu Python/Java/C++ hiện ngang nhau, chọn **Python** vì code ngắn và thư viện `collections`, `heapq`, `bisect` tiện trong bài timed.
- Sau D1 không đổi ngôn ngữ.

Nếu chọn Python, D1–D2 chỉ học lại các phần cần dùng trong [khóa Python nhập môn miễn phí của Programmers](https://school.programmers.co.kr/learn/courses/2/2-%EB%AC%B4%EB%A3%8C-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%9E%85%EB%AC%B8): điều kiện, hàm, list/string, loop, dict/set và comprehension. Không cần xem hết khóa.

## 2. Cách học mỗi ngày

### Ngày thường — 210 phút

| Khối | Phút | Phải làm gì |
|---|---:|---|
| Retrieval | 20 | Viết lại syntax/template/pattern hôm trước từ trí nhớ |
| Học một pattern | 35 | Đọc constraint, invariant, complexity; tối đa một ví dụ có hướng dẫn |
| Guided → blank page | 25 | Đóng tài liệu rồi code lại ví dụ từ trắng |
| Bài chưa thấy | 45 | Làm có đồng hồ, không AI/editorial |
| Ôn D+1/D+7 | 35 | Làm lại bài đến hạn từ trắng |
| Error log | 20 | Ghi nguyên nhân gốc, counterexample, việc sửa |
| Booster | 30 | Bài thứ hai hoặc vá error cluster lớn nhất |

Ngày gate/mock dùng **240 phút**: 120 phút thi + khoảng 120 phút review/re-code. D37 chỉ 60–90 phút. Nếu một ngày chỉ có đúng 3 giờ, bỏ khối Booster; đây là chế độ tối thiểu, không phải tải khuyến nghị.

### Thang gợi ý

Khi bí, chỉ leo từng bậc:

1. `0` — không gợi ý;
2. `1` — chỉ tên pattern hoặc câu hỏi dẫn đường;
3. `2` — pseudocode;
4. `3` — xem code hoàn chỉnh.

Sau bậc 2 hoặc 3, phải đóng lời giải và code lại từ trắng. Một bài chưa được tính là đã học nếu chỉ “đọc hiểu”.

### Quy tắc dừng

- Bài dễ: 20–25 phút chưa có hướng đúng thì dừng và review.
- Bài trung bình: 40–50 phút.
- Debug cùng một triệu chứng quá 10 phút: quay lại mô hình hóa/edge case hoặc đổi bài.
- Trước khi code luôn ghi: `n tối đa → complexity cho phép → pattern dự kiến`.

### Error log

| Mã | Lỗi |
|---|---|
| R | Đọc/mô hình hóa sai |
| A | Chọn thuật toán sai |
| C | Complexity không phù hợp constraint |
| I | Syntax/API/implementation |
| E | Thiếu edge case |
| T | Quản trị thời gian |

Với mỗi lỗi, ghi thêm một input nhỏ làm cách sai thất bại.

## 3. Phạm vi cần học

### Bắt buộc, theo đúng thứ tự

1. loop, function, list/string, indexing, Big-O;
2. hash/set/counting, sort/comparator;
3. stack, queue, deque, heap;
4. implementation/simulation, greedy cơ bản;
5. brute force/backtracking;
6. prefix/sliding window/two pointers;
7. binary search on answer;
8. DFS/BFS, grid, connected components, state graph;
9. DP một chiều/hai chiều ở mức state–transition–base case.

### Chỉ học nếu đã qua gate

- backtracking khó hơn;
- state BFS;
- DP cơ bản;
- graph/tree ở mức traversal.

### Không học trong sprint này

Segment tree, trie, union-find/MST, topo nâng cao, DP khó, tree algorithm sâu, bitmask phức tạp. Coverage rộng nhưng không convert được Q1–Q3 là cách nhanh nhất để hụt 700.

## 4. Lịch 37 ngày

URL bài tập có dạng:

`https://school.programmers.co.kr/learn/courses/30/lessons/{ID}`

### Phase 1 — Khởi động lại khả năng code

| D | Ngày | Thời lượng | Nội dung và bài bắt buộc | Chuẩn đầu ra |
|---:|---|---:|---|---|
| 1 | 30/07 | 210' | Chốt ngôn ngữ; syntax/function/list/string/loop. Bài [181875](https://school.programmers.co.kr/learn/courses/30/lessons/181875), [12918](https://school.programmers.co.kr/learn/courses/30/lessons/12918) | Một tờ syntax/API; tự code hai hàm hoàn chỉnh |
| 2 | 31/07 | 210' | Array/string traversal, state, indexing. Chọn [181901](https://school.programmers.co.kr/learn/courses/30/lessons/181901) hoặc [12906](https://school.programmers.co.kr/learn/courses/30/lessons/12906), rồi [17681](https://school.programmers.co.kr/learn/courses/30/lessons/17681) | Ghi 5 edge case; không còn lỗi off-by-one cơ bản |
| 3 | 01/08 | 210' | Constraint → Big-O; hash/set/counting. [1845](https://school.programmers.co.kr/learn/courses/30/lessons/1845), [42576](https://school.programmers.co.kr/learn/courses/30/lessons/42576) | Viết `dict/set` skeleton từ trí nhớ |
| 4 | 02/08 | 210' | Sort, multi-key/tie. [12915](https://school.programmers.co.kr/learn/courses/30/lessons/12915), [42748](https://school.programmers.co.kr/learn/courses/30/lessons/42748); [42747](https://school.programmers.co.kr/learn/courses/30/lessons/42747) là stretch | Giải thích comparator/key và complexity |
| 5 | 03/08 | 210' | Stack/queue/deque. [12909](https://school.programmers.co.kr/learn/courses/30/lessons/12909), [42587](https://school.programmers.co.kr/learn/courses/30/lessons/42587) | Chọn đúng cấu trúc, không dùng list-pop đầu tùy tiện |
| 6 | 04/08 | 210' | Timeline/event simulation. [42586](https://school.programmers.co.kr/learn/courses/30/lessons/42586), [42583](https://school.programmers.co.kr/learn/courses/30/lessons/42583) | Tách rõ state, event, điều kiện kết thúc |
| 7 | 05/08 | 210' | **Gate A**, không phải official mock: [42840](https://school.programmers.co.kr/learn/courses/30/lessons/42840), [68644](https://school.programmers.co.kr/learn/courses/30/lessons/68644), rồi một bài đã fail | Qua khi ≥2/3 AC, mỗi bài mới ≤25', không tra syntax cơ bản |

### Phase 2 — Các pattern chuyển hóa trực tiếp thành điểm

| D | Ngày | Thời lượng | Nội dung và bài bắt buộc | Chuẩn đầu ra |
|---:|---|---:|---|---|
| 8 | 06/08 | 210' | Hash + sort: [42577](https://school.programmers.co.kr/learn/courses/30/lessons/42577), [42578](https://school.programmers.co.kr/learn/courses/30/lessons/42578); [42579](https://school.programmers.co.kr/learn/courses/30/lessons/42579) nếu còn giờ | Tự chọn key/value và chứng minh đủ thông tin |
| 9 | 07/08 | 210' | Heap/PQ: [42626](https://school.programmers.co.kr/learn/courses/30/lessons/42626), [42628](https://school.programmers.co.kr/learn/courses/30/lessons/42628) | Với bài 2, sau 50' chỉ cần mô hình đúng rồi guided re-code |
| 10 | 08/08 | 210' | Greedy + phản ví dụ: [42862](https://school.programmers.co.kr/learn/courses/30/lessons/42862), [42885](https://school.programmers.co.kr/learn/courses/30/lessons/42885); [42883](https://school.programmers.co.kr/learn/courses/30/lessons/42883) stretch | Nêu được lý do lựa chọn cục bộ là an toàn |
| 11 | 09/08 | 210' | Brute force/backtracking: [87946](https://school.programmers.co.kr/learn/courses/30/lessons/87946), [84512](https://school.programmers.co.kr/learn/courses/30/lessons/84512) | Viết search space và bound trước khi code |
| 12 | 10/08 | 210' | DFS/recursion/visited: [43165](https://school.programmers.co.kr/learn/courses/30/lessons/43165), [86971](https://school.programmers.co.kr/learn/courses/30/lessons/86971) | Phân biệt state, choice, base case |
| 13 | 11/08 | 210' | Sliding window/two pointers: [131127](https://school.programmers.co.kr/learn/courses/30/lessons/131127), [178870](https://school.programmers.co.kr/learn/courses/30/lessons/178870) | Nêu invariant của cửa sổ |
| 14 | 12/08 | 210' | Binary search on answer: [43238](https://school.programmers.co.kr/learn/courses/30/lessons/43238) + 6 drill chỉ viết predicate/bounds | Chứng minh predicate đơn điệu; test `lo/hi` |
| 15 | 13/08 | 240' | **Gate B** 120': [92334](https://school.programmers.co.kr/learn/courses/30/lessons/92334), [49994](https://school.programmers.co.kr/learn/courses/30/lessons/49994), [12981](https://school.programmers.co.kr/learn/courses/30/lessons/12981); 120' review | Qua khi easy ≤20' và ≥1 medium ≤45', complexity đúng |

### Phase 3 — BFS/graph và DP tối thiểu

| D | Ngày | Thời lượng | Nội dung và bài bắt buộc | Chuẩn đầu ra |
|---:|---|---:|---|---|
| 16 | 14/08 | 210' | BFS grid shortest path: [1844](https://school.programmers.co.kr/learn/courses/30/lessons/1844) + tự đổi start/wall/target | Đánh dấu visited đúng lúc enqueue |
| 17 | 15/08 | 210' | Connected components/graph BFS: [43162](https://school.programmers.co.kr/learn/courses/30/lessons/43162), [49189](https://school.programmers.co.kr/learn/courses/30/lessons/49189) | Chuyển được matrix/list sang graph |
| 18 | 16/08 | 210' | State graph/BFS: [43163](https://school.programmers.co.kr/learn/courses/30/lessons/43163), [118667](https://school.programmers.co.kr/learn/courses/30/lessons/118667) | `visited` chứa đủ chiều của state |
| 19 | 17/08 | 210' | DP tối thiểu: [43105](https://school.programmers.co.kr/learn/courses/30/lessons/43105), [42898](https://school.programmers.co.kr/learn/courses/30/lessons/42898) | Viết state/transition/base trước code |
| 20 | 18/08 | 210' | Integration + vá điểm yếu: [42584](https://school.programmers.co.kr/learn/courses/30/lessons/42584) và [42627](https://school.programmers.co.kr/learn/courses/30/lessons/42627), hoặc hai bài thuộc cluster lỗi lớn nhất | 10 drill `constraint → pattern`, code 1–2 bài |
| 21 | 19/08 | 240' | **Foundation Gate**, 120' với bốn bài chưa mở: [67256](https://school.programmers.co.kr/learn/courses/30/lessons/67256), [12973](https://school.programmers.co.kr/learn/courses/30/lessons/12973), [42842](https://school.programmers.co.kr/learn/courses/30/lessons/42842), [12985](https://school.programmers.co.kr/learn/courses/30/lessons/12985); 120' review | Chỉ mở official nếu đạt đủ 5 tiêu chí dưới đây |

**Tiêu chí mở khóa official mock ở D21:**

1. bài dễ AC trong ≤20 phút;
2. ít nhất 2/4 AC trong 120 phút;
3. có hướng đúng và complexity đúng cho bài thứ ba;
4. không tra syntax/API cơ bản;
5. review đầy đủ và re-code được ít nhất một bài sai.

### Phase 4 — Chuyển kiến thức thành điểm

| D | Ngày | Thời lượng | Nội dung | Điều kiện/đầu ra |
|---:|---|---:|---|---|
| 22 | 20/08 | 210' | Review Foundation Gate, blind re-code; vá hai cluster lỗi | Nếu fail gate, bắt đầu Rescue |
| 23 | 21/08 | 240' | **Official Mock 1**: 120' thi + 120' forensic review | Chỉ mở nếu qua D21; nếu chưa, làm mixed gate #2 |
| 24 | 22/08 | 210' | Re-code Q1–Q3 từ trắng; counterexample cho mọi lỗi | Không học topic mới |
| 25 | 23/08 | 210' | Targeted repair bằng bài còn lại: 42746/42883/42627/42628 hoặc hai cluster yếu | Hai bài timed + một bài D+7 |
| 26 | 24/08 | 210' | Speed ladder: easy 15' + medium 35' + medium 35' + re-solve | Chỉ dùng editor/browser giống thi |
| 27 | 25/08 | 240' | **Official Mock 2** + review | Mở nếu Mock 1 ≥500 hoặc ≥2 AC; nếu không, repair rồi làm Mock 1 |
| 28 | 26/08 | 210' | Forensic review + re-code; luyện cutoff/chuyển bài | Q1 sạch; không lặp lỗi API |
| 29 | 27/08 | 240' | Fresh mixed mock 120' + review. Bộ giữ kín đến ngày này: 81301, 49993, 70129, 72412 | Mục tiêu Q1 + 2 medium trước phút 95; proxy 650–700 |
| 30 | 28/08 | 210' | Vá hai cluster lớn nhất; không mở topic mới | Mọi lỗi có counterexample và rule phòng lỗi |
| 31 | 29/08 | 240' | **Past Set A** + review | Mở nếu hai mock/gate gần nhất ≥2 AC và easy ≤20'; nếu chưa thì mixed Q1–Q3 |
| 32 | 30/08 | 210' | Re-code Q1–Q3 Past A từ trắng | Rút thời gian ít nhất 20–25% |
| 33 | 31/08 | 210' | Conversion drill: easy ≤15' + 2 medium ≤35' | Không IDE ngoài, không autocomplete |
| 34 | 01/09 | 240' | **Past Set B** + review | Mở khi ổn định; nếu Past A bị hoãn thì dùng A và giữ B |
| 35 | 02/09 | 210' | Final postmortem; chốt template, error rules, chiến thuật | Không học mới |
| 36 | 03/09 | 210' | Confidence set 90': 1 easy + 2 medium quen; 60' review + 30' tech/checklist | Không full mock khó |
| 37 | 04/09 | 60–90' | Một bài dễ ≤20'; đọc error log; test thiết bị; nghỉ | Dừng sớm, ngủ đủ |
| — | 05/09 | 120' | **D-day** | Thực thi chiến thuật, không đổi thói quen |

Không mở trước nội dung bốn bộ chính thức. Đến ngày thi thử, vào [sample hub](https://certi.programmers.co.kr/about/sample) và chọn đúng Mock 1, Mock 2, Past 1/Past 2. Khóa [giải thích PCCP bằng Python](https://school.programmers.co.kr/learn/courses/24542) chỉ dùng **sau** khi đã hết giờ và tự review.

## 5. Gate và nhánh Rescue

| Mốc | Chuẩn cần đạt |
|---|---|
| D7 | 2/3 easy AC; bài mới ≤25'; không tra syntax cơ bản |
| D15 | easy ≤20'; ít nhất một Lv2 ≤45'; complexity phù hợp |
| D21 | ≥2/4 AC; hướng đúng cho bài thứ ba; đủ 5 tiêu chí mở khóa |
| Sau Mock 1 | Q1 + một medium; khoảng ≥500 là tín hiệu hợp lý |
| D29 | Q1 + hai medium trước phút 95; proxy 650–700 |
| D34 | vùng 750–800, hoặc tối thiểu Q1 + hai medium rất ổn định và có partial Q4 |

### Nếu trượt

- **D7 trượt:** ba ngày kế tiếp dành thêm 45 phút/ngày cho syntax + easy implementation; chưa tăng độ khó.
- **D15 chưa làm chắc Q1 hoặc proxy <350:** tăng lên 3,5–4 giờ/ngày; chỉ Q1–Q3.
- **D21/D23 fail:** chưa đốt bộ official tiếp theo. Dùng 70% thời gian cho implementation/hash/sort/queue/BFS/binary search, 20% re-solve, 10% error log.
- **D27 <550:** xác suất 700 đã thấp; dừng toàn bộ topic mới và Q4, tập trung convert Q1–Q3.
- **D31 <650:** bỏ Q4 trong luyện tập; diệt lỗi lặp và tối ưu tốc độ ba câu đầu.

Nhánh Rescue không có nghĩa là bỏ cuộc. Nó tối đa hóa điểm bằng cách làm chắc phần có thể chuyển hóa trong thời gian còn lại.

## 6. Chiến thuật 120 phút

1. **0–5':** đọc nhanh cả bốn bài, ghi pattern/constraint, chọn thứ tự.
2. **5–25':** Q1; nếu quá 25' mà chưa gần AC, chuyển.
3. **25–60':** bài medium dễ nhất.
4. **60–95':** bài medium còn lại.
5. **95–115':** Q4 hoặc partial; nếu ba bài đầu chưa chắc, dùng thời gian này sửa chúng.
6. **115–120':** rà input rỗng/nhỏ, duplicate, boundary, overflow, reset state và submit.

Quy tắc chuyển bài: 10 phút không tạo thêm tiến triển quan sát được thì dừng, ghi trạng thái hiện tại và chuyển.

## 7. Việc phải làm ngay hôm nay

1. Chốt Python/Java/C++.
2. Học lại syntax đúng 45–60 phút, không sa vào xem cả khóa.
3. Làm D1: 181875 và 12918, mỗi bài cap 25 phút.
4. Với bài sai, xem gợi ý theo thang rồi code lại từ trang trắng.
5. Điền tracker. Không làm official mock hôm nay.

## 8. Tài nguyên chính thức

- [PCCP official overview](https://certi.programmers.co.kr/about/pccp)
- [Official sample/mock hub](https://certi.programmers.co.kr/about/sample)
- [Programmers Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit)
- [Stack/Queue kit](https://school.programmers.co.kr/learn/courses/30/parts/12081)
- [Python nhập môn miễn phí](https://school.programmers.co.kr/learn/courses/2/2-%EB%AC%B4%EB%A3%8C-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%9E%85%EB%AC%B8)

Nguyên tắc học dùng trong plan: retrieval practice, spaced re-solve D+1/D+7 và self-explanation thay vì chỉ đọc lại. Tham khảo: [Karpicke & Roediger, 2008](https://doi.org/10.1126/science.1152408), [Cepeda et al., 2006](https://pubmed.ncbi.nlm.nih.gov/16719566/), [Chi et al., 1989](https://doi.org/10.1207/s15516709cog1302_1).
