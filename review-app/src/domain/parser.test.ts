import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseLesson } from "./parser";
import { parseBlueprint } from "./blueprint";
import { ANALYSIS_FIELDS } from "../types";

const official = (id: string) => {
  const path = resolve(process.cwd(), `../docs/pccp-700-roadmap/official-lessons/${id}.md`);
  return parseLesson(readFileSync(path, "utf8"), path);
};

describe.each(["OF011", "OF012", "OF040", "OF050", "OF058"])("lesson parser %s", (id) => {
  it("extracts safe practice and progressive help fields", () => {
    const lesson = official(id);
    expect(lesson.id).toBe(id);
    expect(lesson.title.length).toBeGreaterThan(2);
    expect(lesson.pattern.length).toBeGreaterThan(2);
    expect(lesson.officialUrl).toMatch(/^https:\/\/school\.programmers\.co\.kr\//);
    expect(lesson.problem).toMatch(/\S/);
    expect(lesson.recall1).toMatch(/\S/);
    expect(lesson.blueprint).toMatch(/OUTPUT:/);
    expect(lesson.recall2).toMatch(/\S/);
    expect(lesson.recall3).toMatch(/\S/);
    expect(lesson.explanation).toMatch(/## 02\./);
    expect(lesson.solution).toMatch(/function|class/);
    for (const field of ANALYSIS_FIELDS) expect(lesson.references[field], `${id} ${field}`).toMatch(/\S/);
  });
});

it("handles optional sections without throwing and reports warnings", () => {
  const lesson = parseLesson("# OF999 — Tối giản\n\n## 01. Contract\n\nTrả về 1.", "OF999.md");
  expect(lesson.problem).toBe("Trả về 1.");
  expect(lesson.warnings.length).toBeGreaterThan(0);
});

it("extracts OF050 bold recalls and structures its blueprint", () => {
  const lesson = official("OF050");
  expect(lesson.recall1).toContain("swap adjacent");
  expect(parseBlueprint(lesson.blueprint).map((entry) => entry.label)).toEqual([
    "OUTPUT", "PREPARE", "GLOBAL STATE", "INIT", "MAIN LOOP", "CURRENT ITEM",
    "PER-ITERATION STATE", "CHECK", "BRANCH", "UPDATE", "POINTER MOVEMENT", "STOP / RETURN", "CLEANUP",
  ]);
});

it("discovers all and only canonical official lesson filenames", () => {
  const directory = resolve(process.cwd(), "../docs/pccp-700-roadmap/official-lessons");
  const files = readdirSync(directory).filter((name) => /^(OF|SR)\d{3}\.md$/.test(name));
  expect(files).toHaveLength(67);
  const parsed = files.map((name) => parseLesson(readFileSync(resolve(directory, name), "utf8"), name));
  expect(new Set(parsed.map((lesson) => lesson.id)).size).toBe(67);
  expect(parsed.every((lesson) => lesson.officialUrl.startsWith("https://school.programmers.co.kr/"))).toBe(true);
  for (const lesson of parsed) {
    expect(lesson.recall1, `${lesson.id} Recall 1`).toMatch(/\S/);
    expect(lesson.recall2, `${lesson.id} Recall 2`).toMatch(/\S/);
    expect(lesson.recall3, `${lesson.id} Recall 3`).toMatch(/\S/);
    expect(lesson.blueprint, `${lesson.id} Blueprint`).toMatch(/\S/);
  }
});
