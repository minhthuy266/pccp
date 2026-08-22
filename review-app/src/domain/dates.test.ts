import { describe, expect, it } from "vitest";
import { addCalendarDays, dueDateFor, localDate } from "./dates";

describe("local calendar scheduling", () => {
  it.each([["A", "2026-09-08"], ["B", "2026-09-04"], ["C", "2026-09-02"], ["D", "2026-09-02"]] as const)("schedules %s", (grade, expected) => {
    expect(dueDateFor(grade, new Date(2026, 8, 1, 23, 45))).toBe(expected);
  });
  it("formats from local fields instead of UTC", () => {
    expect(localDate(new Date(2026, 0, 2, 1))).toBe("2026-01-02");
  });
  it("crosses month boundaries by calendar day", () => {
    expect(localDate(addCalendarDays(new Date(2026, 0, 30), 3))).toBe("2026-02-02");
  });
});
