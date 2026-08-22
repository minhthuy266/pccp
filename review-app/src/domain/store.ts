import type { LessonProgress, ReviewRecord, ReviewStore } from "../types";

export const STORAGE_KEY = "pccp-review-store-v1";
const EMPTY: ReviewStore = { version: 1, lessons: {} };

export function loadStore(storage: Pick<Storage, "getItem"> = localStorage): ReviewStore {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) ?? "null");
    if (value?.version === 1 && value.lessons && typeof value.lessons === "object") return value;
  } catch { /* preserve app usability if local data is corrupt */ }
  return structuredClone(EMPTY);
}

export function parseStoreJson(json: string): ReviewStore | null {
  try {
    const value = JSON.parse(json);
    return value?.version === 1 && value.lessons && typeof value.lessons === "object" ? value : null;
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
    merged.lessons[id] = {
      lessonId: id,
      draftAnalysis: Object.values(existing.draftAnalysis).some(Boolean) ? existing.draftAnalysis : incoming.draftAnalysis,
      draftCode: existing.draftCode || incoming.draftCode,
      history,
    };
  }
  return merged;
}

export function saveStore(store: ReviewStore, storage: Pick<Storage, "setItem"> = localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function progressFor(store: ReviewStore, lessonId: string): LessonProgress {
  return store.lessons[lessonId] ?? { lessonId, draftAnalysis: {}, draftCode: "", history: [] };
}

export function saveDraft(store: ReviewStore, lessonId: string, draftAnalysis: Record<string, string>, draftCode: string) {
  store.lessons[lessonId] = { ...progressFor(store, lessonId), draftAnalysis, draftCode };
  saveStore(store);
}

export function saveReview(store: ReviewStore, lessonId: string, record: ReviewRecord) {
  const current = progressFor(store, lessonId);
  store.lessons[lessonId] = { ...current, draftAnalysis: {}, draftCode: "", history: [...current.history, record] };
  saveStore(store);
}
