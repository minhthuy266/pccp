const LABELS = [
  "OUTPUT", "PREPARE", "GLOBAL STATE", "STATE", "INIT", "MAIN LOOP", "CURRENT ITEM",
  "PER-ITERATION STATE", "CHECK", "BRANCH", "UPDATE", "POINTER MOVEMENT",
  "STOP / RETURN", "CLEANUP",
] as const;

export type BlueprintEntry = { label: string; value: string };

export function parseBlueprint(text: string): BlueprintEntry[] {
  const labelPattern = LABELS.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(?:^|\\n|;\\s*)(${labelPattern}):\\s*`, "g");
  const matches = [...text.matchAll(regex)];
  if (!matches.length) return text.trim() ? [{ label: "BLUEPRINT", value: text.trim() }] : [];
  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? text.length;
    return { label: match[1], value: text.slice(start, end).trim().replace(/;$/, "") };
  });
}
