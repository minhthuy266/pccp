# Nguồn đã kiểm chứng

**Ngày truy cập:** 30/07/2026  
**Kiểm tra liên kết:** 85/85 URL trả HTTP 200 khi kiểm tra tự động ngày 30/07/2026. Một số trang có thể yêu cầu đăng nhập/enroll để chạy code dù URL vẫn truy cập được.  
**Quy tắc sử dụng:** nguồn chính thức của Programmers/PCCP quyết định các dữ kiện về kỳ thi; MDN quyết định các cảnh báo JavaScript; nguồn cộng đồng chỉ dùng để tham khảo cách vận hành và được ghi rõ là không chính thức.

## Kết luận kiểm chứng quan trọng

- Danh sách môn thi hiện hành và PDF chính thức xác nhận PCCP có 4 câu code, 120 phút, chọn 1 trong 6 ngôn ngữ gồm JavaScript; tổng 1.000 điểm, đỗ từ 400. Mốc 700 thuộc **LV.3 (600–749)**; LV.4 bắt đầu từ 750. Một số prose cũ trên trang chính thức vẫn ghi “4 ngôn ngữ”, nhưng JavaScript xuất hiện nhất quán và danh sách cụ thể/PDF được ưu tiên.
- Phạm vi chính thức nêu ví dụ: implementation; String, Array, Greedy, Sort; Stack, Queue, Deque, Hash, Binary Search, DFS, BFS; Graph, Tree, Heap, DP; cùng khả năng chọn giải pháp đúng và hiệu quả. Từ “등/…” cho thấy đây là danh sách ví dụ, không phải danh mục đóng.
- Không tìm thấy nguồn chính thức công bố trọng số cố định cho từng câu, công thức điểm theo test case, hay bảo đảm “giải ba câu = 700/750”. Các con số như 200/300/300/200 chỉ là lời truyền miệng và không được dùng làm sự thật trong bộ tài liệu.
- Không tìm thấy trang chính thức công bố phiên bản Node.js cụ thể cho kỳ thi. Template dùng cú pháp JavaScript phổ biến, không phụ thuộc thư viện ngoài; người học phải chạy pre-test để kiểm tra môi trường thực tế.
- Lịch công khai tại thời điểm truy cập không hiển thị kỳ thi thường lệ ngày 05/09/2026. Lộ trình vẫn dùng ngày thi do người học cung cấp; giả định đây có thể là lịch riêng của trường/doanh nghiệp hoặc lượt chưa hiển thị công khai.
- Hai course mock chính thức có đủ 4 coding exercise mỗi course và được cập nhật 15/01/2026. Tám lesson mock không công bố Level chính thức; tracker ghi `N/A`, không tự gán Level.

## 37 nguồn nền

