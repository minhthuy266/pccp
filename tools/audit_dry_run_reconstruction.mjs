import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const lessonDirectory = path.join(root, "docs/pccp-700-roadmap/official-lessons");
const bankPath = path.join(root, "PCCP_OFFICIAL_PRACTICE_BANK.csv");

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (character === "," && !quoted) {
      fields.push(current);
      current = "";
    } else current += character;
  }
  fields.push(current);
  return fields;
}

function readBank() {
  const lines = fs.readFileSync(bankPath, "utf8").trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
  });
}

function section(markdown, headingPattern) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => headingPattern.test(line));
  if (start === -1) return "";
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

function tableDataRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^\|/.test(line) && !/^\|\s*:?-+/.test(line));
}

function javascriptFences(markdown) {
  return [...markdown.matchAll(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/gm)].map(
    (match) => match[1],
  );
}

function functionNames(code) {
  return [...code.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g)].map((match) => match[1]);
}

function auditLesson(row) {
  const errors = [];
  const lessonPath = path.join(lessonDirectory, `${row.bank_id}.md`);
  if (!fs.existsSync(lessonPath)) return [`thiếu file ${path.relative(root, lessonPath)}`];
  const markdown = fs.readFileSync(lessonPath, "utf8");

  if (/^\\#{1,6}\s/m.test(markdown)) errors.push("có heading marker bị escape");
  if (/^\\`\\`\\`|^```\*[^\n]+\*/m.test(markdown)) errors.push("có code fence malformed/escape");

  const reconstruction = section(markdown, /^##\s+Dry run → Code reconstruction\b/i);
  if (!reconstruction) {
    errors.push("thiếu section `## Dry run → Code reconstruction`");
    return errors;
  }

  const requiredEvidence = [
    ["contract", /###\s+Problem contract\b/i],
    ["dry run", /###\s+Concrete dry run\b/i],
    ["Vietnamese actions", /###\s+Vietnamese action narrative\b/i],
    ["state derivation", /###\s+State derivation\b/i],
    ["loop derivation", /###\s+Loop and condition derivation\b/i],
    ["mapping", /###\s+Vietnamese logic → code\b/i],
    ["cumulative code", /###\s+Cumulative code construction\b/i],
    ["scope", /###\s+Block scope and placement\b/i],
    ["full-code dry run", /###\s+Full-code dry run\b/i],
    ["wrong implementations", /###\s+Realistic wrong implementations\b/i],
    ["complexity proof", /###\s+Complexity proof from movements\b/i],
    ["exercises", /###\s+Reconstruction exercises\b/i],
  ];
  for (const [label, pattern] of requiredEvidence) {
    if (!pattern.test(reconstruction)) errors.push(`thiếu evidence: ${label}`);
  }

  const dryRun = reconstruction.match(
    /###\s+Concrete dry run\b[\s\S]*?(?=\n###\s+|$)/i,
  )?.[0] ?? "";
  const dryRows = tableDataRows(dryRun);
  if (dryRows.length < 5) errors.push("dry-run table cần header + ít nhất 4 state rows");
  for (const term of ["State before", "Exact condition", "Action", "State after", "Answer"]) {
    if (!dryRun.includes(term)) errors.push(`dry-run table thiếu cột ${term}`);
  }

  const stateDerivation = reconstruction.match(
    /###\s+State derivation\b[\s\S]*?(?=\n###\s+|$)/i,
  )?.[0] ?? "";
  for (const term of ["Information that must survive", "Variable/state", "Exact meaning", "Initial value", "Why"]) {
    if (!stateDerivation.includes(term)) errors.push(`state table thiếu cột ${term}`);
  }

  const mapping = reconstruction.match(
    /###\s+Vietnamese logic → code\b[\s\S]*?(?=\n###\s+|$)/i,
  )?.[0] ?? "";
  for (const term of ["Vietnamese action", "Information required", "Exact code", "Why here"]) {
    if (!mapping.includes(term)) errors.push(`mapping table thiếu cột ${term}`);
  }

  const construction = reconstruction.match(
    /###\s+Cumulative code construction\b[\s\S]*?(?=\n###\s+|$)/i,
  )?.[0] ?? "";
  const checkpoints = construction.match(/Prediction checkpoint/g)?.length ?? 0;
  if (checkpoints < 3) errors.push(`chỉ có ${checkpoints}/3 prediction checkpoints`);
  const cumulativeFences = javascriptFences(construction);
  if (cumulativeFences.length < 3) errors.push(`chỉ có ${cumulativeFences.length}/3 cumulative JS fences`);
  const finalFunction = javascriptFences(section(markdown, /^##\s+14\.\s+Code hoàn chỉnh/))[0] ?? "";
  const expectedFunctionNames = new Set(functionNames(finalFunction));
  let priorLength = 0;
  cumulativeFences.forEach((code, index) => {
    try {
      new vm.Script(code, { filename: `${row.bank_id}#cumulative-${index + 1}` });
    } catch (error) {
      errors.push(`cumulative fence ${index + 1} không parse: ${error.message}`);
    }
    if (code.length < priorLength) errors.push(`cumulative fence ${index + 1} ngắn hơn bước trước`);
    priorLength = code.length;
    const names = functionNames(code);
    if (
      expectedFunctionNames.size > 0 &&
      !names.some((name) => expectedFunctionNames.has(name))
    ) {
      errors.push(`cumulative fence ${index + 1} không chứa function chính của section 14`);
    }
  });

  const scope = reconstruction.match(
    /###\s+Block scope and placement\b[\s\S]*?(?=\n###\s+|$)/i,
  )?.[0] ?? "";
  for (const term of ["Block", "Correct scope/location", "Why", "What breaks if moved"]) {
    if (!scope.includes(term)) errors.push(`scope table thiếu cột ${term}`);
  }

  const wrong = reconstruction.match(
    /###\s+Realistic wrong implementations\b[\s\S]*?(?=\n###\s+|$)/i,
  )?.[0] ?? "";
  if (tableDataRows(wrong).length < 4) errors.push("wrong-implementation table cần ít nhất 3 lỗi");
  for (const term of ["Small failing input", "First wrong iteration", "Root cause", "Correct block"]) {
    if (!wrong.includes(term)) errors.push(`wrong table thiếu cột ${term}`);
  }

  const exercises = reconstruction.match(
    /###\s+Reconstruction exercises\b[\s\S]*?(?=\n###\s+|$)/i,
  )?.[0] ?? "";
  for (const level of ["Level 1", "Level 2", "Level 3"]) {
    if (!exercises.includes(level)) errors.push(`thiếu exercise ${level}`);
  }

  const problemTokens = row.problem_name
    .toLocaleLowerCase("vi")
    .split(/\s+/)
    .filter((token) => token.length >= 3);
  if (
    problemTokens.length > 0 &&
    !problemTokens.some((token) => reconstruction.toLocaleLowerCase("vi").includes(token))
  ) {
    errors.push("reconstruction thiếu noun cụ thể từ tên bài");
  }
  if (!reconstruction.includes(row.pattern)) errors.push(`thiếu pattern cụ thể ${row.pattern}`);

  return errors;
}

const bank = readBank();
const requestedIds = new Set(
  (process.argv.find((argument) => argument.startsWith("--ids="))?.slice("--ids=".length) ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean),
);
const allExposed = bank.filter((row) => row.priority !== "RESERVED_MOCK");
const exposed = requestedIds.size === 0
  ? allExposed
  : allExposed.filter((row) => requestedIds.has(row.bank_id));
const locked = bank.filter((row) => row.priority === "RESERVED_MOCK");
if (requestedIds.size > 0 && exposed.length !== requestedIds.size) {
  const known = new Set(exposed.map((row) => row.bank_id));
  const unknown = [...requestedIds].filter((id) => !known.has(id));
  throw new Error(`Batch chứa ID không exposed: ${unknown.join(", ")}`);
}
const failures = new Map();
for (const row of exposed) {
  const errors = auditLesson(row);
  if (errors.length > 0) failures.set(row.bank_id, errors);
}

console.log(
  `Dry-run reconstruction: ${exposed.length - failures.size}/${exposed.length} exposed OF lessons pass; ` +
    `${locked.length} locked lessons excluded (${locked.map((row) => row.bank_id).join(", ")}).`,
);
if (failures.size > 0) {
  for (const [id, errors] of failures) console.error(`- ${id}: ${errors.join("; ")}`);
  process.exit(1);
}
