import Callout from "../../components/content/Callout";
import { ArrowLeftIcon, ArrowRightIcon, ResetIcon } from "../../components/Icons";
import { readiness } from "../rules";
import type { Draft, Issue, Slide, Template } from "../types";
import ConfirmButton from "./ConfirmButton";
import { IssueList } from "./IssueItem";
import SlidePreview from "./SlidePreview";
import { fieldId, inputClass, primaryButton, secondaryButton, statusLook, statusOf } from "./ui";

interface SlidesStepProps {
  draft: Draft;
  template: Template;
  issues: Issue[];
  allIssues: Issue[];
  active: string;
  onActivate: (slideId: string) => void;
  onGenerate: () => void;
  onChange: (slideId: string, patch: Partial<Omit<Slide, "id">>) => void;
  onDone: () => void;
}

const SlidesStep = ({
  draft,
  template,
  issues,
  allIssues,
  active,
  onActivate,
  onGenerate,
  onChange,
  onDone,
}: SlidesStepProps) => {
  const { slides } = draft;
  const index = Math.max(0, slides.findIndex((s) => s.id === active));
  const slide = slides[index];
  const subtitle = [template.name, draft.audience].filter(Boolean).join(" · ");

  if (!slide) {
    const outline = readiness(allIssues, "outline");
    return (
      <div>
        <h2 className="text-xl font-bold text-navy-900">Turn your structure into slides</h2>
        <p className="mt-1 max-w-[68ch] text-muted">
          You will get a title slide and one slide for each part. Your outline text goes into the{" "}
          <strong>speaker notes</strong>, not onto the slide. The slide only shows the few words the audience needs to
          see.
        </p>
        {!outline.ready && (
          <Callout type="warning" title="Your structure is not finished">
            <p>
              The checker still shows {outline.errors} problem{outline.errors === 1 ? "" : "s"} in the structure. You can
              make slides now, but your notes will have gaps.
            </p>
          </Callout>
        )}
        <button onClick={onGenerate} className={`mt-6 ${primaryButton}`}>
          Make slides from my structure <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const section = template.sections.find((s) => s.id === slide.sectionId);
  const slideIssues = issues.filter((i) => i.where.slideId === slide.id);
  const forField = (field: string) => slideIssues.filter((i) => i.where.field === field);
  const deckIssues = issues.filter((i) => !i.where.slideId);
  const go = (to: number) => onActivate(slides[to].id);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-navy-900">Design your slides</h2>
          <p className="mt-1 max-w-[60ch] text-muted">
            Clarity beats clutter: a short title, a few key words, and everything else in your notes.
          </p>
        </div>
        <ConfirmButton onConfirm={onGenerate} confirmLabel="Replace all slides?" className={`${secondaryButton} text-sm`}>
          <ResetIcon className="h-4 w-4" /> Rebuild from structure
        </ConfirmButton>
      </div>
      <IssueList issues={deckIssues} />

      <ol className="mt-3 flex gap-2 overflow-x-auto px-1 pb-2 pt-3" aria-label="Slides">
        {slides.map((s, i) => {
          const status = statusOf(issues.filter((x) => x.where.slideId === s.id));
          return (
            <li key={s.id} className="w-28 shrink-0">
              <button
                onClick={() => onActivate(s.id)}
                aria-current={s.id === slide.id}
                aria-label={`Slide ${i + 1}: ${s.title || "untitled"}`}
                className={`relative block w-full cursor-pointer rounded-lg p-0.5 ${
                  s.id === slide.id ? "ring-2 ring-accent-500" : "hover:ring-2 hover:ring-navy-300"
                }`}
              >
                <SlidePreview slide={s} subtitle={subtitle} />
                <span
                  className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] font-bold ${statusLook[status]}`}
                >
                  {i + 1}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 grid gap-6">
        <div>
          <SlidePreview slide={slide} subtitle={subtitle} className="mx-auto max-w-2xl shadow-lg" />
          <p className="mt-2 text-center text-sm text-muted">
            Slide {index + 1} of {slides.length}
            {section && ` · ${section.name}`}
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor={fieldId({ stage: "slides", slideId: slide.id, field: "title" })} className="font-semibold text-navy-900">
              Title
            </label>
            <input
              id={fieldId({ stage: "slides", slideId: slide.id, field: "title" })}
              value={slide.title}
              onChange={(e) => onChange(slide.id, { title: e.target.value })}
              placeholder={section ? `A headline for “${section.name}”` : "Your presentation title"}
              className={`mt-1.5 ${inputClass}`}
            />
            <IssueList issues={forField("title")} />
          </div>

          {section && (
            <div>
              <label htmlFor={fieldId({ stage: "slides", slideId: slide.id, field: "bullets" })} className="font-semibold text-navy-900">
                Key words on the slide <span className="font-normal text-muted">(one per line, optional)</span>
              </label>
              <textarea
                id={fieldId({ stage: "slides", slideId: slide.id, field: "bullets" })}
                value={slide.bullets.join("\n")}
                onChange={(e) => onChange(slide.id, { bullets: e.target.value.split("\n") })}
                rows={4}
                placeholder={"e.g.\nKeys are small\nWe lose them daily"}
                className={`mt-1.5 resize-y ${inputClass}`}
              />
              <p className="mt-1 text-xs text-muted">
                No key words? The title is shown big in the middle. That works well for a hook or a main idea.
              </p>
              <IssueList issues={forField("bullets")} />
            </div>
          )}

          <div>
            <label htmlFor={fieldId({ stage: "slides", slideId: slide.id, field: "notes" })} className="font-semibold text-navy-900">
              Speaker notes <span className="font-normal text-muted">(what you say, only you see it)</span>
            </label>
            <textarea
              id={fieldId({ stage: "slides", slideId: slide.id, field: "notes" })}
              value={slide.notes}
              onChange={(e) => onChange(slide.id, { notes: e.target.value })}
              rows={5}
              className={`mt-1.5 resize-y ${inputClass}`}
            />
            <IssueList issues={forField("notes")} />
          </div>

          <div className="flex flex-wrap justify-between gap-2 border-t border-line pt-4">
            <button onClick={() => go(index - 1)} disabled={index === 0} className={secondaryButton}>
              <ArrowLeftIcon className="h-4 w-4" /> Previous
            </button>
            {index < slides.length - 1 ? (
              <button onClick={() => go(index + 1)} className={primaryButton}>
                Next slide <ArrowRightIcon className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={onDone} className={primaryButton}>
                Next: rehearse <ArrowRightIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidesStep;
