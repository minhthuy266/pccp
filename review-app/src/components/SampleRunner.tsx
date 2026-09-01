import { useState } from "react";
import { inferredFunctionName } from "../domain/runner";
import { adaptFixtureExpression, fixtureForLesson } from "../fixtures";
import { runCodeCases } from "../domain/workerClient";

type Result = { kind: "pass" | "fail" | "result" | "error"; text: string };

export function SampleRunner({ lessonId, code, canonicalCode, onPassed }: { lessonId: string; code: string; canonicalCode: string; onPassed: () => void }) {
  const functionName = inferredFunctionName(code || canonicalCode);
  const fixture = fixtureForLesson(lessonId);
  const [expression, setExpression] = useState(() => fixture ? adaptFixtureExpression(fixture.expression, functionName) : `${functionName}(/* sample arguments */)`);
  const [expected, setExpected] = useState(() => fixture?.expected ?? "");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const run = async () => {
    if (!code.trim() || !expression.trim()) return;
    setRunning(true); setResult(null);
    const [test] = await runCodeCases(code, [{ label: "sample", expression, expected }]);
    setRunning(false);
    if (test.error) { setResult({ kind: "error", text: test.error }); return; }
    if (!expected.trim()) { setResult({ kind: "result", text: test.actual ?? "undefined" }); return; }
    setResult({ kind: test.passed ? "pass" : "fail", text: test.passed ? `PASS · ${test.actual}` : `Expected ${test.expected}\nReceived ${test.actual}` });
    if (test.passed) onPassed();
  };
  return <details className="sample-runner"><summary>Chạy sample ngay trong app {fixture && <span>· đã nạp fixture chính thức</span>}</summary><p>{fixture ? "App đã lấy một test từ bộ certified của lesson. Bạn vẫn có thể sửa lời gọi và expected để thử edge case." : "Nhập lời gọi hàm và output mong đợi dưới dạng JSON."} Code chạy trong Worker và bị dừng sau 2 giây.</p><label>Lời gọi<textarea rows={4} value={expression} onChange={(event) => setExpression(event.target.value)} spellCheck={false} /></label><label>Expected JavaScript/JSON <small>(để trống nếu chỉ muốn xem output)</small><textarea rows={3} value={expected} onChange={(event) => setExpected(event.target.value)} placeholder='Ví dụ: ["a","b"] hoặc 4' spellCheck={false} /></label><button disabled={running || !code.trim() || !expression.trim()} onClick={() => { void run(); }}>{running ? "Đang chạy…" : "Run sample"}</button>{result && <pre className={`runner-result ${result.kind}`}>{result.text}</pre>}</details>;
}
