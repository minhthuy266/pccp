import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const files = {
  master: "PCCP_700_MASTER_NAVIGATOR.md",
  plan: "PLAN_PCCP_700_REBUILD_2026-09-12.md",
  tracker: "TRACKER_PCCP_REBUILD_2026.csv",
  mockTracker: "TRACKER_PCCP_MOCK_ATTEMPTS.csv",
  bank: "PCCP_OFFICIAL_PRACTICE_BANK.csv",
  reserve: "PCCP_OFFICIAL_SYLLABUS_RESERVE.csv",
  curriculum: "docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md",
  officialCurriculum: "PCCP_OFFICIAL_ONLY_CURRICULUM.md",
  cheatSheet: "docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md",
  templates: "docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md",
  researchAudit: "docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md",
  notebookReadme: "PCCP_Algorithm_Code_Notebook/README.md",
  lockedMock: "locked/OFFICIAL_MOCK_BANK.md",
  pastSetA: "locked/PAST_SET_A_LAUNCH.md",
  pastSetB: "locked/PAST_SET_B_LAUNCH.md",
};

function read(relative) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) {
    errors.push(`Thiếu file route: ${relative}`);
    return "";
  }
  return fs.readFileSync(absolute, "utf8").replace(/^\uFEFF/, "");
}

function parseCsv(relative) {
  const text = read(relative);
  const matrix = [];
  let row = [];
  let field = "";
  let quoted = false;

  function finishField() {
    row.push(field);
    field = "";
  }

  function finishRow() {
    finishField();
    if (row.some((cell) => cell !== "")) matrix.push(row);
    row = [];
  }

  for (let index = 0; index < text.length; index++) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index++;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      if (field !== "") errors.push(`${relative}: quote bắt đầu giữa field`);
      quoted = true;
    } else if (character === ",") {
      finishField();
    } else if (character === "\n" || character === "\r") {
      if (character === "\r" && text[index + 1] === "\n") index++;
      finishRow();
    } else {
      field += character;
    }
  }

  if (quoted) errors.push(`${relative}: CSV có quoted field chưa đóng`);
  if (field !== "" || row.length > 0) finishRow();
  if (matrix.length === 0) {
    errors.push(`${relative}: CSV rỗng`);
    return { headers: [], rows: [] };
  }

  const headers = matrix[0];
  if (new Set(headers).size !== headers.length) errors.push(`${relative}: header CSV bị trùng`);

  const rows = matrix.slice(1).map((cells, index) => {
    if (cells.length !== headers.length) {
      errors.push(`${relative} dòng ${index + 2}: ${cells.length}/${headers.length} cột`);
    }
    return Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] ?? ""]));
  });

  return { headers, rows };
}

function headingRecords(text) {
  return text.split(/\r?\n/).flatMap((line, lineIndex) => {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    return match ? [{ level: match[1].length, title: match[2].trim(), lineIndex }] : [];
  });
}

function headingSection(text, predicate, label) {
  const lines = text.split(/\r?\n/);
  const headings = headingRecords(text);
  const headingIndex = headings.findIndex((heading) => predicate(heading.title));
  if (headingIndex === -1) {
    errors.push(`Thiếu section: ${label}`);
    return { title: "", level: 0, text: "", lineIndex: -1 };
  }

  const heading = headings[headingIndex];
  const next = headings.slice(headingIndex + 1).find((candidate) => candidate.level <= heading.level);
  const end = next?.lineIndex ?? lines.length;
  return { ...heading, text: lines.slice(heading.lineIndex, end).join("\n") };
}

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

function parseScheduleRows(text, label) {
  const result = new Map();

  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    const match = cells[0]?.match(/^(D(\d+)|EXAM)\s*·\s*(\d{2}\/\d{2})$/);
    if (!match) continue;
    const key = match[1] === "EXAM" ? "EXAM" : Number(match[2]);
    if (result.has(key)) errors.push(`${label}: schedule trùng ${match[1]}`);
    result.set(key, { key, date: match[3], cells, raw: line });
  }

  return result;
}

