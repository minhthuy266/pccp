import { normalizeExpected, runnerWorkerSource } from "./runner";
import type { CaseResult, CodeTestCase } from "../features/progressive-training/types";

export function runCodeCases(code: string, cases: CodeTestCase[], timeoutMs = 2000): Promise<CaseResult[]> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(new Blob([runnerWorkerSource()], { type: "text/javascript" }));
    const worker = new Worker(url);
    let finished = false;
    const finish = (results: CaseResult[]) => {
      if (finished) return;
      finished = true;
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(results);
    };
    const timeout = window.setTimeout(() => finish(cases.map((item) => ({
      label: item.label, passed: false, expected: normalizeExpected(item.expected),
      error: `Quá ${timeoutMs / 1000} giây — có thể có vòng lặp vô hạn hoặc code quá chậm.`,
    }))), timeoutMs);
    worker.onmessage = ({ data }: MessageEvent<{ results: CaseResult[] }>) => {
      window.clearTimeout(timeout);
      finish(data.results);
    };
    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      finish(cases.map((item) => ({ label: item.label, passed: false, expected: normalizeExpected(item.expected), error: event.message || "Worker error" })));
    };
    worker.postMessage({ code, cases: cases.map((item) => ({ ...item, expected: normalizeExpected(item.expected) })) });
  });
}
