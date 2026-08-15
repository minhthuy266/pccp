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
  "user-guide.grepp.co",
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

function expandOfficialIds(text) {
  const result = new Set();

  for (const match of text.matchAll(/\bOF(\d{3})\b/g)) {
    result.add(`OF${match[1]}`);
  }

  for (const match of text.matchAll(/\bOF(\d{3})\s*[–—−-]\s*(?:OF)?(\d{3})\b/g)) {
    const start = Number(match[1]);
    const end = Number(match[2]);
    if (start > end || end - start > 100) continue;
    for (let number = start; number <= end; number++) {
      result.add(`OF${String(number).padStart(3, "0")}`);
    }
  }

  return result;
}

const navigatorDayRows = new Map();
for (const line of navigator.split(/\r?\n/)) {
  const match = line.match(/^\|\s*D(\d+)\s*·[^|]*\|/);
  if (!match) continue;
  const day = Number(match[1]);
  if (navigatorDayRows.has(day)) errors.push(`Navigator có nhiều dòng schedule D${day}`);
  navigatorDayRows.set(day, line);
}

const reservedRows = rows.filter((row) => row.priority === "RESERVED_MOCK");
const expectedReservedIds = new Set(
  Array.from({ length: 8 }, (_, index) => `OF${String(index + 62).padStart(3, "0")}`),
);
const actualReservedIds = new Set(reservedRows.map((row) => row.bank_id));
if (
  actualReservedIds.size !== expectedReservedIds.size ||
  [...expectedReservedIds].some((id) => !actualReservedIds.has(id))
) {
  errors.push(`RESERVED_MOCK phải đúng OF062–OF069; nhận ${[...actualReservedIds].sort().join(", ")}`);
}
const expectedReservedByDay = new Map([
  [22, new Set(["OF062", "OF063", "OF064", "OF065"])],
  [24, new Set(["OF066", "OF067", "OF068", "OF069"])],
]);

for (const [day, expected] of expectedReservedByDay) {
  const line = navigatorDayRows.get(day) ?? "";
  const actual = new Set(
    [...expandOfficialIds(line)].filter((id) => reservedRows.some((row) => row.bank_id === id)),
  );
  if ([...expected].some((id) => !actual.has(id)) || [...actual].some((id) => !expected.has(id))) {
    errors.push(`Navigator D${day} phải honor-unlock đúng ${[...expected].join("–")}`);
  }
  if (!/honor[- ]unlock/i.test(line)) {
    errors.push(`Navigator D${day} thiếu nhãn honor-unlock`);
  }
}

for (const [day, line] of navigatorDayRows) {
  if (day === 22 || day === 24) continue;
  const exposed = [...expandOfficialIds(line)].filter((id) =>
    reservedRows.some((row) => row.bank_id === id),
  );
  if (exposed.length > 0) {
    errors.push(`Reserved mock chỉ được xếp ở D22/D24; D${day} có ${exposed.join(", ")}`);
  }
}

const publicRouteDocuments = [
  "README.md",
  "PCCP_700_MASTER_NAVIGATOR.md",
  "PLAN_PCCP_700_REBUILD_2026-09-12.md",
  "TRACKER_PCCP_REBUILD_2026.csv",
  "TRACKER_PCCP_MOCK_ATTEMPTS.csv",
  "PCCP_OFFICIAL_ONLY_CURRICULUM.md",
  "docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md",
  "docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md",
];
for (const reserved of reservedRows) {
  for (const relative of publicRouteDocuments) {
    const text = fs.readFileSync(path.join(root, relative), "utf8");
    if (text.includes(reserved.problem_name)) {
      errors.push(`${relative}: lộ tên reserved mock ${reserved.bank_id}`);
    }
    const escapedLessonId = reserved.lesson_id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`/lessons/${escapedLessonId}(?:\\b|\\?)`).test(text)) {
      errors.push(`${relative}: lộ link reserved mock ${reserved.bank_id}`);
    }
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
