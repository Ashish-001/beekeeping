"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { saveProduct, type ProductFormState } from "@/app/admin/actions";
import { HoneyJar } from "@/components/site/HoneyJar";
import { CATEGORIES, type Product } from "@/lib/types";

const SWATCHES = ["#F6E3A1", "#F4C95D", "#E8A317", "#C98A12", "#8B4A12", "#7A3E0E"];

export function ProductForm({ product }: { product?: Product }) {
  const [state, action, pending] = useActionState<ProductFormState, FormData>(saveProduct, {});
  const [name, setName] = useState(product?.name ?? "");
  const [color, setColor] = useState(product?.color ?? "#E8A317");
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);
  const [removeImage, setRemoveImage] = useState(false);

  const input = "w-full rounded-2xl border border-bark/10 bg-white px-4 py-3 outline-none transition focus:border-amber focus:ring-4 focus:ring-honey/20";
  const label = "mb-1.5 block text-sm font-semibold text-bark/75";
  const hint = "mt-1 text-xs text-bark/45";

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="space-y-5 rounded-3xl bg-white p-6 ring-1 ring-bark/5 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={label} htmlFor="name">Product name *</label>
            <input id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="Raw Wildflower Honey" />
          </div>
          <div>
            <label className={label} htmlFor="category">Category *</label>
            <select id="category" name="category" defaultValue={product?.category ?? "Honey"} className={input}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="priceNote">Price note</label>
            <input id="priceNote" name="priceNote" defaultValue={product?.priceNote} className={input} placeholder="From ₹450 or On request" />
            <p className={hint}>Shown as a guide only — there’s no checkout.</p>
          </div>
          <div className="md:col-span-2">
            <label className={label} htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" defaultValue={product?.tagline} className={input} placeholder="Unfiltered sunshine from a hundred blooms" />
          </div>
          <div className="md:col-span-2">
            <label className={label} htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={6} defaultValue={product?.description} className={`${input} resize-y`} placeholder="Tell the story of this product…" />
          </div>
          <div>
            <label className={label} htmlFor="sizes">Sizes</label>
            <textarea id="sizes" name="sizes" rows={3} defaultValue={product?.sizes.join("\n")} className={`${input} resize-none`} placeholder={"250 g\n500 g\n1 kg"} />
            <p className={hint}>One per line (or comma separated)</p>
          </div>
          <div>
            <label className={label} htmlFor="highlights">Highlights</label>
            <textarea id="highlights" name="highlights" rows={3} defaultValue={product?.highlights.join("\n")} className={`${input} resize-none`} placeholder={"Raw & unheated\nSingle origin"} />
            <p className={hint}>One per line</p>
          </div>
          <div className="md:col-span-2">
            <label className={label} htmlFor="slug">URL slug</label>
            <div className="flex items-center rounded-2xl border border-bark/10 bg-bark/[0.02] pl-4 focus-within:border-amber focus-within:ring-4 focus-within:ring-honey/20">
              <span className="text-sm text-bark/40">/products/</span>
              <input id="slug" name="slug" defaultValue={product?.slug} className="w-full bg-transparent px-1 py-3 outline-none" placeholder="auto-generated from name" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-bark/5">
          <p className={label}>Image</p>
          <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ background: `linear-gradient(150deg, ${color}25, ${color}70)` }}>
            {preview && !removeImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-8">
                <HoneyJar color={color} label={name || "Your product"} className="h-full w-auto" />
              </div>
            )}
          </div>
          <label className="mt-4 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-bark/15 px-4 py-3 text-sm font-semibold text-bark/60 transition hover:border-amber hover:text-amber">
            {preview ? "Replace photo" : "Upload photo"}
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setPreview(URL.createObjectURL(f));
                  setRemoveImage(false);
                }
              }}
            />
          </label>
          {product?.image && (
            <label className="mt-3 flex items-center gap-2 text-sm text-bark/60">
              <input type="checkbox" name="removeImage" checked={removeImage} onChange={(e) => setRemoveImage(e.target.checked)} className="accent-amber" />
              Remove photo (use illustration)
            </label>
          )}
          <p className={hint}>JPG, PNG, WEBP · max 5 MB. Without a photo, an illustrated jar is shown in the colour below.</p>

          <p className={`${label} mt-5`}>Jar colour</p>
          <div className="flex flex-wrap items-center gap-2">
            {SWATCHES.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition ${color.toLowerCase() === c.toLowerCase() ? "ring-bark" : "ring-transparent"}`}
                style={{ background: c }}
                aria-label={`Colour ${c}`}
              />
            ))}
            <input type="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded-lg border-0 bg-transparent" />
          </div>
        </div>

        <div className="space-y-3 rounded-3xl bg-white p-6 ring-1 ring-bark/5">
          <Toggle name="published" label="Published" hint="Visible on the website" defaultChecked={product?.published ?? true} />
          <Toggle name="featured" label="Featured" hint="Shown on the home page" defaultChecked={product?.featured ?? false} />
        </div>

        {state.error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{state.error}</p>}

        <div className="flex gap-3">
          <button disabled={pending} className="flex-1 rounded-full bg-bark px-6 py-3.5 font-semibold text-cream transition hover:bg-comb disabled:opacity-60">
            {pending ? "Saving…" : product ? "Save changes" : "Create product"}
          </button>
          <Link href="/admin/products" className="rounded-full bg-bark/5 px-6 py-3.5 font-semibold transition hover:bg-bark/10">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}

function Toggle({ name, label, hint, defaultChecked }: { name: string; label: string; hint: string; defaultChecked: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span>
        <span className="block font-semibold">{label}</span>
        <span className="text-xs text-bark/50">{hint}</span>
      </span>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="relative h-7 w-12 shrink-0 rounded-full bg-bark/15 transition peer-checked:bg-honey after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}
