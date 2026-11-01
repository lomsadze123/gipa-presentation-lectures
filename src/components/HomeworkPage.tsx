import { Suspense, lazy, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { type HomeworkInfo, homework, openHomework } from "../data/homework";
import { siteTitle } from "../data/course";
import { LockIcon } from "./Icons";
import NotFound from "./NotFound";

const homeworkModules = import.meta.glob("../homework/homework-*/index.tsx");

const lazyHomework: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {};
for (const [path, loader] of Object.entries(homeworkModules)) {
  const match = path.match(/homework-(\d+)/);
  if (match) {
    lazyHomework[match[1]] = lazy(
      loader as () => Promise<{ default: React.ComponentType }>,
    );
  }
}

const LockedHomework = ({ item }: { item: HomeworkInfo }) => {
  const latest = openHomework[openHomework.length - 1];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Homework ${item.id} — ${siteTitle}`;
  }, [item.id]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-8">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-navy-300 text-navy-400">
        <LockIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-navy-900">
        Homework {item.id} is not open yet
      </h1>
      <p className="mt-3 text-muted">
        Your lecturer opens it later in the semester.
      </p>
      {latest && (
        <Link
          to={`/homework/${latest.id}`}
          className="mt-8 inline-flex rounded-lg bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600"
        >
          Go to homework {latest.id}: {latest.title}
        </Link>
      )}
    </div>
  );
};

const HomeworkPage = () => {
  const { id } = useParams<{ id: string }>();
  const item = id ? homework.find((h) => h.id === id) : undefined;

  if (!item) return <NotFound />;
  if (item.status === "locked") return <LockedHomework item={item} />;

  const HomeworkComponent = lazyHomework[item.id];
  if (!HomeworkComponent) return <NotFound />;

  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center font-display text-muted">
          Loading homework…
        </div>
      }
    >
      <HomeworkComponent key={item.id} />
    </Suspense>
  );
};

export default HomeworkPage;
