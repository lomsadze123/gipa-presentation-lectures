import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";

interface Case {
  id: string;
  /** Short tab label, e.g. "Case A: Apple". */
  label: string;
  /** Full case name shown under the label. */
  title: string;
  content: ReactNode;
}

interface CaseSwitchProps {
  /** Unique key so the chosen case is remembered in this browser. */
  storageKey: string;
  cases: Case[];
}

const load = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/** Alternative cases as tabs. A team picks one; the choice is remembered in this browser. */
const CaseSwitch = ({ storageKey, cases }: CaseSwitchProps) => {
  const key = `gipa-presentation:case:${storageKey}`;
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeId, setActiveId] = useState(() => {
    const saved = load(key);
    return cases.some((c) => c.id === saved) ? saved! : cases[0].id;
  });
  const active = cases.find((c) => c.id === activeId) ?? cases[0];

  const select = (id: string) => {
    setActiveId(id);
    try {
      localStorage.setItem(key, id);
    } catch {
      // Storage unavailable: the choice lasts for this visit only.
    }
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const nextIndex = (index + step + cases.length) % cases.length;
    select(cases[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="my-6">
      <div
        role="tablist"
        aria-label="Choose your case"
        className="grid gap-3 sm:grid-cols-2"
      >
        {cases.map((c, i) => {
          const selected = c.id === active.id;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(c.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`cursor-pointer rounded-xl border-2 p-4 text-left transition-colors ${
                selected
                  ? "border-accent-500 bg-accent-50"
                  : "border-line bg-white hover:border-accent-500/50"
              }`}
            >
              <span
                className={`block font-display text-sm font-bold ${
                  selected ? "text-accent-600" : "text-muted"
                }`}
              >
                {c.label}
              </span>
              <span className="mt-1 block font-display text-lg font-bold leading-tight text-navy-900">
                {c.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="mt-6"
      >
        {active.content}
      </div>
    </div>
  );
};

export default CaseSwitch;
