import { describe, expect, it } from "vitest";
import { checkBlockOrder, checkFillAnswers, checkPatternChoice } from "./evaluate";
import { progressiveLessons } from "./lessons";

describe("progressive training graders", () => {
  const lesson = progressiveLessons[0];
  it("grades the pattern choice without fuzzy matching", () => {
    expect(checkPatternChoice(lesson.steps[0], "take-skip")).toBe(true);
    expect(checkPatternChoice(lesson.steps[0], "permutation")).toBe(false);
  });
  it("requires the exact semantic block order", () => {
    expect(checkBlockOrder(lesson.steps[1], lesson.steps[1].correctOrder)).toBe(true);
    expect(checkBlockOrder(lesson.steps[1], [...lesson.steps[1].correctOrder].reverse())).toBe(false);
  });
  it("normalizes harmless whitespace in fill answers", () => {
    const answers = { base: "sum===target ? 1:0", skip: "dfs(index+1,sum)", take: "dfs(index+1,sum+numbers[index]);" };
    expect(checkFillAnswers(lesson.steps[2], answers).passed).toBe(true);
  });
});
