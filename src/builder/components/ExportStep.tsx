import { type ChangeEvent, useRef, useState } from "react";
import Callout from "../../components/content/Callout";
import { DownloadIcon, ResetIcon, ScreenIcon, UploadIcon } from "../../components/Icons";
import { download, fileName, toJson, toMarkdown } from "../export";
import type { Draft } from "../types";
import ConfirmButton from "./ConfirmButton";
import { secondaryButton } from "./ui";

interface ExportStepProps {
  draft: Draft;
  errors: number;
  onImport: (raw: unknown) => void;
  onReset: () => void;
}

const ExportStep = ({ draft, errors, onImport, onReset }: ExportStepProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState("");

  const readFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      onImport(JSON.parse(await file.text()));
      setImportError("");
    } catch {
      setImportError("This file is not a presentation saved from this page.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900">Save and export</h2>
      <p className="mt-1 max-w-[68ch] text-muted">
        Your work is saved automatically in this browser. Download a copy to hand it in, to move it to another computer,
        or just to be safe.
      </p>

      {errors > 0 && (
        <Callout type="warning" title="Not ready yet">
          <p>
            The checker still shows {errors} problem{errors === 1 ? "" : "s"} to fix. You can export anyway, but fix
            them before you present.
          </p>
        </Callout>
      )}

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-white p-4">
          <p className="font-bold text-navy-900">Document</p>
          <p className="mt-1 text-sm text-muted">Structure, slides and notes as a Markdown text file.</p>
          <button
            onClick={() => download(fileName(draft, "md"), toMarkdown(draft), "text/markdown")}
            className={`mt-3 ${secondaryButton}`}
          >
            <DownloadIcon className="h-4 w-4" /> Download .md
          </button>
        </li>
        <li className="rounded-xl border border-line bg-white p-4">
          <p className="font-bold text-navy-900">Slides as PDF</p>
          <p className="mt-1 text-sm text-muted">Opens the print dialog. Choose “Save as PDF”. One slide per page, with notes.</p>
          <button onClick={() => window.print()} disabled={!draft.slides.length} className={`mt-3 ${secondaryButton}`}>
            <ScreenIcon className="h-4 w-4" /> Print / Save as PDF
          </button>
        </li>
        <li className="rounded-xl border border-line bg-white p-4">
          <p className="font-bold text-navy-900">Backup file</p>
          <p className="mt-1 text-sm text-muted">Download your work, then open it later here or on another computer.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => download(fileName(draft, "json"), toJson(draft), "application/json")}
              className={secondaryButton}
            >
              <DownloadIcon className="h-4 w-4" /> Download
            </button>
            <button onClick={() => fileInput.current?.click()} className={secondaryButton}>
              <UploadIcon className="h-4 w-4" /> Open file
            </button>
            <input ref={fileInput} type="file" accept="application/json,.json" onChange={readFile} className="sr-only" tabIndex={-1} />
          </div>
          {importError && <p className="mt-2 text-sm font-semibold text-rose-600">{importError}</p>}
        </li>
        <li className="rounded-xl border border-line bg-white p-4">
          <p className="font-bold text-navy-900">Start over</p>
          <p className="mt-1 text-sm text-muted">Clears this presentation from the browser. Download a backup first.</p>
          <ConfirmButton onConfirm={onReset} confirmLabel="Click again to delete" className={`mt-3 ${secondaryButton}`}>
            <ResetIcon className="h-4 w-4" /> Start a new presentation
          </ConfirmButton>
        </li>
      </ul>
    </div>
  );
};

export default ExportStep;
