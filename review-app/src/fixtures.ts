const modules = import.meta.glob("../../tests/official_batch*.test.js", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

export interface SampleFixture { expression: string; expected: string }

function callArguments(source: string, open: number) {
  const args: string[] = [];
  let start = open + 1; let depth = 1; let quote = ""; let escaped = false;
  for (let index = open + 1; index < source.length; index++) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'" || char === "`") { quote = char; continue; }
    if ("([{ ".includes(char) && char !== " ") depth++;
    else if (")]}".includes(char)) {
      depth--;
      if (depth === 0) { args.push(source.slice(start, index).trim()); return args; }
    } else if (char === "," && depth === 1) { args.push(source.slice(start, index).trim()); start = index + 1; }
  }
  return [];
}

function fixturesIn(source: string, lessonId: string) {
  const starts = [...source.matchAll(new RegExp(`test\\(["']${lessonId}\\b`, "g"))].map((match) => match.index ?? 0);
  return starts.flatMap((start, index) => {
    const block = source.slice(start, starts[index + 1] ?? source.length);
    const assertion = block.match(/assert\.(?:deepEqual|equal)\s*\(/);
    if (!assertion?.index) return [];
    const open = assertion.index + assertion[0].lastIndexOf("(");
    const [expression, expected] = callArguments(block, open);
    return expression && expected ? [{ expression, expected }] : [];
  });
}

export function fixtureForLesson(lessonId: string): SampleFixture | undefined {
  const fixtures = Object.values(modules).flatMap((source) => fixturesIn(source, lessonId));
  return fixtures.find((fixture) => /^[A-Za-z_$][\w$]*\s*\(/.test(fixture.expression)) ?? fixtures[0];
}

export function adaptFixtureExpression(expression: string, functionName: string) {
  return expression.replace(/^[A-Za-z_$][\w$]*(?=\s*\()/, functionName);
}
