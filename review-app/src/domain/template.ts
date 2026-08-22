import type { Lesson, ReviewRecord, ReviewStore, TemplateRating } from "../types";
import { localDate } from "./dates";

const STRUCTURAL_LINE = /^\s*(?:async\s+)?(?:function\b|(?:for|while|if|else|switch|case|default|try|catch|finally)\b|[{}]+[;,]?$)/;

export function templateSkeleton(code: string) {
  let maskedRun = false;
  return code.split("\n").map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//") || STRUCTURAL_LINE.test(line)) {
      maskedRun = false;
      return line;
    }
    if (maskedRun) return "";
    maskedRun = true;
    return `${line.match(/^\s*/)?.[0] ?? ""}// TODO · tự dựng phần này`;
  }).filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n");
}

export function templateRatingGrade(rating?: TemplateRating) {
  return rating === "FLUENT" ? "A" : rating === "HESITANT" ? "C" : "D";
}

export function templateMastered(history: ReviewRecord[]) {
  const cleanFluent = history.filter((record) => record.templateAssessment?.rating === "FLUENT" && !record.templateAssessment.skeletonUsed);
  const distinctDays = new Set(cleanFluent.map((record) => localDate(new Date(record.reviewedAt))));
  return distinctDays.size >= 3 && cleanFluent.some((record) => record.templateAssessment?.transferPassed);
}

export function templateQueue(lessons: Lesson[], store: ReviewStore, today = localDate(), limit = 8) {
  return lessons.filter((lesson) => store.lessons[lesson.id]?.history.length)
    .filter((lesson) => !templateMastered(store.lessons[lesson.id].history))
    .filter((lesson) => {
      const attempts = store.lessons[lesson.id].history.filter((record) => record.practiceMode === "TEMPLATE");
      if (attempts.length) return attempts.at(-1)!.dueAt <= today;
      const learnedAt = new Date(store.lessons[lesson.id].history[0].reviewedAt);
      learnedAt.setDate(learnedAt.getDate() + 1);
      return localDate(learnedAt) <= today;
    })
    .sort((a, b) => {
      const attempts = (lesson: Lesson) => store.lessons[lesson.id].history.filter((record) => record.practiceMode === "TEMPLATE");
      const ar = attempts(a).at(-1); const br = attempts(b).at(-1);
      return (ar?.dueAt ?? "").localeCompare(br?.dueAt ?? "") || a.id.localeCompare(b.id);
    }).slice(0, limit);
}
