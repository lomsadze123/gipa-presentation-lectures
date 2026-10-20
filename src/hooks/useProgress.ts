import { useCallback, useSyncExternalStore } from "react";

const KEY = "gipa-presentation:completed";
const EVENT = "gipa-progress-change";

const read = (): string[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
};

// In-memory copy is the source of truth for this tab; storage only persists it.
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

/** Which lectures the student marked as completed. Stored only in this browser. */
export const useProgress = () => {
  const completed = useSyncExternalStore(subscribe, () => cache);

  const toggle = useCallback((id: string) => {
    cache = cache.includes(id)
      ? cache.filter((x) => x !== id)
      : [...cache, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(cache));
    } catch {
      // Storage unavailable (private mode): keep the change for this session only.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return {
    completed,
    isCompleted: (id: string) => completed.includes(id),
    toggle,
  };
};
