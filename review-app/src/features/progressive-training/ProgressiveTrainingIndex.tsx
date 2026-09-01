import { useEffect, useState } from "react";
import type { ProgressiveTrainingProgressRow } from "../../cloud/database.types";
import { progressiveLessons } from "./lessons";
import { listTrainingProgress } from "./repository";
import { trainingErrorMessage } from "./error";
import { groupProgressiveLessons } from "./patternGroups";

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
  const patternGroups = groupProgressiveLessons(progressiveLessons);
  return <main className="training-index">
    <div className="page-title"><div><p className="eyebrow">Progressive Algorithm Training</p><h1>Tự viết thuật toán qua 6 level</h1><p className="exam-countdown">Pattern + blueprint → logic order → code order → tự viết block → full recall → debug + variant.</p></div><span>{progressiveLessons.length} executable lessons</span></div>
    {!configured && <div className="training-gate"><h2>Supabase chưa được cấu hình</h2><p>Module này không dùng localStorage làm nguồn chính. Cấu hình Supabase và chạy migration trước khi học.</p></div>}
    {configured && !userId && <div className="training-gate"><h2>Đăng nhập để bắt đầu</h2><p>Progress và attempts được lưu theo tài khoản Supabase. Dùng nút <b>Đăng nhập đồng bộ</b> ở góc trên.</p></div>}
    {loading && <p className="training-loading">Đang tải tiến độ từ Supabase…</p>}
    {error && <p className="training-error">{error}</p>}
    <div className="pattern-roadmap">{patternGroups.map((group) => {
      const mastered = group.lessons.filter((lesson) => byLesson.get(lesson.id)?.mastery_level === "MASTERED").length;
      return <section className="pattern-module" key={group.id}>
        <div className="pattern-module-heading"><div><p className="eyebrow">Module {group.order} · {group.prerequisite}</p><h2>{group.title}</h2><p className="pattern-name">{group.pattern}</p></div><span>{mastered}/{group.lessons.length} mastered</span></div>
        <div className="pattern-guide"><p><b>Tín hiệu nhận dạng:</b> {group.recognition}</p><p><b>Invariant phải giữ:</b> {group.invariant}</p></div>
        <ol className="training-grid">{group.lessons.map((lesson, lessonIndex) => {
          const progress = byLesson.get(lesson.id);
          const completed = progress?.completed_steps.length ?? 0;
          return <li key={lesson.id}><article>
            <div className="card-heading"><span className="lesson-id">Bài {lessonIndex + 1} · {lesson.priority} · {lesson.familyId}</span>{progress?.mastery_level === "MASTERED" && <span className="mastery-badge">MASTERED</span>}</div>
            <h3>{lesson.title}</h3><p>{lesson.description}</p>
            <div className="training-progress-bar"><span style={{ width: `${completed * (100 / 6)}%` }} /></div>
            <small>{completed}/6 level · {progress?.attempt_count ?? 0} attempts</small>
            {userId ? <a className="button" href={`#/training/${lesson.id}`}>{completed ? "Tiếp tục học" : "Bắt đầu"}</a> : <button disabled>Đăng nhập để học</button>}
          </article></li>;
        })}</ol>
      </section>;
    })}</div>
  </main>;
}
