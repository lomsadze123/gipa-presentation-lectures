import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import { BulbIcon, CloseIcon, WarningIcon } from "../../components/Icons";
import type { Issue, Level } from "../types";

const looks: Record<
  Level,
  { label: string; box: string; icon: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  error: { label: "Fix", box: "border-rose-600/25 bg-rose-50", icon: "text-rose-600", Icon: CloseIcon },
  warning: { label: "Improve", box: "border-type-orange/30 bg-white", icon: "text-type-orange", Icon: WarningIcon },
  tip: { label: "Tip", box: "border-lavender-600/20 bg-lavender-50", icon: "text-lavender-600", Icon: BulbIcon },
};

interface IssueItemProps {
  issue: Issue;
  /** Shows a "Show me" button that moves focus to the field. */
  onJump?: (issue: Issue) => void;
}

const IssueItem = ({ issue, onJump }: IssueItemProps) => {
  const { label, box, icon, Icon } = looks[issue.level];
  return (
    <li className={`flex gap-3 rounded-lg border px-3 py-2.5 text-sm ${box}`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${icon}`} strokeWidth={2.5} />
      <div className="min-w-0 space-y-1">
        <p className="font-semibold text-navy-900">
          <span className={`mr-1.5 ${icon}`}>{label}:</span>
          {issue.message}
        </p>
        <p className="text-muted">
          <span className="font-semibold text-ink">Why: </span>
          {issue.why}
        </p>
        <p className="text-muted">
          <span className="font-semibold text-ink">How: </span>
          {issue.fix}
        </p>
        {(onJump || issue.learnMore) && (
          <p className="flex flex-wrap gap-x-4 pt-0.5">
            {onJump && (
              <button
                onClick={() => onJump(issue)}
                className="cursor-pointer font-semibold text-accent-600 hover:underline"
              >
                Show me
              </button>
            )}
            {issue.learnMore && (
              <Link
                to={issue.learnMore}
                target="_blank"
                rel="noopener"
                className="font-semibold text-accent-600 hover:underline"
              >
                Learn more in the lecture ↗
              </Link>
            )}
          </p>
        )}
      </div>
    </li>
  );
};

export const IssueList = ({ issues, onJump }: { issues: Issue[]; onJump?: (issue: Issue) => void }) =>
  issues.length ? (
    <ul className="mt-3 space-y-2" aria-live="polite">
      {issues.map((i) => (
        <IssueItem key={`${i.ruleId}-${i.where.sectionId ?? i.where.slideId ?? ""}`} issue={i} onJump={onJump} />
      ))}
    </ul>
  ) : null;

export default IssueItem;
