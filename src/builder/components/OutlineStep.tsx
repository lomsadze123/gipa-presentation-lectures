import { withTimeline } from "../../components/content/timing";
import { estimateSeconds } from "../rules/text";
import type { Draft, Issue, Template } from "../types";
import { IssueList } from "./IssueItem";
import SectionCard from "./SectionCard";

interface OutlineStepProps {
  draft: Draft;
  template: Template;
  issues: Issue[];
  active: string;
  onActivate: (sectionId: string) => void;
  onChange: (sectionId: string, text: string) => void;
  onDone: () => void;
}

const OutlineStep = ({ draft, template, issues, active, onActivate, onChange, onDone }: OutlineStepProps) => {
  const timed = withTimeline(
    template.sections.map((s) => ({ name: s.name, seconds: estimateSeconds(draft.sections[s.id] ?? "") })),
  );
  const total = timed.length ? timed[timed.length - 1].to : 0;
  const scale = Math.max(total, template.timeLimit);
  const overall = issues.filter((i) => !i.where.sectionId);

  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900">Build the structure</h2>
      <p className="mt-1 max-w-[68ch] text-muted">
        A {template.name.toLowerCase()} has {template.sections.length} parts, in this order. Write each part the way you
        will say it. Do not think about slides yet: first know <em>what</em> you will say.
      </p>

      <div className="mt-5 rounded-xl bg-navy-900 p-4 text-white">
        <p className="flex justify-between text-sm">
          <span className="font-semibold">Estimated talk length</span>
          <span className={`tabular-nums ${total > template.timeLimit ? "font-bold text-pyr-red" : "text-navy-300"}`}>
            {total}s of {template.timeLimit}s
          </span>
        </p>
        <div className="relative mt-2 flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-navy-800">
          {timed.map((t) =>
            t.seconds ? (
              <span
                key={t.name}
                title={`${t.name}: about ${t.seconds}s`}
                className={total > template.timeLimit ? "bg-pyr-red" : "bg-accent-500"}
                style={{ width: `${(t.seconds / scale) * 100}%` }}
              />
            ) : null,
          )}
          {total > template.timeLimit && (
            <span
              className="absolute inset-y-0 w-0.5 bg-white"
              style={{ left: `${(template.timeLimit / scale) * 100}%` }}
              aria-hidden="true"
            />
          )}
        </div>
        <p className="mt-2 text-xs text-navy-300">Based on a normal speaking pace of about 130 words per minute.</p>
      </div>
      <IssueList issues={overall} />

      <ol className="mt-6 space-y-3">
        {template.sections.map((s, i) => (
          <SectionCard
            key={s.id}
            section={s}
            number={i + 1}
            text={draft.sections[s.id] ?? ""}
            issues={issues.filter((x) => x.where.sectionId === s.id)}
            active={active === s.id}
            isLast={i === template.sections.length - 1}
            onActivate={() => onActivate(s.id)}
            onChange={(text) => onChange(s.id, text)}
            onNext={() => (i < template.sections.length - 1 ? onActivate(template.sections[i + 1].id) : onDone())}
          />
        ))}
      </ol>
    </div>
  );
};

export default OutlineStep;
