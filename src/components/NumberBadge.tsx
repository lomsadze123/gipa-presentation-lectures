import { CheckIcon, LockIcon } from "./Icons";

interface NumberBadgeProps {
  number: string;
  state: "open" | "active" | "locked";
  completed?: boolean;
}

/** Round lecture number used in the sidebar. */
const NumberBadge = ({ number, state, completed }: NumberBadgeProps) => {
  const look =
    state === "active"
      ? "bg-accent-500 text-white border-accent-500"
      : state === "open"
        ? "bg-white text-navy-900 border-line"
        : "bg-transparent text-navy-400 border-dashed border-navy-300";

  return (
    <span
      className={`relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${look}`}
    >
      {state === "locked" ? <LockIcon className="h-3.5 w-3.5" /> : number}
      {completed && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-mint-600 text-white ring-2 ring-panel">
          <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
      )}
    </span>
  );
};

export default NumberBadge;
