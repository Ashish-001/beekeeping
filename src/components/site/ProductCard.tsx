"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), transparent 55%)`);

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_10px_40px_-15px_rgba(43,26,14,0.25)] ring-1 ring-bark/5 transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(201,121,10,0.45)]"
      >
        <div className="relative aspect-[4/3.4] overflow-hidden" style={{ background: `linear-gradient(160deg, ${product.color}22, ${product.color}55)` }}>
          <div className="bg-honeycomb absolute inset-0 opacity-60" />
          <div className="relative h-full transition-transform duration-700 ease-out group-hover:scale-110">
            <ProductVisual product={product} />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-bark/80 backdrop-blur">
            {product.category}
          </span>
          {product.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-bark px-3 py-1 text-xs font-semibold text-honey-light">★ Bestseller</span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl font-semibold leading-tight">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-bark/65">{product.tagline}</p>
          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="text-sm font-semibold text-amber">{product.priceNote || "Price on enquiry"}</span>
            <span className="flex items-center gap-1 rounded-full bg-cream px-4 py-2 text-sm font-semibold transition-colors group-hover:bg-honey">
              Enquire
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
      </Link>
    </motion.div>
  );
}
