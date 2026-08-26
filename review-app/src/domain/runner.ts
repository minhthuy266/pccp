export function inferredFunctionName(code: string) {
  return code.match(/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/)?.[1] ?? "solution";
}

export function runnerWorkerSource() {
  return `self.onmessage = async ({ data }) => {
    try {
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const result = await new AsyncFunction(data.code + "\\nreturn (" + data.expression + ");")();
      const actual = JSON.stringify(result, (_, value) => typeof value === "bigint" ? value.toString() + "n" : value);
      self.postMessage({ ok: true, actual: actual === undefined ? "undefined" : actual });
    } catch (error) {
      self.postMessage({ ok: false, error: error && error.message ? error.message : String(error) });
    }
  };`;
}

export function normalizeExpected(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try { return JSON.stringify(JSON.parse(trimmed)); }
  catch { return trimmed; }
}
