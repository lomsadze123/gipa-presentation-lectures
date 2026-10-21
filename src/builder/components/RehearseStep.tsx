import { Link } from "react-router-dom";
import Checklist from "../../components/content/Checklist";
import PracticeTimer from "../../components/content/PracticeTimer";
import { ArrowRightIcon, ExpandIcon } from "../../components/Icons";
import type { Draft, Template } from "../types";
import { primaryButton, secondaryButton } from "./ui";

interface RehearseStepProps {
  draft: Draft;
  template: Template;
  onDone: () => void;
}

const RehearseStep = ({ draft, template, onDone }: RehearseStepProps) => (
  <div>
    <h2 className="text-xl font-bold text-navy-900">Rehearse out loud</h2>
    <p className="mt-1 max-w-[68ch] text-muted">
      Say it, don't read it. Start the timer and speak through every part. Glance at your cues only when you get stuck.
    </p>

    <PracticeTimer stages={template.sections.map((s) => ({ name: s.name, seconds: s.suggestedSeconds }))} />

    <h3 className="mt-8 font-bold text-navy-900">Your cues</h3>
    <ol className="mt-3 space-y-2">
      {template.sections.map((s, i) => (
        <li key={s.id} className="flex gap-3 rounded-lg border border-line bg-white px-4 py-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
            {i + 1}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-navy-900">
              {s.name} <span className="font-normal text-muted">· {s.suggestedSeconds}s</span>
            </span>
            <span className="block text-sm text-ink">
              {draft.sections[s.id]?.trim() || <em className="text-muted">Not written yet</em>}
            </span>
          </span>
        </li>
      ))}
    </ol>

    <h3 className="mt-8 font-bold text-navy-900">Self-check before presenting</h3>
    <Checklist
      storageKey="builder-self-check"
      items={[
        "Can I explain my idea in one sentence?",
        "Is the problem clear?",
        "Is my solution easy to understand?",
        "Have I included a concrete example?",
        "Does my ending give the audience a reason to care?",
      ]}
    />

    <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6">
      <Link to="/builder/present" className={secondaryButton}>
        <ExpandIcon className="h-4 w-4" /> Present full screen
      </Link>
      <button onClick={onDone} className={primaryButton}>
        Next: save and export <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default RehearseStep;
