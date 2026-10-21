import { getTemplate } from "../templates";
import type { Draft } from "../types";
import SlidePreview from "./SlidePreview";

/** Hidden on screen; the only thing printed from the builder page. */
const PrintDeck = ({ draft }: { draft: Draft }) => {
  const subtitle = [getTemplate(draft.typeId)?.name, draft.audience].filter(Boolean).join(" · ");
  return (
    <div className="hidden print:block">
      {draft.slides.map((s, i) => (
        <section key={s.id} className="print-slide">
          <SlidePreview slide={s} subtitle={subtitle} />
          {s.notes.trim() && (
            <p className="mt-4 text-sm text-ink">
              <strong>Notes:</strong> {s.notes}
            </p>
          )}
          <p className="mt-2 text-xs text-muted">Slide {i + 1} of {draft.slides.length}</p>
        </section>
      ))}
    </div>
  );
};

export default PrintDeck;
