interface LecturerCardProps {
  facts: { label: string; value: string }[];
}

const LecturerCard = ({ facts }: LecturerCardProps) => (
  <dl className="my-6 grid gap-x-8 gap-y-4 rounded-xl border border-line bg-white p-6 sm:grid-cols-[auto_1fr]">
    {facts.map(({ label, value }) => (
      <div key={label} className="contents">
        <dt className="font-display text-sm font-semibold text-accent-500 sm:pt-0.5">
          {label}
        </dt>
        <dd className="-mt-3 leading-relaxed sm:mt-0">{value}</dd>
      </div>
    ))}
  </dl>
);

export default LecturerCard;
