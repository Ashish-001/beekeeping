"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FlyingBees } from "./FlyingBees";
import { HoneyJar } from "./HoneyJar";

const HEADLINE = ["Liquid", "gold,", "made", "by", "bees."];

// Hexagon cells behind the jar: [x%, y%, size px, delay]
const HEXES: [number, number, number, number][] = [
  [8, 12, 90, 0],
  [62, 4, 70, 0.4],
  [78, 34, 110, 0.8],
  [2, 58, 70, 1.2],
  [70, 72, 80, 1.6],
  [30, 82, 60, 2],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const jarY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const hexRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Subtle mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const hexX = useTransform(sx, [-0.5, 0.5], [-20, 20]);
  const hexY = useTransform(sy, [-0.5, 0.5], [-20, 20]);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="bg-honeycomb relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* warm glow */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] rounded-full bg-honey-light/40 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-amber/20 blur-[120px]" />

      <FlyingBees />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
            Small batch · Raw · Ethical
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {HEADLINE.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.em
                className="text-shimmer inline-block font-normal italic"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Bottled by hand.
              </motion.em>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-bark/70"
          >
            Raw honey, honeycomb and hive treasures from our own apiaries. Unheated, unfiltered and harvested only when the bees can spare it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/products"
              className="group relative overflow-hidden rounded-full bg-bark px-7 py-4 font-semibold text-cream shadow-xl shadow-bark/20 transition-transform hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-amber to-honey transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2">
                Explore Products
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-bark/15 bg-white/50 px-7 py-4 font-semibold backdrop-blur transition-all hover:border-amber hover:bg-white"
            >
              Make an Enquiry
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex items-center gap-4 text-sm text-bark/60"
          >
            <div className="flex -space-x-2">
              {["#E8A317", "#C9790A", "#8B4A12", "#F6C453"].map((c) => (
                <span key={c} className="h-8 w-8 rounded-full border-2 border-cream" style={{ background: c }} />
              ))}
            </div>
            <span>
              Loved by <strong className="text-bark">2,000+</strong> honey lovers
            </span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: jarY }} className="relative mx-auto aspect-square w-full max-w-[480px]">
          <motion.div style={{ x: hexX, y: hexY, rotate: hexRotate }} className="absolute inset-0">
            {HEXES.map(([x, y, s, d], i) => (
              <motion.div
                key={i}
                className="clip-hex absolute bg-gradient-to-br from-honey-light to-amber"
                style={{ left: `${x}%`, top: `${y}%`, width: s, height: s * 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 0.9, 0.55] }}
                transition={{ delay: 0.6 + d * 0.3, duration: 1.2, ease: "backOut" }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring", bounce: 0.35 }}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
            className="absolute inset-[12%]"
          >
            <div className="clip-hex absolute inset-0 bg-gradient-to-br from-wax to-honey-light/70 shadow-2xl" />
            <div className="animate-float absolute inset-[8%]">
              <HoneyJar className="h-full w-full drop-shadow-2xl" label="Wildflower" />
            </div>
          </motion.div>

          {/* floating badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, type: "spring" }}
            className="absolute -right-2 top-[18%] rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur md:-right-6"
          >
            <p className="text-xs text-bark/60">Harvested</p>
            <p className="font-display text-lg font-semibold">This season</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, type: "spring" }}
            className="absolute -left-2 bottom-[16%] flex items-center gap-3 rounded-2xl bg-bark px-4 py-3 text-cream shadow-xl md:-left-8"
          >
            <span className="text-2xl">🌼</span>
            <div>
              <p className="text-xs text-cream/60">Floral sources</p>
              <p className="font-display text-lg font-semibold">120+ blooms</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-bark/50 md:flex"
      >
        Scroll
        <span className="relative h-10 w-6 rounded-full border-2 border-bark/25">
          <motion.span
            className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 rounded-full bg-amber"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
