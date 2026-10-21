import { describe, expect, it } from "vitest";
import { emptyDraft, generateSlides } from "../draft";
import { getTemplate } from "../templates";
import type { Draft, Issue, Slide } from "../types";
import { checkOutline } from "./outline";
import { checkSetup } from "./setup";
import { checkSlides } from "./slides";
import { readiness, validate } from "./index";

const pitch = getTemplate("pitch")!;

const smartKey: Draft = {
  ...emptyDraft(),
  typeId: "pitch",
  topic: "SmartKey: find your keys in seconds",
  audience: "First-year students",
  sections: {
    hook: "Let me ask you a question: how many of you have ever lost your keys?",
    problem:
      "Keys are small, and we often leave them in our bags, pockets, or somewhere around the house. Students waste minutes every morning looking for them.",
    solution:
      "SmartKey is a small tracking device that attaches to your keychain. It connects to your phone and can play a sound so you find your keys in seconds.",
    example:
      "Imagine you're running late for university one morning. You open the app, tap Find My Key, and there they are, under the sofa.",
    "main-idea": "If losing something costs you time, technology should help you find it.",
    cta: "Try SmartKey this week and tell us how many minutes it saved you.",
  },
};

const ids = (issues: Issue[]) => issues.map((i) => i.ruleId);
const withSection = (id: string, text: string): Draft => ({
  ...smartKey,
  sections: { ...smartKey.sections, [id]: text },
});

describe("checkSetup", () => {
  it("asks for a type and a topic first", () => {
    expect(ids(checkSetup(emptyDraft()))).toEqual(
      expect.arrayContaining(["setup.type", "setup.topic"]),
    );
  });

  it("warns when the topic is more than one idea", () => {
    const d = { ...smartKey, topic: "A very long topic that tries to cover many different ideas at the same time" };
    expect(ids(checkSetup(d))).toContain("setup.topic-long");
  });

  it("passes a focused topic", () => {
    expect(checkSetup(smartKey)).toEqual([]);
  });
});

describe("checkOutline", () => {
  it("passes the SmartKey pitch", () => {
    expect(checkOutline(smartKey, pitch)).toEqual([]);
  });

  it("reports each missing section as an error on its field", () => {
    const issues = checkOutline(withSection("problem", "  "), pitch);
    const missing = issues.find((i) => i.ruleId === "outline.missing")!;
    expect(missing.level).toBe("error");
    expect(missing.where).toEqual({ stage: "outline", sectionId: "problem", field: "text" });
  });

  it("warns about sections that are too short or too long", () => {
    expect(ids(checkOutline(withSection("problem", "Keys get lost."), pitch))).toContain("outline.too-short");
    expect(ids(checkOutline(withSection("main-idea", "word ".repeat(25)), pitch))).toContain("outline.too-long");
  });

  it("wants a hook that grabs attention", () => {
    expect(ids(checkOutline(withSection("hook", "Today I will talk about my project idea."), pitch))).toContain("outline.hook");
    expect(ids(checkOutline(withSection("hook", "Did you know 3 in 4 students lose their keys"), pitch))).not.toContain("outline.hook");
  });

  it("wants the problem to say who has it", () => {
    expect(ids(checkOutline(withSection("problem", "Keys are small and they get lost all the time around the house."), pitch))).toContain("outline.who");
  });

  it("wants a concrete example", () => {
    expect(ids(checkOutline(withSection("example", "The device would be useful in a lot of different situations for many."), pitch))).toContain("outline.concrete");
  });

  it("wants the main idea in one sentence", () => {
    expect(ids(checkOutline(withSection("main-idea", "Time matters. Technology helps."), pitch))).toContain("outline.one-sentence");
  });

  it("wants a call to action with a clear action", () => {
    expect(ids(checkOutline(withSection("cta", "That was my presentation, thank you very much."), pitch))).toContain("outline.action");
  });

  it("errors when the whole talk is over the time limit", () => {
    const long = Object.fromEntries(pitch.sections.map((s) => [s.id, "word ".repeat(s.maxWords)]));
    const issues = checkOutline({ ...smartKey, sections: long }, pitch);
    expect(issues.find((i) => i.ruleId === "outline.over-time")?.level).toBe("error");
  });

  it("suggests dropping filler words", () => {
    const issue = checkOutline(withSection("solution", "Basically SmartKey is a small tracking device that attaches to your keychain and rings."), pitch)
      .find((i) => i.ruleId === "outline.filler");
    expect(issue?.level).toBe("tip");
  });
});

describe("generateSlides", () => {
  it("makes a title slide plus one slide per section with the outline as notes", () => {
    const slides = generateSlides(smartKey, pitch);
    expect(slides).toHaveLength(pitch.sections.length + 1);
    expect(slides[0]).toMatchObject({ sectionId: null, title: smartKey.topic });
    expect(slides[2]).toMatchObject({ sectionId: "problem", notes: smartKey.sections.problem });
  });
});

describe("checkSlides", () => {
  const slide = (over: Partial<Slide>): Draft => ({
    ...smartKey,
    slides: [
      { id: "s1", sectionId: "problem", title: "Keys hide", bullets: ["Small", "Easy to lose"], notes: smartKey.sections.problem, ...over },
    ],
  });

  it("passes a clean slide", () => {
    expect(checkSlides(slide({}), pitch)).toEqual([]);
  });

  it("tips the student to generate slides when there are none", () => {
    expect(ids(checkSlides(smartKey, pitch))).toEqual(["slides.none"]);
  });

  it("flags clutter", () => {
    const bullets = ["One", "Two", "Three", "Four", "Five"];
    expect(ids(checkSlides(slide({ bullets }), pitch))).toContain("slides.too-many-bullets");
    expect(ids(checkSlides(slide({ bullets: ["This bullet is far too long to read from the back of the room"] }), pitch))).toContain("slides.long-bullet");
  });

  it("flags missing titles and notes", () => {
    const issues = ids(checkSlides(slide({ title: "", notes: "" }), pitch));
    expect(issues).toEqual(expect.arrayContaining(["slides.title", "slides.notes"]));
  });

  it("flags slides that copy the script", () => {
    expect(ids(checkSlides(slide({ bullets: ["we often leave them in our bags, pockets, or somewhere around the house"] }), pitch))).toContain("slides.reading");
  });

  it("flags one copied bullet among short ones", () => {
    const bullets = ["we often leave them in our bags, pockets, or somewhere", "Library full", "Corridor", "No map", "Time is wasted"];
    expect(ids(checkSlides(slide({ bullets }), pitch))).toContain("slides.reading");
  });

  it("flags shouting", () => {
    expect(ids(checkSlides(slide({ bullets: ["BUY IT NOW"] }), pitch))).toContain("slides.shouting");
  });
});

describe("validate / readiness", () => {
  it("is ready when nothing blocks", () => {
    const d = { ...smartKey, slides: generateSlides(smartKey, pitch).map((s) => ({ ...s, bullets: [] })) };
    expect(readiness(validate(d)).ready).toBe(true);
  });

  it("is not ready with errors", () => {
    expect(readiness(validate(emptyDraft())).ready).toBe(false);
  });
});
