import { templates } from "./templates";
import type { Draft, Slide, Template, TypeId } from "./types";

export const emptyDraft = (): Draft => ({
  version: 1,
  typeId: null,
  topic: "",
  audience: "",
  sections: {},
  slides: [],
});

export const newId = () => Math.random().toString(36).slice(2, 10);

/** Title slide plus one slide per section. The outline becomes speaker notes, not slide text. */
export const generateSlides = (draft: Draft, template: Template): Slide[] => [
  { id: newId(), sectionId: null, title: draft.topic, bullets: [], notes: "" },
  ...template.sections.map((s) => ({
    id: newId(),
    sectionId: s.id,
    title: s.name,
    bullets: [],
    notes: draft.sections[s.id] ?? "",
  })),
];

const str = (v: unknown) => (typeof v === "string" ? v : "");
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Turns untrusted JSON (storage or an imported file) into a valid draft. */
export const normalizeDraft = (raw: unknown): Draft => {
  if (!isRecord(raw)) return emptyDraft();
  const typeId = templates.some((t) => t.id === raw.typeId)
    ? (raw.typeId as TypeId)
    : null;
  const sections = isRecord(raw.sections)
    ? Object.fromEntries(
        Object.entries(raw.sections).map(([k, v]) => [k, str(v)]),
      )
    : {};
  const slides = Array.isArray(raw.slides)
    ? raw.slides.filter(isRecord).map((s) => ({
        id: str(s.id) || newId(),
        sectionId: typeof s.sectionId === "string" ? s.sectionId : null,
        title: str(s.title),
        bullets: Array.isArray(s.bullets) ? s.bullets.map(str) : [],
        notes: str(s.notes),
      }))
    : [];
  return {
    version: 1,
    typeId,
    topic: str(raw.topic),
    audience: str(raw.audience),
    sections,
    slides,
  };
};
