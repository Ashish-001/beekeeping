import { Suspense } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { AdminSkeleton, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export default function NewProductPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <NewProduct />
    </Suspense>
  );
}

async function NewProduct() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="Add a product" subtitle="It will appear on the website as soon as you publish it." />
      <ProductForm />
    </>
  );
}
