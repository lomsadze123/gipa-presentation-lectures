import { estimateSeconds } from "./rules/text";
import { getTemplate } from "./templates";
import type { Draft } from "./types";

export const toMarkdown = (draft: Draft) => {
  const template = getTemplate(draft.typeId);
  const lines = [`# ${draft.topic || "Untitled presentation"}`, ""];
  if (template) lines.push(`**Type:** ${template.name}  `);
  if (draft.audience) lines.push(`**Audience:** ${draft.audience}  `);
  lines.push("");

  if (template) {
    lines.push("## Structure", "");
    for (const s of template.sections) {
      const text = draft.sections[s.id]?.trim() ?? "";
      lines.push(`### ${s.name} (about ${estimateSeconds(text)}s)`, "", text || "_Not written yet._", "");
    }
  }

  if (draft.slides.length) {
    lines.push("## Slides", "");
    draft.slides.forEach((slide, i) => {
      lines.push(`### Slide ${i + 1}: ${slide.title || "Untitled"}`, "");
      for (const b of slide.bullets.filter((b) => b.trim())) lines.push(`- ${b.trim()}`);
      if (slide.notes.trim()) lines.push("", `> **Notes:** ${slide.notes.trim().replace(/\n+/g, " ")}`);
      lines.push("");
    });
  }

  return lines.join("\n");
};

export const toJson = (draft: Draft) => JSON.stringify(draft, null, 2);

export const fileName = (draft: Draft, ext: string) => {
  const slug = draft.topic
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${slug || "presentation"}.${ext}`;
};

export const download = (name: string, text: string, type: string) => {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};
