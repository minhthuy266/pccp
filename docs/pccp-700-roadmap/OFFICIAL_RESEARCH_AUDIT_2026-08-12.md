# Audit nguồn chính thức PCCP — 12/08/2026

## Kết luận

Curriculum canonical được xây từ ba tập có thẩm quyền khác nhau:

1. Phạm vi và cấu trúc thi trên trang/brochure PCCP.
2. Module của khóa luyện PCCP do Programmers phát hành.
3. Bài thực hành trên Programmers: toàn bộ 47 bài thuộc 10 High-score Kit, 14 bài public lấp coverage gap và 8 bài PCCP public giữ làm past paper.

Không có nguồn đơn lẻ nào đưa ra một “danh sách bài học đủ 700+”. Danh mục core/transfer/stretch là phép tuyển chọn có ghi rõ từ ba nguồn trên, không phải tuyên bố chính thức của Programmers.

## Dữ kiện trực tiếp

### Cấu trúc

- 4 coding questions, 120 minutes.
- JavaScript là một lựa chọn ngôn ngữ.
- Tổng 1.000; LV.3 là 600–749, LV.4 là 750–899.

Nguồn: https://certi.programmers.co.kr/about/pccp và https://business.programmers.co.kr/static/business/certification_intro.pdf

### Syllabus

- Basic implementation.
- String, Array, Greedy, Sort.
- Stack, Queue, Deque, Hash, Binary Search, DFS, BFS.
- Graph, Tree, Heap, Dynamic Programming.
- Chọn thuật toán/cấu trúc đúng và viết chương trình chính xác, hiệu quả.

Nguồn: brochure chính thức, trang 2 của PDF.

### PCCP preparation course

Course công khai curriculum gồm Hashing, Array implementation, Two pointers, Sorting & Greedy, DFS, BFS, Graph và hai mock 4 câu. Đây là bằng chứng ưu tiên, không phải syllabus đóng.

Nguồn: https://school.programmers.co.kr/learn/courses/14760

### Practice Kit

Trang Kit nói bộ này được Programmers rút từ các dạng coding test hay xuất hiện/hay sai. Ngày audit, 10 nhóm có 47 bài:

- Hash 5
- Stack/Queue 6
- Heap 3
- Sort 3
- Exhaustive Search 7
- Greedy 6
- DP 5
- DFS/BFS 7
- Binary Search 2
- Graph 3

Nguồn: https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit và các trang `parts/12077`, `12081`, `12117`, `12198`, `12230`, `12244`, `12263`, `12421`, `12486`, `14393`.

## Mock inventory

- Course 15008: free, 4 coding exercises, Official Mock 1.
- Course 15009: free, 4 coding exercises, Official Mock 2.
- Course 20847/20848: free legacy practice-test courses; public metadata advertises 4 coding exercises while course outline exposes three post-test lessons. Use course test entrypoint, not lesson enumeration.
- Course 19344: official public past-problem course.
- Course 24542: free official Python explanation course; review only after attempting.
- Course 14760: paid PCCP preparation course with two 4-question mocks.

Mock URLs are placed in `locked/OFFICIAL_MOCK_BANK.md` to avoid accidental spoilers.

## Selection logic for the 69-row bank

- 47/47 Kit problems are retained so no official Kit family disappears.
- 14 public supplements fill gaps visible in the official syllabus/course but absent or weak in Kit: parsing/matrix implementation, two pointers, sliding window, queue pointers, multi-phase BFS, Dijkstra, 2D difference and monotonic-stack transfer.
- 8 public PCCP questions are reserved as two full past-paper sets.
- Core prioritizes representative Level 1–3 problems and direct dependencies.
- Level 4/5 or unusually specialized modeling is stretch unless it is the only clean representative of a required concept.

## Claims deliberately not made

- The bank is not every problem on Programmers.
- Kit frequency labels are not PCCP probabilities.
- Public past papers do not prove the next paper has the same order or weight.
- Three ACs do not imply a fixed score.
- Community reports are not used to define syllabus or scoring.

## Audit review của người đã thi

Review thí sinh là nguồn phụ trợ, không phải đặc tả đề. Audit dùng nhiều bài viết khác ngày thi, mức điểm và ngôn ngữ; chỉ giữ một kết luận khi nó lặp lại hoặc phù hợp với cơ chế thi chính thức.

### Các tín hiệu lặp lại đáng dùng

