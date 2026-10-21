import type { Draft, Issue } from "../types";
import { countWords } from "./text";

const L01 = "/lectures/01";

export const checkSetup = (draft: Draft): Issue[] => {
  const issues: Issue[] = [];

  if (!draft.typeId) {
    issues.push({
      ruleId: "setup.type",
      level: "error",
      where: { stage: "setup", field: "type" },
      message: "Choose a presentation type.",
      why: "Each type has a different goal, so it needs a different structure.",
      fix: "Ask yourself what you want the audience to learn, believe or do, then pick the matching type.",
      learnMore: `${L01}#types-of-presentations`,
    });
  }

  const topicWords = countWords(draft.topic);
  if (!topicWords) {
    issues.push({
      ruleId: "setup.topic",
      level: "error",
      where: { stage: "setup", field: "topic" },
      message: "Write your topic.",
      why: "Everything else in the presentation is built around this one idea.",
      fix: "Describe your idea in a few words, for example “An app that finds free classrooms”.",
      learnMore: `${L01}#first-90-second-presentation`,
    });
  } else if (topicWords > 12) {
    issues.push({
      ruleId: "setup.topic-long",
      level: "warning",
      where: { stage: "setup", field: "topic" },
      message: `Your topic is ${topicWords} words long.`,
      why: "A long topic usually means more than one idea. The rule is: focus on one main idea.",
      fix: "Cut it to 12 words or fewer. If you cannot, choose one of the ideas.",
      learnMore: `${L01}#first-90-second-presentation`,
    });
  }

  if (!countWords(draft.audience)) {
    issues.push({
      ruleId: "setup.audience",
      level: "tip",
      where: { stage: "setup", field: "audience" },
      message: "Say who will listen.",
      why: "The same idea is explained differently to investors, teachers or classmates.",
      fix: "Name the audience, for example “Students in my group” or “The university dean”.",
      learnMore: `${L01}#group-activity`,
    });
  }

  return issues;
};
