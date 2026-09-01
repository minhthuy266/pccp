import { useEffect, useState } from "react";
import type { ProgressiveTrainingProgressRow } from "../../cloud/database.types";
import { progressiveLessons } from "./lessons";
import { listTrainingProgress } from "./repository";
import { trainingErrorMessage } from "./error";

export function ProgressiveTrainingIndex({ userId, configured }: { userId?: string; configured: boolean }) {
  const [rows, setRows] = useState<ProgressiveTrainingProgressRow[]>([]);
  const [loading, setLoading] = useState(Boolean(userId));
  const [error, setError] = useState("");
  useEffect(() => {
    if (!userId) { setRows([]); setLoading(false); return; }
    setLoading(true); setError("");
    void listTrainingProgress(userId).then(setRows).catch((cause) => setError(trainingErrorMessage(cause, "Không tải được tiến độ"))).finally(() => setLoading(false));
  }, [userId]);
  const byLesson = new Map(rows.map((row) => [row.lesson_id, row]));
  return <main className="training-index">
    <div className="page-title"><div><p className="eyebrow">Progressive Algorithm Training</p><h1>Thuộc skeleton bằng 5 tầng</h1><p className="exam-countdown">Nhận dạng → xếp block → điền transition → tự viết full code → sửa thành biến thể.</p></div><span>2 vertical-slice lessons</span></div>
    {!configured && <div className="training-gate"><h2>Supabase chưa được cấu hình</h2><p>Module này không dùng localStorage làm nguồn chính. Cấu hình Supabase và chạy migration trước khi học.</p></div>}
    {configured && !userId && <div className="training-gate"><h2>Đăng nhập để bắt đầu</h2><p>Progress và attempts được lưu theo tài khoản Supabase. Dùng nút <b>Đăng nhập đồng bộ</b> ở góc trên.</p></div>}
    {loading && <p className="training-loading">Đang tải tiến độ từ Supabase…</p>}
    {error && <p className="training-error">{error}</p>}
    <div className="training-grid">{progressiveLessons.map((lesson) => {
      const progress = byLesson.get(lesson.id);
      const completed = progress?.completed_steps.length ?? 0;
      return <article key={lesson.id}>
        <div className="card-heading"><span className="lesson-id">{lesson.priority} · {lesson.id}</span>{progress?.mastery_level === "MASTERED" && <span className="mastery-badge">MASTERED</span>}</div>
        <h2>{lesson.title}</h2><p>{lesson.description}</p>
        <div className="training-progress-bar"><span style={{ width: `${completed * 20}%` }} /></div>
        <small>{completed}/5 bước · {progress?.attempt_count ?? 0} attempts</small>
        {userId ? <a className="button" href={`#/training/${lesson.id}`}>{completed ? "Tiếp tục học" : "Bắt đầu"}</a> : <button disabled>Đăng nhập để học</button>}
      </article>;
    })}</div>
  </main>;
}
