import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const notebook = path.join(root, "PCCP_Algorithm_Code_Notebook");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const errors = [];

const matrix = read("PCCP_Algorithm_Code_Notebook/PATTERN_COVERAGE_MATRIX.md");
const matrixRows = matrix.split(/\r?\n/).map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
  .filter((cells) => /^[A-Z]+-\d+$/.test(cells[0] ?? ""));
if (matrixRows.length !== 89) errors.push(`Coverage Matrix có ${matrixRows.length}/89 ID`);
const nonFull = matrixRows.filter((cells) => cells[9] !== "FULL").map((cells) => cells[0]);
if (nonFull.length) errors.push(`Coverage Matrix chưa FULL: ${nonFull.join(", ")}`);

const framework = read("PCCP_Algorithm_Code_Notebook/FRAMEWORK_COVERAGE_AUDIT.md");
if (!framework.includes("`FRAMEWORK-FULL`: **89**")) errors.push("Framework report chưa ghi 89 FRAMEWORK-FULL");
if (!framework.includes("`NEEDS-FRAMEWORK`: **0**")) errors.push("Framework report vẫn còn gap");

for (const file of ["PCCP_Algorithm_Code_Notebook/MANIFEST.md", "PCCP_Algorithm_Code_Notebook/README.md"]) {
  const text = read(file);
  if (/\|\s*Khung\s*\|/u.test(text)) errors.push(`${file} còn status Khung`);
}

const mixedPath = "PCCP_Algorithm_Code_Notebook/90_Mixed_Pattern_Tests.md";
const mixed = read(mixedPath);
const solutions = read("PCCP_Algorithm_Code_Notebook/solutions/90_Mixed_Pattern_Tests_Solutions.md");
const mixedIds = [...mixed.matchAll(/^###\s+(MX\d{2})\b/gm)].map((match) => match[1]);
const solutionIds = [...solutions.matchAll(/^###\s+(MX\d{2})\b/gm)].map((match) => match[1]);
const expectedMixed = Array.from({ length: 8 }, (_, index) => `MX${String(index + 1).padStart(2, "0")}`);
if (JSON.stringify(mixedIds) !== JSON.stringify(expectedMixed)) errors.push(`Mixed IDs sai: ${mixedIds.join(",")}`);
if (JSON.stringify(solutionIds) !== JSON.stringify(expectedMixed)) errors.push(`Mixed solution IDs sai: ${solutionIds.join(",")}`);

const gates = [...mixed.matchAll(/^###\s+(GATE-\d{2})\b/gm)].map((match) => match[1]);
if (JSON.stringify(gates) !== JSON.stringify(["GATE-01", "GATE-02", "GATE-03", "GATE-04"])) {
  errors.push(`Gate IDs sai: ${gates.join(",")}`);
}
const officialRefs = [...mixed.matchAll(/\[OF(\d{3})\]/g)].map((match) => Number(match[1]));
if (officialRefs.length !== 16 || new Set(officialRefs).size !== 16) errors.push("Bốn gate phải dùng 16 official ID khác nhau");
if (officialRefs.some((id) => id >= 62)) errors.push("Mixed gate tham chiếu locked OF062–OF069");
if (/locked\//i.test(mixed)) errors.push("Mixed test tham chiếu thư mục locked");

const trackerLines = read("PCCP_Algorithm_Code_Notebook/MIXED_TEST_TRACKER.csv").trim().split(/\r?\n/);
if (trackerLines.length !== 13) errors.push(`Mixed tracker có ${trackerLines.length - 1}/12 dòng`);
for (const id of [...expectedMixed, ...gates]) {
  if (!trackerLines.slice(1).some((line) => line.startsWith(`${id}-1,`))) errors.push(`Tracker thiếu ${id}`);
}

const requiredFiles = [
  "solutions/notebook/ch90_mixed.js",
  "tests/notebook_ch90.test.js",
  "PCCP_Algorithm_Code_Notebook/chapters/90_mixed/QA.md",
];
for (const file of requiredFiles) if (!fs.existsSync(path.join(root, file))) errors.push(`Thiếu ${file}`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log("PCCP 700 release audit: 89/89 framework; 8/8 mixed; 4/4 gates; locked mock boundary intact.");
