import Link from "next/link";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Hero } from "@/components/site/Hero";
import { HoneyDrip } from "@/components/site/HoneyDrip";
import { HoneyJar } from "@/components/site/HoneyJar";
import { Marquee } from "@/components/site/Marquee";
import { Process } from "@/components/site/Process";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, RevealGroup } from "@/components/site/Reveal";
import { revealItem } from "@/components/site/motion-presets";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { MotionDiv } from "@/components/site/MotionDiv";
import { getPublishedProducts } from "@/lib/data";

const WHY = [
  { icon: "🔥", title: "Never heated", text: "Cold-extracted to protect natural enzymes, pollen and antioxidants." },
  { icon: "🧪", title: "Lab tested", text: "Every batch is tested for purity — no syrups, no adulteration." },
  { icon: "🌱", title: "Bee-first", text: "We harvest only the surplus and keep hives in pesticide-free zones." },
  { icon: "📍", title: "Traceable", text: "Each jar carries the apiary and harvest date it came from." },
];

export default async function HomePage() {
  const products = await getPublishedProducts();
  const featured = (products.filter((p) => p.featured).length ? products.filter((p) => p.featured) : products).slice(0, 6);

  return (
    <>
      <Hero />
      <Marquee />

      {/* Featured */}
      <section className="relative">
        <HoneyDrip color="#e8a317" />
        <div className="mx-auto max-w-6xl px-6 pb-28 pt-36">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber">From our hives</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                Treasures the bees <em className="font-normal italic text-amber">worked hard</em> for
              </h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 font-semibold">
              View all products
              <span className="grid h-10 w-10 place-items-center rounded-full bg-bark text-cream transition-transform group-hover:translate-x-1 group-hover:bg-amber">→</span>
            </Link>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <MotionDiv key={p.id} variants={revealItem}>
                <ProductCard product={p} />
              </MotionDiv>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Story / process */}
      <section id="story" className="bg-honeycomb-dark relative scroll-mt-10 overflow-hidden bg-night py-28 text-cream">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-honey/10 blur-[140px]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-honey">Our story</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-6xl">
              From hive to jar, <em className="text-shimmer font-normal italic">untouched</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/60">
              We started with three hives in a hillside orchard. Today we care for hundreds of colonies — but our process hasn’t changed: let the bees lead, and get out of the way.
            </p>
          </Reveal>
          <Process />
        </div>
      </section>

      {/* Why us */}
      <section className="bg-honeycomb relative overflow-hidden py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber">Why it tastes better</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">Real honey has nothing to hide</h2>
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.1}>
              {WHY.map((w) => (
                <MotionDiv
                  key={w.title}
                  variants={revealItem}
                  className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_-15px_rgba(43,26,14,0.2)] ring-1 ring-bark/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="text-3xl">{w.icon}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bark/60">{w.text}</p>
                </MotionDiv>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal delay={0.2} className="relative mx-auto w-full max-w-md">
            <div className="clip-hex aspect-[1/0.9] bg-gradient-to-br from-honey-light via-honey to-amber" />
            <div className="absolute inset-0 flex items-end justify-center gap-2 pb-10">
              <HoneyJar color="#F4C95D" label="Acacia" className="animate-float h-44 w-auto drop-shadow-2xl" />
              <HoneyJar color="#E8A317" label="Wildflower" className="animate-float h-60 w-auto drop-shadow-2xl [animation-delay:-2s]" />
              <HoneyJar color="#8B4A12" label="Forest" className="animate-float h-48 w-auto drop-shadow-2xl [animation-delay:-4s]" />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-24 max-w-6xl px-6">
          <Stats />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-wax/60 py-28">
        <div className="px-6">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-amber">Kind words</p>
            <div className="mt-6">
              <Testimonials />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="bg-honeycomb-dark relative overflow-hidden rounded-[2.5rem] bg-night p-8 md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-honey/25 blur-[100px]" />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.3fr]">
              <div className="text-cream">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-honey">Enquire</p>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">Want a jar, a crate or a custom gift box?</h2>
                <p className="mt-5 text-cream/60">
                  We don’t sell online — every order is handled personally. Tell us what you’re after and we’ll reply with availability and pricing.
                </p>
                <ul className="mt-8 space-y-3 text-cream/80">
                  {["Retail & home orders", "Wholesale and restaurants", "Wedding & corporate gifting"].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="clip-hex grid h-6 w-7 place-items-center bg-honey text-xs text-bark">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-cream/[0.04] p-6 ring-1 ring-cream/10 backdrop-blur md:p-8">
                <EnquiryForm dark />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
