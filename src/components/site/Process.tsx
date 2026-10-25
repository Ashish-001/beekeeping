"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const STEPS = [
  { icon: "🌸", title: "Forage", text: "Our bees roam pesticide-free meadows and forests, visiting thousands of flowers a day." },
  { icon: "🐝", title: "Hive", text: "Back home, they turn nectar into honey and seal each cell with fresh wax when it’s perfectly ripe." },
  { icon: "🖐️", title: "Harvest", text: "We take only the surplus — always leaving plenty behind so the colony thrives through winter." },
  { icon: "🍯", title: "Jar", text: "Cold-extracted, lightly strained and hand-poured. No heating, no blending, no additives." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
      {/* track + animated fill */}
      <div className="absolute left-7 top-0 h-full w-0.5 bg-cream/10 md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        style={{ scaleY: progress }}
        className="absolute left-7 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-honey-light via-honey to-amber md:left-1/2 md:-translate-x-1/2"
      />

      <div className="space-y-16">
        {STEPS.map((s, i) => (
          <div key={s.title} className={`relative flex items-center gap-8 md:gap-16 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`order-2 flex-1 pl-14 md:order-none md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-honey">Step 0{i + 1}</span>
              <h3 className="mt-2 font-display text-3xl font-semibold text-cream">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-cream/60">{s.text}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="clip-hex absolute left-0 z-10 grid h-14 w-16 place-items-center bg-honey text-2xl md:static md:h-20 md:w-24 md:text-4xl"
            >
              {s.icon}
            </motion.div>
            <div className="hidden flex-1 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
