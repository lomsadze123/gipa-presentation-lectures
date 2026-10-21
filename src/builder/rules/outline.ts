import type { Draft, Issue, SectionCheck, Template, TemplateSection } from "../types";
import {
  countWords,
  estimateSeconds,
  hasFiller,
  hasNumber,
  sentenceCount,
} from "./text";

const L01 = "/lectures/01";

const HOOK_OPENERS =
  /\b(imagine|picture this|what if|have you ever|did you know|how many|let me ask|last (week|month|year|night)|yesterday|one day|i remember|true story)\b/i;
const PEOPLE =
  /\b(students?|people|we|us|our|you|your|everyone|everybody|anyone|users?|customers?|clients?|famil(y|ies)|teachers?|children|kids|workers?|employees|parents|drivers|citizens|many|most|i|my)\b/i;
const CONCRETE =
  /\b(imagine|for example|for instance|picture this|morning|afternoon|evening|night|yesterday|today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|last (week|month|year)|next (week|month|year)|at (home|university|school|work)|in class)\b/i;
const ACTION =
  /\b(try|join|vote|sign|support|download|visit|start|share|choose|use|invest|help|imagine|think|ask|remember|come|give|tell|follow|register|test|back|approve|buy|pick|consider|fund|contact|talk|apply|subscribe|book|scan|let's|let us)\b/i;

type Check = (text: string) => Omit<Issue, "where" | "learnMore"> | null;

const contentChecks: Record<SectionCheck, Check> = {
  hook: (text) =>
    text.includes("?") || hasNumber(text) || HOOK_OPENERS.test(text)
      ? null
      : {
          ruleId: "outline.hook",
          level: "warning",
          message: "Your hook does not grab attention yet.",
          why: "The SmartKey pitch opens with a relatable question. Starting with “Today I will talk about…” loses the audience.",
          fix: "Open with a question, a surprising number, or a short “Imagine…” moment.",
        },
  who: (text) =>
    PEOPLE.test(text)
      ? null
      : {
          ruleId: "outline.who",
          level: "warning",
          message: "It is not clear who has this problem.",
          why: "The lecture asks: “What is the problem, and who experiences it?” People care when they recognise themselves.",
          fix: "Name the people, for example “students”, “parents” or “we”.",
        },
  concrete: (text) =>
    hasNumber(text) || CONCRETE.test(text)
      ? null
      : {
          ruleId: "outline.concrete",
          level: "warning",
          message: "Your example sounds general, not like one real situation.",
          why: "The rule is: use one specific example. A scene with a time, place or person is easy to picture.",
          fix: "Start with “Imagine…” and describe one moment: when, where, and what happens.",
        },
  oneSentence: (text) =>
    sentenceCount(text) <= 1
      ? null
      : {
          ruleId: "outline.one-sentence",
          level: "warning",
          message: `Your main idea has ${sentenceCount(text)} sentences.`,
          why: "The main idea is the one message the audience should remember. One sentence is easier to remember.",
          fix: "Merge it into one short sentence.",
        },
  action: (text) =>
    ACTION.test(text)
      ? null
      : {
          ruleId: "outline.action",
          level: "warning",
          message: "Your ending does not ask the audience to do or think anything.",
          why: "The rule is: finish with a clear call to action. “Thank you” is not an action.",
          fix: "Use an action verb: try, join, support, vote, imagine, ask yourself…",
        },
};

const checkSection = (draft: Draft, section: TemplateSection): Issue[] => {
  const text = draft.sections[section.id] ?? "";
  const where = { stage: "outline" as const, sectionId: section.id, field: "text" as const };
  const words = countWords(text);

  if (!words) {
    return [
      {
        ruleId: "outline.missing",
        level: "error",
        where,
        message: `${section.name} is missing.`,
        why: section.why,
        fix: section.question,
        learnMore: section.learnMore,
      },
    ];
  }

  const issues: Issue[] = [];
  if (words < section.minWords) {
    issues.push({
      ruleId: "outline.too-short",
      level: "warning",
      where,
      message: `${section.name} is only ${words} word${words === 1 ? "" : "s"}.`,
      why: section.why,
      fix: `Add a little more detail (at least ${section.minWords} words). ${section.question}`,
      learnMore: section.learnMore,
    });
  } else if (words > section.maxWords) {
    issues.push({
      ruleId: "outline.too-long",
      level: "warning",
      where,
      message: `${section.name} is ${words} words; aim for ${section.maxWords} or fewer.`,
      why: "Long parts eat the time you need for the rest of the talk.",
      fix: "Keep the strongest sentence or two and cut the rest.",
      learnMore: section.learnMore,
    });
  }

  for (const id of section.checks) {
    const found = contentChecks[id](text);
    if (found) issues.push({ ...found, where, learnMore: section.learnMore });
  }

  const seconds = estimateSeconds(text);
  if (seconds > section.suggestedSeconds * 1.5 + 5) {
    issues.push({
      ruleId: "outline.section-time",
      level: "warning",
      where,
      message: `${section.name} takes about ${seconds}s; the plan gives it ${section.suggestedSeconds}s.`,
      why: "If one part runs long, the important ending gets rushed.",
      fix: "Shorten this part or take time from another one.",
      learnMore: `${L01}#first-90-second-presentation`,
    });
  }

  const fillers = hasFiller(text);
  if (fillers.length) {
    issues.push({
      ruleId: "outline.filler",
      level: "tip",
      where,
      message: `Filler words: ${[...new Set(fillers)].map((f) => `“${f}”`).join(", ")}.`,
      why: "The bad presenter kept saying “Umm… basically… so…”. Fillers make you sound unsure.",
      fix: "Delete them. A short pause works better.",
      learnMore: `${L01}#bad-presentation`,
    });
  }

  return issues;
};

export const checkOutline = (draft: Draft, template: Template): Issue[] => {
  const issues = template.sections.flatMap((s) => checkSection(draft, s));

  const total = template.sections.reduce(
    (sum, s) => sum + estimateSeconds(draft.sections[s.id] ?? ""),
    0,
  );
  if (total > template.timeLimit) {
    issues.push({
      ruleId: "outline.over-time",
      level: "error",
      where: { stage: "outline" },
      message: `Your talk takes about ${total}s; the limit is ${template.timeLimit}s.`,
      why: `The rule is: maximum presentation time ${template.timeLimit} seconds. Going over means you get cut off before your call to action.`,
      fix: "Cut the longest parts first. Look for sentences that repeat an idea.",
      learnMore: `${L01}#first-90-second-presentation`,
    });
  }

  return issues;
};
