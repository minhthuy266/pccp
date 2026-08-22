export type CodeEdit = { value: string; selectionStart: number; selectionEnd: number };

const PAIRS: Record<string, string> = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"', "`": "`" };

function replace(value: string, start: number, end: number, insertion: string, cursor = insertion.length): CodeEdit {
  return { value: value.slice(0, start) + insertion + value.slice(end), selectionStart: start + cursor, selectionEnd: start + cursor };
}

export function editCode(value: string, start: number, end: number, key: string, shiftKey = false): CodeEdit | null {
  if (key === "Tab") {
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    if (value.slice(start, end).includes("\n")) {
      const lineEndAt = value.indexOf("\n", end);
      const lineEnd = lineEndAt < 0 ? value.length : lineEndAt;
      const block = value.slice(lineStart, lineEnd);
      const lines = block.split("\n");
      const changed = lines.map((line) => shiftKey ? line.replace(/^ {1,2}/, "") : `  ${line}`).join("\n");
      const firstDelta = changed.split("\n")[0].length - lines[0].length;
      const totalDelta = changed.length - block.length;
      return { value: value.slice(0, lineStart) + changed + value.slice(lineEnd), selectionStart: Math.max(lineStart, start + firstDelta), selectionEnd: end + totalDelta };
    }
    if (shiftKey) {
      const removable = value.slice(lineStart, start).match(/^ {1,2}/)?.[0].length ?? 0;
      return { value: value.slice(0, lineStart) + value.slice(lineStart + removable), selectionStart: Math.max(lineStart, start - removable), selectionEnd: Math.max(lineStart, end - removable) };
    }
    return replace(value, start, end, "  ");
  }

  if (key === "Enter") {
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const indent = value.slice(lineStart, start).match(/^\s*/)?.[0] ?? "";
    const before = value.slice(0, start).trimEnd().at(-1);
    const after = value.slice(end).trimStart()[0];
    const opens = before && "{[(".includes(before);
    const matching = opens && PAIRS[before] === after;
    const insertion = matching ? `\n${indent}  \n${indent}` : `\n${indent}${opens ? "  " : ""}`;
    return replace(value, start, end, insertion, matching ? indent.length + 3 : insertion.length);
  }

  if (PAIRS[key]) {
    if (start === end && value[start] === PAIRS[key] && PAIRS[key] === key) return { value, selectionStart: start + 1, selectionEnd: start + 1 };
    const selected = value.slice(start, end);
    const insertion = `${key}${selected}${PAIRS[key]}`;
    return { value: value.slice(0, start) + insertion + value.slice(end), selectionStart: start + 1, selectionEnd: end + 1 };
  }

  if (start === end && ["}", ")", "]"].includes(key) && value[start] === key) {
    return { value, selectionStart: start + 1, selectionEnd: start + 1 };
  }

  if (key === "Backspace" && start === end && start > 0 && PAIRS[value[start - 1]] === value[start]) {
    return replace(value, start - 1, start + 1, "");
  }
  return null;
}

function braceDelta(line: string) {
  let delta = 0; let quote = ""; let escaped = false;
  for (let index = 0; index < line.length; index++) {
    const char = line[index];
    if (!quote && char === "/" && line[index + 1] === "/") break;
    if (escaped) { escaped = false; continue; }
    if (char === "\\" && quote) { escaped = true; continue; }
    if (["'", '"', "`"].includes(char)) { quote = quote === char ? "" : quote || char; continue; }
    if (!quote && "{[(".includes(char)) delta++;
    if (!quote && "}])".includes(char)) delta--;
  }
  return delta;
}

export function formatJavaScriptIndentation(source: string) {
  let depth = 0;
  return source.split("\n").map((raw) => {
    const line = raw.trim();
    if (!line) return "";
    const leadingClosers = line.match(/^[}\])]+/)?.[0].length ?? 0;
    const lineDepth = Math.max(0, depth - leadingClosers);
    const output = `${"  ".repeat(lineDepth)}${line}`;
    depth = Math.max(0, depth + braceDelta(line));
    return output;
  }).join("\n");
}
