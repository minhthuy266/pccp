import { describe, expect, it } from "vitest";
import { isMastered, suggestedGrade } from "./grading";
import type { ReviewRecord } from "../types";

const record = (grade: ReviewRecord["grade"], revealedHints: string[] = []): ReviewRecord => ({
  grade, revealedHints, reviewedAt: "2026-08-20T10:00:00.000Z", dueAt: "2026-08-21", durationSeconds: 60, errors: [], note: "", masteryEligible: true,
});

describe("grading", () => {
  it.each([[[], "A"], [["recall1"], "B"], [["recall1", "blueprint"], "C"], [["recall1", "blueprint", "recall2"], "C"], [["recall1", "blueprint", "recall2", "recall3"], "D"], [["full"], "D"]] as const)("maps hints to a grade", (hints, grade) => {
    expect(suggestedGrade([...hints])).toBe(grade);
  });
  it("requires two As and a hint-free latest A for mastery", () => {
    expect(isMastered([record("A"), record("A")])).toBe(true);
    expect(isMastered([record("A"), record("A", ["recall1"])] )).toBe(false);
    expect(isMastered([record("A"), record("B")])).toBe(false);
  });
  it("does not master a lesson when the latest critical analysis field is wrong", () => {
    const latest = record("A");
    latest.analysisAssessment = { Pattern: { status: "WRONG", correctionNote: "", learnerAnswer: "" } };
    expect(isMastered([record("A"), latest])).toBe(false);
  });
  it("does not count self-awarded As without mastery evidence", () => {
    const unsupported = record("A"); delete unsupported.masteryEligible;
    expect(isMastered([unsupported, unsupported])).toBe(false);
  });
});
