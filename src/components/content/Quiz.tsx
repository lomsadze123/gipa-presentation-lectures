import { useState } from "react";
import { CheckIcon, CloseIcon } from "../Icons";

interface Question {
  question: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
}

const letter = (i: number) => String.fromCharCode(65 + i);

/**
 * Multiple-choice check. A pick is marked right or wrong, but the correct option is never revealed:
 * after a wrong pick the student tries again. The score counts first tries only.
 */
const Quiz = ({ questions }: { questions: Question[] }) => {
  const empty = () => questions.map((): number | null => null);
  const [picked, setPicked] = useState(empty);
  const [first, setFirst] = useState(empty);
  const answered = first.filter((p) => p !== null).length;
  const score = first.filter((p, i) => p === questions[i].answer).length;

  const pick = (q: number, option: number) => {
    setPicked((all) => all.map((p, i) => (i === q ? option : p)));
    setFirst((all) => all.map((p, i) => (i === q && p === null ? option : p)));
  };

  const reset = () => {
    setPicked(empty());
    setFirst(empty());
  };

  return (
    <div className="my-6">
      <ol className="m-0 max-w-none list-none space-y-4 p-0">
        {questions.map((q, qi) => {
          const choice = picked[qi];
          const solved = choice === q.answer;
          return (
            <li
              key={q.question}
              className="m-0 rounded-xl border border-line bg-white p-5"
            >
              <fieldset>
                <legend className="mb-3 font-display font-bold text-navy-900">
                  {qi + 1}. {q.question}
                </legend>
                <div className="grid gap-2">
                  {q.options.map((option, oi) => {
                    const isChoice = oi === choice;
                    const style = isChoice
                      ? solved
                        ? "border-mint-600 bg-mint-50"
                        : "border-rose-600 bg-rose-50"
                      : solved
                        ? "border-line opacity-60"
                        : "border-line hover:border-accent-500 hover:bg-accent-50";
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${style} ${solved ? "" : "cursor-pointer"}`}
                      >
                        <input
                          type="radio"
                          name={`quiz-${qi}`}
                          checked={isChoice}
                          disabled={solved}
                          onChange={() => pick(qi, oi)}
                          className="peer sr-only"
                        />
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-panel font-display text-sm font-bold text-navy-900 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500">
                          {letter(oi)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {isChoice &&
                          (solved ? (
                            <CheckIcon
                              className="h-5 w-5 shrink-0 text-mint-600"
                              strokeWidth={3}
                            />
                          ) : (
                            <CloseIcon
                              className="h-5 w-5 shrink-0 text-rose-600"
                              strokeWidth={3}
                            />
                          ))}
                      </label>
                    );
                  })}
                </div>
                {choice !== null && (
                  <p
                    className={`mb-0 mt-3 font-display text-sm font-semibold ${
                      solved ? "text-mint-600" : "text-rose-600"
                    }`}
                    aria-live="polite"
                  >
                    {solved ? "Correct." : "Not quite. Try another option."}
                  </p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-panel px-5 py-4">
        <p className="m-0 font-display font-semibold text-navy-900" aria-live="polite">
          {answered === questions.length
            ? `You got ${score} out of ${questions.length} right on the first try.`
            : `${answered} of ${questions.length} answered`}
        </p>
        {answered > 0 && (
          <button
            onClick={reset}
            className="cursor-pointer rounded-full border border-line bg-white px-4 py-2 font-display text-sm font-semibold text-navy-900 hover:bg-panel"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
