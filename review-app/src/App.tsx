import { useCallback, useEffect, useMemo, useState } from "react";
import { lessons } from "./lessons";
import { dueDateFor, localDate } from "./domain/dates";
import { HINT_ORDER, isMastered, suggestedGrade } from "./domain/grading";
import { analysisMastered, analysisScore, CRITICAL_FIELDS, scoreBand, weakAssessments } from "./domain/assessment";
import { dueLessons, latest, suggestedNew } from "./domain/scheduler";
import { loadStore, mergeStores, parseStoreJson, progressFor, saveDraft, saveReview, saveStore } from "./domain/store";
import { CodeEditor } from "./components/CodeEditor";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { BlueprintPreview } from "./components/BlueprintPreview";
import { useCloudSync } from "./cloud/useCloudSync";
import { ANALYSIS_FIELDS, type AnalysisField, type AssessmentStatus, type CodeEvidence, type ErrorCategory, type FieldAssessment, type Grade, type Lesson, type PracticeMode, type ReviewStore } from "./types";

type Page = "today" | "practice" | "progress";
const ERRORS: ErrorCategory[] = ["RECOGNITION", "STATE", "INIT", "LOOP", "CONDITION", "UPDATE", "ORDER", "INDEX", "JAVASCRIPT"];
const HINT_LABELS: Record<string, string> = { recall1: "Recall mức 1", blueprint: "Blueprint", recall2: "Recall mức 2", recall3: "Recall mức 3", full: "Giải thích và lời giải đầy đủ" };
const EXAM_DATE = "2026-09-12";

