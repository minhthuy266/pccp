import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const hostRequire = createRequire(import.meta.url);
const lessonDirectory = path.join(root, "docs/pccp-700-roadmap/official-lessons");
const solutionDirectory = path.join(root, "solutions/official");
const explanationTracker = fs.readFileSync(
  path.join(root, "PCCP_Algorithm_Code_Notebook/PROBLEM_EXPLANATION_TRACKER.md"),
  "utf8",
);
const officialTestFiles = fs
  .readdirSync(path.join(root, "tests"))
  .filter((name) => /^official_batch\d+\.test\.js$/.test(name))
  .map((name) => {
    const absolutePath = path.join(root, "tests", name);
    return { name, absolutePath, text: fs.readFileSync(absolutePath, "utf8") };
  });
const testText = officialTestFiles
  .map((file) => file.text)
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
let completeCodeBehaviorChecked = 0;
let completeCodeBehaviorPassed = 0;

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

const requiredBlueprintFields = [
  "OUTPUT",
  "PREPARE",
  "GLOBAL STATE",
  "INIT",
  "MAIN LOOP",
  "CURRENT ITEM",
  "PER-ITERATION STATE",
  "CHECK",
  "BRANCH",
  "UPDATE",
  "POINTER MOVEMENT",
  "STOP / RETURN",
  "CLEANUP",
];

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasMeaningfulLabeledValue(markdown, label) {
  const escapedLabel = escapeRegularExpression(label);
  const match = markdown.match(new RegExp(`${escapedLabel}:\\s*([^\\n]+)`, "i"));
  if (!match) return false;
  const value = match[1]
    .replace(/[`*_#>-]/g, "")
    .trim();
  return value.length >= 3 && !/^(?:n\/?a|không rõ|todo|tbd|\.\.\.)$/i.test(value);
}

function hasMeaningfulRecall(markdown, tier) {
  const match = markdown.match(new RegExp(`Recall ${tier}(?:\\s*—[^:\\n]+)?:\\s*([^\\n]+)`, "i"));
  if (!match) return false;
  const value = match[1]
    .replace(/[`*_#>-]/g, "")
    .trim();
  return value.length >= 12;
}

function auditLearningScaffold(markdown, itemErrors) {
  const textBlocks = [...markdown.matchAll(/^```text\s*\n([\s\S]*?)^```\s*$/gm)]
    .map((match) => match[1]);
  const blueprintBlock = textBlocks
    .map((block) => ({
      block,
      fieldCount: requiredBlueprintFields.filter((field) => hasMeaningfulLabeledValue(block, field)).length,
    }))
    .sort((first, second) => second.fieldCount - first.fieldCount)[0]?.block ?? "";
  const missingBlueprintFields = requiredBlueprintFields.filter(
    (field) => !hasMeaningfulLabeledValue(blueprintBlock, field),
  );
  if (missingBlueprintFields.length > 0) {
    itemErrors.push(`Blueprint thiếu trường: ${missingBlueprintFields.join(", ")}`);
  }

  for (const tier of [1, 2, 3]) {
    if (!hasMeaningfulRecall(markdown, tier)) {
      itemErrors.push(`thiếu Recall ${tier} có nội dung riêng`);
    }
  }
}

function auditTeachingTransitions(code, itemErrors, location) {
  if (code === null) return;
  const hiddenTransitions = [
    /\[[^\]\n]*(?:\+\+|--)\s*\]/,
    /(?:\+\+|--)[A-Za-z_$][\w$]*/,
    /\b[A-Za-z_$][\w$]*\s*\+=\s*[^;\n]*\?[^:\n]+:/,
  ];
  if (hiddenTransitions.some((pattern) => pattern.test(code))) {
    itemErrors.push(`${location} còn transition viết tắt che thứ tự đọc/cập nhật state`);
  }
}

function trackerStatusFor(id) {
  const row = explanationTracker.match(new RegExp(`^\\| ${id} \\|[^\\n]+$`, "m"))?.[0];
  if (!row) return null;
  if (/\*\*COMPLETE\b/.test(row)) return "COMPLETE";
  if (/\*\*PARTIAL\b/.test(row)) return "PARTIAL";
  return null;
}

const completeCodeSmokeCases = new Map([
  ["OF012", { expression: "minimumScovilleMixes([1, 2, 3, 9, 10, 12], 7)", expected: 2 }],
  ["OF013", { expression: "averageDiskTurnaround([[0, 3], [1, 9], [2, 6]])", expected: 9 }],
  [
    "OF014",
    {
      expression:
        'doublePriorityQueue(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"])',
      expected: [0, 0],
    },
  ],
  ["OF020", { expression: 'primePermutationCount("17")', expected: 3 }],
  [
    "OF029",
    {
      expression:
        "minimumIslandConnectionCost(4, [[0, 1, 1], [0, 2, 2], [1, 2, 5], [1, 3, 1], [2, 3, 8]])",
      expected: 4,
    },
  ],
  ["OF035", { expression: "maximumCircularRobbery([1, 2, 3, 1])", expected: 4 }],
  [
    "OF039",
    {
      expression:
        'minimumWordTransformations("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])',
      expected: 4,
    },
  ],
  [
    "OF042",
    {
      expression: "filledPuzzleCells([[0, 0], [1, 0]], [[1, 0], [1, 1]])",
      expected: 3,
    },
  ],
  [
    "OF048",
    {
      expression:
        'expiredPrivacyIndices("2022.05.19", ["A 6", "B 12", "C 3"], ' +
        '["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"])',
      expected: [1, 3],
    },
  ],
  ["OF055", { expression: 'mazeEscapeTime(["SLE"])', expected: 2 }],
  ["SR002", { expression: 'shortestCompressedLength("aabbaccc")', expected: 7 }],
  ["SR003", { expression: 'countValidBracketRotations("[](){}")', expected: 3 }],
  [
    "SR005",
    {
      expression:
        'homeworkCompletionOrder([["A", "12:00", "30"], ["B", "12:10", "10"], ' +
        '["C", "12:20", "10"]])',
      expected: ["B", "C", "A"],
    },
  ],
]);

function extractCompleteCode(markdown) {
  const heading = "## 14. Code hoàn chỉnh";
  const sectionStart = markdown.indexOf(heading);
  if (sectionStart === -1) return null;
  const nextHeading = markdown.indexOf("\n## 15.", sectionStart + heading.length);
  const section = markdown.slice(
    sectionStart + heading.length,
    nextHeading === -1 ? markdown.length : nextHeading,
  );
  const matches = [...section.matchAll(/^```(?:js|javascript)[ \t]*\r?\n([\s\S]*?)^```[ \t]*$/gm)];
  return { code: matches[0]?.[1] ?? null, fenceCount: matches.length };
}

function auditCompleteCodeBehavior(item, completeCode, solutionPath, itemErrors) {
  if (!fs.existsSync(solutionPath) || completeCode === null) return;

  const requiredSpecifier = `../solutions/official/${item.id}.js`;
  const matchingTests = officialTestFiles.filter((file) => file.text.includes(requiredSpecifier));
  if (matchingTests.length !== 1) {
    itemErrors.push(`section 14 cần đúng một official batch test; nhận ${matchingTests.length}`);
    return;
  }

  let exportNames;
  try {
    exportNames = Object.keys(hostRequire(solutionPath));
  } catch (error) {
    itemErrors.push(`không đọc được exports của solution: ${error.message}`);
    return;
  }
  if (exportNames.length === 0 || exportNames.some((name) => !/^[A-Za-z_$][\w$]*$/.test(name))) {
    itemErrors.push("solution phải export ít nhất một tên JavaScript hợp lệ");
    return;
  }

  const context = vm.createContext(Object.create(null));
  const exportEntries = exportNames.map(
    (name) => `${JSON.stringify(name)}: typeof ${name} === "undefined" ? undefined : ${name}`,
  );
  try {
    const lessonScript = new vm.Script(
      `"use strict";\n((require, module, exports, process) => {\n${completeCode}\n` +
        `globalThis.__lessonExports = {${exportEntries.join(",")}};\n` +
        `})(undefined, undefined, undefined, undefined);`,
      { filename: `${item.id}#section-14` },
    );
    lessonScript.runInContext(context, { timeout: 2_000 });
  } catch (error) {
    itemErrors.push(`section 14 không self-contained: ${error.message}`);
    return;
  }

  for (const name of exportNames) {
    if (context.__lessonExports?.[name] === undefined) {
      itemErrors.push(`section 14 thiếu export callable ${name}`);
    }
  }
  if (itemErrors.some((error) => error.startsWith("section 14 thiếu export"))) return;

  const testFile = matchingTests[0];
  const testRequire = createRequire(testFile.absolutePath);
  const callbacks = [];
  const registerTest = (name, callback) => {
    if (new RegExp(`^${item.id}\\s*[—-]`).test(name)) callbacks.push({ name, callback });
  };
  context.require = (specifier) => {
    if (specifier === "node:test") return registerTest;
    const resolved = testRequire.resolve(specifier);
    if (path.resolve(resolved) === path.resolve(solutionPath)) return context.__lessonExports;
    return testRequire(specifier);
  };

  try {
    new vm.Script(testFile.text, { filename: testFile.name })
      .runInContext(context, { timeout: 2_000 });
  } catch (error) {
    itemErrors.push(`không nạp được official test cho section 14: ${error.message}`);
    return;
  }
  if (callbacks.length === 0) {
    itemErrors.push("section 14 chưa có test callback mang đúng ID");
    return;
  }

  context.__lessonTestCallbacks = callbacks.map((entry) => entry.callback);
  callbacks.forEach((entry, index) => {
    try {
      const result = new vm.Script(`__lessonTestCallbacks[${index}]()`, {
        filename: `${item.id}#${entry.name}`,
      }).runInContext(context, { timeout: 2_000 });
      if (result && typeof result.then === "function") {
        itemErrors.push(`section 14 test async chưa được audit hỗ trợ: ${entry.name}`);
      }
    } catch (error) {
      itemErrors.push(`section 14 sai hành vi — ${entry.name}: ${error.message}`);
    }
  });
}

for (const item of catalog.filter((entry) => !entry.locked)) {
  const markdownPath = path.join(lessonDirectory, `${item.id}.md`);
  const solutionPath = path.join(solutionDirectory, `${item.id}.js`);
  if (!fs.existsSync(markdownPath)) {
    partial.push(item.id);
    errors.push(`${item.id}: thiếu lesson Markdown`);
    continue;
  }

  const itemErrors = [];
  const markdown = fs.readFileSync(markdownPath, "utf8");
  for (const heading of requiredHeadings) {
    if (!markdown.includes(`## ${heading}`)) itemErrors.push(`thiếu heading ${heading}`);
  }
  if (!markdown.includes(item.link.split("?", 1)[0])) itemErrors.push("thiếu link official đúng lesson");
  auditLearningScaffold(markdown, itemErrors);
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
    auditTeachingTransitions(match[1], itemErrors, `code block ${codeBlockCount}`);
    try {
      new vm.Script(match[1], { filename: `${item.id}#block-${codeBlockCount}` });
    } catch (error) {
      itemErrors.push(`code block ${codeBlockCount} không parse: ${error.message}`);
    }
  }
  if (codeBlockCount < 4) itemErrors.push(`chỉ có ${codeBlockCount}/4 JavaScript blocks`);

  const completeSection = extractCompleteCode(markdown);
  const completeCode = completeSection.code;
  if (completeSection.fenceCount !== 1) {
    itemErrors.push(`section 14 phải có đúng một JavaScript fence; nhận ${completeSection.fenceCount}`);
  }
  const behaviorErrorStart = itemErrors.length;
  completeCodeBehaviorChecked++;
  auditCompleteCodeBehavior(item, completeCode, solutionPath, itemErrors);
  if (
    completeSection.fenceCount === 1 &&
    completeCode !== null &&
    fs.existsSync(solutionPath) &&
    itemErrors.length === behaviorErrorStart
  ) {
    completeCodeBehaviorPassed++;
  }

  const smokeCase = completeCodeSmokeCases.get(item.id);
  if (smokeCase) {
    if (completeCode === null) {
      itemErrors.push("section 14 thiếu JavaScript fence để smoke test");
    } else {
      if (fs.existsSync(solutionPath)) {
        const solutionSource = fs.readFileSync(solutionPath, "utf8");
        const exportMarker = solutionSource.lastIndexOf("\nmodule.exports");
        const executableSource = (
          exportMarker === -1 ? solutionSource : solutionSource.slice(0, exportMarker)
        ).trim();
        if (completeCode.trim() !== executableSource) {
          itemErrors.push("section 14 lệch executable source trước module.exports");
        }
      }

      try {
        const script = new vm.Script(
          `"use strict";\n${completeCode}\nJSON.stringify(${smokeCase.expression});`,
          { filename: `${item.id}#complete-code-smoke` },
        );
        const actual = script.runInNewContext(Object.create(null), { timeout: 1_000 });
        const expected = JSON.stringify(smokeCase.expected);
        if (actual !== expected) {
          itemErrors.push(`section 14 smoke sai: nhận ${actual}, cần ${expected}`);
        }
      } catch (error) {
        itemErrors.push(`section 14 không self-contained: ${error.message}`);
      }
    }
  }

  if (fs.existsSync(solutionPath)) {
    try {
      new vm.Script(fs.readFileSync(solutionPath, "utf8"), { filename: solutionPath });
    } catch (error) {
      itemErrors.push(`solution không parse: ${error.message}`);
    }
  }

  const contentStatus = itemErrors.length === 0 ? "COMPLETE" : "PARTIAL";
  const trackerStatus = trackerStatusFor(item.id);
  if (trackerStatus !== contentStatus) {
    itemErrors.push(`tracker ghi ${trackerStatus ?? "không có status"}, nội dung phải là ${contentStatus}`);
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
console.log(
  `Section 14 behavior: ${completeCodeBehaviorPassed}/${completeCodeBehaviorChecked} ` +
    `complete-code blocks executed against their official batch tests.`,
);
if (completed.length > 0) console.log(`Certified: ${completed.join(", ")}`);
if (partial.length > 0) console.log(`Partial: ${partial.join(", ")}`);

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
