/** Adds `from` / `to` second offsets to consecutive timed parts. */
export const withTimeline = <T extends { seconds: number }>(parts: T[]) =>
  parts.reduce<(T & { from: number; to: number })[]>((out, p) => {
    const from = out.length ? out[out.length - 1].to : 0;
    out.push({ ...p, from, to: from + p.seconds });
    return out;
  }, []);

/** 75 → "1:15" */
export const formatTime = (s: number) => {
  const total = Math.max(0, Math.round(s));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};
