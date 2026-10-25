"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

/** Two-step delete: first click arms it, second click submits the surrounding form. */
export function ConfirmButton({ children }: { children: React.ReactNode }) {
  const [armed, setArmed] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type={armed ? "submit" : "button"}
      onClick={(e) => {
        if (!armed) {
          e.preventDefault();
          setArmed(true);
        }
      }}
      disabled={pending}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        armed ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
      }`}
    >
      {pending ? "…" : armed ? "Click to confirm" : children}
    </button>
  );
}
