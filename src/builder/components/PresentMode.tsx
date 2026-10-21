import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ExpandIcon } from "../../components/Icons";
import { formatTime } from "../../components/content/timing";
import { getTemplate } from "../templates";
import { useBuilder } from "../useBuilder";
import SlidePreview from "./SlidePreview";

const back = "/builder?step=rehearse";

/** Full-screen slideshow with speaker notes and a running clock. */
const PresentMode = () => {
  const { draft } = useBuilder();
  const navigate = useNavigate();
  const template = getTemplate(draft.typeId);
  const slides = draft.slides;
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => setElapsed((performance.now() - start) / 1000), 500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, slides.length - 1));
      } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "n" || e.key === "N") {
        setShowNotes((v) => !v);
      } else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      } else if (e.key === "Escape" && !document.fullscreenElement) {
        navigate(back);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length, navigate]);

  if (!slides.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-navy-950 p-6 text-center text-white">
        <p className="text-xl font-bold">No slides yet</p>
        <p className="text-navy-300">Make slides from your structure first.</p>
        <Link to="/builder?step=slides" className="rounded-lg bg-accent-500 px-5 py-2.5 font-semibold hover:bg-accent-600">
          Go to slides
        </Link>
      </div>
    );
  }

  const slide = slides[Math.min(index, slides.length - 1)];
  const limit = template?.timeLimit ?? 0;
  const over = limit > 0 && elapsed > limit;
  const subtitle = [template?.name, draft.audience].filter(Boolean).join(" · ");

  return (
    <div className="flex min-h-screen flex-col bg-navy-950 text-white">
      <div className="flex items-center gap-3 px-4 py-2 text-sm">
        <Link to={back} aria-label="Exit presentation" className="rounded-md p-1.5 text-navy-300 hover:bg-navy-800">
          <CloseIcon className="h-5 w-5" />
        </Link>
        <span className="text-navy-300">
          {index + 1} / {slides.length}
        </span>
        <span className={`ml-auto font-bold tabular-nums ${over ? "text-pyr-red" : ""}`}>
          {formatTime(elapsed)}
          {limit > 0 && <span className="font-normal text-navy-300"> / {formatTime(limit)}</span>}
        </span>
        <button
          onClick={() => setShowNotes((v) => !v)}
          aria-pressed={showNotes}
          className="cursor-pointer rounded-md px-2 py-1 text-navy-300 hover:bg-navy-800"
        >
          Notes (N)
        </button>
        <button
          onClick={() => document.documentElement.requestFullscreen?.()}
          aria-label="Full screen (F)"
          className="cursor-pointer rounded-md p-1.5 text-navy-300 hover:bg-navy-800"
        >
          <ExpandIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[min(100%,calc((100vh-12rem)*16/9))]">
          <SlidePreview slide={slide} subtitle={subtitle} className="border-0 shadow-2xl" />
        </div>
      </div>

      <div className="flex items-end gap-4 px-4 pb-4 pt-3">
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          aria-label="Previous slide"
          className="cursor-pointer rounded-full border border-navy-700 p-2.5 hover:bg-navy-800 disabled:opacity-30"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="min-h-12 min-w-0 flex-1 text-navy-100" aria-live="polite">
          {showNotes && (slide.notes.trim() ? <p className="max-h-28 overflow-y-auto">{slide.notes}</p> : <p className="text-navy-400">No notes for this slide.</p>)}
        </div>
        <button
          onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
          className="cursor-pointer rounded-full bg-accent-500 p-2.5 hover:bg-accent-600 disabled:opacity-30"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PresentMode;
