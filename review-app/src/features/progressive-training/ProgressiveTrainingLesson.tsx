import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Json } from "../../cloud/database.types";
import { CodeEditor } from "../../components/CodeEditor";
import { runCodeCases } from "../../domain/workerClient";
import { checkBlockOrder, checkFillAnswers, checkPatternChoice } from "./evaluate";
import { progressiveLessonById } from "./lessons";
import type { CaseResult, CodeTestCase, ProgressiveLesson, TrainingDraft, TrainingStepType, VariantChallenge } from "./types";
import { useProgressiveTraining } from "./useProgressiveTraining";

const STEP_LABELS = ["Chọn dạng", "Xếp block", "Điền code", "Full code", "Biến thể"];

function CaseResults({ results }: { results: CaseResult[] }) {
  return <div className="training-case-results">{results.map((result) => <div className={result.passed ? "pass" : "fail"} key={result.label}><b>{result.passed ? "✓" : "×"} {result.label}</b><small>{result.error ?? (result.passed ? `Received ${result.actual}` : `Expected ${result.expected} · Received ${result.actual}`)}</small></div>)}</div>;
}

function PatternStep({ lesson, draft, update, submit, busy, done }: StepProps) {
  const step = lesson.steps[0]; const [feedback, setFeedback] = useState("");
  const answer = draft.patternChoice ?? "";
  const check = async () => {
    const passed = checkPatternChoice(step, answer);
    const saved = await submit(step.type, { optionId: answer }, passed);
    if (saved) setFeedback(passed ? "Đúng. Mỗi index sinh đúng hai nhánh lấy/bỏ." : "Chưa đúng. Xem lại việc mỗi phần tử chỉ có hai quyết định độc lập.");
  };
  return <StepShell title="Bước 1 — Chọn dạng đề" prompt={step.prompt} done={done}><div className="choice-grid">{step.options.map((option) => <label className={answer === option.id ? "selected" : ""} key={option.id}><input type="radio" name="pattern-choice" checked={answer === option.id} onChange={() => update({ patternChoice: option.id })} /><span><b>{option.label}</b></span></label>)}</div><Action feedback={feedback} disabled={!answer || busy} busy={busy} onClick={check} /></StepShell>;
}

function BlockStep({ lesson, draft, update, submit, busy, done }: StepProps) {
  const step = lesson.steps[1]; const order = draft.blockOrder?.length === step.blocks.length ? draft.blockOrder : step.blocks.map((block) => block.id);
  const [feedback, setFeedback] = useState("");
  const move = (index: number, delta: number) => { const next = [...order]; const target = index + delta; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; update({ blockOrder: next }); };
  const check = async () => { const passed = checkBlockOrder(step, order); const saved = await submit(step.type, { order }, passed); if (saved) setFeedback(passed ? "Đúng thứ tự state → base → transition → return." : "Sai thứ tự. Kiểm tra scope và mark/recurse/rollback."); };
  const blocks = new Map(step.blocks.map((block) => [block.id, block]));
  return <StepShell title="Bước 2 — Sắp xếp block code" prompt={step.prompt} done={done}><div className="block-order">{order.map((id, index) => <div key={id}><span>{index + 1}</span><pre><code>{blocks.get(id)?.code}</code></pre><div><button className="secondary" disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button className="secondary" disabled={index === order.length - 1} onClick={() => move(index, 1)}>↓</button></div></div>)}</div><Action feedback={feedback} disabled={busy} busy={busy} onClick={check} /></StepShell>;
}

function FillStep({ lesson, draft, update, submit, busy, done }: StepProps) {
  const step = lesson.steps[2]; const answers = draft.fillAnswers ?? {}; const [feedback, setFeedback] = useState("");
  const check = async () => { const result = checkFillAnswers(step, answers); const saved = await submit(step.type, { answers, fields: result.fields }, result.passed); if (saved) setFeedback(result.passed ? "Đúng toàn bộ base/transition/update." : `Còn sai: ${result.fields.filter((field) => !field.passed).map((field) => field.id).join(", ")}`); };
  return <StepShell title="Bước 3 — Điền logic còn thiếu" prompt={step.prompt} done={done}><pre className="code-block"><code>{step.template}</code></pre><div className="fill-grid">{step.blanks.map((blank) => <label key={blank.id}>{blank.label}<input value={answers[blank.id] ?? ""} onChange={(event) => update({ fillAnswers: { ...answers, [blank.id]: event.target.value } })} placeholder={`/* ${blank.id} */`} spellCheck={false} /></label>)}</div><Action feedback={feedback} disabled={step.blanks.some((blank) => !(answers[blank.id] ?? "").trim()) || busy} busy={busy} onClick={check} /></StepShell>;
}

