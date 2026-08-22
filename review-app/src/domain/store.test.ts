import { describe, expect, it } from "vitest";
import { loadStore, mergeStores, parseStoreJson, saveReview, STORAGE_KEY } from "./store";

it("keeps existing progress and clears only the saved lesson draft", () => {
  let raw = JSON.stringify({ version: 1, lessons: { OF001: { lessonId: "OF001", draftAnalysis: { State: "x" }, draftCode: "code", history: [] }, OF002: { lessonId: "OF002", draftAnalysis: {}, draftCode: "keep", history: [] } } });
  const storage = { getItem: () => raw, setItem: (key: string, value: string) => { expect(key).toBe(STORAGE_KEY); raw = value; } };
  const store = loadStore(storage);
  const original = globalThis.localStorage;
  Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true });
  saveReview(store, "OF001", { grade: "A", reviewedAt: "now", dueAt: "later", durationSeconds: 1, revealedHints: [], errors: [], note: "" });
  Object.defineProperty(globalThis, "localStorage", { value: original, configurable: true });
  const saved = JSON.parse(raw);
  expect(saved.lessons.OF001.draftCode).toBe("");
  expect(saved.lessons.OF001.history).toHaveLength(1);
  expect(saved.lessons.OF002.draftCode).toBe("keep");
});

it("validates and merges backups without losing current drafts or duplicate history", () => {
  const current = { version: 1 as const, lessons: { OF001: { lessonId: "OF001", draftAnalysis: { State: "current" }, draftCode: "current code", history: [{ grade: "B" as const, reviewedAt: "2026-08-20", dueAt: "2026-08-23", durationSeconds: 1, revealedHints: [], errors: [], note: "" }] } } };
  const imported = parseStoreJson(JSON.stringify({ version: 1, lessons: { OF001: { lessonId: "OF001", draftAnalysis: {}, draftCode: "old", history: [{ grade: "A", reviewedAt: "2026-08-20", dueAt: "2026-08-27", durationSeconds: 1, revealedHints: [], errors: [], note: "" }, { grade: "A", reviewedAt: "2026-08-21", dueAt: "2026-08-28", durationSeconds: 1, revealedHints: [], errors: [], note: "" }] } } }))!;
  const merged = mergeStores(current, imported);
  expect(merged.lessons.OF001.draftCode).toBe("current code");
  expect(merged.lessons.OF001.history.map((record) => record.reviewedAt)).toEqual(["2026-08-20", "2026-08-21"]);
  expect(parseStoreJson("not json")).toBeNull();
});

it("keeps the newest draft when two devices merge", () => {
  const current = { version: 1 as const, lessons: { OF001: { lessonId: "OF001", draftAnalysis: {}, draftCode: "old local", history: [], updatedAt: "2026-08-20T10:00:00.000Z" } } };
  const remote = { version: 1 as const, lessons: { OF001: { lessonId: "OF001", draftAnalysis: { State: "queue" }, draftCode: "new cloud", history: [], updatedAt: "2026-08-21T10:00:00.000Z" } } };
  const merged = mergeStores(current, remote);
  expect(merged.lessons.OF001.draftCode).toBe("new cloud");
  expect(merged.lessons.OF001.draftAnalysis).toEqual({ State: "queue" });
});

it("merges Pattern Gym history for cloud sync", () => {
  const current = { version: 1 as const, lessons: {}, patterns: { PF01: [{ reviewedAt: "2026-08-20", rating: "HESITANT" as const, answers: { signals: "a", core: "b", variations: "c" } }] } };
  const remote = { version: 1 as const, lessons: {}, patterns: { PF01: [{ reviewedAt: "2026-08-21", rating: "FLUENT" as const, answers: { signals: "d", core: "e", variations: "f" } }] } };
  expect(mergeStores(current, remote).patterns?.PF01.map((record) => record.reviewedAt)).toEqual(["2026-08-20", "2026-08-21"]);
});
