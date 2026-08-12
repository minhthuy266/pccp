import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const lessonDirectory = path.join(root, "docs/pccp-700-roadmap/official-lessons");
const solutionDirectory = path.join(root, "solutions/official");
const testText = fs
  .readdirSync(path.join(root, "tests"))
  .filter((name) => name.endsWith(".test.js"))
  .map((name) => fs.readFileSync(path.join(root, "tests", name), "utf8"))
  .join("\n");

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index++;
      } else quoted = !quoted;
    } else if (character === "," && !quoted) {
      fields.push(current);
      current = "";
    } else current += character;
  }
  fields.push(current);
  return fields;
}

function readCsv(relative) {
  const lines = fs.readFileSync(path.join(root, relative), "utf8").trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
  });
}

const bank = readCsv("PCCP_OFFICIAL_PRACTICE_BANK.csv").map((row) => ({
  id: row.bank_id,
  locked: row.priority === "RESERVED_MOCK",
  link: row.link,
}));
const reserve = readCsv("PCCP_OFFICIAL_SYLLABUS_RESERVE.csv").map((row) => ({
  id: row.reserve_id,
  locked: false,
  link: row.link,
}));
const catalog = [...bank, ...reserve];
const errors = [];
const completed = [];
const partial = [];

const requiredHeadings = [
  "01. Contract",
  "02. Bound",
  "03. Brute force",
  "04. Bottleneck",
  "05. Pattern",
  "06. State",
  "07. Transition",
  "08. Invariant",
  "09. Complexity",
  "10. Pseudocode",
  "11. Code bước 1",
  "12. Code bước 2",
  "13. Code bước 3",
  "14. Code hoàn chỉnh",
  "15. Dry-run",
  "16. Edge cases",
  "17. Lỗi JavaScript thường gặp",
  "18. Bài transfer cùng pattern",
];

for (const item of catalog.filter((entry) => !entry.locked)) {
  const markdownPath = path.join(lessonDirectory, `${item.id}.md`);
  const solutionPath = path.join(solutionDirectory, `${item.id}.js`);
  if (!fs.existsSync(markdownPath)) continue;

  const itemErrors = [];
  const markdown = fs.readFileSync(markdownPath, "utf8");
  for (const heading of requiredHeadings) {
    if (!markdown.includes(`## ${heading}`)) itemErrors.push(`thiếu heading ${heading}`);
  }
  if (!markdown.includes(item.link.split("?", 1)[0])) itemErrors.push("thiếu link official đúng lesson");
  if (!fs.existsSync(solutionPath)) itemErrors.push("thiếu solution module");
  if (!testText.includes(item.id)) itemErrors.push("chưa có test mang ID bài");

  for (const match of markdown.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (/^(?:https?:|mailto:|data:)/i.test(target)) continue;
    const localPath = target.split("#", 1)[0];
    const resolved = path.resolve(path.dirname(markdownPath), decodeURIComponent(localPath));
    if (!fs.existsSync(resolved)) itemErrors.push(`link local gãy: ${target}`);
  }

  let codeBlockCount = 0;
  for (const match of markdown.matchAll(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/gm)) {
    codeBlockCount++;
    try {
      new vm.Script(match[1], { filename: `${item.id}#block-${codeBlockCount}` });
    } catch (error) {
      itemErrors.push(`code block ${codeBlockCount} không parse: ${error.message}`);
    }
  }
  if (codeBlockCount < 4) itemErrors.push(`chỉ có ${codeBlockCount}/4 JavaScript blocks`);

  if (fs.existsSync(solutionPath)) {
    try {
      new vm.Script(fs.readFileSync(solutionPath, "utf8"), { filename: solutionPath });
    } catch (error) {
      itemErrors.push(`solution không parse: ${error.message}`);
    }
  }

  if (itemErrors.length > 0) {
    partial.push(item.id);
    errors.push(...itemErrors.map((error) => `${item.id}: ${error}`));
  } else completed.push(item.id);
}

const lockedCount = catalog.filter((item) => item.locked).length;
const exposedCount = catalog.length - lockedCount;
const remainingCount = exposedCount - completed.length;

console.log(
  `Official lessons: ${completed.length}/${exposedCount} certified; ` +
    `${remainingCount} exposed remaining; ${lockedCount} mock locked.`,
);
if (completed.length > 0) console.log(`Certified: ${completed.join(", ")}`);
if (partial.length > 0) console.log(`Partial: ${partial.join(", ")}`);

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