function expandLearningIds(text) {
  const result = new Set();

  for (const match of text.matchAll(/\b(?:OF|SR)\d{3}\b/g)) result.add(match[0]);

  for (const match of text.matchAll(/\b(OF|SR)(\d{3})\s*[-–—−]\s*(?:(OF|SR))?(\d{3})\b/g)) {
    const prefix = match[1];
    if (match[3] && match[3] !== prefix) continue;
    const start = Number(match[2]);
    const end = Number(match[4]);
    if (start > end || end - start > 100) continue;
    for (let number = start; number <= end; number++) {
      result.add(`${prefix}${String(number).padStart(3, "0")}`);
    }
  }

  return result;
}

function sorted(values) {
  return [...values].sort();
}

function sameSet(left, right) {
  return left.size === right.size && [...left].every((value) => right.has(value));
}

function markdownLinks(text) {
  return [...text.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)].map((match) => ({
    label: match[1],
    href: match[2].trim(),
  }));
}

const masterText = read(files.master);
const masterScheduleSection = headingSection(
  masterText,
  (title) => /^6\. Thứ tự học bắt buộc$/.test(title),
  `${files.master}#6`,
);
const masterDays = parseScheduleRows(masterScheduleSection.text, files.master);
const expectedMasterOrder = [...Array.from({ length: 28 }, (_, index) => index + 1), "EXAM"];
if ([...masterDays.keys()].join(",") !== expectedMasterOrder.join(",")) {
  errors.push(`${files.master}: schedule phải theo đúng thứ tự D1→D28→EXAM`);
}

const notebookPrefix = "PCCP_Algorithm_Code_Notebook/";
const expectedNotebookUnlock = `${notebookPrefix}README.md`;
const allNotebookLinks = markdownLinks(masterText).filter((link) => link.href.startsWith(notebookPrefix));
const d26NotebookLinks = markdownLinks(masterDays.get(26)?.raw ?? "")
  .filter((link) => link.href.startsWith(notebookPrefix));
if (allNotebookLinks.length !== 1 || allNotebookLinks[0]?.href !== expectedNotebookUnlock) {
  errors.push(`${files.master}: chỉ được có một link vào notebook và phải unlock ở D26`);
}
if (d26NotebookLinks.length !== 1 || d26NotebookLinks[0]?.href !== expectedNotebookUnlock) {
  errors.push(`${files.master}: D26 phải link chính xác ${expectedNotebookUnlock}`);
}
const notebookReadme = read(files.notebookReadme);
if (!/chỉ mở từ D26[\s\S]{0,120}D24/iu.test(notebookReadme)) {
  errors.push(`${files.notebookReadme}: phải cảnh báo chỉ mở từ D26, sau D24`);
}

const tracker = parseCsv(files.tracker);
for (const requiredHeader of ["planned_date", "day", "planned_work", "completed_at"]) {
  if (!tracker.headers.includes(requiredHeader)) errors.push(`${files.tracker}: thiếu cột ${requiredHeader}`);
}

if (tracker.rows.length !== 29) {
  errors.push(`${files.tracker}: cần đúng 29 dòng D1–D28 + EXAM, nhận ${tracker.rows.length}`);
}

const trackerByDay = new Map();
for (const row of tracker.rows) {
  const match = row.day?.match(/^D(\d+)$/);
  const key = row.day === "EXAM" ? "EXAM" : match ? Number(match[1]) : null;
  if (key === null) {
    errors.push(`${files.tracker}: day không hợp lệ ${row.day}`);
    continue;
  }
  if (trackerByDay.has(key)) errors.push(`${files.tracker}: day trùng ${row.day}`);
  trackerByDay.set(key, row);
}

for (let day = 1; day <= 28; day++) {
  const expectedDate = new Date(Date.UTC(2026, 7, 15 + day - 1)).toISOString().slice(0, 10);
  const trackerRow = trackerByDay.get(day);
  if (!trackerRow) {
    errors.push(`${files.tracker}: thiếu D${day}`);
    continue;
  }
  if (trackerRow.planned_date !== expectedDate) {
    errors.push(`${files.tracker}: D${day} có ngày ${trackerRow.planned_date}, cần ${expectedDate}`);
  }
  if (tracker.rows[day - 1]?.day !== `D${day}`) {
    errors.push(`${files.tracker}: thứ tự dòng phải là D1→D28`);
  }

  const masterRow = masterDays.get(day);
  if (!masterRow) {
    errors.push(`${files.master}: thiếu schedule D${day}`);
  } else {
    const expectedShortDate = `${expectedDate.slice(8, 10)}/${expectedDate.slice(5, 7)}`;
    if (masterRow.date !== expectedShortDate) {
      errors.push(`${files.master}: D${day} có ngày ${masterRow.date}, cần ${expectedShortDate}`);
    }
  }
}

