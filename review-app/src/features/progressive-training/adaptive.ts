import type { ProgressiveTrainingProgressRow } from "../../cloud/database.types";

export type MasteryLevel = ProgressiveTrainingProgressRow["mastery_level"];

export function adaptiveLevelRoute(progress: Pick<ProgressiveTrainingProgressRow, "attempt_count" | "completed_steps" | "full_recall_passed" | "mastery_level">, lastFullRecallPassed?: boolean) {
  if (lastFullRecallPassed === false) return [4, 5, 6];
  if (progress.mastery_level === "MASTERED") return [5, 6];
  if (progress.full_recall_passed) return [1, 5, 6];
  if (progress.attempt_count > 0 && [1, 2, 3].every((level) => progress.completed_steps.includes(level))) return [1, 4, 5, 6];
  return [1, 2, 3, 4, 5, 6];
}

export function nextLevelInRoute(current: number, route: number[]) {
  return route.find((level) => level > current) ?? current;
}

export function masteryFromEvidence(input: {
  completedLevels: number[];
  fullRecallPassed: boolean;
  debugPassed: boolean;
  variantPassed: boolean;
  hintLevel: number;
  viewedSolution: boolean;
  firstFullRecallAt: string | null;
  now: string;
}): MasteryLevel {
  if (!input.completedLevels.length) return "NEW";
  if (!input.fullRecallPassed) return input.completedLevels.includes(4) ? "BLOCK_RECALL" : "LEARNING";
  if (input.viewedSolution || input.hintLevel > 0) return "ASSISTED_RECALL";
  const transfer = input.debugPassed || input.variantPassed;
  if (!transfer) return "FULL_RECALL";
  const differentDay = Boolean(input.firstFullRecallAt)
    && input.firstFullRecallAt!.slice(0, 10) !== input.now.slice(0, 10);
  return differentDay ? "MASTERED" : "TRANSFER_READY";
}

export function reviewDelayDays(mastery: MasteryLevel) {
  if (mastery === "MASTERED") return 7;
  if (mastery === "TRANSFER_READY") return 3;
  if (mastery === "FULL_RECALL" || mastery === "ASSISTED_RECALL") return 1;
  return null;
}
