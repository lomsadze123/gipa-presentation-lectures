import type { ReactNode } from "react";

/** One colour per type, in the order the lecture introduces them. */
const typeColours = [
  { badge: "bg-type-blue", soft: "bg-type-blue/10", text: "text-type-blue" },
  { badge: "bg-type-purple", soft: "bg-type-purple/10", text: "text-type-purple" },
  { badge: "bg-type-green", soft: "bg-type-green/10", text: "text-type-green" },
  { badge: "bg-type-orange", soft: "bg-type-orange/10", text: "text-type-orange" },
  { badge: "bg-type-pink", soft: "bg-type-pink/10", text: "text-type-pink" },
  { badge: "bg-type-teal", soft: "bg-type-teal/10", text: "text-type-teal" },
];

interface PresentationTypeProps {
  number: number;
  name: string;
  purpose: string;
  /** Text right after the purpose line. */
  description?: ReactNode;
  examplesLabel?: string;
  examples?: string[];
  /** Extra content after the examples. */
  children?: ReactNode;
  keyQuestion?: string;
}

const PresentationType = ({
  number,
  name,
  purpose,
  description,
  examplesLabel = "Examples",
  examples,
  children,
  keyQuestion,
}: PresentationTypeProps) => {
  const c = typeColours[(number - 1) % typeColours.length];

  return (
    <div className="mt-8 rounded-xl border border-line bg-white p-5 sm:p-6">
      <h3 className="mt-0 flex items-center gap-3">
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${c.badge}`}
        >
          {number}
        </span>
        <span>
          <span className={`block text-xs font-semibold ${c.text}`}>
            Type {number}
          </span>
          {name}
        </span>
      </h3>
      <p>
        <strong>Purpose:</strong> {purpose}
      </p>
      {description}
      {examples && (
        <>
          <p className={`mb-2 text-sm font-semibold ${c.text}`}>
            {examplesLabel}
          </p>
          <ul>
            {examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </>
      )}
      {children}
      {keyQuestion && (
        <p className={`mb-0 max-w-none rounded-lg px-4 py-3 ${c.soft}`}>
          <span className={`font-bold ${c.text}`}>Key question: </span>
          {keyQuestion}
        </p>
      )}
    </div>
  );
};

export default PresentationType;
