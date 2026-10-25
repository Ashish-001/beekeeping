"use client";

import { motion } from "framer-motion";
import { Bee } from "./Bee";

type Flight = { x: string[]; y: string[]; duration: number; delay: number; size: number; flip?: boolean };

const FLIGHTS: Flight[] = [
  { x: ["-10vw", "20vw", "45vw", "70vw", "110vw"], y: ["30vh", "18vh", "35vh", "12vh", "28vh"], duration: 18, delay: 0, size: 44 },
  { x: ["110vw", "80vw", "55vw", "25vw", "-10vw"], y: ["60vh", "48vh", "66vh", "50vh", "62vh"], duration: 22, delay: 4, size: 34, flip: true },
  { x: ["-10vw", "15vw", "40vw", "65vw", "110vw"], y: ["75vh", "62vh", "78vh", "58vh", "70vh"], duration: 26, delay: 9, size: 28 },
];

export function FlyingBees() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {FLIGHTS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute left-0 top-0"
          style={{ width: f.size }}
          initial={{ x: f.x[0], y: f.y[0] }}
          animate={{ x: f.x, y: f.y, rotate: [0, -8, 6, -6, 0] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ y: [0, -6, 0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bee className="w-full drop-shadow-md" style={f.flip ? { transform: "scaleX(-1)" } : undefined} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
