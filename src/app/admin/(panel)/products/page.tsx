import Link from "next/link";
import { Suspense } from "react";
import { deleteProduct, toggleProductFlag } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { Toast } from "@/components/admin/Toast";
import { AdminSkeleton, Card, PageHeader, PrimaryLink } from "@/components/admin/ui";
import { ProductVisual } from "@/components/site/ProductVisual";
import { requireAdmin } from "@/lib/auth";
import { getAllProducts } from "@/lib/data";

export default function ProductsAdminPage({ searchParams }: PageProps<"/admin/products">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <ProductsList searchParams={searchParams} />
    </Suspense>
  );
}

async function ProductsList({ searchParams }: { searchParams: PageProps<"/admin/products">["searchParams"] }) {
  await requireAdmin();
  const [products, { saved }] = await Promise.all([getAllProducts(), searchParams]);

  return (
    <>
      {saved && <Toast message="Product saved" />}
      <PageHeader title="Products" subtitle={`${products.length} products in your catalogue`} action={<PrimaryLink href="/admin/products/new">+ Add product</PrimaryLink>} />

      {products.length === 0 ? (
        <Card className="py-16 text-center">
          <p className="text-bark/50">No products yet.</p>
          <div className="mt-4">
            <PrimaryLink href="/admin/products/new">Add your first product</PrimaryLink>
          </div>
        </Card>
      ) : (
        <div className="grid gap-3">
          {products.map((p) => (
            <Card key={p.id} className="flex flex-col gap-4 !p-4 sm:flex-row sm:items-center">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl" style={{ background: `${p.color}33` }}>
                <ProductVisual product={p} className={p.image ? "" : "!p-2"} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <span className="rounded-full bg-bark/5 px-2.5 py-0.5 text-xs font-medium text-bark/60">{p.category}</span>
                </div>
                <p className="truncate text-sm text-bark/55">{p.tagline || "—"}</p>
                <p className="mt-0.5 text-xs text-bark/40">/products/{p.slug}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <FlagToggle id={p.id} flag="published" on={p.published} labels={["Published", "Draft"]} />
                <FlagToggle id={p.id} flag="featured" on={p.featured} labels={["★ Featured", "☆ Feature"]} />
                <Link href={`/admin/products/${p.id}`} className="rounded-full bg-bark/5 px-4 py-2 text-sm font-semibold transition hover:bg-honey/30">
                  Edit
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton>Delete</ConfirmButton>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function FlagToggle({ id, flag, on, labels }: { id: string; flag: "published" | "featured"; on: boolean; labels: [string, string] }) {
  return (
    <form action={toggleProductFlag}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="flag" value={flag} />
      <button
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${on ? "bg-honey/25 text-amber hover:bg-honey/40" : "bg-bark/5 text-bark/50 hover:bg-bark/10"}`}
        title={`Toggle ${flag}`}
      >
        {on ? labels[0] : labels[1]}
      </button>
    </form>
  );
}
