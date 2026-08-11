import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repositoryRoot = process.cwd();
const notebookRoot = path.join(repositoryRoot, "PCCP_Algorithm_Code_Notebook");
const matrixPath = path.join(notebookRoot, "PATTERN_COVERAGE_MATRIX.md");
const reportPath = path.join(notebookRoot, "FRAMEWORK_COVERAGE_AUDIT.md");

function walk(directory) {
  const output = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "locked") continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...walk(absolute));
    else output.push(absolute);
  }
  return output;
}

const markdownFiles = walk(notebookRoot).filter((file) => file.endsWith(".md"));
const markdown = new Map(markdownFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));

function relative(file) {
  return path.relative(repositoryRoot, file).split(path.sep).join("/");
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

function headingsOf(text) {
  const slugs = new Set();
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*#*$/);
    if (match) slugs.add(slugify(match[1]));
  }
  return slugs;
}

function parseMatrix() {
  const rows = [];
  for (const line of fs.readFileSync(matrixPath, "utf8").split(/\r?\n/)) {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (!/^[A-Z]+-\d+$/.test(cells[0] ?? "")) continue;
    rows.push({
      id: cells[0],
      kind: (cells[6] ?? "").split("·")[0].trim(),
      needsTemplate: /(?:CORE|VARIANT|OPTIONAL)\s*·\s*Có/.test(cells[6] ?? ""),
      matrixStatus: cells[9] ?? "UNKNOWN",
    });
  }
  return rows;
}

