import type { ReactNode } from "react";

interface ChallengeBlockProps {
  title: string;
  children: ReactNode;
}

/** The task students prepare and present themselves. */
const ChallengeBlock = ({ title, children }: ChallengeBlockProps) => (
  <div className="my-6 rounded-2xl border-2 border-accent-500 bg-accent-50 p-5 sm:p-7">
    <p className="mb-1 font-display text-sm font-bold text-accent-500">
      Your challenge
    </p>
    <p className="mb-3 font-display text-2xl font-bold leading-tight text-navy-900">
      {title}
    </p>
    <div className="[&>p:last-child]:mb-0">{children}</div>
  </div>
);

export default ChallengeBlock;
