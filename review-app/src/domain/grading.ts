import { ANALYSIS_FIELDS, type Grade, type ReviewRecord } from "../types";
import { CRITICAL_FIELDS } from "./assessment";

export const HINT_ORDER = ["recall1", "blueprint", "recall2", "recall3", "full"] as const;

export function suggestedGrade(hints: string[]): Grade {
  const deepest = Math.max(-1, ...hints.map((hint) => HINT_ORDER.indexOf(hint as typeof HINT_ORDER[number])));
  if (deepest < 0) return "A";
  if (deepest === 0) return "B";
  if (deepest <= 2) return "C";
  return "D";
}

export function isMastered(history: ReviewRecord[]): boolean {
  const coreHistory = history.filter((record) => record.practiceMode !== "TEMPLATE");
  const latest = coreHistory.at(-1);
  const assessedFields = latest?.analysisAssessment ? ANALYSIS_FIELDS.filter((field) => latest.analysisAssessment?.[field]) : [];
  const criticalWrong = CRITICAL_FIELDS.some((field) => latest?.analysisAssessment?.[field]?.status === "WRONG");
  return coreHistory.filter((record) => record.grade === "A" && record.masteryEligible === true).length >= 2
    && latest?.grade === "A" && latest.revealedHints.length === 0
    && (assessedFields.length === 0 || !criticalWrong)
    && latest.masteryEligible === true;
}
