import { describe, expect, it } from "vitest";
import {
  countWords,
  estimateSeconds,
  hasFiller,
  isShouting,
  sentenceCount,
  sharedPhraseRatio,
} from "./text";

describe("countWords", () => {
  it("counts words and ignores extra whitespace", () => {
    expect(countWords("  one two\n three  ")).toBe(3);
    expect(countWords("")).toBe(0);
  });

  it("does not count lone punctuation", () => {
    expect(countWords("Hello — world !")).toBe(2);
  });
});

describe("estimateSeconds", () => {
  it("assumes about 130 words per minute", () => {
    expect(estimateSeconds("word ".repeat(130))).toBe(60);
    expect(estimateSeconds("")).toBe(0);
  });
});

describe("sentenceCount", () => {
  it("splits on sentence punctuation", () => {
    expect(sentenceCount("One. Two! Three?")).toBe(3);
    expect(sentenceCount("No full stop at the end")).toBe(1);
    expect(sentenceCount("")).toBe(0);
  });
});

describe("hasFiller", () => {
  it("finds filler words", () => {
    expect(hasFiller("Umm, basically it is an app")).toEqual(["umm", "basically"]);
    expect(hasFiller("A clear sentence")).toEqual([]);
  });
});

describe("isShouting", () => {
  it("flags long all-caps text only", () => {
    expect(isShouting("BUY THIS NOW")).toBe(true);
    expect(isShouting("Use AI")).toBe(false);
  });
});

describe("sharedPhraseRatio", () => {
  it("is high when slide text is copied from notes", () => {
    const notes = "Keys are small and we often leave them in our bags or pockets";
    expect(sharedPhraseRatio("we often leave them in our bags", notes)).toBe(1);
  });

  it("is low when slide text only shares keywords", () => {
    const notes = "Keys are small and we often leave them in our bags or pockets";
    expect(sharedPhraseRatio("Small keys get lost", notes)).toBe(0);
  });
});
