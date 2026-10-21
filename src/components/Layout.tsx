import { useState } from "react";
// BUILDER-HIDDEN: add NavLink back when the Builder link is uncommented.
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProgressMeter from "./ProgressMeter";
// BUILDER-HIDDEN: add PencilIcon back when the Builder link is uncommented.
import { MenuIcon } from "./Icons";
import { course } from "../data/course";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 bg-navy-900 px-3 text-white sm:gap-3 sm:px-6 print:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open lecture list"
          aria-expanded={sidebarOpen}
          aria-controls="sidebar"
          className="-ml-1.5 flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-navy-100 hover:bg-navy-800"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="hidden text-sm font-semibold sm:inline">Lectures</span>
        </button>
        <Link to="/" className="flex min-w-0 items-baseline gap-2.5">
          <span className="text-lg font-extrabold tracking-tight">
            {course.institution}
          </span>
          <span className="hidden truncate text-sm text-navy-300 sm:inline">{course.brand}</span>
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-5">
          {/* BUILDER-HIDDEN: link hidden until the builder is approved; /builder route still works. Uncomment to show it.
          <NavLink
            to="/builder"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-1.5 sm:px-3.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-px active:translate-y-0 ${
                isActive
                  ? "border-accent-500 bg-accent-500 shadow-[0_4px_14px_-2px_rgba(71,118,253,0.6)]"
                  : "border-navy-700 bg-navy-800 shadow-[0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-accent-500 hover:bg-accent-500 hover:shadow-[0_6px_18px_-4px_rgba(71,118,253,0.65)]"
              }`
            }
          >
            <PencilIcon className="h-4 w-4" />
            Builder
          </NavLink>
          */}
          <div className="hidden md:block">
            <ProgressMeter />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
