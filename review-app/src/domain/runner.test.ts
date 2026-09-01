import { describe, expect, it } from "vitest";
import { inferredFunctionName, normalizeExpected, runnerWorkerSource } from "./runner";

describe("sample runner", () => {
  it("infers the first declared function", () => expect(inferredFunctionName("function solve(a) { return a; }" )).toBe("solve"));
  it("normalizes JSON whitespace", () => expect(normalizeExpected("[1, 2]" )).toBe("[1,2]"));
  it("builds an isolated multi-case worker program", () => {
    expect(runnerWorkerSource()).toContain("self.onmessage");
    expect(runnerWorkerSource()).toContain("for (const item of data.cases)");
  });
});
