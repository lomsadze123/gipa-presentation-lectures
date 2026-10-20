import { lectures } from "../data/lectures";
import { useProgress } from "../hooks/useProgress";

/** "1 of 8 completed" with one bar segment per lecture. */
const ProgressMeter = () => {
  const { isCompleted, completed } = useProgress();
  const done = lectures.filter((l) => completed.includes(l.id)).length;

  return (
    <div className="w-44">
      <p className="text-xs text-navy-300">
        {done} of {lectures.length} completed
      </p>
      <div className="mt-1.5 flex gap-0.5" aria-hidden="true">
        {lectures.map((l) => (
          <span
            key={l.id}
            className={`h-1.5 flex-1 rounded-full ${
              isCompleted(l.id) ? "bg-accent-500" : "bg-navy-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressMeter;
