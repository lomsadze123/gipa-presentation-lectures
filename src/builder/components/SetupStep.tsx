import Callout from "../../components/content/Callout";
import { ArrowRightIcon, CheckIcon, LockIcon } from "../../components/Icons";
import { getTemplate, templates } from "../templates";
import type { Draft, Issue } from "../types";
import { IssueList } from "./IssueItem";
import { fieldId, inputClass, primaryButton } from "./ui";

interface SetupStepProps {
  draft: Draft;
  issues: Issue[];
  onChange: (patch: Partial<Pick<Draft, "typeId" | "topic" | "audience">>) => void;
  onNext: () => void;
}

const SetupStep = ({ draft, issues, onChange, onNext }: SetupStepProps) => {
  const template = getTemplate(draft.typeId);
  const forField = (field: string) => issues.filter((i) => i.where.field === field);

  return (
    <div className="space-y-10">
      <section aria-labelledby="type-heading">
        <h2 id="type-heading" className="text-xl font-bold text-navy-900">
          1. What kind of presentation is it?
        </h2>
        <p className="mt-1 text-muted">
          Ask yourself what the audience should learn, believe or do. The type decides the structure you will build.
        </p>
        <div
          id={fieldId({ stage: "setup", field: "type" })}
          tabIndex={-1}
          role="radiogroup"
          aria-labelledby="type-heading"
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          {templates.map((t) => {
            const selected = draft.typeId === t.id;
            const soon = t.status === "soon";
            return (
              <button
                key={t.id}
                role="radio"
                aria-checked={selected}
                disabled={soon}
                onClick={() => onChange({ typeId: t.id })}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors ${
                  selected
                    ? "border-accent-500 bg-accent-50 ring-2 ring-accent-100"
                    : soon
                      ? "cursor-not-allowed border-dashed border-navy-300 bg-panel text-navy-400"
                      : "cursor-pointer border-line bg-white hover:border-accent-500"
                }`}
              >
                <span className="flex w-full items-center justify-between gap-2">
                  <span className={`font-bold ${soon ? "" : "text-navy-900"}`}>{t.name}</span>
                  {selected && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-white">
                      <CheckIcon className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                  {soon && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold">
                      <LockIcon className="h-3 w-3" /> Later lecture
                    </span>
                  )}
                </span>
                <span className={`mt-1 text-sm ${soon ? "" : "text-muted"}`}>{t.purpose}</span>
                {t.status === "ready" && (
                  <span className="mt-2 text-xs font-semibold text-accent-600">
                    {t.timeLimit} seconds · {t.sections.length} parts
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <IssueList issues={forField("type")} />
        {template && (
          <Callout type="reflect" title="Key question for this type">
            <p>{template.keyQuestion}</p>
          </Callout>
        )}
      </section>

      <section>
        <label htmlFor={fieldId({ stage: "setup", field: "topic" })} className="text-xl font-bold text-navy-900">
          2. What is your one idea?
        </label>
        <p className="mt-1 text-muted">
          Lecture challenge: one idea that could make university life better. Keep it to one short line.
        </p>
        <input
          id={fieldId({ stage: "setup", field: "topic" })}
          value={draft.topic}
          onChange={(e) => onChange({ topic: e.target.value })}
          placeholder="e.g. An app that shows which classrooms are free right now"
          className={`mt-3 ${inputClass}`}
        />
        <IssueList issues={forField("topic")} />
      </section>

      <section>
        <label htmlFor={fieldId({ stage: "setup", field: "audience" })} className="text-xl font-bold text-navy-900">
          3. Who will listen?
        </label>
        <p className="mt-1 text-muted">Investor, teacher, classmates? You will speak differently to each of them.</p>
        <input
          id={fieldId({ stage: "setup", field: "audience" })}
          value={draft.audience}
          onChange={(e) => onChange({ audience: e.target.value })}
          placeholder="e.g. Students in my group"
          className={`mt-3 ${inputClass}`}
        />
        <IssueList issues={forField("audience")} />
      </section>

      <div className="flex justify-end border-t border-line pt-6">
        <button onClick={onNext} disabled={!template} className={primaryButton}>
          Next: build the structure <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SetupStep;
