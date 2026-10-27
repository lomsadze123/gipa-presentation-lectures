import { useState } from "react";

const choices = [
  { id: "include", label: "Include", on: "bg-mint-600 text-white" },
  { id: "shorten", label: "Shorten", on: "bg-type-orange text-white" },
  { id: "leave", label: "Leave out", on: "bg-rose-600 text-white" },
] as const;

type Choice = (typeof choices)[number]["id"];

interface SortChallengeProps {
  /** Unique key so choices are remembered in this browser. */
  storageKey: string;
  facts: string[];
}

const load = (key: string): (Choice | null)[] => {
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.map((x) => (choices.some((c) => c.id === x) ? (x as Choice) : null))
      : [];
  } catch {
    return [];
  }
};

/** Students decide, fact by fact, what belongs in their presentation. There is no single right answer. */
const SortChallenge = ({ storageKey, facts }: SortChallengeProps) => {
  const key = `gipa-presentation:sort:${storageKey}`;
  const [picked, setPicked] = useState<(Choice | null)[]>(() => load(key));

  const save = (next: (Choice | null)[]) => {
    setPicked(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Storage unavailable: choices last for this visit only.
    }
  };

  const choose = (i: number, c: Choice) =>
    save(facts.map((_, j) => (j === i ? (picked[j] === c ? null : c) : (picked[j] ?? null))));

  const count = (c: Choice) => facts.filter((_, i) => picked[i] === c).length;
  const sorted = facts.filter((_, i) => picked[i]).length;

  return (
    <div className="my-6 rounded-xl border border-line bg-white">
      <ol className="m-0 max-w-none list-none divide-y divide-line p-0">
        {facts.map((fact, i) => (
          <li
            key={fact}
            className="m-0 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center"
          >
            <span className="flex flex-1 gap-3">
              <span className="w-6 shrink-0 text-right font-display font-bold text-accent-500 tabular-nums">
                {i + 1}.
              </span>
              <span className="text-[0.98rem] leading-snug">{fact}</span>
            </span>
            <span
              role="group"
              aria-label={`Decision for fact ${i + 1}`}
              className="ml-9 flex shrink-0 overflow-hidden rounded-lg border border-line sm:ml-0"
            >
              {choices.map((c) => {
                const on = picked[i] === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => choose(i, c.id)}
                    aria-pressed={on}
                    className={`cursor-pointer px-3 py-1.5 font-display text-xs font-semibold transition-colors border-l border-line first:border-l-0 ${
                      on ? c.on : "bg-white text-navy-900 hover:bg-panel"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </span>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-panel px-4 py-3">
        <p className="m-0 font-display text-sm text-navy-900" aria-live="polite">
          {sorted} of {facts.length} sorted
          {sorted > 0 &&
            ` · ${choices.map((c) => `${c.label} ${count(c.id)}`).join(" · ")}`}
        </p>
        {sorted > 0 && (
          <button
            onClick={() => save([])}
            className="cursor-pointer rounded-full px-3 py-1.5 font-display text-sm font-semibold text-muted hover:bg-navy-100"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default SortChallenge;
