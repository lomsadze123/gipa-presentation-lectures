import type { ReactNode } from "react";

const colours = [
  { badge: "bg-type-blue", soft: "bg-type-blue/10", text: "text-type-blue" },
  { badge: "bg-type-purple", soft: "bg-type-purple/10", text: "text-type-purple" },
  { badge: "bg-type-green", soft: "bg-type-green/10", text: "text-type-green" },
  { badge: "bg-type-orange", soft: "bg-type-orange/10", text: "text-type-orange" },
  { badge: "bg-type-pink", soft: "bg-type-pink/10", text: "text-type-pink" },
  { badge: "bg-type-teal", soft: "bg-type-teal/10", text: "text-type-teal" },
];

export interface Principle {
  /** Used for the anchor id, e.g. "purpose" → #principle-purpose. */
  id: string;
  name: string;
  question: string;
  body: ReactNode;
  /** One sentence to remember, shown at the bottom of the card. */
  takeaway?: string;
}

/** A model made of a few principles: a strip to see them all at once, then one card each. */
const PrincipleCards = ({ principles }: { principles: Principle[] }) => (
  <div className="my-6">
    <ol className="m-0 flex max-w-none list-none flex-wrap gap-2 p-0">
      {principles.map((p, i) => {
        const c = colours[i % colours.length];
        return (
          <li key={p.id} className="m-0 p-0">
            <a
              href={`#principle-${p.id}`}
              className={`inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 font-display text-sm font-bold no-underline ${c.soft} ${c.text}`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-white ${c.badge}`}
              >
                {i + 1}
              </span>
              {p.name}
            </a>
          </li>
        );
      })}
    </ol>

    {principles.map((p, i) => {
      const c = colours[i % colours.length];
      return (
        <div
          key={p.id}
          id={`principle-${p.id}`}
          className="mt-5 scroll-mt-24 rounded-xl border border-line bg-white p-5 sm:p-6"
        >
          <h3 className="mt-0 flex items-center gap-3">
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-lg font-extrabold text-white ${c.badge}`}
            >
              {i + 1}
            </span>
            <span>
              <span className={`block text-xs font-semibold ${c.text}`}>
                {p.name}
              </span>
              {p.question}
            </span>
          </h3>
          <div className="[&>*:last-child]:mb-0">{p.body}</div>
          {p.takeaway && (
            <p
              className={`mb-0 mt-4 max-w-none rounded-lg px-4 py-3 font-semibold text-navy-900 ${c.soft}`}
            >
              {p.takeaway}
            </p>
          )}
        </div>
      );
    })}
  </div>
);

export default PrincipleCards;
