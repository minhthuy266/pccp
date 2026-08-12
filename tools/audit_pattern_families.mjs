import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const directory = path.join(root, "docs/pccp-700-roadmap/pattern-families");
const rows = fs
  .readFileSync(path.join(directory, "PATTERN_COVERAGE.csv"), "utf8")
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map((line) => {
    const [lessonId, patternId] = line.split(",");
    return { lessonId, patternId };
  });

const expectedLessons = [
  ...Array.from({ length: 61 }, (_, index) => `OF${String(index + 1).padStart(3, "0")}`),
  ...Array.from({ length: 6 }, (_, index) => `SR${String(index + 1).padStart(3, "0")}`),
];
const expectedPatterns = Array.from(
  { length: 24 },
  (_, index) => `PF${String(index + 1).padStart(2, "0")}`,
);
const errors = [];

for (const lessonId of expectedLessons) {
  const count = rows.filter((row) => row.lessonId === lessonId).length;
  if (count !== 1) errors.push(`${lessonId} xuất hiện ${count} lần trong coverage`);
}
for (const row of rows) {
  if (!expectedLessons.includes(row.lessonId)) errors.push(`lesson lạ ${row.lessonId}`);
  if (!expectedPatterns.includes(row.patternId)) errors.push(`pattern lạ ${row.patternId}`);
}

const detailedFiles = fs
  .readdirSync(directory)
  .filter((name) => /^PF\d{2}_.+\.md$/.test(name));
const detailedPatternIds = detailedFiles.map((name) => name.slice(0, 4));

for (const patternId of expectedPatterns) {
  const count = detailedPatternIds.filter((id) => id === patternId).length;
  if (count !== 1) errors.push(`${patternId} có ${count} file chi tiết`);
}

for (const name of detailedFiles) {
  const fullPath = path.join(directory, name);
  const markdown = fs.readFileSync(fullPath, "utf8");
  const patternId = name.slice(0, 4);
  for (let section = 1; section <= 10; section++) {
    if (!markdown.includes(`## ${section}.`)) errors.push(`${patternId} thiếu section ${section}`);
  }
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^https?:/i.test(target)) continue;
    const resolved = path.resolve(directory, decodeURIComponent(target.split("#", 1)[0]));
    if (!fs.existsSync(resolved)) errors.push(`${patternId} link gãy: ${target}`);
  }
  let block = 0;
  for (const match of markdown.matchAll(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/gm)) {
    block++;
    try {
      new vm.Script(match[1], { filename: `${patternId}#${block}` });
    } catch (error) {
      errors.push(`${patternId} code block ${block}: ${error.message}`);
    }
  }
}

const coveredPatterns = new Set(rows.map((row) => row.patternId));
if (coveredPatterns.size !== 24) errors.push(`coverage chỉ có ${coveredPatterns.size}/24 pattern`);

console.log(
  `Pattern families: ${rows.length}/67 lessons mapped; ` +
    `${coveredPatterns.size}/24 families mapped; ${detailedFiles.length}/24 detailed.`,
);
if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