function headingSections(file, text) {
  const lines = text.split(/\r?\n/);
  const sections = [];
  for (let index = 0; index < lines.length; index++) {
    const match = lines[index].match(/^(#{1,6})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    let end = lines.length;
    for (let cursor = index + 1; cursor < lines.length; cursor++) {
      const next = lines[cursor].match(/^(#{1,6})\s+/);
      if (next && next[1].length <= level) {
        end = cursor;
        break;
      }
    }
    sections.push({
      file,
      heading: match[2],
      level,
      text: lines.slice(index, end).join("\n"),
      line: index + 1,
    });
  }
  return sections;
}

const excludedCanonical = /(?:Practice_Ladder|Solutions|QA|COVERAGE|MATRIX|TRACKER|MANIFEST|CONTEXT|HANDOFF|README|TEMPLATE_CONTRASTS|00_CORE_TEMPLATE_VARIANTS_FRAMEWORK)/i;
const allSections = [];
for (const [file, text] of markdown) {
  if (excludedCanonical.test(path.basename(file))) continue;
  allSections.push(...headingSections(file, text));
}

function canonicalFor(id) {
  const escaped = id.replace("-", "\\-");
  const exact = new RegExp(`(?:\\[${escaped}\\]|\`${escaped}\`)`);
  const candidates = allSections.filter((section) => exact.test(section.heading));
  candidates.sort((a, b) => {
    const aChapter = relative(a.file).includes("/chapters/") ? 0 : 1;
    const bChapter = relative(b.file).includes("/chapters/") ? 0 : 1;
    return aChapter - bChapter || b.text.length - a.text.length;
  });
  return candidates[0] ?? null;
}

const evidenceRules = {
  Core: /(?:^|\n)#{3,6}\s+(?:core|a\.\s*bản chất|bản chất|bài toán mở đầu|mental model)|phần công việc.*lặp|pattern loại bỏ/iu,
  Recognition: /dấu hiệu nhận dạng|cách nhận ra|tín hiệu|signal/iu,
  "Brute force": /brute force|cách chậm|bottleneck|phần công việc bị lặp|phần việc bị lặp/iu,
  State: /\bstate\b|trạng thái|lưu (?:điều|gì)|giữ (?:đúng|các|index|value)/iu,
  Invariant: /invariant|điều luôn đúng/iu,
  Transition: /transition|check.{0,20}update|thứ tự không được đảo|while.{0,30}pop/isu,
  Template: /template|skeleton|khung cần nhớ|template code|```js/iu,
  Variants: /variant knobs|biến thể|mutation|strictness|strict\/non-strict/iu,
  "Dry run": /dry run|chạy tay/iu,
  Complexity: /complexity|độ phức tạp|`?O\([^\n)]+\)`?/iu,
  Transfer: /transfer|tự kiểm tra|bài luyện nhận dạng|recall|mutation/iu,
};

function evidence(section, rule) {
  if (!section || !rule.test(section.text)) return null;
  return `${relative(section.file)}:${section.line} — ${section.heading.replace(/\|/g, "\\|")}`;
}

function filesContaining(id, predicate) {
  const token = new RegExp(`\\b${id.replace("-", "\\-")}\\b`);
  return [...markdown.entries()]
    .filter(([file, text]) => predicate(file) && token.test(text))
    .map(([file]) => file);
}

const chapterNumberByPrefix = {
  ARR: "01", MAT: "02", MAP: "03", SIM: "04", SORT: "05", TP: "06",
  PRE: "07", SW: "07", SQ: "08", BS: "09", BFS: "10", HG: "11", BTD: "12",
};

function belongsToIdChapter(file, id) {
  const chapterNumber = chapterNumberByPrefix[id.split("-")[0]];
  if (!chapterNumber) return true;
  const normalized = relative(file);
  return normalized.includes(`/chapters/${chapterNumber}_`) || normalized.includes(`/solutions/${chapterNumber}_`);
}

function qaFor(id, canonical) {
  if (!canonical) return null;
  const prefix = id.split("-")[0];
  const chapterDirectory = path.dirname(canonical.file);
  const direct = path.join(chapterDirectory, "QA.md");
  if (markdown.has(direct)) {
    const text = markdown.get(direct);
    if (text.includes(id) || text.includes(`${prefix}-*`) || text.includes(`${prefix}-01..`)) return direct;
  }
  return filesContaining(id, (file) => path.basename(file) === "QA.md")[0] ?? null;
}

function markdownEvidence(file) {
  return file ? relative(file) : null;
}

function cell(value) {
  return value ? `✅ <sub>${value.replace(/\|/g, "\\|")}</sub>` : "❌ —";
}

const rows = parseMatrix();
const auditRows = [];
for (const row of rows) {
  const canonical = canonicalFor(row.id);
  const dimensions = Object.fromEntries(
    Object.entries(evidenceRules).map(([name, rule]) => [name, evidence(canonical, rule)]),
  );
  if (!row.needsTemplate && canonical && !dimensions.Template) {
    dimensions.Template = `${relative(canonical.file)}:${canonical.line} — dùng template gốc/không yêu cầu template riêng`;
  }
  const practice = filesContaining(row.id, (file) => /Practice_Ladder\.md$/.test(file) && belongsToIdChapter(file, row.id))[0] ?? null;
  const solution = filesContaining(row.id, (file) => /\/solutions\//.test(file) && belongsToIdChapter(file, row.id))[0] ?? null;
  const qa = qaFor(row.id, canonical);
  const fields = {
    ...dimensions,
    Practice: markdownEvidence(practice),
    Solution: markdownEvidence(solution),
    QA: markdownEvidence(qa),
  };
  const missing = Object.entries(fields).filter(([, value]) => !value).map(([name]) => name);
  auditRows.push({ ...row, canonical, fields, missing, status: missing.length === 0 ? "FRAMEWORK-FULL" : "NEEDS-FRAMEWORK" });
}

const hardErrors = [];

// Practice ID phải có solution cùng ID.
const practiceIds = new Map();
const solutionIds = new Set();
for (const [file, text] of markdown) {
  for (const match of text.matchAll(/^###\s+([A-Z]\d{2}-[A-Z][A-Z0-9.]*)\b/gm)) {
    if (/Practice_Ladder\.md$/.test(file)) practiceIds.set(match[1], file);
    if (/\/solutions\//.test(file)) solutionIds.add(match[1]);
  }
}
for (const [id, file] of practiceIds) {
  if (!solutionIds.has(id)) hardErrors.push(`Practice ID thiếu solution: ${id} (${relative(file)})`);
}

// Markdown links nội bộ, kể cả anchor.
for (const [file, text] of markdown) {
  const links = text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g);
  for (const match of links) {
    let target = match[1].trim();
    if (/^(?:https?:|mailto:|data:)/i.test(target)) continue;
    if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
    const [rawPath, rawAnchor] = target.split("#", 2);
    let decodedPath;
    try { decodedPath = decodeURIComponent(rawPath); } catch { decodedPath = rawPath; }
    const targetFile = rawPath ? path.resolve(path.dirname(file), decodedPath) : file;
    if (!fs.existsSync(targetFile)) {
      hardErrors.push(`Link gãy: ${relative(file)} -> ${target}`);
      continue;
    }
    if (rawAnchor && targetFile.endsWith(".md")) {
      let anchor;
      try { anchor = decodeURIComponent(rawAnchor).toLowerCase(); } catch { anchor = rawAnchor.toLowerCase(); }
      const targetText = markdown.get(targetFile) ?? fs.readFileSync(targetFile, "utf8");
      if (!headingsOf(targetText).has(anchor)) {
        hardErrors.push(`Anchor gãy: ${relative(file)} -> ${target}`);
      }
    }
  }
}

// Mỗi JavaScript fence parse độc lập; js-fill không phải code hoàn chỉnh.
for (const [file, text] of markdown) {
  let blockNumber = 0;
  for (const match of text.matchAll(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/gm)) {
    blockNumber++;
    try {
      new vm.Script(match[1], { filename: `${relative(file)}#js-${blockNumber}` });
    } catch (error) {
      // Skeletons có thể chứa return/continue hợp lệ khi đặt trong function.
      try {
        new vm.Script(`function __notebookSnippet__() {\n${match[1]}\n}`, {
          filename: `${relative(file)}#js-${blockNumber}`,
        });
      } catch {
        hardErrors.push(`JavaScript fence lỗi: ${relative(file)}#js-${blockNumber}: ${error.message.split("\n")[0]}`);
      }
    }
  }
}

// Placeholder nội dung dang dở bị cấm.
const placeholderPattern = /sẽ viết|chưa dùng làm chương hoàn chỉnh/giu;
for (const [file, text] of markdown) {
  if (file === reportPath) continue;
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (placeholderPattern.test(line)) hardErrors.push(`Placeholder: ${relative(file)}:${index + 1}`);
    placeholderPattern.lastIndex = 0;
  });
}

