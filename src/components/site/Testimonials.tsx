"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUOTES = [
  { text: "The wildflower honey tastes like a summer meadow. I’ve stopped buying supermarket honey altogether.", name: "Priya S.", role: "Home baker" },
  { text: "We ordered 300 gift boxes for our wedding — every guest asked where they came from. Beautiful packaging, even better honey.", name: "Arjun & Meera", role: "Wedding favours" },
  { text: "Their forest honey has become a staple on our dessert menu. Consistent, rich and genuinely raw.", name: "Chef Rohan K.", role: "Restaurant owner" },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const q = QUOTES[i];
  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <span className="font-display text-8xl leading-none text-honey/40">“</span>
      <div className="relative min-h-[200px] md:min-h-[170px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-display text-2xl leading-snug md:text-3xl">{q.text}</blockquote>
            <figcaption className="mt-6 text-sm">
              <strong>{q.name}</strong> <span className="text-bark/50">· {q.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {QUOTES.map((_, j) => (
          <button
            key={j}
            onClick={() => setI(j)}
            aria-label={`Show testimonial ${j + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${j === i ? "w-10 bg-amber" : "w-2 bg-bark/20 hover:bg-bark/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
