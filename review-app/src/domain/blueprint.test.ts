import { describe, expect, it } from "vitest";
import { parseBlueprint } from "./blueprint";

describe("Blueprint parser", () => {
  it("splits newline-delimited blueprint fields", () => {
    expect(parseBlueprint("OUTPUT: answer.\nSTATE: ignored\nGLOBAL STATE: queue.\nINIT: empty.")).toEqual([
      { label: "OUTPUT", value: "answer." },
      { label: "STATE", value: "ignored" },
      { label: "GLOBAL STATE", value: "queue." },
      { label: "INIT", value: "empty." },
    ]);
  });
  it("splits compact semicolon-delimited blueprint fields", () => {
    expect(parseBlueprint("OUTPUT: answer; PREPARE: copy; GLOBAL STATE: map; INIT: empty")).toEqual([
      { label: "OUTPUT", value: "answer" }, { label: "PREPARE", value: "copy" },
      { label: "GLOBAL STATE", value: "map" }, { label: "INIT", value: "empty" },
    ]);
  });
});
