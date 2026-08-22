import { ANALYSIS_FIELDS, type AnalysisField, type FieldAssessment } from "../types";

export const CRITICAL_FIELDS: AnalysisField[] = ["Pattern", "State", "Transition"];
export const ASSESSMENT_POINTS = { CORRECT: 2, PARTIAL: 1, WRONG: 0 } as const;

export function analysisScore(assessment: Partial<Record<AnalysisField, FieldAssessment>>, available: AnalysisField[]) {
  const raw = available.reduce((sum, field) => sum + (assessment[field] ? ASSESSMENT_POINTS[assessment[field]!.status] : 0), 0);
  const availablePoints = available.length * 2;
  const normalized = availablePoints ? Math.round(raw * 18 / availablePoints) : 0;
  return { raw, availablePoints, normalized };
}

export function scoreBand(score: number) {
  if (score >= 16) return "strong";
  if (score >= 12) return "partial";
  if (score >= 8) return "weak";
  return "relearn";
}

export function analysisMastered(assessment: Partial<Record<AnalysisField, FieldAssessment>>, available: AnalysisField[]) {
  const completed = available.every((field) => assessment[field]);
  return completed && analysisScore(assessment, available).normalized >= 16
    && !CRITICAL_FIELDS.some((field) => assessment[field]?.status === "WRONG");
}

export function weakAssessments(assessment?: Partial<Record<AnalysisField, FieldAssessment>>) {
  return ANALYSIS_FIELDS.flatMap((field) => {
    const item = assessment?.[field];
    return item && item.status !== "CORRECT" ? [{ field, ...item }] : [];
  });
}
