import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const required = [
  "README.md",
  "PCCP_700_MASTER_NAVIGATOR.md",
  "REPO_CONTENT_AUDIT_2026-08-12.md",
  "PCCP_OFFICIAL_ONLY_CURRICULUM.md",
  "PCCP_OFFICIAL_PRACTICE_BANK.csv",
  "PCCP_OFFICIAL_SYLLABUS_RESERVE.csv",
  "PLAN_PCCP_700_REBUILD_2026-09-12.md",
  "TRACKER_PCCP_REBUILD_2026.csv",
  "docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md",
  "docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md",
  "docs/JS_TEMPLATES_PCCP.js",
  "docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md",
  "locked/OFFICIAL_MOCK_BANK.md",
];
const errors = [];

function slugify(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

function headingSlugs(text) {
  const slugs = new Set();
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*#*$/);
    if (match) slugs.add(slugify(match[1]));
  }
  return slugs;
}

for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`Thiếu file: ${relative}`);
}

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
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      fields.push(current);
      current = "";
    } else {
      current += character;
    }
  }

  fields.push(current);
  return fields;
}

const bankPath = path.join(root, "PCCP_OFFICIAL_PRACTICE_BANK.csv");
const lines = fs.readFileSync(bankPath, "utf8").trim().split(/\r?\n/);
const headers = parseCsvLine(lines[0]);
const rows = lines.slice(1).map((line, index) => {
  const cells = parseCsvLine(line);
  if (cells.length !== headers.length) {
    errors.push(`Bank dòng ${index + 2}: ${cells.length}/${headers.length} cột`);
  }
  return Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex]]));
});

const ids = new Set();
const lessonIds = new Set();
const counts = new Map();
for (const row of rows) {
  if (!/^OF\d{3}$/.test(row.bank_id ?? "")) errors.push(`bank_id sai: ${row.bank_id}`);
  if (ids.has(row.bank_id)) errors.push(`bank_id trùng: ${row.bank_id}`);
  ids.add(row.bank_id);

  if (lessonIds.has(row.lesson_id)) errors.push(`lesson_id trùng: ${row.lesson_id}`);
  lessonIds.add(row.lesson_id);

  if (!/^https:\/\/school\.programmers\.co\.kr\/learn\/courses\/30\/lessons\/\d+/.test(row.link ?? "")) {
    errors.push(`Link bài không official: ${row.bank_id} -> ${row.link}`);
  }

  counts.set(row.priority, (counts.get(row.priority) ?? 0) + 1);
}

const expectedCounts = { CORE: 32, TRANSFER: 22, STRETCH: 7, RESERVED_MOCK: 8 };
for (const [priority, expected] of Object.entries(expectedCounts)) {
  if (counts.get(priority) !== expected) {
    errors.push(`${priority}: ${counts.get(priority) ?? 0}, cần ${expected}`);
  }
}

const reservePath = path.join(root, "PCCP_OFFICIAL_SYLLABUS_RESERVE.csv");
const reserveLines = fs.readFileSync(reservePath, "utf8").trim().split(/\r?\n/);
const reserveHeaders = parseCsvLine(reserveLines[0]);
const reserveRows = reserveLines.slice(1).map((line) => {
  const cells = parseCsvLine(line);
  return Object.fromEntries(reserveHeaders.map((header, index) => [header, cells[index]]));
});
if (reserveRows.length !== 6) errors.push(`Coverage reserve: ${reserveRows.length}, cần 6`);
for (let number = 1; number <= 6; number++) {
  const expectedId = `SR${String(number).padStart(3, "0")}`;
  const row = reserveRows.find((item) => item.reserve_id === expectedId);
  if (!row) errors.push(`Coverage reserve thiếu ${expectedId}`);
  else if (!/^https:\/\/school\.programmers\.co\.kr\/learn\/courses\/30\/lessons\/\d+/.test(row.link ?? "")) {
    errors.push(`Coverage reserve link không official: ${expectedId}`);
  }
}