function useNavigation() {
  const read = () => {
    const match = location.hash.match(/^#\/practice\/([^/]+)$/);
    return match ? { page: "practice" as Page, id: match[1] } : { page: location.hash === "#/progress" ? "progress" as Page : "today" as Page };
  };
  const [route, setRoute] = useState(read);
  useEffect(() => { const handler = () => setRoute(read()); addEventListener("hashchange", handler); return () => removeEventListener("hashchange", handler); }, []);
  return route;
}

export function App() {
  const route = useNavigation();
  const [store, setStore] = useState<ReviewStore>(() => loadStore());
  const refresh = useCallback(() => setStore(loadStore()), []);
  const cloud = useCloudSync(refresh);
  return <div className="app">
    <header><a className="brand" href="#/">PCCP Recall</a><div className="header-right"><nav><a href="#/">Hôm nay</a><a href="#/progress">Tiến độ</a></nav><CloudControl cloud={cloud} /></div></header>
    {route.page === "today" && <Today store={store} />}
    {route.page === "progress" && <Progress store={store} onUpdated={refresh} />}
    {route.page === "practice" && <Practice lesson={lessons.find((lesson) => lesson.id === route.id)} store={store} onSaved={refresh} />}
  </div>;
}

function CloudControl({ cloud }: { cloud: ReturnType<typeof useCloudSync> }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => { if ((!cloud.user && cloud.message) || cloud.recovering) setOpen(true); }, [cloud.user, cloud.message, cloud.recovering]);
  const submit = async () => {
    if (!email.trim() || password.length < 6) return;
    setBusy(true); cloud.setMessage("");
    try {
      if (registering) await cloud.signUp(email.trim(), password);
      else await cloud.signIn(email.trim(), password);
    }
    catch (error) { cloud.setMessage(error instanceof Error ? error.message : "Không thể đăng nhập"); }
    finally { setBusy(false); }
  };
  const resetPassword = async () => {
    if (!email.trim()) return;
    setBusy(true); cloud.setMessage("");
    try { await cloud.requestPasswordReset(email.trim()); }
    catch (error) { cloud.setMessage(error instanceof Error ? error.message : "Không gửi được email đặt lại mật khẩu"); }
    finally { setBusy(false); }
  };
  const savePassword = async () => {
    if (password.length < 6) return;
    setBusy(true); cloud.setMessage("");
    try { await cloud.updatePassword(password); }
    catch (error) { cloud.setMessage(error instanceof Error ? error.message : "Không lưu được mật khẩu mới"); }
    finally { setBusy(false); }
  };
  if (!cloud.configured) return <span className="cloud-local" title="Thêm biến môi trường Supabase để bật đồng bộ">Chỉ lưu local</span>;
  if (cloud.user && cloud.recovering) return <div className="cloud-login"><button className="cloud-login-button" onClick={() => setOpen(!open)}>Đặt mật khẩu mới</button>{open && <div className="cloud-popover"><b>Đặt mật khẩu mới</b><p>Nhập mật khẩu mới cho tài khoản {cloud.user.email}.</p><input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Tối thiểu 6 ký tự" onKeyDown={(event) => { if (event.key === "Enter") void savePassword(); }} /><button disabled={busy || password.length < 6} onClick={() => { void savePassword(); }}>{busy ? "Đang lưu…" : "Lưu mật khẩu"}</button>{cloud.message && <small>{cloud.message}</small>}</div>}</div>;
  if (cloud.user) return <div className="cloud-user"><button className={`cloud-pill ${cloud.status}`} onClick={() => { void cloud.syncNow(); }} title={cloud.message || cloud.user.email}>{cloud.status === "syncing" ? "Đang sync…" : cloud.status === "error" ? "Lỗi sync" : "Đã đồng bộ"}</button><button className="cloud-signout" onClick={() => { void cloud.signOut(); }}>Đăng xuất</button></div>;
  return <div className="cloud-login"><button className="cloud-login-button" onClick={() => setOpen(!open)}>Đăng nhập đồng bộ</button>{open && <div className="cloud-popover"><b>{registering ? "Tạo tài khoản" : "Đăng nhập để đồng bộ"}</b><p>Dùng cùng một tài khoản trên mọi thiết bị để giữ lịch ôn và kết quả.</p><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" /><input type="password" autoComplete={registering ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mật khẩu (tối thiểu 6 ký tự)" onKeyDown={(event) => { if (event.key === "Enter") void submit(); }} /><button disabled={busy || !email.trim() || password.length < 6} onClick={() => { void submit(); }}>{busy ? "Đang xử lý…" : registering ? "Tạo tài khoản" : "Đăng nhập"}</button><button className="cloud-switch" onClick={() => { setRegistering(!registering); cloud.setMessage(""); }}>{registering ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}</button>{!registering && <button className="cloud-switch" disabled={busy || !email.trim()} onClick={() => { void resetPassword(); }}>Quên hoặc chưa có mật khẩu?</button>}{cloud.message && <small>{cloud.message}</small>}</div>}</div>;
}

function LessonCard({ lesson, store }: { lesson: Lesson; store: ReviewStore }) {
  const records = store.lessons[lesson.id]?.history ?? [];
  const record = records.at(-1);
  const lastError = record?.errors.at(-1) ?? "—";
  return <article className="lesson-card">
    <div className="card-heading"><span className="lesson-id">{lesson.id}</span><div className="card-status">{isMastered(records) && <span className="mastery-badge">MASTERED</span>}{record && <span className={`grade grade-${record.grade}`}>{record.grade}</span>}</div></div>
    <h3>{lesson.title}</h3><p className="pattern">{lesson.pattern}</p>
    <dl><div><dt>Điểm gần nhất</dt><dd>{record?.grade ?? "Mới"}</dd></div><div><dt>Số lần ôn</dt><dd>{records.length}</dd></div><div><dt>Lỗi gần nhất</dt><dd>{lastError}</dd></div><div><dt>Đến hạn</dt><dd>{record?.dueAt ?? "Chưa xếp"}</dd></div></dl>
    <a className="button" href={`#/practice/${lesson.id}`}>{records.length ? "Bắt đầu ôn" : "Học lần đầu"}</a>
  </article>;
}

function LessonGrid({ items, store }: { items: Lesson[]; store: ReviewStore }) {
  return items.length ? <div className="grid">{items.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} store={store} />)}</div> : <p className="empty">Không có bài nào.</p>;
}