| # | Tên nguồn | URL | Loại nguồn | Nội dung được nguồn hỗ trợ | Truy cập |
|---:|---|---|---|---|---|
| 1 | PCCP 소개 | https://certi.programmers.co.kr/about/pccp | Chính thức – PCCP | Cấu trúc, ngôn ngữ, thời gian, cách thi, tiêu chuẩn cơ bản | 30/07/2026 |
| 2 | PCCP 출제 범위 | https://certi.programmers.co.kr/about/pccp?tab=range | Chính thức – PCCP | Phạm vi kiến thức và năng lực được đánh giá | 30/07/2026 |
| 3 | Programmers 인증시험 소개서 | https://business.programmers.co.kr/static/business/certification_intro.pdf | Chính thức – Programmers (PDF) | 4 câu/120 phút/6 ngôn ngữ; syllabus; mốc điểm và cấp độ; cách thi. Chỉ dùng dữ kiện cấu trúc, không dùng lịch 2025 trong PDF cho năm 2026 | 30/07/2026 |
| 4 | 정기시험/tryouts | https://certi.programmers.co.kr/tryouts | Chính thức – PCCP, động | Kiểm tra lịch thi công khai hiện hành | 30/07/2026 |
| 5 | Published tryouts API | https://certi.programmers.co.kr/api/v1/tryouts/published/ | Chính thức – PCCP API, động | Đối chiếu ngày/giờ các kỳ thi công khai; kiểm tra giả định 05/09/2026 | 30/07/2026 |
| 6 | PCCP sample | https://certi.programmers.co.kr/about/sample | Chính thức – PCCP | Điểm vào các tài nguyên mẫu | 30/07/2026 |
| 7 | Programmers courses | https://school.programmers.co.kr/learn/courses/ | Chính thức – Programmers School | Danh mục khóa học được rà soát | 30/07/2026 |
| 8 | PCCP 모의고사 1회 | https://school.programmers.co.kr/learn/courses/15008 | Chính thức – Programmers School | Mock 1 có 4 bài, miễn phí; lesson P09–P12 | 30/07/2026 |
| 9 | PCCP 모의고사 2회 | https://school.programmers.co.kr/learn/courses/15009 | Chính thức – Programmers School | Mock 2 có 4 bài, miễn phí; lesson P13–P16 | 30/07/2026 |
| 10 | PCCP 기출문제 | https://school.programmers.co.kr/learn/courses/19344 | Chính thức – Programmers School | Course gom một phần bài PCCP công khai; không xem là danh sách đầy đủ cả 8 bài | 30/07/2026 |
| 11 | PCCP 기출문제 해설 강의 (Python) | https://school.programmers.co.kr/learn/courses/24542 | Chính thức – Programmers School | Khóa giải thích miễn phí; chỉ xem sau khi tự giải bằng JavaScript | 30/07/2026 |
| 12 | 프로그래머스와 함께하는 PCCP 합격 대비 : 실전 모의고사 해설 강의(Python편) | https://school.programmers.co.kr/learn/courses/14760 | Chính thức – Programmers School, trả phí | Tài nguyên bổ sung bằng Python; không phải lựa chọn chính cho kế hoạch JavaScript 37 ngày | 30/07/2026 |
| 13 | Hello, JavaScript: 자바스크립트 입문 | https://school.programmers.co.kr/learn/courses/3 | Chính thức – Programmers School | 2h16/35 bài; chọn biến, kiểu, string, array, condition, loop, function; hoãn môi trường/comment/`this`/closure ở lượt đầu | 30/07/2026 |
| 14 | 코딩테스트 광탈 방지 A to Z : JavaScript | https://school.programmers.co.kr/learn/courses/13213 | Chính thức – Programmers School, trả phí | 4h35/15 bài; DSA bằng JS; yêu cầu biết ES6; chọn stack/queue/hash/heap/sort/DFS/BFS/greedy | 30/07/2026 |
| 15 | 코딩테스트 고득점 Kit | https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit | Chính thức – Programmers School | Bộ pattern được Programmers tuyển chọn từ dạng hay gặp/hay sai; nguồn của một phần bài bổ sung, phần còn lại từ kho chính thức | 30/07/2026 |
| 16 | 코딩 테스트 합격자 되기: 자바스크립트 편 | https://product.kyobobook.co.kr/detail/S000213641007 | Nhà sách/nhà xuất bản; sách được trang chứng chỉ giới thiệu | Sách JavaScript coding test tùy chọn; không bắt buộc trong 37 ngày | 30/07/2026 |
| 17 | MDN — Array.prototype.fill() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill | Kỹ thuật – MDN | `fill` với object/array dùng cùng reference; cảnh báo tạo matrix | 30/07/2026 |
| 18 | MDN — Array.prototype.sort() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort | Kỹ thuật – MDN | Sort mặc định theo chuỗi và mutate; comparator số | 30/07/2026 |
| 19 | MDN — Array.prototype.shift() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift | Kỹ thuật – MDN | `shift()` mutate và dịch index; cơ sở khuyến nghị queue-head | 30/07/2026 |
| 20 | MDN — Map | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map | Kỹ thuật – MDN | Semantics và API của `Map` | 30/07/2026 |
| 21 | MDN — Set | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set | Kỹ thuật – MDN | Semantics, uniqueness và membership của `Set` | 30/07/2026 |
| 22 | MDN — Array.from() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from | Kỹ thuật – MDN | Tạo matrix với callback sinh hàng độc lập | 30/07/2026 |
| 23 | MDN — Array.prototype.slice() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice | Kỹ thuật – MDN | Shallow copy và đoạn array | 30/07/2026 |
| 24 | MDN — Number.MAX_SAFE_INTEGER | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER | Kỹ thuật – MDN | Giới hạn số nguyên an toàn của `number` | 30/07/2026 |
| 25 | MDN — BigInt | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt | Kỹ thuật – MDN | Khi cần số nguyên lớn; không trộn trực tiếp `number` và `bigint` | 30/07/2026 |
| 26 | MDN — Too much recursion | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion | Kỹ thuật – MDN | Recursion sâu có thể tràn call stack; ưu tiên iterative DFS khi độ sâu lớn | 30/07/2026 |
| 27 | 부경대학교 PCCP 시험 안내 | https://www.pknu.ac.kr/main/163?action=view&no=725559 | Tổ chức giáo dục – hướng dẫn một kỳ thi cụ thể | Kinh nghiệm hành chính: submit từng câu; phải ưu tiên hướng dẫn của lượt thi riêng | 30/07/2026 |
| 28 | PCCP 시험 후기 — Sophon | https://sophon.tistory.com/124 | Cộng đồng, không chính thức | Trải nghiệm thi, hidden/efficiency test và phân bổ thời gian; không dùng để suy ra công thức điểm | 30/07/2026 |
| 29 | PCCP 후기 — heedb | https://heedb.tistory.com/70 | Cộng đồng, không chính thức | Trải nghiệm thi 2025; sự khác nhau giữa sample/visible test và kết quả đầy đủ | 30/07/2026 |
| 30 | PCCP 후기 — xxilliant | https://xxilliant.tistory.com/379 | Cộng đồng, không chính thức | Chiến thuật chọn bài và kiểm tra case biên | 30/07/2026 |
| 31 | PCCP JS 시험 후기 | https://khj930410.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-PCCP-JS-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0 | Cộng đồng, không chính thức | Trải nghiệm thi bằng JavaScript; không coi ước lượng điểm từng câu là chính thức | 30/07/2026 |
| 32 | PCCP JavaScript LV3 후기 | https://khj930410.tistory.com/entry/PCCPJavaScript-Lv3-%ED%9B%84%EA%B8%B0 | Cộng đồng, không chính thức | Kinh nghiệm ôn/làm bài JS và kết quả cá nhân | 30/07/2026 |
| 33 | PCCP 후기 — jaeochoii | https://jaeochoii.github.io/PCCP/ | Cộng đồng, không chính thức | Trải nghiệm chuẩn bị và thi; nguồn đối chiếu chiến thuật | 30/07/2026 |
| 34 | PCCP 시험 후기 — cbkpar | https://cbkpar.tistory.com/120 | Cộng đồng, không chính thức | Trải nghiệm test case/timeout; không dùng làm quy tắc chấm điểm | 30/07/2026 |
| 35 | PCCP log — AI Bio | https://www.ai-bio.info/blog/2023-04-pccp-log | Cộng đồng, không chính thức | Trải nghiệm kỳ thi sớm; nguồn lịch sử, độ ưu tiên thấp hơn nguồn hiện hành | 30/07/2026 |
| 36 | PCCP 후기 — juhonamnam | https://juhonamnam.github.io/blog/post/10/ | Cộng đồng, không chính thức | Kinh nghiệm đọc đề, làm bài và quản lý thời gian; không xác nhận cơ chế điểm | 30/07/2026 |
| 37 | PCCP 교육/도서 안내 | https://certi.programmers.co.kr/education-info/education | Chính thức – PCCP | Danh mục giáo dục/sách được PCCP giới thiệu; cơ sở kiểm tra tài nguyên JavaScript chuyên biệt | 30/07/2026 |

