"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

const STATS = [
  { value: 240, suffix: "+", label: "Thriving hives" },
  { value: 12, suffix: " yrs", label: "Of beekeeping" },
  { value: 18, suffix: " t", label: "Honey each season" },
  { value: 0, suffix: "%", label: "Additives, ever" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="group rounded-3xl bg-white/70 p-6 text-center ring-1 ring-bark/5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
          <p className="font-display text-4xl font-semibold text-amber md:text-5xl">
            <Counter to={s.value} suffix={s.suffix} />
          </p>
          <p className="mt-2 text-sm font-medium text-bark/60">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
