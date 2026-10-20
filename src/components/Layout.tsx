import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProgressMeter from "./ProgressMeter";
import { MenuIcon } from "./Icons";
import { course } from "../data/course";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-navy-900 px-4 text-white sm:px-6">
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
        <Link to="/" className="flex items-baseline gap-2.5">
          <span className="text-lg font-extrabold tracking-tight">
            {course.institution}
          </span>
          <span className="text-sm text-navy-300">{course.brand}</span>
        </Link>
        <div className="ml-auto hidden sm:block">
          <ProgressMeter />
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
