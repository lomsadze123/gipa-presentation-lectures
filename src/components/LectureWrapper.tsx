import { type ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { lectures } from "../data/lectures";
import { siteTitle } from "../data/course";
import { useProgress } from "../hooks/useProgress";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, LockIcon } from "./Icons";

interface LectureWrapperProps {
  /** Must match an id in src/data/lectures.ts */
  id: string;
  /** Optional block shown right under the title band (e.g. a roadmap). */
  intro?: ReactNode;
  children: ReactNode;
}

const LectureWrapper = ({ id, intro, children }: LectureWrapperProps) => {
  const index = lectures.findIndex((l) => l.id === id);
  const lecture = lectures[index];
  const prev = index > 0 ? lectures[index - 1] : undefined;
  const next = index < lectures.length - 1 ? lectures[index + 1] : undefined;
  const { isCompleted, toggle } = useProgress();
  const done = isCompleted(id);
  const { hash } = useLocation();

  useEffect(() => {
    // Links like /lectures/01#bad-presentation land on that part once the lecture has loaded.
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    if (lecture) document.title = `${id}. ${lecture.title} — ${siteTitle}`;
  }, [id, lecture, hash]);

  if (!lecture) return null;

  return (
    <article>
      {/* Title band */}
      <header className="relative overflow-hidden bg-navy-900 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-14">
          <p className="flex items-center gap-3 text-sm text-navy-300">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
              {lecture.id}
            </span>
            Lecture {lecture.id} of {String(lectures.length).padStart(2, "0")}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {lecture.title}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-navy-300">
            {lecture.tagline}
          </p>
          {lecture.tags && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
              {lecture.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-sm text-navy-100"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-8">
        {intro}

        <div className="lecture-content">{children}</div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-xl border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-navy-900">
              {done ? "You finished this lecture" : "Finished reading?"}
            </p>
            <p className="text-sm text-muted">
              Your progress is saved in this browser only.
            </p>
          </div>
          <button
            onClick={() => toggle(id)}
            aria-pressed={done}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition-colors ${
              done
                ? "bg-mint-600 text-white hover:bg-mint-600/90"
                : "bg-accent-500 text-white hover:bg-accent-600"
            }`}
          >
            <CheckIcon className="h-4 w-4" strokeWidth={3} />
            {done ? "Completed" : "Mark as completed"}
          </button>
        </div>

        <nav
          className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
          aria-label="Lecture navigation"
        >
          {prev && prev.status === "open" ? (
            <Link
              to={`/lectures/${prev.id}`}
              className="flex flex-col rounded-xl border border-line p-4 hover:border-accent-500"
            >
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <ArrowLeftIcon className="h-4 w-4" /> Previous
              </span>
              <span className="mt-1 font-semibold text-navy-900">
                {prev.id}. {prev.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next &&
            (next.status === "open" ? (
              <Link
                to={`/lectures/${next.id}`}
                className="flex flex-col items-end rounded-xl bg-accent-500 p-4 text-right text-white hover:bg-accent-600"
              >
                <span className="flex items-center gap-1.5 text-sm text-accent-100">
                  Next <ArrowRightIcon className="h-4 w-4" />
                </span>
                <span className="mt-1 font-semibold">
                  {next.id}. {next.title}
                </span>
              </Link>
            ) : (
              <div
                aria-disabled="true"
                className="flex cursor-not-allowed flex-col items-end rounded-xl border border-dashed border-navy-300 bg-panel p-4 text-right text-navy-400"
              >
                <span className="flex items-center gap-1.5 text-sm">
                  Next <LockIcon className="h-4 w-4" />
                </span>
                <span className="mt-1 font-semibold">
                  Lecture {next.id} opens after class
                </span>
              </div>
            ))}
        </nav>
      </div>
    </article>
  );
};

export default LectureWrapper;
