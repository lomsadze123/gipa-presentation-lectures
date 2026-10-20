interface Group {
  name: string;
  task: string;
}

interface ActivityBlockProps {
  groups: Group[];
  questions: string[];
}

/** In-class group work: every group gets a scenario and answers the same questions. */
const ActivityBlock = ({ groups, questions }: ActivityBlockProps) => (
  <div className="my-6 rounded-2xl border-2 border-navy-900 p-5 sm:p-6">
    <ul className="m-0 grid max-w-none list-none gap-3 p-0 sm:grid-cols-2">
      {groups.map((g, i) => (
        <li key={g.name} className="m-0 rounded-lg bg-panel p-4 pl-4">
          <p className="mb-1 font-display text-sm text-accent-500">
            Group {i + 1}
          </p>
          <p className="mb-1 font-display text-lg font-bold text-navy-900">
            {g.name}
          </p>
          <p className="mb-0 text-[0.98rem] leading-relaxed">{g.task}</p>
        </li>
      ))}
    </ul>
    <div className="mt-5 border-t border-line pt-5">
      <p className="mb-2 font-display font-bold text-navy-900">
        Every group answers
      </p>
      <ol className="mb-0">
        {questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
    </div>
  </div>
);

export default ActivityBlock;
