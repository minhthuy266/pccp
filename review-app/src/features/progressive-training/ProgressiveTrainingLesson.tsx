import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Json } from "../../cloud/database.types";
import { CodeEditor } from "../../components/CodeEditor";
import { runCodeCases } from "../../domain/workerClient";
import { adaptiveLevelRoute, nextLevelInRoute } from "./adaptive";
import { assembleWrittenBlocks, checkBlueprintAnswers, checkPatternChoice, evaluateBlockOrder, validateLogicOrder } from "./evaluate";
import { progressiveLessonById } from "./lessons";
import type { CaseResult, CodeTestCase, LearningLevelType, ProgressiveLesson, TrainingDraft, TransferChallenge } from "./types";
import { useProgressiveTraining } from "./useProgressiveTraining";

const LEVEL_LABELS = ["Pattern + Blueprint", "Logic ordering", "Code ordering", "Guided full code", "Full recall", "Debug + Variant"];
const VARIANT_QUESTIONS = ["STATE đổi gì?", "BASE CASE đổi gì?", "TRANSITION đổi gì?", "INVARIANT đổi gì?", "OUTPUT đổi gì?"];

function CaseResults({ results }: { results: CaseResult[] }) {
  return <div className="training-case-results">{results.map((result) => <div className={result.passed ? "pass" : "fail"} key={result.label}><b>{result.passed ? "✓" : "×"} {result.label}</b><small>{result.error ?? (result.passed ? `Received ${result.actual}` : `Expected ${result.expected} · Received ${result.actual}`)}</small></div>)}</div>;
}

function TestCodePanel({ code, setCode, tests, busy, onResults }: { code: string; setCode: (code: string) => void; tests: CodeTestCase[]; busy: boolean; onResults: (results: CaseResult[]) => Promise<void> }) {
  const [running, setRunning] = useState(false); const [results, setResults] = useState<CaseResult[]>([]);
  const run = async () => { setRunning(true); const next = await runCodeCases(code, tests); setResults(next); setRunning(false); await onResults(next); };
  return <><CodeEditor value={code} onChange={setCode} /><button className="run-suite" disabled={busy || running || !code.trim()} onClick={() => { void run(); }}>{running ? "Đang chạy test…" : `Run ${tests.length} tests`}</button>{results.length > 0 && <CaseResults results={results} />}</>;
}

function Action({ feedback, disabled, busy, onClick }: { feedback: string; disabled: boolean; busy: boolean; onClick: () => Promise<void> }) {
  return <div className="training-action"><span>{feedback}</span><button disabled={disabled} onClick={() => { void onClick(); }}>{busy ? "Đang kiểm tra…" : "Kiểm tra và lưu attempt"}</button></div>;
}

function LevelShell({ number, title, prompt, done, children }: { number: number; title: string; prompt: string; done: boolean; children: ReactNode }) {
  return <section className="training-step"><div className="section-heading"><div><p className="eyebrow">Level {number} · Active recall · Supabase</p><h2>{title}</h2></div>{done && <span className="mastery-badge">COMPLETED</span>}</div><p className="step-prompt">{prompt}</p>{children}</section>;
}

export function ProblemStatementPanel({ lesson }: { lesson: ProgressiveLesson }) {
  const problem = lesson.problem;
  if (!problem) return null;
  return <section className="training-problem" aria-label="Đề bài đầy đủ">
    <div className="section-heading"><div><p className="eyebrow">Problem contract</p><h2>Đề bài đầy đủ</h2></div><code>{lesson.functionSignature}</code></div>
    <div className="official-problem-links">{problem.officialLinks.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}><span>{link.relation === "EXACT" ? "ĐỀ CHÍNH XÁC" : "BÀI LIÊN QUAN"}</span>{link.label} ↗</a>)}</div>
    <p>{problem.statement}</p>
    <div className="problem-contract-grid">
      <div><h3>Input</h3><ul>{problem.input.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div><h3>Output</h3><p>{problem.output}</p></div>
    </div>
    <div><h3>Constraints</h3><ul>{lesson.constraints.map((item) => <li key={item}>{item}</li>)}</ul></div>
    <div className="problem-examples"><h3>Ví dụ</h3>{problem.examples.map((example, index) => <article key={`${example.input}-${index}`}><p><b>Input:</b> <code>{example.input}</code></p><p><b>Output:</b> <code>{example.output}</code></p>{example.explanation && <p><b>Giải thích:</b> {example.explanation}</p>}</article>)}</div>
  </section>;
}

