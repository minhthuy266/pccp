import { describe, expect, it } from "vitest";
import { normalizeExpected } from "../../domain/runner";
import { assembleBlockCode, checkBlueprintAnswers, checkFillAnswers, checkPatternChoice, evaluateBlockOrder, validateBlockOrderStructure, validateLogicOrder } from "./evaluate";
import { progressiveLessons } from "./lessons";
import type { CaseResult, CodeTestCase } from "./types";

async function executeCases(code: string, cases: CodeTestCase[]): Promise<CaseResult[]> {
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  return Promise.all(cases.map(async (test) => {
    const expected = normalizeExpected(test.expected);
    try {
      const value = await new AsyncFunction(`${code}\nreturn (${test.expression});`)();
      const actual = JSON.stringify(value);
      return { label: test.label, passed: actual === expected, expected, actual };
    } catch (error) {
      return { label: test.label, passed: false, expected, error: error instanceof Error ? error.message : String(error) };
    }
  }));
}

describe("progressive training graders", () => {
  const lesson = progressiveLessons.find((item) => item.id === "PT-DFS-TAKE-SKIP")!;
  it("grades the pattern choice without fuzzy matching", () => {
    expect(checkPatternChoice(lesson.steps![0], "take-skip")).toBe(true);
    expect(checkPatternChoice(lesson.steps![0], "permutation")).toBe(false);
  });
  it("rejects reversed block order even when all IDs are present", async () => {
    const step = lesson.levels![2];
    const result = await evaluateBlockOrder(step, [...step.correctOrder].reverse(), executeCases);
    expect(result.valid).toBe(true);
    expect(result.passed).toBe(false);
  });
  it("normalizes harmless whitespace in fill answers", () => {
    const answers = { base: "sum===target ? 1:0", skip: "dfs(index+1,sum)", take: "dfs(index+1,sum+numbers[index]);" };
    expect(checkFillAnswers(lesson.steps![2], answers).passed).toBe(true);
  });
});

describe("executable block-ordering pipeline", () => {
  it("assembles both canonical lessons into compiling code that passes deterministic tests", async () => {
    for (const item of progressiveLessons) {
      const step = item.levels![2];
      const result = await evaluateBlockOrder(step, step.correctOrder, executeCases);
      expect(result.passed, item.id).toBe(true);
      expect(result.results.every((test) => test.passed), item.id).toBe(true);
      expect(assembleBlockCode(step, step.correctOrder)).toContain(`function ${item.functionSignature.split("(")[0]}`);
    }
  });

  it("rejects missing, extra, duplicate, and unknown block IDs before execution", async () => {
    const step = progressiveLessons.find((item) => item.id === "PT-BT-ASSIGNMENT")!.levels![2];
    const missing = step.correctOrder.slice(0, -1);
    const duplicate = [...step.correctOrder.slice(0, -1), step.correctOrder[0]];
    const extra = [...step.correctOrder, step.correctOrder[0]];
    const unknown = [...step.correctOrder.slice(0, -1), "not-a-block"];

    expect(validateBlockOrderStructure(step, missing)).toMatchObject({ valid: false, missingIds: ["close"] });
    expect(validateBlockOrderStructure(step, duplicate)).toMatchObject({ valid: false, duplicateIds: ["open"], missingIds: ["close"] });
    expect(validateBlockOrderStructure(step, extra)).toMatchObject({ valid: false, duplicateIds: ["open"] });
    expect(validateBlockOrderStructure(step, unknown)).toMatchObject({ valid: false, unknownIds: ["not-a-block"], missingIds: ["close"] });
    for (const order of [missing, duplicate, extra, unknown]) {
      const result = await evaluateBlockOrder(step, order, executeCases);
      expect(result.passed).toBe(false);
      expect(result.results).toEqual([]);
    }
  });

  it("detects the former assignment scope bug by executing assembled source", async () => {
    const step = progressiveLessons.find((item) => item.id === "PT-BT-ASSIGNMENT")!.levels![2];
    const closesOuterBeforeCall = ["open", "setup", "dfs", "base", "loop", "choose", "close-loop", "close-dfs", "close", "call"];
    const result = await evaluateBlockOrder(step, closesOuterBeforeCall, executeCases);
    expect(result.valid).toBe(true);
    expect(result.passed).toBe(false);
    expect(result.results.some((test) => !test.passed && test.error)).toBe(true);
  });
});

describe("six-level recall graders", () => {
  it("grades family-specific blueprint fields by accepted concepts", () => {
    const fields = progressiveLessons[0].levels![0].blueprint;
    const answers = Object.fromEntries(fields.map((field) => [field.id, field.canonical]));
    expect(checkBlueprintAnswers(fields, answers).passed).toBe(true);
    expect(checkBlueprintAnswers(fields, { ...answers, STATE: "không biết" }).passed).toBe(false);
  });
  it("validates logic ordering structure and canonical sequence", () => {
    const step = progressiveLessons[1].levels![1];
    expect(validateLogicOrder(step, step.correctOrder).passed).toBe(true);
    expect(validateLogicOrder(step, [...step.correctOrder].reverse()).passed).toBe(false);
    expect(validateLogicOrder(step, step.correctOrder.slice(1)).valid).toBe(false);
  });
});
