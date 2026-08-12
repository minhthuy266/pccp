# PCCP 700+ — Kế hoạch chính đến 12/09/2026

Đây là **lịch học chính duy nhất**. Luôn bắt đầu từ [`README.md`](README.md), rồi mở [`TRACKER_PCCP_REBUILD_2026.csv`](TRACKER_PCCP_REBUILD_2026.csv) và tiếp tục từ ngày gần nhất chưa hoàn thành. Không tự nhảy ngày chỉ để khớp lịch; tiến độ thực tế chỉ được lưu trong tracker.

**Ngày thi người học cung cấp:** 12/09/2026. Kế hoạch giữ 37 ngày nội dung cốt lõi và chèn ba ngày repair/buffer sau các gate quan trọng. D8 được neo lại tại 10/08/2026; D37 là taper ngày 11/09/2026.

## Cách dùng

- [`PCCP_Thinking_Curriculum.md`](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md) có 12 chương (0–11), không tương ứng một-một với 37 ngày cốt lõi. Chỉ đọc đúng mục ghi ở cột “Chương/mục cần đọc”.
- “Không đọc chương mới” nghĩa là ôn/recode từ trí nhớ và dùng [`PCCP_Error_Log.csv`](docs/pccp-700-roadmap/PCCP_Error_Log.csv); “tra template” nghĩa là chỉ mở đúng mục trong [`PCCP_JavaScript_Templates.md`](docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md).
- Mỗi bài `OFxxx` được tra trong [`PCCP_OFFICIAL_PRACTICE_BANK.csv`](PCCP_OFFICIAL_PRACTICE_BANK.csv). Cột `legacy_id` nối với mã `Pxx` cũ. Không mở dòng `RESERVED_MOCK` trước timer.
- Ngày thường: 210 phút. Gate/mock: 240 phút, gồm tối đa 120 phút làm bài và phần review sau timer. D37: 60–90 phút.
- Mức hint: 0 không hint; 1 câu hỏi dẫn đường; 2 pseudocode; 3 code. Sau mức 2–3 phải code lại từ trắng.

## Lịch đầy đủ: 37 ngày cốt lõi + 3 ngày repair/buffer