type LevelProps = {
  lesson: ProgressiveLesson;
  draft: TrainingDraft;
  update: (patch: Partial<TrainingDraft>) => void;
  submit: (type: LearningLevelType, answer: Json, passed: boolean, results?: CaseResult[], completed?: boolean) => Promise<unknown>;
  help: (level: number, solution?: boolean) => Promise<void>;
  busy: boolean;
  done: boolean;
};

function PatternBlueprintView({ lesson, draft, update, submit, busy, done }: LevelProps) {
  const step = lesson.levels![0]; const answer = draft.patternChoice ?? ""; const blueprint = draft.blueprintAnswers ?? {};
  const [feedback, setFeedback] = useState(""); const [locked, setLocked] = useState(false);
  const check = async () => {
    const fields = checkBlueprintAnswers(step.blueprint, blueprint); const patternPassed = checkPatternChoice({ ...step, type: "PATTERN_CHOICE" }, answer);
    const passed = patternPassed && fields.passed;
    const saved = await submit(step.type, { optionId: answer, blueprint, fields: fields.fields }, passed);
    if (saved) { setLocked(true); setFeedback(passed ? "Đúng pattern và blueprint." : `Cần sửa: ${!patternPassed ? "pattern" : ""} ${fields.fields.filter((field) => !field.passed).map((field) => field.id).join(", ")}`); }
  };
  return <LevelShell number={1} title="Pattern + Blueprint" prompt={step.prompt} done={done}>
    <div className="choice-grid">{step.options.map((option) => <label className={answer === option.id ? "selected" : ""} key={option.id}><input type="radio" name="pattern-choice" checked={answer === option.id} onChange={() => update({ patternChoice: option.id })} /><span><b>{option.label}</b></span></label>)}</div>
    <div className="fill-grid">{step.blueprint.map((field) => <label key={field.id}><b>{field.label}</b> · {field.prompt}<input value={blueprint[field.id] ?? ""} onChange={(event) => update({ blueprintAnswers: { ...blueprint, [field.id]: event.target.value } })} placeholder="Trả lời ngắn một dòng" /></label>)}</div>
    {locked && <div className="blueprint-reference"><h3>Canonical reference</h3>{step.blueprint.map((field) => <p key={field.id}><b>{field.id}:</b> {field.canonical}</p>)}</div>}
    <Action feedback={feedback} disabled={busy || !answer || step.blueprint.some((field) => !(blueprint[field.id] ?? "").trim())} busy={busy} onClick={check} />
  </LevelShell>;
}

function shuffled(ids: string[]) {
  const next = [...ids];
  for (let index = next.length - 1; index > 0; index--) { const swap = Math.floor(Math.random() * (index + 1)); [next[index], next[swap]] = [next[swap], next[index]]; }
  if (next.length > 1 && next.every((id, index) => id === ids[index])) [next[0], next[1]] = [next[1], next[0]];
  return next;
}

