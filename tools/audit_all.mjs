import fs from "node:fs";
import { spawnSync } from "node:child_process";

const commands = [
  ["node", ["tools/audit_notebook_framework.mjs"]],
  ["node", ["tools/audit_notebook_integration.mjs"]],
  ["node", ["tools/audit_pattern_families.mjs"]],
  ["node", ["tools/audit_official_lessons.mjs"]],
  ["node", ["tools/audit_canonical.mjs"]],
  ["node", ["tools/audit_pccp_700_release.mjs"]],
  ["node", ["--check", "docs/JS_TEMPLATES_PCCP.js"]],
  ["node", ["--test", ...fs.readdirSync("tests").filter((name) => name.endsWith(".test.js")).sort().map((name) => `tests/${name}`)]],
  ["git", ["diff", "--check"]],
];

for (const [command, args] of commands) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { cwd: process.cwd(), encoding: "utf8", stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log("\nPCCP 700 all checks passed.");
