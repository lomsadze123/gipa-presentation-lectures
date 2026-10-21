import { CheckIcon } from "../../components/Icons";
import { type Step, steps } from "./ui";

interface StepperProps {
  current: Step;
  /** Steps that have nothing left to fix. */
  done: Partial<Record<Step, boolean>>;
  /** Only setup is reachable until a presentation type is chosen. */
  locked: boolean;
  onSelect: (step: Step) => void;
}

const Stepper = ({ current, done, locked, onSelect }: StepperProps) => (
  <nav aria-label="Builder steps" className="-mx-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <ol className="flex w-max gap-1 sm:gap-2">
      {steps.map((s, i) => {
        const active = s.id === current;
        const disabled = locked && s.id !== "setup";
        const finished = !disabled && done[s.id];
        return (
          <li key={s.id}>
            <button
              onClick={() => onSelect(s.id)}
              disabled={disabled}
              aria-current={active ? "step" : undefined}
              aria-label={s.label}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-1.5 py-1.5 sm:px-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                active ? "bg-white pr-3 text-navy-900" : "text-navy-100 hover:bg-navy-800"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  active ? "bg-accent-500 text-white" : finished ? "bg-mint-600 text-white" : "border border-navy-700"
                }`}
              >
                {finished && !active ? <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              {/* Phones: only the current step shows its name, so all five fit. */}
              <span className={active ? "" : "hidden sm:inline"} aria-hidden="true">
                {s.label}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Stepper;
