import { useCallback, useEffect, useRef, useState } from "react";
import type { Json, ProgressiveTrainingProgressRow } from "../../cloud/database.types";
import type { ProgressiveLesson, TrainingDraft, TrainingStepType } from "./types";
import { loadTrainingProgress, recordTrainingAttempt, saveTrainingDraft } from "./repository";
import { trainingErrorMessage } from "./error";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useProgressiveTraining(userId: string | undefined, lesson: ProgressiveLesson) {
  const [progress, setProgress] = useState<ProgressiveTrainingProgressRow | null>(null);
  const [draft, setDraft] = useState<TrainingDraft>({});
  const [loading, setLoading] = useState(Boolean(userId));
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(progress);
  const draftRef = useRef(draft);
  const pendingAttemptId = useRef<string | null>(null);
  const attemptHintLevel = useRef(0);
  const attemptViewedSolution = useRef(false);
  const startedAt = useRef(Date.now());
  progressRef.current = progress;
  draftRef.current = draft;

  const reload = useCallback(async () => {
    if (!userId) { setProgress(null); setDraft({}); setLoading(false); return; }
    setLoading(true); setError("");
    try {
      const next = await loadTrainingProgress(userId, lesson);
      setProgress(next); attemptHintLevel.current = 0; attemptViewedSolution.current = false;
      setDraft((next.draft_answers && typeof next.draft_answers === "object" && !Array.isArray(next.draft_answers) ? next.draft_answers : {}) as TrainingDraft);
    } catch (cause) { setError(trainingErrorMessage(cause, "Không tải được tiến độ")); }
    finally { setLoading(false); }
  }, [lesson, userId]);

  useEffect(() => { startedAt.current = Date.now(); void reload(); }, [reload]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const persist = useCallback(async (nextDraft = draftRef.current, help?: { hintLevel?: number; viewedSolution?: boolean }) => {
    const current = progressRef.current;
    if (!current) return;
    setSaveStatus("saving"); setError("");
    try {
      const saved = await saveTrainingDraft(current, nextDraft, help);
      setProgress(saved); setSaveStatus("saved");
    } catch (cause) { setSaveStatus("error"); setError(trainingErrorMessage(cause, "Không lưu được bản nháp")); }
  }, []);

  const updateDraft = useCallback((patch: Partial<TrainingDraft>) => {
    const next = { ...draftRef.current, ...patch };
    draftRef.current = next; setDraft(next); setSaveStatus("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { void persist(next); }, 600);
  }, [persist]);

  const markHelp = useCallback(async (hintLevel: number, viewedSolution = false) => {
    attemptHintLevel.current = Math.max(attemptHintLevel.current, hintLevel);
    attemptViewedSolution.current ||= viewedSolution;
    const current = progressRef.current;
    if (current) {
      const next = { ...current, hint_level_used: Math.max(current.hint_level_used, hintLevel), viewed_solution: current.viewed_solution || viewedSolution };
      progressRef.current = next;
      setProgress(next);
    }
    await persist(draftRef.current, { hintLevel, viewedSolution });
  }, [persist]);

  const submitAttempt = useCallback(async (stepType: TrainingStepType, answer: Json, passed: boolean, testResults: Json = [], stepCompleted = passed) => {
    const current = progressRef.current;
    if (!current || submitting) return null;
    setSubmitting(true); setError("");
    pendingAttemptId.current ??= crypto.randomUUID();
    try {
      const saved = await recordTrainingAttempt({
        attemptId: pendingAttemptId.current, lesson, stepType, answer, passed, stepCompleted, testResults,
        hintLevel: attemptHintLevel.current, viewedSolution: attemptViewedSolution.current,
        durationMs: Date.now() - startedAt.current,
        progress: current, draft: draftRef.current,
      });
      pendingAttemptId.current = null;
      setProgress(saved); setSaveStatus("saved"); startedAt.current = Date.now();
      if (stepCompleted) { attemptHintLevel.current = 0; attemptViewedSolution.current = false; }
      return saved;
    } catch (cause) {
      setSaveStatus("error"); setError(trainingErrorMessage(cause, "Không lưu được kết quả; input vẫn được giữ để thử lại"));
      return null;
    } finally { setSubmitting(false); }
  }, [lesson, submitting]);

  return { progress, draft, loading, saveStatus, error, submitting, reload, updateDraft, markHelp, submitAttempt };
}
