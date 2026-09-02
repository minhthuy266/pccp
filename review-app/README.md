# PCCP Recall

Ứng dụng active-recall đọc trực tiếp 67 lesson Markdown chính thức từ `docs/pccp-700-roadmap/official-lessons`. Flow review cũ hoạt động local-first và có thể đồng bộ qua Supabase; module Progressive Algorithm Training dùng Supabase làm nguồn progress/attempt canonical.

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

## Đồng bộ nhiều thiết bị với Supabase

Flow review cũ vẫn hoạt động local-first khi chưa cấu hình cloud. Để bật đăng nhập email/password và tự đồng bộ:

1. Tạo Supabase project.
2. Mở SQL Editor và chạy các migration theo thứ tự:

```text
supabase/migrations/20260822000000_create_review_stores.sql
supabase/migrations/20260901000000_create_progressive_training.sql
supabase/migrations/20260901010000_upgrade_progressive_six_levels.sql
supabase/migrations/20260901020000_reload_progressive_rpc_schema.sql
```

Nếu gặp `PGRST202` cho `record_progressive_training_attempt_v2`, kiểm tra trong SQL Editor trước:

```sql
select to_regprocedure(
  'public.record_progressive_training_attempt_v2(uuid,text,integer,text,jsonb,boolean,jsonb,smallint,integer,smallint,smallint[],boolean,boolean,boolean,boolean,jsonb)'
);
```

Nếu kết quả là `null`, apply file `20260901010000_upgrade_progressive_six_levels.sql` đúng một lần. Nếu function đã tồn tại, không chạy lại migration chuyển đổi dữ liệu; chỉ chạy `notify pgrst, 'reload schema';` (nội dung file `20260901020000`) rồi tải lại app.
3. Trong Authentication → URL Configuration, đặt Site URL là domain deploy và thêm cả URL local/deploy vào Redirect URLs, ví dụ `http://localhost:5173/**` và `https://your-app.example/**`.
4. Copy `.env.example` thành `.env.local`, rồi điền Project URL và publishable key:

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```

5. Restart `npm run dev`. Đăng nhập cùng một email trên mọi thiết bị.

Trên Vercel, thêm hai biến trên vào Project Settings → Environment Variables rồi redeploy. Không bao giờ đưa `service_role` hoặc secret key vào app frontend. Khi đăng nhập, app merge lịch sử local/cloud, chọn draft có `updatedAt` mới hơn và tự sync sau khi dữ liệu đổi. Backup JSON vẫn nên được giữ như một lớp dự phòng.

## Progressive Algorithm Training

Mở `#/training` sau khi đăng nhập. Hai mươi bốn lesson executable hiện phủ F01–F07, F09, toàn bộ BFS F12, component/tree traversal F13 và heap/Top K/scheduling F15, cùng các lesson ưu tiên D10–D12 thuộc F11, F14 và F16; mỗi lesson hiện đề bài đầy đủ gồm contract, input/output, constraints, signature, ví dụ và link đề Programmers chính thức trước khi yêu cầu suy state. Link được ghi rõ là đề exact hay bài official liên quan. Tất cả dùng flow sáu level: Pattern + Blueprint, Logic Ordering, Code Block Ordering, viết trọn lời giải với checklist subgoal, Full Recall từ trang trắng, rồi Debug + Contract Variant. Routing rút gọn deterministic dựa trên bằng chứng đã lưu; fail Full Recall đưa người học về Level 4.

Trang danh sách không xếp lesson phẳng: lộ trình chia chín module theo prerequisite gồm representation, linear/Map/Set/sorting, grid/atomic simulation, queue/timeline simulation, decision tree/backtracking, tree/graph traversal, heap selection/scheduling, interval greedy và binary search on answer. Mỗi module hiện tín hiệu nhận dạng pattern, invariant cần giữ và thứ tự bài nên học.

Progress/draft và attempt của module này được lưu trong `progressive_training_progress` và `progressive_training_attempts`. RPC `record_progressive_training_attempt_v2` ghi attempt và cập nhật progress trong cùng transaction, dùng UUID phía client để retry không tạo attempt trùng. RLS chỉ cho authenticated user đọc/ghi dữ liệu có `user_id = auth.uid()`.

Code được chạy trong Web Worker tại browser với timeout hai giây; Supabase không thực thi code người học.
