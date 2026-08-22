import type { Grade } from "../types";

export function localDate(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addCalendarDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setHours(12, 0, 0, 0);
  next.setDate(next.getDate() + days);
  return next;
}

export function dueDateFor(grade: Grade, reviewedAt = new Date()): string {
  return localDate(addCalendarDays(reviewedAt, grade === "A" ? 7 : grade === "B" ? 3 : 1));
}
