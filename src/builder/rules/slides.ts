import type { Draft, Issue, Slide, Template } from "../types";
import { countWords, isShouting, sharedPhraseRatio } from "./text";

const BAD = "/lectures/01#bad-presentation";

const checkSlide = (slide: Slide, index: number, template: Template): Issue[] => {
  const limits = template.slideLimits;
  const label = `Slide ${index + 1}`;
  const at = (field: "title" | "bullets" | "notes") => ({
    stage: "slides" as const,
    slideId: slide.id,
    field,
  });
  const bullets = slide.bullets.filter((b) => countWords(b) > 0);
  const issues: Issue[] = [];

  const titleWords = countWords(slide.title);
  if (!titleWords) {
    issues.push({
      ruleId: "slides.title",
      level: "error",
      where: at("title"),
      message: `${label} has no title.`,
      why: "The title tells the audience what this slide is about in one glance.",
      fix: "Write a short headline, for example “Keys always hide”.",
      learnMore: BAD,
    });
  } else if (titleWords > limits.titleWords) {
    issues.push({
      ruleId: "slides.title-long",
      level: "warning",
      where: at("title"),
      message: `${label} title is ${titleWords} words.`,
      why: "A slide title is a headline, not a sentence to read.",
      fix: `Keep it to ${limits.titleWords} words or fewer.`,
      learnMore: BAD,
    });
  }

  if (bullets.length > limits.bullets) {
    issues.push({
      ruleId: "slides.too-many-bullets",
      level: "warning",
      where: at("bullets"),
      message: `${label} has ${bullets.length} bullet points.`,
      why: "Clarity beats clutter. Too many bullet points was one of the bad presenter's mistakes.",
      fix: `Keep ${limits.bullets} or fewer. Move the rest to your speaker notes.`,
      learnMore: BAD,
    });
  }

  if (bullets.some((b) => countWords(b) > limits.bulletWords)) {
    issues.push({
      ruleId: "slides.long-bullet",
      level: "warning",
      where: at("bullets"),
      message: `${label} has a bullet longer than ${limits.bulletWords} words.`,
      why: "Long bullets turn the slide into a page of text. The audience reads instead of listening.",
      fix: "Cut each bullet to a few key words. Say the full sentence out loud instead.",
      learnMore: BAD,
    });
  }

  const slideWords = titleWords + bullets.reduce((n, b) => n + countWords(b), 0);
  if (slideWords > limits.slideWords) {
    issues.push({
      ruleId: "slides.too-many-words",
      level: "warning",
      where: at("bullets"),
      message: `${label} has ${slideWords} words.`,
      why: "Putting far too much text on the slides was the first mistake of the bad presenter.",
      fix: `Aim for ${limits.slideWords} words or fewer per slide.`,
      learnMore: BAD,
    });
  }

  if ([slide.title, ...bullets].some(isShouting)) {
    issues.push({
      ruleId: "slides.shouting",
      level: "warning",
      where: at("bullets"),
      message: `${label} uses ALL CAPITALS.`,
      why: "Capital letters are harder to read and feel like shouting.",
      fix: "Use normal sentence case. Make one word bold if it needs weight.",
      learnMore: BAD,
    });
  }

  if (slide.sectionId !== null && !countWords(slide.notes)) {
    issues.push({
      ruleId: "slides.notes",
      level: "warning",
      where: at("notes"),
      message: `${label} has no speaker notes.`,
      why: "Notes hold what you will say, so the slide can stay short.",
      fix: "Write what you will say while this slide is on screen.",
      learnMore: BAD,
    });
  }

  // Check bullets one by one too, so one copied sentence is not hidden by short bullets.
  const copied = (text: string) => countWords(text) >= 6 && sharedPhraseRatio(text, slide.notes) >= 0.6;
  if (copied(bullets.join(" ")) || bullets.some(copied)) {
    issues.push({
      ruleId: "slides.reading",
      level: "warning",
      where: at("bullets"),
      message: `${label} repeats your script word for word.`,
      why: "The bad presenter read every word from the slides. The slide should support you, not be your script.",
      fix: "Keep only the key words on the slide. The full sentences stay in your notes.",
      learnMore: BAD,
    });
  }

  return issues;
};

export const checkSlides = (draft: Draft, template: Template): Issue[] => {
  if (!draft.slides.length) {
    return [
      {
        ruleId: "slides.none",
        level: "tip",
        where: { stage: "slides" },
        message: "You have no slides yet.",
        why: "Slides come after the structure: first know what you will say, then decide what the audience sees.",
        fix: "When your outline is done, generate slides from it.",
      },
    ];
  }

  const issues = draft.slides.flatMap((s, i) => checkSlide(s, i, template));

  const maxSlides = Math.ceil(template.timeLimit / 15) + 1;
  if (draft.slides.length > maxSlides) {
    issues.push({
      ruleId: "slides.too-many-slides",
      level: "warning",
      where: { stage: "slides" },
      message: `${draft.slides.length} slides for a ${template.timeLimit}-second talk.`,
      why: "Each slide needs time to be seen and explained. Rushing through slides is clutter too.",
      fix: `Use ${maxSlides} slides or fewer.`,
      learnMore: BAD,
    });
  }

  return issues;
};
