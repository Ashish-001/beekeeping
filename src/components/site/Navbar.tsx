"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { SITE } from "@/lib/site";
import { Bee } from "./Bee";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6 ${
          scrolled ? "bg-cream/80 shadow-[0_8px_30px_rgba(43,26,14,0.08)] ring-1 ring-bark/5 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative grid h-10 w-10 place-items-center">
            <span className="clip-hex absolute inset-0 bg-honey transition-transform duration-500 group-hover:rotate-90" />
            <Bee className="relative w-7" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="relative px-4 py-2 text-sm font-medium text-bark/80 transition-colors hover:text-bark">
                {isActive(l.href) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-honey/20" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-bark px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-comb hover:shadow-lg md:inline-block"
        >
          Send Enquiry
        </Link>

        <button
          className="relative h-10 w-10 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.span animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }} className="absolute left-2.5 top-1/2 h-0.5 w-5 bg-bark" />
          <motion.span animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }} className="absolute left-2.5 top-1/2 h-0.5 w-5 bg-bark" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl bg-cream/95 p-3 shadow-xl ring-1 ring-bark/5 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-medium hover:bg-honey/15">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-2xl bg-bark px-4 py-3 text-center font-semibold text-cream">
              Send Enquiry
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