function CodeHelp({ solution, onHelp }: { solution: string; onHelp: (level: number, solution?: boolean) => void }) {
  const [hint, setHint] = useState(false); const [shown, setShown] = useState(false);
  return <div className="code-help"><button className="secondary" onClick={() => { setHint(true); onHelp(1); }}>Mở gợi ý state/transition</button><button className="secondary" onClick={() => { setShown(true); onHelp(5, true); }}>Mở solution</button>{hint && <p><b>Gợi ý:</b> Giữ đúng invariant qua mỗi recursive call; state mutable phải rollback ngay sau call.</p>}{shown && <pre className="code-block"><code>{solution}</code></pre>}</div>;
}

function TestCodePanel({ code, setCode, tests, busy, onResults }: { code: string; setCode: (code: string) => void; tests: CodeTestCase[]; busy: boolean; onResults: (results: CaseResult[]) => Promise<void> }) {
  const [running, setRunning] = useState(false); const [results, setResults] = useState<CaseResult[]>([]);
  const run = async () => { setRunning(true); const next = await runCodeCases(code, tests); setResults(next); setRunning(false); await onResults(next); };
  return <><CodeEditor value={code} onChange={setCode} /><button className="run-suite" disabled={busy || running || !code.trim()} onClick={() => { void run(); }}>{running ? "Đang chạy test…" : `Run ${tests.length} tests`}</button>{results.length > 0 && <CaseResults results={results} />}</>;
}

function FullCodeStepView({ lesson, draft, update, submit, busy, done, help }: StepProps) {
  const step = lesson.steps[3]; const code = draft.fullCode ?? step.starterCode;
  const tested = async (results: CaseResult[]) => { const passed = results.every((result) => result.passed); await submit(step.type, { code }, passed, results); };
  return <StepShell title="Bước 4 — Tự viết full code" prompt={step.prompt} done={done}><p><b>Signature:</b> <code>{lesson.functionSignature}</code></p><TestCodePanel code={code} setCode={(next) => update({ fullCode: next })} tests={step.tests} busy={busy} onResults={tested} /><CodeHelp solution={step.solution} onHelp={help} /></StepShell>;
}

function VariantCard({ challenge, code, setCode, passed, busy, run, help }: { challenge: VariantChallenge; code: string; setCode: (value: string) => void; passed: boolean; busy: boolean; run: (results: CaseResult[]) => Promise<void>; help: (level: number, solution?: boolean) => Promise<void> }) {
  return <article className={`variant-card ${passed ? "done" : ""}`}><div><span className="lesson-id">{passed ? "PASSED" : "VARIANT"}</span><h3>{challenge.title}</h3><p>{challenge.change}</p><code>{challenge.functionSignature}</code></div><TestCodePanel code={code} setCode={setCode} tests={challenge.tests} busy={busy} onResults={run} /><CodeHelp solution={challenge.solution} onHelp={(level, solution) => { void help(level, solution); }} /></article>;
}

function VariantStepView({ lesson, draft, update, submit, busy, done, help }: StepProps) {
  const step = lesson.steps[4]; const codes = draft.variantCode ?? {}; const passedIds = draft.variantPassedIds ?? [];
  const tested = async (challenge: VariantChallenge, results: CaseResult[]) => {
    const challengePassed = results.every((result) => result.passed);
    const nextPassed = challengePassed ? [...new Set([...passedIds, challenge.id])] : passedIds;
    update({ variantPassedIds: nextPassed });
    const allPassed = step.challenges.every((item) => nextPassed.includes(item.id));
    await submit(step.type, { challengeId: challenge.id, code: codes[challenge.id] ?? challenge.starterCode, completedChallenges: nextPassed }, challengePassed, results, allPassed);
  };
  return <StepShell title="Bước 5 — Sửa code cho biến thể" prompt={step.prompt} done={done}><div className="variant-list">{step.challenges.map((challenge) => <VariantCard key={challenge.id} challenge={challenge} code={codes[challenge.id] ?? challenge.starterCode} setCode={(code) => update({ variantCode: { ...codes, [challenge.id]: code } })} passed={passedIds.includes(challenge.id)} busy={busy} run={(results) => tested(challenge, results)} help={help} />)}</div></StepShell>;
}

