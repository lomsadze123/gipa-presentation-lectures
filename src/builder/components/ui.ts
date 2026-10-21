import type { Issue, Stage, Where } from "../types";

export type Step = Stage | "rehearse" | "export";

export const steps: { id: Step; label: string }[] = [
  { id: "setup", label: "Setup" },
  { id: "outline", label: "Structure" },
  { id: "slides", label: "Slides" },
  { id: "rehearse", label: "Rehearse" },
  { id: "export", label: "Export" },
];

/** DOM id of the input an issue points at, so the checker can jump to it. */
export const fieldId = (w: Where) =>
  w.field ? `builder-${w.sectionId ?? w.slideId ?? w.stage}-${w.field}` : undefined;

export type Status = "error" | "warning" | "ok";

export const statusOf = (issues: Issue[]): Status =>
  issues.some((i) => i.level === "error")
    ? "error"
    : issues.some((i) => i.level === "warning")
      ? "warning"
      : "ok";

export const statusLook: Record<Status, string> = {
  error: "border-rose-600 bg-rose-50 text-rose-600",
  warning: "border-type-orange bg-white text-type-orange",
  ok: "border-mint-600 bg-mint-600 text-white",
};

export const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink placeholder:text-navy-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100";

export const primaryButton =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButton =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-navy-900 transition-colors hover:border-accent-500 disabled:cursor-not-allowed disabled:opacity-50";
