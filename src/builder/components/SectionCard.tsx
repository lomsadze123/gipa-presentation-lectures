import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckIcon } from "../../components/Icons";
import { countWords, estimateSeconds } from "../rules/text";
import type { Issue, TemplateSection } from "../types";
import { IssueList } from "./IssueItem";
import { fieldId, inputClass, primaryButton, statusLook, statusOf } from "./ui";

interface SectionCardProps {
  section: TemplateSection;
  number: number;
  text: string;
  issues: Issue[];
  active: boolean;
  isLast: boolean;
  onActivate: () => void;
  onChange: (text: string) => void;
  onNext: () => void;
}

const SectionCard = ({
  section,
  number,
  text,
  issues,
  active,
  isLast,
  onActivate,
  onChange,
  onNext,
}: SectionCardProps) => {
  const status = statusOf(issues);
  const seconds = estimateSeconds(text);
  const words = countWords(text);
  const id = fieldId({ stage: "outline", sectionId: section.id, field: "text" });
  const over = seconds > section.suggestedSeconds;

  const badge = (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${statusLook[status]}`}
      aria-label={status === "ok" ? "Done" : status === "error" ? "Needs work" : "Can be improved"}
    >
      {status === "ok" ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : number}
    </span>
  );

  if (!active) {
    return (
      <li>
        <button
          onClick={onActivate}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left hover:border-accent-500"
        >
          {badge}
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-navy-900">{section.name}</span>
            <span className="block truncate text-sm text-muted">{text.trim() || section.question}</span>
          </span>
          <span className="shrink-0 text-xs tabular-nums text-muted">
            {seconds}s / {section.suggestedSeconds}s
          </span>
        </button>
      </li>
    );
  }

  return (
    <li className="rounded-xl border-2 border-accent-500 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3">
        {badge}
        <h3 className="text-lg font-bold text-navy-900">{section.name}</h3>
        <span className="ml-auto text-xs text-muted">about {section.suggestedSeconds}s</span>
      </div>

      <label htmlFor={id} className="mt-4 block font-semibold text-ink">
        {section.question}
      </label>
      <textarea
        id={id}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Write it the way you would say it out loud."
        className={`mt-2 resize-y ${inputClass}`}
      />
      <p className="mt-1.5 flex flex-wrap justify-between gap-2 text-xs text-muted">
        <span>
          {words} words · {section.minWords}–{section.maxWords} recommended
        </span>
        <span className={over ? "font-semibold text-type-orange" : ""}>
          about {seconds}s of {section.suggestedSeconds}s
        </span>
      </p>

      <div className="mt-4 space-y-2">
        <details className="group rounded-lg bg-panel px-4 py-2.5">
          <summary className="cursor-pointer font-semibold text-navy-900">Why this part?</summary>
          <p className="mt-2 text-sm text-ink">{section.why}</p>
        </details>
        <details className="group rounded-lg bg-panel px-4 py-2.5">
          <summary className="cursor-pointer font-semibold text-navy-900">See an example</summary>
          <blockquote className="mt-2 border-l-3 border-lavender-600 pl-3 text-sm italic text-ink">
            {section.example}
          </blockquote>
          <p className="mt-2 text-xs text-muted">
            From the SmartKey pitch.{" "}
            <Link to={section.learnMore} target="_blank" rel="noopener" className="font-semibold text-accent-600 hover:underline">
              Read it in the lecture ↗
            </Link>
          </p>
        </details>
      </div>

      <IssueList issues={issues} />

      <div className="mt-5 flex justify-end">
        <button onClick={onNext} className={primaryButton}>
          {isLast ? "Next: make slides" : "Next part"} <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
};

export default SectionCard;
