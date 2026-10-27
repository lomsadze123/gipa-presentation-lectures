interface OutlineSlide {
  title: string;
  points: string[];
}

/** A suggested deck, drawn as small slides with what each one should cover. */
const SlideOutline = ({ slides }: { slides: OutlineSlide[] }) => (
  <ol className="m-0 my-6 grid max-w-none list-none gap-4 p-0 sm:grid-cols-2">
    {slides.map((s, i) => (
      <li key={s.title} className="m-0 p-0">
        <div className="flex h-full min-h-44 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-navy-900 px-4 py-2.5">
            <span className="font-display text-xs font-bold text-accent-100">
              Slide {i + 1}
            </span>
            <span className="truncate font-display text-sm font-bold text-white">
              {s.title}
            </span>
          </div>
          <ul className="m-0 flex-1 list-disc space-y-1 py-3 pl-9 pr-4 text-[0.95rem] leading-snug">
            {s.points.map((p) => (
              <li key={p} className="m-0 p-0">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </li>
    ))}
  </ol>
);

export default SlideOutline;
