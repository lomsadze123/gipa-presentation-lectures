import { type ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { homework } from "../data/homework";
import { siteTitle } from "../data/course";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";

interface HomeworkWrapperProps {
  /** Must match an id in src/data/homework.ts */
  id: string;
  /** Optional block shown right under the title band (e.g. key numbers). */
  intro?: ReactNode;
  children: ReactNode;
}

const HomeworkWrapper = ({ id, intro, children }: HomeworkWrapperProps) => {
  const index = homework.findIndex((h) => h.id === id);
  const item = homework[index];
  const prev = index > 0 ? homework[index - 1] : undefined;
  const next = index < homework.length - 1 ? homework[index + 1] : undefined;
  const { hash } = useLocation();

  useEffect(() => {
    // Links like /homework/01#rules land on that part once the page has loaded.
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    if (item) document.title = `Homework ${id}. ${item.title} — ${siteTitle}`;
  }, [id, item, hash]);

  if (!item) return null;

  return (
    <article>
      {/* Title band */}
      <header className="relative overflow-hidden bg-navy-900 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-14">
          <p className="flex items-center gap-3 text-sm text-navy-300">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
              {item.id}
            </span>
            Homework {item.id} of {String(homework.length).padStart(2, "0")}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-navy-300">{item.tagline}</p>
          {item.tags && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
              {item.tags.map((t) => (
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

        <nav
          className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
          aria-label="Homework navigation"
        >
          {prev && prev.status === "open" ? (
            <Link
              to={`/homework/${prev.id}`}
              className="flex flex-col rounded-xl border border-line p-4 hover:border-accent-500"
            >
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <ArrowLeftIcon className="h-4 w-4" /> Previous
              </span>
              <span className="mt-1 font-semibold text-navy-900">
                Homework {prev.id}. {prev.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next && next.status === "open" && (
            <Link
              to={`/homework/${next.id}`}
              className="flex flex-col items-end rounded-xl bg-accent-500 p-4 text-right text-white hover:bg-accent-600"
            >
              <span className="flex items-center gap-1.5 text-sm text-accent-100">
                Next <ArrowRightIcon className="h-4 w-4" />
              </span>
              <span className="mt-1 font-semibold">
                Homework {next.id}. {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
};

export default HomeworkWrapper;
