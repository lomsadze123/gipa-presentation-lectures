import { useEffect, useState } from "react";

interface ChoicePickerProps {
  /** Unique key so picks are remembered in this browser. */
  storageKey: string;
  items: string[];
  options: string[];
}

const load = (key: string, options: string[]): (string | null)[] => {
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.map((x) => (typeof x === "string" && options.includes(x) ? x : null))
      : [];
  } catch {
    return [];
  }
};

/** Students pick one option per item. Picks are saved, never graded: the discussion is the point. */
const ChoicePicker = ({ storageKey, items, options }: ChoicePickerProps) => {
  const key = `gipa-presentation:pick:${storageKey}`;
  const [picked, setPicked] = useState<(string | null)[]>(() => load(key, options));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(picked));
    } catch {
      // Storage unavailable: picks last for this visit only.
    }
  }, [key, picked]);

  const choose = (i: number, option: string) =>
    setPicked((prev) =>
      items.map((_, j) => (j === i ? (prev[j] === option ? null : option) : (prev[j] ?? null))),
    );

  const answered = items.filter((_, i) => picked[i]).length;

  return (
    <div className="my-6 rounded-xl border border-line bg-white">
      <ol className="m-0 max-w-none list-none divide-y divide-line p-0">
        {items.map((item, i) => (
          <li key={item} className="m-0 px-4 py-4">
            <span className="flex gap-3">
              <span className="w-6 shrink-0 text-right font-display font-bold text-accent-500 tabular-nums">
                {i + 1}.
              </span>
              <span className="text-[0.98rem] leading-snug">{item}</span>
            </span>
            <span
              role="group"
              aria-label={`Choice for item ${i + 1}`}
              className="mt-3 ml-9 flex flex-wrap gap-1.5"
            >
              {options.map((option) => {
                const on = picked[i] === option;
                return (
                  <button
                    key={option}
                    onClick={() => choose(i, option)}
                    aria-pressed={on}
                    className={`cursor-pointer rounded-full border px-2.5 py-1.5 font-display text-xs font-semibold transition-colors ${
                      on
                        ? "border-accent-500 bg-accent-500 text-white"
                        : "border-line bg-white text-navy-900 hover:border-accent-500 hover:bg-accent-50"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </span>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-panel px-4 py-3">
        <p className="m-0 font-display text-sm text-navy-900" aria-live="polite">
          {answered} of {items.length} answered
        </p>
        {answered > 0 && (
          <button
            onClick={() => setPicked([])}
            className="cursor-pointer rounded-full px-3 py-1.5 font-display text-sm font-semibold text-muted hover:bg-navy-100"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ChoicePicker;