function Today({ store }: { store: ReviewStore }) {
  const due = dueLessons(lessons, store);
  const unfinished = lessons.filter((lesson) => {
    const progress = store.lessons[lesson.id];
    return !progress?.history.length && (progress?.draftCode || Object.values(progress?.draftAnalysis ?? {}).some(Boolean));
  });
  const fresh = suggestedNew(lessons.filter((lesson) => !unfinished.includes(lesson)), store);
  const examDays = Math.max(0, Math.ceil((new Date(`${EXAM_DATE}T12:00:00`).getTime() - new Date(`${localDate()}T12:00:00`).getTime()) / 86_400_000));
  return <main>
    <div className="page-title"><div><p className="eyebrow">{new Intl.DateTimeFormat("vi-VN", { dateStyle: "full" }).format(new Date())}</p><h1>Ôn tập hôm nay</h1><p className="exam-countdown">Còn <b>{examDays} ngày</b> tới kỳ thi 12/09/2026 · ưu tiên bài quá hạn và lỗi critical.</p></div><span>{due.length} bài đến hạn</span></div>
    <section><h2>Đến hạn</h2><LessonGrid items={due} store={store} /></section>
    <section><h2>Bản nháp chưa xong</h2><LessonGrid items={unfinished} store={store} /></section>
    <section><h2>Gợi ý bài mới <small>tối đa 3 mỗi ngày</small></h2><LessonGrid items={fresh} store={store} /></section>
    <details className="library"><summary>Chọn bài khác ({lessons.length} bài)</summary><div className="lesson-links">{lessons.map((lesson) => <a href={`#/practice/${lesson.id}`} key={lesson.id}>{lesson.id} · {lesson.title}</a>)}</div></details>
  </main>;
}

type Session = { startedAt: number; hints: string[]; analysisLocked: boolean; assessments: Partial<Record<AnalysisField, FieldAssessment>>; mode: PracticeMode; modeChosen: boolean; evidence: CodeEvidence };
function loadSession(id: string, firstStudy: boolean): Session {
  const empty: Session = { startedAt: Date.now(), hints: [], analysisLocked: false, assessments: {}, mode: firstStudy ? "LEARN" : "FULL", modeChosen: false, evidence: { codeCompleted: false, examplesRun: false, officialPassed: false, edgeCasesChecked: false } };
  try { const saved = JSON.parse(localStorage.getItem(`pccp-review-session-${id}`) ?? "null") ?? {}; return { ...empty, ...saved, mode: firstStudy && !saved.modeChosen ? "LEARN" : (saved.mode ?? empty.mode), evidence: { ...empty.evidence, ...saved.evidence } }; }
  catch { return empty; }
}

function TextBlock({ text, code = false }: { text: string; code?: boolean }) {
  if (code) return <pre className="code-block"><code>{text || "Phần này chưa có trong lesson."}</code></pre>;
  return <MarkdownPreview markdown={text || "*Phần này chưa có trong lesson.*"} />;
}

