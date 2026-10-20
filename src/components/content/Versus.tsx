interface Side {
  name: string;
  quote: string;
  goal: string;
}

/** Two short examples side by side so the difference is easy to spot. */
const Versus = ({ left, right }: { left: Side; right: Side }) => (
  <div className="my-6 grid gap-4 sm:grid-cols-2">
    {[left, right].map((side) => (
      <figure
        key={side.name}
        className="flex flex-col rounded-xl border border-line bg-white p-5"
      >
        <p className="text-sm font-bold text-accent-500">{side.name}</p>
        <blockquote className="mb-0 mt-2 flex-1 border-0 p-0 text-[0.98rem] leading-relaxed">
          “{side.quote}”
        </blockquote>
        <figcaption className="mt-4 border-t border-line pt-3 text-sm text-muted">
          <strong>Goal:</strong> {side.goal}
        </figcaption>
      </figure>
    ))}
  </div>
);

export default Versus;
