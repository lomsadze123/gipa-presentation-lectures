interface Level {
  name: string;
  detail: string;
}

const colours = [
  "bg-pyr-red",
  "bg-pyr-yellow",
  "bg-pyr-green",
  "bg-pyr-blue",
  "bg-pyr-purple",
];

/** Levels are passed bottom-up: index 0 is the base of the pyramid. */
const MaslowPyramid = ({ levels }: { levels: Level[] }) => {
  const top = [...levels].reverse();

  return (
    <figure className="my-8 rounded-xl border border-line bg-white p-5 sm:p-6">
      <ol className="m-0 mx-auto flex max-w-xl list-none flex-col items-center gap-1 p-0">
        {top.map((level, i) => {
          const fromBottom = levels.length - 1 - i;
          const width = 100 - fromBottom * 14;
          return (
            <li
              key={level.name}
              style={{ width: `${width}%` }}
              className={`m-0 rounded-md px-3 py-2.5 text-center text-navy-900 ${colours[fromBottom % colours.length]}`}
            >
              <span className="block font-bold leading-tight">
                {fromBottom + 1}. {level.name}
              </span>
              <span className="mt-0.5 block text-sm leading-snug text-navy-900/80">
                {level.detail}
              </span>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 text-center text-sm text-muted">
        Maslow's hierarchy of needs, from basic needs at the bottom to growth at
        the top.
      </figcaption>
    </figure>
  );
};

export default MaslowPyramid;
