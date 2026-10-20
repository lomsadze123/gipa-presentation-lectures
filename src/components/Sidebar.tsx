import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { lectures } from "../data/lectures";
import { course } from "../data/course";
import { useProgress } from "../hooks/useProgress";
import NumberBadge from "./NumberBadge";
import { CloseIcon } from "./Icons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { isCompleted } = useProgress();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-panel transition-transform duration-200 lg:sticky lg:top-14 lg:z-0 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <p className="text-xs font-semibold text-muted">
            {course.name} lectures
          </p>
          <button
            onClick={onClose}
            aria-label="Close lecture list"
            className="cursor-pointer rounded-md p-1 text-muted hover:bg-navy-100 lg:hidden"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label="Lectures">
          <ol className="space-y-0.5">
            {lectures.map((l) =>
              l.status === "open" ? (
                <li key={l.id}>
                  <NavLink
                    to={`/lectures/${l.id}`}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                        isActive ? "bg-navy-100" : "hover:bg-navy-100/60"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <NumberBadge
                          number={l.id}
                          state={isActive ? "active" : "open"}
                          completed={isCompleted(l.id)}
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-navy-900">
                            {l.title}
                          </span>
                          <span className="block text-xs text-muted">
                            Lecture {l.id}
                          </span>
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ) : (
                <li
                  key={l.id}
                  aria-disabled="true"
                  title="This lecture opens later"
                  className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5"
                >
                  <NumberBadge number={l.id} state="locked" />
                  <span>
                    <span className="block text-sm font-semibold text-navy-400">
                      Lecture {l.id}
                    </span>
                    <span className="block text-xs text-navy-400">
                      Opens later
                    </span>
                  </span>
                </li>
              ),
            )}
          </ol>
        </nav>

        <p className="border-t border-line px-5 py-4 text-xs text-muted">
          {course.institution}, {course.faculty}
        </p>
      </aside>
    </>
  );
};

export default Sidebar;
