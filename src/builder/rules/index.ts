import { getTemplate } from "../templates";
import type { Draft, Issue, Level, Stage } from "../types";
import { checkOutline } from "./outline";
import { checkSetup } from "./setup";
import { checkSlides } from "./slides";

export const validate = (draft: Draft): Issue[] => {
  const template = getTemplate(draft.typeId);
  return [
    ...checkSetup(draft),
    ...(template ? [...checkOutline(draft, template), ...checkSlides(draft, template)] : []),
  ];
};

const order: Record<Level, number> = { error: 0, warning: 1, tip: 2 };
export const byLevel = (a: Issue, b: Issue) => order[a.level] - order[b.level];

export const readiness = (issues: Issue[], stage?: Stage) => {
  const scoped = stage ? issues.filter((i) => i.where.stage === stage) : issues;
  const count = (level: Level) => scoped.filter((i) => i.level === level).length;
  const errors = count("error");
  return { errors, warnings: count("warning"), tips: count("tip"), ready: errors === 0 };
};