| Ngày | Chủ đề | Chương/mục cần đọc | Bài luyện | Gate hoàn thành |
|---|---|---|---|---|
| D1 | Hệ điều hành giải bài; scan array | Chương 0 §0.1–0.3; Chương 1 §1.1 | OF015; tra template §0, §1, §5 | Viết contract, bound và complexity trước code; OF015 AC; numeric sort không nhìn |
| D2 | Matrix và state tối thiểu | Chương 1 §1.2–1.4; Lab 0 | OF049, OF051; tra template §2–4 | Cả hai bài có test 1×1, 1×N, N×1, chữ nhật; không nhầm row/column/mutation |
| D3 | `Map`, `Set`, frequency | Chương 2 §2.1–2.5 | OF001, OF002; tra template §6–7 | Chọn đúng Map/Set; xử lý key trùng; tự viết frequency counter |
| D4 | Sort, comparator và key | Chương 3 §3.1–3.2 | OF003, OF004; tra template §5–7 | Giải thích comparator/key và complexity; hai bài AC trong timebox |
| D5 | Two pointers sau sort | Chương 3 §3.3–3.5 | OF028, OF016; tra template §16 | Nêu invariant hai con trỏ; có counterexample cho cách greedy sai |
| D6 | Prefix sum và sliding window | Chương 4 §4.1–4.4; Lab A | OF052, OF053; tra template §15, §17, §24 | Phân biệt prefix/window; không bỏ cửa sổ đầu/cuối; nói rõ điều kiện đơn điệu |
| D7 | Gate A — nền JavaScript | Không đọc chương mới; recode Chương 1–4 từ trí nhớ | OF015, OF050 và một bài đã fail ở D1–D6 | ≥2/3 AC; bài mới ≤25 phút; không tra syntax cơ bản |
| D8 | Stack và queue-head | Chương 5 §5.1–5.3 | OF009; recode OF051; tra template §8–9 | Chọn đúng FIFO/LIFO; queue không dùng `shift()` lặp; hai bài có trace state |
| D9 | Monotonic stack và heap nhập môn | Chương 5 §5.4–5.5; Chương 11 §11.1; Lab B | OF011, OF012; tra template §14, §28 | Hai bài AC; min-heap qua smoke test; nêu invariant monotonic stack |
| D10 | Simulation theo event | Chương 6 §6.1–6.3 | OF010, OF019; tra template §27 | Tách state/event/transition/end; không chạy từng giây khi có thể nhảy event |
| D11 | Tie, parsing và checklist implementation | Chương 6 §6.4–6.6 | OF048, OF049 | Viết thứ tự xử lý rule; mỗi bài có revealing test biên |
| D12 | Brute force và backtracking | Chương 7 §7.1–7.5 | OF036, OF022; tra template §18 | Tính search space trước code; choose–explore–unchoose đúng; restore state |
| D13 | Greedy có chứng minh | Chương 8 §8.1–8.4; Lab E | OF028, OF057 | Viết exchange argument/counterexample trước code; không dùng “trông hợp lý” làm chứng minh |
| D14 | Binary search on answer | Chương 9 §9.1–9.5; Lab C | OF043 + sáu drill predicate; tra template §13 | Predicate đơn điệu, cận và điều kiện dừng được chứng minh; không dùng bitwise midpoint |
| D15 | Gate B — chuyển hóa pattern | Không đọc chương mới; ôn Chương 0–9 | OF003, OF054, OF056 trong 120 phút; review sau timer | Easy/medium đầu ≤25 phút; ít nhất hai AC; mọi bài có complexity đúng |
| R15 | Repair sau Gate B | Chỉ đọc lại cluster làm D15 trượt; nếu qua gate thì recode hai template yếu nhất | Tối đa hai bài cùng cluster lỗi của D15 | Hai bài timed AC hoặc ghi rõ gate còn fail; không mở chủ đề mới |
| D16 | BFS grid và shortest path | Chương 10 §10.1–10.2; Lab D | OF038, OF055; tra template §10 | Mark visited khi enqueue; reset state đúng giữa hai chặng; xử lý unreachable |
| D17 | Connected components và tree | Chương 10 §10.3 | OF037, OF023; tra template §11 | Mỗi node/ô chỉ duyệt một lần; tránh quay lại parent |
| D18 | Implicit graph | Chương 10 §10.4 | OF039; 3 drill thiết kế state; tra template §25 | `visited` chứa đủ state; chứng minh mỗi transition hợp lệ; OF039 trong timebox |
| D19 | Graph shortest path | Chương 10 §10.5–10.6 | OF045, OF059; tra template §21, §26 | Dựng adjacency list đúng; phân biệt BFS và Dijkstra |
| D20 | DP: state, transition, base | Chương 11 §11.2–11.3; Lab G | OF032, OF033; tra template §19–20 | Viết state/transition/base/order trước code; test hai mép và obstacle |
| D21 | Heap và bài tích hợp | Chương 11 §11.1, §11.4 | OF013; recode OF012; tra template §14, §27 | Tách event queue và priority queue; heap comparator đúng; không sort lại mỗi vòng |
| D22 | Foundation Gate | Chương 11 §11.5; không học kiến thức mới | OF005, OF024, OF046 và một bài lỗi nhiều nhất trong 120 phút | ≥2 bài AC; hướng và complexity đúng cho bài tiếp theo; recode ít nhất một bài sai |
| R22 | Repair sau Foundation Gate | Chỉ đọc error log và mục curriculum của tối đa hai root cause lớn nhất | Recode tối đa hai bài làm sai ở D22 hoặc bài tương đương cùng cluster | Không lặp root cause; nếu D22 chưa qua thì gate lại trước mock |
| D23 | Official Mock 1 — 120 phút | Không đọc chương mới; không tra template trong timer | `Official Mock 1`; mở từ sample hub chỉ khi bắt đầu timer | Đủ 120 phút; không hint/tài liệu/AI; ghi thời gian và submit vào tracker trước review |
| D24 | Hậu kiểm Official Mock 1 | Không đọc chương mới; sau khi đã làm mới được mở các dòng tương ứng trong `locked/POST_MOCK_ANALYSIS.csv` | Recode tối đa ba bài đã làm/sai từ file trắng | Mỗi lỗi có root cause, revealing test, prevention rule; không chép lời giải |
| D25 | Vá cluster yếu sau Mock 1 | Chỉ đọc lại mục curriculum liên quan lỗi; không mở chương mới | Chọn đúng hai bài từ OF003/OF004/OF028/OF038 theo hai cluster lỗi lớn nhất | Hai bài timed AC; cùng root cause không lặp; tracker và error log đã cập nhật |
| D26 | Speed ladder | Không đọc chương mới; tra đúng template bị quên | Recode OF048 ≤15 phút, OF003 ≤35 phút, OF038 ≤35 phút | Đạt cả ba timebox hoặc ghi gate fail; không xem code cũ trước khi làm |
| D27 | Official Mock 2 — 120 phút | Không đọc chương mới; không tra template trong timer | `Official Mock 2`; mở từ sample hub chỉ khi bắt đầu timer | Đủ 120 phút; không hint/tài liệu/AI; ghi kết quả thô vào tracker trước review |
| D28 | Hậu kiểm Official Mock 2 | Không đọc chương mới; sau khi đã làm mới được mở các dòng tương ứng trong `locked/POST_MOCK_ANALYSIS.csv` | Recode tối đa ba bài đã làm/sai từ file trắng | Tất cả lỗi có prevention rule; chọn được cutoff/chuyển bài cho mock sau |
| D29 | Public Past Set A — 120 phút | Không đọc chương mới; mở OF062–OF065 chỉ khi timer bắt đầu | Bốn bài `RESERVED_MOCK` Set A | Đủ 120 phút; không hint/tài liệu/AI; giữ 15 phút cuối audit; ghi tracker trước review |
| D30 | Hậu kiểm Past Set A | Không đọc chương mới; chỉ sau D29 mới mở lời giải/analysis | Recode các bài sai của D29, tối đa ba bài | Mọi WA/TLE có revealing test; hai cluster lớn nhất có bài sửa cụ thể |
| R30 | Consolidation buffer | Không đọc chương mới; dùng error log và kết quả D23–D30 | Một timed set ngắn nếu các gate đã qua; nếu chưa thì repair cluster yếu nhất | Không thêm pattern mới; chốt tối đa hai root cause còn lặp |
| D31 | Public Past Set B — 120 phút | Không đọc chương mới; mở OF066–OF069 chỉ khi timer bắt đầu | Bốn bài `RESERVED_MOCK` Set B | Q1 và hai medium trước phút 95 hoặc ghi rõ gate fail; không hint/tài liệu/AI |
| D32 | Review và re-code | Không đọc chương mới; đọc error log và mục curriculum đúng cluster lỗi | Recode tối đa ba bài sai của D31 từ file trắng | Thời gian giảm ≥20% hoặc ghi nguyên nhân; không lặp lỗi API/index |
| D33 | Conversion drill | Không đọc chương mới; tra template khi drill kết thúc | OF001 ≤15 phút, OF028 ≤35 phút, OF055 ≤35 phút | Hoàn thành trong 85 phút; complexity và ba edge case đúng trước submit |
| D34 | Legacy Official Test A — 120 phút | Không đọc chương mới; mở course 20847 trong locked bank khi timer bắt đầu | Official legacy practice test A | Không hint/tài liệu/AI; chiến thuật chuyển bài ổn định; 15–18 phút cuối audit |
| D35 | Postmortem cuối | Không đọc chương mới; Chương 11 §11.5 và error log | Recode tối đa hai bài sai D34; viết 5 template yếu nhất từ trắng | Không còn lỗi syntax/index chưa có prevention rule; chốt ba rủi ro cuối |
| D36 | Confidence set và tech check | Không đọc chương mới; tra cheat sheet và đúng template cần dùng | OF015 ≤15 phút, OF009 ≤35 phút, OF033 ≤45 phút | Kết thúc sớm nếu đạt; kiểm tra editor/browser/thiết bị; không học thêm topic |
| D37 | Taper | Không đọc chương mới; đọc [`PCCP_Final_Cheat_Sheet.md`](docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md) và error log | Một easy đã làm ≤20 phút; không mở mock/bài mới | Dừng sau 60–90 phút; tracker đầy đủ; nghỉ và giữ thói quen thi ổn định |

