# Font dùng khi build PDF

`PCCP-Hangul-Subset.ttf` là subset 211 ký tự Hangul thực sự xuất hiện trong tài liệu, tạo từ **Noto Sans KR Regular** của kho `google/fonts`.

- Nguồn: `ofl/notosanskr/NotoSansKR[wght].ttf`
- Giấy phép: SIL Open Font License 1.1, xem `OFL-NotoSansKR.txt`
- Mục đích: giữ đúng tiêu đề tiếng Hàn trong PDF mà không đưa font gốc gần 10 MB vào repo

Font subset chỉ được dùng cho chuỗi Hangul; nội dung tiếng Việt và code dùng font hệ thống được khai báo trong script build.
