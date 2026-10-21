import { useCallback, useSyncExternalStore } from "react";
import { emptyDraft, generateSlides, normalizeDraft } from "./draft";
import { getTemplate } from "./templates";
import type { Draft, Slide } from "./types";

const KEY = "gipa-presentation:builder:v1";
const EVENT = "gipa-builder-change";

const read = (): Draft => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? normalizeDraft(JSON.parse(raw)) : emptyDraft();
  } catch {
    return emptyDraft();
  }
};

// Same approach as useProgress: memory is the source of truth, storage persists it.
let cache = read();

const subscribe = (onChange: () => void) => {
  const fromOtherTab = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = read();
    onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", fromOtherTab);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", fromOtherTab);
  };
};

const save = (next: Draft) => {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode): keep the draft for this session only.
  }
  window.dispatchEvent(new Event(EVENT));
};

const update = (fn: (d: Draft) => Draft) => save(fn(cache));

/** The student's presentation draft, autosaved in this browser. */
export const useBuilder = () => {
  const draft = useSyncExternalStore(subscribe, () => cache);

  const setMeta = useCallback(
    (patch: Partial<Pick<Draft, "typeId" | "topic" | "audience">>) =>
      update((d) => ({ ...d, ...patch })),
    [],
  );

  const setSection = useCallback(
    (id: string, text: string) =>
      update((d) => ({ ...d, sections: { ...d.sections, [id]: text } })),
    [],
  );

  const makeSlides = useCallback(
    () =>
      update((d) => {
        const template = getTemplate(d.typeId);
        return template ? { ...d, slides: generateSlides(d, template) } : d;
      }),
    [],
  );

  const setSlide = useCallback(
    (id: string, patch: Partial<Omit<Slide, "id">>) =>
      update((d) => ({
        ...d,
        slides: d.slides.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      })),
    [],
  );

  const replace = useCallback((next: unknown) => save(normalizeDraft(next)), []);
  const reset = useCallback(() => save(emptyDraft()), []);

  return { draft, setMeta, setSection, makeSlides, setSlide, replace, reset };
};
