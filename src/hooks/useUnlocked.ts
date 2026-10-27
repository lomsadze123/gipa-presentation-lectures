import { useCallback, useSyncExternalStore } from "react";
import type { LectureInfo } from "../data/lectures";

const KEY = "gipa-presentation:unlocked";
const EVENT = "gipa-unlocked-change";

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

/** SHA-256 hex digest, to compare a typed password with `LectureInfo.passwordHash`. */
export const sha256 = async (text: string) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/** Which password-protected lectures this browser has unlocked. Stored only in this browser. */
export const useUnlocked = () => {
  const unlocked = useSyncExternalStore(subscribe, () => cache);

  const unlock = useCallback((id: string) => {
    if (cache.includes(id)) return;
    cache = [...cache, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(cache));
    } catch {
      // Storage unavailable (private mode): stays unlocked for this session only.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return {
    unlock,
    /** True while the lecture has a password that has not been entered in this browser. */
    needsPassword: (lecture: LectureInfo) =>
      !!lecture.passwordHash && !unlocked.includes(lecture.id),
  };
};
