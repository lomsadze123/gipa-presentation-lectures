import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CloseIcon } from "../../components/Icons";
import { siteTitle } from "../../data/course";
import { readiness, validate } from "../rules";
import { getTemplate } from "../templates";
import type { Draft, Issue, Stage } from "../types";
import { useBuilder } from "../useBuilder";
import ExportStep from "./ExportStep";
import FeedbackPanel from "./FeedbackPanel";
import OutlineStep from "./OutlineStep";
import PrintDeck from "./PrintDeck";
import RehearseStep from "./RehearseStep";
import SetupStep from "./SetupStep";
import SlidesStep from "./SlidesStep";
import Stepper from "./Stepper";
import { fieldId, type Step, steps } from "./ui";

const isStage = (s: Step): s is Stage => s === "setup" || s === "outline" || s === "slides";

/** Where the student left off: the first part with no text yet. */
const firstOpenSection = (draft: Draft) => {
  const sections = getTemplate(draft.typeId)?.sections ?? [];
  return (sections.find((s) => !draft.sections[s.id]?.trim()) ?? sections[0])?.id ?? "";
};

const BuilderPage = () => {
  const { draft, setMeta, setSection, makeSlides, setSlide, replace, reset } = useBuilder();
  const template = getTemplate(draft.typeId);
  const issues = useMemo(() => validate(draft), [draft]);

  const [params, setParams] = useSearchParams();
  const requested = params.get("step");
  const step: Step = template ? (steps.find((s) => s.id === requested)?.id ?? "setup") : "setup";

  // Picked once (on load or when entering the step), never while typing, so the open card stays put.
  const [activeSection, setActiveSection] = useState(() => firstOpenSection(draft));
  const [activeSlide, setActiveSlide] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const pendingFocus = useRef<string | undefined>(undefined);

  useEffect(() => {
    document.title = `Presentation builder — ${siteTitle}`;
  }, []);

  // Runs after every render so a jump lands once the target step is on screen.
  useEffect(() => {
    if (!pendingFocus.current) return;
    const el = document.getElementById(pendingFocus.current);
    pendingFocus.current = undefined;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  });

  const goTo = (next: Step) => {
    if (next === "outline" && !activeSection) setActiveSection(firstOpenSection(draft));
    setParams(next === "setup" ? {} : { step: next });
    window.scrollTo(0, 0);
  };

  const jump = (issue: Issue) => {
    const { where } = issue;
    setSheetOpen(false);
    setParams(where.stage === "setup" ? {} : { step: where.stage });
    if (where.sectionId) setActiveSection(where.sectionId);
    if (where.slideId) setActiveSlide(where.slideId);
    pendingFocus.current = fieldId(where);
    if (!pendingFocus.current) window.scrollTo(0, 0);
  };

  const all = readiness(issues);
  const done = {
    setup: readiness(issues, "setup").errors === 0,
    outline: !!template && readiness(issues, "outline").errors === 0,
    slides: draft.slides.length > 0 && readiness(issues, "slides").errors === 0,
  };
  const panel = (
    <FeedbackPanel
      issues={issues}
      stage={isStage(step) ? step : null}
      done={done}
      locked={!template}
      onStage={(s) => goTo(s)}
      onJump={jump}
    />
  );

  return (
    <>
      <div className="print:hidden">
        <header className="relative overflow-hidden bg-navy-900 text-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-10">
            <p className="text-xs font-semibold text-accent-100 sm:text-sm">Practice</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-4xl">Build your presentation</h1>
            <p className="mt-2 hidden max-w-2xl text-navy-300 sm:block">
              Follow the steps. The checker tells you what to fix, where, and why, using the rules from the lectures.
            </p>
            <div className="mt-4 sm:mt-6">
              <Stepper current={step} done={done} locked={!template} onSelect={goTo} />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-28 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:pb-16">
          <div className="min-w-0">
            {step === "setup" && (
              <SetupStep
                draft={draft}
                issues={issues.filter((i) => i.where.stage === "setup")}
                onChange={setMeta}
                onNext={() => goTo("outline")}
              />
            )}
            {template && step === "outline" && (
              <OutlineStep
                draft={draft}
                template={template}
                issues={issues.filter((i) => i.where.stage === "outline")}
                active={activeSection || template.sections[0].id}
                onActivate={setActiveSection}
                onChange={setSection}
                onDone={() => goTo("slides")}
              />
            )}
            {template && step === "slides" && (
              <SlidesStep
                draft={draft}
                template={template}
                issues={issues.filter((i) => i.where.stage === "slides")}
                allIssues={issues}
                active={activeSlide}
                onActivate={setActiveSlide}
                onGenerate={() => {
                  makeSlides();
                  setActiveSlide("");
                }}
                onChange={setSlide}
                onDone={() => goTo("rehearse")}
              />
            )}
            {template && step === "rehearse" && (
              <RehearseStep draft={draft} template={template} onDone={() => goTo("export")} />
            )}
            {template && step === "export" && (
              <ExportStep
                draft={draft}
                errors={all.errors}
                onImport={(raw) => {
                  replace(raw);
                  setActiveSection("");
                  goTo("outline");
                }}
                onReset={() => {
                  reset();
                  setActiveSection("");
                  goTo("setup");
                }}
              />
            )}
          </div>

          <aside className="hidden lg:block" aria-label="Checker">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-line bg-panel p-4">
              {panel}
            </div>
          </aside>
        </div>

        {/* Phone and tablet: checker opens as a bottom sheet. */}
        <div className="lg:hidden">
          {sheetOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-navy-950/50" onClick={() => setSheetOpen(false)} aria-hidden="true" />
              <div
                role="dialog"
                aria-label="Checker"
                className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-panel p-4 shadow-2xl"
              >
                <button
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close checker"
                  className="float-right cursor-pointer rounded-md p-1 text-muted hover:bg-navy-100"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
                {panel}
              </div>
            </>
          )}
          <button
            onClick={() => setSheetOpen(true)}
            className="fixed inset-x-0 bottom-0 z-30 flex cursor-pointer items-center justify-between gap-3 bg-navy-900 px-4 py-3 text-left text-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)]"
          >
            <span className="font-semibold">Checker</span>
            <span className="flex gap-2 whitespace-nowrap text-sm">
              {all.errors > 0 && <span className="rounded-full bg-rose-600 px-2.5 py-0.5 font-bold">{all.errors} to fix</span>}
              {all.warnings > 0 && (
                <span className="rounded-full bg-type-orange px-2.5 py-0.5 font-bold">{all.warnings} to improve</span>
              )}
              {all.errors + all.warnings === 0 && <span className="text-mint-50">All good</span>}
              <span className="hidden text-navy-300 min-[360px]:inline">Show</span>
            </span>
          </button>
        </div>
      </div>

      <PrintDeck draft={draft} />
    </>
  );
};

export default BuilderPage;
