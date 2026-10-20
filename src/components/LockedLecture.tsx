import { useEffect } from "react";
import { Link } from "react-router-dom";
import { type LectureInfo, openLectures } from "../data/lectures";
import { siteTitle } from "../data/course";
import { LockIcon } from "./Icons";

const LockedLecture = ({ lecture }: { lecture: LectureInfo }) => {
  const latest = openLectures[openLectures.length - 1];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Lecture ${lecture.id} — ${siteTitle}`;
  }, [lecture.id]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-8">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-navy-300 text-navy-400">
        <LockIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-navy-900">
        Lecture {lecture.id} is not open yet
      </h1>
      <p className="mt-3 text-muted">
        It opens after the previous class. Until then, review the lectures
        that are already open.
      </p>
      {latest && (
        <Link
          to={`/lectures/${latest.id}`}
          className="mt-8 inline-flex rounded-lg bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600"
        >
          Go to lecture {latest.id}: {latest.title}
        </Link>
      )}
    </div>
  );
};

export default LockedLecture;
