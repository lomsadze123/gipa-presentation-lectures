import { useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from "../Icons";

interface PuzzleItem {
  text: string;
  /** The step this item belongs to. Must be one of `steps`. */
  step: string;
}

interface PuzzleGroup {
  name: string;
  /** Listed in the scrambled order students start from. */
  items: PuzzleItem[];
}

interface OrderPuzzleProps {
  /** The correct order of steps, e.g. Introduction … Conclusion. */
  steps: string[];
  groups: PuzzleGroup[];
}

const startOrders = (groups: PuzzleGroup[]) =>
  groups.map((g) => g.items.map((_, i) => i));

/** Students put a scrambled talk back in order, then check it against the steps. */
const OrderPuzzle = ({ steps, groups }: OrderPuzzleProps) => {
  const [active, setActive] = useState(0);
  const [orders, setOrders] = useState(() => startOrders(groups));
  const [checked, setChecked] = useState<boolean[]>(() => groups.map(() => false));

  const group = groups[active];
  const order = orders[active];
  const isChecked = checked[active];
  const rightPlace = order.filter(
    (item, pos) => steps.indexOf(group.items[item].step) === pos,
  ).length;

  const setOrder = (next: number[]) =>
    setOrders((all) => all.map((o, i) => (i === active ? next : o)));
  const setCheck = (value: boolean) =>
    setChecked((all) => all.map((c, i) => (i === active ? value : c)));

  const move = (pos: number, delta: number) => {
    const next = [...order];
    [next[pos], next[pos + delta]] = [next[pos + delta], next[pos]];
    setOrder(next);
    setCheck(false);
  };

  const showAnswer = () => {
    setOrder(
      [...order].sort(
        (a, b) =>
          steps.indexOf(group.items[a].step) -
          steps.indexOf(group.items[b].step),
      ),
    );
    setCheck(true);
  };

  const reset = () => {
    setOrder(startOrders(groups)[active]);
    setCheck(false);
  };

  return (
    <div className="my-6 rounded-2xl border-2 border-navy-900 p-4 sm:p-6">
      <div
        role="group"
        aria-label="Choose your group"
        className="flex flex-wrap gap-2"
      >
        {groups.map((g, i) => (
          <button
            key={g.name}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`cursor-pointer rounded-full px-4 py-1.5 font-display text-sm font-semibold transition-colors ${
              i === active
                ? "bg-navy-900 text-white"
                : "bg-panel text-navy-900 hover:bg-navy-100"
            }`}
          >
            Group {i + 1}
          </button>
        ))}
      </div>

      <p className="mb-1 mt-5 font-display text-lg font-bold text-navy-900">
        {group.name}
      </p>
      <p className="text-[0.98rem] text-muted">
        Use the arrows to put these elements in the correct order.
      </p>

      <ol className="m-0 max-w-none list-none space-y-2 p-0">
        {order.map((itemIndex, pos) => {
          const item = group.items[itemIndex];
          const correct = steps.indexOf(item.step) === pos;
          const state = !isChecked
            ? "border-line bg-white"
            : correct
              ? "border-mint-600/40 bg-mint-50"
              : "border-rose-600/40 bg-rose-50";
          return (
            <li
              key={itemIndex}
              className={`m-0 flex items-center gap-3 rounded-xl border p-3 ${state}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-accent-100">
                {pos + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.98rem] leading-snug">
                  {item.text}
                </span>
                {isChecked && (
                  <span
                    className={`mt-1 flex items-center gap-1 font-display text-xs font-semibold ${
                      correct ? "text-mint-600" : "text-rose-600"
                    }`}
                  >
                    {correct ? (
                      <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <CloseIcon className="h-3.5 w-3.5" strokeWidth={3} />
                    )}
                    {item.step}
                    {!correct && ` (step ${steps.indexOf(item.step) + 1})`}
                  </span>
                )}
              </span>
              <span className="flex shrink-0 flex-col gap-1">
                <button
                  onClick={() => move(pos, -1)}
                  disabled={pos === 0}
                  aria-label={`Move up: ${item.text}`}
                  className="cursor-pointer rounded-md border border-line bg-white p-1 text-navy-900 hover:bg-navy-100 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white"
                >
                  <ChevronUpIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => move(pos, 1)}
                  disabled={pos === order.length - 1}
                  aria-label={`Move down: ${item.text}`}
                  className="cursor-pointer rounded-md border border-line bg-white p-1 text-navy-900 hover:bg-navy-100 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white"
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCheck(true)}
          className="cursor-pointer rounded-full bg-accent-500 px-5 py-2 font-display font-bold text-white hover:bg-accent-600"
        >
          Check order
        </button>
        <button
          onClick={showAnswer}
          className="cursor-pointer rounded-full border border-line px-4 py-2 font-display text-sm font-semibold text-navy-900 hover:bg-panel"
        >
          Show answer
        </button>
        <button
          onClick={reset}
          className="cursor-pointer rounded-full px-4 py-2 font-display text-sm font-semibold text-muted hover:bg-panel"
        >
          Reset
        </button>
      </div>
      <p className="mb-0 mt-3 font-display text-sm" aria-live="polite">
        {isChecked &&
          (rightPlace === order.length
            ? "Every element is in the right place."
            : `${rightPlace} of ${order.length} in the right place. Move the red ones and check again.`)}
      </p>
    </div>
  );
};

export default OrderPuzzle;
