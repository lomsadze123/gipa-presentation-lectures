import type { ComponentType, ReactNode, SVGProps } from "react";
import { BulbIcon, HeartIcon, WarningIcon } from "../Icons";

const styles: Record<
  string,
  {
    label: string;
    box: string;
    icon: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  }
> = {
  reflect: {
    label: "Think about it",
    box: "border-lavender-600/20 bg-lavender-50",
    icon: "text-lavender-600",
    Icon: BulbIcon,
  },
  tip: {
    label: "Remember",
    box: "border-mint-600/20 bg-mint-50",
    icon: "text-mint-600",
    Icon: HeartIcon,
  },
  warning: {
    label: "Watch out",
    box: "border-rose-600/20 bg-rose-50",
    icon: "text-rose-600",
    Icon: WarningIcon,
  },
};

interface CalloutProps {
  type: "reflect" | "tip" | "warning";
  title?: string;
  children: ReactNode;
}

const Callout = ({ type, title, children }: CalloutProps) => {
  const { label, box, icon, Icon } = styles[type];
  return (
    <aside className={`my-6 flex max-w-[68ch] gap-4 rounded-xl border px-5 py-4 ${box}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${icon}`} />
      <div className="min-w-0 [&>*:last-child]:mb-0">
        <p className={`mb-1 font-bold ${icon}`}>{title ?? label}</p>
        {children}
      </div>
    </aside>
  );
};

export default Callout;
