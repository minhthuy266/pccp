import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputName = "REPO_FILE_INVENTORY.csv";

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else files.push(path.relative(root, absolute).split(path.sep).join("/"));
  }
  return files;
}

const entrypoints = new Map([
  ["PCCP_700_MASTER_NAVIGATOR.md", "Entrypoint duy nhất; quyết định thứ tự và thời điểm mở mọi layer"],
]);

const redirects = new Map([
  ["README.md", "Trang chào chỉ chuyển người học tới Master Navigator"],
  ["CHATGPT_WORK_HANDOFF.md", "Context dạy học cho AI; mọi quyết định lịch đều chuyển về Master Navigator"],
]);

const governance = new Map([
  "REPO_CONTENT_AUDIT_2026-08-12.md",
  "PCCP_OFFICIAL_PRACTICE_BANK.csv",
  "PCCP_OFFICIAL_SYLLABUS_RESERVE.csv",
  "PCCP_Algorithm_Code_Notebook/FRAMEWORK_COVERAGE_AUDIT.md",
  "PCCP_Algorithm_Code_Notebook/MANIFEST.md",
  "PCCP_Algorithm_Code_Notebook/NOTEBOOK_PATTERN_OFFICIAL_CROSSWALK.csv",
  "PCCP_Algorithm_Code_Notebook/PATTERN_COVERAGE_MATRIX.md",
  "PCCP_Algorithm_Code_Notebook/PCCP_PUBLIC_PROBLEM_CATALOG.md",
  "docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md",
].map((file) => [file, "Nguồn audit/ID được máy kiểm tra; không phải entrypoint học"]));

const linkedLayers = new Map([
  "PCCP_OFFICIAL_ONLY_CURRICULUM.md",
  "PLAN_PCCP_700_REBUILD_2026-09-12.md",
  "TRACKER_PCCP_REBUILD_2026.csv",
  "TRACKER_PCCP_MOCK_ATTEMPTS.csv",
  "docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md",
  "docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md",
  "docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md",
  "docs/pccp-700-roadmap/PCCP_Error_Log.csv",
  "docs/JS_TEMPLATES_PCCP.js",
].map((file) => [file, "Lớp học được kiểm chứng; chỉ mở từ link đúng chỗ trong Navigator"]));

const historicalBaselines = new Map([
  ["PLAN_NOTEBOOK_PATTERN_INTEGRATION.md", "Plan tích hợp ngày 12/08 đã hoàn thành; số 1/83 chỉ là baseline lịch sử"],
  ["PCCP_Algorithm_Code_Notebook/CONTINUATION_CONTEXT.md", "Handoff triển khai cũ; không dùng để điều hướng học"],
  ["PCCP_Algorithm_Code_Notebook/HANDOFF.md", "Handoff triển khai cũ; không dùng để điều hướng học"],
]);

const removeCandidates = new Set([
  ".DS_Store",
  "docs/.DS_Store",
  "pccp-700-curriculum.patch",
  "locked/MIXED_MOCK_D29.csv",
]);

function classify(file) {
  if (file === outputName) return ["SUPPORT", "Inventory sinh tự động; không phải bài học"];
  if (entrypoints.has(file)) return ["ENTRYPOINT", entrypoints.get(file)];
  if (redirects.has(file)) return ["REDIRECT", redirects.get(file)];
  if (governance.has(file)) return ["GOVERNANCE", governance.get(file)];
  if (linkedLayers.has(file)) return ["LINKED_LAYER", linkedLayers.get(file)];
  if (historicalBaselines.has(file)) return ["HISTORICAL_BASELINE", historicalBaselines.get(file)];
  if (removeCandidates.has(file)) return ["REMOVE_CANDIDATE", "Stale, trùng hoặc metadata; không dùng để học"];
  if (file.startsWith("archive/")) return ["ARCHIVE", "Lịch sử; không mở trong lộ trình hiện tại"];
  if (file.startsWith("locked/")) return ["LOCKED", "Có spoiler/mock; chỉ mở theo unlock rule"];
  if (file.startsWith("PCCP_Algorithm_Code_Notebook/")) {
    return ["LINKED_LAYER", "Notebook 89/89 Coverage ID; lớp luyện sâu chỉ mở qua Navigator"];
  }
  if (file.startsWith("docs/pccp-700-roadmap/official-lessons/")) {
    return ["LINKED_LAYER", "Lớp 67/67 official lesson đã kiểm chứng; không phải entrypoint độc lập"];
  }
  if (file.startsWith("docs/pccp-700-roadmap/pattern-families/")) {
    return ["LINKED_LAYER", "Lớp 24/24 pattern family; không phải entrypoint độc lập"];
  }
  if (file.startsWith("solutions/official/")) {
    return ["LINKED_LAYER", "Implementation executable của official lesson; mở qua lesson/Navigator"];
  }
  if (file.startsWith("solutions/notebook/")) {
    return ["LINKED_LAYER", "Implementation executable của notebook; mở qua notebook/Navigator"];
  }
  if (file.startsWith("basic-drafts/") || file.startsWith("playground/") || /^(?:BASIC|BASIC copy)\.js$/.test(file)) {
    return ["PERSONAL", "Bài làm/sandbox người học; không dùng làm lời giải chuẩn"];
  }
  if (file.startsWith("tests/") || file.startsWith("tools/") || file === "package.json" || file === "package-lock.json") {
    return ["SUPPORT", "Hạ tầng build/test/audit"];
  }
  if (file.startsWith("assets/")) return ["SUPPORT", "Asset/license cho tài liệu xuất bản"];
  if (/\.(?:docx|pdf)$/.test(file)) return ["REFERENCE_ONLY", "Snapshot/generated document; Markdown canonical mới hơn"];
  if (file === "PROBLEM_BANK.csv") return ["REFERENCE_ONLY", "Bank Pxx legacy; chỉ dùng mapping"];
  if (file === "docs/CHEATSHEET_THUAT_TOAN_JS_PCCP.md") {
    return ["REFERENCE_ONLY", "Tra cứu rộng nhưng trùng handbook/templates"];
  }
  if (file === "docs/pccp-700-roadmap/sources.md") {
    return ["REFERENCE_ONLY", "Ledger cũ trộn nguồn official/community; audit official mới thay thế"];
  }
  if (file === ".gitignore") return ["SUPPORT", "Cấu hình repository"];
  return ["REVIEW", "Chưa map vào luồng canonical; không tự mở khi học"];
}

function quote(value) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const files = walk(root).sort();
const rows = [["path", "disposition", "reason"]];
for (const file of files) {
  const [disposition, reason] = classify(file);
  rows.push([file, disposition, reason]);
}

const actualEntrypoints = rows
  .slice(1)
  .filter((row) => row[1] === "ENTRYPOINT")
  .map((row) => row[0]);
if (actualEntrypoints.length !== 1 || actualEntrypoints[0] !== "PCCP_700_MASTER_NAVIGATOR.md") {
  throw new Error(`Inventory phải có đúng một entrypoint: PCCP_700_MASTER_NAVIGATOR.md; nhận ${actualEntrypoints.join(", ")}`);
}

fs.writeFileSync(
  path.join(root, outputName),
  `${rows.map((row) => row.map(quote).join(",")).join("\n")}\n`,
);

const counts = new Map();
for (const row of rows.slice(1)) counts.set(row[1], (counts.get(row[1]) ?? 0) + 1);
console.log(
  `Inventory ${files.length} files: ` +
    [...counts.entries()].map(([key, value]) => `${key}=${value}`).join(", "),
);
