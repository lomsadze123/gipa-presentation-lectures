interface Side {
  name: string;
  quote: string;
  goal: string;
}

/** Two short examples side by side so the difference is easy to spot. */
const Versus = ({ left, right }: { left: Side; right: Side }) => (
  <div className="my-6 grid gap-4 sm:grid-cols-2">
    {[left, right].map((side, i) => (
      <figure
        key={side.name}
        className={`flex flex-col rounded-xl p-5 ${
          i === 0 ? "bg-navy-900 text-white" : "border border-line bg-white"
        }`}
      >
        <p
          className={`font-display text-sm font-bold ${
            i === 0 ? "text-accent-100" : "text-accent-500"
          }`}
        >
          {side.name}
        </p>
        <blockquote className="mb-0 mt-2 flex-1 border-0 p-0 text-[0.98rem] italic leading-relaxed">
          “{side.quote}”
        </blockquote>
        <figcaption
          className={`mt-4 border-t pt-3 font-display text-sm ${
            i === 0 ? "border-navy-700 text-navy-100" : "border-line text-muted"
          }`}
        >
          <strong className={i === 0 ? "text-white" : ""}>Goal:</strong>{" "}
          {side.goal}
        </figcaption>
      </figure>
    ))}
  </div>
);

export default Versus;