const examTracker = trackerByDay.get("EXAM");
if (!examTracker || examTracker.planned_date !== "2026-09-12") {
  errors.push(`${files.tracker}: EXAM phải ở 2026-09-12`);
}
if (tracker.rows[28]?.day !== "EXAM") errors.push(`${files.tracker}: EXAM phải là dòng cuối`);
if (masterDays.size !== 29 || !masterDays.has("EXAM")) {
  errors.push(`${files.master}: cần đúng D1–D28 và một dòng EXAM`);
}
if (masterDays.get("EXAM")?.date !== "12/09") errors.push(`${files.master}: EXAM phải ở 12/09`);

const bank = parseCsv(files.bank);
const reserve = parseCsv(files.reserve);
const bankById = new Map(bank.rows.map((row) => [row.bank_id, row]));
const reserveById = new Map(reserve.rows.map((row) => [row.reserve_id, row]));
const coreIds = new Set(bank.rows.filter((row) => row.priority === "CORE").map((row) => row.bank_id));
if (coreIds.size !== 32) errors.push(`${files.bank}: cần đúng 32 CORE, nhận ${coreIds.size}`);

function validateCoreCoverage(label, idsByDay) {
  const counts = new Map();
  for (let day = 1; day <= 17; day++) {
    for (const id of idsByDay(day)) {
      if (coreIds.has(id)) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }

  const present = new Set(counts.keys());
  const missing = sorted([...coreIds].filter((id) => !present.has(id)));
  const unexpected = sorted([...present].filter((id) => !coreIds.has(id)));
  const repeated = sorted([...counts].filter(([, count]) => count !== 1).map(([id]) => id));
  if (present.size !== 32 || missing.length || unexpected.length || repeated.length) {
    errors.push(
      `${label}: CORE D1–D17 phải đúng 32 ID; thiếu=[${missing}], dư=[${unexpected}], lặp=[${repeated}]`,
    );
  }
}

validateCoreCoverage(files.master, (day) => expandLearningIds(masterDays.get(day)?.raw ?? ""));
validateCoreCoverage(files.tracker, (day) => expandLearningIds(trackerByDay.get(day)?.planned_work ?? ""));

for (let day = 1; day <= 28; day++) {
  const masterIds = expandLearningIds(masterDays.get(day)?.raw ?? "");
  const trackerIds = expandLearningIds(trackerByDay.get(day)?.planned_work ?? "");
  if (!sameSet(masterIds, trackerIds)) {
    errors.push(
      `Route D${day} lệch: Master=[${sorted(masterIds)}], Tracker=[${sorted(trackerIds)}]`,
    );
  }
}

let directAssignmentCount = 0;
for (let day = 1; day <= 28; day++) {
  const scheduleRow = masterDays.get(day);
  if (!scheduleRow) continue;
  const links = markdownLinks(scheduleRow.raw).map((link) => link.href);

  for (const id of expandLearningIds(scheduleRow.raw)) {
    const sourceRow = bankById.get(id) ?? reserveById.get(id);
    if (!sourceRow) {
      errors.push(`${files.master}: D${day} dùng ID không có trong bank/reserve ${id}`);
      continue;
    }
    if (sourceRow.priority === "RESERVED_MOCK") continue;
    directAssignmentCount++;
    if (!links.includes(sourceRow.link)) {
      errors.push(`${files.master}: D${day} ${id} thiếu direct official link ${sourceRow.link}`);
    }
  }
}

const exactCurriculumSections = [
  {
    day: 8,
    title: "Lab H — String và parsing contract-first",
    anchor: "lab-h--string-và-parsing-contract-first",
    routeAnchor: "lab-h--string-và-parsing-contract-first",
  },
  {
    day: 12,
    title: "Lab C — Binary search on answer: tìm first feasible",
    anchor: "lab-c--binary-search-on-answer-tìm-first-feasible",
    routeAnchor: "sáu-drill-predicate-bắt-buộc",
  },
  {
    day: 14,
    title: "10.4 State BFS ba chiều",
    anchor: "104-state-bfs-ba-chiều",
    routeAnchor: "ba-drill-thiết-kế-state-cho-d14",
  },
  {
    day: 15,
    title: "10.6 Dijkstra cho cạnh có trọng số không âm",
    anchor: "106-dijkstra-cho-cạnh-có-trọng-số-không-âm",
    routeAnchor: "106-dijkstra-cho-cạnh-có-trọng-số-không-âm",
  },
];

const curriculumText = read(files.curriculum);
const curriculumSections = new Map();
for (const expected of exactCurriculumSections) {
  const section = headingSection(
    curriculumText,
    (title) => title === expected.title,
    `${files.curriculum}: ${expected.title}`,
  );
  curriculumSections.set(expected.day, section);
  if (section.title && slugify(section.title) !== expected.anchor) {
    errors.push(`${files.curriculum}: anchor ${slugify(section.title)} phải là ${expected.anchor}`);
  }
  if (!headingRecords(section.text).some((heading) => slugify(heading.title) === expected.routeAnchor)) {
    errors.push(`${files.curriculum}: thiếu route anchor #${expected.routeAnchor}`);
  }

  const expectedHref = `${files.curriculum}#${expected.routeAnchor}`;
  const dayLinks = markdownLinks(masterDays.get(expected.day)?.raw ?? "").map((link) => link.href);
  if (!dayLinks.includes(expectedHref)) {
    errors.push(`${files.master}: D${expected.day} phải link chính xác ${expectedHref}`);
  }
}

const labH = curriculumSections.get(8)?.text ?? "";
for (const subheading of [
  "Tokenization và whitespace",
  "Prefix, suffix và biên substring",
  "Chunk/run parsing",
  "Base conversion, số lớn và chuỗi dài",
]) {
  if (!headingRecords(labH).some((heading) => heading.title === subheading)) {
    errors.push(`${files.curriculum}: Lab H thiếu mục ${subheading}`);
  }
}

function validateDrills(sectionText, count, labels, label) {
  const matches = [...sectionText.matchAll(/^####\s+Drill\s+(\d+)\s+—\s+(.+)$/gm)];
  const numbers = matches.map((match) => Number(match[1]));
  const expectedNumbers = Array.from({ length: count }, (_, index) => index + 1);
  if (matches.length !== count || numbers.some((number, index) => number !== expectedNumbers[index])) {
    errors.push(`${label}: cần đúng ${count} drill tuần tự, nhận [${numbers}]`);
    return;
  }

  for (let index = 0; index < matches.length; index++) {
    const start = matches[index].index;
    const end = matches[index + 1]?.index ?? sectionText.length;
    const drill = sectionText.slice(start, end);
    if (/TODO|placeholder|điền sau/i.test(drill) || matches[index][2].trim().length < 5) {
      errors.push(`${label}: Drill ${index + 1} chưa concrete`);
    }
    for (const requiredLabel of labels) {
      if (!new RegExp(`\\*\\*${requiredLabel}:?\\*\\*`, "i").test(drill)) {
        errors.push(`${label}: Drill ${index + 1} thiếu ${requiredLabel}`);
      }
    }
  }
}

const labC = curriculumSections.get(12)?.text ?? "";
if (!/^###\s+Sáu drill predicate bắt buộc$/m.test(labC)) {
  errors.push(`${files.curriculum}: Lab C thiếu heading Sáu drill predicate bắt buộc`);
}
validateDrills(labC, 6, ["Contract", "Bounds", "Predicate", "Direction", "Update"], "Lab C");

const stateBfs = curriculumSections.get(14)?.text ?? "";
if (!/^###\s+Ba drill thiết kế state(?:\s+cho D14)?$/m.test(stateBfs)) {
  errors.push(`${files.curriculum}: 10.4 thiếu heading Ba drill thiết kế state cho D14`);
}
validateDrills(stateBfs, 3, ["State", "Transition", "Visited key", "Search", "Stop"], "State BFS");

const dijkstra = curriculumSections.get(15)?.text ?? "";
for (const [signal, pattern] of [
  ["class MinHeap", /class\s+MinHeap\b/],
  ["getter size", /get\s+size\s*\(\s*\)/],
  ["function dijkstra", /function\s+dijkstra\s*\(/],
  ["relaxation", /relaxation/i],
  ["stale entry", /stale/i],
]) {
  if (!pattern.test(dijkstra)) errors.push(`${files.curriculum}: Dijkstra thiếu ${signal}`);
}

if (!/sáu drill/i.test(masterDays.get(12)?.raw ?? "")) {
  errors.push(`${files.master}: D12 phải gọi rõ sáu predicate drill`);
}
if (!/ba state drills/i.test(masterDays.get(14)?.raw ?? "")) {
  errors.push(`${files.master}: D14 phải gọi rõ ba state drill`);
}

const expectedMilestones = ["0-5", "5-25", "25-55", "55-90", "90-102", "102-116", "116-120"];
const protocolDocuments = [
  files.master,
  files.plan,
  files.officialCurriculum,
  files.cheatSheet,
  files.lockedMock,
];

for (const relative of protocolDocuments) {
  const text = read(relative);
  const section = headingSection(
    text,
    (title) => /^(?:\d+\.\s*)?(?:Protocol|Chiến thuật)\s+120 phút(?:\s+duy nhất)?$/i.test(title),
    `${relative}: protocol 120 phút`,
  );
  const milestones = section.text.split(/\r?\n/).flatMap((line) => {
    const tableMatch = line.match(/^\|\s*[`*_]*(\d{1,3})\s*[-–—−]\s*(\d{1,3})[`*_]*\s*\|/);
    const listMatch = line.match(/^\s*(?:\d+[.)]|[-*])\s*[`*_]*(\d{1,3})\s*[-–—−]\s*(\d{1,3})[`*_]*\s*[:|]?/);
    const match = tableMatch ?? listMatch;
    return match ? [`${Number(match[1])}-${Number(match[2])}`] : [];
  }).slice(0, expectedMilestones.length);
  if (milestones.join(",") !== expectedMilestones.join(",")) {
    errors.push(`${relative}: milestone đầu phải là ${expectedMilestones.join(", ")}; nhận ${milestones.join(", ")}`);
  }
}

const examRow = masterDays.get("EXAM")?.raw ?? "";
if (!/Submit Code/i.test(examRow)) errors.push(`${files.master}: dòng EXAM thiếu Submit Code`);
if (!/(?:không|no)[^|\n]{0,60}(?:auto[- ]?submit|tự động submit|tự submit)/iu.test(examRow)) {
  errors.push(`${files.master}: dòng EXAM phải nói rõ không dựa vào auto-submit`);
}

const masterExamOps = headingSection(
  masterText,
  (title) => /^(?:\d+\.\s*)?Chiến thuật\s+120 phút$/i.test(title),
  `${files.master}: exam operations`,
);
const masterLinks = markdownLinks(masterExamOps.text);
const requiredGuideLinks = [
  {
    label: /Candidate Guide/i,
    href: "https://certi.programmers.co.kr/guide/main?tab=entrance",
  },
  {
    label: /(?:Coding-test )?UI guide/i,
    href: "https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a",
  },
];
for (const expected of requiredGuideLinks) {
  if (!masterLinks.some((link) => link.href === expected.href && expected.label.test(link.label))) {
    errors.push(`${files.master}: thiếu guide link ${expected.href}`);
  }
}

for (const relative of [files.master, files.officialCurriculum, files.lockedMock, files.researchAudit]) {
  const text = read(relative);
  if (text.includes("https://certi.programmers.co.kr/guide/main?tab=identification")) {
    errors.push(`${relative}: còn dùng tab Candidate Guide identification thay vì entrance`);
  }
}
for (const relative of [files.master, files.officialCurriculum, files.lockedMock]) {
  const text = read(relative);
  if (!/(?:cutoff[^\n.]{0,40}T[−-]20|T[−-]20[^\n.]{0,40}cutoff)/iu.test(text)) {
    errors.push(`${relative}: phải gắn luật không rời phòng với cutoff T−20`);
  }
}

const mockTracker = parseCsv(files.mockTracker);
const expectedMockHeaders = [
  "session", "planned_date", "slot", "problem_id", "start_minute", "first_submit_minute",
  "last_submit_minute", "submit_count", "expected_complexity", "confidence_before_result",
  "visible_sample_status", "final_score_or_partial", "root_cause", "revealing_test",
  "prevention_rule", "recode_minutes", "recode_result", "completed_at", "notes",
];
if (mockTracker.headers.join(",") !== expectedMockHeaders.join(",")) {
  errors.push(`${files.mockTracker}: schema phải đúng ${expectedMockHeaders.join(",")}`);
}
if (mockTracker.rows.length !== 16) {
  errors.push(`${files.mockTracker}: cần đúng 16 dòng, nhận ${mockTracker.rows.length}`);
}

const expectedMockSessions = new Map([
  ["Official Mock 1", "2026-09-01"],
  ["Official Mock 2", "2026-09-03"],
  ["Public Past Set A", "2026-09-05"],
  ["Public Past Set B", "2026-09-07"],
]);
const seenMockRows = new Set();
for (const row of mockTracker.rows) {
  const key = `${row.session}\u0000${row.slot}`;
  if (seenMockRows.has(key)) errors.push(`${files.mockTracker}: trùng ${row.session}/${row.slot}`);
  seenMockRows.add(key);
  const expectedDate = expectedMockSessions.get(row.session);
  if (!expectedDate) errors.push(`${files.mockTracker}: session lạ ${row.session}`);
  else if (row.planned_date !== expectedDate) {
    errors.push(`${files.mockTracker}: ${row.session} phải ở ${expectedDate}`);
  }
  if (!/^Q[1-4]$/.test(row.slot)) errors.push(`${files.mockTracker}: slot sai ${row.slot}`);
}
for (const session of expectedMockSessions.keys()) {
  for (let slot = 1; slot <= 4; slot++) {
    if (!seenMockRows.has(`${session}\u0000Q${slot}`)) {
      errors.push(`${files.mockTracker}: thiếu ${session}/Q${slot}`);
    }
  }
}

const lockedRows = parseScheduleRows(read(files.lockedMock), files.lockedMock);
for (const [day, expected] of [[18, "15008"], [20, "15009"]]) {
  const row = lockedRows.get(day)?.raw ?? "";
  if (!new RegExp(`https://school\\.programmers\\.co\\.kr/learn/courses/${expected}(?:[/?)]|$)`).test(row)) {
    errors.push(`${files.lockedMock}: D${day} thiếu course ${expected}`);
  }
}
for (const [day, launcher, expectedIds] of [
  [22, files.pastSetA, new Set(["OF062", "OF063", "OF064", "OF065"])],
  [24, files.pastSetB, new Set(["OF066", "OF067", "OF068", "OF069"])],
]) {
  const lockedRow = lockedRows.get(day)?.raw ?? "";
  const expectedRelativeLink = path.basename(launcher);
  if (!markdownLinks(lockedRow).some((link) => link.href === expectedRelativeLink)) {
    errors.push(`${files.lockedMock}: D${day} phải link tới ${expectedRelativeLink}`);
  }
  const launcherText = read(launcher);
  const actual = new Set([...expandLearningIds(launcherText)].filter((id) => id.startsWith("OF")));
  if (!sameSet(actual, expectedIds)) {
    errors.push(`${launcher}: phải chứa [${sorted(expectedIds)}], nhận [${sorted(actual)}]`);
  }
  for (const id of expectedIds) {
    const expectedLink = bankById.get(id)?.link;
    if (!expectedLink || !markdownLinks(launcherText).some((link) => link.href === expectedLink)) {
      errors.push(`${launcher}: ${id} thiếu direct official link ${expectedLink ?? "<missing bank row>"}`);
    }
  }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules", "archive"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolute));
    else result.push(absolute);
  }
  return result;
}

function stripJavaScriptCommentsAndStrings(code) {
  let output = "";
  let state = "code";

  for (let index = 0; index < code.length; index++) {
    const character = code[index];
    const next = code[index + 1];

    if (state === "code") {
      if (character === "/" && next === "/") {
        output += "  ";
        index++;
        state = "line-comment";
      } else if (character === "/" && next === "*") {
        output += "  ";
        index++;
        state = "block-comment";
      } else if (character === '"' || character === "'" || character === "`") {
        output += " ";
        state = character;
      } else {
        output += character;
      }
    } else if (state === "line-comment") {
      if (character === "\n") {
        output += "\n";
        state = "code";
      } else output += " ";
    } else if (state === "block-comment") {
      if (character === "*" && next === "/") {
        output += "  ";
        index++;
        state = "code";
      } else output += character === "\n" ? "\n" : " ";
    } else {
      if (character === "\\") {
        output += " ";
        if (index + 1 < code.length) {
          output += code[index + 1] === "\n" ? "\n" : " ";
          index++;
        }
      } else if (character === state) {
        output += " ";
        state = "code";
      } else output += character === "\n" ? "\n" : " ";
    }
  }

  return output;
}

function auditHeapSizeApi(code, label) {
  const stripped = stripJavaScriptCommentsAndStrings(code);
  for (const match of stripped.matchAll(/\.\s*size\s*\(/g)) {
    const line = stripped.slice(0, match.index).split("\n").length;
    errors.push(`${label}:${line}: dùng .size(); API canonical là getter .size`);
  }
  for (const match of stripped.matchAll(/^\s*size\s*\(\s*\)\s*\{/gm)) {
    const line = stripped.slice(0, match.index).split("\n").length;
    errors.push(`${label}:${line}: khai báo size() method; API canonical là get size()`);
  }
  for (const match of stripped.matchAll(/\b(?:heap|pq|priorityQueue)\s*\.\s*isEmpty\s*\(/gi)) {
    const line = stripped.slice(0, match.index).split("\n").length;
    errors.push(`${label}:${line}: heap phải dùng getter .size, không dùng .isEmpty()`);
  }
  for (const match of stripped.matchAll(/Math\.floor\(\s*\(\s*(?:left|low)\s*\+\s*(?:right|high)\s*\)\s*\/\s*2\s*\)/g)) {
    const line = stripped.slice(0, match.index).split("\n").length;
    errors.push(`${label}:${line}: midpoint phải dùng left + floor((right-left)/2)`);
  }
}

const templateHeapSection = headingSection(
  read(files.templates),
  (title) => /^14\. Min-heap \/ Priority Queue$/i.test(title),
  `${files.templates}: heap canonical`,
);
if (/^\s*isEmpty\s*\(\s*\)\s*\{/m.test(templateHeapSection.text)) {
  errors.push(`${files.templates}: heap canonical chỉ được dùng getter .size, không khai báo isEmpty()`);
}

const executableJsFiles = [
  ...walk(path.join(root, "solutions")).filter((file) => file.endsWith(".js")),
  path.join(root, "docs/JS_TEMPLATES_PCCP.js"),
];
for (const absolute of executableJsFiles) {
  auditHeapSizeApi(fs.readFileSync(absolute, "utf8"), path.relative(root, absolute));
}

const markdownFiles = [
  ...walk(path.join(root, "PCCP_Algorithm_Code_Notebook")).filter((file) => file.endsWith(".md")),
  ...walk(path.join(root, "docs/pccp-700-roadmap")).filter((file) => file.endsWith(".md")),
  ...[files.master, files.plan, files.officialCurriculum, files.lockedMock].map((file) => path.join(root, file)),
];
for (const absolute of new Set(markdownFiles)) {
  const text = fs.readFileSync(absolute, "utf8");
  let fence = 0;
  for (const match of text.matchAll(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/gm)) {
    fence++;
    auditHeapSizeApi(match[1], `${path.relative(root, absolute)}#js-${fence}`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `Learning route audit: 32/32 CORE; 28/28 days + EXAM; ` +
    `${directAssignmentCount} direct assignment links; 6/6 predicate drills; ` +
    `3/3 state drills; 16/16 mock rows; heap .size API consistent.`,
);
