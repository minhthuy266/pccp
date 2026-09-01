import { describe, expect, it } from "vitest";
import { adaptiveLevelRoute, masteryFromEvidence, nextLevelInRoute, reviewDelayDays } from "./adaptive";

const progress = (patch: Record<string, unknown> = {}) => ({ attempt_count: 0, completed_steps: [], full_recall_passed: false, mastery_level: "NEW" as const, ...patch });

describe("deterministic adaptive routing", () => {
  it("routes new, structure-ready, recalled, and mastered learners", () => {
    expect(adaptiveLevelRoute(progress())).toEqual([1, 2, 3, 4, 5, 6]);
    expect(adaptiveLevelRoute(progress({ attempt_count: 3, completed_steps: [1, 2, 3], mastery_level: "LEARNING" }))).toEqual([1, 4, 5, 6]);
    expect(adaptiveLevelRoute(progress({ attempt_count: 5, completed_steps: [1, 2, 3, 4, 5], full_recall_passed: true, mastery_level: "FULL_RECALL" }))).toEqual([1, 5, 6]);
    expect(adaptiveLevelRoute(progress({ attempt_count: 9, completed_steps: [1, 2, 3, 4, 5, 6], full_recall_passed: true, mastery_level: "MASTERED" }))).toEqual([5, 6]);
  });
  it("returns to block writing after a failed full recall", () => {
    expect(adaptiveLevelRoute(progress({ full_recall_passed: true }), false)).toEqual([4, 5, 6]);
    expect(nextLevelInRoute(4, [4, 5, 6])).toBe(5);
  });
});

describe("mastery evidence", () => {
  const base = { completedLevels: [1, 2, 3, 4, 5, 6], fullRecallPassed: true, debugPassed: true, variantPassed: false, hintLevel: 0, viewedSolution: false, firstFullRecallAt: "2026-09-01T08:00:00.000Z", now: "2026-09-01T18:00:00.000Z" };
  it("does not master on the first day and requires clean recall", () => {
    expect(masteryFromEvidence(base)).toBe("TRANSFER_READY");
    expect(masteryFromEvidence({ ...base, now: "2026-09-02T08:00:00.000Z" })).toBe("MASTERED");
    expect(masteryFromEvidence({ ...base, now: "2026-09-02T08:00:00.000Z", viewedSolution: true })).toBe("ASSISTED_RECALL");
    expect(masteryFromEvidence({ ...base, now: "2026-09-02T08:00:00.000Z", hintLevel: 2 })).toBe("ASSISTED_RECALL");
  });
  it("uses the minimum D+1, D+3, D+7 schedule", () => {
    expect(reviewDelayDays("FULL_RECALL")).toBe(1);
    expect(reviewDelayDays("TRANSFER_READY")).toBe(3);
    expect(reviewDelayDays("MASTERED")).toBe(7);
  });
});
