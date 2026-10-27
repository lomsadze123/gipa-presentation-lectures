import { ArrowRightIcon, ResetIcon } from "../Icons";

/** Steps that repeat: shown as a flow with a loop back to the start. */
const LearningCycle = ({ steps }: { steps: string[] }) => (
  <figure className="my-8 rounded-2xl bg-navy-900 p-5 text-white sm:p-7">
    <ol className="m-0 flex max-w-none list-none flex-wrap items-center gap-2 p-0">
      {steps.map((step, i) => (
        <li key={step} className="m-0 flex items-center gap-2 p-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-800 py-1.5 pl-1.5 pr-4 font-display text-sm font-semibold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-xs font-bold">
              {i + 1}
            </span>
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-navy-300" />
          )}
        </li>
      ))}
    </ol>
    <figcaption className="mt-4 flex items-center gap-2 font-display text-sm text-navy-300">
      <ResetIcon className="h-4 w-4 shrink-0" />
      Then start again. Every round makes the next presentation better.
    </figcaption>
  </figure>
);

export default LearningCycle;