function SortableList({ order, labels, onChange }: { order: string[]; labels: Map<string, ReactNode>; onChange: (order: string[]) => void }) {
  const [dragged, setDragged] = useState<number | null>(null);
  const move = (index: number, delta: number) => { const target = index + delta; if (target < 0 || target >= order.length) return; const next = [...order]; [next[index], next[target]] = [next[target], next[index]]; onChange(next); };
  const drop = (target: number) => { if (dragged === null || dragged === target) return; const next = [...order]; const [id] = next.splice(dragged, 1); next.splice(target, 0, id); setDragged(null); onChange(next); };
  return <div className="block-order">{order.map((id, index) => <div key={`${id}-${index}`} draggable onDragStart={() => setDragged(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => drop(index)}><span>{index + 1}</span><div className="sortable-content">{labels.get(id)}</div><div><button className="secondary" aria-label={`Đưa ${id} lên`} disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button className="secondary" aria-label={`Đưa ${id} xuống`} disabled={index === order.length - 1} onClick={() => move(index, 1)}>↓</button></div></div>)}</div>;
}

function LogicOrderingView({ lesson, draft, update, submit, busy, done }: LevelProps) {
  const step = lesson.levels![1]; const [initial] = useState(() => shuffled(step.items.map((item) => item.id)));
  const order = draft.logicOrder?.length === step.items.length ? draft.logicOrder : initial; const [feedback, setFeedback] = useState("");
  useEffect(() => { if (!draft.logicOrder) update({ logicOrder: initial }); }, []);
  const check = async () => { const result = validateLogicOrder(step, order); const saved = await submit(step.type, { order }, result.passed); if (saved) setFeedback(result.passed ? "Đúng thứ tự logic." : "Chưa đúng. Kiểm tra vùng subgoal quanh choose/explore/restore hoặc base case."); };
  return <LevelShell number={2} title="Logic ordering bằng tiếng Việt" prompt={step.prompt} done={done}><SortableList order={order} labels={new Map(step.items.map((item) => [item.id, item.text]))} onChange={(next) => update({ logicOrder: next })} /><Action feedback={feedback} disabled={busy} busy={busy} onClick={check} /></LevelShell>;
}

function CodeOrderingView({ lesson, draft, update, submit, busy, done }: LevelProps) {
  const step = lesson.levels![2]; const [initial] = useState(() => shuffled(step.blocks.map((block) => block.id)));
  const order = draft.codeBlockOrder?.length === step.blocks.length ? draft.codeBlockOrder : initial; const [feedback, setFeedback] = useState(""); const [results, setResults] = useState<CaseResult[]>([]); const [checking, setChecking] = useState(false);
  useEffect(() => { if (!draft.codeBlockOrder) update({ codeBlockOrder: initial }); }, []);
  const check = async () => { setChecking(true); const result = await evaluateBlockOrder(step, order, runCodeCases); setResults(result.results); const saved = await submit(step.type, { order, source: result.source, canonicalMatched: result.canonicalMatched }, result.passed, result.results); setChecking(false); if (saved) setFeedback(result.passed ? "Code ghép đúng scope và pass tests." : result.valid ? "Code ghép chưa đúng canonical hoặc không pass tests." : "Danh sách block thiếu, thừa, trùng hoặc có ID lạ."); };
  return <LevelShell number={3} title="Code block ordering" prompt={step.prompt} done={done}><SortableList order={order} labels={new Map(step.blocks.map((block) => [block.id, <pre key={block.id}><code>{block.code}</code></pre>]))} onChange={(next) => update({ codeBlockOrder: next })} />{results.length > 0 && <CaseResults results={results} />}<Action feedback={feedback} disabled={busy || checking} busy={busy || checking} onClick={check} /></LevelShell>;
}

export function BlockWritingView({ lesson, draft, update, submit, busy, done }: LevelProps) {
  const step = lesson.levels![3]; const legacyBlocks = draft.writtenBlocks ?? {};
  const legacySource = assembleWrittenBlocks(step.blocks, legacyBlocks).trim();
  const code = draft.blockWritingCode ?? legacySource;
  const [results, setResults] = useState<CaseResult[]>([]); const [feedback, setFeedback] = useState(""); const [checking, setChecking] = useState(false);
  const check = async () => { setChecking(true); const next = await runCodeCases(code, step.tests); setResults(next); const passed = next.every((test) => test.passed); const saved = await submit(step.type, { code, subgoals: step.blocks.map((block) => block.id) }, passed, next); setChecking(false); if (saved) setFeedback(passed ? "Lời giải hoàn chỉnh pass toàn bộ tests." : "Code chưa compile/pass. Kiểm tra lại scope, dấu ngoặc và từng subgoal trong checklist."); };
  return <LevelShell number={4} title="Viết trọn lời giải" prompt={step.prompt} done={done}>
    <div className="guided-code-layout"><aside><h3>Checklist subgoal</h3><ol>{step.blocks.map((block) => <li key={block.id}><b>{block.id}</b><span>{block.subgoal}</span></li>)}</ol></aside><div><CodeEditor value={code} onChange={(next) => update({ blockWritingCode: next })} /></div></div>
    {legacySource && draft.blockWritingCode === undefined && <p className="draft-migration-note">Đã tự ghép draft từng block cũ vào editor. Từ giờ bạn sửa trực tiếp toàn bộ code tại đây.</p>}
    {results.length > 0 && <CaseResults results={results} />}<Action feedback={feedback} disabled={busy || checking || !code.trim()} busy={busy || checking} onClick={check} />
  </LevelShell>;
}

function FullRecallView({ lesson, draft, update, submit, help, busy, done }: LevelProps) {
  const step = lesson.levels![4]; const code = draft.fullRecallCode ?? ""; const [hintLevel, setHintLevel] = useState(0);
  const tested = async (results: CaseResult[]) => { const passed = results.every((test) => test.passed); await submit(step.type, { code, hintLevel }, passed, results); };
  const reveal = async () => { const next = Math.min(5, hintLevel + 1); setHintLevel(next); await help(next, next === 5); };
  return <LevelShell number={5} title="Full recall từ trang trắng" prompt={step.prompt} done={done}><p><b>Problem:</b> {lesson.description}</p><p><b>Constraints:</b> {lesson.constraints.join(" · ")}</p><p><b>Signature:</b> <code>{lesson.functionSignature}</code></p><TestCodePanel code={code} setCode={(next) => update({ fullRecallCode: next })} tests={step.tests} busy={busy} onResults={tested} /><div className="code-help"><button className="secondary" disabled={hintLevel === 5} onClick={() => { void reveal(); }}>{hintLevel ? `Mở Hint ${hintLevel + 1}` : "Mở Hint 1"}</button>{hintLevel > 0 && <pre className="code-block"><code>{step.hints[hintLevel - 1]}</code></pre>}</div></LevelShell>;
}

function TransferCard({ challenge, lesson, draft, update, submit, help, busy }: { challenge: TransferChallenge } & LevelProps) {
  const codes = draft.transferCode ?? {}; const answersByChallenge = draft.transferAnswers ?? {}; const answers = answersByChallenge[challenge.id] ?? {}; const passedIds = draft.transferPassedIds ?? [];
  const code = codes[challenge.id] ?? challenge.starterCode; const [showSolution, setShowSolution] = useState(false);
  const tested = async (results: CaseResult[]) => {
    const reflectionReady = challenge.kind === "DEBUG" || VARIANT_QUESTIONS.every((question) => (answers[question] ?? "").trim());
    const challengePassed = reflectionReady && results.every((test) => test.passed); const nextPassed = challengePassed ? [...new Set([...passedIds, challenge.id])] : passedIds;
    update({ transferPassedIds: nextPassed });
    const kinds = lesson.levels![5].challenges.filter((item) => nextPassed.includes(item.id)).map((item) => item.kind);
    await submit("DEBUG_VARIANT", { challengeId: challenge.id, challengeKind: challenge.kind, code, reflection: answers, completedChallenges: nextPassed }, challengePassed, results, kinds.includes("DEBUG") && kinds.includes("VARIANT"));
  };
  return <article className={`variant-card ${passedIds.includes(challenge.id) ? "done" : ""}`}><div><span className="lesson-id">{passedIds.includes(challenge.id) ? "PASSED" : challenge.kind}</span><h3>{challenge.title}</h3><p>{challenge.change}</p><code>{challenge.functionSignature}</code></div>{challenge.kind === "VARIANT" && <div className="fill-grid">{VARIANT_QUESTIONS.map((question) => <label key={question}>{question}<input value={answers[question] ?? ""} onChange={(event) => update({ transferAnswers: { ...answersByChallenge, [challenge.id]: { ...answers, [question]: event.target.value } } })} /></label>)}</div>}<TestCodePanel code={code} setCode={(next) => update({ transferCode: { ...codes, [challenge.id]: next } })} tests={challenge.tests} busy={busy} onResults={tested} /><div className="code-help"><button className="secondary" onClick={() => { setShowSolution(true); void help(5, true); }}>Mở solution</button>{showSolution && <pre className="code-block"><code>{challenge.solution}</code></pre>}</div></article>;
}

function DebugVariantView(props: LevelProps) {
  const step = props.lesson.levels![5];
  return <LevelShell number={6} title="Debug + Contract Variant" prompt={step.prompt} done={props.done}><div className="variant-list">{step.challenges.map((challenge) => <TransferCard {...props} challenge={challenge} key={challenge.id} />)}</div></LevelShell>;
}

export function ProgressiveTrainingLesson({ lessonId, userId, configured }: { lessonId?: string; userId?: string; configured: boolean }) {
  const lesson = lessonId ? progressiveLessonById.get(lessonId) : undefined;
  if (!lesson) return <main><h1>Không tìm thấy training lesson</h1><a href="#/training">← Progressive Training</a></main>;
  if (!configured || !userId) return <main><a href="#/training">← Progressive Training</a><div className="training-gate"><h1>Cần đăng nhập Supabase</h1><p>Module này chỉ bắt đầu khi có authenticated user; không tạo progress local thay thế.</p></div></main>;
  if (!lesson.levels) return <main><p className="training-error">Lesson chưa được chuyển sang engine sáu level.</p></main>;
  return <AuthenticatedLesson lesson={lesson} userId={userId} />;
}

function AuthenticatedLesson({ lesson, userId }: { lesson: ProgressiveLesson; userId: string }) {
  const training = useProgressiveTraining(userId, lesson); const [viewLevel, setViewLevel] = useState(1);
  const completed = training.progress?.completed_steps ?? [];
  const route = useMemo(() => training.progress ? adaptiveLevelRoute(training.progress) : [1, 2, 3, 4, 5, 6], [training.progress]);
  useEffect(() => { if (training.progress) setViewLevel(Math.min(6, Math.max(1, training.progress.current_step))); }, [training.progress?.current_step]);
  const props = useMemo<LevelProps>(() => ({
    lesson, draft: training.draft, update: training.updateDraft, help: training.markHelp,
    busy: training.submitting, done: completed.includes(viewLevel),
    submit: async (type, answer, passed, results = [], stepCompleted = passed) => {
      const saved = await training.submitAttempt(type, answer, passed, results as unknown as Json, stepCompleted);
      if (!saved) return saved;
      if (type === "FULL_RECALL" && !passed) setViewLevel(4);
      else if (stepCompleted) setViewLevel(nextLevelInRoute(viewLevel, route));
      return saved;
    },
  }), [lesson, training.draft, training.submitting, training.progress, completed, viewLevel, route]);
  if (training.loading) return <main><p className="training-loading">Đang tải bài và tiến độ từ Supabase…</p></main>;
  if (!training.progress) return <main><p className="training-error">{training.error || "Không tải được tiến độ"}</p><button onClick={() => { void training.reload(); }}>Thử lại</button></main>;
  return <main className="training-lesson"><a href="#/training">← Progressive Training</a><div className="page-title"><div><p className="eyebrow">{lesson.priority} · {lesson.basePattern}</p><h1>{lesson.title}</h1><p className="exam-countdown">{lesson.description}</p></div><span>{completed.length}/6 level</span></div>
    <ProblemStatementPanel lesson={lesson} />
    <div className="training-stepper">{LEVEL_LABELS.map((label, index) => { const number = index + 1; const accessible = completed.includes(number) || (route.includes(number) && number <= training.progress!.current_step); return <button className={`${viewLevel === number ? "active" : ""} ${completed.includes(number) ? "done" : ""}`} disabled={!accessible} onClick={() => setViewLevel(number)} key={label}><span>{completed.includes(number) ? "✓" : number}</span>{label}</button>; })}</div>
    <div className={`save-indicator ${training.saveStatus}`}>{training.saveStatus === "saving" ? "Đang lưu Supabase…" : training.saveStatus === "saved" ? "Đã lưu Supabase" : training.saveStatus === "error" ? "Lưu lỗi — input vẫn còn trên màn hình" : `${training.progress.mastery_level} · ${training.progress.attempt_count} attempts`}</div>
    {training.error && <div className="training-error"><span>{training.error}</span><button className="secondary" onClick={() => { void training.reload(); }}>Tải lại từ server</button></div>}
    {viewLevel === 1 && <PatternBlueprintView {...props} />}{viewLevel === 2 && <LogicOrderingView {...props} />}{viewLevel === 3 && <CodeOrderingView {...props} />}{viewLevel === 4 && <BlockWritingView {...props} />}{viewLevel === 5 && <FullRecallView {...props} />}{viewLevel === 6 && <DebugVariantView {...props} />}
  </main>;
}
