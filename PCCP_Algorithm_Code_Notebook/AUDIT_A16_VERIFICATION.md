# Audit A16 — Blueprint, Recall và code giảng dạy

> Đây là snapshot phát hiện sai lệch ban đầu. Các thiếu sót đã được sửa và tái chứng nhận trong
> [AUDIT_A17_VERIFICATION.md](AUDIT_A17_VERIFICATION.md).

Ngày audit: 21/08/2026. Phạm vi: 67 lesson public `OF001..OF061`, `SR001..SR006`.

## Cách audit

Mỗi lesson được đọc trực tiếp ở phần làm tay, state/init, Blueprint, code hoàn chỉnh và recall.
Một bài chỉ đạt khi Blueprint có đủ 13 trường với giá trị riêng của bài và cuối bài có ba tầng
Recall 1/2/3. Việc chỉ có từ “Blueprint” hoặc “Recall” không được tính. Code section 14 còn được
thực thi bằng official test của chính ID; transition có side effect ẩn trong phép đọc như
`queue[head++]` hoặc `++count` trong condition bị coi là code giảng dạy chưa tách.

## Kết luận từng bài

| ID | Blueprint đọc thực tế | Recall đọc thực tế | Kết luận |
| --- | --- | --- | --- |
| OF001 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF002 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF003 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF004 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF005 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF006 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF007 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF008 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF009 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF010 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF011 | 12/13, thiếu STOP / RETURN | 3/3, ba tầng riêng | PARTIAL |
| OF012 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF013 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF014 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF015 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF016 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF017 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF018 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF019 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF020 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF021 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF022 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF023 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF024 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF025 | 5/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF026 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF027 | 12/13, thiếu POINTER MOVEMENT | 3/3, ba tầng riêng | PARTIAL |
| OF028 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF029 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF030 | 6/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF031 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF032 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF033 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF034 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF035 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF036 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF037 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF038 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF039 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF040 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF041 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF042 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF043 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF044 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF045 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF046 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF047 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF048 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF049 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF050 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF051 | 12/13, thiếu POINTER MOVEMENT | 3/3, ba tầng riêng | PARTIAL |
| OF052 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF053 | 7/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF054 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| OF055 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF056 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF057 | 7/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF058 | 7/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF059 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF060 | 7/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |
| OF061 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| SR001 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| SR002 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| SR003 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| SR004 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| SR005 | 13/13, nội dung gắn state/transition của bài | 3/3, ba tầng riêng | COMPLETE |
| SR006 | 0/13; bản hiện tại là checklist/chuỗi viết tắt | 0/3; chỉ có một “Recall” tổng hợp | PARTIAL |

## Kết luận định lượng

- COMPLETE: 22/67.
- PARTIAL: 45/67.
- OF011, OF027, OF051: Recall đạt, Blueprint thiếu đúng một trường bắt buộc.
- 42 bài PARTIAL còn lại: Blueprint chưa ở format 13 trường và chỉ có một recall tổng hợp.
- Code section 14: 67/67 block chạy được với official test; lỗi hiện tại là thiếu scaffold học,
  không phải bằng chứng lời giải sai.

## Transition code đã tách trong A16

Đã tách phép đọc khỏi phép tăng pointer/counter trong OF008, OF009, OF010, OF038, OF039,
OF040, OF042, OF045, OF054, OF055, OF056 và OF058, đồng bộ ở executable solution và code
giảng dạy. Riêng OF036 được bung ternary trong brute-force teaching block.

## Kết quả xác minh

- `npm test`: **PASS**, exit 0; 187 tests, 187 pass, 0 fail; thời gian 706.95 ms.
- `npm run check:all`: **FAIL có chủ đích**, exit 1 tại `audit_official_lessons.mjs`.
  Ba gate chạy trước đó đều pass: notebook framework 89/89, integration 89/89 và pattern
  families 24/24. Official audit báo 22/67 certified, 45 partial; section 14 behavior 67/67.
- Lý do không sửa gate thành pass: `check:all` phải chặn release khi tracker còn lesson
  `PARTIAL`; biến thiếu rubric thành warning sẽ tái tạo đúng lỗi “COMPLETE theo keyword”.
