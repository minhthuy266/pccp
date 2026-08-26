import type { LessonProgress, PatternReviewRecord, ReviewRecord, ReviewStore } from "../types";

export const STORAGE_KEY = "pccp-review-store-v1";
const EMPTY: ReviewStore = { version: 1, lessons: {}, patterns: {} };

export function loadStore(storage: Pick<Storage, "getItem"> = localStorage): ReviewStore {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) ?? "null");
    if (value?.version === 1 && value.lessons && typeof value.lessons === "object") return { ...value, patterns: value.patterns ?? {} };
  } catch { /* preserve app usability if local data is corrupt */ }
  return structuredClone(EMPTY);
}

export function parseStoreJson(json: string): ReviewStore | null {
  try {
    const value = JSON.parse(json);
    return value?.version === 1 && value.lessons && typeof value.lessons === "object" ? { ...value, patterns: value.patterns ?? {} } : null;
  } catch { return null; }
}

export function mergeStores(current: ReviewStore, imported: ReviewStore): ReviewStore {
  const merged: ReviewStore = structuredClone(current);
  for (const [id, incoming] of Object.entries(imported.lessons)) {
    const existing = merged.lessons[id];
    if (!existing) { merged.lessons[id] = incoming; continue; }
    const history = [...existing.history, ...incoming.history]
      .filter((record, index, all) => all.findIndex((candidate) => candidate.reviewedAt === record.reviewedAt) === index)
      .sort((a, b) => a.reviewedAt.localeCompare(b.reviewedAt));
    const currentIsNewer = !incoming.updatedAt || Boolean(existing.updatedAt && existing.updatedAt >= incoming.updatedAt);
    const draftSource = currentIsNewer ? existing : incoming;
    merged.lessons[id] = {
      lessonId: id,
      draftAnalysis: draftSource.draftAnalysis,
      draftCode: draftSource.draftCode,
      history,
      updatedAt: currentIsNewer ? existing.updatedAt : incoming.updatedAt,
    };
  }
  merged.patterns ??= {};
  for (const [id, incoming] of Object.entries(imported.patterns ?? {})) {
    merged.patterns[id] = [...(merged.patterns[id] ?? []), ...incoming]
      .filter((record, index, all) => all.findIndex((candidate) => candidate.reviewedAt === record.reviewedAt) === index)
      .sort((a, b) => a.reviewedAt.localeCompare(b.reviewedAt));
  }
  return merged;
}

export function saveStore(store: ReviewStore, storage: Pick<Storage, "setItem"> = localStorage, notify = true) {
  storage.setItem(STORAGE_KEY, JSON.stringify(store));
  if (notify && typeof window !== "undefined") window.dispatchEvent(new CustomEvent("pccp-store-change"));
}

export function progressFor(store: ReviewStore, lessonId: string): LessonProgress {
  return store.lessons[lessonId] ?? { lessonId, draftAnalysis: {}, draftCode: "", history: [] };
}

export function saveDraft(store: ReviewStore, lessonId: string, draftAnalysis: Record<string, string>, draftCode: string) {
  store.lessons[lessonId] = { ...progressFor(store, lessonId), draftAnalysis, draftCode, updatedAt: new Date().toISOString() };
  saveStore(store);
}

export function saveReview(store: ReviewStore, lessonId: string, record: ReviewRecord) {
  const current = progressFor(store, lessonId);
  store.lessons[lessonId] = { ...current, draftAnalysis: {}, draftCode: "", history: [...current.history, record], updatedAt: new Date().toISOString() };
  saveStore(store);
}

export function savePatternReview(store: ReviewStore, patternId: string, record: PatternReviewRecord) {
  store.patterns ??= {};
  store.patterns[patternId] = [...(store.patterns[patternId] ?? []), record];
  saveStore(store);
}
