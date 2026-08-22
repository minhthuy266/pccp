import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarkdownPreview } from "./MarkdownPreview";

describe("MarkdownPreview", () => {
  it("renders lesson markdown as semantic preview", () => {
    const html = renderToStaticMarkup(<MarkdownPreview markdown={'## State\n\n- `queue`\n\n```js\nconst x = 1;\n```\n\n| A | B |\n|---|---|\n| 1 | 2 |'} />);
    expect(html).toContain("<h2>State</h2>");
    expect(html).toContain("<ul>");
    expect(html).toContain('class="language-js"');
    expect(html).toContain("<table>");
    expect(html).not.toContain("## State");
  });
});
