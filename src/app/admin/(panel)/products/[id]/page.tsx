import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { AdminSkeleton, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getProductById } from "@/lib/data";

export default function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <EditProduct params={params} />
    </Suspense>
  );
}

async function EditProduct({ params }: { params: PageProps<"/admin/products/[id]">["params"] }) {
  await requireAdmin();
  const product = await getProductById((await params).id);
  if (!product) notFound();

  return (
    <>
      <PageHeader
        title={`Edit ${product.name}`}
        subtitle={`Last updated ${new Date(product.updatedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}`}
        action={
          product.published ? (
            <Link href={`/products/${product.slug}`} target="_blank" className="text-sm font-semibold text-amber hover:underline">
              View on site ↗
            </Link>
          ) : null
        }
      />
      <ProductForm key={product.updatedAt} product={product} />
    </>
  );
}