function Practice({ lesson, store, onSaved }: { lesson?: Lesson; store: ReviewStore; onSaved: () => void }) {
  if (!lesson) return <main><h1>Không tìm thấy bài học</h1><a href="#/">Về hôm nay</a></main>;
  const progress = progressFor(store, lesson.id);
  const isNewLesson = progress.history.length === 0;
  const [analysis, setAnalysis] = useState<Record<string, string>>(() => ({
    ...progress.draftAnalysis,
    Contract: progress.draftAnalysis.Contract ?? progress.draftAnalysis["Contract / Output"] ?? "",
  }));
  const [code, setCode] = useState(progress.draftCode);
  const [session, setSession] = useState<Session>(() => loadSession(lesson.id, isNewLesson));
  const [now, setNow] = useState(Date.now());
  const [finishing, setFinishing] = useState(false);
  const availableFields = ANALYSIS_FIELDS.filter((field) => Boolean(lesson.references[field]));
  const priorAssessmentRecord = [...progress.history].reverse().find((record) => record.analysisAssessment);
  const priorAssessment = priorAssessmentRecord?.analysisAssessment ?? {};
  const priorAnalysisMastered = analysisMastered(priorAssessment, availableFields);
  const fullyAssessed = session.mode !== "FULL" || (session.analysisLocked && availableFields.every((field) => session.assessments[field]));
  const canLock = ANALYSIS_FIELDS.every((field) => analysis[field]?.trim());
  const canFinish = fullyAssessed && session.evidence.codeCompleted && code.trim().length > 0;
  const previousWeak = weakAssessments(priorAssessment);
  const seconds = Math.max(0, Math.floor((now - session.startedAt) / 1000));
  const persist = () => saveDraft(store, lesson.id, analysis, code);
  useEffect(() => { localStorage.setItem(`pccp-review-session-${lesson.id}`, JSON.stringify(session)); }, [lesson.id, session]);
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  useEffect(() => { const id = setTimeout(persist, 300); return () => clearTimeout(id); }, [analysis, code]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key.toLowerCase() === "s") { event.preventDefault(); persist(); }
      if (event.key === "Enter" && canFinish) { event.preventDefault(); setFinishing(true); }
    };
    addEventListener("keydown", handler); return () => removeEventListener("keydown", handler);
  });
  const revealNext = () => {
    const next = HINT_ORDER[session.hints.length];
    if (next) setSession({ ...session, hints: [...session.hints, next] });
  };
  const lockAnalysis = () => {
    if (!canLock) return;
    persist();
    setSession({ ...session, analysisLocked: true });
  };
  const assess = (field: AnalysisField, status: AssessmentStatus) => {
    setSession({ ...session, assessments: { ...session.assessments, [field]: { status, correctionNote: session.assessments[field]?.correctionNote ?? "", learnerAnswer: analysis[field] } } });
  };
  const correct = (field: AnalysisField, correctionNote: string) => {
    const current = session.assessments[field];
    if (current) setSession({ ...session, assessments: { ...session.assessments, [field]: { ...current, correctionNote } } });
  };
  const setMode = (mode: PracticeMode) => setSession({ ...session, mode, modeChosen: true, analysisLocked: mode === "CODE_ONLY" || mode === "LEARN" ? false : session.analysisLocked });
  const setEvidence = (key: keyof CodeEvidence, value: boolean) => setSession({ ...session, evidence: { ...session.evidence, [key]: value } });
  return <main className="practice">
    <div className="practice-title"><a href="#/">← Hôm nay</a><div><span className="lesson-id">{lesson.id}</span><h1>{lesson.title}</h1><p>{lesson.pattern}</p></div><strong className="timer">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</strong></div>
    <section className="practice-mode"><div><h2>Chế độ luyện</h2><p>{isNewLesson ? "Bài mới: học canonical trước, ngày mai mới recall từ trí nhớ." : "Full Recall dựng lại tư duy; Code Sprint luyện tốc độ sau khi analysis đã mastered."}</p></div><div className="mode-options">{isNewLesson && <button className={session.mode === "LEARN" ? "active" : "secondary"} onClick={() => setMode("LEARN")}>Học lần đầu</button>}<button className={session.mode === "FULL" ? "active" : "secondary"} onClick={() => setMode("FULL")}>{isNewLesson ? "Tôi đã học bài này" : "Full Recall"}</button>{!isNewLesson && <button className={session.mode === "CODE_ONLY" ? "active" : "secondary"} disabled={!priorAnalysisMastered} title={!priorAnalysisMastered ? "Cần mastered analysis trước" : ""} onClick={() => setMode("CODE_ONLY")}>Code Sprint</button>}</div></section>
    <section className="problem"><div className="section-heading"><h2>Đề bài / Contract</h2>{lesson.officialUrl && <a className="button secondary" href={lesson.officialUrl} target="_blank" rel="noreferrer">Mở đề trên Programmers ↗</a>}</div><TextBlock text={lesson.problem} /></section>
    {session.mode === "LEARN" && <section className="learning-pass"><p className="eyebrow">Lượt tiếp thu đầu tiên</p><h2>Đọc lesson canonical</h2><div className="learn-steps"><span>1 · Đọc và hiểu từng phần</span><span>2 · Che code rồi tự gõ lại</span><span>3 · Chạy judge chính thức</span><span>4 · Ngày mai recall không nhìn</span></div><MarkdownPreview markdown={lesson.explanation} /><h2>Code tham chiếu</h2><p>Đọc để hiểu transition, sau đó tự gõ lại ở editor bên dưới. Đừng copy/paste.</p><TextBlock text={lesson.solution} code /></section>}
    {session.mode === "FULL" && <section><h2>Tự dựng lời giải</h2>
      {previousWeak.length > 0 && <aside className="previous-weak"><strong>Lần trước cần sửa</strong><p>Chỉ nhắc tên trường và ghi chú của bạn; đáp án tham chiếu vẫn được ẩn.</p><ul>{previousWeak.map((item) => <li key={item.field}><b>{item.field}</b>{item.correctionNote ? ` — ${item.correctionNote}` : ""}</li>)}</ul></aside>}
      <div className="analysis-grid">{ANALYSIS_FIELDS.map((field) => <label className={CRITICAL_FIELDS.includes(field) ? "critical-field" : ""} key={field}><span>{field}{CRITICAL_FIELDS.includes(field) && <em>Quan trọng</em>}</span><textarea readOnly={session.analysisLocked} rows={3} value={analysis[field] ?? ""} onChange={(event) => setAnalysis({ ...analysis, [field]: event.target.value })} /></label>)}</div>
      {!session.analysisLocked && <div className="lock-row"><p>{canLock ? "Câu trả lời sẽ được giữ nguyên khi so sánh." : "Điền đủ cả 9 trường để mở so sánh."}</p><button disabled={!canLock} onClick={lockAnalysis}>Khóa và so sánh</button></div>}
      {session.analysisLocked && <Assessment lesson={lesson} analysis={analysis} session={session} assess={assess} correct={correct} />}
    </section>}
    {session.mode === "CODE_ONLY" && <section className="sprint-brief"><p className="eyebrow">Code Sprint</p><h2>Viết lại từ contract, không xem analysis</h2><p>Analysis của bài này đã đạt chuẩn. Mục tiêu lượt này là dựng code sạch, chạy judge và kiểm edge case trong thời gian ngắn.</p>{previousWeak.length > 0 && <aside className="previous-weak"><strong>Lần trước cần sửa</strong><ul>{previousWeak.map((item) => <li key={item.field}><b>{item.field}</b>{item.correctionNote ? ` — ${item.correctionNote}` : ""}</li>)}</ul></aside>}</section>}
    <section><CodeEditor value={code} onChange={setCode} /></section>
    <section className="evidence"><div className="section-heading"><div><p className="eyebrow">Bằng chứng trước khi chấm</p><h2>Kiểm chứng code</h2></div>{lesson.officialUrl && <a className="button" href={lesson.officialUrl} target="_blank" rel="noreferrer">Chạy trên Programmers ↗</a>}</div><p>App không chạy code thay bạn. Đánh dấu đúng những gì đã thực sự làm.</p><div className="evidence-grid">
      <label><input type="checkbox" checked={session.evidence.codeCompleted} onChange={(event) => setEvidence("codeCompleted", event.target.checked)} /><span><b>Đã tự viết xong</b><small>Không copy lời giải</small></span></label>
      <label><input type="checkbox" checked={session.evidence.examplesRun} onChange={(event) => setEvidence("examplesRun", event.target.checked)} /><span><b>Đã chạy sample test</b><small>Kết quả đúng</small></span></label>
      <label><input type="checkbox" checked={session.evidence.officialPassed} onChange={(event) => setEvidence("officialPassed", event.target.checked)} /><span><b>Đã pass judge chính thức</b><small>Programmers báo accepted</small></span></label>
      <label><input type="checkbox" checked={session.evidence.edgeCasesChecked} onChange={(event) => setEvidence("edgeCasesChecked", event.target.checked)} /><span><b>Đã kiểm edge case</b><small>Empty/min/max/tie/index nếu liên quan</small></span></label>
    </div></section>
    {session.mode !== "LEARN" && <section className="help"><h2>Trợ giúp tăng dần</h2><p>Chỉ mức kế tiếp có thể mở. Mỗi lần mở sẽ ảnh hưởng điểm gợi ý.</p>
      {HINT_ORDER.map((hint, index) => {
        const revealed = session.hints.includes(hint);
        const available = index === session.hints.length;
        return <article className={`hint ${revealed ? "revealed" : available ? "available" : "hidden"}`} key={hint}>
          <div><strong>{index + 1}. {HINT_LABELS[hint]}</strong><span>{revealed ? "Đã mở" : available ? "Có thể mở" : "Đang khóa"}</span></div>
          {revealed && hint === "recall1" && <TextBlock text={lesson.recall1} />}
          {revealed && hint === "blueprint" && <BlueprintPreview blueprint={lesson.blueprint} />}
          {revealed && hint === "recall2" && <TextBlock text={lesson.recall2} />}
          {revealed && hint === "recall3" && <TextBlock text={lesson.recall3} />}
          {revealed && hint === "full" && <><h3>Giải thích</h3><TextBlock text={lesson.explanation} /><h3>Code hoàn chỉnh</h3><TextBlock text={lesson.solution} code /></>}
          {available && <button className="secondary" onClick={revealNext}>Mở {HINT_LABELS[hint]}</button>}
        </article>;
      })}
    </section>}
    <div className="sticky-actions"><span>{session.mode === "LEARN" ? "Lượt học đầu tiên sẽ được xếp recall vào ngày mai" : !fullyAssessed ? "Khóa và tự đánh giá analysis trước" : !session.evidence.codeCompleted || !code.trim() ? "Cần viết xong code và xác nhận bằng chứng" : "Đủ điều kiện kết thúc lượt ôn"}</span><button disabled={!canFinish} onClick={() => setFinishing(true)}>{session.mode === "LEARN" ? "Hoàn tất học lần đầu" : "Kết thúc ôn · ⌘/Ctrl+Enter"}</button></div>
    {finishing && <ResultModal lesson={lesson} store={store} session={session} analysis={analysis} priorAnalysisMastered={priorAnalysisMastered} duration={seconds} close={() => setFinishing(false)} saved={() => { localStorage.removeItem(`pccp-review-session-${lesson.id}`); onSaved(); location.hash = "#/"; }} />}
  </main>;
}