// FULL lịch sử phải có bộ bằng chứng lesson/practice/solution/recall/QA tối thiểu.
const legacyFullGaps = auditRows
  .filter((row) => row.matrixStatus === "FULL")
  .map((row) => ({
    id: row.id,
    missing: [
      !row.canonical && "lesson",
      !row.fields.Practice && "practice",
      !row.fields.Solution && "solution",
      !row.fields.Transfer && "recall/transfer",
      !row.fields.QA && "QA",
    ].filter(Boolean),
  }))
  .filter((item) => item.missing.length > 0);
for (const gap of legacyFullGaps) {
  hardErrors.push(`ID ghi FULL thiếu ${gap.missing.join(", ")}: ${gap.id}`);
}

const frameworkFull = auditRows.filter((row) => row.status === "FRAMEWORK-FULL").length;
const needsFramework = auditRows.length - frameworkFull;
const missingCanonicalCount = auditRows.filter((row) => !row.canonical).length;
const requiredTemplateGapCount = auditRows.filter(
  (row) => row.needsTemplate && !row.fields.Template,
).length;
const missingPracticeCount = auditRows.filter((row) => !row.fields.Practice).length;
const missingSolutionCount = auditRows.filter((row) => !row.fields.Solution).length;
const report = [
  "# Framework Coverage Audit",
  "",
  `[Framework standard](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md) · [Coverage Matrix](PATTERN_COVERAGE_MATRIX.md)`,
  "",
  "> Sinh bởi `npm run check:notebook-framework`. Đây là audit bằng chứng, không tự đổi trạng thái trong Coverage Matrix.",
  "",
  `- Tổng Coverage ID: **${auditRows.length}**.`,
  `- \`FRAMEWORK-FULL\`: **${frameworkFull}**.`,
  `- \`NEEDS-FRAMEWORK\`: **${needsFramework}**.`,
  `- Thiếu canonical lesson: **${missingCanonicalCount}**; CORE/VARIANT/OPTIONAL yêu cầu template nhưng chưa có: **${requiredTemplateGapCount}**.`,
  `- Thiếu practice evidence: **${missingPracticeCount}**; thiếu solution evidence: **${missingSolutionCount}**.`,
  `- Lỗi integrity làm command fail: **${hardErrors.length}**.`,
  "",
  "`✅` trỏ tới file/section làm bằng chứng; `❌` là gap cần bổ sung trong batch sau. Detection dùng heading canonical chứa Coverage ID và từ khóa ngữ nghĩa, không bắt heading phải trùng nguyên văn framework.",
  "",
  "| ID | Core | Recognition | Brute force | State | Invariant | Transition | Template | Variants | Dry run | Complexity | Transfer | Practice | Solution | QA | Status |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...auditRows.map((row) => {
    const order = ["Core", "Recognition", "Brute force", "State", "Invariant", "Transition", "Template", "Variants", "Dry run", "Complexity", "Transfer", "Practice", "Solution", "QA"];
    return `| ${row.id} | ${order.map((name) => cell(row.fields[name])).join(" | ")} | ${row.status} |`;
  }),
  "",
  "## Integrity findings",
  "",
  ...(hardErrors.length ? hardErrors.map((error) => `- ❌ ${error}`) : ["- ✅ Không có lỗi integrity."]),
  "",
  "## Cách đọc status",
  "",
  "- `FRAMEWORK-FULL`: đủ 11 thành phần canonical và practice/solution/QA theo detector.",
  "- `NEEDS-FRAMEWORK`: giữ lại nội dung hiện có, bổ sung đúng các ô thiếu trong batch sau.",
  "- `FULL` trong Coverage Matrix là trạng thái lịch sử; script chỉ báo mâu thuẫn tối thiểu lesson/practice/solution/recall/QA và không tự sửa matrix.",
  "",
].join("\n");
fs.writeFileSync(reportPath, report);

console.log(`Notebook framework audit: ${frameworkFull}/${auditRows.length} FRAMEWORK-FULL; ${needsFramework} thiếu.`);
console.log(`Đã ghi ${relative(reportPath)}.`);
if (hardErrors.length > 0) {
  console.error(hardErrors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
}
