"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Toast({ message }: { message: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2800);
    // Drop the ?saved flag so a refresh doesn't replay the toast
    window.history.replaceState(null, "", window.location.pathname);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-bark px-5 py-3.5 font-semibold text-cream shadow-2xl"
        >
          <span className="clip-hex grid h-6 w-7 place-items-center bg-honey text-xs text-bark">✓</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
