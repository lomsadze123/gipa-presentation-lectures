import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { lectures } from "../data/lectures";
import LockedLecture from "./LockedLecture";
import NotFound from "./NotFound";

const lectureModules = import.meta.glob("../lectures/lecture-*/index.tsx");

const lazyLectures: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {};
for (const [path, loader] of Object.entries(lectureModules)) {
  const match = path.match(/lecture-(\d+)/);
  if (match) {
    lazyLectures[match[1]] = lazy(
      loader as () => Promise<{ default: React.ComponentType }>,
    );
  }
}

const LecturePage = () => {
  const { id } = useParams<{ id: string }>();
  const lecture = id ? lectures.find((l) => l.id === id) : undefined;

  if (!lecture) return <NotFound />;
  if (lecture.status === "locked") return <LockedLecture lecture={lecture} />;

  const LectureComponent = lazyLectures[lecture.id];
  if (!LectureComponent) return <NotFound />;

  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center font-display text-muted">
          Loading lecture…
        </div>
      }
    >
      <LectureComponent key={lecture.id} />
    </Suspense>
  );
};

export default LecturePage;
