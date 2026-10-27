interface Stat {
  value: string;
  label: string;
  detail?: string;
}

/** Key numbers as large tiles, so the targets are easy to remember. */
const StatGrid = ({ stats }: { stats: Stat[] }) => (
  <dl className="my-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
    {stats.map((s) => (
      <div
        key={s.label}
        className="flex flex-col rounded-xl border border-line bg-white p-4"
      >
        <dt className="order-2 mt-1 font-display text-sm font-bold text-navy-900">
          {s.label}
        </dt>
        <dd className="order-1 m-0 font-display text-3xl font-extrabold tracking-tight text-accent-600 tabular-nums">
          {s.value}
        </dd>
        {s.detail && (
          <dd className="order-3 m-0 mt-1 text-sm leading-snug text-muted">
            {s.detail}
          </dd>
        )}
      </div>
    ))}
  </dl>
);

export default StatGrid;
