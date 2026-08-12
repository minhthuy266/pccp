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

const canonical = new Set([
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
  "docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md",
  "docs/pccp-700-roadmap/PCCP_Error_Log.csv",
  "docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md",
  "docs/JS_TEMPLATES_PCCP.js",
]);

const removeCandidates = new Set([
  ".DS_Store",
  "docs/.DS_Store",
  "CHATGPT_WORK_HANDOFF.md",
  "pccp-700-curriculum.patch",
  "locked/MIXED_MOCK_D29.csv",
]);

function classify(file) {
  if (file === outputName) return ["SUPPORT", "Inventory sinh tự động; không phải bài học"];
  if (canonical.has(file)) return ["CANONICAL", "Nằm trong luồng học/kiểm chứng chính"];
  if (removeCandidates.has(file)) return ["REMOVE_CANDIDATE", "Stale, trùng hoặc metadata; không dùng để học"];
  if (file.startsWith("archive/")) return ["ARCHIVE", "Lịch sử; không mở trong lộ trình hiện tại"];
  if (file.startsWith("locked/")) return ["LOCKED", "Có spoiler/mock; chỉ mở theo unlock rule"];
  if (file.startsWith("PCCP_Algorithm_Code_Notebook/")) {
    return ["REFERENCE_ONLY", "Notebook nhiều drill nhưng dang dở; không phải handbook canonical"];
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
