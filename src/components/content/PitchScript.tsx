import type { ReactNode } from "react";
import { formatTime, withTimeline } from "./timing";

export interface PitchPart {
  name: string;
  seconds: number;
  script: ReactNode;
}

const bandColours = [
  "bg-type-blue",
  "bg-type-purple",
  "bg-type-green",
  "bg-type-orange",
  "bg-type-pink",
  "bg-type-teal",
];

/** A spoken script split into timed parts, with a timeline showing how long each part takes. */
const PitchScript = ({ parts }: { parts: PitchPart[] }) => {
  const total = parts.reduce((sum, p) => sum + p.seconds, 0);
  const timed = withTimeline(parts);

  return (
    <div className="my-6">
      <div
        className="flex h-10 overflow-hidden rounded-lg"
        role="img"
        aria-label={`Timeline: ${parts.map((p) => `${p.name} ${p.seconds} seconds`).join(", ")}. Total ${total} seconds.`}
      >
        {timed.map((p, i) => (
          <a
            key={p.name}
            href={`#pitch-${i}`}
            style={{ flexGrow: p.seconds }}
            className={`flex min-w-0 basis-0 items-center justify-center font-display text-xs font-semibold ${bandColours[i % bandColours.length]} text-white`}
            title={`${p.name}: ${p.seconds}s`}
          >
            <span className="truncate px-1">{p.seconds}s</span>
          </a>
        ))}
      </div>
      <p className="mt-2 text-right font-display text-sm text-muted">
        Total {formatTime(total)}
      </p>

      <ol className="m-0 mt-4 max-w-none list-none space-y-3 p-0">
        {timed.map((p, i) => (
          <li
            key={p.name}
            id={`pitch-${i}`}
            className="m-0 scroll-mt-24 rounded-xl border border-line bg-white p-0"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
              <span className="flex items-center gap-2.5 font-display font-bold text-navy-900">
                <span
                  className={`h-3 w-3 rounded-sm ${bandColours[i % bandColours.length]}`}
                />
                {i + 1}. {p.name}
              </span>
              <span className="font-display text-sm tabular-nums text-muted">
                {formatTime(p.from)}–{formatTime(p.to)}
              </span>
            </div>
            <div className="px-5 pb-1 pt-4 [&>p]:max-w-none">{p.script}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PitchScript;
