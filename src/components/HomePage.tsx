import { useEffect } from "react";
import { Link } from "react-router-dom";
import { course, siteTitle } from "../data/course";
import { lectures } from "../data/lectures";
import { useProgress } from "../hooks/useProgress";
import { useUnlocked } from "../hooks/useUnlocked";
// BUILDER-HIDDEN: add PencilIcon back when the Builder card is uncommented.
import { ArrowRightIcon, CheckIcon, LockIcon } from "./Icons";

const HomePage = () => {
  const { isCompleted } = useProgress();
  const { needsPassword } = useUnlocked();
  const firstOpen = lectures.find((l) => l.status === "open");

  useEffect(() => {
    document.title = siteTitle;
  }, []);

  const stats = [
    { value: course.stats.lectures, label: "lectures" },
    { value: course.stats.assignments, label: "assignments" },
    { value: course.stats.midterms, label: "midterm exam" },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-navy-700 bg-navy-800 px-3 py-1 text-sm text-navy-100">
            <span className="font-bold text-white">{course.institution}</span>
            {course.faculty}, {course.semester}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            {course.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-300">
            {course.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {stats.map((s) => (
              <li
                key={s.label}
                className="rounded-xl border border-navy-700 bg-navy-800 px-4 py-2.5 text-sm text-navy-100"
              >
                <span className="mr-1.5 text-xl font-bold text-white">
                  {s.value}
                </span>
                {s.label}
              </li>
            ))}
          </ul>

          {firstOpen && (
            <Link
              to={`/lectures/${firstOpen.id}`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Start lecture {firstOpen.id}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>

      <section
        className="mx-auto max-w-5xl px-4 py-12 sm:px-8"
        aria-labelledby="lectures-heading"
      >
        <h2
          id="lectures-heading"
          className="flex items-center gap-3 text-2xl font-bold text-navy-900"
        >
          Lectures
        </h2>
        <p className="mt-1 text-muted">A new lecture opens after each class.</p>

        <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lectures.map((l) =>
            l.status === "open" ? (
              <li key={l.id}>
                <Link
                  to={`/lectures/${l.id}`}
                  className="flex h-full min-h-36 flex-col rounded-xl border border-line bg-white p-5 transition-colors hover:border-accent-500"
                >
                  <span className="flex items-center justify-between">
                    {needsPassword(l) ? (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-navy-300 text-navy-400">
                        <LockIcon className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                        {l.id}
                      </span>
                    )}
                    {isCompleted(l.id) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-2 py-0.5 text-xs font-semibold text-mint-600">
                        <CheckIcon className="h-3 w-3" strokeWidth={3} />
                        Done
                      </span>
                    )}
                  </span>
                  <span className="mt-auto pt-4 text-lg font-bold leading-tight text-navy-900">
                    {l.title}
                  </span>
                  <span className="mt-1 text-sm text-muted">
                    {needsPassword(l)
                      ? `Lecture ${l.id} · Password required`
                      : `Lecture ${l.id}`}
                  </span>
                </Link>
              </li>
            ) : (
              <li
                key={l.id}
                aria-disabled="true"
                className="flex min-h-36 flex-col rounded-xl border border-dashed border-navy-300 bg-panel p-5 text-navy-400"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-navy-300">
                  <LockIcon className="h-3.5 w-3.5" />
                </span>
                <span className="mt-auto pt-4 font-semibold">Lecture {l.id}</span>
                <span className="mt-1 text-sm">Opens later</span>
              </li>
            ),
          )}
        </ol>

        {/* BUILDER-HIDDEN: link hidden until the builder is approved; /builder route still works. Uncomment to show it.
        <Link
          to="/builder"
          className="mt-10 flex flex-col gap-4 rounded-xl border border-accent-500/30 bg-accent-50 p-6 transition-colors hover:border-accent-500 sm:flex-row sm:items-center"
        >
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
            <PencilIcon className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold text-navy-900">Practice: build your own presentation</span>
            <span className="block text-muted">
              Pick a type, write each part, turn it into slides. A checker explains what to fix and why.
            </span>
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-accent-600">
            Open the builder <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
        */}
      </section>
    </div>
  );
};

export default HomePage;
