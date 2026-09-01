import type { Json, ProgressiveTrainingProgressRow } from "../../cloud/database.types";
import { supabase } from "../../cloud/supabase";
import type { ProgressiveLesson, TrainingDraft, TrainingStepType } from "./types";

export function emptyTrainingProgress(userId: string, lesson: ProgressiveLesson): ProgressiveTrainingProgressRow {
  const now = new Date().toISOString();
  return {
    user_id: userId, lesson_id: lesson.id, lesson_version: lesson.version,
    current_step: 1, completed_steps: [], mastery_level: "NEW",
    full_code_passed: false, full_recall_passed: false, debug_passed: false,
    variant_passed: false, first_full_recall_at: null, viewed_solution: false,
    hint_level_used: 0, attempt_count: 0, draft_answers: {},
    last_reviewed_at: null, next_review_at: null, created_at: now, updated_at: now,
  };
}

export async function loadTrainingProgress(userId: string, lesson: ProgressiveLesson) {
  if (!supabase) throw new Error("Supabase chưa được cấu hình");
  const { data, error } = await supabase.from("progressive_training_progress")
    .select("*").eq("user_id", userId).eq("lesson_id", lesson.id).maybeSingle();
  if (error) throw error;
  return data ?? emptyTrainingProgress(userId, lesson);
}

export async function listTrainingProgress(userId: string) {
  if (!supabase) throw new Error("Supabase chưa được cấu hình");
  const { data, error } = await supabase.from("progressive_training_progress").select("*").eq("user_id", userId);
  if (error) throw error;
  return data;
}

export async function saveTrainingDraft(progress: ProgressiveTrainingProgressRow, draft: TrainingDraft, help?: { hintLevel?: number; viewedSolution?: boolean }) {
  if (!supabase) throw new Error("Supabase chưa được cấu hình");
  const { data, error } = await supabase.rpc("save_progressive_training_draft", {
    p_lesson_id: progress.lesson_id,
    p_lesson_version: progress.lesson_version,
    p_draft_answers: draft as Json,
    p_hint_level_used: Math.max(progress.hint_level_used, help?.hintLevel ?? 0),
    p_viewed_solution: progress.viewed_solution || Boolean(help?.viewedSolution),
  });
  if (error) throw error;
  return data;
}

export type RecordAttemptInput = {
  attemptId: string;
  lesson: ProgressiveLesson;
  stepType: TrainingStepType;
  answer: Json;
  passed: boolean;
  stepCompleted: boolean;
  testResults?: Json;
  hintLevel: number;
  viewedSolution: boolean;
  durationMs: number;
  progress: ProgressiveTrainingProgressRow;
  draft: TrainingDraft;
};

export async function recordTrainingAttempt(input: RecordAttemptInput) {
  if (!supabase) throw new Error("Supabase chưa được cấu hình");
  const sequence = input.lesson.levels ?? input.lesson.steps ?? [];
  const stepNumber = sequence.findIndex((step) => step.type === input.stepType) + 1;
  if (stepNumber === 0) throw new Error(`Unknown training level: ${input.stepType}`);
  const completed = input.stepCompleted
    ? [...new Set([...input.progress.completed_steps, stepNumber])].sort((a, b) => a - b)
    : input.progress.completed_steps;
  const currentStep = input.stepCompleted ? Math.min(6, Math.max(input.progress.current_step, stepNumber + 1)) : input.progress.current_step;
  const fullRecallPassed = input.progress.full_recall_passed || (["FULL_CODE", "FULL_RECALL"].includes(input.stepType) && input.stepCompleted);
  const challengeKind = input.answer && typeof input.answer === "object" && !Array.isArray(input.answer) ? input.answer.challengeKind : undefined;
  const debugPassed = input.progress.debug_passed || (input.stepType === "DEBUG_VARIANT" && input.passed && challengeKind === "DEBUG");
  const variantPassed = input.progress.variant_passed || ((input.stepType === "VARIANT" && input.stepCompleted) || (input.stepType === "DEBUG_VARIANT" && input.passed && challengeKind === "VARIANT"));
  const { data, error } = await supabase.rpc("record_progressive_training_attempt_v2", {
    p_attempt_id: input.attemptId,
    p_lesson_id: input.lesson.id,
    p_lesson_version: input.lesson.version,
    p_step_type: input.stepType,
    p_answer_payload: input.answer,
    p_passed: input.passed,
    p_test_results: input.testResults ?? [],
    p_hint_level_used: input.hintLevel,
    p_duration_ms: Math.max(0, Math.round(input.durationMs)),
    p_current_level: currentStep,
    p_completed_levels: completed,
    p_full_recall_passed: fullRecallPassed,
    p_debug_passed: debugPassed,
    p_variant_passed: variantPassed,
    p_viewed_solution: input.viewedSolution,
    p_draft_answers: input.draft as Json,
  });
  if (error) throw error;
  return data;
}
