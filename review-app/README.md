# PCCP Recall

Ứng dụng active-recall tối giản, đọc trực tiếp 67 lesson Markdown chính thức từ `docs/pccp-700-roadmap/official-lessons`. Không có backend; bản nháp và lịch sử được lưu trong trình duyệt.

## Cài đặt và chạy

```bash
cd review-app
npm install
npm run dev
```

Mở địa chỉ Vite in ra (thường là `http://localhost:5173`).

## Kiểm tra và build

```bash
npm test
npm run build
```

Build production nằm trong `review-app/dist/`.

## Dữ liệu và reset

Progress dùng key versioned `pccp-review-store-v1` trong `localStorage`; cập nhật app không ghi đè dữ liệu đang có. Session đang làm dùng key `pccp-review-session-<LESSON_ID>` để giữ timer và các hint đã mở qua refresh.

Mỗi lượt ôn lưu cả chín câu trả lời phân tích, tự đánh giá từng trường và ghi chú sửa. Trước lượt kế tiếp, app chỉ nhắc tên và ghi chú của các trường PARTIAL/WRONG; reference vẫn ẩn cho tới khi khóa câu trả lời mới.

Mastery yêu cầu hai lượt A có bằng chứng: không dùng hint, analysis đạt strong và không sai Pattern/State/Transition, code đã chạy sample, pass judge Programmers và đã kiểm edge case. Sau khi analysis mastered, bài mở thêm chế độ Code Sprint. Trang Tiến độ có thể xuất/nhập backup JSON; khi nhập, lịch sử được gộp và draft hiện tại được ưu tiên giữ lại.

Để reset toàn bộ dữ liệu, mở DevTools Console trên trang app và chạy:

```js
localStorage.removeItem("pccp-review-store-v1");
Object.keys(localStorage)
  .filter((key) => key.startsWith("pccp-review-session-"))
  .forEach((key) => localStorage.removeItem(key));
location.reload();
```

Không xóa key khác của cùng origin.
