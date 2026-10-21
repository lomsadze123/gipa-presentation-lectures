export type TypeId =
  | "informative"
  | "persuasive"
  | "instructional"
  | "business"
  | "pitch"
  | "inspirational";

/** Extra content checks a section can opt into (see rules/outline.ts). */
export type SectionCheck = "hook" | "who" | "concrete" | "oneSentence" | "action";

export interface TemplateSection {
  id: string;
  name: string;
  /** Guiding question shown above the text field. */
  question: string;
  /** Why this part exists, in the lecture's words. */
  why: string;
  /** Model answer taken from the lecture example. */
  example: string;
  suggestedSeconds: number;
  minWords: number;
  maxWords: number;
  checks: SectionCheck[];
  learnMore: string;
}

export interface SlideLimits {
  titleWords: number;
  bullets: number;
  bulletWords: number;
  slideWords: number;
}

export interface Template {
  id: TypeId;
  name: string;
  purpose: string;
  keyQuestion: string;
  /** "soon" types are listed but cannot be picked yet. */
  status: "ready" | "soon";
  /** Maximum talk length in seconds. */
  timeLimit: number;
  sections: TemplateSection[];
  slideLimits: SlideLimits;
}

export interface Slide {
  id: string;
  /** Outline section this slide belongs to; null for the title slide. */
  sectionId: string | null;
  title: string;
  bullets: string[];
  notes: string;
}

export interface Draft {
  version: 1;
  typeId: TypeId | null;
  topic: string;
  audience: string;
  /** Outline text keyed by section id. */
  sections: Record<string, string>;
  slides: Slide[];
}

export type Stage = "setup" | "outline" | "slides";
export type Level = "error" | "warning" | "tip";

export interface Where {
  stage: Stage;
  sectionId?: string;
  slideId?: string;
  field?: "type" | "topic" | "audience" | "text" | "title" | "bullets" | "notes";
}

export interface Issue {
  ruleId: string;
  level: Level;
  where: Where;
  /** What is wrong. */
  message: string;
  /** Why it matters. */
  why: string;
  /** How to fix it. */
  fix: string;
  learnMore?: string;
}
