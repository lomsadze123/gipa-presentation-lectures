import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, ResetIcon } from "../Icons";
import { formatTime, withTimeline } from "./timing";

interface Stage {
  name: string;
  seconds: number;
}

interface PracticeTimerProps {
  stages: Stage[];
}

/** Rehearsal timer: counts down the whole talk and shows which part you should be on. */
const PracticeTimer = ({ stages }: PracticeTimerProps) => {
  const total = stages.reduce((sum, s) => sum + s.seconds, 0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const startedAt = useRef<number | null>(null);
  const base = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedAt.current = performance.now();
    const id = window.setInterval(() => {
      const now = base.current + (performance.now() - startedAt.current!) / 1000;
      if (now >= total) {
        setElapsed(total);
        setRunning(false);
      } else {
        setElapsed(now);
      }
    }, 100);
    return () => {
      base.current += (performance.now() - startedAt.current!) / 1000;
      window.clearInterval(id);
    };
  }, [running, total]);

  const reset = () => {
    setRunning(false);
    base.current = 0;
    setElapsed(0);
  };

  const toggle = () => {
    if (elapsed >= total) {
      base.current = 0;
      setElapsed(0);
    }
    setRunning((r) => !r);
  };

  const bounds = withTimeline(stages);
  const activeIndex = bounds.findIndex((b) => elapsed < b.to);
  const finished = elapsed >= total;
  const remaining = Math.ceil(total - elapsed);

  return (
    <div className="my-8 rounded-2xl bg-navy-900 p-5 text-white sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-sm text-navy-300">
            Practice timer
          </p>
          <p
            className="font-display text-6xl font-extrabold tabular-nums leading-none sm:text-7xl"
            aria-live="off"
          >
            {formatTime(remaining)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggle}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 font-display font-bold text-navy-900 hover:bg-accent-600"
          >
            {running ? (
              <>
                <PauseIcon className="h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4" />
                {elapsed > 0 && !finished ? "Resume" : "Start"}
              </>
            )}
          </button>
          <button
            onClick={reset}
            aria-label="Reset timer"
            className="cursor-pointer rounded-full border border-navy-700 p-2.5 text-navy-100 hover:bg-navy-800"
          >
            <ResetIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-5 font-display text-lg" aria-live="polite">
        {finished
          ? "Time is up. Did you finish with your call to action?"
          : running || elapsed > 0
            ? `Now: ${bounds[activeIndex]?.name}`
            : "Press start and give your presentation out loud."}
      </p>

      <ol className="m-0 mt-4 flex max-w-none list-none gap-1 p-0">
        {bounds.map((b, i) => {
          const fill = Math.min(1, Math.max(0, (elapsed - b.from) / b.seconds));
          const active = i === activeIndex && !finished && elapsed > 0;
          return (
            <li
              key={b.name}
              style={{ flexGrow: b.seconds }}
              className="m-0 min-w-0 basis-0 p-0"
            >
              <div className="h-2 overflow-hidden rounded-full bg-navy-800">
                <div
                  className="h-full bg-accent-500"
                  style={{ width: `${fill * 100}%` }}
                />
              </div>
              <p
                className={`mb-0 mt-2 truncate font-display text-xs ${
                  active ? "font-bold text-white" : "text-navy-300"
                }`}
                title={`${b.name}, about ${b.seconds} seconds`}
              >
                {b.name}
                <span className="hidden sm:inline"> · {b.seconds}s</span>
              </p>
            </li>
          );
        })}
      </ol>
      <p className="mb-0 mt-4 text-sm text-navy-300">
        The split per part is only a suggestion. What matters is finishing within{" "}
        {total} seconds.
      </p>
    </div>
  );
};

export default PracticeTimer;
