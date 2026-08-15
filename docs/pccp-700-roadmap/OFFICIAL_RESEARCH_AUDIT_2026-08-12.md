# PCCP research audit — live refresh 15/08/2026

> Giữ filename `OFFICIAL_RESEARCH_AUDIT_2026-08-12.md` để các link ổn định; ngày authoritative của nội dung là **15/08/2026**. Ngôn ngữ học: JavaScript. Ngày thi người học cung cấp: 12/09/2026.

File này là hồ sơ evidence, không phải lịch học. [`PCCP_700_MASTER_NAVIGATOR.md`](../../PCCP_700_MASTER_NAVIGATOR.md) vẫn là entrypoint duy nhất để quyết định hôm nay đọc/làm gì và lúc nào mở mock.

## 1. Kết luận điều hành

Audit hiện tại hỗ trợ chắc các kết luận sau:

1. PCCP hiện là bài thi code **4 câu/120 phút**, lệ phí niêm yết **50.000 KRW**, chọn một trong sáu ngôn ngữ được liệt kê gồm JavaScript; chứng chỉ có hiệu lực hai năm. Nguồn: [trang PCCP hiện hành](https://certi.programmers.co.kr/about/pccp).
2. Brochure công bố **năm lớp năng lực**, không chỉ một danh sách tên thuật toán: implementation; basic DSA; intermediate DSA; advanced DSA; và viết chương trình đúng, hiệu quả. Nguồn: [brochure chính thức](https://business.programmers.co.kr/static/business/certification_intro.pdf).
3. Thang PCCP có `LV.1–LV.5`; đạt từ 400/1.000. Mục tiêu 700 nằm trong `LV.3 (600–749)`, không phải LV.4.
4. Không tìm thấy dữ liệu công khai có chất lượng đủ để suy **tỷ lệ đỗ toàn bộ thí sinh**, **tần suất topic PCCP**, **trọng số cố định từng câu** hoặc quy đổi “x câu AC = y điểm”.
5. Review Hàn lặp lại ba rủi ro vận hành đáng tin ở mức workflow: đề/requirement dài và implementation nhiều ngoại lệ; sample pass không bảo đảm hidden correctness/efficiency; thứ tự khó cảm nhận thay đổi nên phải scan cả bốn câu.
6. Các kỳ được review có mix topic rất khác nhau. String, BFS/DFS, priority queue/heap, binary search, backtracking và DP đều đáng cover vì syllabus/benchmark; **không có cơ sở gán xác suất xuất hiện cho từng topic**.
7. Làm nhiều bài thô không tự động tạo điểm. Curriculum phải đo contract, bound, proof, edge case, timed submit và postmortem, không chỉ đếm số bài.

Hệ quả: bộ tài liệu giữ breadth theo syllabus chính thức, nhưng ưu tiên implementation/String/correctness trước; luyện bốn mock/past set black-box; dùng một protocol thời gian; và khóa các rủi ro JavaScript bằng template/test cụ thể.

## 2. Thứ bậc nguồn và quy tắc suy luận

| Tầng | Nguồn | Được phép xác nhận | Không được phép suy ra |
|---|---|---|---|
| A — primary official | PCCP current page, Candidate Guide, brochure, Programmers School/UI guide | Cấu trúc, lệ phí, syllabus, level, quy định thi, hành vi submit, metadata course/bài | Topic kỳ tới hoặc trọng số không được công bố |
| B — official education | PCCP preparation course, Kit, sample/past/explanation course, education hub | Programmers chọn nội dung nào để dạy/luyện; inventory public | Xác suất PCCP từ metadata coding-test chung |
| C — institutional benchmark | Curriculum do Grepp/đại học hoặc đơn vị đào tạo công bố | Một chương trình nghiêm túc cover gì và tổ chức mock ra sao | Syllabus chính thức mới, pass rate dân số hoặc topic frequency |
| D — repeated firsthand | Review tiếng Hàn của người tự nhận đã thi | Rủi ro thao tác, đọc đề, time management, hidden-result gap; topic của đúng session họ kể | Cơ chế chấm, breakdown ẩn, đại diện thống kê cho mọi kỳ |
| E — single anecdote/marketing | Một blog, quảng cáo khóa học, summary không có mẫu | Gợi ý để tìm thêm nguồn | Fact kỳ thi, hiệu quả khóa học hoặc chiến lược bắt buộc |

Quy tắc audit:

- Fact động dùng trang official hiện hành; brochure dùng cho syllabus/level ổn định.
- Một review không được thêm CORE hay loại topic. Chỉ giữ tín hiệu workflow khi lặp lại hoặc phù hợp với cơ chế official.
- Topic được người viết tự gắn nhãn được ghi là “self-reported”, không nâng thành taxonomy chính thức.
- Không trộn kỳ thi đặc biệt/group registration với kỳ PCCP công khai định kỳ.
- “Không tìm thấy” nghĩa là negative finding của lần rà soát này, không phải chứng minh tuyệt đối rằng dữ liệu không tồn tại ở nơi không công khai.

## 3. Dữ kiện chính thức hiện hành

### 3.1 Cấu trúc, lệ phí và ngôn ngữ

| Dữ kiện | Trạng thái 15/08/2026 | Nguồn |
|---|---|---|
| Thời lượng | 120 phút | [PCCP current page](https://certi.programmers.co.kr/about/pccp) |
| Số câu | 4 câu code | [PCCP current page](https://certi.programmers.co.kr/about/pccp), [brochure](https://business.programmers.co.kr/static/business/certification_intro.pdf) |
| Lệ phí niêm yết | 50.000 KRW | [PCCP current page](https://certi.programmers.co.kr/about/pccp) |
| Ngôn ngữ liệt kê | Python, Java, JavaScript, C++, C, C#; chọn một | [PCCP current page](https://certi.programmers.co.kr/about/pccp), [brochure](https://business.programmers.co.kr/static/business/certification_intro.pdf) |
| Tổng điểm/đạt | 1.000 điểm; đạt từ 400 | [brochure](https://business.programmers.co.kr/static/business/certification_intro.pdf) |
| Hiệu lực chứng chỉ | 2 năm | [PCCP current page](https://certi.programmers.co.kr/about/pccp) |

Trang live có một đoạn prose cũ không khớp số lượng ngôn ngữ, nhưng danh sách cụ thể và brochure đều có JavaScript. Curriculum dựa vào danh sách cụ thể, không suy từ con số prose đó.

### 3.2 Thang level chính thức

| Level | Điểm |
|---:|---:|
| `LV.1` | 400–499 |
| `LV.2` | 500–599 |
| `LV.3` | 600–749 |
| `LV.4` | 750–899 |
| `LV.5` | 900–1.000 |

Nguồn: [brochure chính thức](https://business.programmers.co.kr/static/business/certification_intro.pdf). Con số 700 vì vậy thuộc LV.3. “700+” là mục tiêu cá nhân của curriculum, không phải một ngưỡng pass riêng do PCCP đặt tên.

### 3.3 Năm lớp syllabus

| Lớp | Nội dung được công bố |
|---:|---|
| 01 | Basic program implementation: thỏa đúng điều kiện và requirement |
| 02 | String, Array, Greedy, Sort, v.v. |
| 03 | Stack, Queue, Deque, Hash, Binary Search, DFS, BFS, v.v. |
| 04 | Graph, Tree, Heap, Dynamic Programming, v.v. |
| 05 | Chọn nhanh cấu trúc/thuật toán phù hợp; viết chương trình đúng, không lỗi và hiệu quả |

Nguồn trực tiếp: [Programmers Certification Introduction](https://business.programmers.co.kr/static/business/certification_intro.pdf). Từ `등`/“v.v.” làm danh sách này thành phạm vi minh họa, không phải taxonomy đóng. Ngược lại, không được bỏ một mục được nêu đích danh chỉ vì nó không xuất hiện trong một review hoặc public course part.

### 3.4 Candidate operations và submit

[Candidate Guide hiện hành](https://certi.programmers.co.kr/guide/main?tab=entrance) xác nhận:

- được chuẩn bị một tờ A4 và bút để ghi trong thi;
- external IDE không được phép;
- có thể vào từ `T−60`, phải vào chậm nhất `T−20`; sau cutoff không được rời chỗ, kể cả cần chuẩn bị đi vệ sinh;
- official pre-test mở từ `T−7` tới `T−1` để kiểm screen/keyboard/mouse, webcam/internet, mobile camera và upload ID.

Curriculum dùng rehearsal one-screen và yêu cầu xử lý màn hình phụ đúng guide live. Không biến cheat sheet của repo thành tài liệu được mang vào phòng.

[Coding-test UI guide](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a) phân biệt `Run Test` với `Submit Code`: muốn được chấm phải bấm submit; code chưa submit không được chấm. Vì vậy protocol kiểm `Submit Code` cho **từng câu**, không dựa vào auto-submit khi hết giờ.

Quy định vận hành có thể đổi nhanh hơn syllabus. Candidate Guide của lượt thi cụ thể luôn thắng blog cũ, university notice cũ và bản snapshot này.

## 4. Hệ sinh thái học official và giới hạn của nó

### 4.1 Khóa luyện PCCP 14760

[Khóa PCCP của Programmers](https://school.programmers.co.kr/learn/courses/14760) công khai outline gồm Hashing, Array implementation, Two pointers, Sorting & Greedy, DFS, BFS, Graph, rồi hai practice test bốn câu và review. Đây là evidence mạnh cho chu trình:

```text
học DSA → giải practice → mock bốn câu → review requirement/complexity → repair
```

Giới hạn:

- khóa dùng Python và có nội dung trả phí;
- public outline không phải toàn bộ syllabus: Heap, Binary Search và DP vẫn xuất hiện trong brochure dù không có part riêng;
- không vượt paywall hoặc tự nhận nội dung lesson private là đã audit.

### 4.2 Algorithm Practice Kit

[Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit) hiện có 10 nhóm/47 bài được repo index đầy đủ. Metadata “hay gặp/hay sai” là cho coding test trên Programmers nói chung; **không phải frequency table của PCCP**. Việc giữ 47/47 giúp không rơi mất family official, nhưng không có nghĩa phải cày cả Kit theo thứ tự.

### 4.3 Mock, past course và explanation

| Tài nguyên | Fact public có thể xác nhận | Giới hạn sử dụng |
|---|---|---|
| [Course 15008](https://school.programmers.co.kr/learn/courses/15008) | Free Official Mock 1, public metadata có bốn coding exercises | 120-minute timer là curriculum-imposed; không tuyên bố public course tự có timer |
| [Course 15009](https://school.programmers.co.kr/learn/courses/15009) | Free Official Mock 2, public metadata có bốn coding exercises | Giữ honor-system spoiler boundary |
| [Course 20847](https://school.programmers.co.kr/learn/courses/20847), [20848](https://school.programmers.co.kr/learn/courses/20848) | Legacy course quảng bá bốn exercises | Public outline chỉ lộ ba post-test lessons; optional, không ghép ba lesson thành full mock |
| [Past course 19344](https://school.programmers.co.kr/learn/courses/19344) | Course gom một phần public past problems; trang được cập nhật đầu 2026 | Public outline không chứng minh chứa toàn bộ mọi past set |
| [Explanation course 24542](https://school.programmers.co.kr/learn/courses/24542) | Free official explanation bằng Python | Review-only sau attempt, không dùng để phá unseen set |
| [Education hub](https://certi.programmers.co.kr/education-info/education) | Tài nguyên/sách được PCCP giới thiệu | Recommendation/index, không phải pass-rate evidence |

Bốn set chính trong Navigator là hai free official mocks và hai public past sets. Chúng là honor-system boundary, không phải access control kỹ thuật; tên/link vẫn tồn tại trong raw bank để audit.

## 5. Tổng hợp review tiếng Hàn của người đã thi

### 5.1 Tín hiệu lặp lại đủ mạnh để đổi workflow

#### Requirement dài và implementation là phần thi thật

- [Sooom](https://soooom.tistory.com/488) mô tả statement dài, implementation nặng và môi trường không có autocomplete như IDE quen dùng.
- [Review 03/2024](https://jaeochoii.github.io/PCCP/) ghi nhận bài có thể trông như graph/algorithm nhưng bottleneck thực tế là hiểu requirement và triển khai ngoại lệ.
- [Review LV.5 năm 2025](https://junju404.tistory.com/28) tiếp tục cho tín hiệu đọc dài/implementation, dù level cá nhân không biến nhận xét thành fact cho mọi kỳ.

Kết luận hợp lệ: luyện đọc Korean requirement, parse contract, event order, mutation và boundary là bắt buộc. Kết luận không hợp lệ: “mọi kỳ chắc chắn có x câu implementation”.

#### Sample/visible pass không chứng minh hidden correctness

Khoảng cách giữa cảm giác “đã giải” và level/điểm cuối lặp ở nhiều nguồn: [Jost](https://jost-do-it.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%A8%B8%EC%8A%A4-%EC%BD%94%EB%94%A9%EC%A0%84%EB%AC%B8%EC%97%AD%EB%9F%89%EC%9D%B8%EC%A6%9D-PCCP-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0), [Ddingji](https://ddingji.tistory.com/104), [review LV.3](https://dkrnq.tistory.com/53), [Xxilliant](https://xxilliant.tistory.com/379), [Bits & Bytes/LV.4](https://juhonamnam.github.io/blog/post/10/) và [JS review 07/2024](https://khj930410.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%A8%B8%EC%8A%A4-PCCP-JS-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0).

Người viết thường đoán edge case hoặc efficiency là nguyên nhân. Không có breakdown official nên diagnosis cụ thể vẫn là suy đoán; điều audit được phép rút ra chỉ là sample pass/confidence không thay thế proof, bound và revealing test.

#### Scan cả bốn câu; thứ tự khó không ổn định

- [Jaeochoii](https://jaeochoii.github.io/PCCP/) mô tả thứ tự cảm nhận không tăng đều và lý do chọn easy-first.
- [Review LV.2](https://love-every-moment.tistory.com/94) kể việc kẹt khoảng 50 phút ở một câu.
- [Cbkpar](https://cbkpar.tistory.com/120) nhấn mạnh skip rồi quay lại thay vì chìm trong một bài.

Vì vậy curriculum scan cả bốn ở phút 0–5 và dùng cutoff. Đây là chiến thuật từ repeated experience, không phải tuyên bố câu 4 dễ/khó hơn theo thiết kế official.

#### Khối lượng bài thô không đủ

[Một review 2025](https://heedb.tistory.com/70) tự báo đã làm khoảng 100 bài Level 2 và 30 bài Level 1 nhưng kết quả vẫn LV.1. Một trường hợp không chứng minh quan hệ nhân quả, nhưng đủ bác bỏ lời hứa “đạt số lượng X thì chắc đạt level Y”. Curriculum vì vậy chỉ tính bài xong khi có contract, complexity, edge cases, submit thật và recode sau hint.

### 5.2 Topic thay đổi theo session — không biến anecdote thành frequency

Các nhãn dưới đây là mô tả của tác giả, không phải topic tag do PCCP công bố:

| Review/session | Topic tác giả mô tả |
|---|---|
| [Door of Tabris](https://door-of-tabris.tistory.com/entry/PCCP-5%ED%9A%8C-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0%ED%8C%8C%EC%9D%B4%EC%8D%AC-LV3) | String/sort/graph/BFS |
| [Jjjjqqq](https://jjjjqqq.tistory.com/53?category=1061752) | Sort/permutation/implementation/priority queue |
| [Jaeochoii](https://jaeochoii.github.io/PCCP/) | Math, String+Hash, implementation và một bài tác giả phỏng đoán DP |
| [JavaScript LV.3](https://khj930410.tistory.com/entry/PCCPJavaScript-Lv3-%ED%9B%84%EA%B8%B0) | Data structures, 2D implementation, BFS |
| [Say8751](https://say8751.tistory.com/26) | Hai implementation, stack, BFS |

Điều bảng này chứng minh là **variance**, không phải tỷ lệ. String, BFS/graph và implementation xuất hiện trong một số bản kể; priority queue/heap xuất hiện ở bản khác. DFS, Binary Search, Backtracking và DP được syllabus/benchmark chính thức hoặc institutional cover, nhưng không có dataset để xếp xác suất. Curriculum giữ tất cả các family đó và không dựng bảng phần trăm.

### 5.3 Special exam và cohort địa phương phải tách riêng

[Sophon](https://sophon.tistory.com/124) nói rõ review của họ là một **special exam**, với topic tự mô tả khác regular monthly. Dữ liệu đó không được nhập vào “regular session topic mix”.

[Thông báo hỗ trợ thi của Pukyong National University](https://www.pknu.ac.kr/main/163?action=view&no=725559) áp dụng cho sinh viên/người học của trường, group registration và quyền lợi địa phương; trang còn nêu một composition cụ thể cho lượt đó. Đây là fact hành chính của cohort, không phải cam kết cấu trúc cho mọi kỳ PCCP công khai.

Mọi pass count từ lớp/trường/special event phải có denominator, điều kiện tuyển người, ngày và loại exam trước khi dùng. Không có đủ các trường đó thì chỉ ghi local outcome, không gọi là PCCP population pass rate.

## 6. Rủi ro JavaScript cần curriculum khóa riêng

| Rủi ro | Vì sao quan trọng | Quyết định curriculum | Nguồn |
|---|---|---|---|
| Default `sort()` | Number bị so theo chuỗi nếu thiếu comparator; string theo code-unit order | Numeric sort luôn `(a,b)=>a-b`; comparator/tie viết trước code | [MDN sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [JS preparation note](https://s-ryung.tistory.com/100) |
| Integer precision | `number` chỉ bảo đảm integer tới `MAX_SAFE_INTEGER`; intermediate có thể mất exactness trước `%` cuối | Tính bound; modulo mỗi transition khi proof cho phép; BigInt cho answer space vượt safe integer | [MDN MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER), [MDN BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), [JS preparation note](https://s-ryung.tistory.com/100) |
| Recursion depth | DFS/Euler/tree sâu có thể ném `RangeError` | Ưu tiên iterative khi depth theo input lớn; test sát bound | [MDN too much recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion), [JS preparation note](https://s-ryung.tistory.com/100) |
| Queue bằng `shift()` | Mỗi lần xóa đầu phải dịch index, dễ làm BFS thành chậm | Array + `head` index | [MDN shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) |
| Matrix `fill` alias | Fill bằng cùng array/object chia sẻ reference giữa hàng | `Array.from({length: rows}, () => ...)` | [MDN fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill), [MDN Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) |
| API collection | `Map.size`, `Set.size` và heap canonical dùng property; lẫn `.size()` gây lỗi | Một heap API `.size` duy nhất toàn repo | [MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) |

Không tìm thấy công bố official về version Node.js cụ thể cho lượt thi. Vì vậy code tránh dependency ngoài/cú pháp quá mới và phải chạy official pre-test; không tự khẳng định runtime version.

## 7. Benchmark curriculum đại học/instructor

### Korea University 2026 × Grepp

[PDF curriculum PCCP 20 giờ năm 2026](https://koreanstudies.korea.ac.kr/bbs/software/804/177833/download.do) do Grepp lập cho Korea University nhấn mạnh quy trình `đọc đề → chọn cấu trúc chính → áp dụng thuật toán tối ưu`, rồi cover:

- String, Stack, Queue;
- Hash/Set/Map, Deque, Priority Queue/Heap;
- Prefix Sum, Two Pointers, Greedy;
- Recursion, DFS, BFS, Graph;
- Dijkstra, Backtracking, Dynamic Programming;
- final mock, giải thích và self-diagnosis.

Đây là benchmark mạnh cho breadth và cách dạy problem interpretation/algorithm selection/efficient implementation. Nó dùng Python, 20 giờ và cohort sinh viên phần mềm, nên không phải proof rằng mọi topic xuất hiện trong exam hoặc phù hợp nguyên xi với người học JavaScript.

### Yeungnam PCCP camp

[Curriculum camp của Yeungnam](https://aisw2.yu.ac.kr/front/index.php?act=lecture_result_view&allLec=&bstart=&cate=&dateType=&g_page=program&leCode=44&lgCode=1&m_page=program03&siteCode=TOL&slDateE=&slDateS=) cover String, Array, Sorting/Searching gồm Binary Search, complexity, Greedy, Stack, Queue, Hash, DFS/BFS và hai mock.

Hai benchmark độc lập cùng ưu tiên interpretation, complexity, cấu trúc nền và mock/review thay vì “cày topic hot”. Sự khác nhau về breadth cũng củng cố việc dùng syllabus official làm floor và dùng transfer/gate để điều chỉnh, không sao chép duy nhất một giáo án.

## 8. Negative findings và claim bị loại

| Claim | Kết quả audit 15/08/2026 | Cách xử lý |
|---|---|---|
| PCCP population pass rate | Không tìm thấy dataset authoritative có numerator, denominator và điều kiện cohort | Không công bố tỷ lệ đỗ |
| Topic occurrence/frequency | Không có dataset official/credible; Kit chỉ là coding-test-wide metadata | Không gán phần trăm hay đoán đề |
| Fixed question weights, ví dụ `200/300/300/200` | Chỉ thấy dạng “theo tôi biết” ở nguồn đơn lẻ; không có corroboration official | Không dùng để lập chiến thuật điểm |
| “Ba câu đúng = 700/750” | Không được official xác nhận; hidden correctness và partial làm suy luận càng yếu | Không quy đổi AC sang score |
| Breakdown hidden test/efficiency của từng thí sinh | Review chỉ suy đoán từ kết quả cuối | Ghi root cause là hypothesis cho tới khi có revealing test |
| Runtime Node.js cụ thể | Không tìm thấy official current declaration | Pre-test và code portable |
| Topic của special/local exam đại diện regular monthly | Sai boundary nguồn | Tách hoàn toàn special/cohort khỏi regular evidence |
| Course completion hoặc raw problem count bảo đảm pass | Không có controlled evidence | Đo mastery bằng timed unseen + proof + postmortem |

Naver/portal page bị robots hoặc nội dung không truy cập được không được dùng như evidence chỉ vì snippet tìm kiếm. Marketing claim về “pass rate lớp học” bị hạ tầng E nếu thiếu mẫu/denominator/định nghĩa pass.

## 9. Quyết định curriculum rút ra từ audit

1. **Một entrypoint:** Navigator là route duy nhất; audit, handbook, notebook và bank chỉ là linked layers.
2. **Sprint 28 ngày thực tế:** khóa ngày mock/taper, bỏ STRETCH rồi TRANSFER nếu trễ; không kéo dài lịch bằng raw volume.
3. **Implementation + String bắt buộc:** giữ contract/event-order/mutation/parsing; SR002 đóng chunk/run, phần dư và long requirement.
4. **Breadth theo năm lớp official:** Hash/sort/window; stack/queue/heap; search/backtracking/greedy; BFS/DFS/graph/tree/Dijkstra; DP cơ bản. Không bỏ Binary Search/Heap/DP chỉ vì public course không có part riêng.
5. **JavaScript safety là gate:** numeric comparator, queue-head, independent matrix rows, one heap `.size`, BigInt/precision check và iterative traversal khi depth lớn.
6. **Definition of done dựa vào correctness:** contract, bound, brute/bottleneck, state/invariant/transition, complexity và ít nhất ba revealing edge cases trước khi bài được tính xong.
7. **Bốn mock/past set honor-locked:** ghi start/submit/complexity/confidence trước result; postmortem root cause + revealing test + prevention rule.
8. **Một protocol 120 phút:** `0–5 / 5–25 / 25–55 / 55–90 / 90–102 / 102–116 / 116–120`; scan đủ bốn và kiểm submit từng câu.
9. **Phân biệt fact với curriculum-imposed:** timer cho course 15008/15009, cutoff luyện bài và CORE/TRANSFER/STRETCH là quyết định repo, không tự nhận tính năng/quy tắc official.
10. **Candidate rehearsal:** A4 trắng + bút, không external IDE/search, T−60/T−20, không rời chỗ sau cutoff, pre-test T−7..T−1, webcam/mobile/ID và one-screen.

## 10. Source index trực tiếp

### Primary/official

- [PCCP current page](https://certi.programmers.co.kr/about/pccp)
- [PCCP range tab](https://certi.programmers.co.kr/about/pccp?tab=range)
- [Official certification brochure](https://business.programmers.co.kr/static/business/certification_intro.pdf)
- [Candidate Guide](https://certi.programmers.co.kr/guide/main?tab=entrance)
- [Coding-test UI guide](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a)
- [Sample hub](https://certi.programmers.co.kr/about/sample)
- [PCCP preparation course 14760](https://school.programmers.co.kr/learn/courses/14760)
- [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit)
- [Public past course 19344](https://school.programmers.co.kr/learn/courses/19344)
- [Official explanation course 24542](https://school.programmers.co.kr/learn/courses/24542)
- [Education hub](https://certi.programmers.co.kr/education-info/education)

### Institutional benchmark

- [Korea University 2026 PCCP curriculum PDF](https://koreanstudies.korea.ac.kr/bbs/software/804/177833/download.do)
- [Yeungnam PCCP camp curriculum](https://aisw2.yu.ac.kr/front/index.php?act=lecture_result_view&allLec=&bstart=&cate=&dateType=&g_page=program&leCode=44&lgCode=1&m_page=program03&siteCode=TOL&slDateE=&slDateS=)
- [Pukyong National University local PCCP/PCCE support notice](https://www.pknu.ac.kr/main/163?action=view&no=725559)

### Firsthand/community operational evidence

- [Sooom](https://soooom.tistory.com/488), [Jost](https://jost-do-it.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%A8%B8%EC%8A%A4-%EC%BD%94%EB%94%A9%EC%A0%84%EB%AC%B8%EC%97%AD%EB%9F%89%EC%9D%B8%EC%A6%9D-PCCP-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0), [Ddingji](https://ddingji.tistory.com/104), [Dkrnq](https://dkrnq.tistory.com/53), [Xxilliant](https://xxilliant.tistory.com/379), [Juhonamnam](https://juhonamnam.github.io/blog/post/10/)
- [Jaeochoii](https://jaeochoii.github.io/PCCP/), [Love every moment](https://love-every-moment.tistory.com/94), [Cbkpar](https://cbkpar.tistory.com/120), [Heedb](https://heedb.tistory.com/70)
- [Door of Tabris](https://door-of-tabris.tistory.com/entry/PCCP-5%ED%9A%8C-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0%ED%8C%8C%EC%9D%B4%EC%8D%AC-LV3), [Jjjjqqq](https://jjjjqqq.tistory.com/53?category=1061752), [JavaScript LV.3 review](https://khj930410.tistory.com/entry/PCCPJavaScript-Lv3-%ED%9B%84%EA%B8%B0), [Say8751](https://say8751.tistory.com/26)
- [Sophon special exam](https://sophon.tistory.com/124), [JavaScript preparation note](https://s-ryung.tistory.com/100), [environment rehearsal review](https://radiant515.tistory.com/736)

## Freshness

Snapshot này được refresh ngày **15/08/2026**. Re-audit Candidate Guide, tryout/course metadata và public past inventory ngay trước kỳ thi hoặc khi dùng repo cho một exam date khác. Các kết luận syllabus/level từ brochure ổn định hơn; lệ phí, UI, thiết bị, lịch và course inventory là dữ liệu động.
