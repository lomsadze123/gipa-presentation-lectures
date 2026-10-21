import { CheckIcon } from "../../components/Icons";
import { byLevel, readiness } from "../rules";
import type { Issue, Stage } from "../types";
import { IssueList } from "./IssueItem";

const stageNames: Record<Stage, string> = { setup: "Setup", outline: "Structure", slides: "Slides" };

interface FeedbackPanelProps {
  issues: Issue[];
  /** Stage being edited; null shows the most important issues of every stage. */
  stage: Stage | null;
  /** Stages with nothing left to fix (slides also need to exist). */
  done: Record<Stage, boolean>;
  /** No type chosen yet, so later stages cannot be checked. */
  locked: boolean;
  onStage: (stage: Stage) => void;
  onJump: (issue: Issue) => void;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const FeedbackPanel = ({ issues, stage, done, locked, onStage, onJump }: FeedbackPanelProps) => {
  const all = readiness(issues);
  const shown = (stage ? issues.filter((i) => i.where.stage === stage) : issues.filter((i) => i.level !== "tip")).sort(
    byLevel,
  );
  const perfect = all.errors + all.warnings === 0 && done.slides;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">Checker</p>
      <div
        className={`mt-2 rounded-xl px-4 py-3 ${
          all.errors ? "bg-rose-50 text-rose-600" : perfect ? "bg-mint-600 text-white" : "bg-mint-50 text-mint-600"
        }`}
      >
        <p className="font-bold">
          {all.errors
            ? `${plural(all.errors, "problem")} to fix`
            : perfect
              ? "Ready to present"
              : "No blockers left"}
        </p>
        <p className={`text-sm ${perfect ? "text-white/85" : "text-ink"}`}>
          {all.errors
            ? "Red items block your presentation. Fix them first."
            : perfect
              ? "Your structure and slides follow every rule. Go rehearse!"
              : all.warnings
                ? `${plural(all.warnings, "suggestion")} can make it stronger.`
                : "Keep going: finish the remaining steps."}
        </p>
      </div>

      <ul className="mt-3 space-y-1">
        {(Object.keys(stageNames) as Stage[]).map((s) => {
          const r = readiness(issues, s);
          return (
            <li key={s}>
              <button
                onClick={() => onStage(s)}
                disabled={locked && s !== "setup"}
                aria-current={s === stage}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-navy-100 disabled:cursor-not-allowed disabled:opacity-40 ${
                  s === stage ? "bg-navy-100 font-semibold" : ""
                }`}
              >
                <span className="text-navy-900">{stageNames[s]}</span>
                <span className="flex gap-1.5 text-xs font-bold">
                  {r.errors > 0 && <span className="rounded-full bg-rose-600 px-2 py-0.5 text-white">{r.errors}</span>}
                  {r.warnings > 0 && (
                    <span className="rounded-full bg-type-orange px-2 py-0.5 text-white">{r.warnings}</span>
                  )}
                  {done[s] && r.warnings === 0 && <CheckIcon className="h-4 w-4 text-mint-600" strokeWidth={3} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 border-t border-line pt-3">
        <p className="text-sm font-semibold text-navy-900">
          {stage ? `${stageNames[stage]}: ${shown.length ? plural(shown.length, "note") : "all good"}` : "Still to do"}
        </p>
        {shown.length ? (
          <IssueList issues={shown} onJump={onJump} />
        ) : (
          <p className="mt-1 text-sm text-muted">Nothing to fix here.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPanel;
