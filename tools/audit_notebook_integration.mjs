import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const notebook = path.join(root, "PCCP_Algorithm_Code_Notebook");
const matrixPath = path.join(notebook, "PATTERN_COVERAGE_MATRIX.md");
const crosswalkPath = path.join(notebook, "NOTEBOOK_PATTERN_OFFICIAL_CROSSWALK.csv");
const familyCoveragePath = path.join(
  root,
  "docs/pccp-700-roadmap/pattern-families/PATTERN_COVERAGE.csv",
);

function splitList(value) {
  return value ? value.split("|").filter(Boolean) : [];
}

function matrixIds() {
  const ids = [];
  for (const line of fs.readFileSync(matrixPath, "utf8").split(/\r?\n/)) {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (/^[A-Z]+-\d+$/.test(cells[0] ?? "")) ids.push(cells[0]);
  }
  return ids;
}

function crosswalkRows() {
  const lines = fs.readFileSync(crosswalkPath, "utf8").trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cells = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
  });
}

function officialToFamily() {
  const lines = fs.readFileSync(familyCoveragePath, "utf8").trim().split(/\r?\n/);
  const result = new Map();
  for (const line of lines.slice(1)) {
    const [lessonId, patternId] = line.split(",");
    result.set(lessonId, patternId);
  }
  return result;
}

const errors = [];
const ids = matrixIds();
const rows = crosswalkRows();
const officialFamily = officialToFamily();
const expectedFamilies = Array.from(
  { length: 24 },
  (_, index) => `PF${String(index + 1).padStart(2, "0")}`,
);

for (const id of ids) {
  const count = rows.filter((row) => row.coverage_id === id).length;
  if (count !== 1) errors.push(`${id} xuất hiện ${count} lần trong crosswalk`);
}
for (const row of rows) {
  if (!ids.includes(row.coverage_id)) errors.push(`Coverage ID lạ: ${row.coverage_id}`);
  if (!/^\d{2}$/.test(row.chapter)) errors.push(`${row.coverage_id} chapter sai: ${row.chapter}`);
  for (const family of splitList(row.pattern_families)) {
    if (!expectedFamilies.includes(family)) errors.push(`${row.coverage_id} family lạ: ${family}`);
  }
  if (!/^(?:VERY_HIGH|HIGH|MEDIUM|LOW)$/.test(row.priority)) {
    errors.push(`${row.coverage_id} priority sai: ${row.priority}`);
  }
}

for (const family of expectedFamilies) {
  const owners = rows.filter((row) => splitList(row.pattern_families).includes(family));
  if (owners.length === 0) errors.push(`${family} chưa có canonical owner`);
}

const officialOwners = new Map();
for (const row of rows) {
  for (const lessonId of splitList(row.official_anchors)) {
    if (!officialOwners.has(lessonId)) officialOwners.set(lessonId, []);
    officialOwners.get(lessonId).push(row);
  }
}
for (const [lessonId, family] of officialFamily) {
  const owners = officialOwners.get(lessonId) ?? [];
  if (owners.length !== 1) {
    errors.push(`${lessonId} có ${owners.length} canonical owner`);
    continue;
  }
  if (!splitList(owners[0].pattern_families).includes(family)) {
    errors.push(`${lessonId}: owner ${owners[0].coverage_id} thiếu family ${family}`);
  }
}
for (const lessonId of officialOwners.keys()) {
  if (!officialFamily.has(lessonId)) errors.push(`Official anchor lạ: ${lessonId}`);
}

console.log(
  `Notebook integration: ${rows.length}/${ids.length} canonical IDs mapped; ` +
    `${expectedFamilies.length}/24 families owned; ${officialOwners.size}/${officialFamily.size} official lessons anchored.`,
);
if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
