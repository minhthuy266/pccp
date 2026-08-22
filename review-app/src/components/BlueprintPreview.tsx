import { parseBlueprint } from "../domain/blueprint";
import { MarkdownPreview } from "./MarkdownPreview";

export function BlueprintPreview({ blueprint }: { blueprint: string }) {
  const entries = parseBlueprint(blueprint);
  if (!entries.length) return <p className="no-reference">No reference available</p>;
  return <dl className="blueprint-preview">{entries.map((entry, index) => <div key={`${entry.label}-${index}`}><dt>{entry.label}</dt><dd><MarkdownPreview markdown={entry.value} /></dd></div>)}</dl>;
}
