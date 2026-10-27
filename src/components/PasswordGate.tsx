import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { LectureInfo } from "../data/lectures";
import { siteTitle } from "../data/course";
import { sha256, useUnlocked } from "../hooks/useUnlocked";
import { LockIcon } from "./Icons";

/** Lock screen with a password modal on top. The right password unlocks the lecture in this browser. */
const PasswordGate = ({ lecture }: { lecture: LectureInfo }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { key } = useLocation();
  const { unlock } = useUnlocked();
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Lecture ${lecture.id} — ${siteTitle}`;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, [lecture.id]);

  // Esc, Cancel and a click outside all close the dialog: go back where the student came from.
  const leave = () => (key === "default" ? navigate("/") : navigate(-1));

  const submit = async () => {
    const typed = value.trim();
    if (!typed || checking) return;
    setChecking(true);
    const ok = (await sha256(typed)) === lecture.passwordHash;
    setChecking(false);
    if (ok) {
      unlock(lecture.id);
    } else {
      setWrong(true);
      inputRef.current?.select();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-8">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-navy-300 text-navy-400">
        <LockIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-navy-900">
        Lecture {lecture.id} needs a password
      </h1>
      <p className="mt-3 text-muted">Your lecturer gives it out in class.</p>

      <dialog
        ref={dialogRef}
        onClose={leave}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        aria-labelledby="password-title"
        className="m-auto w-[min(24rem,calc(100vw-2rem))] max-w-none rounded-2xl bg-white p-0 text-left text-ink shadow-2xl outline-none backdrop:bg-navy-950/60"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="p-6"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 text-accent-600">
            <LockIcon className="h-5 w-5" />
          </span>
          <h2
            id="password-title"
            className="mt-4 text-xl font-bold text-navy-900"
          >
            Lecture {lecture.id} is locked
          </h2>
          <p className="mt-1 text-sm text-muted">
            Enter the password to open “{lecture.title}”.
          </p>

          <label
            htmlFor="lecture-password"
            className="mt-5 block text-sm font-semibold text-navy-900"
          >
            Password
          </label>
          <input
            ref={inputRef}
            id="lecture-password"
            type="password"
            autoFocus
            autoComplete="off"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setWrong(false);
            }}
            aria-invalid={wrong}
            aria-describedby="password-error"
            className={`mt-1.5 w-full rounded-lg border px-3 py-2.5 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 ${
              wrong ? "border-rose-600" : "border-line"
            }`}
          />
          <p
            id="password-error"
            aria-live="polite"
            className="mt-1.5 min-h-5 text-sm font-semibold text-rose-600"
          >
            {wrong && "Wrong password. Try again."}
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="cursor-pointer rounded-lg px-4 py-2.5 font-semibold text-muted hover:bg-panel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!value.trim() || checking}
              className="cursor-pointer rounded-lg bg-accent-500 px-5 py-2.5 font-semibold text-white hover:bg-accent-600 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-accent-500"
            >
              Unlock
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default PasswordGate;
