import type { ReactNode } from "react";

/** One sentence the audience should remember, set large in the accent colour. */
const KeyIdea = ({ children }: { children: ReactNode }) => (
  <p className="my-8 max-w-[32ch] text-2xl font-extrabold leading-snug tracking-tight text-accent-600 sm:text-[1.75rem]">
    {children}
  </p>
);

export default KeyIdea;
