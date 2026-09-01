import { describe, expect, it } from "vitest";
import { progressiveLessons } from "./lessons";
import { groupProgressiveLessons } from "./patternGroups";

describe("progressive pattern roadmap", () => {
  it("places every lesson exactly once in a deliberate prerequisite order", () => {
    const groups = groupProgressiveLessons(progressiveLessons);
    expect(groups.map((group) => group.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(groups.flatMap((group) => group.lessons.map((lesson) => lesson.id))).toEqual([
      "PT-F01-TIME-NORMALIZATION",
      "PT-F02-RUN-SCAN", "PT-F04-FREQUENCY-MULTISET", "PT-F05-MULTIKEY-SORT",
      "PT-F03-GRID-NEIGHBORS", "PT-F06-ATOMIC-ROBOT",
      "PT-F09-QUEUE-HEAD", "PT-F07-COLLISION-TIMELINE",
      "PT-DFS-TAKE-SKIP", "PT-OF036-TARGET-NUMBER", "PT-F11-COMBINATION", "PT-BT-ASSIGNMENT", "PT-OF022-FATIGUE",
      "PT-OF023-POWER-GRID",
      "PT-OF057-INTERCEPTION",
      "PT-OF043-IMMIGRATION-BIGINT",
    ]);
    expect(groups.every((group) => group.recognition && group.invariant && group.prerequisite)).toBe(true);
  });
});
