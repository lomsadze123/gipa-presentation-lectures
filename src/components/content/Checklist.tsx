import { useState } from "react";
import { CheckIcon } from "../Icons";

interface ChecklistProps {
  /** Unique key so ticks are remembered per checklist in this browser. */
  storageKey: string;
  items: string[];
}

const load = (key: string): boolean[] => {
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(Boolean) : [];
  } catch {
    return [];
  }
};

const Checklist = ({ storageKey, items }: ChecklistProps) => {
  const key = `gipa-presentation:checklist:${storageKey}`;
  const [checked, setChecked] = useState<boolean[]>(() => load(key));
  const doneCount = items.filter((_, i) => checked[i]).length;

  const toggle = (i: number) => {
    const next = items.map((_, j) => (j === i ? !checked[j] : !!checked[j]));
    setChecked(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Storage unavailable: ticks last for this visit only.
    }
  };

  return (
    <div className="my-6 max-w-[68ch] rounded-xl border border-line bg-white p-2">
      <ul className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li key={item} className="m-0 p-0">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-panel">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => toggle(i)}
                className="peer sr-only"
              />
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500 ${
                  checked[i]
                    ? "border-mint-600 bg-mint-600 text-white"
                    : "border-navy-300 bg-white"
                }`}
              >
                {checked[i] && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span className={checked[i] ? "text-muted line-through" : ""}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="m-0 border-t border-line px-3 pb-1 pt-3 font-display text-sm text-muted">
        {doneCount === items.length
          ? "All checked. You are ready to present."
          : `${doneCount} of ${items.length} checked`}
      </p>
    </div>
  );
};

export default Checklist;
