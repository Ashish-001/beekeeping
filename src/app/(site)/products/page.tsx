import type { Metadata } from "next";
import { ProductsBrowser } from "@/components/site/ProductsBrowser";
import { Reveal } from "@/components/site/Reveal";
import { getPublishedProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description: "Raw honey, honeycomb, bee pollen, propolis, beeswax and gift sets.",
};

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <div className="bg-honeycomb relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-honey-light/40 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-40">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber">The collection</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-tight md:text-6xl">
            Everything our <em className="text-shimmer font-normal italic">hives</em> give us
          </h1>
          <p className="mt-5 text-lg text-bark/65">
            Browse our range and send an enquiry for anything that catches your eye. We’ll get back to you with pricing, sizes and availability.
          </p>
        </Reveal>
        <div className="mt-14">
          <ProductsBrowser products={products} />
        </div>
      </div>
    </div>
  );
}
