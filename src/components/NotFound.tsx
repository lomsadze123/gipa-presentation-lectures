import { useEffect } from "react";
import { Link } from "react-router-dom";
import { siteTitle } from "../data/course";

const NotFound = () => {
  useEffect(() => {
    document.title = `Page not found — ${siteTitle}`;
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-8">
      <p className="text-7xl font-extrabold text-navy-100">404</p>
      <h1 className="mt-4 text-3xl font-bold text-navy-900">
        This page does not exist
      </h1>
      <p className="mt-3 text-muted">
        The link may be wrong or the page was moved. Start again from the
        lecture list.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-lg bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600"
      >
        Go to the lecture list
      </Link>
    </div>
  );
};

export default NotFound;