function Assessment({ lesson, analysis, session, assess, correct }: { lesson: Lesson; analysis: Record<string, string>; session: Session; assess: (field: AnalysisField, status: AssessmentStatus) => void; correct: (field: AnalysisField, note: string) => void }) {
  const available = ANALYSIS_FIELDS.filter((field) => Boolean(lesson.references[field]));
  const score = analysisScore(session.assessments, available);
  const excluded = ANALYSIS_FIELDS.length - available.length;
  const mastered = analysisMastered(session.assessments, available);
  return <div className="assessment"><div className="assessment-summary"><div><p className="eyebrow">Tự đánh giá thủ công</p><h3>{score.normalized}/18 · {scoreBand(score.normalized)}</h3>{excluded > 0 && <small>Quy đổi từ {score.raw}/{score.availablePoints}; loại {excluded} trường không có tham chiếu.</small>}</div><span className={mastered ? "mastered" : "not-mastered"}>{mastered ? "Analysis mastered" : "Chưa mastered"}</span></div>
    <p>Không dùng so khớp chuỗi. Hãy đọc hai bên và tự chọn CORRECT (2), PARTIAL (1) hoặc WRONG (0).</p>
    <div className="comparison-list">{ANALYSIS_FIELDS.map((field) => {
      const item = session.assessments[field];
      const reference = lesson.references[field];
      const critical = CRITICAL_FIELDS.includes(field);
      return <article className={`comparison ${critical ? "critical" : ""}`} key={field}><div className="comparison-title"><h4>{field}</h4>{critical && <span>Trường quan trọng</span>}</div><div className="comparison-columns"><div><b>Câu trả lời của bạn</b><TextBlock text={analysis[field]} /></div><div><b>Tham chiếu canonical</b>{reference ? <TextBlock text={reference} /> : <p className="no-reference">No reference available</p>}</div></div>
        {reference && <><div className="assessment-options">{(["CORRECT", "PARTIAL", "WRONG"] as AssessmentStatus[]).map((status) => <label key={status} className={item?.status === status ? "selected" : ""}><input type="radio" name={`assessment-${field}`} checked={item?.status === status} onChange={() => assess(field, status)} />{status} <small>{status === "CORRECT" ? 2 : status === "PARTIAL" ? 1 : 0}</small></label>)}</div>{item && item.status !== "CORRECT" && <label className="correction-note">Ghi chú sửa ngắn<textarea rows={2} value={item.correctionNote} onChange={(event) => correct(field, event.target.value)} placeholder="Lần sau cần nhớ gì?" /></label>}</>}
      </article>;
    })}</div>
  </div>;
}

