interface Element {
  name: string;
  question: string;
}

/** Ordered building blocks of a talk, each with the question it answers. */
const ElementSteps = ({ elements }: { elements: Element[] }) => (
  <ol className="m-0 my-6 grid max-w-none list-none gap-3 p-0 sm:grid-cols-2">
    {elements.map((el, i) => (
      <li
        key={el.name}
        className="m-0 flex gap-4 rounded-xl border border-line bg-white p-4"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display font-bold text-accent-100">
          {i + 1}
        </span>
        <span>
          <span className="block font-display font-bold text-navy-900">
            {el.name}
          </span>
          <span className="block text-[0.98rem] leading-relaxed">
            {el.question}
          </span>
        </span>
      </li>
    ))}
  </ol>
);

export default ElementSteps;
