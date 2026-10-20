import type { ComponentType, SVGProps } from "react";

export interface RoadmapStep {
  title: string;
  detail: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** The lecture's plan, shown right under the title slide. */
const Roadmap = ({ steps }: { steps: RoadmapStep[] }) => (
  <section aria-labelledby="roadmap-heading" className="mt-8">
    <h2
      id="roadmap-heading"
      className="font-display text-lg font-bold text-navy-900"
    >
      Lecture roadmap
    </h2>
    <ol className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
      {steps.map(({ title, detail, icon: Icon }, i) => (
        <li key={title} className="flex gap-4 bg-white p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display font-semibold text-navy-900">
              {String(i + 1).padStart(2, "0")} {title}
            </span>
            <span className="block text-sm text-muted">{detail}</span>
          </span>
        </li>
      ))}
    </ol>
  </section>
);

export default Roadmap;