function ResultModal({ lesson, store, session, analysis, priorAnalysisMastered, duration, close, saved }: { lesson: Lesson; store: ReviewStore; session: Session; analysis: Record<string, string>; priorAnalysisMastered: boolean; duration: number; close: () => void; saved: () => void }) {
  const firstStudy = session.mode === "LEARN";
  const suggested = firstStudy ? "D" : suggestedGrade(session.hints);
  const [grade, setGrade] = useState<Grade>(suggested);
  const [errors, setErrors] = useState<ErrorCategory[]>([]);
  const [note, setNote] = useState("");
  const availableFields = ANALYSIS_FIELDS.filter((field) => Boolean(lesson.references[field]));
  const currentAnalysisMastered = session.mode === "CODE_ONLY" ? priorAnalysisMastered : session.mode === "FULL" ? analysisMastered(session.assessments, availableFields) : false;
  const masteryEligible = session.hints.length === 0 && currentAnalysisMastered && session.evidence.codeCompleted && session.evidence.examplesRun && session.evidence.officialPassed && session.evidence.edgeCasesChecked;
  const submit = () => {
    const reviewed = new Date();
    const analysisAnswers = Object.fromEntries(ANALYSIS_FIELDS.map((field) => [field, analysis[field] ?? ""]));
    const savedGrade: Grade = firstStudy ? "D" : grade;
    saveReview(store, lesson.id, { grade: savedGrade, reviewedAt: reviewed.toISOString(), dueAt: dueDateFor(savedGrade, reviewed), durationSeconds: duration, revealedHints: firstStudy ? ["full"] : session.hints, errors, note: note.trim(), analysisAnswers, analysisAssessment: session.mode === "FULL" ? session.assessments : undefined, practiceMode: session.mode, codeEvidence: session.evidence, masteryEligible: firstStudy ? false : masteryEligible, firstStudy });
    saved();
  };
  return <div className="modal-backdrop" role="presentation"><div className="modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={close} aria-label="Đóng">×</button>
    <p className="eyebrow">Hoàn tất {lesson.id}</p><h2>{firstStudy ? "Hoàn tất học lần đầu" : "Ghi kết quả ôn tập"}</h2>{firstStudy ? <div className="first-study-result"><b>Baseline D · recall vào ngày mai</b><span>Lượt này là tiếp thu, chưa phải kiểm tra trí nhớ và không được tính mastery.</span></div> : <><p>Điểm gợi ý theo trợ giúp đã mở: <b>{suggested}</b>. Bạn có thể đổi.</p><div className={`mastery-check ${masteryEligible ? "eligible" : "ineligible"}`}><b>{masteryEligible ? "Lượt này đủ bằng chứng mastery" : "Lượt này chưa đủ bằng chứng mastery"}</b><span>{masteryEligible ? "Không hint · analysis vững · judge pass · edge case đã kiểm." : "Điểm A vẫn được lưu nếu bạn chọn, nhưng chưa được tính mastered."}</span></div>
    <div className="grades">{(["A", "B", "C", "D"] as Grade[]).map((item) => <label key={item}><input type="radio" name="grade" checked={grade === item} onChange={() => setGrade(item)} /><b>{item}</b><small>{item === "A" ? "+7 ngày · không trợ giúp" : item === "B" ? "+3 ngày · Recall 1" : item === "C" ? "+1 ngày · Blueprint/Recall 2" : "+1 ngày · Recall 3/lời giải"}</small></label>)}</div></>}
    <fieldset><legend>Lỗi gặp phải (chọn nhiều)</legend><div className="error-options">{ERRORS.map((error) => <label key={error}><input type="checkbox" checked={errors.includes(error)} onChange={() => setErrors(errors.includes(error) ? errors.filter((item) => item !== error) : [...errors, error])} />{error}</label>)}</div></fieldset>
    <label className="note">Ghi chú ngắn<textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} /></label>
    <div className="modal-actions"><button className="secondary" onClick={close}>Quay lại</button><button onClick={submit}>Lưu kết quả</button></div>
  </div></div>;
}

