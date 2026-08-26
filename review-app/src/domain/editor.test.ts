import { describe, expect, it } from "vitest";
import { editCode, formatJavaScriptIndentation } from "./editor";

describe("lightweight code editor", () => {
  it("inserts spaces for Tab", () => {
    expect(editCode("const x = 1;", 0, 0, "Tab")?.value).toBe("  const x = 1;");
  });
  it("keeps indentation and indents after an opening brace", () => {
    const value = "  if (ok) {";
    expect(editCode(value, value.length, value.length, "Enter")?.value).toBe("  if (ok) {\n    ");
  });
  it("creates and positions paired delimiters", () => {
    expect(editCode("", 0, 0, "{")).toEqual({ value: "{}", selectionStart: 1, selectionEnd: 1 });
    expect(editCode("name", 0, 4, '"')?.value).toBe('"name"');
    expect(editCode("()", 1, 1, ")")).toEqual({ value: "()", selectionStart: 2, selectionEnd: 2 });
  });
  it("formats brace indentation without touching code content", () => {
    expect(formatJavaScriptIndentation("function run() {\nconst x = { a: 1 };\nif (x) {\nreturn x;\n}\n}"))
      .toBe("function run() {\n  const x = { a: 1 };\n  if (x) {\n    return x;\n  }\n}");
  });
});
