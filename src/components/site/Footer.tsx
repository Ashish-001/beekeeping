import Link from "next/link";
import { SITE } from "@/lib/site";
import { Bee } from "./Bee";
import { HoneyDrip } from "./HoneyDrip";

export function Footer() {
  return (
    <footer className="bg-honeycomb-dark relative mt-auto bg-night text-cream">
      <HoneyDrip color="#fff8ec" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-10 pt-32 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="clip-hex grid h-12 w-12 place-items-center bg-honey">
              <Bee className="w-8" />
            </span>
            <span className="font-display text-2xl font-semibold">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-cream/60">{SITE.tagline}. Every jar is traceable to the hive it came from.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-honey">Explore</h4>
          <ul className="mt-4 space-y-2 text-cream/70">
            <li><Link className="transition hover:text-honey" href="/products">All products</Link></li>
            <li><Link className="transition hover:text-honey" href="/#story">Our story</Link></li>
            <li><Link className="transition hover:text-honey" href="/contact">Bulk & gifting enquiries</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-honey">Get in touch</h4>
          <ul className="mt-4 space-y-2 text-cream/70">
            <li><a className="transition hover:text-honey" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a className="transition hover:text-honey" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></li>
            <li>{SITE.address}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-cream/10 px-6 py-6 text-sm text-cream/40 md:flex-row">
        <p>© {SITE.name}. Made with love & a little bit of buzz.</p>
        <p>We take enquiries only — no online checkout.</p>
      </div>
    </footer>
  );
}