function Progress({ store, onUpdated }: { store: ReviewStore; onUpdated: () => void }) {
  const today = localDate();
  const reviewedLessons = lessons.filter((lesson) => store.lessons[lesson.id]?.history.length);
  const due = dueLessons(lessons, store, today);
  const overdue = due.filter((lesson) => latest(store, lesson.id)!.dueAt < today);
  const mastered = reviewedLessons.filter((lesson) => isMastered(store.lessons[lesson.id].history));
  const accepted = reviewedLessons.filter((lesson) => store.lessons[lesson.id].history.at(-1)?.codeEvidence?.officialPassed);
  const masteryQueue = reviewedLessons.filter((lesson) => !isMastered(store.lessons[lesson.id].history)).slice(0, 12);
  const patterns = useMemo(() => Object.entries(lessons.reduce<Record<string, Lesson[]>>((groups, lesson) => { (groups[lesson.pattern] ??= []).push(lesson); return groups; }, {})).sort(([a], [b]) => a.localeCompare(b)), []);
  const history = reviewedLessons.flatMap((lesson) => store.lessons[lesson.id].history.map((record) => ({ lesson, record }))).sort((a, b) => b.record.reviewedAt.localeCompare(a.record.reviewedAt)).slice(0, 12);
  const exportData = () => {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `pccp-review-backup-${localDate()}.json`; anchor.click(); URL.revokeObjectURL(url);
  };
  const importData = async (file?: File) => {
    if (!file) return;
    const imported = parseStoreJson(await file.text());
    if (!imported) { alert("File backup không hợp lệ hoặc sai version."); return; }
    if (!confirm("Gộp backup này với dữ liệu hiện tại? Lịch sử hiện có sẽ không bị xóa.")) return;
    saveStore(mergeStores(store, imported)); onUpdated(); alert("Đã gộp backup thành công.");
  };
  const reason = (lesson: Lesson) => {
    const history = store.lessons[lesson.id].history; const record = history.at(-1)!;
    if (history.filter((item) => item.grade === "A").length < 2) return "Cần 2 lượt A";
    if (record.revealedHints.length) return "Lượt gần nhất còn dùng hint";
    if (!record.codeEvidence?.officialPassed) return "Chưa có bằng chứng judge pass";
    if (!record.masteryEligible) return "Analysis/edge case chưa đạt";
    return "Cần lượt A sạch tiếp theo";
  };
  return <main><div className="page-title"><div><p className="eyebrow">Tổng quan</p><h1>Tiến độ</h1></div><div className="data-actions"><button className="secondary" onClick={exportData}>Xuất backup</button><label className="button secondary">Nhập backup<input type="file" accept="application/json,.json" onChange={(event) => { void importData(event.target.files?.[0]); event.target.value = ""; }} /></label></div></div>
    <div className="stats"><div><strong>{due.length}</strong><span>Đến hạn hôm nay</span></div><div><strong>{overdue.length}</strong><span>Quá hạn</span></div><div><strong>{accepted.length}</strong><span>Judge pass gần nhất</span></div><div><strong>{mastered.length}</strong><span>Đã vững / {lessons.length}</span></div></div>
    <section><h2>Hàng đợi mastery</h2>{masteryQueue.length ? <div className="mastery-queue">{masteryQueue.map((lesson) => <a href={`#/practice/${lesson.id}`} key={lesson.id}><span><b>{lesson.id}</b> · {lesson.title}</span><small>{reason(lesson)}</small></a>)}</div> : <p className="empty">Các bài đã ôn đều đạt mastery.</p>}</section>
    <section><h2>Theo pattern</h2><div className="pattern-groups">{patterns.map(([pattern, group]) => { const done = group.filter((lesson) => store.lessons[lesson.id]?.history.length).length; return <div key={pattern}><span>{pattern}</span><b>{done}/{group.length}</b></div>; })}</div></section>
    <section><h2>Lịch sử gần đây</h2>{history.length ? <div className="history">{history.map(({ lesson, record }, index) => <div key={`${lesson.id}-${record.reviewedAt}-${index}`}><span><b>{lesson.id}</b> · {lesson.title}</span><span className={`grade grade-${record.grade}`}>{record.grade}</span><time>{localDate(new Date(record.reviewedAt))} · {Math.round(record.durationSeconds / 60)} phút</time></div>)}</div> : <p className="empty">Chưa có lượt ôn nào.</p>}</section>
  </main>;
}
