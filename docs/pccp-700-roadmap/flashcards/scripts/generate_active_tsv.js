const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const layerA = fs.readFileSync(path.join(root, "layers/LAYER_A_CORE_RECALL.md"), "utf8");
const layerB = fs.readFileSync(path.join(root, "layers/LAYER_B_VARIANT_ADAPTERS.md"), "utf8");

function clean(text) {
  return text.trim().replace(/`/g, "");
}

function html(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

const rows = [];
const quizlet = { A: [], P0: [], P1: [] };
const corePattern = /^## (C\d{2}) — ([^\n]+)\n\n\*\*TRIGGER:\*\* ([^\n]+)\n\n```js\n([\s\S]*?)```\n\n([^\n]+)/gm;
for (const match of layerA.matchAll(corePattern)) {
  const [, id, family, trigger, code, note] = match;
  const front = `[LAYER A][${id}] TRIGGER: ${trigger} — Viết FULL_CODE từ trắng.`;
  const back = `<b>${family}</b><br><pre><code>${html(code.trim())}</code></pre>${html(note)}`;
  const tags = `layer=A priority=P0 core=${id} card_type=FULL_CODE provenance=CORE ${id}::FULL_CODE`;
  rows.push([front, back, tags]);
  quizlet.A.push([front, `${family} ⏎ ${code.trim().replace(/\n/g, " ⏎ ")} ⏎ ${note}`]);
}

for (const line of layerB.split("\n")) {
  if (!/^\| B\d+ \| P[012] \|/.test(line)) continue;
  const cells = line.split("|").slice(1, -1).map(clean);
  if (cells.length !== 8) throw new Error(`Invalid adapter row: ${line}`);
  const [id, priority, variant, base, addState, transition, baseUpdate, delta] = cells;
  if (priority === "P2") continue;
  const front = `[LAYER B][${id}][${priority}] ${variant} — Điền 4 ô: BASE SKELETON / ADD STATE / CHANGE TRANSITION / CHANGE BASE-UPDATE.`;
  const back = `<b>1. BASE:</b> ${html(base)}<br><b>2. ADD STATE:</b> ${html(addState)}<br><b>3. CHANGE TRANSITION:</b> ${html(transition)}<br><b>4. CHANGE BASE/UPDATE:</b> ${html(baseUpdate)}<br><b>DELTA:</b> ${html(delta)}`;
  const core = base.match(/C\d{2}/)?.[0] ?? "CROSS_CORE";
  const tags = `layer=B priority=${priority} core=${core} card_type=VARIANT_ADAPTER provenance=TRANSFER ${id}::ADAPTER`;
  rows.push([front, back, tags]);
  quizlet[priority].push([front, `1. BASE: ${base} ⏎ 2. ADD STATE: ${addState} ⏎ 3. CHANGE TRANSITION: ${transition} ⏎ 4. CHANGE BASE/UPDATE: ${baseUpdate} ⏎ DELTA: ${delta}`]);
}

const seen = new Set();
for (const [front, back, tags] of rows) {
  if (seen.has(front)) throw new Error(`Duplicate front: ${front}`);
  seen.add(front);
  if ([front, back, tags].some(field => field.includes("\t") || field.includes("\n"))) {
    throw new Error(`Unescaped TSV field: ${front}`);
  }
}

const output = rows.map(row => row.join("\t")).join("\n") + "\n";
fs.writeFileSync(path.join(root, "PCCP_ALGORITHM_FLASHCARDS.tsv"), output);
const quizletDir = path.join(root, "quizlet");
fs.mkdirSync(quizletDir, { recursive: true });
for (const [name, cards] of Object.entries(quizlet)) {
  const file = name === "A" ? "LAYER_A_CORE_RECALL.txt" : `LAYER_B_${name}_ADAPTERS.txt`;
  fs.writeFileSync(path.join(quizletDir, file), cards.map(row => row.join("\t")).join("\n") + "\n");
}
console.log(JSON.stringify({ coreCards: quizlet.A.length, totalCards: rows.length, p0Adapters: quizlet.P0.length, p1Adapters: quizlet.P1.length }));
