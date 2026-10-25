"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { logout } from "@/app/admin/actions";
import { Bee } from "@/components/site/Bee";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/products", label: "Products", icon: "⬢" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "✉" },
];

export function Sidebar() {
  return (
    <aside className="bg-honeycomb-dark sticky top-0 z-20 flex shrink-0 flex-row items-center gap-2 overflow-x-auto bg-night px-4 py-3 text-cream md:h-screen md:w-64 md:flex-col md:items-stretch md:px-5 md:py-8">
      <Link href="/admin" className="mr-4 flex items-center gap-3 md:mb-10 md:mr-0">
        <span className="clip-hex grid h-10 w-11 place-items-center bg-honey">
          <Bee className="w-7" />
        </span>
        <span className="hidden font-display text-lg font-semibold md:block">{SITE.name}</span>
      </Link>

      <Suspense fallback={<NavLinks pathname={null} />}>
        <ActiveNavLinks />
      </Suspense>

      <div className="ml-auto flex items-center gap-2 md:ml-0 md:mt-auto md:flex-col md:items-stretch">
        <Link href="/" target="_blank" className="whitespace-nowrap rounded-xl px-4 py-2.5 text-sm text-cream/60 transition hover:bg-cream/5 hover:text-cream">
          ↗ View site
        </Link>
        <form action={logout}>
          <button className="w-full whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm text-cream/60 transition hover:bg-red-500/10 hover:text-red-300">
            ⎋ Log out
          </button>
        </form>
      </div>
    </aside>
  );
}

function ActiveNavLinks() {
  return <NavLinks pathname={usePathname()} />;
}

function NavLinks({ pathname }: { pathname: string | null }) {
  const active = (href: string) => pathname !== null && (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  return (
    <nav className="flex flex-row gap-1 md:flex-col">
      {NAV.map((n) => (
        <Link key={n.href} href={n.href} className="relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-cream/70 transition hover:text-cream">
          {active(n.href) && (
            <motion.span layoutId="admin-nav" className="absolute inset-0 rounded-xl bg-honey/15 ring-1 ring-honey/30" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
          )}
          <span className="relative text-honey">{n.icon}</span>
          <span className="relative">{n.label}</span>
        </Link>
      ))}
    </nav>
  );
}
