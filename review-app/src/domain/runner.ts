export function inferredFunctionName(code: string) {
  return code.match(/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/)?.[1] ?? "solution";
}

export function runnerWorkerSource() {
  return `self.onmessage = async ({ data }) => {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const results = [];
    for (const item of data.cases) {
      try {
        const result = await new AsyncFunction(data.code + "\\nreturn (" + item.expression + ");")();
        const encoded = JSON.stringify(result, (_, value) => typeof value === "bigint" ? value.toString() + "n" : value);
        const actual = encoded === undefined ? "undefined" : encoded;
        results.push({ label: item.label, passed: actual === item.expected, expected: item.expected, actual });
      } catch (error) {
        results.push({ label: item.label, passed: false, expected: item.expected, error: error && error.message ? error.message : String(error) });
      }
    }
    self.postMessage({ results });
  };`;
}

export function normalizeExpected(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try { return JSON.stringify(JSON.parse(trimmed)); }
  catch { return trimmed; }
}
