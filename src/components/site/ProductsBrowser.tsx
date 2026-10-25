"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductsBrowser({ products }: { products: Product[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const visible = products.filter(
    (p) =>
      (active === "All" || p.category === active) &&
      (!query || `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <LayoutGroup>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${active === c ? "text-cream" : "text-bark/70 hover:text-bark"}`}
              >
                {active === c && (
                  <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-bark" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="relative md:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border border-bark/10 bg-white px-5 py-3 pl-11 outline-none transition focus:border-amber focus:ring-4 focus:ring-honey/20"
          />
          <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bark/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center text-bark/50">
          No products match — try another category or search term. 🐝
        </motion.p>
      )}
    </div>
  );
}
