import { describe, expect, it } from "vitest";
import { analysisMastered, analysisScore, scoreBand, weakAssessments } from "./assessment";
import { ANALYSIS_FIELDS, type AnalysisField, type AssessmentStatus, type FieldAssessment } from "../types";

const assessments = (status: AssessmentStatus): Record<AnalysisField, FieldAssessment> => Object.fromEntries(
  ANALYSIS_FIELDS.map((field) => [field, { status, correctionNote: "note", learnerAnswer: "answer" }]),
) as Record<AnalysisField, FieldAssessment>;

describe("structured analysis assessment", () => {
  it("scores nine fields out of 18 and assigns bands", () => {
    expect(analysisScore(assessments("CORRECT"), [...ANALYSIS_FIELDS]).normalized).toBe(18);
    expect(scoreBand(18)).toBe("strong");
    expect(scoreBand(15)).toBe("partial");
    expect(scoreBand(10)).toBe("weak");
    expect(scoreBand(7)).toBe("relearn");
  });
  it("normalizes when unavailable references are excluded", () => {
    const available = ANALYSIS_FIELDS.slice(0, 8);
    expect(analysisScore(assessments("CORRECT"), available).normalized).toBe(18);
  });
  it("never masters analysis with a wrong critical field", () => {
    const result = assessments("CORRECT");
    result.Pattern = { ...result.Pattern, status: "WRONG" };
    expect(analysisMastered(result, [...ANALYSIS_FIELDS])).toBe(false);
  });
  it("returns only weak field names and correction notes", () => {
    const result = assessments("CORRECT");
    result.State = { ...result.State, status: "PARTIAL", correctionNote: "Define queue state" };
    expect(weakAssessments(result)).toEqual([{ field: "State", ...result.State }]);
  });
});
