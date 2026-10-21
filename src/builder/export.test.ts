import { describe, expect, it } from "vitest";
import { emptyDraft, normalizeDraft } from "./draft";
import { fileName, toJson, toMarkdown } from "./export";
import type { Draft } from "./types";

const draft: Draft = {
  ...emptyDraft(),
  typeId: "pitch",
  topic: "FreeRoom: find a free classroom",
  audience: "Students",
  sections: { hook: "How long did you search for a room today?" },
  slides: [{ id: "a", sectionId: "hook", title: "Lost time", bullets: ["30 minutes", " "], notes: "Ask the room." }],
};

describe("toMarkdown", () => {
  it("lists structure, slides and notes", () => {
    const md = toMarkdown(draft);
    expect(md).toContain("# FreeRoom: find a free classroom");
    expect(md).toContain("**Type:** Pitch");
    expect(md).toContain("### Hook (about 4s)");
    expect(md).toContain("### Problem (about 0s)\n\n_Not written yet._");
    expect(md).toContain("### Slide 1: Lost time\n\n- 30 minutes\n\n> **Notes:** Ask the room.");
  });
});

describe("backup file", () => {
  it("round-trips through JSON", () => {
    expect(normalizeDraft(JSON.parse(toJson(draft)))).toEqual(draft);
  });

  it("ignores files that are not a draft", () => {
    expect(normalizeDraft({ typeId: "nope", sections: "x", slides: [1] })).toEqual(emptyDraft());
  });
});

describe("fileName", () => {
  it("makes a slug from the topic", () => {
    expect(fileName(draft, "md")).toBe("freeroom-find-a-free-classroom.md");
    expect(fileName(emptyDraft(), "json")).toBe("presentation.json");
  });
});
