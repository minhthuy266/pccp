import { describe, expect, it } from "vitest";
import { normalizeExpected } from "../../domain/runner";
import { progressiveLessons } from "./lessons";
import { STEP_TYPES } from "./types";

async function execute(code: string, expression: string) {
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const value = await new AsyncFunction(`${code}\nreturn (${expression});`)();
  return JSON.stringify(value);
}

describe("progressive training vertical slice", () => {
  it("contains exactly two validated P0 lessons with all five steps", () => {
    expect(progressiveLessons).toHaveLength(2);
    for (const lesson of progressiveLessons) {
      expect(lesson.priority).toBe("P0");
      expect(lesson.steps.map((step) => step.type)).toEqual(STEP_TYPES);
      expect(lesson.steps[4].challenges).toHaveLength(2);
    }
  });
  it("keeps every full-code and variant canonical solution executable against its deterministic corpus", async () => {
    for (const lesson of progressiveLessons) {
      for (const test of lesson.steps[3].tests) expect(await execute(lesson.steps[3].solution, test.expression), `${lesson.id}: ${test.label}`).toBe(normalizeExpected(test.expected));
      for (const challenge of lesson.steps[4].challenges) {
        for (const test of challenge.tests) expect(await execute(challenge.solution, test.expression), `${lesson.id}/${challenge.id}: ${test.label}`).toBe(normalizeExpected(test.expected));
      }
    }
  });
});
