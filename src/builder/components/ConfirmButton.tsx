import { type ReactNode, useEffect, useState } from "react";

interface ConfirmButtonProps {
  onConfirm: () => void;
  confirmLabel: string;
  className: string;
  children: ReactNode;
}

/** Destructive action that needs a second click within a few seconds. */
const ConfirmButton = ({ onConfirm, confirmLabel, className, children }: ConfirmButtonProps) => {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const id = window.setTimeout(() => setArmed(false), 4000);
    return () => window.clearTimeout(id);
  }, [armed]);

  return (
    <button
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
        } else {
          setArmed(true);
        }
      }}
      className={`${className} ${armed ? "border-rose-600! text-rose-600!" : ""}`}
    >
      {armed ? confirmLabel : children}
    </button>
  );
};

export default ConfirmButton;