## 48 trang bài tập đã kiểm tra

Mỗi URL dưới đây là trang bài chính thức của Programmers. Trang chính thức trực tiếp hỗ trợ **mô tả, constraints và Level nếu có**. Pattern, nhóm ưu tiên, ngân sách thời gian và rủi ro hidden test trong tracker là **phân tích của tài liệu**, không phải metadata chính thức. Riêng P09–P16, course mock không công bố Level nên tracker giữ `N/A`.

| Bài | URL | Loại nguồn | Nội dung được hỗ trợ | Truy cập |
|---|---|---|---|---|
| P01 — Băng bó | https://school.programmers.co.kr/learn/courses/30/lessons/250137?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P02 — Khai thác dầu | https://school.programmers.co.kr/learn/courses/30/lessons/250136?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P03 — Đồng hồ analog | https://school.programmers.co.kr/learn/courses/30/lessons/250135?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P04 — Di chuyển xe kéo | https://school.programmers.co.kr/learn/courses/30/lessons/250134?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P05 — Trình phát video | https://school.programmers.co.kr/learn/courses/30/lessons/340213?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P06 — Thử thách game xếp hình | https://school.programmers.co.kr/learn/courses/30/lessons/340212?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P07 — Tìm nguy cơ va chạm | https://school.programmers.co.kr/learn/courses/30/lessons/340211?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P08 — Khôi phục biểu thức | https://school.programmers.co.kr/learn/courses/30/lessons/340210?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P09 — Chữ cái cô lập | https://school.programmers.co.kr/learn/courses/15008/lessons/121683 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P10 — Đại hội thể thao | https://school.programmers.co.kr/learn/courses/15008/lessons/121684 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P11 — Quy luật di truyền | https://school.programmers.co.kr/learn/courses/15008/lessons/121685 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P12 — Hệ điều hành | https://school.programmers.co.kr/learn/courses/15008/lessons/121686 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P13 — Robot thực hành | https://school.programmers.co.kr/learn/courses/15009/lessons/121687 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P14 — Đào tạo nhân viên mới | https://school.programmers.co.kr/learn/courses/15009/lessons/121688 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P15 — Mở rộng quán cà phê | https://school.programmers.co.kr/learn/courses/15009/lessons/121689 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P16 — Bản đồ kho báu | https://school.programmers.co.kr/learn/courses/15009/lessons/121690 | Chính thức – Programmers | Mô tả/constraints; mock không công bố Level | 30/07/2026 |
| P17 — Hạn lưu trữ dữ liệu cá nhân | https://school.programmers.co.kr/learn/courses/30/lessons/150370?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P18 — Dạo công viên | https://school.programmers.co.kr/learn/courses/30/lessons/172928?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P19 — Game gắp thú bằng cần cẩu | https://school.programmers.co.kr/learn/courses/30/lessons/64061?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P20 — Cuộc đua chạy | https://school.programmers.co.kr/learn/courses/30/lessons/178871?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P21 — Người chưa hoàn thành | https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P22 — Ponketmon | https://school.programmers.co.kr/learn/courses/30/lessons/1845?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P23 — Danh bạ điện thoại | https://school.programmers.co.kr/learn/courses/30/lessons/42577?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P24 — Trang phục | https://school.programmers.co.kr/learn/courses/30/lessons/42578?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P25 — Số thứ K | https://school.programmers.co.kr/learn/courses/30/lessons/42748?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P26 — Phát triển tính năng | https://school.programmers.co.kr/learn/courses/30/lessons/42586?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P27 — Tiến trình | https://school.programmers.co.kr/learn/courses/30/lessons/42587?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P28 — Cay hơn | https://school.programmers.co.kr/learn/courses/30/lessons/42626?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P29 — Xuồng cứu sinh | https://school.programmers.co.kr/learn/courses/30/lessons/42885?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P30 — Số mục tiêu | https://school.programmers.co.kr/learn/courses/30/lessons/43165?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P31 — Đường ngắn nhất trên bản đồ game | https://school.programmers.co.kr/learn/courses/30/lessons/1844?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P32 — Sự kiện giảm giá | https://school.programmers.co.kr/learn/courses/30/lessons/131127?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P33 — Tổng dãy con liên tiếp | https://school.programmers.co.kr/learn/courses/30/lessons/178870?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P34 — Số lớn nhất | https://school.programmers.co.kr/learn/courses/30/lessons/42746?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P35 — Xe tải qua cầu | https://school.programmers.co.kr/learn/courses/30/lessons/42583?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P36 — Giá cổ phiếu | https://school.programmers.co.kr/learn/courses/30/lessons/42584?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P37 — Tạo số lớn | https://school.programmers.co.kr/learn/courses/30/lessons/42883?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P38 — Hệ thống đánh chặn | https://school.programmers.co.kr/learn/courses/30/lessons/181188?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P39 — Độ mệt mỏi | https://school.programmers.co.kr/learn/courses/30/lessons/87946?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P40 — Mạng lưới | https://school.programmers.co.kr/learn/courses/30/lessons/43162?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P41 — Thoát mê cung | https://school.programmers.co.kr/learn/courses/30/lessons/159993?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P42 — Biến đổi số | https://school.programmers.co.kr/learn/courses/30/lessons/154538?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P43 — Tam giác số nguyên | https://school.programmers.co.kr/learn/courses/30/lessons/43105?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P44 — Đường đến trường | https://school.programmers.co.kr/learn/courses/30/lessons/42898?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P45 — Bộ điều khiển đĩa | https://school.programmers.co.kr/learn/courses/30/lessons/42627?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P46 — Chuyển đổi từ | https://school.programmers.co.kr/learn/courses/30/lessons/43163?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P47 — Kiểm tra nhập cảnh | https://school.programmers.co.kr/learn/courses/30/lessons/43238?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |
| P48 — Node xa nhất | https://school.programmers.co.kr/learn/courses/30/lessons/49189?language=javascript | Chính thức – Programmers | Mô tả, constraints và Level nếu công bố | 30/07/2026 |

## Cách diễn giải nguồn cộng đồng

Các bài trải nghiệm độc lập cùng gợi ý rằng sample/visible test không đủ bảo đảm hidden test và efficiency test. Đây là **tín hiệu thực hành**, không phải mô tả cơ chế chấm chính thức. Vì vậy tài liệu dùng chúng để xây checklist biên, ngân sách chuyển bài và thời gian audit; không suy ra điểm từng câu.

Tổng kiểm kê trong file này: **37 nguồn nền + 48 trang bài tập = 85 URL tham chiếu đã rà soát**.