1. **“Đã giải ba/bốn câu” không đồng nghĩa các hidden test đều đúng.** Nhiều thí sinh tưởng đã hoàn thành phần lớn đề nhưng điểm thấp hơn nhiều so với dự đoán; họ nghi ngờ complexity hoặc edge case. Vì không có breakdown chính thức, nguyên nhân cụ thể vẫn chỉ là suy đoán của tác giả. Nguồn: [JS review 07/2024](https://khj930410.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-PCCP-JS-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0), [review Lv.3](https://dkrnq.tistory.com/53), [review Lv.4](https://juhonamnam.github.io/blog/post/10/), [review 08/2024](https://happybplus.tistory.com/945).
2. **Không được tin sample test.** Các review mô tả việc có thể tự chạy test nhưng không biết kết quả chấm cuối/efficiency trong lúc thi. Điều này khiến tự tạo edge case, audit complexity và proof trước submit quan trọng hơn số lần bấm chạy. Nguồn: [PCCP review](https://jost-do-it.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%BD%94%EB%94%A9%EC%A0%84%EB%AC%B8%EC%97%AD%EB%9F%89%EC%9D%B8%EC%A6%9D-PCCP-%EC%8B%9C%ED%97%98-%ED%9B%84%EA%B8%B0), [Bits & Bytes review](https://juhonamnam.github.io/blog/post/10/), [2023/2024 review](https://dingdingcrong.tistory.com/191).
3. **Thứ tự câu không bảo đảm tăng dần theo độ khó.** Có thí sinh gặp câu 4 dễ hơn câu 3; các bài khác kể việc đốt gần hết thời gian vào một câu giữa rồi không kịp đọc/làm câu sau. Vì thế scan đủ bốn câu và dùng cutoff là chiến thuật bắt buộc. Nguồn: [review 03/2024](https://jaeochoii.github.io/PCCP/), [review Lv.2](https://love-every-moment.tistory.com/94).
4. **Khả năng đọc yêu cầu và implementation vẫn là điểm nghẽn.** Review mô tả đề dài, nhiều ngoại lệ hoặc bài nhìn như graph nhưng thực chất là implementation; đây là bằng chứng phụ trợ cho việc giữ implementation/state/event-order ở Gate 1 thay vì chỉ học tên thuật toán. Nguồn: [review 03/2024](https://jaeochoii.github.io/PCCP/), [Lv.5 review 2025](https://junju404.tistory.com/28).
5. **Phải tập đúng môi trường và thời lượng.** Người thi khuyên làm quen Programmers IDE, đồng thời các review nhắc việc giám sát bằng webcam/điện thoại và giới hạn môi trường. Trang chính thức hiện có pre-test để kiểm tra máy, webcam, mạng, camera điện thoại và giấy tờ; quy định hiện hành luôn ưu tiên hơn blog cũ. Nguồn: [Lv.3 review 11/2024](https://radiant515.tistory.com/736), [Programmers service guide](https://www.programmers.co.kr/pages/service-guide), [trang PCCP hiện hành](https://certi.programmers.co.kr/about/pccp).

### Tín hiệu chỉ dùng để tham khảo

- Một số review ước lượng đề ở Programmers Level 2–3, nhưng đây là cảm nhận cá nhân và thay đổi theo bộ đề/người thi.
- Việc một kỳ từng có BFS, hash, DP, graph hoặc implementation không tạo ra xác suất chính thức cho kỳ sau.
- Suy đoán “mất điểm vì efficiency” không phải diagnosis đã được Programmers xác nhận vì thí sinh không nhận breakdown từng hidden test.
- Review từ 2022–2025 hữu ích cho chiến thuật, nhưng các chi tiết về thời gian vào phòng, vật dụng và giao diện có thể đã đổi; trước ngày thi phải xem guide hiện hành.

### Ảnh hưởng lên curriculum

- Không thêm cluster thuật toán mới: bank hiện tại đã cover các family ổn định mà review nhắc tới và toàn bộ syllabus công bố.
- Giữ `complexity proof + 3 edge cases` trong definition of done.
- Mọi mock phải chạy black-box: không hint, không editorial, không biết hidden result; ghi “confidence” riêng với kết quả cuối để hiệu chỉnh sự tự tin.
- Bắt buộc scan đủ bốn câu và áp dụng cutoff 12–15 phút không tiến triển.
- Thêm tech rehearsal/pre-test vào giai đoạn cuối thay vì chỉ luyện code.

## Freshness note

Web pages are dynamic. Re-audit before a future exam if Programmers adds a new public past set, modifies the Kit, or changes the current PCCP page. This snapshot is authoritative for the curriculum as of 12/08/2026.
