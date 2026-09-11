import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Final36 } from "./Final36";
import { final36Algorithms } from "./algorithms";

describe("PCCP Final algorithm browser", () => {
  it("renders an algorithm button for every group and the default recall template", () => {
    const html = renderToStaticMarkup(<Final36 />);

    expect(html).toContain("Chọn thuật toán");
    expect(html).toContain("Template cần nhớ");
    expect(html).toContain("copyState(state)");
    expect(html.match(/<button/g)).toHaveLength(final36Algorithms.length + 1);
    expect(html.match(/href="#\/final36\/\d+"/g)).toHaveLength(
      final36Algorithms[0].lessonOrders.length,
    );
  });
});