const canonicalMarkdown = required.filter((file) => file.endsWith(".md"));
for (const relative of canonicalMarkdown) {
  const absolute = path.join(root, relative);
  const text = fs.readFileSync(absolute, "utf8");

  for (const match of text.matchAll(/\bOF\d{3}\b/g)) {
    if (!ids.has(match[0])) errors.push(`${relative}: mã không có trong bank ${match[0]}`);
  }

  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].trim();
    if (/^(?:https?:|mailto:|data:)/i.test(target)) continue;
    if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
    const [localPath, rawAnchor] = target.split("#", 2);
    const resolved = localPath
      ? path.resolve(path.dirname(absolute), decodeURIComponent(localPath))
      : absolute;
    if (!fs.existsSync(resolved)) errors.push(`Link gãy: ${relative} -> ${target}`);
    else if (rawAnchor && resolved.endsWith(".md")) {
      const targetText = fs.readFileSync(resolved, "utf8");
      const anchor = decodeURIComponent(rawAnchor).toLowerCase();
      if (!headingSlugs(targetText).has(anchor)) {
        errors.push(`Anchor gãy: ${relative} -> ${target}`);
      }
    }
  }

  let block = 0;
  for (const match of text.matchAll(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/gm)) {
    block++;
    try {
      new vm.Script(match[1], { filename: `${relative}#js-${block}` });
    } catch (firstError) {
      try {
        new vm.Script(`function __snippet__() {\n${match[1]}\n}`, {
          filename: `${relative}#js-${block}`,
        });
      } catch {
        errors.push(`${relative}: JavaScript block ${block} không parse: ${firstError.message}`);
      }
    }
  }
}

const sourceBearing = [
  "PCCP_700_MASTER_NAVIGATOR.md",
  "PCCP_OFFICIAL_ONLY_CURRICULUM.md",
  "PLAN_PCCP_700_REBUILD_2026-09-12.md",
  "docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md",
  "docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md",
];
const allowedDomains = new Set([
  "certi.programmers.co.kr",
  "business.programmers.co.kr",
  "school.programmers.co.kr",
  "developer.mozilla.org",
]);
for (const relative of sourceBearing) {
  const text = fs.readFileSync(path.join(root, relative), "utf8");
  for (const match of text.matchAll(/https:\/\/([^/\s)>]+)/g)) {
    if (!allowedDomains.has(match[1])) {
      errors.push(`${relative}: nguồn ngoài allowlist ${match[1]}`);
    }
  }
}

const navigator = fs.readFileSync(path.join(root, "PCCP_700_MASTER_NAVIGATOR.md"), "utf8");
for (let number = 1; number <= 47; number++) {
  const id = `OF${String(number).padStart(3, "0")}`;
  if (!navigator.includes(id)) errors.push(`Navigator thiếu bài Kit: ${id}`);
}
for (let number = 1; number <= 6; number++) {
  const id = `SR${String(number).padStart(3, "0")}`;
  if (!navigator.includes(id)) errors.push(`Navigator thiếu coverage reserve: ${id}`);
}

for (let number = 1; number <= 11; number++) {
  const partPattern = new RegExp(`\\|\\s*${String(number).padStart(2, "0")}\\s*\\|`);
  if (!partPattern.test(navigator)) errors.push(`Navigator thiếu course Part ${number}`);
}

const syllabusTerms = [
  "Implementation", "String", "Array", "Greedy", "Sort", "Stack", "Queue",
  "Deque", "Hash", "Binary Search", "DFS", "BFS", "Graph", "Tree", "Heap",
  "Dynamic Programming", "Correctness/efficiency",
];
for (const term of syllabusTerms) {
  if (!navigator.includes(term)) errors.push(`Navigator thiếu syllabus term: ${term}`);
}

const plan = fs.readFileSync(path.join(root, "PLAN_PCCP_700_REBUILD_2026-09-12.md"), "utf8");
const learningSection = plan.split("| D23 |", 1)[0];
for (const reserved of rows.filter((row) => row.priority === "RESERVED_MOCK")) {
  if (learningSection.includes(reserved.bank_id)) {
    errors.push(`Reserved mock xuất hiện trước D23: ${reserved.bank_id}`);
  }
}

const templatePath = path.join(root, "docs/JS_TEMPLATES_PCCP.js");
try {
  new vm.Script(fs.readFileSync(templatePath, "utf8"), { filename: templatePath });
} catch (error) {
  errors.push(`Template JavaScript không parse: ${error.message}`);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `Canonical audit pass: ${rows.length} bài; ` +
    [...counts.entries()].map(([key, value]) => `${key}=${value}`).join(", ") +
    `; coverage reserve=${reserveRows.length}`,
);