**12/09/2026 — D-day:** không học bài mới; thực thi chiến thuật 120 phút đã luyện.

## Luật mock và file khóa

Trước mock, không mở tên bài, link, pattern, state, invariant, thuật toán, bẫy hoặc hidden-test risks. Mock roster nằm ở `locked/OFFICIAL_MOCK_BANK.md`; `locked/POST_MOCK_ANALYSIS.csv` có spoiler. Chỉ mở:

- các dòng `Official Mock 1` sau khi hoàn thành D23;
- các dòng `Official Mock 2` sau khi hoàn thành D27;
- OF062–OF065 khi bắt đầu timer D29;
- OF066–OF069 khi bắt đầu timer D31;
- course legacy A khi bắt đầu timer D34.

Trong 120 phút: không hint, tài liệu, AI hoặc lời giải; ghi thời điểm bắt đầu từng bài, số submit, complexity dự kiến và `confidence 0–100%` trước khi xem kết quả thô. Review chỉ bắt đầu sau khi timer kết thúc. Nếu confidence cao nhưng hidden result thấp, repair test/proof/complexity trước khi kết luận thiếu pattern.

## Gate và nhánh Rescue

| Mốc | Qua gate | Nếu chưa qua |
|---|---|---|
| D7 | ≥2/3 AC, bài mới ≤25 phút, không tra syntax | Thêm 45 phút syntax/easy trong ba ngày kế; chưa tăng độ khó |
| D15 | Easy ≤20 phút, một medium ≤45 phút | Giữ 70% thời gian cho implementation/hash/sort/queue; lùi nội dung stretch |
| D22 | ≥2 bài AC và hướng đúng cho bài tiếp theo | Không mở Official Mock 1; dùng R22 cho repair + gate lại |
| D29 | Q1 + hai medium trước phút 95 | Dừng topic mới; re-solve và diệt hai error cluster lớn nhất |
| D34 | Hai mock gần nhất ổn định, không lặp root cause | Bỏ stretch; ưu tiên độ chắc chắn của ba bài đầu |

Các ngày R15, R22 và R30 là buffer có chủ đích: nếu gate đạt thì dùng để củng cố hoặc nghỉ phục hồi; nếu gate trượt thì repair đúng root cause. Rescue thay đổi bài thực hành, không thay đổi nguồn sự thật: kế hoạch vẫn ở file này, còn việc đã làm và kết quả thật vẫn chỉ ở tracker.

## Chiến thuật 120 phút

1. Phút 0–5: scan bốn bài, ghi constraint và độ chắc chắn; không đọc editorial.
2. Phút 5–25: khóa bài dễ nhất.
3. Phút 25–90: làm hai bài phù hợp nhất; đổi bài nếu không có tiến triển sau timebox.
4. Phút 90–105: hoàn thiện bài gần AC nhất hoặc lấy partial có cơ sở.
5. Phút 105–120: audit boundary, empty/singleton, tie, overflow/precision, complexity và submit.
