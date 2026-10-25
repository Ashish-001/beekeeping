import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductVisual } from "@/components/site/ProductVisual";
import { Reveal } from "@/components/site/Reveal";
import { getProductBySlug, getPublishedProducts } from "@/lib/data";

export async function generateStaticParams() {
  return (await getPublishedProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  return product ? { title: product.name, description: product.tagline } : { title: "Product not found" };
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await getPublishedProducts()).filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const more = related.length ? related : (await getPublishedProducts()).filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-honeycomb relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full blur-[130px]" style={{ background: `${product.color}55` }} />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Reveal y={10}>
          <nav className="text-sm text-bark/50">
            <Link href="/products" className="hover:text-amber">Products</Link> <span className="mx-2">/</span>
            <span className="text-bark/80">{product.name}</span>
          </nav>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="relative aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl shadow-amber/20 ring-1 ring-bark/5"
              style={{ background: `linear-gradient(150deg, ${product.color}25, ${product.color}70)` }}
            >
              <div className="bg-honeycomb absolute inset-0 opacity-70" />
              <div className="animate-float relative h-full">
                <ProductVisual product={product} className={product.image ? "" : "p-14"} />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <span className="inline-block rounded-full bg-honey/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber">{product.category}</span>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-6xl">{product.name}</h1>
              <p className="mt-3 text-xl text-bark/65">{product.tagline}</p>
              <p className="mt-6 font-display text-2xl font-semibold text-amber">{product.priceNote || "Price on enquiry"}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 whitespace-pre-line leading-relaxed text-bark/75">{product.description}</p>

              {product.highlights.length > 0 && (
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium ring-1 ring-bark/5">
                      <span className="clip-hex grid h-6 w-7 shrink-0 place-items-center bg-honey text-xs">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {product.sizes.length > 0 && (
                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bark/50">Available in</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span key={s} className="rounded-full border-2 border-bark/10 bg-white px-4 py-2 text-sm font-semibold">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal delay={0.3} id="enquire" className="mt-12 scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_-25px_rgba(43,26,14,0.35)] ring-1 ring-bark/5 md:p-8">
              <h2 className="font-display text-3xl font-semibold">Enquire about this product</h2>
              <p className="mb-6 mt-2 text-bark/60">No checkout here — send us a note and we’ll reply with pricing and availability.</p>
              <EnquiryForm productId={product.id} productName={product.name} sizes={product.sizes} />
            </Reveal>
          </div>
        </div>

        {more.length > 0 && (
          <section className="mt-32">
            <Reveal>
              <h2 className="font-display text-4xl font-semibold">You might also love</h2>
            </Reveal>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-40 lg:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-[2.5rem] bg-wax" />
      <div className="space-y-4">
        <div className="h-6 w-24 animate-pulse rounded-full bg-wax" />
        <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-wax" />
        <div className="h-6 w-1/2 animate-pulse rounded-full bg-wax" />
        <div className="h-40 animate-pulse rounded-3xl bg-wax" />
      </div>
    </div>
  );
}
