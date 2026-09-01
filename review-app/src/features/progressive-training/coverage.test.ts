import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { progressiveLessons } from "./lessons";

function parseCsvLine(line: string) {
  const cells: string[] = []; let value = ""; let quoted = false;
  for (let index = 0; index < line.length; index++) {
    const char = line[index];
    if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { cells.push(value); value = ""; }
    else value += char;
  }
  cells.push(value);
  return cells;
}

const csv = readFileSync(resolve(process.cwd(), "../docs/pccp-700-roadmap/PROGRESSIVE_TRAINING_COVERAGE_MATRIX.csv"), "utf8").trim();
const [header, ...lines] = csv.split(/\r?\n/).map(parseCsvLine);
const rows = lines.map((cells) => Object.fromEntries(header.map((key, index) => [key, cells[index] ?? ""])));

describe("Progressive Training coverage matrix", () => {
  it("contains each canonical F01-F24 family exactly once", () => {
    expect(rows).toHaveLength(24);
    expect(rows.map((row) => row.family_id)).toEqual(Array.from({ length: 24 }, (_, index) => `F${String(index + 1).padStart(2, "0")}`));
    expect(new Set(rows.map((row) => row.family_id)).size).toBe(24);
  });
  it("uses valid evidence, priority, and honest status values", () => {
    for (const row of rows) {
      expect(["P0", "P1", "P2", "P3"]).toContain(row.priority);
      expect(row.provenance).not.toBe("");
      expect(["PLANNED", "PARTIAL", "COMPLETE"]).toContain(row.status);
      expect(row.representative_core_lesson).not.toBe("");
      if (row.status === "COMPLETE") expect(row.tests).not.toBe("");
    }
  });
  it("matches executable lesson claims instead of treating planned rows as coverage", () => {
    const lessonIds = new Set(progressiveLessons.map((lesson) => lesson.id));
    for (const row of rows) {
      const claimed = row.existing_lessons.split(";").filter(Boolean);
      for (const id of claimed) expect(lessonIds.has(id), `${row.family_id}/${id}`).toBe(true);
      if (!claimed.length) expect(row.status).toBe("PLANNED");
    }
    expect(rows.find((row) => row.family_id === "F11")?.status).toBe("PARTIAL");
  });
});
