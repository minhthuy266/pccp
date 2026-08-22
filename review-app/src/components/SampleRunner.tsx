import { useState } from "react";
import { inferredFunctionName, normalizeExpected, runnerWorkerSource } from "../domain/runner";
import { adaptFixtureExpression, fixtureForLesson } from "../fixtures";

type Result = { kind: "pass" | "fail" | "result" | "error"; text: string };

export function SampleRunner({ lessonId, code, canonicalCode, onPassed }: { lessonId: string; code: string; canonicalCode: string; onPassed: () => void }) {
  const functionName = inferredFunctionName(code || canonicalCode);
  const fixture = fixtureForLesson(lessonId);
  const [expression, setExpression] = useState(() => fixture ? adaptFixtureExpression(fixture.expression, functionName) : `${functionName}(/* sample arguments */)`);
  const [expected, setExpected] = useState(() => fixture?.expected ?? "");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const run = () => {
    if (!code.trim() || !expression.trim()) return;
    setRunning(true); setResult(null);
    const url = URL.createObjectURL(new Blob([runnerWorkerSource()], { type: "text/javascript" }));
    const worker = new Worker(url);
    const finish = () => { worker.terminate(); URL.revokeObjectURL(url); setRunning(false); };
    const timeout = window.setTimeout(() => { finish(); setResult({ kind: "error", text: "Quá 2 giây — có thể có vòng lặp vô hạn hoặc code quá chậm." }); }, 2000);
    worker.onmessage = ({ data }: MessageEvent<{ ok: boolean; actual?: string; error?: string }>) => {
      window.clearTimeout(timeout); finish();
      if (!data.ok) { setResult({ kind: "error", text: data.error ?? "Runtime error" }); return; }
      const wanted = normalizeExpected(expected);
      if (!wanted) { setResult({ kind: "result", text: data.actual ?? "undefined" }); return; }
      const pass = data.actual === wanted;
      setResult({ kind: pass ? "pass" : "fail", text: pass ? `PASS · ${data.actual}` : `Expected ${wanted}\nReceived ${data.actual}` });
      if (pass) onPassed();
    };
    worker.onerror = (event) => { window.clearTimeout(timeout); finish(); setResult({ kind: "error", text: event.message || "Worker error" }); };
    worker.postMessage({ code, expression });
  };
  return <details className="sample-runner"><summary>Chạy sample ngay trong app {fixture && <span>· đã nạp fixture chính thức</span>}</summary><p>{fixture ? "App đã lấy một test từ bộ certified của lesson. Bạn vẫn có thể sửa lời gọi và expected để thử edge case." : "Nhập lời gọi hàm và output mong đợi dưới dạng JSON."} Code chạy trong Worker và bị dừng sau 2 giây.</p><label>Lời gọi<textarea rows={4} value={expression} onChange={(event) => setExpression(event.target.value)} spellCheck={false} /></label><label>Expected JavaScript/JSON <small>(để trống nếu chỉ muốn xem output)</small><textarea rows={3} value={expected} onChange={(event) => setExpected(event.target.value)} placeholder='Ví dụ: ["a","b"] hoặc 4' spellCheck={false} /></label><button disabled={running || !code.trim() || !expression.trim()} onClick={run}>{running ? "Đang chạy…" : "Run sample"}</button>{result && <pre className={`runner-result ${result.kind}`}>{result.text}</pre>}</details>;
}
