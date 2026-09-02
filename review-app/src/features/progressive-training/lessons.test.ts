import { describe, expect, it } from "vitest";
import { normalizeExpected } from "../../domain/runner";
import { assembleBlockCode, assembleWrittenBlocks } from "./evaluate";
import { progressiveLessons } from "./lessons";
import { LEVEL_TYPES, STEP_TYPES } from "./types";

async function execute(code: string, expression: string) {
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const value = await new AsyncFunction(`${code}\nreturn (${expression});`)();
  return JSON.stringify(value);
}

describe("progressive training executable lessons", () => {
  it("contains Content Batch A1 and priority D10 lessons with six canonical levels", () => {
    expect(progressiveLessons).toHaveLength(24);
    expect(progressiveLessons.map((lesson) => lesson.id)).toEqual([
      "PT-F01-TIME-NORMALIZATION", "PT-F02-RUN-SCAN", "PT-F03-GRID-NEIGHBORS",
      "PT-F04-FREQUENCY-MULTISET", "PT-F05-MULTIKEY-SORT", "PT-F06-ATOMIC-ROBOT",
      "PT-F07-COLLISION-TIMELINE", "PT-F09-QUEUE-HEAD", "PT-F11-COMBINATION",
      "PT-F12-GRAPH-BFS", "PT-F12-GRID-BFS", "PT-F12-EXPANDED-STATE-BFS",
      "PT-F15-SCOVILLE-HEAP", "PT-F15-BOUNDED-TOP-K", "PT-F15-EVENT-HEAP-SCHEDULING",
      "PT-F13-NETWORK-COMPONENTS", "PT-F13-ROOTED-TREE-PROFILE",
      "PT-OF036-TARGET-NUMBER", "PT-OF022-FATIGUE",
      "PT-OF023-POWER-GRID", "PT-OF057-INTERCEPTION", "PT-OF043-IMMIGRATION-BIGINT",
      "PT-DFS-TAKE-SKIP", "PT-BT-ASSIGNMENT",
    ]);
    for (const lesson of progressiveLessons) {
      expect(lesson.priority).toBe("P0");
      expect(lesson.problem?.statement.length).toBeGreaterThan(40);
      expect(lesson.problem?.officialLinks.length).toBeGreaterThan(0);
      expect(lesson.problem?.officialLinks.every((link) => link.url.startsWith("https://school.programmers.co.kr/"))).toBe(true);
      expect(lesson.problem?.input.length).toBeGreaterThan(0);
      expect(lesson.problem?.output.length).toBeGreaterThan(0);
      expect(lesson.problem?.examples.length).toBeGreaterThan(0);
      if (lesson.steps) expect(lesson.steps.map((step) => step.type)).toEqual(STEP_TYPES);
      expect(lesson.levels?.map((level) => level.type)).toEqual(LEVEL_TYPES);
      if (lesson.steps) expect(lesson.steps[4].challenges).toHaveLength(2);
      expect(lesson.levels?.[5].challenges.filter((challenge) => challenge.kind === "DEBUG")).toHaveLength(2);
      expect(lesson.levels?.[5].challenges.filter((challenge) => challenge.kind === "VARIANT").length).toBeGreaterThanOrEqual(2);
    }
  });
  it("keeps every full-code and variant canonical solution executable against its deterministic corpus", async () => {
    for (const lesson of progressiveLessons) {
      if (!lesson.steps) continue;
      for (const test of lesson.steps[3].tests) expect(await execute(lesson.steps[3].solution, test.expression), `${lesson.id}: ${test.label}`).toBe(normalizeExpected(test.expected));
      for (const challenge of lesson.steps[4].challenges) {
        for (const test of challenge.tests) expect(await execute(challenge.solution, test.expression), `${lesson.id}/${challenge.id}: ${test.label}`).toBe(normalizeExpected(test.expected));
      }
    }
  });
  it("keeps canonical block-ordering source executable against the full-code corpus", async () => {
    for (const lesson of progressiveLessons) {
      const ordering = lesson.levels![2];
      const code = assembleBlockCode(ordering, ordering.correctOrder);
      for (const test of ordering.tests) {
        expect(await execute(code, test.expression), `${lesson.id} blocks: ${test.label}`).toBe(normalizeExpected(test.expected));
      }
    }
  });
  it("executes canonical block-writing and full-recall solutions", async () => {
    for (const lesson of progressiveLessons) {
      const levels = lesson.levels!;
      const answers = Object.fromEntries(levels[3].blocks.map((block) => [block.id, block.canonicalCode]));
      const blockSource = assembleWrittenBlocks(levels[3].blocks, answers);
      for (const test of levels[3].tests) expect(await execute(blockSource, test.expression), `${lesson.id} writing: ${test.label}`).toBe(normalizeExpected(test.expected));
      for (const test of levels[4].tests) expect(await execute(levels[4].solution, test.expression), `${lesson.id} recall: ${test.label}`).toBe(normalizeExpected(test.expected));
    }
  });
  it("ensures every debug starter fails a revealing test while every debug/variant solution passes", async () => {
    for (const lesson of progressiveLessons) {
      for (const challenge of lesson.levels![5].challenges) {
        const starterResults = await Promise.all(challenge.tests.map((test) => execute(challenge.starterCode, test.expression).catch(() => "THREW")));
        if (challenge.kind === "DEBUG") expect(starterResults.some((actual, index) => actual !== normalizeExpected(challenge.tests[index].expected)), `${lesson.id}/${challenge.id} starter`).toBe(true);
        for (const test of challenge.tests) expect(await execute(challenge.solution, test.expression), `${lesson.id}/${challenge.id}: ${test.label}`).toBe(normalizeExpected(test.expected));
      }
    }
  });
});
