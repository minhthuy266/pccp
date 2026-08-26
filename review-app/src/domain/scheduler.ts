import type { Lesson, ReviewStore } from "../types";
import { localDate } from "./dates";

const FOUNDATIONS = ["array", "string", "scan", "map", "set", "sorting", "two pointer", "prefix", "stack", "queue", "binary"];

export function latest(store: ReviewStore, id: string) {
  return store.lessons[id]?.history.filter((record) => record.practiceMode !== "TEMPLATE").at(-1);
}

export function dueLessons(lessons: Lesson[], store: ReviewStore, today = localDate()) {
  const gradeRank = { D: 0, C: 1, B: 2, A: 3 };
  return lessons.filter((lesson) => {
    const record = latest(store, lesson.id);
    return record && record.dueAt <= today;
  }).sort((a, b) => {
    const ar = latest(store, a.id)!; const br = latest(store, b.id)!;
    return ar.dueAt.localeCompare(br.dueAt) || gradeRank[ar.grade] - gradeRank[br.grade] || a.id.localeCompare(b.id);
  });
}

export function suggestedNew(lessons: Lesson[], store: ReviewStore, limit = 3) {
  return lessons.filter((lesson) => !store.lessons[lesson.id]?.history.length)
    .sort((a, b) => {
      const score = (lesson: Lesson) => FOUNDATIONS.findIndex((word) => lesson.pattern.toLowerCase().includes(word));
      const as = score(a); const bs = score(b);
      return (as < 0 ? 99 : as) - (bs < 0 ? 99 : bs) || a.id.localeCompare(b.id);
    }).slice(0, limit);
}