type StepProps = { lesson: ProgressiveLesson; draft: TrainingDraft; update: (patch: Partial<TrainingDraft>) => void; submit: (type: TrainingStepType, answer: Json, passed: boolean, results?: CaseResult[], stepCompleted?: boolean) => Promise<unknown>; busy: boolean; done: boolean; help: (level: number, solution?: boolean) => Promise<void> };
function StepShell({ title, prompt, done, children }: { title: string; prompt: string; done: boolean; children: ReactNode }) { return <section className="training-step"><div className="section-heading"><div><p className="eyebrow">Active recall · lưu Supabase</p><h2>{title}</h2></div>{done && <span className="mastery-badge">COMPLETED</span>}</div><p className="step-prompt">{prompt}</p>{children}</section>; }
function Action({ feedback, disabled, busy, onClick }: { feedback: string; disabled: boolean; busy: boolean; onClick: () => Promise<void> }) { return <div className="training-action"><span>{feedback}</span><button disabled={disabled} onClick={() => { void onClick(); }}>{busy ? "Đang lưu…" : "Kiểm tra và lưu attempt"}</button></div>; }

export function ProgressiveTrainingLesson({ lessonId, userId, configured }: { lessonId?: string; userId?: string; configured: boolean }) {
  const lesson = lessonId ? progressiveLessonById.get(lessonId) : undefined;
  if (!lesson) return <main><h1>Không tìm thấy training lesson</h1><a href="#/training">← Progressive Training</a></main>;
  if (!configured || !userId) return <main><a href="#/training">← Progressive Training</a><div className="training-gate"><h1>Cần đăng nhập Supabase</h1><p>Module này chỉ bắt đầu khi có authenticated user; không tạo progress local thay thế.</p></div></main>;
  return <AuthenticatedLesson lesson={lesson} userId={userId} />;
}

function AuthenticatedLesson({ lesson, userId }: { lesson: ProgressiveLesson; userId: string }) {
  const training = useProgressiveTraining(userId, lesson); const [viewStep, setViewStep] = useState(1);
  useEffect(() => { if (training.progress) setViewStep(training.progress.current_step); }, [training.progress?.current_step]);
  const completed = training.progress?.completed_steps ?? [];
  const stepProps = useMemo<StepProps>(() => ({ lesson, draft: training.draft, update: training.updateDraft, busy: training.submitting, done: completed.includes(viewStep), help: training.markHelp, submit: async (type, answer, passed, results = [], stepCompleted = passed) => { const saved = await training.submitAttempt(type, answer, passed, results as unknown as Json, stepCompleted); if (saved && stepCompleted) setViewStep(Math.min(5, viewStep + 1)); return saved; } }), [lesson, training.draft, training.submitting, training.progress, viewStep]);
  if (training.loading) return <main><p className="training-loading">Đang tải bài và tiến độ từ Supabase…</p></main>;
  if (!training.progress) return <main><p className="training-error">{training.error || "Không tải được tiến độ"}</p><button onClick={() => { void training.reload(); }}>Thử lại</button></main>;
  return <main className="training-lesson"><a href="#/training">← Progressive Training</a><div className="page-title"><div><p className="eyebrow">{lesson.priority} · {lesson.basePattern}</p><h1>{lesson.title}</h1><p className="exam-countdown">{lesson.description}</p></div><span>{completed.length}/5 bước</span></div>
    <div className="training-stepper">{STEP_LABELS.map((label, index) => { const number = index + 1; const accessible = number <= training.progress!.current_step || completed.includes(number); return <button className={`${viewStep === number ? "active" : ""} ${completed.includes(number) ? "done" : ""}`} disabled={!accessible} onClick={() => setViewStep(number)} key={label}><span>{completed.includes(number) ? "✓" : number}</span>{label}</button>; })}</div>
    <div className={`save-indicator ${training.saveStatus}`}>{training.saveStatus === "saving" ? "Đang lưu Supabase…" : training.saveStatus === "saved" ? "Đã lưu Supabase" : training.saveStatus === "error" ? "Lưu lỗi — input vẫn còn trên màn hình" : `Attempt ${training.progress.attempt_count}`}</div>
    {training.error && <div className="training-error"><span>{training.error}</span><button className="secondary" onClick={() => { void training.reload(); }}>Tải lại từ server</button></div>}
    {viewStep === 1 && <PatternStep {...stepProps} />}{viewStep === 2 && <BlockStep {...stepProps} />}{viewStep === 3 && <FillStep {...stepProps} />}{viewStep === 4 && <FullCodeStepView {...stepProps} />}{viewStep === 5 && <VariantStepView {...stepProps} />}
  </main>;
}
